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
// Reverse alias : ESPN team name → static data name (for scoreboard matching).
// E.g. ESPN "South Korea" norm → "southkorea"; static "Korea Republic" → "korearepublic".
// ---------------------------------------------------------------------------
const REVERSE_ALIAS = Object.fromEntries(Object.entries(ALIAS).map(([k, v]) => [v, k]));
// Normalise an ESPN display name to match static data keys.
const normForStatic = (s) => { const n = norm(s); return REVERSE_ALIAS[n] || n; };

// ---------------------------------------------------------------------------
// Scoreboard : lightweight batch fetch of live/final scores for a date.
// Returns an array of score objects keyed by static-data-compatible name norms.
// ---------------------------------------------------------------------------
export async function getScoreboard(date) {
  if (!date) return [];
  let d;
  try { d = await apiGet(`${EBASE}/scoreboard?dates=${date}`, 60); } catch { return []; }
  const results = [];
  for (const e of d?.events || []) {
    const comp = e.competitions?.[0];
    if (!comp) continue;
    const st = comp.status?.type;
    const sn = st?.name || '';
    const isFinal = sn === 'STATUS_FINAL' || sn === 'STATUS_FULL_TIME' || sn === 'STATUS_FULL_PEN';
    const isHT = sn === 'STATUS_HALFTIME';
    const isLive = sn === 'STATUS_IN_PROGRESS' || sn === 'STATUS_SECOND_HALF' || sn === 'STATUS_EXTRA_TIME' || isHT;
    if (!isFinal && !isLive) continue;
    const hc = comp.competitors?.find(c => c.homeAway === 'home') || comp.competitors?.[0];
    const ac = comp.competitors?.find(c => c.homeAway === 'away') || comp.competitors?.[1];
    results.push({
      eventId: e.id,
      homeName: normForStatic(hc?.team?.displayName || hc?.team?.name || ''),
      awayName: normForStatic(ac?.team?.displayName || ac?.team?.name || ''),
      homeScore: hc?.score != null ? String(hc.score) : null,
      awayScore: ac?.score != null ? String(ac.score) : null,
      status: isFinal ? 'final' : 'live',
      statusLabel: isFinal ? 'FT' : isHT ? 'HT' : (comp.status?.displayClock || 'Live'),
    });
  }
  return results;
}

