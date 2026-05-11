import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "お問い合わせ（プロ人材）",
  description:
    "プロ人材としてご活躍いただける方の登録ページ（準備中）。公開までお待ちください。",
};

export default function ProfessionalContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <PageHero
        eyebrow="Contact / Professional"
        title="プロ人材の方のお問い合わせ"
        description="プロ人材としてご活躍いただける方の登録フォームです。"
      />

      <ComingSoon message="プロ人材登録フォームは現在準備中です。公開までもうしばらくお待ちください。お急ぎの場合はお問い合わせフォームよりご連絡ください。">
        <Button href={localePath("/contact", locale)}>
          お問い合わせ
        </Button>
        <Button href={localePath("/", locale)} variant="secondary">
          トップへ戻る
        </Button>
      </ComingSoon>
    </>
  );
}
