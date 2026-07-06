import {banglaDays, banglaMonths} from '../constants.js'
import {toBanglaDigits} from '../digit.js'

/*
 * Timezone contract of this package:
 *
 *   input Date (absolute instant)
 *          │  + country offset (BD = UTC+6:00, IN = UTC+5:30)
 *          ▼
 *   shifted Date ──getUTC*()──► {day, month, year, weekday}
 *                                (Gregorian wall-clock parts in the
 *                                 country's timezone)
 *
 * Every calendar function derives its Gregorian parts from
 * toCalendarParts() and ONLY from it. Normalizing exactly once, with
 * exclusively UTC getters, is what makes the output independent of the
 * machine's local timezone. Do not call getDate()/getMonth()/getDay()
 * (the local variants) anywhere in this package.
 */

const COUNTRY_UTC_OFFSET_MINUTES = {
  BD: 360, // Asia/Dhaka, UTC+6:00
  IN: 330, // Asia/Kolkata, UTC+5:30
}

const errorMessage = 'Invalid Date'

/**
 * Normalize an absolute instant to Gregorian wall-clock parts in the
 * selected country's timezone.
 * @param {Date} date - The instant to normalize.
 * @param {string} [country] - 'BD' or 'IN'.
 * @returns {{day: number, month: number, year: number, weekday: number}}
 */
function toCalendarParts(date, country = 'BD') {
  if (!isValidDate(date)) {
    throw new Error(errorMessage)
  }
  const offset = COUNTRY_UTC_OFFSET_MINUTES[country] ?? COUNTRY_UTC_OFFSET_MINUTES.BD
  const shifted = new Date(date.getTime() + offset * 60 * 1000)
  return {
    day: shifted.getUTCDate(),
    month: shifted.getUTCMonth(),
    year: shifted.getUTCFullYear(),
    weekday: shifted.getUTCDay(),
  }
}

function isLeapYear(year = 0) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
}

function isValidDate(date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(date)) {
      return false
    }
    return true
  }
  return false
}

function formatDay(day = 1, format = 'D') {
  let d = day.toString()
  switch (format) {
    case 'DD':
      d = d.length === 1 ? '0'.concat(d) : d
      return toBanglaDigits(d)
    default:
      return toBanglaDigits(day)
  }
}

function formatDayName(day = 0, format = 'eeee') {
  switch (format) {
    case 'eee':
      return banglaDays[day]
    default:
      return ''.concat(banglaDays[day], 'বার')
  }
}

function formatMonth(month = 0, format = 'MMMM') {
  let m = (month + 1).toString()
  switch (format) {
    case 'M':
      return toBanglaDigits(m)
    case 'MM':
      m = m.length === 1 ? '0'.concat(m) : m
      return toBanglaDigits(m)
    default:
      return banglaMonths[month]
  }
}

function formatYear(year = 0, format = 'YYYY') {
  const y = year.toString()
  switch (format) {
    case 'YY':
      return toBanglaDigits(y.substring(y.length - 2))
    case 'YYYYb':
      return ''.concat(
        toBanglaDigits(y),
        ' (বঙ্গাব্দ)'
      )
    default:
      return toBanglaDigits(y)
  }
}

function getJulianDate(year, month, day) {
  let y = year
  let m = month
  if (month <= 2) {
    y -= 1
    m += 12
  }
  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  const JD =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5
  return JD
}

// IN mode approximates the astronomical (Surya Siddhanta-style) Bengali
// calendar: startJulianDate ≈ 594 CE, the Bengali era epoch. See TODOS.md
// for the plan to verify against a published panjika.
const monthLengthIN = [
  0, 30.93081, 62.35364, 93.9999999999999, 125.47636, 156.48933, 186.92405,
  216.3179999, 246.3153999, 275.14288, 305.09428, 334.91145, 365.258756,
]

const startJulianDate = 1938094.4629
const yearLength = 365.258756

export {
  errorMessage,
  formatDay,
  formatDayName,
  formatMonth,
  formatYear,
  getJulianDate,
  isLeapYear,
  isValidDate,
  monthLengthIN,
  startJulianDate,
  toCalendarParts,
  yearLength,
}
