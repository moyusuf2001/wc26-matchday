// ---------------------------------------------------------------------------
// Editorial layer — per-match, per-team and tournament-wide structured content.
// All fields are optional; helpers merge sensible auto-derived defaults so every
// match and team renders intentional, premium content even with sparse data.
//
// Per-match (keyed by `${m.h}-${m.a}` in EDITORIAL):
//   stakes        one-line "why this match matters" prose
//   tags          1–3 personality tags
//   upset         'low-risk' | 'live-underdog-chance' | 'real-upset-threat' | 'chaos-potential'
//   watch         3–5 "what to watch for" bullets
//   flip          { trigger, outcome } turning-point card
//   call          { pick, label, confidence, status, actual } prediction tracker
//   zones         2–4 tactical danger zones for the pitch visual
//   coachBattle   { home, away, edge } compact coach comparison
//   spotlight     [{ code, name, role, why, watch }] richer player spotlights
//   watchlist     { players[], battle, xfactor, surprise } quick-glance card
//   storyline     { kind, text } narrative lede above the verdict
//   groupContext  { label, text } "Route through the group" strategic context
//
// Per-team (in TEAM_IDENTITY): { style, tempo, threat, risk, chemistry, coach }
// Tournament-wide: TOURNAMENT_THEMES[] homepage editorial cards.
// ---------------------------------------------------------------------------

