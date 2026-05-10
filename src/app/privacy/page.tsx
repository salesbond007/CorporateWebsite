import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "TODO: プライバシーポリシーのメタディスクリプション",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="プライバシーポリシー"
        description="TODO: 個人情報保護方針のリード文。"
      />
      <LegalLayout>
        <p>
          TODO: 制定日・改訂日などの導入文。
        </p>

        <h2>1. 個人情報の定義</h2>
        <p>TODO: 個人情報の定義。</p>

        <h2>2. 個人情報の取得</h2>
        <p>TODO: 取得方法・利用目的。</p>

        <h2>3. 個人情報の利用目的</h2>
        <ul>
          <li>TODO: 利用目的 1</li>
          <li>TODO: 利用目的 2</li>
          <li>TODO: 利用目的 3</li>
        </ul>

        <h2>4. 第三者への提供</h2>
        <p>TODO: 第三者提供の方針。</p>

        <h2>5. 個人情報の管理</h2>
        <p>TODO: セキュリティ・管理体制について。</p>

        <h2>6. 開示・訂正・削除</h2>
        <p>TODO: ご本人からの請求への対応について。</p>

        <h2>7. お問い合わせ窓口</h2>
        <p>TODO: 連絡先・受付時間など。</p>

        <h2>8. 改定</h2>
        <p>TODO: 規約改定の通知方針。</p>
      </LegalLayout>
    </>
  );
}
