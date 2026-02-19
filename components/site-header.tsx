import Link from "next/link";
import { GITHUB_URL, PRIMARY_NAV, SITE_NAME } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-text">
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong"
          >
            View on GitHub
          </Link>
        </nav>
      </div>
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-3 overflow-x-auto px-6 pb-4 md:hidden">
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-text"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white"
        >
          GitHub
        </Link>
      </nav>
    </header>
  );
}
