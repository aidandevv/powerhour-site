# Dockerize Copy/Docs Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This plan touches prose/JSX content only — no application logic — so "tests" below mean `npm run build`/`npm run lint` plus a visual check in the browser, not unit tests.

**Goal:** Bring the marketing site's copy, `/deploy` guide, `/docs`, FAQ, and security checklist up to date with the deployment upgrades shipped in the product repo (`/Users/aidan/dev/powerhour`) — primarily the move from a manual `npm run dev`-only story to a dual-path Docker Compose deployment (dev quick start + versioned, checksum-verified production release images on GHCR), the `migrate` service, the optional `tls` nginx profile, and the documented backup/restore flow.

**Architecture:** This is a content-accuracy pass across a Next.js App Router marketing site. Most copy lives in typed data arrays in `lib/site-config.ts` and is rendered by `components/home-sections.tsx` and the `app/*/page.tsx` route files. No new routes or components are needed — only data/content edits to existing arrays and a few inline JSX blocks.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind. No new dependencies.

## Global Constraints

- Source of truth for all claims is `/Users/aidan/dev/powerhour` (README.md, `docker/docker-compose.yml`, `deploy/docker-compose.yml`, `docker/nginx/nginx.conf`, `package.json` scripts, `.env.example`). Do not invent commands or flags — copy exact service names, profile names, and script names from that repo.
- Do not hardcode a specific release version (e.g. `v1.0.0`) into site copy — the real README uses a placeholder pattern (`export POWERHOUR_VERSION=v1.0.0`) precisely so it doesn't go stale. Mirror that placeholder style.
- Keep the existing visual/Tailwind class structure untouched — only change text content, array data, and code-sample strings unless a task explicitly says to add new markup.
- Every task ends with `npm run build` succeeding and a manual look at the changed page via `npm run dev`.

---

### Task 1: Fix `DEPLOY_STEPS` to reflect the real dual-path setup

**Files:**
- Modify: `lib/site-config.ts:118-142`

**Context:** `DEPLOY_STEPS` currently describes a pure manual flow (`npm run db:migrate`, `npm run dev`) with zero Docker mention. The real repo's quick start is: `docker compose -f docker/docker-compose.yml up db -d` to start Postgres, then `npm run db:push` (not `db:migrate` — that's the drizzle-kit command name, but the README's documented dev flow uses `db:push`), then `npm run dev`. This array feeds both `/deploy` (full guide) and the homepage `DeploySection` (first 3 steps), so fixing it here fixes both surfaces at once.

**Interfaces:**
- Consumes: nothing new.
- Produces: `DEPLOY_STEPS` shape stays `{ step, title, body, code? }[]` — unchanged shape, so `app/deploy/page.tsx` and `DeploySection` in `components/home-sections.tsx` keep working without modification.

- [ ] **Step 1: Replace the `DEPLOY_STEPS` array**

Replace:
```ts
export const DEPLOY_STEPS = [
  {
    step: "1",
    title: "Clone and configure",
    body: "Clone the repository, copy .env.example to .env, and fill in your Plaid credentials, database URL, and session secret.",
    code: "git clone https://github.com/your-username/powerhour\ncp .env.example .env",
  },
  {
    step: "2",
    title: "Run database migrations",
    body: "Powerhour uses Drizzle ORM. Run the migration command to apply the full schema.",
    code: "npm run db:migrate",
  },
  {
    step: "3",
    title: "Start the application",
    body: "Start in development mode or build for production. Compatible with any Node.js host.",
    code: "npm run dev\n# or: npm run build && npm start",
  },
  {
    step: "4",
    title: "Connect your bank",
    body: "Log in and use the Plaid Link flow to connect financial institutions. Data syncs daily at 06:00 automatically.",
  },
];
```

