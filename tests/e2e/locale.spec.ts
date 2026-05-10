import { test, expect } from "@playwright/test";

test.describe("Locale switcher", () => {
  test("switches from ja to en and persists via cookie", async ({
    page,
    context,
  }) => {
    await page.goto("/ja");

    // Switcher button
    await page
      .getByRole("group", { name: "言語切り替え" })
      .first()
      .getByRole("button", { name: "English" })
      .click();

    await expect(page).toHaveURL(/\/en\/?$/);

    const cookies = await context.cookies();
    const localeCookie = cookies.find((c) => c.name === "NEXT_LOCALE");
    expect(localeCookie?.value).toBe("en");

    // Subsequent bare navigation respects the cookie
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/?$/);
  });
});

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
