import type { Metadata } from "next";
import Link from "next/link";
import { APP_SITE_URL, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Powerhour documentation: architecture, feature references, API surface, security model, operations runbook, and full source index.",
  keywords: [
    "Powerhour documentation",
    "self-hosted finance documentation",
    "Next.js finance architecture",
    "personal finance API docs",
    "open source portfolio docs",
  ],
};

type SectionLink = {
  id: string;
  label: string;
};

type RouteReference = {
  route: string;
  purpose: string;
  pageFile: string;
  keyComponents: string[];
  keyApis: string[];
};

type FeatureReference = {
  feature: string;
  summary: string;
  routes: string[];
  apiFiles: string[];
  coreCode: string[];
};

type ApiEndpoint = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  file: string;
  purpose: string;
};

type ApiGroup = {
  domain: string;
  endpoints: ApiEndpoint[];
};

type SourceGroup = {
  title: string;
  files: string[];
};

const TABLE_OF_CONTENTS: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "quick-links", label: "Quick Links" },
  { id: "routes", label: "UI Route Reference" },
  { id: "features", label: "Feature Reference" },
  { id: "api", label: "API Surface" },
  { id: "ai", label: "AI Agents and Tools" },
  { id: "data-security", label: "Data and Security" },
  { id: "operations", label: "Operations and Deployment" },
  { id: "source-index", label: "Full Source Index" },
];

const ROUTE_REFERENCE: RouteReference[] = [
  {
    route: "/login",
    purpose: "Single-user authentication entry; demo mode bypasses password form.",
    pageFile: "app/(auth)/login/page.tsx",
    keyComponents: ["components/ui/card.tsx", "components/ui/input.tsx", "components/ui/button.tsx"],
    keyApis: ["/api/auth/login"],
  },
  {
    route: "/",
    purpose: "Dashboard: KPI cards, account overview, budget goals, savings targets, charts, and embedded Ticker AI.",
    pageFile: "app/(dashboard)/page.tsx",
    keyComponents: [
      "components/dashboard/dashboard-hero.tsx",
      "components/dashboard/metric-cards.tsx",
      "components/dashboard/budget-goals-panel.tsx",
      "components/chat/chat-panel.tsx",
      "components/charts/net-worth-chart.tsx",
      "components/charts/credit-utilization-chart.tsx",
    ],
    keyApis: [
      "/api/dashboard/summary",
      "/api/dashboard/net-worth-history",
      "/api/dashboard/credit-utilization",
      "/api/accounts",
      "/api/transactions",
    ],
  },
  {
    route: "/transactions",
    purpose: "Transaction explorer with debounced search, date/category filters, pagination, and group assignment.",
    pageFile: "app/(dashboard)/transactions/page.tsx",
    keyComponents: [
      "components/transactions/transaction-table.tsx",
      "components/expense-groups/create-group-modal.tsx",
      "components/expense-groups/add-to-group-dropdown.tsx",
      "components/expense-groups/suggest-transactions-modal.tsx",
    ],
    keyApis: ["/api/transactions", "/api/expense-groups", "/api/expense-groups/suggest"],
  },
  {
    route: "/transactions/groups",
    purpose: "Expense group list and creation workflow for trip/project/event grouping.",
    pageFile: "app/(dashboard)/transactions/groups/page.tsx",
    keyComponents: [
      "components/expense-groups/create-group-modal.tsx",
      "components/expense-groups/suggest-transactions-modal.tsx",
    ],
    keyApis: ["/api/expense-groups", "/api/expense-groups/[id]/members"],
  },
  {
    route: "/transactions/groups/[id]",
    purpose: "Expense group detail page for reviewing members and removing transactions.",
    pageFile: "app/(dashboard)/transactions/groups/[id]/page.tsx",
    keyComponents: ["components/expense-groups/suggest-transactions-modal.tsx"],
    keyApis: ["/api/expense-groups/[id]", "/api/expense-groups/[id]/members", "/api/expense-groups/[id]/members/[transactionId]"],
  },
  {
    route: "/accounts",
    purpose: "Institution-grouped account overview with status badges.",
    pageFile: "app/(dashboard)/accounts/page.tsx",
    keyComponents: ["components/dashboard/account-card.tsx"],
    keyApis: ["/api/accounts"],
  },
  {
    route: "/accounts/[id]",
    purpose: "Account detail page with 90-day balance history and transaction subset.",
    pageFile: "app/(dashboard)/accounts/[id]/page.tsx",
    keyComponents: ["components/transactions/transaction-table.tsx"],
    keyApis: ["/api/accounts/[id]", "/api/accounts/[id]/balance-history", "/api/transactions"],
  },
  {
    route: "/projections",
    purpose: "Projection suite: expense calendar, recurring controls, and savings goal forecast charts.",
    pageFile: "app/(dashboard)/projections/page.tsx",
    keyComponents: ["components/dashboard/projection-calendar.tsx", "components/charts/savings-projection-chart.tsx"],
    keyApis: ["/api/projections", "/api/recurring", "/api/savings-targets"],
  },
  {
    route: "/subscriptions",
    purpose: "Recurring audit view to identify inactive subscriptions and savings-at-risk.",
    pageFile: "app/(dashboard)/subscriptions/page.tsx",
    keyComponents: ["components/ui/card.tsx", "components/ui/badge.tsx"],
    keyApis: ["/api/subscriptions", "/api/recurring/[id]"],
  },
  {
    route: "/budgets",
    purpose: "Smart Budgets onboarding and goal management (AI-generated category caps).",
    pageFile: "app/(dashboard)/budgets/page.tsx",
    keyComponents: ["components/budgets/onboarding-flow.tsx", "components/budgets/manage-goals.tsx"],
    keyApis: ["/api/budget-goals", "/api/budget-goals/generate", "/api/budget-goals/[id]"],
  },
  {
    route: "/budget-planner",
    purpose: "Persistent planner workspace with sidebar history and mode-driven planning chat.",
    pageFile: "app/(dashboard)/budget-planner/page.tsx",
    keyComponents: [
      "components/budget-planner/plan-sidebar.tsx",
      "components/budget-planner/planner-chat.tsx",
      "components/budget-planner/track-actual-expenses-button.tsx",
    ],
    keyApis: ["/api/ai/budget-planner", "/api/budget-plans", "/api/budget-plans/[id]"],
  },
  {
    route: "/settings",
    purpose: "Operational control panel: scheduler toggles, password changes, institution management, security log.",
    pageFile: "app/(dashboard)/settings/page.tsx",
    keyComponents: ["components/dashboard/plaid-link-button.tsx", "components/dashboard/plaid-relink-button.tsx", "components/theme-toggle.tsx"],
    keyApis: [
      "/api/settings/scheduler",
      "/api/auth/change-password",
      "/api/plaid/institutions",
      "/api/sync",
      "/api/audit-log",
    ],
  },
];

