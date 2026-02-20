import type { Metadata } from "next";
import Link from "next/link";
import { HeroShaderGradient } from "@/components/hero-shader-gradient";
import { FEATURE_SUMMARIES, GITHUB_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore every Powerhour capability: dashboard analytics, Ticker AI, Budget Planner modes, PDF reporting, recurring audits, smart goals, and self-hosting workflows.",
};

const PRODUCT_METRICS = [
  {
    value: "13",
    label: "Live finance visuals",
    detail: "Interactive views across balances, spending, utilization, and forward-looking forecasts.",
    highlights: [
      "Net worth, liquidity, and balance trendlines",
      "Category, merchant, and payment-channel breakdowns",
      "Cash-flow and savings projection views",
    ],
  },
  {
    value: "2",
    label: "Specialized AI agents",
    detail: "Two agents with clear roles: fast in-app diagnostics and deeper scenario-based planning.",
    highlights: [
      "Ticker AI for account-aware answers and analysis",
      "Budget Planner for structured goal planning",
      "Direct handoff into budgets and reporting workflows",
    ],
  },
  {
    value: "9",
    label: "Report-ready PDF sections",
    detail: "Modular sections generated in memory for fast, shareable weekly or monthly reporting.",
    highlights: [
      "Executive snapshot with key KPI movement",
      "Account, category, and recurring-charge deep dives",
      "Consistent, audit-friendly report formatting",
    ],
  },
];

const CORE_MODULES = [
  {
    title: "Dashboard command center",
    body: "One-page financial posture with net worth trend, KPI cards, account distribution, and category-level spend movement.",
    points: [
      "Net worth and balance history views",
      "Spending and payment channel trend charts",
      "Credit utilization visibility",
      "Recent transactions and account overview",
    ],
  },
  {
    title: "Transactions and grouping workflows",
    body: "Search, filter, and organize transaction-level detail for precise cleanup and category analysis.",
    points: [
      "Merchant/category/date filtering",
      "Pagination and debounced search",
      "Expense group creation and assignment",
      "Group-level review flows",
    ],
  },
  {
    title: "Accounts and projections",
    body: "Institution-by-institution detail plus recurring forecasts that help you plan ahead.",
    points: [
      "Institution-grouped account listing",
      "Per-account balance history charts",
      "Recurring item management",
      "Savings projection timelines",
    ],
  },
  {
    title: "Subscription waste detection",
    body: "Recurring audit identifies likely inactive charges and quantifies potential monthly/annual savings at risk.",
    points: [
      "90+ day inactivity flagging",
      "Monthly savings-at-risk calculations",
      "Active vs flagged segmentation",
      "Direct follow-up via planner and budgets",
    ],
  },
  {
    title: "Smart budget goals",
    body: "Category caps generated from historical spend behavior with ongoing progress tracking.",
    points: [
      "AI-assisted category cap suggestions",
      "Per-goal progress bars",
      "Month-over-month context",
      "Integrated with dashboard modules",
    ],
  },
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
];

const TICKER_TOOLS = [
  "Spending summary",
  "Account balances",
  "Transaction search",
  "Trend comparison",
  "Recurring expenses",
  "Recurring audit",
  "Cash flow forecast",
  "Merchant category analysis",
  "Anomaly detection",
  "Debt payoff projection",
  "Weekly digest",
  "Report generation trigger",
];

const PLANNER_MODES = [
  {
    mode: "Travel budgets",
    detail:
      "Captures trip constraints, researches current pricing, then synthesizes practical low/mid/high budget scenarios.",
  },
  {
    mode: "Savings goals",
    detail:
      "Calculates required monthly contributions, checks feasibility against recurring load, and writes targets to tracking views.",
  },
  {
    mode: "Cut spending",
    detail:
      "Analyzes category intensity and recommends reduction targets that can be promoted into persistent budget goals.",
  },
];

const PAGE_COVERAGE = [
  { route: "/", focus: "Dashboard + embedded Ticker AI" },
  { route: "/transactions", focus: "Search, filters, and expense groups" },
  { route: "/accounts", focus: "Institution and account-level visibility" },
  { route: "/projections", focus: "Recurring schedules and savings forecasting" },
  { route: "/subscriptions", focus: "Inactive recurring charge detection" },
  { route: "/budgets", focus: "Smart category cap management" },
  { route: "/budget-planner", focus: "Planner agent with mode-specific flows" },
  { route: "/settings", focus: "Security log, schedules, auth, and institutions" },
];

