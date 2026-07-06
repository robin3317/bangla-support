import {banglaSeasons} from '../constants.js'
import {banglaMonthIndexFromParts} from './getBanglaMonth.js'
import {toCalendarParts} from './utils.js'

/**
 * Get bangla season
 * @param {Date} date - The date to find the season for.
 * @param {Object} options - Options ({country}). A format option, if
 *   passed, is ignored — a season has no numeric form.
 * @returns {String} The season name.
 */
function getBanglaSeason(date = new Date(), options = {}) {
  const {country = 'BD'} = options
  const monthIndex = banglaMonthIndexFromParts(toCalendarParts(date, country), country)
  // Two Bangla months per season: বৈশাখ+জ্যৈষ্ঠ=গ্রীষ্ম … ফাল্গুন+চৈত্র=বসন্ত
  return banglaSeasons[Math.floor(monthIndex / 2)]
}

export {getBanglaSeason}
