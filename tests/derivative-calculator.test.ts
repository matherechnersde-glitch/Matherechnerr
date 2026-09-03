import { describe, expect, it } from 'vitest';
import { calculateLatex } from '../lib/calculator-engine';

const derivative = (latex: string) => calculateLatex(`\\frac{d}{dx}\\left(${latex}\\right)`, 'rad').exactLatex;

describe('focused derivative calculator workflow', () => {
  it('supports the structured function wrapper used by the page', () => {
    expect(derivative('x^2')).toMatch(/2\\cdot x|2x/);
    expect(derivative('\\sin(x)')).toMatch(/cos.*x/);
  });

  it('can calculate higher-order derivatives successively', () => {
    expect(derivative(derivative('x^3'))).toMatch(/6\\cdot x|6x/);
  });
});
