// ---------------------------------------------------------------------------
// Player-photo layer — API-Football (api-sports.io), using your free-tier key.
// The /players/squads endpoint is NOT season-locked, so it works on the free
// plan and returns a real headshot URL (media.api-sports.io) for nearly every
// player. We use it only for photos; names, lineups and the rest stay on ESPN.
//
// Returns an empty map if no key is set, so the app still works key-less
// (squad rows just fall back to a monogram).
// ---------------------------------------------------------------------------

const BASE = 'https://v3.football.api-sports.io';

async function afGet(path, revalidate) {
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${BASE}${path}`, { headers: { 'x-apisports-key': key }, next: { revalidate } });
    if (!res.ok) return null;
    const j = await res.json();
    if (j.errors && Object.keys(j.errors).length) return null;
    return j.response || [];
  } catch {
    return null;
  }
}

const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');

// Country-name → API-Football search term, where the two differ.
const SEARCH = {
  korearepublic: 'south korea', drcongo: 'congo dr', unitedstates: 'usa',
  turkiye: 'turkey', ivorycoast: 'ivory coast', bosniaherzegovina: 'bosnia',
};

// match key = first initial + surname, e.g. "Guillermo Ochoa" / "G. Ochoa" → "g:ochoa"
const lastTok = (s) => norm((s || '').trim().split(/\s+/).pop());
function afKey(afName) {
  const m = /^([A-Za-z])\.?\s+(.+)$/.exec((afName || '').trim()); // "G. Ochoa"
  if (m) return norm(m[1]).charAt(0) + ':' + lastTok(m[2]);
  const t = (afName || '').trim().split(/\s+/);
  return norm(t[0]).charAt(0) + ':' + lastTok(afName);
}

let _ids = {};
async function afTeamId(name) {
  const n = norm(name);
  if (n in _ids) return _ids[n];
  const term = SEARCH[n] || name;
  const rows = await afGet(`/teams?search=${encodeURIComponent(term)}`, 604800);
  let id = null;
  if (rows && rows.length) {
    const nat = rows.filter((r) => r.team?.national);
    const exact = nat.find((r) => norm(r.team.name) === n) || nat.find((r) => norm(r.team.name) === norm(term));
    id = (exact || nat[0] || rows[0])?.team?.id ?? null;
  }
  _ids[n] = id;
  return id;
}

// { "g:ochoa": photoUrl, "L:ochoa": photoUrl } — keyed by initial+surname and a
// surname-only fallback, so the client can match ESPN's full names robustly.
export async function getSquadPhotos(teamName) {
  const id = await afTeamId(teamName);
  if (!id) return {};
  const rows = await afGet(`/players/squads?team=${id}`, 3600);
  const players = rows?.[0]?.players || [];
  const map = {};
  for (const p of players) {
    if (!p.photo) continue;
    map[afKey(p.name)] = p.photo;
    const lk = 'L:' + lastTok(p.name);
    if (!(lk in map)) map[lk] = p.photo;
  }
  return map;
}
