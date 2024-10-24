import {errorMessage, formatDayName, isValidDate} from './utils.js'

function getBanglaDayName(date = new Date(), options = {format: 'eeee'}) {
  if (!isValidDate(date)) return errorMessage
  const inputDate = new Date(date)
  const day = inputDate.getDay()
  return formatDayName(day, options.format)
}

export {getBanglaDayName}
