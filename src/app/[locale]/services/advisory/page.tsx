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

const problems = [
  "事業は伸びているが、次の成長を担う経営人材がいない",
  "大手企業との取引や提携の糸口がつかめない",
  "新規事業を立ち上げたが、販路が広がらない",
  "経営の意思決定を相談できる相手がいない",
  "フルタイムの役員を採用するのは、まだ早い",
];

const points = [
  {
    title: (
      <>
        業界のつながりで、
        <span className="text-[#0046C8]">販路を一気に広げる</span>
      </>
    ),
    label: "販路開拓",
    text: "顧問・COOが持つ業界のつながりを活かして、見込み顧客や代理店へのルートをつくります。自社だけでは届かなかった企業との商談につなげます。",
    image: "/illustrations/ld-752-blue.webp",
  },
  {
    title: (
      <>
        大手企業・事業会社との
        <span className="text-[#0046C8]">アライアンスをつくる</span>
      </>
    ),
    label: "アライアンス開拓",
    text: "大手企業や事業会社との提携・協業の機会をつくります。事業を一気に広げるパートナーとの関係を築き、成長の速度を上げます。",
    image: "/illustrations/ld-1498-blue.webp",
  },
  {
    title: (
      <>
        成長に必要な人と、<span className="text-[#0046C8]">つながる</span>
      </>
    ),
    label: "つながりの紹介",
    text: "キーパーソン、金融機関、専門家など、次の成長に必要な人との出会いをつなぎます。プロの信用があるからこそ開く扉があります。",
    image: "/illustrations/ld-881-blue.webp",
  },
  {
    title: (
      <>
        COOとして、<span className="text-[#0046C8]">経営の実行を担う</span>
      </>
    ),
    label: "経営への伴走",
    text: "事業計画、組織づくり、KPIの管理まで踏み込み、経営の一員として実行を推進します。戦略を「絵に描いた餅」で終わらせません。",
    image: "/illustrations/ld-736-blue.webp",
  },
];

