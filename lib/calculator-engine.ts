import { ComputeEngine } from '@cortex-js/compute-engine';
import nerdamerModule from 'nerdamer/all.min';

// Normalize Nerdamer's CommonJS export for both Next.js and Vitest.
const nerdamer: any = (nerdamerModule as any)?.default ?? nerdamerModule;

export type AngleMode = 'deg' | 'rad';
export type ResultAction = 'auto' | 'simplify' | 'expand' | 'factor' | 'solve';
export interface MathResult {
  exactLatex: string;
  decimalLatex?: string;
  operation: string;
}

const ce = new ComputeEngine();

function germanError(error: unknown): Error {
  const message = error instanceof Error ? error.message : String(error);
  if (/Unvollständiger Ausdruck|Bitte Nenner eingeben|Keine (?:reelle )?Lösung|Variable für die Ableitung auswählen|Fakultät ist nur|Ungleichung wird nicht unterstützt|Keine Variable zum Lösen|n und k müssen/.test(message)) return new Error(message);
  if (/divide|division|zero/i.test(message)) return new Error('Division durch null ist nicht definiert');
  if (/limit/i.test(message)) return new Error('Ungültige Grenze');
  if (/undefined|not defined|domain/i.test(message)) return new Error('Funktion an dieser Stelle nicht definiert');
  return new Error('Ungültiger mathematischer Ausdruck');
}

function decimalLatex(expr: any): string | undefined {
  try {
    const value = expr.evaluate().N();
    const n = Number(value.valueOf());
    if (!Number.isFinite(n)) return undefined;
    const rounded = Number(n.toPrecision(12));
    return Number.isInteger(rounded) ? String(rounded) : String(rounded);
  } catch { return undefined; }
}

function decimalFromCas(expr: any): string | undefined {
  try {
    const raw = expr.evaluate().text('decimals');
    const value = Number(raw);
    if (!Number.isFinite(value)) return undefined;
    return String(Number(value.toPrecision(12)));
  } catch { return undefined; }
}

function terminatingDecimal(expr: any): string | undefined {
  try {
    const text = expr.toString();
    const match = text.match(/^(-?\d+)\/(\d+)$/);
    if (!match) return /^-?\d+(?:\.\d+)?$/.test(text) ? text : undefined;
    let denominator = Number(match[2]);
    while (denominator % 2 === 0) denominator /= 2;
    while (denominator % 5 === 0) denominator /= 5;
    return denominator === 1 ? decimalFromCas(expr) : undefined;
  } catch { return undefined; }
}

