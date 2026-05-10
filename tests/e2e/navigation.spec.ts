import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/ja/about", title: /私たちについて/ },
  { path: "/ja/services", title: /サービス/ },
  { path: "/ja/services/service-01", title: /サービス名 01/ },
  { path: "/ja/company", title: /会社概要/ },
  { path: "/ja/contact", title: /お問い合わせ/ },
  { path: "/ja/contact/professional", title: /プロ人材の方のお問い合わせ/ },
  { path: "/ja/blog", title: /記事|お知らせ/ },
  { path: "/ja/privacy", title: /プライバシーポリシー/ },
  { path: "/ja/terms", title: /利用規約/ },
];

for (const p of PAGES) {
  test(`renders ${p.path}`, async ({ page }) => {
    const res = await page.goto(p.path);
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toContainText(p.title);
  });
}

test("404 page on unknown route", async ({ page }) => {
  const res = await page.goto("/ja/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.locator("body")).toContainText(/Page not found|ページが見つかりません/);
});

test("invalid locale falls through middleware (redirected)", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveURL(/\/(ja|en)\/about\/?$/);
});
