// Verified static data backbone (fixtures, venues, odds, WC pedigree, marquee career WC goals).
// This renders instantly and never depends on the network; the live API enriches it.

export const T = {
  MEX:{n:"Mexico",f:"🇲🇽",cf:"CONCACAF",titles:0,best:"QF ×2 (1970, 1986)",odds:"+100",
    players:[{nm:"Guillermo Ochoa",pos:"GK",club:"AEL Limassol",note:"Set for a record-equalling 6th World Cup in goal."},
             {nm:"Raúl Jiménez",pos:"FW",club:"Fulham",note:"Leads the line for the hosts of the opening match at the Azteca."}]},
  RSA:{n:"South Africa",f:"🇿🇦",cf:"CAF",titles:0,best:"Group stage (incl. hosts 2010)",odds:"+1400",
    players:[{nm:"Lyle Foster",pos:"FW",club:"Burnley",note:"Bafana's main Premier League goal threat."}]},
  KOR:{n:"Korea Republic",f:"🇰🇷",cf:"AFC",titles:0,best:"4th place (2002)",odds:"+290",
    players:[{nm:"Son Heung-min",pos:"FW",club:"LAFC",wc:{2018:1,2022:0},note:"Captain and talisman; scored the stunner vs Germany in 2018."},
             {nm:"Lee Kang-in",pos:"MF",club:"Paris Saint-Germain",note:"Creative hub of this Korea side."}]},
  CZE:{n:"Czechia",f:"🇨🇿",cf:"UEFA",titles:0,best:"R16 (2006); Czechoslovakia were finalists 1934 & '62",odds:"+260",
    players:[{nm:"Patrik Schick",pos:"FW",club:"Bayer Leverkusen",note:"Prolific finisher when fit."}]},

  CAN:{n:"Canada",f:"🇨🇦",cf:"CONCACAF",titles:0,best:"Group stage (1986, 2022)",odds:"+260",
    players:[{nm:"Alphonso Davies",pos:"DF",club:"Real Madrid",note:"World-class left side; co-host energy behind him in Toronto."},
             {nm:"Jonathan David",pos:"FW",club:"Juventus",note:"Canada's record scorer and penalty threat."}]},
  BIH:{n:"Bosnia & Herzegovina",f:"🇧🇦",cf:"UEFA",titles:0,best:"Group stage (2014)",odds:"+270",
    players:[{nm:"Edin Džeko",pos:"FW",club:"Fiorentina",wc:{2014:0},note:"Veteran captain, still the focal point in attack."}]},
  QAT:{n:"Qatar",f:"🇶🇦",cf:"AFC",titles:0,best:"Group stage (hosts 2022)",odds:"+3500",
    players:[{nm:"Akram Afif",pos:"FW",club:"Al-Sadd",note:"Two-time Asian Cup player of the tournament."}]},
  SUI:{n:"Switzerland",f:"🇨🇭",cf:"UEFA",titles:0,best:"QF (1934/38/54); R16 in 2014, '18, '22",odds:"-110",
    players:[{nm:"Granit Xhaka",pos:"MF",club:"Sunderland",note:"Midfield metronome and captain."},
             {nm:"Nico Elvedi",pos:"DF",club:"Borussia M'gladbach",note:"Anchors a typically stubborn Swiss back line."}]},

  BRA:{n:"Brazil",f:"🇧🇷",cf:"CONMEBOL",titles:5,best:"Champions ×5 (1958 to 2002)",odds:"-290",
    players:[{nm:"Vinícius Júnior",pos:"FW",club:"Real Madrid",wc:{2022:1},note:"Player-of-tournament candidate; sets the left side alight."},
             {nm:"Neymar",pos:"FW",club:"Santos",wc:{2014:4,2018:2,2022:1},note:"Back at 34 for a likely final World Cup; Brazil's all-time top scorer."},
             {nm:"Raphinha",pos:"FW",club:"Barcelona",wc:{2022:0},note:"Electric Barça campaign; carries set-piece and goal threat."}]},
  MAR:{n:"Morocco",f:"🇲🇦",cf:"CAF",titles:0,best:"4th place (2022), first African semifinalist",odds:"+450",
    players:[{nm:"Achraf Hakimi",pos:"DF",club:"Paris Saint-Germain",wc:{2022:0},note:"Best attacking full-back at the tournament; huge fantasy ceiling."},
             {nm:"Youssef En-Nesyri",pos:"FW",club:"Fenerbahçe",wc:{2022:2},note:"Headed the goal that knocked out Portugal in 2022."},
             {nm:"Brahim Díaz",pos:"MF",club:"Real Madrid",note:"Switched allegiance to Morocco; their creative spark."}]},
  HAI:{n:"Haiti",f:"🇭🇹",cf:"CONCACAF",titles:0,best:"Group stage (1974)",odds:"+10000",
    players:[{nm:"Frantzdy Pierrot",pos:"FW",club:"Gaziantep",note:"Target man leading a spirited Haiti attack."}]},
  SCO:{n:"Scotland",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",cf:"UEFA",titles:0,best:"Group stage, first WC since 1998",odds:"+700",
    players:[{nm:"Scott McTominay",pos:"MF",club:"Napoli",note:"Serie A winner and Scotland's box-to-box goal source."},
             {nm:"Che Adams",pos:"FW",club:"Torino",note:"Leads the line in Scotland's most attacking spot vs Haiti."}]},

  USA:{n:"United States",f:"🇺🇸",cf:"CONCACAF",titles:0,best:"3rd place (1930)",odds:"-150",
    players:[{nm:"Christian Pulisic",pos:"FW",club:"AC Milan",wc:{2022:1},note:"Captain America; hosts' creator-in-chief."},
             {nm:"Weston McKennie",pos:"MF",club:"Juventus",note:"Engine of the midfield."}]},
  PAR:{n:"Paraguay",f:"🇵🇾",cf:"CONMEBOL",titles:0,best:"QF (2010)",odds:"+360",
    players:[{nm:"Miguel Almirón",pos:"FW",club:"Atlanta United",note:"Pace and directness on the break."}]},
  AUS:{n:"Australia",f:"🇦🇺",cf:"AFC",titles:0,best:"R16 (2006, 2022)",odds:"+450",
    players:[{nm:"Martin Boyle",pos:"FW",club:"Hibernian",note:"Socceroos' livewire forward."}]},
  TUR:{n:"Türkiye",f:"🇹🇷",cf:"UEFA",titles:0,best:"3rd place (2002)",odds:"+260",
    players:[{nm:"Arda Güler",pos:"MF",club:"Real Madrid",note:"The jewel of a rising Turkey side; set-piece and shooting threat."},
             {nm:"Kenan Yıldız",pos:"FW",club:"Juventus",note:"Breakout forward adding to Turkey's attack."}]},

  GER:{n:"Germany",f:"🇩🇪",cf:"UEFA",titles:4,best:"Champions ×4 (1954 to 2014)",odds:"-220",
    players:[{nm:"Joshua Kimmich",pos:"DF",club:"Bayern Munich",wc:{2018:0,2022:0},note:"Captain; plays right-back/midfield with elite set-piece delivery."},
             {nm:"Florian Wirtz",pos:"MF",club:"Liverpool",note:"Germany's creative future, now."},
             {nm:"Jamal Musiala",pos:"MF",club:"Bayern Munich",note:"Dribbling threat through the middle."}]},
  CUW:{n:"Curaçao",f:"🇨🇼",cf:"CONCACAF",titles:0,best:"World Cup debut, smallest nation ever to qualify",odds:"+4500",debut:true,
    players:[{nm:"Tahith Chong",pos:"MF",club:"Sheffield United",note:"Most recognisable name in a historic debutant squad."}]},
  CIV:{n:"Ivory Coast",f:"🇨🇮",cf:"CAF",titles:0,best:"Group stage",odds:"+600",
    players:[{nm:"Simon Adingra",pos:"FW",club:"Sunderland",note:"Pace on the flank for the Elephants."}]},
  ECU:{n:"Ecuador",f:"🇪🇨",cf:"CONMEBOL",titles:0,best:"R16 (2006)",odds:"+380",
    players:[{nm:"Enner Valencia",pos:"FW",club:"Internacional",wc:{2014:3,2022:3},note:"Ecuador's all-time WC scorer; every Ecuador goal in 2014 & 2022 was his."},
             {nm:"Moisés Caicedo",pos:"MF",club:"Chelsea",note:"World-class ball-winner anchoring midfield."}]},

  NED:{n:"Netherlands",f:"🇳🇱",cf:"UEFA",titles:0,best:"Runners-up ×3 (1974, '78, 2010)",odds:"-140",
    players:[{nm:"Cody Gakpo",pos:"FW",club:"Liverpool",wc:{2022:3},note:"Scored in all three group games in 2022; primary goal source."},
             {nm:"Denzel Dumfries",pos:"DF",club:"Inter Milan",wc:{2022:0},note:"Wing-back with real attacking output."},
             {nm:"Virgil van Dijk",pos:"DF",club:"Liverpool",note:"Captain and defensive cornerstone."}]},
  JPN:{n:"Japan",f:"🇯🇵",cf:"AFC",titles:0,best:"R16 ×4 (incl. beating Germany & Spain in 2022)",odds:"+340",
    players:[{nm:"Takefusa Kubo",pos:"FW",club:"Real Sociedad",note:"Creative leader, but Japan are without the injured Kaoru Mitoma."},
             {nm:"Wataru Endo",pos:"MF",club:"Liverpool",note:"Captain and midfield shield."}]},
  SWE:{n:"Sweden",f:"🇸🇪",cf:"UEFA",titles:0,best:"Runners-up (1958); 3rd in 1950 & 1994",odds:"+430",
    players:[{nm:"Alexander Isak",pos:"FW",club:"Liverpool",wc:{2022:0},note:"Elite finisher leading the line."},
             {nm:"Viktor Gyökeres",pos:"FW",club:"Arsenal",note:"Ruthless scorer; gives Sweden a fearsome front pair."}]},
  TUN:{n:"Tunisia",f:"🇹🇳",cf:"CAF",titles:0,best:"Group stage (beat France in 2022)",odds:"+1000",
    players:[{nm:"Hannibal Mejbri",pos:"MF",club:"Burnley",note:"Combative midfielder and emotional leader."}]},

  BEL:{n:"Belgium",f:"🇧🇪",cf:"UEFA",titles:0,best:"3rd place (2018), 'golden generation'",odds:"-220",
    players:[{nm:"Jérémy Doku",pos:"FW",club:"Manchester City",wc:{2022:0},note:"In-form dribbler; Belgium's most dangerous wide threat."},
             {nm:"Kevin De Bruyne",pos:"MF",club:"Napoli",wc:{2014:1,2018:1},note:"Still the creative axis when fit."}]},
  EGY:{n:"Egypt",f:"🇪🇬",cf:"CAF",titles:0,best:"Group stage",odds:"+390",
    players:[{nm:"Mohamed Salah",pos:"FW",club:"Liverpool",wc:{2018:2},note:"Talisman; carries Egypt's hopes almost single-handedly."}]},
  IRN:{n:"Iran",f:"🇮🇷",cf:"AFC",titles:0,best:"Group stage",odds:"+700",
    players:[{nm:"Mehdi Taremi",pos:"FW",club:"Inter Milan",wc:{2022:2},note:"Scored twice vs England in 2022; Iran's main man."}]},
  NZL:{n:"New Zealand",f:"🇳🇿",cf:"OFC",titles:0,best:"Group stage (unbeaten in 2010)",odds:"+1900",
    players:[{nm:"Chris Wood",pos:"FW",club:"Nottingham Forest",note:"Premier League goals lead the All Whites."}]},

  ESP:{n:"Spain",f:"🇪🇸",cf:"UEFA",titles:1,best:"Champions (2010) · Euro 2024 winners",odds:"-450",
    players:[{nm:"Lamine Yamal",pos:"FW",club:"Barcelona",note:"18-year-old superstar at his first World Cup (minor fitness watch for the opener).",debutStar:true},
             {nm:"Mikel Oyarzabal",pos:"FW",club:"Real Sociedad",wc:{2022:0},note:"Scored the Euro 2024 final winner; expected to start through the middle."},
             {nm:"Pedri",pos:"MF",club:"Barcelona",note:"Midfield conductor of the favourites."}]},
  CPV:{n:"Cape Verde",f:"🇨🇻",cf:"CAF",titles:0,best:"World Cup debut",odds:"+5000",debut:true,
    players:[{nm:"Ryan Mendes",pos:"FW",club:"Unattached",note:"Veteran captain of the Blue Sharks' historic first World Cup."}]},
  KSA:{n:"Saudi Arabia",f:"🇸🇦",cf:"AFC",titles:0,best:"R16 (1994); famously beat Argentina in 2022",odds:"+2200",
    players:[{nm:"Salem Al-Dawsari",pos:"FW",club:"Al-Hilal",wc:{2022:1},note:"Scored the winner vs Argentina in 2022."}]},
  URU:{n:"Uruguay",f:"🇺🇾",cf:"CONMEBOL",titles:2,best:"Champions ×2 (1930, 1950); 4th in 2010",odds:"+500",
    players:[{nm:"Federico Valverde",pos:"MF",club:"Real Madrid",note:"All-action midfield engine, now the team's leader."},
             {nm:"Darwin Núñez",pos:"FW",club:"Al-Hilal",wc:{2022:0},note:"Pace and power up top."}]},

  FRA:{n:"France",f:"🇫🇷",cf:"UEFA",titles:2,best:"Champions ×2 (1998, 2018); runners-up 2022",odds:"-215",
    players:[{nm:"Kylian Mbappé",pos:"FW",club:"Real Madrid",wc:{2018:4,2022:8},note:"Golden Boot 2022; the tournament's headline act and most-owned fantasy pick."},
             {nm:"Ousmane Dembélé",pos:"FW",club:"Paris Saint-Germain",wc:{2018:0,2022:0},note:"Reigning Ballon d'Or winner; France's wide threat."},
             {nm:"Michael Olise",pos:"MF",club:"Bayern Munich",note:"Breakout creator at his first World Cup."}]},
  SEN:{n:"Senegal",f:"🇸🇳",cf:"CAF",titles:0,best:"QF (2002)",odds:"+800",
    players:[{nm:"Nicolas Jackson",pos:"FW",club:"Bayern Munich",note:"Leads the line for Africa's heavyweight."},
             {nm:"Pape Matar Sarr",pos:"MF",club:"Tottenham",note:"Energetic midfield driver."}]},
  IRQ:{n:"Iraq",f:"🇮🇶",cf:"AFC",titles:0,best:"Group stage",odds:"+5000",
    players:[{nm:"Aymen Hussein",pos:"FW",club:"Al-Qadsiah",note:"Iraq's main striker; the Lions of Mesopotamia defend deep and well."}]},
  NOR:{n:"Norway",f:"🇳🇴",cf:"UEFA",titles:0,best:"R16 (1998), first WC since then",odds:"+275",
    players:[{nm:"Erling Haaland",pos:"FW",club:"Manchester City",note:"World Cup debutant after 16 goals in qualifying; pure goal machine.",debutStar:true},
             {nm:"Martin Ødegaard",pos:"MF",club:"Arsenal",note:"Captain and creative fulcrum on his WC debut."}]},

  ARG:{n:"Argentina",f:"🇦🇷",cf:"CONMEBOL",titles:3,best:"Champions ×3 (1978, '86, 2022)",odds:"-250",
    players:[{nm:"Lionel Messi",pos:"FW",club:"Inter Miami",wc:{2006:1,2014:4,2018:1,2022:7},note:"At 38, a record 6th World Cup; defending champions' captain."},
             {nm:"Julián Álvarez",pos:"FW",club:"Atlético Madrid",wc:{2022:4},note:"Scored four en route to the 2022 title; in superb club form."},
             {nm:"Lautaro Martínez",pos:"FW",club:"Inter Milan",wc:{2022:0},note:"Prolific for Inter; fights for the central striker role."}]},
  ALG:{n:"Algeria",f:"🇩🇿",cf:"CAF",titles:0,best:"R16 (2014)",odds:"+800",
    players:[{nm:"Riyad Mahrez",pos:"FW",club:"Al-Ahli",note:"Captain and matchwinner from the right."},
             {nm:"Mohamed Amoura",pos:"FW",club:"Wolfsburg",note:"Pace and goals leading the line."}]},
  AUT:{n:"Austria",f:"🇦🇹",cf:"UEFA",titles:0,best:"3rd place (1954), first WC since 1998",odds:"+370",
    players:[{nm:"David Alaba",pos:"DF",club:"Real Madrid",note:"Veteran leader of Austria's first World Cup in 28 years."},
             {nm:"Marcel Sabitzer",pos:"MF",club:"Borussia Dortmund",note:"Goals from midfield."}]},
  JOR:{n:"Jordan",f:"🇯🇴",cf:"AFC",titles:0,best:"World Cup debut, 2023 Asian Cup runners-up",odds:"+5000",debut:true,
    players:[{nm:"Mousa Al-Taamari",pos:"FW",club:"Montpellier",note:"Star man of Jordan's historic first World Cup."}]},

  POR:{n:"Portugal",f:"🇵🇹",cf:"UEFA",titles:0,best:"3rd place (1966); 4th in 2006",odds:"-215",
    players:[{nm:"Cristiano Ronaldo",pos:"FW",club:"Al-Nassr",wc:{2006:1,2010:1,2014:1,2018:4,2022:1},note:"At 41, a record 6th World Cup; first man to score at five."},
             {nm:"Bruno Fernandes",pos:"MF",club:"Manchester United",wc:{2022:2},note:"Penalties and creativity from the centre, central to everything."},
             {nm:"Nuno Mendes",pos:"DF",club:"Paris Saint-Germain",note:"Attacking left-back with clean-sheet and assist upside."}]},
  COD:{n:"DR Congo",f:"🇨🇩",cf:"CAF",titles:0,best:"As Zaire, group stage (1974)",odds:"+1400",
    players:[{nm:"Cédric Bakambu",pos:"FW",club:"Real Betis",note:"Experienced striker leading the Leopards' return after 52 years."}]},
  UZB:{n:"Uzbekistan",f:"🇺🇿",cf:"AFC",titles:0,best:"World Cup debut",odds:"+3500",debut:true,
    players:[{nm:"Eldor Shomurodov",pos:"FW",club:"Roma",note:"Talisman of Uzbekistan's first-ever World Cup."}]},
  COL:{n:"Colombia",f:"🇨🇴",cf:"CONMEBOL",titles:0,best:"QF (2014); R16 (2018)",odds:"+240",
    players:[{nm:"James Rodríguez",pos:"MF",club:"León",wc:{2014:6,2018:0},note:"Won the 2014 Golden Boot; still Colombia's captain and creator."},
             {nm:"Luis Díaz",pos:"FW",club:"Bayern Munich",note:"In-form winger on his World Cup debut."}]},

  ENG:{n:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",cf:"UEFA",titles:1,best:"Champions (1966); 4th in 2018",odds:"-280",
    players:[{nm:"Harry Kane",pos:"FW",club:"Bayern Munich",wc:{2018:6,2022:2},note:"2018 Golden Boot; England's all-time scorer and penalty taker."},
             {nm:"Jude Bellingham",pos:"MF",club:"Real Madrid",wc:{2022:0},note:"World-class midfield driver entering his prime."},
             {nm:"Bukayo Saka",pos:"FW",club:"Arsenal",wc:{2022:0},note:"Right-wing goal and assist threat."}]},
  CRO:{n:"Croatia",f:"🇭🇷",cf:"UEFA",titles:0,best:"Runners-up (2018); 3rd in 1998 & 2022",odds:"+340",
    players:[{nm:"Luka Modrić",pos:"MF",club:"AC Milan",wc:{2014:1,2018:2,2022:1},note:"2018 Golden Ball; orchestrates everything at 40."},
             {nm:"Joško Gvardiol",pos:"DF",club:"Manchester City",note:"Elite defender who also threatens going forward."}]},
  GHA:{n:"Ghana",f:"🇬🇭",cf:"CAF",titles:0,best:"QF (2010), minutes from a semifinal",odds:"+1100",
    players:[{nm:"Mohammed Kudus",pos:"MF",club:"Tottenham",note:"Ghana's standout creator and goal threat."}]},
  PAN:{n:"Panama",f:"🇵🇦",cf:"CONCACAF",titles:0,best:"Group stage (2018 debut)",odds:"+4000",
    players:[{nm:"Adalberto Carrasquilla",pos:"MF",club:"Houston Dynamo",note:"Midfield heartbeat of Los Canaleros."}]},
};

