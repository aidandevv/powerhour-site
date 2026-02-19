import Link from "next/link";
import { GITHUB_URL } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>
          Powerhour is a self-hosted project. Not affiliated with Plaid. Deployer is responsible for API credentials and platform compliance.
        </p>
        <Link
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-text transition-colors hover:text-brand"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}
