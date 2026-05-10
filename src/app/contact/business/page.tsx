import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ（企業様）",
  description: "TODO: 企業様向け問い合わせページのメタディスクリプション",
};

export default function BusinessContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact / Business"
        title="企業様のお問い合わせ"
        description="TODO: 企業様向けの問い合わせの案内。受付内容や返信目安を1〜2行で。"
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-xl2 border border-ink-line p-8">
                <h2 className="text-lg font-bold">ご相談の流れ</h2>
                <ol className="mt-5 space-y-4 text-sm text-ink-soft">
                  <li className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white text-xs font-bold">1</span>
                    <span className="leading-relaxed">フォームよりご連絡ください。</span>
                  </li>
                  <li className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white text-xs font-bold">2</span>
                    <span className="leading-relaxed">担当より2営業日以内にご返信いたします。</span>
                  </li>
                  <li className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white text-xs font-bold">3</span>
                    <span className="leading-relaxed">オンライン or 対面で詳細をヒアリング。</span>
                  </li>
                </ol>
              </div>

              <div className="mt-6 rounded-xl2 bg-cream p-8">
                <h3 className="text-sm font-semibold text-ink-muted">
                  プロ人材の方は
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  TODO: 該当する場合の案内を1〜2行で。
                </p>
                <Link
                  href="/contact/professional"
                  className="mt-4 inline-flex link-arrow"
                >
                  プロ人材の方の問い合わせ
                </Link>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <ContactForm type="business" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
