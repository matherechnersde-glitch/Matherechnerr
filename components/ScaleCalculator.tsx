'use client';

import { useState } from 'react';
import { calculateScale, formatScaleNumber, parseScaleNumber, type LengthUnit, type ScaleMode } from '@/lib/scale';

const modes: Array<{ value: ScaleMode; label: string; short: string }> = [
  { value: 'toReality', label: 'Plan → Wirklichkeit', short: 'Reale Länge' },
  { value: 'toDrawing', label: 'Wirklichkeit → Plan', short: 'Planlänge' },
  { value: 'findScale', label: 'Maßstab bestimmen', short: 'Maßstab' },
];
const units: LengthUnit[] = ['mm', 'cm', 'm', 'km'];

export default function ScaleCalculator() {
  const [mode, setMode] = useState<ScaleMode>('toReality');
  const [drawing, setDrawing] = useState('4');
  const [drawingUnit, setDrawingUnit] = useState<LengthUnit>('cm');
  const [reality, setReality] = useState('');
  const [realityUnit, setRealityUnit] = useState<LengthUnit>('m');
  const [denominator, setDenominator] = useState('1000');
  const [result, setResult] = useState<ReturnType<typeof calculateScale> | null>(null);
  const [error, setError] = useState('');

  const resetResult = () => { setResult(null); setError(''); };
  const selectMode = (next: ScaleMode) => { setMode(next); resetResult(); };
  const calculate = () => {
    try {
      setResult(calculateScale({ mode, drawing: parseScaleNumber(drawing), drawingUnit, reality: parseScaleNumber(reality), realityUnit, denominator: parseScaleNumber(denominator) }));
      setError('');
    } catch (reason) {
      setResult(null);
      setError(reason instanceof Error ? reason.message : 'Bitte gültige Werte eingeben.');
    }
  };
  const reset = () => { setMode('toReality'); setDrawing(''); setReality(''); setDenominator('1000'); setDrawingUnit('cm'); setRealityUnit('m'); resetResult(); };
  const onEnter = (event: React.KeyboardEvent) => { if (event.key === 'Enter') calculate(); };

  const resultText = result ? mode === 'findScale' ? `${formatScaleNumber(result.numerator)} : ${formatScaleNumber(result.denominator)}` : `${formatScaleNumber(result.value)} ${mode === 'toReality' ? realityUnit : drawingUnit}` : '–';

  return <section className="scale-calculator" aria-label="Maßstabsrechner">
    <div className="scale-head"><div><span>1 : n</span><h2>Maßstab berechnen</h2></div><strong>Einheiten werden automatisch umgerechnet</strong></div>
    <div className="scale-body">
      <div className="scale-modes" role="tablist" aria-label="Rechenweg auswählen">{modes.map((item) => <button key={item.value} type="button" role="tab" aria-selected={mode === item.value} className={mode === item.value ? 'active' : ''} onClick={() => selectMode(item.value)}>{item.label}</button>)}</div>
      <div className="scale-equation" aria-hidden="true"><span>Plan</span><b>:</b><span>Wirklichkeit</span><b>=</b><strong>1 : n</strong></div>
      <div className="scale-fields">
        {mode !== 'toDrawing' && <label>Planlänge<span className="scale-input"><input value={drawing} onChange={(e) => { setDrawing(e.target.value); resetResult(); }} onKeyDown={onEnter} inputMode="decimal" placeholder="z. B. 4" aria-label="Planlänge" /><select value={drawingUnit} onChange={(e) => { setDrawingUnit(e.target.value as LengthUnit); resetResult(); }} aria-label="Einheit der Planlänge">{units.map((unit) => <option key={unit}>{unit}</option>)}</select></span></label>}
        {mode !== 'toReality' && <label>Reale Länge<span className="scale-input"><input value={reality} onChange={(e) => { setReality(e.target.value); resetResult(); }} onKeyDown={onEnter} inputMode="decimal" placeholder="z. B. 50" aria-label="Reale Länge" /><select value={realityUnit} onChange={(e) => { setRealityUnit(e.target.value as LengthUnit); resetResult(); }} aria-label="Einheit der realen Länge">{units.map((unit) => <option key={unit}>{unit}</option>)}</select></span></label>}
        {mode !== 'findScale' && <label>Maßstab<span className="scale-input scale-ratio"><b>1 :</b><input value={denominator} onChange={(e) => { setDenominator(e.target.value); resetResult(); }} onKeyDown={onEnter} inputMode="decimal" placeholder="1000" aria-label="Maßstabszahl" /></span></label>}
        {mode === 'toReality' && <label>Ausgabeeinheit<span className="scale-input"><select value={realityUnit} onChange={(e) => { setRealityUnit(e.target.value as LengthUnit); resetResult(); }} aria-label="Ausgabeeinheit">{units.map((unit) => <option key={unit}>{unit}</option>)}</select></span></label>}
        {mode === 'toDrawing' && <label>Ausgabeeinheit<span className="scale-input"><select value={drawingUnit} onChange={(e) => { setDrawingUnit(e.target.value as LengthUnit); resetResult(); }} aria-label="Ausgabeeinheit">{units.map((unit) => <option key={unit}>{unit}</option>)}</select></span></label>}
      </div>
      <div className="scale-actions"><button type="button" className="scale-primary" onClick={calculate}>{modes.find((item) => item.value === mode)?.short} berechnen</button><button type="button" className="scale-secondary" onClick={reset}>Zurücksetzen</button></div>
      {error && <p className="scale-error" role="alert">{error}</p>}
    </div>
    <div className={`scale-result${result ? ' has-result' : ''}`} aria-live="polite"><span>Ergebnis</span><strong>{resultText}</strong>{result && <small>{mode === 'toReality' ? `${drawing} ${drawingUnit} × ${formatScaleNumber(result.denominator)}` : mode === 'toDrawing' ? `${reality} ${realityUnit} ÷ ${formatScaleNumber(result.denominator)}` : 'Reale Länge ÷ Planlänge'}</small>}</div>
  </section>;
}
