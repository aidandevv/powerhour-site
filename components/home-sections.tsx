import Link from "next/link";
import {
  FEATURE_SUMMARIES,
  GITHUB_URL,
  SECURITY_POINTS,
  SITE_TAGLINE,
} from "@/lib/site-config";
import { HeroShaderGradient } from "@/components/hero-shader-gradient";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <HeroShaderGradient />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
        <div className="space-y-6 animate-rise">
          <p className="inline-flex rounded-full border border-border bg-surface px-4 py-1 text-sm font-medium text-text-muted">
            Open-source friendly marketing shell
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-text md:text-6xl md:leading-[1.05]">
            {SITE_TAGLINE}
          </h1>
          <p className="max-w-xl text-lg text-text-muted">
            Powerhour unifies your financial data, then adds two AI agents that help you analyze spending, plan goals, and generate useful reports.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-strong"
            >
              Star on GitHub
            </Link>
            <Link
              href="/deploy"
              className="rounded-full border border-border bg-surface px-6 py-3 text-base font-semibold text-text transition hover:border-brand hover:text-brand"
            >
              Deployment guide
            </Link>
          </div>
        </div>
        <div className="grid gap-4 animate-rise-delayed">
          <MetricCard metric="24" label="AI tool calls available" />
          <MetricCard metric="9" label="PDF report sections" />
          <MetricCard metric="16" label="Database tables in current app" />
        </div>
      </div>
    </section>
  );
}

function MetricCard({ metric, label }: { metric: string; label: string }) {
  return (
    <article className="rounded-card border border-border bg-surface p-6 shadow-card">
      <p className="text-4xl font-extrabold text-brand">{metric}</p>
      <p className="mt-2 text-sm font-medium text-text-muted">{label}</p>
    </article>
  );
}

export function FeatureGridSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <h2 className="text-3xl font-bold text-text md:text-4xl">Everything needed to run personal finance ops in one place</h2>
      <p className="mt-3 max-w-3xl text-text-muted">
        The product combines account aggregation, historical analytics, AI planning workflows, and audit-friendly security controls.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_SUMMARIES.map((feature) => (
          <article
            key={feature.title}
            className="rounded-card border border-border bg-surface p-6 shadow-card transition duration-200 hover:-translate-y-0.5"
          >
            <h3 className="text-lg font-semibold text-text">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section className="border-y border-border bg-surface-alt">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h2 className="text-3xl font-bold text-text md:text-4xl">Security design with explicit boundaries</h2>
          <p className="mt-3 text-text-muted">
            The application enforces encrypted secrets, constrained agent data access, verified webhooks, and event auditing. The marketing deployment is fully isolated from runtime secrets.
          </p>
          <Link
            href="/security"
            className="mt-6 inline-block text-sm font-semibold text-brand transition hover:text-brand-strong"
          >
            Read security model
          </Link>
        </div>
        <ul className="space-y-3">
          {SECURITY_POINTS.map((point) => (
            <li key={point} className="rounded-xl border border-border bg-surface p-4 text-sm text-text-muted">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function DeploySection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <h2 className="text-3xl font-bold text-text md:text-4xl">Deploy with a clear split: product app and marketing site</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StepCard
          title="1. Publish app repo"
          body="Keep the dashboard app open source with secure defaults, setup docs, and environment templates."
        />
        <StepCard
          title="2. Deploy this site separately"
          body="Host marketing on a standalone project/deployment target. No runtime API keys or app sessions."
        />
        <StepCard
          title="3. Route visitors"
          body="Use CTA links from marketing to GitHub docs and installation instructions for self-hosters."
        />
      </div>
    </section>
  );
}

function StepCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-card border border-border bg-surface p-6 shadow-card">
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{body}</p>
    </article>
  );
}

export function CtaSection() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-text">Ship the marketing site now, keep the product secure and open.</h2>
          <p className="mt-2 text-text-muted">Use this site as the public front door for GitHub, docs, and deployment instructions.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
          >
            Open GitHub
          </Link>
          <Link
            href="/deploy"
            className="rounded-full border border-border bg-bg px-5 py-3 text-sm font-semibold text-text transition hover:border-brand hover:text-brand"
          >
            Deploy steps
          </Link>
        </div>
      </div>
    </section>
  );
}
