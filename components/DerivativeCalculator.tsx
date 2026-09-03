'use client';

import { useMemo, useRef, useState } from 'react';
import { calculateLatex } from '@/lib/calculator-engine';
import { StructuredMathField, type StructuredMathFieldHandle } from '@/components/StructuredMathField';

const buttons = [
  { label: 'x', latex: 'x', aria: 'Variable x' },
  { label: 'x²', latex: 'x^{#?}', aria: 'Potenz einfügen' },
  { label: 'sin', latex: '\\sin\\left(#?\\right)', aria: 'Sinus einfügen' },
  { label: 'cos', latex: '\\cos\\left(#?\\right)', aria: 'Kosinus einfügen' },
  { label: 'tan', latex: '\\tan\\left(#?\\right)', aria: 'Tangens einfügen' },
  { label: 'eˣ', latex: 'e^{#?}', aria: 'Exponentialfunktion einfügen' },
  { label: 'ln', latex: '\\ln\\left(#?\\right)', aria: 'Natürlichen Logarithmus einfügen' },
  { label: '√', latex: '\\sqrt{#?}', aria: 'Wurzel einfügen' },
  { label: 'a/b', latex: '\\frac{#?}{#?}', aria: 'Bruch einfügen' },
  { label: '( )', latex: '\\left(#?\\right)', aria: 'Klammern einfügen' },
] as const;

const examples = [
  { label: 'Potenzregel', latex: '3x^4-2x^2+5' },
  { label: 'Produktregel', latex: 'x\\sin(x)' },
  { label: 'Kettenregel', latex: '(2x+1)^3' },
] as const;

function detectedRules(latex: string) {
  const rules: string[] = [];
  if (/[+-]/.test(latex.replace(/^-/g, ''))) rules.push('Summenregel: Die einzelnen Summanden werden getrennt abgeleitet.');
  if (/\\frac/.test(latex)) rules.push('Quotientenregel: Zähler und Nenner werden als eigene Funktionen behandelt.');
  if (/\\(?:sin|cos|tan|ln|sqrt)|\([^)]*[a-z][^)]*\)\^/i.test(latex)) rules.push('Kettenregel: Äußere und innere Funktion werden nacheinander abgeleitet.');
  if (/[a-z](?:\\cdot|\\times)?\\?(?:sin|cos|tan|ln)|\\(?:sin|cos|tan|ln)[^(]*\([^)]*\)[a-z]/i.test(latex)) rules.push('Produktregel: Beide Faktoren werden abwechselnd abgeleitet.');
  if (/\^/.test(latex)) rules.push('Potenzregel: Der Exponent wird zum Faktor und anschließend um 1 verringert.');
  if (!rules.length) rules.push('Grundregel: Konstanten und elementare Funktionen werden direkt abgeleitet.');
  return Array.from(new Set(rules));
}

export default function DerivativeCalculator() {
  const fieldRef = useRef<StructuredMathFieldHandle>(null);
  const [expression, setExpression] = useState('x^2');
  const [variable, setVariable] = useState<'x' | 'y'>('x');
  const [order, setOrder] = useState(1);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [calculatedExpression, setCalculatedExpression] = useState('');

  const rules = useMemo(() => detectedRules(calculatedExpression), [calculatedExpression]);

  const calculate = () => {
    if (!expression.trim()) { setError('Bitte eine Funktion eingeben.'); setResult(''); return; }
    try {
      let current = expression;
      for (let currentOrder = 0; currentOrder < order; currentOrder += 1) {
        current = calculateLatex(`\\frac{d}{d${variable}}\\left(${current}\\right)`, 'rad').exactLatex;
      }
      setResult(current);
      setCalculatedExpression(expression);
      setError('');
    } catch (reason) {
      setResult('');
      setCalculatedExpression('');
      setError(reason instanceof Error ? reason.message : 'Ungültiger mathematischer Ausdruck');
    }
  };

  const clear = () => { setExpression(''); setResult(''); setCalculatedExpression(''); setError(''); fieldRef.current?.clear(); fieldRef.current?.focus(); };
  const useExample = (latex: string) => { setExpression(latex); setResult(''); setCalculatedExpression(''); setError(''); fieldRef.current?.setValue(latex); fieldRef.current?.focus(); };

  return (
    <section className="derivative-calculator" aria-label="Ableitungsrechner mit Rechenweg">
      <div className="derivative-head"><div><span>f(x)</span><h2>Funktion ableiten</h2></div><strong>Symbolisch &amp; exakt</strong></div>
      <div className="derivative-input-wrap">
        <label>Funktion eingeben</label>
        <div className="derivative-math-input"><StructuredMathField ref={fieldRef} value={expression} onInput={setExpression} onEnter={calculate} onEscape={clear} ariaLabel="Funktion zur Ableitung" /></div>
        <div className="derivative-toolbar">
          {buttons.map((button) => <button key={button.label} type="button" aria-label={button.aria} onClick={() => fieldRef.current?.insert(button.latex)}>{button.label}</button>)}
          <button type="button" aria-label="Letztes mathematisches Element löschen" onClick={() => fieldRef.current?.backspace()}>⌫</button>
          <button type="button" aria-label="Eingabe leeren" onClick={clear}>AC</button>
        </div>
        <div className="derivative-options">
          <label>Variable<select value={variable} onChange={(event) => setVariable(event.target.value as 'x' | 'y')}><option value="x">x</option><option value="y">y</option></select></label>
          <label>Ableitung<select value={order} onChange={(event) => setOrder(Number(event.target.value))}><option value={1}>1. Ableitung</option><option value={2}>2. Ableitung</option><option value={3}>3. Ableitung</option></select></label>
        </div>
        <button className="derivative-submit" type="button" onClick={calculate}>Ableitung berechnen</button>
        {error && <p className="derivative-error" role="alert">{error}</p>}
      </div>

      {result && <div className="derivative-output" aria-live="polite">
        <h3>Ergebnis</h3>
        <div className="derivative-result-line"><span>{order === 1 ? `f'(${variable})` : order === 2 ? `f''(${variable})` : `f'''(${variable})`}</span><StructuredMathField value={result} readOnly ariaLabel="Ergebnis der Ableitung" /></div>
        <div className="derivative-steps"><h3>Rechenweg</h3><ol><li>Die Funktion wird nach <strong>{variable}</strong> untersucht.</li>{rules.map((rule) => <li key={rule}>{rule}</li>)}{order > 1 && <li>Das Ergebnis wird insgesamt {order}-mal nacheinander abgeleitet.</li>}<li>Gleichartige Terme werden zum exakten Ergebnis zusammengefasst.</li></ol></div>
      </div>}

      <div className="derivative-examples"><span>Beispiele:</span>{examples.map((example) => <button key={example.label} type="button" onClick={() => useExample(example.latex)}><small>{example.label}</small><StructuredMathField value={example.latex} readOnly ariaLabel={`Beispiel ${example.label}`} /></button>)}</div>
    </section>
  );
}
