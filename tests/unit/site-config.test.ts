import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.resetModules();
});

describe("site configuration", () => {
  it("normalizes public URLs and preserves the configured route domains", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "docs-preview.example.com///");
    vi.stubEnv("NEXT_PUBLIC_DOCS_SITE_URL", "https://guide-preview.example.com///");
    vi.stubEnv("NEXT_PUBLIC_APP_SITE_URL", "app-preview.example.com///");
    vi.stubEnv("NEXT_PUBLIC_GITHUB_URL", "https://github.com/example/powerhour-preview");

    const config = await import("@/lib/site-config");

    expect(config.SITE_URL).toBe("https://docs-preview.example.com");
    expect(config.DOCS_SITE_URL).toBe("https://guide-preview.example.com");
    expect(config.APP_SITE_URL).toBe("https://app-preview.example.com");
    expect(config.GITHUB_URL).toBe("https://github.com/example/powerhour-preview");
    expect(config.PRIMARY_NAV).toEqual([
      { label: "Features", href: "https://app-preview.example.com/features" },
      { label: "Security", href: "https://app-preview.example.com/security" },
      { label: "Docs", href: "https://guide-preview.example.com/docs" },
      { label: "Self-hosting", href: "https://app-preview.example.com/deploy" },
    ]);
  });

  it("uses the public production defaults when no overrides are supplied", async () => {
    const config = await import("@/lib/site-config");

    expect(config.SITE_URL).toBe("https://docs.powerhour.dev");
    expect(config.DOCS_SITE_URL).toBe("https://docs.powerhour.dev");
    expect(config.APP_SITE_URL).toBe("https://powerhour.dev");
    expect(config.GITHUB_URL).toBe("https://github.com/aidandevv/powerhour");
  });
});
