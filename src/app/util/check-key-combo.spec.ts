import { checkKeyCombo } from './check-key-combo';

describe('checkKeyCombo', () => {
  it('should return true when modifiers and code match', () => {
    const ev: Partial<KeyboardEvent> = {
      key: 'A',
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
    };
    expect(checkKeyCombo(ev as any, 'Ctrl+Shift+A')).toBe(true);
  });

  it('should return false when a modifier is missing', () => {
    const ev: Partial<KeyboardEvent> = {
      key: 'A',
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
    };
    expect(checkKeyCombo({ ...ev, ctrlKey: false } as any, 'Ctrl+Shift+A')).toBe(false);
    expect(checkKeyCombo({ ...ev, shiftKey: false } as any, 'Ctrl+Shift+A')).toBe(false);
  });

  it('should return false when code does not match', () => {
    const ev: Partial<KeyboardEvent> = {
      key: 'B',
      code: 'KeyB',
      ctrlKey: true,
      shiftKey: true,
    };
    expect(checkKeyCombo(ev as any, 'Ctrl+Shift+A')).toBe(false);
  });

  it('should handle plus key shortcuts', () => {
    const ev: Partial<KeyboardEvent> = {
      key: '+',
      code: 'Equal',
      ctrlKey: false,
      shiftKey: false,
    };
    expect(checkKeyCombo(ev as any, '++')).toBe(true);
  });

  it('should work with non-English layouts', () => {
    const ev: Partial<KeyboardEvent> = {
      key: 'Ф',      // Русский символ
      code: 'KeyA',  // Физическая клавиша A
      ctrlKey: true,
      shiftKey: true,
    };
    expect(checkKeyCombo(ev as any, 'Ctrl+Shift+A')).toBe(true);
  });

  it('should not throw when combo is undefined', () => {
    const ev: Partial<KeyboardEvent> = {
      key: 'A',
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
    };
    expect((checkKeyCombo as any)(ev as any, undefined)).toBe(false);
  });
});
