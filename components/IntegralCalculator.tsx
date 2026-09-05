'use client';

import { useMemo, useRef, useState } from 'react';
import { calculateLatex } from '@/lib/calculator-engine';
import { StructuredMathField, type StructuredMathFieldHandle } from '@/components/StructuredMathField';

const buttons = [
  { label: 'x', latex: 'x', aria: 'Variable x' },
  { label: 'xⁿ', latex: 'x^{#?}', aria: 'Potenz einfügen' },
  { label: 'sin', latex: '\\sin\\left(#?\\right)', aria: 'Sinus einfügen' },
  { label: 'cos', latex: '\\cos\\left(#?\\right)', aria: 'Kosinus einfügen' },
  { label: 'eˣ', latex: 'e^{#?}', aria: 'Exponentialfunktion einfügen' },
  { label: 'ln', latex: '\\ln\\left(#?\\right)', aria: 'Natürlichen Logarithmus einfügen' },
  { label: '√', latex: '\\sqrt{#?}', aria: 'Wurzel einfügen' },
  { label: 'a/b', latex: '\\frac{#?}{#?}', aria: 'Bruch einfügen' },
  { label: '|x|', latex: '\\left|#?\\right|', aria: 'Betrag einfügen' },
  { label: '( )', latex: '\\left(#?\\right)', aria: 'Klammern einfügen' },
] as const;

const examples = [
  { label: 'Potenzregel', latex: 'x^2' },
  { label: 'Summenregel', latex: 'x+1' },
  { label: 'Trigonometrie', latex: '\\cos(x)' },
] as const;

function detectedRules(latex: string) {
  const rules: string[] = [];
  if (/[+-]/.test(latex.replace(/^-/g, ''))) rules.push('Summenregel: Die Summanden werden einzeln integriert.');
  if (/\^/.test(latex)) rules.push('Potenzregel: Der Exponent wird um 1 erhöht und durch den neuen Exponenten geteilt.');
  if (/\\(?:sin|cos|tan)/.test(latex)) rules.push('Trigonometrische Grundregel: Die passende Stammfunktion der Winkelfunktion wird verwendet.');
  if (/e\^|\\exp/.test(latex)) rules.push('Exponentialregel: eˣ bleibt beim Integrieren in seiner Grundform erhalten.');
  if (/\\frac\{?1\}?\{?[a-z]\}?/.test(latex)) rules.push('Logarithmusregel: Das Integral von 1/x wird zu ln|x|.');
  if (!rules.length) rules.push('Grundregel: Eine passende elementare Stammfunktion wird bestimmt.');
  return Array.from(new Set(rules));
}