const FEATURE_REFERENCE: FeatureReference[] = [
  {
    feature: "Dashboard analytics and KPI command center",
    summary:
      "Aggregates net worth, balances, budget progress, savings targets, and recent activity in one operational homepage.",
    routes: ["/"],
    apiFiles: [
      "app/api/dashboard/summary/route.ts",
      "app/api/dashboard/net-worth-history/route.ts",
      "app/api/dashboard/spending-trends/route.ts",
      "app/api/dashboard/category-trends/route.ts",
      "app/api/dashboard/channel-trends/route.ts",
      "app/api/dashboard/credit-utilization/route.ts",
      "app/api/dashboard/asset-liability-history/route.ts",
      "app/api/dashboard/account-balances-history/route.ts",
    ],
    coreCode: [
      "app/(dashboard)/page.tsx",
      "hooks/use-dashboard.ts",
      "components/dashboard/dashboard-hero.tsx",
      "components/dashboard/metric-cards.tsx",
      "components/dashboard/account-overview.tsx",
    ],
  },
  {
    feature: "Ticker AI conversational diagnostics",
    summary: "Streaming financial chat agent with tool calling, trend analysis, anomaly checks, and report triggers.",
    routes: ["/", "(floating widget on most dashboard pages)"],
    apiFiles: ["app/api/ai/chat/route.ts", "app/api/ai/report/route.ts"],
    coreCode: [
      "lib/agent/agent.ts",
      "lib/agent/prompt.ts",
      "components/chat/chat-panel.tsx",
      "components/chat/chat-widget.tsx",
      "components/dashboard/report-button.tsx",
      "lib/ai/pdf.ts",
    ],
  },
  {
    feature: "Budget Planner multi-mode agent",
    summary: "Dedicated planning agent for travel budgets, savings goals, and spend-reduction plans with persistent sessions.",
    routes: ["/budget-planner"],
    apiFiles: ["app/api/ai/budget-planner/route.ts", "app/api/budget-plans/route.ts", "app/api/budget-plans/[id]/route.ts"],
    coreCode: [
      "lib/agent/budget-planner-agent.ts",
      "components/budget-planner/planner-chat.tsx",
      "components/budget-planner/plan-sidebar.tsx",
      "components/budget-planner/track-actual-expenses-button.tsx",
    ],
  },
  {
    feature: "Smart Budget Goals",
    summary: "AI-generated budget caps and progress tracking with onboarding and iterative re-analysis.",
    routes: ["/budgets"],
    apiFiles: [
      "app/api/budget-goals/route.ts",
      "app/api/budget-goals/generate/route.ts",
      "app/api/budget-goals/[id]/route.ts",
    ],
    coreCode: [
      "lib/ai/budget-goals.ts",
      "components/budgets/onboarding-flow.tsx",
      "components/budgets/manage-goals.tsx",
      "components/dashboard/budget-goals-panel.tsx",
      "components/dashboard/budget-goal-card.tsx",
    ],
  },
  {
    feature: "Transactions explorer and expense grouping",
    summary: "Search/filter/paginate transactions, then cluster them into named groups for project/travel tracking.",
    routes: ["/transactions", "/transactions/groups", "/transactions/groups/[id]"],
    apiFiles: [
      "app/api/transactions/route.ts",
      "app/api/transactions/[id]/route.ts",
      "app/api/transactions/summary/route.ts",
      "app/api/transactions/daily/route.ts",
      "app/api/transactions/merchants/route.ts",
      "app/api/expense-groups/route.ts",
      "app/api/expense-groups/[id]/route.ts",
      "app/api/expense-groups/[id]/members/route.ts",
      "app/api/expense-groups/[id]/members/[transactionId]/route.ts",
      "app/api/expense-groups/suggest/route.ts",
    ],
    coreCode: [
      "hooks/use-transactions.ts",
      "hooks/use-expense-groups.ts",
      "components/transactions/transaction-table.tsx",
      "components/expense-groups/create-group-modal.tsx",
      "components/expense-groups/add-to-group-dropdown.tsx",
      "components/expense-groups/suggest-transactions-modal.tsx",
    ],
  },
  {
    feature: "Accounts and historical balance analysis",
    summary: "Institution-level account catalog with per-account balance trends and transaction context.",
    routes: ["/accounts", "/accounts/[id]"],
    apiFiles: ["app/api/accounts/route.ts", "app/api/accounts/[id]/route.ts", "app/api/accounts/[id]/balance-history/route.ts"],
    coreCode: [
      "hooks/use-accounts.ts",
      "components/dashboard/account-card.tsx",
      "components/charts/account-balance-history-chart.tsx",
      "app/(dashboard)/accounts/[id]/page.tsx",
    ],
  },
  {
    feature: "Projections, recurring engine, and savings targets",
    summary: "Forecast upcoming obligations, manage recurring detections, and visualize goal trajectory.",
    routes: ["/projections"],
    apiFiles: ["app/api/projections/route.ts", "app/api/recurring/route.ts", "app/api/recurring/[id]/route.ts", "app/api/savings-targets/route.ts", "app/api/savings-targets/[id]/route.ts"],
    coreCode: [
      "lib/projections.ts",
      "lib/recurring.ts",
      "lib/savings-projections.ts",
      "lib/savings-targets.ts",
      "components/dashboard/projection-calendar.tsx",
      "components/charts/savings-projection-chart.tsx",
    ],
  },
  {
    feature: "Subscription waste audit",
    summary: "Flags low-activity recurring items, estimates normalized monthly risk, and supports one-click deactivation.",
    routes: ["/subscriptions"],
    apiFiles: ["app/api/subscriptions/route.ts", "app/api/recurring/[id]/route.ts"],
    coreCode: [
      "lib/agent/tools/recurring-audit.ts",
      "app/(dashboard)/subscriptions/page.tsx",
      "components/charts/spending-heatmap-chart.tsx",
    ],
  },
  {
    feature: "Plaid linking, sync, relink, and webhooks",
    summary: "End-to-end Plaid lifecycle: institution link, token exchange, sync orchestration, and signature-verified webhook handling.",
    routes: ["/settings", "/"],
    apiFiles: [
      "app/api/plaid/link-token/route.ts",
      "app/api/plaid/exchange-token/route.ts",
      "app/api/plaid/exchange-relink/route.ts",
      "app/api/plaid/institutions/route.ts",
      "app/api/plaid/institutions/[id]/route.ts",
      "app/api/plaid/institutions/[id]/relink/route.ts",
      "app/api/sync/route.ts",
      "app/api/sync/[institutionId]/route.ts",
      "app/api/webhooks/plaid/route.ts",
    ],
    coreCode: [
      "lib/plaid/client.ts",
      "lib/plaid/link.ts",
      "lib/plaid/sync.ts",
      "lib/plaid/webhooks.ts",
      "components/dashboard/plaid-link-button.tsx",
      "components/dashboard/plaid-relink-button.tsx",
    ],
  },
  {
    feature: "Authentication, sessions, and audit logging",
    summary: "Password-based auth with session expiry enforcement, endpoint controls, and immutable security event logs.",
    routes: ["/login", "/settings"],
    apiFiles: [
      "app/api/auth/login/route.ts",
      "app/api/auth/logout/route.ts",
      "app/api/auth/me/route.ts",
      "app/api/auth/change-password/route.ts",
      "app/api/audit-log/route.ts",
    ],
    coreCode: [
      "middleware.ts",
      "lib/auth/session.ts",
      "lib/auth/password.ts",
      "lib/auth/rate-limit.ts",
      "lib/audit-log.ts",
    ],
  },
  {
    feature: "Scheduled automation and weekly digest",
    summary: "Server startup hook schedules daily sync and weekly LLM-generated digest with runtime toggles.",
    routes: ["/settings", "background jobs"],
    apiFiles: ["app/api/settings/scheduler/route.ts", "app/api/health/route.ts"],
    coreCode: ["instrumentation.ts", "lib/scheduler.ts", "lib/digest/generate.ts", "scripts/cron.ts"],
  },
  {
    feature: "Demo mode seed and safety gates",
    summary: "Bootstraps realistic data without Plaid credentials while blocking sensitive external integrations.",
    routes: ["/login", "/"],
    apiFiles: ["app/api/plaid/link-token/route.ts", "app/api/plaid/exchange-token/route.ts", "app/api/sync/route.ts"],
    coreCode: ["lib/demo/index.ts", "lib/demo/seed.ts", "instrumentation.ts", "app/(dashboard)/layout.tsx"],
  },
];

