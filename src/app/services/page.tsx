import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "サービス概要",
  description: "TODO: サービス概要ページのメタディスクリプション",
};

export default function ServicesPage() {
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
                  href={s.href}
                  className="group block rounded-xl2 border border-ink-line bg-white p-8 md:p-10 transition-all hover:border-brand-300 hover:shadow-card"
                >
                  <div className="grid gap-8 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-2">
                      <span className="font-display text-5xl font-bold text-brand-500">
                        {s.number}
                      </span>
                    </div>
                    <div className="md:col-span-8">
                      <h2 className="text-h1 text-ink group-hover:text-brand-600 transition-colors">
                        {s.title}
                      </h2>
                      <p className="mt-3 text-ink-soft leading-relaxed">
                        {s.summary}
                      </p>
                      <p className="mt-4 text-sm text-ink-muted">
                        TODO: 解決できる課題や対象顧客を1〜2行で。
                      </p>
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
