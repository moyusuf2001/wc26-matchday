'use client';
import { useState, useEffect, useRef } from 'react';
import { getEditorial, getTeamIdentity, UPSET, CHEMISTRY, ZONE_COORDS, STORYLINES } from '../lib/editorial';

/* ---------- helpers ---------- */
const confLabel = (c) => (c === 'high' ? 'High confidence' : c === 'lean' ? 'Lean' : 'Toss-up');
const firstName = (n) => (n.split(' ')[0] === 'United' ? 'USA' : n.split(' ')[0]);
const rankWeight = (s) => {
  const v = parseInt(s.replace('+', ''), 10);
  return s.startsWith('-') ? 100 + Math.abs(v) : Math.max(8, Math.round(10000 / v));
};
const surname = (n) => {
  if (!n) return '';
  const parts = n.trim().split(' ');
  return parts.length > 1 ? parts[parts.length - 1] : parts[0];
};
const MONTHS = { January: '01', February: '02', March: '03', April: '04', May: '05', June: '06', July: '07', August: '08', September: '09', October: '10', November: '11', December: '12' };
function fixtureDate(m) {
  const mt = /([A-Za-z]+)\s+(\d{1,2})\s*$/.exec(m?.ds || '');
  if (!mt) return '';
  const mo = MONTHS[mt[1]];
  return mo ? `2026${mo}${mt[2].padStart(2, '0')}` : '';
}
const HEADSHOT = (id) => `https://a.espncdn.com/i/headshots/soccer/players/full/${id}.png`;
// Byline for the "My Thoughts" tactical column; change this to your name.
const AUTHOR = "Ovais's Analysis";

// Match an ESPN full name to the API-Football photo map (keyed by initial+surname).
const _pn = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');
function photoKeys(name) {
  const t = (name || '').trim().split(/\s+/);
  const last = _pn(t[t.length - 1]);
  const init = _pn(t[0]).charAt(0);
  return [init + ':' + last, 'L:' + last];
}
// Relative freshness, computed once on render.
function timeAgo(iso) {
  const t = iso ? Date.parse(iso) : NaN;
  if (!t) return '';
  const s = Math.max(0, (Date.now() - t) / 1000);
  if (s < 90) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/* ---------- small shared UI ---------- */
function Tag({ tone = 'verified', children }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}
function Lbl({ children, tag }) {
  return (
    <div className="lbl">
      <span className="lbltxt">{children}</span>
      <span className="lblrule" />
      {tag}
    </div>
  );
}
function EmptyState({ title, sub }) {
  return (
    <div className="estate">
      <span className="estate-dot" />
      <div>
        <div className="estate-t">{title}</div>
        {sub && <div className="estate-s">{sub}</div>}
      </div>
    </div>
  );
}

function Bar({ hw, aw }) {
  const hp = hw + aw === 0 ? 50 : Math.round((hw / (hw + aw)) * 100);
  return (
    <div className="bar">
      <span className="bh" style={{ width: hp + '%' }} />
      <span className="ba" style={{ width: 100 - hp + '%' }} />
    </div>
  );
}
function Tot({ label, hv, av, hw, aw }) {
  return (
    <div className="tot">
      <div className="h">{hv}</div>
      <div className="k">{label}</div>
      <div className="a">{av}</div>
      <Bar hw={hw} aw={aw} />
    </div>
  );
}

function MarqueeCard({ p }) {
  let wc = null;
  if (p.wc) {
    const total = Object.values(p.wc).reduce((s, n) => s + n, 0);
    const yrs = Object.entries(p.wc).filter(([, n]) => n > 0);
    wc = (
      <div className="wc">
        <span className="total">{total} <small>WC goal{total === 1 ? '' : 's'}</small></span>
        {yrs.length
          ? yrs.map(([y, n]) => (<span className="yr" key={y}>&apos;{y.slice(2)} <i>×</i>{n}</span>))
          : <span className="yr" style={{ color: 'var(--mute)' }}>no WC goals yet</span>}
      </div>
    );
  } else if (p.debutStar) {
    wc = <div className="wc"><span className="debutbadge">★ First World Cup</span></div>;
  }
  return (
    <div className="player">
      <div className="nm"><b>{p.nm}</b><span className="pos">{p.pos}</span></div>
      <div className="club">{p.club}</div>
      {wc}
      {p.note && <div className="pnote">{p.note}</div>}
    </div>
  );
}

const POS_ORDER = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];

/* ---------- squad rows ---------- */
// Real headshot (API-Football photo, else ESPN), falling back to a premium
// side-tinted monogram only when no image exists at all.
function PlayerAvatar({ id, name, side, photo }) {
  const [bad, setBad] = useState(false);
  const initial = (name || '?').charAt(0).toUpperCase();
  const src = photo || (id ? HEADSHOT(id) : null);
  if (bad || !src) return <span className={`pavatar fallback ${side || ''}`}>{initial}</span>;
  return <img className="pavatar" src={src} alt="" loading="lazy" onError={() => setBad(true)} />;
}

