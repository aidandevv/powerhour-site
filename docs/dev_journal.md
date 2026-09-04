# Engineering Development Journal
> Chronological log of architecture decisions, implementation pivots,
> constraint discoveries, verification results, and engineering milestones.

---

<!-- SESSION: 2026-06-22 15:55 | marketing screenshots integration -->

### [CP-MILESTONE] | 2026-06-22: Product Screenshots Integrated Into Marketing Page

**Summary:** Added real Powerhour app screenshots to the standalone marketing homepage and README so the site shows the product experience directly. The homepage now uses a denser Ticker/transactions screenshot in the hero and a product-tour gallery for projections, subscription audit, and AI Budget Planner workflows.

**Files/Modules Affected:** `components/home-sections.tsx`, `app/page.tsx`, `README.md`, `public/powerhour-app/**`.

**Key Trade-off:** The dashboard overview screenshot was kept in the README, but the homepage lead image was changed to the transactions-plus-Ticker shot because the dashboard overview read too blank at hero-card scale during browser QA.

**Evidence:** `npm run build` passed. Desktop and mobile Playwright captures were saved to `output/playwright/powerhour-home-screenshots.png` and `output/playwright/powerhour-home-mobile.png`.

**Follow-ups:** Consider adding a favicon to remove the unrelated local `favicon.ico` 404 seen during browser QA.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-POSITIONING] | 2026-06-22: Real Product Screenshots Improve Marketing Trust.

---

<!-- SESSION: 2026-07-12 16:00 | marketing narrative redesign -->

### [CP-REFACTOR] | 2026-07-12: Product Screens Became a Guided Marketing Narrative

**Summary:** Reworked the homepage so the real Powerhour UI functions as a framed product surface and three sequential workflow moments, rather than a hero screenshot followed by a gallery of equally weighted cards.

**Files/Modules Affected:** `components/home-sections.tsx`, `app/globals.css`.

**Key Trade-off:** Replaced the WebGL hero shader with a CSS-only slate gradient and grid treatment. This gives the product frame visual priority and avoids a runtime visual dependency for an otherwise static marketing composition.

**Evidence:** `npm run build` completed successfully. A mobile DOM check found no horizontal overflow; the in-app browser's local bitmap capture was corrupt, so no screenshot-based visual acceptance claim is recorded.

**Follow-ups:** Re-capture desktop and mobile visual QA in a browser environment with reliable local screenshot output before a release review.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-POSITIONING] | 2026-07-12: The Marketing Page Should Tell a Workflow Story.

---

### [CP-PIVOT] | 2026-07-12: Reinstated the Shader-Led Hero

**Summary:** Restored the existing shader-gradient, hero fade, and frosted content card after the marketing narrative refactor overreached into the established visual system. Kept the alternating product-story layout, but removed all numbering, browser chrome, proof-point strips, and screenshot overlays.

**Files/Modules Affected:** `components/home-sections.tsx`, `app/globals.css`.

**Key Trade-off:** The product section remains more structured than the original gallery, but its screenshots are now shown cleanly and without decorative claims so the site retains its established character.

**Evidence:** `npm run build` completed successfully after the revision.

**Follow-ups:** None identified.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-POSITIONING] | 2026-07-12: Preserve Product Character Over Generic Marketing Polish.

---

### [CP-REFACTOR] | 2026-07-12: Moved Product Evidence Into the Page Narrative

**Summary:** Removed the product screenshot from the shader-led hero and restored its original metric-card composition. The Ticker/ledger view now opens the alternating body sequence with the projection, subscription, and budget-planner screens. The deployment preview is now a connected, command-led setup path instead of three numbered cards.

**Files/Modules Affected:** `components/home-sections.tsx`.

**Key Trade-off:** The page gains a longer product narrative, but the hero is again reserved for the established brand treatment and primary call to action.

**Evidence:** `npm run build` completed successfully after the refactor.

**Follow-ups:** Validate screenshot cadence in a browser environment with reliable visual captures before a release review.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-POSITIONING] | 2026-07-12: Product Screens Need Contextual Roles.

---

<!-- SESSION: 2026-07-12 | logo exploration generation -->

### [CP-DEBUG] | 2026-07-12: Logo Exploration Worker Workspace Recovery

**Summary:** Recovered the Creative Production logo-image pipeline after its worker preflight failed to write inside the project. The local explorer was initially resolving its Codex child workspace outside the project; rerunning the batch with `/Users/aidan/dev/powerhour-site` as the worker workspace produced all six image-backed logo concepts.