export const EDITORIAL = {
  'MEX-RSA': {
    storyline: { kind: 'host-pressure', text: 'Mexico open the whole tournament at the Azteca, with the entire host nation watching. Opening-night pressure is the dominant narrative.' },
    stakes: 'Opening-night pressure on a host nation. The whole tournament starts here, and Mexico have everything to lose at the Azteca.',
    groupContext: { label: 'Must-win opener', text: 'Mexico need to set the tempo of Group A and bank an early result before the trickier games against Korea and Czechia. Three points here puts the host nation in control of their destiny.' },
    tags: ['Upset trap', 'Set-piece war'],
    upset: 'live-underdog-chance',
    watch: [
      { h: 'First 15 minutes', p: 'Tone-setter for the entire night. If Mexico go ahead early, the Azteca takes care of the rest.' },
      { h: "South Africa's set pieces", p: "Bafana's clearest path to a goal. Williams keeps them in it, and one dead-ball moment could be the whole story." },
      { h: 'Edson Álvarez vs the counter', p: 'The single duel that decides whether Mexico are ever exposed in transition.' },
      { h: 'Altitude exchange', p: "The Highveld levels the lungs. Watch whether Mexico's usual third-quarter surge actually arrives." },
      { h: 'Bench depth', p: 'Aguirre has Santiago Giménez to gamble with after the hour. Broos cannot match that.' },
    ],
    flip: { trigger: 'If South Africa score first', outcome: 'Mexico are forced to break down a low block under Azteca anxiety. A long, nervy night and a real upset opening becomes the live scenario.' },
    call: { pick: 'MEX', label: 'Mexico to win', confidence: 'lean', status: 'pending', actual: null },
    zones: [
      { area: 'right-flank-top', side: 'h', label: "Mexico's right-side overlap (Sánchez & Lozano)" },
      { area: 'set-piece-bottom', side: 'a', label: "South Africa's dead-ball threat into the Mexico box" },
      { area: 'transition-lane', side: 'a', label: 'Counter-attacking lane for Tau & Foster' },
    ],
    coachBattle: {
      home: { name: 'Javier Aguirre', tag: 'Pragmatic veteran', note: 'Third cycle in charge. Tournament-tested and conservative when the pressure peaks.' },
      away: { name: 'Hugo Broos', tag: 'Counter-puncher', note: 'AFCON-winning manager. Compact 4-4-2, ruthless on transitions, comfortable being the underdog.' },
      edge: 'Aguirre has the deeper bench and pre-match weight. Broos has the looser mental load and a proven plan against bigger sides.',
    },
    spotlight: [
      { code: 'MEX', name: 'Edson Álvarez', role: 'Defensive shield', why: 'Decides whether Mexico are ever exposed in transition. If he wins the central duels, the favourites coast.', watch: 'Where he picks up Tau and Foster — drops he covers, gaps he leaves when full-backs join.' },
      { code: 'RSA', name: 'Ronwen Williams', role: 'The wall', why: 'Single-handedly carried Bafana through AFCON 2024. Top-tier shot-stopper and the difference between 0-1 and 1-1.', watch: 'Late-game shot-stopping. He typically rises in the tough moments — exactly what gives South Africa their point.' },
    ],
    watchlist: {
      players: ['Edson Álvarez', 'Ronwen Williams', 'Lyle Foster'],
      battle: "Mexico's full-backs vs Tau & Foster in behind",
      xfactor: 'Set pieces at either end',
      surprise: 'Azteca opening-night nerves if Bafana stay close past the hour',
    },
  },

  'KOR-CZE': {
    storyline: { kind: 'tone-setter', text: 'A direct fight for second behind Mexico. The Matchday-1 result here likely shapes the entire group, and the bracket beyond it.' },
    stakes: 'A genuine coin-flip for second behind Mexico. Three points here all but books a Round of 32 ticket and changes the whole group.',
    groupContext: { label: 'Group A second-place duel', text: 'A direct fight for the runner-up spot behind Mexico. The winner is in the box seat to progress; a draw leaves both needing a result against the hosts and the third-place lottery.' },
    tags: ['Chess match', 'Set-piece war'],
    upset: 'real-upset-threat',
    watch: [
      { h: "Korea's high line vs Schick", p: 'Most dangerous duel on the pitch. Kim Min-jae has to win every recovery race against a clinical finisher.' },
      { h: 'Lee Kang-in in the half-spaces', p: "Korea's creative key. If he gets time on the ball, the chances follow." },
      { h: 'Souček in the box', p: 'Aerial threat from every dead ball. Korean zonal marking will be tested early and often.' },
      { h: 'Second balls in midfield', p: 'Czechia want it scrappy. Whoever wins the loose-ball battle controls the tempo.' },
      { h: 'Game state after the hour', p: 'Both benches are thin. Whoever leads at 70 minutes is very likely to hold on.' },
    ],
    flip: { trigger: 'If Czechia score from a set piece first', outcome: 'Korea will have to come at them, and Schick lives for that counter-attacking space. The whole match changes shape.' },
    call: { pick: null, label: 'Too close to call', confidence: 'toss', status: 'pending', actual: null },
    zones: [
      { area: 'central-top', side: 'h', label: "Korea's high press through the centre" },
      { area: 'set-piece-bottom', side: 'a', label: "Czechia set-pieces into Korea's box (Souček)" },
      { area: 'half-space-right-top', side: 'h', label: 'Lee Kang-in operating in the right half-space' },
    ],
    coachBattle: {
      home: { name: 'Hong Myung-bo', tag: 'Vertical & aggressive', note: '2002 World Cup semi-finalist as a player. Has Korea pressing high and playing fast, vertical football.' },
      away: { name: 'Ivan Hašek', tag: 'Disciplined & direct', note: 'Veteran Czech coach. Keeps the block compact and lives on set pieces and clinical finishing.' },
      edge: "Hong's pressing structure has more upside; Hašek's clarity of plan makes Czechia the safer pick under pressure.",
    },
    spotlight: [
      { code: 'KOR', name: 'Lee Kang-in', role: 'Half-space conductor', why: 'Most important footballer on the pitch. Korea live or die by his ability to unpick disciplined blocks.', watch: 'His positioning in the right half-space, and whether Czechia sacrifice their structure to deny him space.' },
      { code: 'CZE', name: 'Patrik Schick', role: 'Lone-striker poacher', why: "If fit, one of Europe's cleanest finishers. Czechia's only real path to a goal in open play.", watch: "His timing of runs in behind Korea's high line. Kim Min-jae's recovery pace is the only thing keeping him from gilt-edged chances." },
    ],
    watchlist: {
      players: ['Lee Kang-in', 'Patrik Schick', 'Kim Min-jae'],
      battle: "Korea's high line vs Schick's diagonal runs",
      xfactor: 'Set pieces — Souček is worth a goal every other game from corners',
      surprise: 'A late winner. Both benches are thin, so whoever leads at 75 minutes is very likely to hold on.',
    },
  },

  'BRA-MAR': {
    storyline: { kind: 'dark-horse-watch', text: '2022 semifinalists return with their best squad. If Morocco can hold Brazil here, the whole bracket reads differently for the rest of the tournament.' },
    stakes: '2022 semifinalists meet a tournament giant on Matchday 1. A statement game for both ambitions and group seeding.',
    groupContext: { label: 'Group C opener with seeding implications', text: 'Brazil are heavy favourites to top Group C, but Morocco have the pedigree to grab the runner-up spot — and a draw here changes the knockout path for both. Goal difference may be tight.' },
    tags: ['Technical duel', 'Transition battle'],
    upset: 'real-upset-threat',
    flip: { trigger: 'If Hakimi gets time to overlap', outcome: "Morocco's most dangerous attacking source is unlocked and Brazil's left side is exposed. The pressure to deliver the other way doubles." },
    call: { pick: 'BRA', label: 'Brazil to win', confidence: 'lean', status: 'pending', actual: null },
    zones: [
      { area: 'left-flank-top', side: 'h', label: "Brazil's left side (Vinícius dribbling and 1v1s)" },
      { area: 'right-flank-bottom', side: 'a', label: "Hakimi attacking Brazil's left from deep" },
      { area: 'transition-lane', side: 'a', label: "Morocco's counter-attacking outlet through midfield" },
    ],
    watchlist: {
      players: ['Vinícius Júnior', 'Achraf Hakimi', 'Sofyan Amrabat'],
      battle: 'Vinícius vs Hakimi — two worlds collide on that flank',
      xfactor: "Brazil's set-piece defending — Morocco famously took advantage in 2022",
      surprise: 'A Morocco draw — they have the structure, the pedigree and zero fear',
    },
  },

  'ENG-CRO': {
    storyline: { kind: 'generational-clash', text: 'Bellingham at 22 meets Modrić at 40 — two midfield generations colliding in arguably the toughest opener for either side.' },
    stakes: 'The toughest opponent England face before the latter stages. Goal difference could matter here for top seeding.',
    groupContext: { label: 'Group L statement opener', text: 'England are favourites to win Group L, but Croatia are the only side here who could realistically beat them. Top-seed status — and the easier half of the bracket — may be decided in 90 minutes.' },
    tags: ['Chess match', 'Midfield war'],
    upset: 'live-underdog-chance',
    flip: { trigger: 'If Modrić owns midfield for 30 minutes', outcome: "England's press loses shape and Croatia start finding pockets between the lines. The tactical balance tilts and a draw becomes the live scenario." },
    call: { pick: 'ENG', label: 'England to win', confidence: 'lean', status: 'pending', actual: null },
    zones: [
      { area: 'midfield-zone', side: 'h', label: 'Midfield battle — Bellingham vs Modrić for territory' },
      { area: 'half-space-right-top', side: 'h', label: 'Saka attacking down the right' },
      { area: 'central-bottom', side: 'a', label: "Croatia's patient build-up through midfield" },
    ],
    watchlist: {
      players: ['Jude Bellingham', 'Luka Modrić', 'Joško Gvardiol'],
      battle: 'Bellingham vs Modrić — a generational midfield clash',
      xfactor: "England's press triggers — if they coordinate, Croatia's build-up wobbles",
      surprise: 'A late Croatia equaliser — Modrić still rises in the final fifteen',
    },
  },

  'ESP-CPV': {
    storyline: { kind: 'golden-boot-watch', text: "Spain's deep attack against a World Cup debutant — Yamal, Oyarzabal and Olmo all carry Golden Boot value here." },
    stakes: 'Tournament favourites against a World Cup debutant. The safest-looking result of Matchday 1 and a clean-sheet benchmark for Spain.',
    groupContext: { label: 'Goal-difference statement', text: 'Spain are -450 to win Group H. The margin of victory in this opener could matter once knockouts arrive and top-seed brackets are decided.' },
    tags: ['One-way traffic'],
    upset: 'low-risk',
    call: { pick: 'ESP', label: 'Spain to win', confidence: 'high', status: 'pending', actual: null },
  },

  'ARG-ALG': {
    storyline: { kind: 'legacy-game', text: 'Lionel Messi at 38, a record sixth World Cup, defending the title. Every Argentina appearance from here is a legacy moment.' },
    stakes: 'Defending champions and a Messi farewell tour. A statement opportunity to set the tone for the whole title defence.',
    groupContext: { label: 'Goal-difference statement', text: 'Defending champions Argentina are huge favourites in Group J. A clean sheet plus multiple goals is the ideal Matchday-1 platform for the title defence.' },
    tags: ['One-way traffic', 'Showcase game'],
    upset: 'low-risk',
    call: { pick: 'ARG', label: 'Argentina to win', confidence: 'high', status: 'pending', actual: null },
  },
};

