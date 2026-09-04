import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { middleware } from "@/middleware";

describe("docs domain routing", () => {
  it("redirects non-documentation routes on the docs host", () => {
    const response = middleware(new NextRequest("https://docs.powerhour.dev/security?from=footer"));

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe("https://docs.powerhour.dev/docs?from=footer");
  });

  it.each(["/docs", "/walkthrough", "/faq", "/_next/static/chunk.js", "/favicon.ico", "/api/health"]) (
    "keeps allowed docs-host path %s on the current response",
    (pathname) => {
      const response = middleware(new NextRequest(`https://docs.powerhour.dev${pathname}`));

      expect(response.headers.get("x-middleware-next")).toBe("1");
    },
  );

  it("does not redirect the marketing host", () => {
    const response = middleware(new NextRequest("https://powerhour.dev/security"));

    expect(response.headers.get("x-middleware-next")).toBe("1");
  });
});

describe("discovery metadata", () => {
  it("publishes all docs routes in the sitemap", () => {
    expect(sitemap()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: "https://docs.powerhour.dev/docs", priority: 1 }),
        expect.objectContaining({ url: "https://docs.powerhour.dev/walkthrough", priority: 0.9 }),
        expect.objectContaining({ url: "https://docs.powerhour.dev/faq", priority: 0.9 }),
      ]),
    );
  });

  it("points crawlers to the canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://docs.powerhour.dev/sitemap.xml",
    });
  });
});
