import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Row = {
  /** 英字の小ラベル */
  en: string;
  label: string;
  value: React.ReactNode;
};

const linkClass =
  "inline-flex items-baseline gap-1 border-b border-white/30 pb-0.5 text-white transition-colors hover:border-brand-200 hover:text-brand-200";

const rows: Row[] = [
  { en: "Company", label: "会社名", value: "セールスボンド株式会社（Sales Bond Co., Ltd.）" },
  { en: "CEO", label: "代表取締役", value: "飯住 孝裕" },
  {
    en: "Co-Founder",
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
  { en: "Founded", label: "設立", value: "2024年7月" },
  { en: "Capital", label: "資本金", value: "41,002,000円" },
  { en: "Registration", label: "登録番号", value: "T8012801023311" },
  {
    en: "Address",
    label: "住所",
    value: (
      <>
        <span className="mr-2 inline-block bg-white/10 px-2 py-0.5 text-[11px] font-bold tracking-[0.1em] text-brand-100">
          本社
        </span>
        〒160-0023
        <br />
        東京都新宿区西新宿3-3-13 西新宿水間ビル2F
      </>
    ),
  },
  {
    en: "Contact",
    label: "メールアドレス",
    value: (
      <a href="mailto:info@salesbond.jp" className={linkClass}>
        info@salesbond.jp
      </a>
    ),
  },
  {
    en: "Business",
    label: "事業内容",
    value: (
      <ul className="flex flex-wrap gap-2">
        {["AIセキュリティ対策事業", "新規開拓支援事業(営業BPO)"].map((b) => (
          <li
            key={b}
            className="border border-brand-200/40 bg-brand-500/20 px-3 py-1 text-[13px] font-bold text-white"
          >
            {b}
          </li>
        ))}
      </ul>
    ),
  },
  { en: "Banks", label: "取引銀行", value: "三井住友銀行 ／ 東京スター銀行" },
];

/** 左カラムに並べる主要数値 */
const highlights = [
  { value: "2024", unit: ".07", label: "設立" },
  { value: "41,002", unit: "千円", label: "資本金" },
  { value: "2", unit: "Solutions", label: "事業領域" },
];

export function CompanySection() {
  return (
    <section
      id="company"
      className="relative isolate scroll-mt-20 overflow-hidden bg-brand-900 py-20 text-white md:py-32"
    >
      {/* 背景: 細いグリッド線 + 漂う光 + 大きな透かし文字 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[30rem] w-[30rem] animate-blob rounded-full bg-brand-500/50 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[26rem] w-[26rem] animate-blob rounded-full bg-brand-400/30 blur-[130px] [animation-delay:-9s]"
      />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 right-0 -z-10 select-none whitespace-nowrap font-display text-[clamp(5rem,14vw,12rem)] font-black leading-none tracking-tight text-white/[0.04]"
      >
        SALES BOND
      </p>

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* 左: 見出し・リード・主要数値 */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTitle en="Company" ja="会社概要" size="sm" tone="dark" />
              <Reveal variant="blur" delay={200}>
                <p className="mt-8 text-sm leading-[2] text-white/70">
                  挑む企業の攻めと守りを、
                  <br />
                  プロフェッショナルの力で支える。
                  <br />
                  それが、セールスボンドの存在意義です。
                </p>
              </Reveal>

              <Reveal variant="none" className="mt-10">
                <ul className="grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-1">
                  {highlights.map((h, i) => (
                    <li
                      key={h.label}
                      style={{ transitionDelay: `${300 + i * 120}ms` }}
                      className="translate-y-4 bg-brand-900/90 p-4 opacity-0 transition-all duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100 md:p-5"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-200 md:text-[11px]">
                        {h.label}
                      </p>
                      <p className="mt-2 font-display font-black leading-none">
                        <span className="text-2xl md:text-4xl">{h.value}</span>
                        <span className="ml-1 text-[11px] font-bold text-white/60 md:text-sm">
                          {h.unit}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* 右: 会社情報の一覧 */}
          <div className="lg:col-span-8">
            <Reveal variant="none">
              <dl className="border-t border-white/15">
                {rows.map((row, i) => (
                  <div
                    key={row.label}
                    style={{ transitionDelay: `${i * 70}ms` }}
                    className="group/row relative grid translate-y-4 grid-cols-1 gap-1.5 border-b border-white/15 py-4 opacity-0 transition-all duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-6 sm:py-5"
                  >
                    {/* ホバー時に左から伸びるハイライト */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-white/[0.07] to-transparent transition-transform duration-700 ease-expo group-hover/row:scale-x-100"
                    />
                    <dt className="flex items-baseline gap-3 pl-0 transition-[padding] duration-500 ease-expo group-hover/row:pl-3">
                      <span className="font-display text-[11px] font-black text-brand-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                          {row.en}
                        </span>
                        <span className="block text-sm font-bold text-brand-100">{row.label}</span>
                      </span>
                    </dt>
                    <dd className="pl-8 text-sm leading-relaxed text-white/90 sm:pl-0 md:text-[15px]">
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
