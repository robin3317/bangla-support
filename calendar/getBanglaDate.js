import {banglaDayFromParts} from './getBanglaDay.js'
import {banglaMonthFromParts} from './getBanglaMonth.js'
import {banglaYearFromParts} from './getBanglaYear.js'
import {formatDayName, toCalendarParts} from './utils.js'

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
function getBanglaDate(date = new Date(), options = {}) {
  const {format = defaultOptions.format, country = defaultOptions.country} =
    options
  // Normalize the instant exactly once; every token renders from the same
  // parts, so day/month/year can never disagree.
  const parts = toCalendarParts(date, country)

  // Token matching is case-insensitive (pinned behavior): an unrecognized
  // casing like 'dd' or 'mm' falls through to each formatter's default
  // variant. Bangla replacements contain no ASCII letters, so later
  // replacements never touch earlier output.
  return format
    .replace(/eeee|eee/gi, (fmt) => formatDayName(parts.weekday, fmt))
    .replace(/DD|D/gi, (fmt) => banglaDayFromParts(parts, fmt, country))
    .replace(/MMMM|MM|M/gi, (fmt) => banglaMonthFromParts(parts, fmt, country))
    .replace(/YYYYb|YYYY|YY/gi, (fmt) => banglaYearFromParts(parts, fmt, country))
}

export {getBanglaDate}
