import type { Metadata } from "next";
import { StickyToc, type TocItem } from "@/components/docs/sticky-toc.client";
import { APP_SITE_URL, DOCS_SITE_URL, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Powerhour documentation for self-hosted deployments: architecture, features, API domains, security model, operations, and implementation references.",
  keywords: [
    "Powerhour docs",
    "self-hosted finance documentation",
    "Next.js finance architecture",
    "drizzle plaid integration docs",
  ],
};

const TOC: TocItem[] = [
  { id: "scope", label: "Scope and Model" },
  { id: "quickstart", label: "Quickstart Flow" },
  { id: "modules", label: "Core Modules" },
  { id: "api-domains", label: "API Domains" },
  { id: "security", label: "Security Model" },
  { id: "operations", label: "Operations and Runtime" },
  { id: "implementation", label: "Implementation Map" },
  { id: "next", label: "Next Reading" },
];

const MODULES = [
  {
    name: "Dashboard and analytics",
    routes: ["/", "/accounts", "/accounts/[id]"],
    summary:
      "Consolidated financial posture: KPI cards, net worth, account views, balance history, and trend visualizations.",
  },
  {
    name: "Transactions and grouping",
    routes: ["/transactions", "/transactions/groups", "/transactions/groups/[id]"],
    summary:
      "Search, filters, pagination, group assignment, and suggestion workflows for transaction-level analysis.",
  },
  {
    name: "Projections and recurring",
    routes: ["/projections", "/subscriptions"],
    summary:
      "Recurring detection, shortfall forecasting, subscription audit, and savings trajectory views.",
  },
  {
    name: "Budgeting and planning",
    routes: ["/budgets", "/budget-planner"],
    summary:
      "AI-generated budget goals plus mode-based planner workflows for travel, savings, and spend reduction.",
  },
  {
    name: "Settings and control plane",
    routes: ["/settings"],
    summary:
      "Scheduler toggles, institution management, sync controls, password changes, and audit event visibility.",
  },
];

const API_DOMAINS = [
  {
    domain: "Auth and session",
    endpoints: "/api/auth/login, /api/auth/logout, /api/auth/me, /api/auth/change-password",
  },
  {
    domain: "Dashboard analytics",
    endpoints:
      "/api/dashboard/summary, /api/dashboard/*-history, /api/dashboard/spending-trends, /api/dashboard/category-trends, /api/dashboard/channel-trends, /api/dashboard/credit-utilization",
  },
  {
    domain: "Accounts and transactions",
    endpoints: "/api/accounts, /api/accounts/[id], /api/transactions, /api/transactions/summary, /api/transactions/daily, /api/transactions/merchants",
  },
  {
    domain: "Budgets, plans, projections",
    endpoints:
      "/api/budget-goals, /api/budget-goals/generate, /api/budget-plans, /api/projections, /api/recurring, /api/savings-targets, /api/subscriptions",
  },
  {
    domain: "Agent execution",
    endpoints: "/api/ai/chat, /api/ai/budget-planner, /api/ai/report",
  },
  {
    domain: "Plaid and sync",
    endpoints:
      "/api/plaid/link-token, /api/plaid/exchange-token, /api/plaid/institutions, /api/sync, /api/webhooks/plaid",
  },
];

const SECURITY_POINTS = [
  "Encrypted token storage and secure field handling (`lib/crypto.ts`, `lib/crypto-fields.ts`).",
  "Session + request middleware gating and authenticated API throttling (`middleware.ts`).",
  "Agent-safe database views and schema-level separation (`lib/db/views.ts`, `lib/db/migrations/0000_agent_views.sql`).",
  "Plaid webhook verification and sync boundary control (`lib/plaid/webhooks.ts`, `lib/plaid/sync.ts`).",
  "Audit event capture for critical actions (`lib/audit-log.ts`, `app/api/audit-log/route.ts`).",
];

const IMPLEMENTATION_MAP = [
  { area: "Runtime and routing", files: "app/layout.tsx, app/(dashboard)/layout.tsx, middleware.ts, instrumentation.ts" },
  { area: "Pages", files: "app/(auth)/login/page.tsx and app/(dashboard)/*/page.tsx" },
  { area: "API routes", files: "app/api/**/route.ts" },
  { area: "UI composition", files: "components/dashboard/*, components/chat/*, components/budget-planner/*, components/charts/*" },
  { area: "State and hooks", files: "hooks/use-dashboard.ts, hooks/use-transactions.ts, hooks/use-accounts.ts, hooks/use-expense-groups.ts" },
  { area: "AI and tools", files: "lib/agent/agent.ts, lib/agent/budget-planner-agent.ts, lib/agent/tools/*" },
  { area: "Domain logic", files: "lib/projections.ts, lib/recurring.ts, lib/savings-projections.ts, lib/savings-targets.ts" },
  { area: "Data model", files: "lib/db/schema.ts, lib/db/views.ts, lib/db/migrations/*" },
  { area: "Infra and deploy", files: "docker/Dockerfile, docker/docker-compose.yml, docker/nginx/nginx.conf, scripts/*" },
];

const docsSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Powerhour Documentation",
  description:
    "Standard documentation index for self-hosted Powerhour deployments: architecture, modules, API domains, security model, and implementation map.",
  url: `${SITE_URL}/docs`,
};

