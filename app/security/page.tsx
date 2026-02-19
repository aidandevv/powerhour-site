import type { Metadata } from "next";
import { SECURITY_POINTS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Powerhour's five security controls: AES-256-GCM token encryption, database-layer agent boundaries, layered rate limiting, webhook signature verification, and audit logging.",
};

function PageShieldCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-success"
    >
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

export default function SecurityPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-extrabold text-text md:text-5xl">Security model</h1>
      <p className="mt-4 max-w-3xl text-lg text-text-muted">
        Security controls are designed into the data flow, agent access, and API surface — not added as an afterthought.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {SECURITY_POINTS.map((point) => (
          <article
            key={point.label}
            className="flex items-start gap-3 rounded-card border border-border bg-surface p-5 shadow-card"
          >
            <PageShieldCheck />
            <div>
              <p className="text-sm font-semibold text-text">{point.label}</p>
              <p className="mt-1 text-sm text-text-muted">{point.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-2xl font-bold text-text">Deployer responsibilities</h2>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          <li>Serve the application over HTTPS with a valid TLS certificate.</li>
          <li>Rotate <code className="rounded bg-border px-1 py-0.5 text-xs">SESSION_SECRET</code> and Plaid credentials periodically.</li>
          <li>Keep Node.js and npm dependencies up to date with security patches.</li>
          <li>Restrict database network access to the application host only.</li>
        </ul>
      </div>
    </section>
  );
}