const professionals = [
  {
    role: "元上場企業 役員",
    area: "経営戦略・組織づくり・IPO準備",
    text: "上場企業の経営に携わった経験から、成長フェーズに合った戦略と組織づくりを支援します。",
  },
  {
    role: "元メガバンク COO",
    area: "事業計画・財務・金融機関とのつながり",
    text: "大組織の執行を担った経験と金融のネットワークで、事業計画の実行と資金面の打ち手を支えます。",
  },
  {
    role: "各業界のプロフェッショナル",
    area: "IT・SaaS／製造／人材など",
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

function Cta({
  label = "無料相談を申し込む",
  variant = "solid",
  href = `#${FORM_ID}`,
}: {
  label?: string;
  variant?: "solid" | "outline" | "white";
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-14 items-center justify-center gap-3 rounded-full px-8 text-[15px] font-bold transition hover:-translate-y-0.5 md:h-16 md:px-10",
        variant === "solid" &&
          "bg-[#0046C8] text-white shadow-[0_16px_36px_-16px_rgba(0,70,200,0.9)] hover:bg-[#0037B9]",
        variant === "outline" &&
          "border-2 border-[#0046C8] bg-white text-[#0046C8] hover:bg-[#F2F8FC]",
        variant === "white" && "bg-white text-[#0046C8] hover:bg-[#F2F8FC]",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

/** salescore風の見出し: 大きな英字 + 日本語 */
function Heading({
  en,
  children,
  dark,
  align = "center",
}: {
  en: string;
  children: ReactNode;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <Reveal variant="up" className={align === "center" ? "text-center" : ""}>
      <p
        className={cn(
          "text-[clamp(2rem,4.4vw,3.25rem)] font-black uppercase leading-none tracking-[0.04em]",
          dark ? "text-white" : "text-[#0046C8]",
        )}
      >
        {en}
      </p>
      <h2
        className={cn(
          "mt-3 text-base font-bold tracking-[0.08em] md:text-lg",
          dark ? "text-white/80" : "text-[#001432]",
        )}
      >
        {children}
      </h2>
    </Reveal>
  );
}

/** 3年かかる成長を1年で実現するイメージのグラフ(ダッシュボード風のカード) */
function GrowthCard() {
  return (
    <div className="relative rounded-2xl bg-white p-5 shadow-[0_40px_80px_-40px_rgba(0,20,50,0.45)] ring-1 ring-[#E4E8F2] md:p-7">
      <div className="flex items-center justify-between">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5028]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC53D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2BC48A]" />
        </span>
        <span className="text-xs font-bold tracking-[0.15em] text-[#64788C]">
          GROWTH
        </span>
      </div>
      <p className="mt-4 text-sm font-bold text-[#001432]">事業の成長カーブ</p>
      <svg
        viewBox="0 0 400 230"
        className="mt-3 h-auto w-full"
        role="img"
        aria-label="プロの伴走で、3年かかる成長を1年で実現するイメージのグラフ"
      >
        {[40, 90, 140, 190].map((y) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2="390"
            y2={y}
            stroke="#E4E8F2"
            strokeWidth="1"
          />
        ))}
        <line
          x1="40"
          y1="200"
          x2="390"
          y2="200"
          stroke="#B8C3D1"
          strokeWidth="1.5"
        />
        {["1年", "2年", "3年"].map((l, i) => (
          <text
            key={l}
            x={150 + i * 115}
            y="220"
            fontSize="12"
            fill="#64788C"
            textAnchor="middle"
          >
            {l}
          </text>
        ))}
        {/* 自社だけの成長(3年) */}
        <path
          d="M40 195 C 160 185, 270 120, 380 50"
          fill="none"
          stroke="#B8C3D1"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        {/* プロが伴走した成長(1年) */}
        <path
          d="M40 195 C 90 180, 120 110, 155 50 L 380 40"
          fill="none"
          stroke="#0046C8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="155" cy="50" r="7" fill="#0046C8" />
        <circle cx="155" cy="50" r="13" fill="#0046C8" opacity="0.15" />
        <line
          x1="155"
          y1="50"
          x2="155"
          y2="200"
          stroke="#0046C8"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      </svg>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold">
        <span className="flex items-center gap-2 text-[#0046C8]">
          <span className="h-1 w-6 rounded-full bg-[#0046C8]" />
          プロが伴走：1年
        </span>
        <span className="flex items-center gap-2 text-[#64788C]">
          <span className="h-1 w-6 rounded-full bg-[#B8C3D1]" />
          自社だけ：3年
        </span>
      </div>
      {/* 浮かぶバッジ */}
      <div className="absolute -left-4 -top-5 animate-float-y rounded-xl bg-[#001432] px-4 py-2.5 text-white shadow-lg md:-left-8">
        <p className="text-[10px] font-bold tracking-[0.2em] text-white/60">
          SPEED
        </p>
        <p className="text-lg font-black leading-tight">
          ×<span className="text-2xl">3</span> のスピード
        </p>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#E4ECFA" />
      <circle cx="32" cy="25" r="11" fill="#0046C8" opacity="0.85" />
      <path
        d="M12 56c2-11 10-17 20-17s18 6 20 17"
        fill="#0046C8"
        opacity="0.85"
      />
    </svg>
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
    <div className="bg-white font-medium text-[#001432]">
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
          { href: "#point", label: "選ばれる理由" },
          { href: "#professionals", label: "プロフェッショナル" },
          { href: "#flow", label: "ご支援の流れ" },
          { href: "#faq", label: "よくある質問" },
          { href: `#${FORM_ID}`, label: "無料相談" },
        ]}
      />

      {/* ファーストビュー */}
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,#FFFFFF_35%,#F2F8FC_35%,#F2F8FC_62%,#E4ECFA_62%)] opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,#E4E8F2_1px,transparent_1px),linear-gradient(to_bottom,#E4E8F2_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        />
        <Container className="grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-[#001432] px-4 py-1.5 text-xs font-bold tracking-[0.15em] text-white">
              EXECUTIVE ADVISOR / COO
            </p>
            <h1 className="mt-6">
              <span
                className="block animate-fade-up text-lg font-bold tracking-[0.1em] text-[#0046C8] md:text-xl"
                style={{ animationDelay: "0.1s" }}
              >
                経営顧問・COO紹介
              </span>
              <span
                className="mt-3 block animate-fade-up text-[clamp(2.4rem,5.6vw,4rem)] font-bold leading-[1.25] tracking-[0.04em] [word-break:auto-phrase]"
                style={{ animationDelay: "0.2s" }}
              >
                3年の成長を、
                <br />
                <span className="text-[#0046C8]">1年</span>で実現する。
              </span>
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-[15px] leading-[2] text-[#001432]/80 md:text-base"
              style={{ animationDelay: "0.35s" }}
            >
              各業界のプロが、御社の経営に伴走します。元上場企業役員や元メガバンクCOOなど、実績あるプロフェッショナルが、販路開拓・アライアンス開拓・つながりの紹介まで、ベンチャー企業や新規事業の早期グロースを支えます。
            </p>
            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.5s" }}
            >
              <Cta />
              <Cta label="選ばれる理由を見る" variant="outline" href="#point" />
            </div>
          </div>
          <div
            className="animate-fade-up px-4 sm:px-8 lg:px-0"
            style={{ animationDelay: "0.3s" }}
          >
            <GrowthCard />
          </div>
        </Container>
      </section>

      {/* 実績のある人材(帯) */}
      <section className="bg-[#001432] py-8 text-white">
        <Container>
          <ul className="grid gap-4 text-center sm:grid-cols-3">
            {[
              "元上場企業役員",
              "元メガバンクCOO",
              "各業界のプロフェッショナル",
            ].map((t) => (
              <li
                key={t}
                className="flex items-center justify-center gap-3 text-base font-bold md:text-lg"
              >
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 place-items-center rounded-full bg-[#0046C8] text-xs"
                >
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 課題 */}
      <section
        id="problem"
        className="scroll-mt-28 bg-[#F2F8FC] py-20 md:py-28"
      >
        <Container>
          <Heading en="Problem">こんな課題はありませんか？</Heading>
          <ul className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {problems.map((p, i) => (
              <Reveal key={p} variant="up" delay={i * 80} className="h-full">
                <li className="flex h-full flex-col items-center rounded-2xl bg-white px-5 pb-7 pt-6 text-center shadow-[0_20px_40px_-30px_rgba(0,20,50,0.4)]">
                  <span className="rounded-full bg-[#0046C8] px-4 py-1 text-xs font-bold text-white">
                    課題 {i + 1}
                  </span>
                  <p className="mt-5 text-[15px] font-bold leading-[1.8] [word-break:auto-phrase]">
                    {p}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* サービス概要(濃紺) */}
      <section
        id="about"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#001432] py-20 text-white md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#0046C8]/40 blur-[120px]"
        />
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Heading en="About" dark align="left">
              顧問・COO紹介とは
            </Heading>
            <Reveal variant="up">
              <p className="mt-8 text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-[1.6] [word-break:auto-phrase]">
                経営のプロが、
                <span className="text-[#7FB0FF]">
                  御社のチームに加わります。
                </span>
              </p>
              <p className="mt-6 text-[15px] leading-[2.05] text-white/80 md:text-base">
                顧問・COO紹介は、御社の課題に合った経営のプロフェッショナルを、顧問またはCOO（最高執行責任者）としてご紹介するサービスです。戦略づくりから実行まで伴走し、業界のつながりを活かして販路とアライアンスを広げます。
              </p>
              <p className="mt-4 text-[15px] leading-[2.05] text-white/80 md:text-base">
                正社員として採用するよりも早く、必要な期間だけ経営の力を補えます。
              </p>
            </Reveal>
          </div>
          <Reveal
            variant="up"
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {[
              { k: "戦略", v: "成長フェーズに合った経営戦略と事業計画を描く" },
              { k: "実行", v: "COOとして組織とKPIを動かし、計画をやり切る" },
              {
                k: "つながり",
                v: "販路・アライアンス・キーパーソンへの扉を開く",
              },
            ].map((x) => (
              <div
                key={x.k}
                className="flex items-center gap-5 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
              >
                <span className="grid h-14 w-[4.5rem] shrink-0 place-items-center rounded-xl bg-[#0046C8] text-sm font-black">
                  {x.k}
                </span>
                <p className="text-[15px] font-bold leading-relaxed text-white/90">
                  {x.v}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* 選ばれる理由(POINT) */}
      <section id="point" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading en="Reason">顧問・COO紹介が選ばれる4つの理由</Heading>
          <div className="mx-auto mt-14 max-w-6xl space-y-10 md:space-y-14">
            {points.map((pt, i) => (
              <Reveal key={pt.label} variant="up">
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  <div className={cn(i % 2 === 1 && "md:order-2")}>
                    <p className="flex items-end gap-3 text-[#0046C8]">
                      <span className="text-sm font-black tracking-[0.15em]">
                        POINT
                      </span>
                      <span className="text-6xl font-black leading-none md:text-7xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <p className="mt-4 text-xs font-bold tracking-[0.2em] text-[#64788C]">
                      {pt.label}
                    </p>
                    <h3 className="mt-2 text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold leading-[1.5] [word-break:auto-phrase]">
                      {pt.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[2] text-[#001432]/80">
                      {pt.text}
                    </p>
                  </div>
                  <div className="grid place-items-center rounded-3xl bg-[#F2F8FC] p-8 md:p-10">
                    <Image
                      src={pt.image}
                      alt=""
                      width={600}
                      height={560}
                      className="h-48 w-auto object-contain md:h-60"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* プロフェッショナル */}
      <section
        id="professionals"
        className="scroll-mt-28 bg-[#F2F8FC] py-20 md:py-28"
      >
        <Container>
          <Heading en="Professionals">ご紹介するプロフェッショナル</Heading>
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
            {professionals.map((p, i) => (
              <Reveal
                key={p.role}
                variant="up"
                delay={i * 100}
                className="h-full"
              >
                <article className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-[0_20px_40px_-30px_rgba(0,20,50,0.4)] md:p-8">
                  <div className="flex items-center gap-4">
                    <Avatar />
                    <div>
                      <p className="text-lg font-black leading-snug">
                        {p.role}
                      </p>
                      <p className="mt-1 text-xs font-bold text-[#0046C8]">
                        {p.area}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 border-t border-[#E4E8F2] pt-5 text-[15px] leading-[1.95] text-[#001432]/80">
                    {p.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[#64788C]">
            ※ ご紹介する人材の一例です。御社の課題と業界に合わせてご提案します。
          </p>
        </Container>
      </section>

      {/* 対象企業 */}
      <section className="py-20 md:py-28">
        <Container>
          <Heading en="For">こんな企業におすすめです</Heading>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {targets.map((t, i) => (
              <Reveal key={t} variant="up" delay={i * 70}>
                <li className="flex h-full items-start gap-3 rounded-xl border border-[#E4E8F2] bg-white px-5 py-4 text-base font-bold leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0046C8] text-[11px] text-white"
                  >
                    ✓
                  </span>
                  {t}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ご支援の流れ */}
      <section id="flow" className="scroll-mt-28 bg-[#F2F8FC] py-20 md:py-28">
        <Container>
          <Heading en="Flow">ご支援の流れ</Heading>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">
            {flow.map((f, i) => (
              <Reveal
                key={f.title}
                variant="up"
                delay={i * 100}
                className="h-full"
              >
                <li className="relative h-full rounded-2xl bg-white p-6">
                  <p className="text-xs font-black tracking-[0.2em] text-[#0046C8]">
                    STEP {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-base font-bold">{f.title}</p>
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
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-[#E4E8F2] bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-black text-[#0046C8]">Q</span>
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
                  <span className="text-lg font-black text-[#64788C]">A</span>
                  <p className="pt-0.5 text-[15px] leading-relaxed text-[#001432]/80">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA帯 */}
      <section className="bg-[linear-gradient(110deg,#0046C8,#0A6EF0)] py-14 text-white md:py-16">
        <Container className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-white/70">
              CONTACT
            </p>
            <p className="mt-2 text-xl font-bold md:text-2xl">
              まずは無料相談で、御社の成長プランをお聞かせください。
            </p>
          </div>
          <Cta variant="white" />
        </Container>
      </section>

      {/* 無料相談フォーム */}
      <section
        id={FORM_ID}
        className="scroll-mt-28 bg-[#F2F8FC] py-20 md:py-28"
      >
        <Container>
          <Heading en="Contact">顧問・COO紹介の無料相談</Heading>
          <Reveal
            variant="up"
            delay={150}
            className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-6 shadow-[0_30px_60px_-40px_rgba(0,20,50,0.45)] md:p-10"
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
