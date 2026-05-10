import { test, expect } from "@playwright/test";

test.describe("html lang attribute", () => {
  test("ja sets lang=ja", async ({ page }) => {
    await page.goto("/ja");
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  });

  test("en sets lang=en", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});
