import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PartnerContactForm } from "@/components/contact/PartnerContactForm";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "紹介営業パートナー 登録申請",
  description:
    "紹介営業パートナーの登録申請フォーム。お名前・メールアドレス・お繋がりのある企業などをご入力ください。登録費用は無料です。",
  robots: { index: false, follow: true },
};

export default function PartnerRegisterPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <PageHero
        eyebrow="Partner Registration"
        title="紹介営業パートナー 登録申請"
        description="以下のフォームに必要事項をご入力ください。内容を確認のうえ、担当者よりご連絡いたします。"
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-xl2 border border-ink-line p-8">
                <h2 className="text-lg font-bold">登録について</h2>
                <ul className="mt-5 space-y-3 text-sm text-ink-soft leading-relaxed">
                  <li className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    <span>登録費用は一切かかりません(無料)</span>
                  </li>
                  <li className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    <span>ご入力内容は当社で厳重に管理し、紹介先には開示しません</span>
                  </li>
                  <li className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    <span>申請後、担当者よりご連絡いたします</span>
                  </li>
                  <li className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    <span>18歳未満および高校生はご登録いただけません</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-xl2 bg-cream p-8">
                <h3 className="text-sm font-semibold text-ink-muted">
                  パートナー制度について
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  報酬体系や活動の流れなど、制度の詳細はこちら。
                </p>
                <div className="mt-4">
                  <Link
                    href={localePath("/contact/partner", locale)}
                    className="link-arrow"
                  >
                    紹介営業パートナーとは
                  </Link>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <PartnerContactForm locale={locale} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
