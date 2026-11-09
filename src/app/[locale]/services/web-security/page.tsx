import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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
  return pageMetadata({ ...pageMeta.webSecurity, path: PATH, locale: params.locale });
}

/* ---------------------------------------------------------------- データ */

const worries = [
  "問い合わせフォームや採用応募フォームで、個人情報を受け取っている",
  "サーバー会社から「PHPを更新してください」と通知が来たが、そのままになっている",
  "サイトを作った制作会社と連絡が取れず、誰も中身が分からない",
  "採用サイトやキャンペーンサイトが、作ったまま放置されている",
  "ニュースでPHPの脆弱性を見たが、自社に関係があるのか分からない",
];

type Source = { label: string; href: string };

type MeterData = { value: number; label: string; caption: string };

const reasons: { title: string; text: string; source?: Source; meter?: MeterData }[] = [
  {
    title: "攻撃する側もAIを使う時代",
    text: "脆弱性を探す作業が自動化され、規模の小さい会社のサイトも、まとめて狙われるようになっています。",
  },
  {
    title: "2026年10月、PHPに深刻な脆弱性",
    text: "10月21日に深刻な脆弱性が2件公表されました。どちらも、認証なしで外部からサイトに不正な処理をさせられるものです。",
    source: { label: "gizmodo", href: "https://www.gizmodo.jp/article/2610-php-vulnerability-security-update/" },
  },
  {
    title: "上場企業ですら対策が追いついていない",
    text: "上場企業のサイトを調べた2026年8月の調査でも、66.7%のサイトがサポート切れのPHPで動いたままです。",
    source: { label: "dxmagazine", href: "https://dxmagazine.jp/?p=226763" },
    meter: { value: 66.7, label: "66.7%", caption: "サポート切れのPHPで動く上場企業のサイト" },
  },
  {
    title: "中小企業が狙われている",
    text: "ランサムウェア被害の約66%は中小企業で起きています。",
    source: { label: "ipa", href: "https://www.ipa.go.jp/security/reports/sme/rcu1hd0000009k82-att/sme-jirei.pdf" },
    meter: { value: 66, label: "約66%", caption: "ランサムウェア被害のうち、中小企業で起きたもの" },
  },
];

const damages: { title: string; text: string }[] = [
  { title: "原因の調査費用", text: "侵入経路や漏洩した範囲を、専門会社に調べてもらう費用（フォレンジック調査）" },
  { title: "報告と通知の対応", text: "個人情報保護委員会への報告、本人への通知、お詫び文の作成と公表" },
  { title: "問い合わせ対応", text: "お客様からの問い合わせ窓口の設置と、対応にあたる人員" },
  { title: "損害賠償", text: "漏洩した本人から、慰謝料などを請求されるリスク" },
  { title: "復旧と再発防止", text: "サイトの作り直し、セキュリティ対策の追加" },
  { title: "事業の停止", text: "サイトや業務が止まっている間の売上と機会の損失" },
  { title: "信用の失墜", text: "取引の停止、採用応募の減少、検索順位の低下" },
];

const IPA_SME = "https://www.ipa.go.jp/security/reports/sme/rcu1hd0000009k82-att/sme-jirei.pdf";
const ITMEDIA = "https://atmarkit.itmedia.co.jp/ait/articles/2502/18/news065.html";

type FigureViz =
  | { kind: "meter"; value: number; caption: string }
  | { kind: "picto"; filled: number; caption: string }
  | { kind: "timeline" };

const figures: { figure: string; unit?: string; text: string; source: Source; viz?: FigureViz }[] = [
  {
    figure: "数千万〜億",
    unit: "円",
    text: "中小企業でも、数千万円単位、場合によっては億単位の損害が出る（日本ネットワークセキュリティ協会）",
    source: { label: "jnsa", href: "https://www.jnsa.org/seminar/2025/cross/data/20250827_02.pdf" },
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
    viz: { kind: "meter", value: 35.1, caption: "被害に遭った中小企業のうち、個人情報が漏洩した割合" },
    text: "サイバー被害に遭った中小企業のうち、35.1%で個人情報が漏洩しています。被害額は最大で1億円、復旧に最も時間がかかったケースは360日でした（IPA 2024年度調査）",
    source: { label: "itmedia", href: ITMEDIA },
  },
  {
    figure: "約7",
    unit: "割",
    viz: { kind: "picto", filled: 7, caption: "取引先にも影響が出た企業（10社中およそ7社）" },
    text: "被害は自社だけで終わりません。約7割の企業が「取引先にも影響が出た」と回答しています。",
    source: { label: "itmedia", href: ITMEDIA },
  },
];

