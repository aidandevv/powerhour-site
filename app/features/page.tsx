import type { Metadata } from "next";
import { FEATURE_SUMMARIES } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore dashboard analytics, AI chat, budgeting workflows, report generation, and subscription audits in Powerhour.",
};

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
            <h2 className="text-xl font-semibold text-text">{feature.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{feature.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-2xl font-bold text-text">Technical depth snapshot</h2>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          <li>Next.js App Router + TypeScript strict mode</li>
          <li>Plaid transactions sync with recurring detection workflows</li>
          <li>Two AI agents for chat and planning, with tool-based execution</li>
          <li>In-memory PDF report rendering with custom chart primitives</li>
        </ul>
      </div>
    </section>
  );
}
