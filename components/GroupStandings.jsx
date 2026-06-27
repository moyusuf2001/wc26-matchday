'use client';
import { useEffect, useState } from 'react';
import { T } from '../lib/staticData';

const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

// Qualification note per position
function qualBadge(pos) {
  if (pos === 0) return { label: 'Q', title: 'Qualifies – 1st in group', cls: 'qual-1' };
  if (pos === 1) return { label: 'Q', title: 'Qualifies – 2nd in group', cls: 'qual-2' };
  if (pos === 2) return { label: '3', title: 'Best 3rd place contender', cls: 'qual-3' };
  return null;
}

function GroupTable({ letter, rows }) {
  return (
    <div className="stn-group">
      <div className="stn-grp-hd">
        <span className="stn-grp-letter">Group {letter}</span>
      </div>
      <table className="stn-table" cellSpacing={0}>
        <thead>
          <tr>
            <th className="stn-th stn-th-team" colSpan={2}>Team</th>
            <th className="stn-th">P</th>
            <th className="stn-th">W</th>
            <th className="stn-th">D</th>
            <th className="stn-th">L</th>
            <th className="stn-th">GF</th>
            <th className="stn-th">GA</th>
            <th className="stn-th stn-th-gd">GD</th>
            <th className="stn-th stn-th-pts">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const team = T[row.code];
            const badge = qualBadge(i);
            return (
              <tr key={row.code} className={`stn-row stn-row-${i}`}>
                <td className="stn-pos">
                  {badge
                    ? <span className={`stn-badge ${badge.cls}`} title={badge.title}>{badge.label}</span>
                    : <span className="stn-pos-num">{i + 1}</span>
                  }
                </td>
                <td className="stn-team">
                  <span className="stn-flag">{team?.f || ''}</span>
                  <span className="stn-name">{team?.n || row.code}</span>
                </td>
                <td className="stn-td">{row.p}</td>
                <td className="stn-td">{row.w}</td>
                <td className="stn-td">{row.d}</td>
                <td className="stn-td">{row.l}</td>
                <td className="stn-td">{row.gf}</td>
                <td className="stn-td">{row.ga}</td>
                <td className={`stn-td stn-gd ${row.gd > 0 ? 'gd-pos' : row.gd < 0 ? 'gd-neg' : ''}`}>
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </td>
                <td className="stn-td stn-pts">{row.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function GroupStandings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);

  async function load() {
    try {
      const res = await fetch('/api/standings');
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json();
      setData(json.groups || {});
      setUpdated(json.updated ? new Date(json.updated) : new Date());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60 * 1000); // refresh every 60s during live play
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="stn-loading">
        <div className="stn-spinner" />
        <span>Loading standings…</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="stn-error">
        <p>Could not load standings. <button className="stn-retry" onClick={load}>Retry</button></p>
      </div>
    );
  }

  const fmt = updated
    ? updated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className="stn-wrap">
      <div className="stn-meta">
        <div className="stn-legend">
          <span className="stn-badge qual-1">Q</span> Qualified (1st) &nbsp;
          <span className="stn-badge qual-2">Q</span> Qualified (2nd) &nbsp;
          <span className="stn-badge qual-3">3</span> Best 3rd contender
        </div>
        {fmt && <span className="stn-updated">Updated {fmt}</span>}
      </div>

      <div className="stn-grid">
        {GROUP_LETTERS.map(letter => {
          const rows = data[letter];
          if (!rows || rows.length === 0) return null;
          return <GroupTable key={letter} letter={letter} rows={rows} />;
        })}
      </div>

      <p className="scope" style={{ marginTop: 32 }}>
        Standings are computed live from ESPN&apos;s official scoreboard. Points: Win 3 · Draw 1 · Loss 0. Tiebreaker order: points → goal difference → goals for. Best 8 third-place teams also advance.
      </p>
    </div>
  );
}
