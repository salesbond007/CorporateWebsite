import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { PartnerLeadForm } from "@/components/contact/PartnerLeadForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PAGE_TITLE = "ボンドテック | ハードウェア/フィジカルAIエンジニア案件紹介サイト";
const PAGE_DESCRIPTION =
  "ボンドテックは、ハードウェアとフィジカルAI領域のエンジニア・PMに案件をご紹介するサービスです。機構設計、電気設計、組込み、ロボティクス、AI実装など、週2日から。シニアの技術者、副業・フリーランスの技術者も歓迎です。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/ja/contact/partner",
    languages: {
      ja: "/ja/contact/partner",
      en: "/en/contact/partner",
      "x-default": "/ja/contact/partner",
    },
  },
  openGraph: {
    type: "website",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: "/contact/partner/hero-engineers.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const jobGroups = [
  {
    title: "設計・開発",
    items: ["機構設計", "筐体設計", "電気設計", "基板設計", "組込みソフト", "制御設計"],
  },
  {
    title: "先端・品質領域",
    items: ["ロボティクス", "センサ・通信", "画像認識", "AI実装", "品質保証", "規格・認証"],
  },
];

const aboutHighlights = ["週2~", "高収入", "専門性を活かせる"];

const registrants = [
  "ハードウェア/フィジカルAIエンジニア/PM経験者",
  "引退/退職しても活躍の場を探している技術者",
  "副業/フリーランスエンジニア",
  "エンジニアとして独立したい会社員",
  "現在技術顧問をされている方",
];

const strengths = [
  ["製造業案件に注力", "開発現場のフェーズや技術要件を理解したうえで、経験に合う案件をご案内します。"],
  ["無理な紹介をしない", "ご希望の稼働日数、報酬、関わり方を確認し、合わない案件を無理に進めません。"],
  ["企業との接点づくり", "営業代行・顧問紹介で培った法人接点を活かし、技術者の活躍機会を広げます。"],
];

const members = ["機構設計", "電気設計", "組込み", "ロボティクス", "品質・規格"];
const flow = [
  ["メール登録", "メールアドレスのみで、かんたんに仮登録できます。"],
  ["経験・希望確認", "ご経歴や稼働日数、報酬などのご希望をヒアリングします。"],
  ["案件ご案内", "条件に合う案件が見つかり次第、ご案内します。"],
  ["面談・参画", "企業との面談を経て、案件にご参画いただきます。"],
];
const faqs = [
  ["登録に費用はかかりますか？", "登録・案件相談に費用はかかりません。"],
  ["すぐ稼働できなくても登録できますか？", "可能です。稼働可能時期や希望条件を確認したうえで、合う案件が出た際にご案内します。"],
  ["会社員の副業でも相談できますか？", "就業規則や契約条件の確認は必要ですが、週数日やスポット支援の案件も含めて相談できます。"],
  ["製造業以外の経験でも対象ですか？", "組込み、AI、制御、品質など製造業と接続しやすい経験がある方はご相談ください。"],
  ["顔写真や履歴書は必要ですか？", "初回登録はメールアドレスのみです。詳細確認の段階で、職務経歴やスキル情報をお伺いします。"],
  ["案件紹介は必ず受けられますか？", "ご経験・希望条件・案件状況により異なります。条件に合う案件がある場合にご案内します。"],
];

