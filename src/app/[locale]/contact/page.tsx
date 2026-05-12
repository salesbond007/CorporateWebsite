import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SimpleContactForm } from "@/components/contact/SimpleContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "お問い合わせ", url: localePath("/contact", locale) },
        ])}
      />
      <PageHero
        eyebrow="Contact / Business"
        title="お問い合わせ"
        description="サービスに関するご相談、その他ご質問はこちらのフォームからお送りください。"
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-start-5 lg:col-span-8 lg:row-start-1">
              <SimpleContactForm locale={locale} />
            </div>

            <aside className="lg:col-start-1 lg:col-span-4 lg:row-start-1">
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
                  個人の方へ
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  お持ちの人脈や知見を活かして当社にご協力いただける方は、こちらをご覧ください。
                </p>
                <div className="mt-4">
                  <Link
                    href={localePath("/contact/partner", locale)}
                    className="link-arrow"
                  >
                    個人の方はこちら
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
