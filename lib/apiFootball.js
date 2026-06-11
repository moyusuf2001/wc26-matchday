// ---------------------------------------------------------------------------
// Live data layer : ESPN's free, public, unofficial JSON API (no key required).
// Runs server-side only; responses are cached via Next's `revalidate`.
//
// Why ESPN: API-Football's free plan can't read the 2026 season, and
// SofaScore/FotMob block server requests. ESPN serves real 2026 World Cup data
// (teams, full squads, fixtures, and official lineups) for free.
//
// The previous API-Football implementation is preserved in
// `lib/apiFootball.apisports.bak` : restore it if you move to a paid plan.
//
// Each exported function keeps the same return shape the routes + UI expect, so
// only the internals changed.
// ---------------------------------------------------------------------------

const EBASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world';
const EWEB = 'https://site.web.api.espn.com/apis/common/v3/sports/soccer/fifa.world';
const HEADSHOT = (id) => `https://a.espncdn.com/i/headshots/soccer/players/full/${id}.png`;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function apiGet(url, revalidate = 3600) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA },
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`ESPN responded ${res.status}`);
  return res.json();
}

// Normalize a team/player name for matching (decompose accents, keep letters).
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');

// Static-name → ESPN-name differences (only two of the 48 differ).
const ALIAS = { korearepublic: 'southkorea', drcongo: 'congodr' };
const resolveNorm = (name) => { const n = norm(name); return ALIAS[n] || n; };

// Resolve country name → ESPN team id, by listing the WC teams once (cached).
let _teamMap = null;
async function teamMap() {
  if (_teamMap) return _teamMap;
  const d = await apiGet(`${EBASE}/teams`, 86400);
  const teams = d?.sports?.[0]?.leagues?.[0]?.teams || [];
  _teamMap = {};
  for (const t of teams) {
    if (t.team?.displayName) _teamMap[norm(t.team.displayName)] = t.team.id;
  }
  return _teamMap;
}
async function idFor(name) {
  const map = await teamMap();
  return map[resolveNorm(name)] ?? null;
}

// --- position helpers (ESPN gives "G"/"D"/"M"/"F" in rosters, detailed codes
//     like "CD-L" in match lineups) -----------------------------------------
function rowFor(abbr) {
  const base = (abbr || '').toUpperCase().split('-')[0];
  if (base === 'G' || base === 'GK') return 1;
  if (['ST', 'CF', 'SS', 'LW', 'RW', 'FW', 'F', 'RF', 'LF', 'W'].includes(base)) return 4;
  if (['DM', 'CM', 'AM', 'LM', 'RM', 'M', 'CDM', 'CAM', 'MF', 'RCM', 'LCM'].includes(base)) return 3;
  if (['CB', 'RB', 'LB', 'RWB', 'LWB', 'SW', 'CD', 'D', 'DF', 'RCB', 'LCB'].includes(base)) return 2;
  if (base.includes('B')) return 2;
  if (base.startsWith('F')) return 4;
  return 3;
}
function sideFor(abbr) {
  const a = (abbr || '').toUpperCase();
  if (a.endsWith('-L') || /^L/.test(a)) return -1;
  if (a.endsWith('-R') || /^R/.test(a)) return 1;
  return 0;
}
const posLetter = (abbr) => { const r = rowFor(abbr); return r === 1 ? 'G' : r === 2 ? 'D' : r === 4 ? 'F' : 'M'; };
const fullPos = (abbr) => { const r = rowFor(abbr); return r === 1 ? 'Goalkeeper' : r === 2 ? 'Defender' : r === 4 ? 'Attacker' : 'Midfielder'; };

// Assign each starter a "row:col" grid the <Pitch> understands (row 1 = GK end).
function assignGrids(startXI) {
  const rows = {};
  startXI.forEach((s, i) => {
    const r = rowFor(s._abbr);
    (rows[r] = rows[r] || []).push({ s, side: sideFor(s._abbr), i });
  });
  for (const r of Object.keys(rows)) {
    rows[r].sort((x, y) => x.side - y.side || x.i - y.i)
      .forEach((item, idx) => { item.s.grid = `${r}:${idx + 1}`; });
  }
}

// ---------------------------------------------------------------------------
// Full squad : current roster for a team.
// ---------------------------------------------------------------------------
export async function getSquad(teamName) {
  const id = await idFor(teamName);
  if (!id) return { teamId: null, players: [] };
  const d = await apiGet(`${EBASE}/teams/${id}?enable=roster`, 86400);
  const athletes = d?.team?.athletes || [];
  const players = athletes.map((a) => ({
    id: a.id,
    name: a.displayName,
    number: a.jersey ?? null,
    position: fullPos(a.position?.abbreviation || a.position?.name),
  }));
  return { teamId: id, players };
}

