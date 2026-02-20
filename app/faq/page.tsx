import type { Metadata } from "next";
import { DOCS_SITE_URL, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions for self-hosted Powerhour deployments: setup, security, AI behavior, and troubleshooting.",
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
        question: "What is the fastest setup validation path?",
        answer:
          "Authenticate, link one institution in /settings, run sync, and confirm data appears on /, /accounts, and /transactions. This validates auth, token exchange, sync, and UI rendering.",
      },
      {
        id: "setup-2",
        question: "Can I run without Plaid credentials?",
        answer:
          "Yes. Demo mode seeds sample data and blocks Plaid link/exchange/sync operations so the instance remains explorable without external credentials.",
      },
      {
        id: "setup-3",
        question: "Do I need all modules enabled on day one?",
        answer:
          "No. Typical rollout: dashboard and transactions first, recurring/subscriptions second, then budgets and planner once baseline data quality is stable.",
      },
    ],
  },
  {
    id: "security",
    title: "Security and data handling",
    items: [
      {
        id: "security-1",
        question: "Where is data stored?",
        answer:
          "Data is stored in your own PostgreSQL deployment. Access tokens are encrypted at rest before persistence.",
      },
      {
        id: "security-2",
        question: "How are agents prevented from seeing sensitive fields?",
        answer:
          "Agent queries are constrained through database views that exclude sensitive token/cursor columns.",
      },
      {
        id: "security-3",
        question: "Are webhook payloads verified?",
        answer:
          "Yes. Webhook handlers perform signature and payload-integrity verification before processing updates.",
      },
      {
        id: "security-4",
        question: "Is there an audit trail?",
        answer:
          "Yes. Critical actions such as login, password changes, institution link/delete, and report downloads are recorded.",
      },
    ],
  },
  {
    id: "features",
    title: "Feature behavior",
    items: [
      {
        id: "features-1",
        question: "What is the difference between Ticker and Planner?",
        answer:
          "Ticker handles short diagnostic analysis in context. Planner supports longer mode-based flows (travel, savings targets, spend reduction).",
      },
      {
        id: "features-2",
        question: "Are reports written to server disk?",
        answer:
          "No. Reports are generated in-memory and returned directly in the response stream.",
      },
      {
        id: "features-3",
        question: "How often is data refreshed?",
        answer:
          "Manual sync is available in /settings. Scheduled sync/digest jobs can also be enabled.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    items: [
      {
        id: "troubleshooting-1",
        question: "Why does an institution show relink_required?",
        answer:
          "Upstream provider state requires re-auth. Use relink in /settings to refresh credentials while preserving local records.",
      },
      {
        id: "troubleshooting-2",
        question: "Why are recurring items missing?",
        answer:
          "Recurring detection needs sufficient history and merchant consistency. Sync additional data and re-check /projections and /subscriptions.",
      },
      {
        id: "troubleshooting-3",
        question: "Why are some charts empty?",
        answer:
          "Chart modules depend on snapshot/history availability. Confirm sync and inspect route-specific date coverage.",
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
          <h1 className="text-4xl font-extrabold text-text md:text-5xl">FAQ</h1>
          <p className="max-w-4xl text-sm text-text-muted">
            Frequently asked questions for self-hosted operators. All route references refer to paths in your own
            deployment.
          </p>
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
          <p>Canonical URL: {SITE_URL}/faq</p>
          <p>
            Related docs:{" "}
            <a href={`${DOCS_SITE_URL}/docs`} className="text-brand underline underline-offset-2">
              index
            </a>
            {" "}·{" "}
            <a href={`${DOCS_SITE_URL}/walkthrough`} className="text-brand underline underline-offset-2">
              walkthrough
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