const API_GROUPS: ApiGroup[] = [
  {
    domain: "Authentication and session state",
    endpoints: [
      { method: "POST", path: "/api/auth/login", file: "app/api/auth/login/route.ts", purpose: "Create session from password (or demo mode)." },
      { method: "POST", path: "/api/auth/logout", file: "app/api/auth/logout/route.ts", purpose: "Destroy active session." },
      { method: "GET", path: "/api/auth/me", file: "app/api/auth/me/route.ts", purpose: "Return authenticated user session status." },
      { method: "POST", path: "/api/auth/change-password", file: "app/api/auth/change-password/route.ts", purpose: "Rotate stored password hash." },
    ],
  },
  {
    domain: "Dashboard analytics",
    endpoints: [
      { method: "GET", path: "/api/dashboard/summary", file: "app/api/dashboard/summary/route.ts", purpose: "Top-level dashboard KPI payload." },
      { method: "GET", path: "/api/dashboard/spending-trends", file: "app/api/dashboard/spending-trends/route.ts", purpose: "Historical spending trend points." },
      { method: "GET", path: "/api/dashboard/category-trends", file: "app/api/dashboard/category-trends/route.ts", purpose: "Category-level trend breakdown." },
      { method: "GET", path: "/api/dashboard/channel-trends", file: "app/api/dashboard/channel-trends/route.ts", purpose: "Payment channel trend dataset." },
      { method: "GET", path: "/api/dashboard/credit-utilization", file: "app/api/dashboard/credit-utilization/route.ts", purpose: "Credit card utilization stats." },
      { method: "GET", path: "/api/dashboard/net-worth-history", file: "app/api/dashboard/net-worth-history/route.ts", purpose: "Net worth timeline data." },
      { method: "GET", path: "/api/dashboard/asset-liability-history", file: "app/api/dashboard/asset-liability-history/route.ts", purpose: "Assets vs liabilities series." },
      { method: "GET", path: "/api/dashboard/account-balances-history", file: "app/api/dashboard/account-balances-history/route.ts", purpose: "Aggregated account balance history." },
    ],
  },
  {
    domain: "Accounts and transactions",
    endpoints: [
      { method: "GET", path: "/api/accounts", file: "app/api/accounts/route.ts", purpose: "Institution-grouped account list." },
      { method: "GET", path: "/api/accounts/[id]", file: "app/api/accounts/[id]/route.ts", purpose: "Single account details." },
      { method: "GET", path: "/api/accounts/[id]/balance-history", file: "app/api/accounts/[id]/balance-history/route.ts", purpose: "Per-account snapshots by date range." },
      { method: "GET", path: "/api/transactions", file: "app/api/transactions/route.ts", purpose: "Filtered transaction query with pagination." },
      { method: "PATCH", path: "/api/transactions/[id]", file: "app/api/transactions/[id]/route.ts", purpose: "Update transaction fields (e.g. category)." },
      { method: "GET", path: "/api/transactions/summary", file: "app/api/transactions/summary/route.ts", purpose: "Aggregate transaction totals." },
      { method: "GET", path: "/api/transactions/daily", file: "app/api/transactions/daily/route.ts", purpose: "Daily transaction rollups." },
      { method: "GET", path: "/api/transactions/merchants", file: "app/api/transactions/merchants/route.ts", purpose: "Merchant-level grouped spend." },
    ],
  },
  {
    domain: "Expense groups",
    endpoints: [
      { method: "GET", path: "/api/expense-groups", file: "app/api/expense-groups/route.ts", purpose: "List groups with totals and counts." },
      { method: "POST", path: "/api/expense-groups", file: "app/api/expense-groups/route.ts", purpose: "Create a new expense group." },
      { method: "GET", path: "/api/expense-groups/[id]", file: "app/api/expense-groups/[id]/route.ts", purpose: "Fetch group metadata and members." },
      { method: "PATCH", path: "/api/expense-groups/[id]", file: "app/api/expense-groups/[id]/route.ts", purpose: "Update name/description/date window." },
      { method: "DELETE", path: "/api/expense-groups/[id]", file: "app/api/expense-groups/[id]/route.ts", purpose: "Delete a group." },
      { method: "POST", path: "/api/expense-groups/[id]/members", file: "app/api/expense-groups/[id]/members/route.ts", purpose: "Add transactions to group." },
      { method: "DELETE", path: "/api/expense-groups/[id]/members/[transactionId]", file: "app/api/expense-groups/[id]/members/[transactionId]/route.ts", purpose: "Remove a single transaction from group." },
      { method: "POST", path: "/api/expense-groups/suggest", file: "app/api/expense-groups/suggest/route.ts", purpose: "Agent-assisted transaction suggestions." },
    ],
  },
  {
    domain: "Budgets, recurring, and projections",
    endpoints: [
      { method: "GET", path: "/api/budget-goals", file: "app/api/budget-goals/route.ts", purpose: "List goal set with progress metrics." },
      { method: "POST", path: "/api/budget-goals/generate", file: "app/api/budget-goals/generate/route.ts", purpose: "Generate goals from AI analysis." },
      { method: "PATCH", path: "/api/budget-goals/[id]", file: "app/api/budget-goals/[id]/route.ts", purpose: "Update goal status/values." },
      { method: "DELETE", path: "/api/budget-goals/[id]", file: "app/api/budget-goals/[id]/route.ts", purpose: "Delete a budget goal." },
      { method: "GET", path: "/api/budget-plans", file: "app/api/budget-plans/route.ts", purpose: "List planner sessions." },
      { method: "POST", path: "/api/budget-plans", file: "app/api/budget-plans/route.ts", purpose: "Persist planner session." },
      { method: "PATCH", path: "/api/budget-plans/[id]", file: "app/api/budget-plans/[id]/route.ts", purpose: "Update plan title/content." },
      { method: "DELETE", path: "/api/budget-plans/[id]", file: "app/api/budget-plans/[id]/route.ts", purpose: "Delete planner session." },
      { method: "GET", path: "/api/projections", file: "app/api/projections/route.ts", purpose: "Projected outflows and shortfall checks." },
      { method: "GET", path: "/api/recurring", file: "app/api/recurring/route.ts", purpose: "Detected recurring items list." },
      { method: "PATCH", path: "/api/recurring/[id]", file: "app/api/recurring/[id]/route.ts", purpose: "Confirm/deactivate recurring item." },
      { method: "GET", path: "/api/savings-targets", file: "app/api/savings-targets/route.ts", purpose: "List savings targets." },
      { method: "POST", path: "/api/savings-targets", file: "app/api/savings-targets/route.ts", purpose: "Create savings target." },
      { method: "DELETE", path: "/api/savings-targets/[id]", file: "app/api/savings-targets/[id]/route.ts", purpose: "Delete savings target." },
      { method: "GET", path: "/api/subscriptions", file: "app/api/subscriptions/route.ts", purpose: "Recurring audit result for subscription page." },
    ],
  },
  {
    domain: "AI execution endpoints",
    endpoints: [
      { method: "POST", path: "/api/ai/chat", file: "app/api/ai/chat/route.ts", purpose: "Ticker AI streaming route." },
      { method: "POST", path: "/api/ai/budget-planner", file: "app/api/ai/budget-planner/route.ts", purpose: "Planner AI streaming route." },
      { method: "POST", path: "/api/ai/report", file: "app/api/ai/report/route.ts", purpose: "In-memory PDF generation endpoint." },
    ],
  },
  {
    domain: "Plaid and synchronization",
    endpoints: [
      { method: "POST", path: "/api/plaid/link-token", file: "app/api/plaid/link-token/route.ts", purpose: "Create Plaid Link token." },
      { method: "POST", path: "/api/plaid/exchange-token", file: "app/api/plaid/exchange-token/route.ts", purpose: "Exchange public token for encrypted access token." },
      { method: "POST", path: "/api/plaid/exchange-relink", file: "app/api/plaid/exchange-relink/route.ts", purpose: "Exchange relink flow token." },
      { method: "GET", path: "/api/plaid/institutions", file: "app/api/plaid/institutions/route.ts", purpose: "List linked institutions." },
      { method: "DELETE", path: "/api/plaid/institutions/[id]", file: "app/api/plaid/institutions/[id]/route.ts", purpose: "Delete institution and related records." },
      { method: "POST", path: "/api/plaid/institutions/[id]/relink", file: "app/api/plaid/institutions/[id]/relink/route.ts", purpose: "Create relink token for a specific institution." },
      { method: "POST", path: "/api/sync", file: "app/api/sync/route.ts", purpose: "Sync all institutions." },
      { method: "POST", path: "/api/sync/[institutionId]", file: "app/api/sync/[institutionId]/route.ts", purpose: "Sync one institution." },
      { method: "POST", path: "/api/webhooks/plaid", file: "app/api/webhooks/plaid/route.ts", purpose: "Plaid webhook receiver and verifier." },
    ],
  },
  {
    domain: "Settings and observability",
    endpoints: [
      { method: "GET", path: "/api/settings/scheduler", file: "app/api/settings/scheduler/route.ts", purpose: "Read scheduler toggles." },
      { method: "PATCH", path: "/api/settings/scheduler", file: "app/api/settings/scheduler/route.ts", purpose: "Update scheduler toggles." },
      { method: "GET", path: "/api/audit-log", file: "app/api/audit-log/route.ts", purpose: "Return latest audit events." },
      { method: "GET", path: "/api/health", file: "app/api/health/route.ts", purpose: "Health probe endpoint." },
    ],
  },
];

