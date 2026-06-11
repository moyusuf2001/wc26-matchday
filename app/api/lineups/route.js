import { getMatchLineups } from '../../../lib/apiFootball';

// Official lineups once ESPN publishes them (~1h before KO), else status:'pending'.
// `date` (YYYYMMDD) is needed to find the ESPN fixture for the tie.
export const revalidate = 120;

export async function GET(request) {
  const p = new URL(request.url).searchParams;
  const home = p.get('home'), away = p.get('away'), date = p.get('date');
  if (!home || !away) return Response.json({ error: 'home and away required' }, { status: 400 });
  try {
    const data = await getMatchLineups(home, away, date);
    return Response.json({ ...data, updated: new Date().toISOString() }, { headers: { 'Cache-Control': 's-maxage=120, stale-while-revalidate=86400' } });
  } catch (e) {
    return Response.json({ error: String(e.message || e), status: 'error' }, { status: 502 });
  }
}