**Files/Modules Affected:** `outputs/logos/powerhour-identity-exploration/**`.

**Key Trade-off:** Kept the standard Codex-exec generation path and its per-tile outputs instead of replacing the concepts with hand-drawn placeholders. The output contains directional raster studies only; it is not a production vector identity.

**Evidence:** Successful preflight plus six completed PNG tiles; the generated review stream contains six image-backed items and the contact sheet was visually inspected.

**Follow-ups:** Before reusing the local explorer server, ensure `CREATIVE_PRODUCTION_WORKSPACE` targets the project workspace so child workers inherit an allowed write root.

---

<!-- SESSION: 2026-07-15 | product-preview composition experiment -->

### [CP-REFACTOR] | 2026-07-15: Product Evidence Became a Decision Composition

**Summary:** Replaced the alternating screenshot-story layout with one primary Ticker/ledger scene and three smaller forecast, subscription-audit, and planner outcomes. The existing shader-gradient hero was deliberately left unchanged, and the desktop-only route is decorative and hidden from assistive technology.

**Files/Modules Affected:** `components/home-sections.tsx`, `design-qa.md`, `docs/product_insights.md`.

**Key Trade-off:** Retained high-resolution, real app screenshots instead of importing app components into the marketing site. This keeps the experiment isolated and reversible, while the smaller screenshots may later be swapped for portable presentation-only components.

**Evidence:** `npm run build` passed after the change; the served production HTML contains the new product copy. Browser-rendered visual comparison is blocked because the available browser connection fails at initialization, so `design-qa.md` correctly records `final result: blocked`.

**Follow-ups:** Capture desktop and mobile views in a functioning browser, then adjust the route geometry or responsive card arrangement if needed.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-EXPERIMENT] | 2026-07-15: Test a Single Product Decision Sequence.

---

### [CP-REFACTOR] | 2026-07-15: Decision Outcomes Moved Around the Ledger

**Summary:** Revised the first product-preview experiment so the large ledger is a left-center anchor and the three outcomes occupy distinct positions above, beside, and below it. The copy now describes the same sequence as what is coming, what can change, and what to do next.

**Files/Modules Affected:** `components/home-sections.tsx`, `design-qa.md`, `docs/product_insights.md`.

**Key Trade-off:** Uses an absolute desktop composition for the stronger spatial story, while retaining a normal responsive grid below the large breakpoint so the experiment remains readable on smaller screens.

**Evidence:** `npm run build` passed and the refreshed production preview serves every revised story line. Browser-rendered visual comparison remains blocked and is recorded in `design-qa.md`.

**Follow-ups:** Review the live desktop preview and either tune the route endpoints or revert this isolated product-section experiment based on founder feedback.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-AHA-MOMENT] | 2026-07-15: Branch Direction Carries the Product Story.

---

### [CP-REFACTOR] | 2026-07-15: Product Story Became a Mirrored Constellation

**Summary:** Centered the large ledger, mirrored equal forecast and recurring-cost cards across the upper corners, and centered the planner below. Added restrained mirrored rotations, dotted connectors, and a small editorial aside to test a more characterful Hilos-influenced treatment.

**Files/Modules Affected:** `components/home-sections.tsx`, `design-qa.md`, `docs/product_insights.md`.

**Key Trade-off:** Symmetry makes the system easier to scan, while the slight mirrored tilt and dotted route preserve some personality without introducing new illustration assets or changing the hero.

**Evidence:** `npm run build` passed; the refreshed preview serves the new rhythmic story copy. Browser-rendered visual comparison remains blocked and is recorded in `design-qa.md`.

**Follow-ups:** Review the live preview for whether the quirk feels intentional or gimmicky, then keep or remove the rotation and editorial aside independently.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-EXPERIMENT] | 2026-07-15: Symmetry Can Carry Quirk Without Losing Clarity.

---

### [CP-PIVOT] | 2026-07-15: Quirk Gave Way to a Clean Decision Loop

**Summary:** Removed the mirrored card rotations, dotted connectors, and editorial aside from the product-preview experiment. Reorganized the same four product surfaces into a centered top-to-bottom progression: understand the ledger, branch into forecast and recurring-cost choices, then converge on the planner.

**Files/Modules Affected:** `components/home-sections.tsx`, `design-qa.md`, `docs/product_insights.md`.

