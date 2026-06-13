'use client';
import { useState } from 'react';
import { T, M } from '../lib/staticData';
import { TOURNAMENT_THEMES } from '../lib/editorial';
import MatchExplorer from '../components/MatchExplorer';
import TournamentLeaders from '../components/TournamentLeaders';

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

  return (
    <>
      <header className="top">
        <div className="topbar">
          <div className="mark">
            <div className="glyph">WC<b>26</b></div>
            <div className="sub">Matchday&nbsp;Intelligence</div>
          </div>
          <div className="host">Jun 11 to Jul 19 · <b>USA</b> · <b>CAN</b> · <b>MEX</b></div>
        </div>
        <div className="tabs" role="tablist" aria-label="Matchday">
          <button className={`tab ${activeMainTab === 'matchday' ? '' : ''}`} role="tab" aria-selected={activeMainTab === 'matchday'} onClick={() => setActiveMainTab('matchday')}>Matchday 1</button>
          <button className="tab" role="tab" disabled title="Unlocks after MD1 results">Matchday 2</button>
          <button className="tab" role="tab" disabled title="Unlocks after MD2 results">Matchday 3</button>
          <button className="tab" role="tab" disabled title="Unlocks after the group stage">Knockouts</button>
          <button className={`tab tab-stats ${activeMainTab === 'stats' ? 'tab-active' : ''}`} role="tab" aria-selected={activeMainTab === 'stats'} onClick={() => setActiveMainTab('stats')}>📊 Stats</button>
        </div>
      </header>

      <main className="wrap">
        {activeMainTab === 'matchday' && (
          <>
            <section className="hero">
              <div className="eyebrow">FIFA World Cup 26 · Matchday 1</div>
              <h1>Every opening match, read for you.</h1>
              <p>Open any fixture for the projected result, the tale of the tape, the full squad and every player profile. Starting XIs appear live on a formation pitch the moment they drop. All free.</p>
              <div className="ctx">
                <div className="pill"><span>Title favourite</span><b>Spain <i>+450</i></b></div>
                <div className="pill"><span>In the mix</span><b>France +470 · England +650</b></div>
                <div className="pill"><span>Golden Boot</span><b>Mbapp&#233; <i>+600</i> · Kane +700</b></div>
                <div className="pill"><span>Format</span><b>48 teams · 12 groups · top 2 + 8 thirds</b></div>
              </div>
            </section>

            <section className="themes">
              <div className="themes-hd">
                <h2>Tournament intelligence</h2>
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
