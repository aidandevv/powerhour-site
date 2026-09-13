# Repository Agent Guide

## Delivery pipeline

Use this sequence for every change that could be committed:

1. Inspect the branch, working tree, staged files, and upstream relationship before editing. Preserve unrelated work.
2. Keep each change focused. Group independent features, fixes, tests, and documentation into separate commits with conventional commit messages.
3. Before a commit, review the full diff, check for secrets and generated artifacts, and run the checks that apply to the change.
4. Before a branch is ready for remote review, confirm the working tree is clean, compare it with its upstream, and report the exact commits that would be sent. Do not push, rewrite history, or open a pull request without explicit user approval.

## Required verification

Run these checks for application, configuration, or dependency changes:

```bash
npm run lint
npm run typecheck
npm run test:coverage
npm run build
```

For user-facing, routing, accessibility, or visual changes, also run:

```bash
npm run test:e2e
npm run test:visual
```

Review changed visual baselines intentionally; never accept them merely to make a test pass. If a check cannot run, document the reason and do not describe the branch as ready.

## Continuous integration

The `Quality` workflow runs for pull requests and for pushes to `main`.

- **Static quality and unit tests:** clean dependency install, lint, type check, and coverage-tested unit/component suite.
- **Browser, accessibility, and visual tests:** production build, Chromium/Firefox/WebKit acceptance coverage, axe-backed accessibility checks, and Chromium visual regression tests.
- **Evidence:** coverage and Playwright reports are retained as workflow artifacts, including failure evidence when available.

Keep local verification aligned with this workflow whenever scripts or test configuration change.

## Project records

For meaningful engineering decisions, implementation pivots, debugging lessons, integrations, or validation milestones, append a factual entry to `docs/dev_journal.md`. Record distinct user-experience or product implications in `docs/product_insights.md`; cross-link entries when the same observation belongs in both logs. Do not overwrite prior entries or invent evidence.
