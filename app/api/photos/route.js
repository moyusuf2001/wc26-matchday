import { getSquadPhotos } from '../../../lib/apiSports';

// Player headshots for a team, keyed by initial+surname. Cached a week (squads
// change slowly) to keep API-Football calls minimal on the free tier.
export const revalidate = 3600;

export async function GET(request) {
  const team = new URL(request.url).searchParams.get('team');
  if (!team) return Response.json({ photos: {} });
  try {
    const photos = await getSquadPhotos(team);
    return Response.json({ photos }, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } });
  } catch (e) {
    return Response.json({ photos: {} });
  }
}
