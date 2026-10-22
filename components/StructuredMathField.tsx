'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { clearMathField, deleteMathUnit } from '@/lib/mathfield-commands';

export interface StructuredMathFieldHandle {
  insert(latex: string): void;
  setValue(latex: string): void;
  getValue(): string;
  clear(): void;
  backspace(): void;
  focus(): void;
  showKeyboard(): void;
  hideKeyboard(): void;
}

interface Props {
  value?: string;
  readOnly?: boolean;
  ariaLabel: string;
  className?: string;
  onInput?: (latex: string) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onVirtualKeyboardChange?: (visible: boolean, height: number) => void;
}

type MathKeyboard = EventTarget & {
  visible: boolean;
  boundingRect?: DOMRect;
  layouts: unknown;
  editToolbar: 'none' | 'default';
  show(options?: { animate: boolean }): void;
  hide(options?: { animate: boolean }): void;
};

const wideKey = (key: Record<string, unknown>) => ({ ...key, width: 2 as const });
const wideControl = (label: string) => ({ label, width: 2 as const });
const calculateControl = { label: '=', command: 'performWithFeedback(commit)', tooltip: 'Ergebnis berechnen', class: 'action hide-shift', width: 2 as const };
const calculatorKeyboardLayouts = [
  {
    id: 'matherechner-numeric', label: '123', labelClass: 'MLK__tex-math', tooltip: 'Zahlen und Algebra',
    rows: [
      [{ latex: 'x' }, { latex: 'y' }, { latex: '\\pi' }, { latex: '\\exponentialE' }, { latex: '\\imaginaryI' }, '[7]', '[8]', '[9]', '[/]', '[backspace]'],
      [{ label: 'xⁿ', insert: '#@^{#?}', tooltip: 'Potenz' }, { label: '√x', insert: '\\sqrt{#0}', tooltip: 'Quadratwurzel' }, { label: 'ⁿ√x', insert: '\\sqrt[#?]{#0}', tooltip: 'n-te Wurzel' }, { label: 'a/b', insert: '\\frac{#0}{#?}', tooltip: 'Bruch' }, { label: '|x|', insert: '\\left|#0\\right|', tooltip: 'Betrag' }, '[4]', '[5]', '[6]', '[*]', { label: 'x!', insert: '!', tooltip: 'Fakultät' }],
      [{ latex: '<' }, { latex: '\\le' }, { latex: '>' }, { latex: '\\ge' }, '[(]', '[1]', '[2]', '[3]', '[-]', '[)]'],
      [{ latex: '\\%' }, { latex: '=' }, '[left]', '[right]', '[0]', '[.]', '[+]', '[hide-keyboard]', '[action]'],
    ],
  },
  {
    id: 'matherechner-functions', label: 'ƒ', labelClass: 'MLK__tex-math', tooltip: 'Trigonometrie und Funktionen',
    rows: [
      [wideKey({ label: 'sin', insert: '\\sin(#0)', tooltip: 'Sinus' }), wideKey({ label: 'cos', insert: '\\cos(#0)', tooltip: 'Kosinus' }), wideKey({ label: 'tan', insert: '\\tan(#0)', tooltip: 'Tangens' }), wideKey({ label: 'log', insert: '\\log(#0)', tooltip: 'Zehnerlogarithmus' })],
      [wideKey({ label: 'csc', insert: '\\operatorname{csc}(#0)', tooltip: 'Kosekans' }), wideKey({ label: 'sec', insert: '\\operatorname{sec}(#0)', tooltip: 'Sekans' }), wideKey({ label: 'cot', insert: '\\operatorname{cot}(#0)', tooltip: 'Kotangens' }), wideKey({ label: 'ln', insert: '\\ln(#0)', tooltip: 'Natürlicher Logarithmus' })],
      [wideKey({ label: 'sin⁻¹', insert: '\\arcsin(#0)', tooltip: 'Arkussinus' }), wideKey({ label: 'cos⁻¹', insert: '\\arccos(#0)', tooltip: 'Arkuskosinus' }), wideKey({ label: 'tan⁻¹', insert: '\\arctan(#0)', tooltip: 'Arkustangens' }), wideKey({ label: 'exp', insert: '\\exp(#0)', tooltip: 'Exponentialfunktion' })],
      [wideKey({ label: 'a/b', insert: '\\frac{#0}{#?}', tooltip: 'Bruch' }), wideKey({ label: '√x', insert: '\\sqrt{#0}', tooltip: 'Quadratwurzel' }), wideKey({ label: 'ⁿ√x', insert: '\\sqrt[#?]{#0}', tooltip: 'n-te Wurzel' }), wideKey({ label: 'xⁿ', insert: '#@^{#?}', tooltip: 'Potenz' })],
      [wideControl('[(]'), wideControl('[)]'), wideControl('[backspace]'), calculateControl],
      [wideControl('[left]'), wideControl('[right]'), wideControl('[hide-keyboard]')],
    ],
  },
  {
    id: 'matherechner-analysis', label: '∫', labelClass: 'MLK__tex-math', tooltip: 'Analysis und Kombinatorik',
    rows: [
      [wideKey({ label: 'C(n,k)', insert: 'C(#0,#?)', tooltip: 'Kombinationen' }), wideKey({ label: 'P(n,k)', insert: 'P(#0,#?)', tooltip: 'Permutationen' }), wideKey({ label: 'd/dx', insert: '\\frac{d}{dx}(#0)', tooltip: 'Ableitung' }), wideKey({ label: 'lim', insert: '\\lim_{x\\to#?}#0', tooltip: 'Grenzwert' })],
      [wideKey({ label: 'Σ', insert: '\\sum_{k=#?}^{#?}#0', tooltip: 'Summe' }), wideKey({ label: '∫', insert: '\\int #0\\,dx', tooltip: 'Unbestimmtes Integral' }), wideKey({ label: '∫ₐᵇ', insert: '\\int_{#?}^{#?}#0\\,dx', tooltip: 'Bestimmtes Integral' }), wideKey({ latex: '\\infty', tooltip: 'Unendlich' })],
      [wideKey({ label: 'a/b', insert: '\\frac{#0}{#?}', tooltip: 'Bruch' }), wideKey({ label: '√x', insert: '\\sqrt{#0}', tooltip: 'Quadratwurzel' }), wideKey({ label: 'ⁿ√x', insert: '\\sqrt[#?]{#0}', tooltip: 'n-te Wurzel' }), wideKey({ label: 'xⁿ', insert: '#@^{#?}', tooltip: 'Potenz' })],
      [wideControl('[(]'), wideControl('[)]'), wideControl('[backspace]'), calculateControl],
      [wideControl('[left]'), wideControl('[right]'), wideControl('[hide-keyboard]')],
    ],
  },
  'alphabetic',
  'greek',
];