export const UPSET = {
  'low-risk':             { label: 'Low upset risk',       tone: 'low',   level: 1 },
  'live-underdog-chance': { label: 'Live underdog chance', tone: 'live',  level: 2 },
  'real-upset-threat':    { label: 'Real upset threat',    tone: 'real',  level: 3 },
  'chaos-potential':      { label: 'Chaos potential',      tone: 'chaos', level: 4 },
};

export const CHEMISTRY = {
  'host-burden':        { label: 'Host burden',        tone: 'coral' },
  'title-pressure':     { label: 'Title pressure',     tone: 'coral' },
  'underdog-freedom':   { label: 'Underdog freedom',   tone: 'teal' },
  'veteran-composure':  { label: 'Veteran composure',  tone: 'gold' },
  'transition-squad':   { label: 'Transition squad',   tone: 'mute' },
  'expectation-weight': { label: 'Expectation weight', tone: 'gold' },
  'stable-core':        { label: 'Stable core',        tone: 'green' },
  'volatile':           { label: 'Emotionally volatile', tone: 'coral' },
};

// Storyline taxonomy — chip presentation for the narrative lede.
export const STORYLINES = {
  'host-pressure':      { label: 'Host pressure',      tone: 'gold' },
  'revenge-angle':      { label: 'Revenge angle',      tone: 'coral' },
  'dark-horse-watch':   { label: 'Dark-horse watch',   tone: 'teal' },
  'manager-spotlight':  { label: 'Manager spotlight',  tone: 'gold' },
  'golden-boot-watch':  { label: 'Golden Boot watch',  tone: 'gold' },
  'generational-clash': { label: 'Generational clash', tone: 'mute' },
  'legacy-game':        { label: 'Legacy game',        tone: 'gold' },
  'tone-setter':        { label: 'Tone-setter',        tone: 'teal' },
};

