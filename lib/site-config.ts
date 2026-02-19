export const SITE_NAME = "powerhour";
export const SITE_TAGLINE = "Self-hosted finance intelligence, built for clarity.";

export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/your-username/powerhour";

export const PRIMARY_NAV = [
  { label: "Features", href: "/features" },
  { label: "Security", href: "/security" },
  { label: "Deploy", href: "/deploy" },
];

export const FEATURE_SUMMARIES = [
  {
    title: "Unified dashboard",
    body: "Track net worth, balances, category spending, credit utilization, and recurring costs in one daily-updated view.",
  },
  {
    title: "Ticker AI chat",
    body: "Ask direct questions about spending behavior, account balances, transaction history, and anomalies using real synced data.",
  },
  {
    title: "Budget Planner",
    body: "Generate travel budgets, savings plans, and spend-reduction strategies with mode-specific agent workflows.",
  },
  {
    title: "In-memory PDF reports",
    body: "Produce detailed financial reports with charts and AI summaries without writing files to disk on the server.",
  },
  {
    title: "Subscription audit",
    body: "Identify recurring charges with no activity in 90+ days and estimate monthly savings at risk.",
  },
  {
    title: "Smart budget goals",
    body: "Create category caps from recent spending trends and track progress from the dashboard.",
  },
];

export const SECURITY_POINTS = [
  "Plaid access tokens encrypted with AES-256-GCM at rest.",
  "Agent tool access constrained through database views that exclude sensitive columns.",
  "Layered rate limiting across login, chat, reports, and global API traffic.",
  "Plaid webhooks verified with JWT signature and body-hash checks.",
  "Audit log records critical security and account events.",
];
