import {describe, expect, it} from 'vitest'
import {getBanglaDigit, isBanglaDigit} from '../index.js'

const BANGLA_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

describe('getBanglaDigit', () => {
  it('converts numbers to Bangla numerals', () => {
    expect(getBanglaDigit(5)).toBe('৫')
    expect(getBanglaDigit(2026)).toBe('২০২৬')
    expect(getBanglaDigit('2026')).toBe('২০২৬')
  })

  it('passes non-digit characters through unchanged', () => {
    expect(getBanglaDigit(3.14)).toBe('৩.১৪')
    expect(getBanglaDigit(-42)).toBe('-৪২')
    expect(getBanglaDigit('abc12')).toBe('abc১২')
  })

  it('returns the digit array when called with no argument (documented API)', () => {
    expect(getBanglaDigit()).toEqual(BANGLA_DIGITS)
    expect(getBanglaDigit(null)).toEqual(BANGLA_DIGITS)
  })

  // REGRESSION (bug #4): 0 and '' are real inputs, not "no argument".
  // Old code used a truthiness check and returned the whole array for them.
  it('converts 0 to ০ instead of returning the digit array', () => {
    expect(getBanglaDigit(0)).toBe('০')
  })

  it('converts empty string to empty string instead of the digit array', () => {
    expect(getBanglaDigit('')).toBe('')
  })
})

describe('isBanglaDigit', () => {
  it('accepts strings made only of Bangla digits', () => {
    expect(isBanglaDigit('০১২৩৪৫৬৭৮৯')).toBe(true)
    expect(isBanglaDigit('৫')).toBe(true)
  })

  it('rejects Latin digits, mixed strings, and empty input', () => {
    expect(isBanglaDigit('123')).toBe(false)
    expect(isBanglaDigit('১2')).toBe(false)
    expect(isBanglaDigit('')).toBe(false)
    expect(isBanglaDigit('বাংলা')).toBe(false)
  })

  it('rejects non-string inputs via coercion', () => {
    expect(isBanglaDigit(123)).toBe(false)
    expect(isBanglaDigit(null)).toBe(false)
    expect(isBanglaDigit(undefined)).toBe(false)
  })
})