const AGENT_TOOL_FILES = [
  "lib/agent/tools/account-balances.ts",
  "lib/agent/tools/add-transactions-to-group.ts",
  "lib/agent/tools/budget-goals.ts",
  "lib/agent/tools/cash-flow-forecast.ts",
  "lib/agent/tools/category-trends.ts",
  "lib/agent/tools/create-expense-group.ts",
  "lib/agent/tools/create-savings-target.ts",
  "lib/agent/tools/credit-utilization.ts",
  "lib/agent/tools/debt-payoff.ts",
  "lib/agent/tools/detect-anomalies.ts",
  "lib/agent/tools/merchant-category-info.ts",
  "lib/agent/tools/net-worth-history.ts",
  "lib/agent/tools/payment-channels.ts",
  "lib/agent/tools/recurring-audit.ts",
  "lib/agent/tools/recurring-expenses.ts",
  "lib/agent/tools/savings-projection.ts",
  "lib/agent/tools/savings-targets.ts",
  "lib/agent/tools/spending-insights.ts",
  "lib/agent/tools/spending-summary.ts",
  "lib/agent/tools/suggest-transactions-for-group.ts",
  "lib/agent/tools/transaction-search.ts",
  "lib/agent/tools/trend-comparison.ts",
  "lib/agent/tools/web-search.ts",
];

