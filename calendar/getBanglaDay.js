import {
  errorMessage,
  formatDay,
  getJulianDate,
  isLeapYear,
  monthLengthIN,
  startJulianDate,
  toCalendarParts,
  yearLength,
} from './utils.js'

// Gregorian → Bangla day-of-month for the revised Bangladesh calendar
// (Bangla Academy, 2019). Each Gregorian month spans a Bangla month
// boundary; the pivot day decides which side we are on. The boundary
// table is pinned by test/calendar-bd.test.js against published dates.
function getDayBD(day, month, year) {
  let banglaDay
  switch (month) {
    case 0:
      banglaDay = day < 15 ? day + 16 : day - 14
      break
    case 1:
      banglaDay = day < 14 ? day + 17 : day - 13
      break
    case 2:
      if (isLeapYear(year)) {
        banglaDay = day < 15 ? day + 16 : day - 14
      } else {
        banglaDay = day < 15 ? day + 15 : day - 14
      }
      break
    case 3:
      banglaDay = day < 14 ? day + 17 : day - 13
      break
    case 4:
      banglaDay = day < 15 ? day + 17 : day - 14
      break
    case 5:
      banglaDay = day < 15 ? day + 17 : day - 14
      break
    case 6:
      banglaDay = day < 16 ? day + 16 : day - 15
      break
    case 7:
      banglaDay = day < 16 ? day + 16 : day - 15
      break
    case 8:
      banglaDay = day < 16 ? day + 16 : day - 15
      break
    case 9:
      banglaDay = day < 17 ? day + 15 : day - 16
      break
    case 10:
      banglaDay = day < 16 ? day + 15 : day - 15
      break
    default:
      banglaDay = day < 16 ? day + 15 : day - 15
      break
  }
  return banglaDay
}

function getDayIN(day, month, year) {
  const julianDate = getJulianDate(year, month + 1, day)
  if (julianDate < startJulianDate) {
    throw new Error(errorMessage)
  }
  const banglaYear = Math.floor((julianDate - startJulianDate) / yearLength)
  const calculatedJulianDate = startJulianDate + banglaYear * yearLength
  let ps
  let ns
  let banglaDay
  for (let i = 0; i < 12; i += 1) {
    ps = calculatedJulianDate + monthLengthIN[i]
    ns = calculatedJulianDate + monthLengthIN[i + 1]
    if (julianDate >= ps && julianDate <= Math.floor(ns) + 1.75) {
      banglaDay = Math.floor(julianDate - ps) + 1
    }
  }
  if (banglaDay === undefined) {
    // No month window matched — never return silent empty output.
    throw new Error(errorMessage)
  }
  return banglaDay
}

/**
 * Format the Bangla day-of-month from already-normalized calendar parts.
 * @param {{day: number, month: number, year: number}} parts
 * @param {string} [format]
 * @param {string} [country]
 * @returns {string}
 */
function banglaDayFromParts(parts, format = 'D', country = 'BD') {
  const banglaDay =
    country === 'BD'
      ? getDayBD(parts.day, parts.month, parts.year)
      : getDayIN(parts.day, parts.month, parts.year)
  return formatDay(banglaDay, format)
}

/**
 * Get bangla day
 * @param {Date} date - The date to format.
 * @param {Object} options - The options to format the date.
 * @returns {String} The formatted date(day number).
 */
function getBanglaDay(date = new Date(), options = {}) {
  const {format = 'D', country = 'BD'} = options
  return banglaDayFromParts(toCalendarParts(date, country), format, country)
}

export {banglaDayFromParts, getBanglaDay}
