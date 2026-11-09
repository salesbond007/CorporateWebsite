import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { JsonLd } from "@/components/seo/JsonLd";
import { WebSecurityDiagnosisForm } from "@/components/contact/WebSecurityDiagnosisForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PATH = "/services/web-security";

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

/** サービスの価値と対応内容(3つのメニューの要約) */
const values: { name: string; value: string; text: string }[] = [
  {
    name: "診断",
    value: "現状のリスクを知る",
    text: "WordPress本体・プラグイン・テーマ・PHPのバージョンを外部から診断し、危険度と対策の優先順位をレポートします。",
  },
  {
    name: "保守",
    value: "安全な状態を保つ",
    text: "定期更新とバックアップ、ログイン保護・WAFの導入、月次レポートで、今の環境を安全に使い続けられます。",
  },
  {
    name: "移行",
    value: "攻撃の入口をなくす",
    text: "WordPressを静的HTMLに移行し、PHP・データベース・管理画面をなくして根本から安全にします。",
  },
];
type Source = { label: string; href: string };

type MeterData = { value: number; label: string; caption: string };

const reasons: {
  title: string;
  text: string;
  source?: Source;
  meter?: MeterData;
}[] = [
  {
    title: "攻撃する側もAIを使う時代",
    text: "脆弱性を探す作業が自動化され、規模の小さい会社のサイトも、まとめて狙われるようになっています。",
  },
  {
    title: "2026年10月、PHPに深刻な脆弱性",
    text: "10月21日に深刻な脆弱性が2件公表されました。どちらも、認証なしで外部からサイトに不正な処理をさせられるものです。",
    source: {
      label: "gizmodo",
      href: "https://www.gizmodo.jp/article/2610-php-vulnerability-security-update/",
    },
  },
  {
    title: "上場企業ですら対策が追いついていない",
    text: "上場企業のサイトを調べた2026年8月の調査でも、66.7%のサイトがサポート切れのPHPで動いたままです。",
    source: { label: "dxmagazine", href: "https://dxmagazine.jp/?p=226763" },
    meter: {
      value: 66.7,
      label: "66.7%",
      caption: "サポート切れのPHPで動く上場企業のサイト",
    },
  },
  {
    title: "中小企業が狙われている",
    text: "ランサムウェア被害の約66%は中小企業で起きています。",
    source: {
      label: "ipa",
      href: "https://www.ipa.go.jp/security/reports/sme/rcu1hd0000009k82-att/sme-jirei.pdf",
    },
    meter: {
      value: 66,
      label: "約66%",
      caption: "ランサムウェア被害のうち、中小企業で起きたもの",
    },
  },
];

const damages: { title: string; text: string }[] = [
  {
    title: "原因の調査費用",
    text: "侵入経路や漏洩した範囲を、専門会社に調べてもらう費用（フォレンジック調査）",
  },
  {
    title: "報告と通知の対応",
    text: "個人情報保護委員会への報告、本人への通知、お詫び文の作成と公表",
  },
  {
    title: "問い合わせ対応",
    text: "お客様からの問い合わせ窓口の設置と、対応にあたる人員",
  },
  { title: "損害賠償", text: "漏洩した本人から、慰謝料などを請求されるリスク" },
  { title: "復旧と再発防止", text: "サイトの作り直し、セキュリティ対策の追加" },
  {
    title: "事業の停止",
    text: "サイトや業務が止まっている間の売上と機会の損失",
  },
  { title: "信用の失墜", text: "取引の停止、採用応募の減少、検索順位の低下" },
];

const IPA_SME =
  "https://www.ipa.go.jp/security/reports/sme/rcu1hd0000009k82-att/sme-jirei.pdf";
const ITMEDIA =
  "https://atmarkit.itmedia.co.jp/ait/articles/2502/18/news065.html";

type FigureViz =
  | { kind: "meter"; value: number; caption: string }
  | { kind: "picto"; filled: number; caption: string }
  | { kind: "timeline" };

