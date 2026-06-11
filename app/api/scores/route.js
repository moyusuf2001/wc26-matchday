import { getScoreboard } from '../../../lib/apiFootball';

// Batch live/final scores for all matches on a given date (YYYYMMDD).
// Short TTL so live scores refresh every minute; completed matches are stable.
export const revalidate = 60;

export async function GET(request) {
  const p = new URL(request.url).searchParams;
  const date = p.get('date');
  if (!date) return Response.json({ error: 'date required' }, { status: 400 });
  try {
    const scores = await getScoreboard(date);
    const maxAge = scores.every(s => s.status === 'final') ? 3600 : 60;
    return Response.json(
      { scores, updated: new Date().toISOString() },
      { headers: { 'Cache-Control': `s-maxage=${maxAge}, stale-while-revalidate=300` } }
    );
  } catch (e) {
    return Response.json({ error: String(e.message || e), scores: [] }, { status: 502 });
  }
}
