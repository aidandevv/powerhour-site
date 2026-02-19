import Link from "next/link";
import {
  CTA_HEADLINE,
  CTA_SUBTEXT,
  DEPLOY_STEPS,
  FEATURE_SUMMARIES,
  GITHUB_URL,
  HERO_BADGE,
  OPEN_SOURCE_POINTS,
  SECURITY_POINTS,
  SITE_TAGLINE,
  TECH_STACK,
} from "@/lib/site-config";
import { HeroShaderGradient } from "@/components/hero-shader-gradient";

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICON_PATHS: Record<string, string> = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  chat: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
  plan: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
  report: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  subscription: "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
  goal: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z",
};

function FeatureIcon({ name }: { name: string }) {
  const d = ICON_PATHS[name] ?? ICON_PATHS.dashboard;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function ShieldCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" className="mt-0.5 shrink-0 text-success">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true" className="mt-0.5 shrink-0">
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
    </svg>
  );
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06z" />
    </svg>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      <HeroShaderGradient />

      {/* Bottom fade only — glass card handles text legibility, so the gradient stays visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background/50"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-6 py-24 md:grid-cols-[1.25fr_1fr] md:gap-12 md:py-32">
        {/* Left: frosted glass content card */}
        <div className="animate-rise rounded-2xl border border-border/40 bg-surface/75 p-8 shadow-card backdrop-blur-md space-y-6 md:p-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-brand" />
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-brand">
              {HERO_BADGE}
            </span>
          </div>

          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-text md:text-5xl lg:text-[3.25rem]">
            {SITE_TAGLINE}
          </h1>

          <p className="text-base leading-relaxed text-text-muted md:text-lg">
            Powerhour connects to your banks via Plaid, syncs transactions daily, and gives you two AI agents — Ticker for Q&amp;A and a Budget Planner for goal-setting. All on your own infrastructure.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-strong hover:shadow-md"
            >
              <GitHubIcon size={15} />
              Star on GitHub
            </Link>
            <Link
              href="/deploy"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-6 py-3 text-sm font-semibold text-text backdrop-blur-sm transition-all hover:border-brand hover:text-brand"
            >
              Self-hosting guide
              <ArrowRight />
            </Link>
          </div>
        </div>

        {/* Right: metric cards */}
        <div className="grid gap-3 animate-rise-delayed">
          {[
            { n: "24", label: "AI tools across two agents" },
            { n: "9",  label: "PDF report sections" },
            { n: "16", label: "Database tables" },
          ].map(({ n, label }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/80 p-6 shadow-card backdrop-blur-sm transition-all duration-200 hover:shadow-card-hover"
            >
              <div className="absolute inset-y-0 left-0 w-[3px] bg-brand/25 transition-all duration-200 group-hover:bg-brand/70" />
              <p className="font-display text-5xl font-extrabold text-brand">{n}</p>
              <p className="mt-1.5 text-sm font-medium text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Strip ───────────────────────────────────────────────────────────────

export function TechStackStrip() {
  return (
    <div className="bg-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-stretch px-6 divide-x divide-background/10">
        <div className="flex items-center py-5 pr-8">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-background/40">
            Built with
          </span>
        </div>
        {TECH_STACK.map((item) => (
          <div key={item.label} className="flex flex-col justify-center px-7 py-5">
            <span className="text-sm font-semibold text-background/90">{item.label}</span>
            <span className="text-xs text-background/45">{item.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

export function FeatureGridSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-12">
        <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-brand">
          Features
        </span>
        <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-text md:text-5xl">
          Two AI agents. One self-hosted stack.<br className="hidden md:block" /> Full financial visibility.
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          Account aggregation, historical analytics, AI planning workflows, and audit-friendly security controls in a single codebase you own.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_SUMMARIES.map((feature) => (
          <article
            key={feature.title}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-brand/25 transition-colors duration-200 group-hover:bg-brand/60" />

            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/10">
              <FeatureIcon name={feature.icon} />
            </div>
            <h3 className="font-display text-lg font-bold text-text">{feature.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Security ─────────────────────────────────────────────────────────────────

export function SecuritySection() {
  return (
    <section className="border-y border-border bg-surface-alt">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:py-28">
        <div className="flex flex-col justify-center space-y-5">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-success">
            Security
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-text md:text-4xl">
            Security built into<br />the data layer,<br />not bolted on.
          </h2>
          <p className="text-text-muted">
            Encrypted secrets, constrained agent data access, verified webhooks, and event auditing at the infrastructure level.
          </p>
          <Link
            href="/security"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-strong"
          >
            Read security model
            <ArrowRight />
          </Link>
        </div>

        <ul className="space-y-2.5">
          {SECURITY_POINTS.map((point) => (
            <li
              key={point.label}
              className="flex items-start gap-3.5 rounded-xl border border-border bg-surface p-4 transition-all hover:border-success/30"
            >
              <ShieldCheck />
              <div>
                <p className="text-sm font-semibold text-text">{point.label}</p>
                <p className="mt-0.5 text-sm text-text-muted">{point.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Open Source ──────────────────────────────────────────────────────────────

export function OpenSourceSection() {
  return (
    <section className="relative overflow-hidden bg-brand">
      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(hsl(0 0% 100% / 0.04) 1px, transparent 1px)",
            "linear-gradient(90deg, hsl(0 0% 100% / 0.04) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="space-y-6">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-white/50">
            Open source
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
            MIT licensed.<br />No SaaS dependency.<br />No black box.
          </h2>
          <ul className="space-y-3.5">
            {OPEN_SOURCE_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-white/85">
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
          >
            <GitHubIcon />
            View on GitHub
          </Link>
        </div>

        <div className="flex items-center">
          <pre className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-7 font-mono text-sm leading-6 text-white/80 backdrop-blur-sm">
            <code>{`git clone https://github.com/your-username/powerhour
cp .env.example .env

# Configure your credentials:
# DATABASE_URL=postgres://...
# PLAID_CLIENT_ID=...
# PLAID_SECRET=...
# SESSION_SECRET=...

npm run db:migrate
npm run dev`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

// ─── Deploy (home preview) ────────────────────────────────────────────────────

export function DeploySection() {
  const steps = DEPLOY_STEPS.slice(0, 3);
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-12">
        <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-brand">
          Self-hosting
        </span>
        <h2 className="mt-3 font-display text-4xl font-extrabold text-text md:text-5xl">
          Self-host in four steps
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <StepCard key={step.step} step={step.step} title={step.title} body={step.body} />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/deploy"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-strong"
        >
          View full guide
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

function StepCard({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card">
      <span className="pointer-events-none absolute -right-1 -top-5 font-display text-[7.5rem] font-extrabold leading-none text-border select-none">
        {step}
      </span>
      <h3 className="relative font-display text-lg font-bold text-text">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-text-muted">{body}</p>
    </article>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

export function CtaSection() {
  return (
    <section className="border-t border-border bg-surface-alt">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h2 className="font-display text-4xl font-extrabold text-text md:text-5xl">
            {CTA_HEADLINE}
          </h2>
          <p className="mx-auto max-w-xl text-lg text-text-muted">{CTA_SUBTEXT}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-strong hover:shadow-md"
          >
            <GitHubIcon />
            Star on GitHub
          </Link>
          <Link
            href="/deploy"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text transition-all hover:border-brand hover:text-brand"
          >
            Self-hosting guide
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
