'use client';

import { useCallback, useRef, useState, type ComponentType, type KeyboardEvent } from 'react';
import { COMMON, EXAMPLES, FUNCTIONS, type Key, type Tab } from '@/lib/calculator-keys';

type CalculatorProps = { initialLatex?: string; initialTab?: Tab; calculateOnMount?: boolean };

function appendTemplate(current: string, key: Key): string {
  if (!key.insert) return current;
  return `${current}${key.insert}`;
}

export default function DeferredCalculator() {
  const [Calculator, setCalculator] = useState<ComponentType<CalculatorProps> | null>(null);
  const [latex, setLatex] = useState('');
  const [tab, setTab] = useState<Tab>('algebra');
  const [calculateOnMount, setCalculateOnMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadPromise = useRef<Promise<void> | null>(null);

  const loadCalculator = useCallback(() => {
    if (Calculator || loadPromise.current) return;
    setLoading(true);
    loadPromise.current = import('./CalculatorNew').then((module) => {
      setCalculator(() => module.default);
      setLoading(false);
    }).catch(() => {
      loadPromise.current = null;
      setLoading(false);
    });
  }, [Calculator]);

  if (Calculator) return <Calculator initialLatex={latex} initialTab={tab} calculateOnMount={calculateOnMount} />;

  const handleKey = (key: Key) => {
    if (key.action === 'clear') setLatex('');
    else if (key.action === 'back') setLatex((value) => value.slice(0, -1));
    else if (key.action === 'calculate') setCalculateOnMount(true);
    else setLatex((value) => appendTemplate(value, key));
    loadCalculator();
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    setCalculateOnMount(true);
    loadCalculator();
  };

  const functionRows = FUNCTIONS[tab];
  return <div className="gcalc gcalc-deferred" id="matherechner-tool" aria-busy={loading} onPointerEnter={loadCalculator} onTouchStart={loadCalculator}>
    <div className="gcalc-display">
      <div className="gcalc-expr-row">
        <input className="gcalc-deferred-input" value={latex} onFocus={loadCalculator} onChange={(event) => { setLatex(event.target.value); loadCalculator(); }} onKeyDown={handleEnter} inputMode="text" aria-label="Mathematischen Ausdruck eingeben" />
        <button type="button" className="gcalc-deferred-keyboard" aria-label="Mathematische Tastatur öffnen" onClick={loadCalculator}>⌨</button>
      </div>
      <div className="gcalc-keyboard-guide">
        <button type="button" className="gcalc-keyboard-guide-main" onClick={loadCalculator} aria-label="Mathematische Tastatur für weitere Funktionen öffnen"><span className="gcalc-keyboard-guide-icon" aria-hidden="true">⌨</span><span><strong>Mehr Mathe-Funktionen</strong><small>Tastatur öffnen für Brüche, Wurzeln &amp; mehr</small></span><span className="gcalc-keyboard-guide-arrow" aria-hidden="true">↗</span></button>
      </div>
      {loading && <span className="gcalc-deferred-status" role="status">Mathe-Werkzeuge werden aktiviert …</span>}
    </div>

    <div className="gcalc-tabs" role="tablist">{(['algebra', 'trig', 'calculus'] as Tab[]).map((item) => <button key={item} role="tab" type="button" aria-selected={tab === item} className={`gcalc-tab gcalc-tab--${item}${tab === item ? ' gcalc-tab--active' : ''}`} onClick={() => { setTab(item); loadCalculator(); }}>{{ algebra: 'Algebra', trig: 'Trigonometrie', calculus: 'Analysis' }[item]}</button>)}</div>

    <div className={`gcalc-keypad gcalc-keypad--${tab}`}>{functionRows.map((row, index) => <div className="gcalc-row" key={index}>{row.map((key) => <button type="button" key={key.aria} className="gcalc-btn gcalc-btn--fn" aria-label={key.aria} onClick={() => handleKey(key)}>{key.label}</button>)}{COMMON[index].map((key) => <button type="button" key={key.aria} className={`gcalc-btn gcalc-btn--num${key.variant ? ` gcalc-btn--${key.variant}` : ''}`} aria-label={key.aria} onClick={() => handleKey(key)}>{key.label}</button>)}</div>)}</div>

    <div className="gcalc-sugg"><div className="gcalc-cards">{EXAMPLES.map((example) => <button type="button" className="gcalc-card" key={example.label} onClick={() => { setLatex(example.latex); loadCalculator(); }}><span className="gcalc-card-lbl">{example.label}</span><span className="gcalc-card-expr">{example.display}</span></button>)}</div><button type="button" className="gcalc-expand-btn" aria-label="Berechnungsverlauf öffnen" onClick={loadCalculator}>↻</button></div>
  </div>;
}