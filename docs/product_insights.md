# Product Insight Journal
> Chronological log of user pain points, UX friction, product hypotheses,
> positioning insights, roadmap trade-offs, experiments, and product decisions.

---

### [PI-POSITIONING] | 2026-06-22: Real Product Screenshots Improve Marketing Trust

**Observation:**
- The marketing page needed actual app screenshots from the Powerhour demo build so visitors can see the dashboard, ledger, planning, subscription, and AI Budget Planner experience before reading feature claims.

**Why It Matters:**
- For a self-hosted finance product, credibility and trust come partly from showing the real operational surface: what data appears, where AI lives, and how workflows are structured.

**Evidence:**
- **Source:** Founder request to reference the main `powerhour` context and add screenshots tactically to the marketing page and README.
- **Strength:** Medium

**Hypothesis / Next Step:**
- If the marketing page leads with real workflow screenshots, visitors should understand the product faster and trust the self-hosted/AI claims more because the UI is concrete instead of abstract.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-MILESTONE] | 2026-06-22: Product Screenshots Integrated Into Marketing Page.

---

### [PI-POSITIONING] | 2026-07-12: The Marketing Page Should Tell a Workflow Story

**Observation:**
- The prior homepage used authentic app screenshots, but presented them as a gallery. The screenshots proved that the product exists without helping a new visitor understand how its financial workflows connect.

**Why It Matters:**
- Discovery-stage visitors need a reason to care before feature inventory. A sequence from question, to forecast, to subscription review, to plan better matches the product's practical value and makes the self-hosted claim feel concrete.

**Evidence:**
- **Source:** Founder request and manual review of the homepage and Powerhour demo screenshots.
- **Strength:** Medium

**Hypothesis / Next Step:**
- If each screenshot carries one stage of a continuous financial workflow, visitors will understand Powerhour's use case and trust its operational depth faster than they would from a grid of isolated feature images. Validate with a release-review walkthrough and, when available, visitor behavior data.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-REFACTOR] | 2026-07-12: Product Screens Became a Guided Marketing Narrative.

---

### [PI-POSITIONING] | 2026-07-12: Preserve Product Character Over Generic Marketing Polish

**Observation:**
- The founder preferred the product-story structure but rejected treatment that displaced the shader gradient or added numbered, overly explained screenshot framing. The original visual character is part of the marketing surface, not interchangeable decoration.

**Why It Matters:**
- For a self-hosted finance product, restraint and continuity with the product interface can build more credibility than generic conversion patterns or AI-style visual flourishes.

**Evidence:**
- **Source:** Founder feedback on the first marketing redesign pass.
- **Strength:** Medium

**Hypothesis / Next Step:**
- Keep future marketing additions subordinate to the established visual system; use real product context and concise copy instead of invented labels, numbering, or decorative proof points.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-PIVOT] | 2026-07-12: Reinstated the Shader-Led Hero.

---

### [PI-POSITIONING] | 2026-07-12: Product Screens Need Contextual Roles

**Observation:**
- The Ticker/transactions screenshot felt detached when it sat beside the hero copy on the shader background. It is clearer when it begins a body sequence that explains the workflow it represents.

**Why It Matters:**
- Discovery-stage visitors need to understand what each app view helps them do. Giving every screenshot a specific place in the story reduces visual noise and makes the product feel more coherent.

**Evidence:**
- **Source:** Founder feedback on the rendered hero composition.
- **Strength:** Medium

**Hypothesis / Next Step:**
- Use product screens within feature context rather than as generic proof. Pair each one with the decision or task it supports, while keeping the hero focused on the product promise.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-REFACTOR] | 2026-07-12: Moved Product Evidence Into the Page Narrative.

---

### [PI-POSITIONING] | 2026-07-15: Product Evidence Should Read as One Decision Sequence

**Observation:**
- A reference review of the Hilos landing-page composition showed that its product UI works because an editorial statement establishes the job first, then one primary interface scene and a few smaller outcomes make the story concrete. Powerhour's product evidence can use the same compositional principle without adopting Hilos' illustration style.

**Why It Matters:**
- Visitors evaluating a self-hosted finance product need to see how a transaction becomes a decision, rather than scan four disconnected capability screenshots.

**Evidence:**
- **Source:** Founder-provided Hilos page captures and review of Powerhour's existing ledger, forecast, subscription-audit, and planner screenshots.
- **Strength:** Medium

**Hypothesis / Next Step:**
- Keep the existing gradient-led hero intact. Recompose the body product section around a large Ticker/ledger scene with compact forecast, saving, and planning outcomes connected by restrained product-specific linework; use portable real app components where practical rather than recreating UI in SVG.

---

### [PI-EXPERIMENT] | 2026-07-15: Test a Single Product Decision Sequence

