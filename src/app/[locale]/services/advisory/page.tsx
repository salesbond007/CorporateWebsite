import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { LpHeader } from "@/components/services/LpHeader";
import { ServiceLeadForm } from "@/components/contact/ServiceLeadForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PATH = "/services/advisory";
const FORM_ID = "consult";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    ...pageMeta.advisory,
    path: PATH,
    locale: params.locale,
  });
}

/* ------------------------------------------------------------------ データ */

const BLUE = "#0046C8";

/** 課題(キーワードを青で強調) */
const problems: { text: ReactNode; image: string }[] = [
  {
    text: (
      <>
        次の成長を担う
        <br />
        <em>経営人材</em>がいない
      </>
    ),
    image: "/illustrations/ld-1523-blue.webp",
  },
  {
    text: (
      <>
        大手企業との
        <br />
        <em>取引・提携の糸口</em>が
        <br />
        つかめない
      </>
    ),
    image: "/illustrations/ld-1531-blue.webp",
  },
  {
    text: (
      <>
        新規事業の
        <br />
        <em>販路</em>が広がらない
      </>
    ),
    image: "/illustrations/ld-1528-blue.webp",
  },
  {
    text: (
      <>
        経営の意思決定を
        <br />
        <em>相談できる相手</em>が
        <br />
        いない
      </>
    ),
    image: "/illustrations/ld-1538-blue.webp",
  },
  {
    text: (
      <>
        フルタイムの役員を
        <br />
        採用するのは
        <br />
        <em>まだ早い</em>
      </>
    ),
    image: "/illustrations/ld-742-blue.webp",
  },
];

/** 中央の図: 顧問・COOが担う領域 */
const domains = [
  "経営戦略",
  "事業計画",
  "組織づくり",
  "KPI管理",
  "販路開拓",
  "アライアンス",
  "人脈紹介",
  "IPO準備",
];

const points = [
  {
    lead: "業界のつながりで、",
    em: "販路を一気に広げる",
    label: "販路開拓",
    text: "顧問・COOが持つ業界のつながりを活かして、見込み顧客や代理店へのルートをつくります。自社だけでは届かなかった企業との商談につなげます。",
    image: "/illustrations/ld-752-blue.webp",
  },
  {
    lead: "大手企業・事業会社との",
    em: "アライアンスをつくる",
    label: "アライアンス開拓",
    text: "大手企業や事業会社との提携・協業の機会をつくります。事業を一気に広げるパートナーとの関係を築き、成長の速度を上げます。",
    image: "/illustrations/ld-1498-blue.webp",
  },
  {
    lead: "成長に必要な人と、",
    em: "確かにつながる",
    label: "つながりの紹介",
    text: "キーパーソン、金融機関、専門家など、次の成長に必要な人との出会いをつなぎます。プロの信用があるからこそ開く扉があります。",
    image: "/illustrations/ld-881-blue.webp",
  },
  {
    lead: "COOとして、",
    em: "経営の実行を担う",
    label: "経営への伴走",
    text: "事業計画、組織づくり、KPIの管理まで踏み込み、経営の一員として実行を推進します。戦略を「絵に描いた餅」で終わらせません。",
    image: "/illustrations/ld-736-blue.webp",
  },
];

const professionals = [
  {
    role: "元上場企業 役員",
    tags: ["経営戦略", "組織づくり", "IPO準備"],
    text: "上場企業の経営に携わった経験から、成長フェーズに合った戦略と組織づくりを支援します。",
  },
  {
    role: "元メガバンク COO",
    tags: ["事業計画", "財務", "金融機関とのつながり"],
    text: "大組織の執行を担った経験と金融のネットワークで、事業計画の実行と資金面の打ち手を支えます。",
  },
  {
    role: "各業界のプロフェッショナル",
    tags: ["IT・SaaS", "製造", "人材"],
    text: "業界を知り尽くしたプロが、その業界ならではの販路やアライアンスの開拓を後押しします。",
  },
];

const targets = [
  "早期のグロースを目指すベンチャー・スタートアップ",
  "新規事業を立ち上げた事業会社",
  "大手企業との取引やアライアンスを広げたい企業",
  "IPOを見据えて経営体制を強化したい企業",
];