// ---------------------------------------------------------------------------
// Match result : full result + match events + team stats + player stats.
// Parses the ESPN summary endpoint far more deeply than getMatchLineups.
// ---------------------------------------------------------------------------
export async function getMatchResult(homeName, awayName, date) {
  const eventId = await findEventId(homeName, awayName, date);
  if (!eventId) return { status: 'scheduled', eventId: null };

  let summary;
  try { summary = await apiGet(`${EBASE}/summary?event=${eventId}`, 60); }
  catch { return { status: 'scheduled', eventId }; }

  const comp = summary?.header?.competitions?.[0];
  if (!comp) return { status: 'scheduled', eventId };

  const st = comp.status?.type;
  const sn = st?.name || '';
  const isFinal = sn === 'STATUS_FINAL' || sn === 'STATUS_FULL_TIME' || sn === 'STATUS_FULL_PEN';
  const isHT = sn === 'STATUS_HALFTIME';
  const isLive = sn === 'STATUS_IN_PROGRESS' || sn === 'STATUS_SECOND_HALF' || sn === 'STATUS_EXTRA_TIME' || isHT;
  if (!isFinal && !isLive) return { status: 'scheduled', eventId };

  const hComp = comp.competitors?.find(c => c.homeAway === 'home') || comp.competitors?.[0];
  const aComp = comp.competitors?.find(c => c.homeAway === 'away') || comp.competitors?.[1];
  const homeScore = hComp?.score != null ? String(hComp.score) : null;
  const awayScore = aComp?.score != null ? String(aComp.score) : null;
  const homeId = hComp?.team?.id ? String(hComp.team.id) : null;
  const awayId = aComp?.team?.id ? String(aComp.team.id) : null;

  // Match events from keyEvents (goals, cards, substitutions).
  // ESPN's `keyEvents` array has richer data than `details` for completed matches.
  const events = [];
  const KEY_TYPE_MAP = {
    'goal': 'goal', 'goal---header': 'goal', 'goal---foot': 'goal',
    'own-goal': 'own-goal',
    'penalty': 'penalty', 'penalty-goal': 'penalty',
    'yellow-card': 'yellow-card',
    'red-card': 'red-card',
    'yellow/red-card': 'red-card', 'second-yellow': 'red-card',
  };
  for (const ke of summary?.keyEvents || []) {
    const rawType = (ke.type?.type || '').toLowerCase();
    const type = KEY_TYPE_MAP[rawType] || (ke.scoringPlay ? 'goal' : null);
    if (!type) continue;
    const minute = ke.clock?.displayValue || '';
    const teamId = ke.team?.id ? String(ke.team.id) : null;
    const athletes = (ke.participants || []).map(p => ({
      id: String(p.athlete?.id || ''), name: p.athlete?.displayName || '',
    }));
    // Fall back to shortText for name if no participants
    const text = ke.shortText || ke.text || '';
    events.push({ type, minute, teamId, athletes, text });
  }
  // Already in chronological order but sort defensively by clock value.
  events.sort((a, b) => {
    const parseMin = (m) => parseInt((m || '0').replace(/\D.*$/, ''), 10) || 0;
    return parseMin(a.minute) - parseMin(b.minute);
  });

  // Team stats from boxscore.teams — all categories with group labels.
  // passPct / shotPct / tacklePct / crossPct / longballPct stored as 0-1 fractions → convert to %.
  const STAT_MAP = [
    // group, espnKey, display label, unit, isFraction
    ['attack',    'totalShots',         'Shots',           '',  false],
    ['attack',    'shotsOnTarget',       'On Target',       '',  false],
    ['attack',    'blockedShots',        'Blocked Shots',   '',  false],
    ['attack',    'shotPct',             'Shot Accuracy',   '%', true],
    ['attack',    'wonCorners',          'Corners',         '',  false],
    ['passing',   'possessionPct',       'Possession',      '%', false],
    ['passing',   'totalPasses',         'Passes',          '',  false],
    ['passing',   'accuratePasses',      'Accurate Passes', '',  false],
    ['passing',   'passPct',             'Pass Accuracy',   '%', true],
    ['passing',   'totalCrosses',        'Crosses',         '',  false],
    ['passing',   'accurateCrosses',     'Accurate Crosses','',  false],
    ['passing',   'totalLongBalls',      'Long Balls',      '',  false],
    ['passing',   'accurateLongBalls',   'Acc. Long Balls', '',  false],
    ['defending', 'totalTackles',        'Tackles',         '',  false],
    ['defending', 'effectiveTackles',    'Tackles Won',     '',  false],
    ['defending', 'tacklePct',           'Tackle Win %',    '%', true],
    ['defending', 'interceptions',       'Interceptions',   '',  false],
    ['defending', 'effectiveClearance',  'Clearances',      '',  false],
    ['discipline','foulsCommitted',      'Fouls',           '',  false],
    ['discipline','yellowCards',         'Yellow Cards',    '',  false],
    ['discipline','redCards',            'Red Cards',       '',  false],
    ['discipline','offsides',            'Offsides',        '',  false],
    ['discipline','saves',               'Saves',           '',  false],
  ];
  const teamStats = [];
  for (const bt of summary?.boxscore?.teams || []) {
    const tid = bt.team?.id ? String(bt.team.id) : null;
    const raw = {};
    for (const s of bt.statistics || []) raw[s.name] = s.displayValue;
    const stats = [];
    for (const [group, key, label, unit, isFraction] of STAT_MAP) {
      if (raw[key] == null) continue;
      const rawVal = raw[key];
      const value = isFraction
        ? String(Math.round(parseFloat(rawVal) * 100)) + '%'
        : rawVal + unit;
      stats.push({ key, label, group, value });
    }
    teamStats.push({ teamId: tid, homeAway: bt.homeAway || null, stats });
  }

  // Player stats from rosters[].roster[].stats[] (each player has named stats).
  const playerStatsMap = {};
  for (const r of summary?.rosters || []) {
    const tid = r.team?.id ? String(r.team.id) : null;
    for (const rp of r.roster || []) {
      const pid = rp.athlete?.id ? String(rp.athlete.id) : null;
      if (!pid) continue;
      const raw = {};
      for (const s of rp.stats || []) raw[s.name] = s.value;
      playerStatsMap[pid] = {
        id: pid,
        name: rp.athlete?.displayName || '',
        shortName: rp.athlete?.shortName || '',
        teamId: tid,
        jersey: rp.jersey != null ? String(rp.jersey) : null,
        pos: rp.position?.abbreviation || rp.position?.name?.slice(0, 3) || '',
        starter: rp.starter || false,
        subbedIn: rp.subbedIn || false,
        subbedOut: rp.subbedOut || false,
        goals: raw.totalGoals || 0,
        assists: raw.goalAssists || 0,
        ownGoals: raw.ownGoals || 0,
        yellowCards: raw.yellowCards || 0,
        redCards: raw.redCards || 0,
        shots: raw.totalShots || 0,
        shotsOnTarget: raw.shotsOnTarget || 0,
        saves: raw.saves || 0,
        fouls: raw.foulsCommitted || 0,
        photo: rp.athlete?.id ? HEADSHOT(rp.athlete.id) : null,
      };
    }
  }

  // Compute Man of the Match: weighted score from available stats.
  // Only consider players who actually played (starter or came on as sub).
  const allPlayers = Object.values(playerStatsMap);
  const played = allPlayers.filter((p) => p.starter || p.subbedIn);
  const motmScore = (p) =>
    p.goals * 6 +
    p.assists * 4 +
    p.shotsOnTarget * 0.8 +
    p.shots * 0.3 +
    p.saves * 1.5 +
    p.ownGoals * -5 +
    p.yellowCards * -1 +
    p.redCards * -4;
  const motm = played.length
    ? played.reduce((best, p) => motmScore(p) > motmScore(best) ? p : best, played[0])
    : null;

  return {
    status: isFinal ? 'final' : 'live',
    statusLabel: isFinal ? 'FT' : isHT ? 'HT' : (comp.status?.displayClock || 'Live'),
    eventId,
    homeId,
    awayId,
    homeScore,
    awayScore,
    events,
    teamStats,
    playerStats: allPlayers,
    motm,
  };
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Leaders : aggregate goals + assists across all completed tournament matches.
// Iterates every finished event since Jun 11 and sums per-player roster stats.
// Cached aggressively — only stale when a new match finishes.
// ---------------------------------------------------------------------------
export async function getLeaders() {
  // Build a YYYYMMDD date range from tournament start to today (server time).
  const start = '20260611';
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const todayStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;

  // Fetch scoreboard for the whole range to find completed event IDs.
  let sb;
  try { sb = await apiGet(`${EBASE}/scoreboard?dates=${start}-${todayStr}&limit=200`, 300); }
  catch { return { scorers: [], assisters: [] }; }

  const DONE = new Set(['STATUS_FINAL', 'STATUS_FULL_TIME', 'STATUS_FULL_PEN']);
  const completedIds = (sb?.events || [])
    .filter((e) => DONE.has(e.competitions?.[0]?.status?.type?.name))
    .map((e) => e.id);

  if (!completedIds.length) return { scorers: [], assisters: [] };

  // Fetch each summary (cached 1 hour since finished matches don't change).
  const playerTotals = {};
  const keeperTotals = {};
  const cardTotals = {};

  const fetchSummary = async (eventId) => {
    let summary;
    try { summary = await apiGet(`${EBASE}/summary?event=${eventId}`, 3600); }
    catch { return; }
    for (const r of summary?.rosters || []) {
      const teamName = r.team?.displayName || '';
      for (const rp of r.roster || []) {
        const pid = rp.athlete?.id ? String(rp.athlete.id) : null;
        if (!pid) continue;
        const raw = {};
        for (const s of rp.stats || []) raw[s.name] = s.value;
        const posAbbr = rp.position?.abbreviation || '';
        const isGK = posAbbr === 'G' || posAbbr === 'GK' || rp.position?.name === 'Goalkeeper';
        const g = raw.totalGoals || 0;
        const a = raw.goalAssists || 0;
        const apps = raw.appearances || 0;

        // Outfield scoring/assists
        if (g > 0 || a > 0) {
          if (!playerTotals[pid]) {
            playerTotals[pid] = {
              id: pid, name: rp.athlete?.displayName || '',
              shortName: rp.athlete?.shortName || '', teamName,
              photo: HEADSHOT(pid), goals: 0, assists: 0, shots: 0, shotsOnTarget: 0,
            };
          }
          playerTotals[pid].goals += g;
          playerTotals[pid].assists += a;
          playerTotals[pid].shots += raw.totalShots || 0;
          playerTotals[pid].shotsOnTarget += raw.shotsOnTarget || 0;
        }

        // Goalkeeper stats
        if (isGK && apps > 0) {
          const sv = raw.saves || 0;
          const gc = raw.goalsConceded || 0;
          if (!keeperTotals[pid]) {
            keeperTotals[pid] = {
              id: pid, name: rp.athlete?.displayName || '',
              shortName: rp.athlete?.shortName || '', teamName,
              photo: HEADSHOT(pid), saves: 0, goalsConceded: 0,
              cleanSheets: 0, matches: 0,
            };
          }
          keeperTotals[pid].saves += sv;
          keeperTotals[pid].goalsConceded += gc;
          keeperTotals[pid].matches += 1;
          if (gc === 0) keeperTotals[pid].cleanSheets += 1;
        }

        // Discipline (anyone with a card)
        const yc = raw.yellowCards || 0;
        const rc = raw.redCards || 0;
        if (yc > 0 || rc > 0) {
          if (!cardTotals[pid]) {
            cardTotals[pid] = {
              id: pid, name: rp.athlete?.displayName || '',
              shortName: rp.athlete?.shortName || '', teamName,
              photo: HEADSHOT(pid), yellowCards: 0, redCards: 0,
            };
          }
          cardTotals[pid].yellowCards += yc;
          cardTotals[pid].redCards += rc;
        }
      }
    }
  };

  // Process in batches of 6 to avoid hammering ESPN.
  for (let i = 0; i < completedIds.length; i += 6) {
    await Promise.all(completedIds.slice(i, i + 6).map(fetchSummary));
  }

  const all = Object.values(playerTotals);
  const scorers = all
    .filter((p) => p.goals > 0)
    .sort((a, b) => b.goals - a.goals || b.shotsOnTarget - a.shotsOnTarget || b.shots - a.shots)
    .slice(0, 15);
  const assisters = all
    .filter((p) => p.assists > 0)
    .sort((a, b) => b.assists - a.assists || b.goals - a.goals)
    .slice(0, 15);
  const keepers = Object.values(keeperTotals)
    .sort((a, b) => b.cleanSheets - a.cleanSheets || b.saves - a.saves)
    .slice(0, 15);
  const discipline = Object.values(cardTotals)
    .sort((a, b) => (b.redCards * 3 + b.yellowCards) - (a.redCards * 3 + a.yellowCards))
    .slice(0, 15);

  return { scorers, assisters, keepers, discipline };
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