export const M = [
 {d:"Thu Jun 11",ds:"Thursday, June 11",t:"3:00",z:"PM ET",grp:"A",h:"MEX",a:"RSA",v:"Estadio Azteca",c:"Mexico City",fav:"h",conf:"lean",
  why:"Mexico open the whole tournament at a fortress where they rarely lose, and are clear Group A favourites (+100). South Africa will sit deep and counter.",
  take:{
    standfirst:"The whole tournament kicks off right here, and it's a trap dressed up as a gimme. Mexico have everything to lose at the Azteca; South Africa arrive with nothing to fear and a plan that has already embarrassed better sides than this.",
    sections:[
      {h:"How Mexico set up: Aguirre's control game",p:"Javier Aguirre is back for a third cycle and he is no romantic. Expect a 4-3-3 that slides into a 4-2-3-1 out of possession, built on control rather than chaos: Edson Álvarez shielding the back four, full-backs joining only when the picture is safe, and Mexico monopolising the ball, and 60%-plus possession is the baseline. Aguirre wants El Tri to win the game without ever being countered, so the tempo will be patient, almost deliberate, shifting the ball side to side until Lozano's pace or a Luis Chávez set-piece prises a gap open. The danger is obvious: against a deep, disciplined block, that patience can curdle into sterile possession, and opening-night nerves at the Azteca are very real."},
      {h:"How South Africa hurt them: Broos's counter-trap",p:"Hugo Broos won an AFCON with Cameroon and a bronze medal with this Bafana group by doing one thing superbly: defending as a unit and striking once. He will set up compact, two banks of four, inviting Mexico onto them and releasing Percy Tau and Lyle Foster into the channels the instant the ball turns over. Behind them, Ronwen Williams is one of the most underrated keepers at the tournament; he won a shootout almost single-handedly at AFCON 2024. Their great equaliser is the set piece; do not be surprised if their best chance of the night arrives from a corner."},
      {h:"The altitude myth nobody is checking",p:"Everyone repeats that the Azteca's 2,240m is Mexico's twelfth man. Against most opponents, true. Against South Africa, far less so. The South African league plays its football up on the Highveld, where Johannesburg sits above 1,700m, so these players live and train in thin air every week of their lives. The lung-busting edge Mexico usually enjoy is partly neutralised here, and Broos knows it. That single detail is the biggest reason I think this is tighter than the price suggests."},
      {h:"The players who decide it",p:"For Mexico it is the two ends of the spine: Edson Álvarez has to win the transition battle so they are never caught, and Raúl Jiménez has to take the half-chance a game like this hands you, because there will not be many. Keep Santiago Giménez in mind as the gambler off the bench if it is still goalless past the hour. For South Africa, Themba Zwane has the guile to spring the counter and Williams is the one who keeps them in it. The duel I will be watching most: Mexico's adventurous full-backs against Tau and Foster breaking in behind."},
      {h:"The X-factor: opening-night weight",p:"This is the very first match of a home World Cup, and that weight lands entirely on Mexico, a nation that expects, in a stadium that demands. Favourites in openers tend to tighten; underdogs play free. If South Africa get through the first 25 minutes still level, the anxiety in the stands starts to leak down onto the pitch."}
    ],
    verdict:"Mexico have the better players and they should win it. Jiménez or a set piece settles most versions of this game. But I am not buying a comfortable night. I will call it 1-0 or 2-1 Mexico with a nervy stretch in the middle, and a South Africa point would not shock me in the slightest. Lean Mexico, but hold the confidence loosely."
  }},
 {d:"Thu Jun 11",ds:"Thursday, June 11",t:"10:00",z:"PM ET",grp:"A",h:"KOR",a:"CZE",v:"Estadio Akron",c:"Guadalajara",fav:"x",conf:"toss",
  why:"A genuine coin-flip for second in the group: Czechia (+260) and Korea (+290) are priced almost level. Schick's finishing vs Son's threat decides it.",
  take:{
    standfirst:"For a neutral, this is the pick of the openers. Two sides who both genuinely fancy second place behind Mexico, separated by almost nothing in the market, and a perfect style clash: Korea's speed and craft against Czechia's muscle and set-piece menace.",
    sections:[
      {h:"How Korea play: Hong's quick, vertical game",p:"Hong Myung-bo, a 2002 World Cup semi-finalist as a player, has Korea pressing higher and playing far more vertically than they did under Klinsmann. The shape is a fluid 4-2-3-1 routed through two special talents: Lee Kang-in pulling the strings from the right half-space and Son Heung-min attacking the space in behind from the left. Win the ball back and Korea want to be in your box inside five seconds, with Hwang Hee-chan's diagonal runs stretching the back line. The insurance behind all of it is Kim Min-jae, a genuinely elite centre-back whose recovery pace lets the full-backs gamble forward."},
      {h:"How Czechia play: Hašek's direct, physical plan",p:"Czechia are everything Korea are not: bigger, more direct, and ruthless from dead balls. Ivan Hašek's side defend in a disciplined block, sit a fraction deeper, hunt the second balls, and feed Patrik Schick (when fit, one of the cleanest finishers in Europe) off the shoulder of the last defender. Their not-so-secret weapon is Tomáš Souček, a 6ft 4in midfielder who arrives late into the box and is worth a goal every few games from set pieces alone. If this turns scrappy and physical, that is precisely the game Czechia want to play."},
      {h:"The battle that settles it: Korea's high line vs Schick",p:"Here is the chess match. Korea want to squeeze the game high and play on the front foot, but a high line against Schick's diagonal runs is playing with fire, and Kim Min-jae will have to be close to flawless on the cover. At the other end, Korea's pace in transition terrifies a Czech back four that is not quick. Whoever wins that single exchange, Korea's press against Czechia's direct outlet, most likely wins the match."},
      {h:"Set pieces could be the whole story",p:"In a tight game between evenly-matched teams, the dead ball is the tie-breaker, and that lever points Czech. Souček and Schick give them two real aerial threats and a clear plan B that Korea simply do not carry to the same degree. Korea have to be ruthless and switched-on with their marking; one lapse of concentration from a corner could decide the group's closest opener."},
      {h:"Players to watch",p:"Lee Kang-in is the most important footballer on the pitch; if Korea are going to unpick a disciplined Czech block, his imagination is the key that turns the lock. Son Heung-min is still the finisher and the leader they look to in the big moment. For Czechia it is simpler: keep Schick fit and Souček dangerous, and let Lukáš Provod's left foot supply the wide deliveries that matter most."}
    ],
    verdict:"I genuinely cannot separate them, and the odds agree: this is the truest coin-flip on Matchday 1. Korea's individual ceiling (Son, Lee Kang-in, Kim Min-jae) is a shade higher, so if you forced a pick I would lean a 1-1 that Korea might nick late. But Czechia's set-piece threat makes a 1-0 either way just as live. I will call it a draw and a genuine tactical treat. Toss-up, and I mean it."
  }},

 {d:"Fri Jun 12",ds:"Friday, June 12",t:"3:00",z:"PM ET",grp:"B",h:"CAN",a:"BIH",v:"BMO Field",c:"Toronto",fav:"h",conf:"lean",
  why:"Co-hosts Canada have home advantage and the game's best player in Davies, but Džeko's Bosnia are dangerous, a narrow home lean."},
 {d:"Fri Jun 12",ds:"Friday, June 12",t:"9:00",z:"PM ET",grp:"D",h:"USA",a:"PAR",v:"SoFi Stadium",c:"Inglewood, CA",fav:"h",conf:"lean",
  why:"The hosts are favourites to win Group D and open at home, but Paraguay are organised and physical. Pulisic is the difference-maker."},

 {d:"Sat Jun 13",ds:"Saturday, June 13",t:"3:00",z:"PM ET",grp:"B",h:"QAT",a:"SUI",v:"Levi's Stadium",c:"Santa Clara, CA",fav:"a",conf:"high",
  why:"Switzerland are Group B favourites (-110) and far stronger top to bottom than Qatar. Expect Swiss control."},
 {d:"Sat Jun 13",ds:"Saturday, June 13",t:"6:00",z:"PM ET",grp:"C",h:"BRA",a:"MAR",v:"MetLife Stadium",c:"East Rutherford, NJ",fav:"h",conf:"lean",
  why:"The pick of MD1. Brazil are heavy group favourites (-290) but Morocco are the 2022 semifinalists with Hakimi and a brilliant block, the toughest 'big team' opener on the board."},
 {d:"Sat Jun 13",ds:"Saturday, June 13",t:"9:00",z:"PM ET",grp:"C",h:"HAI",a:"SCO",v:"Gillette Stadium",c:"Foxborough, MA",fav:"a",conf:"high",
  why:"Scotland's one clearly winnable group game. More quality and experience than debutant-level Haiti, and a soft spot for McTominay to score."},

 {d:"Sun Jun 14",ds:"Sunday, June 14",t:"12:00",z:"AM ET",grp:"D",h:"AUS",a:"TUR",v:"BC Place",c:"Vancouver",fav:"a",conf:"lean",
  why:"Türkiye's rising side, with Güler and Yıldız, carry more quality, but Australia are well-drilled and stubborn. Lean Türkiye."},
 {d:"Sun Jun 14",ds:"Sunday, June 14",t:"1:00",z:"PM ET",grp:"E",h:"GER",a:"CUW",v:"NRG Stadium",c:"Houston",fav:"h",conf:"high",
  why:"As lopsided as it gets: four-time champions Germany vs the smallest nation ever to qualify. A clean sheet and multi-goal Germany win is the expectation."},
 {d:"Sun Jun 14",ds:"Sunday, June 14",t:"4:00",z:"PM ET",grp:"F",h:"NED",a:"JPN",v:"AT&T Stadium",c:"Arlington, TX",fav:"h",conf:"lean",
  why:"Netherlands are group favourites (-140) but Japan beat Germany and Spain in 2022 and press hard, and the Dutch defence has wobbled. Closer than the badge suggests."},
 {d:"Sun Jun 14",ds:"Sunday, June 14",t:"7:00",z:"PM ET",grp:"E",h:"CIV",a:"ECU",v:"Lincoln Financial Field",c:"Philadelphia",fav:"a",conf:"toss",
  why:"Tight battle for the runner-up spot behind Germany. Ecuador's Caicedo-anchored balance edges the toss-up over Ivory Coast."},
 {d:"Sun Jun 14",ds:"Sunday, June 14",t:"10:00",z:"PM ET",grp:"F",h:"SWE",a:"TUN",v:"Estadio BBVA",c:"Monterrey",fav:"h",conf:"lean",
  why:"Sweden's Isak and Gyökeres front line is the most potent thing in this fixture; Tunisia defend well but lack the firepower to match it."},

 {d:"Mon Jun 15",ds:"Monday, June 15",t:"12:00",z:"PM ET",grp:"H",h:"ESP",a:"CPV",v:"Mercedes-Benz Stadium",c:"Atlanta",fav:"h",conf:"high",
  why:"The single safest result of MD1. Tournament favourites Spain (-450 to win the group) against a World Cup debutant, with a multi-goal win expected and the prime captaincy spot."},
 {d:"Mon Jun 15",ds:"Monday, June 15",t:"3:00",z:"PM ET",grp:"G",h:"BEL",a:"EGY",v:"Lumen Field",c:"Seattle",fav:"h",conf:"high",
  why:"Belgium are strong Group G favourites and far deeper than Egypt, who lean heavily on Salah. Belgian quality should tell."},
 {d:"Mon Jun 15",ds:"Monday, June 15",t:"6:00",z:"PM ET",grp:"H",h:"KSA",a:"URU",v:"Hard Rock Stadium",c:"Miami",fav:"a",conf:"high",
  why:"Uruguay are second favourites in the group (+500) with Valverde driving a serious side. Saudi Arabia can frustrate, but quality points one way."},
 {d:"Mon Jun 15",ds:"Monday, June 15",t:"9:00",z:"PM ET",grp:"G",h:"IRN",a:"NZL",v:"SoFi Stadium",c:"Inglewood, CA",fav:"h",conf:"lean",
  why:"Iran are seasoned tournament operators with Taremi up top; New Zealand will compete but Iran are the rightful favourites for the points."},

 {d:"Tue Jun 16",ds:"Tuesday, June 16",t:"12:00",z:"AM ET",grp:"J",h:"AUT",a:"JOR",v:"Levi's Stadium",c:"Santa Clara, CA",fav:"h",conf:"high",
  why:"Austria's first World Cup since 1998 starts against debutants Jordan. The European side's quality and experience make them clear favourites."},
 {d:"Tue Jun 16",ds:"Tuesday, June 16",t:"3:00",z:"PM ET",grp:"I",h:"FRA",a:"SEN",v:"MetLife Stadium",c:"East Rutherford, NJ",fav:"h",conf:"lean",
  why:"France (-215 in the group) have the firepower, but Senegal are Africa's heavyweight and a genuinely tough opener. Quality favours France without it being comfortable."},
 {d:"Tue Jun 16",ds:"Tuesday, June 16",t:"6:00",z:"PM ET",grp:"I",h:"IRQ",a:"NOR",v:"Gillette Stadium",c:"Foxborough, MA",fav:"a",conf:"high",
  why:"Haaland's long-awaited World Cup bow. Norway are group second-favourites (+275); Iraq defend deep, so chances may be at a premium, but the Norwegians should win."},
 {d:"Tue Jun 16",ds:"Tuesday, June 16",t:"9:00",z:"PM ET",grp:"J",h:"ARG",a:"ALG",v:"Arrowhead Stadium",c:"Kansas City",fav:"h",conf:"high",
  why:"Defending champions and a Messi farewell tour. Argentina are around -500 to win this match; Algeria have flair but the gap in quality is large."},

 {d:"Wed Jun 17",ds:"Wednesday, June 17",t:"1:00",z:"PM ET",grp:"K",h:"POR",a:"COD",v:"NRG Stadium",c:"Houston",fav:"h",conf:"high",
  why:"Portugal (-215 in the group) against a DR Congo side back at the World Cup after 52 years. Ronaldo, Bruno and Co. should have far too much."},
 {d:"Wed Jun 17",ds:"Wednesday, June 17",t:"4:00",z:"PM ET",grp:"L",h:"ENG",a:"CRO",v:"AT&T Stadium",c:"Arlington, TX",fav:"h",conf:"lean",
  why:"A heavyweight opener. England are favourites (-280 in the group) but Croatia, the 2018 finalists still marshalled by Modrić, are the toughest team they'll face before the latter stages."},
 {d:"Wed Jun 17",ds:"Wednesday, June 17",t:"7:00",z:"PM ET",grp:"L",h:"GHA",a:"PAN",v:"BMO Field",c:"Toronto",fav:"h",conf:"lean",
  why:"Ghana carry more pedigree and Kudus's quality; Panama are organised and won't be steamrolled, but the Black Stars are favoured."},
 {d:"Wed Jun 17",ds:"Wednesday, June 17",t:"10:00",z:"PM ET",grp:"K",h:"UZB",a:"COL",v:"Estadio Azteca",c:"Mexico City",fav:"a",conf:"high",
  why:"Colombia are a top-tier side with James and Luis Díaz; Uzbekistan are admirable debutants but the South Americans should control this comfortably."},
];

