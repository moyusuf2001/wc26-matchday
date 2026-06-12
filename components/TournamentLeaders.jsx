'use client';
import { useEffect, useState } from 'react';

const FLAG_MAP = {
  'Mexico': '🇲🇽', 'South Africa': '🇿🇦', 'Canada': '🇨🇦',
  'USA': '🇺🇸', 'United States': '🇺🇸', 'Paraguay': '🇵🇾',
  'South Korea': '🇰🇷', 'Korea Republic': '🇰🇷',
  'Bosnia-Herzegovina': '🇧🇦', 'Bosnia and Herzegovina': '🇧🇦',
  'Czechia': '🇨🇿', 'Czech Republic': '🇨🇿',
  'Argentina': '🇦🇷', 'France': '🇫🇷', 'Brazil': '🇧🇷', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Spain': '🇪🇸', 'Germany': '🇩🇪', 'Portugal': '🇵🇹', 'Netherlands': '🇳🇱',
  'Belgium': '🇧🇪', 'Uruguay': '🇺🇾', 'Croatia': '🇭🇷', 'Morocco': '🇲🇦',
  'Japan': '🇯🇵', 'Senegal': '🇸🇳', 'Switzerland': '🇨🇭', 'Denmark': '🇩🇰',
  'Poland': '🇵🇱', 'Australia': '🇦🇺', 'Türkiye': '🇹🇷', 'Turkey': '🇹🇷',
  'Qatar': '🇶🇦', 'Saudi Arabia': '🇸🇦', 'Iran': '🇮🇷', 'Nigeria': '🇳🇬',
  'Ecuador': '🇪🇨', 'Cameroon': '🇨🇲', 'Ghana': '🇬🇭', 'Tunisia': '🇹🇳',
  'Egypt': '🇪🇬', 'Algeria': '🇩🇿', 'Colombia': '🇨🇴', 'Peru': '🇵🇪',
  'Chile': '🇨🇱', 'Venezuela': '🇻🇪', 'Bolivia': '🇧🇴', 'Honduras': '🇭🇳',
  'Costa Rica': '🇨🇷', 'Panama': '🇵🇦', 'Jamaica': '🇯🇲', 'Haiti': '🇭🇹',
  'New Zealand': '🇳🇿', 'Ivory Coast': '🇨🇮', "Côte d'Ivoire": '🇨🇮',
  'Sweden': '🇸🇪', 'Norway': '🇳🇴', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Serbia': '🇷🇸', 'Romania': '🇷🇴', 'Ukraine': '🇺🇦', 'Slovakia': '🇸🇰',
  'Austria': '🇦🇹', 'Hungary': '🇭🇺', 'Greece': '🇬🇷', 'Albania': '🇦🇱',
  'Congo DR': '🇨🇩', 'DR Congo': '🇨🇩', 'Curaçao': '🇨🇼',
  'Cape Verde': '🇨🇻', 'Indonesia': '🇮🇩',
};

function PlayerRow({ rank, player, statValue, statSub }) {
  const flag = FLAG_MAP[player.teamName] || '';
  return (
    <div className="ldr-row">
      <span className="ldr-rank">{rank}</span>
      <img
        className="ldr-photo"
        src={player.photo}
        alt={player.name}
        onError={(e) => { e.currentTarget.style.opacity = '0'; }}
      />
      <span className="ldr-info">
        <span className="ldr-name">{player.shortName || player.name}</span>
        <span className="ldr-team">{flag} {player.teamName}</span>
      </span>
      <span className="ldr-statcol">
        <span className="ldr-stat">{statValue}</span>
        {statSub != null && <span className="ldr-statsub">{statSub}</span>}
      </span>
    </div>
  );
}

function LeaderCol({ icon, title, players, renderStat, emptyText }) {
  return (
    <div className="ldr-col">
      <div className="ldr-col-hd">
        <span className="ldr-icon">{icon}</span>
        <span>{title}</span>
      </div>
      {players.length ? players.map((p, i) => {
        const { value, sub } = renderStat(p);
        return <PlayerRow key={p.id} rank={i + 1} player={p} statValue={value} statSub={sub} />;
      }) : (
        <div className="ldr-empty">{emptyText}</div>
      )}
    </div>
  );
}

