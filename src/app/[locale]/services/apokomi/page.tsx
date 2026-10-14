import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { ApokomiLeadForm } from "@/components/contact/ApokomiLeadForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/i18n/path";

export const metadata: Metadata = {
  title: "アポコミ | 成果連動型インサイドセールス代行",
  description:
    "稼働費はフリーランス並み、成果報酬はアポが生まれたときだけ。戦略立案からアポイント獲得まで、アポコミが商談の入口をつくりきります。",
};

const clientLogos = [
  { name: "Fixx", src: "/clients/fixx.png", width: 168 },
  { name: "JAPAN AI株式会社", src: "/clients/japan-ai.webp", width: 302 },
  { name: "LegalOn Technologies", src: "/clients/legalontechnology.jpg", width: 284 },
  { name: "TOPPANコスモ", src: "/clients/toppan-cosmo.png", width: 235 },
  { name: "kubell", src: "/clients/kubell.jpeg", width: 186 },
  { name: "uluru", src: "/clients/ururu.png", width: 218 },
  { name: "And L.", src: "/clients/andoeru.png", width: 200 },
  { name: "三省堂書店", src: "/clients/sanseido.png", width: 252 },
  { name: "KOMPEITO", src: "/clients/kompeito.png", width: 252 },
  { name: "OKAN", src: "/clients/okan.png", width: 186 },
];

const problems = [
  { lines: ["成果が出ない月も、", "営業代行に高額な費用を払っている"], keyword: "高額な費用" },
  { lines: ["営業活動を外注しても、", "社内にノウハウが蓄積されない"], keyword: "ノウハウ" },
  { lines: ["フリーランスに依頼したいが、", "稼働管理や品質に不安がある"], keyword: "品質" },
  { lines: ["新規開拓を始めたいが、", "何から手をつければよいか分からない"], keyword: "何から" },
  { lines: ["営業人材が不足しており、", "新規開拓に手が回らない"], keyword: "人材" },
  { lines: ["アポイント数を増やしたいが、", "有効な打ち手が見つからない"], keyword: "打ち手" },
];

const serviceSteps = [
  ["01", "戦略立案", "市場・顧客分析から、狙うべき業界・役職・訴求を設計", "アポコミ"],
  ["02", "アサイン・教育", "商材に合う担当者を選び、トークと運用ルールを研修", "アポコミ"],
  ["03", "アポイント獲得", "ターゲット企業へアプローチし、商談機会を創出", "アポコミ"],
  ["04", "商談", "獲得したアポイントで初回商談を実施", "貴社／アポコミ(オプション)"],
  ["05", "成約", "商談から契約・取引開始へ", "貴社"],
];

const reasonTableRows = [
  ["稼働の費用", "1人あたり月50万〜60万円", "なし", "時給2,000円〜"],
  ["成果の費用", "なし", "アポ1件 1.5万〜2万円", "アポ1件 1万円"],
  ["成果が出ない月", "固定費が全額かかる", "稼働量が代行会社任せ", "稼働費と運用PM費のみ。品質はPMが管理"],
];

const reason02Steps = [
  ["仮説を立てる", "業界・役職・訴求の仮説を立て、複数パターンで同時に検証"],
  ["成功と失敗を分析する", "アポにつながった会話と断られた理由を、すべてデータ化"],
  ["徹底的に磨き上げる", "ターゲティングとトークスクリプトを、隔週の定例で改善し続ける"],
  ["誰でも再現できる型にする", "担当者が変わっても成果が出る、勝ちパターンとして仕組み化"],
];

const retainedAssets = ["勝ちパターン(ターゲット×訴求)", "改善を重ねたトークスクリプト", "断られた理由のデータ", "精査済みのリスト"];

