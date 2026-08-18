import { describe, expect, it } from 'vitest';
import { CALCULATOR_KEYS } from '../lib/calculator-keys';

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
});