function PlayerRow({ player, side, photo, onOpen }) {
  return (
    <button className="prow" onClick={() => onOpen(player.id, player.name, photo)}>
      <span className="num">{player.number ?? ''}</span>
      <PlayerAvatar id={player.id} name={player.name} side={side} photo={photo} />
      <span className="pn">{player.name}</span>
      <span className="ax">View ›</span>
    </button>
  );
}

function LiveSquad({ name, side, teamCode, onOpen }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [photos, setPhotos] = useState({});
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`/api/squad?team=${encodeURIComponent(name)}`);
        const d = await r.json();
        if (!cancelled) (d.error ? setErr(d.error) : setData(d));
      } catch (e) {
        if (!cancelled) setErr(String(e));
      }
    })();
    (async () => {
      try {
        const r = await fetch(`/api/photos?team=${encodeURIComponent(name)}`);
        const d = await r.json();
        if (!cancelled && d.photos) setPhotos(d.photos);
      } catch { /* photos are an optional enhancement */ }
    })();
    return () => { cancelled = true; };
  }, [name]);

  const players = data?.players ?? [];
  const byPos = POS_ORDER.map((pos) => [pos, players.filter((p) => p.position === pos)]);
  const photoFor = (nm) => { const [a, b] = photoKeys(nm); return photos[a] || photos[b] || null; };
  const open = (id, nm, ph) => onOpen(id, nm, teamCode, ph);
  return (
    <div className={`sqcol ${side}`}>
      <h4>{name}</h4>
      {!data && !err && <div className="muted"><span className="spin" />loading squad…</div>}
      {err && <EmptyState title="Squad unavailable right now" sub="The verified key players are listed below." />}
      {data && players.length === 0 && <EmptyState title="No squad published yet" sub="The verified key players for this team are listed below." />}
      {data && players.length > 0 && byPos.map(([pos, list]) =>
        list.length ? (
          <div key={pos}>
            <div className="poslabel">{pos}s</div>
            {list.map((p) => <PlayerRow key={p.id} player={p} side={side} photo={photoFor(p.name)} onOpen={open} />)}
          </div>
        ) : null
      )}
    </div>
  );
}

/* ---------- formation pitch ---------- */
function parseGrid(g) {
  if (typeof g !== 'string') return null;
  const [r, c] = g.split(':').map((x) => parseInt(x, 10));
  if (!Number.isFinite(r) || !Number.isFinite(c)) return null;
  return { row: r, col: c };
}
const POS_ROW = { G: 1, D: 2, M: 3, F: 4 };
function layoutXI(xi) {
  const parsed = xi.map((p, idx) => {
    let g = parseGrid(p.grid);
    if (!g) {
      const b = (p.pos || 'M').charAt(0).toUpperCase();
      g = { row: POS_ROW[b] || 3, col: idx + 1 };
    }
    return { ...p, row: g.row, col: g.col };
  });
  const rows = parsed.map((p) => p.row);
  const minRow = Math.min(...rows), maxRow = Math.max(...rows);
  const TOP = 18, BOT = 138;
  const byRow = {};
  parsed.forEach((p) => { (byRow[p.row] = byRow[p.row] || []).push(p); });
  const placed = [];
  Object.keys(byRow).forEach((rk) => {
    const list = byRow[rk].sort((a, b) => a.col - b.col);
    const k = list.length;
    list.forEach((p, i) => {
      const x = ((i + 1) / (k + 1)) * 100;
      const span = maxRow === minRow ? 0.5 : (p.row - minRow) / (maxRow - minRow);
      const y = BOT - span * (BOT - TOP); // lowest row (GK) at the bottom
      placed.push({ ...p, x: Math.max(9, Math.min(91, x)), y });
    });
  });
  return placed;
}

