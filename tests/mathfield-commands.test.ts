import { describe, expect, it, vi } from 'vitest';
import { clearMathField, deleteMathUnit, handleMathKey, insertMathTemplate } from '../lib/mathfield-commands';

function fieldMock() {
  return { insert: vi.fn(), setValue: vi.fn(), executeCommand: vi.fn(), focus: vi.fn() };
}

describe('structured math-field commands', () => {
  it('inserts templates at the selection and enters the first placeholder', () => {
    const field = fieldMock();
    insertMathTemplate(field, '\\frac{#0}{#?}');
    expect(field.insert).toHaveBeenCalledWith('\\frac{#0}{#?}', { insertionMode: 'replaceSelection', selectionMode: 'placeholder' });
    expect(field.focus).toHaveBeenCalledOnce();
  });

  it('deletes one mathematical unit and clears the full field', () => {
    const field = fieldMock();
    deleteMathUnit(field);
    expect(field.executeCommand).toHaveBeenCalledWith('deleteBackward');
    clearMathField(field);
    expect(field.setValue).toHaveBeenCalledWith('', { silenceNotifications: false });
  });

  it('maps Enter and Escape without consuming normal navigation keys', () => {
    const enter = vi.fn();
    const escape = vi.fn();
    expect(handleMathKey('Enter', enter, escape)).toBe(true);
    expect(handleMathKey('Escape', enter, escape)).toBe(true);
    expect(handleMathKey('ArrowRight', enter, escape)).toBe(false);
    expect(enter).toHaveBeenCalledOnce();
    expect(escape).toHaveBeenCalledOnce();
  });

  it('uses the same cursor-aware template behavior for mobile-sized input', () => {
    const field = fieldMock();
    insertMathTemplate(field, '\\sqrt[#?]{#0}');
    expect(field.insert).toHaveBeenCalledWith('\\sqrt[#?]{#0}', expect.objectContaining({ selectionMode: 'placeholder' }));
  });
});