**Key Trade-off:** The section now relies on hierarchy, symmetry, and copy progression for character rather than decorative irregularity. This is less visually playful but communicates the product's decision flow more directly.

**Evidence:** `git diff --check` and `npm run build` passed; the refreshed production preview serves every revised story line. Browser-rendered visual comparison remains blocked and is recorded in `design-qa.md`.

**Follow-ups:** Review the live preview and tune connector endpoints or vertical spacing once browser capture is available.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-POSITIONING] | 2026-07-15: Progression Matters More Than Visual Quirk.

---

### [CP-DEBUG] | 2026-07-15: Restored the Development Stylesheet After a Production Build

**Summary:** The existing `localhost:3000` development server began returning `500` for `/_next/static/css/app/layout.css` after a production build rewrote the same `.next` directory. Stopped the stale development and production preview processes, then restarted the development server so it regenerated a coherent development cache.

**Files/Modules Affected:** `.next` runtime cache and the local preview process; no product source files changed for the repair.

**Key Trade-off:** Kept one development server on port 3000 instead of running `next dev` and `next start` concurrently against the same build directory.

**Evidence:** Before restart, the development stylesheet returned `500 Internal Server Error`; after restart, the same route returned `200 OK` with `Content-Type: text/css` and a 41,977-byte body.

**Follow-ups:** Avoid running `next build` while a development server for this checkout is active, or configure separate build directories for concurrent dev and production previews.

---

<!-- SESSION: 2026-07-19 20:00 | interactive product storytelling -->

### [CP-MILESTONE] | 2026-07-19: Marketing Screenshots Became a Code-Native Product Workspace

**Summary:** Replaced the homepage's screenshot composition with an interactive, simulated Powerhour workspace. The embed reuses patterns from the actual dashboard hero, Ticker panel, projection tabs, subscription audit, and Budget Planner while excluding application data hooks and financial-account access.

**Files/Modules Affected:** `components/product-workspace.client.tsx`, `components/home-sections.tsx`, `components/site-header.tsx`, `app/globals.css`, `design-qa.md`, `output/design-qa/**`.

**Key Trade-off:** The marketing site duplicates a presentation-safe subset of product UI instead of importing the authenticated application components directly. This avoids coupling the public site to SWR, AI SDK, database, and account-session dependencies while preserving the product's information architecture and interaction language.

**Evidence:** Ticker prompts, report generation, forecast horizons and sub-tabs, subscription deactivation/reset, planner generation, and target saving were exercised in the browser. Desktop and 390 × 844 mobile comparisons were captured; the final clean browser session reported no console errors. `npm run build` and `git diff --check` passed, and `design-qa.md` records `final result: passed`.

**Follow-ups:** If the product and marketing repositories converge later, consider extracting these presentation-safe states into a shared package with explicit mock-data adapters.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-AHA-MOMENT] | 2026-07-19: Let Visitors Complete the Product Story.

---

### [CP-REFACTOR] | 2026-07-19: Product Workspace Became an Alternating Browser Narrative

**Summary:** Replaced the four-tab marketing demo with four complete editorial chapters. Each chapter now pairs one product outcome with its own interactive Powerhour view, alternates copy and UI placement on desktop, returns to copy-first order on mobile, and presents the application inside route-specific browser chrome.

**Files/Modules Affected:** `components/product-workspace.client.tsx`, `components/home-sections.tsx`, `design-qa.md`, `output/design-qa/**`.

**Key Trade-off:** The homepage is longer, but each product capability now earns a readable story moment and remains directly usable. Browser controls are presentation-only; the embedded Powerhour controls continue to own the interaction.

**Evidence:** Dashboard report generation, forecast horizon and recurring-view changes, subscription deactivation, planner generation, and planner saving were exercised in the browser. Desktop and 390 × 844 mobile comparison boards passed with no horizontal overflow or console errors. `npm run lint`, `npm run build`, and `git diff --check` passed.

**Follow-ups:** Measure chapter-level scroll depth and interaction starts after deployment before further increasing narrative length.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-POSITIONING] | 2026-07-19: Pair Every Product Claim With Its Working Context.

---

### [CP-PIVOT] | 2026-07-19: Marketing Frame Now Begins at the Real App Boundary

**Summary:** Removed the invented browser tab, address bar, and navigation controls from the interactive marketing scenes. Runtime inspection confirmed that Docker hosts the Next.js service on port 3000, while the user-facing product begins after login at Powerhour's demo banner, navigation, and route content.