**Observation:**
- The marketing page now presents a ledger as the primary proof surface, with forecast, recurring-cost, and planning outcomes as smaller connected moments. The primary gradient-led hero remains unchanged.

**Why It Matters:**
- Discovery-stage visitors should be able to understand a coherent financial decision path before evaluating the full feature inventory.

**Evidence:**
- **Source:** Founder-approved implementation direction and production build of the isolated marketing-section change.
- **Strength:** Medium

**Hypothesis / Next Step:**
- If visitors encounter the product as activity flowing into forecasting, savings review, and planning, its practical value will be clearer than with alternating, independently framed screenshots. Complete a browser-based visual review before treating the direction as accepted.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-REFACTOR] | 2026-07-15: Product Evidence Became a Decision Composition.

---

### [PI-AHA-MOMENT] | 2026-07-15: Branch Direction Carries the Product Story

**Observation:**
- The first implementation placed every outcome in one right-hand stack. Founder feedback showed that this read as a list of features rather than a central financial workspace branching into distinct decisions.

**Why It Matters:**
- The spatial relationship is part of the explanation: forecast belongs above the present ledger, recurring-cost action sits beside it, and planning follows below it.

**Evidence:**
- **Source:** Founder review of the rendered product-preview capture.
- **Strength:** Medium

**Hypothesis / Next Step:**
- If each outcome has a direction that matches its role in the story, visitors should understand Powerhour as a connected decision system faster than they would from a single stacked column. Validate the revised desktop composition visually before accepting it.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-REFACTOR] | 2026-07-15: Decision Outcomes Moved Around the Ledger.

---

### [PI-EXPERIMENT] | 2026-07-15: Symmetry Can Carry Quirk Without Losing Clarity

**Observation:**
- The directional branch experiment still felt right-heavy. Founder feedback called for a more uniform mirrored arrangement while preserving a small amount of the Hilos reference's personality.

**Why It Matters:**
- A symmetrical structure can explain that forecast and recurring-cost review are peer decisions, with planning as the centered next step; controlled irregularity can keep that structure from feeling generic.

**Evidence:**
- **Source:** Founder review of the second rendered product-preview capture.
- **Strength:** Medium

**Hypothesis / Next Step:**
- If equal cards mirror each other around a centered ledger while only the rotations and connectors carry visual play, visitors should perceive both order and personality. Review the live composition before accepting the quirk treatment.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-REFACTOR] | 2026-07-15: Product Story Became a Mirrored Constellation.

---

### [PI-POSITIONING] | 2026-07-15: Progression Matters More Than Visual Quirk

**Observation:**
- The symmetrical constellation clarified the peer relationship between forecasting and recurring-cost review, but the rotations, dotted paths, and editorial aside made the product story feel too quirky. Founder feedback favored the cleaner view and asked for a stronger marketing progression.

**Why It Matters:**
- Powerhour needs to feel considered and distinctive without making its financial workflow look ornamental. A clear sequence of verbs can carry more product meaning than decorative personality.

**Evidence:**
- **Source:** Founder review of the mirrored constellation implementation.
- **Strength:** Strong

**Hypothesis / Next Step:**
- A centered sequence—understand today, anticipate pressure, choose what to change, and build the next move—will communicate the product's value faster while preserving the balanced composition. Validate the revised pacing and connector geometry in a browser before accepting it.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-PIVOT] | 2026-07-15: Quirk Gave Way to a Clean Decision Loop.

---

### [PI-AHA-MOMENT] | 2026-07-19: Let Visitors Complete the Product Story

**Observation:**
- Static screenshots proved that Powerhour existed but required visitors to infer how asking a question, reviewing upcoming pressure, changing a recurring cost, and building a plan connect. The new embedded workspace lets a visitor perform each step and see the product state update.

**Why It Matters:**
- Discovery-stage visitors can now experience the decision loop before they install or self-host the application. The simulated-data disclosure preserves trust while the live controls reduce the translation gap between marketing claims and product behavior.

**Evidence:**
- **Source:** Founder request, Hilos reference walkthrough, review of the actual Powerhour application components, and desktop/mobile browser QA of the implemented workspace.
- **Strength:** Medium

**Hypothesis / Next Step:**
- If visitors can complete one small financial decision loop on the homepage, they will understand Powerhour's practical value and differentiation faster than visitors who only see screenshots. Measure story-tab engagement and downstream self-hosting or GitHub clicks after deployment.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-MILESTONE] | 2026-07-19: Marketing Screenshots Became a Code-Native Product Workspace.

---

### [PI-POSITIONING] | 2026-07-19: Pair Every Product Claim With Its Working Context

**Observation:**
- A single tabbed demo made the product interactive but asked visitors to choose the story order themselves. Alternating editorial chapters let the marketing page set the sequence while keeping every feature directly usable inside a familiar browser and application context.

