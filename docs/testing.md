# Testing Powerhour Marketing

The marketing site uses a layered test suite. Each layer protects a different contract, so a green build means more than a successful compilation.

## Local commands

| Command | What it verifies |
| --- | --- |
| `npm run lint` | Next.js and Core Web Vitals lint rules |
| `npm run typecheck` | Strict TypeScript without emitted files |
| `npm run test:unit` | Fast unit and component behavior tests |
| `npm run test:coverage` | Unit/component tests plus a local coverage report |
| `npm run test:e2e` | Chromium, Firefox, and WebKit functional coverage |
| `npm run test:a11y` | Chromium accessibility scan of critical pages |
| `npm run test:visual` | Chromium visual-regression assertions |

Install browsers once before the first local browser run:

```bash
npx playwright install chromium firefox webkit
```

Playwright starts an isolated local app on port `3210` and uses `.next-playwright`, so it never reuses an existing server or corrupts the normal development cache. Set `PLAYWRIGHT_BASE_URL` only when deliberately testing a separately managed deployment.

## Test layers

- **Unit and component tests:** URL normalization, middleware, sitemap/robots contracts, navigation behavior, progressive-enhancement fallbacks, and the interactive workspace state machine.
- **Functional browser tests:** public routes, legacy redirects, keyboard navigation, simulated product journeys, and narrow-viewport overflow checks.
- **Accessibility:** Axe scans the homepage, docs, security, and deploy pages in Chromium. A violation is a failing test.
- **Visual regression:** Full-page desktop and mobile snapshots cover the homepage and all public content routes, including a completed planner state.

Use accessible roles, labels, and user-visible text for test selectors. Do not add a test ID unless the element has no stable semantic contract.

## Visual snapshot workflow

Snapshots are source-controlled review artifacts, not generated build output. Update them only when a visual change is intentional:

```bash
npx playwright test --project=chromium-visual --update-snapshots
```

Review every changed PNG in the pull request. Baselines are named for the dedicated Chromium visual project and use fixed viewports, reduced motion, and local fonts; confirm every visual change again in Linux CI before merging.

## Coverage policy

Coverage is collected for every imported unit/component module and retained as a CI artifact. The suite enforces a non-regression floor of 80% statements/functions/lines and 70% branches; increase those values when the baseline rises. Do not use coverage targets to force tests around static marketing copy; browser, accessibility, and visual tests protect that surface better.

## Pull requests and failures

Every change to behavior needs a focused regression test. UI changes need an intentional visual-baseline review. CI uploads HTML reports, traces, screenshots, videos, and coverage data on every run so failures can be diagnosed without rerunning the job.

Required branch-protection checks should be **Static quality and unit tests** and **Browser, accessibility, and visual tests**. Configure them in GitHub after the workflow has completed successfully on `main`.
