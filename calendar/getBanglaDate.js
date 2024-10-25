import {getBanglaDay} from './getBanglaDay.js'
import {getBanglaDayName} from './getBanglaDayName.js'
import {getBanglaMonth} from './getBanglaMonth.js'
import {getBanglaYear} from './getBanglaYear.js'
import {errorMessage, isValidDate} from './utils.js'

const defaultOptions = {
  format: 'eeee, D MMMM, YYYY',
  country: 'BD',
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
  const {format = defaultOptions.format, country = defaultOptions.country} =
    options

  let formattedDate = format.replace(/eeee|eee/gi, function (fmt) {
    switch (fmt) {
      case 'eee':
        return getBanglaDayName(inputDate, {
          format: 'eee',
          country: country,
        })
      default:
        return getBanglaDayName(inputDate, {
          country: country,
        })
    }
  })
  formattedDate = formattedDate.replace(/DD|D/gi, function (fmt) {
    switch (fmt) {
      case 'DD':
        return getBanglaDay(inputDate, {
          format: 'DD',
          country: country,
        })
      default:
        return getBanglaDay(inputDate, {country: country})
    }
  })
  formattedDate = formattedDate.replace(/MMMM|MM|M/gi, function (fmt) {
    switch (fmt) {
      case 'M':
        return getBanglaMonth(inputDate, {
          format: 'M',
          country: country,
        })
      case 'MM':
        return getBanglaMonth(inputDate, {
          format: 'MM',
          country: country,
        })
      default:
        return getBanglaMonth(inputDate, {country: country})
    }
  })
  formattedDate = formattedDate.replace(/YYYYb|YYYY|YY/gi, function (fmt) {
    switch (fmt) {
      case 'YY':
        return getBanglaYear(inputDate, {
          format: 'YY',
          country: country,
        })
      case 'YYYYb':
        return getBanglaYear(inputDate, {
          format: 'YYYYb',
          country: country,
        })
      default:
        return getBanglaYear(inputDate, {country: country})
    }
  })
  return formattedDate
}

export {getBanglaDate}