const DATA_TABLE_FILES = [
  "lib/db/schema.ts",
  "lib/db/views.ts",
  "lib/db/migrations/0000_agent_views.sql",
  "lib/db/migrations/0001_nostalgic_roulette.sql",
  "lib/db/migrations/0002_naive_blacklash.sql",
  "lib/db/migrations/0003_savings_targets.sql",
  "lib/db/migrations/0004_closed_jasper_sitwell.sql",
  "lib/db/migrations/0005_audit_log_digests.sql",
  "lib/db/migrations/0006_sudden_loki.sql",
  "lib/db/migrations/0007_scheduler_settings.sql",
];

const SOURCE_INDEX_GROUPS: SourceGroup[] = [
  {
    title: "App pages and layout",
    files: [
      "app/layout.tsx",
      "app/(auth)/login/page.tsx",
      "app/(dashboard)/layout.tsx",
      "app/(dashboard)/page.tsx",
      "app/(dashboard)/transactions/page.tsx",
      "app/(dashboard)/transactions/groups/page.tsx",
      "app/(dashboard)/transactions/groups/[id]/page.tsx",
      "app/(dashboard)/accounts/page.tsx",
      "app/(dashboard)/accounts/[id]/page.tsx",
      "app/(dashboard)/projections/page.tsx",
      "app/(dashboard)/subscriptions/page.tsx",
      "app/(dashboard)/budgets/page.tsx",
      "app/(dashboard)/budget-planner/page.tsx",
      "app/(dashboard)/settings/page.tsx",
    ],
  },
  {
    title: "API route handlers",
    files: API_GROUPS.flatMap((group) => group.endpoints.map((endpoint) => endpoint.file)).filter(
      (file, index, all) => all.indexOf(file) === index
    ),
  },
  {
    title: "UI components (dashboard, chat, planner, budgets, transactions, groups, charts, shared UI)",
    files: [
      "components/dashboard/account-card.tsx",
      "components/dashboard/account-overview.tsx",
      "components/dashboard/account-summary-table.tsx",
      "components/dashboard/balance-cards.tsx",
      "components/dashboard/budget-goal-card.tsx",
      "components/dashboard/budget-goals-panel.tsx",
      "components/dashboard/change-badge.tsx",
      "components/dashboard/dashboard-hero.tsx",
      "components/dashboard/metric-cards.tsx",
      "components/dashboard/mobile-nav.tsx",
      "components/dashboard/nav.tsx",
      "components/dashboard/plaid-link-button.tsx",
      "components/dashboard/plaid-relink-button.tsx",
      "components/dashboard/projection-calendar.tsx",
      "components/dashboard/recent-transactions.tsx",
      "components/dashboard/report-button.tsx",
      "components/dashboard/savings-targets-panel.tsx",
      "components/dashboard/sync-status-banner.tsx",
      "components/chat/chat-message.tsx",
      "components/chat/chat-panel.tsx",
      "components/chat/chat-widget.tsx",
      "components/chat/tool-call-badge.tsx",
      "components/chat/typing-indicator.tsx",
      "components/budget-planner/plan-sidebar.tsx",
      "components/budget-planner/planner-chat.tsx",
      "components/budget-planner/track-actual-expenses-button.tsx",
      "components/budgets/manage-goals.tsx",
      "components/budgets/onboarding-flow.tsx",
      "components/transactions/transaction-table.tsx",
      "components/expense-groups/add-to-group-dropdown.tsx",
      "components/expense-groups/create-group-modal.tsx",
      "components/expense-groups/suggest-transactions-modal.tsx",
      "components/charts/account-balance-history-chart.tsx",
      "components/charts/asset-liability-chart.tsx",
      "components/charts/cash-flow-projection-chart.tsx",
      "components/charts/category-sparklines-chart.tsx",
      "components/charts/credit-utilization-chart.tsx",
      "components/charts/net-worth-chart.tsx",
      "components/charts/payment-channel-chart.tsx",
      "components/charts/savings-projection-chart.tsx",
      "components/charts/spending-by-category-chart.tsx",
      "components/charts/spending-heatmap-chart.tsx",
      "components/charts/spending-trend-chart.tsx",
      "components/charts/top-merchants-chart.tsx",
      "components/theme-provider.tsx",
      "components/theme-toggle.tsx",
      "components/ui/badge.tsx",
      "components/ui/button.tsx",
      "components/ui/card.tsx",
      "components/ui/dropdown-menu.tsx",
      "components/ui/input.tsx",
      "components/ui/label.tsx",
      "components/ui/select.tsx",
      "components/ui/separator.tsx",
      "components/ui/switch.tsx",
      "components/ui/table.tsx",
      "components/ui/tabs.tsx",
    ],
  },
  {
    title: "Hooks",
    files: ["hooks/use-accounts.ts", "hooks/use-dashboard.ts", "hooks/use-expense-groups.ts", "hooks/use-transactions.ts"],
  },
  {
    title: "AI, business logic, auth, security, and utilities",
    files: [
      "lib/agent/agent.ts",
      "lib/agent/budget-planner-agent.ts",
      "lib/agent/prompt.ts",
      ...AGENT_TOOL_FILES,
      "lib/ai/budget-goals.ts",
      "lib/ai/pdf.ts",
      "lib/api/error.ts",
      "lib/audit-log.ts",
      "lib/auth/password.ts",
      "lib/auth/rate-limit.ts",
      "lib/auth/session.ts",
      "lib/crypto.ts",
      "lib/crypto-fields.ts",
      "lib/projections.ts",
      "lib/recurring.ts",
      "lib/savings-targets.ts",
      "lib/savings-projections.ts",
      "lib/utils.ts",
    ],
  },
  {
    title: "Database and migrations",
    files: ["lib/db/index.ts", "lib/db/ensure-views.ts", ...DATA_TABLE_FILES, "lib/db/migrations/meta/_journal.json"],
  },
  {
    title: "Plaid integration, demo mode, digest, scheduler, and runtime hooks",
    files: [
      "lib/plaid/client.ts",
      "lib/plaid/link.ts",
      "lib/plaid/sync.ts",
      "lib/plaid/webhooks.ts",
      "lib/demo/index.ts",
      "lib/demo/seed.ts",
      "lib/digest/generate.ts",
      "lib/scheduler.ts",
      "instrumentation.ts",
      "middleware.ts",
    ],
  },
  {
    title: "Scripts and infrastructure",
    files: [
      "scripts/setup.js",
      "scripts/ensure-views.mjs",
      "scripts/cron.ts",
      "docker/Dockerfile",
      "docker/docker-compose.yml",
      "docker/nginx/nginx.conf",
      "drizzle.config.ts",
      "next.config.js",
      "tailwind.config.ts",
      "README.md",
      "CONTRIBUTING.md",
      "TECHNICAL_FEATURES.md",
    ],
  },
];

const docsSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Powerhour Documentation",
  description:
    "Comprehensive technical documentation for Powerhour including route reference, API surface, architecture, security model, and source index.",
  url: `${SITE_URL}/docs`,
  about: [
    "Self-hosted finance dashboard",
    "Next.js architecture documentation",
    "API and security reference",
  ],
  author: {
    "@type": "Organization",
    name: "Powerhour",
  },
};

function SourceLink({ path }: { path: string }) {
  return (
    <span className="break-all font-mono text-xs text-text">
      {path}
    </span>
  );
}

function SourceList({ paths }: { paths: string[] }) {
  return (
    <ul className="space-y-1">
      {paths.map((path) => (
        <li key={path}>
          <SourceLink path={path} />
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4 border-b border-border pb-12">
      <h2 className="text-2xl font-bold text-text">{title}</h2>
      {children}
    </section>
  );
}

export default function DocsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(docsSchema) }} />

      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
        <div className="mb-8 space-y-4 border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Powerhour Documentation</p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-text md:text-5xl">
            Comprehensive product and code reference
          </h1>
          <p className="max-w-4xl text-base text-text-muted">
            This page documents the main application in detail: route coverage, feature ownership, backend API surface,
            agent tooling, data and security design, deployment concerns, and source-level links into the repository.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${APP_SITE_URL}/deploy`}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border px-4 py-2 text-sm font-semibold text-text"
            >
              Deployment guide
            </a>
            <a
              href={`${APP_SITE_URL}/security`}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border px-4 py-2 text-sm font-semibold text-text"
            >
              Security page
            </a>
            <Link href="/docs/walkthroughs" className="rounded border border-border px-4 py-2 text-sm font-semibold text-text">
              Walkthroughs
            </Link>
            <Link href="/docs/faq" className="rounded border border-border px-4 py-2 text-sm font-semibold text-text">
              FAQ
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Documentation sections" className="rounded border border-border bg-surface p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Contents</p>
              <ul className="space-y-2">
                {TABLE_OF_CONTENTS.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-sm text-text hover:text-brand">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-12">
            <Section id="overview" title="Overview">
              <p className="text-sm text-text-muted">
                Powerhour is a self-hosted personal finance platform with two AI agents, Plaid data sync, recurring
                expense intelligence, and in-memory PDF reporting. The production app lives in the main project root,
                while this site documents that implementation.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded border border-border bg-surface p-4">
                  <p className="text-sm font-semibold text-text">Core stack</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-muted">
                    <li>Next.js 14 App Router + TypeScript</li>
                    <li>PostgreSQL + Drizzle ORM</li>
                    <li>Plaid integration for data ingestion</li>
                    <li>Gemini model integration via AI SDK</li>
                    <li>Tailwind + shadcn-style primitives</li>
                  </ul>
                </div>
                <div className="rounded border border-border bg-surface p-4">
                  <p className="text-sm font-semibold text-text">Operational model</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-muted">
                    <li>Single-user auth and encrypted token storage</li>
                    <li>Daily sync + weekly digest scheduler</li>
                    <li>API + middleware rate limiting layers</li>
                    <li>Audit event capture for sensitive actions</li>
                    <li>Docker + nginx deployment path</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="quick-links" title="Quick Links">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded border border-border bg-surface p-4">
                  <p className="text-sm font-semibold text-text">Primary docs and specs</p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <SourceLink path="README.md" />
                    </li>
                    <li>
                      <SourceLink path="TECHNICAL_FEATURES.md" />
                    </li>
                    <li>
                      <SourceLink path="CONTRIBUTING.md" />
                    </li>
                  </ul>
                </div>
                <div className="rounded border border-border bg-surface p-4">
                  <p className="text-sm font-semibold text-text">Runtime entry points</p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <SourceLink path="app/layout.tsx" />
                    </li>
                    <li>
                      <SourceLink path="app/(dashboard)/layout.tsx" />
                    </li>
                    <li>
                      <SourceLink path="instrumentation.ts" />
                    </li>
                    <li>
                      <SourceLink path="middleware.ts" />
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="routes" title="UI Route Reference">
              <p className="text-sm text-text-muted">
                Complete route-level map of the user-facing application with ownership pointers into UI and backend.
              </p>
              <div className="space-y-6">
                {ROUTE_REFERENCE.map((entry) => (
                  <article key={entry.route} className="rounded border border-border bg-surface p-5">
                    <h3 className="font-mono text-sm font-semibold text-text">{entry.route}</h3>
                    <p className="mt-2 text-sm text-text-muted">{entry.purpose}</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Page file</p>
                        <div className="mt-1">
                          <SourceLink path={entry.pageFile} />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Key components</p>
                        <div className="mt-1">
                          <SourceList paths={entry.keyComponents} />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Primary APIs</p>
                        <ul className="mt-1 space-y-1">
                          {entry.keyApis.map((api) => (
                            <li key={api} className="font-mono text-xs text-text-muted">
                              {api}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section id="features" title="Feature Reference">
              <p className="text-sm text-text-muted">
                Feature-level inventory connecting user value, application surfaces, API handlers, and implementation files.
              </p>
              <div className="space-y-6">
                {FEATURE_REFERENCE.map((item) => (
                  <article key={item.feature} className="rounded border border-border bg-surface p-5">
                    <h3 className="text-lg font-semibold text-text">{item.feature}</h3>
                    <p className="mt-2 text-sm text-text-muted">{item.summary}</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Routes</p>
                        <ul className="mt-1 space-y-1">
                          {item.routes.map((route) => (
                            <li key={route} className="font-mono text-xs text-text-muted">
                              {route}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">API files</p>
                        <SourceList paths={item.apiFiles} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Core code files</p>
                        <SourceList paths={item.coreCode} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section id="api" title="API Surface">
              <p className="text-sm text-text-muted">
                Endpoint inventory grouped by domain. Each row lists method, route, ownership file, and intent.
              </p>
              <div className="space-y-8">
                {API_GROUPS.map((group) => (
                  <article key={group.domain} className="rounded border border-border bg-surface p-5">
                    <h3 className="text-lg font-semibold text-text">{group.domain}</h3>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[780px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-border text-xs uppercase tracking-wide text-text-muted">
                            <th className="px-2 py-2 font-semibold">Method</th>
                            <th className="px-2 py-2 font-semibold">Path</th>
                            <th className="px-2 py-2 font-semibold">Purpose</th>
                            <th className="px-2 py-2 font-semibold">Source</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.endpoints.map((endpoint) => (
                            <tr key={`${endpoint.method}-${endpoint.path}`} className="border-b border-border/60 last:border-none">
                              <td className="px-2 py-2 font-mono text-xs text-text">{endpoint.method}</td>
                              <td className="px-2 py-2 font-mono text-xs text-text">{endpoint.path}</td>
                              <td className="px-2 py-2 text-xs text-text-muted">{endpoint.purpose}</td>
                              <td className="px-2 py-2">
                                <SourceLink path={endpoint.file} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section id="ai" title="AI Agents and Tools">
              <div className="space-y-4">
                <div className="rounded border border-border bg-surface p-4">
                  <h3 className="text-base font-semibold text-text">Ticker agent runtime</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    ReAct-style assistant for spending diagnostics and analysis. Entry points are:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <SourceLink path="lib/agent/agent.ts" />
                    </li>
                    <li>
                      <SourceLink path="lib/agent/prompt.ts" />
                    </li>
                    <li>
                      <SourceLink path="app/api/ai/chat/route.ts" />
                    </li>
                  </ul>
                </div>
                <div className="rounded border border-border bg-surface p-4">
                  <h3 className="text-base font-semibold text-text">Budget Planner agent runtime</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    Mode-oriented planning engine with persistent plans and goal creation tools.
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <SourceLink path="lib/agent/budget-planner-agent.ts" />
                    </li>
                    <li>
                      <SourceLink path="app/api/ai/budget-planner/route.ts" />
                    </li>
                    <li>
                      <SourceLink path="components/budget-planner/planner-chat.tsx" />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded border border-border bg-surface p-5">
                <h3 className="text-base font-semibold text-text">Tool implementation files</h3>
                <p className="mt-1 text-sm text-text-muted">
                  All registered agent tools are implemented under <code className="font-mono text-xs">lib/agent/tools</code>.
                </p>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {AGENT_TOOL_FILES.map((file) => (
                    <SourceLink key={file} path={file} />
                  ))}
                </div>
              </div>
            </Section>

            <Section id="data-security" title="Data and Security">
              <div className="grid gap-6 md:grid-cols-2">
                <article className="rounded border border-border bg-surface p-5">
                  <h3 className="text-base font-semibold text-text">Data model and migrations</h3>
                  <p className="mt-2 text-sm text-text-muted">
                    Schema and migration chain for institutions, accounts, transactions, recurring items, budgets,
                    plans, targets, digests, and audit logs.
                  </p>
                  <div className="mt-3">
                    <SourceList paths={DATA_TABLE_FILES} />
                  </div>
                </article>
                <article className="rounded border border-border bg-surface p-5">
                  <h3 className="text-base font-semibold text-text">Security-critical implementation points</h3>
                  <ul className="mt-2 space-y-3 text-sm text-text-muted">
                    <li>
                      Session auth and middleware controls:
                      <div className="mt-1">
                        <SourceList
                          paths={[
                            "middleware.ts",
                            "lib/auth/session.ts",
                            "lib/auth/password.ts",
                            "lib/auth/rate-limit.ts",
                          ]}
                        />
                      </div>
                    </li>
                    <li>
                      Encryption and secure field handling:
                      <div className="mt-1">
                        <SourceList paths={["lib/crypto.ts", "lib/crypto-fields.ts"]} />
                      </div>
                    </li>
                    <li>
                      Plaid webhook verification and sync boundaries:
                      <div className="mt-1">
                        <SourceList paths={["lib/plaid/webhooks.ts", "app/api/webhooks/plaid/route.ts", "lib/plaid/sync.ts"]} />
                      </div>
                    </li>
                    <li>
                      Audit logging:
                      <div className="mt-1">
                        <SourceList paths={["lib/audit-log.ts", "app/api/audit-log/route.ts"]} />
                      </div>
                    </li>
                  </ul>
                </article>
              </div>
            </Section>

            <Section id="operations" title="Operations and Deployment">
              <div className="grid gap-6 md:grid-cols-2">
                <article className="rounded border border-border bg-surface p-5">
                  <h3 className="text-base font-semibold text-text">Background jobs and runtime orchestration</h3>
                  <p className="mt-2 text-sm text-text-muted">
                    Server startup hooks initialize DB views, optional demo seed, and scheduler jobs.
                  </p>
                  <div className="mt-3">
                    <SourceList
                      paths={[
                        "instrumentation.ts",
                        "lib/scheduler.ts",
                        "lib/digest/generate.ts",
                        "app/api/settings/scheduler/route.ts",
                        "scripts/cron.ts",
                      ]}
                    />
                  </div>
                </article>
                <article className="rounded border border-border bg-surface p-5">
                  <h3 className="text-base font-semibold text-text">Container and edge infrastructure</h3>
                  <p className="mt-2 text-sm text-text-muted">
                    Dockerized deploy target with nginx reverse proxy, TLS headers, and upstream routing.
                  </p>
                  <div className="mt-3">
                    <SourceList
                      paths={[
                        "docker/Dockerfile",
                        "docker/docker-compose.yml",
                        "docker/nginx/nginx.conf",
                        "scripts/setup.js",
                        "scripts/ensure-views.mjs",
                      ]}
                    />
                  </div>
                </article>
              </div>
            </Section>

            <Section id="source-index" title="Full Source Index">
              <p className="text-sm text-text-muted">
                Consolidated index of the primary application code in the main project. Use this section as a direct
                jump table during implementation review or interviews.
              </p>
              <div className="space-y-4">
                {SOURCE_INDEX_GROUPS.map((group) => (
                  <details key={group.title} className="rounded border border-border bg-surface p-4" open>
                    <summary className="cursor-pointer text-sm font-semibold text-text">{group.title}</summary>
                    <div className="mt-3">
                      <SourceList paths={group.files} />
                    </div>
                  </details>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
