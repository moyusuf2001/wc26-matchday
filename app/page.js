'use client';
import { useState, useEffect } from 'react';
import { T, M, M2 } from '../lib/staticData';
import { TOURNAMENT_THEMES } from '../lib/editorial';
import MatchExplorer from '../components/MatchExplorer';
import TournamentLeaders from '../components/TournamentLeaders';
import GroupStandings from '../components/GroupStandings';

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

export default function Page() {
  const [statsOpen, setStatsOpen] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState('matchday');
  const [theme, setTheme] = useState('light');

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
          <button className="tab" role="tab" disabled title="Unlocks after MD2 results">Matchday 3</button>
          <button className="tab" role="tab" disabled title="Unlocks after the group stage">Knockouts</button>
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
                <div className="pill"><span>Top scorer</span><b>Haaland <i>2 goals</i></b></div>
                <div className="pill"><span>Biggest result</span><b>Morocco 2–1 Scotland</b></div>
                <div className="pill"><span>Already qualified</span><b>Spain · Germany · Norway</b></div>
                <div className="pill"><span>On the brink</span><b>Korea Republic · Iraq · Curaçao</b></div>
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

        {activeMainTab === 'standings' && (
          <>
            <section className="hero">
              <div className="eyebrow">FIFA World Cup 26 · Group Stage</div>
              <h1>Live Group Standings</h1>
              <p>All 12 groups updated live from official scores. Top two teams from each group advance automatically. The best eight third-placed teams also qualify for the Round of 32.</p>
            </section>
            <GroupStandings />
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
