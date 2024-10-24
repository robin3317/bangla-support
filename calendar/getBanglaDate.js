import {getDay} from './getBanglaDay.js'
import {getWeekDay} from './getBanglaDayName.js'
import {getMonth} from './getBanglaMonth.js'
import {getYear} from './getBanglaYear.js'
import {errorMessage, isValidDate} from './utils.js'

const defaultOptions = {
  format: 'eeee, D MMMM, YYYY',
  calculationMethod: 'BD',
}

function getBanglaDate(date = new Date(), options = defaultOptions) {
  if (!isValidDate(date)) {
    throw new Error(errorMessage)
  }
  const inputDate = new Date(date)
  inputDate.setTime(
    inputDate.getTime() + (inputDate.getTimezoneOffset() + 360) * 60 * 1000
  )
  const {format, calculationMethod} = options

  let formattedDate = format.replace(/eeee|eee/gi, function (fmt) {
    switch (fmt) {
      case 'eee':
        return getWeekDay(inputDate, {
          format: 'eee',
          calculationMethod: calculationMethod,
        })
      default:
        return getWeekDay(inputDate, {calculationMethod: calculationMethod})
    }
  })
  formattedDate = formattedDate.replace(/DD|D/gi, function (fmt) {
    switch (fmt) {
      case 'DD':
        return getDay(inputDate, {
          format: 'DD',
          calculationMethod: calculationMethod,
        })
      default:
        return getDay(inputDate, {calculationMethod: calculationMethod})
    }
  })
  formattedDate = formattedDate.replace(/MMMM|MM|M/gi, function (fmt) {
    switch (fmt) {
      case 'M':
        return getMonth(inputDate, {
          format: 'M',
          calculationMethod: calculationMethod,
        })
      case 'MM':
        return getMonth(inputDate, {
          format: 'MM',
          calculationMethod: calculationMethod,
        })
      default:
        return getMonth(inputDate, {calculationMethod: calculationMethod})
    }
  })
  formattedDate = formattedDate.replace(/YYYYb|YYYY|YY/gi, function (fmt) {
    switch (fmt) {
      case 'YY':
        return getYear(inputDate, {
          format: 'YY',
          calculationMethod: calculationMethod,
        })
      case 'YYYYb':
        return getYear(inputDate, {
          format: 'YYYYb',
          calculationMethod: calculationMethod,
        })
      default:
        return getYear(inputDate, {calculationMethod: calculationMethod})
    }
  })
  return formattedDate
}

export {getBanglaDate}
