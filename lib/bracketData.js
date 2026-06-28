// ---------------------------------------------------------------------------
// Full WC26 knockout bracket — R32 through Final.
// Each game has: id, srcH/srcA (source game ids), d/ds/t/z (date/time), v/c (venue).
// R32 games also have h/a team codes (known teams).
// Later rounds resolve h/a dynamically from previous round winners.
// ---------------------------------------------------------------------------

export const R32 = [
  { id:'r32-1',  seq:1,  h:'RSA', a:'CAN', d:'Sun Jun 28', ds:'Sunday, June 28',    t:'3:00',  z:'PM ET', v:'SoFi Stadium',              c:'Inglewood, CA'       },
  { id:'r32-2',  seq:2,  h:'BRA', a:'JPN', d:'Mon Jun 29', ds:'Monday, June 29',    t:'1:00',  z:'PM ET', v:'NRG Stadium',               c:'Houston, TX'         },
  { id:'r32-3',  seq:3,  h:'GER', a:'PAR', d:'Mon Jun 29', ds:'Monday, June 29',    t:'4:30',  z:'PM ET', v:'Gillette Stadium',           c:'Foxborough, MA'      },
  { id:'r32-4',  seq:4,  h:'NED', a:'MAR', d:'Mon Jun 29', ds:'Monday, June 29',    t:'9:00',  z:'PM ET', v:'Estadio BBVA',               c:'Monterrey'           },
  { id:'r32-5',  seq:5,  h:'CIV', a:'NOR', d:'Tue Jun 30', ds:'Tuesday, June 30',   t:'1:00',  z:'PM ET', v:'AT&T Stadium',               c:'Arlington, TX'       },
  { id:'r32-6',  seq:6,  h:'FRA', a:'SWE', d:'Tue Jun 30', ds:'Tuesday, June 30',   t:'5:00',  z:'PM ET', v:'MetLife Stadium',            c:'East Rutherford, NJ' },
  { id:'r32-7',  seq:7,  h:'MEX', a:'ECU', d:'Tue Jun 30', ds:'Tuesday, June 30',   t:'9:00',  z:'PM ET', v:'Estadio Banorte',            c:'Mexico City'         },
  { id:'r32-8',  seq:8,  h:'ENG', a:'COD', d:'Wed Jul 1',  ds:'Wednesday, July 1',  t:'12:00', z:'PM ET', v:'Mercedes-Benz Stadium',      c:'Atlanta, GA'         },
  { id:'r32-9',  seq:9,  h:'BEL', a:'SEN', d:'Wed Jul 1',  ds:'Wednesday, July 1',  t:'4:00',  z:'PM ET', v:'Lumen Field',                c:'Seattle, WA'         },
  { id:'r32-10', seq:10, h:'USA', a:'BIH', d:'Wed Jul 1',  ds:'Wednesday, July 1',  t:'8:00',  z:'PM ET', v:"Levi's Stadium",             c:'Santa Clara, CA'     },
  { id:'r32-11', seq:11, h:'ESP', a:'AUT', d:'Thu Jul 2',  ds:'Thursday, July 2',   t:'3:00',  z:'PM ET', v:'SoFi Stadium',               c:'Inglewood, CA'       },
  { id:'r32-12', seq:12, h:'POR', a:'CRO', d:'Thu Jul 2',  ds:'Thursday, July 2',   t:'7:00',  z:'PM ET', v:'BMO Field',                  c:'Toronto'             },
  { id:'r32-13', seq:13, h:'SUI', a:'ALG', d:'Thu Jul 2',  ds:'Thursday, July 2',   t:'11:00', z:'PM ET', v:'BC Place',                   c:'Vancouver'           },
  { id:'r32-14', seq:14, h:'AUS', a:'EGY', d:'Fri Jul 3',  ds:'Friday, July 3',     t:'2:00',  z:'PM ET', v:'AT&T Stadium',               c:'Arlington, TX'       },
  { id:'r32-15', seq:15, h:'ARG', a:'CPV', d:'Fri Jul 3',  ds:'Friday, July 3',     t:'6:00',  z:'PM ET', v:'Hard Rock Stadium',          c:'Miami Gardens, FL'   },
  { id:'r32-16', seq:16, h:'COL', a:'GHA', d:'Fri Jul 3',  ds:'Friday, July 3',     t:'9:30',  z:'PM ET', v:'Arrowhead Stadium',          c:'Kansas City, MO'     },
];

