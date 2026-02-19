import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const themeScript = `
(function() {
  var stored = localStorage.getItem('powerhour-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
})();
`;

export const metadata: Metadata = {
  title: {
    default: "Powerhour | Self-hosted finance intelligence",
    template: "%s | Powerhour",
  },
  description:
    "Powerhour is a self-hosted personal finance dashboard with AI-powered insights, planning workflows, and secure architecture.",
  metadataBase: new URL("https://powerhour.example.com"),
  openGraph: {
    title: "Powerhour",
    description:
      "Self-hosted personal finance dashboard with AI-powered insights, budgeting workflows, and security-first architecture.",
    type: "website",
    url: "https://powerhour.example.com",
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
