import { describe, expect, it } from 'vitest';
import { calculateFractions, decimalText, fractionText, mixedNumberText, normalizeFraction, parseInteger } from '../lib/fraction';

describe('Bruchrechner', () => {
  it('adds and reduces fractions exactly', () => {
    const value = calculateFractions({ numerator: 1, denominator: 3 }, { numerator: 2, denominator: 5 }, 'add').result;
    expect(value).toEqual({ numerator: 11, denominator: 15 });
  });

  it('subtracts fractions with unlike denominators', () => {
    expect(calculateFractions({ numerator: 3, denominator: 4 }, { numerator: 1, denominator: 6 }, 'subtract').result).toEqual({ numerator: 7, denominator: 12 });
  });

  it('multiplies, divides, and reduces', () => {
    expect(calculateFractions({ numerator: 2, denominator: 3 }, { numerator: 3, denominator: 4 }, 'multiply').result).toEqual({ numerator: 1, denominator: 2 });
    expect(calculateFractions({ numerator: 3, denominator: 4 }, { numerator: 2, denominator: 5 }, 'divide').result).toEqual({ numerator: 15, denominator: 8 });
  });

  it('normalizes negative denominators and zero', () => {
    expect(normalizeFraction(2, -4)).toEqual({ numerator: -1, denominator: 2 });
    expect(normalizeFraction(0, 9)).toEqual({ numerator: 0, denominator: 1 });
  });

  it('provides fraction, mixed, and German decimal formats', () => {
    const value = { numerator: 7, denominator: 4 };
    expect(fractionText(value)).toBe('7/4');
    expect(mixedNumberText(value)).toBe('1 3/4');
    expect(decimalText(value)).toBe('1,75');
  });

  it('rejects zero denominators, division by zero, and non-integers', () => {
    expect(() => normalizeFraction(1, 0)).toThrow('Nenner darf nicht null');
    expect(() => calculateFractions({ numerator: 1, denominator: 2 }, { numerator: 0, denominator: 3 }, 'divide')).toThrow('Bruch null');
    expect(() => parseInteger('1,5', 'den Zähler')).toThrow('ganze Zahl');
  });
});