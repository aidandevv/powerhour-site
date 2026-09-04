import { expect, test, type Page } from "@playwright/test";

async function waitForStablePage(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("visual regression baselines", () => {
  test("homepage at desktop", async ({ page }) => {
    await page.goto("/");
    await waitForStablePage(page);

    await expect(page).toHaveScreenshot("homepage-desktop.png", {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
    });
  });

  test("homepage at mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await waitForStablePage(page);

    await expect(page).toHaveScreenshot("homepage-mobile.png", {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
    });
  });

  for (const route of ["features", "security", "deploy", "docs", "walkthrough", "faq"]) {
    test(`${route} page`, async ({ page }) => {
      await page.goto(`/${route}`);
      await waitForStablePage(page);

      await expect(page).toHaveScreenshot(`${route}.png`, {
        fullPage: true,
        animations: "disabled",
        caret: "hide",
      });
    });
  }

  test("homepage after an interactive planner journey", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Plan a week in Japan" }).click();
    await page.getByRole("button", { name: "Build plan" }).click();
    await page.getByRole("button", { name: "Save as a target" }).click();
    await waitForStablePage(page);

    await expect(page).toHaveScreenshot("homepage-planner-ready.png", {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
    });
  });
});
