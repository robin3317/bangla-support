import {formatDayName, toCalendarParts} from './utils.js'

/**
 * Get bangla day name
 * @param {Date} date - The date to format.
 * @param {Object} options - The options to format the day name.
 * @returns {String} The formatted day name.
 */
function getBanglaDayName(date = new Date(), options = {}) {
  const {format = 'eeee', country = 'BD'} = options
  // Throws on invalid input like every sibling function (toCalendarParts
  // validates); the weekday follows the same instant-in-country contract.
  const {weekday} = toCalendarParts(date, country)
  return formatDayName(weekday, format)
}

export {getBanglaDayName}