With:
```ts
export const DEPLOY_STEPS = [
  {
    step: "1",
    title: "Clone and configure",
    body: "Clone the repository, copy .env.example to .env, and fill in your Plaid credentials, database URL, and session secret.",
    code: "git clone https://github.com/aidandevv/powerhour\ncd powerhour\nnpm install\nnpm run setup",
  },
  {
    step: "2",
    title: "Start Postgres with Docker",
    body: "Docker Engine with Compose v2 is the one hard infrastructure requirement. It runs Postgres for you — no local database install needed.",
    code: "docker compose -f docker/docker-compose.yml up db -d",
  },
  {
    step: "3",
    title: "Push the schema and start the app",
    body: "Apply the Drizzle schema, then run the dev server. Demo mode is available if you don't have Plaid credentials yet.",
    code: "npm run db:push\nnpm run dev",
  },
  {
    step: "4",
    title: "Go to production with a release image",
    body: "For a real deployment, skip the source checkout entirely: pull a versioned, checksum-verified image from GHCR and run the bundled production Compose file with its migrate service.",
    code: "export POWERHOUR_VERSION=v1.0.0\ncurl -fsSLO \"https://github.com/aidandevv/powerhour/releases/download/${POWERHOUR_VERSION}/docker-compose.yml\"\ndocker compose --profile tools run --rm migrate\ndocker compose up -d",
  },
];
```

- [ ] **Step 2: Build and visually verify**

Run: `npm run build`
Then: `npm run dev`, open `http://localhost:3000` (homepage `DeploySection` shows steps 1-3) and `http://localhost:3000/deploy` (shows all 4 steps) and confirm the new copy renders correctly with no layout breakage from longer code blocks.

- [ ] **Step 3: Commit**

```bash
git add lib/site-config.ts
git commit -m "docs: fix self-hosting steps to match Docker-based product setup"
```

---

### Task 2: Add Docker prerequisite and a production-path section to `/deploy`

**Files:**
- Modify: `app/deploy/page.tsx:21-36` (prerequisites list)
- Modify: `app/deploy/page.tsx:94` (insert a new section after the env vars table, before the CTA block)

**Context:** The prerequisites list on `/deploy` currently lists Node.js, PostgreSQL, Plaid, and a session secret — but never mentions Docker, even though Task 1's steps now require Docker Compose to start Postgres, and the real production path needs Docker Compose v2 to run the release image at all. Separately, the page has no mention of the TLS/nginx profile or backups, both of which are real, documented capabilities in the product repo's README (`docker/nginx/nginx.conf`, `--profile tls`, `pg_dump`/`gpg` backup via `docker compose exec`).

**Interfaces:**
- Consumes: nothing new from other tasks.
- Produces: nothing consumed by later tasks — this page renders standalone.

- [ ] **Step 1: Update the prerequisites list**

Replace:
```tsx
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-text-muted">
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> Node.js 22 or later
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> PostgreSQL 14 or later
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> Plaid developer account
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> A strong session secret (32+ chars)
          </li>
        </ul>
```

With:
```tsx
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-text-muted">
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> Docker Engine with Compose v2 (runs Postgres and, in production, the app itself)
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> Node.js 22 or later (source/dev workflow only — not required for the release image)
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> Plaid developer account
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> A strong session secret (32+ chars)
          </li>
        </ul>
```

- [ ] **Step 2: Add a "Production deployment" section after the env vars table**

Insert immediately after the closing `</div>` of the "Env vars reference" block (the one currently followed by `{/* CTA */}`):

```tsx
      {/* Production deployment */}
      <div className="mt-12 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-xl font-bold text-text">Production deployment</h2>
        <p className="mt-2 text-sm text-text-muted">
          The recommended production path uses a versioned, checksum-verified image from GHCR and never requires a
          source checkout or Node.js on the server.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-4 text-sm text-text">
          <code>{`export POWERHOUR_VERSION=v1.0.0
curl -fsSLO "https://github.com/aidandevv/powerhour/releases/download/\${POWERHOUR_VERSION}/docker-compose.yml"
curl -fsSLo .env.example "https://github.com/aidandevv/powerhour/releases/download/\${POWERHOUR_VERSION}/env.example"
curl -fsSLO "https://github.com/aidandevv/powerhour/releases/download/\${POWERHOUR_VERSION}/checksums.sha256"
sha256sum -c checksums.sha256