// ---------------------------------------------------------------------------
// Find the ESPN event id for a tie on a given date (YYYYMMDD).
// ---------------------------------------------------------------------------
async function findEventId(homeName, awayName, date) {
  if (!date) return null;
  let d;
  try { d = await apiGet(`${EBASE}/scoreboard?dates=${date}`, 300); } catch { return null; }
  const want = [resolveNorm(homeName), resolveNorm(awayName)].sort();
  for (const e of d?.events || []) {
    const comp = e.competitions?.[0];
    const got = (comp?.competitors || []).map((c) => resolveNorm(c.team?.displayName || c.team?.name || '')).sort();
    if (got.length === 2 && got[0] === want[0] && got[1] === want[1]) return e.id;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Match lineups : official XI on the pitch once ESPN publishes it (~1h before
// kickoff), otherwise `pending` (the UI then shows the full squad instead).
// ESPN has no predicted-lineup feed, so there's no "projected" path here.
// ---------------------------------------------------------------------------
export async function getMatchLineups(homeName, awayName, date) {
  const eventId = await findEventId(homeName, awayName, date);
  if (!eventId) return { status: 'pending', eventId: null };
  let summary;
  try { summary = await apiGet(`${EBASE}/summary?event=${eventId}`, 120); }
  catch { return { status: 'pending', eventId }; }

  const lineups = [];
  for (const r of summary?.rosters || []) {
    const starters = (r.roster || []).filter((e) => e.starter);
    if (starters.length === 0) continue;
    const xi = starters.map((e) => ({
      id: e.athlete?.id,
      name: e.athlete?.displayName,
      number: e.jersey ?? e.athlete?.jersey ?? null,
      pos: posLetter(e.position?.abbreviation),
      _abbr: e.position?.abbreviation || '',
      grid: null,
    }));
    assignGrids(xi);
    lineups.push({
      team: { name: r.team?.displayName },
      formation: r.formation || null,
      startXI: xi.map((s) => ({ player: { id: s.id, name: s.name, number: s.number, pos: s.pos, grid: s.grid } })),
      coach: null,
    });
  }
  if (lineups.length === 0) return { status: 'pending', eventId };
  return { status: 'official', eventId, lineups };
}

// ---------------------------------------------------------------------------
// Player profile : ESPN gives rich BIO (photo, age, nationality, height/weight,
// position). Deep per-player season stats aren't available on the free feed, so
// `wc`/`club` are null here; the route layers in verified career WC goals from
// the static backbone, and WC match stats can be added from box scores later.
// ---------------------------------------------------------------------------
export async function getPlayerProfile(playerId) {
  let d;
  try { d = await apiGet(`${EWEB}/athletes/${playerId}`, 86400); }
  catch { return { player: null, wc: null, club: null, otherClubCount: 0 }; }
  const a = d?.athlete || d;
  if (!a?.displayName) return { player: null, wc: null, club: null, otherClubCount: 0 };
  return {
    player: {
      id: a.id,
      name: a.displayName,
      age: a.age ?? null,
      nationality: a.citizenship || a.birthPlace?.country || a.flag?.alt || null,
      height: a.displayHeight || null,
      weight: a.displayWeight || null,
      position: a.position?.displayName || a.position?.name || null,
      photo: HEADSHOT(playerId),
      injured: Array.isArray(a.injuries) && a.injuries.length > 0,
    },
    wc: null,
    club: null,
    otherClubCount: 0,
  };
}

// ---------------------------------------------------------------------------
// Team form : ESPN exposes no national-team cross-competition results, so there
// is no recent-form feed. Returns an empty/low-sample shape pre-tournament; can
// be extended to read fifa.world results once World Cup matches are played.
// ---------------------------------------------------------------------------
export async function getTeamForm(teamName) {
  const id = await idFor(teamName);
  return {
    teamId: id, lowSample: true, played: 0,
    wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gfAvg: 0, gaAvg: 0,
    cleanSheets: 0, failedToScore: 0, formString: '', recent: [],
    strengths: [], weaknesses: [],
  };
}

// ---------------------------------------------------------------------------
// Matchup : derive an implied win/draw/win split from ESPN's pre-match odds
// (pickcenter) when present; otherwise unavailable (the UI hides the section).
// ---------------------------------------------------------------------------
function impliedFromAmerican(ml) {
  const n = Number(ml);
  if (!Number.isFinite(n) || n === 0) return null;
  return n > 0 ? 100 / (n + 100) : -n / (-n + 100);
}
export async function getMatchup(homeName, awayName, date) {
  const eventId = await findEventId(homeName, awayName, date);
  if (!eventId) return { available: false };
  let summary;
  try { summary = await apiGet(`${EBASE}/summary?event=${eventId}`, 3600); }
  catch { return { available: false }; }
  const pc = (summary?.pickcenter || [])[0];
  if (pc) {
    const ml = (o) => o?.moneyLine ?? o?.current?.moneyLine?.american ?? o?.moneyLine?.american;
    const ph = impliedFromAmerican(ml(pc.homeTeamOdds));
    const pa = impliedFromAmerican(ml(pc.awayTeamOdds));
    const pd = impliedFromAmerican(ml(pc.drawOdds));
    if (ph && pa) {
      const sum = ph + pa + (pd || 0);
      const pct = (x) => Math.round((x / sum) * 100);
      return {
        available: true,
        percent: { home: pct(ph), draw: pd ? pct(pd) : 0, away: pct(pa) },
        advice: pc.provider?.name ? `Implied from ${pc.provider.name} odds` : null,
      };
    }
  }
  return { available: false };
}
