import Link from "next/link";
import { APP_SITE_URL, DOCS_SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <p className="font-display text-base font-bold tracking-tight text-text">{SITE_NAME}</p>
            <p className="text-sm text-text-muted">{SITE_TAGLINE}</p>
            <p className="text-xs text-text-muted">
              Not affiliated with Plaid, Inc. Deployer is responsible for API credentials, data handling, and platform compliance.
            </p>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Product</p>
            <nav className="flex flex-col gap-2">
              <Link href={`${APP_SITE_URL}/features`} className="text-sm text-text-muted transition-colors hover:text-text">Features</Link>
              <Link href={`${APP_SITE_URL}/security`} className="text-sm text-text-muted transition-colors hover:text-text">Security</Link>
              <Link href={`${DOCS_SITE_URL}/docs`} className="text-sm text-text-muted transition-colors hover:text-text">Documentation</Link>
              <Link href={`${APP_SITE_URL}/deploy`} className="text-sm text-text-muted transition-colors hover:text-text">Self-hosting</Link>
            </nav>
          </div>

          {/* Col 3: Platform */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Platform</p>
            <nav className="flex flex-col gap-2">
              <Link
                href={APP_SITE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                powerhour.dev
              </Link>
              <p className="text-sm text-text-muted">ISC License</p>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-text-muted">
          <p>© {currentYear} Powerhour. ISC License.</p>
        </div>
      </div>
    </footer>
  );
}
