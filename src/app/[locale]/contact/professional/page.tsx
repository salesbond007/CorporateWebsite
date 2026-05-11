import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "お問い合わせ（プロ人材）",
  description: "TODO: プロ人材向け問い合わせページのメタディスクリプション",
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
        description="TODO: プロ人材向け問い合わせのリード文。受付内容や対象者像を1〜2行で。"
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-xl2 border border-ink-line p-8">
                <h2 className="text-lg font-bold">こんな方へ</h2>
                <ul className="mt-5 space-y-3 text-sm text-ink-soft">
                  {["TODO: 募集対象 1", "TODO: 募集対象 2", "TODO: 募集対象 3"].map(
                    (label) => (
                      <li key={label} className="flex gap-3">
                        <span
                          className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{label}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="mt-6 rounded-xl2 bg-cream p-8">
                <h3 className="text-sm font-semibold text-ink-muted">
                  紹介営業パートナーとしての登録は
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  お持ちの人脈を活かして企業開拓にご協力いただける方は、専用フォームよりご登録ください。
                </p>
                <Link
                  href={localePath("/contact/partner", locale)}
                  className="mt-4 inline-flex link-arrow"
                >
                  紹介営業パートナー登録
                </Link>
              </div>

              <div className="mt-6 rounded-xl2 bg-cream p-8">
                <h3 className="text-sm font-semibold text-ink-muted">
                  企業様のお問い合わせは
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  サービスや協業、ご提案などについては、共通のお問い合わせフォームをご利用ください。
                </p>
                <Link
                  href={localePath("/contact", locale)}
                  className="mt-4 inline-flex link-arrow"
                >
                  お問い合わせ
                </Link>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <ContactForm type="professional" locale={locale} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
