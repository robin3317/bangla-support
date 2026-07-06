import {describe, expect, it} from 'vitest'
import {
  getBanglaDays,
  getBanglaDigit,
  getBanglaMonths,
  getBanglaSeasons,
} from '../index.js'

describe('getBanglaMonths', () => {
  it('returns the 12 Bangla months in calendar order', () => {
    expect(getBanglaMonths()).toEqual([
      'বৈশাখ',
      'জ্যৈষ্ঠ',
      'আষাঢ়',
      'শ্রাবণ',
      'ভাদ্র',
      'আশ্বিন',
      'কার্তিক',
      'অগ্রহায়ণ',
      'পৌষ',
      'মাঘ',
      'ফাল্গুন',
      'চৈত্র',
    ])
  })
})

describe('getBanglaDays', () => {
  it('returns the 7 short day names', () => {
    expect(getBanglaDays()).toEqual([
      'রবি',
      'সোম',
      'মঙ্গল',
      'বুধ',
      'বৃহস্পতি',
      'শুক্র',
      'শনি',
    ])
  })

  it("returns full day names with the বার suffix for format 'eeee'", () => {
    expect(getBanglaDays('eeee')).toEqual([
      'রবিবার',
      'সোমবার',
      'মঙ্গলবার',
      'বুধবার',
      'বৃহস্পতিবার',
      'শুক্রবার',
      'শনিবার',
    ])
  })
})

describe('getBanglaSeasons', () => {
  it('returns the 6 seasons in order', () => {
    expect(getBanglaSeasons()).toEqual([
      'গ্রীষ্ম',
      'বর্ষা',
      'শরৎ',
      'হেমন্ত',
      'শীত',
      'বসন্ত',
    ])
  })
})

// REGRESSION (bug #6): the getters returned the module-level constants by
// reference — a caller pushing onto the result corrupted every later call
// in the whole process.
describe('returned arrays cannot corrupt library state', () => {
  it('mutating a returned array throws (frozen)', () => {
    expect(() => getBanglaMonths().push('x')).toThrow()
    expect(() => getBanglaSeasons().push('x')).toThrow()
    expect(() => {
      getBanglaDays()[0] = 'x'
    }).toThrow()
    expect(() => getBanglaDigit().push('x')).toThrow()
  })

  it('month list survives an attempted mutation', () => {
    try {
      getBanglaMonths()[0] = 'corrupted'
    } catch {
      // expected — frozen
    }
    expect(getBanglaMonths()[0]).toBe('বৈশাখ')
  })
})