// ─── MATCHDAY 2 — June 18–23 ──────────────────────────────────────────────────
export const M2 = [
 // ── Thursday, June 18 ────────────────────────────────────────────────────────
 {d:"Thu Jun 18",ds:"Thursday, June 18",t:"12:00",z:"PM ET",grp:"A",h:"CZE",a:"RSA",v:"Mercedes-Benz Stadium",c:"Atlanta",fav:"h",conf:"lean",
  why:"Both nations need points after opening-day setbacks. Czech European quality and a more direct style should edge a South Africa side who showed real heart against Mexico."},
 {d:"Thu Jun 18",ds:"Thursday, June 18",t:"3:00",z:"PM ET",grp:"B",h:"SUI",a:"BIH",v:"SoFi Stadium",c:"Inglewood, CA",fav:"h",conf:"high",
  why:"Switzerland, clinical and unbeaten in qualifying, face a Bosnia side with Džeko's quality up front but defensive vulnerabilities. Swiss control and a comfortable margin is the expectation."},
 {d:"Thu Jun 18",ds:"Thursday, June 18",t:"6:00",z:"PM ET",grp:"B",h:"CAN",a:"QAT",v:"BC Place",c:"Vancouver",fav:"h",conf:"high",
  why:"The host nation face their most winnable group game. Canada's speed, Davies at left back, and Jonathan David's ruthless finishing against a Qatar squad that has struggled at this level."},
 {d:"Thu Jun 18",ds:"Thursday, June 18",t:"9:00",z:"PM ET",grp:"A",h:"MEX",a:"KOR",v:"Estadio Akron",c:"Guadalajara",fav:"h",conf:"lean",
  why:"A Group A second-game decider. Mexico, buoyed by their opening win, host a Korea side who cannot afford another slip after losing to Czechia on Matchday 1.",
  take:{
    standfirst:"Mexico versus Korea Republic is exactly the type of fixture that defines group-stage football: two sides with genuinely different needs, two styles, and only one result that keeps both firmly on track. Mexico need this to effectively seal Group A; Korea need it to keep their tournament alive.",
    sections:[
      {h:"Mexico: the host machine grinds on",p:"El Tri arrive with momentum and the Akron's crowd behind them, a different energy from the Azteca but still a genuine fortress. Aguirre's system favours control and width, with Lozano's pace stretching the Korea backline and Jiménez holding his striker role. After a smooth opener, Mexico know exactly what they need: a professional 90 minutes with the lead secured early. They are organised, disciplined, and carry goal threat from multiple areas including set pieces and wide runners."},
      {h:"Korea: Son at the crossroads",p:"Son Heung-min enters this match knowing that a second defeat all but ends Korea's real ambitions. The captain will operate in his familiar left-of-centre space, looking to drive in behind when Mexico commit players forward. Lee Kang-in, the creative pivot, needs to be at his absolute best. His ability to find pockets between the lines is Korea's main mechanism for creating chances in open play. The question is whether Hong Myung-bo's side can reproduce that attacking fluency under genuine tournament pressure."},
      {h:"The tactical chess: Mexico's press vs Korea's transition",p:"Mexico will look to dominate possession and press high when Korea build from the back. Korea counter by playing quick, one-touch combinations through the press to release their wide runners. The battle in central midfield (Álvarez versus the Korean double pivot) will determine who has the initiative. If Mexico dominate that zone, Korea are limited to set pieces and Son moments. If Korea can play through it, the game opens up considerably. The crowd becomes almost a tactical variable in itself if the first 25 minutes stay goalless."},
      {h:"The player who decides it",p:"Son Heung-min versus Edson Álvarez is the micro-battle that matters most. If Álvarez tracks Son, he leaves gaps for Korea's runners. If he doesn't, Son has space behind Mexico's defensive midfield line. Kim Min-jae will be the commanding defensive pillar for Korea. His composure and aerial authority are what keep their defensive shape when Mexico attack down the sides."}
    ],
    verdict:"Mexico are the better-organised side and the crowd gives them a real edge. Korea have individual quality in Son and Lee Kang-in but struggle when the sustained pressure comes. I expect a competitive first hour, then Mexico find the decisive moment through a set piece or a Jiménez run. My call: Mexico 2–0, though a 1–0 Korea win is not impossible if Son finds the space he needs early."
  }},

 // ── Friday, June 19 ──────────────────────────────────────────────────────────
 {d:"Fri Jun 19",ds:"Friday, June 19",t:"3:00",z:"PM ET",grp:"D",h:"USA",a:"AUS",v:"Lumen Field",c:"Seattle",fav:"h",conf:"lean",
  why:"The hosts need points with pressure building. Australia's Socceroos are well-organised and dangerous, but the USA at home in Seattle, with Pulisic and McKennie driving from midfield, is a different proposition."},
 {d:"Fri Jun 19",ds:"Friday, June 19",t:"6:00",z:"PM ET",grp:"C",h:"SCO",a:"MAR",v:"Gillette Stadium",c:"Foxborough, MA",fav:"a",conf:"lean",
  why:"Morocco arrive with momentum from a strong Matchday 1 showing. Scotland need to attack and prove their quality, but the Atlas Lions' defensive organisation and pace on the counter make them the favourites here."},
 {d:"Fri Jun 19",ds:"Friday, June 19",t:"8:30",z:"PM ET",grp:"C",h:"BRA",a:"HAI",v:"Lincoln Financial Field",c:"Philadelphia",fav:"h",conf:"high",
  why:"Brazil are expected to dominate a gallant Haiti side who will defend deep and look for individual moments. Vinícius, Neymar, and Raphinha carry far too much quality for a depleted Caribbean defence."},
 {d:"Fri Jun 19",ds:"Friday, June 19",t:"11:00",z:"PM ET",grp:"D",h:"TUR",a:"PAR",v:"Levi's Stadium",c:"Santa Clara, CA",fav:"h",conf:"lean",
  why:"Two unpredictable sides carrying disappointment from Matchday 1. Türkiye have the quality in Güler and Yıldız, but Paraguay's defensive grit and organisation make this a proper battle with a genuinely open result."},

 // ── Saturday, June 20 ────────────────────────────────────────────────────────
 {d:"Sat Jun 20",ds:"Saturday, June 20",t:"12:00",z:"PM ET",grp:"F",h:"NED",a:"SWE",v:"NRG Stadium",c:"Houston",fav:"h",conf:"high",
  why:"The Netherlands, electric in their opener, face Sweden's world-class striker pair in Isak and Gyökeres. Dutch quality and defensive depth should control this, though Sweden's front line always threatens."},
 {d:"Sat Jun 20",ds:"Saturday, June 20",t:"3:00",z:"PM ET",grp:"E",h:"GER",a:"CIV",v:"BMO Field",c:"Toronto",fav:"h",conf:"lean",
  why:"Germany's technical superiority and the Wirtz-Musiala axis meet Ivory Coast's pace and directness in a fascinatingly mismatched tactical duel that has far more in it than the market suggests.",
  take:{
    standfirst:"Germany versus Ivory Coast is Group E's tactical centrepiece: a European giant trying to win a tournament against an African side who have the pace, directness, and collective confidence to genuinely trouble them. Wirtz, Musiala, Kimmich. Germany's quality is undeniable. But Ivory Coast's front runners have beaten better defences on worse days.",
    sections:[
      {h:"Germany's system: high-press, quick feet",p:"Julian Nagelsmann's Germany want to dominate with the ball and press the instant they lose it. Wirtz operates in the advanced role between the lines, Musiala drifts into the left half-space and drives inside, and Kimmich provides the set-piece quality and defensive anchor from deep. When this system clicks, it is one of the most fluid and cohesive in the tournament. The risk: if Ivory Coast catch them in transition, Germany's pace in the defensive line can be exposed, especially down the channels."},
      {h:"Ivory Coast: pace, directness, and Adingra",p:"Ivory Coast's attacking plan is simple and effective: get the ball wide quickly, get Adingra and the wide runners in behind Germany's attacking full-backs, and make them pay for their ambition. Simon Adingra at Sunderland has been electric in the Premier League and is the player Germany most fear in this fixture. The Elephants' defensive compact block is designed to absorb pressure for periods and then spring on the counter. If they can stay within striking distance at halftime, their confidence grows and the second-half physicality works in their favour."},
      {h:"The decisive duel: Germany's high line vs African pace",p:"Here is the specific chess match. Germany want to keep a high defensive line to support their pressing game and maintain territorial control. But Ivory Coast's forward runners, with genuine pace, make that line dangerous to hold. Kimmich and Rüdiger must communicate clearly and maintain defensive discipline. One lapse, one ball in behind, and Adingra or Pépé are in a one-on-one. Germany's precision in this regard will be the defining variable across the ninety minutes."}
    ],
    verdict:"Germany's quality should ultimately tell, particularly through Wirtz and Musiala finding pockets in central areas. But Ivory Coast will make this genuinely uncomfortable, and if Adingra gets a clear sight of goal early this becomes an open game. My call: Germany 2–1, a proper competitive match, not a straightforward victory."
  }},
 {d:"Sat Jun 20",ds:"Saturday, June 20",t:"7:00",z:"PM ET",grp:"E",h:"ECU",a:"CUW",v:"Arrowhead Stadium",c:"Kansas City",fav:"h",conf:"high",
  why:"Ecuador against Curaçao is the clearest expected result of MD2. Valencia, Ecuador's all-time World Cup scorer, and Caicedo's midfield engine lead a side that should dominate from the first whistle."},
 {d:"Sat Jun 20",ds:"Saturday, June 20",t:"11:00",z:"PM ET",grp:"F",h:"TUN",a:"JPN",v:"Estadio BBVA",c:"Monterrey",fav:"a",conf:"lean",
  why:"Japan, ultra-organised and dangerous on the break, face a Tunisia side who must score to stay in contention. Kubo's creativity and the Samurai Blue's structural discipline make them clear favourites in Monterrey."},

 // ── Sunday, June 21 ──────────────────────────────────────────────────────────
 {d:"Sun Jun 21",ds:"Sunday, June 21",t:"12:00",z:"PM ET",grp:"H",h:"ESP",a:"KSA",v:"Mercedes-Benz Stadium",c:"Atlanta",fav:"h",conf:"high",
  why:"Spain, reigning European champions, face Saudi Arabia who famously toppled Argentina in 2022. The quality gap is large, but Mancini's Saudi side defend deep and always look for the counter-attack lightning strike."},
 {d:"Sun Jun 21",ds:"Sunday, June 21",t:"3:00",z:"PM ET",grp:"G",h:"BEL",a:"IRN",v:"SoFi Stadium",c:"Inglewood, CA",fav:"h",conf:"high",
  why:"Belgium have the individual quality to dismantle Iran's organised block. De Bruyne and Doku carry the creativity; Iran will defend deep and look for Taremi moments on the counter."},
 {d:"Sun Jun 21",ds:"Sunday, June 21",t:"6:00",z:"PM ET",grp:"H",h:"URU",a:"CPV",v:"Hard Rock Stadium",c:"Miami Gardens",fav:"h",conf:"high",
  why:"Uruguay, twice World Champions, are prohibitive favourites against Cape Verde on their World Cup debut. Valverde drives the engine from midfield and Núñez provides the finishing power."},
 {d:"Sun Jun 21",ds:"Sunday, June 21",t:"9:00",z:"PM ET",grp:"G",h:"NZL",a:"EGY",v:"BC Place",c:"Vancouver",fav:"a",conf:"lean",
  why:"This match hinges on Mohamed Salah. New Zealand will sit in a deep organised block but they cannot stop Egypt's talisman if he is given any space to operate in behind the last defender."},

 // ── Monday, June 22 ──────────────────────────────────────────────────────────
 {d:"Mon Jun 22",ds:"Monday, June 22",t:"1:00",z:"PM ET",grp:"J",h:"ARG",a:"AUT",v:"AT&T Stadium",c:"Arlington, TX",fav:"h",conf:"high",
  why:"The defending champions face Austria's most organised side in recent memory. Messi and the Albiceleste are expected to win, but this will be earned through quality rather than handed over.",
  take:{
    standfirst:"Argentina versus Austria is the match that tells us whether the defending champions are ready to impose themselves on Group J with full authority, or whether their path requires patience. Austria are no longer the compact, reactive outfit they once were. They press with intent, they have a coherent identity, and David Alaba's presence gives them a defensive backbone that can frustrate bigger sides.",
    sections:[
      {h:"The Messi machine at 38",p:"Lionel Messi's influence in this tournament is different: he drops deeper to receive, plays the diagonal switch pass rather than the driving run, and arrives late into spaces rather than creating them from nothing. The structure around him (Julián Álvarez pressing from the front, Lautaro Martínez providing physicality in the central channel) is designed to protect Messi's involvement while creating the quality chances he then finishes or creates in the final third. Argentina will dominate possession and work it through the thirds with patience and collective precision."},
      {h:"Austria's pressing identity",p:"Austria under Ralf Rangnick are a genuine pressing side, built on intense collective work that aims to win the ball high and attack with pace. Marcel Sabitzer drives the box-to-box runs that disrupt tempo, the forward line tracks back to win second balls, and Alaba sweeps everything behind the press. Their specific plan against Argentina will be to press the build-up early, force turnovers in the middle third, and attack through the pace of their wide runners before Argentina can reorganise. If they score, they lock the structure down immediately."},
      {h:"Where the decisive moment comes",p:"Argentina will have the ball for long stretches. The question is whether they can move it with enough tempo and purpose to break Austria down before the game turns physically scrappy. This is where Rodrigo De Paul's relentless industry and Enzo Fernández's technical quality matter. They must maintain the rhythm in the face of Austria's pressing triggers. One moment of individual quality from Messi, Álvarez, or Martínez will ultimately settle it and open the game up for Argentina to manage."}
    ],
    verdict:"Argentina win this, but not in a stroll. Austria will match them physically for 50 to 60 minutes, absorb the early pressure, and manufacture a moment or two from transitions. Then Messi or Álvarez find something individual and decisive that Austria cannot match. My call: Argentina 2–1, a proper Group J battle before the champions pull through in the final quarter."
  }},
 {d:"Mon Jun 22",ds:"Monday, June 22",t:"5:00",z:"PM ET",grp:"I",h:"FRA",a:"IRQ",v:"Lincoln Financial Field",c:"Philadelphia",fav:"h",conf:"high",
  why:"France have the most lethal forward line in the tournament. Iraq will defend gamely but the quality gap between Mbappé, Dembélé, Olise and any Iraqi defender is simply too wide to bridge across 90 minutes."},
 {d:"Mon Jun 22",ds:"Monday, June 22",t:"8:00",z:"PM ET",grp:"I",h:"NOR",a:"SEN",v:"MetLife Stadium",c:"East Rutherford, NJ",fav:"h",conf:"lean",
  why:"Erling Haaland's first World Cup goal would be the defining image of the tournament. Norway need this win to cement top spot in Group I. Senegal's pace and physicality on the break is the one genuine threat."},
 {d:"Mon Jun 22",ds:"Monday, June 22",t:"11:00",z:"PM ET",grp:"J",h:"JOR",a:"ALG",v:"Levi's Stadium",c:"Santa Clara, CA",fav:"a",conf:"lean",
  why:"Algeria, powered by Mahrez and Amoura, face a Jordan side quietly building momentum. A comfortable Algerian win is expected, though Jordan have the defensive organisation to make this a difficult opening period."},

 // ── Tuesday, June 23 ─────────────────────────────────────────────────────────
 {d:"Tue Jun 23",ds:"Tuesday, June 23",t:"1:00",z:"PM ET",grp:"K",h:"POR",a:"UZB",v:"NRG Stadium",c:"Houston",fav:"h",conf:"high",
  why:"Portugal's firepower (Ronaldo, Bruno Fernandes, Nuno Mendes) is overwhelming for Uzbekistan in their debut World Cup. A statement Portugal performance and another Ronaldo goal is the expectation."},
 {d:"Tue Jun 23",ds:"Tuesday, June 23",t:"4:00",z:"PM ET",grp:"L",h:"ENG",a:"GHA",v:"Gillette Stadium",c:"Foxborough, MA",fav:"h",conf:"lean",
  why:"England arrive in a familiar position: expected to win against group-stage opposition. The Kane-Bellingham axis should find its rhythm here, though Kudus's directness and set-piece threat is always a danger."},
 {d:"Tue Jun 23",ds:"Tuesday, June 23",t:"7:00",z:"PM ET",grp:"L",h:"PAN",a:"CRO",v:"BMO Field",c:"Toronto",fav:"a",conf:"lean",
  why:"Croatia, perennial over-achievers and 2022 third-place finishers still marshalled by Modrić at 40, should have too much craft and tactical intelligence for a Panama side built on defensive discipline."},
 {d:"Tue Jun 23",ds:"Tuesday, June 23",t:"10:00",z:"PM ET",grp:"K",h:"COL",a:"COD",v:"Estadio Akron",c:"Guadalajara",fav:"h",conf:"lean",
  why:"Colombia, inspired by James Rodríguez and Luis Díaz's energy, are favourites against a DR Congo side that will be organised and difficult to break down early. Colombian class should ultimately tell."},
];

