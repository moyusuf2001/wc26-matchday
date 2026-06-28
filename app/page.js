'use client';
import { useState, useEffect } from 'react';
import { T, M, M2, M3, KO } from '../lib/staticData';
import { TOURNAMENT_THEMES } from '../lib/editorial';
import MatchExplorer from '../components/MatchExplorer';
import TournamentLeaders from '../components/TournamentLeaders';
import GroupStandings from '../components/GroupStandings';
import KnockoutBracket from '../components/KnockoutBracket';
import BracketView from '../components/BracketView';

const THEME_TONE = {
  gold: { color: 'var(--gold)', border: 'rgba(243,200,104,.35)', bg: 'rgba(243,200,104,.06)' },
  teal: { color: 'var(--teal)', border: 'rgba(79,224,204,.35)', bg: 'rgba(79,224,204,.06)' },
  coral: { color: 'var(--coral)', border: 'rgba(255,122,107,.35)', bg: 'rgba(255,122,107,.06)' },
};

function ThemeCard({ t }) {
  const s = THEME_TONE[t.tone] || THEME_TONE.gold;
  return (
    <div className="thcard" style={{ borderColor: s.border, background: `linear-gradient(180deg, ${s.bg}, transparent)` }}>
      <div className="thcard-label" style={{ color: s.color }}>{t.label}</div>
      <div className="thcard-pick">{t.pick}</div>
      <p className="thcard-detail">{t.detail}</p>
    </div>
  );
}

function useTournamentSnapshot() {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [ldRes, stRes] = await Promise.all([
          fetch('/api/leaders'),
          fetch('/api/standings'),
        ]);
        const ld = await ldRes.json();
        const st = await stRes.json();

        // Top scorer
        const top = ld.scorers?.[0];
        const topScorer = top
          ? `${top.shortName || top.name} · ${top.goals} goal${top.goals !== 1 ? 's' : ''}`
          : null;

        // Already qualified (6 pts from 2 played) and on the brink (0 pts, 2 played)
        const qualified = [];
        const brink = [];
        for (const rows of Object.values(st.groups || {})) {
          for (const row of rows) {
            const team = T[row.code];
            if (!team) continue;
            if (row.p >= 2 && row.pts === 6) qualified.push(team.n);
            if (row.p >= 2 && row.pts === 0) brink.push(team.n);
          }
        }

        setSnap({
          topScorer,
          qualified: qualified.length ? qualified.join(' · ') : null,
          brink: brink.length ? brink.join(' · ') : null,
        });
      } catch {
        // silently fall back to defaults
      }
    }
    load();
  }, []);

  return snap;
}