const flow = [
  {
    title: "無料相談",
    text: "現在の事業と、実現したい成長をお聞かせください。",
  },
  {
    title: "課題の整理",
    text: "必要な経営の力と、関わり方（顧問／COO）を整理します。",
  },
  {
    title: "人材のご紹介・面談",
    text: "課題と業界に合ったプロフェッショナルをご紹介します。",
  },
  {
    title: "ご契約・伴走開始",
    text: "定例での伴走と、販路・アライアンスの開拓を始めます。",
  },
];

const faqs = [
  {
    q: "どのような人材を紹介してもらえますか？",
    a: "元上場企業役員、元メガバンクCOOなど、各業界で実績のある経営のプロフェッショナルです。御社の課題と業界に合わせて、最適な人材をご紹介します。",
  },
  {
    q: "顧問とCOOの違いは何ですか？",
    a: "顧問は定例の打ち合わせや助言、つながりの紹介が中心です。COOは事業計画の実行や組織づくりまで踏み込み、経営の一員として伴走します。御社の状況に合わせて、どちらが合うかをご提案します。",
  },
  {
    q: "販路開拓やアライアンス開拓も支援してもらえますか？",
    a: "はい。顧問・COOが持つ業界のつながりを活かし、見込み顧客や代理店の開拓、大手企業・事業会社との提携づくりを支援します。",
  },
  {
    q: "ベンチャー企業や新規事業でも依頼できますか？",
    a: "はい。早期のグロースを目指すベンチャー企業や、事業会社の新規事業の立ち上げを主な対象としています。正社員として経営人材を採用する前の段階でもご活用いただけます。",
  },
  {
    q: "料金はどのくらいですか？",
    a: "支援の範囲や関わり方に応じてお見積もりします。まずは無料相談で、御社の状況をお聞かせください。",
  },
  {
    q: "アポコミ（新規開拓支援）と組み合わせられますか？",
    a: "はい。顧問のつながりを活かした開拓と、アポコミの複数チャネルによるアポイント創出を組み合わせ、攻めの新規開拓を加速させることもできます。",
  },
];

/* --------------------------------------------------------------- 小さな部品 */

/** 2段組みのピル型ボタン(メイン文言 + 小さな補足 + 右端の丸アイコン) */
function Cta({
  label,
  sub,
  href = `#${FORM_ID}`,
  tone = "blue",
  className,
}: {
  label: string;
  sub?: string;
  href?: string;
  tone?: "blue" | "accent" | "white";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-16 min-w-[16rem] items-center justify-center rounded-full pl-8 pr-16 text-center transition duration-300 hover:-translate-y-0.5",
        tone === "blue" &&
          "bg-[linear-gradient(100deg,#0037B9,#0A6EF0)] text-white shadow-[0_14px_30px_-12px_rgba(0,70,200,0.8)]",
        tone === "accent" &&
          "bg-[linear-gradient(100deg,#FF8C64,#E6320A)] text-white shadow-[0_14px_30px_-12px_rgba(230,50,10,0.7)]",
        tone === "white" &&
          "bg-white text-[#0046C8] shadow-[0_14px_30px_-14px_rgba(0,20,50,0.5)]",
        className,
      )}
    >
      <span className="leading-tight">
        <span className="block text-[17px] font-black tracking-[0.04em]">
          {label}
        </span>
        {sub ? (
          <span
            className={cn(
              "mt-0.5 block text-[11px] font-bold",
              tone === "white" ? "text-[#64788C]" : "text-white/85",
            )}
          >
            {sub}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-lg transition-transform duration-300 group-hover:translate-x-0.5",
          tone === "white" ? "bg-[#0046C8] text-white" : "bg-white",
          tone === "blue" && "text-[#0046C8]",
          tone === "accent" && "text-[#E6320A]",
        )}
      >
        →
      </span>
    </a>
  );
}

