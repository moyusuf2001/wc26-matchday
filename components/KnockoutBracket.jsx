'use client';
import { useState, useEffect, useMemo } from 'react';

const MONTHS = { January:'01', February:'02', March:'03', April:'04', May:'05', June:'06', July:'07', August:'08', September:'09', October:'10', November:'11', December:'12' };
function fixtureDate(m) {
  const mt = /([A-Za-z]+)\s+(\d{1,2})\s*$/.exec(m?.ds || '');
  if (!mt) return '';
  const mo = MONTHS[mt[1]];
  return mo ? `2026${mo}${mt[2].padStart(2, '0')}` : '';
}
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');
const confLabel = (c) => c === 'high' ? 'Banker' : c === 'lean' ? 'Lean' : 'Coin flip';

export default function KnockoutBracket({ T, KO }) {
  const [scoreMap, setScoreMap] = useState({});

  const days = useMemo(() => {
    const map = new Map();
    for (const m of KO) {
      if (!map.has(m.d)) map.set(m.d, { label: m.ds, matches: [] });
      map.get(m.d).matches.push(m);
    }
    return [...map.values()];
  }, [KO]);

  useEffect(() => {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const dates = [...new Set(KO.map(fixtureDate).filter(Boolean))];

    async function load() {
      const upd = {};
      for (const date of dates) {
        if (date > todayStr) continue;
        try {
          const r = await fetch(`/api/scores?date=${date}`);
          const d = await r.json();
          for (const s of d.scores || []) {
            upd[`${s.homeName}-${s.awayName}`] = s;
          }
        } catch {}
      }
      setScoreMap((prev) => ({ ...prev, ...upd }));
    }

    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [KO]);

  return (
    <div className="ko-wrap">
      <div className="ko-section-hd">
        <span className="ko-section-badge">R32</span>
        Round of 32
      </div>

      {days.map((day) => (
        <section key={day.label} className="ko-day-section">
          <div className="ko-day-hd">{day.label}</div>
          <div className="ko-grid">
            {day.matches.map((m) => {
              const h = T[m.h] || { n: m.h, f: '' };
              const a = T[m.a] || { n: m.a, f: '' };
              const k1 = `${norm(h.n)}-${norm(a.n)}`;
              const k2 = `${norm(a.n)}-${norm(h.n)}`;
              const sc = scoreMap[k1] || scoreMap[k2];
              const swapped = !scoreMap[k1] && !!scoreMap[k2];
              const isDone = sc?.status === 'final';
              const isLive = sc?.status === 'live';
              const hs = swapped ? sc?.awayScore : sc?.homeScore;
              const as_ = swapped ? sc?.homeScore : sc?.awayScore;
              const hWon = isDone && parseInt(hs) > parseInt(as_);
              const aWon = isDone && parseInt(as_) > parseInt(hs);
              const fav = m.fav === 'h' ? h : m.fav === 'a' ? a : null;

              return (
                <div key={`${m.h}-${m.a}`} className={`ko-card${isDone ? ' ko-done' : isLive ? ' ko-live' : ''}`}>
                  <div className="ko-card-top">
                    <span className="ko-round-chip">R32</span>
                    {isLive && <span className="ko-status-chip ko-chip-live">{sc.statusLabel}</span>}
                    {isDone && <span className="ko-status-chip ko-chip-ft">Full Time</span>}
                    {!isDone && !isLive && <span className="ko-kickoff">{m.t} {m.z}</span>}
                  </div>

                  <div className="ko-matchup-row">
                    <div className={`ko-side ko-home${hWon ? ' ko-win' : isDone && !hWon ? ' ko-out' : ''}`}>
                      <span className="ko-flag">{h.f}</span>
                      <span className="ko-tname">{h.n}</span>
                      {hWon && <span className="ko-adv-chip">Advances</span>}
                    </div>

                    <div className="ko-scorecell">
                      {isDone || isLive
                        ? <span className="ko-scoreline">{hs} – {as_}</span>
                        : <span className="ko-vs">v</span>}
                    </div>

                    <div className={`ko-side ko-away${aWon ? ' ko-win' : isDone && !aWon ? ' ko-out' : ''}`}>
                      {aWon && <span className="ko-adv-chip">Advances</span>}
                      <span className="ko-tname">{a.n}</span>
                      <span className="ko-flag">{a.f}</span>
                    </div>
                  </div>

                  <div className="ko-meta-row">
                    <span className="ko-venue-text">{m.v} · {m.c}</span>
                  </div>

                  {!isDone && !isLive && (
                    <div className="ko-preview">
                      {fav && (
                        <div className="ko-prediction">
                          <span className="ko-pred-label">Pick</span>
                          <span className="ko-pred-team">{fav.f} {fav.n}</span>
                          <span className={`ko-conf-chip ko-conf-${m.conf}`}>{confLabel(m.conf)}</span>
                        </div>
                      )}
                      {!fav && (
                        <div className="ko-prediction">
                          <span className="ko-pred-label">Pick</span>
                          <span className="ko-pred-team" style={{ color: 'var(--coral)' }}>Too close to call</span>
                          <span className="ko-conf-chip ko-conf-toss">Coin flip</span>
                        </div>
                      )}
                      {m.why && <p className="ko-why">{m.why}</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
