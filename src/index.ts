/**
 * Utils for working with keypaths (e.g., `some.object[0].key`)
 *
 * @packageDocumentation
 */

import {identifierRegex} from './identifier-regex.js';

/**
 * Matches a string that can be displayed as an integer when converted to a
 * string (via `toString()`). This would represent the index of an array.
 *
 * It may not be a
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger safe integer},
 * but it's an integer.
 */
const INT_STRING_REGEXP = /^(?:0|[1-9][0-9]*)$/;

/**
 * Matches a string wrapped in single or double quotes
 */
const WRAPPED_QUOTE_REGEXP = /^["'](?<content>.+)["']$/;

/**
 * Returns `true` if `key` can be coerced to an integer, which will cause it to
 * be wrapped in brackets (`[${key}]`) when used as a key in an object
 *
 * @param key Some string
 * @returns `true` if `key` can be coerced to an integer
 */
const isIntegerLike = (key: string): boolean => INT_STRING_REGEXP.test(key);

const isIdentifier = (value: string) => identifierRegex.test(value);

/**
 * Converts a {@link Keypath} to a string using dots or braces as appropriate
 *
 * @template T Keypath array
 * @param path Keypath to format
 * @returns Formatted keypath
 */
export const toKeypath = <const T extends readonly string[]>(
  path: T,
): string => {
  if (!path?.length) {
    return '';
  }
  return path.reduce((output, key) => {
    key = key.replace(WRAPPED_QUOTE_REGEXP, '$<content>');

    if (isIntegerLike(key)) {
      return `${output}[${key}]`;
    }
    return isIdentifier(key) ? `${output}.${key}` : `${output}["${key}"]`;
  });
};
