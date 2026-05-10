import { test, expect } from "@playwright/test";

test("home page has Organization JSON-LD", async ({ page }) => {
  await page.goto("/ja");
  const scripts = page.locator('script[type="application/ld+json"]');
  await expect(scripts.first()).toBeAttached();
  const text = (await scripts.first().textContent()) ?? "";
  expect(text).toContain("Organization");
  expect(text).toContain("WebSite");
});

test("sitemap.xml is reachable", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain("<urlset");
  expect(body).toMatch(/\/(ja|en)/);
});

test("robots.txt is reachable", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body.toLowerCase()).toContain("user-agent");
  expect(body.toLowerCase()).toContain("sitemap:");
});

test("home page emits canonical and hreflang alternates", async ({ page }) => {
  await page.goto("/ja");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/ja$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en/);
});
