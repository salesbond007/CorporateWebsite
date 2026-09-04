import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/services/physical-ai-training/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* ワインレッドのオーバーレイ: 写真を馴染ませつつテキストの可読性を確保 */}
        <div
          className="absolute inset-0 bg-brand-900/45 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,5,11,0.9)_0%,rgba(29,5,11,0.68)_42%,rgba(29,5,11,0.25)_70%,rgba(29,5,11,0)_90%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
          aria-hidden="true"
        />

        <Container className="relative py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
            Top - フィジカルAI研修
          </p>
          <h1 className="mt-4 max-w-3xl text-display-2 font-black leading-[1.15] text-white">
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

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={localePath("/contact", locale)}
              className="group flex items-center gap-4 rounded-full bg-brand-500 px-6 py-4 shadow-[0_14px_36px_-12px_rgba(122,30,53,0.8)] transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                <DownloadIcon />
              </span>
              <span className="text-left">
                <span className="block text-sm font-black text-white">
                  資料請求
                </span>
                <span className="block text-xs text-white/80">
                  こちらから無料
                </span>
              </span>
            </Link>
            <Link
              href={localePath("/contact", locale)}
              className="group flex items-center gap-4 rounded-full bg-white/10 px-6 py-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                <ChatIcon />
              </span>
              <span className="text-left">
                <span className="block text-sm font-black text-white">
                  お問い合わせ
                </span>
                <span className="block text-xs text-white/80">
                  カリキュラムについて相談する
                </span>
              </span>
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-10">
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
      <section className="border-t border-ink-line bg-white py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base md:text-lg font-bold text-ink-soft">
              AI活用を推進するにあたって
            </p>
            <p className="mt-2 text-2xl md:text-3xl font-black leading-snug text-ink">
              <span className="text-brand-500">こんな課題</span>はありませんか？
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-ink-line bg-white shadow-card">
            <ul className="divide-y divide-ink-line">
              {painPoints.map((p, i) => (
                <li key={p} className="flex items-stretch gap-5 p-5 md:p-6">
                  <span
                    aria-hidden="true"
                    className="grid w-12 shrink-0 place-items-center rounded-xl bg-brand-500 text-sm font-black text-white md:w-14 md:text-base"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center text-sm leading-relaxed text-ink font-bold md:text-base">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center text-ink-muted" aria-hidden="true">
            <ChevronDownIcon />
          </div>
        </Container>
      </section>

      {/* Solution */}
      <section className="relative isolate overflow-hidden bg-ink py-20 md:py-28">
        <Image
          src="/services/cards/ai-solutions.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          className="absolute inset-0 bg-brand-900/70 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40"
          aria-hidden="true"
        />
        <Container className="relative text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-200">
            Solution
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-2xl md:text-4xl font-black leading-snug text-white">
            フィジカルAI研修が
            <br />
            その課題を解決します
          </h2>
        </Container>
      </section>

      {/* Strengths */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <p className="max-w-2xl text-xl md:text-2xl font-black text-ink">
            選ばれる理由
          </p>

          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl border border-ink-line bg-white p-7"
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
      <section id="curriculum" className="scroll-mt-20 border-t border-ink-line bg-white py-24 md:py-32">
        <Container>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="font-display text-3xl font-black text-brand-500 md:text-4xl">
              CURRICULUM
            </p>
            <p className="text-base font-bold text-ink md:text-lg">講座構成</p>
          </div>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-500" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
            90分×全8回／週1回×2ヶ月。第1〜8回は幅広い部門の社員を対象とし、研修終了後に経営層・DX/AI責任者・技術責任者等を対象としたAI導入コンサルティングを実施します。タップすると各回の詳細トピックを確認できます。
          </p>

          <div className="mt-10">
            <CurriculumAccordion />
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

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 2v9m0 0l3.5-3.5M9 11L5.5 7.5M3 13.5v1a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3 4.5A1.5 1.5 0 014.5 3h9A1.5 1.5 0 0115 4.5v6a1.5 1.5 0 01-1.5 1.5H8l-3.5 3v-3H4.5A1.5 1.5 0 013 10.5v-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M5 8l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
