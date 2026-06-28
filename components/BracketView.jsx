'use client';
import { useState, useEffect, useMemo } from 'react';
import { R32, R16, QF, SF, FINAL, THIRD_PLACE } from '../lib/bracketData';

/* ---------- helpers ---------- */
const MONTHS = { January:'01', February:'02', March:'03', April:'04', May:'05', June:'06', July:'07', August:'08', September:'09', October:'10', November:'11', December:'12' };
function fixtureDate(ds) {
  const mt = /([A-Za-z]+)\s+(\d{1,2})\s*$/.exec(ds || '');
  if (!mt) return '';
  const mo = MONTHS[mt[1]];
  return mo ? `2026${mo}${mt[2].padStart(2, '0')}` : '';
}
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');

// All unique dates we might need scores for
const ALL_DATES = [...new Set(
  [...R32, ...R16, ...QF, ...SF, ...FINAL, ...THIRD_PLACE].map(g => fixtureDate(g.ds)).filter(Boolean)
)];

// Round labels
const ROUND_META = {
  R32: { label: 'Round of 32', short: 'R32', col: 0 },
  R16: { label: 'Round of 16', short: 'R16', col: 1 },
  QF:  { label: 'Quarter-finals', short: 'QF', col: 2 },
  SF:  { label: 'Semi-finals', short: 'SF', col: 3 },
  F:   { label: 'Final', short: 'F', col: 4 },
};

// ---------- winner resolution ----------
function resolveWinner(game, scoreMap, T) {
  const hName = game.h ? norm(T[game.h]?.n || game.h) : null;
  const aName = game.a ? norm(T[game.a]?.n || game.a) : null;
  if (!hName || !aName) return null;
  const sc = scoreMap[`${hName}-${aName}`] || scoreMap[`${aName}-${hName}`];
  if (!sc || sc.status !== 'final') return null;
  const swapped = !scoreMap[`${hName}-${aName}`];
  const hs = parseInt(swapped ? sc.awayScore : sc.homeScore, 10);
  const as_ = parseInt(swapped ? sc.homeScore : sc.awayScore, 10);
  if (isNaN(hs) || isNaN(as_)) return null;
  return hs > as_ ? game.h : as_ > hs ? game.a : null; // null = draw (goes to pens, handle later)
}

function resolveLoser(game, scoreMap, T) {
  const winner = resolveWinner(game, scoreMap, T);
  if (!winner) return null;
  return winner === game.h ? game.a : game.h;
}

function getScore(game, scoreMap, T) {
  if (!game.h || !game.a) return null;
  const hName = norm(T[game.h]?.n || game.h);
  const aName = norm(T[game.a]?.n || game.a);
  const sc = scoreMap[`${hName}-${aName}`] || scoreMap[`${aName}-${hName}`];
  if (!sc) return null;
  const swapped = !scoreMap[`${hName}-${aName}`];
  return {
    status: sc.status,
    statusLabel: sc.statusLabel,
    hs: swapped ? sc.awayScore : sc.homeScore,
    as_: swapped ? sc.homeScore : sc.awayScore,
  };
}

// ---------- bracket state computation ----------
function buildBracketState(scoreMap, T) {
  // Start with R32 (all known teams)
  const games = {};
  for (const g of R32) games[g.id] = { ...g };

  // Propagate winners through rounds
  const rounds = [R16, QF, SF, FINAL, THIRD_PLACE];
  for (const roundGames of rounds) {
    for (const g of roundGames) {
      const resolved = { ...g };
      if (!g.h) {
        const srcGame = games[g.srcH];
        if (srcGame) {
          resolved.h = g.loser
            ? resolveLoser(srcGame, scoreMap, T)
            : resolveWinner(srcGame, scoreMap, T);
        }
      }
      if (!g.a) {
        const srcGame = games[g.srcA];
        if (srcGame) {
          resolved.a = g.loser
            ? resolveLoser(srcGame, scoreMap, T)
            : resolveWinner(srcGame, scoreMap, T);
        }
      }
      games[g.id] = resolved;
    }
  }
  return games;
}

