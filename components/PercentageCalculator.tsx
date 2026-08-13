'use client';

import { FormEvent, useState } from 'react';

type Mode = 'value' | 'change' | 'discount' | 'rate';
type Answer = { value: string; detail: string } | null;

const modes = {
  value: { icon: '%', short: 'Anteil', title: 'Prozentwert berechnen', formula: 'G × P ÷ 100', labels: ['Grundwert', 'Prozentsatz'], units: ['', '%'], placeholders: ['200', '15'] },
  change: { icon: '↗', short: 'Änderung', title: 'Prozentuale Änderung', formula: '(Neu − Alt) ÷ Alt × 100', labels: ['Alter Wert', 'Neuer Wert'], units: ['', ''], placeholders: ['50', '75'] },
  discount: { icon: '−', short: 'Rabatt', title: 'Preis nach Rabatt', formula: 'Preis × (1 − Rabatt ÷ 100)', labels: ['Originalpreis', 'Rabatt'], units: ['€', '%'], placeholders: ['100', '20'] },
  rate: { icon: '÷', short: 'Verhältnis', title: 'Prozentsatz ermitteln', formula: 'Teil ÷ Gesamt × 100', labels: ['Teilwert', 'Grundwert'], units: ['', ''], placeholders: ['25', '100'] },
} as const;

const parse = (value: string) => Number(value.replace(',', '.'));
const format = (value: number) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: 6 }).format(value);

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('value');
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [answer, setAnswer] = useState<Answer>(null);
  const [error, setError] = useState('');
  const current = modes[mode];

  function choose(next: Mode) { setMode(next); setFirst(''); setSecond(''); setAnswer(null); setError(''); }
  function reset() { setFirst(''); setSecond(''); setAnswer(null); setError(''); }
  function calculate(event: FormEvent) {
    event.preventDefault(); setError(''); setAnswer(null);
    const a = parse(first), b = parse(second);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return setError('Bitte füllen Sie beide Felder mit gültigen Zahlen aus.');
    if (mode === 'change' && a === 0) return setError('Der alte Wert darf nicht 0 sein.');
    if (mode === 'rate' && b === 0) return setError('Der Grundwert darf nicht 0 sein.');
    if (mode === 'value') setAnswer({ value: format(a * b / 100), detail: `${format(b)} % von ${format(a)}` });
    if (mode === 'change') { const value = (b - a) / a * 100; setAnswer({ value: `${value > 0 ? '+' : ''}${format(value)} %`, detail: `Veränderung von ${format(a)} auf ${format(b)}` }); }
    if (mode === 'discount') setAnswer({ value: `${format(a * (1 - b / 100))} €`, detail: `Endpreis nach ${format(b)} % Rabatt` });
    if (mode === 'rate') setAnswer({ value: `${format(a / b * 100)} %`, detail: `${format(a)} von ${format(b)}` });
  }

  return <section className="percentage-calculator" id="prozentrechner-tool" aria-label="Prozentrechner">
    <div className="pc-mode-rail" aria-label="Berechnungsart">
      {(Object.keys(modes) as Mode[]).map(key => <button key={key} type="button" className={mode === key ? 'active' : ''} onClick={() => choose(key)} aria-pressed={mode === key}><span className="pc-mode-icon">{modes[key].icon}</span><span>{modes[key].short}</span></button>)}
    </div>

    <div className="pc-workspace">
      <div className="pc-workspace-head"><div><span className="pc-kicker">Ausgewählte Berechnung</span><h2>{current.title}</h2></div><span className="pc-formula">{current.formula}</span></div>
      <form onSubmit={calculate}>
        <div className="pc-expression">
          <label><span>{current.labels[0]}</span><div className="pc-input-shell"><input inputMode="decimal" value={first} onChange={e => setFirst(e.target.value)} placeholder={current.placeholders[0]} aria-label={current.labels[0]} />{current.units[0] && <b>{current.units[0]}</b>}</div></label>
          <span className="pc-operator" aria-hidden="true">{mode === 'change' ? '→' : mode === 'rate' ? '÷' : '×'}</span>
          <label><span>{current.labels[1]}</span><div className="pc-input-shell"><input inputMode="decimal" value={second} onChange={e => setSecond(e.target.value)} placeholder={current.placeholders[1]} aria-label={current.labels[1]} />{current.units[1] && <b>{current.units[1]}</b>}</div></label>
        </div>
        {error && <p className="pc-error" role="alert">{error}</p>}
        <div className="pc-actions"><button className="pc-calculate" type="submit">Ergebnis berechnen <span aria-hidden="true">→</span></button><button className="pc-reset" type="button" onClick={reset}>Leeren</button></div>
      </form>
    </div>

    <div className={`pc-answer${answer ? ' has-answer' : ''}`} aria-live="polite">
      <span className="pc-answer-label">Ergebnis</span>
      {answer ? <><strong>{answer.value}</strong><span>{answer.detail}</span></> : <><strong>–</strong><span>Geben Sie zwei Werte ein und starten Sie die Berechnung.</span></>}
    </div>
  </section>;
}
