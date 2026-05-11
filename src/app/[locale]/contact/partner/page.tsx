import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PartnerContactForm } from "@/components/contact/PartnerContactForm";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "紹介営業パートナー登録",
  description:
    "セールスボンドの紹介営業パートナーを募集しています。お持ちの人脈を活かして、企業の決裁者開拓にご協力いただける方からのご登録をお待ちしています。",
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
        eyebrow="Partner Registration"
        title="紹介営業パートナー登録"
        description="お持ちの人脈を活かして、企業の決裁者開拓にご協力いただける方からのご登録をお待ちしています。"
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-xl2 border border-ink-line p-8">
                <h2 className="text-lg font-bold">こんな方へ</h2>
                <ul className="mt-5 space-y-3 text-sm text-ink-soft">
                  {[
                    "経営者・役員クラスの人脈をお持ちの方",
                    "業界・地域での豊富なネットワークをお持ちの方",
                    "副業・スキマ時間で人脈を活かしたい方",
                    "完全成果報酬で柔軟に活動したい方",
                  ].map((label) => (
                    <li key={label} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      <span className="leading-relaxed">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-xl2 bg-cream p-8">
                <h3 className="text-sm font-semibold text-ink-muted">
                  プロ人材としての登録は
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  経営課題を解決するプロフェッショナル人材としてご活躍いただける方は、別途専用フォームをご用意しています。
                </p>
                <Link
                  href={localePath("/contact/professional", locale)}
                  className="mt-4 inline-flex link-arrow"
                >
                  プロ人材の方の登録
                </Link>
              </div>

              <div className="mt-6 rounded-xl2 bg-cream p-8">
                <h3 className="text-sm font-semibold text-ink-muted">
                  企業様は
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  サービスのご相談・お見積もりは、企業様向けの問い合わせフォームをご利用ください。
                </p>
                <Link
                  href={localePath("/contact", locale)}
                  className="mt-4 inline-flex link-arrow"
                >
                  企業様のお問い合わせ
                </Link>
              </div>

              <p className="mt-6 text-xs text-ink-muted">
                ご質問は{" "}
                <a className="text-brand-600 underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                まで。
              </p>
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
