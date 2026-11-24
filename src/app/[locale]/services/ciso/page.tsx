import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CisoAssignDiagram } from "@/components/services/CisoAssignDiagram";
import { LpNav } from "@/components/services/LpNav";
import {
  ReasonCost,
  ReasonProsOnly,
  ReasonStart,
} from "@/components/services/CisoReasonVisuals";
import { CisoIssueMap } from "@/components/services/CisoIssueMap";
import { CisoHeroMock } from "@/components/services/CisoHeroMock";
import { CisoAboutBlock } from "@/components/services/CisoAboutBlock";
import { SecuproMark } from "@/components/services/SecuproMark";
import { AiCheckForm } from "@/components/contact/AiCheckForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PATH = "/services/ciso";
const FORM_ID = "check";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({ ...pageMeta.ciso, path: PATH, locale: params.locale });
}

/* ================================================================== 原稿 */
/*
 * 表現のルール:
 * - 「盤石」「万全」「漏洩ゼロ」は使わず、「防ぐ体制をつくる」までの表現にする。
 * - 導入実績・お客さまの声・専門家の顔写真/氏名は、実物ができてから追加する。
 * - 画面のイメージ図の数値は例示(実績ではない)。
 * 取引先対応向けのサブLPを作るときは、ファーストビューとお悩みだけを差し替える。
 */

const W2 = "#A83B57"; // やや明るいワインレッド

/* ============================================================ 小さな部品 */

