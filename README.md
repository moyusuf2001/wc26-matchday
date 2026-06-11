# WC26 · Matchday Intelligence

A 2026 FIFA World Cup matchday companion. Verified fixtures, venues, odds-based
projected results and career World Cup goals render instantly from static data;
the live layer — pulled from **ESPN's free public API through cached, server-side
routes (no API key required)** — adds, inside each match:

- **Starting lineups** on a formation pitch: the real XI the moment ESPN
  publishes it (~1h before kickoff). Until then the full squad is the pre-match
  view (ESPN has no predicted-lineup feed).
- **Full squads**, with **every player tappable** for a profile: photo, age,
  nationality, height/weight, position + verified career WC goals (and live
  World Cup match stats once they play).
- **Matchup** — an implied win/draw/win split from ESPN's pre-match odds when
  available, alongside the static "tale of the tape" pedigree.

## Architecture (why it's accurate *and* stable)
- **Static backbone** (`lib/staticData.js`): fixtures, kickoff times, venues,
  verdicts, WC pedigree, and hand-verified marquee career goals. Always works,
  even offline — no single point of failure.
- **Live layer** (`app/api/*` + `lib/apiFootball.js`): squads, lineups, player
  bios and matchup from ESPN (`site.api.espn.com`, league `fifa.world`), cached
  via Next.js `revalidate`. If ESPN hiccups, the page still shows everything from
  the backbone and the live sections show a friendly empty state.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000  — no API key needed
```
That's it. ESPN's endpoints are public, so there's nothing to sign up for. The
app runs fully without any key.

**Optional — player headshots:** real photos for every squad player come from
API-Football's `/players/squads` (which works on its **free** plan). Put your key
in `.env.local` as `API_FOOTBALL_KEY=...` and they light up automatically; without
it, each player just shows a clean initial monogram. (Photos are served from
`media.api-sports.io` and matched onto ESPN's squads by name; calls are cached for
a week, so this stays well under the free 100/day limit.)

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → **Add New → Project → Import** the repo (framework auto-detects
   as Next.js — no build settings to change).
3. *(optional)* In **Project → Settings → Environment Variables**, add
   `NEXT_PUBLIC_SITE_URL` = your live URL (e.g. https://wc26.vercel.app) so the
   LinkedIn/Twitter preview image resolves. No data keys are required.
4. Deploy. Every `git push` redeploys automatically.

## Notes
- **No key, no quota.** ESPN's API is free and public. Responses are still cached
  (`revalidate`) for speed; raise/lower the numbers in the route files to taste.
- **Lineups** publish on the pitch ~1h before kickoff; before that, that section
  says so and the full squad below is the pre-match view.
- **Player stats**: ESPN provides rich bios but not deep per-player season stats,
  so profiles are bio + career-WC-goals focused; live World Cup match stats can
  be layered in from box scores once games are played.
- **Team form / strengths & weaknesses**: ESPN exposes no national-team
  cross-competition results, so recent-form analysis fills in during the
  tournament; the static tale of the tape carries the head-to-head pedigree now.
- **Unofficial source**: ESPN's JSON API is undocumented and can change. For a
  commercial product, license a proper provider — the previous API-Football
  implementation is preserved in `lib/apiFootball.apisports.bak` (a paid plan
  unlocks the 2026 season + expected XIs + deep stats; restore it by copying it
  back over `lib/apiFootball.js`).
- Pinned to Next.js 14.2.35 (patched). `npm run build` to verify, `npm start` to
  serve the production build.

## Project map
```
app/
  layout.js                 root + metadata (OG/Twitter)
  page.js                   server page — renders static data + <MatchExplorer/>
  globals.css               styles
  api/squad/route.js        GET ?team=Name              → full squad (roster)
  api/lineups/route.js      GET ?home&away&date         → official XI, else pending
  api/player/route.js       GET ?id[&team]              → player bio + career WC goals
  api/team-form/route.js    GET ?team                   → WC form (empty pre-tournament)
  api/matchup/route.js      GET ?home&away&date         → implied odds split
components/
  MatchExplorer.jsx         client UI: list, match modal, pitch, player modal
lib/
  staticData.js             verified backbone (24 MD1 fixtures, 48 teams)
  apiFootball.js            server-only ESPN helper + caching + id resolution
  apiFootball.apisports.bak previous API-Football implementation (not imported)
public/og.png               social preview image
```
