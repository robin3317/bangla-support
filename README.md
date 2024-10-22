# bangla-support

A collection of utility functions to provide bangla digit, text translate into bangla and verify bangla digit e.t.c.

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