function Pitch({ xi, side, onOpen }) {
  if (!xi || xi.length === 0) return <EmptyState title="Lineup pending" sub="The XI will appear here once it is published." />;
  const placed = layoutXI(xi);
  const color = side === 'home' ? 'var(--teal)' : 'var(--coral)';
  return (
    <svg className="pitch" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Formation">
      <rect x="2" y="2" width="96" height="146" rx="3" className="pl" />
      <line x1="2" y1="75" x2="98" y2="75" className="pl" />
      <circle cx="50" cy="75" r="11" className="pl" />
      <rect x="29" y="2" width="42" height="18" className="pl" />
      <rect x="29" y="130" width="42" height="18" className="pl" />
      {placed.map((p) => (
        <g key={p.id} className="pnode" role="button" tabIndex={0}
          onClick={() => onOpen(p.id, p.name)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(p.id, p.name))}>
          <circle cx={p.x} cy={p.y} r="9" fill="transparent" />
          <circle cx={p.x} cy={p.y} r="5.4" className="dotc" style={{ fill: color }} />
          <text x={p.x} y={p.y} className="num" dominantBaseline="central" textAnchor="middle">{p.number ?? ''}</text>
          <text x={p.x} y={p.y + 10} className="plbl" textAnchor="middle">{surname(p.name)}</text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- starting lineups (official, else designed pre-match panel) ---------- */
function LikelyXI({ name, side, players }) {
  return (
    <div>
      <h4 className={`pitchteam ${side}`}>{name}</h4>
      {players && players.length ? (
        <div className="likely">
          {players.map((p, i) => (
            <div className="likely-row" key={i}>
              <span className="likely-pos">{p.pos}</span>
              <span className="likely-nm">{p.nm}</span>
              {p.club && <span className="likely-club">{p.club}</span>}
            </div>
          ))}
        </div>
      ) : <EmptyState title="Key names to follow appear here" sub="Full squad is listed below." />}
      <div className="pitchcap">Most likely to feature · full squad below</div>
    </div>
  );
}

function ExpectedOrOfficialLineups({ home, away, homeCode, awayCode, homePlayers, awayPlayers, date, onOpen }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setData(null); setErr(null);
    (async () => {
      try {
        const r = await fetch(`/api/lineups?home=${encodeURIComponent(home)}&away=${encodeURIComponent(away)}&date=${date || ''}`);
        const d = await r.json();
        if (!cancelled) (d.error ? setErr(d.error) : setData(d));
      } catch (e) {
        if (!cancelled) setErr(String(e));
      }
    })();
    return () => { cancelled = true; };
  }, [home, away, date]);

  const openFor = (sideKey) => (id, nm) => onOpen(id, nm, sideKey === 'home' ? homeCode : awayCode);

  if (err) return <EmptyState title="Lineups unavailable right now" sub="Check back closer to kickoff." />;
  if (!data) return <div className="muted"><span className="spin" />checking for lineups…</div>;

  if (data.status === 'official') {
    const lus = data.lineups || [];
    return (
      <>
        <div className="lineuphd">
          <Tag tone="official">Official{data.updated && <span className="ago">· {timeAgo(data.updated)}</span>}</Tag>
          <span>Confirmed starting XI, published by the teams.</span>
        </div>
        <div className="squadgrid">
          {lus.map((lu, i) => {
            const sideKey = i === 0 ? 'home' : 'away';
            return (
              <div key={i}>
                <h4 className={`pitchteam ${sideKey}`}>{lu.team?.name}{lu.formation ? ` · ${lu.formation}` : ''}</h4>
                <div className="pitchwrap">
                  <Pitch side={sideKey} onOpen={openFor(sideKey)}
                    xi={(lu.startXI || []).map((e) => ({ id: e.player?.id, name: e.player?.name, number: e.player?.number, pos: e.player?.pos, grid: e.player?.grid }))} />
                </div>
                {lu.coach?.name && <div className="pitchcap">Coach: {lu.coach.name}</div>}
              </div>
            );
          })}
        </div>
        {lus.length === 1 && <div className="muted" style={{ marginTop: 10 }}>The other side&apos;s XI hasn&apos;t been published yet. Check back shortly.</div>}
      </>
    );
  }

  // Designed pre-match state: ESPN has no predicted XI, so we surface the key
  // players most likely to feature (verified data) until the official XI drops.
  return (
    <>
      <div className="prelineup-msg">
        <Tag tone="projected">Pre-match</Tag>
        <span>The official starting XIs are released about an hour before kickoff. Until then, here are the players most likely to feature.</span>
      </div>
      <div className="squadgrid">
        <LikelyXI name={home} side="home" players={homePlayers} />
        <LikelyXI name={away} side="away" players={awayPlayers} />
      </div>
    </>
  );
}

/* ---------- player profile modal ---------- */
function PlayerPhoto({ src, name }) {
  const [bad, setBad] = useState(false);
  const initial = (name || '?').charAt(0).toUpperCase();
  if (!src || bad) return <div className="pphoto fallback">{initial}</div>;
  return <img className="pphoto" src={src} alt={name} loading="lazy" onError={() => setBad(true)} />;
}
function Cell({ k, v }) {
  return <div className="statcell"><div className="k">{k}</div><div className="v">{v}</div></div>;
}

function PlayerModal({ id, name, teamCode, photo, onClose }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setData(null); setErr(null);
    (async () => {
      try {
        const r = await fetch(`/api/player?id=${id}${teamCode ? `&team=${teamCode}` : ''}`);
        const d = await r.json();
        if (!cancelled) (d.error ? setErr(d.error) : setData(d));
      } catch (e) {
        if (!cancelled) setErr(String(e));
      }
    })();
    return () => { cancelled = true; };
  }, [id, teamCode]);

  const p = data?.player, wc = data?.wc;
  return (
    <div className="scrim playerscrim" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet playersheet" role="dialog" aria-modal="true">
        <div className="mh">
          <div>
            <h3 className="matchup" style={{ fontSize: 22 }}>{p?.name || name}</h3>
            {p && <div className="meta">{[p.position, p.nationality].filter(Boolean).map((x, i) => <span key={i}>{x}</span>)}</div>}
          </div>
          <button className="x" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="mbody">
          {!data && !err && <div className="muted"><span className="spin" />loading profile…</div>}
          {err && <EmptyState title="Profile unavailable right now" sub="Please try again in a moment." />}
          {data && !p && (
            <>
              <div className="pbio">
                <PlayerPhoto key={photo} src={photo} name={name} />
                <div className="pmeta"><div><b>{name}</b></div></div>
              </div>
              <EmptyState title="Detailed profile coming soon" sub="We don't have a full profile for this player on the free feed yet. Their photo and squad number are shown above." />
            </>
          )}
          {p && (
            <>
              <div className="pbio">
                <PlayerPhoto key={photo || p.photo} src={photo || p.photo} name={p.name} />
                <div className="pmeta">
                  {p.age != null && <div><b>{p.age}</b> years old</div>}
                  {(p.height || p.weight) && <div>{[p.height, p.weight].filter(Boolean).join(' · ')}</div>}
                  {p.injured && <span className="injbadge">⚠ Currently injured</span>}
                </div>
              </div>

              <div className="wccard">
                <div className="stamp">◆ World Cup</div>
                {wc && wc.apps > 0 ? (
                  <div className="statgrid">
                    <Cell k="Apps" v={wc.apps} />
                    <Cell k="Goals" v={wc.goals} />
                    <Cell k="Assists" v={wc.assists} />
                    <Cell k="Minutes" v={wc.minutes} />
                    <Cell k="Rating" v={wc.rating || 'N/A'} />
                    <Cell k="Cards" v={`${wc.yellow}Y ${wc.red}R`} />
                  </div>
                ) : (
                  <div className="wcempty">
                    <p>The 2026 World Cup hasn&apos;t kicked off for them yet. Live tournament stats will appear here once they play.</p>
                    {data.careerWcGoals ? (
                      <div className="wc">
                        <span className="total">{data.careerWcGoals.total} <small>career WC goal{data.careerWcGoals.total === 1 ? '' : 's'}</small></span>
                        {data.careerWcGoals.byYear.map(([y, n]) => <span className="yr" key={y}>&apos;{y.slice(2)} <i>×</i>{n}</span>)}
                      </div>
                    ) : (
                      <div className="wc"><span className="yr" style={{ color: 'var(--mute)' }}>No previous World Cup goals on record</span></div>
                    )}
                  </div>
                )}
              </div>

              <div className="scope">Bio and verified World Cup goals are shown above. Deep club &amp; per-match stats aren&apos;t available on the free data source; live tournament stats appear here once they play.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- team analysis (lazy) ---------- */
function FormChips({ s }) {
  if (!s) return null;
  return (
    <div className="formchips">
      {s.split('').map((r, i) => (
        <span key={i} className={r === 'W' ? 'fw' : r === 'D' ? 'fd' : 'fl'}>{r}</span>
      ))}
    </div>
  );
}

function TeamFormCard({ name, side }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`/api/team-form?team=${encodeURIComponent(name)}`);
        const j = await r.json();
        if (!cancelled) (j.error ? setErr(j.error) : setD(j));
      } catch (e) {
        if (!cancelled) setErr(String(e));
      }
    })();
    return () => { cancelled = true; };
  }, [name]);

  return (
    <div className={`sqcol ${side}`}>
      <h4>{name}</h4>
      {!d && !err && <div className="muted"><span className="spin" />analysing recent form…</div>}
      {(err || (d && d.played === 0)) && <EmptyState title="Form unlocks at kickoff" sub={`Recent-match analysis appears once ${name} plays its first World Cup match.`} />}
      {d && d.played > 0 && (
        <>
          <FormChips s={d.formString} />
          <div className="statbox">
            <span>record <b>{d.wins}-{d.draws}-{d.losses}</b></span>
            <span>scored <b>{d.gfAvg}</b>/g</span>
            <span>conceded <b>{d.gaAvg}</b>/g</span>
            <span>clean sheets <b>{d.cleanSheets}</b></span>
          </div>
          {d.lowSample ? (
            <div className="muted" style={{ marginTop: 8 }}>Limited recent games. Read with caution.</div>
          ) : (
            <>
              {d.strengths.length > 0 && <ul className="swlist sw-pos">{d.strengths.map((x, i) => <li key={i}>{x}</li>)}</ul>}
              {d.weaknesses.length > 0 && <ul className="swlist sw-neg">{d.weaknesses.map((x, i) => <li key={i}>{x}</li>)}</ul>}
            </>
          )}
        </>
      )}
    </div>
  );
}

