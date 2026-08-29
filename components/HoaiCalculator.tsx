'use client';

import { useMemo, useState } from 'react';
import { calculateHoaiTableFee } from '@/lib/hoai-engine';

const PHASES = [
  ['Grundlagenermittlung', 2], ['Vorplanung', 7], ['Entwurfsplanung', 15],
  ['Genehmigungsplanung', 3], ['Ausführungsplanung', 25],
  ['Vorbereitung der Vergabe', 10], ['Mitwirkung bei der Vergabe', 4],
  ['Objektüberwachung', 32], ['Objektbetreuung', 2],
] as const;

const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const number = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 });

function parse(value: string) {
  const normalized = value.replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  return normalized ? Number(normalized) : Number.NaN;
}

export default function HoaiCalculator() {
  const [costs, setCosts] = useState('600.000');
  const [zone, setZone] = useState(2);
  const [rate, setRate] = useState(0);
  const [phases, setPhases] = useState(PHASES.map(() => true));
  const [surcharge, setSurcharge] = useState('0');
  const [expenses, setExpenses] = useState('0');
  const [vat, setVat] = useState('19');
  const [submitted, setSubmitted] = useState(true);
  const [error, setError] = useState('');

  const result = useMemo(() => {
    const costValue = parse(costs);
    const surchargeValue = parse(surcharge);
    const expenseValue = parse(expenses);
    const vatValue = parse(vat);
    if (![costValue, surchargeValue, expenseValue, vatValue].every(Number.isFinite)) return null;
    if (costValue < 25000 || costValue > 25000000) return null;
    const phasePercent = PHASES.reduce((sum, phase, index) => sum + (phases[index] ? phase[1] : 0), 0);
    const fullFee = calculateHoaiTableFee(costValue, zone, rate);
    const phaseFee = fullFee * phasePercent / 100;
    const surchargeAmount = phaseFee * surchargeValue / 100;
    const expenseAmount = (phaseFee + surchargeAmount) * expenseValue / 100;
    const net = phaseFee + surchargeAmount + expenseAmount;
    const vatAmount = net * vatValue / 100;
    return { costValue, phasePercent, fullFee, phaseFee, surchargeAmount, expenseAmount, net, vatAmount, gross: net + vatAmount };
  }, [costs, zone, rate, phases, surcharge, expenses, vat]);

  const calculate = () => {
    const costValue = parse(costs);
    if (!Number.isFinite(costValue)) setError('Bitte anrechenbare Kosten eingeben.');
    else if (costValue < 25000 || costValue > 25000000) setError('Der Tafelbereich liegt zwischen 25.000 € und 25.000.000 €.');
    else if (!phases.some(Boolean)) setError('Bitte mindestens eine Leistungsphase auswählen.');
    else if (!result) setError('Bitte gültige Prozentwerte eingeben.');
    else { setError(''); setSubmitted(true); }
  };

  return (
    <section className="hoai-calculator" aria-label="HOAI Rechner für Gebäude und Innenräume">
      <div className="hoai-calculator-head">
        <div><span>HOAI 2021</span><h2>Honorar berechnen</h2><p>Gebäude und Innenräume nach § 35 HOAI</p></div>
        <strong>Orientierungswert</strong>
      </div>

      <div className="hoai-form-grid">
        <label>Leistungsbild<select disabled value="gebaeude" aria-label="Leistungsbild"><option value="gebaeude">Gebäude und Innenräume</option></select></label>
        <label>Anrechenbare Kosten (€)<input value={costs} onChange={(event) => { setCosts(event.target.value); setSubmitted(false); }} inputMode="decimal" /></label>
        <label>Honorarzone<select value={zone} onChange={(event) => { setZone(Number(event.target.value)); setSubmitted(false); }}><option value={0}>Zone I – sehr gering</option><option value={1}>Zone II – gering</option><option value={2}>Zone III – durchschnittlich</option><option value={3}>Zone IV – hoch</option><option value={4}>Zone V – sehr hoch</option></select></label>
        <label>Honorarsatz<select value={rate} onChange={(event) => { setRate(Number(event.target.value)); setSubmitted(false); }}><option value={0}>Basishonorarsatz (von)</option><option value={0.25}>Viertelsatz</option><option value={0.5}>Mittelsatz</option><option value={0.75}>Dreiviertelsatz</option><option value={1}>Oberer Satz (bis)</option></select></label>
      </div>

      <fieldset className="hoai-phases"><legend>Beauftragte Leistungsphasen</legend><div>
        {PHASES.map(([name, percent], index) => <label key={name}><input type="checkbox" checked={phases[index]} onChange={() => { setPhases((current) => current.map((checked, currentIndex) => currentIndex === index ? !checked : checked)); setSubmitted(false); }} /><span><b>LPH {index + 1}</b>{name}<em>{percent} %</em></span></label>)}
      </div></fieldset>

      <div className="hoai-form-grid hoai-extras">
        <label>Zuschlag (%)<input value={surcharge} onChange={(event) => { setSurcharge(event.target.value); setSubmitted(false); }} inputMode="decimal" /></label>
        <label>Nebenkosten (%)<input value={expenses} onChange={(event) => { setExpenses(event.target.value); setSubmitted(false); }} inputMode="decimal" /></label>
        <label>Umsatzsteuer (%)<input value={vat} onChange={(event) => { setVat(event.target.value); setSubmitted(false); }} inputMode="decimal" /></label>
      </div>

      <button className="hoai-calculate" type="button" onClick={calculate}>Honorar berechnen</button>
      {error && <p className="hoai-error" role="alert">{error}</p>}

      {submitted && result && <div className="hoai-results" aria-live="polite">
        <h3>Ergebnis</h3>
        <dl><div><dt>Volles Tabellenhonorar</dt><dd>{euro.format(result.fullFee)}</dd></div><div><dt>Leistungsphasen ({number.format(result.phasePercent)} %)</dt><dd>{euro.format(result.phaseFee)}</dd></div>{result.surchargeAmount !== 0 && <div><dt>Zuschlag</dt><dd>{euro.format(result.surchargeAmount)}</dd></div>}{result.expenseAmount !== 0 && <div><dt>Nebenkosten</dt><dd>{euro.format(result.expenseAmount)}</dd></div>}<div className="hoai-total"><dt>Nettohonorar</dt><dd>{euro.format(result.net)}</dd></div><div><dt>Umsatzsteuer</dt><dd>{euro.format(result.vatAmount)}</dd></div><div className="hoai-grand-total"><dt>Bruttohonorar</dt><dd>{euro.format(result.gross)}</dd></div></dl>
        <p>Lineare Interpolation der Orientierungswerte nach § 35 HOAI 2021. Das Ergebnis ist keine verbindliche Honorar- oder Rechtsberatung.</p>
      </div>}
    </section>
  );
}
