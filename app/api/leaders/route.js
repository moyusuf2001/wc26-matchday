import { getLeaders } from '../../../lib/apiFootball';

// Tournament goal & assist leaders — aggregated from all completed matches.
// Revalidates every 5 minutes; once all group matches are done, set to 3600.
export const revalidate = 300;

export async function GET() {
  try {
    const data = await getLeaders();
    return Response.json(
      { ...data, updated: new Date().toISOString() },
      { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' } }
    );
  } catch (e) {
    return Response.json({ error: String(e.message || e), scorers: [], assisters: [] }, { status: 502 });
  }
}