function HowTheyMatchUp({ hn, an, date }) {
  const [d, setD] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`/api/matchup?home=${encodeURIComponent(hn)}&away=${encodeURIComponent(an)}&date=${date || ''}`);
        const j = await r.json();
        if (!cancelled) setD(j);
      } catch {
        if (!cancelled) setD({ available: false });
      }
    })();
    return () => { cancelled = true; };
  }, [hn, an, date]);

  if (!d) return null;
  if (!d.available || !d.percent) {
    return <div style={{ marginTop: 16 }}><div className="muted">A pre-match model verdict isn&apos;t published for this tie yet.</div></div>;
  }
  const hpc = parseInt(d.percent.home, 10) || 0;
  const dpc = parseInt(d.percent.draw, 10) || 0;
  const apc = parseInt(d.percent.away, 10) || 0;
  return (
    <div style={{ marginTop: 18 }}>
      <Lbl tag={d.advice ? <Tag tone="verified">Odds</Tag> : null}>Model verdict</Lbl>
      <div className="probbar">
        <span className="pb-h" style={{ width: hpc + '%' }} />
        <span className="pb-d" style={{ width: dpc + '%' }} />
        <span className="pb-a" style={{ width: apc + '%' }} />
      </div>
      <div className="problabels">
        <span style={{ color: 'var(--teal)' }}>{hn} {hpc}%</span>
        <span>Draw {dpc}%</span>
        <span style={{ color: 'var(--coral)' }}>{an} {apc}%</span>
      </div>
      {d.advice && <div className="pitchcap" style={{ marginTop: 8 }}>{d.advice}</div>}
    </div>
  );
}

