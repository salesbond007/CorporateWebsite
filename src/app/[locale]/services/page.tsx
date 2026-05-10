import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "サービス概要",
  description: "TODO: サービス概要ページのメタディスクリプション",
};

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="サービス概要"
        description="TODO: 提供する3つのサービスの全体像を1〜2行で。"
      />

      <section className="py-24 md:py-32">
        <Container>
          <ul className="space-y-6">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={localePath(s.href, locale)}
                  className="group block rounded-xl2 border border-ink-line bg-white p-8 md:p-10 transition-all hover:border-brand-300 hover:shadow-card"
                >
                  <div className="grid gap-8 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-2">
                      <span className="font-display text-5xl font-bold text-brand-500">
                        {s.number}
                      </span>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                        {s.subtitle}
                      </p>
                      <h2 className="mt-2 text-h1 text-ink group-hover:text-brand-600 transition-colors">
                        {s.title}
                      </h2>
                      <p className="mt-4 text-ink-soft leading-relaxed">
                        {s.summary}
                      </p>
                      <ul className="mt-5 space-y-1.5 text-sm text-ink-muted">
                        {s.features.map((f) => (
                          <li key={f} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2 md:text-right">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                        詳しく見る
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