// ─── MATCHDAY 3 — June 24–27 ──────────────────────────────────────────────────
// Schedule verified from ESPN. Both games in each group kick off simultaneously.
export const M3 = [
 // ── Wednesday, June 24 — Groups B, C, A ──────────────────────────────────────
 {d:"Wed Jun 24",ds:"Wednesday, June 24",t:"3:00",z:"PM ET",grp:"B",h:"BIH",a:"QAT",v:"Lumen Field",c:"Seattle",fav:"h",conf:"high",
  why:"Bosnia need a win to stay alive for a third-place qualification spot. Qatar are eliminated with nothing to play for. Džeko-led Bosnia should have more than enough quality to see this out."},
 {d:"Wed Jun 24",ds:"Wednesday, June 24",t:"3:00",z:"PM ET",grp:"B",h:"SUI",a:"CAN",v:"BC Place",c:"Vancouver",fav:"x",conf:"toss",
  why:"Both teams likely already through but fighting for group top spot. Canada at home in Vancouver with Davies flying, Switzerland clinical and disciplined. A genuine toss-up that both sides want to win."},
 {d:"Wed Jun 24",ds:"Wednesday, June 24",t:"6:00",z:"PM ET",grp:"C",h:"MAR",a:"HAI",v:"Mercedes-Benz Stadium",c:"Atlanta",fav:"h",conf:"high",
  why:"Morocco, already through after beating Scotland and drawing with Brazil, face a Haiti side that has been outclassed in both games. The Atlas Lions should top Group C."},
 {d:"Wed Jun 24",ds:"Wednesday, June 24",t:"6:00",z:"PM ET",grp:"C",h:"SCO",a:"BRA",v:"Hard Rock Stadium",c:"Miami Gardens",fav:"a",conf:"high",
  why:"Brazil need this win to guarantee progression after the Morocco draw. Scotland are already eliminated. Vinícius, Neymar and Raphinha carry far too much quality for a depleted Scottish defence."},
 {d:"Wed Jun 24",ds:"Wednesday, June 24",t:"9:00",z:"PM ET",grp:"A",h:"CZE",a:"MEX",v:"Estadio Banorte",c:"Mexico City",fav:"a",conf:"lean",
  why:"Mexico need a point to seal Group A. Czechia need a win and a Korea collapse to advance. The hosts should manage this professional job but Schick's threat on transitions is a genuine warning."},
 {d:"Wed Jun 24",ds:"Wednesday, June 24",t:"9:00",z:"PM ET",grp:"A",h:"RSA",a:"KOR",v:"Estadio BBVA",c:"Monterrey",fav:"a",conf:"lean",
  why:"Korea Republic need a win to have any chance of a third-place spot. South Africa, eliminated, face a side with everything to play for. Korea's motivation edge and Son's quality should be enough."},

 // ── Thursday, June 25 — Groups E, F, D ───────────────────────────────────────
 {d:"Thu Jun 25",ds:"Thursday, June 25",t:"4:00",z:"PM ET",grp:"E",h:"CUW",a:"CIV",v:"Lincoln Financial Field",c:"Philadelphia",fav:"a",conf:"high",
  why:"Ivory Coast need a win to stay alive for a third-place spot. Curaçao have been outclassed in both games and face an Ivorian side with genuine pace and quality. Adingra and the wide runners should be decisive."},
 {d:"Thu Jun 25",ds:"Thursday, June 25",t:"4:00",z:"PM ET",grp:"E",h:"ECU",a:"GER",v:"MetLife Stadium",c:"East Rutherford, NJ",fav:"a",conf:"lean",
  why:"Germany, likely already qualified, meet Ecuador who need a result to progress. Caicedo anchors a midfield that can frustrate anyone and Valencia is always a threat. This is not a formality for Germany."},
 {d:"Thu Jun 25",ds:"Thursday, June 25",t:"7:00",z:"PM ET",grp:"F",h:"JPN",a:"SWE",v:"AT&T Stadium",c:"Arlington, TX",fav:"x",conf:"toss",
  why:"Japan and Sweden fight for the second Group F spot. Kubo's creativity vs Isak and Gyökeres's finishing power is a brilliant individual battle that could decide which of these sides advances."},
 {d:"Thu Jun 25",ds:"Thursday, June 25",t:"7:00",z:"PM ET",grp:"F",h:"TUN",a:"NED",v:"Arrowhead Stadium",c:"Kansas City",fav:"a",conf:"high",
  why:"The Netherlands, already through, seal top spot while Tunisia play for pride. Gakpo and Dumfries should produce their best football of the group stage with no pressure attached."},
 {d:"Thu Jun 25",ds:"Thursday, June 25",t:"10:00",z:"PM ET",grp:"D",h:"PAR",a:"AUS",v:"Levi's Stadium",c:"Santa Clara, CA",fav:"x",conf:"toss",
  why:"An elimination decider for the second spot in Group D. Paraguay and Australia both need a result. The loser is almost certainly going home. Maximum pressure, minimal margin for error on both sides."},
 {d:"Thu Jun 25",ds:"Thursday, June 25",t:"10:00",z:"PM ET",grp:"D",h:"TUR",a:"USA",v:"SoFi Stadium",c:"Inglewood, CA",fav:"a",conf:"lean",
  why:"The USA, likely already through, face a Türkiye side desperately needing points. Pochettino's side have the quality advantage, though Güler and Yıldız make Turkey genuinely dangerous on the break."},

 // ── Friday, June 26 — Groups I, H, G ─────────────────────────────────────────
 {d:"Fri Jun 26",ds:"Friday, June 26",t:"3:00",z:"PM ET",grp:"I",h:"NOR",a:"FRA",v:"Gillette Stadium",c:"Foxborough, MA",fav:"a",conf:"lean",
  why:"The match of Matchday 3. Haaland's Norway against Mbappé's France for Group I top spot. Both sides already qualified. Norway's crowd energy against France's frightening firepower, the most anticipated fixture of the group stage finale.",
  take:{
    standfirst:"This is the game everyone wanted to see at the start of the group stage: Haaland vs Mbappé, Norway's physicality against France's artistry. Both are already through. Neither side will rotate. They both want to win this.",
    sections:[
      {h:"Norway's direct machine",p:"Solbakken's Norway have one game plan and execute it with ruthless clarity. Win the ball back quickly, move it forward fast through Ødegaard, and deliver into the channels for Haaland. The 4–1 win over Iraq was the template. France's defensive line will be tested aerially and on the recovery run."},
      {h:"France's creative threat",p:"Deschamps has Mbappé at full speed, Dembélé creating from the right, and Olise as the third creative option. France's biggest advantage is their ability to press high and win the ball in dangerous positions. If they stop Norway building through Ødegaard, the game opens up for their attackers."},
      {h:"The Ødegaard question",p:"The most important individual battle is Martin Ødegaard against France's midfield press. Norway's entire build-up runs through him. If France can isolate him, Norway are reduced to direct football. If Ødegaard finds pockets and switches the ball to Haaland's runs, Norway have enough to cause problems."}
    ],
    verdict:"France win this, but not comfortably. Haaland will cause problems and Norway will make it physical for 70 minutes. Then Mbappé finds the decisive moment. France 2–1, Haaland with a goal, Mbappé with the winner."
  }},
 {d:"Fri Jun 26",ds:"Friday, June 26",t:"3:00",z:"PM ET",grp:"I",h:"SEN",a:"IRQ",v:"BMO Field",c:"Toronto",fav:"h",conf:"lean",
  why:"Senegal need a win to secure second in Group I. Iraq are eliminated but have defensive resilience. Jackson's pace and Sarr's intensity in midfield should be enough for Senegal to see this through."},
 {d:"Fri Jun 26",ds:"Friday, June 26",t:"8:00",z:"PM ET",grp:"H",h:"URU",a:"ESP",v:"Estadio Akron",c:"Guadalajara",fav:"a",conf:"lean",
  why:"Uruguay host Spain in the premium fixture of MD3. After the Cape Verde shock and the Saudi Arabia demolition, this is Spain's real test. Bielsa's Uruguay with Valverde and Núñez make them the stiffest opponent Spain face before the knockouts.",
  take:{
    standfirst:"This is the match that tells us whether Spain are truly ready to win the tournament or whether the Cape Verde draw was a genuine warning sign. Uruguay under Bielsa are not a team that gives you space or time. This is the group stage finale that feels like a knockout round.",
    sections:[
      {h:"Spain's identity question",p:"The 0–0 draw with Cape Verde raised a legitimate question: can Spain unlock a low block? Their system is built on possession, patience and Yamal's brilliance on the right, but against teams who sit deep and defend compactly, the passing can become horizontal and the chances sparse. Uruguay will sit in shape and invite Spain onto them, then spring Núñez and Valverde on the counter."},
      {h:"Uruguay's counter threat",p:"Bielsa's Uruguay are one of the most dangerous counter-attacking teams in the tournament. Valverde drives from deep with genuine pace and quality, Núñez in behind is a constant threat on the shoulder of the last defender. They beat Saudi Arabia comfortably and come here with genuine belief. The goal is to make Spain play long and slow, then exploit the space behind Spain's high line."},
      {h:"The Yamal factor",p:"Lamine Yamal at 18 is still the wildcard nobody quite knows how to solve. His ability to receive in tight spaces and accelerate past two players in a single movement is what makes Spain unpredictable against a deep defence. If Uruguay's left side struggles to contain him, the whole match changes."}
    ],
    verdict:"Spain should win but it will be earned. Uruguay will make them work for every inch. My call is 2–1 Spain after a difficult first hour, with a late goal from Yamal or Oyarzabal settling it. If Uruguay score first, the game opens up entirely."
  }},
 {d:"Fri Jun 26",ds:"Friday, June 26",t:"8:00",z:"PM ET",grp:"H",h:"CPV",a:"KSA",v:"NRG Stadium",c:"Houston",fav:"a",conf:"lean",
  why:"Cape Verde and Saudi Arabia fight for a third-place qualification spot. Saudi Arabia's counter-attacking pace and Al-Dawsari's threat give them the edge over a Cape Verde side who have punched above their weight throughout."},
 {d:"Fri Jun 26",ds:"Friday, June 26",t:"11:00",z:"PM ET",grp:"G",h:"EGY",a:"IRN",v:"Lumen Field",c:"Seattle",fav:"x",conf:"toss",
  why:"An elimination decider. Egypt with Salah, Iran with Taremi. Both sides need a result to have any chance of a third-place qualification spot. One of the tightest and most pressure-packed fixtures of MD3."},
 {d:"Fri Jun 26",ds:"Friday, June 26",t:"11:00",z:"PM ET",grp:"G",h:"NZL",a:"BEL",v:"BC Place",c:"Vancouver",fav:"a",conf:"high",
  why:"Belgium, already through, face New Zealand who are already eliminated. Doku and De Bruyne should have the freedom to produce their best football. A big Belgium win is the expected send-off from Group G."},

 // ── Saturday, June 27 — Groups L, K, J (TODAY) ───────────────────────────────
 {d:"Sat Jun 27",ds:"Saturday, June 27",t:"5:00",z:"PM ET",grp:"L",h:"CRO",a:"GHA",v:"Lincoln Financial Field",c:"Philadelphia",fav:"h",conf:"lean",
  why:"Croatia, with their trademark tournament resilience marshalled by Modrić at 40, face Ghana who need a win to advance. Kudus for Ghana and Modrić's orchestration for Croatia. Individual quality decides a match with real stakes on both sides."},
 {d:"Sat Jun 27",ds:"Saturday, June 27",t:"5:00",z:"PM ET",grp:"L",h:"PAN",a:"ENG",v:"MetLife Stadium",c:"East Rutherford, NJ",fav:"a",conf:"high",
  why:"England versus Panama, England's most winnable group fixture. Kane, Bellingham and Saka against a Panama side who defend deep and compete hard. England should win this comfortably and send a message heading into the knockouts."},
 {d:"Sat Jun 27",ds:"Saturday, June 27",t:"7:30",z:"PM ET",grp:"K",h:"COL",a:"POR",v:"Hard Rock Stadium",c:"Miami Gardens",fav:"a",conf:"lean",
  why:"Colombia host Portugal in the match that decides Group K. After the shock 1–1 draw with DR Congo, Ronaldo and Portugal need a win. James Rodríguez and Luis Díaz make Colombia genuinely dangerous. The pressure on Portugal and their captain is real.",
  take:{
    standfirst:"This is Ronaldo's final chance to shape his last World Cup into a story worth telling. Portugal dropped points they cannot afford against DR Congo. A second stumble means potential elimination. Colombia, with James Rodríguez pulling the strings and Luis Díaz's pace on the flank, are not here to make it easy.",
    sections:[
      {h:"Ronaldo and the weight of the moment",p:"At 41, at his sixth and certainly last World Cup, Cristiano Ronaldo goes into this match without a goal from the group stage. The question is whether Martinez plays Ronaldo in a system that creates chances for him, or whether Portugal's best route to victory runs through Bruno Fernandes's creativity and the supporting attackers who are in better form. The captain needs this and Portugal need his best."},
      {h:"Colombia's home advantage",p:"Playing at Hard Rock Stadium, James Rodríguez orchestrating from a deeper role, Luis Díaz with genuine pace on the left. Colombia have the quality to hurt a Portugal side that has not been completely convincing. Their game plan will be to press high, force Portugal's centre-backs into long balls, and use Díaz's runs in behind to create chances."},
      {h:"Portugal's route to winning",p:"Bruno Fernandes has to control the tempo from the number ten position and find Ronaldo in the right moments. Nuno Mendes attacking from left-back is Portugal's most consistent creative outlet. If Portugal can break Colombia's press in the first 20 minutes and take the lead, Ronaldo's experience and Fernandes's delivery can see them through."}
    ],
    verdict:"Portugal win this but it is not comfortable. A Ronaldo goal would complete the story, but Portugal win it through Bruno's creativity and collective quality rather than one individual moment. My call: Portugal 2–1 with Colombia making them work for every second of it."
  }},
 {d:"Sat Jun 27",ds:"Saturday, June 27",t:"7:30",z:"PM ET",grp:"K",h:"COD",a:"UZB",v:"Mercedes-Benz Stadium",c:"Atlanta",fav:"h",conf:"lean",
  why:"DR Congo against Uzbekistan is a potential elimination battle. Both sides have shown genuine quality at this tournament. A fascinating battle between two debutant-adjacent nations with real stakes for a third-place qualification spot."},
 {d:"Sat Jun 27",ds:"Saturday, June 27",t:"10:00",z:"PM ET",grp:"J",h:"ALG",a:"AUT",v:"Arrowhead Stadium",c:"Kansas City",fav:"x",conf:"toss",
  why:"Algeria and Austria face off with third-place qualification on the line. Rangnick's pressing system against Algeria's creative threat through Mahrez and Amoura is a fascinating tactical clash with enormous stakes for both sides."},
 {d:"Sat Jun 27",ds:"Saturday, June 27",t:"10:00",z:"PM ET",grp:"J",h:"JOR",a:"ARG",v:"AT&T Stadium",c:"Arlington, TX",fav:"a",conf:"high",
  why:"Argentina, defending champions and already through after Messi's hat-trick, face Jordan's debutants in the group finale. The Albiceleste will want to send a statement heading into the knockouts. Jordan will want to give their fans something to remember."},
];