docker compose --profile tools run --rm migrate
docker compose up -d`}</code>
        </pre>
        <p className="mt-3 text-sm text-text-muted">
          The app binds to <code className="rounded bg-border px-1 py-0.5 text-xs">127.0.0.1:3000</code> by default —
          put Caddy, nginx, Traefik, or Cloudflare Tunnel in front for internet access. If you build from source
          instead, the bundled <code className="rounded bg-border px-1 py-0.5 text-xs">docker/docker-compose.yml</code>{" "}
          ships an opt-in nginx + Let&apos;s Encrypt profile (<code className="rounded bg-border px-1 py-0.5 text-xs">--profile tls</code>).
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Daily backups are a one-line cron job: <code className="rounded bg-border px-1 py-0.5 text-xs">docker compose exec -T db pg_dump</code>{" "}
          piped through gpg encryption. Restore with the same command in reverse.
        </p>
      </div>
```

- [ ] **Step 3: Build and visually verify**

Run: `npm run build`
Then: `npm run dev`, open `http://localhost:3000/deploy`, confirm the prerequisites list and new "Production deployment" section render with correct code formatting and no overflow on mobile widths.

- [ ] **Step 4: Commit**

```bash
git add app/deploy/page.tsx
git commit -m "docs: document Docker prerequisite, release images, TLS, and backups on /deploy"
```

---

### Task 3: Update the homepage open-source code sample to show the Docker path

**Files:**
- Modify: `components/home-sections.tsx:291-303` (`OpenSourceSection`)

**Context:** The homepage's "Open source" section shows a terminal snippet that ends in `npm run db:migrate && npm run dev` — the same stale manual flow fixed in Task 1, in a different component. This is the most-viewed deployment snippet on the site (it's on the homepage), so it should match the corrected `db:push` + Docker Compose flow.

**Interfaces:**
- Consumes: nothing from other tasks (hardcoded JSX string, not pulled from `DEPLOY_STEPS`).
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Replace the code sample**

Replace:
```tsx
          <pre className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-7 font-mono text-sm leading-6 text-white/80 backdrop-blur-sm">
            <code>{`git clone https://github.com/aidandevv/powerhour
cp .env.example .env

# Configure your credentials:
# DATABASE_URL=postgres://...
# PLAID_CLIENT_ID=...
# PLAID_SECRET=...
# SESSION_SECRET=...

npm run db:migrate
npm run dev`}</code>
          </pre>
```

With:
```tsx
          <pre className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-7 font-mono text-sm leading-6 text-white/80 backdrop-blur-sm">
            <code>{`git clone https://github.com/aidandevv/powerhour
cd powerhour && npm install && npm run setup

# Postgres via Docker — no local DB install needed
docker compose -f docker/docker-compose.yml up db -d

npm run db:push
npm run dev`}</code>
          </pre>
```

- [ ] **Step 2: Build and visually verify**

Run: `npm run build`
Then: `npm run dev`, open `http://localhost:3000`, scroll to the "Open source" section, confirm the code block renders without horizontal scroll issues on desktop and mobile.

- [ ] **Step 3: Commit**

```bash
git add components/home-sections.tsx
git commit -m "docs: show Docker-based Postgres setup in homepage code sample"
```

---

### Task 4: Sharpen the "Self-hosted operations" feature bullet on `/features`

**Files:**
- Modify: `app/features/page.tsx:96-105` (`CORE_MODULES` entry)

**Context:** The features page currently has a generic "Dockerized deployment path" bullet under "Self-hosted operations." This understates what actually shipped: versioned, checksum-verified GHCR release images, a one-command production Compose file with a dedicated `migrate` service, and an interactive setup wizard. This is a feature/differentiator worth naming specifically rather than the generic placeholder.

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed elsewhere — `CORE_MODULES` is only read by `FeaturesPage`.

- [ ] **Step 1: Replace the module entry**

