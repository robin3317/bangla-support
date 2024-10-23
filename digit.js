import {banglaDigit} from './constants.js'

export const getBanglaDigit = (digit) => {
  if (!digit) return banglaDigit
  return digit.toString().replace(/\d/g, (d) => banglaDigit[+d])
}

export const isBanglaDigit = (digit) => {
  return /^[০-৯]+$/.test(digit)
}
