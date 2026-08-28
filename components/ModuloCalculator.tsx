'use client';

import { useState } from 'react';

function parseNumber(value: string) {
  const normalized = value.trim().replace(',', '.');
  if (!normalized) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 12 }).format(value);
}

export default function ModuloCalculator() {
  const [dividend, setDividend] = useState('');
  const [divisor, setDivisor] = useState('');
  const [remainder, setRemainder] = useState<number | null>(null);
  const [quotient, setQuotient] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const x = parseNumber(dividend);
    const y = parseNumber(divisor);
    if (x === null || y === null) {
      setError('Bitte gültige Zahlen eingeben.');
      setRemainder(null);
      setQuotient(null);
      return;
    }
    if (y === 0) {
      setError('Der Divisor darf nicht null sein.');
      setRemainder(null);
      setQuotient(null);
      return;
    }

    const base = Math.abs(y);
    const rawRemainder = ((x % base) + base) % base;
    const cleanRemainder = Math.abs(rawRemainder) < 1e-12 ? 0 : rawRemainder;
    setRemainder(cleanRemainder);
    setQuotient((x - cleanRemainder) / y);
    setError('');
  };

  const reset = () => {
    setDividend('');
    setDivisor('');
    setRemainder(null);
    setQuotient(null);
    setError('');
  };

  return (
    <section className="modulo-calculator" aria-label="Modulo-Rechner">
      <div className="modulo-card modulo-input-card">
        <h2>x mod y = r</h2>
        <label htmlFor="modulo-dividend">x <span>(Dividend)</span></label>
        <input id="modulo-dividend" value={dividend} onChange={(event) => setDividend(event.target.value)} inputMode="decimal" placeholder="z. B. 17" />
        <label htmlFor="modulo-divisor">y <span>(Divisor)</span></label>
        <input id="modulo-divisor" value={divisor} onChange={(event) => setDivisor(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') calculate(); }} inputMode="decimal" placeholder="z. B. 5" />
        <div className="modulo-actions">
          <button type="button" className="modulo-primary" onClick={calculate}>Berechnen</button>
          <button type="button" className="modulo-secondary" onClick={reset}>Zurücksetzen</button>
        </div>
        {error && <p className="modulo-error" role="alert">{error}</p>}
      </div>

      <div className="modulo-card modulo-result-card" aria-live="polite">
        <h2>Ergebnis</h2>
        <span className="modulo-result-label">r (Rest)</span>
        <output>{remainder === null ? '—' : formatNumber(remainder)}</output>
        {remainder !== null && quotient !== null && (
          <p>{formatNumber(dividend ? Number(dividend.replace(',', '.')) : 0)} = {formatNumber(quotient)} × {formatNumber(Number(divisor.replace(',', '.')))} + {formatNumber(remainder)}</p>
        )}
      </div>
    </section>
  );
}
