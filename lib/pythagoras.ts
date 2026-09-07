export type MissingSide = 'a' | 'b' | 'c';

export interface PythagorasInput {
  missing: MissingSide;
  a?: number;
  b?: number;
  c?: number;
}

export interface PythagorasResult {
  side: MissingSide;
  value: number;
  radicand: number;
  formula: string;
  substitution: string;
}

function positive(value: number | undefined, label: string): number {
  if (value === undefined || !Number.isFinite(value)) throw new Error(`Bitte ${label} eingeben.`);
  if (value <= 0) throw new Error(`${label} muss größer als null sein.`);
  return value;
}

export function calculatePythagoras(input: PythagorasInput): PythagorasResult {
  if (input.missing === 'c') {
    const a = positive(input.a, 'Kathete a');
    const b = positive(input.b, 'Kathete b');
    const radicand = a * a + b * b;
    return { side: 'c', value: Math.sqrt(radicand), radicand, formula: 'c = √(a² + b²)', substitution: `c = √(${a}² + ${b}²)` };
  }

  const c = positive(input.c, 'Hypotenuse c');
  const knownSide = input.missing === 'a' ? positive(input.b, 'Kathete b') : positive(input.a, 'Kathete a');
  if (c <= knownSide) throw new Error('Die Hypotenuse c muss länger als jede Kathete sein.');
  const radicand = c * c - knownSide * knownSide;
  const side = input.missing;
  const knownLabel = side === 'a' ? 'b' : 'a';
  return {
    side,
    value: Math.sqrt(radicand),
    radicand,
    formula: `${side} = √(c² − ${knownLabel}²)`,
    substitution: `${side} = √(${c}² − ${knownSide}²)`,
  };
}

export function parseGermanNumber(value: string): number | undefined {
  const normalized = value.trim().replace(',', '.');
  if (!normalized) return undefined;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function formatGermanNumber(value: number): string {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 10 }).format(value);
}