const priceRows = [
  ["稼働費", "時給2,000〜2,500円", "ベース2,000円。担当者の経験・実績により変動"],
  ["成果報酬", "アポ1件 10,000円", "アポイント獲得時のみ発生"],
  ["運用PM", "月額50,000円", "隔週の振り返り定例(月2回・各30分)、月次レポート、リスト精査、トーク改善、稼働・品質管理"],
  ["初期費用", "100,000円(初回のみ)", "ヒアリング、戦略・ターゲット設計、トークスクリプト作成、担当者の選定・事前研修"],
  ["オプション", "商談代行 1件15,000円", "BANT情報のヒアリング。商談フェーズによってはクロージングまで対応"],
];

const flow = ["無料相談", "ヒアリング", "ご提案・ご契約", "立ち上げ", "稼働開始", "定例で改善"];

const faqs = [
  ["契約期間はどのくらいですか？", "3ヶ月〜のご契約です。勝ちパターンの検証には一定の期間が必要なため、最初の3ヶ月で仮説検証と改善を集中的に回します。"],
  ["アポイントはどの時点で成果になりますか？", "アポイントの成果は、商談を実施いただいた時点で確定します。"],
  ["商談まで任せることはできますか？", "はい。オプションの商談代行(1件15,000円)で、BANT情報のヒアリングを行い、商談フェーズによってはクロージングまで対応します。"],
  ["時給2,000円と2,500円の違いは？", "担当者の経験・実績による違いです。決裁者へのアプローチなど難易度の高い案件では、経験豊富な担当者をアサインします。"],
  ["申し込みからどのくらいで稼働できますか？", "お申し込みから最短5営業日で稼働を開始できます。"],
];

const companyPillars = [
  ["営業コンサル", "営業戦略の立案、ツール・集客チャネルの選定、商談改善"],
  ["BPO", "インサイドセールス代行「アポコミ」"],
  ["AI化", "営業事務やPM業務をAIで効率化(提供予定)"],
  ["人材紹介", "営業の型ができた組織への人材紹介(準備中)"],
];

const companyTable = [
  ["会社名", "セールスボンド株式会社"],
  ["代表取締役", "飯住 孝裕"],
  ["設立", "2024年7月"],
  ["所在地", "〒160-0023 東京都新宿区西新宿3-3-13 西新宿水間ビル2F"],
  ["資本金", "41,002,000円"],
  ["従業員数", "34名(業務委託を含む)"],
  ["取引銀行", "三井住友銀行、東京スター銀行"],
];

