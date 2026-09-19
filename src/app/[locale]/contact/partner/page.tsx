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
  ["ハードウェア/フィジカルAIエンジニア・PM経験者", "ロボティクス・機械・電気・組込みなどの開発経験をお持ちの方。"],
  ["引退/退職しても活躍の場を探している技術者", "これまでの豊富な経験を活かし、柔軟な働き方で貢献したい方。"],
  ["副業/フリーランスエンジニア", "複数の案件に関わりながらスキルを活かしたい方。"],
  ["エンジニアとして独立したい会社員", "独立を視野に入れ、事前に案件やネットワークを確保したい方。"],
  ["現在技術顧問をされている方", "これまでの知見を活かし、企業の技術支援・アドバイザリーとして貢献したい方。"],
];

const strengthImages = [
  "/contact/partner/strengths/strength-1.webp",
  "/contact/partner/strengths/strength-2.webp",
  "/contact/partner/strengths/strength-3.webp",
];

const strengths = [
  <>公開されている案件だけではなく、<span className="text-[#7B2233]">弊社独自の案件</span>もございます。</>,
  <><span className="text-[#7B2233]">週2日から常駐まで</span>。<span className="text-[#7B2233]">手を動かす案件からPMまで</span>、幅広くご紹介できます。</>,
  <><span className="text-[#7B2233]">スキルにマッチした案件</span>を紹介いたします。</>,
];

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
            <p className="mb-6 text-4xl font-black uppercase tracking-[0.04em] text-[#B23A52] [text-shadow:0_2px_0_rgba(0,0,0,0.35),0_6px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-7xl">
              ボンドテック
            </p>
            <h1 className="text-lg font-black leading-[1.6] tracking-normal text-white [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,0_0_24px_rgba(0,0,0,0.85),0_4px_18px_rgba(0,0,0,0.9)] sm:text-xl md:text-2xl lg:text-[2rem]">
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

      <section className="relative isolate overflow-hidden bg-white py-12 md:py-16">
        <Image
          src="/contact/partner/about-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <Container className="relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-black text-[#2B2B2B] md:text-4xl">
              ボンドテックとは
            </h2>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[#8B8B8B]">
              About BondTech
            </p>
            <div className="mx-auto mt-2 h-1 w-16 bg-gradient-to-r from-[#7B2233] to-[#A33A52]" />
          </div>

          <div className="mt-6 grid gap-8 text-left lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
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

            <div className="lg:pt-1">
              {aboutHighlights.map((item, index) => (
                <div
                  key={item}
                  className={`py-3 ${index > 0 ? "border-t border-[#7B2233]/15" : ""}`}
                >
                  <p className="text-2xl font-black leading-tight text-[#7B2233] md:text-3xl">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button href="#entry" className="!bg-[#7B2233] hover:!bg-[#A33A52]">無料登録して案件を探す</Button>
          </div>
        </Container>
      </section>

      <section className="bg-[#FAF8F7] py-20 md:py-28">
        <Container>
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <p className="whitespace-nowrap text-xs font-black uppercase tracking-[0.18em] text-[#8B8B8B]">
                Recruit
              </p>
              <div className="h-px w-full max-w-[200px] bg-[#7B2233]/30" />
            </div>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              こんな方が<span className="text-[#7B2233]">登録</span>しています
            </h2>
            <p className="mt-3 text-base font-medium text-[#2B2B2B]/70">
              これまでの経験やスキルを、次のステージで活かしたい方をお待ちしています。
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {registrants.map(([title, body], index) => (
              <div key={title} className="overflow-hidden rounded-md bg-white">
                <div className="aspect-[4/3] w-full bg-[#EFEAE7]" />
                <div className="p-5">
                  <p className="flex items-center gap-2 text-2xl font-black leading-none text-[#7B2233]">
                    {String(index + 1).padStart(2, "0")}
                    <span className="h-px w-6 bg-[#7B2233]" />
                  </p>
                  <p className="mt-3 text-base font-black leading-snug text-[#2B2B2B]">{title}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[#2B2B2B]/70">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-black leading-tight md:text-4xl">支援分野について</h2>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[#8B8B8B]">Support Fields</p>
            <div className="mx-auto mt-3 h-1 w-16 bg-gradient-to-r from-[#7B2233] to-[#A33A52]" />
          </div>
          <div className="mx-auto grid max-w-4xl gap-x-16 gap-y-10 md:grid-cols-2">
            {jobGroups.map((group) => (
              <div key={group.title}>
                <h3 className="border-b-2 border-[#7B2233]/30 pb-3 text-xl font-black text-[#7B2233]">
                  {group.title}
                </h3>
                <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-base font-medium text-[#2B2B2B]/80 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[#7B2233]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm font-medium text-[#2B2B2B]/60">※支援分野は一例です。上記以外の分野もお気軽にご相談ください。</p>
          <Cta />
        </Container>
      </section>

      <section className="bg-[#FAF8F7] py-20 md:py-28">
        <Container>
          <h2 className="text-center text-3xl font-black leading-tight md:text-4xl">
            <span className="text-[#7B2233]">ボンドテック</span>が選ばれる3つの理由
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {strengths.map((text, index) => (
              <div key={index} className="text-center">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-xs overflow-hidden rounded-md bg-white">
                  <Image
                    src={strengthImages[index]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 320px, 80vw"
                    className="object-contain"
                  />
                </div>
                <p className="mt-6 text-base font-bold leading-relaxed text-[#2B2B2B]">{text}</p>
              </div>
            ))}
          </div>
          <Cta />
        </Container>
      </section>

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
