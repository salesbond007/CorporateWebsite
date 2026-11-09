import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { FloatingConsultButton } from "@/components/services/FloatingConsultButton";
import { WorryIllustration } from "@/components/services/WorryIllustration";
import { MenuIcon } from "@/components/services/MenuIcon";
import { SimpleContactForm } from "@/components/contact/SimpleContactForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PATH = "/services/web-security";

/** このようなお悩みはありませんか？(文言は指定どおり) */
const worries = [
  "WordPressのPHPが、年末でサポート切れになると言われた",
  "セキュリティ対策を何から始めればいいか分からない",
  "最低限の対策だけでも、すぐにやっておきたい",
  "サイトを管理できる人が社内にいない",
  "自社のサイトが安全なのか、確かめたことがない",
];

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    ...pageMeta.webSecurity,
    path: PATH,
    locale: params.locale,
  });
}

/* ---------------------------------------------------------------- データ */

const menus: {
  no: string;
  name: string;
  target: string;
  items: string[];
  note?: string;
  featured?: boolean;
}[] = [
  {
    no: "1",
    name: "診断",
    target: "まずは現状を知りたい方へ",
    items: [
      "外部から、WordPress本体・プラグイン・テーマ・PHPのバージョンを診断",
      "危険度ごとに整理したレポートと、対策の優先順位",
      "結果を担当者が説明（オンライン30分）",
    ],
  },
  {
    no: "2",
    name: "保守",
    target: "今の環境を安全に使い続けたい方へ",
    items: [
      "WordPress本体・プラグイン・PHPの定期更新",
      "更新前のバックアップと、不具合が出たときの復旧",
      "セキュリティ設定（ログイン保護・WAFの導入）",
      "月次の状況レポート",
    ],
  },
  {
    no: "3",
    name: "移行",
    target: "根本から安全にしたい方へ",
    items: [
      "WordPressを静的HTMLに移行し、PHP・データベース・管理画面をなくして攻撃の入口をふさぐ",
      "サーバーに個人情報を溜めない構成にする",
      "問い合わせフォームは安全な方式に置き換え",
      "表示が速くなり、保守の手間もほぼなくなる",
    ],
    note: "※ 更新頻度の低いコーポレートサイト向け。毎日更新するサイトは「保守」をおすすめします",
    featured: true,
  },
];

const choices: { when: string; menu: string; highlight?: boolean }[] = [
  { when: "何が危ないか分からない", menu: "診断" },
  { when: "今のWordPressを使い続けたい", menu: "保守" },
  { when: "更新はほとんどせず、もう悩みたくない", menu: "移行" },
  {
    when: "迷ったら",
    menu: "無料相談で、最適なメニューを提案します",
    highlight: true,
  },
];

/* ---------------------------------------------------------- 小さな部品 */

/**
 * ファーストビュー右側の図: 「守る対象(個人情報)」を中心に、
 * 受付窓口(問い合わせフォーム・採用応募・会員登録)を持つホームページと、
 * その外側の防御の層(診断・対策・保守)が外からの攻撃を防ぐ同心円の図。
 */
const C = 220; // 中心座標(viewBox 440x440)

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

