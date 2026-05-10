import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "セールスボンド株式会社へのお問い合わせはこちらから。サービスに関するご相談・採用に関するお問い合わせを受け付けています。",
};

const dummyFields: { label: string; placeholder: string; type?: string }[] = [
  { label: "TODO: 項目1", placeholder: "ダミー入力欄" },
  { label: "TODO: 項目2", placeholder: "ダミー入力欄" },
  { label: "TODO: 項目3", placeholder: "ダミー入力欄", type: "email" },
];

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
        description="お問い合わせ内容については後日項目を追加します。"
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-xl2 border border-ink-line p-8">
                <h2 className="text-lg font-bold">受付について</h2>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  TODO: 受付内容や返信目安などの説明文をここに記載。
                </p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="mailto:info@salesbond.jp"
                        className="text-ink hover:text-brand-600"
                      >
                        info@salesbond.jp
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
                  TODO: 用途が決まっている場合は、専用フォームをご利用ください。
                </p>
                <div className="mt-4 space-y-2 text-sm font-semibold">
                  <Link
                    href={localePath("/contact/business", locale)}
                    className="link-arrow"
                  >
                    企業様のお問い合わせ
                  </Link>
                  <br />
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
              <form
                aria-label="お問い合わせ（ダミー）"
                className="space-y-6 rounded-xl2 border border-dashed border-ink-line bg-white p-8 md:p-10"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="rounded-lg bg-brand-50 px-4 py-3 text-xs text-brand-700">
                  ※ ここはダミー表示です。フォームの項目は後日追加します。
                </div>

                {dummyFields.map((f, i) => (
                  <div key={i}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                      {f.label}
                      <span className="text-[10px] font-medium text-ink-muted">
                        ダミー
                      </span>
                    </label>
                    <input
                      type={f.type ?? "text"}
                      placeholder={f.placeholder}
                      disabled
                      className="mt-2 block w-full rounded-lg border border-ink-line bg-cream px-4 py-3 text-sm text-ink-muted placeholder:text-ink-muted"
                    />
                  </div>
                ))}

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                    TODO: 本文
                    <span className="text-[10px] font-medium text-ink-muted">
                      ダミー
                    </span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="ダミーのテキストエリア"
                    disabled
                    className="mt-2 block w-full rounded-lg border border-ink-line bg-cream px-4 py-3 text-sm text-ink-muted placeholder:text-ink-muted"
                  />
                </div>

                <div>
                  <Button type="submit" size="lg" disabled>
                    送信する（準備中）
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