function Icon({
  name,
  className,
}: {
  name: "shield" | "doc" | "person" | "chart" | "check" | "bell";
  className?: string;
}) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {name === "shield" ? (
        <g {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </g>
      ) : name === "doc" ? (
        <g {...p}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M10 12h5M10 16h5" />
        </g>
      ) : name === "person" ? (
        <g {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 21c1-4.2 4-6.5 7.5-6.5s6.5 2.3 7.5 6.5" />
        </g>
      ) : name === "chart" ? (
        <g {...p}>
          <path d="M4 20V4M4 20h16" />
          <path d="M8 16v-4M12 16V8M16 16v-6" />
        </g>
      ) : name === "check" ? (
        <g {...p}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 12l3 3 5-6" />
        </g>
      ) : (
        <g {...p}>
          <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------ 図・グラフ */

/* ================================================================ ページ */

export default function CisoPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");
  const url = `${base}${localePath(PATH, locale)}`;

  const nav = [
    { href: "#top", label: "トップ" },
    { href: "#service", label: "サービス概要" },
    { href: "#reason", label: "選ばれる理由" },
    { href: "#expert", label: "サービス監修" },
    { href: `#${FORM_ID}`, label: "問い合わせ" },
  ];

  return (
    <div className="bg-white font-sans font-medium not-italic text-ink [&_em]:not-italic [&_em]:text-brand-500 [&_text]:[font-family:inherit]">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "セキュプロ 情報セキュリティ顧問（社外CISO）",
              url: localePath(PATH, locale),
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: "セキュプロ 情報セキュリティ顧問（大手企業と取引したい中小企業のための社外CISO）",
            alternateName: [
              "情報セキュリティ顧問",
              "セキュリティ顧問",
              "社外CISO",
              "vCISO",
              "CISO as a Service",
              "AIセキュリティ顧問",
            ],
            serviceType: "情報セキュリティ顧問・社外CISO",
            category: "情報セキュリティ",
            description: pageMeta.ciso.description,
            keywords: pageMeta.ciso.keywords.join(", "),
            url,
            areaServed: { "@type": "Country", name: "日本" },
            availableLanguage: "ja",
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType: "大手企業と取引したい中小企業・中堅企業",
            },
            offers: {
              "@type": "Offer",
              name: "ライトプラン（アドバイザー）",
              priceCurrency: "JPY",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: 100000,
                priceCurrency: "JPY",
                unitText: "月",
                valueAddedTaxIncluded: false,
              },
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "情報セキュリティ顧問のプラン",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "ライトプラン（アドバイザー）",
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    minPrice: 100000,
                    priceCurrency: "JPY",
                    unitText: "月",
                    valueAddedTaxIncluded: false,
                  },
                },
                {
                  "@type": "Offer",
                  name: "スタンダードプラン（社外CISO）",
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    minPrice: 300000,
                    priceCurrency: "JPY",
                    unitText: "月",
                    valueAddedTaxIncluded: false,
                  },
                },
                {
                  "@type": "Offer",
                  name: "エンタープライズプラン（社外CISO・経営参画）",
                  description: "要相談",
                },
              ],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": url,
            url,
            name: pageMeta.ciso.title,
            description: pageMeta.ciso.description,
            inLanguage: "ja",
            about: { "@id": `${url}#service` },
            reviewedBy: {
              "@type": "Person",
              name: "岡崎 弘明",
              alternateName: "オカザキ ヒロアキ",
              jobTitle: "サービス監修",
              description:
                "株式会社帝国データバンクネットコミュニケーション 元代表取締役 社長。帝国データバンクグループで、情報セキュリティ関連の事業を手がける会社の代表取締役 社長を25年間にわたり務めた。",
              knowsAbout: ["情報セキュリティ", "情報セキュリティ体制の構築"],
            },
          },
        ]}
      />

      {/* ========== 1. ヘッダー ========== */}
      <header className="sticky top-0 z-40 border-b border-[#EEE5E8] bg-white/95 backdrop-blur">
        <Container className="flex h-16 items-center gap-4 md:h-[4.5rem] xl:gap-6">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <SecuproMark className="h-10 w-10" />
            <span className="leading-tight">
              <span className="block whitespace-nowrap text-base font-black text-ink sm:text-lg">
                セキュプロ
              </span>
              <span className="hidden text-[10px] font-bold text-ink/55 sm:block lg:hidden xl:block">
                情報セキュリティのプロ人材活用サービス
              </span>
            </span>
          </a>
          <LpNav items={nav} variant="desktop" />
          <a
            href={`#${FORM_ID}`}
            className="ml-auto inline-flex h-10 shrink-0 items-center rounded-none bg-[linear-gradient(100deg,#FF7A55,#E64A2E)] px-4 text-sm font-bold text-white shadow-[0_8px_18px_-10px_rgba(230,74,46,0.9)] sm:px-5 lg:ml-2"
          >
            無料相談
          </a>
        </Container>
        <LpNav items={nav} variant="mobile" />
      </header>

      {/* ========== 2. ファーストビュー ========== */}
      <section
        id="top"
        className="relative isolate overflow-hidden border-b border-[#E9D3DA] bg-[linear-gradient(180deg,#FBF2F4_0%,#F1DCE3_100%)]"
      >
        {/* 背景: 大きな面を重ねた幾何学模様 */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 760"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 -z-10 h-full w-full"
        >
          <path
            d="M760 0H1440V420L1080 760H640L980 360z"
            fill="#FFFFFF"
            fillOpacity="0.55"
          />
          <path
            d="M1040 0H1440V260L1250 470z"
            fill="#FFFFFF"
            fillOpacity="0.7"
          />
          <path
            d="M0 520L300 300L520 760H0z"
            fill="#FFFFFF"
            fillOpacity="0.45"
          />
          <path
            d="M-40 120L180 0H420L60 330z"
            fill="#FFFFFF"
            fillOpacity="0.4"
          />
          <path
            d="M980 360L1440 420"
            stroke="#7A1F3D"
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
          <path
            d="M300 300L60 330"
            stroke="#7A1F3D"
            strokeOpacity="0.12"
            strokeWidth="1.5"
          />
        </svg>
        <Container className="grid items-center gap-6 pb-14 pt-6 md:gap-12 md:pb-20 md:pt-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="min-w-0 text-center lg:text-left">
            <h1>
              <span className="block text-[clamp(1.6rem,7.4vw,2.8rem)] font-black leading-[1.4] tracking-[0.02em] lg:text-[clamp(1.7rem,2.3vw,2.3rem)]">
                情報セキュリティの
                <br className="sm:hidden" />
                <span className="text-brand-500">プロ人材</span>を、
                <br className="hidden sm:block" />
                雇わずに<span className="text-brand-500">活用</span>
              </span>
            </h1>
            <p className="mt-6 text-[clamp(1.05rem,1.7vw,1.3rem)] font-bold leading-[1.8] text-ink/85">
              情報セキュリティの
              <span className="text-brand-500">顧問ひとり</span>から、
              <br />
              <span className="text-brand-500">専門家チーム</span>まで。
              <br />
              課題やフェーズに合わせて、
              <br className="sm:hidden" />
              必要なプロが対応します。
            </p>
            <div className="mt-10 flex justify-center lg:block">
              <BigButton label="無料相談" icon="check" href="#check" />
            </div>
          </div>
          <div className="mx-auto w-full min-w-0 max-w-[520px] lg:-mr-6 lg:max-w-none xl:-mr-12">
            <CisoHeroMock />
          </div>
        </Container>
      </section>

      {/* ========== 4. サービス概要 ========== */}
      <section
        id="service"
        className="relative isolate scroll-mt-28 overflow-hidden bg-white"
      >
        {/* セキュプロとは(濃い背景のブロック) */}
        <CisoAboutBlock />

        <Container className="pt-20 md:pt-28">
          <Reveal variant="up" className="text-center">
            <h2 className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-black leading-[1.5] [word-break:auto-phrase]">
              課題に合わせて、
              <br className="sm:hidden" />
              必要な<span className="text-brand-500">プロ</span>が対応
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-[2] text-ink/80 [word-break:auto-phrase]">
              まずは顧問ひとりが現状を整理し、対策が広がれば、認証や診断のプロが加わります。体制は課題やフェーズに合わせて組み替え、窓口と契約はセキュプロひとつです。
            </p>
          </Reveal>

          {/* 図: 企業 ⇄ セキュプロ ⇄ プロ人材(ひとりからチームまでアサイン) */}
          <div className="mt-10">
            <CisoAssignDiagram />
          </div>
        </Container>

        {/* 課題カード → 円形の図(対応する領域) + 解決の一文。背景は横幅いっぱい */}
        <div id="structure" className="mt-16 scroll-mt-28 md:mt-24">
          <CisoIssueMap />
        </div>

        <div className="mt-20 md:mt-24">
          <SplitCta />
        </div>
      </section>

      {/* ========== 5. 選ばれる理由 ========== */}
      <section
        id="reason"
        className="relative isolate scroll-mt-28 overflow-hidden bg-white py-20 md:py-28"
      >
        <Watermark className="-right-6 top-4">Reason</Watermark>
        <Container>
          <SectionHead en="Reason">セキュプロが選ばれる理由</SectionHead>
          <div className="mt-4 md:mt-6">
            {[
              {
                title: (
                  <>
                    <span className="text-brand-500">「何から始めるか」</span>
                    から相談できる
                  </>
                ),
                key: "f3",
                text: "対策の方針が決まっていなくても問題ありません。まずはセキュリティ顧問が参画し、現状とリスクを整理して優先順位を決めます。そのうえで、必要な対策に応じて各領域のプロ人材が加わります。",
                visual: <ReasonStart />,
              },
              {
                title: (
                  <>
                    必要な対策に絞り、
                    <span className="text-brand-500">最小限のコスト</span>に
                  </>
                ),
                key: "f2",
                text: "特定した優先度の高い対策に絞り込み、その実行に必要なプロ人材が、必要な稼働量だけ対応します。フェーズが進めばプロを入れ替えるため、不要な費用は発生しません。合わない場合の交代も無料です。",
                visual: <ReasonCost />,
              },
              {
                title: (
                  <>
                    扱うのは、
                    <span className="text-brand-500">
                      情報セキュリティのプロだけ
                    </span>
                  </>
                ),
                key: "f1",
                text: "責任者、認証、診断、研修をはじめ、情報セキュリティに関わる幅広い領域のプロ人材をそろえています。複数のプロが関わっても、窓口と契約はセキュプロひとつ。社内の管理負担を増やしません。",
                visual: <ReasonProsOnly />,
              },
            ].map((r, i) => (
              <Reveal key={r.key} variant="up">
                <article
                  className={cn(
                    "grid grid-cols-[minmax(0,1fr)] items-center gap-6 border-2 border-ink bg-white p-5 sm:p-7 md:gap-10 md:p-10 lg:grid-cols-2 lg:gap-12",
                    "mt-8 md:mt-10",
                  )}
                >
                  <div>{r.visual}</div>
                  <div>
                    <p className="flex items-baseline gap-3 font-black text-brand-500">
                      <span className="text-xs tracking-[0.24em] md:text-sm">
                        REASON
                      </span>
                      <span className="text-[2.6rem] leading-none md:text-[3.4rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-3 text-[clamp(1.3rem,2.4vw,1.9rem)] font-black leading-[1.55] [word-break:auto-phrase]">
                      {r.title}
                    </h3>
                    <p className="mt-4 border-t border-[#EADFE2] pt-4 text-[15px] leading-[2] text-ink/80 md:mt-5 md:pt-5">
                      {r.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== 8. 監修者 ========== */}
      <section
        id="expert"
        className="relative isolate scroll-mt-28 overflow-hidden py-20 md:py-28"
      >
        <Watermark className="-left-4 top-4">Expert</Watermark>
        <Container>
          <SectionHead en="Expert">サービス監修</SectionHead>
          <Reveal
            variant="up"
            className="mt-12 grid items-center gap-10 md:grid-cols-[17rem_1fr] md:gap-12 lg:grid-cols-[21rem_1fr] lg:gap-16"
          >
            {/* 写真(後ろにずらしたワインレッドの四角) */}
            <div className="relative mx-auto w-full max-w-[21rem] pb-4 pr-4">
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-[calc(100%-1rem)] w-[calc(100%-1rem)] bg-brand-500"
              />
              <div className="relative aspect-[4/5] w-full bg-[#F1ECEE]">
                <Image
                  src="/photos/ciso/okazaki.webp"
                  alt="岡崎 弘明"
                  fill
                  sizes="(max-width:768px) 100vw, 336px"
                  quality={95}
                  className="object-cover object-top"
                />
              </div>
              <span className="absolute left-0 top-5 bg-white px-3 py-1.5 text-[11px] font-black tracking-[0.2em] text-brand-500">
                SUPERVISOR
              </span>
            </div>

            <div>
              <p className="text-xs font-black tracking-[0.2em] text-brand-500">
                サービス監修
              </p>
              <h3 className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-black tracking-[0.08em] text-ink">
                  岡崎 弘明
                </span>
                <span className="text-xs font-bold tracking-[0.2em] text-ink/50">
                  オカザキ ヒロアキ
                </span>
              </h3>
              <dl className="mt-6 border-y-2 border-ink text-[15px]">
                <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-[#E9E1DD] py-3.5">
                  <dt className="font-bold text-ink/55">役職</dt>
                  <dd className="font-black text-brand-500">
                    元代表取締役 社長
                  </dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-3.5">
                  <dt className="font-bold text-ink/55">経歴</dt>
                  <dd className="font-bold text-ink">
                    株式会社帝国データバンクネットコミュニケーション
                  </dd>
                </div>
              </dl>
              <p className="relative mt-6 bg-[#F7F2F4] px-6 py-5 text-[15px] leading-[2] text-ink/80">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-brand-500"
                />
                帝国データバンクグループで、情報セキュリティ関連の事業を手がける会社の代表取締役
                社長を25年間にわたり務める。
                <br />
                当サービスの監修者として、支援の品質を確認し、難しい判断の顧問を務めます。
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ========== 10. 無料相談の帯 ========== */}
      <SplitCta />

      {/* ========== 11. 申し込み ========== */}
      <section
        id={FORM_ID}
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-20 md:py-28"
      >
        <Watermark className="-right-6 top-4">Contact</Watermark>
        <Container>
          <SectionHead en="Contact">無料相談</SectionHead>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
            <div>
              <dl className="space-y-6 text-[15px] leading-[1.9] text-ink/80">
                <div>
                  <dt className="font-black text-ink">無料相談</dt>
                  <dd className="mt-1">
                    情報セキュリティの専門家が、御社の現状と取引先から求められていることをお聞きし、必要な対策と進め方をご案内します。
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-md bg-white p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.45)] md:p-9">
              <AiCheckForm
                privacyHref={localePath("/privacy", locale)}
                consultOnly
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ========== 右端に浮かぶ無料相談ボタン ========== */}
      {/* PC: 画面右端の中央に縦長のタブ */}
      <a
        href={`#${FORM_ID}`}
        className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 bg-[linear-gradient(180deg,#FF7A55,#E64A2E)] px-3.5 py-6 text-white shadow-[0_10px_28px_-10px_rgba(230,74,46,0.9)] transition-[padding] hover:pr-5 md:flex"
      >
        <Icon name="check" className="h-5 w-5" />
        <span className="text-[15px] font-black tracking-[0.2em] [writing-mode:vertical-rl]">
          無料相談
        </span>
      </a>
      {/* スマホ: 右下に丸いボタン */}
      <a
        href={`#${FORM_ID}`}
        aria-label="無料相談"
        className="fixed bottom-4 right-4 z-50 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[linear-gradient(135deg,#FF7A55,#E64A2E)] text-white shadow-[0_10px_24px_-8px_rgba(230,74,46,0.9)] md:hidden"
      >
        <Icon name="check" className="h-5 w-5" />
        <span className="mt-0.5 text-[11px] font-black leading-none">
          無料相談
        </span>
      </a>
    </div>
  );
}

/* ================================================== salescore 風の部品 */

/** 2段の文字 + 右端に白い四角のアイコンが付いたボタン */
function BigButton({
  label,
  sub,
  icon,
  href = `#${FORM_ID}`,
  tone = "wine",
}: {
  label: string;
  sub?: string;
  icon: "check" | "doc";
  href?: string;
  tone?: "wine" | "accent" | "white";
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-16 w-full items-center justify-center pl-8 pr-20 transition hover:-translate-y-0.5 sm:w-auto sm:min-w-[20rem] md:min-w-[24rem]",
        tone === "wine" &&
          "bg-[linear-gradient(100deg,#6A1830,#A83B57)] text-white shadow-[0_12px_26px_-12px_rgba(122,30,53,0.8)]",
        tone === "accent" &&
          "bg-[linear-gradient(100deg,#FF7A55,#E64A2E)] text-white shadow-[0_12px_26px_-12px_rgba(230,74,46,0.8)]",
        tone === "white" &&
          "bg-white text-brand-600 shadow-[0_12px_26px_-14px_rgba(0,0,0,0.5)]",
      )}
    >
      <span className="text-center leading-tight">
        <span className="block text-[17px] font-black tracking-[0.04em]">
          {label}
        </span>
        {sub ? (
          <span
            className={cn(
              "mt-0.5 block text-[11px] font-bold",
              tone === "white" ? "text-ink/55" : "text-white/85",
            )}
          >
            {sub}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-2.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center",
          tone === "wine" && "bg-white text-brand-500",
          tone === "accent" && "bg-white text-[#E64A2E]",
          tone === "white" && "bg-brand-500 text-white",
        )}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
    </a>
  );
}

