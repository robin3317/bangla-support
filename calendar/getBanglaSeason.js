import {banglaMonths, banglaSeasons} from '../constants.js'
import {getBanglaMonth} from './getBanglaMonth.js'
import {errorMessage, isValidDate} from './utils.js'

function getBanglaSeason(
  date = new Date(),
  options = {format: 'MMMM', calculationMethod: 'BD'}
) {
  if (!isValidDate(date)) {
    throw new Error(errorMessage)
  }
  const {format = 'MMMM', calculationMethod = 'BD'} = options
  const inputDate = new Date(date)
  const banglaMonth = getBanglaMonth(inputDate, {format, calculationMethod})
  const monthIndex = banglaMonths.indexOf(banglaMonth)
  const seasonIndex = Math.ceil((monthIndex + 1) / 2)
  return banglaSeasons[seasonIndex - 1]
}

export {getBanglaSeason}
