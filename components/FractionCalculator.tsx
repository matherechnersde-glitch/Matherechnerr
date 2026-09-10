'use client';

import { useState } from 'react';
import { calculateFractions, decimalText, fractionText, mixedNumberText, parseInteger, type FractionCalculation, type FractionOperation } from '@/lib/fraction';

const operations: Array<{ value: FractionOperation; symbol: string; label: string }> = [
  { value: 'add', symbol: '+', label: 'Addieren' },
  { value: 'subtract', symbol: '−', label: 'Subtrahieren' },
  { value: 'multiply', symbol: '×', label: 'Multiplizieren' },
  { value: 'divide', symbol: '÷', label: 'Dividieren' },
];

const symbolFor = (operation: FractionOperation) => operations.find((item) => item.value === operation)?.symbol ?? '+';

export default function FractionCalculator() {
  const [values, setValues] = useState({ a: '1', b: '3', c: '2', d: '5' });
  const [operation, setOperation] = useState<FractionOperation>('add');
  const [calculation, setCalculation] = useState<FractionCalculation | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    try {
      const next = calculateFractions(
        { numerator: parseInteger(values.a, 'den ersten Zähler'), denominator: parseInteger(values.b, 'den ersten Nenner') },
        { numerator: parseInteger(values.c, 'den zweiten Zähler'), denominator: parseInteger(values.d, 'den zweiten Nenner') },
        operation,
      );
      setCalculation(next);
      setError('');
    } catch (reason) {
      setCalculation(null);
      setError(reason instanceof Error ? reason.message : 'Bitte gültige Brüche eingeben.');
    }
  };

  const update = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setCalculation(null);
    setError('');
  };

  const chooseOperation = (next: FractionOperation) => {
    setOperation(next);
    setCalculation(null);
    setError('');
  };

  const reset = () => { setValues({ a: '', b: '', c: '', d: '' }); setOperation('add'); setCalculation(null); setError(''); };
  const enter = (event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter') calculate(); };
  const result = calculation?.result;

  return (
    <section className="fraction-calculator" aria-label="Bruchrechner mit Rechenweg">
      <div className="fraction-head"><div><span>Exakt &amp; vollständig gekürzt</span><h2>Zwei Brüche berechnen</h2></div><strong>a/b · c/d</strong></div>
      <div className="fraction-body">
        <div className="fraction-expression">
          <div className="fraction-input" aria-label="Erster Bruch"><label htmlFor="fraction-a">Zähler 1</label><input id="fraction-a" value={values.a} onChange={(event) => update('a', event.target.value)} onKeyDown={enter} inputMode="numeric" placeholder="1" /><span /><label htmlFor="fraction-b">Nenner 1</label><input id="fraction-b" value={values.b} onChange={(event) => update('b', event.target.value)} onKeyDown={enter} inputMode="numeric" placeholder="3" /></div>
          <div className="fraction-operation" aria-label="Rechenart"><span>{symbolFor(operation)}</span><small>{operations.find((item) => item.value === operation)?.label}</small></div>
          <div className="fraction-input" aria-label="Zweiter Bruch"><label htmlFor="fraction-c">Zähler 2</label><input id="fraction-c" value={values.c} onChange={(event) => update('c', event.target.value)} onKeyDown={enter} inputMode="numeric" placeholder="2" /><span /><label htmlFor="fraction-d">Nenner 2</label><input id="fraction-d" value={values.d} onChange={(event) => update('d', event.target.value)} onKeyDown={enter} inputMode="numeric" placeholder="5" /></div>
          <div className="fraction-equals" aria-hidden="true">=</div>
          <div className={`fraction-preview${result ? ' has-result' : ''}`} aria-live="polite"><span>{result ? result.numerator.toString() : '?'}</span><i /><span>{result ? result.denominator.toString() : '?'}</span></div>
        </div>

        <div className="fraction-operation-tabs" role="group" aria-label="Rechenart auswählen">{operations.map((item) => <button key={item.value} type="button" className={operation === item.value ? 'active' : ''} aria-pressed={operation === item.value} onClick={() => chooseOperation(item.value)}><b>{item.symbol}</b>{item.label}</button>)}</div>
        <div className="fraction-actions"><button type="button" className="fraction-primary" onClick={calculate}>Ergebnis berechnen</button><button type="button" className="fraction-secondary" onClick={reset}>Zurücksetzen</button></div>
        {error && <p className="fraction-error" role="alert">{error}</p>}
      </div>

      {calculation && result && <div className="fraction-output" aria-live="polite">
        <div className="fraction-result-cards"><div><span>Gekürzt</span><strong>{fractionText(result)}</strong></div><div><span>Gemischte Zahl</span><strong>{mixedNumberText(result)}</strong></div><div><span>Dezimalzahl</span><strong>{decimalText(result)}</strong></div></div>
        <div className="fraction-steps"><h3>Rechenweg</h3><ol>
          {(operation === 'add' || operation === 'subtract') && calculation.expandedLeft && calculation.expandedRight && <><li>Gemeinsamer Nenner: {calculation.commonDenominator?.toString()}</li><li>{fractionText(calculation.left)} = {fractionText(calculation.expandedLeft)} und {fractionText(calculation.right)} = {fractionText(calculation.expandedRight)}</li><li>Zähler {operation === 'add' ? 'addieren' : 'subtrahieren'}: {calculation.expandedLeft.numerator.toString()} {symbolFor(operation)} {calculation.expandedRight.numerator.toString()}</li></>}
          {operation === 'multiply' && <li>Zähler miteinander und Nenner miteinander multiplizieren.</li>}
          {operation === 'divide' && <li>Den zweiten Bruch umdrehen und mit seinem Kehrwert multiplizieren.</li>}
          <li>Ergebnis vollständig kürzen: <strong>{fractionText(result)}</strong></li>
        </ol></div>
      </div>}
    </section>
  );
}