import { getPlayerProfile } from '../../../lib/apiFootball';
import { T } from '../../../lib/staticData';

export const revalidate = 3600;

// Normalize names for matching the live player against our static backbone
// (decompose accents, then keep letters only): "Vinícius Júnior" → "viniciusjunior".
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');

export async function GET(request) {
  const sp = new URL(request.url).searchParams;
  const id = sp.get('id');
  const team = sp.get('team'); // 3-letter static code, optional
  if (!id) return Response.json({ error: 'id required' }, { status: 400 });
  try {
    const data = await getPlayerProfile(id);
    // Attach verified career World Cup goals from the static backbone when the
    // live player matches one of our marquee names : useful pre-tournament when
    // the live WC stat line is still empty.
    if (team && T[team] && data.player?.name) {
      const target = norm(data.player.name);
      const match = (T[team].players || []).find((p) => {
        const n = norm(p.nm);
        return n && (n === target || target.includes(n) || n.includes(target));
      });
      if (match?.wc) {
        const byYear = Object.entries(match.wc).filter(([, n]) => n > 0);
        const total = Object.values(match.wc).reduce((s, n) => s + n, 0);
        data.careerWcGoals = { total, byYear };
      }
    }
    return Response.json(data, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' } });
  } catch (e) {
    return Response.json({ error: String(e.message || e) }, { status: 502 });
  }
}