export default function DocsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(docsSchema) }} />

      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
        <header className="mb-8 space-y-4 border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Powerhour Docs</p>
          <h1 className="text-4xl font-extrabold leading-tight text-text md:text-5xl">Documentation</h1>
          <p className="max-w-4xl text-sm text-text-muted">
            This documentation is written for self-hosted operators. Route references describe in-app paths in your
            own deployment (for example <code className="font-mono text-xs">/transactions</code>), not a hosted web
            app endpoint.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${APP_SITE_URL}/features`}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border px-4 py-2 text-sm font-semibold text-text"
            >
              Features
            </a>
            <a
              href={`${APP_SITE_URL}/security`}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border px-4 py-2 text-sm font-semibold text-text"
            >
              Security
            </a>
            <a
              href={`${APP_SITE_URL}/deploy`}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border px-4 py-2 text-sm font-semibold text-text"
            >
              Deployment
            </a>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <StickyToc items={TOC} />
          </aside>

          <main className="space-y-12">
            <section id="scope" className="scroll-mt-28 space-y-3 border-b border-border pb-10">
              <h2 className="text-2xl font-bold text-text">Scope and Model</h2>
              <p className="text-sm text-text-muted">
                Domain separation is explicit:
              </p>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <span className="font-semibold text-text">Docs domain:</span> {DOCS_SITE_URL} (documentation pages).
                </li>
                <li>
                  <span className="font-semibold text-text">Marketing domain:</span> {APP_SITE_URL} (features, security, deployment marketing content).
                </li>
                <li>
                  <span className="font-semibold text-text">Product runtime:</span> self-hosted instance controlled by deployer; route examples in this doc are app routes, not hosted URLs.
                </li>
              </ul>
            </section>

            <section id="quickstart" className="scroll-mt-28 space-y-3 border-b border-border pb-10">
              <h2 className="text-2xl font-bold text-text">Quickstart Flow</h2>
              <ol className="space-y-2 text-sm text-text-muted">
                <li>1. Authenticate at <code className="font-mono text-xs">/login</code>.</li>
                <li>2. Link an institution in <code className="font-mono text-xs">/settings</code>.</li>
                <li>3. Trigger manual sync from <code className="font-mono text-xs">/settings</code>.</li>
                <li>4. Validate dashboard and accounts: <code className="font-mono text-xs">/</code>, <code className="font-mono text-xs">/accounts</code>.</li>
                <li>5. Run transaction and recurring checks: <code className="font-mono text-xs">/transactions</code>, <code className="font-mono text-xs">/subscriptions</code>, <code className="font-mono text-xs">/projections</code>.</li>
              </ol>
            </section>

            <section id="modules" className="scroll-mt-28 space-y-4 border-b border-border pb-10">
              <h2 className="text-2xl font-bold text-text">Core Modules</h2>
              <div className="overflow-x-auto rounded border border-border">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="px-3 py-2 font-semibold text-text">Module</th>
                      <th className="px-3 py-2 font-semibold text-text">In-app routes</th>
                      <th className="px-3 py-2 font-semibold text-text">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODULES.map((module) => (
                      <tr key={module.name} className="border-b border-border/60 last:border-none">
                        <td className="px-3 py-2 font-semibold text-text">{module.name}</td>
                        <td className="px-3 py-2 font-mono text-xs text-text-muted">{module.routes.join(", ")}</td>
                        <td className="px-3 py-2 text-xs text-text-muted">{module.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="api-domains" className="scroll-mt-28 space-y-4 border-b border-border pb-10">
              <h2 className="text-2xl font-bold text-text">API Domains</h2>
              <div className="space-y-3">
                {API_DOMAINS.map((group) => (
                  <article key={group.domain} className="rounded border border-border bg-surface p-4">
                    <h3 className="text-sm font-semibold text-text">{group.domain}</h3>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-text-muted">{group.endpoints}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="security" className="scroll-mt-28 space-y-3 border-b border-border pb-10">
              <h2 className="text-2xl font-bold text-text">Security Model</h2>
              <ul className="space-y-2 text-sm text-text-muted">
                {SECURITY_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="operations" className="scroll-mt-28 space-y-3 border-b border-border pb-10">
              <h2 className="text-2xl font-bold text-text">Operations and Runtime</h2>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>Startup initialization handled by <code className="font-mono text-xs">instrumentation.ts</code>.</li>
                <li>Scheduler jobs configured in <code className="font-mono text-xs">lib/scheduler.ts</code>.</li>
                <li>Environment and bootstrap automation in <code className="font-mono text-xs">scripts/setup.js</code>.</li>
                <li>Container runtime and reverse proxy in <code className="font-mono text-xs">docker/*</code>.</li>
                <li>Health and control routes under <code className="font-mono text-xs">/api/health</code> and <code className="font-mono text-xs">/api/settings/scheduler</code>.</li>
              </ul>
            </section>

            <section id="implementation" className="scroll-mt-28 space-y-4 border-b border-border pb-10">
              <h2 className="text-2xl font-bold text-text">Implementation Map</h2>
              <div className="overflow-x-auto rounded border border-border">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="px-3 py-2 font-semibold text-text">Area</th>
                      <th className="px-3 py-2 font-semibold text-text">Primary files</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IMPLEMENTATION_MAP.map((row) => (
                      <tr key={row.area} className="border-b border-border/60 last:border-none">
                        <td className="px-3 py-2 font-semibold text-text">{row.area}</td>
                        <td className="px-3 py-2 font-mono text-xs text-text-muted">{row.files}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="next" className="scroll-mt-28 space-y-3">
              <h2 className="text-2xl font-bold text-text">Next Reading</h2>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a href={`${DOCS_SITE_URL}/walkthrough`} className="text-brand underline underline-offset-2">
                    Walkthroughs
                  </a>
                  {" "}for step-by-step operational flows.
                </li>
                <li>
                  <a href={`${DOCS_SITE_URL}/faq`} className="text-brand underline underline-offset-2">
                    FAQ
                  </a>
                  {" "}for setup, security, and troubleshooting questions.
                </li>
              </ul>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