// Homepage tournament-themes editorial layer.
export const TOURNAMENT_THEMES = [
  { kind: 'title-favourite',    label: 'Title favourite',    pick: 'Spain',             detail: '+450 to lift the trophy. European champions, deepest squad, most cohesive identity in the field.', tone: 'gold' },
  { kind: 'dark-horse',         label: 'Dark horses',        pick: 'Ecuador · Colombia · Turkey', detail: 'Ecuador have Caicedo and tournament pedigree. Colombia are Copa finalists with James pulling the strings. Turkey have Guler and a squad ready to announce itself.', tone: 'teal' },
  { kind: 'must-watch-opener',  label: 'Must-watch opener',  pick: 'Brazil v Morocco',  detail: '2022 semifinalists meeting Brazil on Matchday 1. The pick of the openers and a live upset wire.', tone: 'gold' },
  { kind: 'volatile-group',     label: 'Group of death',     pick: 'Group I',           detail: 'France and Haaland\'s Norway headline it, but Senegal have knockout pedigree and Iraq are fearless. Someone big is going home early.', tone: 'coral' },
  { kind: 'breakout-star',      label: 'Breakout star watch',pick: 'Lamine Yamal',      detail: '18-year-old Barça superstar at his first World Cup. The breakout name everyone will be talking about.', tone: 'teal' },
  { kind: 'attack-watch',       label: 'Best attack',        pick: 'France',            detail: 'Mbappé pace + Dembélé creativity + Olise on debut. The most potent attacking unit in the field.', tone: 'gold' },
  { kind: 'legacy-farewell',    label: 'Legacy farewell',    pick: 'Cristiano Ronaldo',  detail: "The all-time men's international goalscorer at 41. Portugal's captain at almost certainly his last World Cup, still chasing the one trophy he has never won.", tone: 'coral' },
  { kind: 'headline-storyline', label: 'Headline storyline', pick: 'Messi v Ronaldo: final act', detail: "Both at their last World Cup. Messi defends the title at 38; Ronaldo hunts it at 41. The greatest rivalry in football history gets its final chapter.", tone: 'gold' },
];

