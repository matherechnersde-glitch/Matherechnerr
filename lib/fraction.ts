export type FractionOperation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionCalculation {
  left: Fraction;
  right: Fraction;
  operation: FractionOperation;
  result: Fraction;
  commonDenominator?: number;
  expandedLeft?: Fraction;
  expandedRight?: Fraction;
}

export function greatestCommonDivisor(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

export function normalizeFraction(numerator: number, denominator: number): Fraction {
  if (denominator === 0) throw new Error('Der Nenner darf nicht null sein.');
  if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator)) throw new Error('Die eingegebenen Zahlen sind zu groß.');
  const sign = denominator < 0 ? -1 : 1;
  const divisor = greatestCommonDivisor(numerator, denominator) || 1;
  return { numerator: (numerator / divisor) * sign, denominator: (denominator / divisor) * sign };
}

export function parseInteger(value: string, label: string): number {
  const normalized = value.trim().replace(/^\+/, '');
  if (!/^-?\d+$/.test(normalized)) throw new Error(`Bitte ${label} als ganze Zahl eingeben.`);
  const parsed = Number(normalized);
  if (!Number.isSafeInteger(parsed)) throw new Error(`${label} ist zu groß.`);
  return parsed;
}

export function calculateFractions(left: Fraction, right: Fraction, operation: FractionOperation): FractionCalculation {
  const a = normalizeFraction(left.numerator, left.denominator);
  const b = normalizeFraction(right.numerator, right.denominator);

  if (operation === 'add' || operation === 'subtract') {
    const commonDenominator = a.denominator * b.denominator;
    const expandedLeft = { numerator: a.numerator * b.denominator, denominator: commonDenominator };
    const expandedRight = { numerator: b.numerator * a.denominator, denominator: commonDenominator };
    const numerator = operation === 'add' ? expandedLeft.numerator + expandedRight.numerator : expandedLeft.numerator - expandedRight.numerator;
    return { left: a, right: b, operation, result: normalizeFraction(numerator, commonDenominator), commonDenominator, expandedLeft, expandedRight };
  }

  if (operation === 'multiply') {
    return { left: a, right: b, operation, result: normalizeFraction(a.numerator * b.numerator, a.denominator * b.denominator) };
  }

  if (b.numerator === 0) throw new Error('Durch den Bruch null kann nicht geteilt werden.');
  return { left: a, right: b, operation, result: normalizeFraction(a.numerator * b.denominator, a.denominator * b.numerator) };
}

export function fractionText(fraction: Fraction): string {
  return fraction.denominator === 1 ? fraction.numerator.toString() : `${fraction.numerator}/${fraction.denominator}`;
}

export function mixedNumberText(fraction: Fraction): string {
  const whole = Math.trunc(fraction.numerator / fraction.denominator);
  const remainder = fraction.numerator % fraction.denominator;
  if (remainder === 0) return whole.toString();
  if (whole === 0) return fractionText(fraction);
  return `${whole} ${Math.abs(remainder)}/${fraction.denominator}`;
}

export function decimalText(fraction: Fraction): string {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 12 }).format(fraction.numerator / fraction.denominator);
}