export const StructuredMathField = forwardRef<StructuredMathFieldHandle, Props>(function StructuredMathField(
  { value = '', readOnly = false, ariaLabel, className = '', onInput, onEnter, onEscape, onVirtualKeyboardChange }, ref,
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<any>(null);
  const inputCallback = useRef(onInput);
  const enterCallback = useRef(onEnter);
  const escapeCallback = useRef(onEscape);
  const virtualKeyboardCallback = useRef(onVirtualKeyboardChange);
  inputCallback.current = onInput;
  enterCallback.current = onEnter;
  escapeCallback.current = onEscape;
  virtualKeyboardCallback.current = onVirtualKeyboardChange;

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
    showKeyboard() {
      fieldRef.current?.focus();
      const keyboard = (window as Window & { mathVirtualKeyboard?: MathKeyboard }).mathVirtualKeyboard;
      keyboard?.show({ animate: true });
    },
    hideKeyboard() {
      const keyboard = (window as Window & { mathVirtualKeyboard?: MathKeyboard }).mathVirtualKeyboard;
      keyboard?.hide({ animate: true });
    },
  }), []);

  useEffect(() => {
    let disposed = false;
    let field: any;
    let keyboard: MathKeyboard | undefined;
    let handleKeyboardChange: (() => void) | undefined;
    let handleKeyboardToggleClick: ((event: MouseEvent) => void) | undefined;

    (async () => {
      const { MathfieldElement } = await import('mathlive');
      if (disposed || !hostRef.current) return;
      MathfieldElement.fontsDirectory = '/mathlive-fonts';
      MathfieldElement.soundsDirectory = null;
      keyboard = (window as Window & { mathVirtualKeyboard?: MathKeyboard }).mathVirtualKeyboard;
      if (!readOnly && keyboard) {
        keyboard.layouts = calculatorKeyboardLayouts;
        keyboard.editToolbar = 'default';
      }
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
      field.addEventListener('change', () => enterCallback.current?.());
      field.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') { event.preventDefault(); enterCallback.current?.(); }
        if (event.key === 'Escape') { event.preventDefault(); escapeCallback.current?.(); }
      });
      hostRef.current.replaceChildren(field);
      fieldRef.current = field;
      // MathLive exposes menuItems only after the custom element is mounted.
      // Disable commands that bypass this calculator's validated engine.
      field.menuItems = [];

      if (!readOnly) {
        handleKeyboardToggleClick = (event: MouseEvent) => {
          const pressedToggle = event.composedPath().some(node =>
            node instanceof Element && node.getAttribute('part')?.split(/\s+/).includes('virtual-keyboard-toggle'),
          );
          if (!pressedToggle) return;
          event.preventDefault();
          event.stopPropagation();
          field.focus();
          requestAnimationFrame(() => {
            const activeKeyboard = (window as Window & { mathVirtualKeyboard?: MathKeyboard }).mathVirtualKeyboard;
            activeKeyboard?.show({ animate: true });
          });
        };
        field.addEventListener('click', handleKeyboardToggleClick, true);
      }

      if (!readOnly && keyboard && virtualKeyboardCallback.current) {
        handleKeyboardChange = () => virtualKeyboardCallback.current?.(keyboard?.visible ?? false, Number(keyboard?.boundingRect?.height || 0));
        keyboard.addEventListener('virtual-keyboard-toggle', handleKeyboardChange);
        keyboard.addEventListener('geometrychange', handleKeyboardChange);
        handleKeyboardChange();
      }
    })();

    return () => {
      disposed = true;
      if (keyboard && handleKeyboardChange) {
        keyboard.removeEventListener('virtual-keyboard-toggle', handleKeyboardChange);
        keyboard.removeEventListener('geometrychange', handleKeyboardChange);
      }
      if (field && handleKeyboardToggleClick) field.removeEventListener('click', handleKeyboardToggleClick, true);
      fieldRef.current = null;
      field?.remove();
    };
  }, [ariaLabel, className, readOnly]);

  useEffect(() => {
    const field = fieldRef.current;
    if (field && field.getValue('latex-expanded') !== value) field.setValue(value, { silenceNotifications: true });
  }, [value]);

  return <div ref={hostRef} className="gcalc-mathfield-host" />;
});
