import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/i18n/path";

export const metadata: Metadata = {
  title: "ボンドテック | ハードウェア/フィジカルAIプロ人材紹介",
  description:
    "ボンドテックは、ハードウェアとフィジカルAI領域のエンジニア・PMを必要な期間だけ企業にご紹介するサービスです。機構設計、電気設計、組込み、ロボティクス、AI実装まで幅広く対応します。",
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
  ["開発の即戦力が足りない", "量産前、試作評価、仕様変更など、一時的に技術者が足りない現場に。"],
  ["専門領域を補いたい", "社内だけでは判断が難しい技術領域に、経験者の知見を加えたい企業に。"],
  ["技術顧問がほしい", "月1〜2回の技術顧問から、PM参画まで柔軟に相談したい企業に。"],
];

const strengths = [
  ["弊社独自の登録人材", "公開されている案件だけでなく、弊社独自に登録いただいた技術者からご紹介します。"],
  ["柔軟な稼働形態", "週2日から常駐まで、手を動かす実装から PM まで幅広くご紹介できます。"],
  ["スキルにマッチした紹介", "開発フェーズや技術要件を整理したうえで、経験に合う人材をご案内します。"],
];

const flow = ["ご相談", "要件整理", "候補者提案", "面談・参画"];

const faqs = [
  ["どのような職種に対応できますか？", "機構設計、電気設計、組込み、ロボティクス、センサ・通信、AI実装、品質・規格対応など、ハードウェア/フィジカルAI領域の職種を中心に対応します。"],
  ["短期間の依頼も可能ですか？", "可能です。試作、評価、量産前の立て直し、技術調査など、期間が限られた案件もご相談ください。"],
  ["契約形態は業務委託のみですか？", "まずは業務委託を中心にご提案します。ご要望に応じて顧問、準委任、プロジェクト単位の体制構築もご相談いただけます。"],
  ["相談時に何を準備すればよいですか？", "現状の課題、必要な技術領域、希望開始時期、稼働量、想定業務をお聞かせください。未整理の状態でも一緒に整理します。"],
];

