import type { Metadata } from "next";
import Link from "next/link";
import { APP_SITE_URL, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Walkthroughs",
  description:
    "Practical step-by-step walkthroughs for Powerhour workflows: setup, analysis, budgeting, recurring audits, and report generation.",
  keywords: [
    "Powerhour walkthrough",
    "self-hosted finance setup guide",
    "budget planner tutorial",
    "subscription audit guide",
    "finance dashboard workflow",
  ],
};

type Walkthrough = {
  id: string;
  title: string;
  audience: string;
  outcomes: string[];
  steps: string[];
  routes: string[];
};

const WALKTHROUGHS: Walkthrough[] = [
  {
    id: "first-session",
    title: "Walkthrough 1: First session setup and baseline sync",
    audience: "New user validating initial setup and data ingestion.",
    outcomes: [
      "Sign in successfully and confirm secure session flow.",
      "Connect at least one institution.",
      "Run initial sync and verify dashboard population.",
    ],
    steps: [
      "Open the login route and authenticate.",
      "Go to Settings and use the institution link flow.",
      "Trigger a manual sync from Settings after linking.",
      "Return to Dashboard and confirm KPI, charts, and recent transactions are populated.",
      "Open Accounts and verify institution/account grouping is correct.",
    ],
    routes: ["/login", "/settings", "/", "/accounts"],
  },
  {
    id: "spending-review",
    title: "Walkthrough 2: Weekly spending review with Ticker AI",
    audience: "User doing a weekly financial review.",
    outcomes: [
      "Validate category and merchant trend movement.",
      "Identify anomalies and recurring pressure points.",
      "Capture report-ready insights.",
    ],
    steps: [
      "Open Dashboard and review KPI movement and net worth trend.",
      "Use Ticker AI to ask for this month versus last month spend changes.",
      "Ask Ticker to identify categories with unusual spikes.",
      "Open Transactions and filter by impacted categories/merchants for root-cause review.",
      "Generate a report from Dashboard if a snapshot is needed for sharing.",
    ],
    routes: ["/", "/transactions"],
  },
  {
    id: "budget-goals",
    title: "Walkthrough 3: Create and operationalize budget goals",
    audience: "User planning category caps from real spending behavior.",
    outcomes: [
      "Generate budget goals from profile + historical behavior.",
      "Review goal fit and modify lifecycle state.",
      "Confirm dashboard reflects accepted goals.",
    ],
    steps: [
      "Open Smart Budgets and complete onboarding inputs.",
      "Run AI goal generation and review suggested caps.",
      "Accept, dismiss, or refine goals based on current priorities.",
      "Return to Dashboard and verify Budget Goals panel alignment.",
      "Track progress over time using dashboard and transactions views.",
    ],
    routes: ["/budgets", "/", "/transactions"],
  },
  {
    id: "planner-savings",
    title: "Walkthrough 4: Convert planner output into savings targets",
    audience: "User creating a concrete savings plan with AI guidance.",
    outcomes: [
      "Generate target amount and time-bound plan.",
      "Write savings target into the app state.",
      "Validate projection chart behavior in Projections.",
    ],
    steps: [
      "Open Budget Planner and start a new savings-focused conversation.",
      "Confirm target amount and date with the planner.",
      "Approve creation of savings target when prompted.",
      "Open Projections and switch to Savings Goals tab.",
      "Review monthly contribution requirements and projected trajectory.",
    ],
    routes: ["/budget-planner", "/projections?tab=savings"],
  },
  {
    id: "recurring-cleanup",
    title: "Walkthrough 5: Recurring and subscription cleanup",
    audience: "User reducing recurring burn and eliminating unused services.",
    outcomes: [
      "Identify flagged recurring items.",
      "Estimate monthly and annual savings at risk.",
      "Deactivate unneeded recurring obligations.",
    ],
    steps: [
      "Open Subscriptions and review flagged versus active groups.",
      "Inspect frequency-normalized monthly risk values.",
      "Deactivate unused subscriptions from the list.",
      "Open Projections > Recurring tab and confirm state changes.",
      "Run a Ticker AI recurring audit to validate improvements.",
    ],
    routes: ["/subscriptions", "/projections", "/"],
  },
  {
    id: "reporting",
    title: "Walkthrough 6: Monthly reporting and documentation",
    audience: "User preparing monthly summary artifacts.",
    outcomes: [
      "Generate an in-memory PDF report.",
      "Cross-check report with live dashboard values.",
      "Capture key decisions for next planning cycle.",
    ],
    steps: [
      "Generate a report from Dashboard report action.",
      "Verify key sections: KPI snapshot, trend charts, categories, merchants, anomalies.",
      "Cross-check a sample of figures against Dashboard and Transactions.",
      "Create an expense group for a focus theme if deeper tracking is needed.",
      "Open Budget Planner to define next-month adjustment plan.",
    ],
    routes: ["/", "/transactions", "/transactions/groups", "/budget-planner"],
  },
];

function appUrl(path: string) {
  const trimmedPath = path.startsWith("/") ? path : `/${path}`;
  return `${APP_SITE_URL}${trimmedPath}`;
}

export default function WalkthroughsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Powerhour Docs</p>
        <h1 className="text-4xl font-extrabold text-text md:text-5xl">Common Feature Walkthroughs</h1>
        <p className="max-w-4xl text-sm text-text-muted">
          These walkthroughs are designed for repeatable execution. Each flow maps to real routes on{" "}
          <a href={APP_SITE_URL} target="_blank" rel="noreferrer" className="text-brand underline underline-offset-2">
            powerhour.dev
          </a>
          {" "}and focuses on outcome verification, not marketing copy.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/docs" className="rounded border border-border px-4 py-2 text-sm font-semibold text-text">
            Docs index
          </Link>
          <Link href="/docs/faq" className="rounded border border-border px-4 py-2 text-sm font-semibold text-text">
            FAQ
          </Link>
        </div>
      </header>

      <div className="mt-8 rounded border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold text-text">How to use this page</h2>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          <li>Run each walkthrough in sequence for complete onboarding and operational confidence.</li>
          <li>Use the route links to open product pages directly on powerhour.dev.</li>
          <li>Use outcomes as acceptance criteria before moving to the next workflow.</li>
        </ul>
      </div>

      <div className="mt-10 space-y-8">
        {WALKTHROUGHS.map((walkthrough) => (
          <section key={walkthrough.id} id={walkthrough.id} className="scroll-mt-24 rounded border border-border bg-surface p-6">
            <h2 className="text-2xl font-bold text-text">{walkthrough.title}</h2>
            <p className="mt-2 text-sm text-text-muted">
              <span className="font-semibold text-text">Audience:</span> {walkthrough.audience}
            </p>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Expected outcomes</h3>
                <ul className="mt-2 space-y-2 text-sm text-text-muted">
                  {walkthrough.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Routes</h3>
                <ul className="mt-2 space-y-2">
                  {walkthrough.routes.map((route) => (
                    <li key={route}>
                      <a
                        href={appUrl(route)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-brand underline underline-offset-2"
                      >
                        {appUrl(route)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Step-by-step execution</h3>
              <ol className="mt-2 space-y-2 text-sm text-text-muted">
                {walkthrough.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-text">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-12 border-t border-border pt-6 text-xs text-text-muted">
        <p>Canonical docs base: {SITE_URL}/docs</p>
      </footer>
    </div>
  );
}
