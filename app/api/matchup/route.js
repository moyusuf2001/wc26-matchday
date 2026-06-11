import { getMatchup } from '../../../lib/apiFootball';

export const revalidate = 3600;

export async function GET(request) {
  const p = new URL(request.url).searchParams;
  const home = p.get('home'), away = p.get('away'), date = p.get('date');
  if (!home || !away) return Response.json({ error: 'home and away required' }, { status: 400 });
  try {
    const data = await getMatchup(home, away, date);
    return Response.json(data, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' } });
  } catch (e) {
    return Response.json({ available: false, error: String(e.message || e) });
  }
}