export default function BondtechServicePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <main className="bg-[#FAF8F7] text-[#2B2B2B]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "サービス案内", url: localePath("/services", locale) },
          { name: "ボンドテック", url: localePath("/services/bondtech", locale) },
        ])}
      />

      <section className="border-b border-[#7B2233]/15 bg-[#FAF8F7]">
        <Container className="py-5">
          <div className="flex items-center justify-between gap-4">
            <Link href={localePath("/", locale)} className="text-sm font-black tracking-[0.08em] text-[#7B2233]">
              Sales Bond
            </Link>
            <Button href={localePath("/contact", locale)} className="!bg-[#7B2233] hover:!bg-[#A33A52]">
              無料相談する
            </Button>
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-[#FAF8F7]">
        <Container className="grid gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24 lg:py-28">
          <div>
            <div className="flex flex-wrap gap-3">
              {["ハードウェア", "フィジカルAI", "プロ人材紹介"].map((tag) => (
                <span key={tag} className="rounded-md border border-[#7B2233] bg-white px-4 py-2 text-sm font-bold text-[#7B2233]">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-8 text-base font-bold text-[#7B2233] md:text-lg">
              自社にない技術力を、必要な期間だけ。
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.25] tracking-normal md:text-5xl lg:text-6xl">
              ハードウェア/フィジカルAIの<br />プロ人材を、ボンドテックが紹介。
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed md:text-xl">
              機構設計・電気設計・組込み・ロボティクス・AI実装まで、開発フェーズに合うプロ人材をご紹介します。
            </p>
            <div className="mt-9">
              <Button href={localePath("/contact", locale)} size="lg" className="!bg-[#7B2233] hover:!bg-[#A33A52]">
                まずは要件を相談する
              </Button>
            </div>
          </div>
          <HeroObject />
        </Container>
      </section>

      <Section tone="white" label="Occupation" title="紹介可能な職種">
        <div className="grid gap-6 md:grid-cols-2">
          {jobGroups.map((group) => (
            <div key={group.title} className="rounded-md border border-[#7B2233]/20 bg-white p-8">
              <h2 className="text-2xl font-black text-[#7B2233]">{group.title}</h2>
              <ul className="mt-6 grid gap-3 text-base font-medium leading-relaxed sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="border-b border-[#7B2233]/10 pb-3">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <SectionCta locale={locale} />
      </Section>

      <Section label="Target" title="このような企業に向いています">
        <CardGrid items={targets} />
        <SectionCta locale={locale} />
      </Section>

      <Section tone="white" label="Strength" title="サービスの強み">
        <CardGrid items={strengths} />
        <SectionCta locale={locale} />
      </Section>

      <section className="bg-[#FAF8F7] py-20 md:py-28">
        <Container className="max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#A33A52]">Message</p>
          <h2 className="mt-5 text-3xl font-black leading-relaxed md:text-4xl">
            技術を知る人が、現場に入る。<br />それだけで進むプロジェクトがあります。
          </h2>
          <p className="mt-8 text-lg font-medium leading-loose">
            ボンドテックは、単に人材を紹介するのではなく、現場の課題と開発フェーズを整理したうえで、必要な経験を持つプロ人材との接点をつくります。採用では間に合わない局面でも、開発を止めない選択肢を提供します。
          </p>
        </Container>
      </section>

      <Section tone="white" label="Flow" title="ご相談から参画までの流れ">
        <div className="grid gap-4 md:grid-cols-4">
          {flow.map((item, index) => (
            <div key={item} className="relative rounded-md border border-[#7B2233]/20 bg-white p-6">
              <p className="text-3xl font-black text-[#7B2233]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-xl font-black">{item}</h3>
              {index < flow.length - 1 ? <span className="absolute -right-3 top-1/2 hidden text-[#7B2233] md:block">→</span> : null}
            </div>
          ))}
        </div>
        <SectionCta locale={locale} />
      </Section>

      <Section label="FAQ" title="よくある質問">
        <div className="mx-auto max-w-4xl divide-y divide-[#7B2233]/15 rounded-md border border-[#7B2233]/20 bg-white">
          {faqs.map(([q, a]) => (
            <details key={q} className="group p-6">
              <summary className="cursor-pointer list-none text-lg font-black text-[#2B2B2B]">
                {q}
              </summary>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#2B2B2B]/80">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-[#7B2233] py-16 text-white md:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-white/70">Contact</p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">必要な人材像から一緒に整理します。</h2>
          </div>
          <Button href={localePath("/contact", locale)} size="lg" className="!bg-white !text-[#7B2233] hover:!bg-[#FAF8F7]">
            無料相談する
          </Button>
        </Container>
      </section>
    </main>
  );
}

function Section({ label, title, children, tone = "cream" }: { label: string; title: string; children: React.ReactNode; tone?: "cream" | "white" }) {
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

function SectionCta({ locale }: { locale: string }) {
  return (
    <div className="mt-12 text-center">
      <Button href={localePath("/contact", locale as "ja" | "en")} className="!bg-[#7B2233] hover:!bg-[#A33A52]">
        無料相談する
      </Button>
    </div>
  );
}

function LineIcon({ index }: { index: number }) {
  const paths = [
    "M8 20h32M16 12v16M32 12v16M12 8h24v8H12zM18 28h12v8H18z",
    "M12 10h24v24H12zM20 6v8M28 6v8M20 30v8M28 30v8M8 18h8M8 26h8M32 18h8M32 26h8",
    "M12 14h24v20H12zM18 8v6M30 8v6M18 34v6M30 34v6M18 22h12",
  ];
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="text-[#7B2233]">
      <path d={paths[index % paths.length]} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroObject() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] rounded-md border border-[#7B2233]/15 bg-white p-8">
      <div className="absolute inset-8 rounded-md border border-[#7B2233]/25" />
      <div className="absolute left-[18%] top-[22%] h-28 w-44 rounded-md border-2 border-[#7B2233] bg-[#FAF8F7]">
        <div className="grid h-full grid-cols-4 gap-3 p-4">
          {Array.from({ length: 8 }).map((_, i) => <span key={i} className="rounded-full border border-[#7B2233]/70" />)}
        </div>
      </div>
      <div className="absolute right-[17%] top-[18%] h-28 w-28 rounded-full border-[10px] border-[#7B2233]/90 bg-[#FAF8F7]">
        <div className="absolute inset-7 rounded-full border-2 border-[#8B8B8B]" />
      </div>
      <div className="absolute bottom-[24%] left-[22%] h-8 w-56 -rotate-12 rounded-md bg-[#8B8B8B]" />
      <div className="absolute bottom-[18%] right-[22%] h-28 w-10 -rotate-12 rounded-md border-2 border-[#7B2233] bg-white" />
      <div className="absolute bottom-[33%] right-[18%] h-16 w-16 rounded-md border-2 border-[#A33A52] bg-[#FAF8F7]" />
      <div className="absolute bottom-[16%] left-[18%] h-16 w-16 rounded-full border-2 border-[#7B2233] bg-white" />
    </div>
  );
}
