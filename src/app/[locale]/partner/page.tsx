import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "パートナー募集",
  description: "セールスボンド株式会社のパートナー(協業・業務提携)募集。",
};

export default function PartnerPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "トップ", url: localePath("/", locale) },
          { name: "パートナー募集", url: localePath("/partner", locale) },
        ])}
      />

      <section className="relative overflow-hidden border-b-2 border-ink-line bg-ink">
        <Image
          src="/services/cards/talent.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/45 mix-blend-multiply" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,5,11,0.85)_0%,rgba(29,5,11,0.55)_45%,rgba(29,5,11,0.15)_75%,rgba(29,5,11,0)_95%)]"
          aria-hidden="true"
        />
        <Container className="relative py-20 md:py-28">
          <p className="section-label !text-brand-200 animate-fade-up">Business Partner</p>
          <h1
            className="mt-3 text-display-2 font-black text-white animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            パートナー募集
          </h1>
        </Container>
      </section>

      <ComingSoon message="パートナー募集の公開に向け、現在準備を進めています。ご興味をお持ちの方は、お問い合わせフォームよりお気軽にご連絡ください。">
        <Button href={localePath("/contact", locale)} size="lg">
          問い合わせ
        </Button>
      </ComingSoon>
    </>
  );
}
