# Docs Site Plan (Confidence + SEO + Recruiter Lens)

## Objective

Launch a documentation surface that does three jobs at once:

1. Improve user confidence with clear setup, architecture, and security explanations.
2. Drive organic traffic through intent-aligned SEO topic clusters.
3. Help recruiters quickly validate engineering quality through concrete technical artifacts.

## Audience Priorities

- New user evaluating trust and setup effort.
- Technical evaluator verifying architecture and security credibility.
- Recruiter/hiring manager scanning for engineering maturity and execution quality.

## Information Architecture (Phase 1 to 3)

1. `docs/getting-started`
2. `docs/architecture`
3. `docs/security-model`
4. `docs/api-reference`
5. `docs/contributing-and-hiring`

## SEO Strategy

- Cluster pages by intent, not by internal team structure.
- Add internal links from marketing pages (`/features`, `/security`, `/deploy`) into relevant docs pages.
- Keep title tags and descriptions specific to query intent.
- Add structured data to root docs pages (`TechArticle`) and keep sitemap updated.
- Build depth over breadth: publish complete foundational docs first, then expand with long-tail pages.

## Confidence Strategy

- Every critical claim should map to a verifiable source (repository path, config reference, API route, or schema).
- Surface explicit deployer responsibilities vs. app-level controls.
- Provide implementation examples and failure-mode notes where relevant.

## Recruiter Strategy

- Include a dedicated "Contributor and Hiring" track with:
  - architecture decision rationale,
  - coding/review standards,
  - testing and release workflow,
  - issue triage conventions.
- Keep this section linked from both docs and repository entry points.

## Build Order

1. Publish `/docs` landing page (done in this step) as IA + messaging sketch.
2. Ship `docs/getting-started` and `docs/architecture` as highest-value entry points.
3. Ship `docs/security-model` and cross-link to `/security`.
4. Add API reference and contributor/hiring documentation.
5. Expand with FAQ and troubleshooting pages based on search/query data.

## Success Metrics (Initial)

- Increased indexed docs pages and impressions for self-hosted/documentation terms.
- Improved conversion from docs visits to repo visits/deploy guide visits.
- Reduced onboarding questions already answered in docs.
- Higher recruiter engagement on technical pages (time on page + click-through to source).
