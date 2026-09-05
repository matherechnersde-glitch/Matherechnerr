import { describe, expect, it } from 'vitest';
import { calculateLatex } from '../lib/calculator-engine';

describe('focused integral calculator workflow', () => {
  it('returns an exact indefinite integral with the integration constant', () => {
    expect(calculateLatex('\\int x^2\\,dx', 'rad').exactLatex).toContain('\\frac{x^{3}}{3}+C');
  });

  it('evaluates definite bounds exactly', () => {
    expect(calculateLatex('\\int_{0}^{1}x^2\\,dx', 'rad').exactLatex).toBe('\\frac{1}{3}');
  });

  it('uses the selected integration variable', () => {
    expect(calculateLatex('\\int y^2\\,dy', 'rad').exactLatex).toContain('\\frac{y^{3}}{3}+C');
  });
});