export default function PartnerContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <main className="bg-[#FAF8F7] text-[#2B2B2B]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "エンジニア登録", url: localePath("/contact/partner", locale) },
        ])}
      />

      <div className="w-full bg-[#7B2233] py-4">
        <Container className="flex justify-end">
          <Link
            href="#entry"
            className="text-base font-black uppercase tracking-[0.08em] text-white hover:text-white/80 md:text-lg"
          >
            会員登録
          </Link>
        </Container>
      </div>

      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#1B1210] md:min-h-[680px]">
        <Image
          src="/contact/partner/hero-engineers.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <Container className="relative z-10 pb-28 pt-16 md:pb-32 md:pt-20">
          <div className="max-w-2xl">
            <p className="mb-2 text-2xl font-black uppercase tracking-[0.04em] text-white [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,0_0_18px_rgba(0,0,0,0.85)] sm:text-3xl md:text-4xl">
              ボンドテック
            </p>
            <h1 className="text-lg font-black leading-[1.25] tracking-normal text-white [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,0_0_24px_rgba(0,0,0,0.85),0_4px_18px_rgba(0,0,0,0.9)] sm:text-xl md:text-2xl lg:text-[2rem]">
              ハードウェア/<br />フィジカルAI<br />エンジニア案件紹介サイト
            </h1>
            <div className="mt-8">
              <Button
                href="#entry"
                size="lg"
                className="!h-12 !w-full !px-5 !text-xs !bg-[#7B2233] hover:!bg-[#A33A52] sm:!w-auto sm:!h-14 sm:!px-8 sm:!text-sm md:!h-16 md:!px-10 md:!text-base"
              >
                無料登録して案件を探す
              </Button>
            </div>
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-[#7B2233]/45 py-4 backdrop-blur-sm">
          <Container className="flex flex-wrap items-center justify-center gap-2">
            {["シニアエンジニア活躍", "副業/フリーランス活躍", "週２～", "高収入"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 rounded-none border border-[#7B2233]/25 bg-white px-3 py-1.5 text-xs font-black text-[#7B2233] md:text-sm"
              >
                <TagIcon />
                {tag}
              </span>
            ))}
          </Container>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-white py-20 md:py-28">
        <Image
          src="/contact/partner/about-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <Container className="relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-black text-[#2B2B2B] md:text-5xl">
              ボンドテックとは
            </h2>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#8B8B8B]">
              About BondTech
            </p>
            <div className="mx-auto mt-3 h-1 w-16 bg-gradient-to-r from-[#7B2233] to-[#A33A52]" />
          </div>

          <div className="mt-8 grid gap-12 text-left lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-4 text-base font-black leading-[1.9] text-[#2B2B2B]/85">
              <p>
                ボンドテックは、<span className="text-[#7B2233]">ハードウェアとフィジカルAI領域のエンジニア・PM</span>に案件をご紹介するサービスです。
              </p>
              <p>
                いま、モノづくりの現場は技術者を求めています。
                <br />
                求人を出しても応募が来ない。育てる時間もない。だから、<span className="text-[#7B2233]">すでに技術を持つ人が必要とされています。</span>
              </p>
              <p>
                何十年かけて積み上げた技術を、そのままにしておくのはもったいない。
                <br />
                その経験を、待っている現場へ。
              </p>
              <p className="text-[#7B2233]">
                週2日から。シニアの技術者、副業・フリーランスの技術者も歓迎です。
              </p>
            </div>

            <div className="lg:pt-2">
              {aboutHighlights.map((item, index) => (
                <div
                  key={item}
                  className={`py-7 ${index > 0 ? "border-t border-[#7B2233]/15" : ""}`}
                >
                  <p className="text-3xl font-black leading-tight text-[#7B2233] md:text-4xl">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Cta />
        </Container>
      </section>

      <section className="bg-[#FAF8F7] py-20 md:py-28">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black leading-tight md:text-4xl">こんな方が登録しています</h2>
          </div>
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-5">
            {registrants.map((item) => (
              <div
                key={item}
                className="flex w-full items-center gap-4 rounded-md border border-[#7B2233]/15 bg-white px-7 py-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7B2233]/10">
                  <CheckIcon small />
                </span>
                <p className="text-base font-bold leading-snug text-[#2B2B2B]">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <LpSection tone="white" label="Occupation" title="募集職種">
        <div className="grid gap-6 md:grid-cols-2">
          {jobGroups.map((group) => (
            <div key={group.title} className="rounded-md border border-[#7B2233]/20 bg-white p-8">
              <h2 className="text-2xl font-black text-[#7B2233]">{group.title}</h2>
              <ul className="mt-6 space-y-3 text-base font-medium leading-relaxed">
                {group.items.map((item) => <li key={item} className="border-b border-[#7B2233]/10 pb-3">{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm font-medium text-[#2B2B2B]/60">※募集職種は一例です。上記以外の職種もお気軽にご相談ください。</p>
        <Cta />
      </LpSection>

      <section className="bg-[#FAF8F7] py-20 md:py-28">
        <Container>
          <h2 className="text-center text-3xl font-black leading-tight md:text-4xl">
            <span className="text-[#7B2233]">ボンドテック</span>が選ばれる3つの理由
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {strengths.map(([title, body]) => (
              <div key={title} className="text-center">
                <div className="mx-auto aspect-[4/3] w-full max-w-xs rounded-md border-2 border-dashed border-[#7B2233]/25 bg-white" />
                <p className="mt-6 text-lg font-black leading-snug text-[#2B2B2B]">{title}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#2B2B2B]/70">{body}</p>
              </div>
            ))}
          </div>
          <Cta />
        </Container>
      </section>

      <LpSection tone="white" label="Members" title="在籍メンバー紹介">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {members.map((member, index) => (
            <div key={member} className="rounded-md border border-[#7B2233]/20 bg-white p-6 text-center">
              <PersonIcon index={index} />
              <p className="mt-5 text-lg font-black">{member}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#2B2B2B]/70">経験者登録あり</p>
            </div>
          ))}
        </div>
      </LpSection>

      <LpSection tone="white" label="Flow" title="登録から案件参画まで">
        <div className="grid gap-6 md:grid-cols-4">
          {flow.map(([title, body], index) => (
            <div key={title} className="relative rounded-md border border-[#7B2233]/20 bg-white p-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7B2233]/10">
                <FlowIcon index={index} />
              </span>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#A33A52]">
                STEP {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#2B2B2B]/70">{body}</p>
              {index < flow.length - 1 ? <span className="absolute -right-3 top-1/2 hidden text-[#7B2233] md:block">→</span> : null}
            </div>
          ))}
        </div>
        <Cta />
      </LpSection>

      <LpSection label="FAQ" title="よくある質問">
        <div className="mx-auto max-w-4xl divide-y divide-[#7B2233]/15 rounded-md border border-[#7B2233]/20 bg-white">
          {faqs.map(([q, a]) => (
            <details key={q} className="group p-6">
              <summary className="cursor-pointer list-none text-lg font-black text-[#2B2B2B]">{q}</summary>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#2B2B2B]/80">{a}</p>
            </details>
          ))}
        </div>
      </LpSection>

      <section id="entry" className="scroll-mt-24 bg-white py-20 md:py-28">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#A33A52]">Entry</p>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">まずはメールアドレスで無料登録</h2>
          <p className="mt-5 text-base font-medium leading-relaxed text-[#2B2B2B]/80">
            案件情報や本登録のご案内をお送りします。初回登録はメールアドレスのみです。
          </p>
          <div className="mt-10">
            <PartnerLeadForm />
          </div>
        </Container>
      </section>
    </main>
  );
}

function LpSection({ label, title, children, tone = "cream" }: { label: string; title: string; children: React.ReactNode; tone?: "cream" | "white" }) {
  return (
    <section className={tone === "white" ? "bg-white py-20 md:py-28" : "bg-[#FAF8F7] py-20 md:py-28"}>
      <Container>
        <div className="mb-12 text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#A33A52]">{label}</p>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">{title}</h2>
        </div>
        {children}
      </Container>
    </section>
  );
}

function Cta() {
  return (
    <div className="mt-12 text-center">
      <Button href="#entry" className="!bg-[#7B2233] hover:!bg-[#A33A52]">無料登録して案件を探す</Button>
    </div>
  );
}

function CheckIcon({ small = false }: { small?: boolean }) {
  const size = small ? 20 : 28;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-[#7B2233]"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 12.5l2.8 2.8 6.2-6.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M11.2 3.2H6a2.8 2.8 0 00-2.8 2.8v5.2a1 1 0 00.29.7l9.6 9.6a1 1 0 001.42 0l6.6-6.6a1 1 0 000-1.42l-9.6-9.6a1 1 0 00-.71-.29z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.2" cy="8.2" r="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function FlowIcon({ index }: { index: number }) {
  const paths = [
    "M4 7l8 6 8-6M4 7v10h16V7M4 7h16",
    "M6 4h12v16l-6-3-6 3V4z",
    "M4 8h16v11H4zM4 8l8-4 8 4M9 12h6",
    "M8 12l2.5 2.5L16 9",
  ];
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[#7B2233]">
      <path d={paths[index % paths.length]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PersonIcon({ index }: { index: number }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="mx-auto text-[#7B2233]">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M18 48c3-8 8-12 14-12s11 4 14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d={index % 2 === 0 ? "M18 18l-5-5M46 18l5-5" : "M14 32H8M56 32h-6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
