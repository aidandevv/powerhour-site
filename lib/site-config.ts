export const SITE_NAME = "powerhour";
export const SITE_TAGLINE = "Self-hosted finance intelligence, built for clarity.";

export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/your-username/powerhour";

export const HERO_BADGE = "Open source · MIT License";

export const CTA_HEADLINE = "Your data. Your server. Your rules.";
export const CTA_SUBTEXT =
  "Powerhour is MIT-licensed and self-hosted. Clone the repo, run the migrations, and own your financial data stack.";

export const PRIMARY_NAV = [
  { label: "Features", href: "/features" },
  { label: "Security", href: "/security" },
  { label: "Open Source", href: "/deploy" },
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
  "MIT licensed — fork, self-host, or adapt without restriction.",
  "No SaaS dependency. All data stays on your own infrastructure.",
  "Full source available: schema, agents, tools, and sync pipeline.",
  "Environment-first configuration. No vendor lock-in.",
];

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
    body: "Powerhour uses Drizzle ORM. Run the migration command to create all 16 tables.",
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
