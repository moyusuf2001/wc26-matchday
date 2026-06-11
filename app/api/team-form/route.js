import { getTeamForm } from '../../../lib/apiFootball';

export const revalidate = 21600; // 6h : recent form changes slowly

export async function GET(request) {
  const p = new URL(request.url).searchParams;
  const team = p.get('team');
  let last = parseInt(p.get('last') || '8', 10);
  if (!Number.isFinite(last)) last = 8;
  last = Math.max(5, Math.min(10, last));
  if (!team) return Response.json({ error: 'team required' }, { status: 400 });
  try {
    const data = await getTeamForm(team, last);
    return Response.json(data, { headers: { 'Cache-Control': 's-maxage=21600, stale-while-revalidate' } });
  } catch (e) {
    return Response.json({ error: String(e.message || e) }, { status: 502 });
  }
}
