import { test, expect } from "@playwright/test";

test.describe("Contact form (general)", () => {
  test("renders the required fields", async ({ page }) => {
    await page.goto("/ja/contact");
    await expect(page.getByLabel("会社名", { exact: false })).toBeVisible();
    await expect(page.getByLabel("お名前(姓)", { exact: false })).toBeVisible();
    await expect(page.getByLabel("お名前(名)", { exact: false })).toBeVisible();
    await expect(page.getByLabel("役職", { exact: false })).toBeVisible();
    await expect(
      page.getByLabel("メールアドレス", { exact: false }),
    ).toBeVisible();
    await expect(
      page.getByLabel("携帯電話番号", { exact: false }),
    ).toBeVisible();
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
    await expect(
      page.getByText("プロ人材サービスについて"),
    ).toBeVisible();
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

test.describe("Contact form (professional)", () => {
  test("renders professional-specific fields", async ({ page }) => {
    await page.goto("/ja/contact/professional");
    await expect(
      page.getByLabel("専門分野・職種", { exact: false }),
    ).toBeVisible();
    await expect(page.locator("select[name='workStyle']")).toBeVisible();
  });
});