**Why It Matters:**
- Visitors can connect each promise to the exact Powerhour surface that fulfills it without mentally translating a screenshot or switching a shared demo into the right state first.

**Evidence:**
- **Source:** Founder request to adopt Hilos' alternating storytelling cadence and make the feature showcase resemble the application as users actually encounter it.
- **Strength:** Strong

**Hypothesis / Next Step:**
- If the page leads visitors through understand, anticipate, change, and plan as four scroll-led product moments, more visitors will reach and use the later planning interactions than in the tabbed version. Measure chapter visibility and first interaction per chapter after deployment.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-REFACTOR] | 2026-07-19: Product Workspace Became an Alternating Browser Narrative.

---

### [PI-TRUST] | 2026-07-19: Infrastructure Must Not Masquerade as Product UI

**Observation:**
- Docker explains how Powerhour is hosted, not what users operate. Showing invented browser controls around the product made the marketing scene less faithful even though the underlying app is ultimately opened through a URL.

**Why It Matters:**
- Discovery-stage visitors should see the same boundary they encounter after login: demo/status banner, product navigation, and active route content. Extra chrome creates ambiguity about whether Powerhour is a browser extension, desktop application, or web dashboard.

**Evidence:**
- **Source:** Founder correction plus inspection of the product README, Docker Compose port mapping, dashboard layout, navigation component, and real product captures.
- **Strength:** Strong

**Hypothesis / Next Step:**
- If the embedded scene begins at the application shell rather than the hosting or browser layer, visitors will understand the product form factor faster and trust the demo as a faithful representation.

> **[CROSS-LOG]** Engineering implementation logged in `./docs/dev_journal.md`
> — see [CP-PIVOT] | 2026-07-19: Marketing Frame Now Begins at the Real App Boundary.

---

### [PI-POSITIONING] | 2026-07-19: Name the Product Outcome, Not the Narrative Device

**Observation:**
- “Decision loop” language and implementation-explainer copy described how the marketing section was constructed instead of what Powerhour helps a user accomplish.

**Why It Matters:**
- Product-specific labels such as unified dashboard, cash-flow projections, subscription audit, and AI budget planner make each story beat immediately legible and let the interface serve as proof without a meta explanation beneath it.

**Evidence:**
- **Source:** Founder feedback on the alternating product-story copy.
- **Strength:** Strong

**Hypothesis / Next Step:**
- Benefit-led headlines paired with concrete product labels should help visitors understand the sequence faster than generic process language. Keep future copy focused on the financial outcome and mechanism, not the storytelling framework.

---

### [PI-EXPERIMENT] | 2026-07-19: Motion Should Land on Product Meaning

**Observation:**
- The current Powerhour marketing surface already contains four distinct, portfolio-worthy state changes: dashboard insight, projection horizon/view changes, subscription savings, and AI planner output. The product screenshots show a restrained blue-gray financial UI with clear warning, success, and active states.

**User / Journey Context:**
- **User Segment:** Portfolio visitor or prospective Powerhour user.
- **Journey Stage:** Discovery / activation.
- **User Goal:** Understand what the product actually does and remember its differentiating moments.

**Jobs-to-Be-Done Lens:**
- **Functional Job:** See how Powerhour turns financial data into an actionable decision.
- **Emotional/Social Job:** Feel that the product is calm, intelligent, and considered rather than merely decorative.

**Evidence:**
- **Source:** Manual walkthrough of the repository’s real-product screenshots, the code-native marketing workspace, and its existing interaction states.
- **Strength:** Medium
- **Notes:** The repository includes dedicated light and interaction screenshot suites plus working controls for forecast, subscription, Ticker, and planner states.
- **Counter-Evidence:** No portfolio-viewer analytics or motion preference testing yet.

**Product Impact:**
- Motion can make the value transition memorable, but global jitter or decorative effects could weaken trust in a finance product. The visual language should use small, purposeful changes attached to updated data and preserve the actual application boundary.

**Product Risk Lens:**
- **Primary Risk:** Trust
- **Why:** Financial interfaces need motion to clarify state changes, not imply instability or obscure important amounts.

**Hypothesis:**
- If each portfolio animation emphasizes one product outcome—forecast confidence, recovered savings, answered questions, or a concrete plan—then visitors will understand Powerhour’s differentiation faster and remember the work as product design rather than a generic UI reel.

**Decision / Next Step:**
- Prototype a small `/motion-lab` or standalone reel with four 6–10 second scenes. Start with restrained jitter only on updated values or status chips, and include reduced-motion behavior before considering broader effects.

**Priority Signal:**
- **Reach:** Medium
- **Impact:** Medium
- **Confidence:** Medium
- **Effort:** Low

**Potential Content Angle:**
- “I used motion to show the moment financial information becomes a decision,” supported by before/after frames and the reasoning behind each animation.

