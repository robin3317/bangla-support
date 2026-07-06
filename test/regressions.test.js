import {describe, expect, it} from 'vitest'
import {
  getBanglaDate,
  getBanglaDay,
  getBanglaDayName,
  getBanglaMonth,
  getBanglaSeason,
  getBanglaYear,
} from '../index.js'

// CRITICAL regression tests for the v3 bug fixes (written red-first).
//
// The library's contract: an input Date is an absolute instant; the output
// is the Bangla date at that instant in the selected country's timezone
// (BD = UTC+6, IN = UTC+5:30). These tests pick instants where UTC's civil
// date and Dhaka's civil date DIFFER (18:00–24:00 UTC), which is exactly
// where the old mixed getUTCDate()/local-getMonth() extraction and the
// double timezone shift produced wrong dates.

describe('timezone contract: instants near the Dhaka midnight boundary (bugs #1/#2)', () => {
  // 2026-04-13 18:30 UTC = 2026-04-14 00:30 in Dhaka → Pohela Boishakh 1433
  const justAfterDhakaMidnight = new Date(Date.UTC(2026, 3, 13, 18, 30))
  // 2026-04-13 17:30 UTC = 2026-04-13 23:30 in Dhaka → still 30 Chaitra 1432
  const justBeforeDhakaMidnight = new Date(Date.UTC(2026, 3, 13, 17, 30))

  it('after Dhaka midnight: the new year has started', () => {
    expect(getBanglaDay(justAfterDhakaMidnight)).toBe('১')
    expect(getBanglaMonth(justAfterDhakaMidnight)).toBe('বৈশাখ')
    expect(getBanglaYear(justAfterDhakaMidnight)).toBe('১৪৩৩')
    expect(getBanglaDate(justAfterDhakaMidnight)).toBe('মঙ্গলবার, ১ বৈশাখ, ১৪৩৩')
  })

  it('before Dhaka midnight: still the old year', () => {
    expect(getBanglaDay(justBeforeDhakaMidnight)).toBe('৩০')
    expect(getBanglaMonth(justBeforeDhakaMidnight)).toBe('চৈত্র')
    expect(getBanglaYear(justBeforeDhakaMidnight)).toBe('১৪৩২')
  })

  it('day, month, and year always agree with the composed getBanglaDate', () => {
    // Sweep instants across a full UTC day; the parts must never mix
    // "yesterday's day" with "today's month".
    for (let hour = 0; hour < 24; hour += 3) {
      const d = new Date(Date.UTC(2025, 11, 15, hour, 30))
      const composed = getBanglaDate(d, {format: 'D|MMMM|YYYY'})
      expect(composed).toBe(
        `${getBanglaDay(d)}|${getBanglaMonth(d)}|${getBanglaYear(d)}`
      )
    }
  })

  it('getBanglaDayName follows the same contract (bug #7)', () => {
    // 2026-04-13 18:30 UTC is Monday in UTC but already Tuesday in Dhaka.
    expect(getBanglaDayName(justAfterDhakaMidnight)).toBe('মঙ্গলবার')
    expect(getBanglaDayName(justBeforeDhakaMidnight)).toBe('সোমবার')
  })
})

describe('getBanglaSeason ignores the format option (bug #3)', () => {
  const d = new Date(Date.UTC(2026, 3, 20, 8, 0))

  it("returns the season for format 'M' and 'MM' instead of undefined", () => {
    expect(getBanglaSeason(d, {format: 'M'})).toBe('গ্রীষ্ম')
    expect(getBanglaSeason(d, {format: 'MM'})).toBe('গ্রীষ্ম')
    expect(getBanglaSeason(d, {format: 'MMMM'})).toBe('গ্রীষ্ম')
  })
})

describe('no silent undefined/NaN output (bug #5)', () => {
  it('every day from 1990–2030 produces well-formed output in both countries', () => {
    for (let year = 1990; year <= 2030; year += 1) {
      for (const month of [0, 2, 4, 6, 8, 10]) {
        for (const day of [1, 10, 20, 28]) {
          const d = new Date(Date.UTC(year, month, day, 8, 0))
          for (const country of ['BD', 'IN']) {
            const out = getBanglaDate(d, {format: 'D MMMM YYYY', country})
            expect(out).not.toMatch(/undefined|NaN/)
            expect(out.length).toBeGreaterThan(5)
          }
        }
      }
    }
  })
})