// ── Full stats page ─────────────────────────────────────────────────────────
function FullStatsPage({ data }) {
  const [activeSection, setActiveSection] = useState('scorers');
  const tabs = [
    { key: 'scorers',    icon: '⚽', label: 'Golden Boot' },
    { key: 'assisters',  icon: '🎯', label: 'Top Assists' },
    { key: 'keepers',    icon: '🧤', label: 'Goalkeepers' },
    { key: 'discipline', icon: '📋', label: 'Discipline' },
  ];

  return (
    <section className="stats-page">
      <div className="ldr-hd" style={{ marginBottom: 0 }}>
        <h2>Tournament Statistics</h2>
        <div className="rule" />
      </div>
      <p className="stats-sub">Live data from ESPN · updates after every match</p>

      <div className="stats-tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`stats-tab ${activeSection === t.key ? 'stats-tab-active' : ''}`}
            onClick={() => setActiveSection(t.key)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="stats-full-col">
        {activeSection === 'scorers' && (
          <LeaderCol
            icon="⚽" title="Golden Boot — Top Scorers"
            players={data.scorers || []}
            renderStat={(p) => ({ value: p.goals, sub: `${p.shotsOnTarget ?? p.shots ?? 0} SoT` })}
            emptyText="No goals scored yet"
          />
        )}
        {activeSection === 'assisters' && (
          <LeaderCol
            icon="🎯" title="Top Assists"
            players={data.assisters || []}
            renderStat={(p) => ({ value: p.assists, sub: p.goals > 0 ? `${p.goals}G` : null })}
            emptyText="No assists recorded yet"
          />
        )}
        {activeSection === 'keepers' && (
          <LeaderCol
            icon="🧤" title="Goalkeepers — Saves & Clean Sheets"
            players={data.keepers || []}
            renderStat={(p) => ({ value: p.saves, sub: p.cleanSheets > 0 ? `${p.cleanSheets} CS` : `${p.goalsConceded} GC` })}
            emptyText="No keeper stats yet"
          />
        )}
        {activeSection === 'discipline' && (
          <LeaderCol
            icon="📋" title="Discipline"
            players={data.discipline || []}
            renderStat={(p) => ({
              value: <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                {p.yellowCards > 0 && <span>🟨{p.yellowCards}</span>}
                {p.redCards > 0 && <span>🟥{p.redCards}</span>}
              </span>,
              sub: null,
            })}
            emptyText="No cards issued yet"
          />
        )}
      </div>
    </section>
  );
}

// ── Home preview (top N per category, 2-col) ────────────────────────────────
function HomePreview({ data, limit, onSeeAll }) {
  const scorers   = (data.scorers   || []).slice(0, limit);
  const assisters = (data.assisters || []).slice(0, limit);
  if (!scorers.length && !assisters.length) return null;

  return (
    <section className="ldr-section">
      <div className="ldr-hd">
        <h2>Tournament leaders</h2>
        <div className="rule" />
        <button className="ldr-seeall" onClick={onSeeAll}>Full stats →</button>
      </div>
      <div className="ldr-grid">
        <LeaderCol
          icon="⚽" title="Top Scorers"
          players={scorers}
          renderStat={(p) => ({ value: p.goals })}
          emptyText="No goals yet"
        />
        <LeaderCol
          icon="🎯" title="Top Assists"
          players={assisters}
          renderStat={(p) => ({ value: p.assists })}
          emptyText="No assists yet"
        />
      </div>
    </section>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function TournamentLeaders({ limit = 3, onSeeAll, fullPage = false }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timer = null;

    async function fetchLeaders() {
      try {
        const r = await fetch('/api/leaders');
        const d = await r.json();
        if (!cancelled) {
          setData(d);
          // Poll every 60 s while the tournament is live so numbers update automatically.
          timer = setTimeout(fetchLeaders, 60000);
        }
      } catch { /* leaders are optional */ }
    }

    fetchLeaders();
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  if (!data) return null;

  if (fullPage) return <FullStatsPage data={data} />;
  return <HomePreview data={data} limit={limit} onSeeAll={onSeeAll} />;
}
