import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB_URL, SECURITY_POINTS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Powerhour's five security controls: AES-256-GCM token encryption, database-layer agent boundaries, layered rate limiting, webhook signature verification, and audit logging.",
};

// ─── Code snippets (short, focused extracts) ─────────────────────────────────

const CODE_SNIPPETS: Record<string, string> = {
  "AES-256-GCM token encryption": `const ALGORITHM = "aes-256-gcm";
const IV_LENGTH  = 12;  // GCM recommended
const TAG_LENGTH = 16;  // integrity tag

const iv     = randomBytes(IV_LENGTH);
const cipher = createCipheriv(ALGORITHM, key, iv);
const authTag = cipher.getAuthTag();

// stored as iv:ciphertext:authTag`,
  "Database-layer agent boundaries": `CREATE VIEW agent_accounts_view AS
SELECT
  id, name, type, subtype,
  current_balance, available_balance,
  credit_limit, is_active
FROM accounts
WHERE is_active = true;

-- plaid_access_token: EXCLUDED
-- sync_cursor:        EXCLUDED`,
  "Layered rate limiting": `login:    5 req  / 15 min
sync:     3 req  / 15 min
chat:    20 msg  /  1 min
planner:  3 runs /  1 hr
reports:  5 req  /  1 min`,
  "Webhook signature verification": `const signedJwt = headers["plaid-verification"];

// 1. verify JWT signature (SHA256 + ECDSA)
crypto.verify("SHA256", data, publicKey, sig);

// 2. verify body integrity
const hash = crypto.createHash("sha256")
  .update(body).digest("base64url");
return payload.request_body_sha256 === hash;`,
  "Audit log for security events": `type AuditAction =
  | "login"
  | "password_change"
  | "institution_link"
  | "institution_delete"
  | "report_download";

// failures never block the primary action
await db.insert(auditLog)
  .values({ action, ip, metadata });`,
};

// ─── Icons ───────────────────────────────────────────────────────────────────

function ShieldCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" className="shrink-0 text-success">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true" className="mt-[3px] shrink-0 text-warning">
      <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
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

function SecurityHero() {
  return (
    <section className="relative overflow-hidden bg-foreground">
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

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <span className="animate-rise text-xs font-sans font-semibold uppercase tracking-[0.18em] text-success">
          Security
        </span>
        <h1 className="animate-rise-100 mt-5 font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-[3.5rem]">
          Security built into the<br className="hidden md:block" />
          data layer, not bolted on.
        </h1>
        <p className="animate-rise-200 mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
          Security controls are designed into the data flow, agent access, and
          API surface — not added as an afterthought.
        </p>
      </div>
    </section>
  );
}

// ─── Security Layers (alternating zigzag) ────────────────────────────────────

function SecurityLayers() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-20">
        <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-brand">
          Controls
        </span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-text md:text-4xl">
          Five security layers
        </h2>
      </div>

      <div className="space-y-20 md:space-y-28">
        {SECURITY_POINTS.map((point, i) => {
          const code = CODE_SNIPPETS[point.label];
          const even = i % 2 === 0;

          return (
            <div
              key={point.label}
              className="animate-rise grid items-start gap-10 md:grid-cols-2 md:gap-16"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Prose side */}
              <div className={`flex flex-col justify-center space-y-4 ${even ? "" : "md:order-2"}`}>
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-extrabold text-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 ring-1 ring-success/10">
                    <ShieldCheck />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-text md:text-2xl">
                  {point.label}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-text-muted">
                  {point.detail}
                </p>
              </div>

              {/* Code side */}
              <div className={even ? "md:order-2" : ""}>
                <pre className="overflow-x-auto rounded-2xl border border-border/60 bg-foreground p-6 font-mono text-[13px] leading-relaxed text-white/60 shadow-card">
                  <code>{code}</code>
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Deployer Responsibilities ───────────────────────────────────────────────

function DeployerSection() {
  const items = [
    "Serve the application over HTTPS with a valid TLS certificate.",
    <>Rotate <code className="rounded bg-border/80 px-1.5 py-0.5 text-xs font-medium text-text">SESSION_SECRET</code> and Plaid credentials periodically.</>,
    "Keep Node.js and npm dependencies up to date with security patches.",
    "Restrict database network access to the application host only.",
  ];

  return (
    <section className="border-y border-border bg-surface-alt">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-warning">
            Your responsibility
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-text md:text-4xl">
            Deployer checklist
          </h2>
          <p className="mt-4 text-text-muted">
            Powerhour handles application-level security. These infrastructure
            concerns are on you.
          </p>

          <ul className="mt-10 space-y-5">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed text-text-muted"
              >
                <ChevronIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Closing CTA ─────────────────────────────────────────────────────────────

function SecurityCta() {
  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-extrabold text-text md:text-4xl">
            Your data never leaves<br className="hidden md:block" />
            your infrastructure.
          </h2>
          <p className="mx-auto max-w-lg text-text-muted">
            Every security control is open source. Read the implementation,
            audit the code, verify the claims.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-strong hover:shadow-md"
          >
            <GitHubIcon />
            Read the source
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <SecurityLayers />
      <DeployerSection />
      <SecurityCta />
    </>
  );
}
