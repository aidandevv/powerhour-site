export const SITE_NAME = "powerhour";
export const SITE_TAGLINE = "Self-hosted finance intelligence, built for clarity.";

export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/aidandevv/powerhour";

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.powerhour.dev";

const SITE_URL_WITH_PROTOCOL = RAW_SITE_URL.startsWith("http")
  ? RAW_SITE_URL
  : `https://${RAW_SITE_URL}`;

export const SITE_URL = SITE_URL_WITH_PROTOCOL.replace(/\/+$/, "");

const RAW_DOCS_SITE_URL =
  process.env.NEXT_PUBLIC_DOCS_SITE_URL ?? SITE_URL;

const DOCS_SITE_URL_WITH_PROTOCOL = RAW_DOCS_SITE_URL.startsWith("http")
  ? RAW_DOCS_SITE_URL
  : `https://${RAW_DOCS_SITE_URL}`;

export const DOCS_SITE_URL = DOCS_SITE_URL_WITH_PROTOCOL.replace(/\/+$/, "");

const RAW_APP_SITE_URL =
  process.env.NEXT_PUBLIC_APP_SITE_URL ?? "https://powerhour.dev";

const APP_SITE_URL_WITH_PROTOCOL = RAW_APP_SITE_URL.startsWith("http")
  ? RAW_APP_SITE_URL
  : `https://${RAW_APP_SITE_URL}`;

export const APP_SITE_URL = APP_SITE_URL_WITH_PROTOCOL.replace(/\/+$/, "");

export const HERO_BADGE = "Open source · ISC License";

export const CTA_HEADLINE = "Your data. Your server. Your rules.";
export const CTA_SUBTEXT =
  "Powerhour is ISC-licensed and self-hosted. Clone the repo, run the migrations, and own your financial data stack.";

export const PRIMARY_NAV = [
  { label: "Features", href: `${APP_SITE_URL}/features` },
  { label: "Security", href: `${APP_SITE_URL}/security` },
  { label: "Docs", href: `${DOCS_SITE_URL}/docs` },
  { label: "Self-hosting", href: `${APP_SITE_URL}/deploy` },
];

export const FEATURE_SUMMARIES = [
  {
    icon: "dashboard",
    title: "Unified dashboard",
    body: "Track net worth, balances, category spending, credit utilization, and recurring costs in one daily-updated view.",
  },
  {
    icon: "chat",
    title: "Ticker AI chat",
    body: "Ask direct questions about spending behavior, account balances, transaction history, and anomalies using real synced data.",
  },
  {
    icon: "plan",
    title: "Budget Planner",
    body: "Generate travel budgets, savings plans, and spend-reduction strategies with mode-specific agent workflows.",
  },
  {
    icon: "report",
    title: "In-memory PDF reports",
    body: "Produce detailed financial reports with charts and AI summaries without writing files to disk on the server.",
  },
  {
    icon: "subscription",
    title: "Subscription audit",
    body: "Identify recurring charges with no activity in 90+ days and estimate monthly savings at risk.",
  },
  {
    icon: "goal",
    title: "Smart budget goals",
    body: "Create category caps from recent spending trends and track progress from the dashboard.",
  },
];

export const SECURITY_POINTS: { label: string; detail: string }[] = [
  {
    label: "AES-256-GCM token encryption",
    detail: "Plaid access tokens are encrypted at rest using AES-256-GCM. Keys never leave the server environment.",
  },
  {
    label: "Database-layer agent boundaries",
    detail: "Agent tool access is constrained through database views that exclude sensitive columns from AI context.",
  },
  {
    label: "Layered rate limiting",
    detail: "Independent rate limits on login, chat, reports, and global API traffic prevent abuse at each surface.",
  },
  {
    label: "Webhook signature verification",
    detail: "Plaid webhooks are verified with JWT signature and body-hash checks before any processing occurs.",
  },
  {
    label: "Audit log for security events",
    detail: "Critical account and security events (login, token exchange, deletions) are recorded with IP and timestamp.",
  },
];

export const TECH_STACK = [
  { label: "Next.js 14", note: "App Router + TypeScript" },
  { label: "PostgreSQL", note: "via Drizzle ORM" },
  { label: "Plaid", note: "Bank-grade data sync" },
  { label: "Gemini 2.5 Flash", note: "AI agent backbone" },
  { label: "AI SDK v6", note: "Streaming + tool calls" },
];

export const OPEN_SOURCE_POINTS = [
  "ISC licensed — fork, self-host, or adapt without restriction.",
  "No SaaS dependency. All data stays on your own infrastructure.",
  "Full source available: schema, agents, tools, and sync pipeline.",
  "Environment-first configuration. No vendor lock-in.",
];

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
