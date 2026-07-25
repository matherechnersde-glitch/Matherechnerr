'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

type Tab = 'algebra' | 'trig' | 'calculus';

// ─── Suggestion cards ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: 'Lineare Gleichungen',     display: '6x + 5 = 14',               expr: '6x + 5 = 14' },
  { label: 'Polynome',                display: '(x + 5)(x + 2)',             expr: '(x + 5)(x + 2)' },
  { label: 'Quadr. Gleichungen',      display: '4x² − 5x − 12 = 0',         expr: '4x^2 - 5x - 12 = 0' },
  { label: 'Rationale Ausdrücke',     display: '(3x)/(x²+3)−(2x)/(x²+1)',   expr: '(3x)/(x^2+3) - (2x)/(x^2+1)' },
  { label: 'Exponenten',              display: '5ˣ = 3125',                  expr: '5^x = 3125' },
  { label: 'Komplexe Zahlen',         display: '5(3−2i)+2i(4+6i)',           expr: '5*(3-2i) + 2*i*(4+6i)' },
  { label: 'Trigonometrie',           display: 'sin(30)² + cos(30)²',        expr: 'sin(30)^2 + cos(30)^2' },
  { label: 'Ungleichungen',           display: '-2x + 7 > -11',              expr: '-2x + 7 > -11' },
  { label: 'Lin. Gleichungssystem',   display: '7x + 2y = 24, x = 2',       expr: '7*2 + 2*y = 24' },
  { label: 'Wurzeln',                 display: 'sqrt(2*4 + 7) - 4',         expr: 'sqrt(2*4 + 7) - 4' },
  { label: 'Betrag',                  display: 'abs(2*(-2) - 2)',            expr: 'abs(2*(-2) - 2)' },
  { label: 'Logarithmen',             display: 'log(1000)',                   expr: 'log(1000)' },
  { label: 'Wahrscheinlichkeit',      display: 'combinations(6, 4)',          expr: 'combinations(6, 4)' },
  { label: 'Integrale',               display: '∫ y²−3y+5 dy (numerisch)',   expr: 'integrate(y^2 - 3*y + 5, y, 0, 1)' },
  { label: 'Ableitungen',             display: "d/dx(x²·cos(x))",            expr: 'derivative(x^2 * cos(x), x)' },
  { label: 'Vektoren',                display: '[3, 0] + [-2, 0]',           expr: '[3, 0] + [-2, 0]' },
  { label: 'Matrizen',                display: '[[1,2],[3,4]]·[[1,0],[0,1]]', expr: '[[1,2],[3,4]] * [[1,0],[0,1]]' },
];

// ─── Button definitions ────────────────────────────────────────────────────────
type BtnDef = {
  label: string;
  ins?: string;
  action?: 'back' | 'clear' | 'calc';
  variant?: 'op' | 'back' | 'ac' | 'calc';
};

const FN_ALG: BtnDef[][] = [
  [{ label: 'x²', ins: '^2' },   { label: 'ⁿ√', ins: 'nthRoot(' }, { label: '<', ins: ' < ' }],
  [{ label: '1/x', ins: '1/(' }, { label: '|x|', ins: 'abs(' },     { label: '≤', ins: ' <= ' }],
  [{ label: 'log', ins: 'log(' },{ label: 'x!', ins: '!' },          { label: '>', ins: ' > ' }],
  [{ label: 'i', ins: 'i' },     { label: '%', ins: '%' },            { label: '≥', ins: ' >= ' }],
  [{ label: 'x', ins: 'x' },     { label: 'y', ins: 'y' },           { label: '=', ins: ' = ' }],
];

const FN_TRIG: BtnDef[][] = [
  [{ label: 'sin', ins: 'sin(' },     { label: 'cos', ins: 'cos(' },     { label: 'tan', ins: 'tan(' }],
  [{ label: 'csc', ins: 'csc(' },     { label: 'sec', ins: 'sec(' },     { label: 'cot', ins: 'cot(' }],
  [{ label: 'arcsin', ins: 'asin(' }, { label: 'arccos', ins: 'acos(' }, { label: 'arctan', ins: 'atan(' }],
  [{ label: 'x²', ins: '^2' },        { label: 'x°', ins: ' deg' },      { label: 'π', ins: 'pi' }],
  [{ label: 'x', ins: 'x' },          { label: 'y', ins: 'y' },          { label: '=', ins: ' = ' }],
];