export default function Page() {
  const [statsOpen, setStatsOpen] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState('matchday');
  const [theme, setTheme] = useState('light');
  const snap = useTournamentSnapshot();

  // Sync with localStorage on mount, respecting any previously saved preference
  useEffect(() => {
    const saved = localStorage.getItem('wc26-theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('wc26-theme', next);
  }

  return (
    <>
      <header className="top">
        <div className="topbar">
          <div className="mark">
            <div className="glyph">WC<b>26</b></div>
            <div className="sub">Matchday&nbsp;Intelligence</div>
          </div>
          <div className="host">Jun 11 to Jul 19 · <b>USA</b> · <b>CAN</b> · <b>MEX</b></div>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle colour theme">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        <div className="tabs" role="tablist" aria-label="Matchday">
          <button className="tab" role="tab" aria-selected={activeMainTab === 'matchday'} onClick={() => setActiveMainTab('matchday')}>Matchday 1</button>
          <button className="tab" role="tab" aria-selected={activeMainTab === 'md2'} onClick={() => setActiveMainTab('md2')}>Matchday 2</button>
          <button className="tab" role="tab" aria-selected={activeMainTab === 'md3'} onClick={() => setActiveMainTab('md3')}>Matchday 3</button>
          <button className={`tab ${activeMainTab === 'knockouts' ? 'tab-active' : ''}`} role="tab" aria-selected={activeMainTab === 'knockouts'} onClick={() => setActiveMainTab('knockouts')}>Knockouts</button>
          <button className={`tab ${activeMainTab === 'bracket' ? 'tab-active' : ''}`} role="tab" aria-selected={activeMainTab === 'bracket'} onClick={() => setActiveMainTab('bracket')}>Bracket</button>
          <button className={`tab tab-stats ${activeMainTab === 'standings' ? 'tab-active' : ''}`} role="tab" aria-selected={activeMainTab === 'standings'} onClick={() => setActiveMainTab('standings')} style={{ marginLeft: 'auto' }}>📊 Standings</button>
          <button className={`tab tab-stats ${activeMainTab === 'stats' ? 'tab-active' : ''}`} role="tab" aria-selected={activeMainTab === 'stats'} onClick={() => setActiveMainTab('stats')}>🏅 Stats</button>
        </div>
      </header>

      <main className="wrap">
        {activeMainTab === 'matchday' && (
          <>
            <section className="hero">
              <div className="eyebrow">FIFA World Cup 26 · Matchday 1</div>
              <h1>The tournament opener. Every match, read for you.</h1>
              <p>Matchday 1 is done. All 24 opening fixtures are wrapped up with results, match reports, lineups and full player stats. Tap any fixture to read the full breakdown of what actually happened.</p>
              <div className="ctx">
                <div className="pill"><span>Top scorer</span><b>{snap?.topScorer ?? 'Loading…'}</b></div>
                <div className="pill"><span>Biggest result</span><b>Germany 7–1 Curaçao</b></div>
                {snap?.qualified && <div className="pill"><span>Already qualified</span><b>{snap.qualified}</b></div>}
                {snap?.brink && <div className="pill"><span>On the brink</span><b>{snap.brink}</b></div>}
              </div>
            </section>

            <section className="themes">
              <div className="themes-hd">
                <h2>What the tournament has told us</h2>
                <div className="rule" />
              </div>
              <div className="themes-grid">
                {TOURNAMENT_THEMES.map((t, i) => <ThemeCard key={i} t={t} />)}
              </div>
            </section>

            <MatchExplorer T={T} M={M} />

            <p className="scope" style={{ marginTop: 38 }}>
              Projected results blend the betting markets with World Cup pedigree; they are probabilities, not promises. Squads, starting lineups and player profiles are pulled live from ESPN&apos;s public feed; the verdicts, venues and verified career-goal records render instantly, even if the live feed is unavailable.
            </p>
          </>
        )}

        {activeMainTab === 'md2' && (
          <>
            <section className="hero">
              <div className="eyebrow">FIFA World Cup 26 · Matchday 2</div>
              <h1>Group standings start to crystallize.</h1>
              <p>Some teams edge toward the Round of 32. Others face must-win situations. Open any fixture for the live score, the match report, and full tactical analysis. Starting XIs appear the moment they drop.</p>
              <div className="ctx">
                <div className="pill"><span>Dates</span><b>June 18 <i>–</i> June 23</b></div>
                <div className="pill"><span>Matches</span><b>24 fixtures · 12 groups</b></div>
                <div className="pill"><span>Stakes</span><b>Early qualification spots decided</b></div>
                <div className="pill"><span>Watch</span><b>Haaland · Messi · Son · Mbappé</b></div>
              </div>
            </section>
            <MatchExplorer T={T} M={M2} />
            <p className="scope" style={{ marginTop: 38 }}>
              Projected results and editorial analysis reflect pre-match expectations. Live scores and match reports replace the preview automatically once a fixture kicks off.
            </p>
          </>
        )}

        {activeMainTab === 'md3' && (
          <>
            <section className="hero">
              <div className="eyebrow">FIFA World Cup 26 · Matchday 3</div>
              <h1>The group stage finale. Everything on the line.</h1>
              <p>Both games in every group play simultaneously, the format that produces the most dramatic final day in football. Qualification spots, eliminations and seedings all decided in 24 matches across four days. Live scores and match reports update the moment they drop.</p>
              <div className="ctx">
                <div className="pill"><span>Dates</span><b>June 24 to June 29</b></div>
                <div className="pill"><span>Format</span><b>Both group games simultaneous</b></div>
                <div className="pill"><span>Match of the round</span><b>Norway vs France</b></div>
                <div className="pill"><span>Storyline</span><b>Ronaldo needs goals · Spain's real test</b></div>
              </div>
            </section>
            <MatchExplorer T={T} M={M3} />
            <p className="scope" style={{ marginTop: 38 }}>
              Live scores and match reports replace the preview automatically once a fixture kicks off. Both games in each group play at the same kickoff time. The drama unfolds simultaneously.
            </p>
          </>
        )}

        {activeMainTab === 'standings' && (
          <>
            <section className="hero">
              <div className="eyebrow">FIFA World Cup 26 · Group Stage</div>
              <h1>Final Group Standings</h1>
              <p>The group stage is complete. 32 teams advance to the Round of 32, with the eight best third-placed teams joining the 12 group winners and 12 runners-up.</p>
            </section>
            <GroupStandings />
          </>
        )}

        {activeMainTab === 'knockouts' && (
          <>
            <section className="hero">
              <div className="eyebrow">FIFA World Cup 26 · Knockouts</div>
              <h1>Round of 32</h1>
              <p>The group stage is over. 32 teams remain. One game, one chance. Canada have already eliminated South Africa. Scores and results update live the moment they drop.</p>
            </section>
            <KnockoutBracket T={T} KO={KO} />
          </>
        )}

        {activeMainTab === 'bracket' && (
          <>
            <section className="hero">
              <div className="eyebrow">FIFA World Cup 26 · Tournament Bracket</div>
              <h1>The path to glory.</h1>
              <p>Every knockout game in one view, from the Round of 32 all the way to the Final at MetLife Stadium on July 19. Winners advance automatically as results come in.</p>
              <div className="ctx">
                <div className="pill"><span>Rounds</span><b>R32 · R16 · QF · SF · Final</b></div>
                <div className="pill"><span>Final</span><b>Jul 19 · MetLife Stadium, NJ</b></div>
                <div className="pill"><span>First result</span><b>Canada 1-0 South Africa</b></div>
              </div>
            </section>
            <BracketView T={T} />
          </>
        )}

        {activeMainTab === 'stats' && (
          <TournamentLeaders fullPage onSeeAll={() => {}} />
        )}
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-credit">
            <span className="foot-built">Built by</span>
            <span className="foot-name">Muhammad Ovais Yusuf</span>
            <a
              className="foot-link"
              href="https://www.linkedin.com/in/muhammadovaisyusuf/"
              target="_blank"
              rel="noopener noreferrer"
            >LinkedIn ↗</a>
          </div>
          <p><b>Data.</b> Fixtures, kickoff times (US Eastern), venues and verdicts are hand-verified as of June 2026. Squads, starting lineups and player profiles come live from ESPN&apos;s public feed, with no API key and no quota. Lineups appear on the pitch roughly an hour before kickoff; until then, each match shows the full squad.</p>
        </div>
      </footer>
    </>
  );
}
