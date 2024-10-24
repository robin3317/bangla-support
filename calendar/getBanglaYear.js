import {
  errorMessage,
  formatYear,
  getJulianDate,
  isValidDate,
  startJulianDate,
  yearLength,
} from './utils.js'

function getYearIN(year, month, day) {
  const julianDate = getJulianDate(year, month + 1, day)
  if (julianDate < startJulianDate) {
    throw new Error(errorMessage)
  }
  return Math.floor((julianDate - startJulianDate) / yearLength) + 1
}

function getBanglaYear(
  date = new Date(),
  options = {format: 'YYYY', calculationMethod: 'BD'}
) {
  if (!isValidDate(date)) {
    throw new Error(errorMessage)
  }
  const inputDate = new Date(date)
  const day = inputDate.getUTCDate()
  const month = inputDate.getMonth()
  const year = inputDate.getFullYear()
  const {format, calculationMethod} = options
  if (calculationMethod === 'IN') {
    return formatYear(getYearIN(year, month, day), format)
  }
  let banglaYear = year - 593
  if (month < 3 || (month === 3 && day < 14)) {
    banglaYear = year - 594
  }
  if (banglaYear < 1) {
    throw new Error(errorMessage)
  }
  return formatYear(banglaYear, format)
}

export {getBanglaYear}