// ─── ROUND OF 32 — June 28 – July 4 ──────────────────────────────────────────
// Schedule verified from ESPN. Times in ET.
export const KO = [
 // ── Sunday, June 28 ──────────────────────────────────────────────────────────
 {d:"Sun Jun 28",ds:"Sunday, June 28",t:"3:00",z:"PM ET",round:"R32",h:"RSA",a:"CAN",v:"SoFi Stadium",c:"Inglewood, CA",fav:"a",conf:"lean",
  why:"Canada topped Group B and South Africa scraped through as a third-place qualifier. Canada have the quality edge through Davies and Buchanan, and punching through to the Round of 16 should be within them."},

 // ── Monday, June 29 ───────────────────────────────────────────────────────────
 {d:"Mon Jun 29",ds:"Monday, June 29",t:"1:00",z:"PM ET",round:"R32",h:"BRA",a:"JPN",v:"NRG Stadium",c:"Houston, TX",fav:"h",conf:"high",
  why:"Brazil are one of the tournament favourites and Japan, despite their pressing quality, face a significant quality gap against the Seleção's wide runners. Vinícius and Raphinha should be the difference."},
 {d:"Mon Jun 29",ds:"Monday, June 29",t:"4:30",z:"PM ET",round:"R32",h:"GER",a:"PAR",v:"Gillette Stadium",c:"Foxborough, MA",fav:"h",conf:"lean",
  why:"Germany have looked genuinely frightening: Undav's 5 goal contributions and the Wirtz-Musiala axis firing. Paraguay are organised and physical but the quality gap is significant. Germany to advance."},
 {d:"Mon Jun 29",ds:"Monday, June 29",t:"9:00",z:"PM ET",round:"R32",h:"NED",a:"MAR",v:"Estadio BBVA",c:"Monterrey",fav:"h",conf:"lean",
  why:"Morocco have been the tournament's standout group-stage side. The Netherlands have the quality but Morocco's defensive discipline and Hakimi's threat make this genuinely competitive. Netherlands edge it."},

 // ── Tuesday, June 30 ──────────────────────────────────────────────────────────
 {d:"Tue Jun 30",ds:"Tuesday, June 30",t:"1:00",z:"PM ET",round:"R32",h:"CIV",a:"NOR",v:"AT&T Stadium",c:"Arlington, TX",fav:"a",conf:"lean",
  why:"Norway with Haaland at full pace are among the most dangerous teams in the knockouts. Ivory Coast have Adingra's threat but Norway's structure and Haaland's finishing give them the edge."},
 {d:"Tue Jun 30",ds:"Tuesday, June 30",t:"5:00",z:"PM ET",round:"R32",h:"FRA",a:"SWE",v:"MetLife Stadium",c:"East Rutherford, NJ",fav:"h",conf:"lean",
  why:"Mbappé against Isak and Gyökeres in the same game. France have the depth advantage but Sweden's double striker threat can cause real problems. France should advance, but not easily."},
 {d:"Tue Jun 30",ds:"Tuesday, June 30",t:"9:00",z:"PM ET",round:"R32",h:"MEX",a:"ECU",v:"Estadio Banorte",c:"Mexico City",fav:"h",conf:"lean",
  why:"Mexico at the Banorte with the full home crowd against Ecuador. Caicedo's midfield control and Valencia's threat are genuine but Mexico's home advantage and set-piece quality should see them through."},

 // ── Wednesday, July 1 ─────────────────────────────────────────────────────────
 {d:"Wed Jul 1",ds:"Wednesday, July 1",t:"12:00",z:"PM ET",round:"R32",h:"ENG",a:"COD",v:"Mercedes-Benz Stadium",c:"Atlanta, GA",fav:"h",conf:"high",
  why:"England have the clearest quality advantage in this draw. Kane, Bellingham and Saka against a Congo side that shocked Portugal but will face a far more organised defensive unit. England to advance comfortably."},
 {d:"Wed Jul 1",ds:"Wednesday, July 1",t:"4:00",z:"PM ET",round:"R32",h:"BEL",a:"SEN",v:"Lumen Field",c:"Seattle, WA",fav:"h",conf:"lean",
  why:"Doku and De Bruyne against Jackson's counter-attacking pace. Belgium have the creative edge but Senegal's pressing and physical intensity make this a genuine contest that could go either way."},
 {d:"Wed Jul 1",ds:"Wednesday, July 1",t:"8:00",z:"PM ET",round:"R32",h:"USA",a:"BIH",v:"Levi's Stadium",c:"Santa Clara, CA",fav:"h",conf:"lean",
  why:"USA at home at Levi's Stadium against Bosnia. The crowd energy and Pulisic's quality give the hosts the edge. Bosnia have Džeko's experience but USA's pressing and home advantage should see them through."},

 // ── Thursday, July 2 ──────────────────────────────────────────────────────────
 {d:"Thu Jul 2",ds:"Thursday, July 2",t:"3:00",z:"PM ET",round:"R32",h:"ESP",a:"AUT",v:"SoFi Stadium",c:"Inglewood, CA",fav:"h",conf:"lean",
  why:"Spain vs Austria in the knockouts. After the Cape Verde stumble and the 4–0 statement against Saudi Arabia, Spain go in with a point to prove. Rangnick's press is dangerous but Spain's possession game should win out."},
 {d:"Thu Jul 2",ds:"Thursday, July 2",t:"7:00",z:"PM ET",round:"R32",h:"POR",a:"CRO",v:"BMO Field",c:"Toronto",fav:"h",conf:"lean",
  why:"Portugal need Ronaldo to find his form. Croatia bring Modrić's tournament intelligence and Gvardiol's quality. Bruno Fernandes is Portugal's most consistent creator. A tight tie that Portugal should edge."},
 {d:"Thu Jul 2",ds:"Thursday, July 2",t:"11:00",z:"PM ET",round:"R32",h:"SUI",a:"ALG",v:"BC Place",c:"Vancouver",fav:"x",conf:"toss",
  why:"The tightest fixture in the Round of 32. Algeria have Mahrez and Amoura's creativity; Switzerland are compact and clinical. No clear favourite. This one is decided by a single moment."},

 // ── Friday, July 3 ────────────────────────────────────────────────────────────
 {d:"Fri Jul 3",ds:"Friday, July 3",t:"2:00",z:"PM ET",round:"R32",h:"AUS",a:"EGY",v:"AT&T Stadium",c:"Arlington, TX",fav:"x",conf:"toss",
  why:"Salah gives Egypt a match-winner from nothing; Australia have physical resilience and set-piece quality. A genuine coin flip that could produce the Round of 32's most dramatic result."},
 {d:"Fri Jul 3",ds:"Friday, July 3",t:"6:00",z:"PM ET",round:"R32",h:"ARG",a:"CPV",v:"Hard Rock Stadium",c:"Miami Gardens, FL",fav:"h",conf:"high",
  why:"Argentina defending champions against Cape Verde debutants. Messi's hat-trick form and Álvarez's energy: Argentina should advance comfortably and send a message to the rest of the draw."},
 {d:"Fri Jul 3",ds:"Friday, July 3",t:"9:30",z:"PM ET",round:"R32",h:"COL",a:"GHA",v:"Arrowhead Stadium",c:"Kansas City, MO",fav:"h",conf:"lean",
  why:"James Rodríguez's creativity against Kudus's flair. Colombia's depth and James's tournament experience give them the edge in what should be a genuinely entertaining knockout tie."},
];
