import { describe, expect, it } from 'vitest';
import { calculatePythagoras, formatGermanNumber, parseGermanNumber } from '../lib/pythagoras';

describe('Pythagoras calculator', () => {
  it('calculates the hypotenuse', () => {
    const result = calculatePythagoras({ missing: 'c', a: 3, b: 4 });
    expect(result.value).toBe(5);
    expect(result.radicand).toBe(25);
  });

  it('calculates either missing leg', () => {
    expect(calculatePythagoras({ missing: 'a', b: 5, c: 13 }).value).toBe(12);
    expect(calculatePythagoras({ missing: 'b', a: 8, c: 17 }).value).toBe(15);
  });

  it('supports decimal comma input', () => {
    expect(parseGermanNumber('1,5')).toBe(1.5);
    expect(calculatePythagoras({ missing: 'c', a: 1.5, b: 2 }).value).toBe(2.5);
  });

  it('rejects invalid triangles and non-positive sides', () => {
    expect(() => calculatePythagoras({ missing: 'a', b: 13, c: 5 })).toThrow('Hypotenuse c');
    expect(() => calculatePythagoras({ missing: 'c', a: 0, b: 4 })).toThrow('größer als null');
    expect(() => calculatePythagoras({ missing: 'c', a: undefined, b: 4 })).toThrow('Bitte Kathete a');
  });

  it('formats results without floating-point noise', () => {
    expect(formatGermanNumber(Math.sqrt(2))).toBe('1,4142135624');
  });
});