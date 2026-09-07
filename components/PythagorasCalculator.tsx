'use client';

import { useState } from 'react';
import { calculatePythagoras, formatGermanNumber, parseGermanNumber, type MissingSide, type PythagorasResult } from '@/lib/pythagoras';

const modes: Array<{ value: MissingSide; label: string }> = [
  { value: 'c', label: 'Hypotenuse c' },
  { value: 'a', label: 'Kathete a' },
  { value: 'b', label: 'Kathete b' },
];

export default function PythagorasCalculator() {
  const [missing, setMissing] = useState<MissingSide>('c');
  const [values, setValues] = useState({ a: '3', b: '4', c: '' });
  const [result, setResult] = useState<PythagorasResult | null>(null);
  const [error, setError] = useState('');

  const selectMode = (side: MissingSide) => {
    setMissing(side);
    setValues((current) => ({ ...current, [side]: '' }));
    setResult(null);
    setError('');
  };

  const calculate = () => {
    try {
      const next = calculatePythagoras({
        missing,
        a: parseGermanNumber(values.a),
        b: parseGermanNumber(values.b),
        c: parseGermanNumber(values.c),
      });
      setResult(next);
      setError('');
    } catch (reason) {
      setResult(null);
      setError(reason instanceof Error ? reason.message : 'Bitte gültige Seitenlängen eingeben.');
    }
  };

  const reset = () => {
    setMissing('c');
    setValues({ a: '', b: '', c: '' });
    setResult(null);
    setError('');
  };

  const update = (side: MissingSide, value: string) => {
    setValues((current) => ({ ...current, [side]: value }));
    setResult(null);
    setError('');
  };

  return (
    <section className="pythagoras-calculator" aria-label="Pythagoras Rechner">
      <div className="pythagoras-head">
        <div><span>a² + b² = c²</span><h2>Fehlende Seite berechnen</h2></div>
        <strong>Rechtwinkliges Dreieck</strong>
      </div>

      <div className="pythagoras-body">
        <fieldset className="pythagoras-modes">
          <legend>Welche Seite fehlt?</legend>
          {modes.map((mode) => <button key={mode.value} type="button" className={missing === mode.value ? 'active' : ''} aria-pressed={missing === mode.value} onClick={() => selectMode(mode.value)}>{mode.label}</button>)}
        </fieldset>

        <div className="pythagoras-workspace">
          <div className="pythagoras-fields">
            {(['a', 'b', 'c'] as MissingSide[]).map((side) => (
              <label key={side} htmlFor={`pythagoras-${side}`}>
                {side === 'c' ? 'Hypotenuse c' : `Kathete ${side}`}
                <span className="pythagoras-input-unit"><input id={`pythagoras-${side}`} value={side === missing && result ? formatGermanNumber(result.value) : values[side]} onChange={(event) => update(side, event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') calculate(); }} disabled={side === missing} inputMode="decimal" placeholder={side === missing ? 'wird berechnet' : 'z. B. 3'} aria-describedby={`pythagoras-${side}-hint`} /><span id={`pythagoras-${side}-hint`}>Längeneinheit</span></span>
              </label>
            ))}
          </div>

          <div className="pythagoras-triangle" aria-label={`Rechtwinkliges Dreieck mit den Seiten a, b und c; ${missing} wird berechnet`} role="img"><span className="side-a">a</span><span className="side-b">b</span><span className="side-c">c</span><i aria-hidden="true" /></div>
        </div>

        <div className="pythagoras-actions"><button type="button" className="pythagoras-primary" onClick={calculate}>Seite berechnen</button><button type="button" className="pythagoras-secondary" onClick={reset}>Zurücksetzen</button></div>
        {error && <p className="pythagoras-error" role="alert">{error}</p>}
      </div>

      {result && <div className="pythagoras-result" aria-live="polite"><div><span>Ergebnis</span><strong>{result.side} = {formatGermanNumber(result.value)}</strong></div><div className="pythagoras-steps"><h3>Rechenweg</h3><ol><li>{result.formula}</li><li>{result.substitution}</li><li>{result.side} = √{formatGermanNumber(result.radicand)}</li><li><strong>{result.side} = {formatGermanNumber(result.value)}</strong></li></ol></div></div>}
    </section>
  );
}