// ---------- slot card component ----------
function SlotCard({ game, T, scoreMap, roundKey, tbd }) {
  if (!game) return <div className="bkt-slot bkt-slot-empty" />;

  const h = game.h ? (T[game.h] || { n: game.h, f: '' }) : null;
  const a = game.a ? (T[game.a] || { n: game.a, f: '' }) : null;

  const sc = (h && a) ? getScore(game, scoreMap, T) : null;
  const isDone = sc?.status === 'final';
  const isLive = sc?.status === 'live';
  const hs = sc?.hs;
  const as_ = sc?.as_;
  const hWon = isDone && parseInt(hs) > parseInt(as_);
  const aWon = isDone && parseInt(as_) > parseInt(hs);

  // Source labels for TBD teams
  const r32ById = Object.fromEntries(R32.map(g => [g.id, g]));
  const r16ById = Object.fromEntries(R16.map(g => [g.id, g]));
  const qfById  = Object.fromEntries(QF.map(g => [g.id, g]));
  const sfById  = Object.fromEntries(SF.map(g => [g.id, g]));
  const allById = { ...r32ById, ...r16ById, ...qfById, ...sfById };

  function srcLabel(srcId) {
    const src = allById[srcId];
    if (!src) return 'TBD';
    if (src.h && src.a) {
      const hn = T[src.h]?.n || src.h;
      const an = T[src.a]?.n || src.a;
      return `W: ${hn} / ${an}`;
    }
    return 'TBD';
  }

  return (
    <div className={`bkt-slot${isDone ? ' bkt-done' : isLive ? ' bkt-live' : ''}`}>
      <div className="bkt-slot-top">
        <span className="bkt-round-pip">{roundKey}</span>
        {isDone && <span className="bkt-chip bkt-chip-ft">FT</span>}
        {isLive && <span className="bkt-chip bkt-chip-live">{sc.statusLabel}</span>}
        {!isDone && !isLive && <span className="bkt-time">{game.t} {game.z}</span>}
      </div>

      <div className="bkt-teams">
        <div className={`bkt-team${hWon ? ' bkt-win' : isDone ? ' bkt-out' : ''}`}>
          {h
            ? <><span className="bkt-flag">{h.f}</span><span className="bkt-name">{h.n}</span></>
            : <span className="bkt-tbd">{game.srcH ? srcLabel(game.srcH) : 'TBD'}</span>}
          {isDone && <span className="bkt-score-side">{hs}</span>}
        </div>
        <div className="bkt-divider" />
        <div className={`bkt-team${aWon ? ' bkt-win' : isDone ? ' bkt-out' : ''}`}>
          {a
            ? <><span className="bkt-flag">{a.f}</span><span className="bkt-name">{a.n}</span></>
            : <span className="bkt-tbd">{game.srcA ? srcLabel(game.srcA) : 'TBD'}</span>}
          {isDone && <span className="bkt-score-side">{as_}</span>}
        </div>
      </div>

      <div className="bkt-venue">{game.v} · {game.c}</div>
      {isDone && (hWon || aWon) && (
        <div className="bkt-adv">
          <span className="bkt-adv-flag">{hWon ? h?.f : a?.f}</span>
          <span className="bkt-adv-name">{hWon ? h?.n : a?.n}</span>
          <span className="bkt-adv-label">advances</span>
        </div>
      )}
    </div>
  );
}