const menus: { no: string; name: string; target: string; items: string[]; note?: string; featured?: boolean }[] = [
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
  { when: "迷ったら", menu: "無料の簡易診断で、最適なメニューを提案します", highlight: true },
];

const steps = [
  { title: "無料簡易診断の申し込み", text: "URLを入力するだけ" },
  { title: "診断結果の報告とメニューの提案" },
  { title: "見積もりと契約" },
  { title: "作業開始", text: "移行の場合は、確認用サイトでチェックしてから切り替え" },
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
        dark ? "text-white/45 hover:text-white" : "text-ink-muted hover:text-brand-600",
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
    <section id={id} className={cn("scroll-mt-20 py-20 md:py-28", dark ? "bg-[#111] text-white" : "bg-white", className)}>
      <Container>
        <Reveal variant="fade">
          <div className={cn("grid gap-6 border-t pt-6 lg:grid-cols-12 lg:gap-10", dark ? "border-white/20" : "border-ink")}>
            <p
              className={cn(
                "flex items-baseline gap-3 text-xs font-bold tracking-[0.2em] lg:col-span-4",
                dark ? "text-white/60" : "text-ink-muted",
              )}
            >
              <span className={cn("tabular-nums", dark ? "text-white" : "text-ink")}>{no}</span>
              <span className="uppercase">{label}</span>
            </p>
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-black leading-[1.35] tracking-[0.02em]">{title}</h2>
              {lead ? (
                <p className={cn("mt-4 text-[15px] leading-[1.9]", dark ? "text-white/70" : "text-ink-soft")}>{lead}</p>
              ) : null}
            </div>
          </div>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}

/** ファーストビュー右側の「診断 → 対策 → 保守」の流れ図 */
const processSteps: { name: string; en: string; tagline: string; text: string }[] = [
  {
    name: "診断",
    en: "Check",
    tagline: "現状のリスクを知る",
    text: "WordPress本体・プラグイン・テーマ・PHPのバージョンを外部から診断し、危険度と対策の優先順位を整理します。",
  },
  {
    name: "対策",
    en: "Fix",
    tagline: "攻撃の入口をふさぐ",
    text: "PHP・プラグインの更新、ログイン保護・WAFの導入、必要に応じて静的HTMLへの移行で入口をふさぎます。",
  },
  {
    name: "保守",
    en: "Keep",
    tagline: "安全な状態を保つ",
    text: "定期更新と更新前のバックアップ、月次の状況レポートで、安全な状態を維持します。",
  },
];

