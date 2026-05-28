import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

type Segment = { text: string; mark?: "color" | "underline" };
type ServiceSummary = Segment[][];

// サービスごとのテーマカラー。Tailwind が静的解析できるように完全クラス名で列挙。
type SlugTheme = {
  number: string;
  subtitle: string;
  divider: string;
  detailLink: string;
  colorMark: string;
  hoverBorder: string;
  hoverArrowBg: string;
  hoverArrowBorder: string;
};

const themeBySlug: Record<string, SlugTheme> = {
  "sales-bond": {
    number: "text-emerald-500",
    subtitle: "text-emerald-500",
    divider: "bg-emerald-500",
    detailLink: "text-emerald-600",
    colorMark: "text-emerald-600",
    hoverBorder: "hover:border-emerald-500",
    hoverArrowBg: "group-hover:bg-emerald-500",
    hoverArrowBorder: "group-hover:border-emerald-500",
  },
  "lead-bond": {
    number: "text-sky-500",
    subtitle: "text-sky-500",
    divider: "bg-sky-500",
    detailLink: "text-sky-600",
    colorMark: "text-sky-600",
    hoverBorder: "hover:border-sky-500",
    hoverArrowBg: "group-hover:bg-sky-500",
    hoverArrowBorder: "group-hover:border-sky-500",
  },
  "keyman-bond": {
    number: "text-rose-700",
    subtitle: "text-rose-700",
    divider: "bg-rose-700",
    detailLink: "text-rose-700",
    colorMark: "text-rose-700",
    hoverBorder: "hover:border-rose-700",
    hoverArrowBg: "group-hover:bg-rose-700",
    hoverArrowBorder: "group-hover:border-rose-700",
  },
};

const fallbackTheme: SlugTheme = {
  number: "text-brand-500",
  subtitle: "text-brand-500",
  divider: "bg-brand-500",
  detailLink: "text-brand-600",
  colorMark: "text-brand-600",
  hoverBorder: "hover:border-brand-500",
  hoverArrowBg: "group-hover:bg-brand-500",
  hoverArrowBorder: "group-hover:border-brand-500",
};

// 句点で改行しつつ、ポイントは色 / アンダーラインで強調する版の要約。
// site.ts の summary(プレーン)はメタ等で使い、ここでは表示用に書き換え。
const summariesBySlug: Record<string, ServiceSummary> = {
  "sales-bond": [
    [
      { text: "人脈紹介", mark: "underline" },
      { text: "を活用した、" },
      { text: "決裁者開拓", mark: "color" },
      { text: "サービス。" },
    ],
    [
      { text: "ベンチャーから大企業、地方企業まで、幅広い開拓が可能です。" },
    ],
    [
      { text: "完全成果報酬", mark: "color" },
      { text: "でご提供します。" },
    ],
  ],
  "keyman-bond": [
    [
      { text: "高度な経営課題を、" },
      { text: "その道のプロ", mark: "underline" },
      { text: "と共に解決する経営支援サービス。" },
    ],
    [
      { text: "営業・マーケ・DX・人事・財務など多彩な領域に精通した" },
      { text: "経営層・CxO・エキスパート", mark: "color" },
      { text: "クラスの実力者が伴走します。" },
    ],
  ],
  "lead-bond": [
    [
      { text: "営業戦略の策定から" },
      { text: "アポ獲得・商談・成約", mark: "underline" },
      { text: "、そして営業DX・人材紹介まで。" },
    ],
    [
      { text: "BtoBに特化し、必要な営業ソリューションを" },
      { text: "ワンストップ", mark: "color" },
      { text: "で提供。" },
    ],
    [
      { text: "自走できる営業組織", mark: "color" },
      { text: "づくりまで伴走します。" },
    ],
  ],
};

function renderSegment(seg: Segment, key: number, colorClass: string) {
  if (seg.mark === "underline") {
    return (
      <span key={key} className="relative inline-block font-black text-ink">
        {seg.text}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-400"
        />
      </span>
    );
  }
  if (seg.mark === "color") {
    return (
      <span key={key} className={`font-black ${colorClass}`}>
        {seg.text}
      </span>
    );
  }
  return <span key={key}>{seg.text}</span>;
}

export function ServicesSection({ locale, dict }: Props) {
  return (
    <section className="relative py-28 md:py-36 bg-cream">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Services</p>
            <p className="mt-3 text-lg md:text-xl font-extrabold text-ink">
              提供する3つのサービス
            </p>
          </div>
          <Link
            href={localePath("/services", locale)}
            className="link-arrow shrink-0"
          >
            {dict.nav.services}
          </Link>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const theme = themeBySlug[s.slug] ?? fallbackTheme;
            return (
            <li key={s.slug}>
              <Reveal delay={i * 100} className="h-full">
                <Link
                  href={localePath(s.href, locale)}
                  className={`group block h-full rounded-none border-2 border-ink-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 ${theme.hoverBorder} hover:shadow-card`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-3xl font-black ${theme.number} leading-none`}>
                      {s.number}
                    </span>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition-all ${theme.hoverArrowBorder} ${theme.hoverArrowBg} group-hover:text-white`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  {s.subtitle ? (
                    <p className={`mt-10 mb-2 text-base font-bold ${theme.subtitle}`}>
                      {s.subtitle}
                    </p>
                  ) : null}
                  <h3
                    className={`${s.subtitle ? "" : "mt-10 "}text-2xl md:text-3xl font-black text-ink leading-tight`}
                  >
                    {s.title}
                  </h3>
                  <div className={`mt-4 h-1 w-12 rounded-full ${theme.divider}`} aria-hidden="true" />
                  <div className="mt-5 space-y-2 text-sm leading-relaxed text-ink font-medium">
                    {(summariesBySlug[s.slug] ?? [[{ text: s.summary }]]).map(
                      (sentence, si) => (
                        <p key={si}>
                          {sentence.map((seg, gi) =>
                            renderSegment(seg, gi, theme.colorMark),
                          )}
                        </p>
                      ),
                    )}
                  </div>
                  <p className={`mt-5 inline-flex items-center gap-1 text-xs font-bold ${theme.detailLink} group-hover:gap-2 transition-all`}>
                    サービス詳細を見る
                    <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </Reveal>
            </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
