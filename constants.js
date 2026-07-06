// Frozen so callers who receive these arrays (getBanglaDigit(), getBanglaMonths(),
// ...) cannot mutate shared library state.
export const banglaDigit = Object.freeze([
  '০',
  '১',
  '২',
  '৩',
  '৪',
  '৫',
  '৬',
  '৭',
  '৮',
  '৯',
])

export const banglaMonths = Object.freeze([
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

export const banglaDays = Object.freeze([
  'রবি',
  'সোম',
  'মঙ্গল',
  'বুধ',
  'বৃহস্পতি',
  'শুক্র',
  'শনি',
])

export const banglaSeasons = Object.freeze([
  'গ্রীষ্ম',
  'বর্ষা',
  'শরৎ',
  'হেমন্ত',
  'শীত',
  'বসন্ত',
])
