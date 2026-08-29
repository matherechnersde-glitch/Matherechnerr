import { describe, expect, it } from 'vitest';
import { calculateHoaiTableFee } from '../lib/hoai-engine';

describe('HOAI §35 table calculation', () => {
  it('returns the official zone III values at a table boundary', () => {
    expect(calculateHoaiTableFee(500_000, 2, 0)).toBe(62_900);
    expect(calculateHoaiTableFee(500_000, 2, 1)).toBe(78_449);
  });

  it('interpolates linearly between official cost rows', () => {
    expect(calculateHoaiTableFee(600_000, 2, 0)).toBeCloseTo(73_710.8, 6);
  });

  it('rejects costs outside the official table range', () => {
    expect(() => calculateHoaiTableFee(24_999, 2, 0)).toThrow(RangeError);
    expect(() => calculateHoaiTableFee(25_000_001, 2, 0)).toThrow(RangeError);
  });
});