export default function ApokomiServicePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <main className="bg-[#FAF8F7] text-[#2B2B2B]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "サービス案内", url: localePath("/services", locale) },
          { name: "アポコミ", url: localePath("/services/apokomi", locale) },
        ])}
      />

      <section className="sticky top-0 z-30 border-b border-[#7B2233]/15 bg-white/95 backdrop-blur-sm">
        <Container className="py-4">
          <Link
            href={localePath("/", locale)}
            className="text-2xl font-black tracking-[0.04em] text-[#7B2233] md:text-3xl"
          >
            アポコミ
          </Link>
        </Container>
      </section>

      {/* 常に右下に表示するフローティングCTA(吹き出し型) */}
      <a
        href="#entry"
        className="group fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-[22px] bg-[#7B2233] px-7 py-5 text-base font-black text-white shadow-[0_14px_32px_-8px_rgba(123,34,51,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-[#A33A52] md:px-8 md:py-5 md:text-lg"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <path
            d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4.5 3.8c-.4.3-1-.1-1-.6V6a1 1 0 0 1 1-1Z"
            fill="currentColor"
          />
          <circle cx="9" cy="10.5" r="1.1" fill="#7B2233" />
          <circle cx="13" cy="10.5" r="1.1" fill="#7B2233" />
          <circle cx="17" cy="10.5" r="1.1" fill="#7B2233" />
        </svg>
        無料相談はこちら
        <span
          aria-hidden
          className="absolute -bottom-1.5 right-10 h-4 w-4 rotate-45 rounded-[4px] bg-[#7B2233] transition-colors group-hover:bg-[#A33A52]"
        />
      </a>

      {/* ① ファーストビュー */}
      <section className="relative isolate min-h-[520px] overflow-hidden bg-[#5c1726] md:min-h-[620px]">
        <div className="absolute inset-0">
          <Image
            src="/services/apokomi/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-contain object-right md:object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#430f1b] via-[#5c1726]/75 to-transparent md:from-[#430f1b]/95 md:via-[#5c1726]/55 md:to-transparent/10" />
        </div>
        <Container className="relative py-20 text-left text-white md:py-28 lg:py-32">
          <div className="max-w-xl rounded-3xl bg-black/25 p-6 backdrop-blur-[2px] md:bg-transparent md:p-0 md:backdrop-blur-0">
            <p className="text-lg font-black leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:text-xl">
              <Highlight>成果が出ない月は、高い固定費は不要。</Highlight>
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.3] tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:text-5xl">
              アポ獲得から、アポを生み出す仕組みづくりまで。
            </h1>
            <p className="mt-6 max-w-lg text-lg font-black leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:text-xl">
              アポ数を生み出す、余計な固定費0の設計！
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#entry" size="lg" variant="secondary" className="!rounded-full !border-white !text-white hover:!bg-white hover:!text-[#7B2233]">
                サービス資料をダウンロード
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 料金サマリー */}
      <section className="relative bg-[#FAF8F7] py-14 md:py-16">
        <Container>
          <div className="relative mx-auto -mt-24 flex max-w-md flex-col items-center gap-5 rounded-3xl border border-[#7B2233]/15 bg-white p-6 text-center shadow-[0_20px_60px_-20px_rgba(123,34,51,0.3)] md:-mt-28 md:flex-row md:justify-between md:p-8 md:text-left">
            <p className="text-4xl font-black text-[#2B2233] md:text-5xl">月額20万円〜</p>
            <Button href="#entry" size="lg" className="!rounded-full !bg-[#7B2233] hover:!bg-[#A33A52]">
              無料で相談する
            </Button>
          </div>
        </Container>
      </section>

      {/* ② 取引実績 */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mx-auto max-w-3xl text-xl font-black leading-tight md:text-2xl">
              ベンチャーから大手まで支援実績があります
            </h2>
          </div>
        </Container>
        <div
          className="relative mx-auto max-w-6xl overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee">
            <LogoStrip logos={clientLogos} />
            <LogoStrip logos={clientLogos} ariaHidden />
          </div>
        </div>
      </section>

      {/* ③ 悩み */}
      <Section title="よくある課題">
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <div
              key={problem.keyword}
              className="relative rounded-2xl border border-[#7B2233]/15 bg-white p-6 pt-9 text-center shadow-[0_14px_36px_-22px_rgba(123,34,51,0.35)] transition-transform hover:-translate-y-1"
            >
              <span className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 flex-col items-center justify-center rounded-full bg-[#7B2233] text-white shadow-md">
                <span className="text-[9px] font-bold leading-none">課題</span>
                <span className="text-lg font-black leading-none">{index + 1}</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-[#7B2233]"
                />
              </span>
              <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#7B2233]/10 text-[#7B2233]">
                <ProblemIcon index={index} />
              </div>
              <p className="mt-4 text-base font-bold leading-relaxed text-[#2B2B2B]">
                {problem.lines.map((line, lineIndex) => (
                  <span key={line} className="block">
                    {line.includes(problem.keyword)
                      ? line.split(problem.keyword).map((part, i, arr) => (
                          <span key={`${line}-${i}`}>
                            {part}
                            {i < arr.length - 1 ? (
                              <span className="text-[#7B2233]">{problem.keyword}</span>
                            ) : null}
                          </span>
                        ))
                      : line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-xl font-black text-[#7B2233]">
          その課題<Highlight>アポコミ</Highlight>が解決します！
        </p>
      </Section>

      {/* ④ サービス */}
      <Section tone="white" label="Service" title="戦略からアポ獲得まで。商談の入口は、すべて任せてください。">
        <p className="mx-auto max-w-3xl text-center text-base font-medium leading-relaxed text-[#2B2B2B]/80">
          アポコミは、アポ獲得にコミットする準成果報酬型のインサイドセールス代行です。戦略設計から担当者の教育、アポイント獲得までを担い、必要に応じて初回商談の代行にも対応します。
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-[#7B2233]/20 bg-white text-left text-sm">
            <thead>
              <tr className="bg-[#7B2233] text-white">
                <th className="p-4 font-black">ステップ</th>
                <th className="p-4 font-black">内容</th>
                <th className="p-4 font-black">担当</th>
              </tr>
            </thead>
            <tbody>
              {serviceSteps.map(([number, title, content, owner]) => (
                <tr key={number} className="border-t border-[#7B2233]/10">
                  <td className="p-4 align-top font-black text-[#7B2233]">
                    {number}<br />{title}
                  </td>
                  <td className="p-4 align-top font-medium">{content}</td>
                  <td className="p-4 align-top font-medium text-[#2B2B2B]/70">{owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SectionCta />
      </Section>

      {/* ⑤ 選ばれる理由① */}
      <Section label="Reason 01" title="払うのは、動いた分と取れた分だけ。">
        <p className="mx-auto max-w-3xl text-center text-base font-medium leading-relaxed text-[#2B2B2B]/80">
          固定費はフリーランス並みの稼働費に絞り、アポイントが生まれたときにだけ成果報酬をいただきます。成果が出ない月の負担を、最小限に抑える料金設計です。
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse overflow-hidden rounded-2xl border border-[#7B2233]/20 bg-white text-left text-sm">
            <thead>
              <tr className="bg-[#FAF8F7]">
                <th className="p-4 font-black" />
                <th className="p-4 font-black">固定報酬型の代行</th>
                <th className="p-4 font-black">成果報酬型の代行</th>
                <th className="p-4 font-black text-[#7B2233]">アポコミ</th>
              </tr>
            </thead>
            <tbody>
              {reasonTableRows.map(([label, a, b, c]) => (
                <tr key={label} className="border-t border-[#7B2233]/10">
                  <td className="p-4 align-top font-black text-[#2B2B2B]">{label}</td>
                  <td className="p-4 align-top font-medium text-[#2B2B2B]/70">{a}</td>
                  <td className="p-4 align-top font-medium text-[#2B2B2B]/70">{b}</td>
                  <td className="p-4 align-top font-black text-[#7B2233]">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs font-medium text-[#2B2B2B]/60">
          ※アポコミは別途、運用PM費用(月5万円)がかかります。他社の金額は営業代行の一般的な費用相場(PRONIアイミツ「営業代行の費用相場」)をもとにした参考値です。
        </p>
        <SectionCta />
      </Section>

      {/* ⑥ 選ばれる理由② */}
      <Section tone="white" label="Reason 02" title="半年後、代行に頼らない営業組織へ。">
        <p className="mx-auto max-w-3xl text-center text-base font-medium leading-relaxed text-[#2B2B2B]/80">
          私たちのゴールは、ずっと依頼され続けることではありません。勘や経験に頼らない、データに基づいたアポ獲得の型をつくり、貴社に残すことです。
        </p>
        <div className="mx-auto mt-10 max-w-3xl space-y-5">
          {reason02Steps.map(([title, body], index) => (
            <div key={title} className="grid gap-4 rounded-2xl border border-[#7B2233]/20 bg-[#FAF8F7] p-6 shadow-sm md:grid-cols-[140px_1fr] md:items-center">
              <p className="text-sm font-black uppercase tracking-[0.08em] text-[#A33A52]">
                STEP {index + 1}
              </p>
              <div>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#2B2B2B]/80">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border-2 border-[#7B2233] bg-white p-8 text-center shadow-[0_14px_40px_-20px_rgba(123,34,51,0.3)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A33A52]">Goal</p>
          <p className="mt-3 text-lg font-black leading-relaxed">
            半年〜1年で、代行に頼らずアポを生み出せる、自走可能な営業組織をつくる。
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <p className="text-center text-sm font-black uppercase tracking-[0.1em] text-[#2B2B2B]/60">
            伴走を通じて、貴社に残るもの
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {retainedAssets.map((item) => (
              <div key={item} className="rounded-2xl border border-[#7B2233]/20 bg-[#FAF8F7] px-5 py-4 text-sm font-black text-[#2B2B2B]">
                {item}
              </div>
            ))}
          </div>
        </div>
        <SectionCta />
      </Section>

      {/* ⑦ 料金 */}
      <Section label="Price" title="月額20万円から、ご予算に合わせて稼働量を設計。">
        <p className="mx-auto max-w-3xl text-center text-lg font-black leading-relaxed text-[#7B2233]">
          運用PM 5万円／月 ＋ 稼働費＋成果報酬 15万円〜／月
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-[#7B2233]/20 bg-white text-left text-sm">
            <thead>
              <tr className="bg-[#7B2233] text-white">
                <th className="p-4 font-black">項目</th>
                <th className="p-4 font-black">料金</th>
                <th className="p-4 font-black">内容</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map(([item, price, content]) => (
                <tr key={item} className="border-t border-[#7B2233]/10">
                  <td className="p-4 align-top font-black text-[#7B2233]">{item}</td>
                  <td className="p-4 align-top font-black">{price}</td>
                  <td className="p-4 align-top font-medium text-[#2B2B2B]/70">{content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs font-medium text-[#2B2B2B]/60">
          ※表示価格はすべて税別。契約期間は3ヶ月〜。ゼロからの営業リスト作成は別途お見積もり。月額20万円は最低ご利用予算であり、稼働時間やアポイント件数を保証するものではありません。
        </p>
        <SectionCta />
      </Section>

      {/* ⑧ 導入の流れ */}
      <Section tone="white" label="Flow" title="ご相談から稼働開始まで">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flow.map((item, index) => (
            <div key={item} className="relative rounded-2xl border border-[#7B2233]/20 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <p className="text-3xl font-black text-[#7B2233]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-xl font-black">{item}</h3>
            </div>
          ))}
        </div>
        <SectionCta />
      </Section>

      {/* ⑨ FAQ */}
      <Section label="FAQ" title="よくあるご質問">
        <div className="mx-auto max-w-4xl divide-y divide-[#7B2233]/15 overflow-hidden rounded-3xl border border-[#7B2233]/20 bg-white shadow-[0_14px_40px_-24px_rgba(123,34,51,0.3)]">
          {faqs.map(([q, a]) => (
            <details key={q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black text-[#2B2B2B]">
                <span className="flex items-center gap-3">
                  <span className="shrink-0 text-[#7B2233]">Q</span>
                  {q}
                </span>
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7B2233]/10 text-[#7B2233] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#2B2B2B]/80">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ⑩ 運営会社 */}
      <Section tone="white" label="Company" title="営業の戦略から実行、組織づくりまで、売上拡大を一気通貫で支援します。">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companyPillars.map(([title, body], index) => (
            <div key={title} className="rounded-2xl border border-[#7B2233]/20 bg-[#FAF8F7] p-6 shadow-sm">
              <p className="text-2xl font-black text-[#7B2233]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#2B2B2B]/70">{body}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-[#7B2233]/20 bg-white">
          {companyTable.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[120px_1fr] gap-4 border-b border-[#7B2233]/10 p-4 text-sm last:border-b-0 sm:grid-cols-[160px_1fr]">
              <p className="font-black text-[#7B2233]">{label}</p>
              <p className="font-medium text-[#2B2B2B]/80">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ⑪ お問い合わせ */}
      <section id="entry" className="scroll-mt-24 bg-[#7B2233] py-20 text-white md:py-28">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white/70">Contact</p>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">次のアポは、アポコミがつくる。</h2>
          <p className="mt-5 text-base font-medium leading-relaxed text-white/90">
            貴社の商材とご予算をお伺いし、最適な体制と稼働量をご提案します。まずはお気軽にご相談ください。
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-white/90">
            <span>電話：080-4870-1232</span>
            <span>メール：info@salesbond.jp</span>
            <span>担当：飯住・藤田</span>
          </div>
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl md:p-10">
            <ApokomiLeadForm />
          </div>
        </Container>
      </section>
    </main>
  );
}

function LogoStrip({
  logos,
  ariaHidden,
}: {
  logos: { name: string; src: string; width: number }[];
  ariaHidden?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12 md:gap-20 md:pr-20" aria-hidden={ariaHidden}>
      {logos.map((logo) => (
        <div key={logo.name} className="flex h-12 shrink-0 items-center md:h-20">
          <Image
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={80}
            className="h-full w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}

function Section({ label, title, children, tone = "cream" }: { label?: string; title: string; children: React.ReactNode; tone?: "cream" | "white" }) {
  return (
    <section className={tone === "white" ? "bg-white py-20 md:py-28" : "bg-[#FAF8F7] py-20 md:py-28"}>
      <Container>
        <div className="mb-12 text-center">
          {label ? <p className="text-sm font-black uppercase tracking-[0.18em] text-[#A33A52]">{label}</p> : null}
          <h2 className={`mx-auto max-w-3xl text-3xl font-black leading-tight md:text-4xl ${label ? "mt-4" : ""}`}>{title}</h2>
        </div>
        {children}
      </Container>
    </section>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-gradient-to-t from-[#F5D54A] from-[38%] to-transparent to-[38%] px-0.5"
    >
      {children}
    </span>
  );
}

function ProblemIcon({ index }: { index: number }) {
  const icons = [
    // 高額な費用: コイン
    <g key="cost">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8M9.5 10a2 2 0 0 1 2-1.5h1a1.8 1.8 0 0 1 0 3.5h-1a1.8 1.8 0 0 0 0 3.5h1a2 2 0 0 0 2-1.5" />
    </g>,
    // ノウハウが蓄積されない: 書類の受け渡し
    <g key="knowledge">
      <rect x="3" y="5" width="9" height="12" rx="1.2" />
      <rect x="12" y="7" width="9" height="12" rx="1.2" />
      <path d="M6 9h3M6 12h3M15 11h3M15 14h3" />
    </g>,
    // 品質に不安: 虫眼鏡+チェック
    <g key="quality">
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5 20 20M8 10l1.3 1.3L12.5 8" />
    </g>,
    // 何から手をつければ: 道標
    <g key="signpost">
      <path d="M12 3v18" />
      <path d="M12 7h6l-1.5 2L18 11h-6" />
      <path d="M12 13H6l1.5 2L6 17h6" />
    </g>,
    // 人材不足: 人のアイコン+マイナス
    <g key="people">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M17 11h4" />
    </g>,
    // 打ち手が見つからない: グラフ+?
    <g key="chart">
      <path d="M4 20V10M10 20V6M16 20v-4" />
      <circle cx="19" cy="7" r="2.6" />
      <path d="M18.2 6.2a.9.9 0 0 1 1.6.5c0 .7-.9.7-.9 1.4" />
      <path d="M19 9.6v.1" />
    </g>,
  ];
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {icons[index % icons.length]}
      </g>
    </svg>
  );
}

function SectionCta() {
  return (
    <div className="mt-12 text-center">
      <Button href="#entry" className="!rounded-full !bg-[#7B2233] hover:!bg-[#A33A52]">
        無料で相談する
      </Button>
    </div>
  );
}
