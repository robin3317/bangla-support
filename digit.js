export const getBanglaDigit = (digit) => {
  const banglaDigit = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  if (!digit) return banglaDigit
  return digit.toString().replace(/\d/g, (d) => banglaDigit[+d])
}

export const isBanglaDigit = (digit) => {
  return /^[০-৯]+$/.test(digit)
}
