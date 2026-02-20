import type { Metadata } from "next";
import { StickyToc, type TocItem } from "@/components/docs/sticky-toc.client";
import { DOCS_SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Walkthrough",
  description:
    "Operational walkthroughs for self-hosted Powerhour deployments with goals, prerequisites, steps, and validation checks.",
};

type WalkthroughSection = {
  id: string;
  title: string;
  goal: string;
  prereqs: string[];
  steps: string[];
  validation: string[];
  routes: string[];
};

const SECTIONS: WalkthroughSection[] = [
  {
    id: "setup-sync",
    title: "Initial setup and sync validation",
    goal: "Confirm authentication, institution linkage, and baseline data ingestion.",
    prereqs: ["Valid deployment is running.", "Environment variables are configured.", "At least one institution can be linked."],
    steps: [
      "Sign in using the configured authentication flow.",
      "Open Settings and link a financial institution.",
      "Trigger manual sync.",
      "Open Dashboard and check KPI/charts populate.",
      "Open Accounts and verify institution/account structure.",
    ],
    validation: [
      "No auth errors during login.",
      "Institution appears in Settings.",
      "Sync completes without failures.",
      "Dashboard and account routes show data.",
    ],
    routes: ["/login", "/settings", "/", "/accounts"],
  },
  {
    id: "weekly-review",
    title: "Weekly spending review using Ticker AI",
    goal: "Detect movement in spending behavior and isolate root causes quickly.",
    prereqs: ["Recent transaction data exists.", "Ticker AI endpoint is available."],
    steps: [
      "Open Dashboard and inspect KPI movement.",
      "Use Ticker to compare current month versus prior month spending.",
      "Ask for anomaly candidates and recurring pressure points.",
      "Open Transactions and filter by flagged categories or merchants.",
      "Capture findings for planning or report generation.",
    ],
    validation: [
      "Ticker responses stream successfully.",
      "Anomaly prompts produce concrete categories.",
      "Filtered transaction queries align with AI findings.",
    ],
    routes: ["/", "/transactions"],
  },
  {
    id: "budget-goals",
    title: "Generate and apply budget goals",
    goal: "Turn historical spend patterns into actionable category limits.",
    prereqs: ["Transaction history exists across recent months."],
    steps: [
      "Open Smart Budgets.",
      "Complete onboarding inputs and run generation.",
      "Review suggested goals and adjust acceptance status.",
      "Return to Dashboard and verify budget panel updates.",
      "Track progress against accepted categories.",
    ],
    validation: [
      "Goals are created and persisted.",
      "Dashboard budget components reflect new targets.",
      "Goal state transitions persist correctly.",
    ],
    routes: ["/budgets", "/"],
  },
  {
    id: "planner-targets",
    title: "Planner to savings-target workflow",
    goal: "Convert planner guidance into tracked savings targets.",
    prereqs: ["Budget Planner API path is configured.", "Savings target APIs are reachable."],
    steps: [
      "Open Budget Planner and run a savings scenario.",
      "Confirm target amount and date in planner output.",
      "Accept target creation action.",
      "Open Projections and inspect savings tab chart.",
      "Verify monthly contribution value and timeline.",
    ],
    validation: [
      "Planner session persists.",
      "Savings target record is created.",
      "Projection chart renders updated target path.",
    ],
    routes: ["/budget-planner", "/projections?tab=savings"],
  },
  {
    id: "recurring-cleanup",
    title: "Recurring and subscription cleanup",
    goal: "Reduce recurring burn by removing inactive obligations.",
    prereqs: ["Recurring detection has processed enough history."],
    steps: [
      "Open Subscriptions and review flagged items.",
      "Inspect monthly and annual savings-at-risk.",
      "Deactivate unnecessary recurring items.",
      "Open Projections recurring tab to confirm state changes.",
      "Run a follow-up recurring audit through Ticker.",
    ],
    validation: [
      "Flagged count and at-risk values are visible.",
      "Deactivation requests persist.",
      "Recurring list reflects active-state changes.",
    ],
    routes: ["/subscriptions", "/projections", "/"],
  },
  {
    id: "reporting-cycle",
    title: "Monthly reporting cycle",
    goal: "Generate and verify shareable monthly output.",
    prereqs: ["Sufficient transaction and balance history exists.", "Report endpoint is enabled."],
    steps: [
      "Trigger report generation from Dashboard.",
      "Review generated report sections for completeness.",
      "Cross-check sampled values against dashboard metrics.",
      "Create or refine groups for high-priority spend themes.",
      "Start planner session for next-cycle adjustments.",
    ],
    validation: [
      "Report download completes.",
      "Report values match sampled in-app values.",
      "New follow-up planning actions are captured.",
    ],
    routes: ["/", "/transactions", "/transactions/groups", "/budget-planner"],
  },
];

const TOC: TocItem[] = SECTIONS.map((section) => ({ id: section.id, label: section.title }));

export default function WalkthroughPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <header className="mb-8 space-y-4 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Powerhour Docs</p>
        <h1 className="text-4xl font-extrabold text-text md:text-5xl">Walkthrough</h1>
        <p className="max-w-4xl text-sm text-text-muted">
          Standard operational playbooks for self-hosted instances. Route references below are internal app paths in
          your own deployment.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <StickyToc title="Workflows" items={TOC} />
        </aside>

        <main className="space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 rounded border border-border bg-surface p-6">
              <h2 className="text-2xl font-bold text-text">{section.title}</h2>
              <p className="mt-2 text-sm text-text-muted">
                <span className="font-semibold text-text">Goal:</span> {section.goal}
              </p>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Prerequisites</h3>
                  <ul className="mt-2 space-y-2 text-sm text-text-muted">
                    {section.prereqs.map((prereq) => (
                      <li key={prereq} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">In-app routes</h3>
                  <ul className="mt-2 space-y-1">
                    {section.routes.map((route) => (
                      <li key={route} className="font-mono text-xs text-text-muted">
                        {route}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Execution steps</h3>
                <ol className="mt-2 space-y-2 text-sm text-text-muted">
                  {section.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-text">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Validation checklist</h3>
                <ul className="mt-2 space-y-2 text-sm text-text-muted">
                  {section.validation.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </main>
      </div>

      <footer className="mt-8 border-t border-border pt-5 text-xs text-text-muted">
        <p>Canonical URL: {DOCS_SITE_URL}/walkthrough</p>
      </footer>
    </div>
  );
}
