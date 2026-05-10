import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SimpleContactForm } from "@/components/contact/SimpleContactForm";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "セールスボンド株式会社へのお問い合わせはこちらから。サービスに関するご相談・採用に関するお問い合わせを受け付けています。",
};

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="お問い合わせ"
        description="サービスに関するご相談、その他ご質問はこちらのフォームからお送りください。"
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-xl2 border border-ink-line p-8">
                <h2 className="text-lg font-bold">受付について</h2>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  ご入力いただいた内容は、担当者より随時ご連絡いたします。
                  お急ぎの場合は直接メールにてご連絡ください。
                </p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${site.email}`}
                        className="text-ink hover:text-brand-600"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 rounded-xl2 bg-cream p-8">
                <h3 className="text-sm font-semibold text-ink-muted">
                  カテゴリ別のお問い合わせ
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  用途が決まっている場合は、専用フォームをご利用ください。
                </p>
                <div className="mt-4 flex flex-col gap-2 text-sm font-semibold">
                  <Link
                    href={localePath("/contact/business", locale)}
                    className="link-arrow"
                  >
                    企業様のお問い合わせ
                  </Link>
                  <Link
                    href={localePath("/contact/professional", locale)}
                    className="link-arrow"
                  >
                    プロ人材の方のお問い合わせ
                  </Link>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <SimpleContactForm locale={locale} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
