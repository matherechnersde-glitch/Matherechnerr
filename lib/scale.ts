export type ScaleMode = 'toReality' | 'toDrawing' | 'findScale';
export type LengthUnit = 'mm' | 'cm' | 'm' | 'km';

const metres: Record<LengthUnit, number> = { mm: 0.001, cm: 0.01, m: 1, km: 1000 };

export function parseScaleNumber(value: string): number | undefined {
  const normalized = value.trim().replace(/\s/g, '').replace(',', '.');
  if (!normalized) return undefined;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  return value * metres[from] / metres[to];
}

function requiredPositive(value: number | undefined, label: string): number {
  if (value === undefined) throw new Error(`Bitte ${label} eingeben.`);
  if (value <= 0) throw new Error(`${label} muss größer als null sein.`);
  return value;
}

export function calculateScale(input: {
  mode: ScaleMode;
  drawing?: number;
  drawingUnit: LengthUnit;
  reality?: number;
  realityUnit: LengthUnit;
  denominator?: number;
}) {
  if (input.mode === 'toReality') {
    const drawing = requiredPositive(input.drawing, 'die Planlänge');
    const denominator = requiredPositive(input.denominator, 'die Maßstabszahl');
    const drawingMetres = convertLength(drawing, input.drawingUnit, 'm');
    const realityMetres = drawingMetres * denominator;
    return { mode: input.mode, value: convertLength(realityMetres, 'm', input.realityUnit), numerator: 1, denominator };
  }

  if (input.mode === 'toDrawing') {
    const reality = requiredPositive(input.reality, 'die reale Länge');
    const denominator = requiredPositive(input.denominator, 'die Maßstabszahl');
    const realityMetres = convertLength(reality, input.realityUnit, 'm');
    const drawingMetres = realityMetres / denominator;
    return { mode: input.mode, value: convertLength(drawingMetres, 'm', input.drawingUnit), numerator: 1, denominator };
  }

  const drawing = requiredPositive(input.drawing, 'die Planlänge');
  const reality = requiredPositive(input.reality, 'die reale Länge');
  const drawingMetres = convertLength(drawing, input.drawingUnit, 'm');
  const realityMetres = convertLength(reality, input.realityUnit, 'm');
  const ratio = realityMetres / drawingMetres;
  const numerator = ratio >= 1 ? 1 : 1 / ratio;
  const denominator = ratio >= 1 ? ratio : 1;
  return { mode: input.mode, value: ratio, numerator, denominator };
}

export function formatScaleNumber(value: number): string {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 10 }).format(value);
}
