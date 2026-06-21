import { getStandings } from '../../../lib/apiFootball';
import { M, M2, T } from '../../../lib/staticData';

// Revalidate every 5 min during live play; completed matches are stable.
export const revalidate = 300;

export async function GET() {
  try {
    const allFixtures = [...M, ...M2];
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