function FeatureCard({ title, body, points }: { title: string; body: string; points: string[] }) {
  return (
    <article className="rounded-card border border-border bg-surface p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <h3 className="text-2xl font-semibold text-text">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">{body}</p>
      <ul className="mt-5 space-y-2 text-sm text-text-muted">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroShaderGradient />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-b from-background/35 via-background/10 to-background/60"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div className="animate-rise space-y-6 rounded-card border border-border bg-surface p-6 shadow-card md:self-center md:p-8">
            <p className="inline-flex rounded-full border border-border bg-background px-4 py-1 text-sm font-medium text-text-muted">
              Full platform capabilities
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-text md:text-6xl md:leading-[1.05]">
              Every feature built for daily financial decisions, not dashboards for show.
            </h1>
            <p className="max-w-2xl text-lg text-text-muted">
              Powerhour combines deep account analytics, specialized AI workflows, automated recurring audits, and on-demand reporting in one self-hosted stack.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/deploy"
                className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-strong"
              >
                Deploy it
              </Link>
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-background px-6 py-3 text-base font-semibold text-text transition hover:border-brand hover:text-brand"
              >
                Browse source
              </Link>
            </div>
          </div>
          <div className="animate-rise-delayed grid gap-4 md:self-center">
            {PRODUCT_METRICS.map((item) => (
              <article
                key={item.label}
                className="relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-5 shadow-card"
              >
                <div className="relative">
                  <p className="font-display text-5xl font-extrabold text-brand">{item.value}</p>
                  <p className="text-base font-semibold text-text">{item.label}</p>
                  <p className="mt-1 text-sm leading-snug text-text-muted">{item.detail}</p>
                </div>
                <div className="relative mt-4 border-t border-border pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Includes</p>
                  <ul className="mt-2 space-y-1 text-sm leading-snug text-text-muted">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-text md:text-4xl">Core feature modules</h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          These modules form the primary workflow from data ingestion to weekly planning and execution.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {CORE_MODULES.map((module) => (
            <FeatureCard key={module.title} title={module.title} body={module.body} points={module.points} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface-alt">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <h2 className="text-3xl font-bold text-text md:text-4xl">Agentic features</h2>
          <p className="mt-3 max-w-3xl text-text-muted">
            Powerhour ships two agent execution models built on custom server-side tooling, typed tool schemas, and
            step-capped orchestration for predictable behavior in production.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-card border border-border bg-surface p-6 shadow-card">
              <h3 className="text-2xl font-bold text-text">Ticker AI chat</h3>
              <p className="mt-3 text-sm text-text-muted">
                ReAct-style analysis agent embedded in the dashboard with streaming output, an 8-step execution cap,
                and custom finance tools for diagnostics, projections, and reporting actions.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {TICKER_TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-text-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
            <article className="rounded-card border border-border bg-surface p-6 shadow-card">
              <h3 className="text-2xl font-bold text-text">Budget Planner agent</h3>
              <p className="mt-3 text-sm text-text-muted">
                Mode-driven planner for research-heavy scenarios and goal execution, including multi-phase web research
                loops, savings projections, and confirmation-gated write actions.
              </p>
              <div className="mt-5 space-y-3">
                {PLANNER_MODES.map((mode) => (
                  <div key={mode.mode} className="rounded-xl border border-border bg-background p-4">
                    <p className="text-sm font-semibold text-text">{mode.mode}</p>
                    <p className="mt-1 text-sm text-text-muted">{mode.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-text md:text-4xl">Feature coverage by page</h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          The app surface is split into focused pages so finance operations stay fast and understandable.
        </p>
        <div className="mt-8 overflow-hidden rounded-card border border-border bg-surface shadow-card">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] border-b border-border bg-background px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
            <p>Route</p>
            <p>Primary focus</p>
          </div>
          {PAGE_COVERAGE.map((row) => (
            <div
              key={row.route}
              className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] border-b border-border px-5 py-4 text-sm last:border-none"
            >
              <p className="font-mono font-semibold text-text">{row.route}</p>
              <p className="text-text-muted">{row.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-bold text-text md:text-4xl">Highlights at a glance</h2>
          <p className="mt-3 max-w-3xl text-text-muted">
            From {FEATURE_SUMMARIES.length} major product pillars to detailed page-level workflows, Powerhour is designed as a comprehensive, auditable personal finance operating system.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_SUMMARIES.map((feature) => (
              <article key={feature.title} className="rounded-card border border-border bg-background p-5">
                <h3 className="text-lg font-semibold text-text">{feature.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
