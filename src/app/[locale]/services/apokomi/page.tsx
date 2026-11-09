import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ApokomiFeatureIllustration,
  ApokomiClientBust,
  ApokomiStaffBust,
  WaveLines,
} from "@/components/services/ApokomiIllustration";
import {
  ApokomiServiceDiagram,
  ChannelIcon,
} from "@/components/services/ApokomiServiceDiagram";
import { ApokomiHeroVisual } from "@/components/services/ApokomiHeroVisual";
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

/** LPの目次(ヘッダーのナビゲーション) */
const lpNav = [
  { href: "#problem", label: "課題" },
  { href: "#about", label: "アポコミとは" },
  { href: "#features", label: "特徴" },
  { href: `#${FORM_ID}`, label: "お問い合わせ" },
];

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
    id: "tele",
    en: "TELE",
    text: "即効性が高く、アポイントの量を確保しやすいチャネル。決裁者や担当者の特定にも使います",
  },
  {
    name: "問い合わせフォーム",
    id: "form",
    en: "FORM",
    text: "低コストで幅広い企業にアプローチできます。検証段階で母数を広げたいときに有効です",
  },
  {
    name: "メール",
    id: "mail",
    en: "MAIL",
    text: "接点を持った企業への追客やフォローに。日程調整までスムーズにつなげます",
  },
  {
    name: "手紙BDR",
    id: "letter",
    en: "LETTER",
    text: "大手企業や決裁者に、印象に残るアプローチを。狙った企業を確実に開拓したいときに",
  },
  {
    name: "SNS（DM）",
    id: "sns",
    en: "SNS",
    text: "経営者や担当者個人に直接届くチャネル。スタートアップやIT企業の開拓に",
  },
];

const worries = [
  {
    title: "アポイントを大量に獲得したい",
    items: [
      "売れる商材はあるのに、**商談の数が足りない**",
      "社内に架電の人手がなく、**新規開拓が後回し**になっている",
      "テレアポだけでは**母数が頭打ち**になっている",
    ],
  },
  {
    title: "勝ち筋が決まっておらず、複数チャネルで試したい",
    items: [
      "新規事業・新商材で、**どのターゲットに刺さるか**まだ分からない",
      "テレアポ代行やフォーム営業代行に頼んだが、**成果が出なかった**",
      "**どのチャネルから手をつけるべきか**判断できない",
    ],
  },
];

