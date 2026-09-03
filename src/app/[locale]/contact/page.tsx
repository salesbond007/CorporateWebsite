import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SimpleContactForm } from "@/components/contact/SimpleContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ/無料相談",
  description:
    "セールスボンド株式会社へのお問い合わせ・無料相談はこちらから。サービスに関するご相談・お見積もり・採用に関するお問い合わせを受け付けています。",
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
          { name: "お問い合わせ/無料相談", url: localePath("/contact", locale) },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="お問い合わせ/無料相談"
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
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