export const TEAM_IDENTITY = {
  MEX: { style: 'control',    tempo: 'medium', threat: 'Wings & overlaps',         risk: 'Low-block pressure',  chemistry: 'host-burden',        coach: 'Javier Aguirre' },
  RSA: { style: 'compact',    tempo: 'low',    threat: 'Set pieces & counter',     risk: 'Build-up exposure',   chemistry: 'underdog-freedom',   coach: 'Hugo Broos' },
  KOR: { style: 'pressing',   tempo: 'high',   threat: 'Midfield runners',         risk: 'High line',           chemistry: 'expectation-weight', coach: 'Hong Myung-bo' },
  CZE: { style: 'direct',     tempo: 'medium', threat: 'Set pieces & target man',  risk: 'Recovery pace',       chemistry: 'stable-core',        coach: 'Ivan Hašek' },
  CAN: { style: 'transition', tempo: 'high',   threat: 'Wings & counter',          risk: 'Build-up exposure',   chemistry: 'host-burden',        coach: 'Jesse Marsch' },
  BIH: { style: 'mixed',      tempo: 'medium', threat: 'Striker (Džeko)',          risk: 'Aerial duels',        chemistry: 'veteran-composure',  coach: 'Sergej Barbarez' },
  QAT: { style: 'compact',    tempo: 'low',    threat: 'Afif creativity',          risk: 'Low-block pressure',  chemistry: 'expectation-weight', coach: 'Bartolomé Márquez' },
  SUI: { style: 'compact',    tempo: 'medium', threat: 'Midfield runners',         risk: 'Aerial duels',        chemistry: 'stable-core',        coach: 'Murat Yakın' },
  BRA: { style: 'mixed',      tempo: 'high',   threat: 'Wings (Vinícius, Raphinha)',risk: 'Build-up exposure',  chemistry: 'title-pressure',     coach: 'Carlo Ancelotti' },
  MAR: { style: 'compact',    tempo: 'medium', threat: 'Right side (Hakimi)',      risk: 'Aerial duels',        chemistry: 'expectation-weight', coach: 'Walid Regragui' },
  HAI: { style: 'direct',     tempo: 'medium', threat: 'Pace & target man',        risk: 'Build-up exposure',   chemistry: 'underdog-freedom',   coach: 'Sébastien Migné' },
  SCO: { style: 'mixed',      tempo: 'medium', threat: 'McTominay & set pieces',   risk: 'Recovery pace',       chemistry: 'expectation-weight', coach: 'Steve Clarke' },
  USA: { style: 'pressing',   tempo: 'high',   threat: 'Pulisic & midfield runners',risk: 'High line',          chemistry: 'host-burden',        coach: 'Mauricio Pochettino' },
  PAR: { style: 'compact',    tempo: 'low',    threat: 'Counter & Almirón pace',   risk: 'Build-up exposure',   chemistry: 'underdog-freedom',   coach: 'Gustavo Alfaro' },
  AUS: { style: 'compact',    tempo: 'low',    threat: 'Set pieces & striker',     risk: 'Build-up exposure',   chemistry: 'stable-core',        coach: 'Tony Popovic' },
  TUR: { style: 'mixed',      tempo: 'medium', threat: 'Güler creativity & wings', risk: 'Recovery pace',       chemistry: 'expectation-weight', coach: 'Vincenzo Montella' },
  GER: { style: 'control',    tempo: 'medium', threat: 'Wirtz & Musiala dribbling',risk: 'High line',           chemistry: 'title-pressure',     coach: 'Julian Nagelsmann' },
  CUW: { style: 'compact',    tempo: 'low',    threat: 'Counter & striker',        risk: 'Low-block pressure',  chemistry: 'underdog-freedom',   coach: 'Dick Advocaat' },
  CIV: { style: 'direct',     tempo: 'medium', threat: 'Wings & pace',             risk: 'Build-up exposure',   chemistry: 'transition-squad',   coach: 'Emerse Faé' },
  ECU: { style: 'compact',    tempo: 'medium', threat: 'Caicedo control & Valencia',risk:'Aerial duels',        chemistry: 'stable-core',        coach: 'Sebastián Beccacece' },
  NED: { style: 'mixed',      tempo: 'medium', threat: 'Gakpo & Dumfries',         risk: 'Aerial duels',        chemistry: 'title-pressure',     coach: 'Ronald Koeman' },
  JPN: { style: 'pressing',   tempo: 'high',   threat: 'Wingers & midfield runners',risk:'Aerial duels',        chemistry: 'stable-core',        coach: 'Hajime Moriyasu' },
  SWE: { style: 'direct',     tempo: 'medium', threat: 'Isak–Gyökeres pair',       risk: 'Recovery pace',       chemistry: 'transition-squad',   coach: 'Jon Dahl Tomasson' },
  TUN: { style: 'compact',    tempo: 'low',    threat: 'Counter & set pieces',     risk: 'Build-up exposure',   chemistry: 'underdog-freedom',   coach: 'Sami Trabelsi' },
  BEL: { style: 'mixed',      tempo: 'medium', threat: 'Doku dribbling & KdB',     risk: 'Recovery pace',       chemistry: 'transition-squad',   coach: 'Rudi Garcia' },
  EGY: { style: 'compact',    tempo: 'low',    threat: 'Salah on the counter',     risk: 'Build-up exposure',   chemistry: 'expectation-weight', coach: 'Hossam Hassan' },
  IRN: { style: 'compact',    tempo: 'low',    threat: 'Taremi & set pieces',      risk: 'Build-up exposure',   chemistry: 'stable-core',        coach: 'Amir Ghalenoei' },
  NZL: { style: 'direct',     tempo: 'medium', threat: 'Wood & aerial duels',      risk: 'Recovery pace',       chemistry: 'underdog-freedom',   coach: 'Darren Bazeley' },
  ESP: { style: 'control',    tempo: 'medium', threat: 'Possession & Yamal',       risk: 'High line',           chemistry: 'title-pressure',     coach: 'Luis de la Fuente' },
  CPV: { style: 'compact',    tempo: 'low',    threat: 'Counter & set pieces',     risk: 'Low-block pressure',  chemistry: 'underdog-freedom',   coach: 'Bubista' },
  KSA: { style: 'compact',    tempo: 'medium', threat: 'Al-Dawsari & counter',     risk: 'Aerial duels',        chemistry: 'transition-squad',   coach: 'Hervé Renard' },
  URU: { style: 'mixed',      tempo: 'medium', threat: 'Núñez pace & Valverde',    risk: 'Aerial duels',        chemistry: 'stable-core',        coach: 'Marcelo Bielsa' },
  FRA: { style: 'mixed',      tempo: 'high',   threat: 'Mbappé pace & Dembélé',    risk: 'Recovery pace',       chemistry: 'title-pressure',     coach: 'Didier Deschamps' },
  SEN: { style: 'direct',     tempo: 'high',   threat: 'Jackson & wide pace',      risk: 'Aerial duels',        chemistry: 'expectation-weight', coach: 'Pape Thiaw' },
  IRQ: { style: 'compact',    tempo: 'low',    threat: 'Counter & striker',        risk: 'Build-up exposure',   chemistry: 'underdog-freedom',   coach: 'Graham Arnold' },
  NOR: { style: 'direct',     tempo: 'high',   threat: 'Haaland & long balls',     risk: 'Recovery pace',       chemistry: 'expectation-weight', coach: 'Ståle Solbakken' },
  ARG: { style: 'mixed',      tempo: 'medium', threat: 'Messi creativity & Álvarez',risk:'Aerial duels',        chemistry: 'title-pressure',     coach: 'Lionel Scaloni' },
  ALG: { style: 'direct',     tempo: 'medium', threat: 'Mahrez creativity & Amoura',risk:'Recovery pace',       chemistry: 'transition-squad',   coach: 'Vladimir Petković' },
  AUT: { style: 'pressing',   tempo: 'medium', threat: 'Sabitzer & set pieces',    risk: 'High line',           chemistry: 'stable-core',        coach: 'Ralf Rangnick' },
  JOR: { style: 'compact',    tempo: 'low',    threat: 'Al-Taamari & counter',     risk: 'Build-up exposure',   chemistry: 'underdog-freedom',   coach: 'Jamal Sellami' },
  POR: { style: 'mixed',      tempo: 'medium', threat: 'Ronaldo & Bruno set pieces',risk:'Recovery pace',       chemistry: 'title-pressure',     coach: 'Roberto Martínez' },
  COD: { style: 'direct',     tempo: 'medium', threat: 'Wings & pace',             risk: 'Build-up exposure',   chemistry: 'transition-squad',   coach: 'Sébastien Desabre' },
  UZB: { style: 'compact',    tempo: 'low',    threat: 'Shomurodov & counter',     risk: 'Low-block pressure',  chemistry: 'underdog-freedom',   coach: 'Timur Kapadze' },
  COL: { style: 'control',    tempo: 'medium', threat: 'James creativity & L. Díaz',risk: 'Aerial duels',       chemistry: 'stable-core',        coach: 'Néstor Lorenzo' },
  ENG: { style: 'mixed',      tempo: 'medium', threat: 'Bellingham & Kane',        risk: 'High line',           chemistry: 'title-pressure',     coach: 'Thomas Tuchel' },
  CRO: { style: 'control',    tempo: 'medium', threat: 'Modrić midfield control',  risk: 'Recovery pace',       chemistry: 'veteran-composure',  coach: 'Zlatko Dalić' },
  GHA: { style: 'mixed',      tempo: 'medium', threat: 'Kudus creativity',         risk: 'Build-up exposure',   chemistry: 'transition-squad',   coach: 'Otto Addo' },
  PAN: { style: 'compact',    tempo: 'medium', threat: 'Counter & set pieces',     risk: 'Build-up exposure',   chemistry: 'stable-core',        coach: 'Thomas Christiansen' },
};