/** 無料相談のCTA帯 */
function SplitCta() {
  return (
    <div className="flex flex-col items-center gap-4 bg-brand-500 px-6 py-12 text-white">
      <BigButton label="無料相談" icon="check" tone="white" />
    </div>
  );
}

/** 大きな英字 + 日本語(横並び) + 左だけ色の付いた線 */
function SectionHead({ en, children }: { en: string; children?: ReactNode }) {
  return (
    <Reveal variant="up">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-5">
        {en ? (
          <p className="text-[clamp(2.4rem,5.6vw,3.8rem)] font-black uppercase leading-none tracking-[0.02em] text-brand-500">
            {en}
          </p>
        ) : null}
        {children ? (
          <h2
            className={cn(
              "pb-1 font-bold tracking-[0.04em] text-ink [word-break:auto-phrase]",
              en
                ? "text-lg md:text-xl"
                : "text-[clamp(1.6rem,3vw,2.2rem)] font-black",
            )}
          >
            {children}
          </h2>
        ) : null}
      </div>
      <div className="relative mt-5 h-px bg-[#E6D9DD]">
        <span className="absolute inset-y-0 left-0 w-56 -translate-y-px border-b-2 border-brand-500" />
      </div>
    </Reveal>
  );
}

/** 背景の大きな英字の透かし */
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
        "pointer-events-none absolute -z-10 select-none whitespace-nowrap text-[clamp(5rem,14vw,12rem)] font-black uppercase leading-none tracking-tight text-brand-500/[0.05]",
        className,
      )}
    >
      {children}
    </p>
  );
}
