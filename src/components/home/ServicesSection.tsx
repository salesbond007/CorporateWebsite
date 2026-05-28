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

// 句点で改行しつつ、ポイントは色 / アンダーラインで強調する版の要約。
// site.ts の summary(プレーン)はメタ等で使い、ここでは表示用に書き換え。
const summariesBySlug: Record<string, ServiceSummary> = {
  "sales-bond": [
    [
      { text: "人脈紹介", mark: "underline" },
      { text: "を活用した、" },
      { text: "決裁者開拓サービス", mark: "color" },
      { text: "。" },
    ],
    [
      { text: "ベンチャーから大企業、地方企業まで、" },
      { text: "幅広い開拓", mark: "color" },
      { text: "が可能です。" },
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

function renderSegment(seg: Segment, key: number) {
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
      <span key={key} className="font-black text-brand-600">
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
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 100} className="h-full">
                <Link
                  href={localePath(s.href, locale)}
                  className="group block h-full rounded-none border-2 border-ink-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:shadow-card"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl font-black text-brand-500 leading-none">
                      {s.number}
                    </span>
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition-all group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  {s.subtitle ? (
                    <p className="mt-10 mb-2 text-base font-bold text-brand-500">
                      {s.subtitle}
                    </p>
                  ) : null}
                  <h3
                    className={`${s.subtitle ? "" : "mt-10 "}text-2xl md:text-3xl font-black text-ink leading-tight`}
                  >
                    {s.title}
                  </h3>
                  <div className="mt-4 h-1 w-12 rounded-full bg-brand-500" aria-hidden="true" />
                  <div className="mt-5 space-y-2 text-sm leading-relaxed text-ink font-medium">
                    {(summariesBySlug[s.slug] ?? [[{ text: s.summary }]]).map(
                      (sentence, si) => (
                        <p key={si}>
                          {sentence.map((seg, gi) => renderSegment(seg, gi))}
                        </p>
                      ),
                    )}
                  </div>
                  <p className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-2 transition-all">
                    サービス詳細を見る
                    <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
