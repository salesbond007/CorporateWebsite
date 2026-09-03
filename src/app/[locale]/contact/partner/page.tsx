import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "個人の方はこちら",
  description: "個人の方向けのお問い合わせページ（準備中）。公開までお待ちください。",
};

export default function PartnerContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <PageHero
        eyebrow="Contact / Individual"
        title="個人の方はこちら"
        description="個人の方向けのお問い合わせページです。"
      />

      <ComingSoon message="このページは現在準備中です。公開までもうしばらくお待ちください。お急ぎの場合はお問い合わせフォームよりご連絡ください。">
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