// R16: srcH/srcA are the r32 game ids whose winners fill each side.
export const R16 = [
  { id:'r16-1', srcH:'r32-1',  srcA:'r32-3',  d:'Sat Jul 4', ds:'Saturday, July 4',    t:'1:00',  z:'PM ET', v:'NRG Stadium',               c:'Houston, TX'         },
  { id:'r16-2', srcH:'r32-2',  srcA:'r32-5',  d:'Sat Jul 4', ds:'Saturday, July 4',    t:'5:00',  z:'PM ET', v:'Lincoln Financial Field',    c:'Philadelphia, PA'    },
  { id:'r16-3', srcH:'r32-4',  srcA:'r32-6',  d:'Sun Jul 5', ds:'Sunday, July 5',      t:'4:00',  z:'PM ET', v:'MetLife Stadium',            c:'East Rutherford, NJ' },
  { id:'r16-4', srcH:'r32-7',  srcA:'r32-8',  d:'Sun Jul 5', ds:'Sunday, July 5',      t:'8:00',  z:'PM ET', v:'Estadio Banorte',            c:'Mexico City'         },
  { id:'r16-5', srcH:'r32-11', srcA:'r32-12', d:'Mon Jul 6', ds:'Monday, July 6',      t:'3:00',  z:'PM ET', v:'AT&T Stadium',               c:'Arlington, TX'       },
  { id:'r16-6', srcH:'r32-9',  srcA:'r32-10', d:'Mon Jul 6', ds:'Monday, July 6',      t:'8:00',  z:'PM ET', v:'Lumen Field',                c:'Seattle, WA'         },
  { id:'r16-7', srcH:'r32-14', srcA:'r32-16', d:'Tue Jul 7', ds:'Tuesday, July 7',     t:'12:00', z:'PM ET', v:'Mercedes-Benz Stadium',      c:'Atlanta, GA'         },
  { id:'r16-8', srcH:'r32-13', srcA:'r32-15', d:'Tue Jul 7', ds:'Tuesday, July 7',     t:'4:00',  z:'PM ET', v:'BC Place',                   c:'Vancouver'           },
];

export const QF = [
  { id:'qf-1', srcH:'r16-1', srcA:'r16-2', d:'Thu Jul 9',  ds:'Thursday, July 9',    t:'4:00',  z:'PM ET', v:'Gillette Stadium',           c:'Foxborough, MA'      },
  { id:'qf-2', srcH:'r16-5', srcA:'r16-6', d:'Fri Jul 10', ds:'Friday, July 10',     t:'3:00',  z:'PM ET', v:'SoFi Stadium',               c:'Inglewood, CA'       },
  { id:'qf-3', srcH:'r16-3', srcA:'r16-4', d:'Sat Jul 11', ds:'Saturday, July 11',   t:'5:00',  z:'PM ET', v:'Hard Rock Stadium',          c:'Miami Gardens, FL'   },
  { id:'qf-4', srcH:'r16-7', srcA:'r16-8', d:'Sat Jul 11', ds:'Saturday, July 11',   t:'9:00',  z:'PM ET', v:'Arrowhead Stadium',          c:'Kansas City, MO'     },
];

export const SF = [
  { id:'sf-1', srcH:'qf-1', srcA:'qf-2', d:'Tue Jul 14', ds:'Tuesday, July 14',   t:'3:00', z:'PM ET', v:'AT&T Stadium',          c:'Arlington, TX'       },
  { id:'sf-2', srcH:'qf-3', srcA:'qf-4', d:'Wed Jul 15', ds:'Wednesday, July 15', t:'3:00', z:'PM ET', v:'Mercedes-Benz Stadium', c:'Atlanta, GA'         },
];

export const THIRD_PLACE = [
  { id:'tp',    srcH:'sf-1',  srcA:'sf-2',  loser:true, d:'Sat Jul 18', ds:'Saturday, July 18', t:'5:00', z:'PM ET', v:'Hard Rock Stadium', c:'Miami Gardens, FL' },
];

export const FINAL = [
  { id:'final', srcH:'sf-1', srcA:'sf-2', d:'Sun Jul 19', ds:'Sunday, July 19', t:'3:00', z:'PM ET', v:'MetLife Stadium', c:'East Rutherford, NJ' },
];

// Ordered bracket layout — top-to-bottom positions for each round.
// R32 positions define which R32 game pairs into which R16 slot.
// Top half feeds SF-1, bottom half feeds SF-2.
export const BRACKET_ORDER = {
  // [r32 game id order for top half of bracket, feeds r16-1..4 then qf-1/2 then sf-1]
  topHalf:  ['r32-1','r32-3','r32-2','r32-5','r32-11','r32-12','r32-9','r32-10'],
  bottomHalf:['r32-4','r32-6','r32-7','r32-8','r32-14','r32-16','r32-13','r32-15'],
  topR16:   ['r16-1','r16-2','r16-5','r16-6'],
  bottomR16: ['r16-3','r16-4','r16-7','r16-8'],
  topQF:    ['qf-1','qf-2'],
  bottomQF: ['qf-3','qf-4'],
};
