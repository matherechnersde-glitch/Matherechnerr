export interface MathfieldLike {
  insert(latex: string, options: { insertionMode: string; selectionMode: string }): void;
  setValue(latex: string, options?: { silenceNotifications: boolean }): void;
  executeCommand(command: string): void;
  focus(): void;
}

export function insertMathTemplate(field: MathfieldLike, latex: string): void {
  field.insert(latex, { insertionMode: 'replaceSelection', selectionMode: 'placeholder' });
  field.focus();
}

export function deleteMathUnit(field: MathfieldLike): void {
  field.executeCommand('deleteBackward');
  field.focus();
}

export function clearMathField(field: MathfieldLike): void {
  field.setValue('', { silenceNotifications: false });
  field.focus();
}

export function handleMathKey(key: string, onEnter?: () => void, onEscape?: () => void): boolean {
  if (key === 'Enter') { onEnter?.(); return true; }
  if (key === 'Escape') { onEscape?.(); return true; }
  return false;
}