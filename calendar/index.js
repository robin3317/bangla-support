import {banglaDays, banglaMonths, banglaSeasons} from './constants.js'

export const getBanglaMonths = () => banglaMonths
export const getBanglaDays = (format) => {
  if (format === 'eeee')
    return banglaDays.map((day) => `${day}\u09AC\u09BE\u09B0`)
  return banglaDays
}
export const getBanglaSeasons = () => banglaSeasons

export {getBanglaDate} from './getBanglaDate.js'
export {getBanglaDay} from './getBanglaDay.js'
export {getBanglaDayName} from './getBanglaDayName.js'
export {getBanglaMonth} from './getBanglaMonth.js'
export {getBanglaYear} from './getBanglaYear.js'
