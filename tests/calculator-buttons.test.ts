import { describe, expect, it } from 'vitest';
import { CALCULATOR_KEYS } from '../lib/calculator-keys';
import { calculateLatex } from '../lib/calculator-engine';

const allKeys = Object.values(CALCULATOR_KEYS).flat(2);

describe('calculator button definitions', () => {
  it('gives every visible key a German accessible label and behavior', () => {
    expect(allKeys.length).toBeGreaterThan(40);
    for (const key of allKeys) {
      expect(key.aria.trim().length).toBeGreaterThan(2);
      expect(Boolean(key.insert) !== Boolean(key.action)).toBe(true);
    }
  });

  it('provides real structured placeholders for advanced templates', () => {
    const byLabel = new Map(allKeys.map((key) => [key.label, key]));
    for (const label of ['xⁿ', 'ⁿ√x', '¹⁄ₓ', 'd/dx', 'lim', 'lim⁺', 'lim⁻', 'Σ', '∫', '∫ᵇₐ']) {
      expect(byLabel.get(label)?.insert).toMatch(/#0|#\?/);
    }
  });

  it('keeps calculate, backspace, and clear as actual commands', () => {
    const actions = allKeys.map((key) => key.action).filter(Boolean);
    expect(actions).toContain('calculate');
    expect(actions).toContain('back');
    expect(actions).toContain('clear');
  });

  it.each([
    ['xⁿ', '2^3', 'rad'], ['ⁿ√x', '\\sqrt[3]{27}', 'rad'], ['<', '2x+3<7', 'rad'],
    ['¹⁄ₓ', '\\frac{1}{4}', 'rad'], ['|x|', '\\left|-7\\right|', 'rad'], ['≤', '2x+3\\le7', 'rad'],
    ['log', '\\log(1000)', 'rad'], ['x!', '5!', 'rad'], ['>', '2x+3>7', 'rad'],
    ['i', '\\imaginaryI^2', 'rad'], ['%', '250\\times19\\%', 'rad'], ['≥', '2x+3\\ge7', 'rad'],
    ['x', '2x+3x', 'rad'], ['y', '2y+3y', 'rad'], ['=', '6x+5=14', 'rad'],
    ['sin', '\\sin(30)', 'deg'], ['cos', '\\cos(60)', 'deg'], ['tan', '\\tan(45)', 'deg'],
    ['csc', '\\operatorname{csc}(90)', 'deg'], ['sec', '\\operatorname{sec}(60)', 'deg'], ['cot', '\\operatorname{cot}(45)', 'deg'],
    ['arcsin', '\\arcsin(\\frac12)', 'rad'], ['arccos', '\\arccos(\\frac12)', 'rad'], ['arctan', '\\arctan(1)', 'rad'],
    ['x²', '5^2', 'rad'], ['x⁻¹', '4^{-1}', 'rad'], ['π', '2\\pi', 'rad'],
    ['d/dx', '\\frac{d}{dx}(x^2)', 'rad'], ['∞', '\\infty', 'rad'],
    ['lim', '\\lim_{x\\to0}\\frac{\\sin(x)}x', 'rad'], ['lim⁺', '\\lim_{x\\to0^{+}}\\frac1x', 'rad'], ['lim⁻', '\\lim_{x\\to0^{-}}\\frac1x', 'rad'],
    ['C(n,k)', 'C(5,2)', 'rad'], ['P(n,k)', 'P(5,2)', 'rad'], ['Σ', '\\sum_{k=1}^{10}k', 'rad'],
    ['∫', '\\int x^2\\,dx', 'rad'], ['∫ᵇₐ', '\\int_{0}^{1}x^2\\,dx', 'rad'], ['e', '\\exponentialE^1', 'rad'],
  ] as const)('%s produces a usable calculation result', (_label, input, mode) => {
    const result = calculateLatex(input, mode);
    expect(result.exactLatex).toBeTruthy();
    expect(result.exactLatex).not.toMatch(/placeholder|error/i);
  });
});
