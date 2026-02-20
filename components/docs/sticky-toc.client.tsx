"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

export function StickyToc({
  title = "On this page",
  items,
}: {
  title?: string;
  items: TocItem[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const onScroll = () => {
      const offset = window.scrollY + 160;
      let current = items[0].id;

      for (const item of items) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        if (section.offsetTop <= offset) current = item.id;
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label={title} className="rounded border border-border bg-surface p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded px-2 py-1.5 text-sm transition-colors ${
                  isActive ? "bg-brand/10 font-semibold text-brand" : "text-text-muted hover:text-text"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
