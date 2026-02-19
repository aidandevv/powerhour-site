import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Deploy",
  description:
    "Use this checklist to deploy Powerhour marketing separately from the authenticated app deployment.",
};

export default function DeployPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-extrabold text-text md:text-5xl">Deploy guide</h1>
      <p className="mt-4 max-w-3xl text-lg text-text-muted">
        Keep two independent deployments: one for marketing and one for the authenticated product app.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-card border border-border bg-surface p-6 shadow-card">
          <h2 className="text-lg font-semibold text-text">1. Publish app source</h2>
          <p className="mt-2 text-sm text-text-muted">
            Open source the dashboard with setup docs and environment examples.
          </p>
        </article>
        <article className="rounded-card border border-border bg-surface p-6 shadow-card">
          <h2 className="text-lg font-semibold text-text">2. Deploy this site separately</h2>
          <p className="mt-2 text-sm text-text-muted">
            Run this marketing app as its own project with static-first rendering and CDN caching.
          </p>
        </article>
        <article className="rounded-card border border-border bg-surface p-6 shadow-card">
          <h2 className="text-lg font-semibold text-text">3. Link visitors to docs</h2>
          <p className="mt-2 text-sm text-text-muted">
            Route CTAs to GitHub, quickstart docs, and deployment instructions.
          </p>
        </article>
      </div>

      <div className="mt-10 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-2xl font-bold text-text">CLI quickstart</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-bg p-4 text-sm text-text">
{`cd marketing-site
npm install
npm run dev`}
        </pre>
        <div className="mt-4">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong"
          >
            Open repository
          </Link>
        </div>
      </div>
    </section>
  );
}
