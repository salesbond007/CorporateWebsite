import { test, expect } from "@playwright/test";

test.describe("Contact form (general)", () => {
  test("renders the required fields", async ({ page }) => {
    await page.goto("/ja/contact");
    await expect(page.getByLabel("会社名", { exact: false })).toBeVisible();
    await expect(page.getByLabel("姓", { exact: true })).toBeVisible();
    await expect(page.getByLabel("名", { exact: true })).toBeVisible();
    await expect(
      page.getByLabel("メールアドレス", { exact: false }),
    ).toBeVisible();
    await expect(page.getByLabel("電話番号", { exact: false })).toBeVisible();
    await expect(page.getByLabel("部署", { exact: false })).toBeVisible();
    await expect(page.getByLabel("役職", { exact: false })).toBeVisible();
    await expect(page.getByLabel("従業員数", { exact: false })).toBeVisible();
  });

  test("rejects free email addresses", async ({ page }) => {
    await page.goto("/ja/contact");

    await page.getByLabel("会社名", { exact: false }).fill("テスト株式会社");
    await page.getByLabel("姓", { exact: true }).fill("山田");
    await page.getByLabel("名", { exact: true }).fill("太郎");
    await page
      .getByLabel("メールアドレス", { exact: false })
      .fill("test@gmail.com");
    await page.getByLabel("電話番号", { exact: false }).fill("090-1234-5678");
    await page.locator("select[name='position']").selectOption("manager");
    await page.locator("select[name='employeeCount']").selectOption("31-200");
    await page.locator("input[name='inquiryType'][value='other']").check();
    await page.locator("input[name='agreement']").check();

    await page.getByRole("button", { name: "送信する" }).click();

    await expect(page.getByText(/フリーメール.*ご利用いただけません/)).toBeVisible();
  });

  test("reveals service sub-options when サービスについて is selected", async ({
    page,
  }) => {
    await page.goto("/ja/contact");

    const serviceRadio = page.locator("input[name='inquiryType'][value='service']");
    await serviceRadio.check();

    await expect(
      page.getByText("セールスボンド（紹介営業サービス）について"),
    ).toBeVisible();
    await expect(
      page.getByText("リードボンド（営業代行サービス）について"),
    ).toBeVisible();
    await expect(page.getByText("プロ人材サービスについて")).toBeVisible();
  });

  test("hides service sub-options when 協業について is selected", async ({
    page,
  }) => {
    await page.goto("/ja/contact");

    await page.locator("input[name='inquiryType'][value='service']").check();
    await expect(
      page.getByText("セールスボンド（紹介営業サービス）について"),
    ).toBeVisible();

    await page.locator("input[name='inquiryType'][value='partnership']").check();
    await expect(
      page.getByText("セールスボンド（紹介営業サービス）について"),
    ).toHaveCount(0);
  });
});

test.describe("Coming-soon pages", () => {
  test("/contact/professional shows Coming Soon", async ({ page }) => {
    await page.goto("/ja/contact/professional");
    await expect(page.getByText("Coming Soon")).toBeVisible();
  });
});

test.describe("Removed pages", () => {
  test("/contact/partner no longer exists", async ({ page }) => {
    const res = await page.goto("/ja/contact/partner");
    expect(res?.status()).toBe(404);
  });

  test("/services/sales-bond no longer exists", async ({ page }) => {
    const res = await page.goto("/ja/services/sales-bond");
    expect(res?.status()).toBe(404);
  });
});