const figures: {
  figure: string;
  unit?: string;
  text: string;
  source: Source;
  viz?: FigureViz;
}[] = [
  {
    figure: "数千万〜億",
    unit: "円",
    text: "中小企業でも、数千万円単位、場合によっては億単位の損害が出る（日本ネットワークセキュリティ協会）",
    source: {
      label: "jnsa",
      href: "https://www.jnsa.org/seminar/2025/cross/data/20250827_02.pdf",
    },
  },
  {
    figure: "3,900",
    unit: "万円",
    viz: { kind: "timeline" },
    text: "サーバーの管理画面の弱点から侵入された事例では、業務が止まり、完全に復旧するまで2か月かかり、想定被害額は3,900万円でした（IPA 中小企業の事例集、2026年3月）",
    source: { label: "ipa", href: IPA_SME },
  },
  {
    figure: "35.1",
    unit: "%",
    viz: {
      kind: "meter",
      value: 35.1,
      caption: "被害に遭った中小企業のうち、個人情報が漏洩した割合",
    },
    text: "サイバー被害に遭った中小企業のうち、35.1%で個人情報が漏洩しています。被害額は最大で1億円、復旧に最も時間がかかったケースは360日でした（IPA 2024年度調査）",
    source: { label: "itmedia", href: ITMEDIA },
  },
  {
    figure: "約7",
    unit: "割",
    viz: {
      kind: "picto",
      filled: 7,
      caption: "取引先にも影響が出た企業（10社中およそ7社）",
    },
    text: "被害は自社だけで終わりません。約7割の企業が「取引先にも影響が出た」と回答しています。",
    source: { label: "itmedia", href: ITMEDIA },
  },
];

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
    name: "診断だけ",
    target: "まずは現状を知りたい方へ",
    items: [
      "外部から、WordPress本体・プラグイン・テーマ・PHPのバージョンを診断",
      "危険度ごとに整理したレポートと、対策の優先順位",
      "結果を担当者が説明（オンライン30分）",
    ],
  },
  {
    no: "2",
    name: "保守だけ",
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
  { when: "何が危ないか分からない", menu: "診断だけ" },
  { when: "今のWordPressを使い続けたい", menu: "保守だけ" },
  { when: "更新はほとんどせず、もう悩みたくない", menu: "移行" },
  {
    when: "迷ったら",
    menu: "無料の簡易診断で、最適なメニューを提案します",
    highlight: true,
  },
];

const steps = [
  { title: "無料簡易診断の申し込み", text: "URLを入力するだけ" },
  { title: "診断結果の報告とメニューの提案" },
  { title: "見積もりと契約" },
  {
    title: "作業開始",
    text: "移行の場合は、確認用サイトでチェックしてから切り替え",
  },
  { title: "納品・継続サポート" },
];

/* ---------------------------------------------------------- 小さな部品 */

function SourceLink({ source, dark }: { source: Source; dark?: boolean }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-[11px] tracking-[0.04em] underline-offset-2 transition-colors hover:underline",
        dark
          ? "text-white/45 hover:text-white"
          : "text-ink-muted hover:text-brand-600",
      )}
    >
      出典：{source.label}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(新しいタブで開く)</span>
    </a>
  );
}

