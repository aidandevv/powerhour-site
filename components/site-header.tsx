"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { APP_SITE_URL, GITHUB_URL, PRIMARY_NAV, SITE_NAME } from "@/lib/site-config";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a
          href={APP_SITE_URL}
          className="font-display text-base font-bold tracking-tight text-text transition-colors hover:text-brand"
        >
          {SITE_NAME}
        </a>

        <nav className="hidden items-center gap-7 md:flex">
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
            className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-strong hover:shadow-sm"
          >
            GitHub
          </Link>
        </nav>
      </div>

      {/* Mobile nav */}
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-6 pb-3 md:hidden">
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text whitespace-nowrap"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
        >
          GitHub
        </Link>
      </nav>
    </header>
  );
}