const FN_CALC: BtnDef[][] = [
  [{ label: 'd/dx', ins: 'derivative(' }, { label: '∞', ins: 'Infinity' },       { label: '√', ins: 'sqrt(' }],
  [{ label: 'lim', ins: 'lim(' },          { label: 'lim⁺', ins: 'lim(' },       { label: 'lim⁻', ins: 'lim(' }],
  [{ label: 'log', ins: 'log(' },          { label: 'C(n,k)', ins: 'combinations(' }, { label: 'P(n,k)', ins: 'permutations(' }],
  [{ label: 'Σ', ins: 'sum(' },       { label: '∫', ins: 'integrate(' },     { label: '∫ᵇₐ', ins: 'integrate(' }],
  [{ label: 'x', ins: 'x' },              { label: 'y', ins: 'y' },                { label: 'e', ins: 'e' }],
];

const FN_KEYS: Record<Tab, BtnDef[][]> = { algebra: FN_ALG, trig: FN_TRIG, calculus: FN_CALC };

const NUM_ROWS: BtnDef[][] = [
  [{ label: '(', ins: '(' }, { label: ')', ins: ')' }, { label: '⌫', action: 'back', variant: 'back' }, { label: 'AC', action: 'clear', variant: 'ac' }],
  [{ label: '7', ins: '7' }, { label: '8', ins: '8' }, { label: '9', ins: '9' }, { label: '÷', ins: '/', variant: 'op' }],
  [{ label: '4', ins: '4' }, { label: '5', ins: '5' }, { label: '6', ins: '6' }, { label: '×', ins: '*', variant: 'op' }],
  [{ label: '1', ins: '1' }, { label: '2', ins: '2' }, { label: '3', ins: '3' }, { label: '−', ins: '-', variant: 'op' }],
  [{ label: '0', ins: '0' }, { label: '.', ins: '.' }, { label: '▶', action: 'calc', variant: 'calc' }, { label: '+', ins: '+', variant: 'op' }],
];

// ─── Math helpers (run outside React, called from component) ──────────────────

function fmtNum(n: number): string {
  if (!isFinite(n)) return n > 0 ? '∞' : '-∞';
  const r = Math.round(n * 1e9) / 1e9;
  if (Number.isInteger(r) && Math.abs(r) < 1e15) return String(r);
  // up to 10 significant digits, strip trailing zeros
  return parseFloat(n.toPrecision(10)).toString();
}

function fmtVal(val: any, math: any): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'boolean') return val ? 'Wahr' : 'Falsch';
  if (typeof val === 'number') return fmtNum(val);
  // Complex
  if (val && typeof val === 'object' && val.re !== undefined && val.im !== undefined) {
    const re = fmtNum(val.re);
    const absIm = fmtNum(Math.abs(val.im));
    if (val.im === 0) return re;
    if (val.re === 0) return `${val.im < 0 ? '-' : ''}${absIm}i`;
    return `${re} ${val.im < 0 ? '−' : '+'} ${absIm}i`;
  }
  // Matrix / vector
  if (val && val.isMatrix) {
    const arr = val.toArray();
    if (Array.isArray(arr[0])) {
      return arr.map((row: any[]) => '[' + row.map((c: any) => fmtVal(c, math)).join(', ') + ']').join(', ');
    }
    return '[' + arr.map((c: any) => fmtVal(c, math)).join(', ') + ']';
  }
  if (Array.isArray(val)) {
    if (Array.isArray(val[0])) {
      return val.map((row: any[]) => '[' + row.map((c: any) => fmtVal(c, math)).join(', ') + ']').join(', ');
    }
    return '[' + val.map((c: any) => fmtVal(c, math)).join(', ') + ']';
  }
  try { return math.format(val, { precision: 10 }); } catch { return String(val); }
}