export default function IntegralCalculator() {
  const expressionRef = useRef<StructuredMathFieldHandle>(null);
  const lowerRef = useRef<StructuredMathFieldHandle>(null);
  const upperRef = useRef<StructuredMathFieldHandle>(null);
  const [expression, setExpression] = useState('x^2');
  const [kind, setKind] = useState<'indefinite' | 'definite'>('indefinite');
  const [variable, setVariable] = useState<'x' | 'y'>('x');
  const [lower, setLower] = useState('0');
  const [upper, setUpper] = useState('1');
  const [result, setResult] = useState('');
  const [primitive, setPrimitive] = useState('');
  const [calculatedExpression, setCalculatedExpression] = useState('');
  const [error, setError] = useState('');
  const rules = useMemo(() => detectedRules(calculatedExpression), [calculatedExpression]);

  const calculate = () => {
    if (!expression.trim()) { setError('Bitte eine Funktion eingeben.'); setResult(''); return; }
    if (kind === 'definite' && (!lower.trim() || !upper.trim())) { setError('Bitte beide Integrationsgrenzen eingeben.'); setResult(''); return; }
    try {
      const indefinite = calculateLatex(`\\int ${expression}\\,d${variable}`, 'rad').exactLatex;
      const input = kind === 'definite' ? `\\int_{${lower}}^{${upper}}${expression}\\,d${variable}` : `\\int ${expression}\\,d${variable}`;
      const calculated = calculateLatex(input, 'rad');
      setPrimitive(indefinite);
      setResult(calculated.exactLatex);
      setCalculatedExpression(expression);
      setError('');
    } catch (reason) {
      setResult(''); setPrimitive(''); setCalculatedExpression('');
      setError(reason instanceof Error ? reason.message : 'Ungültiger mathematischer Ausdruck');
    }
  };

  const clear = () => { setExpression(''); setResult(''); setPrimitive(''); setCalculatedExpression(''); setError(''); expressionRef.current?.clear(); expressionRef.current?.focus(); };
  const useExample = (latex: string) => { setExpression(latex); setResult(''); setPrimitive(''); setCalculatedExpression(''); setError(''); expressionRef.current?.setValue(latex); expressionRef.current?.focus(); };

  return (
    <section className="integral-calculator" aria-label="Integralrechner mit Rechenweg">
      <div className="integral-head"><div><span>∫ f(x) dx</span><h2>Integral berechnen</h2></div><strong>Symbolisch &amp; exakt</strong></div>
      <div className="integral-input-wrap">
        <div className="integral-kind" role="group" aria-label="Art des Integrals"><button type="button" className={kind === 'indefinite' ? 'active' : ''} onClick={() => { setKind('indefinite'); setResult(''); }}>Unbestimmt</button><button type="button" className={kind === 'definite' ? 'active' : ''} onClick={() => { setKind('definite'); setResult(''); }}>Bestimmt</button></div>
        <label>Zu integrierende Funktion</label>
        <div className="integral-expression-row"><span aria-hidden="true">∫</span><div className="integral-math-input"><StructuredMathField ref={expressionRef} value={expression} onInput={setExpression} onEnter={calculate} onEscape={clear} ariaLabel="Zu integrierende Funktion" /></div><span aria-hidden="true">d{variable}</span></div>
        <div className="integral-toolbar">{buttons.map((button) => <button key={button.label} type="button" aria-label={button.aria} onClick={() => expressionRef.current?.insert(button.latex)}>{button.label}</button>)}<button type="button" aria-label="Letztes mathematisches Element löschen" onClick={() => expressionRef.current?.backspace()}>⌫</button><button type="button" aria-label="Eingabe leeren" onClick={clear}>AC</button></div>
        <div className={`integral-options ${kind === 'definite' ? 'with-bounds' : ''}`}>
          <label>Variable<select value={variable} onChange={(event) => setVariable(event.target.value as 'x' | 'y')}><option value="x">x</option><option value="y">y</option></select></label>
          {kind === 'definite' && <><label>Untere Grenze<div className="integral-bound"><StructuredMathField ref={lowerRef} value={lower} onInput={setLower} onEnter={calculate} ariaLabel="Untere Integrationsgrenze" /></div></label><label>Obere Grenze<div className="integral-bound"><StructuredMathField ref={upperRef} value={upper} onInput={setUpper} onEnter={calculate} ariaLabel="Obere Integrationsgrenze" /></div></label></>}
        </div>
        <button className="integral-submit" type="button" onClick={calculate}>Integral berechnen</button>
        {error && <p className="integral-error" role="alert">{error}</p>}
      </div>

      {result && <div className="integral-output" aria-live="polite"><h3>Ergebnis</h3><div className="integral-result-line"><span>{kind === 'definite' ? '=' : 'F(' + variable + ') ='}</span><StructuredMathField value={result} readOnly ariaLabel="Ergebnis des Integrals" /></div><div className="integral-steps"><h3>Rechenweg</h3><ol><li>Der Integrand wird nach <strong>{variable}</strong> untersucht.</li>{rules.map((rule) => <li key={rule}>{rule}</li>)}<li>Eine Stammfunktion ist: <span className="integral-inline-math"><StructuredMathField value={primitive} readOnly ariaLabel="Ermittelte Stammfunktion" /></span></li>{kind === 'definite' ? <li>Nach dem Hauptsatz werden obere und untere Grenze eingesetzt: F(obere Grenze) − F(untere Grenze).</li> : <li>Die Integrationskonstante C wird ergänzt, weil ihre Ableitung null ist.</li>}<li>Das exakte Ergebnis wird algebraisch vereinfacht.</li></ol></div></div>}

      <div className="integral-examples"><span>Beispiele:</span>{examples.map((example) => <button key={example.label} type="button" onClick={() => useExample(example.latex)}><small>{example.label}</small><StructuredMathField value={example.latex} readOnly ariaLabel={`Beispiel ${example.label}`} /></button>)}</div>
    </section>
  );
}
