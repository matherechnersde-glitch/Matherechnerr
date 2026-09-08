export type Tab = 'algebra' | 'trig' | 'calculus';
export type Key = { label: string; aria: string; insert?: string; action?: 'back'|'clear'|'calculate'; variant?: 'op'|'back'|'ac'|'calc' };

export const EXAMPLES = [
  { label: 'Lineare Gleichungen', display: '6x + 5 = 14', latex: '6x+5=14' },
  { label: 'Polynome', display: '(x + 5)(x + 2)', latex: '(x+5)(x+2)' },
  { label: 'Quadratische Gleichungen', display: 'x² − 5x + 6 = 0', latex: 'x^2-5x+6=0' },
];

const ALGEBRA: Key[][] = [
  [{ label: 'xⁿ', aria: 'Potenz mit beliebigem Exponenten', insert: '#@^{#?}' }, { label: 'ⁿ√x', aria: 'Wurzel mit beliebigem Index', insert: '\\sqrt[#?]{#0}' }, { label: '<', aria: 'Kleiner als', insert: '<' }],
  [{ label: '¹⁄ₓ', aria: 'Bruch oder Kehrwert', insert: '\\frac{#0}{#?}' }, { label: '|x|', aria: 'Betrag', insert: '\\left|#0\\right|' }, { label: '≤', aria: 'Kleiner oder gleich', insert: '\\le' }],
  [{ label: 'log', aria: 'Logarithmus', insert: '\\log(#0)' }, { label: 'x!', aria: 'Fakultät', insert: '#@!' }, { label: '>', aria: 'Größer als', insert: '>' }],
  [{ label: 'i', aria: 'Imaginäre Einheit i', insert: 'i' }, { label: '%', aria: 'Prozent', insert: '\\%' }, { label: '≥', aria: 'Größer oder gleich', insert: '\\ge' }],
  [{ label: 'x', aria: 'Variable x', insert: 'x' }, { label: 'y', aria: 'Variable y', insert: 'y' }, { label: '=', aria: 'Gleichheitszeichen', insert: '=' }],
];
const TRIG: Key[][] = [
  [{ label: 'sin', aria: 'Sinus', insert: '\\sin(#0)' }, { label: 'cos', aria: 'Kosinus', insert: '\\cos(#0)' }, { label: 'tan', aria: 'Tangens', insert: '\\tan(#0)' }],
  [{ label: 'csc', aria: 'Kosekans', insert: '\\operatorname{csc}(#0)' }, { label: 'sec', aria: 'Sekans', insert: '\\operatorname{sec}(#0)' }, { label: 'cot', aria: 'Kotangens', insert: '\\operatorname{cot}(#0)' }],
  [{ label: 'arcsin', aria: 'Arkussinus', insert: '\\arcsin(#0)' }, { label: 'arccos', aria: 'Arkuskosinus', insert: '\\arccos(#0)' }, { label: 'arctan', aria: 'Arkustangens', insert: '\\arctan(#0)' }],
  [{ label: 'x²', aria: 'Quadrat', insert: '#@^2' }, { label: 'x⁻¹', aria: 'Kehrwert als negative Potenz', insert: '#@^{-1}' }, { label: 'π', aria: 'Kreiszahl Pi', insert: '\\pi' }],
  [{ label: 'x', aria: 'Variable x', insert: 'x' }, { label: 'y', aria: 'Variable y', insert: 'y' }, { label: '=', aria: 'Gleichheitszeichen', insert: '=' }],
];
const CALCULUS: Key[][] = [
  [{ label: 'd/dx', aria: 'Ableitung', insert: '\\frac{d}{d#?}(#0)' }, { label: '∞', aria: 'Unendlich', insert: '\\infty' }, { label: 'ⁿ√x', aria: 'Wurzel mit Index', insert: '\\sqrt[#?]{#0}' }],
  [{ label: 'lim', aria: 'Zweiseitiger Grenzwert', insert: '\\lim_{#?\\to#?}#0' }, { label: 'lim⁺', aria: 'Rechtsseitiger Grenzwert', insert: '\\lim_{#?\\to#?^{+}}#0' }, { label: 'lim⁻', aria: 'Linksseitiger Grenzwert', insert: '\\lim_{#?\\to#?^{-}}#0' }],
  [{ label: 'log', aria: 'Logarithmus', insert: '\\log(#0)' }, { label: 'C(n,k)', aria: 'Kombinationen', insert: 'C(#0,#?)' }, { label: 'P(n,k)', aria: 'Permutationen', insert: 'P(#0,#?)' }],
  [{ label: 'Σ', aria: 'Summe mit Grenzen', insert: '\\sum_{#?=#?}^{#?}#0' }, { label: '∫', aria: 'Unbestimmtes Integral', insert: '\\int #0\\,d#?' }, { label: '∫ᵇₐ', aria: 'Bestimmtes Integral', insert: '\\int_{#?}^{#?}#0\\,d#?' }],
  [{ label: 'x', aria: 'Variable x', insert: 'x' }, { label: 'y', aria: 'Variable y', insert: 'y' }, { label: 'e', aria: 'Eulersche Zahl', insert: 'e' }],
];
export const FUNCTIONS: Record<Tab, Key[][]> = { algebra: ALGEBRA, trig: TRIG, calculus: CALCULUS };
export const COMMON: Key[][] = [
  [{ label: '(', aria: 'Öffnende Klammer', insert: '(' }, { label: ')', aria: 'Schließende Klammer', insert: ')' }, { label: '⌫', aria: 'Letztes mathematisches Element löschen', action: 'back', variant: 'back' }, { label: 'AC', aria: 'Gesamten Ausdruck löschen', action: 'clear', variant: 'ac' }],
  [{ label: '7', aria: 'Sieben', insert: '7' }, { label: '8', aria: 'Acht', insert: '8' }, { label: '9', aria: 'Neun', insert: '9' }, { label: '÷', aria: 'Division', insert: '\\div', variant: 'op' }],
  [{ label: '4', aria: 'Vier', insert: '4' }, { label: '5', aria: 'Fünf', insert: '5' }, { label: '6', aria: 'Sechs', insert: '6' }, { label: '×', aria: 'Multiplikation', insert: '\\times', variant: 'op' }],
  [{ label: '1', aria: 'Eins', insert: '1' }, { label: '2', aria: 'Zwei', insert: '2' }, { label: '3', aria: 'Drei', insert: '3' }, { label: '−', aria: 'Subtraktion', insert: '-', variant: 'op' }],
  [{ label: '0', aria: 'Null', insert: '0' }, { label: ',', aria: 'Dezimaltrennzeichen', insert: '.' }, { label: '=', aria: 'Ergebnis berechnen', action: 'calculate', variant: 'calc' }, { label: '+', aria: 'Addition', insert: '+', variant: 'op' }],
];

export const CALCULATOR_KEYS = { algebra: ALGEBRA, trig: TRIG, calculus: CALCULUS, common: COMMON };

