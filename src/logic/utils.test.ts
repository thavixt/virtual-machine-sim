import { describe, it, expect } from 'vitest';
import { getRandomInt, getRandomKey, getRandomTape, padString } from './utils';

describe('getRandomInt', () => {
  it('should return a number between the specified min and max', () => {
    const min = 1;
    const max = 10;
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('should return a number between 0 and 1 when no arguments are provided', () => {
    const result = getRandomInt();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  it('should handle negative numbers', () => {
    const min = -10;
    const max = -1;
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('should handle min and max being the same', () => {
    const min = 5;
    const max = 5;
    const result = getRandomInt(min, max);
    expect(result).toBe(min);
  });
});

describe('getRandomInt', () => {
  it('should return a number between the specified min and max', () => {
    const min = 1;
    const max = 10;
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('should return a number between 0 and 1 when no arguments are provided', () => {
    const result = getRandomInt();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  it('should handle negative numbers', () => {
    const min = -10;
    const max = -1;
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('should handle min and max being the same', () => {
    const min = 5;
    const max = 5;
    const result = getRandomInt(min, max);
    expect(result).toBe(min);
  });
});

describe('getRandomTape', () => {
  it('should return a tape of the specified length', () => {
    const length = 50;
    const tape = getRandomTape(length);
    expect(tape).toHaveLength(length);
  });

  it('should return a tape with values between the specified min and max', () => {
    const length = 50;
    const min = 1;
    const max = 10;
    const tape = getRandomTape(length, min, max);
    tape.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThanOrEqual(max);
    });
  });

  it('should return a tape with values between 0 and 1 when no min and max are provided', () => {
    const length = 50;
    const tape = getRandomTape(length);
    tape.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    });
  });

  it('should handle negative min and max values', () => {
    const length = 50;
    const min = -10;
    const max = -1;
    const tape = getRandomTape(length, min, max);
    tape.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThanOrEqual(max);
    });
  });

  it('should handle min and max being the same', () => {
    const length = 50;
    const min = 5;
    const max = 5;
    const tape = getRandomTape(length, min, max);
    tape.forEach(value => {
      expect(value).toBe(min);
    });
  });
});

describe('getRandomKey', () => {
  it('should return a key from the object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const fallback = 'fallback';
    const key = getRandomKey(obj, fallback);
    expect(Object.keys(obj)).toContain(key);
  });

  it('should return the fallback if the object is empty', () => {
    const obj = {};
    const fallback = 'fallback';
    const key = getRandomKey(obj, fallback);
    expect(key).toBe(fallback);
  });

  it('should throw an error if the object is empty and no fallback is provided', () => {
    const obj = {};
    expect(() => getRandomKey(obj, '')).toThrow('Object [object Object] has no keys, no fallback provided');
  });

  it('should handle objects with a single key', () => {
    const obj = { a: 1 };
    const fallback = 'fallback';
    const key = getRandomKey(obj, fallback);
    expect(key).toBe('a');
  });

  it('should handle objects with multiple keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const fallback = 'fallback';
    const key = getRandomKey(obj, fallback);
    expect(['a', 'b', 'c']).toContain(key);
  });
});

describe('padString', () => {
  it('should pad the string to the specified length with the default pad character', () => {
    const str = 'test';
    const length = 10;
    const result = padString(str, length);
    expect(result).toBe('test      ');
  });

  it('should pad the string to the specified length with the provided pad character', () => {
    const str = 'test';
    const length = 10;
    const pad = '-';
    const result = padString(str, length, pad);
    expect(result).toBe('test------');
  });

  it('should return the original string if it is already the specified length', () => {
    const str = 'test';
    const length = 4;
    const result = padString(str, length);
    expect(result).toBe('test');
  });

  it('should return the original string if it is longer than the specified length', () => {
    const str = 'test';
    const length = 2;
    const result = padString(str, length);
    expect(result).toBe('test');
  });

  it('should handle an empty string', () => {
    const str = '';
    const length = 5;
    const result = padString(str, length);
    expect(result).toBe('     ');
  });

  it('should handle a pad character longer than one character', () => {
    const str = 'test';
    const length = 10;
    const pad = '--';
    const result = padString(str, length, pad);
    expect(result).toBe('test------');
  });
});
