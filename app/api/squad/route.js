import { getSquad } from '../../../lib/apiFootball';
export const revalidate = 86400;
export async function GET(request) {
  const team = new URL(request.url).searchParams.get('team');
  if (!team) return Response.json({ error: 'team query required' }, { status: 400 });
  try {
    const data = await getSquad(team);
    return Response.json(data, { headers: { 'Cache-Control': 's-maxage=86400, stale-while-revalidate' } });
  } catch (e) {
    return Response.json({ error: String(e.message || e), players: [] }, { status: 502 });
  }
}
