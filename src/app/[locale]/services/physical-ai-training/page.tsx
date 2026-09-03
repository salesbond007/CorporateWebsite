import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";
import { CurriculumAccordion } from "./CurriculumAccordion";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "フィジカルAI研修｜BondAI",
  description:
    "生成AIからAIエージェント、フィジカルAIまでを体系的に学ぶ法人向け研修。90分×全8回+コンサル1回、2ヶ月間で、自社・自部署のAI活用テーマを企画できる人材を育成します。",
};

const strengths = [
  {
    title: "フィジカルAIをフックにした差別化",
    body: "生成AI研修が一般化する中、生成AIだけでなくAIエージェント、ロボティクス、センシング、VLM/VLA等まで扱います。",
  },
  {
    title: "非エンジニアも参加できる",
    body: "営業・人事・マーケティング・企画・管理部門なども、自部署の業務改善や顧客課題の発見という観点から参加価値を持てます。",
  },
  {
    title: "明日から使える生成AIも習得",
    body: "フィジカルAI導入には時間や投資が必要な一方、生成AIは受講直後から業務に利用できます。短期的な効果と中長期的なAI導入を両立します。",
  },
  {
    title: "技術紹介で終わらない",
    body: "フィジカルAIの仕組み・事例だけでなく、PoC、ROI、データ、既存設備連携、安全性まで扱い、「導入する側」の知識を身につけます。",
  },
  {
    title: "全社員からAI案件の種を集める",
    body: "最終回で各部門が自部署の課題を棚卸しし、生成AI・AIエージェント・従来型AI・フィジカルAIを含む活用候補を発掘します。",
  },
  {
    title: "研修後の実装につながる",
    body: "研修後のAI導入コンサルティングで候補テーマを整理し、必要に応じてPoC・フィジカルAI開発等の具体的な実装へつなげられます。",
  },
];

const painPoints = [
  "生成AIを社員に使わせているが、個人利用に留まり、組織的な業務改善につながっていない",
  "AIエージェントやフィジカルAIなど次のAIトレンドについて、経営層・現場ともに理解を深めたい",
  "人手不足、省人化、属人化、品質、安全性などの現場課題にAIを活用したい",
  "フィジカルAIに興味はあるが、自社のどこに使えるのか、何から始めればよいのか分からない",
  "AI導入を一部のDX担当者だけに任せず、各部門から活用アイデアが生まれる状態をつくりたい",
  "AI導入候補を洗い出し、経営判断できる形で優先順位やPoC候補まで整理したい",
  "社員教育だけで終わらず、実際のAI導入・開発につながる研修を実施したい",
];

const overviewStats = [
  { label: "研修時間", value: "60〜90分" },
  { label: "研修回数", value: "全8回＋コンサル1回" },
  { label: "研修期間", value: "2ヶ月間" },
  { label: "費用", value: "30万円 / 1名" },
];

export default function PhysicalAiTrainingPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス案内", url: localePath("/services", locale) },
            {
              name: "フィジカルAI研修",
              url: localePath("/services/physical-ai-training", locale),
            },
          ]),
          serviceJsonLd({
            name: "フィジカルAI研修",
            description: metadata.description as string,
            url: localePath("/services/physical-ai-training", locale),
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-900 via-ink to-ink"
          aria-hidden="true"
        />
        <div
          className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-brand-700/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-brand-900/60 blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative py-20 md:py-28">
          <p className="eyebrow !text-brand-200">BondAI Physical AI Training</p>
          <h1 className="mt-5 max-w-3xl text-display-2 font-black leading-[1.15] text-white">
            フィジカルAI研修
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl font-bold leading-relaxed text-white">
            生成AIからフィジカルAIまで。
            <br />
            <span className="text-brand-200">全社員で見つける、AI活用の種。</span>
          </p>
          <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-white/80 font-medium">
            生成AI・AIエージェント・フィジカルAIを体系的に学び、自社・自部署でAI活用を企画できる人材を育成する法人向け研修です。フィジカルAIを開発できるエンジニアの育成ではなく、「AIで何ができるかを理解し、自社の課題から活用テーマを発見・企画できる状態」を目指します。
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={localePath("/contact", locale)} size="lg">
              資料請求・お問い合わせ
            </Button>
            <Button
              href={`${localePath("/services/physical-ai-training", locale)}#curriculum`}
              size="lg"
              variant="secondary"
              className="!border-white/70 !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white hover:!text-ink"
            >
              研修内容を見る
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-10 md:grid-cols-4">
            {overviewStats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                  {s.label}
                </dt>
                <dd className="mt-2 text-lg font-black text-white md:text-xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Pain points */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <p className="section-label !text-brand-500">Are you facing this?</p>
          <p className="mt-3 max-w-2xl text-xl md:text-2xl font-black text-ink">
            こんな課題はありませんか？
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {painPoints.map((p) => (
              <li
                key={p}
                className="flex gap-3 rounded-2xl border border-ink-line bg-white p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-xs font-black text-white"
                >
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-ink font-medium">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Strengths */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <p className="section-label !text-brand-500">Why BondAI</p>
          <p className="mt-3 max-w-2xl text-xl md:text-2xl font-black text-ink">
            選ばれる理由
          </p>

          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl border border-ink-line bg-cream/40 p-7"
              >
                <span className="font-display text-2xl font-black text-brand-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-black text-ink leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-20 bg-cream py-24 md:py-32">
        <Container>
          <p className="section-label !text-brand-500">Curriculum</p>
          <p className="mt-3 max-w-2xl text-xl md:text-2xl font-black text-ink">
            講座構成
          </p>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
            90分×全8回／週1回×2ヶ月。第1〜8回は幅広い部門の社員を対象とし、研修終了後に経営層・DX/AI責任者・技術責任者等を対象としたAI導入コンサルティングを実施します。タップすると各回の詳細トピックを確認できます。
          </p>

          <div className="mt-10">
            <CurriculumAccordion />
          </div>
        </Container>
      </section>

      {/* Pricing summary */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-ink-line bg-cream/50 p-8 md:p-12">
            <p className="section-label !text-brand-500">Price</p>
            <p className="mt-3 text-xl md:text-2xl font-black text-ink">
              料金・実施概要
            </p>

            <dl className="mt-8 divide-y divide-ink-line">
              {[
                { label: "研修期間", value: "2ヶ月間" },
                { label: "研修時間", value: "60〜90分 / 回" },
                { label: "研修回数", value: "全8回＋コンサル1回（計9回）" },
                { label: "費用", value: "30万円 / 1名" },
                { label: "最低参加人数", value: "5名〜" },
                { label: "対象", value: "部門を問わず全社員（コンサルのみ経営層・DX/AI責任者・技術責任者等）" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <dt className="text-sm font-bold text-ink-muted">{row.label}</dt>
                  <dd className="text-base font-black text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-xs leading-relaxed text-ink-muted">
              ※助成金・補助制度等の活用も想定した法人向け教育サービスとして設計しています。詳細はお問い合わせください。
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="relative overflow-hidden rounded-none bg-brand-500 px-8 py-16 text-center md:px-16 md:py-20">
            <div
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="text-display-3 font-black leading-tight text-white">
                フィジカルAI研修について相談する
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/90 font-medium">
                貴社の業種・課題に合わせたカリキュラムのご提案や、資料のご送付も承っています。まずはお気軽にお問い合わせください。
              </p>
              <div className="mt-9 flex justify-center">
                <Button
                  href={localePath("/contact", locale)}
                  size="lg"
                  className="bg-white !text-brand-600 hover:!bg-brand-50"
                >
                  お問い合わせ
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
