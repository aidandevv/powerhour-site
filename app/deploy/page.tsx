import type { Metadata } from "next";
import Link from "next/link";
import { DEPLOY_STEPS, GITHUB_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Self-hosting guide",
  description:
    "Step-by-step guide to self-hosting Powerhour: clone the repo, run migrations, configure environment variables, and connect your bank accounts.",
};

export default function DeployPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-extrabold text-text md:text-5xl">Self-hosting guide</h1>
      <p className="mt-4 max-w-2xl text-lg text-text-muted">
        Powerhour runs on your own infrastructure. You own the database, the credentials, and the data. Follow these steps to get up and running.
      </p>

      {/* Prerequisites */}
      <div className="mt-10 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-xl font-bold text-text">Prerequisites</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-text-muted">
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> Docker Engine with Compose v2 (runs Postgres and, in production, the app itself)
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> Node.js 22 or later (source/dev workflow only — not required for the release image)
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> Plaid developer account
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-brand">→</span> A strong session secret (32+ chars)
          </li>
        </ul>
      </div>

      {/* Steps */}
      <div className="mt-10 space-y-6">
        {DEPLOY_STEPS.map((step) => (
          <article key={step.step} className="rounded-card border border-border bg-surface p-6 shadow-card">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {step.step}
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <h2 className="text-lg font-semibold text-text">{step.title}</h2>
                <p className="text-sm text-text-muted">{step.body}</p>
                {step.code && (
                  <pre className="overflow-x-auto rounded-xl border border-border bg-background p-4 text-sm text-text">
                    <code>{step.code}</code>
                  </pre>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Env vars reference */}
      <div className="mt-12 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-xl font-bold text-text">Environment variables</h2>
        <p className="mt-2 text-sm text-text-muted">
          Copy <code className="rounded bg-border px-1 py-0.5 text-xs">.env.example</code> to{" "}
          <code className="rounded bg-border px-1 py-0.5 text-xs">.env</code> and fill in the following:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-6 font-semibold text-text">Variable</th>
                <th className="pb-2 font-semibold text-text">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: "DATABASE_URL", desc: "PostgreSQL connection string" },
                { name: "PLAID_CLIENT_ID", desc: "From the Plaid dashboard" },
                { name: "PLAID_SECRET", desc: "Environment-specific Plaid secret" },
                { name: "PLAID_ENV", desc: "sandbox, development, or production" },
                { name: "SESSION_SECRET", desc: "32+ character random string for iron-session" },
                { name: "DEMO_MODE", desc: "Set to true to seed demo data on startup (optional)" },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="py-2 pr-6">
                    <code className="rounded bg-border px-1.5 py-0.5 text-xs text-text">{row.name}</code>
                  </td>
                  <td className="py-2 text-text-muted">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Production deployment */}
      <div className="mt-12 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-xl font-bold text-text">Production deployment</h2>
        <p className="mt-2 text-sm text-text-muted">
          The recommended production path uses a versioned, checksum-verified image from GHCR and never requires a
          source checkout or Node.js on the server.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-4 text-sm text-text">
          <code>{`export POWERHOUR_VERSION=v1.0.0
curl -fsSLO "https://github.com/aidandevv/powerhour/releases/download/\${POWERHOUR_VERSION}/docker-compose.yml"
curl -fsSLo .env.example "https://github.com/aidandevv/powerhour/releases/download/\${POWERHOUR_VERSION}/env.example"
curl -fsSLO "https://github.com/aidandevv/powerhour/releases/download/\${POWERHOUR_VERSION}/checksums.sha256"
sha256sum -c checksums.sha256

docker compose --profile tools run --rm migrate
docker compose up -d`}</code>
        </pre>
        <p className="mt-3 text-sm text-text-muted">
          The app binds to <code className="rounded bg-border px-1 py-0.5 text-xs">127.0.0.1:3000</code> by default —
          put Caddy, nginx, Traefik, or Cloudflare Tunnel in front for internet access. If you build from source
          instead, the bundled <code className="rounded bg-border px-1 py-0.5 text-xs">docker/docker-compose.yml</code>{" "}
          ships an opt-in nginx + Let&apos;s Encrypt profile (<code className="rounded bg-border px-1 py-0.5 text-xs">--profile tls</code>).
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Daily backups are a one-line cron job: <code className="rounded bg-border px-1 py-0.5 text-xs">docker compose exec -T db pg_dump</code>{" "}
          piped through gpg encryption. Restore with the same command in reverse.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
        >
          Clone on GitHub
        </Link>
        <Link
          href="/features"
          className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-text transition hover:border-brand hover:text-brand"
        >
          Explore features
        </Link>
      </div>
    </section>
  );
}
