import {
  errorMessage,
  formatDay,
  getJulianDate,
  isLeapYear,
  isValidDate,
  monthLengthIN,
  startJulianDate,
  yearLength,
} from './utils.js'

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
  var banglaYear = Math.floor((julianDate - startJulianDate) / yearLength)
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
  return banglaDay
}

const defaultOptions = {format: 'D', calculationMethod: 'BD'}

/**
 * Get bangla day
 * @param {Date} date - The date to format.
 * @param {Object} options - The options to format the date.
 * @returns {String} The formatted date(day number).
 */
function getBanglaDay(date = new Date(), options = defaultOptions) {
  if (!isValidDate(date)) {
    throw new Error(errorMessage)
  }
  const inputDate = new Date(date)
  inputDate.setTime(
    inputDate.getTime() + (inputDate.getTimezoneOffset() + 360) * 60 * 1000
  )
  const day = inputDate.getUTCDate()
  const month = inputDate.getMonth()
  const year = inputDate.getFullYear()
  const {
    format = defaultOptions.format,
    calculationMethod = defaultOptions.calculationMethod,
  } = options
  const banglaDay =
    calculationMethod === 'BD'
      ? getDayBD(day, month, year)
      : getDayIN(day, month, year)
  return formatDay(banglaDay, format)
}

export {getBanglaDay}
