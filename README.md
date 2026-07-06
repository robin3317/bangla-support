# bangla-support

[![npm version](https://img.shields.io/npm/v/bangla-support.svg)](https://www.npmjs.com/package/bangla-support)
[![CI](https://github.com/robin3317/bangla-support/actions/workflows/ci.yml/badge.svg)](https://github.com/robin3317/bangla-support/actions/workflows/ci.yml)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![types included](https://img.shields.io/badge/types-included-blue.svg)](./types/index.d.ts)

Utility functions for Bangla (Bengali) digits and the Bangla calendar — dates, months, seasons and weekdays for Bangladesh (`BD`) and India (`IN`). Zero dependencies, ESM, fully typed.

## Installation

```bash
npm install bangla-support
```

Requires Node.js >= 20.17. The package is ESM-only (`import`); modern Node can also `require()` it.

## Quick start

```javascript
import {getBanglaDate, getBanglaDigit, isBanglaDigit} from 'bangla-support'

getBanglaDate(new Date('2026-04-14T10:00:00+06:00'))
// 'মঙ্গলবার, ১ বৈশাখ, ১৪৩৩'

getBanglaDigit(1234567890) // '১২৩৪৫৬৭৮৯০'
isBanglaDigit('১২৩৪')      // true
```

## The timezone contract

**An input `Date` is an absolute instant. The output is the Bangla date at that instant *in the selected country's timezone*** — `Asia/Dhaka` (UTC+6:00) for `country: 'BD'` (the default), `Asia/Kolkata` (UTC+5:30) for `country: 'IN'`.

This means the result does not depend on the machine or browser timezone. If it is 9 PM on April 13 in New York, it is already past midnight on April 14 in Dhaka — so `getBanglaDate()` correctly reports ১ বৈশাখ, the new year. Every function in this package follows the same rule.

## API

All calendar functions share the signature `fn(date?, options?)`:

- `date` — a `Date` (defaults to `new Date()`). Anything that is not a valid `Date` throws `Error('Invalid Date')`.
- `options.country` — `'BD'` (default) or `'IN'`.
- `options.format` — a format token, where noted below.

### getBanglaDate(date?, options?)

The composed, formatted Bangla date.

```javascript
getBanglaDate(new Date('2026-04-14T10:00:00+06:00'))
// 'মঙ্গলবার, ১ বৈশাখ, ১৪৩৩'  (default format: 'eeee, D MMMM, YYYY')

getBanglaDate(new Date('2026-04-14T10:00:00+06:00'), {format: 'DD-MM-YY'})
// '০১-০১-৩৩'
```

**Format tokens**

| Token | Meaning | Example output |
|-------|---------|----------------|
| `eeee` | full weekday | মঙ্গলবার |
| `eee` | short weekday | মঙ্গল |
| `D` | day of month | ১ |
| `DD` | day, zero-padded | ০১ |
| `M` | month number | ১ |
| `MM` | month number, zero-padded | ০১ |
| `MMMM` | month name | বৈশাখ |
| `YY` | 2-digit year | ৩৩ |
| `YYYY` | full year | ১৪৩৩ |
| `YYYYb` | year with era suffix | ১৪৩৩ (বঙ্গাব্দ) |

> **Format-string limitations:** tokens are replaced by sequential, case-insensitive matching. A lowercase token (`d`, `mm`, `yyyy`) is recognized but renders the *default* variant of its group (`D`, `MMMM`, `YYYY`). There is no escape syntax — literal `d/e/m/y` letters in a format string will be treated as tokens, so stick to separators like spaces, commas, dashes and Bangla text.

### getBanglaDay(date?, options?)

Day of the Bangla month. `format`: `'D'` (default) or `'DD'`.

```javascript
getBanglaDay(new Date('2026-04-14T10:00:00+06:00'))                 // '১'
getBanglaDay(new Date('2026-04-14T10:00:00+06:00'), {format: 'DD'}) // '০১'
```

### getBanglaMonth(date?, options?)

Bangla month. `format`: `'MMMM'` (default), `'MM'`, or `'M'`.

```javascript
getBanglaMonth(new Date('2026-04-14T10:00:00+06:00'))                // 'বৈশাখ'
getBanglaMonth(new Date('2026-04-14T10:00:00+06:00'), {format: 'M'}) // '১'
```

### getBanglaYear(date?, options?)

Bangla year (বঙ্গাব্দ). `format`: `'YYYY'` (default), `'YY'`, or `'YYYYb'`.

```javascript
getBanglaYear(new Date('2026-04-14T10:00:00+06:00'))                    // '১৪৩৩'
getBanglaYear(new Date('2026-04-14T10:00:00+06:00'), {format: 'YYYYb'}) // '১৪৩৩ (বঙ্গাব্দ)'
```

### getBanglaDayName(date?, options?)

Weekday name. `format`: `'eeee'` (default, full) or `'eee'` (short).

```javascript
getBanglaDayName(new Date('2026-04-14T10:00:00+06:00'))                  // 'মঙ্গলবার'
getBanglaDayName(new Date('2026-04-14T10:00:00+06:00'), {format: 'eee'}) // 'মঙ্গল'
```

### getBanglaSeason(date?, options?)

The season (ঋতু) — one of the six Bangla seasons, two months each. A `format` option, if passed, is ignored.

```javascript
getBanglaSeason(new Date('2026-07-06T12:00:00+06:00')) // 'বর্ষা'
```

### getBanglaDigit(digit?)

Convert Latin digits to Bangla numerals. Non-digit characters pass through unchanged. With no argument, returns the (frozen) array of the ten Bangla digit characters.

```javascript
getBanglaDigit(2026)    // '২০২৬'
getBanglaDigit(3.14)    // '৩.১৪'
getBanglaDigit(0)       // '০'
getBanglaDigit('ID-42') // 'ID-৪২'
getBanglaDigit()        // ['০','১','২','৩','৪','৫','৬','৭','৮','৯']
```

### isBanglaDigit(value)

`true` when the value consists only of Bangla digit characters.

```javascript
isBanglaDigit('১২৩') // true
isBanglaDigit('123') // false
isBanglaDigit('১2৩') // false
```

### getBanglaDays(format?), getBanglaMonths(), getBanglaSeasons()

The constant lists. Returned arrays are frozen — copy before mutating.

```javascript
getBanglaDays()        // ['রবি', 'সোম', 'মঙ্গল', ...]
getBanglaDays('eeee')  // ['রবিবার', 'সোমবার', 'মঙ্গলবার', ...]
getBanglaMonths()      // ['বৈশাখ', 'জ্যৈষ্ঠ', ...]
getBanglaSeasons()     // ['গ্রীষ্ম', 'বর্ষা', ...]
```

## BD vs IN calendars

- **`country: 'BD'`** follows the **revised Bangladesh calendar** (Bangla Academy, 2019): fixed month lengths, new year on April 14, Falgun gaining a day in Gregorian leap years. The test suite verifies it against published dates (পহেলা বৈশাখ, একুশে ফেব্রুয়ারি = ৮ ফাল্গুন, and every month start).
- **`country: 'IN'`** approximates the **astronomical (Surya Siddhanta-style) Bengali calendar** used in West Bengal. Because published panjikas differ by tradition (and sometimes by a day), this mode's output is pinned by tests but not certified against a single authority.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Bug reports with a failing date example are especially welcome.

## License

[MIT](./LICENSE) © Abdur Rahman Robin
