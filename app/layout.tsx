import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: "Powerhour | Self-hosted finance intelligence",
    template: "%s | Powerhour",
  },
  description:
    "Powerhour is a self-hosted personal finance dashboard with AI-powered insights, planning workflows, and secure architecture.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Powerhour",
    description:
      "Self-hosted personal finance dashboard with AI-powered insights, budgeting workflows, and security-first architecture.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Powerhour",
    description:
      "Self-hosted personal finance dashboard with AI-powered insights and planning.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
