import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { JsonLd } from "@/components/seo/JsonLd";
import { ApokomiLeadForm } from "@/components/contact/ApokomiLeadForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PATH = "/services/apokomi";
const FORM_ID = "apokomi-form";
const CTA_LABEL = "無料相談・見積もり依頼";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    ...pageMeta.apokomi,
    path: PATH,
    locale: params.locale,
  });
}

/* ------------------------------------------------------------------ データ */

const channels = [
  {
    name: "テレアポ",
    en: "TELE",
    text: "即効性が高く、アポイントの量を確保しやすいチャネル。決裁者や担当者の特定にも使います",
  },
  {
    name: "問い合わせフォーム",
    en: "FORM",
    text: "低コストで幅広い企業にアプローチできます。検証段階で母数を広げたいときに有効です",
  },
  {
    name: "メール",
    en: "MAIL",
    text: "接点を持った企業への追客やフォローに。日程調整までスムーズにつなげます",
  },
  {
    name: "手紙BDR",
    en: "LETTER",
    text: "大手企業や決裁者に、印象に残るアプローチを。狙った企業を確実に開拓したいときに",
  },
  {
    name: "SNS（DM）",
    en: "SNS",
    text: "経営者や担当者個人に直接届くチャネル。スタートアップやIT企業の開拓に",
  },
];

const worries = [
  {
    title: "アポイントを大量に獲得したい",
    items: [
      "売れる商材はあるのに、商談の数が足りない",
      "社内に架電の人手がなく、新規開拓が後回しになっている",
      "テレアポだけでは母数が頭打ちになっている",
    ],
  },
  {
    title: "勝ち筋が決まっておらず、複数チャネルで試したい",
    items: [
      "新規事業・新商材で、どのターゲットに刺さるかまだ分からない",
      "テレアポ代行やフォーム営業代行に頼んだが、成果が出なかった",
      "どのチャネルから手をつけるべきか判断できない",
    ],
  },
];

const features = [
  {
    no: "01",
    title: "準備から実行まで、まるごとお任せ",
    text: "リスト作成、トークスクリプト、各チャネルの文面づくりから実行・改善まで一括で担当します。御社は獲得したアポイントでの商談に集中できます。",
  },
  {
    no: "02",
    title: "5つのチャネルを総動員して開拓",
    text: "テレアポ・問い合わせフォーム・メール・手紙BDR・SNS（DM）を組み合わせ、1社あたりの接点を最大化します。「手紙を送ってから架電」「フォームの反応先へ即架電」など、チャネルを掛け合わせて、電話だけでは届かない決裁者にもアプローチします。",
  },
  {
    no: "03",
    title: "勝ち筋を見つけたら、一気に攻める",
    text: "チャネル・業種・役職・訴求ごとの反応をデータで可視化し、成果の出るパターンに一気にリソースを投下します。蓄積した「勝ち筋」はレポートでお渡しするので、御社の営業資産として残ります。",
  },
];

const logos = [
  { src: "/clients/fixx.png", width: 116 },
  { src: "/clients/japan-ai.webp", width: 208 },
  { src: "/clients/legalontechnology.jpg", width: 196 },
  { src: "/clients/toppan-cosmo.png", width: 162 },
  { src: "/clients/kubell.jpeg", width: 128 },
  { src: "/clients/ururu.png", width: 150 },
  { src: "/clients/andoeru.png", width: 138 },
  { src: "/clients/sanseido.png", width: 174 },
  { src: "/clients/kompeito.png", width: 174 },
  { src: "/clients/okan.png", width: 128 },
];

