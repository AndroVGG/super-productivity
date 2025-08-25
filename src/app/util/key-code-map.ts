/**
 * Utility for mapping key strings to keyboard codes for international layout support
 * Uses KeyboardEvent.code instead of KeyboardEvent.key for layout-agnostic shortcuts
 */

export interface KeyMapping {
  key: string;
  code: string;
  description?: string;
}

/**
 * Mapping from character/key names to their physical keyboard codes
 * Based on US QWERTY layout physical positions
 */
export const KEY_CODE_MAP: Record<string, string> = {
  // Letters (A-Z)
  'A': 'KeyA', 'B': 'KeyB', 'C': 'KeyC', 'D': 'KeyD', 'E': 'KeyE',
  'F': 'KeyF', 'G': 'KeyG', 'H': 'KeyH', 'I': 'KeyI', 'J': 'KeyJ',
  'K': 'KeyK', 'L': 'KeyL', 'M': 'KeyM', 'N': 'KeyN', 'O': 'KeyO',
  'P': 'KeyP', 'Q': 'KeyQ', 'R': 'KeyR', 'S': 'KeyS', 'T': 'KeyT',
  'U': 'KeyU', 'V': 'KeyV', 'W': 'KeyW', 'X': 'KeyX', 'Y': 'KeyY',
  'Z': 'KeyZ',
  
  // Numbers (0-9)
  '0': 'Digit0', '1': 'Digit1', '2': 'Digit2', '3': 'Digit3', '4': 'Digit4',
  '5': 'Digit5', '6': 'Digit6', '7': 'Digit7', '8': 'Digit8', '9': 'Digit9',
  
  // Function keys
  'F1': 'F1', 'F2': 'F2', 'F3': 'F3', 'F4': 'F4', 'F5': 'F5', 'F6': 'F6',
  'F7': 'F7', 'F8': 'F8', 'F9': 'F9', 'F10': 'F10', 'F11': 'F11', 'F12': 'F12',
  
  // Special keys
  ' ': 'Space',
  'Space': 'Space',
  'Enter': 'Enter',
  'Return': 'Enter',
  'Escape': 'Escape',
  'Esc': 'Escape',
  'Backspace': 'Backspace',
  'Tab': 'Tab',
  'Delete': 'Delete',
  'Insert': 'Insert',
  'Home': 'Home',
  'End': 'End',
  'PageUp': 'PageUp',
  'PageDown': 'PageDown',
  
  // Arrow keys
  'ArrowUp': 'ArrowUp',
  'ArrowDown': 'ArrowDown',
  'ArrowLeft': 'ArrowLeft',
  'ArrowRight': 'ArrowRight',
  'Up': 'ArrowUp',
  'Down': 'ArrowDown',
  'Left': 'ArrowLeft',
  'Right': 'ArrowRight',
  
  // Numpad
  'Numpad0': 'Numpad0', 'Numpad1': 'Numpad1', 'Numpad2': 'Numpad2',
  'Numpad3': 'Numpad3', 'Numpad4': 'Numpad4', 'Numpad5': 'Numpad5',
  'Numpad6': 'Numpad6', 'Numpad7': 'Numpad7', 'Numpad8': 'Numpad8',
  'Numpad9': 'Numpad9',
  'NumpadEnter': 'NumpadEnter',
  'NumpadAdd': 'NumpadAdd',
  'NumpadSubtract': 'NumpadSubtract',
  'NumpadMultiply': 'NumpadMultiply',
  'NumpadDivide': 'NumpadDivide',
  'NumpadDecimal': 'NumpadDecimal',
  
  // Punctuation and symbols (US layout positions)
  ';': 'Semicolon',
  '=': 'Equal',
  ',': 'Comma',
  '-': 'Minus',
  '.': 'Period',
  '/': 'Slash',
  '`': 'Backquote',
  '[': 'BracketLeft',
  '\\': 'Backslash',
  ']': 'BracketRight',
  "'": 'Quote',
  
  // Plus key special handling
  '+': 'Equal', // Plus is Shift+Equal on US keyboards
  '++': 'Equal', // Special case for plus key shortcuts
};

/**
 * Convert a key string to its corresponding keyboard code
 * @param key - The key string to convert
 * @returns The keyboard code or the original key if no mapping exists
 */
export function getKeyCode(key: string): string {
  // Handle single letters - convert to uppercase
  if (key.length === 1 && key.match(/[a-zA-Z]/)) {
    return KEY_CODE_MAP[key.toUpperCase()] || `Key${key.toUpperCase()}`;
  }
  
  // Handle single digits
  if (key.length === 1 && key.match(/[0-9]/)) {
    return KEY_CODE_MAP[key] || `Digit${key}`;
  }
  
  // Look up in the mapping table
  return KEY_CODE_MAP[key] || key;
}

/**
 * Check if a keyboard event matches the expected code
 * @param event - The keyboard event
 * @param expectedKey - The expected key string
 * @returns True if the event matches the expected key
 */
export function matchesKeyCode(event: KeyboardEvent, expectedKey: string): boolean {
  const expectedCode = getKeyCode(expectedKey);
  return event.code === expectedCode;
}

/**
 * Get all possible key mappings for debugging/documentation
 * @returns Array of all key mappings
 */
export function getAllKeyMappings(): KeyMapping[] {
  return Object.entries(KEY_CODE_MAP).map(([key, code]) => ({
    key,
    code,
    description: `Physical key: ${code}, Character: ${key}`
  }));
}

/**
 * Validate if a key code exists in the mapping
 * @param keyCode - The key code to validate
 * @returns True if the key code is valid
 */
export function isValidKeyCode(keyCode: string): boolean {
  return Object.values(KEY_CODE_MAP).includes(keyCode);
}
