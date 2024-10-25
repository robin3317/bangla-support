import {banglaDays, banglaMonths} from '../constants.js'

function convertNumbers(data) {
  const numbers = {
    0: '০',
    1: '১',
    2: '২',
    3: '৩',
    4: '৪',
    5: '৫',
    6: '৬',
    7: '৭',
    8: '৮',
    9: '৯',
    '.': '.',
    '-': '-',
  }
  let result = ''
  if (!data) {
    return ''
  }
  const input = data.toString()
  const length = input.length
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    if (Number.isNaN(parseFloat(input[i])) || Number.isNaN(input[i] - 0)) {
      result += input[i]
    } else {
      result += numbers[input[i]]
    }
  }
  return result
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
      return convertNumbers(d)
    default:
      return convertNumbers(day)
  }
}

function formatDayName(day = 0, format = 'eeee') {
  switch (format) {
    case 'eee':
      return banglaDays[day]
    default:
      return ''.concat(banglaDays[day], '\u09AC\u09BE\u09B0')
  }
}

function formatMonth(month = 0, format = 'MMMM') {
  let m = (month + 1).toString()
  switch (format) {
    case 'M':
      return convertNumbers(m)
    case 'MM':
      m = m.length === 1 ? '0'.concat(m) : m
      return convertNumbers(m)
    default:
      return banglaMonths[month]
  }
}

function formatYear(year = 0, format = 'YYYY') {
  const y = year.toString()
  switch (format) {
    case 'YY':
      return convertNumbers(y.substring(y.length - 2))
    case 'YYYYb':
      return ''.concat(
        convertNumbers(y),
        ' (\u09AC\u0999\u09CD\u0997\u09BE\u09AC\u09CD\u09A6)'
      )
    default:
      return convertNumbers(y)
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

const monthLengthIN = [
  0, 30.93081, 62.35364, 93.9999999999999, 125.47636, 156.48933, 186.92405,
  216.3179999, 246.3153999, 275.14288, 305.09428, 334.91145, 365.258756,
]

const startJulianDate = 1938094.4629
const yearLength = 365.258756
const errorMessage = 'Invalid Date'

export {
  convertNumbers,
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
  yearLength,
}
