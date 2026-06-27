import { getStandings } from '../../../lib/apiFootball';
import { M, M2, M3, T } from '../../../lib/staticData';

// Revalidate every 60s during MD3 live play.
export const revalidate = 60;

export async function GET() {
  try {
    const allFixtures = [...M, ...M2, ...M3];
    const data = await getStandings(allFixtures, T);
    return Response.json(data, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' },
    });
  } catch (e) {
    return Response.json(
      { error: String(e.message || e), groups: {} },
      { status: 502 }
    );
  }
}