function preprocess(raw: string, angleMode: 'deg' | 'rad'): string {
  let e = raw.trim();

  // Unicode → ASCII
  e = e.replace(/π/g, 'pi');
  e = e.replace(/∞/g, 'Infinity');
  e = e.replace(/×/g, '*');
  e = e.replace(/÷/g, '/');
  e = e.replace(/−/g, '-');
  e = e.replace(/²/g, '^2');
  e = e.replace(/³/g, '^3');

  // Auto-close parentheses
  let depth = 0;
  for (const ch of e) { if (ch === '(') depth++; else if (ch === ')') depth--; }
  if (depth > 0) e += ')'.repeat(depth);

  // Implicit multiplication: 2x → 2*x, 2( → 2*(, )( → )*(
  e = e.replace(/(\d+\.?\d*)\s*([a-df-wyz])/gi, '$1*$2');
  e = e.replace(/(\d+\.?\d*)\s*\(/g, '$1*(');
  e = e.replace(/\)\s*\(/g, ')*(');

  // Log/ln
  e = e.replace(/\bmod\b/gi, '%');
  e = e.replace(/\bln\s*\(/g, 'log(');
  e = e.replace(/\blog\s*\(/g, 'log10(');

  // Trig with degree conversion
  if (angleMode === 'deg') {
    ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'].forEach(fn => {
      const re = new RegExp(`\\b${fn}\\s*\\(([^()]+)\\)`, 'g');
      e = e.replace(re, (_: string, arg: string) => `${fn}((${arg}) deg)`);
    });
  }

  return e;
}

function solveEq(lhs: string, rhs: string, math: any, angleMode: 'deg' | 'rad'): string | null {
  try {
    const lP = preprocess(lhs.trim(), angleMode);
    const rP = preprocess(rhs.trim(), angleMode);

    // Try constants
    try {
      const lv = math.evaluate(lP);
      const rv = math.evaluate(rP);
      if (typeof lv === 'number' && typeof rv === 'number') {
        return Math.abs(lv - rv) < 1e-9 ? 'Wahr' : 'Falsch';
      }
    } catch { /* has variables */ }

    const f = (x: number): number => {
      try {
        const scope = { x, y: 0 };
        const l = math.evaluate(lP, scope);
        const r = math.evaluate(rP, scope);
        const lv = typeof l === 'number' ? l : (l.re ?? 0);
        const rv = typeof r === 'number' ? r : (r.re ?? 0);
        return lv - rv;
      } catch { return NaN; }
    };

    const solutions: number[] = [];
    const STEP = 0.1;
    let prev = f(-200);
    for (let xi = -200 + STEP; xi <= 200; xi += STEP) {
      const curr = f(xi);
      if (!isNaN(prev) && !isNaN(curr) && Math.sign(prev) !== Math.sign(curr)) {
        let a = xi - STEP, b = xi, fa = f(a);
        for (let k = 0; k < 60; k++) {
          const m = (a + b) / 2;
          const fm = f(m);
          if (Math.abs(fm) < 1e-10 || (b - a) < 1e-10) {
            const sol = Math.round(m * 1e8) / 1e8;
            if (!solutions.some(s => Math.abs(s - sol) < 1e-5)) solutions.push(sol);
            break;
          }
          if (fa * fm < 0) { b = m; } else { a = m; fa = fm; }
        }
      }
      prev = curr;
    }

    if (!solutions.length) return null;
    const fmt = solutions.map(fmtNum);
    return fmt.length === 1 ? `x = ${fmt[0]}` : `x = {${fmt.join(', ')}}`;
  } catch { return null; }
}

function compute(raw: string, math: any, angleMode: 'deg' | 'rad'): string | null {
  if (!math || !raw.trim()) return null;

  // Derivative: derivative(expr, var)
  const dm = raw.match(/^derivative\s*\(\s*(.+?)\s*,\s*(\w+)\s*\)\s*$/i);
  if (dm) {
    try {
      const d = math.derivative(dm[1].trim(), dm[2].trim());
      const s = math.simplify(d);
      return s.toString().replace(/\s*\*\s*/g, '·').replace(/\bpi\b/g, 'π');
    } catch { return null; }
  }

  // Numerical integrate: integrate(expr, var, a, b)
  const im = raw.match(/^integrate\s*\(\s*(.+?)\s*,\s*(\w+)\s*,\s*(.+?)\s*,\s*(.+?)\s*\)\s*$/i);
  if (im) {
    try {
      const [, exprStr, varName, aStr, bStr] = im;
      const a = math.evaluate(aStr);
      const b = math.evaluate(bStr);
      const fn = (v: number) => {
        const scope: any = {}; scope[varName] = v;
        return math.evaluate(preprocess(exprStr, angleMode), scope);
      };
      // Simpson's rule (1000 intervals)
      const n = 1000;
      const h = (b - a) / n;
      let sum = fn(a) + fn(b);
      for (let i = 1; i < n; i++) sum += fn(a + i * h) * (i % 2 === 0 ? 2 : 4);
      return fmtNum(sum * h / 3);
    } catch { return null; }
  }

  // Equation: contains = but not == != <= >=
  const eqM = raw.match(/^(.+?)\s*(?<![=!<>])=(?![=<>])(.+)$/);
  if (eqM) return solveEq(eqM[1], eqM[2], math, angleMode);

  // Normal evaluate
  try {
    const val = math.evaluate(preprocess(raw, angleMode));
    return fmtVal(val, math);
  } catch { return null; }
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function CalculatorNew() {
  const [tab, setTab] = useState<Tab>('algebra');
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');
  const [justCalc, setJustCalc] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');

  const inputRef   = useRef<HTMLInputElement>(null);
  const mathRef    = useRef<any>(null);
  const pendingCursor = useRef<number | null>(null);
  const angleModeRef  = useRef<'deg' | 'rad'>('deg');

  useEffect(() => { angleModeRef.current = angleMode; }, [angleMode]);

  // Load mathjs once
  useEffect(() => {
    import('mathjs').then(({ create, all }) => {
      const math = create(all);
      const toRad   = (x: number) => angleModeRef.current === 'deg' ? (x * Math.PI) / 180 : x;
      const fromRad = (x: number) => angleModeRef.current === 'deg' ? (x * 180) / Math.PI : x;
      math.import({
        csc:  (x: number) => 1 / math.sin(toRad(x)),
        sec:  (x: number) => 1 / math.cos(toRad(x)),
        cot:  (x: number) => 1 / math.tan(toRad(x)),
        acsc: (x: number) => fromRad(math.asin(1 / x) as number),
        asec: (x: number) => fromRad(math.acos(1 / x) as number),
        acot: (x: number) => fromRad(math.atan(1 / x) as number),
      }, { override: true });
      mathRef.current = math;
    });
  }, []);

  // Restore cursor after programmatic inserts
  useEffect(() => {
    if (pendingCursor.current === null) return;
    const pos = pendingCursor.current;
    pendingCursor.current = null;
    requestAnimationFrame(() => {
      const inp = inputRef.current;
      if (!inp) return;
      inp.focus();
      inp.setSelectionRange(pos, pos);
    });
  });

  const doCompute = useCallback((raw: string): string | null => {
    return compute(raw, mathRef.current, angleModeRef.current);
  }, []);

  // Live preview while typing
  useEffect(() => {
    if (!expr || justCalc) { if (!justCalc) setResult(''); return; }
    setResult(doCompute(expr) ?? '');
  }, [expr, justCalc, doCompute]);

  const doCalculate = useCallback((raw?: string) => {
    const src = raw ?? expr;
    if (!src.trim()) return;
    const res = doCompute(src);
    if (res !== null) { setResult(res); setJustCalc(true); }
  }, [expr, doCompute]);

  const insertText = useCallback((text: string) => {
    const inp = inputRef.current;
    const start = inp?.selectionStart ?? expr.length;
    const end   = inp?.selectionEnd   ?? expr.length;

    if (justCalc) {
      setJustCalc(false);
      if (/^[+\-*/^%]/.test(text.trim())) {
        const next = result + text;
        setExpr(next); pendingCursor.current = next.length;
      } else {
        setExpr(text); pendingCursor.current = text.length;
      }
      return;
    }

    const next = expr.slice(0, start) + text + expr.slice(end);
    setExpr(next);
    pendingCursor.current = start + text.length;
  }, [expr, result, justCalc]);

  const doBack = useCallback(() => {
    const inp = inputRef.current;
    const start = inp?.selectionStart ?? expr.length;
    const end   = inp?.selectionEnd   ?? expr.length;
    if (start !== end) {
      const next = expr.slice(0, start) + expr.slice(end);
      setExpr(next); pendingCursor.current = start;
    } else if (start > 0) {
      const next = expr.slice(0, start - 1) + expr.slice(start);
      setExpr(next); pendingCursor.current = start - 1;
    }
    setJustCalc(false);
  }, [expr]);

  const handleBtn = useCallback((btn: BtnDef) => {
    if (btn.action === 'back')  { doBack(); return; }
    if (btn.action === 'clear') { setExpr(''); setResult(''); setJustCalc(false); pendingCursor.current = 0; inputRef.current?.focus(); return; }
    if (btn.action === 'calc')  { doCalculate(); return; }
    if (btn.ins) insertText(btn.ins);
    inputRef.current?.focus();
  }, [doBack, doCalculate, insertText]);

  const handleCard = useCallback((e: string) => {
    setExpr(e);
    setJustCalc(false);
    pendingCursor.current = e.length;
    // auto-calculate after tiny delay so state settles
    setTimeout(() => {
      const res = compute(e, mathRef.current, angleModeRef.current);
      if (res !== null) { setResult(res); setJustCalc(true); }
    }, 50);
    inputRef.current?.focus();
  }, []);

  const fnRows = FN_KEYS[tab];
  const shown  = expanded ? SUGGESTIONS : SUGGESTIONS.slice(0, 3);

  return (
    <div className="gcalc" id="matherechner-tool">

      {/* Display */}
      <div className="gcalc-display">
        <div className="gcalc-expr-row">
          <input
            ref={inputRef}
            className="gcalc-input"
            type="text"
            value={expr}
            placeholder="Ausdruck eingeben…"
            autoComplete="off"
            spellCheck={false}
            aria-label="Mathematischen Ausdruck eingeben"
            onChange={e => { setJustCalc(false); setExpr(e.target.value); }}
            onKeyDown={e => {
              if (e.key === 'Enter')  { e.preventDefault(); doCalculate(); }
              if (e.key === 'Escape') { setExpr(''); setResult(''); setJustCalc(false); }
            }}
          />
        </div>
        {result && (
          <div className="gcalc-result-row">
            <span className="gcalc-eq-sign">=</span>
            <span className={`gcalc-res${justCalc ? ' gcalc-res--final' : ' gcalc-res--preview'}`}>{result}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="gcalc-tabs" role="tablist">
        {(['algebra', 'trig', 'calculus'] as Tab[]).map(t => (
          <button key={t} role="tab" type="button" aria-selected={tab === t}
            className={`gcalc-tab gcalc-tab--${t}${tab === t ? ' gcalc-tab--active' : ''}`}
            onClick={() => setTab(t)}>
            {{ algebra: 'Algebra', trig: 'Trigonometrie', calculus: 'Analysis' }[t]}
          </button>
        ))}
      </div>

      {/* Keypad */}
      <div className={`gcalc-keypad gcalc-keypad--${tab}`}>
        {fnRows.map((fnRow, ri) => (
          <div key={ri} className="gcalc-row">
            {fnRow.map((btn, ci) => (
              <button key={ci} type="button" className="gcalc-btn gcalc-btn--fn"
                onClick={() => handleBtn(btn)} aria-label={btn.label}>
                {btn.label}
              </button>
            ))}
            {NUM_ROWS[ri].map((btn, ci) => (
              <button key={'n'+ci} type="button"
                className={`gcalc-btn gcalc-btn--num${btn.variant ? ' gcalc-btn--' + btn.variant : ''}`}
                onClick={() => handleBtn(btn)} aria-label={btn.label}>
                {btn.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Angle mode — Trig tab only */}
      {tab === 'trig' && (
        <div className="gcalc-angle-bar">
          {(['deg', 'rad'] as const).map(m => (
            <label key={m} className="gcalc-angle-opt">
              <input type="radio" name="gcalc-angle" value={m}
                checked={angleMode === m} onChange={() => setAngleMode(m)} />
              {m === 'deg' ? 'Grad' : 'Radiant'}
            </label>
          ))}
        </div>
      )}

      {/* Suggestions */}
      <div className="gcalc-sugg">
        <div className="gcalc-cards">
          {shown.map((s, i) => (
            <button key={i} type="button" className="gcalc-card" onClick={() => handleCard(s.expr)}>
              <span className="gcalc-card-lbl">{s.label}</span>
              <span className="gcalc-card-expr">{s.display}</span>
            </button>
          ))}
        </div>
        <button type="button" className="gcalc-expand-btn"
          onClick={() => setExpanded(v => !v)}
          aria-label={expanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}>
          {expanded ? '∧' : '∨'}
        </button>
      </div>
    </div>
  );
}
