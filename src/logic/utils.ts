import { ITape } from "../types";

export async function sleep(ms = 200) {
  return new Promise(res => setTimeout(res, ms));
}

/**
 * Get a random in between `min` and `max`
 */
export function getRandomInt(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a `length` sized `Tape` with random values between `min` and `max`
 * 
 * Minimum 10 tape length - always
 */
export function getRandomTape(length = 100, min?: number, max?: number): ITape {
  return Array(Math.max(length, 5)).fill(0).map(() => getRandomInt(min, max));
}

/**
 * Get a random key of an object
 */
export function getRandomKey<T extends Record<string, unknown>>(o: T, fallback: string): string {
  const keys = Object.keys(o);
  const i = getRandomInt(0, keys.length - 1);
  const selectedKey = keys[i] ?? fallback;

  if (!selectedKey) {
    throw new Error(`Object ${o} has no keys, no fallback provided`);
  }

  return selectedKey;
}

/**
 * Pad string until `length` long with `pad` characters
 * 
 * Returns a string that **will preserve whitespace** in HTML
 */
export function padString(str: string, length: number, pad: string = ' '): string {
  let result = str;
  while (result.length < length) {
    result += pad;
  }
  return decodeURI(result.replace(/ /g, "%C2%A0")); // bytes C2A0, U+00A0, Unicode for non-breaking space
}