function TeamAnalysis({ hn, an, date }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="block">
      <Lbl>How they play</Lbl>
      {!open ? (
        <button className="analysebtn" onClick={() => setOpen(true)}>Show recent form &amp; matchup ▾</button>
      ) : (
        <>
          <div className="squadgrid">
            <TeamFormCard name={hn} side="home" />
            <TeamFormCard name={an} side="away" />
          </div>
          <HowTheyMatchUp hn={hn} an={an} date={date} />
          <div className="scope">Recent-form analysis fills in once World Cup matches are played; the matchup split, when available, is implied from pre-match odds. The tale of the tape above gives head-to-head pedigree now.</div>
        </>
      )}
    </div>
  );
}

/* ---------- editorial chips, call tracker, stakes, watch-for ---------- */
function UpsetMeter({ value }) {
  const u = UPSET[value] || UPSET['live-underdog-chance'];
  return (
    <span className={`upset upset-${u.tone}`} title={`Editorial signal: ${u.label}`}>
      <span className="upset-bars">
        {[1, 2, 3, 4].map((i) => <span key={i} className={i <= u.level ? 'on' : ''} />)}
      </span>
      {u.label}
    </span>
  );
}

function MatchChips({ ed }) {
  return (
    <div className="matchchips">
      <UpsetMeter value={ed.upset} />
      {(ed.tags || []).map((t) => <span className="ptag" key={t}>{t}</span>)}
    </div>
  );
}

const CALL_STATUS_LABEL = { pending: 'Pending', correct: 'Correct', close: 'Close', missed: 'Missed' };
function CallTrack({ call }) {
  if (!call) return null;
  const status = call.status || 'pending';
  return (
    <div className="callbar">
      <span className="callbar-k">My call</span>
      <span className="callbar-v">{call.label} · {confLabel(call.confidence)}</span>
      <span className={`callstatus ${status}`}>{CALL_STATUS_LABEL[status] || 'Pending'}</span>
    </div>
  );
}

function Stakes({ text }) {
  if (!text) return null;
  return (
    <div className="block">
      <Lbl>Why this match matters</Lbl>
      <div className="stakescard">
        <span className="stakes-bullet" />
        <p className="stakes-text">{text}</p>
      </div>
    </div>
  );
}

/* ---------- storyline narrative lede ---------- */
function StorylineLede({ storyline }) {
  if (!storyline) return null;
  const meta = STORYLINES[storyline.kind] || { label: 'Match preview', tone: 'mute' };
  const toneMap = { gold: 'gold', teal: 'teal', coral: 'coral', mute: 'mute' };
  const tone = toneMap[meta.tone] || 'mute';
  return (
    <div className={`storyline storyline-${tone}`}>
      <span className={`storytag storytag-${tone}`}>{meta.label}</span>
      <p className="storytext">{storyline.text}</p>
    </div>
  );
}

/* ---------- group context card ---------- */
function GroupContext({ gc }) {
  if (!gc) return null;
  return (
    <div className="block">
      <Lbl tag={<Tag tone="verified">Group</Tag>}>Route through the group</Lbl>
      <div className="gccard">
        <div className="gccard-label">{gc.label}</div>
        <p className="gccard-text">{gc.text}</p>
      </div>
    </div>
  );
}

