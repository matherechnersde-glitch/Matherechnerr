'use client';

import { useState } from 'react';
import { evaluate, format } from 'mathjs';

type Key = { label: string; value?: string; action?: 'clear' | 'backspace' | 'calculate'; kind?: 'fn' | 'op' | 'equal' };

const keys: Key[] = [
  { label: 'sin', value: 'sin(', kind: 'fn' }, { label: 'cos', value: 'cos(', kind: 'fn' }, { label: 'tan', value: 'tan(', kind: 'fn' }, { label: '√', value: 'sqrt(', kind: 'fn' }, { label: 'AC', action: 'clear', kind: 'op' },
  { label: 'π', value: 'pi', kind: 'fn' }, { label: 'e', value: 'e', kind: 'fn' }, { label: 'x²', value: '^2', kind: 'fn' }, { label: '(', value: '(', kind: 'op' }, { label: ')', value: ')', kind: 'op' },
  { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '÷', value: '/', kind: 'op' }, { label: '⌫', action: 'backspace', kind: 'op' },
  { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '×', value: '*', kind: 'op' }, { label: '%', value: '%', kind: 'op' },
  { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '−', value: '-', kind: 'op' }, { label: '^', value: '^', kind: 'op' },
  { label: '0', value: '0' }, { label: ',', value: '.' }, { label: 'log', value: 'log10(', kind: 'fn' }, { label: '+', value: '+', kind: 'op' }, { label: '=', action: 'calculate', kind: 'equal' },
];

function normalize(expression: string) {
  return expression
    .replace(/,/g, '.')
    .replace(/π/g, 'pi')
    .replace(/(\d|\)|pi|e)(?=(pi|e|\())/g, '$1*')
    .replace(/%(?=\s*$)/, '/100');
}

function calculate(expression: string): string {
  const normalized = normalize(expression.trim());
  if (!normalized) return '';
  if (!/^[0-9+\-*/^().,%\sA-Za-z]+$/.test(normalized)) throw new Error('invalid');
  const names = normalized.match(/[A-Za-z]+/g) ?? [];
  const allowed = new Set(['pi', 'e', 'sin', 'cos', 'tan', 'sqrt', 'log', 'log10', 'abs']);
  if (names.some((name) => !allowed.has(name))) throw new Error('invalid');
  const result = evaluate(normalized);
  if (typeof result !== 'number' || !Number.isFinite(result)) throw new Error('invalid');
  return format(result, { precision: 14 }).replace('.', ',');
}

export default function PiCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const run = () => {
    try {
      const next = calculate(expression);
      if (!next) return;
      setResult(next);
      setError('');
    } catch {
      setResult('');
      setError('Ungültiger oder unvollständiger Ausdruck');
    }
  };

  const press = (key: Key) => {
    if (key.action === 'clear') { setExpression(''); setResult(''); setError(''); return; }
    if (key.action === 'backspace') { setExpression((current) => current.slice(0, -1)); setError(''); return; }
    if (key.action === 'calculate') { run(); return; }
    setExpression((current) => current + (key.value ?? ''));
    setError('');
  };

  return (
    <section className="pi-calculator" aria-label="Einfacher wissenschaftlicher Pi-Rechner">
      <label className="sr-only" htmlFor="pi-calculator-input">Rechenausdruck</label>
      <input
        id="pi-calculator-input"
        className="pi-calculator-input"
        value={expression}
        onChange={(event) => setExpression(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); run(); } }}
        placeholder="Zum Beispiel: 2 × π × 5"
        inputMode="decimal"
        autoComplete="off"
      />
      <div className="pi-calculator-result" aria-live="polite">
        {error ? <span className="pi-calculator-error">{error}</span> : result ? <><span>=</span><strong>{result}</strong></> : <span className="pi-calculator-hint">π = 3,141592653589793</span>}
      </div>
      <div className="pi-calculator-keys">
        {keys.map((key, index) => (
          <button
            key={`${key.label}-${index}`}
            type="button"
            className={`pi-calculator-key${key.kind ? ` pi-calculator-key--${key.kind}` : ''}`}
            onClick={() => press(key)}
            aria-label={key.label === 'π' ? 'Pi einfügen' : key.label === '⌫' ? 'Letztes Zeichen löschen' : key.label}
          >{key.label}</button>
        ))}
      </div>
    </section>
  );
}