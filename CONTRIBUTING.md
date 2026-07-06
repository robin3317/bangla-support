# Contributing to bangla-support

Thanks for helping! Bug reports with a concrete failing date are the most valuable thing you can file.

## Development setup

```bash
git clone https://github.com/robin3317/bangla-support.git
cd bangla-support
npm ci
npm test
```

Node.js >= 20.17. No build step — the published files are the source files, plus type declarations generated with `npm run types`.

## Ground rules

1. **Every behavior change needs a test.** Bug fixes need a regression test that fails before the fix and passes after.
2. **The timezone contract is sacred.** An input `Date` is an absolute instant; output is the Bangla date at that instant in the country's timezone. All date math goes through `toCalendarParts()` in `calendar/utils.js` — never call local getters (`getDate()`, `getMonth()`, `getDay()`) anywhere in the package.
3. **Write timezone-independent tests.** Construct instants with `new Date(Date.UTC(...))` and assert country-local expectations. Note: `TZ` cannot be varied on Windows (Node ignores it there); CI runs the suite under four timezones on Linux, so a test that secretly depends on machine timezone will fail there.
4. **BD calendar changes must cite the revised Bangladesh calendar** (Bangla Academy, 2019). IN calendar changes should reference which panjika tradition they follow (see TODOS in the issue tracker).
5. Public API changes require a semver-major discussion in an issue first.

## Checks that must pass

```bash
npm test        # vitest — all suites
npm run types   # tsc declaration emit must be clean
npx publint     # package metadata health
```

CI additionally runs the test suite under UTC, America/New_York, Asia/Dhaka and Pacific/Kiritimati on Node 20 and 22.

## Releasing (maintainer)

1. Update `version` in `package.json` and add a `CHANGELOG.md` entry.
2. Commit, then tag: `git tag v<version>` and push the tag.
3. The publish workflow verifies the tag matches `package.json`, re-runs tests, and publishes to npm with provenance.