function formatLatex(latex: string): string {
  return latex
    .replace(/(\d)\s*\\cdot\s*(\\pi|[a-z])/gi, '$1$2')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
function casToLatex(value: string): string {
  try { return nerdamer(value).toTeX(); } catch { return value; }
}

function mathJsonToCas(node: any): string {
  if (typeof node === 'number') return String(node);
  if (typeof node === 'string') {
    return ({ Pi: 'pi', ExponentialE: 'e', ImaginaryUnit: 'i', PositiveInfinity: 'Infinity', NegativeInfinity: '-Infinity', Nothing: '' } as Record<string,string>)[node] ?? node;
  }
  if (!Array.isArray(node) || !node.length) throw new Error('Ungültiger mathematischer Ausdruck');
  const [head, ...args] = node;
  const c = args.map(mathJsonToCas);
  switch (head) {
    case 'Add': return `(${c.join('+')})`;
    case 'Multiply': return `(${c.join('*')})`;
    case 'Divide': return `((${c[0]})/(${c[1]}))`;
    case 'Rational': return `((${c[0]})/(${c[1]}))`;
    case 'Power': return `((${c[0]})^(${c[1]}))`;
    case 'Root': return c.length > 1 ? `((${c[0]})^(1/(${c[1]})))` : `sqrt(${c[0]})`;
    case 'Negate': return `(-(${c[0]}))`;
    case 'Abs': return `abs(${c[0]})`;
    case 'Factorial': return `factorial(${c[0]})`;
    case 'Complex': return `(${c[0]}+(${c[1]})*i)`;
    case 'Equal': return `${c[0]}=${c[1]}`;
    case 'Less': return `${c[0]}<${c[1]}`;
    case 'LessEqual': return `${c[0]}<=${c[1]}`;
    case 'Greater': return `${c[0]}>${c[1]}`;
    case 'GreaterEqual': return `${c[0]}>=${c[1]}`;
    case 'Sin': case 'Cos': case 'Tan': case 'Arcsin': case 'Arccos': case 'Arctan':
    case 'Ln': case 'Log': case 'Exp': case 'Sqrt':
      return `${String(head).toLowerCase()}(${c[0]})`;
    case 'Block': return c[0];
    case 'Function': return c[0];
    default: return `${String(head).toLowerCase()}(${c.join(',')})`;
  }
}

function parse(latex: string) {
  if (!latex.trim()) throw new Error('Unvollständiger Ausdruck');
  if (/\\placeholder|\\error|\?\?/.test(latex)) throw new Error('Unvollständiger Ausdruck');
  const numericFactorial = latex.match(/(?:\\left)?\(?\s*(-?\d+(?:\.\d+)?)\s*\)?(?:\\right)?!/);
  if (numericFactorial) {
    const value = Number(numericFactorial[1]);
    if (!Number.isInteger(value) || value < 0) throw new Error('Fakultät ist nur für nichtnegative ganze Zahlen definiert');
  }
  const normalized = latex.replace(/\\frac(\{[^{}]*\}|[A-Za-z0-9])([A-Za-z0-9])/g, (_match, numerator, denominator) => '\\frac{' + numerator.replace(/[{}]/g, '') + '}{' + denominator + '}');
  const expression = ce.parse(normalized);
  assertValidDomain(expression.json);
  return expression;
}


function isZero(node: any): boolean {
  try {
    const value = Number(nerdamer(mathJsonToCas(node)).evaluate().text('decimals'));
    return Number.isFinite(value) && value === 0;
  } catch { return false; }
}

function numericNode(node: any): number | undefined {
  try {
    const value = Number(nerdamer(mathJsonToCas(node)).evaluate().text('decimals'));
    return Number.isFinite(value) ? value : undefined;
  } catch { return undefined; }
}

function assertValidDomain(node: any): void {
  if (node === 'ComplexInfinity') throw new Error('Division durch null ist nicht definiert');
  if (!Array.isArray(node)) return;
  const [head, ...args] = node;
  if ((head === 'Divide' || head === 'Rational') && isZero(args[1])) {
    throw new Error('Division durch null ist nicht definiert');
  }
  if (head === 'Power' && isZero(args[0])) {
    const exponent = numericNode(args[1]);
    if (exponent !== undefined && exponent < 0) throw new Error('Division durch null ist nicht definiert');
  }
  for (const arg of args) assertValidDomain(arg);
}

function latexToCas(latex: string): string {
  const bracedFraction = latex.match(/^\\frac\{(.+)\}([a-z0-9])$/i);
  if (bracedFraction) return `((${mathJsonToCas(parse(bracedFraction[1]).json)})/(${mathJsonToCas(parse(bracedFraction[2]).json)}))`;
  const compactFraction = latex.match(/^\\frac([a-z0-9])([a-z0-9])$/i);
  if (compactFraction) return `((${mathJsonToCas(parse(compactFraction[1]).json)})/(${mathJsonToCas(parse(compactFraction[2]).json)}))`;
  return mathJsonToCas(parse(latex).json);
}
function applyAngleMode(cas: string, mode: AngleMode): string {
  if (mode === 'rad') return cas;
  let result = cas;
  result = result.replace(/\b(sin|cos|tan)\(([^()]*)\)/g, (_, fn, arg) => `${fn}((${arg})*pi/180)`);
  result = result.replace(/\b(arcsin|arccos|arctan)\(([^()]*)\)/g, (_, fn, arg) => `(${fn.replace('arc','a')}(${arg})*180/pi)`);
  return result;
}

function limitParts(latex: string): { variable: string; destination: string; side: "" | "+" | "-"; body: string } | null {
  if (!latex.startsWith('\\lim_{')) return null;
  let depth = 1;
  let end = -1;
  for (let i = 6; i < latex.length; i += 1) {
    if (latex[i] === '{') depth += 1;
    if (latex[i] === '}') depth -= 1;
    if (depth === 0) { end = i; break; }
  }
  if (end < 0) throw new Error('Ungültige Grenze');
  const subscript = latex.slice(6, end);
  const match = subscript.match(/^([a-z])\\to(.+)$/i);
  if (!match || !latex.slice(end + 1).trim()) throw new Error('Ungültige Grenze');
  let destination = match[2];
  let side: '' | '+' | '-' = '';
  const sideMatch = destination.match(/\^\{([+-])\}$/);
  if (sideMatch) { side = sideMatch[1] as '+' | '-'; destination = destination.slice(0, -sideMatch[0].length); }
  return { variable: match[1], destination, side, body: latex.slice(end + 1) };
}
function percentageRule(latex: string, mode: AngleMode): MathResult | null {
  const ratioPercent = latex.match(/^(.+?)(?:\\times|\\cdot|\\*)100\\%$/);
  if (ratioPercent) {
    const cas = mathJsonToCas(parse(ratioPercent[1]).json);
    const exact = nerdamer(`simplify((${cas})*100)`);
    const decimal = decimalFromCas(exact);
    const displayed = terminatingDecimal(exact) || formatLatex(exact.toTeX());
    return { exactLatex: displayed + '\\%', decimalLatex: displayed === decimal ? undefined : decimal ? decimal + '\\%' : undefined, operation: 'Prozent' };
  }
  const match = latex.match(/^(.+?)([+-])(.+)\\%$/);
  if (!match) {
    if (!latex.includes('\%')) return null;
    const cas = mathJsonToCas(parse(latex.replace(/\%/g, '/100')).json);
    const exact = nerdamer(`simplify(${applyAngleMode(cas, mode)})`);
    const decimal = decimalFromCas(exact);
    const displayed = terminatingDecimal(exact) || formatLatex(exact.toTeX());
    return { exactLatex: displayed, decimalLatex: displayed === decimal ? undefined : decimal, operation: 'Prozent' };
  }
  const base = mathJsonToCas(parse(match[1]).json);
  const percent = mathJsonToCas(parse(match[3]).json);
  const cas = match[2] === '+' ? `(${base})*(1+(${percent})/100)` : `(${base})*(1-(${percent})/100)`;
  const exact = nerdamer(`simplify(${applyAngleMode(cas, mode)})`);
  const decimal = decimalFromCas(exact);
  const displayed = terminatingDecimal(exact) || formatLatex(exact.toTeX());
  return { exactLatex: displayed, decimalLatex: displayed === decimal ? undefined : decimal, operation: 'Prozent' };
}

function detectVariable(cas: string): string {
  const vars = nerdamer(cas).variables();
  return vars.includes('x') ? 'x' : vars[0] || 'x';
}

function solveEquationCas(equation: string, variable?: string): MathResult {
  const selectedVariable = variable || detectVariable(equation);
  if (!nerdamer(equation).variables().length) throw new Error('Keine Variable zum Lösen gefunden');
  const solutions = nerdamer.solveEquations(equation, selectedVariable);
  const values = Array.isArray(solutions) ? solutions : String(solutions).split(',').filter(Boolean);
  if (!values.length) throw new Error('Keine Lösung gefunden');
  const latexValues = values.map((value: any) => typeof value?.toTeX === 'function' ? value.toTeX() : casToLatex(String(value)));
  return { exactLatex: `${selectedVariable}=${latexValues.join(',\\;')}`, operation: 'Lösungen' };
}

function solvePolynomialInequality(json: any[]): MathResult {
  const [head, leftNode, rightNode] = json;
  const relation = ({ Less: '<', LessEqual: '<=', Greater: '>', GreaterEqual: '>=' } as Record<string, string>)[head];
  const difference = `((${mathJsonToCas(leftNode)})-(${mathJsonToCas(rightNode)}))`;
  const variables = nerdamer(difference).variables();
  if (!variables.length) {
    const value = Number(nerdamer(difference).evaluate().text('decimals'));
    const valid = relation === '<' ? value < 0 : relation === '<=' ? value <= 0 : relation === '>' ? value > 0 : value >= 0;
    if (!valid) throw new Error('Keine reelle Lösung');
    return { exactLatex: '\\mathrm{wahr}', operation: 'Lösungen' };
  }
  const variable = variables.includes('x') ? 'x' : variables[0];
  const polynomial = nerdamer(difference);
  if (!polynomial.isPolynomial(variable)) throw new Error('Diese Ungleichung wird nicht unterstützt');

  const rawRoots = nerdamer.solveEquations(`${difference}=0`, variable) as any[];
  const roots = rawRoots.map((root: any) => {
    const text = typeof root?.toString === 'function' ? root.toString() : String(root);
    const numeric = Number(nerdamer(text).evaluate().text('decimals'));
    return { text, numeric, latex: typeof root?.toTeX === 'function' ? root.toTeX() : casToLatex(text) };
  }).filter(root => Number.isFinite(root.numeric)).sort((a, b) => a.numeric - b.numeric)
    .filter((root, index, all) => index === 0 || Math.abs(root.numeric - all[index - 1].numeric) > 1e-10);

  const satisfies = (sample: number) => {
    const value = Number(polynomial.evaluate({ [variable]: sample }).text('decimals'));
    if (!Number.isFinite(value)) return false;
    return relation === '<' ? value < 0 : relation === '<=' ? value <= 0 : relation === '>' ? value > 0 : value >= 0;
  };
  const inclusive = relation === '<=' || relation === '>=';
  if (!roots.length) {
    if (!satisfies(0)) throw new Error('Keine reelle Lösung');
    return { exactLatex: `${variable}\\in\\mathbb{R}`, operation: 'Lösungen' };
  }

  const intervals: string[] = [];
  const samples = [roots[0].numeric - Math.max(1, Math.abs(roots[0].numeric)), ...roots.slice(0, -1).map((root, index) => (root.numeric + roots[index + 1].numeric) / 2), roots.at(-1)!.numeric + Math.max(1, Math.abs(roots.at(-1)!.numeric))];
  samples.forEach((sample, index) => {
    if (!satisfies(sample)) return;
    const lower = index === 0 ? '-\\infty' : roots[index - 1].latex;
    const upper = index === roots.length ? '\\infty' : roots[index].latex;
    const leftBracket = index === 0 || !inclusive ? '(' : '[';
    const rightBracket = index === roots.length || !inclusive ? ')' : ']';
    intervals.push(`${leftBracket}${lower},${upper}${rightBracket}`);
  });
  if (!intervals.length && inclusive) {
    return { exactLatex: `${variable}\\in\\{${roots.map(root => root.latex).join(',')}\\}`, operation: 'Lösungen' };
  }
  if (!intervals.length) throw new Error('Keine reelle Lösung');
  return { exactLatex: `${variable}\\in${intervals.join('\\cup')}`, operation: 'Lösungen' };
}

export function calculateLatex(latex: string, mode: AngleMode, action: ResultAction = 'auto'): MathResult {
  try {
    // Normalize the documented typed constant before MathLive/Compute Engine
    // can interpret the final i as the imaginary unit.
    latex = latex.replace(/(^|[^a-z0-9\\])p\s*i(?=$|[^a-z])/gi, (_, prefix) => prefix + '\\pi');
    const percent = percentageRule(latex, mode);
    if (percent) return percent;
    const inverseTrig = latex.match(/^\\(arcsin|arccos|arctan)\((.+)\)$/i);
    if (inverseTrig) {
      const fn = inverseTrig[1].toLowerCase();
      const arg = nerdamer('simplify(' + mathJsonToCas(parse(inverseTrig[2]).json) + ')').toString();
      const known: Record<string, Record<string, string>> = {
        arcsin: { '0': '0', '1/2': '\\frac{\\pi}{6}', '1': '\\frac{\\pi}{2}' },
        arccos: { '1': '0', '1/2': '\\frac{\\pi}{3}', '0': '\\frac{\\pi}{2}' },
        arctan: { '0': '0', '1': '\\frac{\\pi}{4}' },
      };
      const radLatex = known[fn]?.[arg];
      if (radLatex) {
        if (mode === 'rad') return { exactLatex: radLatex, operation: 'Trigonometrie' };
        const degrees = nerdamer(mathJsonToCas(parse(radLatex).json) + '*180/pi').evaluate();
        return { exactLatex: degrees.toTeX(), operation: 'Trigonometrie' };
      }
      const casFn = fn.replace('arc', 'a');
      const numeric = nerdamer(casFn + '(' + arg + ')').evaluate();
      const value = mode === 'deg' ? nerdamer('(' + numeric.toString() + ')*180/pi').evaluate() : numeric;
      return { exactLatex: value.text('decimals'), operation: 'Trigonometrie' };
    }
    const reciprocalTrig = latex.match(/^\\operatorname\{(sec|csc|cot)\}\((.+)\)$/i);
    if (reciprocalTrig) {
      const arg = mathJsonToCas(parse(reciprocalTrig[2]).json);
      const fn = reciprocalTrig[1].toLowerCase();
      const cas = fn === 'sec' ? `1/cos(${arg})` : fn === 'csc' ? `1/sin(${arg})` : `cos(${arg})/sin(${arg})`;
      const exact = nerdamer('simplify(' + applyAngleMode(cas, mode) + ')');
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: decimalFromCas(exact), operation: 'Trigonometrie' };
    }
    const combination = latex.match(/^C\((.+),(.+)\)$/i);
    if (combination) {
      const n = mathJsonToCas(parse(combination[1]).json);
      const k = mathJsonToCas(parse(combination[2]).json);
      const nValue = Number(nerdamer(n).evaluate().text('decimals'));
      const kValue = Number(nerdamer(k).evaluate().text('decimals'));
      if (![nValue, kValue].every(Number.isInteger) || nValue < 0 || kValue < 0 || kValue > nValue) throw new Error('n und k müssen ganze Zahlen mit 0 ≤ k ≤ n sein');
      const exact = nerdamer('factorial(' + n + ')/(factorial(' + k + ')*factorial((' + n + ')-(' + k + ')))').evaluate();
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: decimalFromCas(exact), operation: 'Kombination' };
    }

    const permutation = latex.match(/^P\((.+),(.+)\)$/i);
    if (permutation) {
      const n = mathJsonToCas(parse(permutation[1]).json);
      const k = mathJsonToCas(parse(permutation[2]).json);
      const nValue = Number(nerdamer(n).evaluate().text('decimals'));
      const kValue = Number(nerdamer(k).evaluate().text('decimals'));
      if (![nValue, kValue].every(Number.isInteger) || nValue < 0 || kValue < 0 || kValue > nValue) throw new Error('n und k müssen ganze Zahlen mit 0 ≤ k ≤ n sein');
      const exact = nerdamer('factorial(' + n + ')/factorial((' + n + ')-(' + k + '))').evaluate();
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: decimalFromCas(exact), operation: 'Permutation' };
    }

    // MathLive textbook calculus templates are handled from their LaTeX form.
    const derivative = latex.match(/^\\frac\{d\}\{d([a-z])\}(.+)$/i);
    if (derivative) {
      const variable = derivative[1];
      const cas = mathJsonToCas(parse(derivative[2]).json);
      const exact = nerdamer.diff(cas, variable);
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: decimalLatex(parse(formatLatex(exact.toTeX()))), operation: 'Ableitung' };
    }

    const definite = latex.match(/^\\int_\{(.+)\}\^\{(.+)\}(.+)\\,?d([a-z])$/i);
    if (definite) {
      const lower = mathJsonToCas(parse(definite[1]).json), upper = mathJsonToCas(parse(definite[2]).json);
      const cas = mathJsonToCas(parse(definite[3]).json);
      const exact = nerdamer(`defint(${cas},${lower},${upper},${definite[4]})`);
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: decimalFromCas(exact), operation: 'Bestimmtes Integral' };
    }

    const indefinite = latex.match(/^\\int(.+)\\,?d([a-z])$/i);
    if (indefinite) {
      const cas = mathJsonToCas(parse(indefinite[1]).json);
      const exact = nerdamer.integrate(cas, indefinite[2]);
      return { exactLatex: `${formatLatex(exact.toTeX())}+C`, operation: 'Stammfunktion' };
    }

    const sum = latex.match(/^\\sum_\{([a-z])=(.+)\}\^\{(.+)\}(.+)$/i);
    if (sum) {
      const cas = mathJsonToCas(parse(sum[4]).json);
      const exact = nerdamer(`sum(${cas},${sum[1]},${mathJsonToCas(parse(sum[2]).json)},${mathJsonToCas(parse(sum[3]).json)})`);
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: decimalFromCas(exact), operation: 'Summe' };
    }

    const limit = limitParts(latex);
    if (limit) {
      const variable = limit.variable;
      const destination = mathJsonToCas(parse(limit.destination).json);
      const cas = latexToCas(limit.body);
      const exact = limit.side ? oneSidedLimit(cas, variable, destination, limit.side) : nerdamer(`limit(${cas},${variable},${destination})`);
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: decimalFromCas(exact), operation: 'Grenzwert' };
    }

    const expression = parse(latex);
    const json = expression.json;
    if (Array.isArray(json) && ['Less', 'LessEqual', 'Greater', 'GreaterEqual'].includes(String(json[0]))) {
      return solvePolynomialInequality(json);
    }
    const cas = applyAngleMode(mathJsonToCas(json), mode);
    // Keep ordinary arithmetic independent from the heavier symbolic CAS.
    // This also makes the calculator resilient if Nerdamer has not finished
    // loading in a browser yet. DEG trigonometry still uses its conversion.
    const containsDegreeTrig = mode === 'deg' && /\\(?:sin|cos|tan|arcsin|arccos|arctan)/i.test(latex);
    const requiresSymbolicCas = latex.includes('!') || /(^|[^a-z])i([^a-z]|$)/i.test(latex);
    if (action === 'auto' && !containsDegreeTrig && !requiresSymbolicCas) {
      const simplified = expression.simplify();
      if (simplified.isNumber) {
        const exactLatex = simplified.latex;
        const decimalResult = decimalLatex(simplified);
        return {
          exactLatex,
          decimalLatex: decimalResult && decimalResult !== exactLatex ? decimalResult : undefined,
          operation: 'Exakt',
        };
      }
    }

    if (Array.isArray(json) && json[0] === 'Equal') return solveEquationCas(mathJsonToCas(json));
    if (action === 'solve') return solveEquationCas(`${cas}=0`);

    let exact: any;
    let operation = 'Exakt';
    if (action === 'expand') { exact = nerdamer.expand(cas); operation = 'Erweitert'; }
    else if (action === 'factor') { exact = nerdamer(`factor(${cas})`); operation = 'Faktorisiert'; }
    else {
      exact = requiresSymbolicCas ? nerdamer(`simplify(expand(${cas}))`) : nerdamer('simplify(' + cas + ')');
      operation = action === 'simplify' ? 'Vereinfacht' : 'Exakt';
    }

    const exactLatex = formatLatex(exact.toTeX());
    const decimal = decimalFromCas(exact);
    const decimalResult = decimal && decimal !== exact.text() ? decimal : undefined;
    return { exactLatex, decimalLatex: decimalResult, operation };
  } catch (error) { throw germanError(error); }
}

function oneSidedLimit(cas: string, variable: string, destination: string, side: '+'|'-'): any {
  if (/^(?:Infinity|-Infinity)$/.test(destination)) return nerdamer(`limit(${cas},${variable},${destination})`);
  const approach = side === '+' ? `((${destination})+t)` : `((${destination})-t)`;
  const transformed = nerdamer(cas).sub(variable, approach).toString();
  return nerdamer(`limit(${transformed},t,0)`);
}

export const __test__ = { mathJsonToCas, applyAngleMode };
