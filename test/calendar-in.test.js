import {describe, expect, it} from 'vitest'
import {
  getBanglaDate,
  getBanglaDay,
  getBanglaMonth,
  getBanglaSeason,
  getBanglaYear,
} from '../index.js'

// The IN path approximates the astronomical (Surya Siddhanta-style) Bengali
// calendar. There is no single official authority for it, so these values
// are CHARACTERIZED from the library's own output (captured 2026-07-06),
// not independently verified — see TODOS for the verification plan.
// Instants at 08:00 UTC sit inside one civil day in UTC/Dhaka/Kolkata,
// so the expectations are timezone-safe.
const utc = (y, m, d) => new Date(Date.UTC(y, m, d, 8, 0, 0))
const IN = {country: 'IN'}

describe('IN characterization (pinned behavior, not verified truth)', () => {
  const pinned = [
    [utc(2026, 3, 15), '১', 'বৈশাখ', '১৪৩৩', 'গ্রীষ্ম'],
    [utc(2026, 0, 15), '১', 'মাঘ', '১৪৩২', 'শীত'],
    [utc(2025, 7, 20), '৩', 'ভাদ্র', '১৪৩২', 'শরৎ'],
    [utc(2024, 10, 5), '১৯', 'কার্তিক', '১৪৩১', 'হেমন্ত'],
  ]

  it.each(pinned)('%s → %s %s %s (%s)', (date, day, month, year, season) => {
    expect(getBanglaDay(date, IN)).toBe(day)
    expect(getBanglaMonth(date, IN)).toBe(month)
    expect(getBanglaYear(date, IN)).toBe(year)
    expect(getBanglaSeason(date, IN)).toBe(season)
  })

  it('composes through getBanglaDate', () => {
    expect(getBanglaDate(utc(2026, 3, 15), {format: 'D MMMM YYYY', country: 'IN'})).toBe(
      '১ বৈশাখ ১৪৩৩'
    )
  })

  it('throws for dates before the Bengali era epoch (~594 CE)', () => {
    expect(() => getBanglaDay(utc(500, 0, 1), IN)).toThrow('Invalid Date')
    expect(() => getBanglaYear(utc(500, 0, 1), IN)).toThrow('Invalid Date')
  })
})