/** 章見出し: 左に章番号とラベル、右に見出し。上に細い罫線 */
function Section({
  no,
  label,
  title,
  lead,
  dark,
  className,
  children,
  id,
}: {
  no: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-20 md:py-28",
        dark ? "bg-[#111] text-white" : "bg-white",
        className,
      )}
    >
      <Container>
        <Reveal variant="none">
          <div className="relative grid gap-6 pt-6 lg:grid-cols-12 lg:gap-10">
            {/* 上の罫線: 画面に入ると左から伸びる */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-[1200ms] ease-expo group-data-[visible=true]/reveal:scale-x-100",
                dark ? "bg-white/25" : "bg-ink",
              )}
            />
            <p
              className={cn(
                "flex translate-y-3 items-baseline gap-3 text-xs font-bold tracking-[0.2em] opacity-0 transition-all delay-200 duration-700 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100 lg:col-span-4",
                dark ? "text-white/60" : "text-ink-muted",
              )}
            >
              <span
                className={cn("tabular-nums", dark ? "text-white" : "text-ink")}
              >
                {no}
              </span>
              <span className="uppercase">{label}</span>
            </p>
            <div className="translate-y-5 opacity-0 transition-all delay-300 duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100 lg:col-span-8">
              <h2 className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-black leading-[1.35] tracking-[0.02em]">
                {title}
              </h2>
              {lead ? (
                <p
                  className={cn(
                    "mt-4 text-[15px] leading-[1.9]",
                    dark ? "text-white/70" : "text-ink-soft",
                  )}
                >
                  {lead}
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}

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
  { lines: ["サポート切れ", "PHP"], at: 70 },
  { lines: ["プラグインの", "脆弱性"], at: 110 },
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
        viewBox={`0 0 ${BIG.w} ${BIG.h}`}
        className="mx-auto block w-full max-w-[920px]"
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
 * メーター: 1つの割合を全体(100%)に対して示す横棒。
 * 塗り=ブランド色、未達部分=同じ色相の淡いトラック。表示時に左から伸びる。
 */
function Meter({
  value,
  label,
  caption,
  dark,
  hideLabel,
}: MeterData & { dark?: boolean; hideLabel?: boolean }) {
  return (
    <figure role="img" aria-label={`${caption}：${label}`} className="w-full">
      <div className="flex items-baseline justify-between gap-4">
        <figcaption
          className={cn(
            "text-xs leading-relaxed",
            dark ? "text-white/60" : "text-ink-muted",
          )}
        >
          {caption}
        </figcaption>
        {hideLabel ? null : (
          <span
            className={cn(
              "shrink-0 text-sm font-black",
              dark ? "text-white" : "text-ink",
            )}
          >
            <CountUp value={label} />
          </span>
        )}
      </div>
      <div
        className={cn(
          "mt-2 h-2 overflow-hidden rounded-full",
          dark ? "bg-white/15" : "bg-brand-100",
        )}
      >
        <div
          style={{ width: `${value}%` }}
          className={cn(
            "h-full origin-left scale-x-0 rounded-full transition-transform delay-300 duration-[1200ms] ease-expo group-data-[visible=true]/reveal:scale-x-100",
            dark ? "bg-brand-300" : "bg-brand-500",
          )}
        />
      </div>
      <div
        className={cn(
          "mt-1 flex justify-between text-[10px]",
          dark ? "text-white/35" : "text-ink-muted/70",
        )}
      >
        <span>0%</span>
        <span>100%</span>
      </div>
    </figure>
  );
}

/** 10マスのうち filled マスを塗るピクトグラム(「約7割」→ 10社中7社) */
function Pictogram({ filled, caption }: { filled: number; caption: string }) {
  return (
    <figure role="img" aria-label={`${caption}`} className="w-full">
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            style={{ transitionDelay: `${300 + i * 60}ms` }}
            className={cn(
              "aspect-[3/4] rounded-[2px] opacity-0 transition-opacity duration-500 group-data-[visible=true]/reveal:opacity-100",
              i < filled ? "bg-brand-300" : "bg-white/15",
            )}
          />
        ))}
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed text-white/60">
        {caption}
      </figcaption>
    </figure>
  );
}

