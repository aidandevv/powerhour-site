# Alternating interactive product-story QA

## Comparison target

- **Reference URL:** `https://hilos.sh/`
- **Hilos desktop source truth:** `output/design-qa/hilos-alternating-desktop-reference.jpg`
- **Hilos mobile source truth:** `output/design-qa/hilos-mobile-reference.jpg`
- **Powerhour product source truth:** `public/powerhour-app/light-suite/01-dashboard-overview.png`, plus the projection, subscription, and planner captures in the same directory.
- **Desktop implementation:** `output/design-qa/powerhour-upgraded-copy-desktop.jpg`
- **Mobile implementation:** `output/design-qa/powerhour-upgraded-copy-mobile.jpg`
- **Desktop comparison board:** `output/design-qa/production-window-desktop-comparison.jpg`
- **Mobile comparison board:** `output/design-qa/production-window-mobile-comparison.jpg`
- **Product-detail comparison board:** `output/design-qa/powerhour-production-window-focused-comparison.jpg`
- **Viewports:** Desktop 1440 × 900; mobile 390 × 844.
- **State:** Hilos editorial story with an integrated working scene; Powerhour dashboard chapter in its default state, plus forecast, recurring-cost, and planner interaction states.

## Full-view comparison evidence

- `production-window-desktop-comparison.jpg` places Hilos and Powerhour in one comparison image. Both use a restrained field, a large job-oriented statement, generous whitespace, and an interface scene that carries the proof. Powerhour alternates the copy and product window from side to side across four consecutive chapters.
- `production-window-mobile-comparison.jpg` verifies the shared mobile reading order: label, editorial statement, short explanation, then the product scene. Powerhour keeps the application window full-width and moves every chapter back to copy-first order on small screens.
- The implementation deliberately retains Powerhour's PP Kyoto / PP Mori typography, blue-gray palette, copy voice, and actual product information architecture. It does not copy Hilos' illustrations, characters, chat content, or pastel feature cards.

## Focused-region comparison evidence

- `powerhour-production-window-focused-comparison.jpg` places the actual Powerhour dashboard screenshot beside the code-native marketing embed. The production-style scene preserves the brand navigation, dashboard title, Generate Report action, total-net-worth hierarchy, metric cards, account overview, and Ticker surface.
- `powerhour-production-window-mobile.jpg` verifies the application viewport at 390 px: the product header, active route, and primary action remain readable without horizontal overflow.
- Additional implementation captures verify the forecast and planner scenes at readable scale: `powerhour-alternating-desktop-02.jpg`, `powerhour-alternating-mobile-app.jpg`, and `powerhour-alternating-mobile-planner.jpg`.

## Findings

- No actionable P0, P1, or P2 findings remain.
- No source imagery is approximated or replaced. The showcase uses React components and the existing Powerhour design tokens rather than screenshot or illustration substitutes.

## Required fidelity surfaces

- **Fonts and typography:** The existing PP Kyoto display face and PP Mori body/UI face remain intact. Editorial statements carry the visual weight of the Hilos reference while UI text retains Powerhour's denser product scale. No tested heading, route, metric, or control label truncates incorrectly.
- **Spacing and layout rhythm:** Four chapters use generous vertical separation and a 4/8 editorial-to-product grid. Desktop order alternates; mobile collapses to copy then product. Application windows share consistent radii, elevation, and internal padding.
- **Colors and visual tokens:** Existing `brand`, `surface`, `surface-alt`, `border`, `warning`, `success`, and text tokens are used throughout. No invented operating-system or browser chrome competes with the product palette.
- **Image quality and asset fidelity:** The product story is code-native. Hilos imagery is not copied, hotlinked, traced, or approximated. The real Powerhour screenshots are retained only as QA source truth.
- **Copy and content:** Generic decision-loop language was replaced with product-specific outcomes: unified dashboard, cash-flow projections, subscription audit, and AI budget planner. Headlines now lead with the user benefit, supporting copy explains the mechanism, and the implementation-explainer paragraph beneath the sequence has been removed.
- **Icons and chrome:** The marketing embed begins at the real Powerhour application shell. It does not add browser controls, an address bar, operating-system controls, substitute illustration, or icon art.
- **Responsiveness and accessibility:** No horizontal overflow was observed at 390 × 844. Forms keep explicit labels, subscription actions have item-specific accessible names, planner output remains announced, and core buttons preserve visible focus/hover states.

## Interaction verification

- Generated the dashboard report-ready state.
- Changed the projection horizon and switched from expense-calendar to recurring-item view.
- Deactivated Streambox and verified the annual savings changed to `$227.88/yr saved`.
- Selected “Plan a week in Japan,” built the plan, and saved it to the “Saved to targets” state.
- Previous Ticker preset and typed-question coverage remains valid; the storytelling refactor did not change those controls.
- Verified the final mobile document has no horizontal overflow.
- Verified the final browser load reported no console errors.
- `npm run lint`, `npm run build`, and `git diff --check` passed.

## Comparison history

1. The previous implementation used four tabs above one shared product frame.
2. The new implementation renders four complete editorial chapters and alternates copy and product from side to side on desktop.
3. The first alternating implementation added route-specific browser chrome around the Powerhour application header.
4. Mobile QA confirmed the browser frame remained readable but exposed that chapter numbering added unnecessary marketing ornament. The numbers were removed and replaced with a restrained rule before the final captures.
5. Runtime inspection confirmed that Docker hosts the Next.js service on port 3000; users then open the web application, log in, and enter the dashboard shell. The invented browser controls were removed so each marketing scene begins at the real demo banner and application navigation.
6. Founder feedback requested a live-production presentation. The in-window simulated-data banner was removed while the section-level account-safety disclosure remained.
7. Founder feedback then requested stronger copy and removal of the remaining implementation disclaimer. The section eyebrow, headline, four chapter labels, benefit headlines, supporting paragraphs, and interaction prompt were rewritten; the trailing explanatory paragraph was deleted.
8. Final desktop, mobile, and focused product-detail comparisons found no actionable P0, P1, or P2 differences.

## Follow-up polish

- Consider measuring scroll depth and interaction starts per chapter after deployment to learn whether all four beats earn attention.

final result: passed
