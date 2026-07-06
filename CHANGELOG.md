# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/).

## [3.0.0] - 2026-07-06

The correctness release. Every function now follows one documented timezone contract, the known wrong-date bugs are fixed, and the package ships tests, types, and CI.

### Breaking

- **Timezone normalization is fixed, so outputs change for machines outside Asia/Dhaka.** An input `Date` is treated as an absolute instant and rendered as the Bangla date in the selected country's timezone (BD = UTC+6:00, IN = UTC+5:30). Previously, a double shift in `getBanglaDate` and mixed UTC/local date getters produced dates up to a day off near midnight, varying with the caller's machine timezone.
- **Deep imports are sealed.** Only the package root is public API (`exports` map). `import 'bangla-support/digit.js'` and similar paths no longer resolve.
- **`getBanglaDayName` throws on invalid input** instead of returning the string `'Invalid Date'`, matching every other function. It also follows the timezone contract (previously it used the machine-local weekday).
- **`getBanglaDigit(0)` returns `'০'` and `getBanglaDigit('')` returns `''`.** Previously both returned the whole digit array. Calling with no argument still returns the digit array (unchanged, documented behavior).
- **Node.js >= 20.17 is required** (was unspecified).

### Fixed

- `getBanglaSeason` returned `undefined` when passed `format: 'M'` or `'MM'`; the season is now computed independently of any format option.
- The `IN` calculations silently returned `undefined`/`NaN` for some inputs; they now throw `Error('Invalid Date')`.
- The `IN` timezone offset is now UTC+5:30 (Asia/Kolkata); it previously used Bangladesh's UTC+6:00.
- The `license` field in `package.json` said ISC while the LICENSE file was MIT; both now say MIT.

### Added

- **Test suite** (Vitest): BD dates verified against the revised Bangladesh calendar (2019) — Pohela Boishakh, Ekushey February, every month start, leap-year Falgun — plus regression tests for every fixed bug. CI runs the suite across four timezones (UTC, America/New_York, Asia/Dhaka, Pacific/Kiritimati) to prove timezone independence.
- **TypeScript declarations** generated from JSDoc, published with the package.
- **CI and guarded publishing**: tests must pass and the git tag must match `package.json` before `npm publish` runs, with npm provenance.

### Changed

- Returned constant arrays (`getBanglaDigit()`, `getBanglaMonths()`, `getBanglaDays()`, `getBanglaSeasons()`) are frozen, so accidental mutation can no longer corrupt subsequent output.
- The package description no longer claims a text-translation feature; no such function ever existed.

## [2.0.0] - 2024-10-25

- `getBanglaDate` options use `country` instead of `calculationMethod`.

## [1.0.2] - 2024-10-23

- Calendar functionality: `getBanglaDate`, `getBanglaDay`, `getBanglaDayName`, `getBanglaMonth`, `getBanglaSeason`, `getBanglaYear` and list getters.

## [1.0.0] - 2024-10-22

- Initial release: `getBanglaDigit`, `isBanglaDigit`.