export const ZONE_COORDS = {
  'left-flank-top':          { x: 4,  y: 4,   w: 22, h: 40 },
  'right-flank-top':         { x: 74, y: 4,   w: 22, h: 40 },
  'central-top':             { x: 28, y: 4,   w: 44, h: 34 },
  'set-piece-top':           { x: 26, y: 4,   w: 48, h: 22 },
  'half-space-left-top':     { x: 24, y: 14,  w: 20, h: 30 },
  'half-space-right-top':    { x: 56, y: 14,  w: 20, h: 30 },
  'midfield-zone':           { x: 14, y: 60,  w: 72, h: 30 },
  'transition-lane':         { x: 36, y: 36,  w: 28, h: 78 },
  'left-flank-bottom':       { x: 4,  y: 106, w: 22, h: 40 },
  'right-flank-bottom':      { x: 74, y: 106, w: 22, h: 40 },
  'central-bottom':          { x: 28, y: 112, w: 44, h: 34 },
  'set-piece-bottom':        { x: 26, y: 124, w: 48, h: 22 },
  'half-space-left-bottom':  { x: 24, y: 106, w: 20, h: 30 },
  'half-space-right-bottom': { x: 56, y: 106, w: 20, h: 30 },
};

// --- defaults & helpers ---------------------------------------------------
const DEFAULT_TAGS = { high: ['One-way traffic'], lean: ['Tactical duel'], toss: ['Chaos potential'] };
const DEFAULT_UPSET = { high: 'low-risk', lean: 'live-underdog-chance', toss: 'real-upset-threat' };
const DEFAULT_STAKES = {
  high: 'A statement opportunity for the favourite. The margins matter — goal difference can swing group seeding.',
  lean: 'A close contest where momentum and small decisions could swing the result. Both sides have a real path.',
  toss: 'A genuine coin-flip. Both sides need every point to fancy progress out of the group.',
};
const DEFAULT_WATCH = [
  { h: 'The first goal', p: 'Matchday-1 openers are nervous. The first goal carries outsized weight, for both the leaders and the game state.' },
  { h: 'Set pieces', p: 'Tight games are decided by margins. Dead-ball duels often supply the deciding moment in opening fixtures.' },
  { h: 'Game state after the hour', p: 'Bench depth and stamina decide late phases. The first wave of substitutions is often where openers are won.' },
];