// ---------- main component ----------
export default function BracketView({ T }) {
  const [scoreMap, setScoreMap] = useState({});

  useEffect(() => {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    async function load() {
      const upd = {};
      for (const date of ALL_DATES) {
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
  }, []);

  const games = useMemo(() => buildBracketState(scoreMap, T), [scoreMap, T]);

  const r32Order = [
    'r32-1','r32-3','r32-2','r32-5',
    'r32-11','r32-12','r32-9','r32-10',
    'r32-4','r32-6','r32-7','r32-8',
    'r32-14','r32-16','r32-13','r32-15',
  ];
  const r16Order = ['r16-1','r16-2','r16-5','r16-6','r16-3','r16-4','r16-7','r16-8'];
  const qfOrder  = ['qf-1','qf-2','qf-3','qf-4'];
  const sfOrder  = ['sf-1','sf-2'];

  return (
    <div className="bkt-outer">
      {/* Scrollable bracket */}
      <div className="bkt-scroll">
        {/* R32 */}
        <div className="bkt-col bkt-col-r32">
          <div className="bkt-col-hd">Round of 32</div>
          {r32Order.map((id, i) => (
            <SlotCard key={id} game={games[id]} T={T} scoreMap={scoreMap} roundKey="R32" />
          ))}
        </div>

        {/* R16 */}
        <div className="bkt-col bkt-col-r16">
          <div className="bkt-col-hd">Round of 16</div>
          {r16Order.map((id) => (
            <SlotCard key={id} game={games[id]} T={T} scoreMap={scoreMap} roundKey="R16" />
          ))}
        </div>

        {/* QF */}
        <div className="bkt-col bkt-col-qf">
          <div className="bkt-col-hd">Quarter-finals</div>
          {qfOrder.map((id) => (
            <SlotCard key={id} game={games[id]} T={T} scoreMap={scoreMap} roundKey="QF" />
          ))}
        </div>

        {/* SF */}
        <div className="bkt-col bkt-col-sf">
          <div className="bkt-col-hd">Semi-finals</div>
          {sfOrder.map((id) => (
            <SlotCard key={id} game={games[id]} T={T} scoreMap={scoreMap} roundKey="SF" />
          ))}
          {/* 3rd Place */}
          <div className="bkt-col-sub-hd">3rd Place</div>
          <SlotCard game={games['tp']} T={T} scoreMap={scoreMap} roundKey="3P" />
        </div>

        {/* Final */}
        <div className="bkt-col bkt-col-final">
          <div className="bkt-col-hd">Final</div>
          <SlotCard game={games['final']} T={T} scoreMap={scoreMap} roundKey="F" />
          {/* Champion */}
          {games['final'] && (() => {
            const sc = getScore(games['final'], scoreMap, T);
            const isDone = sc?.status === 'final';
            const hs = isDone ? parseInt(sc.hs, 10) : NaN;
            const as_ = isDone ? parseInt(sc.as_, 10) : NaN;
            const champCode = hs > as_ ? games['final'].h : as_ > hs ? games['final'].a : null;
            const champ = champCode ? (T[champCode] || { n: champCode, f: '' }) : null;
            return champ ? (
              <div className="bkt-champion">
                <div className="bkt-champ-trophy">🏆</div>
                <div className="bkt-champ-flag">{champ.f}</div>
                <div className="bkt-champ-name">{champ.n}</div>
                <div className="bkt-champ-label">World Champions</div>
              </div>
            ) : null;
          })()}
        </div>
      </div>

      {/* Mobile: rounds listed vertically */}
      <div className="bkt-mobile">
        {[
          { label: 'Round of 32',    ids: r32Order, key: 'R32' },
          { label: 'Round of 16',   ids: r16Order, key: 'R16' },
          { label: 'Quarter-finals', ids: qfOrder,  key: 'QF'  },
          { label: 'Semi-finals',    ids: sfOrder,  key: 'SF'  },
          { label: 'Final',          ids: ['final'], key: 'F'  },
        ].map(({ label, ids, key }) => (
          <section key={key} className="bkt-mobile-round">
            <div className="bkt-mobile-round-hd">{label}</div>
            <div className="bkt-mobile-grid">
              {ids.map(id => (
                <SlotCard key={id} game={games[id]} T={T} scoreMap={scoreMap} roundKey={key} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
