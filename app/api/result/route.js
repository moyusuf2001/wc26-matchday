import { getMatchResult } from '../../../lib/apiFootball';

// Full match result: scoreline, match events, team stats, player stats.
// Revalidates every 60 s for live matches; completed matches get a long TTL.
export const revalidate = 60;

export async function GET(request) {
  const p = new URL(request.url).searchParams;
  const home = p.get('home'), away = p.get('away'), date = p.get('date');
  if (!home || !away) return Response.json({ error: 'home and away required' }, { status: 400 });
  try {
    const data = await getMatchResult(home, away, date);
    const maxAge = data.status === 'final' ? 86400 : data.status === 'live' ? 60 : 300;
    return Response.json(
      { ...data, updated: new Date().toISOString() },
      { headers: { 'Cache-Control': `s-maxage=${maxAge}, stale-while-revalidate=86400` } }
    );
  } catch (e) {
    return Response.json({ error: String(e.message || e), status: 'error' }, { status: 502 });
  }
}
