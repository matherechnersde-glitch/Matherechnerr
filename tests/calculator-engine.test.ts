import { describe, expect, it } from 'vitest';
import { calculateLatex } from '../lib/calculator-engine';

const exact = (latex: string, mode: 'deg'|'rad'='rad') => calculateLatex(latex, mode).exactLatex;

describe('symbolic calculator engine', () => {
  it.each([
    ['2+3\\times4', '14'],
    ['(2+3)4', '20'],
    ['\\sqrt{144}', '12'],
    ['\\sqrt{25+144}', '13'],
    ['2^3', '8'],
    ['5!', '120'],
    ['\\left|-12\\right|', '12'],
    ['i^2', '-1'],
    ['\\frac34+\\frac25', '\\frac{23}{20}'],
    ['2\\pi+3\\pi', '5\\pi'],
  ])('%s gives exact %s', (input, output) => expect(exact(input)).toBe(output));

  it('solves linear and quadratic equations', () => {
    expect(exact('6x+5=14')).toContain('x=\\frac{3}{2}');
    const quadratic = exact('x^2-5x+6=0');
    expect(quadratic).toContain('2'); expect(quadratic).toContain('3');
  });

  it('expands and factors polynomials', () => {
    expect(calculateLatex('(x+5)(x+2)', 'rad', 'expand').exactLatex.replace(/\\cdot/g,'')).toContain('x^{2}+7x+10');
    const factored = calculateLatex('x^2+7x+10', 'rad', 'factor').exactLatex;
    expect(factored).toContain('x+2'); expect(factored).toContain('x+5');
  });

  it('applies DEG and RAD trigonometry', () => {
    expect(['0.5', '\\frac{1}{2}']).toContain(exact('\\sin(30)', 'deg'));
    expect(['0.5', '\\frac{1}{2}']).toContain(exact('\\cos(60)', 'deg'));
    expect(exact('\\tan(45)', 'deg')).toBe('1');
    expect(exact('\\sin(\\frac{\\pi}{2})', 'rad')).toBe('1');
  });

  it('calculates derivatives', () => {
    expect(exact('\\frac{d}{dx}(x^2)')).toMatch(/2\\cdot x|2x/);
    expect(exact('\\frac{d}{dx}(\\sin(x))')).toMatch(/cos.*x/);
  });

  it('calculates limits', () => {
    expect(exact('\\lim_{x\\to0}\\frac{\\sin(x)}x')).toBe('1');
    expect(exact('\\lim_{x\\to\\infty}\\frac1x')).toBe('0');
  });

  it('calculates integrals and sums', () => {
    expect(exact('\\int x^2\\,dx')).toContain('\\frac{x^{3}}{3}+C');
    expect(exact('\\int_{0}^{1}x^2\\,dx')).toBe('\\frac{1}{3}');
    expect(exact('\\sum_{k=1}^{10}k')).toBe('55');
  });

  it('calculates combinations and permutations', () => {
    expect(exact('C(5,2)')).toBe('10');
    expect(exact('P(5,2)')).toBe('20');
  });

  it('uses predictable percent rules', () => {
    expect(exact('250\\times19\\%')).toBe('47.5');
    expect(exact('200+10\\%')).toBe('220');
    expect(exact('200-10\\%')).toBe('180');
  });

  it('supports reciprocal and inverse trigonometry', () => {
    expect(exact('\\operatorname{sec}(0)', 'rad')).toBe('1');
    expect(exact('\\operatorname{csc}(\\frac{\\pi}{2})', 'rad')).toBe('1');
    expect(exact('\\operatorname{cot}(\\frac{\\pi}{4})', 'rad')).toBe('1');
    expect(exact('\\arcsin(\\frac12)', 'rad')).toBe('\\frac{\\pi}{6}');
    expect(exact('\\arcsin(\\frac12)', 'deg')).toMatch(/30/);
  });

  it('supports left and right limits', () => {
    expect(exact('\\lim_{x\\to0^{+}}\\frac1x')).toMatch(/infty|infinity/i);
    expect(exact('\\lim_{x\\to0^{-}}\\frac1x')).toMatch(/-.*(?:infty|infinity)/i);
  });

  it('keeps the ratio percentage convention', () => {
    expect(exact('\\frac{45}{180}\\times100\\%')).toBe('25\\%');
  });
  it('rejects incomplete expressions with German errors', () => {
    expect(() => exact('\\frac{\\placeholder{}}{2}')).toThrow('Unvollständiger Ausdruck');
  });
});
