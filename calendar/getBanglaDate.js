import {getBanglaDay} from './getBanglaDay.js'
import {getBanglaDayName} from './getBanglaDayName.js'
import {getBanglaMonth} from './getBanglaMonth.js'
import {getBanglaYear} from './getBanglaYear.js'
import {errorMessage, isValidDate} from './utils.js'

const defaultOptions = {
  format: 'eeee, D MMMM, YYYY',
  calculationMethod: 'BD',
}

/**
 * Get bangla date
 * @param {Date} date - The date to format.
 * @param {Object} options - The options to format the date.
 * @returns {String} The formatted date.
 */
function getBanglaDate(date = new Date(), options = defaultOptions) {
  if (!isValidDate(date)) {
    throw new Error(errorMessage)
  }
  const inputDate = new Date(date)
  inputDate.setTime(
    inputDate.getTime() + (inputDate.getTimezoneOffset() + 360) * 60 * 1000
  )
  const {
    format = defaultOptions.format,
    calculationMethod = defaultOptions.calculationMethod,
  } = options

  let formattedDate = format.replace(/eeee|eee/gi, function (fmt) {
    switch (fmt) {
      case 'eee':
        return getBanglaDayName(inputDate, {
          format: 'eee',
          calculationMethod: calculationMethod,
        })
      default:
        return getBanglaDayName(inputDate, {
          calculationMethod: calculationMethod,
        })
    }
  })
  formattedDate = formattedDate.replace(/DD|D/gi, function (fmt) {
    switch (fmt) {
      case 'DD':
        return getBanglaDay(inputDate, {
          format: 'DD',
          calculationMethod: calculationMethod,
        })
      default:
        return getBanglaDay(inputDate, {calculationMethod: calculationMethod})
    }
  })
  formattedDate = formattedDate.replace(/MMMM|MM|M/gi, function (fmt) {
    switch (fmt) {
      case 'M':
        return getBanglaMonth(inputDate, {
          format: 'M',
          calculationMethod: calculationMethod,
        })
      case 'MM':
        return getBanglaMonth(inputDate, {
          format: 'MM',
          calculationMethod: calculationMethod,
        })
      default:
        return getBanglaMonth(inputDate, {calculationMethod: calculationMethod})
    }
  })
  formattedDate = formattedDate.replace(/YYYYb|YYYY|YY/gi, function (fmt) {
    switch (fmt) {
      case 'YY':
        return getBanglaYear(inputDate, {
          format: 'YY',
          calculationMethod: calculationMethod,
        })
      case 'YYYYb':
        return getBanglaYear(inputDate, {
          format: 'YYYYb',
          calculationMethod: calculationMethod,
        })
      default:
        return getBanglaYear(inputDate, {calculationMethod: calculationMethod})
    }
  })
  return formattedDate
}

export {getBanglaDate}
