import {
  errorMessage,
  formatYear,
  getJulianDate,
  startJulianDate,
  toCalendarParts,
  yearLength,
} from './utils.js'

function getYearIN(year, month, day) {
  const julianDate = getJulianDate(year, month + 1, day)
  if (julianDate < startJulianDate) {
    throw new Error(errorMessage)
  }
  return Math.floor((julianDate - startJulianDate) / yearLength) + 1
}

/**
 * Format the Bangla year from already-normalized calendar parts.
 * @param {{day: number, month: number, year: number}} parts
 * @param {string} [format]
 * @param {string} [country]
 * @returns {string}
 */
function banglaYearFromParts(parts, format = 'YYYY', country = 'BD') {
  const {day, month, year} = parts
  if (country === 'IN') {
    return formatYear(getYearIN(year, month, day), format)
  }
  // BD: the year increments on Pohela Boishakh (Apr 14).
  let banglaYear = year - 593
  if (month < 3 || (month === 3 && day < 14)) {
    banglaYear = year - 594
  }
  if (banglaYear < 1) {
    throw new Error(errorMessage)
  }
  return formatYear(banglaYear, format)
}

/**
 * Get bangla year
 * @param {Date} date - The date to format.
 * @param {Object} options - The options to format the date.
 * @returns {String} The formatted year.
 */
function getBanglaYear(date = new Date(), options = {}) {
  const {format = 'YYYY', country = 'BD'} = options
  return banglaYearFromParts(toCalendarParts(date, country), format, country)
}

export {banglaYearFromParts, getBanglaYear}
