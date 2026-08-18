'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { calculateLatex, type AngleMode, type MathResult, type ResultAction } from '@/lib/calculator-engine';
import { StructuredMathField, type StructuredMathFieldHandle } from './StructuredMathField';

import { COMMON, EXAMPLES, FUNCTIONS, type Key, type Tab } from '@/lib/calculator-keys';
type HistoryEntry = { latex: string; exactLatex: string; decimalLatex?: string; angleMode: AngleMode; operation: string };

export default function CalculatorNew() {
  const [tab, setTab] = useState<Tab>('algebra');
  const [latex, setLatex] = useState('');
  const [result, setResult] = useState<MathResult | null>(null);
  const [error, setError] = useState('');
  const [angleMode, setAngleMode] = useState<AngleMode>('deg');
  const [decimal, setDecimal] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const inputRef = useRef<StructuredMathFieldHandle>(null);

  useEffect(() => { try { setHistory(JSON.parse(localStorage.getItem('matherechner-history') || '[]')); } catch {} }, []);
  const saveHistory = useCallback((entry: HistoryEntry) => {
    setHistory(old => { const next = [entry, ...old].slice(0, 20); localStorage.setItem('matherechner-history', JSON.stringify(next)); return next; });
  }, []);

  const calculate = useCallback((action: ResultAction = 'auto') => {
    const source = inputRef.current?.getValue() || latex;
    try {
      const next = calculateLatex(source, angleMode, action);
      setResult(next); setError(''); setDecimal(false);
      if (action === 'auto') saveHistory({ latex: source, exactLatex: next.exactLatex, decimalLatex: next.decimalLatex, angleMode, operation: next.operation });
    } catch (e) { setResult(null); setError(e instanceof Error ? e.message : 'Ungültiger mathematischer Ausdruck'); }
  }, [angleMode, latex, saveHistory]);

  const handleKey = useCallback((key: Key) => {
    if (key.action === 'back') return inputRef.current?.backspace();
    if (key.action === 'clear') { inputRef.current?.clear(); setLatex(''); setResult(null); setError(''); return; }
    if (key.action === 'calculate') return calculate();
    if (key.insert) { inputRef.current?.insert(key.insert); setResult(null); setError(''); }
  }, [calculate]);

  const shownLatex = decimal && result?.decimalLatex ? result.decimalLatex : result?.exactLatex || '';
  const functionRows = FUNCTIONS[tab];
  const actions = useMemo(() => [
    { label: 'Vereinfacht', action: 'simplify' as ResultAction },
    { label: 'Erweitert', action: 'expand' as ResultAction },
    { label: 'Faktorisiert', action: 'factor' as ResultAction },
    { label: 'Lösungen', action: 'solve' as ResultAction },
  ], []);

  return <div className="gcalc" id="matherechner-tool">
    <div className="gcalc-display">
      <div className="gcalc-expr-row">
        <StructuredMathField ref={inputRef} value={latex} ariaLabel="Mathematischen Ausdruck eingeben" onInput={value => { setLatex(value); setResult(null); setError(''); }} onEnter={() => calculate()} onEscape={() => { setError(''); }} />
      </div>
      {error && <div className="gcalc-error" role="alert">{error}</div>}
      {result && <div className="gcalc-result-row">
        <span className="gcalc-eq-sign">=</span>
        <StructuredMathField value={shownLatex} readOnly ariaLabel={`${result.operation}: Ergebnis`} className="gcalc-result-field" />
        {result.decimalLatex && result.decimalLatex !== result.exactLatex && <button type="button" className="gcalc-format-toggle" onClick={() => setDecimal(v => !v)}>{decimal ? 'Exakt' : 'Dezimal'}</button>}
      </div>}
      {result && <div className="gcalc-result-actions">{actions.map(item => <button type="button" key={item.action} onClick={() => calculate(item.action)}>{item.label}</button>)}</div>}
    </div>

    <div className="gcalc-tabs" role="tablist">{(['algebra','trig','calculus'] as Tab[]).map(t => <button key={t} role="tab" type="button" aria-selected={tab === t} className={`gcalc-tab gcalc-tab--${t}${tab === t ? ' gcalc-tab--active' : ''}`} onClick={() => setTab(t)}>{{ algebra: 'Algebra', trig: 'Trigonometrie', calculus: 'Analysis' }[t]}</button>)}</div>

    <div className={`gcalc-keypad gcalc-keypad--${tab}`}>{functionRows.map((row, index) => <div className="gcalc-row" key={index}>{row.map(key => <button type="button" key={key.aria} className="gcalc-btn gcalc-btn--fn" aria-label={key.aria} onClick={() => handleKey(key)}>{key.label}</button>)}{COMMON[index].map(key => <button type="button" key={key.aria} className={`gcalc-btn gcalc-btn--num${key.variant ? ` gcalc-btn--${key.variant}` : ''}`} aria-label={key.aria} onClick={() => handleKey(key)}>{key.label}</button>)}</div>)}</div>

    {tab === 'trig' && <div className="gcalc-angle-bar">{(['deg','rad'] as AngleMode[]).map(mode => <label className="gcalc-angle-opt" key={mode}><input type="radio" name="gcalc-angle" checked={angleMode === mode} onChange={() => setAngleMode(mode)} />{mode === 'deg' ? 'DEG' : 'RAD'}</label>)}</div>}

    <div className="gcalc-sugg"><div className="gcalc-cards">{EXAMPLES.map(example => <button type="button" className="gcalc-card" key={example.label} onClick={() => { inputRef.current?.setValue(example.latex); setLatex(example.latex); setResult(null); setError(''); inputRef.current?.focus(); }}><span className="gcalc-card-lbl">{example.label}</span><span className="gcalc-card-expr">{example.display}</span></button>)}</div><button type="button" className="gcalc-expand-btn" aria-label="Berechnungsverlauf öffnen" onClick={() => setHistoryOpen(v => !v)}>↺</button></div>

    {historyOpen && <div className="gcalc-symbolic-history"><div className="gcalc-history-head"><strong>Verlauf</strong><button type="button" onClick={() => { setHistory([]); localStorage.removeItem('matherechner-history'); }}>Löschen</button></div>{history.length ? history.map((entry,index) => <button type="button" key={`${entry.latex}-${index}`} onClick={() => { inputRef.current?.setValue(entry.latex); setLatex(entry.latex); setResult({ exactLatex: entry.exactLatex, decimalLatex: entry.decimalLatex, operation: entry.operation }); setAngleMode(entry.angleMode); }}><StructuredMathField value={entry.latex} readOnly ariaLabel="Gespeicherter Ausdruck" /><span>=</span><StructuredMathField value={entry.exactLatex} readOnly ariaLabel="Gespeichertes Ergebnis" /></button>) : <p>Noch keine Berechnungen.</p>}</div>}
  </div>;
}
