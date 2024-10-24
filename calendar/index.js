import {banglaDays, banglaMonths, banglaSeasons} from './../constants.js'
import {getBanglaDate} from './getBanglaDate.js'
import {getBanglaDay} from './getBanglaDay.js'
import {getBanglaDayName} from './getBanglaDayName.js'
import {getBanglaMonth} from './getBanglaMonth.js'
import {getBanglaSeason} from './getBanglaSeason.js'
import {getBanglaYear} from './getBanglaYear.js'

export const getBanglaMonths = () => banglaMonths
export const getBanglaDays = (format) => {
  if (format === 'eeee')
    return banglaDays.map((day) => `${day}\u09AC\u09BE\u09B0`)
  return banglaDays
}
export const getBanglaSeasons = () => banglaSeasons

export {
  getBanglaDate,
  getBanglaDay,
  getBanglaDayName,
  getBanglaMonth,
  getBanglaSeason,
  getBanglaYear,
}
