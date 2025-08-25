import { 
  KEY_CODE_MAP, 
  getKeyCode, 
  matchesKeyCode, 
  getAllKeyMappings, 
  isValidKeyCode 
} from './key-code-map';

describe('KeyCodeMap', () => {
  
  describe('KEY_CODE_MAP', () => {
    it('should contain basic letter mappings', () => {
      expect(KEY_CODE_MAP['A']).toBe('KeyA');
      expect(KEY_CODE_MAP['Z']).toBe('KeyZ');
      expect(KEY_CODE_MAP['M']).toBe('KeyM');
    });

    it('should contain digit mappings', () => {
      expect(KEY_CODE_MAP['0']).toBe('Digit0');
      expect(KEY_CODE_MAP['9']).toBe('Digit9');
      expect(KEY_CODE_MAP['5']).toBe('Digit5');
    });

    it('should contain special key mappings', () => {
      expect(KEY_CODE_MAP[' ']).toBe('Space');
      expect(KEY_CODE_MAP['Space']).toBe('Space');
      expect(KEY_CODE_MAP['Enter']).toBe('Enter');
      expect(KEY_CODE_MAP['Escape']).toBe('Escape');
      expect(KEY_CODE_MAP['Tab']).toBe('Tab');
    });

    it('should contain arrow key mappings', () => {
      expect(KEY_CODE_MAP['ArrowUp']).toBe('ArrowUp');
      expect(KEY_CODE_MAP['Up']).toBe('ArrowUp');
      expect(KEY_CODE_MAP['ArrowDown']).toBe('ArrowDown');
      expect(KEY_CODE_MAP['Down']).toBe('ArrowDown');
    });

    it('should contain function key mappings', () => {
      expect(KEY_CODE_MAP['F1']).toBe('F1');
      expect(KEY_CODE_MAP['F12']).toBe('F12');
    });
  });

  describe('getKeyCode', () => {
    it('should convert single letters to KeyX format', () => {
      expect(getKeyCode('a')).toBe('KeyA');
      expect(getKeyCode('A')).toBe('KeyA');
      expect(getKeyCode('z')).toBe('KeyZ');
      expect(getKeyCode('m')).toBe('KeyM');
    });

    it('should convert single digits to DigitX format', () => {
      expect(getKeyCode('0')).toBe('Digit0');
      expect(getKeyCode('9')).toBe('Digit9');
      expect(getKeyCode('5')).toBe('Digit5');
    });

    it('should handle special keys', () => {
      expect(getKeyCode('Space')).toBe('Space');
      expect(getKeyCode(' ')).toBe('Space');
      expect(getKeyCode('Enter')).toBe('Enter');
      expect(getKeyCode('Escape')).toBe('Escape');
    });

    it('should return original key if no mapping exists', () => {
      expect(getKeyCode('UnknownKey')).toBe('UnknownKey');
      expect(getKeyCode('CustomKey123')).toBe('CustomKey123');
    });

    it('should handle plus key special cases', () => {
      expect(getKeyCode('+')).toBe('Equal');
      expect(getKeyCode('++')).toBe('Equal');
    });
  });

  describe('matchesKeyCode', () => {
    it('should match letter keys correctly', () => {
      const event = { code: 'KeyA' } as KeyboardEvent;
      expect(matchesKeyCode(event, 'A')).toBe(true);
      expect(matchesKeyCode(event, 'a')).toBe(true);
      expect(matchesKeyCode(event, 'B')).toBe(false);
    });

    it('should match digit keys correctly', () => {
      const event = { code: 'Digit5' } as KeyboardEvent;
      expect(matchesKeyCode(event, '5')).toBe(true);
      expect(matchesKeyCode(event, '4')).toBe(false);
    });

    it('should match special keys correctly', () => {
      const spaceEvent = { code: 'Space' } as KeyboardEvent;
      expect(matchesKeyCode(spaceEvent, ' ')).toBe(true);
      expect(matchesKeyCode(spaceEvent, 'Space')).toBe(true);
      
      const enterEvent = { code: 'Enter' } as KeyboardEvent;
      expect(matchesKeyCode(enterEvent, 'Enter')).toBe(true);
      expect(matchesKeyCode(enterEvent, 'Return')).toBe(true);
    });

    it('should handle international layouts', () => {
      // Simulate Russian layout where physical KeyA produces 'Ф'
      const event = { 
        code: 'KeyA',  // Physical key position
        key: 'Ф'      // Character in Russian layout
      } as KeyboardEvent;
      
      expect(matchesKeyCode(event, 'A')).toBe(true); // Should work with physical key
    });
  });

  describe('getAllKeyMappings', () => {
    it('should return array of all mappings', () => {
      const mappings = getAllKeyMappings();
      expect(mappings.length).toBeGreaterThan(0);
      expect(mappings[0]).toHaveProperty('key');
      expect(mappings[0]).toHaveProperty('code');
      expect(mappings[0]).toHaveProperty('description');
    });

    it('should include letter mappings', () => {
      const mappings = getAllKeyMappings();
      const aMapping = mappings.find(m => m.key === 'A');
      expect(aMapping).toBeDefined();
      expect(aMapping?.code).toBe('KeyA');
    });
  });

  describe('isValidKeyCode', () => {
    it('should validate existing key codes', () => {
      expect(isValidKeyCode('KeyA')).toBe(true);
      expect(isValidKeyCode('Digit5')).toBe(true);
      expect(isValidKeyCode('Space')).toBe(true);
      expect(isValidKeyCode('Enter')).toBe(true);
    });

    it('should reject invalid key codes', () => {
      expect(isValidKeyCode('InvalidKey')).toBe(false);
      expect(isValidKeyCode('KeyAA')).toBe(false);
      expect(isValidKeyCode('')).toBe(false);
    });
  });

  describe('International layout support', () => {
    it('should provide layout-agnostic key detection', () => {
      // Test various international scenarios
      const testCases = [
        { physicalKey: 'KeyA', expectedKey: 'A', layout: 'Russian (Ф)' },
        { physicalKey: 'KeyS', expectedKey: 'S', layout: 'Russian (Ы)' },
        { physicalKey: 'KeyD', expectedKey: 'D', layout: 'Russian (В)' },
        { physicalKey: 'KeyN', expectedKey: 'N', layout: 'Russian (Т)' }
      ];

      testCases.forEach(testCase => {
        expect(getKeyCode(testCase.expectedKey)).toBe(testCase.physicalKey);
      });
    });
  });
});
