import type { Metadata } from "next";
import { FEATURE_SUMMARIES } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Powerhour's unified dashboard, Ticker AI chat with 12 tools, Budget Planner agent, in-memory PDF reports, subscription audit, and smart budget goals.",
};

const ICON_PATHS: Record<string, string> = {
  dashboard:
    "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  chat: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
  plan: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
  report:
    "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  subscription:
    "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
  goal: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z",
};

function PageFeatureIcon({ name }: { name: string }) {
  const d = ICON_PATHS[name] ?? ICON_PATHS.dashboard;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export default function FeaturesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-extrabold text-text md:text-5xl">Features</h1>
      <p className="mt-4 max-w-3xl text-lg text-text-muted">
        Powerhour combines core finance observability with practical AI workflows that operate on your synced financial data.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURE_SUMMARIES.map((feature) => (
          <article
            key={feature.title}
            className="rounded-card border border-border bg-surface p-6 shadow-card"
          >
            <div className="mb-4 inline-flex rounded-xl bg-brand/10 p-2 text-brand">
              <PageFeatureIcon name={feature.icon} />
            </div>
            <h2 className="text-xl font-semibold text-text">{feature.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{feature.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-2xl font-bold text-text">Technical depth snapshot</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-text-muted">
          <li><span className="font-mono text-text-muted">→</span> Next.js 14 App Router + TypeScript strict mode</li>
          <li><span className="font-mono text-text-muted">→</span> Plaid transactions sync with recurring detection</li>
          <li><span className="font-mono text-text-muted">→</span> Ticker agent: 12 tools across spending, trends, and forecasts</li>
          <li><span className="font-mono text-text-muted">→</span> Budget Planner agent: travel, savings goal, and cut-spending modes</li>
          <li><span className="font-mono text-text-muted">→</span> In-memory PDF rendering with custom chart primitives</li>
          <li><span className="font-mono text-text-muted">→</span> Drizzle ORM with 16 typed tables and migration pipeline</li>
          <li><span className="font-mono text-text-muted">→</span> AI SDK v6 streaming with tool call orchestration</li>
          <li><span className="font-mono text-text-muted">→</span> Daily sync scheduler + Monday weekly digest generation</li>
        </ul>
      </div>
    </section>
  );
}