---

### [PI-ACCESSIBILITY] | 2026-09-04: Accessibility Is a First-Visit Trust Requirement

**Observation:**
- Automated accessibility scans of the public marketing and documentation routes exposed avoidable friction in landmark structure, keyboard focus targeting, navigation labels, control names, and muted/status color contrast. The issues were corrected alongside the quality suite rather than leaving an inclusive experience to manual review.

**User / Journey Context:**
- **User Segment:** Prospective Powerhour users and evaluators using keyboards, assistive technology, smaller screens, or reduced-motion preferences.
- **Journey Stage:** Discovery.
- **User Goal:** Understand the product and its security posture without losing context, encountering inaccessible controls, or questioning the product's polish.

**Jobs-to-Be-Done Lens:**
- **Functional Job:** Navigate public product information and interactive demonstrations successfully.
- **Emotional/Social Job:** Feel confident that a financial product is careful, trustworthy, and designed for a broad range of users.

**Evidence:**
- **Source:** Axe scans, Playwright keyboard and responsive journeys, and implementation review across the public routes.
- **Strength:** Medium.
- **Notes:** The scans identified concrete semantic, focus, naming, and contrast defects. The corrected routes now pass the automated accessibility checks as part of the Chromium acceptance suite.
- **Counter-Evidence:** No screen-reader usability study, visitor feedback, or accessibility analytics has been collected yet.

**Product Impact:**
- Public-site accessibility is part of the product's first trust signal. Addressing defects before release reduces exclusion and makes the site’s professional quality more credible to evaluators.

**Product Risk Lens:**
- **Primary Risk:** Accessibility.
- **Why:** Visitors who cannot reliably navigate or read public product information cannot evaluate Powerhour on equal terms.

**Hypothesis:**
- If accessibility checks remain required alongside browser acceptance tests, future marketing changes will preserve inclusive navigation and strengthen first-visit trust because regressions become visible before review or release.

**Decision / Next Step:**
- Keep automated accessibility coverage on representative public routes. Add a manual screen-reader spot check when shared navigation or the interactive product workspace changes materially.

**Priority Signal:**
- **Reach:** High.
- **Impact:** High.
- **Confidence:** High.
- **Effort:** Low.

**Potential Content Angle:**
- A case-study note on treating accessibility tests as a release-quality signal rather than a late compliance task.

**Cross-Log:**
- Related engineering entry: `[CP-TESTING] | 2026-09-04: Layered Quality Gates for the Marketing Site` in `./docs/dev_journal.md`.

**Open Questions:**
- Validate the automated findings with real assistive-technology users or a structured screen-reader review when the site has an appropriate research channel.

> **[CROSS-LOG]** Engineering root cause and test strategy logged in `./docs/dev_journal.md`
> — see [CP-TESTING] | 2026-09-04: Layered Quality Gates for the Marketing Site.

---

### [PI-ACCESSIBILITY] | 2026-09-04: Deployment Commands Must Remain Keyboard-Readable

**Observation:**
- A deployment-content update added horizontally scrollable command blocks that could not receive keyboard focus. The automated accessibility suite caught the issue before the branch was pushed.

**User / Journey Context:**
- **User Segment:** Self-hosters navigating with a keyboard or reviewing commands on a narrow screen.
- **Journey Stage:** Evaluation / setup.
- **User Goal:** Read and use the complete deployment command without losing context.

**Evidence:**
- **Source:** Axe scan of `/deploy` during CI-mode browser verification.
- **Strength:** Medium.
- **Notes:** The scan reported two serious keyboard-access failures. Adding focusability and descriptive labels cleared the scan.
- **Counter-Evidence:** No direct self-hoster feedback has been collected.

**Product Impact:**
- The self-hosting guide is a trust and activation surface; inaccessible commands can block users from completing setup.

**Product Risk Lens:**
- **Primary Risk:** Accessibility.
- **Why:** Keyboard users could not access horizontal command overflow independently.

**Hypothesis:**
- If every horizontally scrollable command block is focusable, keyboard users can inspect full commands and complete setup with the same information available to pointer users.

**Decision / Next Step:**
- Keep the axe check required and apply this focusability pattern to future scrollable technical content.

**Priority Signal:**
- **Reach:** Medium.
- **Impact:** High.
- **Confidence:** High.
- **Effort:** Low.

**Cross-Log:**
- Related engineering entry: `[CP-DEBUG] | 2026-09-04: Quality Gate Caught Keyboard-Inaccessible Deployment Commands` in `./docs/dev_journal.md`.

**Open Questions:**
- None identified.

> **[CROSS-LOG]** Engineering root cause logged in `./docs/dev_journal.md`
> — see [CP-DEBUG] | 2026-09-04: Quality Gate Caught Keyboard-Inaccessible Deployment Commands.

---