const features = [
  {
    no: "01",
    illus: 3,
    title: "幅広い商材で培った、新規開拓のナレッジ",
    text: "ベンチャー企業から大手企業まで、SaaS・AIソリューション・人材派遣・制服など、幅広い業界・商材の新規開拓を支援してきました。商材ごとに蓄積した「刺さるターゲット」「響く訴求」のナレッジを活かし、立ち上がりから成果につなげます。",
  },
  {
    no: "02",
    illus: 0,
    title: "準備から実行まで、まるごとお任せ",
    text: "リスト作成、トークスクリプト、各チャネルの文面づくりから実行・改善まで一括で担当します。御社は獲得したアポイントでの商談に集中できます。",
  },
  {
    no: "03",
    illus: 1,
    title: "5つのチャネルを総動員して開拓",
    text: "テレアポ・問い合わせフォーム・メール・手紙BDR・SNS（DM）を組み合わせ、1社あたりの接点を最大化します。「手紙を送ってから架電」「フォームの反応先へ即架電」など、チャネルを掛け合わせて、電話だけでは届かない決裁者にもアプローチします。",
  },
  {
    no: "04",
    illus: 2,
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

/* --------------------------------------------------------------- 小さな部品 */

type CtaVariant = "solid" | "white" | "ghost";

/** 右端に丸い矢印アイコンが付いたピル型ボタン */
function Cta({
  label = CTA_LABEL,
  href = `#${FORM_ID}`,
  variant = "solid",
  size = "lg",
  className,
}: {
  label?: string;
  href?: string;
  variant?: CtaVariant;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-between gap-4 rounded-full font-bold tracking-[0.05em] transition duration-300 hover:-translate-y-0.5",
        variant === "solid" &&
          "bg-[#F26B1D] text-white shadow-[0_12px_28px_-14px_rgba(242,107,29,0.9)] hover:bg-[#E05A0C]",
        variant === "white" &&
          "bg-white text-[#E05A0C] shadow-[0_12px_28px_-14px_rgba(160,60,0,0.6)]",
        variant === "ghost" &&
          "border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
        size === "lg"
          ? "h-14 pl-7 pr-2 text-[15px] md:h-16 md:pl-8 md:text-base"
          : "h-10 pl-5 pr-1.5 text-sm",
        className,
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "grid shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
          size === "lg" ? "h-10 w-10 md:h-12 md:w-12" : "h-7 w-7 text-xs",
          variant === "solid" ? "bg-white text-[#F26B1D]" : "",
          variant === "white" ? "bg-[#F26B1D] text-white" : "",
          variant === "ghost" ? "bg-white text-[#F26B1D]" : "",
        )}
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

/** 英字ラベル + 短い下線 + 見出し */
function Heading({
  en,
  children,
  align = "center",
  className,
}: {
  en: string;
  children: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      variant="up"
      className={cn(align === "center" && "text-center", className)}
    >
      <p className="text-xs font-bold tracking-[0.2em] text-[#F26B1D]">{en}</p>
      <span
        aria-hidden="true"
        className={cn(
          "mt-2 block h-0.5 w-8 bg-[#F26B1D]",
          align === "center" && "mx-auto",
        )}
      />
      <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.55] tracking-[0.04em] [word-break:auto-phrase]">
        {children}
      </h2>
    </Reveal>
  );
}

function CheckBox() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="mt-[5px] shrink-0"
    >
      <rect
        x="1"
        y="1"
        width="16"
        height="16"
        rx="3"
        stroke="#F26B1D"
        strokeWidth="1.5"
      />
      <path
        d="M5 9.2l2.6 2.6L13 6.4"
        stroke="#F26B1D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
    <div className="bg-white tracking-[0.03em] text-[#241F20]">
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
        ]}
      />

      {/* LPのヘッダー(目次ナビゲーション + CTA) */}
      <header className="sticky top-0 z-40 border-b border-[#F2E3D8] bg-white/95 backdrop-blur">
        <Container className="flex h-14 items-center gap-4 md:h-16">
          <nav aria-label="ページ内目次" className="hidden md:block">
            <ul className="flex items-center gap-1 lg:gap-2">
              {lpNav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="rounded-full px-3 py-2 text-sm font-bold text-[#241F20]/80 transition hover:bg-[#FFF3EA] hover:text-[#E05A0C] lg:px-4"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Cta size="md" className="ml-auto" />
        </Container>
        <nav
          aria-label="ページ内目次"
          className="border-t border-[#F2E3D8] md:hidden"
        >
          <ul className="flex gap-1 overflow-x-auto px-3 py-1.5 [scrollbar-width:none]">
            {lpNav.map((n) => (
              <li key={n.href} className="shrink-0">
                <a
                  href={n.href}
                  className="block whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold text-[#241F20]/80 active:bg-[#FFF3EA]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* 1. ファーストビュー */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFAE72] via-[#FB8E45] to-[#F37A2C] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-white/25 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-40 -z-10 h-96 w-96 rounded-full bg-[#FFE0C7]/40 blur-[110px]"
        />
        <Container className="relative z-10 grid items-center gap-4 pb-16 pt-12 md:pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-16">
          <div className="text-center lg:text-left">
            <h1>
              <span
                className="block animate-fade-up text-[clamp(4rem,12vw,8rem)] font-black leading-none tracking-[0.08em] [text-shadow:0_6px_24px_rgba(201,84,15,0.35)]"
                style={{ animationDelay: "0.1s" }}
              >
                アポコミ
              </span>
            </h1>
            <p
              className="mt-5 animate-fade-up text-[clamp(1.25rem,2.6vw,2rem)] font-bold tracking-[0.12em] [text-shadow:0_2px_12px_rgba(201,84,15,0.35)]"
              style={{ animationDelay: "0.25s" }}
            >
              アポイント創出に
              <span className="ml-1 inline-block rounded-lg bg-white px-2.5 py-0.5 text-[#E05A0C] [text-shadow:none]">
                フルコミット
              </span>
            </p>
            <div
              className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
              style={{ animationDelay: "0.55s" }}
            >
              <Cta variant="white" className="w-full max-w-xs sm:w-auto" />
              <Cta
                label="サービスの特徴を見る"
                href="#features"
                variant="ghost"
                className="w-full max-w-xs sm:w-auto"
              />
            </div>
          </div>

          {/* 5つのチャネルから商談が集まり、カレンダーが埋まっていくビジュアル */}
          <div className="animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <ApokomiHeroVisual />
          </div>
        </Container>

        {/* 下端の白いカーブ */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-12 w-full md:h-20"
        >
          <path d="M0 120 L0 80 Q 720 -30 1440 70 L1440 120 Z" fill="#fff" />
        </svg>
      </section>

      {/* 実績ロゴ(ファーストビュー直下) */}
      <section className="bg-white pb-12 pt-6 md:pb-16">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-[#241F20]/50">
          支援実績のある企業
        </p>
        <div
          className="relative mt-6 space-y-6 overflow-hidden md:mt-8 md:space-y-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          {[logos].map((row, r) => (
            <div
              key={r}
              className={cn(
                "flex w-max animate-marquee hover:[animation-play-state:paused]",
                r === 1 && "[animation-direction:reverse]",
              )}
            >
              {[0, 1].map((k) => (
                <div
                  key={k}
                  className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16"
                  aria-hidden={k === 1 || r === 1}
                >
                  {row.map((l) => (
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
          ))}
        </div>
      </section>

      {/* 2. お悩み */}
      <section
        id="problem"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FFF8F2] py-20 md:py-28"
      >
        <WaveLines className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 w-full" />
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.7fr] md:gap-14">
            <Heading en="QUESTION" align="left">
              こんな課題
              <br className="hidden md:block" />
              ありませんか？
            </Heading>
            <div className="space-y-10">
              {worries.map((w, i) => (
                <Reveal key={w.title} variant="up" delay={i * 120}>
                  <p className="text-base font-bold text-[#F26B1D] md:text-lg">
                    {w.title}
                  </p>
                  <ul className="mt-2">
                    {w.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3 border-b border-[#EADBD0] py-4 text-base leading-relaxed md:text-[17px]"
                      >
                        <CheckBox />
                        <span>
                          {it.split("**").map((part, k) =>
                            k % 2 === 1 ? (
                              <strong
                                key={k}
                                className="bg-[linear-gradient(transparent_60%,#FFD2B3_60%)] font-bold text-[#241F20]"
                              >
                                {part}
                              </strong>
                            ) : (
                              part
                            ),
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal variant="up" className="mt-16 text-center">
            <p className="text-lg font-bold leading-[1.9] md:text-2xl [word-break:auto-phrase]">
              アポコミなら、使えるチャネルを
              <span className="bg-[linear-gradient(transparent_62%,#FFD2B3_62%)] text-[#E05A0C]">
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

      {/* 3. アポコミとは(図解) */}
      <section
        id="about"
        className="relative isolate overflow-hidden py-20 md:py-28"
      >
        <WaveLines className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 w-full" />
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-lg font-bold tracking-[0.1em] md:text-2xl">
              そもそも
            </p>
            <h2 className="mt-1 font-black leading-tight">
              <span className="text-[clamp(2.6rem,7vw,4.25rem)] tracking-[0.06em] text-[#F26B1D]">
                アポコミ
              </span>
              <span className="ml-2 text-[clamp(1.6rem,4vw,2.5rem)]">とは</span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-[2] text-[#241F20]/80 [word-break:auto-phrase]">
              5つのチャネルを総動員して新規アポイントを創出し、獲得した商談を御社へパスする、アポイント創出にフルコミットするインサイドセールス代行サービスです。
            </p>
          </Reveal>

          <Reveal
            variant="up"
            className="mx-auto mt-12 max-w-5xl rounded-2xl border-2 border-[#FFD9BC] bg-white p-5 shadow-[0_30px_70px_-45px_rgba(242,107,29,0.8)] md:p-10"
          >
            {/* 依頼と商談のパス */}
            <div className="grid items-center gap-4 md:grid-cols-[0.9fr_auto_1.6fr] md:gap-6">
              <div className="flex flex-col items-center">
                <ApokomiClientBust className="w-40 md:w-52" />
                <span className="relative -mt-3 rounded-full bg-[#F3F0ED] px-6 py-2 text-sm font-bold">
                  御社（クライアント）
                </span>
              </div>

              <div className="flex items-center justify-center gap-8 md:flex-col md:gap-6">
                <div className="flex flex-col items-center gap-1 text-[#241F20]">
                  <svg
                    width="96"
                    height="20"
                    viewBox="0 0 96 20"
                    fill="none"
                    aria-hidden="true"
                    className="hidden md:block"
                  >
                    <path
                      d="M2 10h84M78 3l10 7-10 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="20"
                    height="44"
                    viewBox="0 0 20 44"
                    fill="none"
                    aria-hidden="true"
                    className="md:hidden"
                  >
                    <path
                      d="M10 2v34M3 28l7 10 7-10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-bold">業務を依頼</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[#F26B1D] md:flex-col-reverse">
                  <svg
                    width="96"
                    height="20"
                    viewBox="0 0 96 20"
                    fill="none"
                    aria-hidden="true"
                    className="hidden md:block"
                  >
                    <path
                      d="M94 10H10M18 3L8 10l10 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="7 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="20"
                    height="44"
                    viewBox="0 0 20 44"
                    fill="none"
                    aria-hidden="true"
                    className="md:hidden"
                  >
                    <path
                      d="M10 42V8M3 16l7-10 7 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="6 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-black">商談をパス</span>
                </div>
              </div>

              <div className="grid items-center gap-4 rounded-xl bg-[#FFF3EA] p-5 sm:grid-cols-[auto_1fr] md:gap-6 md:p-6">
                <div className="flex flex-col items-center">
                  <ApokomiStaffBust className="w-36 md:w-44" />
                  <span className="relative -mt-3 rounded-full bg-white px-6 py-2 text-sm font-black text-[#E05A0C] shadow-[0_8px_20px_-12px_rgba(242,107,29,0.8)]">
                    アポコミ
                  </span>
                </div>
                <ul className="mx-auto space-y-2.5 sm:mx-0">
                  {channels.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center gap-3 text-base font-bold md:text-lg"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#F26B1D] ring-1 ring-[#FFD9BC]">
                        <ChannelIcon id={c.id} size={16} />
                      </span>
                      {c.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 商談が生まれるまでの流れ */}
            <div className="mt-10 border-t border-dashed border-[#EADBD0] pt-10">
              <p className="mb-8 text-center text-sm font-bold tracking-[0.15em] text-[#F26B1D]">
                商談が生まれるまで
              </p>
              <ApokomiServiceDiagram />
            </div>

            <p className="mt-10 text-center text-sm text-[#241F20]/80">
              リスト作成からアプローチ、アポイント獲得までまるごと担当。
              <br />
              <span className="mt-2 inline-block bg-[linear-gradient(transparent_62%,#FFD2B3_62%)] text-xl font-black text-[#241F20] md:text-2xl">
                御社は、商談に集中できます！
              </span>
            </p>
          </Reveal>
          <SectionCta />
        </Container>
      </section>

      {/* 4. 特徴 */}
      <section
        id="features"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FFF8F2] py-20 md:py-28"
      >
        <WaveLines className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-80 w-full" />
        <Container>
          <Heading en="FEATURE">アポコミの特徴</Heading>
          <div className="mx-auto mt-14 max-w-5xl space-y-10 md:space-y-14">
            {features.map((f, i) => (
              <Reveal key={f.no} variant={i % 2 ? "right" : "left"}>
                <div className="grid items-center gap-4 md:grid-cols-12 md:gap-8">
                  <div
                    className={cn(
                      "mx-auto w-56 md:col-span-4 md:w-full",
                      i % 2 === 1 && "md:order-2",
                    )}
                  >
                    <ApokomiFeatureIllustration index={f.illus} />
                  </div>
                  <article className="rounded-xl bg-white p-7 shadow-[0_16px_40px_-24px_rgba(242,107,29,0.4)] md:col-span-8 md:p-10">
                    <div className="flex items-center gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#F26B1D] text-sm font-bold text-[#F26B1D]">
                        {f.no}
                      </span>
                      <h3 className="text-lg font-bold leading-snug text-[#F26B1D] md:text-xl">
                        {f.title}
                      </h3>
                    </div>
                    <p className="mt-5 text-[15px] leading-[1.95] text-[#241F20]/80">
                      {f.text}
                    </p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 横長のCTAバナー */}
          <Reveal variant="up" className="mx-auto mt-16 max-w-5xl">
            <a
              href={`#${FORM_ID}`}
              className="group grid overflow-hidden rounded-xl bg-gradient-to-r from-[#F26B1D] to-[#FFA562] text-white shadow-[0_20px_44px_-24px_rgba(242,107,29,0.9)] md:grid-cols-[1fr_auto]"
            >
              <div className="p-8 md:p-10">
                <p className="text-xl font-bold md:text-2xl">
                  無料相談・見積もり依頼
                </p>
                <p className="mt-3 text-sm leading-[1.9] text-white/95">
                  ターゲット・チャネル・目標アポイント数をお伺いし、最適なプランとお見積もりをご提案します。
                  <br className="hidden md:block" />
                  新規開拓にお困りの方は、お気軽にご相談ください。
                </p>
              </div>
              <div className="flex items-center justify-center gap-4 border-t border-white/40 p-6 md:flex-col md:gap-2 md:border-l md:border-t-0 md:px-14">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-white text-xl transition duration-300 group-hover:bg-white group-hover:text-[#F26B1D]">
                  →
                </span>
                <span className="text-xs font-bold tracking-[0.2em]">
                  CONTACT
                </span>
              </div>
            </a>
          </Reveal>
        </Container>
      </section>

      {/* 5. 最終CTA */}
      <section className="relative isolate overflow-hidden py-20 md:py-24">
        <WaveLines className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 w-full" />
        <Container>
          <Reveal
            variant="up"
            className="mx-auto max-w-4xl rounded-xl bg-gradient-to-br from-[#F26B1D] to-[#FF9D57] px-6 py-12 text-center text-white shadow-[0_24px_60px_-30px_rgba(242,107,29,0.9)] md:px-12 md:py-14"
          >
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="mx-auto"
            >
              <path
                d="M21 3L3 10.5l7 2.5m11-10l-7 18-4-8m11-10L10 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="mt-5 text-[clamp(1.4rem,3vw,2rem)] font-bold leading-[1.6] [word-break:auto-phrase]">
              新規開拓、今日から攻めに転じませんか？
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-[2] text-white/95 md:text-[15px]">
              「アポイントをもっと増やしたい」「どのチャネルが合うか分からない」——まずはお気軽にご相談ください。御社の商材とターゲットに合わせて、チャネル設計とお見積もりをご提案します。
            </p>
            <Cta label="相談してみる" variant="white" className="mt-8" />
          </Reveal>
        </Container>
      </section>

      {/* 6. 問い合わせフォーム */}
      <section
        id={FORM_ID}
        className="scroll-mt-28 bg-[#FFF8F2] py-20 md:py-28"
      >
        <Container>
          <Heading en="CONTACT">無料相談・見積もり依頼</Heading>
          <Reveal
            variant="up"
            delay={150}
            className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-6 shadow-[0_24px_60px_-36px_rgba(242,107,29,0.6)] md:p-10"
          >
            <ApokomiLeadForm privacyHref={localePath("/privacy", locale)} />
          </Reveal>
          {/* 運営会社 */}
          <p className="mt-12 text-center text-sm text-[#241F20]/60">
            運営会社：{site.legalName}
          </p>
        </Container>
      </section>
    </div>
  );
}
