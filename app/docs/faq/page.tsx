import type { Metadata } from "next";
import Link from "next/link";
import { APP_SITE_URL, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions for Powerhour covering setup, security, AI behavior, sync reliability, and troubleshooting.",
  keywords: [
    "Powerhour FAQ",
    "self-hosted finance faq",
    "Plaid sync troubleshooting",
    "personal finance app security questions",
    "budget planner faq",
  ],
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "setup",
    title: "Setup and onboarding",
    items: [
      {
        id: "setup-1",
        question: "What is the fastest way to validate my setup?",
        answer:
          "Log in, link one institution in Settings, run a manual sync, and then confirm Dashboard, Accounts, and Transactions are populated. That path validates auth, Plaid token exchange, sync, and UI rendering end to end.",
      },
      {
        id: "setup-2",
        question: "Can I use Powerhour without Plaid credentials?",
        answer:
          "Yes. Demo mode seeds realistic data and keeps the app usable for exploration. Plaid link/exchange/sync endpoints are intentionally blocked in demo mode.",
      },
      {
        id: "setup-3",
        question: "Where should I start if I am evaluating for production use?",
        answer:
          "Start with Settings, Security page, and Deployment guide. Then run the walkthroughs to validate recurring detection, planner behavior, and reporting quality against your own data.",
      },
      {
        id: "setup-4",
        question: "Do I need to use all modules from day one?",
        answer:
          "No. A common rollout is: dashboard and transactions first, recurring/subscriptions second, then budget goals and planner once baseline data quality is stable.",
      },
    ],
  },
  {
    id: "security",
    title: "Security and privacy",
    items: [
      {
        id: "security-1",
        question: "Where is sensitive banking data stored?",
        answer:
          "Data is stored in your own PostgreSQL instance. Access tokens are encrypted before storage, and sensitive columns are excluded from agent-facing database views.",
      },
      {
        id: "security-2",
        question: "Can prompt injection expose access tokens?",
        answer:
          "The agent layer is structurally constrained by database views that omit token and cursor fields. Prompts cannot request data that is not present in the query surface.",
      },
      {
        id: "security-3",
        question: "How are webhooks validated?",
        answer:
          "Plaid webhooks are verified with signature checks and body-hash validation before processing, preventing unauthenticated payloads from triggering state changes.",
      },
      {
        id: "security-4",
        question: "Is there an audit trail for sensitive actions?",
        answer:
          "Yes. Login, password changes, institution link/delete, and report downloads are captured in audit log events with timestamps and metadata.",
      },
      {
        id: "security-5",
        question: "Who is responsible for infrastructure-level security?",
        answer:
          "The deployer. Application controls are implemented in code, but TLS, host hardening, key rotation, network policies, and backup policies are infrastructure responsibilities.",
      },
    ],
  },
  {
    id: "features",
    title: "Features and AI behavior",
    items: [
      {
        id: "features-1",
        question: "What is the difference between Ticker AI and Budget Planner?",
        answer:
          "Ticker AI is for fast diagnostics in context of current data (spending, balances, anomalies). Budget Planner is a mode-driven planning assistant for longer workflows (travel, savings goals, spend reduction).",
      },
      {
        id: "features-2",
        question: "Does report generation write files to the server disk?",
        answer:
          "No. Reports are generated in memory and streamed as a download response.",
      },
      {
        id: "features-3",
        question: "How are subscription risks estimated?",
        answer:
          "Recurring items are normalized to monthly equivalents by frequency, then inactivity windows and flagged risk totals are calculated for monthly and annual savings-at-risk estimates.",
      },
      {
        id: "features-4",
        question: "Can planner results be tracked in the main app?",
        answer:
          "Yes. Planner flows can create savings targets and budget goals that appear in Projections and Dashboard modules.",
      },
      {
        id: "features-5",
        question: "How often does data refresh?",
        answer:
          "Scheduled jobs can run daily sync and weekly digest generation, and manual sync can be triggered from Settings for immediate refresh.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    items: [
      {
        id: "troubleshooting-1",
        question: "Why is an institution marked relink required?",
        answer:
          "The institution has an upstream Plaid item state requiring user re-auth. Use relink in Settings to refresh access continuity without rebuilding your local data model.",
      },
      {
        id: "troubleshooting-2",
        question: "Why do I see no recurring items?",
        answer:
          "Recurring detection depends on enough transaction history and stable merchant patterns. Run sync, verify transaction volume, then re-check Projections and Subscriptions.",
      },
      {
        id: "troubleshooting-3",
        question: "Why does a chart look empty or sparse?",
        answer:
          "Most chart modules require historical snapshots or recent transaction density. Confirm sync completed successfully and verify date range coverage in the relevant route.",
      },
      {
        id: "troubleshooting-4",
        question: "What should I do if AI responses fail intermittently?",
        answer:
          "Check rate limits, model provider credentials, and network egress for AI calls. Then retry with narrower prompts and verify API responses in server logs.",
      },
      {
        id: "troubleshooting-5",
        question: "How do I recover from a failed deployment update?",
        answer:
          "Roll back to the last known good image, restore database from backup if schema changed unexpectedly, then re-run migrations in a controlled maintenance window.",
      },
    ],
  },
];

const FAQ_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_SECTIONS.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_PAGE_SCHEMA) }} />
      <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
        <header className="space-y-4 border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Powerhour Docs</p>
          <h1 className="text-4xl font-extrabold text-text md:text-5xl">Frequently Asked Questions</h1>
          <p className="max-w-4xl text-sm text-text-muted">
            This FAQ covers common implementation, operations, and trust questions. Product routes referenced here are
            hosted on{" "}
            <a href={APP_SITE_URL} target="_blank" rel="noreferrer" className="text-brand underline underline-offset-2">
              powerhour.dev
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs" className="rounded border border-border px-4 py-2 text-sm font-semibold text-text">
              Docs index
            </Link>
            <Link href="/docs/walkthroughs" className="rounded border border-border px-4 py-2 text-sm font-semibold text-text">
              Walkthroughs
            </Link>
            <a
              href={`${APP_SITE_URL}/deploy`}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border px-4 py-2 text-sm font-semibold text-text"
            >
              Deployment guide
            </a>
          </div>
        </header>

        <div className="mt-8 rounded border border-border bg-surface p-5">
          <h2 className="text-base font-semibold text-text">Section index</h2>
          <ul className="mt-3 grid gap-2 text-sm text-text-muted md:grid-cols-2">
            {FAQ_SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="underline underline-offset-2 hover:text-brand">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 space-y-10">
          {FAQ_SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4 border-b border-border pb-10">
              <h2 className="text-2xl font-bold text-text">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details key={item.id} className="rounded border border-border bg-surface p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-text">{item.question}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-8 text-xs text-text-muted">
          <p>Canonical docs URL: {SITE_URL}/docs/faq</p>
        </footer>
      </div>
    </>
  );
}
