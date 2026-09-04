import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = ["/", "/features", "/security", "/deploy", "/docs", "/walkthrough", "/faq"];

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("public marketing routes", () => {
  for (const route of publicRoutes) {
    test(`${route} renders a titled, navigable document`, async ({ page }) => {
      await page.goto(route);

      await expect(page).toHaveTitle(/Powerhour/i);
      await expect(page.locator("#main")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  for (const [legacyPath, canonicalPath, heading] of [
    ["/docs/walkthroughs", "/walkthrough", "Walkthrough"],
    ["/docs/faq", "/faq", "FAQ"],
  ]) {
    test(`${legacyPath} redirects to ${canonicalPath}`, async ({ page }) => {
      await page.goto(legacyPath);

      await expect(page).toHaveURL(new RegExp(`${canonicalPath}$`));
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    });
  }

  test("supports keyboard navigation to the main content", async ({ browserName, page }) => {
    await page.goto("/");

    const skipLink = page.getByRole("link", { name: "Skip to content" });
    if (browserName === "webkit") {
      // WebKit follows the host macOS Full Keyboard Access setting for tabbing through links.
      await skipLink.focus();
    } else {
      await page.keyboard.press("Tab");
    }
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });
});

test.describe("interactive product workspace", () => {
  test("completes the primary simulated product journeys", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Generate report" }).click();
    await expect(page.getByText(/nine-section financial report is ready to preview/i)).toBeVisible();

    await page.getByRole("button", { name: "90-day projected $6,840" }).click();
    await page.getByRole("button", { name: "Recurring items" }).click();
    await expect(page.getByText(/Every 6 months · next Aug 11/)).toBeVisible();

    await page.getByRole("button", { name: "Deactivate Streambox" }).click();
    await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();

    await page.getByRole("button", { name: "Plan a week in Japan" }).click();
    await page.getByRole("button", { name: "Build plan" }).click();
    await expect(page.getByRole("heading", { name: "Japan trip · 7 days" })).toBeVisible();
    await page.getByRole("button", { name: "Save as a target" }).click();
    await expect(page.getByRole("button", { name: "Saved to targets" })).toBeVisible();
  });

  test("keeps the homepage usable on a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByRole("banner").getByRole("link", { name: "Features" })).toBeVisible();
    await expect(page.locator("html")).toHaveJSProperty("clientWidth", 390);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});

test("@a11y critical marketing pages have no automatically detectable violations", async ({ browserName, page }) => {
  test.skip(browserName !== "chromium", "Run the shared accessibility scan once in Chromium.");

  for (const route of ["/", "/docs", "/security", "/deploy"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations, `${route} accessibility violations`).toEqual([]);
  }
});