Replace:
```tsx
  {
    title: "Self-hosted operations",
    body: "Designed for transparent infrastructure ownership and predictable deployment workflows.",
    points: [
      "Dockerized deployment path",
      "PostgreSQL + Drizzle migrations",
      "Environment-based configuration",
      "No required SaaS control plane",
    ],
  },
```

With:
```tsx
  {
    title: "Self-hosted operations",
    body: "Designed for transparent infrastructure ownership and predictable deployment workflows.",
    points: [
      "Versioned, checksum-verified release images on GHCR",
      "One-command production Compose with a dedicated migrate service",
      "Interactive setup wizard for secrets and .env generation",
      "Optional nginx + Let's Encrypt TLS profile for source builds",
    ],
  },
```

- [ ] **Step 2: Build and visually verify**

Run: `npm run build`
Then: `npm run dev`, open `http://localhost:3000/features`, scroll to "Core feature modules," confirm the "Self-hosted operations" card renders the four new bullets correctly.

- [ ] **Step 3: Commit**

```bash
git add app/features/page.tsx
git commit -m "docs: describe release-image deploy workflow on /features instead of generic Docker bullet"
```

---

### Task 5: Add release/Compose details to `/docs`

**Files:**
- Modify: `app/docs/page.tsx:158-168` (`IMPLEMENTATION_MAP` — "Infra and deploy" row)
- Modify: `app/docs/page.tsx:327-336` (Operations and Runtime section)

**Context:** `/docs` already references `docker/Dockerfile`, `docker/docker-compose.yml`, and `docker/nginx/nginx.conf` in the Implementation Map, and `docker/*` generically in Operations and Runtime — but it never mentions `deploy/docker-compose.yml` (the release Compose file using the GHCR image), the `migrate`/`tools` and `tls` Compose profiles, or the `/api/health` endpoint used for container health checks. This is the technical-evaluator-facing page (per `docs/plans/2026-02-20-docs-site-plan.md`), so it should be precise about the two Compose files and what distinguishes them.

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Update the Implementation Map row**

Replace:
```tsx
  { area: "Infra and deploy", files: "docker/Dockerfile, docker/docker-compose.yml, docker/nginx/nginx.conf, scripts/*" },
```

With:
```tsx
  {
    area: "Infra and deploy",
    files:
      "docker/Dockerfile, docker/docker-compose.yml (source build + optional tls profile), deploy/docker-compose.yml (release image + migrate/tools profile), docker/nginx/nginx.conf, scripts/setup.cjs, scripts/migrate.mjs",
  },
```

- [ ] **Step 2: Update the Operations and Runtime list item for container runtime**

Replace:
```tsx
                <li>Container runtime and reverse proxy in <code className="font-mono text-xs">docker/*</code>.</li>
```

With:
```tsx
                <li>
                  Container runtime and reverse proxy in <code className="font-mono text-xs">docker/*</code> (source
                  build) and <code className="font-mono text-xs">deploy/docker-compose.yml</code> (versioned release
                  image, with a separate <code className="font-mono text-xs">migrate</code> service gated behind the{" "}
                  <code className="font-mono text-xs">tools</code> profile).
                </li>
```

- [ ] **Step 3: Build and visually verify**

Run: `npm run build`
Then: `npm run dev`, open `http://localhost:3000/docs`, jump to "Operations and Runtime" and "Implementation Map" sections via the sticky TOC, confirm both render the updated copy without table overflow.

- [ ] **Step 4: Commit**

```bash
git add app/docs/page.tsx
git commit -m "docs: distinguish source-build and release Compose files on /docs"
```

---

### Task 6: Add a "Deployment and updates" FAQ section

**Files:**
- Modify: `app/faq/page.tsx:23-126` (`FAQ_SECTIONS` array — add a new section)

