import { describe, expect, it } from 'vitest';
import { calculateScale, convertLength, parseScaleNumber } from '../lib/scale';

describe('Maßstabsrechner', () => {
  it('converts a plan length to reality', () => {
    expect(calculateScale({ mode: 'toReality', drawing: 4, drawingUnit: 'cm', realityUnit: 'm', denominator: 1000 }).value).toBe(40);
  });

  it('converts a real length to a drawing', () => {
    expect(calculateScale({ mode: 'toDrawing', reality: 80, realityUnit: 'm', drawingUnit: 'cm', denominator: 1000 }).value).toBe(8);
  });

  it('determines the scale with mixed units', () => {
    expect(calculateScale({ mode: 'findScale', drawing: 5, drawingUnit: 'cm', reality: 50, realityUnit: 'm' }).denominator).toBe(1000);
    expect(calculateScale({ mode: 'findScale', drawing: 5, drawingUnit: 'm', reality: 1, realityUnit: 'm' })).toMatchObject({ numerator: 5, denominator: 1 });
  });

  it('supports German decimals and unit conversion', () => {
    expect(parseScaleNumber('1,5')).toBe(1.5);
    expect(convertLength(1, 'km', 'm')).toBe(1000);
  });

  it('rejects missing and non-positive values', () => {
    expect(() => calculateScale({ mode: 'toReality', drawing: 0, drawingUnit: 'cm', realityUnit: 'm', denominator: 100 })).toThrow('größer als null');
    expect(() => calculateScale({ mode: 'findScale', drawing: 1, drawingUnit: 'm', reality: undefined, realityUnit: 'm' })).toThrow('reale Länge');
  });
});
