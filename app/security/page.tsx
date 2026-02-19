import type { Metadata } from "next";
import { SECURITY_POINTS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Review Powerhour security controls including encryption, database-layer boundaries, rate limits, webhook verification, and audit logging.",
};

export default function SecurityPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-extrabold text-text md:text-5xl">Security model</h1>
      <p className="mt-4 max-w-3xl text-lg text-text-muted">
        Security controls are designed into the data flow, agent access, and API surface. The marketing deployment is intentionally separate from authenticated runtime concerns.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {SECURITY_POINTS.map((point) => (
          <article
            key={point}
            className="rounded-card border border-border bg-surface p-5 shadow-card"
          >
            <p className="text-sm text-text-muted">{point}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-card border border-border bg-surface-alt p-6">
        <h2 className="text-2xl font-bold text-text">Deployment boundary rules</h2>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          <li>No authenticated app routes exposed from the marketing deployment.</li>
          <li>No private environment variables shared between marketing and app runtime.</li>
          <li>No dashboard data proxying through public marketing pages.</li>
          <li>Licensed font assets are excluded unless redistribution rights are verified.</li>
        </ul>
      </div>
    </section>
  );
}
