import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  IconBanned,
  IconChecksheet,
  IconShadowAi,
  IconSoloIt,
} from "@/components/services/FlatIcons";
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
 *
 * デザイン: 角を立てた枠線のボックス、キーワードの下線、単色の帯で構成する
 * (グラデーション・丸アイコンのタイル・浮遊アニメーションは使わない)。
 */

const W = "#7A1E35";

const promises = [
  {
    title: "漏えいを防ぐ",
    text: "AIに入れていい情報・ダメな情報を決めて、社員に浸透させます",
  },
  {
    title: "説明できる",
    text: "誰が責任を持つかを決めて、取引先や監査に説明できる体制にします",
  },
  {
    title: "責任者がつく",
    text: "資格を持つ専門家が、社外の責任者としてつきます",
  },
];

const worryTags = [
  "社員が会社の知らないところでAIを使っている",
  "「AIは危ないから禁止」で活用が止まっている",
  "取引先からチェックシートや「★3」を求められた",
  "情シスが一人、または兼務で回している",
];

const worries: {
  title: string;
  text: string;
  Icon: (p: { className?: string }) => ReactNode;
}[] = [
  {
    title: "社員が会社の知らないところでAIを使っている",
    text: "何を入力してよいか、どのツールなら安全か、ルールがない。",
    Icon: IconShadowAi,
  },
  {
    title: "「AIは危ないから禁止」で、活用が止まっている",
    text: "本当は使いたいのに、判断できる人がいない。",
    Icon: IconBanned,
  },
  {
    title: "取引先からチェックシートや「★3」を求められた",
    text: "何十問もの設問に、自信を持って答えられる人が社内にいない。",
    Icon: IconChecksheet,
  },
  {
    title: "情シスが一人、または兼務で回している",
    text: "相談相手も、経営に説明するときの後ろ盾もない。",
    Icon: IconSoloIt,
  },
];

const facts = [
  {
    value: "3",
    unit: "位",
    text: "「AIの利用をめぐるサイバーリスク」が、組織向けの10大脅威に初めて選ばれ、3位に。",
    note: "※1",
  },
  {
    value: "2027",
    unit: "年3月",
    text: "取引先のセキュリティを★で評価する国の制度（SCS評価制度）の申請受付が始まる予定。",
    note: "※2",
  },
  {
    value: "84.4",
    unit: "%",
    text: "発注側の大企業のうち、取引先のセキュリティを確認している割合。",
    note: "※3",
  },
  {
    value: "63.3",
    unit: "%",
    text: "2025年のランサムウェア被害のうち、中小企業が占めた割合。",
    note: "※4",
  },
];

const features = [
  {
    lead: "AIを止めずに、",
    em: "安全に広げる",
    text: "禁止するのではなく、安心して使えるルールをつくります。社員のAI利用、社内で使うAIやAIエージェント、AIを使ったなりすまし詐欺。従来のセキュリティに加えて、AIのリスクまで一つの窓口で引き受けます。",
    visual: "policy",
  },
  {
    lead: "契約後すぐに、",
    em: "診断から",
    text: "最初の1〜2カ月で、AIの利用状況と弱点を診断します。年1回の脆弱性診断（提携の診断会社が実施）もプランに含め、結果は専門家が分かりやすく説明します。",
    visual: "diagnosis",
  },
  {
    lead: "ルールを作って",
    em: "終わりにしない",
    text: "AI利用ルールの整備、社員への説明会、取引先のチェックシート回答、社外CISOとしての名前の掲載まで行います。「専門家が責任者としてついています」と、取引先に言える状態をつくります。",
    visual: "checksheet",
  },
] as const;

const monthly = [
  "月1回の定例（90分）と月次報告",
  "チャット相談（2営業日以内に返答）",
  "自社用のAI利用ルールの作成と見直し",
  "全社員向けのAIルール説明会（年1回・オンライン60分）",
  "AIツールの導入前チェック（月2件）",
  "取引先のチェックシート回答（月2件）",
  "社内で使うAIの一覧（AIシステム台帳）づくり",
  "事故が起きたときの初動の助言",
  "社外CISOとしての名前の掲載",
];