**Files/Modules Affected:** `components/product-workspace.client.tsx`, `design-qa.md`, `output/design-qa/**`.

**Key Trade-off:** The outer rounded presentation surface remains to separate the embedded product from the marketing page, but all visible chrome inside it now belongs to the Powerhour application.

**Evidence:** The implementation was compared with `app/(dashboard)/layout.tsx`, `components/dashboard/nav.tsx`, the product README deployment flow, and the real dashboard screenshot. Desktop and 390 × 844 captures show the corrected application boundary with no horizontal overflow or console errors; lint passed.

**Follow-ups:** None identified.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-TRUST] | 2026-07-19: Infrastructure Must Not Masquerade as Product UI.

---

<!-- SESSION: 2026-09-02 20:49 PDT | testing strategy proposal -->

### [CP-TESTING] | 2026-09-02: Proposed Quality Suite for the Marketing Site

**The Context & Problem:**
- The strict TypeScript Next.js marketing site has no unit-test runner, browser-test configuration, coverage reporting, or GitHub Actions workflow. Its most behavior-dense surface is the simulated product workspace; regressions in routing, metadata, accessibility, or visual layout would also be highly visible on a public marketing site.

**Design Decisions & Trade-offs:**
- **Choice:** Propose Vitest plus React Testing Library for deterministic logic and component behavior, Playwright for production-server functional, accessibility, responsive, and visual tests, and required GitHub Actions checks for every pull request.
- **Alternatives Considered:** A single browser-test layer would leave URL normalization, middleware, and state-edge coverage slow and opaque. A hosted visual-regression service would add an external dependency before the repository needs it.
- **Why:** This keeps fast feedback local while testing the real rendered product story. Committed, Linux-generated Playwright baselines and CI artifacts create an auditable visual review trail without requiring a SaaS account.

**The Pivot/Revision:**
- Planning only; no dependencies, configuration, test files, or repository settings were changed.

**Implementation Notes:**
- **Files/Modules Affected:** Proposed additions include `vitest.config.mts`, `playwright.config.ts`, `tests/**`, `.github/workflows/quality.yml`, `docs/testing.md`, and `CONTRIBUTING.md`; initial test targets are `components/product-workspace.client.tsx`, `middleware.ts`, `lib/site-config.ts`, client navigation, metadata, robots, and sitemap routes.
- **Core Pattern Introduced:** Test behavior through accessible UI and browser contracts; reserve unit tests for deterministic state and URL/redirect logic; use stable semantic selectors instead of implementation snapshots.

**Verification & Evidence:**
- Repository inspection confirmed `package.json` exposes only `dev`, `build`, `start`, and `lint`; no test or CI configuration exists. Prior journal entries record manual browser and build checks, but no automated suite has yet been run.

