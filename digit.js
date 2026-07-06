import {banglaDigit} from './constants.js'

/**
 * Convert every Latin digit in a value to its Bangla numeral.
 * Non-digit characters ('.', '-', letters, …) pass through unchanged.
 * Internal single source of truth for digit rendering — every formatter
 * in the package routes through this.
 * @param {string|number} value
 * @returns {string}
 */
export const toBanglaDigits = (value) =>
  String(value).replace(/\d/g, (d) => banglaDigit[+d])

/**
 * Get bangla digit
 * @param {string|number} [digit] - The value to convert. When omitted
 *   (or null), returns the array of the ten Bangla digit characters.
 * @returns {string|readonly string[]}
 */
export const getBanglaDigit = (digit) => {
  // == null, not a falsy check: 0 and '' are real inputs to convert;
  // only "no argument" returns the digit array (documented API).
  if (digit == null) return banglaDigit
  return toBanglaDigits(digit)
}

/**
 * Check whether a value consists only of Bangla digit characters.
 * @param {string} digit
 * @returns {boolean}
 */
export const isBanglaDigit = (digit) => {
  return /^[০-৯]+$/.test(digit)
}