/** 侵入から完全復旧までの時間軸(IPA事例: 復旧まで2か月、想定被害額3,900万円) */
function RecoveryTimeline() {
  return (
    <figure
      role="img"
      aria-label="侵入から業務停止を経て、完全復旧まで2か月"
      className="w-full"
    >
      <div className="relative h-8">
        <span className="absolute inset-x-1 top-1/2 h-0.5 -translate-y-1/2 bg-white/15" />
        <span className="absolute inset-x-1 top-1/2 h-0.5 origin-left -translate-y-1/2 scale-x-0 bg-brand-300 transition-transform delay-300 duration-[1400ms] ease-expo group-data-[visible=true]/reveal:scale-x-100" />
        <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-brand-300 ring-4 ring-[#111]" />
        <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white ring-4 ring-[#111]" />
        <span className="absolute left-1/2 top-0 -translate-x-1/2 bg-[#111] px-2 text-xs font-black text-white">
          2か月
        </span>
      </div>
      <figcaption className="mt-1 flex justify-between text-xs text-white/60">
        <span>侵入・業務停止</span>
        <span>完全復旧</span>
      </figcaption>
    </figure>
  );
}

function FigureVisual({ viz }: { viz: FigureViz }) {
  if (viz.kind === "meter")
    return (
      <Meter
        value={viz.value}
        label={`${viz.value}%`}
        caption={viz.caption}
        dark
        hideLabel
      />
    );
  if (viz.kind === "picto")
    return <Pictogram filled={viz.filled} caption={viz.caption} />;
  return <RecoveryTimeline />;
}

/** 移行で攻撃の入口がなくなる仕組み(移行前 / 移行後) */
function MigrationDiagram() {
  const before = ["PHP", "データベース", "管理画面"];
  return (
    <figure className="mt-16 border border-ink/15 bg-[#F6F5F2] p-6 md:p-10">
      <figcaption className="text-xs font-bold tracking-[0.2em] text-ink-muted">
        図：「移行」で攻撃の入口をふさぐ
      </figcaption>
      <div className="mt-6 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <div className="border border-ink/15 bg-white p-5 md:p-6">
          <p className="text-xs font-bold tracking-[0.15em] text-ink-muted">
            移行前（WordPress）
          </p>
          <p className="mt-1 text-base font-black text-ink">
            攻撃の入口が3つある
          </p>
          <ul className="mt-5 space-y-2">
            {before.map((b) => (
              <li
                key={b}
                className="flex items-center justify-between border border-[#B42318]/30 bg-[#FDF1F0] px-4 py-3"
              >
                <span className="text-sm font-bold text-ink">{b}</span>
                <span className="text-[11px] font-bold text-[#B42318]">
                  攻撃の入口
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            サーバーに個人情報が溜まる構成
          </p>
        </div>

        <div className="flex items-center justify-center" aria-hidden="true">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-white md:rotate-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="rotate-90 md:rotate-0"
            >
              <path
                d="M4 10h12M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="border-2 border-brand-500 bg-white p-5 md:p-6">
          <p className="text-xs font-bold tracking-[0.15em] text-brand-600">
            移行後（静的HTML）
          </p>
          <p className="mt-1 text-base font-black text-ink">
            攻撃の入口をふさぐ
          </p>
          <ul className="mt-5 space-y-2">
            {before.map((b) => (
              <li
                key={b}
                className="flex items-center justify-between border border-ink/10 bg-[#F6F5F2] px-4 py-3"
              >
                <span className="text-sm font-bold text-ink-muted line-through decoration-ink/40">
                  {b}
                </span>
                <span className="text-[11px] font-bold text-ink-muted">
                  なし
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            サーバーに個人情報を溜めない構成。問い合わせフォームは安全な方式に置き換え
          </p>
        </div>
      </div>
    </figure>
  );
}

/** どれを選べばいい？: 状況 → おすすめメニューの判断フロー図 */
function DecisionFlow() {
  const branches = choices.filter((c) => !c.highlight);
  const fallback = choices.find((c) => c.highlight);
  return (
    <figure aria-label="状況に応じたおすすめメニューの判断フロー">
      <div className="mx-auto w-fit border-2 border-ink bg-white px-6 py-3 text-center text-[15px] font-black text-ink">
        ホームページの状況は？
      </div>
      {/* 分岐線(PC) */}
      <div
        aria-hidden="true"
        className="relative mx-auto hidden h-10 w-2/3 md:block"
      >
        <span className="absolute left-1/2 top-0 h-5 w-px bg-ink/40" />
        <span className="absolute inset-x-0 top-5 h-px bg-ink/40" />
        <span className="absolute left-0 top-5 h-5 w-px bg-ink/40" />
        <span className="absolute left-1/2 top-5 h-5 w-px bg-ink/40" />
        <span className="absolute right-0 top-5 h-5 w-px bg-ink/40" />
      </div>
      <span
        aria-hidden="true"
        className="mx-auto block h-6 w-px bg-ink/40 md:hidden"
      />
      <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
        {branches.map((c, i) => (
          <li key={c.when}>
            <Reveal
              variant="fade"
              delay={i * 100}
              className="flex h-full flex-col items-stretch text-center"
            >
              <p className="flex flex-1 items-center justify-center border border-ink/15 bg-white px-4 py-4 text-sm font-bold leading-relaxed text-ink">
                {c.when}
              </p>
              <span aria-hidden="true" className="mx-auto my-2 text-brand-500">
                ↓
              </span>
              <p className="bg-ink px-4 py-3 text-base font-black text-white">
                {c.menu}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
      {fallback ? (
        <Reveal variant="fade" className="mt-8">
          <div className="flex flex-col items-center gap-3 border-2 border-brand-500 bg-white px-6 py-5 text-center sm:flex-row sm:justify-center sm:gap-6">
            <span className="text-[15px] font-black text-ink">
              {fallback.when}
            </span>
            <span aria-hidden="true" className="text-brand-500">
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
            <span className="text-[15px] font-black text-brand-600">
              {fallback.menu.split("、").map((part, i, arr) => (
                <span key={part}>
                  {part}
                  {i < arr.length - 1 ? (
                    <>
                      、<br className="sm:hidden" />
                    </>
                  ) : null}
                </span>
              ))}
            </span>
          </div>
        </Reveal>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------- 構造化データ */

const SITE = site.url.replace(/\/$/, "");

/** Service: 3つのメニューを OfferCatalog、無料簡易診断を 0円の Offer として記述 */
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
      name: "無料簡易診断",
      description: "URLを入力するだけで申し込める、ホームページの無料簡易診断",
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
      a: "「診断だけ」「保守だけ」「移行」の3つから、必要なものだけを選べます。",
    },
    ...choices.map((c) => ({
      q: c.highlight
        ? "どのメニューを選べばよいか迷ったら？"
        : `${c.when}場合は、どのメニューがおすすめですか？`,
      a: c.highlight ? `${c.menu}。` : `「${c.menu}」がおすすめです。`,
    })),
    {
      q: "無料簡易診断はどのように申し込めますか？",
      a: "URLを入力するだけで申し込めます。診断結果の報告とあわせて、最適なメニューをご提案します。",
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
      <section className="relative isolate overflow-hidden border-b border-ink/10 bg-[#FBF5F5]">
        {/* 背景画像: 右側のイラストを見せ、左側(コピー部分)は白で淡くして可読性を確保 */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="/services/web-security/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-ken-burns object-cover object-[78%_center] lg:object-right"
          />
          {/* スマホ: 全体を白く被せて文字を読みやすく */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] lg:hidden" />
          {/* PC: 左から白のグラデーション */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.75)_38%,rgba(255,255,255,0)_62%)] lg:block" />
        </div>
        <Container className="pb-16 pt-10 md:pb-24 md:pt-14 lg:min-h-[640px]">
          <nav aria-label="パンくず" className="text-xs text-ink-muted">
            <Link
              href={localePath("/services", locale)}
              className="hover:text-ink"
            >
              サービス
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{title}</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 md:mt-14 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-[0.25em] text-brand-600 animate-fade-up">
                WEBSITE SECURITY
              </p>
              <h1 className="mt-5 text-[min(2.6rem,9.6vw)] md:text-[clamp(2.4rem,5.6vw,5rem)] font-black leading-[1.15] tracking-[0.01em] text-ink">
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
                  無料で簡易診断を申し込む
                </Button>
                <Button
                  href={localePath("/contact", locale)}
                  size="lg"
                  variant="secondary"
                >
                  無料で相談する
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* サービスの価値と対応内容 */}
      <section className="relative isolate overflow-hidden bg-white py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 animate-blob rounded-full bg-brand-100/50 blur-[120px]"
        />
        <Container>
          <Reveal variant="none" className="text-center">
            <p className="flex translate-y-3 items-center justify-center gap-3 text-xs font-bold tracking-[0.25em] text-ink-muted opacity-0 transition-all duration-700 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100">
              <span className="text-ink">01</span>
              VALUE
            </p>
            <h2 className="mt-5 text-[clamp(1.5rem,4.2vw,3.1rem)] font-black leading-[1.4] tracking-[0.02em] text-ink">
              <span className="line-mask">
                <span className="animate-none translate-y-[110%] transition-transform duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0">
                  今すぐやるべき必須の
                </span>
              </span>
              <span className="line-mask">
                <span className="animate-none translate-y-[110%] transition-transform delay-150 duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0">
                  <span className="text-brand-600">HPセキュリティ対策</span>
                  <br className="sm:hidden" />
                  に絞って実施
                </span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl translate-y-3 text-[15px] leading-[2] text-ink-soft opacity-0 transition-all delay-300 duration-700 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100">
              {/* TODO: 本文確定後に差し替え */}
              個人情報の受付窓口であるホームページを、外からの攻撃から守ります。現状を診断し、必要な対策を行い、安全な状態を保ち続けることで、情報漏洩のリスクを低減します。
            </p>
          </Reveal>

          {/* 図: PCは大きな図、スマホはコンパクトな図 */}
          <div className="mt-10 md:mt-14">
            <div className="hidden md:block">
              <DefenseDiagramLarge />
            </div>
            <div className="mx-auto max-w-[420px] md:hidden">
              <DefenseDiagram />
            </div>
          </div>

          {/* 対応内容 */}
          <ol className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
            {values.map((v, i) => (
              <li key={v.name}>
                <Reveal variant="up" delay={i * 120} className="h-full">
                  <div className="group relative h-full overflow-hidden border border-ink/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_24px_50px_-28px_rgba(122,30,53,0.45)] md:p-8">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-500 transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <p className="flex items-baseline gap-3">
                      <span className="text-xs font-bold text-brand-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-2xl font-black text-ink">
                        {v.name}
                      </span>
                    </p>
                    <p className="mt-3 text-base font-black text-brand-600">
                      {v.value}
                    </p>
                    <p className="mt-2 text-sm leading-[1.9] text-ink-soft">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <Link
              href="#menu"
              className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-bold text-ink transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              3つのメニューを詳しく見る
              <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ⑥ なぜ今 */}
      <Section
        no="02"
        label="Why Now"
        title="なぜ今、対策が必要なのか"
        className="bg-[#F6F5F2]"
      >
        <div className="grid border-l border-t border-ink/15 md:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              variant="fade"
              delay={i * 80}
              className="h-full"
            >
              <div className="relative flex h-full flex-col border-b border-r border-ink/15 bg-white/60 p-7 transition-colors duration-500 hover:bg-white md:p-9 before:absolute before:left-0 before:top-0 before:h-[3px] before:w-full before:origin-left before:scale-x-0 before:bg-brand-500 before:transition-transform before:duration-500 hover:before:scale-x-100">
                <p className="text-xs font-bold tabular-nums tracking-[0.2em] text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-black leading-snug text-ink md:text-xl">
                  {r.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.9] text-ink-soft">
                  {r.text}
                </p>
                {r.meter ? (
                  <div className="mt-6">
                    <Meter {...r.meter} />
                  </div>
                ) : null}
                {r.source ? (
                  <p className="mt-5">
                    <SourceLink source={r.source} />
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ⑦ 損害 */}
      <Section
        no="03"
        label="Risk"
        title="情報漏洩で生まれる損害"
        lead="漏洩すると、これだけの対応と損失が発生します"
        dark
      >
        <ol className="grid border-t border-white/20 md:grid-cols-2 md:gap-x-12">
          {damages.map((d, i) => (
            <li key={d.title} className="border-b border-white/20">
              <Reveal variant="fade" delay={i * 50}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 py-5">
                  <span className="pt-0.5 text-sm font-bold tabular-nums text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-base font-black">{d.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">
                      {d.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-20">
          <p className="text-xs font-bold tracking-[0.2em] text-white/60">
            数字で見る損害
          </p>
          <ul className="mt-6 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {figures.map((f, i) => (
              <li
                key={f.text}
                className={cn(
                  "border-b border-white/20 py-8 sm:px-6 lg:border-b-0",
                  i % 2 === 1 && "sm:border-l",
                  i > 0 && "lg:border-l",
                  "border-white/20 sm:first:pl-0",
                )}
              >
                <Reveal
                  variant="fade"
                  delay={i * 80}
                  className="flex h-full flex-col"
                >
                  <p className="font-black leading-none tracking-tight">
                    <span className="text-[2.5rem] md:text-5xl lg:text-4xl xl:text-[2.6rem]">
                      <CountUp value={f.figure} />
                    </span>
                    {f.unit ? (
                      <span className="ml-1 whitespace-nowrap text-base text-white/80">
                        {f.unit}
                      </span>
                    ) : null}
                  </p>
                  {f.viz ? (
                    <div className="mt-6">
                      <FigureVisual viz={f.viz} />
                    </div>
                  ) : null}
                  <p className="mt-5 flex-1 text-[13px] leading-[1.9] text-white/70">
                    {f.text}
                  </p>
                  <p className="mt-4">
                    <SourceLink source={f.source} dark />
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal variant="fade" className="mt-16 border-t border-white/20 pt-10">
          <p className="max-w-3xl text-[clamp(1.25rem,2.6vw,2rem)] font-black leading-[1.6]">
            対策の費用は、
            <br />
            漏洩した後の損害より
            <br className="sm:hidden" />
            <span className="text-brand-200">ずっと小さく</span>済みます。
          </p>
        </Reveal>
      </Section>

      {/* ⑧ 3つのメニュー */}
      <Section
        id="menu"
        no="04"
        label="Menu"
        title="3つのメニュー"
        lead="必要なものだけ選べます"
      >
        <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {menus.map((m, i) => (
            <li key={m.name}>
              <Reveal
                variant="fade"
                delay={i * 100}
                className="group/menu flex h-full flex-col border-t-2 border-ink pt-6 transition-colors duration-300 hover:border-brand-500"
              >
                <p className="text-xs font-bold tabular-nums tracking-[0.2em] text-ink-muted">
                  MENU {m.no.padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-3xl font-black text-ink transition-transform duration-500 ease-expo group-hover/menu:translate-x-1">
                  {m.name}
                </h3>
                <p className="mt-2 text-sm font-bold text-brand-600">
                  {m.target}
                </p>
                <ul className="mt-6 flex-1 border-t border-ink/15">
                  {m.items.map((it) => (
                    <li
                      key={it}
                      className="border-b border-ink/15 py-3.5 text-sm leading-relaxed text-ink-soft"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
                {m.note ? (
                  <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                    {m.note}
                  </p>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal variant="fade">
          <MigrationDiagram />
        </Reveal>
      </Section>

      {/* ⑨ どれを選べばいい？ */}
      <Section
        no="05"
        label="Which One"
        title="どれを選べばいい？"
        className="bg-[#F6F5F2]"
      >
        <DecisionFlow />
      </Section>

      {/* ⑩ ご利用の流れ */}
      <Section no="06" label="Flow" title="ご利用の流れ">
        <ol className="relative grid gap-0 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal
                variant="fade"
                delay={i * 80}
                className="flex gap-5 pb-8 lg:block lg:pb-0 lg:pr-6"
              >
                {/* 縦(スマホ)・横(PC)の進行線 */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px origin-top-left scale-0 bg-brand-500/50 transition-transform delay-300 duration-700 ease-expo group-data-[visible=true]/reveal:scale-100 lg:left-8 lg:top-[15px] lg:h-px lg:w-[calc(100%-2rem)]"
                  />
                ) : null}
                <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink bg-white text-xs font-bold tabular-nums text-ink">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <p className="text-[15px] font-black leading-snug text-ink">
                    {s.title}
                  </p>
                  {s.text ? (
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                      {s.text}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* 申し込みフォーム(ファーストビューのメインCTAの遷移先) */}
      <section
        id="diagnosis"
        className="scroll-mt-20 border-t border-ink/10 bg-[#F6F5F2] py-20 md:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold tracking-[0.2em] text-brand-600">
                FREE CHECK
              </p>
              <h2 className="mt-4 text-[clamp(1.5rem,3.2vw,2.5rem)] font-black leading-[1.35] text-ink">
                無料簡易診断の
                <br />
                お申し込み
              </h2>
              <p className="mt-5 text-[15px] leading-[1.9] text-ink-soft">
                URLを入力するだけで申し込めます。診断結果の報告とあわせて、最適なメニューをご提案します。
              </p>
              <dl className="mt-8 border-t border-ink/15 text-sm">
                {[
                  ["費用", "無料"],
                  ["必要な情報", "ホームページのURL"],
                  ["その後の流れ", "診断結果の報告とメニューの提案"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[7rem_1fr] border-b border-ink/15 py-3.5"
                  >
                    <dt className="font-bold text-ink-muted">{k}</dt>
                    <dd className="font-bold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-sm text-ink-soft">
                診断の前に相談したい方は
                <Link
                  href={localePath("/contact", locale)}
                  className="mx-1 font-bold text-ink underline underline-offset-4 hover:text-brand-600"
                >
                  無料で相談する
                </Link>
                からどうぞ。
              </p>
            </div>
            <div className="lg:col-span-7">
              <WebSecurityDiagnosisForm
                privacyHref={localePath("/privacy", locale)}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