**Context:** The FAQ page has sections for setup, security, features, and troubleshooting, but nothing about deployment mechanics — even though the product now has real, documented answers for "do I need Docker," "how do I update," and "how do I back up my data" (all covered in the product README's Production Deployment section). These are exactly the questions a self-hosting evaluator asks before committing.

**Interfaces:**
- Consumes: the `FaqSection`/`FaqItem` types already defined at the top of the file (`app/faq/page.tsx:11-21`) — reuse them as-is, no changes needed.
- Produces: nothing consumed elsewhere — `FAQ_SECTIONS` is only read by `FaqPage` and `FAQ_PAGE_SCHEMA` (which derives structured data from it automatically via `.flatMap`, so no schema changes needed).

- [ ] **Step 1: Insert a new section into `FAQ_SECTIONS`**

Insert immediately after the closing `},` of the `"troubleshooting"` section (i.e., right before the final `];` that closes `FAQ_SECTIONS`):

```tsx
  {
    id: "deployment",
    title: "Deployment and updates",
    items: [
      {
        id: "deployment-1",
        question: "Do I need Docker?",
        answer:
          "Yes for Postgres at minimum — the documented dev quick start runs Postgres via Docker Compose. For production, the recommended path runs the app itself from a versioned Docker image too, so no Node.js install is required on the server.",
      },
      {
        id: "deployment-2",
        question: "How do I update to a new version?",
        answer:
          "Pull the release Compose file for the new version, verify its checksum, run the bundled migrate service to apply schema changes, then bring the app back up. The migrate step runs as a separate one-off container so it never races the running app.",
      },
      {
        id: "deployment-3",
        question: "How do I back up my data?",
        answer:
          "Run pg_dump inside the db container on a cron schedule and pipe the output through gpg for at-rest encryption. Restore by piping the decrypted dump back into psql inside the same container.",
      },
    ],
  },
```

- [ ] **Step 2: Build and visually verify**

Run: `npm run build`
Then: `npm run dev`, open `http://localhost:3000/faq`, confirm the new "Deployment and updates" section appears in both the section nav and the page body, and that the FAQ JSON-LD schema (view page source, search for `application/ld+json`) includes the three new Q&A pairs.

- [ ] **Step 3: Commit**

```bash
git add app/faq/page.tsx
git commit -m "docs: add deployment and updates FAQ section"
```

---

### Task 7: Update the security "Deployer checklist" Node.js bullet

**Files:**
- Modify: `app/security/page.tsx:186-192` (`DeployerSection` — `items` array)

**Context:** The deployer checklist tells operators to "Keep Node.js and npm dependencies up to date" — but most production deployers following the now-recommended release path never install Node.js or npm at all; they pull a prebuilt image. The actionable equivalent for that path is pulling updated, checksum-verified release images. Source-build deployers still care about npm patches, so the bullet should cover both rather than replace one with the other.

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Replace the bullet**

Replace:
```tsx
    "Keep Node.js and npm dependencies up to date with security patches.",
```

With:
```tsx
    "Pull updated, checksum-verified release images regularly (or keep Node.js/npm dependencies patched if building from source).",
```

- [ ] **Step 2: Build and visually verify**

Run: `npm run build`
Then: `npm run dev`, open `http://localhost:3000/security`, scroll to "Deployer checklist," confirm the updated bullet renders correctly.

- [ ] **Step 3: Commit**

```bash
git add app/security/page.tsx
git commit -m "docs: cover both release-image and source-build update paths in deployer checklist"
```

---

## Self-Review

**Spec coverage:**
- Stale/missing Docker quick-start commands → Task 1.
- Missing Docker prerequisite + missing production/TLS/backup story on `/deploy` → Task 2.
- Stale homepage code sample → Task 3.
- Generic "Dockerized deployment path" bullet undersells the real release pipeline → Task 4.
- `/docs` Implementation Map and Operations sections don't mention `deploy/docker-compose.yml`, profiles, or migrate service → Task 5.
- No FAQ coverage of Docker/updates/backups → Task 6.
- Security checklist assumes npm-only update path → Task 7.

**Placeholder scan:** No TBD/TODO/"add appropriate" placeholders — every step has literal before/after code.

**Type consistency:** Task 6 reuses the existing `FaqSection`/`FaqItem` types without modification; no new types introduced anywhere in this plan.