const plans = [
  {
    name: "AIセキュリティ顧問",
    price: "8",
    target: "まずは相談相手がほしい会社に",
    size: "30〜100名",
    items: [
      "月1回の定例（60分）",
      "メール相談（3営業日以内に返答）",
      "AI利用ルールのひな形と、社員向けの説明資料（ひな形）",
      "年1回、ホームページなど外から見える部分の自動診断",
      "社外顧問としての名前の掲載",
    ],
  },
  {
    name: "AI社外CISO",
    price: "30",
    target: "責任者がほしい・取引先への説明が必要な会社に",
    size: "50〜300名",
    recommended: true,
    items: [
      "月1回の定例（90分）と月次報告",
      "チャット相談（2営業日以内に返答）",
      "初月にAI利用の診断",
      "年1回の簡易な脆弱性診断（AIチャットボットなどを含む）",
      "自社用のAI利用ルール、AIシステム台帳",
      "全社員向けのAIルール説明会（年1回・オンライン60分）",
      "AIツールの導入前チェック・チェックシート回答（各月2件）",
      "事故時の初動の助言",
      "社外CISOとしての名前の掲載",
    ],
  },
  {
    name: "AI社外CISO（経営参画）",
    price: "50",
    target: "経営会議まで入ってほしい会社に",
    size: "100〜1,000名",
    items: [
      "月2回の定例＋経営会議に月1回参加",
      "チャット相談（1営業日以内に返答）",
      "初月にAI利用の診断",
      "年1回の標準的な脆弱性診断（Web・AIアプリ）",
      "AIエージェントの権限設計と定期確認",
      "チェックシート回答（月5件）",
      "社員研修（年1回・半日）",
      "事故時の初動の助言＋緊急訪問（年2回まで）",
    ],
  },
];

const expert = [
  {
    label: "実務経験",
    body: "企業のセキュリティ管理、情報システム部門、セキュリティのコンサル・監査のいずれかで5年以上",
  },
  {
    label: "資格（いずれか）",
    chips: [
      "情報処理安全確保支援士",
      "公認情報セキュリティ監査人",
      "CISSP",
      "CISM",
      "CISA",
      "ISO/IEC 27001 主任審査員",
    ],
  },
  {
    label: "押さえている基準",
    chips: [
      "ISMS",
      "サイバーセキュリティ経営ガイドライン",
      "SCS評価制度",
      "AI事業者ガイドライン",
    ],
  },
];

const flow = [
  {
    title: "無料のAI利用チェック",
    text: "オンライン30分で、気になる点を整理します",
  },
  { title: "ご提案", text: "課題と規模に合うプランをご提案します" },
  { title: "ご契約", text: "秘密保持と、診断する範囲を書面で決めます" },
  {
    title: "診断（1〜2カ月目）",
    text: "AIの利用状況と弱点を見える化し、優先順位をつけます",
  },
  {
    title: "毎月の改善",
    text: "定例で一つずつ直し、社員への説明会を経て、取引先に説明できる状態へ",
  },
];

const faqs = [
  {
    q: "ほかのセキュリティ顧問・社外CISOとの違いは何ですか？",
    a: "AIを禁止せずに安全に使うためのルールづくり、AIツールの導入前チェック、社内で使うAIの一覧づくりまでを標準で含めています。契約後すぐに診断を行い、年1回の脆弱性診断もプランに入っています。",
  },
  {
    q: "最低契約期間はありますか？",
    a: "6カ月です。迷われる場合は、月8万円のAIセキュリティ顧問から始めて、必要に応じて社外CISOに切り替えることもできます。",
  },
  {
    q: "まだAIをほとんど使っていませんが、対象になりますか？",
    a: "はい。チェックシートへの回答、規程づくり、事故の初動など、一般的なセキュリティの責任者としての役割もすべて対象です。これからAIを導入する会社にもおすすめです。",
  },
  {
    q: "社員研修も含まれますか？",
    a: "社外CISOプランには、作ったAIルールを全社員に伝える説明会（年1回・60分）が含まれます。半日・1日の研修やなりすましメール訓練は別メニューで、人材開発支援助成金の対象になる場合があります。",
  },
  {
    q: "専門家の名前を、取引先に出してもよいですか？",
    a: "はい。社外顧問・社外CISOとして掲載いただけます。掲載するのは、専門家が実際に確認した範囲に限ります。",
  },
  {
    q: "助成金や補助金は使えますか？",
    a: "月額の料金は対象外になることが多いですが、社員研修は対象になる場合があります。対象になるかは各制度の審査で決まりますので、ご相談時に制度をご案内します。申請の代行は提携の士業が行います。",
  },
  {
    q: "事故が起きたときは、どこまで対応してもらえますか？",
    a: "社外CISOプラン以上では、初動の判断と指示を助言します。経営参画プランは緊急訪問（年2回まで）にも対応します。システムの復旧作業などは提携先をご紹介します。",
  },
];

const sources = [
  "※1 IPA「情報セキュリティ10大脅威 2026」（組織編）",
  "※2 IPA「SCS評価制度」の公表資料（2026年）。申請受付の開始は予定",
  "※3 キヤノンITソリューションズの調査",
  "※4 令和8年版 警察白書（2025年のランサムウェア被害226件のうち中小企業143件）",
  "※5 アクセルパートナーズの解説記事による目安",
];

/* ============================================================ 小さな部品 */

