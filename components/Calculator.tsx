'use client';

import { useEffect, useRef } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
function setupAndInit(scope: HTMLElement, math: any, signal: AbortSignal): void {
  let angleMode = 'deg';
  let shiftActive = false;
  let ans: any = 0;
  let lastExpr = '';
  let histIndex = -1;
  let histOpen = false;
  let extraOpen = false;
  let justCalculated = false;
  const histKey = 'matherechner_hist';

  const input = scope.querySelector<HTMLInputElement>('.mc-input')!;
  const syntaxEl = scope.querySelector<HTMLElement>('.mc-syntax')!;
  const formulaEl = scope.querySelector<HTMLElement>('.mc-formula')!;
  const resultEl = scope.querySelector<HTMLElement>('.mc-result')!;
  const errorEl = scope.querySelector<HTMLElement>('.mc-error')!;
  const btnsEl = scope.querySelector<HTMLElement>('.mc-btns')!;
  const histPanel = scope.querySelector<HTMLElement>('.mc-hist-panel')!;
  const histList = scope.querySelector<HTMLElement>('.mc-hist-list')!;
  const extra = scope.querySelector<HTMLElement>('.mc-extra')!;

  math.import(
    {
      ln: (x: number) => math.log(x),
      lg2: (x: number) => math.log2(x),
      sqrt3: (x: number) => math.cbrt(x),
      sqrty: (x: number, n: number) => math.nthRoot(x, n),
      nCr: (n: number, r: number) => math.combinations(n, r),
      nPr: (n: number, r: number) => math.permutations(n, r),
      sec: (x: number) => 1 / math.cos(toAngle(x)),
      csc: (x: number) => 1 / math.sin(toAngle(x)),
      cot: (x: number) => 1 / math.tan(toAngle(x)),
      asec: (x: number) => fromAngle(math.acos(1 / x)),
      acsc: (x: number) => fromAngle(math.asin(1 / x)),
      acot: (x: number) => fromAngle(math.atan(1 / x)),
    },
    { override: true }
  );

  function toAngle(x: number) {
    return angleMode === 'deg' ? (x * Math.PI) / 180 : x;
  }
  function fromAngle(x: number) {
    return angleMode === 'deg' ? (x * 180) / Math.PI : x;
  }

  function preprocess(expr: string): string {
    let e = expr.trim();
    // auto-close unclosed parentheses: sin(45 → sin(45)
    let depth = 0;
    for (const ch of e) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
    }
    if (depth > 0) e += ')'.repeat(depth);
    e = e.replace(/(\d)(pi|e\b)/g, '$1*$2');
    e = e.replace(/\bans\b/g, String(ans));
    e = e.replace(/\bmod\b/g, '%');
    e = e.replace(/\blog\s*\(/g, 'log10(');
    e = e.replace(/\bln\s*\(/g, 'log(');
    e = e.replace(/\blg2\s*\(/g, 'log2(');
    e = e.replace(/\bsqrt3\s*\(/g, 'cbrt(');
    e = e.replace(/\bsqrty\s*\(/g, 'nthRoot(');
    e = e.replace(/\bnCr\s*\(/g, 'combinations(');
    e = e.replace(/\bnPr\s*\(/g, 'permutations(');
    ['sin', 'cos', 'tan'].forEach((fn) => {
      const re = new RegExp('\\b' + fn + '\\s*\\(([^()]+)\\)', 'g');
      e = e.replace(re, (_m, arg: string) =>
        angleMode === 'deg' ? `${fn}((${arg}) deg)` : _m
      );
    });
    return e;
  }

  function solveEquation(expr: string): any {
    const match = expr.match(/^(.+)=([^=].*)$/);
    if (!match) return null;
    const lhs = match[1];
    const rhs = match[2];
    function f(x: number): number {
      return (
        math.evaluate(preprocess(lhs), { x }) -
        math.evaluate(preprocess(rhs), { x })
      );
    }
    let a = -500, b = 500;
    let fa = f(a), fb = f(b);
    if (fa * fb > 0) return 'No root found in [-500,500]';
    for (let i = 0; i < 10000; i++) {
      const mid = (a + b) / 2;
      const fm = f(mid);
      if (Math.abs(fm) < 1e-9 || Math.abs(b - a) / 2 < 1e-9) return mid;
      if (fa * fm < 0) { b = mid; fb = fm; } else { a = mid; fa = fm; }
    }
    return (a + b) / 2;
  }

  function evaluate(raw: string): any {
    const eq = solveEquation(raw);
    if (eq !== null) return eq;
    return math.evaluate(preprocess(raw), {});
  }

  function formatResult(value: any): string {
    if (typeof value === 'string') return value;
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') {
      if (!isFinite(value)) return value > 0 ? 'Infinity' : '-Infinity';
      if (Number.isInteger(value) && Math.abs(value) < 1e15) return String(value);
      return math.format(value, { precision: 14 });
    }
    return math.format(value, { precision: 14 });
  }

  function updatePreview() {
    const value = input.value;
    if (!value) {
      formulaEl.textContent = '';
      resultEl.textContent = '0';
      errorEl.textContent = '';
      syntaxEl.textContent = '';
      return;
    }
    formulaEl.textContent = value.replace(/\*/g, 'x');
    errorEl.textContent = '';
    try {
      resultEl.textContent = formatResult(evaluate(value));
      syntaxEl.textContent = value.replace(/\*/g, 'x') + ' = ' + resultEl.textContent;
    } catch {
      resultEl.textContent = '';
      syntaxEl.textContent = '';
    }
  }

  function insertAt(value: string) {
    if (justCalculated) {
      justCalculated = false;
      if (/^[+\-*/^%]$/.test(value)) {
        // chain: result becomes left operand
        input.value = formatResult(ans) + value;
        input.selectionStart = input.selectionEnd = input.value.length;
        updatePreview();
        input.focus();
        return;
      }
      // any other key (digit, function, constant): start fresh
      input.value = '';
    }
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + value + input.value.slice(end);
    input.selectionStart = input.selectionEnd = start + value.length;
    updatePreview();
    input.focus();
  }

  function getHist(): Array<{ expr: string; res: string }> {
    try { return JSON.parse(localStorage.getItem(histKey) ?? '[]'); } catch { return []; }
  }
  function saveHist(h: Array<{ expr: string; res: string }>) {
    try { localStorage.setItem(histKey, JSON.stringify(h)); } catch { /* noop */ }
  }
  function addHist(expr: string, res: string) {
    const h = getHist();
    h.unshift({ expr, res });
    if (h.length > 60) h.length = 60;
    saveHist(h);
    histIndex = -1;
  }
  function esc(v: string) {
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderHist() {
    histList.innerHTML = '';
    getHist().forEach((item) => {
      const row = document.createElement('div');
      row.className = 'mc-hist-entry';
      row.innerHTML =
        '<span class="mc-hist-expr">' + esc(item.expr) +
        '</span><span class="mc-hist-res">= ' + esc(item.res) + '</span>';
      row.addEventListener('click', () => { input.value = item.expr; updatePreview(); input.focus(); });
      histList.appendChild(row);
    });
  }

  function doCalculate() {
    const raw = input.value.trim();
    if (!raw) return;
    try {
      const calculated = evaluate(raw);
      const formatted = formatResult(calculated);
      ans = calculated;
      lastExpr = raw;
      formulaEl.textContent = raw.replace(/\*/g, 'x') + ' =';
      resultEl.textContent = formatted;
      errorEl.textContent = '';
      syntaxEl.textContent = '';
      input.value = '';
      justCalculated = true;
      addHist(raw, formatted);
      if (histOpen) renderHist();
    } catch (err: any) {
      errorEl.textContent = String(err?.message ?? err);
    }
  }

  function convertBase(base: number) {
    const raw = input.value.trim() || String(ans ?? 0);
    try {
      const calculated = evaluate(raw);
      const number = Math.round(typeof calculated === 'number' ? calculated : 0);
      const output = base === 16
        ? '0x' + number.toString(16).toUpperCase()
        : '0b' + number.toString(2);
      formulaEl.textContent = raw + ' (base ' + base + ')';
      resultEl.textContent = output;
      errorEl.textContent = '';
      addHist(raw, output);
    } catch (err: any) {
      errorEl.textContent = err?.message ?? String(err);
    }
  }

  const opts: AddEventListenerOptions = { signal };

  scope.addEventListener('click', (event) => {
    const button = (event.target as Element).closest('button');
    if (!button) return;

    if (button.classList.contains('mc-more')) {
      extraOpen = !extraOpen;
      extra.classList.toggle('open', extraOpen);
      button.textContent = extraOpen ? 'Weniger Funktionen' : 'Weitere Funktionen';
      return;
    }
    if (button.classList.contains('mc-history-toggle')) {
      histOpen = !histOpen;
      histPanel.classList.toggle('open', histOpen);
      if (histOpen) renderHist();
      return;
    }

    const action = (button as HTMLButtonElement).dataset.val;
    const ins = (button as HTMLButtonElement).dataset.ins;
    const fn = (button as HTMLButtonElement).dataset.fn;

    if (action === 'shift') {
      shiftActive = !shiftActive;
      btnsEl.classList.toggle('shift', shiftActive);
      button.classList.toggle('pressed', shiftActive);
      return;
    }
    if (ins) { insertAt(ins); return; }
    if (fn) {
      const shifted: Record<string, string> = {
        sin: 'asin', cos: 'acos', tan: 'atan',
        sinh: 'asinh', cosh: 'acosh', tanh: 'atanh',
        cot: 'acot', sec: 'asec', csc: 'acsc',
      };
      insertAt((shiftActive && shifted[fn] ? shifted[fn] : fn) + '(');
      shiftActive = false;
      btnsEl.classList.remove('shift');
      return;
    }
    if (action === 'backspace') {
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      if (start !== end) {
        input.value = input.value.slice(0, start) + input.value.slice(end);
        input.selectionStart = input.selectionEnd = start;
      } else if (start > 0) {
        input.value = input.value.slice(0, start - 1) + input.value.slice(start);
        input.selectionStart = input.selectionEnd = start - 1;
      }
      updatePreview(); input.focus();
    }
    if (action === 'clear') { input.value = ''; justCalculated = false; updatePreview(); input.focus(); }
    if (action === 'negate') {
      const t = input.value.trim();
      input.value = t.startsWith('-') ? t.slice(1) : '-' + t;
      updatePreview(); input.focus();
    }
    if (action === 'swap') {
      const cur = input.value; input.value = lastExpr; lastExpr = cur;
      updatePreview(); input.focus();
    }
    if (action === 'equals') doCalculate();
    if (action === 'conv-hex') convertBase(16);
    if (action === 'conv-bin') convertBase(2);
    if (action === 'hist-up') {
      const h = getHist();
      if (h.length) {
        histIndex = Math.min(histIndex + 1, h.length - 1);
        input.value = h[histIndex].expr;
        updatePreview();
      }
    }
    if (action === 'hist-down') {
      if (histIndex <= 0) { histIndex = -1; input.value = ''; updatePreview(); }
      else { histIndex--; input.value = getHist()[histIndex].expr; updatePreview(); }
    }
  }, opts);

  scope.querySelector('.mc-hist-header button')?.addEventListener(
    'click', () => { saveHist([]); renderHist(); }, opts
  );
  scope.querySelectorAll<HTMLInputElement>('input[name="mc-angle"]').forEach((r) => {
    r.addEventListener('change', () => { angleMode = r.value; updatePreview(); }, opts);
  });
  input.addEventListener('input', () => { justCalculated = false; updatePreview(); }, opts);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); doCalculate(); }
    if (e.key === 'Escape') { input.value = ''; updatePreview(); }
  }, opts);
}

export default function Calculator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    const ac = new AbortController();
    import('mathjs').then(({ create, all }) => {
      if (ac.signal.aborted) return;
      const math = create(all);
      setupAndInit(scope, math, ac.signal);
    });
    return () => ac.abort();
  }, []);

  return (
    <div className="calculator-wrap" id="matherechner-tool" ref={ref}>
      <div className="mc-root">
        <div className="mc-display">
          <div className="mc-display-label">Ergebnis</div>
          <div className="mc-formula"></div>
          <div className="mc-result">0</div>
          <div className="mc-error"></div>
        </div>
        <div className="mc-panel">
          <div className="mc-input-row">
            <div className="mc-syntax"></div>
            <input
              className="mc-input"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="Wert eingeben..."
              aria-label="Mathematischen Wert eingeben"
            />
          </div>
          <div className="mc-btns">
            <div className="mc-row subcmd">
              <button className="mc-btn subcmd-btn" data-val="shift" aria-label="Second function">2nd</button>
              <button className="mc-btn subcmd-btn" data-ins="pi" aria-label="Insert pi">pi</button>
              <button className="mc-btn subcmd-btn" data-ins="e" aria-label="Insert e">e</button>
              <button className="mc-btn subcmd-btn" data-ins="ans" aria-label="Last answer">ans</button>
              <button className="mc-btn subcmd-btn" data-ins="x=" aria-label="Insert x=">x=</button>
              <button className="mc-btn subcmd-btn mc-bl" data-ins="(" aria-label="Open parenthesis">(</button>
              <button className="mc-btn subcmd-btn" data-ins="," aria-label="Comma">,</button>
              <button className="mc-btn subcmd-btn" data-ins=")" aria-label="Close parenthesis">)</button>
              <button className="mc-btn subcmd-btn" data-val="swap" aria-label="Swap expression">swap</button>
              <button className="mc-btn subcmd-btn op" data-val="backspace" aria-label="Backspace">back</button>
            </div>
            <div className="mc-row">
              <button className="mc-btn f" data-fn="sin"><span className="pri">sin</span><span className="sec">asin</span></button>
              <button className="mc-btn f" data-fn="sinh"><span className="pri">sinh</span><span className="sec">asinh</span></button>
              <button className="mc-btn f" data-fn="cot"><span className="pri">cot</span><span className="sec">acot</span></button>
              <button className="mc-btn o" data-fn="sqrty" aria-label="nth root">root</button>
              <button className="mc-btn o" data-ins="^" aria-label="Power x to y">x^y</button>
              <button className="mc-btn mc-bl" data-ins="7">7</button>
              <button className="mc-btn" data-ins="8">8</button>
              <button className="mc-btn" data-ins="9">9</button>
              <button className="mc-btn op" data-ins="/" aria-label="Divide">/</button>
              <button className="mc-btn op" data-val="clear" aria-label="Clear all">C</button>
            </div>
            <div className="mc-row">
              <button className="mc-btn f" data-fn="cos"><span className="pri">cos</span><span className="sec">acos</span></button>
              <button className="mc-btn f" data-fn="cosh"><span className="pri">cosh</span><span className="sec">acosh</span></button>
              <button className="mc-btn f" data-fn="sec"><span className="pri">sec</span><span className="sec">asec</span></button>
              <button className="mc-btn o" data-fn="sqrt3" aria-label="Cube root">cbrt</button>
              <button className="mc-btn o" data-ins="^3" aria-label="x cubed">x^3</button>
              <button className="mc-btn mc-bl" data-ins="4">4</button>
              <button className="mc-btn" data-ins="5">5</button>
              <button className="mc-btn" data-ins="6">6</button>
              <button className="mc-btn op" data-ins="*" aria-label="Multiply">*</button>
              <span className="mc-eq-placeholder"></span>
            </div>
            <div className="mc-row">
              <button className="mc-btn f" data-fn="tan"><span className="pri">tan</span><span className="sec">atan</span></button>
              <button className="mc-btn f" data-fn="tanh"><span className="pri">tanh</span><span className="sec">atanh</span></button>
              <button className="mc-btn f" data-fn="csc"><span className="pri">csc</span><span className="sec">acsc</span></button>
              <button className="mc-btn o" data-fn="sqrt" aria-label="Square root">sqrt</button>
              <button className="mc-btn o" data-ins="^2" aria-label="x squared">x^2</button>
              <button className="mc-btn mc-bl" data-ins="1">1</button>
              <button className="mc-btn" data-ins="2">2</button>
              <button className="mc-btn" data-ins="3">3</button>
              <button className="mc-btn op" data-ins="-" aria-label="Subtract">-</button>
              <span className="mc-eq-placeholder"></span>
            </div>
            <div className="mc-row">
              <button className="mc-btn f" data-fn="nCr" aria-label="Combinations nCr">nCr</button>
              <button className="mc-btn f" data-fn="nPr" aria-label="Permutations nPr">nPr</button>
              <button className="mc-btn" data-ins="%" aria-label="Percent">%</button>
              <button className="mc-btn f" data-fn="log" aria-label="Logarithm base 10">log</button>
              <button className="mc-btn o" data-ins="10^(" aria-label="10 to the power of x">10^x</button>
              <button className="mc-btn mc-bl" data-ins="0">0</button>
              <button className="mc-btn" data-val="negate" aria-label="Toggle sign">+/-</button>
              <button className="mc-btn" data-ins="." aria-label="Decimal point">.</button>
              <button className="mc-btn op" data-ins="+" aria-label="Add">+</button>
              <span className="mc-eq-placeholder"></span>
            </div>
            <button className="mc-eq" data-val="equals" aria-label="Calculate result">=</button>
            <div className="mc-row">
              <button className="mc-more" type="button">Weitere Funktionen</button>
            </div>
            <div className="mc-row mc-extra">
              <button className="mc-btn f" data-fn="ln" aria-label="Natural logarithm">ln</button>
              <button className="mc-btn f" data-fn="exp" aria-label="Exponential">exp</button>
              <button className="mc-btn f" data-fn="log2" aria-label="Log base 2">log2</button>
              <button className="mc-btn o" data-ins="2^(" aria-label="2 to the power of x">2^x</button>
              <button className="mc-btn f" data-fn="abs" aria-label="Absolute value">abs</button>
              <button className="mc-btn f" data-fn="floor" aria-label="Floor">floor</button>
              <button className="mc-btn f" data-fn="ceil" aria-label="Ceiling">ceil</button>
              <button className="mc-btn f" data-fn="round" aria-label="Round">rnd</button>
              <button className="mc-btn f" data-val="conv-hex" aria-label="Convert to hexadecimal">hex</button>
              <button className="mc-btn f" data-val="conv-bin" aria-label="Convert to binary">bin</button>
            </div>
          </div>
          <div className="mc-options">
            <div className="mc-angle-group">
              <label className="mc-angle">
                <input type="radio" name="mc-angle" value="deg" defaultChecked />
                {' '}Deg<small>360</small>
              </label>
              <label className="mc-angle">
                <input type="radio" name="mc-angle" value="rad" />
                {' '}Rad<small>2pi</small>
              </label>
            </div>
            <button className="mc-history-toggle" type="button">History</button>
            <div className="mc-hist-nav">
              <button type="button" data-val="hist-up" aria-label="Previous history entry">up</button>
              <button type="button" data-val="hist-down" aria-label="Next history entry">dn</button>
            </div>
          </div>
          <div className="mc-hist-panel">
            <div className="mc-hist-header">
              <button type="button">Verlauf löschen</button>
            </div>
            <div className="mc-hist-list"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
