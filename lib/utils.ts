import { BooleanWrapper } from './crc-div/structure/wrapper';
import { InvalidArgumentException } from './errors';

export const range = (start: number, stop: number, step: number, stopExclusive = true): Array<number> => Array.from({ length: (stop - (stopExclusive ? 1 : 0) - start) / step + 1}, (_, i) => start + (i * step));
export const rangeFn = <T1, T2>(start: number, stop: number, step: number, fn: (v: T1, idx: number) => T2, stopExclusive = true): Array<T2> => Array.from<T1, T2>({ length: (stop - (stopExclusive ? 1 : 0) - start) / step + 1}, (v, i) => fn(v, start + (i * step)));

/**
 * Get the name of something.
 * Usage: nameof({anything})
 * @param obj
 */
export const nameof = <T>(obj: { [key: string]: any } | keyof T): string => {
  if (typeof obj === 'object') {
    const k = Object.keys(obj)[0];
    const v = obj[k];
    return v ? v : k;
  } else {
    if (typeof obj === 'string') return obj;
    else return obj.toString();
  }
}

export function clampNumber(low: number, x: number, high: number): number {
  return x < low ? low : x > high ? high : x;
}

/**
 * Converts a binary string (consisting of only characters '0' and '1')
 * to an array of boolean values.
 * @param {string} str A binary string.
 * @returns {boolean[]} An array of boolean values.
 * @throws {InvalidArgumentException} when the parameter is not a binary string.
 */
export function binStrToArr(str: string): boolean[] {
  const result: boolean[] = [];
  for (const ch of str) {
    if (ch === '0') result.push(false);
    else if (ch === '1') result.push(true);
    else
      throw new InvalidArgumentException(
        `${str} is not a binary string!`,
        nameof({ str })
      );
  }
  return result;
}

/**
 * Converts an array of boolean values
 * to a binary string (consisting of only characters '0' and '1').
 * @param {boolean[]} arr An array of boolean values.
 * @returns {string} A binary string.
 * @throws {InvalidArgumentException} when the parameter is not a binary string.
 */
export function binArrToStr(arr: boolean[]): string {
  return arr
    .map<string>((x) => (x ? '1' : '0'))
    .join('');
}

export function boolWrapArrToBoolArr<T extends BooleanWrapper>(arr: Array<T>): Array<boolean> {
  return arr.map((x) => x.value || false);
}