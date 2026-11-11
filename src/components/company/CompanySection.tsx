import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Row = {
  label: string;
  value: React.ReactNode;
};

const linkClass =
  "inline-flex items-baseline gap-1 border-b border-ink/30 pb-0.5 text-ink transition-colors hover:border-brand-500 hover:text-brand-600";

export const companyRows: Row[] = [
  { label: "会社名", value: "セールスボンド株式会社（Sales Bond Co., Ltd.）" },
  { label: "代表取締役", value: "飯住 孝裕" },
  { label: "設立", value: "2024年7月" },
  { label: "資本金", value: "41,002,000円" },
  {
    label: "共同創業者",
    value: (
      <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span>柴田 泰成</span>
        <a href="https://sora-seed.jp/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          ソラシードスタートアップスタジオ/ソラシード3
          <span aria-hidden="true">↗</span>
          <span className="sr-only">(新しいタブで開く)</span>
        </a>
      </span>
    ),
  },
  { label: "登録番号", value: "T8012801023311" },
  {
    label: "住所",
    value: (
      <>
        〒160-0023
        <br />
        東京都新宿区西新宿3-3-13 西新宿水間ビル2F
      </>
    ),
  },
  {
    label: "メールアドレス",
    value: (
      <a href="mailto:info@salesbond.jp" className={linkClass}>
        info@salesbond.jp
      </a>
    ),
  },
  {
    label: "事業内容",
    value: (
      <>
        セキュリティ対策事業（社外CISO・セキュリティ顧問、ホームページセキュリティ対策）
        <br />
        経営顧問事業（顧問・COO紹介、インサイドセールス代行「アポコミ」）
      </>
    ),
  },
  { label: "取引銀行", value: "三井住友銀行 ／ 東京スター銀行" },
];

export function CompanySection() {
  return (
    <section id="company" className="scroll-mt-20 bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionTitle en="Company" ja="会社概要" size="sm" />

            {/* ロゴマーク(PCのみ)。四隅のブランドカラーの飾り + ゆっくり浮遊 */}
            <Reveal variant="scale" delay={200} className="mt-12 hidden lg:block">
              <div className="relative aspect-square w-full max-w-[18rem] bg-white">
                {[
                  "left-0 top-0 border-l-2 border-t-2",
                  "right-0 top-0 border-r-2 border-t-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((pos) => (
                  <span
                    key={pos}
                    aria-hidden="true"
                    className={`absolute h-6 w-6 border-brand-500 ${pos}`}
                  />
                ))}
                <div className="absolute inset-0 grid place-items-center">
                  <Image
                    src="/logo-square.png"
                    alt="セールスボンド株式会社 ロゴ"
                    width={200}
                    height={200}
                    className="w-3/5 animate-float-y mix-blend-multiply brightness-[1.04] contrast-[1.05]"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal variant="none">
              <dl className="border-t border-ink">
                {companyRows.map((row, i) => (
                  <div
                    key={row.label}
                    style={{ transitionDelay: `${i * 50}ms` }}
                    className="grid translate-y-3 grid-cols-1 gap-1 border-b border-ink-line py-2.5 opacity-0 transition-all duration-700 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-3"
                  >
                    <dt className="text-sm font-bold tracking-[0.05em] text-ink">{row.label}</dt>
                    <dd className="text-sm leading-relaxed tracking-[0.03em] text-ink-soft">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