function defaultZones(m, T) {
  return [
    { area: 'right-flank-top', side: 'h', label: `${T[m.h]?.n || 'Home'} attacking down their right` },
    { area: 'left-flank-top',  side: 'a', label: `${T[m.a]?.n || 'Away'} attacking down their left` },
  ];
}

function defaultWatchlist(m, T) {
  const h = T[m.h] || {}, a = T[m.a] || {};
  const hP = (h.players || []).slice(0, 2).map((p) => p.nm);
  const aP = (a.players || []).slice(0, 2).map((p) => p.nm);
  const players = [hP[0], aP[0], hP[1] || aP[1]].filter(Boolean).slice(0, 3);
  const battles = { toss: 'The midfield duel that decides territory', lean: "How the favourite handles the underdog's structure", high: 'The favourite asserting their tempo from the whistle' };
  const surprises = { toss: 'Either side seizing a brief tempo shift', lean: 'A first-half tempo shift the underdog can build on', high: 'Any early underdog goal — the script changes instantly' };
  return { players, battle: battles[m.conf] || battles.lean, xfactor: 'Set pieces — often the deciding margin in opening fixtures', surprise: surprises[m.conf] || surprises.lean };
}

function defaultStoryline(m, T) {
  const h = T[m.h], a = T[m.a];
  if (['USA', 'CAN', 'MEX'].includes(m.h)) {
    return { kind: 'host-pressure', text: `${h.n} open at home with a nation watching. Opening-night pressure is the story.` };
  }
  if (/debut/i.test(h?.best || '')) {
    return { kind: 'dark-horse-watch', text: `${h.n} make their World Cup debut. A nation's first kick on football's biggest stage.` };
  }
  if (/debut/i.test(a?.best || '')) {
    return { kind: 'dark-horse-watch', text: `${a.n} make their World Cup debut. A nation's first kick on football's biggest stage.` };
  }
  if (m.conf === 'toss') {
    return { kind: 'tone-setter', text: 'A genuine coin-flip opener that could set the entire group on its head before Matchday 2 starts.' };
  }
  return { kind: 'tone-setter', text: "A Matchday-1 opener that sets the tone for both sides' tournament arc." };
}