/** キーワードの下線 */
function U({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[linear-gradient(transparent_70%,#F2C9D3_70%)] text-brand-500">
      {children}
    </span>
  );
}

/** 申し込みボタン(上に小さな吹き出しラベル) */
function Cta({
  label = "無料の「AI利用チェック」を申し込む",
  note,
  className,
}: {
  label?: string;
  note?: string;
  className?: string;
}) {
  return (
    <a
      href={`#${FORM_ID}`}
      className={cn(
        "relative inline-flex h-14 items-center justify-center rounded-full bg-[#C8365A] px-8 text-[15px] font-bold text-white shadow-[0_4px_0_#8E1F3B] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#8E1F3B] md:h-16 md:px-10 md:text-base",
        className,
      )}
    >
      {note ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-white px-2 py-0.5 text-[11px] font-bold text-[#C8365A] ring-1 ring-[#C8365A]">
          {note}
        </span>
      ) : null}
      {label}
    </a>
  );
}

/** 見出し: 日本語の見出しを中央に */
function Title({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <Reveal variant="up" className="text-center">
      <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-[1.55] text-ink [word-break:auto-phrase]">
        {children}
      </h2>
      {sub ? (
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.9] text-ink/75">
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-[5px] h-3.5 w-3.5 shrink-0 text-brand-500"
      aria-hidden="true"
    >
      <path
        d="M2 8.5l4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** 画面の枠(シンプル) */
function Screen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-[#DADFE4] bg-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)]">
      <p className="border-b border-[#DADFE4] bg-[#F8F9FA] px-4 py-2 text-[11px] font-bold text-ink/55">
        {title}
      </p>
      {children}
    </div>
  );
}

function Tag({ tone, children }: { tone: "ok" | "wait"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "shrink-0 px-1.5 py-0.5 text-[10px] font-bold",
        tone === "ok"
          ? "bg-[#E3F5EC] text-[#1E8A57]"
          : "bg-[#FFF3D6] text-[#9A6B00]",
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------ ファーストビューの体制図 */

function HeroChart() {
  return (
    <div className="border border-[#DADFE4] bg-white p-5 text-ink shadow-[0_16px_40px_-24px_rgba(0,0,0,0.45)] md:p-7">
      <div className="flex items-center justify-between border-b border-[#DADFE4] pb-3">
        <p className="text-sm font-bold">御社のセキュリティ体制（導入後）</p>
        <p className="text-[11px] font-bold text-ink/45">体制図</p>
      </div>
      <div className="mt-5 flex justify-center">
        <p className="border border-ink/70 bg-white px-6 py-2 text-sm font-bold">
          経営者
        </p>
      </div>
      <div aria-hidden="true" className="mx-auto h-5 w-px bg-ink/40" />
      <div className="mx-auto max-w-[20rem] border-2 border-brand-500 bg-brand-50/60 px-4 py-3 text-center">
        <p className="text-[11px] font-bold text-brand-500">
          社外CISO・セキュリティ顧問
        </p>
        <p className="mt-0.5 text-lg font-bold">Bond AI の専門家</p>
        <p className="mt-0.5 text-[11px] text-ink/60">
          資格を持つセキュリティの責任者
        </p>
      </div>
      <div aria-hidden="true" className="mx-auto h-5 w-px bg-ink/40" />
      <div aria-hidden="true" className="mx-auto h-px w-[68%] bg-ink/40" />
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: "情報システム", v: "導入前チェック" },
          { k: "総務・人事", v: "AI利用ルール" },
          { k: "各部門", v: "社員への説明会" },
        ].map((d) => (
          <div key={d.k} className="flex flex-col items-center">
            <span aria-hidden="true" className="h-4 w-px bg-ink/40" />
            <div className="w-full border border-[#DADFE4] px-1 py-2 text-center">
              <p className="text-[12px] font-bold">{d.k}</p>
              <p className="mt-0.5 text-[10px] font-bold text-brand-500">
                {d.v}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-start gap-3 bg-[#F8F9FA] px-4 py-3">
        <span className="mt-0.5 shrink-0 bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          取引先へ
        </span>
        <p className="text-[12px] font-bold leading-relaxed">
          「セキュリティの責任者は社外CISOです」と説明できる
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 図・グラフ */

function Pyramid() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className="mx-auto w-full max-w-[360px]">
        <p className="mb-3 text-center text-sm font-bold text-brand-500">
          3つの層をまとめて引き受けます
        </p>
        <svg
          viewBox="0 0 300 240"
          className="h-auto w-full"
          role="img"
          aria-label="経営・管理・現場の3層でAIセキュリティの体制をつくるピラミッド図"
        >
          <polygon points="150,8 200,78 100,78" fill={W} />
          <polygon points="96,84 204,84 246,156 54,156" fill="#A9415B" />
          <polygon points="50,162 250,162 294,236 6,236" fill="#D98CA0" />
          <text
            x="150"
            y="62"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#fff"
          >
            経営
          </text>
          <text
            x="150"
            y="128"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#fff"
          >
            管理
          </text>
          <text
            x="150"
            y="207"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#fff"
          >
            現場
          </text>
        </svg>
      </div>
      <dl className="divide-y divide-[#DADFE4] border-y border-[#DADFE4]">
        {[
          { k: "経営", v: "責任者を決め、方針を示す" },
          { k: "管理", v: "AI利用ルール・AIシステム台帳・導入前チェック" },
          { k: "現場", v: "社員への説明会・日々の相談" },
        ].map((l) => (
          <div key={l.k} className="flex items-center gap-4 py-4">
            <dt className="w-14 shrink-0 bg-brand-500 py-1 text-center text-sm font-bold text-white">
              {l.k}
            </dt>
            <dd className="text-[15px] font-bold leading-relaxed">{l.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FeatureVisual({
  kind,
}: {
  kind: "policy" | "diagnosis" | "checksheet";
}) {
  if (kind === "policy") {
    return (
      <Screen title="AI利用ルール（第2版）">
        <div className="p-5 text-[12px] font-bold">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-[#DADFE4] bg-[#E3F5EC] px-3 py-2 text-[#1E8A57]">
                  入力してよい
                </th>
                <th className="border border-[#DADFE4] bg-brand-50 px-3 py-2 text-brand-600">
                  入力してはダメ
                </th>
              </tr>
            </thead>
            <tbody className="text-ink/75">
              <tr>
                <td className="border border-[#DADFE4] px-3 py-2">
                  公開済みの情報
                </td>
                <td className="border border-[#DADFE4] px-3 py-2">
                  お客さまの個人情報
                </td>
              </tr>
              <tr>
                <td className="border border-[#DADFE4] px-3 py-2">
                  社内向けの文章の下書き
                </td>
                <td className="border border-[#DADFE4] px-3 py-2">
                  取引先の機密情報
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-ink/55">導入時の承認の流れ</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
            {["社員が申請", "導入前チェック", "責任者が承認"].map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "border px-2 py-1.5",
                    i === 2
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-[#DADFE4]",
                  )}
                >
                  {s}
                </span>
                {i < 2 ? <span className="text-ink/40">▶</span> : null}
              </span>
            ))}
          </div>
        </div>
      </Screen>
    );
  }
  if (kind === "diagnosis") {
    const items = [
      { k: "シャドーAI（無断利用）", v: 82, p: "高" },
      { k: "入力してよい情報の基準", v: 70, p: "高" },
      { k: "AIエージェントの権限", v: 48, p: "中" },
      { k: "外から見える脆弱性", v: 36, p: "中" },
      { k: "なりすまし詐欺への備え", v: 24, p: "低" },
    ];
    return (
      <Screen title="診断レポート ｜ 優先して直す点">
        <table className="w-full border-collapse text-[11px] font-bold">
          <thead>
            <tr className="bg-[#F8F9FA] text-ink/55">
              <th className="px-4 py-2 text-left">項目</th>
              <th className="w-[36%] px-2 py-2 text-left">リスク</th>
              <th className="px-4 py-2 text-right">優先度</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.k} className="border-t border-[#DADFE4]">
                <td className="px-4 py-2.5">{it.k}</td>
                <td className="px-2 py-2.5">
                  <div className="h-2 bg-[#EEF0F2]">
                    <div
                      className="h-2 bg-brand-500"
                      style={{ width: `${it.v}%` }}
                    />
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span
                    className={cn(
                      "px-1.5 py-0.5",
                      it.p === "高"
                        ? "bg-brand-500 text-white"
                        : it.p === "中"
                          ? "bg-[#F2C9D3] text-brand-600"
                          : "bg-[#EEF0F2] text-ink/60",
                    )}
                  >
                    {it.p}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Screen>
    );
  }
  const rows = [
    { q: "AIの利用ルールを定めていますか", s: "回答済" },
    { q: "情報セキュリティの責任者は誰ですか", s: "回答済" },
    { q: "委託先のAI利用を管理していますか", s: "回答済" },
    { q: "事故時の連絡体制はありますか", s: "確認中" },
  ];
  return (
    <Screen title="取引先チェックシート ｜ 回答状況">
      <div className="p-5">
        <div className="flex items-end justify-between">
          <p className="text-[11px] font-bold text-ink/55">回答の進み具合</p>
          <p className="text-xl font-bold leading-none text-brand-500">
            42<span className="text-sm text-ink/45"> / 45問</span>
          </p>
        </div>
        <div className="mt-2 h-2 bg-[#EEF0F2]">
          <div className="h-2 w-[93%] bg-brand-500" />
        </div>
        <ul className="mt-4 divide-y divide-[#DADFE4] border border-[#DADFE4] text-[11px] font-bold">
          {rows.map((r) => (
            <li key={r.q} className="flex items-center gap-2 px-3 py-2">
              <span className="flex-1">{r.q}</span>
              <Tag tone={r.s === "回答済" ? "ok" : "wait"}>{r.s}</Tag>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-l-4 border-brand-500 bg-[#F8F9FA] px-3 py-2 text-[11px] font-bold">
          回答書に「社外CISO」として名前を掲載
        </p>
      </div>
    </Screen>
  );
}

/* ================================================================ ページ */

export default function CisoPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");
  const url = `${base}${localePath(PATH, locale)}`;

  const nav = [
    { href: "#service", label: "サービス" },
    { href: "#price", label: "料金" },
    { href: "#flow", label: "導入の流れ" },
    { href: "#faq", label: "よくある質問" },
  ];

  return (
    <div className="bg-white text-ink">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "セキュリティ対策事業",
              url: localePath("/services/security", locale),
            },
            {
              name: "Bond AI（CISO・セキュリティ顧問）",
              url: localePath(PATH, locale),
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Bond AI（AI時代のセキュリティ顧問・社外CISO）",
            alternateName: [
              "社外CISO",
              "vCISO",
              "CISO as a Service",
              "セキュリティ顧問",
              "AIセキュリティ顧問",
            ],
            serviceType: "社外CISO・セキュリティ顧問",
            description: pageMeta.ciso.description,
            url,
            areaServed: { "@type": "Country", name: "日本" },
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType: "中小・中堅企業",
            },
            offers: plans.map((p) => ({
              "@type": "Offer",
              name: p.name,
              url,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: Number(p.price) * 10000,
                priceCurrency: "JPY",
                unitText: "月額（税別）",
                valueAddedTaxIncluded: false,
              },
            })),
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

      {/* 1. ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-[#DADFE4] bg-white">
        <Container className="flex h-16 items-center gap-6">
          <a href="#top" className="leading-tight">
            <span className="block text-xl font-bold tracking-[0.02em] text-brand-500">
              Bond AI
            </span>
            <span className="hidden text-[10px] font-bold text-ink/55 sm:block">
              AI時代のセキュリティ顧問・社外CISO
            </span>
          </a>
          <nav
            aria-label="ページ内メニュー"
            className="ml-auto hidden md:block"
          >
            <ul className="flex items-center">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="px-4 py-2 text-sm font-bold text-ink/80 hover:text-brand-500"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`#${FORM_ID}`}
            className="ml-auto inline-flex h-10 items-center rounded-full bg-[#C8365A] px-6 text-sm font-bold text-white hover:bg-[#B02C4E] md:ml-2"
          >
            無料相談
          </a>
        </Container>
        <nav
          aria-label="ページ内メニュー"
          className="border-t border-[#DADFE4] md:hidden"
        >
          <ul className="flex justify-between px-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="block px-2 py-2 text-xs font-bold text-ink/75"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* 2. ファーストビュー: 単色の帯 + 体制図 */}
      <section
        id="top"
        className="relative overflow-hidden border-b border-[#DADFE4] bg-[linear-gradient(105deg,#FFFFFF_0%,#FFFFFF_48%,#F8ECEF_48%,#F8ECEF_100%)] text-ink"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 600 600"
          className="pointer-events-none absolute -right-40 -top-24 h-[44rem] w-[44rem] text-brand-500/[0.05]"
        >
          <path
            d="M300 20l250 100v170c0 160-110 260-250 300C160 550 50 450 50 290V120z"
            fill="currentColor"
          />
        </svg>
        <Container className="relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="inline-block bg-brand-500 px-3 py-1 text-sm font-bold text-white">
              社外CISO・セキュリティ顧問サービス
            </p>
            <p className="mt-4 text-base font-bold text-brand-500 md:text-lg">
              中小・中堅企業のための AIセキュリティ
            </p>
            <h1 className="mt-3 text-[clamp(1.85rem,3.6vw,2.9rem)] font-bold leading-[1.45]">
              <span className="inline-block">
                AIを<span className="text-brand-500">禁止しない</span>会社に、
              </span>
              <br />
              <span className="inline-block">
                セキュリティの
                <span className="bg-[linear-gradient(transparent_70%,#F2C9D3_70%)] text-brand-500">
                  責任者
                </span>
                を。
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.95] text-ink/80">
              社員がAIを安心して使えるルールづくりから、取引先への説明まで。資格を持つセキュリティの専門家が、あなたの会社の責任者として月額でつきます。
            </p>
            <p className="mt-5 flex flex-wrap items-baseline gap-x-2 border-t border-[#DADFE4] pt-5">
              <span className="text-sm font-bold">月額</span>
              <span className="text-4xl font-bold leading-none text-brand-500">
                8
              </span>
              <span className="text-lg font-bold">万円〜</span>
              <span className="text-xs text-ink/55">
                （税別・最低契約期間6カ月）
              </span>
            </p>
            <div className="mt-8">
              <Cta note="オンライン30分・無料" className="w-full sm:w-auto" />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink/60">
              社内のAIの使い方とセキュリティ体制の気になる点を、専門家が無料で整理します。
            </p>
          </div>
          <HeroChart />
        </Container>
        {/* 任せられること */}
        <div className="relative border-t border-[#DADFE4] bg-white">
          <Container className="grid grid-cols-2 md:grid-cols-4">
            {[
              "社外CISO（責任者）",
              "AI利用ルールづくり",
              "チェックシート回答",
              "脆弱性診断・月次報告",
            ].map((t, i) => (
              <p
                key={t}
                className={cn(
                  "py-4 text-center text-sm font-bold text-brand-600 md:text-[15px]",
                  i % 2 === 1 && "border-l border-[#DADFE4]",
                  i >= 2 && "border-t border-[#DADFE4] md:border-t-0",
                  i === 2 && "md:border-l md:border-[#DADFE4]",
                )}
              >
                {t}
              </p>
            ))}
          </Container>
        </div>
      </section>

      {/* 3つの約束 */}
      <section className="border-b border-[#DADFE4] py-14 md:py-16">
        <Container>
          <p className="text-center text-lg font-bold">
            Bond AI の<U>3つの約束</U>
          </p>
          <ol className="mt-8 grid border border-[#DADFE4] md:grid-cols-3">
            {promises.map((p, i) => (
              <li
                key={p.title}
                className={cn(
                  "flex gap-4 p-6",
                  i > 0 &&
                    "border-t border-[#DADFE4] md:border-l md:border-t-0",
                )}
              >
                <span className="text-4xl font-bold italic leading-none text-brand-500/40">
                  {i + 1}
                </span>
                <div>
                  <p className="text-lg font-bold">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-[1.8] text-ink/75">
                    {p.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 3. お悩み */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl bg-[#F1F3F5] px-5 py-8 md:px-10">
            <p className="text-center text-lg font-bold md:text-xl">
              AIは使いたい。でも、任せられる人がいない。
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {worryTags.map((t) => (
                <li
                  key={t}
                  className="bg-white px-4 py-2.5 text-sm font-bold shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div
            aria-hidden="true"
            className="mx-auto h-0 w-0 border-x-[22px] border-t-[18px] border-x-transparent border-t-[#F1F3F5]"
          />

          <ul className="mx-auto mt-10 grid max-w-5xl gap-px bg-[#DADFE4] sm:grid-cols-2">
            {worries.map((w) => (
              <li
                key={w.title}
                className="flex items-center gap-5 bg-white p-6"
              >
                <w.Icon className="h-24 w-24 shrink-0" />
                <div>
                  <p className="font-bold leading-[1.6]">{w.title}</p>
                  <p className="mt-2 text-sm leading-[1.8] text-ink/70">
                    → {w.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* 解決 */}
          <div className="mx-auto mt-16 max-w-5xl bg-brand-50/60 px-5 py-10 md:px-12">
            <Title
              sub={
                <>
                  AIの利用ルール、導入前のチェック、取引先への回答、社員への説明、事故の初動まで。
                  <br className="hidden md:block" />
                  社内に専任者がいなくても、責任の所在がはっきりした体制をつくります。
                </>
              }
            >
              そんなお悩みを解決するのが
              <br />
              社外の責任者がつく<U>「Bond AI」</U>です
            </Title>
            <div className="mt-10 bg-white p-6 md:p-10">
              <Pyramid />
            </div>
          </div>
        </Container>
      </section>

      {/* 4. なぜ今か */}
      <section className="bg-[#F8F9FA] py-16 md:py-24">
        <Container>
          <Title>
            AIの広がりに、<U>守りと説明</U>が追いついていません
          </Title>
          <ul className="mt-10 grid border border-[#DADFE4] bg-white sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <li
                key={f.value}
                className={cn(
                  "p-6",
                  i > 0 && "border-t border-[#DADFE4]",
                  i === 1 && "sm:border-l sm:border-t-0",
                  i === 3 && "sm:border-l",
                  i >= 2 && "lg:border-l lg:border-t-0",
                )}
              >
                <p className="font-bold leading-none text-brand-500">
                  <span className="text-5xl">{f.value}</span>
                  <span className="ml-1 text-lg">{f.unit}</span>
                </p>
                <p className="mt-4 text-sm leading-[1.85] text-ink/80">
                  {f.text}
                  <span className="ml-1 text-[11px] text-ink/45">{f.note}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-right text-[11px] text-ink/45">
            出典はページ下部に記載しています。
          </p>
        </Container>
      </section>

      {/* 5. 3つの理由 */}
      <section id="service" className="scroll-mt-28 py-16 md:py-24">
        <Container>
          <Title>
            Bond AI が選ばれる<U>3つの理由</U>
          </Title>
          <div className="mt-12 space-y-8">
            {features.map((f, i) => (
              <Reveal key={f.em} variant="up">
                <article className="grid items-center gap-8 border border-[#DADFE4] p-6 md:p-10 lg:grid-cols-2">
                  <div className={cn(i % 2 === 1 && "lg:order-2")}>
                    <div className="flex items-start gap-4">
                      <span className="text-6xl font-bold italic leading-none text-brand-500/40">
                        {i + 1}
                      </span>
                      <h3 className="pt-1 text-[clamp(1.25rem,2.2vw,1.6rem)] font-bold leading-[1.5]">
                        {f.lead}
                        <br />
                        <span className="text-brand-500">{f.em}</span>
                      </h3>
                    </div>
                    <p className="mt-5 text-[15px] leading-[2] text-ink/80">
                      {f.text}
                    </p>
                  </div>
                  <FeatureVisual kind={f.visual} />
                </article>
              </Reveal>
            ))}
          </div>

          {/* 毎月の支援内容 */}
          <div className="mt-12 border-2 border-brand-500">
            <p className="bg-brand-500 px-6 py-3 font-bold text-white">
              毎月の支援内容
              <span className="ml-2 text-xs font-normal text-white/80">
                （社外CISOプランの例）
              </span>
            </p>
            <ul className="grid gap-x-8 gap-y-3 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {monthly.map((m) => (
                <li key={m} className="flex gap-2 text-[15px] leading-relaxed">
                  <Check />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA帯 */}
      <section className="border-y border-[#EAD2D9] bg-[#F8ECEF] py-12">
        <Container className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <p className="text-xl font-bold md:text-2xl">
              まずは無料の「AI利用チェック」から
            </p>
            <p className="mt-2 text-sm text-ink/70">
              オンライン30分。優先して手を打つべき点を専門家がお伝えします。
            </p>
          </div>
          <Cta label="無料で申し込む" note="売り込みはしません" />
        </Container>
      </section>

      {/* 6. 料金 */}
      <section id="price" className="scroll-mt-28 py-16 md:py-24">
        <Container>
          <Title sub="（税別・月額。最低契約期間は6カ月）">
            会社の規模と課題に<U>合わせて選べます</U>
          </Title>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <article
                key={p.name}
                className={cn(
                  "flex flex-col bg-white",
                  p.recommended
                    ? "border-2 border-brand-500"
                    : "border border-[#DADFE4]",
                )}
              >
                <div
                  className={cn(
                    "px-6 py-5 text-center",
                    p.recommended ? "bg-brand-500 text-white" : "bg-[#F8F9FA]",
                  )}
                >
                  {p.recommended ? (
                    <p className="text-xs font-bold">おすすめ</p>
                  ) : null}
                  <h3 className="text-lg font-bold">{p.name}</h3>
                </div>
                <div className="border-b border-[#DADFE4] px-6 py-6 text-center">
                  <p className="flex items-baseline justify-center gap-1">
                    <span className="text-sm font-bold">月</span>
                    <span className="text-5xl font-bold leading-none text-brand-500">
                      {p.price}
                    </span>
                    <span className="text-lg font-bold">万円</span>
                  </p>
                  <p className="mt-3 text-sm font-bold leading-relaxed">
                    {p.target}
                  </p>
                  <p className="mt-1 text-xs text-ink/55">（{p.size}）</p>
                </div>
                <ul className="flex-1 space-y-2.5 p-6">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-2 text-[14px] leading-relaxed"
                    >
                      <Check />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* 比較 */}
          <div className="mx-auto mt-12 max-w-4xl">
            <p className="text-center text-lg font-bold">
              常勤のCISOを採用するより、<U>ずっと始めやすく</U>
            </p>
            <table className="mt-6 w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="w-1/2 border border-[#DADFE4] bg-[#F8F9FA] px-4 py-3 text-sm font-bold">
                    常勤のCISOを採用した場合
                  </th>
                  <th className="w-1/2 border border-brand-500 bg-brand-500 px-4 py-3 text-sm font-bold text-white">
                    Bond AI の社外CISO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#DADFE4] px-4 py-5 text-lg font-bold text-ink/60 md:text-2xl">
                    年収1,000万円以上
                    <span className="ml-1 text-xs font-normal">（※5）</span>
                  </td>
                  <td className="border border-brand-500 px-4 py-5 text-lg font-bold text-brand-500 md:text-2xl">
                    年360万円<span className="ml-1 text-sm">（月30万円）</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-6 border-l-4 border-[#DADFE4] pl-4 text-sm leading-[1.9] text-ink/75">
              <p>
                稼働時間を超えた分は1時間3万円です。次のメニューは別途ご相談ください。
              </p>
              <p>
                ・半日・1日の社員研修、なりすましメール訓練、事故対応の机上演習
              </p>
              <p>・ISO/IEC 42001（AIの国際認証）の取得支援</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. 担当する専門家 */}
      <section className="bg-[#F8F9FA] py-16 md:py-24">
        <Container>
          <Title sub="調べる・書く・まとめる作業はAIで効率化し、専門家は「判断」と「説明」に集中します。だから、相場どおりの価格で、AIまで見る責任者を置けます。">
            資格と実務経験を持つ専門家が、<U>責任者としてつきます</U>
          </Title>
          <div className="mt-10 grid border border-[#DADFE4] bg-white lg:grid-cols-[2fr_3fr]">
            <div className="relative min-h-[16rem]">
              <Image
                src="/services/cards/talent.jpg"
                alt="専門家が経営層と打ち合わせをしている様子のイメージ"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <dl className="divide-y divide-[#DADFE4]">
              {expert.map((e) => (
                <div
                  key={e.label}
                  className="grid gap-2 p-6 md:grid-cols-[9rem_1fr]"
                >
                  <dt className="text-sm font-bold text-brand-500">
                    {e.label}
                  </dt>
                  <dd className="text-[15px] leading-[1.9]">
                    {"body" in e ? (
                      e.body
                    ) : (
                      <ul className="flex flex-wrap gap-1.5">
                        {e.chips.map((c) => (
                          <li
                            key={c}
                            className="border border-[#DADFE4] px-2.5 py-1 text-[13px] font-bold"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-2 text-[11px] text-ink/45">※ 写真はイメージです</p>
        </Container>
      </section>

      {/* 8. 導入の流れ */}
      <section id="flow" className="scroll-mt-28 py-16 md:py-24">
        <Container>
          <Title>導入の流れ</Title>
          <ol className="mx-auto mt-10 max-w-3xl">
            {flow.map((f, i) => (
              <li key={f.title}>
                <div className="flex items-start gap-5 border border-[#DADFE4] p-5 md:p-6">
                  <span className="shrink-0 bg-brand-500 px-2 py-1 text-[11px] font-bold text-white">
                    STEP{i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-bold">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      {f.text}
                    </p>
                  </div>
                </div>
                {i < flow.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="mx-auto my-2 h-0 w-0 border-x-[10px] border-t-[10px] border-x-transparent border-t-[#C5CBD2]"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 9. よくある質問 */}
      <section id="faq" className="scroll-mt-28 bg-[#F8F9FA] py-16 md:py-24">
        <Container>
          <Title>よくある質問</Title>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-[#DADFE4] border-y border-[#DADFE4] bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-bold text-brand-500">Q.</span>
                  <span className="flex-1 text-[15px] font-bold">{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="text-xs text-ink/40 transition-transform group-open:rotate-180"
                  >
                    ▼
                  </span>
                </summary>
                <div className="flex gap-3 px-4 pb-5">
                  <span className="font-bold text-ink/40">A.</span>
                  <p className="text-[15px] leading-[1.9] text-ink/80">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. 申し込み */}
      <section id={FORM_ID} className="scroll-mt-28 py-16 md:py-24">
        <Container>
          <Title sub="オンライン30分。社内のAIの使い方、取引先から求められていること、今の体制を伺い、優先して手を打つべき点を専門家がお伝えします。売り込みはしません。">
            まずは無料の<U>「AI利用チェック」</U>から
          </Title>
          <div className="mx-auto mt-10 max-w-3xl border border-[#DADFE4] bg-white p-6 md:p-10">
            <AiCheckForm privacyHref={localePath("/privacy", locale)} />
          </div>
        </Container>
      </section>

      {/* 11. フッター(LP) */}
      <footer className="border-t border-[#DADFE4] bg-[#F8F9FA] py-10">
        <Container>
          <p className="text-sm">
            <span className="font-bold text-brand-500">Bond AI</span>
            <span className="ml-2 text-ink/60">／ 運営：{site.legalName}</span>
          </p>
          <div className="mt-5 text-[11px] leading-[1.9] text-ink/55">
            <p className="font-bold text-ink/70">出典</p>
            <ul>
              {sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-3">
              注記：ISMSやISO/IEC
              42001などの認証は審査機関が行います。当社は取得の支援を行います。
            </p>
            <p>
              ※
              ページ内の画面はイメージです。数値は例示であり、実績を示すものではありません。
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