const faqs = [
  {
    q: "営業リストがなくても依頼できますか？",
    a: "はい。ターゲットのご要望を伺ったうえで、リスト作成から対応します（内容に応じてお見積もりします）。",
  },
  {
    q: "1つのチャネルだけでも依頼できますか？",
    a: "可能です。ご相談の内容をもとに、最適なチャネルの組み合わせもご提案します。",
  },
  {
    q: "どのような商材に対応していますか？",
    a: "BtoB商材であれば、業種・規模を問わず対応します。まずはお気軽にご相談ください。",
  },
  {
    q: "商談の対応もお願いできますか？",
    a: "アポコミの対応範囲は、アポイントの獲得までです。獲得したアポイントでの商談は、御社にご対応いただきます。",
  },
  {
    q: "契約期間はどのくらいですか？",
    a: "原則3カ月からのご契約です。勝ち筋を見つけて成果を積み上げるため、一定期間の運用をおすすめしています。",
  },
  {
    q: "進捗はどのように共有されますか？",
    a: "月2回の定例ミーティングで、チャネルごとの活動量・反応・アポイント獲得状況をレポートで共有します。",
  },
];

/* --------------------------------------------------------------- 小さな部品 */

/** オレンジのCTAボタン(ページ内フォームへ移動) */
function Cta({
  label = CTA_LABEL,
  size = "lg",
  className,
}: {
  label?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={`#${FORM_ID}`}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F26B1D] font-black text-white shadow-[0_16px_36px_-14px_rgba(242,107,29,0.9)] transition hover:-translate-y-0.5 hover:bg-[#E05A0C]",
        "before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:-translate-x-[150%] before:skew-x-[-20deg] before:bg-white/30 before:transition-transform before:duration-700 hover:before:translate-x-[400%]",
        size === "lg" ? "h-16 px-10 text-base md:text-lg" : "h-11 px-6 text-sm",
        className,
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

function SectionCta({ label }: { label?: string }) {
  return (
    <Reveal variant="up" className="mt-14 flex justify-center">
      <Cta label={label} />
    </Reveal>
  );
}

function Heading({
  en,
  children,
  dark,
  className,
}: {
  en: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal variant="up" className={cn("text-center", className)}>
      <p
        className={cn(
          "text-xs font-black tracking-[0.3em]",
          dark ? "text-[#FF9A5C]" : "text-[#F26B1D]",
        )}
      >
        {en}
      </p>
      <h2
        className={cn(
          "mt-3 text-[clamp(1.6rem,3.6vw,2.75rem)] font-black leading-[1.35] tracking-[0.01em] [word-break:auto-phrase]",
          dark ? "text-white" : "text-[#1A1A1A]",
        )}
      >
        {children}
      </h2>
    </Reveal>
  );
}

/* ----------------------------------------------------------------- ページ */

export default function ApokomiPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");

  return (
    <div className="bg-[#FFFBF7] text-[#1A1A1A]">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "新規開拓支援事業",
              url: localePath("/services/sales", locale),
            },
            { name: "アポコミ", url: localePath(PATH, locale) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "アポコミ（インサイドセールス代行・アポイント獲得代行）",
            serviceType: "インサイドセールス代行",
            description: pageMeta.apokomi.description,
            url: `${base}${localePath(PATH, locale)}`,
            areaServed: { "@type": "Country", name: "日本" },
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: site.officialUrl,
            },
            offers: {
              "@type": "Offer",
              description:
                "料金は要見積もり（ターゲット・チャネル・目標アポイント数に応じて設計）",
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

      {/* 固定のCTAバー(サイトヘッダーの下に追従) */}
      <div className="sticky top-16 z-30 border-b border-[#F2E3D8] bg-white/95 backdrop-blur md:top-20">
        <Container className="flex h-14 items-center justify-between gap-3">
          <p className="flex items-center gap-3">
            <span className="text-xl font-black tracking-[0.06em] text-[#F26B1D] md:text-2xl">
              アポコミ
            </span>
            <span className="hidden text-sm font-bold text-[#1A1A1A]/70 sm:inline">
              複数チャネルで新規アポイントを創出
            </span>
          </p>
          <Cta size="md" />
        </Container>
      </div>

      {/* 1. ファーストビュー */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#FFF7F0] to-[#FFE9D9] text-[#1A1A1A]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[38rem] w-[38rem] animate-blob rounded-full bg-[#FFB07A]/40 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[30rem] w-[30rem] animate-blob rounded-full bg-[#FFD2B3]/50 blur-[120px] [animation-delay:-8s]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(to_right,#F2E3D8_1px,transparent_1px),linear-gradient(to_bottom,#F2E3D8_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <div className="animate-fade-up">
              <p className="flex flex-wrap items-end gap-x-4 gap-y-1">
                <span className="text-[clamp(2.75rem,6vw,4.25rem)] font-black leading-none tracking-[0.04em] text-[#F26B1D]">
                  アポコミ
                </span>
                <span className="mb-1 rounded-full bg-[#F26B1D] px-3 py-1 text-xs font-black tracking-[0.08em] text-white md:text-sm">
                  インサイドセールス代行
                </span>
              </p>
              <p className="mt-3 text-base font-black tracking-[0.04em] text-[#1A1A1A] md:text-lg">
                複数チャネルで新規アポイントを創出
              </p>
            </div>
            <h1 className="mt-8 border-t border-[#F2E3D8] pt-8 text-[clamp(2rem,5.2vw,3.9rem)] font-black leading-[1.15] tracking-tight">
              <span className="line-mask">
                <span style={{ animationDelay: "0.1s" }}>
                  <span className="text-[#F26B1D]">全チャネル</span>で、
                </span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: "0.25s" }}>
                  攻めの新規開拓。
                </span>
              </span>
            </h1>
            <p
              className="mt-6 max-w-xl text-[15px] leading-[2] text-[#1A1A1A]/75 animate-fade-up md:text-base"
              style={{ animationDelay: "0.45s" }}
            >
              アポコミは、テレアポ・フォーム・メール・手紙・SNSを総動員して、新規アポイントを獲りにいくインサイドセールス代行サービスです。
            </p>
            <ul
              className="mt-7 flex flex-wrap gap-2 animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              {channels.map((c) => (
                <li
                  key={c.name}
                  className="rounded-full border border-[#F2E3D8] bg-white px-3.5 py-1.5 text-sm font-bold text-[#1A1A1A]/80"
                >
                  #{c.name}
                </li>
              ))}
            </ul>
            <div
              className="mt-10 animate-fade-up"
              style={{ animationDelay: "0.75s" }}
            >
              <Cta label="無料で相談する" />
            </div>
          </div>

          {/* 5チャネルの図: 中心のアポイントへ全方位から集まる */}
          <div
            className="relative mx-auto aspect-square w-[82%] max-w-[460px] sm:w-full animate-fade-up lg:col-span-5"
            style={{ animationDelay: "0.4s" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-[12%] animate-spin-slow rounded-full border border-dashed border-[#F26B1D]/40"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[26%] rounded-full border border-[#F26B1D]/15"
            />
            <div className="absolute left-1/2 top-1/2 grid h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[#FF8A3D] to-[#E05A0C] text-center shadow-[0_0_80px_-10px_rgba(242,107,29,0.8)]">
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-[#FF9A5C]"
              />
              <div>
                <p className="text-[clamp(2.5rem,7vw,4rem)] font-black leading-none">
                  <CountUp value="5" />
                </p>
                <p className="mt-1 text-xs font-black tracking-[0.15em] md:text-sm">
                  CHANNELS
                </p>
              </div>
            </div>
            {channels.map((c, i) => {
              const angle = -90 + i * 72;
              const r = 40;
              const x = 50 + r * Math.cos((angle * Math.PI) / 180);
              const y = 50 + r * Math.sin((angle * Math.PI) / 180);
              return (
                <span
                  key={c.name}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <span
                    style={{ animationDelay: `${i * 0.4}s` }}
                    className="block animate-float-y whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#1A1A1A] shadow-[0_10px_30px_-12px_rgba(242,107,29,0.6)] ring-1 ring-[#F2E3D8] md:px-4 md:py-2 md:text-sm"
                  >
                    {c.name}
                  </span>
                </span>
              );
            })}
          </div>
        </Container>

        {/* 流れるチャネル名の帯 */}
        <div aria-hidden="true" className="overflow-hidden bg-[#F26B1D] py-3">
          <div className="flex w-max animate-marquee-slow">
            {[0, 1].map((k) => (
              <p
                key={k}
                className="flex shrink-0 items-center gap-8 pr-8 text-lg font-black tracking-[0.15em] text-white md:text-xl"
              >
                {[...channels, ...channels].map((c, i) => (
                  <span key={`${k}-${i}`} className="flex items-center gap-8">
                    {c.en}
                    <span className="text-white/50">／</span>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 実績ロゴ(ファーストビュー直下) */}
      <section className="border-b border-[#F2E3D8] bg-white py-10 md:py-14">
        <p className="text-center text-xs font-black tracking-[0.25em] text-[#F26B1D]">
          支援実績
        </p>
        <div
          className="relative mt-6 md:mt-8 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16"
                aria-hidden={k === 1}
              >
                {logos.map((l) => (
                  <div
                    key={l.src}
                    className="flex h-10 shrink-0 items-center md:h-14"
                  >
                    <Image
                      src={l.src}
                      alt=""
                      width={l.width}
                      height={56}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. お悩み */}
      <section className="py-20 md:py-28">
        <Container>
          <Heading en="PROBLEM">新規開拓、こんなお悩みはありませんか？</Heading>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {worries.map((w, i) => (
              <Reveal
                key={w.title}
                variant="up"
                delay={i * 150}
                className="h-full"
              >
                <div className="h-full rounded-2xl border border-[#F2E3D8] bg-white p-7 shadow-[0_20px_50px_-35px_rgba(242,107,29,0.6)] md:p-9">
                  <p className="inline-flex rounded-full bg-[#FFF3EA] px-3 py-1 text-xs font-black text-[#E05A0C]">
                    CASE {String.fromCharCode(65 + i)}
                  </p>
                  <h3 className="mt-3 text-xl font-black leading-snug md:text-2xl">
                    {w.title}
                  </h3>
                  <ul className="mt-6 space-y-3 border-t border-dashed border-[#1A1A1A]/15 pt-6">
                    {w.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3 text-[15px] leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#F26B1D] text-[11px] font-black text-white"
                        >
                          ✓
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal variant="up" className="mt-12 text-center">
            <p
              aria-hidden="true"
              className="text-3xl text-[#F26B1D] animate-float-y"
            >
              ▼
            </p>
            <p className="mt-4 text-xl font-black leading-relaxed md:text-2xl [word-break:auto-phrase]">
              アポコミなら、使えるチャネルを
              <span className="bg-[linear-gradient(transparent_60%,#FFD2B3_60%)]">
                すべて
              </span>
              使って、
              <br className="hidden md:block" />
              攻めの新規開拓を実現します。
            </p>
          </Reveal>
          <SectionCta />
        </Container>
      </section>

      {/* 3. アポコミとは */}
      <section className="relative isolate overflow-hidden bg-[#FFF3EA] py-20 text-[#1A1A1A] md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-1/2 -z-10 -translate-y-1/2 select-none text-[clamp(8rem,22vw,18rem)] font-black leading-none text-[#F26B1D]/[0.07]"
        >
          APOCOMI
        </div>
        <Container>
          <Heading en="ABOUT">
            アポイント創出にコミットする、
            <br className="hidden md:block" />
            攻めのインサイドセールス代行
          </Heading>
          <Reveal
            variant="up"
            className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-[15px] leading-[2.1] text-[#1A1A1A]/80 md:text-base"
          >
            <p>
              アポコミは、新規アポイントの獲得に特化したインサイドセールス代行サービスです。
            </p>
            <p>
              電話だけで終わらせず、フォーム・メール・手紙・SNSまで総動員して、狙った企業に接点をつくりにいきます。
            </p>
            <p>
              準備から実行・改善までまるごと担当し、成果の出るチャネルに一気にリソースを投下します。
            </p>
          </Reveal>
          <SectionCta />
        </Container>
      </section>

      {/* 4. 3つの特徴 */}
      <section className="py-20 md:py-28">
        <Container>
          <Heading en="FEATURES">
            アポコミの<span className="text-[#F26B1D]">3</span>つの特徴
          </Heading>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal
                key={f.no}
                variant="up"
                delay={i * 150}
                className="h-full"
              >
                <article className="group relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-[0_24px_60px_-40px_rgba(23,18,15,0.6)] ring-1 ring-[#F2E3D8] transition duration-500 hover:-translate-y-1.5 hover:ring-[#F26B1D]/50 md:p-9">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 bg-[#F26B1D] transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <p className="text-6xl font-black leading-none text-[#F26B1D]">
                    {f.no}
                  </p>
                  <h3 className="mt-5 text-xl font-black leading-snug md:text-[1.4rem]">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.95] text-[#1A1A1A]/75">
                    {f.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <SectionCta />
        </Container>
      </section>

      {/* 8. 料金 */}
      <section className="bg-[#FFF3EA] py-20 md:py-28">
        <Container>
          <Heading en="PRICE">料金</Heading>
          <Reveal
            variant="up"
            className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-8 text-center ring-1 ring-[#F2E3D8] md:p-12"
          >
            <p className="text-4xl font-black text-[#F26B1D] md:text-5xl">
              要見積もり
            </p>
            <p className="mt-6 text-[15px] leading-[2] text-[#1A1A1A]/80">
              アポコミの料金は、ターゲット・チャネル・目標アポイント数に応じてお見積もりします。
              <br className="hidden md:block" />
              御社の予算や目標に合わせてプランを設計します。
            </p>
          </Reveal>
          <SectionCta label="無料で見積もりを依頼する" />
        </Container>
      </section>

      {/* 9. よくあるご質問 */}
      <section className="py-20 md:py-28">
        <Container>
          <Heading en="FAQ">よくあるご質問</Heading>
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} variant="up" delay={i * 60}>
                <details className="group rounded-2xl bg-white ring-1 ring-[#F2E3D8] open:ring-[#F26B1D]/50">
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F26B1D] text-sm font-black text-white">
                      Q
                    </span>
                    <span className="flex-1 text-[15px] font-black md:text-base">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl text-[#F26B1D] transition-transform group-open:rotate-45"
                    >
                      ＋
                    </span>
                  </summary>
                  <div className="flex gap-4 px-5 pb-6 md:px-6">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FFF3EA] text-sm font-black text-[#E05A0C]">
                      A
                    </span>
                    <p className="pt-1.5 text-[15px] leading-relaxed text-[#1A1A1A]/80">
                      {f.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
          <SectionCta />
        </Container>
      </section>

      {/* 10. 最終CTA */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#FF8A3D] via-[#F26B1D] to-[#C9540F] py-20 text-white md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 animate-blob rounded-full bg-white/15 blur-[100px]"
        />
        <Container className="text-center">
          <Reveal variant="up">
            <h2 className="text-[clamp(1.7rem,4vw,3rem)] font-black leading-[1.35] [word-break:auto-phrase]">
              新規開拓、今日から攻めに転じませんか？
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-[2] text-white/90 md:text-base">
              「アポイントをもっと増やしたい」「どのチャネルが合うか分からない」——まずはお気軽にご相談ください。御社の商材とターゲットに合わせて、攻めのチャネル設計とお見積もりをご提案します。
            </p>
            <a
              href={`#${FORM_ID}`}
              className="group mt-10 inline-flex h-16 items-center justify-center gap-2 rounded-full bg-white px-10 text-base font-black text-[#E05A0C] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 md:text-lg"
            >
              無料相談・見積もりを依頼する
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Reveal>
        </Container>
      </section>

      {/* 11. 問い合わせフォーム */}
      <section id={FORM_ID} className="scroll-mt-36 py-20 md:py-28">
        <Container>
          <Heading en="CONTACT">無料相談・見積もり依頼</Heading>
          <Reveal
            variant="up"
            delay={150}
            className="mx-auto mt-10 max-w-4xl rounded-2xl border-2 border-[#F26B1D]/30 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(242,107,29,0.7)] md:p-10"
          >
            <ApokomiLeadForm privacyHref={localePath("/privacy", locale)} />
          </Reveal>
          {/* 12. 運営会社 */}
          <p className="mt-12 text-center text-sm text-[#1A1A1A]/60">
            運営会社：{site.legalName}
          </p>
        </Container>
      </section>
    </div>
  );
}
