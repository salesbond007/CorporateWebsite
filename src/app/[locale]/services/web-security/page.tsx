import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { WebSecurityDiagnosisForm } from "@/components/contact/WebSecurityDiagnosisForm";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
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

const reasons: { title: string; text: string; source?: Source }[] = [
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
  },
  {
    title: "中小企業が狙われている",
    text: "ランサムウェア被害の約66%は中小企業で起きています。",
    source: { label: "ipa", href: "https://www.ipa.go.jp/security/reports/sme/rcu1hd0000009k82-att/sme-jirei.pdf" },
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

const figures: { figure: string; unit?: string; text: string; source: Source }[] = [
  {
    figure: "数千万〜億",
    unit: "円単位",
    text: "中小企業でも、数千万円単位、場合によっては億単位の損害が出る（日本ネットワークセキュリティ協会）",
    source: { label: "jnsa", href: "https://www.jnsa.org/seminar/2025/cross/data/20250827_02.pdf" },
  },
  {
    figure: "3,900",
    unit: "万円",
    text: "サーバーの管理画面の弱点から侵入された事例では、業務が止まり、完全に復旧するまで2か月かかり、想定被害額は3,900万円でした（IPA 中小企業の事例集、2026年3月）",
    source: { label: "ipa", href: IPA_SME },
  },
  {
    figure: "35.1",
    unit: "%",
    text: "サイバー被害に遭った中小企業のうち、35.1%で個人情報が漏洩しています。被害額は最大で1億円、復旧に最も時間がかかったケースは360日でした（IPA 2024年度調査）",
    source: { label: "itmedia", href: ITMEDIA },
  },
  {
    figure: "約7",
    unit: "割",
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
        "inline-flex items-center gap-1 text-xs underline-offset-2 transition-colors hover:underline",
        dark ? "text-white/50 hover:text-white" : "text-ink-muted hover:text-brand-600",
      )}
    >
      出典：{source.label}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(新しいタブで開く)</span>
    </a>
  );
}

