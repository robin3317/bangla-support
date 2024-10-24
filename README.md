# bangla-support

A collection of utility functions to provide bangla date, bangla digit, text translate into bangla and verify bangla digit e.t.c.

## Installation and Usage

Install using npm:

```bash
$ npm install bangla-support
```

Then use it in your app like this:

```javascript
import {getBanglaDigit, isBanglaDigit} from 'bangla-support'

console.log(getBanglaDigit(1234567890)) // Output: ১২৩৪৫৬৭৮৯০
console.log(isBanglaDigit('১২৩৪৫৬৭৮৯০')) // Output: true
```

## Functions

- **getBanglaDigit**: Return bangla digit of a number or string. Or return an array of bangla digit if you doesn't pass anything.

```javascript
import {getBanglaDigit} from 'bangla-support'
getBanglaDigit(1234567890) // Output: ১২৩৪৫৬৭৮৯০
getBanglaDigit() // Output: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
```

- **isBanglaDigit**: Return true if the input is a bangla digit. Otherwise return false.

```javascript
import {isBanglaDigit} from 'bangla-support'

isBanglaDigit('১২৩৪৫৬৭৮৯০') // Output: true
isBanglaDigit('1234567890') // Output: false
```

- **getBanglaMonths**: Return bangla months in an array.

```javascript
import {getBanglaMonths} from 'bangla-support'

getBanglaMonths() // Output: ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র']
```

- **getBanglaDays**: Return bangla week days in an array.

```javascript
import {getBanglaDays} from 'bangla-support'

getBanglaDays() // Output: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি']
```

- **getBanglaSeasons**: Return bangla seasons in an array.

```javascript
import {getBanglaSeasons} from 'bangla-support'

getBanglaSeasons() // Output: ['গ্রীষ্ম', 'বর্ষা', 'শরৎ', 'হেমন্ত', 'শীত', 'বসন্ত']
```
