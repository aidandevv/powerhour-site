"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_SITE_URL } from "@/lib/site-config";

const LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/walkthrough", label: "Walkthrough" },
  { href: "/faq", label: "FAQ" },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs pages" className="flex flex-wrap gap-2">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={`${DOCS_SITE_URL}${link.href}`}
            className={`rounded border px-3 py-1.5 text-sm font-semibold transition-colors ${
              active
                ? "border-brand/40 bg-brand/10 text-brand"
                : "border-border text-text-muted hover:text-text"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