/** salescore風の見出し: 大きな英字 + 日本語を横並び + 下線(左側だけ青) */
function Heading({
  en,
  children,
  dark,
}: {
  en: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal variant="up">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-5">
        <p
          className={cn(
            "font-display text-[clamp(2.6rem,6vw,4rem)] font-black uppercase leading-none tracking-[0.02em]",
            dark ? "text-white" : "text-[#0046C8]",
          )}
        >
          {en}
        </p>
        <h2
          className={cn(
            "pb-1 text-lg font-bold tracking-[0.06em] md:text-xl",
            dark ? "text-white" : "text-[#001432]",
          )}
        >
          {children}
        </h2>
      </div>
      <div
        className={cn(
          "relative mt-5 h-px",
          dark ? "bg-white/25" : "bg-[#D6DEEB]",
        )}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 w-56 -translate-y-px border-b-2",
            dark ? "border-white" : "border-[#0046C8]",
          )}
        />
      </div>
    </Reveal>
  );
}

/** 背景に敷く大きな英字の透かし */
function Watermark({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none font-display text-[clamp(5rem,14vw,12rem)] font-black uppercase leading-none tracking-tight text-[#0046C8]/[0.05]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** ファーストビュー右側: 経営ダッシュボード風のビジュアル(イメージ) */
function DashboardVisual() {
  const bars = [28, 36, 44, 58, 76, 100];
  return (
    <div className="relative">
      {/* ブラウザ風のウィンドウ */}
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_-40px_rgba(0,20,50,0.55)] ring-1 ring-[#E4E8F2]">
        <div className="flex items-center gap-2 border-b border-[#E4E8F2] bg-[#F8FAFE] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5028]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC53D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2BC48A]" />
          <span className="ml-3 h-5 flex-1 rounded bg-white ring-1 ring-[#E4E8F2]" />
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] text-[#001432]">
          {/* サイドメニュー */}
          <div className="space-y-3 border-r border-[#E4E8F2] bg-[#F8FAFE] p-3">
            {["戦略", "計画", "組織", "KPI", "開拓"].map((m, i) => (
              <p
                key={m}
                className={cn(
                  "rounded-md px-2 py-1.5 text-center text-[10px] font-bold",
                  i === 3 ? "bg-[#0046C8] text-white" : "text-[#64788C]",
                )}
              >
                {m}
              </p>
            ))}
          </div>
          <div className="p-4 md:p-5">
            <p className="text-xs font-bold">事業成長ダッシュボード</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { k: "成長スピード", v: "×3", c: "text-[#0046C8]" },
                { k: "新規アライアンス", v: "UP", c: "text-[#E6320A]" },
                { k: "商談パイプライン", v: "UP", c: "text-[#2BA36B]" },
              ].map((x) => (
                <div key={x.k} className="rounded-lg bg-[#F2F8FC] px-2 py-2">
                  <p className="text-[9px] font-bold text-[#64788C]">{x.k}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-lg font-black leading-none",
                      x.c,
                    )}
                  >
                    {x.v}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex h-28 items-end gap-2 border-b border-[#D6DEEB] px-1">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex-1 rounded-t",
                    i === bars.length - 1 ? "bg-[#0046C8]" : "bg-[#C9DAF7]",
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-1.5 flex justify-between px-1 text-[9px] font-bold text-[#64788C]">
              <span>開始</span>
              <span>6カ月</span>
              <span>1年</span>
            </div>
          </div>
        </div>
      </div>

      {/* 参画したプロのカード */}
      <div className="absolute -bottom-8 -left-4 w-56 animate-float-y rounded-xl bg-white p-4 shadow-[0_24px_50px_-24px_rgba(0,20,50,0.6)] ring-1 ring-[#E4E8F2] md:-left-10">
        <p className="text-[10px] font-bold tracking-[0.15em] text-[#0046C8]">
          NEW MEMBER
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-full bg-[#E4ECFA]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill={BLUE}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c.8-4.4 4-7 8-7s7.2 2.6 8 7z" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black text-[#001432]">元メガバンクCOO</p>
            <p className="text-[11px] font-bold text-[#64788C]">
              COOとして参画しました
            </p>
          </div>
        </div>
      </div>
      <div className="absolute -right-3 -top-5 animate-float-y rounded-full bg-[#001432] px-4 py-2 text-xs font-bold text-white shadow-lg [animation-delay:-1.5s] md:-right-6">
        3年の成長を、<span className="text-[#7FB0FF]">1年</span>で
      </div>
    </div>
  );
}

/** 中央に「顧問・COO」、周りに担う領域を配した円形の図 */
function DomainCircle() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div
        aria-hidden="true"
        className="absolute inset-[13%] rounded-full border border-dashed border-white/40"
      />
      <div className="absolute left-1/2 top-1/2 grid h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-center text-[#001432] shadow-[0_0_60px_-10px_rgba(127,176,255,0.8)]">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#0046C8]">
            ADVISOR
          </p>
          <p className="mt-1 text-base font-black leading-tight md:text-lg">
            顧問
            <br />
            COO
          </p>
        </div>
      </div>
      {domains.map((d, i) => {
        const a = ((-90 + (360 / domains.length) * i) * Math.PI) / 180;
        const x = 50 + 37 * Math.cos(a);
        const y = 50 + 37 * Math.sin(a);
        return (
          <span
            key={d}
            className="absolute grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-[#001432]/70 text-center text-[11px] font-bold leading-tight text-white backdrop-blur-sm md:text-xs"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {d}
          </span>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- ページ */

export default function AdvisoryPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");

  return (
    <div className="bg-white font-medium text-[#001432] [&_em]:not-italic [&_em]:text-[#0046C8]">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "経営顧問事業",
              url: localePath("/services/sales", locale),
            },
            { name: "顧問・COO紹介", url: localePath(PATH, locale) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "顧問・COO紹介",
            serviceType: "経営顧問・COO紹介",
            description: pageMeta.advisory.description,
            url: `${base}${localePath(PATH, locale)}`,
            areaServed: { "@type": "Country", name: "日本" },
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType: "ベンチャー企業・スタートアップ・新規事業",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />

      <LpHeader
        accent="blue"
        ctaHref={`#${FORM_ID}`}
        ctaLabel="無料相談を申し込む"
        items={[
          { href: "#problem", label: "課題" },
          { href: "#about", label: "サービス概要" },
          { href: "#reason", label: "選ばれる理由" },
          { href: "#professionals", label: "プロフェッショナル" },
          { href: "#flow", label: "ご支援の流れ" },
          { href: "#faq", label: "よくある質問" },
        ]}
      />

      {/* 画面右端に固定の相談ボタン(PC) */}
      <a
        href={`#${FORM_ID}`}
        className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-l-xl bg-[#0046C8] px-3 py-5 text-white shadow-[0_10px_30px_-10px_rgba(0,70,200,0.8)] transition hover:bg-[#0037B9] lg:flex"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M4 5h16v11H9l-5 4z" strokeLinejoin="round" />
        </svg>
        <span className="text-sm font-bold [writing-mode:vertical-rl]">
          無料相談
        </span>
      </a>

      {/* ファーストビュー */}
      <section className="relative isolate overflow-hidden bg-[#F8FAFE]">
        {/* 斜めの光の帯と細いグリッド */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[46rem] w-[46rem] rotate-12 bg-[linear-gradient(135deg,#E4ECFA_0%,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(to_right,#E4E8F2_1px,transparent_1px),linear-gradient(to_bottom,#E4E8F2_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_left,black,transparent_75%)]"
        />
        <Container className="grid items-center gap-16 pb-24 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="animate-fade-up text-sm font-bold tracking-[0.12em] text-[#0046C8]">
              経営顧問・COO紹介
            </p>
            <h1
              className="mt-4 animate-fade-up text-[clamp(2.3rem,5.4vw,3.9rem)] font-bold leading-[1.3] tracking-[0.06em] [word-break:auto-phrase]"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-[#0046C8]">3年</span>の成長を、
              <br />
              <span className="text-[#0046C8]">1年</span>で実現する
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-[15px] leading-[2] text-[#001432]/85"
              style={{ animationDelay: "0.25s" }}
            >
              元上場企業役員や元メガバンクCOOなど、各業界のプロが経営に伴走。
              <br className="hidden md:block" />
              販路開拓・アライアンス開拓・つながりの紹介まで、
              <br className="hidden md:block" />
              ベンチャー企業や新規事業の
              <strong className="font-bold text-[#001432]">早期グロース</strong>
              を支えます。
            </p>
            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.4s" }}
            >
              <Cta label="無料相談" sub="まずはお話をお聞かせください" />
              <Cta
                label="選ばれる理由"
                sub="4つのポイントを見る"
                href="#reason"
                tone="accent"
              />
            </div>
          </div>
          <div
            className="animate-fade-up px-6 sm:px-10 lg:px-0"
            style={{ animationDelay: "0.3s" }}
          >
            <DashboardVisual />
          </div>
        </Container>
      </section>

      {/* 実績のある人材 */}
      <section className="border-y border-[#E4E8F2] bg-white py-10">
        <Container>
          <p className="text-center text-sm font-bold text-[#001432]">
            各業界で
            <span className="text-[#0046C8]">実績を持つプロフェッショナル</span>
            が参画します
          </p>
          <ul className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { n: "元上場企業", s: "役員" },
              { n: "元メガバンク", s: "COO" },
              { n: "各業界の", s: "プロ" },
            ].map((x) => (
              <li
                key={x.n}
                className="flex items-baseline justify-center gap-1.5 border-[#E4E8F2] sm:border-l sm:first:border-l-0"
              >
                <span className="text-sm font-bold text-[#64788C]">{x.n}</span>
                <span className="text-2xl font-black text-[#0046C8] md:text-3xl">
                  {x.s}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 課題 + 解決(濃紺) */}
      <section
        id="problem"
        className="relative isolate scroll-mt-28 overflow-hidden pt-20 md:pt-28"
      >
        {/* 下側の濃紺の斜めの面 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[22rem] -z-10 bg-[linear-gradient(160deg,#0B2A6B_0%,#001432_55%)] [clip-path:polygon(0_12%,100%_0,100%_100%,0_100%)] md:top-[26rem]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[22rem] -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] md:top-[26rem]"
        />
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-sm font-bold tracking-[0.1em] text-[#0046C8]">
              PROBLEM
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[0.04em]">
              こんな<em>課題</em>はありませんか？
            </h2>
          </Reveal>
          <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {problems.map((p, i) => (
              <Reveal key={i} variant="up" delay={i * 80} className="h-full">
                <li className="relative flex h-full flex-col items-center rounded-lg bg-[#F2F8FC] px-3 pb-6 pt-10 text-center shadow-[0_18px_36px_-24px_rgba(0,20,50,0.55)] ring-1 ring-white">
                  {/* 番号の吹き出し */}
                  <span className="absolute -top-6 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-[#0046C8] text-white shadow-md">
                    <span className="text-center leading-none">
                      <span className="block text-[9px] font-bold">課題</span>
                      <span className="block text-2xl font-black">{i + 1}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#0046C8]"
                    />
                  </span>
                  <Image
                    src={p.image}
                    alt=""
                    width={400}
                    height={400}
                    className="h-24 w-auto object-contain md:h-28"
                  />
                  <p className="mt-4 text-[15px] font-bold leading-[1.6] md:text-base">
                    {p.text}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-4 text-[#9CB3D8]"
                  >
                    ︾
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* 解決: 図 + コピー */}
          <div
            id="about"
            className="grid scroll-mt-28 items-center gap-12 py-20 text-white md:py-28 lg:grid-cols-2"
          >
            <Reveal variant="scale">
              <DomainCircle />
            </Reveal>
            <Reveal variant="up">
              <p className="text-xl font-bold">顧問・COO紹介は</p>
              <p className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.55] [word-break:auto-phrase]">
                経営のプロが
                <span className="text-[#7FB0FF]">戦略から実行まで</span>伴走し、
                <span className="text-[#7FB0FF]">事業の成長を加速</span>する
              </p>
              <p className="mt-3 text-xl font-bold">ことで課題を解決します</p>
              <span
                aria-hidden="true"
                className="mt-7 block h-0.5 w-14 bg-white"
              />
              <p className="mt-7 text-[15px] leading-[2.05] text-white/85">
                御社の課題に合った経営のプロフェッショナルを、顧問またはCOO（最高執行責任者）としてご紹介します。業界のつながりを活かして販路とアライアンスを広げ、組織とKPIを動かして計画をやり切ります。
              </p>
              <p className="mt-4 text-[15px] leading-[2.05] text-white/85">
                正社員として採用するよりも早く、必要な期間だけ経営の力を補えます。
              </p>
            </Reveal>
          </div>
        </Container>

        {/* 2分割のCTA帯 */}
        <div className="grid text-white md:grid-cols-2">
          <div className="flex flex-col items-center gap-4 bg-[#002A8C] px-6 py-10">
            <p className="text-sm font-bold">まずは話を聞いてみたい方は</p>
            <Cta label="無料相談" sub="オンラインで30分から" tone="accent" />
          </div>
          <div className="flex flex-col items-center gap-4 bg-[#0046C8] px-6 py-10">
            <p className="text-sm font-bold">ご支援の進め方を知りたい方は</p>
            <Cta
              label="ご支援の流れ"
              sub="4つのステップを見る"
              href="#flow"
              tone="white"
            />
          </div>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section
        id="reason"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#F2F8FC] py-20 md:py-28"
      >
        <Watermark className="-left-4 top-6">Reason</Watermark>
        <Container>
          <Heading en="Reason">顧問・COO紹介が選ばれる4つの理由</Heading>
          <p className="mt-6 max-w-3xl text-[15px] leading-[2] text-[#001432]/80">
            成長を加速させるには、戦略を描くだけでなく、つながりを活かして実行までやり切ることが欠かせません。顧問・COO紹介は、その両方をプロの力で支えます。
          </p>
          <div className="mt-12 space-y-6">
            {points.map((pt, i) => (
              <Reveal key={pt.label} variant="up">
                <article
                  className={cn(
                    "relative grid overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-34px_rgba(0,20,50,0.45)]",
                    i % 2 === 1
                      ? "md:grid-cols-[1fr_22rem]"
                      : "md:grid-cols-[22rem_1fr]",
                  )}
                >
                  <div
                    className={cn(
                      "grid place-items-center bg-[#E9F0FB] p-8",
                      i % 2 === 1 && "md:order-2",
                    )}
                  >
                    <Image
                      src={pt.image}
                      alt=""
                      width={600}
                      height={560}
                      className="h-44 w-auto object-contain md:h-52"
                    />
                  </div>
                  <div className="relative p-7 md:p-10">
                    <p className="absolute right-6 top-4 text-right font-display font-black leading-none text-[#0046C8] md:right-10 md:top-6">
                      <span className="block text-sm tracking-[0.12em] md:text-lg">
                        POINT
                      </span>
                      <span className="block text-5xl md:text-7xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <p className="text-xs font-bold tracking-[0.2em] text-[#64788C]">
                      {pt.label}
                    </p>
                    <h3 className="mt-3 pr-20 text-[clamp(1.3rem,2.4vw,1.75rem)] font-bold leading-[1.5] [word-break:auto-phrase] md:pr-28">
                      {pt.lead}
                      <br />
                      <em>{pt.em}</em>
                    </h3>
                    <p className="mt-4 text-[15px] leading-[2] text-[#001432]/80">
                      {pt.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* プロフェッショナル */}
      <section
        id="professionals"
        className="relative isolate scroll-mt-28 overflow-hidden py-20 md:py-28"
      >
        <Watermark className="-right-6 top-10">Members</Watermark>
        <Container>
          <Heading en="Professionals">ご紹介するプロフェッショナル</Heading>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {professionals.map((p, i) => (
              <Reveal
                key={p.role}
                variant="up"
                delay={i * 100}
                className="h-full"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-34px_rgba(0,20,50,0.5)] ring-1 ring-[#E4E8F2]">
                  <div className="relative grid h-40 place-items-center bg-[linear-gradient(135deg,#0037B9,#0A6EF0)]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:28px_28px]"
                    />
                    <span
                      className="relative grid h-20 w-20 place-items-center rounded-full bg-white/95"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-12 w-12"
                        fill={BLUE}
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c.8-4.4 4-7 8-7s7.2 2.6 8 7z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-[0.2em] text-white/80">
                      PROFESSIONAL {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="text-xl font-black">{p.role}</h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded border border-[#0046C8]/30 px-2 py-0.5 text-[11px] font-bold text-[#0046C8]"
                        >
                          #{t}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[15px] leading-[1.95] text-[#001432]/80">
                      {p.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#64788C]">
            ※ ご紹介する人材の一例です。御社の課題と業界に合わせてご提案します。
          </p>

          {/* 対象企業 */}
          <Reveal
            variant="up"
            className="mt-16 rounded-xl bg-[#001432] p-7 text-white md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:items-center">
              <p className="text-xl font-bold leading-snug">
                こんな企業に
                <br className="hidden md:block" />
                おすすめです
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {targets.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-lg bg-white/10 px-4 py-3 text-[15px] font-bold leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0A6EF0] text-[11px]"
                    >
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ご支援の流れ */}
      <section
        id="flow"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#F2F8FC] py-20 md:py-28"
      >
        <Watermark className="-left-4 top-6">Flow</Watermark>
        <Container>
          <Heading en="Flow">ご支援の流れ</Heading>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {flow.map((f, i) => (
              <Reveal
                key={f.title}
                variant="up"
                delay={i * 100}
                className="h-full"
              >
                <li className="relative h-full rounded-xl bg-white p-6 shadow-[0_20px_40px_-32px_rgba(0,20,50,0.5)]">
                  <p className="font-display text-4xl font-black leading-none text-[#0046C8]/20">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-xs font-black tracking-[0.2em] text-[#0046C8]">
                    STEP {i + 1}
                  </p>
                  <p className="mt-1 text-lg font-bold">{f.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#001432]/70">
                    {f.text}
                  </p>
                  {i < flow.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-[#0046C8] text-xs text-white md:grid"
                    >
                      →
                    </span>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* よくある質問 */}
      <section id="faq" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading en="FAQ">よくある質問</Heading>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-[#E4E8F2] bg-white open:shadow-[0_20px_40px_-32px_rgba(0,20,50,0.5)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0046C8] text-sm font-black text-white">
                    Q
                  </span>
                  <span className="flex-1 text-[15px] font-bold md:text-base">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xl text-[#0046C8] transition-transform group-open:rotate-45"
                  >
                    ＋
                  </span>
                </summary>
                <div className="flex gap-4 border-t border-[#E4E8F2] px-5 py-5 md:px-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E4ECFA] text-sm font-black text-[#0046C8]">
                    A
                  </span>
                  <p className="pt-1.5 text-[15px] leading-relaxed text-[#001432]/80">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 2分割のCTA帯 */}
      <section className="grid text-white md:grid-cols-2">
        <div className="flex flex-col items-center gap-4 bg-[#002A8C] px-6 py-12">
          <p className="text-sm font-bold">御社に合うプロを知りたい方は</p>
          <Cta
            label="無料相談"
            sub="まずはお話をお聞かせください"
            tone="accent"
          />
        </div>
        <div className="flex flex-col items-center gap-4 bg-[#0046C8] px-6 py-12">
          <p className="text-sm font-bold">新規開拓も一緒に強化したい方は</p>
          <Cta
            label="アポコミを見る"
            sub="インサイドセールス代行"
            href={localePath("/services/apokomi", locale)}
            tone="white"
          />
        </div>
      </section>

      {/* 無料相談フォーム */}
      <section
        id={FORM_ID}
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#F2F8FC] py-20 md:py-28"
      >
        <Watermark className="-right-6 top-6">Contact</Watermark>
        <Container>
          <Heading en="Contact">顧問・COO紹介の無料相談</Heading>
          <Reveal
            variant="up"
            delay={150}
            className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-6 shadow-[0_30px_60px_-40px_rgba(0,20,50,0.45)] md:p-10"
          >
            <ServiceLeadForm
              service="advisory"
              accent="blue"
              privacyHref={localePath("/privacy", locale)}
              topics={[
                "販路開拓",
                "アライアンス開拓",
                "つながりの紹介",
                "経営への伴走（COO）",
                "新規事業の立ち上げ",
                "その他",
              ]}
            />
          </Reveal>
          <p className="mt-10 text-center text-sm text-[#64788C]">
            運営会社：{site.legalName}
          </p>
        </Container>
      </section>
    </div>
  );
}
