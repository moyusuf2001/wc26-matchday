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

  // ── Matchday 2 editorial entries ────────────────────────────────────────────

  'MEX-KOR': {
    storyline: { kind: 'tone-setter', text: "Group A's second game is effectively a knockout tie in disguise. Mexico need the win to advance; Korea need it to stay alive. The crowd at the Akron becomes a tactical factor." },
    stakes: 'A win for Mexico all but seals Group A qualification. A win for Korea keeps them alive in the tournament. The loser faces a very difficult path through Matchday 3.',
    groupContext: { label: 'Group A: winner takes control', text: 'Mexico top Group A after MD1. Korea are bottom after their loss to Czechia. A Mexican win puts them six points clear of the group with one game to play — effectively into the round of 32 regardless. For Korea, defeat means they must beat Mexico-level opposition on Matchday 3 to have any hope.' },
    tags: ['Must-win atmosphere', 'Tactical duel'],
    upset: 'live-underdog-chance',
    watch: [
      { h: "Son Heung-min in the channels", p: "Korea's captain will look to drift from his wide starting position into the spaces behind Mexico's midfield. If he gets isolated against a single defender, the danger is real." },
      { h: "Edson Álvarez's positioning", p: "The Atletico midfielder is Mexico's defensive anchor. How he tracks Son and covers the transitions will determine whether Korea find any genuine openings." },
      { h: "Lee Kang-in between the lines", p: "Korea's creative hub. If he gets time on the ball in the pockets between Mexico's lines, the short combinations start to unpick the Mexican block." },
      { h: "Mexico set pieces", p: "Aguirre's side are dangerous from dead balls. Luis Chávez's delivery and Jiménez's aerial presence could decide a tight match the way individual quality often does in these games." },
      { h: "The atmosphere factor", p: "If Mexico lead at half-time, the Akron's energy is a second wave. If Korea score first, the anxiety that follows is a genuine tactical handicap for El Tri." },
    ],
    flip: { trigger: 'If Korea score first', outcome: "Mexico are forced to break down a compact low block while the anxiety from a stunned home crowd leaks down to the pitch. A genuine Korean knockout becomes the live scenario." },
    call: { pick: 'MEX', label: 'Mexico to win', confidence: 'lean', status: 'correct', actual: 'MEX' },
    zones: [
      { area: 'left-flank-bottom', side: 'a', label: "Son drifting from the left into Mexico's central space" },
      { area: 'right-flank-top', side: 'h', label: "Mexico's right-side overlap and width from Sánchez" },
      { area: 'set-piece-bottom', side: 'h', label: "Mexico dead-ball threat into the Korean box" },
    ],
    coachBattle: {
      home: { name: 'Javier Aguirre', tag: 'Pragmatic and controlled', note: 'Third Mexico cycle. His discipline and experience shows when tournament pressure peaks — he keeps El Tri compact and transitions sharp.' },
      away: { name: 'Hong Myung-bo', tag: 'Vertical and aggressive', note: '2002 semi-finalist as a player. Has Korea pressing higher and playing vertically — the style is clear, the execution under pressure is the question.' },
      edge: "Aguirre's tournament experience and the home crowd give Mexico the edge. Hong's system has more attacking upside but needs perfect execution to unlock a well-organised defensive side.",
    },
    spotlight: [
      { code: 'MEX', name: 'Raúl Jiménez', role: 'Aerial focal point', why: "Mexico's clearest path to a goal comes through Jiménez holding the ball and arriving for set pieces. He was excellent in MD1 and Korea will need to double up on him.", watch: 'His runs in behind and his positioning at corners — Mexico will look to him any time the ball is switched wide.' },
      { code: 'KOR', name: 'Son Heung-min', role: 'The match-winner', why: "Korea's tournament lives and dies with Son's influence. At his best, he is simply unplayable for 90 minutes. The question is whether Mexico's structure limits him to moments or gives him a game.", watch: "His drifting runs from left to central positions — Son scores when he arrives late, not when he holds a wide starting spot." },
    ],
    watchlist: {
      players: ['Son Heung-min', 'Lee Kang-in', 'Edson Álvarez'],
      battle: "Mexico's midfield control vs Korea's vertical transitions",
      xfactor: 'Mexico set pieces — Chávez delivery, Jiménez in the air',
      surprise: 'Korea winning 1–0 with Son scoring a counterattacking goal that silences the Akron',
    },
  },

  'GER-CIV': {
    storyline: { kind: 'technical-duel', text: "Germany's Wirtz-Musiala axis versus Ivory Coast's pace and directness — the most fascinatingly mismatched styles in Group E's Matchday 2." },
    stakes: "A Germany win seals Group E qualification with a game to spare. Ivory Coast know that a result here keeps the group alive and sends a statement to the entire tournament.",
    groupContext: { label: 'Group E: Germany aim to seal it', text: "Germany are heavy favourites to top Group E. But the battle for second is genuinely competitive. Ivory Coast could jump ahead of Ecuador and surprise everyone if they handle Germany's press correctly." },
    tags: ['Technical duel', 'Pace threat'],
    upset: 'live-underdog-chance',
    watch: [
      { h: "Adingra vs Germany's right side", p: "Ivory Coast's most dangerous weapon. Simon Adingra's pace and directness can expose Germany's attacking full-back in behind. One overlapping run, one ball in behind, and the game changes." },
      { h: "Wirtz between the lines", p: "Germany's most creative player. When Wirtz finds the pocket between the CIV midfield and defence, goals follow. Ivory Coast must identify him and press hard the moment he receives." },
      { h: "Germany's defensive high line", p: "Nagelsmann keeps Germany's line high to support the press. Against African pace, this is always a risk. Rüdiger and the centre-backs must be alert to the runs in behind." },
      { h: "Set pieces", p: "Kimmich's delivery and Rüdiger's aerial ability give Germany a genuine set-piece edge. If this game is tight, a dead ball will likely decide it in their favour." },
    ],
    flip: { trigger: 'If Adingra scores in the first half', outcome: "Germany have to chase the game with more directness. Their defensive line pushes even higher, the transitions become more stretched, and Ivory Coast's counter becomes more dangerous. Group E is suddenly genuinely open." },
    call: { pick: 'GER', label: 'Germany to win', confidence: 'lean', status: 'correct', actual: 'GER' },
    zones: [
      { area: 'left-flank-bottom', side: 'a', label: "Adingra exploiting space behind Germany's right-back" },
      { area: 'half-space-left-top', side: 'h', label: "Musiala's half-space driving runs" },
      { area: 'transition-lane', side: 'a', label: "Ivory Coast's central counter-attacking corridor" },
    ],
    coachBattle: {
      home: { name: 'Julian Nagelsmann', tag: 'High-press tactician', note: 'Germany at their best under Nagelsmann is fluid, intense, and dangerous from multiple positions. The system demands total buy-in but produces elite results.' },
      away: { name: 'Emerse Faé', tag: 'Direct and pace-focused', note: "The Ivory Coast coach has simplified their system to play to the strength of wide runners and directness. Defence first, then spring quickly." },
      edge: "Nagelsmann's structured press and Germany's depth of quality makes them the clear technical favourite. Faé needs his side to stay compact and attack with purpose on the counter.",
    },
    spotlight: [
      { code: 'GER', name: 'Florian Wirtz', role: 'The creative engine', why: "Germany's best player at the tournament. When Wirtz has the ball in the half-space with time to turn, something always happens — a through ball, a shot, a dribble past two players.", watch: 'His positioning between the CIV lines and his long-range shooting — he hits goals that look impossible until they happen.' },
      { code: 'CIV', name: 'Simon Adingra', role: 'The pace weapon', why: "Sunderland's breakout star and Ivory Coast's clearest goal threat. His speed and 1v1 ability in behind can genuinely trouble any European defensive backline.", watch: "The moment Germany's right-back commits forward in support of the attack — Adingra checks his run and accelerates into the space left behind." },
    ],
    watchlist: {
      players: ['Florian Wirtz', 'Simon Adingra', 'Joshua Kimmich'],
      battle: "Germany's pressing structure vs Ivory Coast's counter-attacking pace",
      xfactor: "Kimmich's set-piece delivery — Germany are dangerous from every dead ball in this tournament",
      surprise: "Ivory Coast leading at half-time and holding on for a Group E result that changes everything",
    },
  },

  'ESP-KSA': {
    storyline: { kind: 'upset-watch', text: "Saudi Arabia arrived at Qatar 2022 and shocked Argentina in the biggest result of the tournament. Can lightning strike again against another European heavyweight?" },
    stakes: "Spain aim for a second win to seal Group H qualification entirely. Saudi Arabia need points to avoid early elimination — and they have recent proof that toppling a world-class side is within them.",
    groupContext: { label: 'Spain eye Group H sealing', text: "A Spain win puts them 6 from 6 with Group H leadership confirmed. Saudi Arabia must avoid defeat to stay in the third-place-route conversation — and they know exactly how to set up against possession-based sides." },
    tags: ['Upset watch', 'Tactical duel'],
    upset: 'live-underdog-chance',
    call: { pick: 'ESP', label: 'Spain to win', confidence: 'high', status: 'pending', actual: null },
    flip: { trigger: 'If Saudi Arabia score on the counter in the first half', outcome: "Spain have the ball against a locked-in low block. We have seen this before. Spain chasing a goal against Mancini's defensive organisation becomes a very different problem — and one that the tournament's favourite side has historically struggled with." },
    zones: [
      { area: 'right-flank-top', side: 'h', label: "Yamal's right flank isolation and 1v1 runs" },
      { area: 'transition-lane', side: 'a', label: "Saudi Arabia's counter-attacking outlet through Al-Dawsari" },
    ],
    watchlist: {
      players: ['Lamine Yamal', 'Pedri', 'Salem Al-Dawsari'],
      battle: "Spain's possession vs Saudi Arabia's low block and counter",
      xfactor: "Al-Dawsari on the break — he scored the most famous goal of 2022 against Argentina",
      surprise: "Saudi Arabia keeping Spain at 0–0 to halftime and genuinely threatening a result",
    },
  },

  'ARG-AUT': {
    storyline: { kind: 'legacy-game', text: "The defending champions face Austria's best-organised, most intense side in decades. This is the match that tells us whether Argentina are ready to defend or whether patience is required." },
    stakes: "Argentina aim for six from six to confirm Group J leadership. Austria need a result to stay in the second-place race — and they have the pressing system and Alaba's composure to make this genuinely difficult.",
    groupContext: { label: 'Group J: Argentina towards qualification', text: "A win here puts Argentina 6 from 6 with one game to play and Group J effectively sealed. Austria need the result to stay ahead of Jordan and Algeria in the second-place race." },
    tags: ['Chess match', 'Physical duel'],
    upset: 'live-underdog-chance',
    watch: [
      { h: "Messi's deeper role", p: "At 38, Messi drops further to find the ball and switch play with his diagonal passes. Argentina's structure gives him the space to influence moments — the question is whether Austria's press can deny him the seconds he needs on the ball." },
      { h: "Sabitzer vs Argentina's midfield", p: "Marcel Sabitzer's box-to-box intensity is Austria's main disruption tool. If he can win second balls and force turnovers in the middle third, Austria's counter becomes dangerous." },
      { h: "Álvarez's movement", p: "Julián Álvarez pressing from the front and arriving late into the box is Argentina's most dynamic tactical weapon. His movement is incredibly difficult to track and he scores in big games." },
      { h: "Alaba's sweeper role", p: "Austria's captain plays as a sweeper behind the pressing lines. His composure on the ball and reading of the game gives Austria the clean build-up platform they need to attack." },
    ],
    flip: { trigger: 'If Austria score from a transition', outcome: "Argentina chasing a goal against Austria's organised, compact defence is the one scenario that suits the European side completely. The game plan flips perfectly in Austria's favour." },
    call: { pick: 'ARG', label: 'Argentina to win', confidence: 'high', status: 'pending', actual: null },
    zones: [
      { area: 'central-top', side: 'h', label: "Argentina's central build-up and Messi's deeper influence" },
      { area: 'transition-lane', side: 'a', label: "Austria's counter-attacking outlet after winning the ball in midfield" },
      { area: 'half-space-right-top', side: 'h', label: "Álvarez arriving late from the right half-space" },
    ],
    coachBattle: {
      home: { name: 'Lionel Scaloni', tag: 'Calm and flexible', note: 'Won the 2022 World Cup with a squad that grew through the tournament. Excellent at managing game states and making tactical adjustments at halftime.' },
      away: { name: 'Ralf Rangnick', tag: 'High-press architect', note: 'The godfather of gegenpressing. Austria under Rangnick are the most structurally coherent pressing side in the draw — a genuinely dangerous tactical opponent.' },
      edge: "Scaloni has the better players and the trophy. Rangnick has a smarter system and a clear game plan. The individual quality difference ultimately decides it, but Rangnick makes Argentina earn everything.",
    },
    spotlight: [
      { code: 'ARG', name: 'Julián Álvarez', role: 'The movement machine', why: "The most dynamic forward in this Argentina squad. His pressing, his late runs, and his clinical finishing in big games make him the player most likely to break the deadlock.", watch: 'His runs from deep into the right side of the box — Álvarez scores goals from positions that are impossible to defend without leaving Messi free.' },
      { code: 'AUT', name: 'Marcel Sabitzer', role: 'The pressing engine', why: "Dortmund's box-to-box midfielders is Austria's tactical heart. His intensity, his goal threat from range, and his ability to disrupt Argentina's rhythm are the keys to any Austrian result.", watch: "Second balls in the middle third — if Sabitzer wins them, Austria have possession in dangerous positions. If Argentina win them, the game opens up for Messi and Álvarez." },
    ],
    watchlist: {
      players: ['Lionel Messi', 'Julián Álvarez', 'Marcel Sabitzer'],
      battle: "Argentina's possession machine vs Austria's pressing system — the tactical duel of Group J",
      xfactor: "Messi with a late assist or goal when Austria are exhausted from pressing for 70 minutes",
      surprise: "Austria leading at half-time after a Sabitzer goal from range and making the second half genuinely tense",
    },
  },

  'NOR-SEN': {
    storyline: { kind: 'golden-boot-watch', text: "Erling Haaland's first World Cup goal would be the moment of the entire tournament. Senegal know it. Norway know it. The whole football world is watching." },
    stakes: "Norway need the win to cement top spot in Group I and stay on course for a deep run. Senegal cannot afford defeat if they want to stay in the second-place race — and they carry pace that could hurt any side.",
    groupContext: { label: 'Group I: Norway eye the top spot', text: "Norway top the group after MD1. A win here makes them group winners regardless of the France–Iraq result. Senegal are second and a defeat would leave them relying on the final game to advance." },
    tags: ['Golden Boot watch', 'Physical battle'],
    upset: 'live-underdog-chance',
    watch: [
      { h: "Haaland in the penalty area", p: "Pure penalty-box predator at his first World Cup. Every cross, every set piece, every loose ball in the box is a potential moment of tournament history. Senegal's centre-backs will need to be at their physical best." },
      { h: "Jackson and Sarr on the counter", p: "Senegal's most dangerous scenario: Jackson receiving with pace in behind Norway's defensive line when they push forward. Pape Matar Sarr winning the ball in midfield and releasing the front runners quickly." },
      { h: "Ødegaard's delivery", p: "The Arsenal captain provides the crosses, the corners, and the through balls for Haaland to attack. His accuracy from wide areas and set-piece situations is Norway's key delivery mechanism." },
      { h: "Senegal's defensive shape", p: "Aliou Cissé organises Senegal into a physically imposing, compact block. They will make this difficult physically and look for moments of set-piece quality themselves." },
    ],
    flip: { trigger: 'If Senegal score first on the counter', outcome: "Norway must come forward with more desperation. Their defensive shape becomes stretched, Haaland starts dropping deeper to get involved, and the space Jackson operates in grows. A full Senegalese win becomes the live scenario." },
    call: { pick: 'NOR', label: 'Norway to win', confidence: 'lean', status: 'pending', actual: null },
    zones: [
      { area: 'central-top', side: 'h', label: "Haaland's central penalty area dominance — every cross is a chance" },
      { area: 'transition-lane', side: 'a', label: "Senegal's counter through Jackson's pace in behind" },
      { area: 'set-piece-bottom', side: 'h', label: "Norway set pieces — Ødegaard delivery, Haaland attack" },
    ],
    coachBattle: {
      home: { name: 'Ståle Solbakken', tag: 'Compact and clinical', note: "Built Norway's entire system around Haaland and Ødegaard. Clear game plan: control the midfield, deliver for Haaland, manage the counter threat." },
      away: { name: 'Aliou Cissé', tag: 'Defensive resilience', note: 'Won the AFCON with this generation. Keeps Senegal compact, physically imposing, and dangerous on transitions. Jackson is the focal point going forward.' },
      edge: "Solbakken has Haaland — an impossible tactical problem for any defensive organisation to fully neutralise. Cissé has the shape and the personnel to frustrate, but the goal threat from Senegal's side is not equivalent.",
    },
    spotlight: [
      { code: 'NOR', name: 'Erling Haaland', role: 'Golden Boot favourite', why: "World Cup debutant and the tournament's most-anticipated player. 16 goals in qualifying. Norway's entire game plan is structured to create his chances.", watch: 'His positioning inside the box before the cross arrives — Haaland creates the space with his movement, then finishes. He is not a static target.' },
      { code: 'SEN', name: 'Nicolas Jackson', role: 'Counter-attacking weapon', why: "Bayern Munich's dynamic forward is Senegal's best hope of creating genuine danger. Pace, directness, and a rapidly growing confidence in big fixtures.", watch: "The moment Norway's defensive line pushes up in support of an attack — Jackson's run in behind and the ball over the top is the exact scenario Cissé's side will practice all week." },
    ],
    watchlist: {
      players: ['Erling Haaland', 'Martin Ødegaard', 'Nicolas Jackson'],
      battle: "Haaland vs Senegal's centre-backs — the defining physical confrontation of the group stage",
      xfactor: "Ødegaard's set-piece delivery — the right ball at the right moment gives Haaland a chance even the best centre-backs cannot defend",
      surprise: "Senegal winning 1–0 with a Jackson counter-attacking goal and holding a famous Group I result",
    },
  },

  'ENG-GHA': {
    storyline: { kind: 'premier-league-connection', text: "Six of Ghana's squad play in the Premier League. These are familiar opponents, familiar players, familiar situations. England know exactly who they are dealing with — and so does Ghana." },
    stakes: "England aim for a second Group L win to seal knockout qualification early and secure their bracket positioning. Ghana need points to stay in contention and must score against an organised English defence.",
    groupContext: { label: 'England eye early Group L sealing', text: "England top the group after their opening result. Win here and they advance regardless of the final game. Ghana are in a must-not-lose situation — defeat here all but ends their tournament hopes before the final matchday." },
    tags: ['Premier League reunion', 'Physical battle'],
    upset: 'live-underdog-chance',
    watch: [
      { h: "Kudus in the half-spaces", p: "Mohammed Kudus at Tottenham is Ghana's most dangerous creative threat. England's midfield will need to track his movements carefully because he scores and assists from positions defenders cannot easily man-mark." },
      { h: "Kane's movement off the last man", p: "Harry Kane at his best pulls defenders out of position constantly. His dropping-deep and then running-in-behind combination is one of the hardest runs in football to defend. Ghana's back four will be tested." },
      { h: "Bellingham's late runs", p: "Jude Bellingham arriving late from midfield into the penalty area is England's most difficult problem for any side to solve tactically. Ghana cannot push a midfielder out to follow him and maintain their shape simultaneously." },
      { h: "Ghana's set pieces", p: "The Black Stars are dangerous from dead balls. England's defending from corners has been inconsistent under pressure — this is Ghana's most likely route to a goal." },
    ],
    flip: { trigger: 'If Ghana score from a set piece', outcome: "England against a low block with a deficit is historically uncomfortable territory. The possession without penetration problem emerges, the anxiety grows, and Ghana have exactly the defensive structure to hold." },
    call: { pick: 'ENG', label: 'England to win', confidence: 'lean', status: 'pending', actual: null },
    zones: [
      { area: 'right-flank-bottom', side: 'a', label: "Kudus drifting from the right half-space into England's midfield" },
      { area: 'central-top', side: 'h', label: "Bellingham's arriving runs from central midfield into the box" },
      { area: 'set-piece-bottom', side: 'a', label: "Ghana set-piece threat into England's box" },
    ],
    coachBattle: {
      home: { name: 'Thomas Tuchel', tag: 'Pressing and structured', note: "Germany's tactician has England well-drilled in a positional system that uses the width and the press triggers effectively. His attention to opposition detail is meticulous." },
      away: { name: 'Otto Addo', tag: 'Counter-attack and set pieces', note: "Organises Ghana to absorb pressure, stay compact, and strike on the counter. Kudus is the fulcrum of everything Ghana build going forward." },
      edge: "Tuchel has the depth and the Premier League quality to win this convincingly. Addo's best hope is keeping Kudus fresh for the counter-attacking moments and creating a set-piece scenario in the second half.",
    },
    spotlight: [
      { code: 'ENG', name: 'Jude Bellingham', role: 'Box-to-box match-winner', why: "England's most important player for a different reason each game. Here, his late arriving runs from midfield create a goal threat that Ghana simply cannot organise against without leaving Kane free.", watch: "His timing of runs into the right side of the box — Bellingham reads the cross before it is delivered and arrives precisely when the defensive shape cannot adapt." },
      { code: 'GHA', name: 'Mohammed Kudus', role: 'The creative disruptor', why: "Tottenham's creative midfielder is the most dangerous player in Ghana's squad by a distance. His ability to carry the ball in tight spaces and find the final pass or the shot makes him Ghana's whole tournament.", watch: "When he starts narrow and drifts between England's defensive and midfield lines — that is when Kudus is most dangerous, and England's midfield must not allow him those seconds on the ball." },
    ],
    watchlist: {
      players: ['Mohammed Kudus', 'Jude Bellingham', 'Harry Kane'],
      battle: "Kudus vs England's central midfield — he needs seconds on the ball; England's job is to deny him those seconds",
      xfactor: "Bellingham arriving late from deep — Ghana cannot track him and hold their shape at the same time",
      surprise: "Ghana nicking a set-piece goal in the second half and making England's final 30 minutes genuinely uncomfortable",
    },
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
  { kind: 'player-delivered',   label: 'Haaland delivers',        pick: 'A brace in his first World Cup game.',         detail: "Norway 2–0 Iraq. Haaland had never scored at a World Cup before Thursday. By the 59th minute he had two. After 16 qualifying goals and years of anticipation, the world's best number nine chose the biggest stage to announce himself. Norway top Group I.", tone: 'teal' },
  { kind: 'living-legend',      label: "Messi's hattrick",         pick: 'That long-range goal. In a World Cup. At 38.',  detail: "Argentina vs Algeria. Messi with a hat-trick — two clinical finishes and then the third, an outrageous strike from outside the box that left everyone in the stadium silent for a second before it erupted. The defending champions look capable of doing this again.", tone: 'gold' },
  { kind: 'best-player',        label: "Germany's surprise weapon", pick: 'Undav: 3 goals, 2 assists. Nobody saw this coming.', detail: "Denis Undav has been Germany's most decisive player at the tournament — 3 goals and 2 assists across two games. Wirtz and Musiala get the headlines but Undav is the one putting the ball in the net. Germany have won both games and their ceiling looks frightening.", tone: 'gold' },
  { kind: 'favourite-stumble',  label: 'Spain: stumble then statement', pick: '0–0 Cape Verde. Then 4–0 Saudi Arabia.',       detail: "Spain drew 0–0 with debutants Cape Verde in MD1 — the worst result of Matchday 1 for any title favourite. The response in MD2 was ferocious: 4–0 Saudi Arabia, no mercy. The favourites are back. But the Cape Verde draw is a warning they'll have to answer for later.", tone: 'coral' },
  { kind: 'upset-artist',       label: 'Atlas Lions strike again', pick: 'Drew with Brazil. Beat Scotland. Group C is theirs.', detail: "Morocco held Brazil to a 1–1 draw in MD1 — the Atlas Lions refusing to be the stage. Then 1–0 over Scotland in MD2. Six points from six, top of Group C, and making every opponent uncomfortable. The 2022 semifinalists are not done yet.", tone: 'coral' },
  { kind: 'record-pressure',    label: "Ronaldo: still waiting",   pick: 'Portugal won. Ronaldo did not score.',         detail: "Portugal beat DR Congo but Ronaldo was kept quiet — no goal, no record broken. At 41 and at his last World Cup, every game he goes without scoring adds a chapter to the story. The pressure to leave on his own terms is building.", tone: 'coral' },
  { kind: 'host-surge',         label: 'The host nation surge',    pick: 'MEX · USA · CAN all top of their groups.',     detail: "All three co-hosts won Matchday 1. Mexico 1–0 South Africa, USA 2–1 Paraguay, Canada 2–1 Bosnia. No World Cup has ever seen three co-hosts simultaneously leading their groups at this stage. The tournament is going exactly as the hosts dreamed.", tone: 'teal' },
  { kind: 'golden-boot',        label: 'Golden Boot race',         pick: 'Messi and Undav. Three goals each.',           detail: "Two matchdays in and the top of the scoring charts belongs to the two players nobody expected to share it — Messi with his hat-trick against Algeria, and Undav with 3 goals across two games for Germany. The Golden Boot race is already a storyline.", tone: 'teal' },
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
