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
  if (/Unvollständiger Ausdruck|Bitte Nenner eingeben|Keine reelle Lösung|Variable für die Ableitung auswählen/.test(message)) return new Error(message);
  if (/divide|division|zero/i.test(message)) return new Error('Division durch null ist nicht definiert');
  if (/limit/i.test(message)) return new Error('Ungültige Grenze');
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
  const normalized = latex.replace(/\\frac(\{[^{}]*\}|[A-Za-z0-9])([A-Za-z0-9])/g, (_match, numerator, denominator) => '\\frac{' + numerator.replace(/[{}]/g, '') + '}{' + denominator + '}');
  return ce.parse(normalized);
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
    const exact = nerdamer('(' + cas + ')*100').evaluate();
    return { exactLatex: formatLatex(exact.toTeX()) + '\\%', decimalLatex: exact.text('decimals') + '\\%', operation: 'Prozent' };
  }
  const match = latex.match(/^(.+?)([+-])(.+)\\%$/);
  if (!match) {
    if (!latex.includes('\%')) return null;
    const cas = mathJsonToCas(parse(latex.replace(/\%/g, '/100')).json);
    const exact = nerdamer(applyAngleMode(cas, mode)).evaluate();
    const decimal = exact.text('decimals');
    return { exactLatex: decimal, decimalLatex: formatLatex(exact.toTeX()), operation: 'Prozent' };
  }
  const base = mathJsonToCas(parse(match[1]).json);
  const percent = mathJsonToCas(parse(match[3]).json);
  const cas = match[2] === '+' ? `(${base})*(1+(${percent})/100)` : `(${base})*(1-(${percent})/100)`;
  const exact = nerdamer(applyAngleMode(cas, mode)).evaluate();
  return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: exact.text('decimals'), operation: 'Prozent' };
}

function detectVariable(cas: string): string {
  const vars = nerdamer(cas).variables();
  return vars.includes('x') ? 'x' : vars[0] || 'x';
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
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: exact.text('decimals'), operation: 'Trigonometrie' };
    }
    const combination = latex.match(/^C\((.+),(.+)\)$/i);
    if (combination) {
      const n = mathJsonToCas(parse(combination[1]).json);
      const k = mathJsonToCas(parse(combination[2]).json);
      const exact = nerdamer('factorial(' + n + ')/(factorial(' + k + ')*factorial((' + n + ')-(' + k + ')))').evaluate();
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: exact.text('decimals'), operation: 'Kombination' };
    }

    const permutation = latex.match(/^P\((.+),(.+)\)$/i);
    if (permutation) {
      const n = mathJsonToCas(parse(permutation[1]).json);
      const k = mathJsonToCas(parse(permutation[2]).json);
      const exact = nerdamer('factorial(' + n + ')/factorial((' + n + ')-(' + k + '))').evaluate();
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: exact.text('decimals'), operation: 'Permutation' };
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
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: exact.text('decimals'), operation: 'Bestimmtes Integral' };
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
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: exact.text('decimals'), operation: 'Summe' };
    }

    const limit = limitParts(latex);
    if (limit) {
      const variable = limit.variable;
      const destination = mathJsonToCas(parse(limit.destination).json);
      const cas = latexToCas(limit.body);
      const exact = limit.side ? oneSidedLimit(cas, variable, destination, limit.side) : nerdamer(`limit(${cas},${variable},${destination})`);
      return { exactLatex: formatLatex(exact.toTeX()), decimalLatex: exact.text('decimals'), operation: 'Grenzwert' };
    }

    const expression = parse(latex);
    const json = expression.json;
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

    if (Array.isArray(json) && json[0] === 'Equal') {
      const equation = mathJsonToCas(json);
      const variable = detectVariable(equation);
      const solutions = nerdamer.solveEquations(equation, variable);
      const values = Array.isArray(solutions) ? solutions : String(solutions).split(',');
      if (!values.length) throw new Error('Keine reelle Lösung');
      const latexValues = values.map((v: any) => typeof v?.toTeX === 'function' ? v.toTeX() : casToLatex(String(v)));
      return { exactLatex: `${variable}=${latexValues.join(',\;')}`, operation: 'Lösungen' };
    }

    let exact: any;
    let operation = 'Exakt';
    if (action === 'expand') { exact = nerdamer.expand(cas); operation = 'Erweitert'; }
    else if (action === 'factor') { exact = nerdamer(`factor(${cas})`); operation = 'Faktorisiert'; }
    else { exact = nerdamer('simplify(' + cas + ')'); operation = action === 'simplify' ? 'Vereinfacht' : 'Exakt'; }

    const exactLatex = formatLatex(exact.toTeX());
    const decimal = exact.text('decimals');
    const decimalResult = decimal && decimal !== exact.text() ? decimal : undefined;
    return { exactLatex, decimalLatex: decimalResult, operation };
  } catch (error) { throw germanError(error); }
}

function oneSidedLimit(cas: string, variable: string, destination: string, side: '+'|'-'): any {
  const point = Number(nerdamer(destination).evaluate().text('decimals'));
  if (!Number.isFinite(point)) return nerdamer(`limit(${cas},${variable},${destination})`);
  const epsilon = side === '+' ? 1e-10 : -1e-10;
  const value = nerdamer(cas).evaluate({ [variable]: point + epsilon });
  const n = Number(value.text('decimals'));
  if (Math.abs(n) > 1e8) return nerdamer(n > 0 ? 'Infinity' : '-Infinity');
  return value;
}

export const __test__ = { mathJsonToCas, applyAngleMode };