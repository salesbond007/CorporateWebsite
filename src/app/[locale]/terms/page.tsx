import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "利用規約",
  description: "TODO: 利用規約のメタディスクリプション",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Service"
        title="利用規約"
        description="TODO: 利用規約のリード文。"
      />
      <LegalLayout>
        <p>TODO: 規約の前文・適用範囲。</p>

        <h2>第1条（総則）</h2>
        <p>TODO: 総則の条文。</p>

        <h2>第2条（定義）</h2>
        <p>TODO: 用語の定義。</p>

        <h2>第3条（サービスの提供）</h2>
        <p>TODO: サービスの提供条件。</p>

        <h2>第4条（禁止事項）</h2>
        <ul>
          <li>TODO: 禁止事項 1</li>
          <li>TODO: 禁止事項 2</li>
          <li>TODO: 禁止事項 3</li>
        </ul>

        <h2>第5条（免責事項）</h2>
        <p>TODO: 免責事項。</p>

        <h2>第6条（知的財産権）</h2>
        <p>TODO: 知的財産権の取り扱い。</p>

        <h2>第7条（規約の変更）</h2>
        <p>TODO: 規約変更の通知方針。</p>

        <h2>第8条（準拠法・裁判管轄）</h2>
        <p>TODO: 準拠法・管轄裁判所。</p>
      </LegalLayout>
    </>
  );
}