function arcPath(r: number, from: number, to: number) {
  const s = polar(r, from);
  const e = polar(r, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

/** 防御の層: 3つの弧(角度は中心) */
const shields = [
  { label: "診断", at: -90 },
  { label: "対策", at: 30 },
  { label: "保守", at: 150 },
];
/** 外から来る攻撃(防御の層で止まる) */
const attacks = [-130, -50, 70, 190];

const R_SHIELD = 158;
const R_SITE = 110;
const R_CORE = 54;

/**
 * PC用の大きな防御図。中心「個人情報」を同心円の防御の層(診断・対策・保守)が囲み、
 * 四方から来る攻撃が防御の層の手前で「ブロック」される様子を示す。
 */
const BIG = { w: 880, h: 790, cx: 440, cy: 375 };
/** 攻撃元(中心からの角度)。防御の層のラベル(-90°/30°/150°)と重ならない向きに配置 */
const bigAttacks: { lines: [string, string]; at: number }[] = [
  { lines: ["脆弱性の", "自動探索"], at: -140 },
  { lines: ["不正", "ログイン"], at: -40 },
  { lines: ["サポート切れ", "PHP"], at: 40 },
  { lines: ["プラグインの", "脆弱性"], at: 140 },
];

function DefenseDiagramLarge() {
  const { cx, cy } = BIG;
  const RS = 182; // 防御の層
  const RH = 122; // ホームページ
  const RC = 62; // 個人情報
  const p = (r: number, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const arc = (r: number, a: number, b: number) => {
    const s = p(r, a);
    const e = p(r, b);
    return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 0 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
  };
  const fade =
    "opacity-0 transition-opacity duration-700 group-data-[visible=true]/reveal:opacity-100";
  const center = {
    transformBox: "fill-box" as const,
    transformOrigin: "center",
  };

  return (
    <Reveal variant="none">
      <svg
        viewBox={`0 80 ${BIG.w} 600`}
        className="mx-auto block aspect-[880/600] h-auto w-full max-w-full md:h-[clamp(380px,calc(100svh-20rem),700px)] md:w-auto"
        role="img"
        aria-label="個人情報を守るホームページの外側に、診断・対策・保守の防御の層をつくり、脆弱性の自動探索・不正ログイン・プラグインの脆弱性・サポート切れPHPを狙う攻撃をブロックします。"
      >
        <defs>
          <radialGradient id="bigGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBEAEE" stopOpacity="1" />
            <stop offset="70%" stopColor="#FBEAEE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FBEAEE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 背景のにじみと大きな同心円 */}
        <circle cx={cx} cy={cy} r={360} fill="url(#bigGlow)" />
        {[300, 372].map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#7A1E35"
            strokeOpacity="0.1"
          />
        ))}
        <circle
          cx={cx}
          cy={cy}
          r={228}
          fill="none"
          stroke="#7A1E35"
          strokeOpacity="0.35"
          strokeDasharray="2 7"
          className="animate-spin-slow"
          style={center}
        />

        {/* 攻撃 → ブロック */}
        {bigAttacks.map((atk, i) => {
          const node = p(372, atk.at);
          const a = { ...node, lines: atk.lines };
          const s = p(372 - 44, atk.at);
          const e = p(RS + 22, atk.at);
          const pill = p(RS + 76, atk.at);
          return (
            <g
              key={a.lines.join("")}
              className={fade}
              style={{ transitionDelay: `${700 + i * 150}ms` }}
            >
              <line
                x1={s.x}
                y1={s.y}
                x2={e.x}
                y2={e.y}
                stroke="#3A3A3A"
                strokeWidth="1.6"
                strokeDasharray="4 4"
                className="animate-dash-flow"
              />
              {/* 攻撃元ノード */}
              <circle cx={a.x} cy={a.y} r={40} fill="#2B2B2B" />
              <circle
                cx={a.x}
                cy={a.y}
                r={40}
                fill="none"
                stroke="#B42318"
                strokeWidth="2"
                className="animate-pulse-ring"
                style={{ ...center, animationDelay: `${i * 0.6}s` }}
              />
              {a.lines.map((t, k) => (
                <text
                  key={t}
                  x={a.x}
                  y={a.y + (k === 0 ? -4 : 14)}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="800"
                  fill="#fff"
                >
                  {t}
                </text>
              ))}
              {/* ブロック */}
              <g transform={`translate(${pill.x} ${pill.y})`}>
                <rect
                  x={-50}
                  y={-17}
                  width={100}
                  height={34}
                  rx={17}
                  fill="#B42318"
                />
                <circle
                  cx={-28}
                  cy={0}
                  r={8}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                />
                <path
                  d="M-33.5 5.5 L-22.5 -5.5"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <text
                  x={8}
                  y={5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="900"
                  fill="#fff"
                >
                  ブロック
                </text>
              </g>
            </g>
          );
        })}

        {/* 防御の層: 診断・対策・保守 */}
        {shields.map((sh, i) => {
          const m = p(RS, sh.at);
          return (
            <g
              key={sh.label}
              className={fade}
              style={{ transitionDelay: `${250 + i * 150}ms` }}
            >
              <path
                d={arc(RS, sh.at - 55, sh.at + 55)}
                fill="none"
                stroke="#7A1E35"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <rect
                x={m.x - 52}
                y={m.y - 24}
                width="104"
                height="48"
                rx="24"
                fill="#7A1E35"
                stroke="#fff"
                strokeWidth="3"
              />
              <text
                x={m.x}
                y={m.y + 8.5}
                textAnchor="middle"
                fontSize="24"
                fontWeight="900"
                fill="#fff"
              >
                {sh.label}
              </text>
            </g>
          );
        })}

        {/* ホームページ */}
        <g className={fade} style={{ transitionDelay: "120ms" }}>
          <circle
            cx={cx}
            cy={cy}
            r={RH}
            fill="#fff"
            stroke="#7A1E35"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          {[RC + 8, RC + 14].map((r) => (
            <circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#7A1E35"
              strokeOpacity="0.25"
            />
          ))}
          <text
            x={cx}
            y={cy - RC - 28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill="#6B6B6B"
            letterSpacing="2"
          >
            ホームページ
          </text>
        </g>

        {/* 個人情報 */}
        <g className={fade}>
          <circle
            cx={cx}
            cy={cy}
            r={RC}
            fill="none"
            stroke="#7A1E35"
            strokeWidth="2.5"
            className="animate-pulse-ring"
            style={center}
          />
          <circle cx={cx} cy={cy} r={RC} fill="#1D050B" />
          <path
            d={`M ${cx - 11} ${cy - 16} v -6 a 11 11 0 0 1 22 0 v 6`}
            fill="none"
            stroke="#E4A0B0"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <rect
            x={cx - 16}
            y={cy - 16}
            width="32"
            height="22"
            rx="4"
            fill="#E4A0B0"
          />
          <text
            x={cx}
            y={cy + 30}
            textAnchor="middle"
            fontSize="16"
            fontWeight="900"
            fill="#fff"
          >
            個人情報
          </text>
        </g>
      </svg>
    </Reveal>
  );
}

function DefenseDiagram() {
  const fade =
    "opacity-0 transition-opacity duration-700 group-data-[visible=true]/reveal:opacity-100";
  return (
    <Reveal variant="none">
      <figure aria-label="ホームページのセキュリティ対策の考え方。個人情報を守るホームページの外側に、診断・対策・保守の防御の層をつくり、外からの攻撃を防ぎます。">
        <svg
          viewBox="0 0 440 440"
          className="mx-auto block w-full max-w-[460px]"
          role="img"
          aria-hidden="true"
        >
          {/* 背景の目盛り円 */}
          <circle
            cx={C}
            cy={C}
            r={214}
            fill="none"
            stroke="#1A1A1A"
            strokeOpacity="0.12"
            strokeDasharray="2 6"
            className="animate-spin-slow"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />

          {/* 外からの攻撃: 矢印が防御の層で止まる */}
          {attacks.map((deg, i) => {
            const s = polar(214, deg);
            const e = polar(R_SHIELD + 27, deg);
            const x = polar(R_SHIELD + 19, deg);
            return (
              <g
                key={deg}
                className={fade}
                style={{ transitionDelay: `${900 + i * 120}ms` }}
              >
                <line
                  x1={s.x}
                  y1={s.y}
                  x2={e.x}
                  y2={e.y}
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="animate-dash-flow"
                />
                <g transform={`translate(${x.x} ${x.y})`}>
                  <circle
                    r="8"
                    fill="#F6F5F2"
                    stroke="#B42318"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-3 -3 L3 3 M3 -3 L-3 3"
                    stroke="#B42318"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            );
          })}

          {/* 防御の層: 診断・対策・保守 */}
          {shields.map((sh, i) => {
            const m = polar(R_SHIELD, sh.at);
            return (
              <g
                key={sh.label}
                className={fade}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <path
                  d={arcPath(R_SHIELD, sh.at - 56, sh.at + 56)}
                  fill="none"
                  stroke="#7A1E35"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <rect
                  x={m.x - 44}
                  y={m.y - 21}
                  width="88"
                  height="42"
                  rx="21"
                  fill="#7A1E35"
                />
                <text
                  x={m.x}
                  y={m.y + 7.5}
                  textAnchor="middle"
                  fontSize="21"
                  fontWeight="900"
                  fill="#fff"
                >
                  {sh.label}
                </text>
              </g>
            );
          })}

          {/* ホームページ(受付窓口) */}
          <g className={fade} style={{ transitionDelay: "150ms" }}>
            <circle
              cx={C}
              cy={C}
              r={R_SITE}
              fill="#fff"
              stroke="#1A1A1A"
              strokeOpacity="0.25"
            />
            <text
              x={C}
              y={C - R_CORE - 18}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#6B6B6B"
              letterSpacing="1"
            >
              ホームページ
            </text>
          </g>

          {/* 守る対象: 個人情報 */}
          <g className={fade}>
            <circle
              cx={C}
              cy={C}
              r={R_CORE}
              fill="none"
              stroke="#7A1E35"
              strokeWidth="2"
              className="animate-pulse-ring"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle cx={C} cy={C} r={R_CORE} fill="#1D050B" />
            <path
              d={`M ${C - 9} ${C - 14} v -5 a 9 9 0 0 1 18 0 v 5`}
              fill="none"
              stroke="#E4A0B0"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <rect
              x={C - 13}
              y={C - 14}
              width="26"
              height="18"
              rx="3"
              fill="#E4A0B0"
            />
            <text
              x={C}
              y={C + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="900"
              fill="#fff"
            >
              個人情報
            </text>
          </g>
        </svg>
      </figure>
    </Reveal>
  );
}

/* ------------------------------------------------------------ 図・グラフ */

/**
 * どれを選べばいい？: お客様の状況ごとに、おすすめのメニューと主な対応内容を示す。
 */
function MenuSelector() {
  const rows = choices
    .filter((c) => !c.highlight)
    .map((c) => ({ ...c, detail: menus.find((m) => m.name === c.menu) }));

  return (
    <div>
      <Reveal variant="none" className="text-center">
        <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] font-black text-ink [word-break:auto-phrase]">
          状況に合わせて、必要なメニューだけを提供
        </h3>
      </Reveal>

      <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
        {rows.map((r, i) => (
          <li key={r.when}>
            <Reveal variant="up" delay={i * 140} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_50px_-35px_rgba(29,5,11,0.45)] transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-500/30 hover:shadow-[0_34px_70px_-35px_rgba(122,30,53,0.55)]">
                {/* 上辺のグラデーションライン */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300"
                />

                {/* メニュー名(カード上部) */}
                <div className="relative flex flex-1 flex-col px-6 pb-7 pt-9 md:px-7">
                  <span className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-b from-brand-50 to-white ring-1 ring-brand-500/15 transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:scale-105">
                    <MenuIcon name={r.menu} />
                  </span>
                  <p className="text-center text-[2.25rem] font-black leading-none tracking-[0.06em] text-ink">
                    {r.menu}
                  </p>
                  {r.detail ? (
                    <>
                      <p className="mx-auto mt-4 inline-flex w-fit rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                        {r.detail.target}
                      </p>
                      {/* お客様の状況: 吹き出し */}
                      <div className="relative mt-5 flex items-center justify-center rounded-xl bg-[#F6F1F2] px-4 py-3.5 text-center md:min-h-[4.25rem]">
                        <p className="text-[15px] font-bold leading-relaxed text-ink">
                          {r.when}
                        </p>
                        <span
                          aria-hidden="true"
                          className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#F6F1F2]"
                        />
                      </div>

                      <ul className="mt-5 space-y-2.5 border-t border-dashed border-ink/15 pt-5">
                        {r.detail.items.slice(0, 3).map((it) => (
                          <li
                            key={it}
                            className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                              className="mt-0.5 shrink-0"
                            >
                              <circle
                                cx="8"
                                cy="8"
                                r="7.5"
                                className="fill-brand-50"
                              />
                              <path
                                d="M4.6 8.2l2.2 2.2 4.6-4.8"
                                stroke="#7A1E35"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------- 構造化データ */

const SITE = site.url.replace(/\/$/, "");

/** Service: 3つのメニューを OfferCatalog、無料相談を 0円の Offer として記述 */
function webSecurityServiceJsonLd(path: string) {
  const url = `${SITE}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "ホームページセキュリティ対策",
    serviceType: "ホームページセキュリティ対策（診断・保守・移行）",
    description: pageMeta.webSecurity.description,
    url,
    areaServed: { "@type": "Country", name: "日本" },
    audience: {
      "@type": "BusinessAudience",
      name: "中小企業・コーポレートサイトを運営する企業",
    },
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.officialUrl,
    },
    keywords: [
      "ホームページセキュリティ",
      "情報漏洩対策",
      "WordPress保守",
      "WordPressセキュリティ",
      "脆弱性診断",
      "PHP脆弱性",
      "サポート切れPHP",
      "静的HTML移行",
      "WAF",
    ].join(", "),
    offers: {
      "@type": "Offer",
      name: "無料相談",
      description: "ホームページのセキュリティ対策に関する無料相談",
      price: "0",
      priceCurrency: "JPY",
      url: `${url}#diagnosis`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "3つのメニュー（必要なものだけ選べます）",
      itemListElement: menus.map((m) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: m.name,
          description: `${m.target}。${m.items.join("。")}。${m.note ? m.note.replace(/^※\s*/, "") : ""}`,
        },
      })),
    },
  };
}

/** FAQPage: ページ内の「どれを選べばいい？」「3つのメニュー」の内容をそのまま問答にしたもの */
function faqJsonLd() {
  const qa: { q: string; a: string }[] = [
    {
      q: "ホームページセキュリティ対策では、どんなメニューを選べますか？",
      a: "「診断」「保守」「移行」の3つから、必要なものだけを選べます。",
    },
    ...choices.map((c) => ({
      q: c.highlight
        ? "どのメニューを選べばよいか迷ったら？"
        : `${c.when}場合は、どのメニューがおすすめですか？`,
      a: c.highlight ? `${c.menu}。` : `「${c.menu}」がおすすめです。`,
    })),
    {
      q: "無料相談はどのように申し込めますか？",
      a: "ページ下部の無料相談フォームからお申し込みいただけます。",
    },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/* ------------------------------------------------------------- ページ */

export default function WebSecurityPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const title = "ホームページセキュリティ対策";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            { name: title, url: localePath(PATH, locale) },
          ]),
          webSecurityServiceJsonLd(localePath(PATH, locale)),
          faqJsonLd(),
        ]}
      />

      {/* ① ファーストビュー */}
      <section className="relative isolate overflow-hidden border-b border-ink/10 bg-white">
        {/* PC: 背景画像を右側に配置し、左側(コピー部分)は白へ溶け込ませる */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 hidden w-[64%] overflow-hidden lg:block"
        >
          <Image
            src="/services/web-security/hero-laptop.webp"
            alt=""
            fill
            priority
            sizes="64vw"
            className="animate-ken-burns object-cover object-[45%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_0%,rgba(255,255,255,0.85)_14%,rgba(255,255,255,0)_42%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent" />
        </div>
        <Container className="pb-16 pt-12 md:pb-24 md:pt-20 lg:flex lg:min-h-[640px] lg:flex-col lg:justify-center">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h1 className="text-[min(2.6rem,9.6vw)] md:text-[clamp(2.4rem,5.6vw,5rem)] font-black leading-[1.15] tracking-[0.01em] text-ink">
                <span className="line-mask">
                  <span style={{ animationDelay: "0.1s" }}>ホームページ</span>
                </span>
                <span className="line-mask">
                  <span
                    className="text-brand-600"
                    style={{ animationDelay: "0.25s" }}
                  >
                    セキュリティ対策
                  </span>
                </span>
              </h1>
              <p
                className="mt-7 border-l-[3px] border-brand-500 pl-4 text-xl font-black tracking-[0.04em] text-ink animate-fade-up md:text-2xl"
                style={{ animationDelay: "0.45s" }}
              >
                情報漏洩が起きる、その前に。
              </p>
              <p
                className="mt-6 max-w-xl text-[15px] leading-[2] text-ink-soft animate-fade-up"
                style={{ animationDelay: "0.55s" }}
              >
                問い合わせフォーム、採用応募、会員登録など、ホームページは個人情報の受付窓口であり、同時にサイバー攻撃の標的でもあります。AI時代に求められる水準のセキュリティ対策で、情報漏洩のリスクを低減します。
              </p>
              <div
                className="mt-9 grid gap-3 animate-fade-up sm:flex sm:flex-wrap"
                style={{ animationDelay: "0.7s" }}
              >
                <Button href="#diagnosis" size="lg">
                  無料相談を申し込む
                </Button>
              </div>
            </div>
          </div>
          {/* スマホ・タブレット: 画像は背景にせず、ボタンの下に表示 */}
          <div className="relative mt-10 aspect-[1783/882] overflow-hidden rounded-sm lg:hidden">
            <Image
              src="/services/web-security/hero-laptop.webp"
              alt="ホームページのセキュリティ対策のイメージ"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* このようなお悩みはありませんか？ */}
      <section className="relative isolate bg-white pt-16 md:pt-24">
        {/* 下半分のブランドカラーの帯(グレーの枠が帯にまたがる) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-brand-500 md:h-[45%]"
        />
        <Container>
          <div>
            <Reveal variant="up">
              <h2 className="text-center text-[clamp(1.3rem,3.2vw,2.4rem)] font-black tracking-[0.02em] text-ink [word-break:auto-phrase] md:tracking-[0.04em]">
                このようなお悩みはありませんか？
              </h2>
            </Reveal>
            <ul className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">
              {worries.map((w, i) => (
                <li
                  key={w}
                  className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <Reveal variant="up" delay={i * 100} className="h-full">
                    <div className="flex h-full flex-col items-center rounded-2xl bg-white px-5 pb-5 pt-6 text-center border border-ink/10 shadow-[0_18px_40px_-24px_rgba(29,5,11,0.45)] transition-transform duration-500 ease-expo hover:-translate-y-1">
                      <p className="flex min-h-[3.4em] items-center text-[15px] font-bold leading-relaxed text-ink [text-wrap:balance] [word-break:auto-phrase] md:text-base">
                        {w}
                      </p>
                      <div className="mt-3 h-28 w-full max-w-[220px] md:h-32">
                        <WorryIllustration index={i} />
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          {/* 下向きの矢印 */}
          <div
            aria-hidden="true"
            className="flex justify-center py-8 text-white md:py-10"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="animate-float-y"
            >
              <path
                d="M10 10l10 9 10-9M10 21l10 9 10-9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Container>
      </section>

      {/* サービスの価値と対応内容 */}
      <section className="relative isolate overflow-hidden bg-white py-16 md:py-12 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 animate-blob rounded-full bg-brand-100/50 blur-[120px]"
        />
        <Container>
          <Reveal variant="none" className="text-center">
            <h2 className="text-[clamp(1.5rem,3.4vw,2.6rem)] font-black leading-[1.35] tracking-[0.02em] text-ink">
              <span className="line-mask">
                <span className="animate-none translate-y-[110%] transition-transform duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0">
                  今すぐやるべき
                  <span className="relative mx-0.5 inline-block text-brand-600">
                    <span className="relative z-10">必須</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.32em] bg-brand-100"
                    />
                  </span>
                  の
                </span>
              </span>
              <span className="line-mask">
                <span className="animate-none translate-y-[110%] transition-transform delay-150 duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0">
                  セキュリティ対策に絞って実施
                </span>
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl md:text-sm md:leading-[1.9] translate-y-3 text-[15px] leading-[2] text-ink-soft opacity-0 transition-all delay-300 duration-700 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100">
              {/* TODO: 本文確定後に差し替え */}
              個人情報の受付窓口であるホームページを、外からの攻撃から守ります。現状を診断し、必要な対策を行い、安全な状態を保ち続けることで、情報漏洩のリスクを低減します。
            </p>
          </Reveal>

          {/* 図: PCは大きな図、スマホはコンパクトな図 */}
          <div className="mt-8 md:mt-4">
            <div className="hidden md:block">
              <DefenseDiagramLarge />
            </div>
            <div className="mx-auto max-w-[420px] md:hidden">
              <DefenseDiagram />
            </div>
          </div>

          {/* どれを選べばいい？(状況別のおすすめメニュー) */}
          <div className="mt-16 md:mt-20">
            <MenuSelector />
          </div>
        </Container>
      </section>

      {/* 申し込みフォーム(ファーストビューのメインCTAの遷移先) */}
      <section
        id="diagnosis"
        className="relative isolate scroll-mt-20 overflow-hidden border-t border-ink/10 bg-gradient-to-b from-white to-brand-50/60 py-20 text-ink md:py-28"
      >
        <Container>
          <Reveal variant="none" className="text-center">
            <h2 className="text-[clamp(1.6rem,3.6vw,2.75rem)] font-black leading-snug text-ink">
              <span className="text-brand-600">無料相談</span>に申し込む
            </h2>
          </Reveal>
          <Reveal variant="up" delay={150} className="mx-auto mt-10 max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border-2 border-brand-500/30 bg-white p-6 shadow-[0_30px_70px_-35px_rgba(122,30,53,0.55)] md:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-brand-500"
              />
              <SimpleContactForm locale={locale} variant="consult" />
            </div>
          </Reveal>
        </Container>
      </section>

      <FloatingConsultButton targetId="diagnosis" />
    </>
  );
}