function Heading({
  en,
  children,
  dark,
  sub,
}: {
  en: string;
  children: React.ReactNode;
  dark?: boolean;
  sub?: string;
}) {
  return (
    <Reveal variant="up" className="text-center">
      <p className={cn("text-xs font-bold uppercase tracking-[0.3em]", dark ? "text-brand-200" : "text-brand-500")}>
        {en}
      </p>
      <h2 className={cn("mt-3 text-2xl font-black leading-snug md:text-4xl", dark ? "text-white" : "text-ink")}>
        {children}
      </h2>
      {sub ? (
        <p className={cn("mt-4 text-sm font-bold md:text-base", dark ? "text-white/70" : "text-ink-soft")}>{sub}</p>
      ) : null}
      <span aria-hidden="true" className="mx-auto mt-6 block h-1 w-12 bg-brand-500" />
    </Reveal>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="11" cy="11" r="10" className="fill-brand-500" />
      <path d="M6.5 11.2l3 3 6-6.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
          serviceJsonLd({
            name: title,
            description: pageMeta.webSecurity.description,
            url: localePath(PATH, locale),
            keywords: ["ホームページセキュリティ", "WordPress保守", "脆弱性診断", "PHP", "静的HTML移行"],
          }),
        ]}
      />

      {/* ① ファーストビュー */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src="/services/cards/ai-solutions.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-brand-900/50 mix-blend-multiply" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,5,11,0.92)_0%,rgba(29,5,11,0.7)_50%,rgba(29,5,11,0.3)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative py-20 md:py-32">
          <p className="inline-flex items-center gap-2 border border-white/30 px-3 py-1.5 text-xs font-bold tracking-[0.15em] text-white/90 animate-fade-up">
            ホームページセキュリティ対策
          </p>
          <h1 className="mt-6 text-[clamp(1.6rem,5vw,3.5rem)] font-black leading-[1.3] tracking-tight text-white">
            <span className="line-mask">
              <span style={{ animationDelay: "0.15s" }}>漏洩の入口は、</span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "0.3s" }}>
                自社のホームページ
                <br className="sm:hidden" />
                かもしれない。
              </span>
            </span>
          </h1>
          <p
            className="mt-5 text-lg font-bold tracking-[0.06em] text-brand-200 animate-fade-up md:text-2xl"
            style={{ animationDelay: "0.5s" }}
          >
            情報漏洩が起きる、その前に。
          </p>
          <p
            className="mt-6 max-w-2xl text-sm leading-[2] text-white/85 animate-fade-up md:text-base"
            style={{ animationDelay: "0.65s" }}
          >
            問い合わせフォーム、採用応募、会員登録など、ホームページは個人情報の入口です。AI時代のホームページセキュリティ対策として、「診断」「保守」「移行」の3つから必要なものだけを選べます。
          </p>
          <div
            className="mt-9 grid gap-3 animate-fade-up sm:flex sm:flex-wrap"
            style={{ animationDelay: "0.8s" }}
          >
            <Button href="#diagnosis" size="lg">
              無料で簡易診断を申し込む
            </Button>
            <Button
              href={localePath("/contact", locale)}
              size="lg"
              variant="secondary"
              className="!border-white/70 !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white hover:!text-ink"
            >
              まずは相談する
            </Button>
          </div>
        </Container>
      </section>

      {/* ⑤ こんなお悩みはありませんか？ */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <Heading en="Check">こんなお悩みはありませんか？</Heading>
          <ul className="mx-auto mt-12 max-w-3xl space-y-3">
            {worries.map((w, i) => (
              <li key={w}>
                <Reveal variant="up" delay={i * 80}>
                  <div className="flex items-start gap-4 border border-ink/10 bg-white px-5 py-4 md:px-7 md:py-5">
                    <CheckIcon />
                    <p className="text-[15px] font-bold leading-relaxed text-ink md:text-base">{w}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ⑥ なぜ今、対策が必要なのか */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <Heading en="Why Now">なぜ今、対策が必要なのか</Heading>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
            {reasons.map((r, i) => (
              <li key={r.title}>
                <Reveal variant="up" delay={i * 100} className="h-full">
                  <div className="flex h-full flex-col border-t-4 border-brand-500 bg-cream p-6 md:p-8">
                    <span className="font-display text-3xl font-black text-brand-500/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-lg font-black text-ink md:text-xl">{r.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-[1.9] text-ink-soft md:text-[15px]">{r.text}</p>
                    {r.source ? (
                      <p className="mt-4">
                        <SourceLink source={r.source} />
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ⑦ 情報漏洩で生まれる損害 */}
      <section className="relative isolate overflow-hidden bg-brand-900 py-20 text-white md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <Container>
          <Heading en="Risk" dark sub="漏洩すると、これだけの対応と損失が発生します">
            情報漏洩で生まれる損害
          </Heading>

          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {damages.map((d, i) => (
              <li key={d.title} className={cn(i === damages.length - 1 && "sm:col-span-2 lg:col-span-1")}>
                <Reveal variant="up" delay={i * 60} className="h-full">
                  <div className="h-full border border-white/15 bg-white/[0.04] p-5">
                    <p className="flex items-baseline gap-3">
                      <span className="font-display text-2xl font-black text-brand-300">{i + 1}</span>
                      <span className="text-base font-black">{d.title}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{d.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal variant="up" className="mt-20 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-200">In Numbers</p>
            <h3 className="mt-3 text-xl font-black md:text-2xl">数字で見る損害</h3>
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {figures.map((f, i) => (
              <li key={f.text}>
                <Reveal variant="up" delay={i * 100} className="h-full">
                  <div className="flex h-full flex-col bg-white p-6 text-ink md:p-8">
                    <p className="font-display font-black leading-none text-brand-500">
                      <span className="text-4xl md:text-5xl">{f.figure}</span>
                      {f.unit ? <span className="ml-1 text-lg md:text-xl">{f.unit}</span> : null}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-[1.9] text-ink-soft md:text-[15px]">{f.text}</p>
                    <p className="mt-4">
                      <SourceLink source={f.source} />
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal variant="up" className="mt-14">
            <p className="mx-auto max-w-3xl border-y border-white/25 py-6 text-center text-lg font-black leading-relaxed md:text-2xl">
              対策の費用は、漏洩した後の損害よりずっと小さく済みます。
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ⑧ 3つのメニュー */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <Heading en="Menu" sub="必要なものだけ選べます">
            3つのメニュー
          </Heading>
          <ol className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {menus.map((m, i) => (
              <li key={m.name}>
                <Reveal variant="up" delay={i * 120} className="h-full">
                  <div
                    className={cn(
                      "flex h-full flex-col bg-white p-6 md:p-8",
                      m.featured ? "border-2 border-brand-500" : "border border-ink/10",
                    )}
                  >
                    <p className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center bg-brand-500 font-display text-lg font-black text-white">
                        {m.no}
                      </span>
                      <span className="text-2xl font-black text-ink">{m.name}</span>
                    </p>
                    <p className="mt-4 text-sm font-bold text-brand-600">{m.target}</p>
                    <ul className="mt-5 flex-1 space-y-3 border-t border-ink-line pt-5">
                      {m.items.map((it) => (
                        <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-500" />
                          {it}
                        </li>
                      ))}
                    </ul>
                    {m.note ? <p className="mt-5 text-xs leading-relaxed text-ink-muted">{m.note}</p> : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ⑨ どれを選べばいい？ */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <Heading en="Which One">どれを選べばいい？</Heading>
          <ul className="mx-auto mt-12 max-w-3xl space-y-3">
            {choices.map((c, i) => (
              <li key={c.when}>
                <Reveal variant="up" delay={i * 80}>
                  <div
                    className={cn(
                      "grid items-center gap-2 px-5 py-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-5 md:px-7",
                      c.highlight ? "bg-brand-500 text-white" : "border border-ink/10 bg-cream text-ink",
                    )}
                  >
                    <p className="text-[15px] font-bold">{c.when}</p>
                    <span
                      aria-hidden="true"
                      className={cn("hidden text-lg sm:block", c.highlight ? "text-white" : "text-brand-500")}
                    >
                      →
                    </span>
                    <p className={cn("text-[15px] font-black", !c.highlight && "text-brand-600")}>
                      <span aria-hidden="true" className="mr-2 sm:hidden">→</span>
                      {c.menu}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ⑩ ご利用の流れ */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <Heading en="Flow">ご利用の流れ</Heading>
          <ol className="mt-12 grid gap-4 lg:grid-cols-5 lg:gap-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal variant="up" delay={i * 100} className="h-full">
                  <div className="relative flex h-full gap-4 border border-ink/10 bg-white p-5 lg:flex-col lg:gap-3">
                    <span className="font-display text-xs font-black tracking-[0.2em] text-brand-500">
                      STEP{String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[15px] font-black leading-snug text-ink">{s.title}</p>
                      {s.text ? <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{s.text}</p> : null}
                    </div>
                    {i < steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute -right-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-ink/20 bg-white lg:block"
                      />
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 申し込みフォーム(ファーストビューのメインCTAの遷移先) */}
      <section id="diagnosis" className="scroll-mt-20 bg-white py-20 md:py-28">
        <Container>
          <Heading en="Free Check" sub="URLを入力するだけで申し込めます">
            無料簡易診断のお申し込み
          </Heading>
          <div className="mx-auto mt-12 max-w-2xl">
            <WebSecurityDiagnosisForm privacyHref={localePath("/privacy", locale)} />
            <p className="mt-8 text-center text-sm text-ink-soft">
              診断の前に相談したい方は
              <Link
                href={localePath("/contact", locale)}
                className="mx-1 font-bold text-brand-600 underline underline-offset-4 hover:text-brand-500"
              >
                まずは相談する
              </Link>
              からお問い合わせください。
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
