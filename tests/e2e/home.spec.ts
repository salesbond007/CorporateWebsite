import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("redirects bare / to a locale-prefixed route", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(ja|en)\/?$/);
  });

  test("ja home renders hero, services, and CTA", async ({ page }) => {
    await page.goto("/ja");
    await expect(page).toHaveURL(/\/ja\/?$/);

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: "サービスを見る" })).toBeVisible();

    // Three service cards, each anchored to a section on /ja/services
    const cards = page.locator("ul li a[href*='/ja/services#']");
    await expect(cards).toHaveCount(3);
  });

  test("en home renders translated CTA labels", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(
      page.getByRole("link", { name: "Explore services" }),
    ).toBeVisible();
  });
});
