import { getLeaders } from '../../../lib/apiFootball';

// Tournament leaders — aggregated from all completed AND live matches.
// Revalidates every 60 s so in-progress goals appear quickly.
export const revalidate = 60;

export async function GET() {
  try {
    const data = await getLeaders();
    return Response.json(
      { ...data, updated: new Date().toISOString() },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (e) {
    return Response.json({ error: String(e.message || e), scorers: [], assisters: [] }, { status: 502 });
  }
}
