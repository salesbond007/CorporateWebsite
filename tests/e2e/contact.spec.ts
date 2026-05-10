import { test, expect } from "@playwright/test";

test.describe("Contact form (business)", () => {
  test("blocks submission with invalid data via HTML validation", async ({ page }) => {
    await page.goto("/ja/contact/business");
    await page.getByRole("button", { name: "送信する" }).click();
    // Browser-side `required` should surface the first invalid field
    const company = page.getByLabel("会社名", { exact: false });
    await expect(company).toBeFocused();
  });

  test("submits successfully (server is dry-run if RESEND_API_KEY is unset)", async ({
    page,
  }) => {
    await page.goto("/ja/contact/business");

    await page.getByLabel("会社名", { exact: false }).fill("テスト株式会社");
    await page.getByLabel("お名前", { exact: false }).fill("山田 太郎");
    await page.getByLabel("メールアドレス", { exact: false }).fill("test@example.com");
    await page.locator("select[name='inquiryType']").selectOption("service");
    await page
      .getByLabel("お問い合わせ内容", { exact: false })
      .fill("これはE2Eテストからの送信です。確認用のメッセージ。");
    await page.locator("input[name='agreement']").check();

    await page.getByRole("button", { name: "送信する" }).click();
    await expect(
      page.getByRole("heading", { name: "送信が完了しました" }),
    ).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Contact form (professional)", () => {
  test("renders professional-specific fields", async ({ page }) => {
    await page.goto("/ja/contact/professional");
    await expect(page.getByLabel("専門分野・職種", { exact: false })).toBeVisible();
    await expect(page.locator("select[name='workStyle']")).toBeVisible();
  });
});
