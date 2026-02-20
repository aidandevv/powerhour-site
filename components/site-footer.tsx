import Link from "next/link";
import { GITHUB_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

export function SiteFooter() {
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
              <Link href="/features" className="text-sm text-text-muted transition-colors hover:text-text">Features</Link>
              <Link href="/security" className="text-sm text-text-muted transition-colors hover:text-text">Security</Link>
              <Link href="/deploy" className="text-sm text-text-muted transition-colors hover:text-text">Self-hosting</Link>
            </nav>
          </div>

          {/* Col 3: Open Source */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Open Source</p>
            <nav className="flex flex-col gap-2">
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                GitHub repository
              </Link>
              <p className="text-sm text-text-muted">MIT License</p>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-text-muted">
          <p>© 2025 Powerhour. MIT License.</p>
        </div>
      </div>
    </footer>
  );
}
