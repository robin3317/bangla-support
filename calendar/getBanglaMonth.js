import {
  errorMessage,
  formatMonth,
  getJulianDate,
  isValidDate,
  monthLengthIN,
  startJulianDate,
  yearLength,
} from './utils.js'

function getMonthIN(year, month, day) {
  const julianDate = getJulianDate(year, month + 1, day)
  if (julianDate < startJulianDate) {
    throw new Error(errorMessage)
  }
  const banglaYear = Math.floor((julianDate - startJulianDate) / yearLength)
  const calculatedJulianDate = startJulianDate + banglaYear * yearLength
  let ps
  let ns
  let banglaMonth
  for (let i = 0; i < 12; i += 1) {
    ps = calculatedJulianDate + monthLengthIN[i]
    ns = calculatedJulianDate + monthLengthIN[i + 1]
    if (julianDate >= ps && julianDate <= Math.floor(ns) + 1.75) {
      banglaMonth = i + 1
    }
  }
  return banglaMonth - 1
}

function getMonthBD(day, month) {
  let result
  switch (true) {
    case (month === 4 && day > 14) || (month === 5 && day < 15):
      result = 1
      break
    case (month === 5 && day > 14) || (month === 6 && day < 16):
      result = 2
      break
    case (month === 6 && day > 15) || (month === 7 && day < 16):
      result = 3
      break
    case (month === 7 && day > 15) || (month === 8 && day < 16):
      result = 4
      break
    case (month === 8 && day > 15) || (month === 9 && day < 17):
      result = 5
      break
    case (month === 9 && day > 16) || (month === 10 && day < 16):
      result = 6
      break
    case (month === 10 && day > 15) || (month === 11 && day < 16):
      result = 7
      break
    case (month === 11 && day > 15) || (month === 0 && day < 15):
      result = 8
      break
    case (month === 0 && day > 14) || (month === 1 && day < 14):
      result = 9
      break
    case (month === 1 && day > 13) || (month === 2 && day < 15):
      result = 10
      break
    case (month === 2 && day > 14) || (month === 3 && day < 14):
      result = 11
      break
    default:
      result = 0
      break
  }
  return result
}

function getBanglaMonth(
  date = new Date(),
  options = {format: 'MMMM', country: 'BD'}
) {
  if (!isValidDate(date)) {
    throw new Error(errorMessage)
  }
  const inputDate = new Date(date)
  const day = inputDate.getUTCDate()
  const month = inputDate.getMonth()
  const year = inputDate.getFullYear()
  const {format = 'MMMM', country = 'BD'} = options
  const banglaMonth =
    country === 'BD' ? getMonthBD(day, month) : getMonthIN(year, month, day)
  return formatMonth(banglaMonth, format)
}

export {getBanglaMonth}