function ProcessDiagram() {
  return (
    <figure
      aria-label="ホームページセキュリティ対策の流れ：診断、対策、保守"
      className="border border-ink/15 bg-white shadow-[0_30px_60px_-30px_rgba(17,17,17,0.35)]"
    >
      <figcaption className="flex items-center justify-between border-b border-ink/10 bg-[#F6F5F2] px-5 py-3">
        <span className="text-xs font-bold tracking-[0.12em] text-ink">ホームページセキュリティ対策の流れ</span>
        <span className="text-[11px] font-bold tracking-[0.15em] text-ink-muted">3 STEPS</span>
      </figcaption>
      <ol className="px-5 py-6 md:px-7">
        {processSteps.map((st, i) => (
          <li key={st.name} className="relative grid grid-cols-[3rem_1fr] gap-x-4 pb-7 last:pb-0">
            {/* ステップ間をつなぐ線と矢印 */}
            {i < processSteps.length - 1 ? (
              <>
                <span aria-hidden="true" className="absolute bottom-0 left-6 top-12 w-px -translate-x-1/2 bg-brand-500/40" />
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-6 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-brand-500/60"
                />
              </>
            ) : null}
            <span
              className={cn(
                "relative z-10 grid h-12 w-12 place-items-center rounded-full text-sm font-black",
                i === 0 ? "bg-brand-500 text-white" : "border-2 border-brand-500 bg-white text-brand-600",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-0.5">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-2xl font-black text-ink">{st.name}</span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-ink-muted">{st.en.toUpperCase()}</span>
              </p>
              <p className="mt-1 text-sm font-bold text-brand-600">{st.tagline}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">{st.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="flex items-center gap-2 border-t border-ink/10 px-5 py-3 text-[11px] font-bold text-ink-muted md:px-7">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M11.5 4.5A5 5 0 1 0 12 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M12 1.5v3h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        必要なステップだけ選べます。保守は継続してサポートします
      </p>
    </figure>
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
        <figcaption className={cn("text-xs leading-relaxed", dark ? "text-white/60" : "text-ink-muted")}>
          {caption}
        </figcaption>
        {hideLabel ? null : (
          <span className={cn("shrink-0 text-sm font-black", dark ? "text-white" : "text-ink")}>{label}</span>
        )}
      </div>
      <div className={cn("mt-2 h-2 overflow-hidden rounded-full", dark ? "bg-white/15" : "bg-brand-100")}>
        <div
          style={{ width: `${value}%` }}
          className={cn(
            "h-full origin-left scale-x-0 rounded-full transition-transform delay-300 duration-[1200ms] ease-expo group-data-[visible=true]/reveal:scale-x-100",
            dark ? "bg-brand-300" : "bg-brand-500",
          )}
        />
      </div>
      <div className={cn("mt-1 flex justify-between text-[10px]", dark ? "text-white/35" : "text-ink-muted/70")}>
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
      <figcaption className="mt-2 text-xs leading-relaxed text-white/60">{caption}</figcaption>
    </figure>
  );
}

/** 侵入から完全復旧までの時間軸(IPA事例: 復旧まで2か月、想定被害額3,900万円) */
function RecoveryTimeline() {
  return (
    <figure role="img" aria-label="侵入から業務停止を経て、完全復旧まで2か月" className="w-full">
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
  if (viz.kind === "meter") return <Meter value={viz.value} label={`${viz.value}%`} caption={viz.caption} dark hideLabel />;
  if (viz.kind === "picto") return <Pictogram filled={viz.filled} caption={viz.caption} />;
  return <RecoveryTimeline />;
}

/** 移行で攻撃の入口がなくなる仕組み(移行前 / 移行後) */
function MigrationDiagram() {
  const before = ["PHP", "データベース", "管理画面"];
  return (
    <figure className="mt-16 border border-ink/15 bg-[#F6F5F2] p-6 md:p-10">
      <figcaption className="text-xs font-bold tracking-[0.2em] text-ink-muted">図：「移行」で攻撃の入口をふさぐ</figcaption>
      <div className="mt-6 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <div className="border border-ink/15 bg-white p-5 md:p-6">
          <p className="text-xs font-bold tracking-[0.15em] text-ink-muted">移行前（WordPress）</p>
          <p className="mt-1 text-base font-black text-ink">攻撃の入口が3つある</p>
          <ul className="mt-5 space-y-2">
            {before.map((b) => (
              <li key={b} className="flex items-center justify-between border border-[#B42318]/30 bg-[#FDF1F0] px-4 py-3">
                <span className="text-sm font-bold text-ink">{b}</span>
                <span className="text-[11px] font-bold text-[#B42318]">攻撃の入口</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">サーバーに個人情報が溜まる構成</p>
        </div>

        <div className="flex items-center justify-center" aria-hidden="true">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-white md:rotate-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="rotate-90 md:rotate-0">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div className="border-2 border-brand-500 bg-white p-5 md:p-6">
          <p className="text-xs font-bold tracking-[0.15em] text-brand-600">移行後（静的HTML）</p>
          <p className="mt-1 text-base font-black text-ink">攻撃の入口をふさぐ</p>
          <ul className="mt-5 space-y-2">
            {before.map((b) => (
              <li key={b} className="flex items-center justify-between border border-ink/10 bg-[#F6F5F2] px-4 py-3">
                <span className="text-sm font-bold text-ink-muted line-through decoration-ink/40">{b}</span>
                <span className="text-[11px] font-bold text-ink-muted">なし</span>
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
      <div aria-hidden="true" className="relative mx-auto hidden h-10 w-2/3 md:block">
        <span className="absolute left-1/2 top-0 h-5 w-px bg-ink/40" />
        <span className="absolute inset-x-0 top-5 h-px bg-ink/40" />
        <span className="absolute left-0 top-5 h-5 w-px bg-ink/40" />
        <span className="absolute left-1/2 top-5 h-5 w-px bg-ink/40" />
        <span className="absolute right-0 top-5 h-5 w-px bg-ink/40" />
      </div>
      <span aria-hidden="true" className="mx-auto block h-6 w-px bg-ink/40 md:hidden" />
      <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
        {branches.map((c, i) => (
          <li key={c.when}>
            <Reveal variant="fade" delay={i * 100} className="flex h-full flex-col items-stretch text-center">
              <p className="flex flex-1 items-center justify-center border border-ink/15 bg-white px-4 py-4 text-sm font-bold leading-relaxed text-ink">
                {c.when}
              </p>
              <span aria-hidden="true" className="mx-auto my-2 text-brand-500">↓</span>
              <p className="bg-ink px-4 py-3 text-base font-black text-white">{c.menu}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      {fallback ? (
        <Reveal variant="fade" className="mt-8">
          <div className="flex flex-col items-center gap-3 border-2 border-brand-500 bg-white px-6 py-5 text-center sm:flex-row sm:justify-center sm:gap-6">
            <span className="text-[15px] font-black text-ink">{fallback.when}</span>
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
    audience: { "@type": "BusinessAudience", name: "中小企業・コーポレートサイトを運営する企業" },
    provider: { "@type": "Organization", name: site.legalName, url: site.officialUrl },
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
      q: c.highlight ? "どのメニューを選べばよいか迷ったら？" : `${c.when}場合は、どのメニューがおすすめですか？`,
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
      <section className="relative overflow-hidden border-b border-ink/10 bg-[#F6F5F2]">
        <Container className="pb-16 pt-10 md:pb-24 md:pt-14">
          <nav aria-label="パンくず" className="text-xs text-ink-muted">
            <Link href={localePath("/services", locale)} className="hover:text-ink">
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
                  <span className="text-brand-600" style={{ animationDelay: "0.25s" }}>
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
                問い合わせフォーム、採用応募、会員登録など、ホームページは個人情報の入口です。AI時代のホームページセキュリティ対策として、「診断」「保守」「移行」の3つから必要なものだけを選べます。
              </p>
              <div
                className="mt-9 grid gap-3 animate-fade-up sm:flex sm:flex-wrap"
                style={{ animationDelay: "0.7s" }}
              >
                <Button href="#diagnosis" size="lg">
                  無料で簡易診断を申し込む
                </Button>
                <Button href={localePath("/contact", locale)} size="lg" variant="secondary">
                  まずは相談する
                </Button>
              </div>
            </div>
            <div className="animate-fade-up lg:col-span-5" style={{ animationDelay: "0.5s" }}>
              <ProcessDiagram />
            </div>
          </div>
        </Container>
      </section>

      {/* ⑤ お悩み */}
      <Section no="01" label="Check" title="こんなお悩みはありませんか？">
        <div className="lg:ml-[33.333%] lg:pl-10">
          <ul className="border-t border-ink/15">
            {worries.map((w, i) => (
              <li key={w} className="border-b border-ink/15">
                <Reveal variant="fade" delay={i * 60}>
                  <p className="flex items-start gap-4 py-5 text-[15px] font-bold leading-relaxed text-ink md:text-base">
                    <span aria-hidden="true" className="mt-1 grid h-4 w-4 shrink-0 place-items-center border border-ink/40">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5.2l2.2 2.2L8.5 2.6" stroke="#7A1E35" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {w}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ⑥ なぜ今 */}
      <Section no="02" label="Why Now" title="なぜ今、対策が必要なのか" className="bg-[#F6F5F2]">
        <div className="grid border-l border-t border-ink/15 md:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} variant="fade" delay={i * 80} className="h-full">
              <div className="flex h-full flex-col border-b border-r border-ink/15 bg-white/60 p-7 md:p-9">
                <p className="text-xs font-bold tabular-nums tracking-[0.2em] text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-black leading-snug text-ink md:text-xl">{r.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.9] text-ink-soft">{r.text}</p>
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
      <Section no="03" label="Risk" title="情報漏洩で生まれる損害" lead="漏洩すると、これだけの対応と損失が発生します" dark>
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
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{d.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-20">
          <p className="text-xs font-bold tracking-[0.2em] text-white/60">数字で見る損害</p>
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
                <Reveal variant="fade" delay={i * 80} className="flex h-full flex-col">
                  <p className="font-black leading-none tracking-tight">
                    <span className="text-[2.5rem] md:text-5xl lg:text-4xl xl:text-[2.6rem]">{f.figure}</span>
                    {f.unit ? <span className="ml-1 whitespace-nowrap text-base text-white/80">{f.unit}</span> : null}
                  </p>
                  {f.viz ? (
                    <div className="mt-6">
                      <FigureVisual viz={f.viz} />
                    </div>
                  ) : null}
                  <p className="mt-5 flex-1 text-[13px] leading-[1.9] text-white/70">{f.text}</p>
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
      <Section no="04" label="Menu" title="3つのメニュー" lead="必要なものだけ選べます">
        <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {menus.map((m, i) => (
            <li key={m.name}>
              <Reveal variant="fade" delay={i * 100} className="flex h-full flex-col border-t-2 border-ink pt-6">
                <p className="text-xs font-bold tabular-nums tracking-[0.2em] text-ink-muted">MENU {m.no.padStart(2, "0")}</p>
                <h3 className="mt-3 text-3xl font-black text-ink">{m.name}</h3>
                <p className="mt-2 text-sm font-bold text-brand-600">{m.target}</p>
                <ul className="mt-6 flex-1 border-t border-ink/15">
                  {m.items.map((it) => (
                    <li key={it} className="border-b border-ink/15 py-3.5 text-sm leading-relaxed text-ink-soft">
                      {it}
                    </li>
                  ))}
                </ul>
                {m.note ? <p className="mt-4 text-xs leading-relaxed text-ink-muted">{m.note}</p> : null}
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal variant="fade">
          <MigrationDiagram />
        </Reveal>
      </Section>

      {/* ⑨ どれを選べばいい？ */}
      <Section no="05" label="Which One" title="どれを選べばいい？" className="bg-[#F6F5F2]">
        <DecisionFlow />
      </Section>

      {/* ⑩ ご利用の流れ */}
      <Section no="06" label="Flow" title="ご利用の流れ">
        <ol className="relative grid gap-0 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal variant="fade" delay={i * 80} className="flex gap-5 pb-8 lg:block lg:pb-0 lg:pr-6">
                {/* 縦(スマホ)・横(PC)の進行線 */}
                {i < steps.length - 1 ? (
                  <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-ink/20 lg:left-8 lg:top-[15px] lg:h-px lg:w-[calc(100%-2rem)]" />
                ) : null}
                <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink bg-white text-xs font-bold tabular-nums text-ink">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <p className="text-[15px] font-black leading-snug text-ink">{s.title}</p>
                  {s.text ? <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{s.text}</p> : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* 申し込みフォーム(ファーストビューのメインCTAの遷移先) */}
      <section id="diagnosis" className="scroll-mt-20 border-t border-ink/10 bg-[#F6F5F2] py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold tracking-[0.2em] text-brand-600">FREE CHECK</p>
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
                  <div key={k} className="grid grid-cols-[7rem_1fr] border-b border-ink/15 py-3.5">
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
                  まずは相談する
                </Link>
                からどうぞ。
              </p>
            </div>
            <div className="lg:col-span-7">
              <WebSecurityDiagnosisForm privacyHref={localePath("/privacy", locale)} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
