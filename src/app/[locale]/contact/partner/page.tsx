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

export const metadata: Metadata = {
  title: "エンジニア・フリーランス登録 | 製造業向け業務委託案件",
  description:
    "機構設計、電気設計、組込み、ロボティクス、センサ・通信、品質・規格など、製造業向け業務委託案件をお探しのエンジニアの方向け登録ページです。",
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

const targets = [
  ["経験を活かしたい", "メーカーや製造業の開発経験を、業務委託案件で活かしたい方。"],
  ["稼働量を調整したい", "週数日、顧問、スポット支援など、今の働き方に合わせて案件を探したい方。"],
  ["専門性で選ばれたい", "機械・電気・組込み・品質など、得意領域を軸に案件を選びたい方。"],
];

const strengths = [
  ["製造業案件に注力", "開発現場のフェーズや技術要件を理解したうえで、経験に合う案件をご案内します。"],
  ["無理な紹介をしない", "ご希望の稼働日数、報酬、関わり方を確認し、合わない案件を無理に進めません。"],
  ["企業との接点づくり", "営業代行・顧問紹介で培った法人接点を活かし、技術者の活躍機会を広げます。"],
];

const members = ["機構設計", "電気設計", "組込み", "ロボティクス", "品質・規格"];
const workStyles = [
  ["週2〜5日", "副業、複業、フル稼働まで希望に応じて相談可能です。"],
  ["リモート/出社", "案件特性に応じて、リモート中心、現場訪問あり、常駐型を整理します。"],
  ["顧問・PM支援", "実装だけでなく、レビュー、技術調査、開発体制づくりの案件も扱います。"],
];
const flow = ["メール登録", "経験・希望確認", "案件ご案内", "面談・参画"];
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

      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#1B1210] md:min-h-[680px]">
        <Image
          src="/contact/partner/hero-engineers.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute left-0 top-0 z-20 w-full">
          <Container className="py-6">
            <span className="text-sm font-black uppercase tracking-[0.14em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.9),0_0_18px_rgba(0,0,0,0.7)]">
              ボンドテック
            </span>
          </Container>
        </div>

        <Container className="relative z-10 py-16 pb-28 md:py-20 md:pb-32">
          <div className="max-w-2xl">
            <h1 className="text-[2.75rem] font-black leading-[1.25] tracking-normal text-white [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,0_0_24px_rgba(0,0,0,0.85),0_4px_18px_rgba(0,0,0,0.9)] md:text-6xl lg:text-[4rem]">
              ハードウェア/<br />フィジカルAI<br />エンジニア案件紹介サイト
            </h1>
            <div className="mt-10">
              <Button
                href="#entry"
                size="lg"
                className="!h-20 !px-16 !text-xl !bg-[#7B2233] hover:!bg-[#A33A52]"
              >
                会員登録
              </Button>
            </div>
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-[#7B2233]/45 py-6 backdrop-blur-sm">
          <Container className="flex flex-wrap items-center justify-center gap-3">
            {["シニアエンジニア活躍", "副業/フリーランス活躍", "週２～", "高収入"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-2 rounded-none border border-[#7B2233]/25 bg-white px-4 py-2.5 text-sm font-black text-[#7B2233] md:text-base"
              >
                <TagIcon />
                {tag}
              </span>
            ))}
          </Container>
        </div>
      </section>

      <section className="bg-[#EFF3F6] py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-black text-[#2B2B2B] md:text-5xl">
                ボンドテックとは
              </h2>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#8B8B8B]">
                About BondTech
              </p>
              <div className="mt-3 h-1 w-16 bg-gradient-to-r from-[#7B2233] to-[#A33A52]" />
              <div className="mt-8 space-y-5 text-base font-medium leading-loose text-[#2B2B2B]/85">
                <p>
                  ボンドテックは、<span className="font-black text-[#7B2233]">ハードウェアとフィジカルAI領域のエンジニア・PM</span>に案件をご紹介するサービスです。
                </p>
                <p>
                  いま、モノづくりの現場は技術者を求めています。
                  <br />
                  求人を出しても応募が来ない。育てる時間もない。だから、<span className="font-black text-[#7B2233]">すでに技術を持つ人が必要とされています。</span>
                </p>
                <p>
                  何十年かけて積み上げた技術を、そのままにしておくのはもったいない。
                  <br />
                  その経験を、待っている現場へ。
                </p>
                <p className="font-black text-[#7B2233]">
                  週2日から。シニアの方、副業・フリーランスの方も歓迎です。
                </p>
              </div>
            </div>

            <div className="relative aspect-[3/4] w-full max-w-md justify-self-center lg:justify-self-end">
              <Image
                src="/contact/partner/about-illustration.webp"
                alt="ボンドテック"
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-contain"
              />
            </div>
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
        <Cta />
      </LpSection>

      <LpSection label="Target" title="対象者">
        <CardGrid items={targets} />
        <Cta />
      </LpSection>

      <LpSection tone="white" label="Strength" title="サービスの強み">
        <CardGrid items={strengths} />
        <Cta />
      </LpSection>

      <section className="bg-[#FAF8F7] py-20 md:py-28">
        <Container className="max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#A33A52]">Message</p>
          <h2 className="mt-5 text-3xl font-black leading-relaxed md:text-4xl">
            経験のある技術者が、必要な場所に届く。<br />それが開発を前に進めます。
          </h2>
          <p className="mt-8 text-lg font-medium leading-loose">
            製造業の現場には、仕様、評価、量産、品質、規格など、言葉にしづらい判断がたくさんあります。私たちは、あなたの経験が正しく伝わるように整理し、必要としている企業との接点をつくります。
          </p>
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

      <LpSection label="Work Style" title="働き方">
        <div className="mx-auto max-w-4xl space-y-5">
          {workStyles.map(([title, body], index) => (
            <div key={title} className="grid gap-4 rounded-md border border-[#7B2233]/20 bg-white p-6 md:grid-cols-[120px_1fr] md:items-center">
              <p className="text-3xl font-black text-[#7B2233]">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-2 text-base font-medium leading-relaxed text-[#2B2B2B]/80">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <Cta />
      </LpSection>

      <LpSection tone="white" label="Flow" title="登録から案件参画まで">
        <div className="grid gap-4 md:grid-cols-4">
          {flow.map((step, index) => (
            <div key={step} className="relative rounded-md border border-[#7B2233]/20 bg-white p-6">
              <p className="text-3xl font-black text-[#7B2233]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-xl font-black">{step}</h3>
              {index < flow.length - 1 ? <span className="absolute -right-3 top-1/2 hidden text-[#7B2233] md:block">→</span> : null}
            </div>
          ))}
        </div>
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

      <footer className="bg-[#FAF8F7] py-10">
        <Container className="flex justify-center">
          <Link href={localePath("/privacy", locale)} className="text-sm font-bold text-[#7B2233] underline underline-offset-4">
            プライバシーポリシー
          </Link>
        </Container>
      </footer>
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

function CardGrid({ items }: { items: string[][] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map(([title, body], index) => (
        <div key={title} className="rounded-md border border-[#7B2233]/20 bg-white p-8">
          <LineIcon index={index} />
          <h3 className="mt-6 text-xl font-black text-[#2B2B2B]">{title}</h3>
          <p className="mt-4 text-base font-medium leading-relaxed text-[#2B2B2B]/80">{body}</p>
        </div>
      ))}
    </div>
  );
}

function Cta() {
  return (
    <div className="mt-12 text-center">
      <Button href="#entry" className="!bg-[#7B2233] hover:!bg-[#A33A52]">無料で登録する</Button>
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

function LineIcon({ index }: { index: number }) {
  const paths = [
    "M8 20h32M16 12v16M32 12v16M12 8h24v8H12zM18 28h12v8H18z",
    "M12 10h24v24H12zM20 6v8M28 6v8M20 30v8M28 30v8M8 18h8M8 26h8M32 18h8M32 26h8",
    "M10 14h28v20H10zM18 22h12M18 28h12M24 8v6M24 34v6",
  ];
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="text-[#7B2233]">
      <path d={paths[index % paths.length]} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
