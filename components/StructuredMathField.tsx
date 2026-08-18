'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { clearMathField, deleteMathUnit, handleMathKey, insertMathTemplate } from '@/lib/mathfield-commands';

export interface StructuredMathFieldHandle {
  insert(latex: string): void;
  setValue(latex: string): void;
  getValue(): string;
  clear(): void;
  backspace(): void;
  focus(): void;
}

interface Props {
  value?: string;
  readOnly?: boolean;
  ariaLabel: string;
  className?: string;
  onInput?: (latex: string) => void;
  onEnter?: () => void;
  onEscape?: () => void;
}

export const StructuredMathField = forwardRef<StructuredMathFieldHandle, Props>(function StructuredMathField(
  { value = '', readOnly = false, ariaLabel, className = '', onInput, onEnter, onEscape }, ref,
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<any>(null);
  const inputCallback = useRef(onInput);
  const enterCallback = useRef(onEnter);
  const escapeCallback = useRef(onEscape);
  inputCallback.current = onInput;
  enterCallback.current = onEnter;
  escapeCallback.current = onEscape;

  useImperativeHandle(ref, () => ({
    insert(latex) {
      const field = fieldRef.current;
      if (!field) return;
      field.insert(latex, { insertionMode: 'replaceSelection', selectionMode: 'placeholder' });
      field.focus();
    },
    setValue(latex) { fieldRef.current?.setValue(latex, { silenceNotifications: false }); },
    getValue() { return fieldRef.current?.getValue('latex-expanded') ?? ''; },
    clear() { if (fieldRef.current) clearMathField(fieldRef.current); },
    backspace() { if (fieldRef.current) deleteMathUnit(fieldRef.current); },
    focus() { fieldRef.current?.focus(); },
  }), []);

  useEffect(() => {
    let disposed = false;
    let field: any;
    (async () => {
      const { MathfieldElement } = await import('mathlive');
      if (disposed || !hostRef.current) return;
      MathfieldElement.fontsDirectory = '/mathlive-fonts';
      MathfieldElement.soundsDirectory = null;
      field = new MathfieldElement();
      field.className = `gcalc-mathfield ${className}`.trim();
      field.setAttribute('aria-label', ariaLabel);
      field.readOnly = readOnly;
      field.smartFence = true;
      field.smartMode = false;
      field.removeExtraneousParentheses = false;
      field.mathVirtualKeyboardPolicy = readOnly ? 'manual' : 'auto';
      field.setValue(value, { silenceNotifications: true });
      field.addEventListener('input', () => inputCallback.current?.(field.getValue('latex-expanded')));
      field.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') { event.preventDefault(); enterCallback.current?.(); }
        if (event.key === 'Escape') { event.preventDefault(); escapeCallback.current?.(); }
      });
      hostRef.current.replaceChildren(field);
      fieldRef.current = field;
    })();
    return () => { disposed = true; fieldRef.current = null; field?.remove(); };
  }, [ariaLabel, className, readOnly]);

  useEffect(() => {
    const field = fieldRef.current;
    if (field && field.getValue('latex-expanded') !== value) field.setValue(value, { silenceNotifications: true });
  }, [value]);

  return <div ref={hostRef} className="gcalc-mathfield-host" />;
});