function WatchFor({ items, custom, flip }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="block">
      <Lbl tag={custom ? <Tag tone="verified">Editorial</Tag> : null}>What to watch for</Lbl>
      <ul className="watchlist">
        {items.map((w, i) => (
          <li key={i}>
            <div className="watch-h">{w.h}</div>
            <div className="watch-p">{w.p}</div>
          </li>
        ))}
      </ul>
      {flip && (
        <div className="flipcard">
          <div className="flipcard-k">If this happens, the game flips</div>
          <div className="flipcard-trigger">{flip.trigger}</div>
          <div className="flipcard-outcome">{flip.outcome}</div>
        </div>
      )}
      {!custom && (
        <div className="watchnote">More match-specific signals appear as kickoff approaches.</div>
      )}
    </div>
  );
}

/* ---------- pre-match watchlist (compact 4-tile glance card) ---------- */
function Watchlist({ wl }) {
  if (!wl) return null;
  const players = wl.players || [];
  return (
    <div className="block">
      <Lbl>Pre-match watchlist</Lbl>
      <div className="wlgrid">
        <div className="wlcell wlcell-players">
          <div className="wlcell-k">Players to watch</div>
          {players.length ? (
            <ul className="wlplayers">{players.map((p, i) => <li key={i}>{p}</li>)}</ul>
          ) : <div className="wlcell-v muted">Names firm up nearer to kickoff.</div>}
        </div>
        <div className="wlcell wlcell-battle">
          <div className="wlcell-k">Tactical battle</div>
          <p className="wlcell-v">{wl.battle}</p>
        </div>
        <div className="wlcell wlcell-xfactor">
          <div className="wlcell-k">X-factor</div>
          <p className="wlcell-v">{wl.xfactor}</p>
        </div>
        <div className="wlcell wlcell-surprise">
          <div className="wlcell-k">Possible surprise</div>
          <p className="wlcell-v">{wl.surprise}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- player spotlight (editorial cards) ---------- */
function PlayerSpotlight({ spotlight, m, T }) {
  if (!spotlight || spotlight.length === 0) return null;
  return (
    <div className="block">
      <Lbl tag={<Tag tone="verified">Editorial</Tag>}>Spotlight players</Lbl>
      <div className="spotgrid">
        {spotlight.map((p, i) => {
          const side = p.code === m.h ? 'home' : 'away';
          const team = T?.[p.code]?.n;
          const initial = (p.name || '?').charAt(0).toUpperCase();
          return (
            <article className={`spotcard spotcard-${side}`} key={i}>
              <div className="spothead">
                <div className={`spotavatar ${side}`}>{initial}</div>
                <div>
                  <div className="spotname">{p.name}</div>
                  <div className="spotrole">{[p.role, team].filter(Boolean).join(' · ')}</div>
                </div>
              </div>
              {p.why && (
                <div className="spotsec">
                  <div className="spotsec-k">Why he matters</div>
                  <p>{p.why}</p>
                </div>
              )}
              {p.watch && (
                <div className="spotsec">
                  <div className="spotsec-k">What to watch</div>
                  <p>{p.watch}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- team identity cards (2-column) ---------- */
function TeamIdentityCard({ code, side, T }) {
  const id = getTeamIdentity(code, T);
  const team = T?.[code];
  const chem = id.chemistry ? CHEMISTRY[id.chemistry] : null;
  const labelCase = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '—');
  return (
    <div className={`idcard idcard-${side}`}>
      <h4 className={`idteam ${side}`}>{team?.n || code}</h4>
      <dl className="idstats">
        <div><dt>Style</dt><dd>{labelCase(id.style)}</dd></div>
        <div><dt>Tempo</dt><dd>{labelCase(id.tempo)}</dd></div>
        <div><dt>Threat</dt><dd>{id.threat || '—'}</dd></div>
        <div><dt>Risk</dt><dd>{id.risk || '—'}</dd></div>
      </dl>
      <div className="idfoot">
        {chem && <span className={`chem chem-${chem.tone}`}>{chem.label}</span>}
        {id.coach && id.coach !== '—' && <span className="idcoach">Coach: {id.coach}</span>}
      </div>
    </div>
  );
}
function TeamIdentity({ m, T }) {
  return (
    <div className="block">
      <Lbl tag={<Tag tone="verified">Team identity</Tag>}>How each side plays</Lbl>
      <div className="squadgrid">
        <TeamIdentityCard code={m.h} side="home" T={T} />
        <TeamIdentityCard code={m.a} side="away" T={T} />
      </div>
    </div>
  );
}

/* ---------- coach battle (compact comparison, conditional) ---------- */
function CoachBattle({ cb }) {
  if (!cb || !cb.home || !cb.away) return null;
  return (
    <div className="block">
      <Lbl>Coach battle</Lbl>
      <div className="cbgrid">
        <div className="cbcard cbcard-home">
          <div className="cbname">{cb.home.name}</div>
          {cb.home.tag && <div className="cbtag cbtag-home">{cb.home.tag}</div>}
          {cb.home.note && <p className="cbnote">{cb.home.note}</p>}
        </div>
        <div className="cbcard cbcard-away">
          <div className="cbname">{cb.away.name}</div>
          {cb.away.tag && <div className="cbtag cbtag-away">{cb.away.tag}</div>}
          {cb.away.note && <p className="cbnote">{cb.away.note}</p>}
        </div>
      </div>
      {cb.edge && (
        <div className="cbedge">
          <span className="cbedge-k">The edge</span>
          <span className="cbedge-v">{cb.edge}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- danger zones (SVG pitch + numbered legend) ---------- */
function DangerZones({ zones, m, T }) {
  if (!zones || zones.length === 0) return null;
  const homeName = T?.[m.h]?.n || 'Home';
  const awayName = T?.[m.a]?.n || 'Away';
  return (
    <div className="block">
      <Lbl tag={<Tag tone="verified">Tactical</Tag>}>Danger zones</Lbl>
      <div className="zoneswrap">
        <svg className="zonespitch" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Tactical danger zones">
          <rect x="2" y="2" width="96" height="146" rx="3" className="pl" />
          <line x1="2" y1="75" x2="98" y2="75" className="pl" />
          <circle cx="50" cy="75" r="11" className="pl" />
          <rect x="29" y="2" width="42" height="18" className="pl" />
          <rect x="29" y="130" width="42" height="18" className="pl" />
          <text x="50" y="11" className="zsidelbl" textAnchor="middle">{awayName}</text>
          <text x="50" y="146" className="zsidelbl" textAnchor="middle">{homeName}</text>
          {zones.map((z, i) => {
            const c = ZONE_COORDS[z.area];
            if (!c) return null;
            const tone = z.side === 'h' ? 'home' : 'away';
            const cx = c.x + c.w / 2, cy = c.y + c.h / 2;
            return (
              <g key={i} className={`zone zone-${tone}`}>
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="3" className="zrect" />
                <circle cx={cx} cy={cy} r="5" className="znumc" />
                <text x={cx} y={cy} className="znum" dominantBaseline="central" textAnchor="middle">{i + 1}</text>
              </g>
            );
          })}
        </svg>
        <ol className="zoneslegend">
          {zones.map((z, i) => (
            <li key={i} className={`zoneleg-${z.side === 'h' ? 'home' : 'away'}`}>
              <span className="zoneleg-num">{i + 1}</span>
              <span className="zoneleg-txt">{z.label}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="pitchcap">Editorial zones — where the match is most likely to be decided.</div>
    </div>
  );
}

/* ---------- "my thoughts" tactical column ---------- */
function MyThoughts({ take }) {
  const initials = AUTHOR.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className="block">
      <Lbl tag={<Tag tone="verified">Editorial</Tag>}>My thoughts</Lbl>
      <div className="takebox">
        <div className="takehead">
          <div className="takeavatar">{initials}</div>
          <div>
            <div className="takeby">{AUTHOR}</div>
            <div className="takemeta">Full match preview</div>
          </div>
        </div>
        {take.standfirst && <p className="takelede">{take.standfirst}</p>}
        {(take.sections || []).map((s, i) => (
          <div className="takesec" key={i}>
            <h5>{s.h}</h5>
            <p>{s.p}</p>
          </div>
        ))}
        {take.verdict && (
          <div className="takeverdict"><span className="takeverdict-k">My verdict</span>{take.verdict}</div>
        )}
      </div>
    </div>
  );
}

/* ---------- match detail modal ---------- */
function MatchDetail({ m, T, onClose, onOpenPlayer }) {
  const h = T[m.h], a = T[m.a];
  const fav = m.fav === 'h' ? h : m.fav === 'a' ? a : null;
  const ed = getEditorial(m, T);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return (
    <div className="scrim" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet" role="dialog" aria-modal="true">
        <div className="mh">
          <div>
            <h3 className="matchup">{h.f} {h.n} <span style={{ color: 'var(--mute)', fontWeight: 400 }}>v</span> {a.n} {a.f}</h3>
            <div className="meta">
              <span>Group {m.grp}</span>
              <span>{m.ds}</span>
              <span><b>{m.t} {m.z}</b></span>
              <span>{m.v}, {m.c}</span>
            </div>
          </div>
          <button className="x" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="mbody">
          <StorylineLede storyline={ed.storyline} />

          <div className="block">
            <div className="verdictbox">
              <div className="stamp">◆ Projected result</div>
              <div className="pick">
                {fav ? <><span className="flag">{fav.f}</span>{fav.n} to win</> : <>Too close to call</>}
                <span className={`cf ${m.conf}`}>{confLabel(m.conf)}</span>
              </div>
              <p>{m.why}</p>
              <CallTrack call={ed.call} />
            </div>
            <MatchChips ed={ed} />
          </div>

          <Watchlist wl={ed.watchlist} />

          <Stakes text={ed.stakes} />

          <GroupContext gc={ed.groupContext} />

          {m.take && <MyThoughts take={m.take} />}

          <WatchFor items={ed.watch} custom={ed.watchIsCustom} flip={ed.flip} />

          <PlayerSpotlight spotlight={ed.spotlight} m={m} T={T} />

          <div className="block">
            <Lbl>Tale of the tape</Lbl>
            <div className="teamnames">
              <div className="tn left"><span className="dot" /><span className="flag">{h.f}</span>{h.n}</div>
              <div className="tn right">{a.n}<span className="flag">{a.f}</span><span className="dot" /></div>
            </div>
            <div className="tape">
              <Tot label="WC titles" hv={h.titles} av={a.titles} hw={h.titles} aw={a.titles} />
              <Tot label="Group-winner odds" hv={h.odds} av={a.odds} hw={rankWeight(h.odds)} aw={rankWeight(a.odds)} />
              <Tot label="Confederation" hv={h.cf} av={a.cf} hw={1} aw={1} />
            </div>
            <div className="bestfin">
              <div className="l"><span className="k">Best WC finish</span><br />{h.best}</div>
              <div className="r"><span className="k">Best WC finish</span><br />{a.best}</div>
            </div>
          </div>

          <TeamIdentity m={m} T={T} />

          <CoachBattle cb={ed.coachBattle} />

          <DangerZones zones={ed.zones} m={m} T={T} />

          <div className="block">
            <Lbl>Starting lineups</Lbl>
            <ExpectedOrOfficialLineups home={h.n} away={a.n} homeCode={m.h} awayCode={m.a}
              homePlayers={h.players} awayPlayers={a.players} date={fixtureDate(m)} onOpen={onOpenPlayer} />
          </div>

          <TeamAnalysis hn={h.n} an={a.n} date={fixtureDate(m)} />

          <div className="block">
            <Lbl tag={<Tag tone="live">Live · ESPN</Tag>}>Full squads</Lbl>
            <div className="squadgrid">
              <LiveSquad name={h.n} side="home" teamCode={m.h} onOpen={onOpenPlayer} />
              <LiveSquad name={a.n} side="away" teamCode={m.a} onOpen={onOpenPlayer} />
            </div>
            <div className="scope">Squads and lineups come live from ESPN; player headshots from API-Football. Tap any player for their profile.</div>
          </div>

          <div className="block">
            <Lbl tag={<Tag tone="verified">Verified</Tag>}>Marquee players</Lbl>
            <div className="pcols">
              <div className="pcol home"><h4>{h.f} {h.n}</h4>{h.players.map((p, i) => <MarqueeCard p={p} key={i} />)}</div>
              <div className="pcol away"><h4>{a.f} {a.n}</h4>{a.players.map((p, i) => <MarqueeCard p={p} key={i} />)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MatchExplorer({ T, M }) {
  const [open, setOpen] = useState(null);
  const [player, setPlayer] = useState(null); // { id, name, teamCode, photo }
  const playerRef = useRef(null);
  playerRef.current = player;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (playerRef.current) setPlayer(null); // close the player profile first
      else setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openPlayer = (id, name, teamCode, photo) => setPlayer({ id, name, teamCode, photo });
  const closeMatch = () => { setOpen(null); setPlayer(null); };

  const days = [...new Set(M.map((m) => m.d))];
  return (
    <section>
      {days.map((day) => {
        const list = M.filter((m) => m.d === day);
        return (
          <div className="daygroup" key={day}>
            <div className="dayhead">
              <h2>{list[0].ds}</h2><div className="rule" />
              <div className="count">{list.length} {list.length === 1 ? 'match' : 'matches'}</div>
            </div>
            {list.map((m) => {
              const i = M.indexOf(m);
              const h = T[m.h], a = T[m.a];
              const fav = m.fav === 'h' ? h : m.fav === 'a' ? a : null;
              return (
                <button className="match" key={i} onClick={() => setOpen(i)}>
                  <div className="kick"><div className="t">{m.t}</div><div className="z">{m.z}</div></div>
                  <div className="fixture">
                    <div className="grp">Group {m.grp}</div>
                    <div className="teams">
                      <span className="side"><span className="flag">{h.f}</span>{h.n}</span>
                      <span className="vs">v</span>
                      <span className="side"><span className="flag">{a.f}</span>{a.n}</span>
                    </div>
                    <div className="venueline">{m.v} · {m.c}</div>
                  </div>
                  <div className="verdict">
                    {fav
                      ? <><span className="vchip"><span className="flag">{fav.f}</span>{firstName(fav.n)}</span><span className={`conf ${m.conf}`}>{confLabel(m.conf)}</span></>
                      : <><span className="vchip" style={{ color: 'var(--coral)', borderColor: 'rgba(255,111,97,.4)', background: 'rgba(255,111,97,.08)' }}>Even</span><span className="conf toss">{confLabel(m.conf)}</span></>}
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
      {open !== null && <MatchDetail m={M[open]} T={T} onClose={closeMatch} onOpenPlayer={openPlayer} />}
      {player && <PlayerModal id={player.id} name={player.name} teamCode={player.teamCode} photo={player.photo} onClose={() => setPlayer(null)} />}
    </section>
  );
}
