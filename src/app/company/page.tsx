import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "会社概要",
  description: "TODO: 会社概要ページのメタディスクリプション",
};

const rows: { label: string; value: string }[] = [
  { label: "会社名", value: "TODO: 株式会社○○" },
  { label: "代表者", value: "TODO: 代表取締役 ○○ ○○" },
  { label: "設立", value: "TODO: 20XX年X月" },
  { label: "資本金", value: "TODO: ○○○○万円" },
  { label: "所在地", value: "TODO: 〒XXX-XXXX 東京都..." },
  { label: "電話番号", value: "TODO: 03-XXXX-XXXX" },
  { label: "事業内容", value: "TODO: 主な事業内容を箇条書きで" },
  { label: "取引銀行", value: "TODO: ○○銀行 ○○支店" },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="会社概要"
        description="TODO: 会社概要ページのリード文。"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="eyebrow">Profile</span>
              <h2 className="mt-5 text-h1">基本情報</h2>
              <p className="mt-5 text-ink-soft leading-relaxed">
                TODO: 会社情報のリード文。
              </p>
            </div>

            <div className="lg:col-span-8">
              <dl className="overflow-hidden rounded-xl2 border border-ink-line bg-white">
                {rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={
                      "grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 px-6 py-5" +
                      (i !== rows.length - 1 ? " border-b border-ink-line" : "")
                    }
                  >
                    <dt className="sm:col-span-3 text-sm font-semibold text-ink">
                      {row.label}
                    </dt>
                    <dd className="sm:col-span-9 text-sm text-ink-soft leading-relaxed">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl2 border border-ink-line p-8 md:p-10">
              <h3 className="text-xl font-bold">アクセス</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">
                TODO: 最寄り駅・所要時間・アクセス情報を記載。
              </p>
              <div className="mt-6 aspect-[16/10] w-full rounded-xl bg-cream grid place-items-center text-ink-muted text-sm">
                Map placeholder
              </div>
            </div>
            <div className="rounded-xl2 border border-ink-line p-8 md:p-10">
              <h3 className="text-xl font-bold">沿革</h3>
              <ul className="mt-6 space-y-4 text-sm text-ink-soft">
                {["20XX", "20XX", "20XX"].map((year, i) => (
                  <li key={i} className="grid grid-cols-[5rem_1fr] gap-4">
                    <span className="font-display font-bold text-brand-600">
                      {year}
                    </span>
                    <span className="leading-relaxed">
                      TODO: 沿革の項目をここに。
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