**Documentation & References Utilized:**
- [Next.js Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest) - recommends Vitest with React Testing Library and notes async Server Components are better exercised end-to-end.
- [Next.js Playwright guide](https://nextjs.org/docs/app/guides/testing/playwright) - supports browser-level testing of an App Router site.

**Code Snapshot/Diff Concept:**
- `static/type/unit` checks run before browser tests; Chromium snapshots run from a fixed Linux CI environment; Firefox and WebKit verify functional parity; reports and traces are retained on failure.

**Cross-Log:**
- None. This is an engineering-quality proposal; no user-behavior finding was established.

**Open Questions / Follow-ups:**
- Implement the fast suite first, record its honest initial coverage and performance baselines, then enforce ratcheting thresholds and GitHub branch protection after the checks have proven stable.

---

<!-- SESSION: 2026-09-04 12:46 PDT | automated quality suite -->

### [CP-TESTING] | 2026-09-04: Layered Quality Gates for the Marketing Site

**The Context & Problem:**
- The public Next.js site had no repeatable verification beyond linting. Its interactive product workspace, redirects, metadata routes, accessibility, and visual presentation therefore relied on manual checks despite being prominent visitor-facing surfaces.

**Design Decisions & Trade-offs:**
- **Choice:** Add Vitest plus React Testing Library for deterministic logic and component state, Playwright for Chromium/Firefox/WebKit acceptance coverage, axe-backed accessibility checks, Chromium visual snapshots, coverage thresholds, and a GitHub Actions quality workflow.
- **Alternatives Considered:** A browser-only suite would make state and routing feedback slower; a hosted visual-regression service would add an external dependency before the repository needs one.
- **Why:** The split preserves quick local feedback while testing the actual rendered user journey. Versioned snapshots and CI artifacts provide an auditable review trail without a SaaS dependency.

**The Pivot/Revision:**
- A shared development port initially pointed tests at an unrelated local application, and a shared Next build cache had previously caused preview instability. Browser tests now use port 3210, never reuse an existing server, and place their cache in `.next-playwright`; `tsconfig.json` explicitly includes that generated type directory so Next does not rewrite the configuration during test runs.

**Implementation Notes:**
- **Files/Modules Affected:** `vitest.config.mts`, `playwright.config.ts`, `tests/**`, `tests/setup.ts`, `package.json`, `next.config.js`, `.github/workflows/quality.yml`, `.github/pull_request_template.md`, `.gitignore`, `docs/testing.md`, and `README.md`. The audit also improved landmarks, focus targeting, navigation labels, interactive-control names, and contrast tokens in the public UI.
- **Core Pattern Introduced:** Test stable user-facing contracts through semantic queries, browser navigation, keyboard use, and screenshots; keep coverage gates focused on testable client and routing logic.

**Verification & Evidence:**
- `npm run lint`, `npm run typecheck`, and `npm run build` passed.
- The coverage run passed 20 tests across four files with 91.35% statements, 84.25% branches, 92.75% functions, and 94.11% lines—above the configured 80/70/80/80 thresholds.
- The cross-browser acceptance suite passed all 39 cases; the visual suite passed all nine committed Chromium baselines.

**Documentation & References Utilized:**
- [Next.js Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest) - supports Vitest and React Testing Library for component and utility tests.
- [Next.js Playwright guide](https://nextjs.org/docs/app/guides/testing/playwright) - supports browser-level testing for App Router applications.

**Code Snapshot/Diff Concept:**
- `static quality + coverage → cross-browser acceptance + accessibility → Chromium visual baseline` runs locally and as pull-request checks, with Playwright traces, video, screenshots, and reports retained on failure.

**Cross-Log:**
- Related product entry: `[PI-ACCESSIBILITY] | 2026-09-04: Accessibility Is a First-Visit Trust Requirement` in `./docs/product_insights.md`.

**Open Questions / Follow-ups:**
- Configure the documented GitHub branch-protection checks after the workflow runs on the remote repository. Refresh Browserslist data and separately assess the existing dependency-audit findings; both are intentionally outside this testing-suite change.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-ACCESSIBILITY] | 2026-09-04: Accessibility Is a First-Visit Trust Requirement.

---

<!-- SESSION: 2026-09-04 14:50 PDT | rebased quality verification -->

### [CP-DEBUG] | 2026-09-04: Quality Gate Caught Keyboard-Inaccessible Deployment Commands

**The Context & Problem:**
- Replaying the testing suite on top of newly merged deployment documentation exposed two horizontally scrollable command blocks on `/deploy` that keyboard users could not focus.

**Design Decisions & Trade-offs:**
- **Choice:** Make each scrollable command block keyboard focusable and give it an accessible label.
- **Alternatives Considered:** Suppressing the axe rule would conceal a real WCAG keyboard-accessibility defect.
- **Why:** A long command must be reachable with the keyboard before it can be scrolled and read in a narrow viewport.

**The Pivot/Revision:**
- The prior visual baselines correctly failed after the merged deployment and documentation changes. After reviewing the intended content expansion, the affected snapshots were regenerated and verified in normal comparison mode.

**Implementation Notes:**
- **Files/Modules Affected:** `app/deploy/page.tsx` and the affected Playwright visual snapshots.
- **Core Pattern Introduced:** Treat focusability as part of every `overflow-x-auto` code sample’s contract.

**Verification & Evidence:**
- `npm run lint`, `npm run typecheck`, `npm run test:coverage`, and `npm run build` passed.
- `npm run test:a11y` passed after the fix; the CI-mode cross-browser suite passed all 39 cases, and the normal visual suite passed all nine snapshots.

**Cross-Log:**
- Related product entry: `[PI-ACCESSIBILITY] | 2026-09-04: Deployment Commands Must Remain Keyboard-Readable` in `./docs/product_insights.md`.

**Open Questions / Follow-ups:**
- None identified.

> **[CROSS-LOG]** Product impact logged in `./docs/product_insights.md`
> — see [PI-ACCESSIBILITY] | 2026-09-04: Deployment Commands Must Remain Keyboard-Readable.

---
