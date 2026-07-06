import {describe, expect, it} from 'vitest'
import {
  getBanglaDate,
  getBanglaDay,
  getBanglaDayName,
  getBanglaMonth,
  getBanglaSeason,
  getBanglaYear,
} from '../index.js'

// All instants are constructed in UTC at 08:00 (= 14:00 in Dhaka), safely
// inside a single civil day in UTC, Dhaka, and Kolkata alike — so these
// expectations hold on any machine, in any timezone, before and after the
// timezone normalization fix.
const utc = (y, m, d, h = 8) => new Date(Date.UTC(y, m, d, h, 0, 0))

describe('BD golden dates (2019 revised Bangladesh calendar)', () => {
  // [gregorian, banglaDay, banglaMonth, banglaYear]
  const golden = [
    [utc(2026, 3, 14), '১', 'বৈশাখ', '১৪৩৩'], // Pohela Boishakh (new year)
    [utc(2026, 3, 13), '৩০', 'চৈত্র', '১৪৩২'], // last day of the year
    [utc(2026, 1, 21), '৮', 'ফাল্গুন', '১৪৩২'], // Ekushey February
    [utc(2025, 11, 16), '১', 'পৌষ', '১৪৩২'], // Victory Day = 1 Poush
    [utc(2026, 2, 26), '১২', 'চৈত্র', '১৪৩২'], // Independence Day
  ]

  it.each(golden)('%s → day %s, month %s, year %s', (date, day, month, year) => {
    expect(getBanglaDay(date)).toBe(day)
    expect(getBanglaMonth(date)).toBe(month)
    expect(getBanglaYear(date)).toBe(year)
  })
})

describe('BD month starts (each month begins on the revised-calendar date)', () => {
  const monthStarts = [
    [utc(2026, 3, 14), 'বৈশাখ'],
    [utc(2026, 4, 15), 'জ্যৈষ্ঠ'],
    [utc(2026, 5, 15), 'আষাঢ়'],
    [utc(2026, 6, 16), 'শ্রাবণ'],
    [utc(2026, 7, 16), 'ভাদ্র'],
    [utc(2026, 8, 16), 'আশ্বিন'],
    [utc(2026, 9, 17), 'কার্তিক'],
    [utc(2026, 10, 16), 'অগ্রহায়ণ'],
    [utc(2025, 11, 16), 'পৌষ'],
    [utc(2026, 0, 15), 'মাঘ'],
    [utc(2026, 1, 14), 'ফাল্গুন'],
    [utc(2026, 2, 15), 'চৈত্র'],
  ]

  it.each(monthStarts)('%s is ১ %s', (date, month) => {
    expect(getBanglaDay(date)).toBe('১')
    expect(getBanglaMonth(date)).toBe(month)
  })
})

describe('BD leap-year handling (Falgun gets its 30th day in Gregorian leap years)', () => {
  it('2024 (leap): Mar 14 is ৩০ ফাল্গুন, Mar 15 is ১ চৈত্র', () => {
    expect(getBanglaDay(utc(2024, 2, 14))).toBe('৩০')
    expect(getBanglaMonth(utc(2024, 2, 14))).toBe('ফাল্গুন')
    expect(getBanglaDay(utc(2024, 2, 15))).toBe('১')
    expect(getBanglaMonth(utc(2024, 2, 15))).toBe('চৈত্র')
  })

  it('2025 (non-leap): Falgun ends at ২৯, Mar 15 is ১ চৈত্র', () => {
    expect(getBanglaDay(utc(2025, 2, 14))).toBe('২৯')
    expect(getBanglaMonth(utc(2025, 2, 14))).toBe('ফাল্গুন')
    expect(getBanglaDay(utc(2025, 2, 15))).toBe('১')
    expect(getBanglaMonth(utc(2025, 2, 15))).toBe('চৈত্র')
  })
})

describe('getBanglaSeason (BD)', () => {
  const seasons = [
    [utc(2026, 3, 20), 'গ্রীষ্ম'],
    [utc(2026, 6, 6), 'বর্ষা'],
    [utc(2026, 8, 20), 'শরৎ'],
    [utc(2026, 10, 20), 'হেমন্ত'],
    [utc(2026, 0, 20), 'শীত'],
    [utc(2026, 2, 20), 'বসন্ত'],
  ]

  it.each(seasons)('%s → %s', (date, season) => {
    expect(getBanglaSeason(date)).toBe(season)
  })
})

describe('getBanglaDate format tokens', () => {
  // Apr 14 2026, 14:00 Dhaka = ১ বৈশাখ ১৪৩৩, a Tuesday (মঙ্গলবার)
  const d = utc(2026, 3, 14)

  const tokens = [
    ['eeee', 'মঙ্গলবার'],
    ['eee', 'মঙ্গল'],
    ['D', '১'],
    ['DD', '০১'],
    ['M', '১'],
    ['MM', '০১'],
    ['MMMM', 'বৈশাখ'],
    ['YY', '৩৩'],
    ['YYYY', '১৪৩৩'],
    ['YYYYb', '১৪৩৩ (বঙ্গাব্দ)'],
  ]

  it.each(tokens)("token '%s' renders '%s'", (format, expected) => {
    expect(getBanglaDate(d, {format})).toBe(expected)
  })

  it('renders the default format', () => {
    expect(getBanglaDate(d)).toBe('মঙ্গলবার, ১ বৈশাখ, ১৪৩৩')
  })

  // Pinned quirk: token matching is case-insensitive, and a lowercase token
  // falls through to the default variant (d→D, mmmm→MMMM, yyyy→YYYY).
  it('accepts lowercase tokens as their default-variant equivalents', () => {
    expect(getBanglaDate(d, {format: 'd mmmm yyyy'})).toBe('১ বৈশাখ ১৪৩৩')
  })
})

describe('getBanglaDayName', () => {
  it('returns the full day name by default and short with eee', () => {
    expect(getBanglaDayName(utc(2026, 3, 14))).toBe('মঙ্গলবার')
    expect(getBanglaDayName(utc(2026, 3, 14), {format: 'eee'})).toBe('মঙ্গল')
  })
})

describe('invalid input handling', () => {
  const fns = [getBanglaDate, getBanglaDay, getBanglaMonth, getBanglaYear, getBanglaSeason]

  it.each(fns.map((f) => [f.name, f]))('%s throws on an invalid Date', (_name, fn) => {
    expect(() => fn(new Date('nonsense'))).toThrow('Invalid Date')
    expect(() => fn('2026-04-14')).toThrow('Invalid Date')
  })

  // REGRESSION (bug #7): getBanglaDayName RETURNED the string 'Invalid Date'
  // instead of throwing like every sibling function.
  it('getBanglaDayName throws on an invalid Date', () => {
    expect(() => getBanglaDayName(new Date('nonsense'))).toThrow('Invalid Date')
  })

  it('getBanglaYear throws when the Bangla year would be < 1', () => {
    expect(() => getBanglaYear(utc(500, 0, 1))).toThrow('Invalid Date')
  })
})