function defaultGroupContext(m, T) {
  const fav = m.fav === 'h' ? T[m.h] : m.fav === 'a' ? T[m.a] : null;
  if (m.conf === 'high' && fav) {
    return { label: 'Goal-difference statement', text: `${fav.n} are heavy favourites, and the margin of victory could matter for group seeding. A clean sheet plus multiple goals is the ideal Matchday-1 platform.` };
  }
  if (m.conf === 'toss') {
    return { label: 'A real group-stakes coin-flip', text: 'A close-priced opener where the three points carry outsized weight. The winner sets up a knockout-style Matchday 2; a draw leaves everything still to play for.' };
  }
  return { label: 'Critical Matchday-1 swing', text: 'A close contest with real consequences for the group standings. A win here changes the Matchday-2 calculations for both sides.' };
}

export function getEditorial(m, T) {
  const key = `${m.h}-${m.a}`;
  const ex = EDITORIAL[key] || {};
  const fav = m.fav === 'h' ? T[m.h] : m.fav === 'a' ? T[m.a] : null;
  const callDefault = {
    pick: m.fav === 'h' ? m.h : m.fav === 'a' ? m.a : null,
    label: fav ? `${fav.n} to win` : 'Too close to call',
    confidence: m.conf, status: 'pending', actual: null,
  };
  return {
    storyline: ex.storyline || defaultStoryline(m, T),
    stakes: ex.stakes || DEFAULT_STAKES[m.conf],
    groupContext: ex.groupContext || defaultGroupContext(m, T),
    tags: ex.tags || DEFAULT_TAGS[m.conf] || [],
    upset: ex.upset || DEFAULT_UPSET[m.conf] || 'live-underdog-chance',
    watch: ex.watch || DEFAULT_WATCH,
    watchIsCustom: Array.isArray(ex.watch),
    flip: ex.flip || null,
    call: ex.call || callDefault,
    zones: ex.zones || defaultZones(m, T),
    coachBattle: ex.coachBattle || null,
    spotlight: ex.spotlight || null,
    watchlist: ex.watchlist || defaultWatchlist(m, T),
  };
}

export function getTeamIdentity(code, T) {
  const ex = TEAM_IDENTITY[code];
  if (ex) return ex;
  const t = T?.[code];
  const isDebut = /debut/i.test(t?.best || '');
  const isChamp = (t?.titles || 0) > 0;
  return {
    style: 'mixed', tempo: 'medium',
    threat: t?.players?.[0]?.nm ? `${t.players[0].nm.split(' ').pop()} & set pieces` : 'Set pieces & counter',
    risk: 'Build-up exposure',
    chemistry: isDebut ? 'underdog-freedom' : isChamp ? 'veteran-composure' : 'stable-core',
    coach: '—',
  };
}
