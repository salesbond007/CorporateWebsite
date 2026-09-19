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
  title: "フィジカルAI研修 | 生成AI・AIエージェント・フィジカルAI研修",
  description:
    "生成AIからフィジカルAIまでを体系的に学び、自社・自部署でAI活用を企画できる人材を育成する法人向け研修です。",
};

const curriculum = [
  {
    title: "基礎編",
    items: ["生成AIの基礎", "プロンプト設計の基本", "AIエージェントの仕組み", "フィジカルAIの基礎知識"],
  },
  {
    title: "実践編",
    items: ["自社業務でのAI活用企画", "AIエージェント活用設計", "フィジカルAI導入シナリオ", "導入後の運用体制づくり"],
  },
];

const targets = [
  ["全社でAI活用を進めたい", "経営層から現場まで、共通言語でAI活用を語れる組織にしたい企業に。"],
  ["活用の種を発掘したい", "研修を通じて、自社・自部署でのAI活用アイデアを発掘したい企業に。"],
  ["導入後も伴走してほしい", "研修だけで終わらせず、導入コンサルティングまで一気通貫で相談したい企業に。"],
];

const strengths = [
  ["生成AIからフィジカルAIまで体系的に学習", "最新の生成AI・AIエージェントから、ロボティクス領域のフィジカルAIまで幅広くカバーします。"],
  ["全社員からAI活用の種を発掘", "受講者一人ひとりが、自部署の業務に照らしてAI活用アイデアを持ち帰れる構成です。"],
  ["研修後のAI導入コンサルティング", "研修で終わらず、実際の導入検討・体制づくりまで継続してご支援します。"],
];

const flow = ["ご相談", "研修設計", "研修実施", "導入コンサルティング"];

const faqs = [
  ["どのような対象者向けの研修ですか？", "経営層向けから若手・現場社員向けまで、対象者に応じてカリキュラムを設計します。"],
  ["オンライン開催は可能ですか？", "可能です。対面・オンライン・ハイブリッドいずれの形式にも対応します。"],
  ["研修時間はどのくらいですか？", "半日の入門編から、複数回にわたる実践プログラムまで、ご要望に応じて設計します。"],
  ["研修後のフォローはありますか？", "研修後のAI導入コンサルティングもご提供しており、実際の活用検討まで継続してご支援します。"],
];

export default function PhysicalAiTrainingServicePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <main className="bg-[#FAF8F7] text-[#2B2B2B]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "サービス案内", url: localePath("/services", locale) },
          { name: "フィジカルAI研修", url: localePath("/services/physical-ai-training", locale) },
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
              {["生成AI", "AIエージェント", "フィジカルAI"].map((tag) => (
                <span key={tag} className="rounded-md border border-[#7B2233] bg-white px-4 py-2 text-sm font-bold text-[#7B2233]">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-8 text-base font-bold text-[#7B2233] md:text-lg">
              AI活用を、企画できる人材へ。
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.25] tracking-normal md:text-5xl lg:text-6xl">
              生成AIからフィジカルAIまで、<br />体系的に学ぶ法人研修。
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed md:text-xl">
              自社・自部署でAI活用を企画できる人材を育成し、研修後の導入検討まで伴走します。
            </p>
            <div className="mt-9">
              <Button href={localePath("/contact", locale)} size="lg" className="!bg-[#7B2233] hover:!bg-[#A33A52]">
                研修内容を相談する
              </Button>
            </div>
          </div>
          <HeroObject />
        </Container>
      </section>

      <Section tone="white" label="Curriculum" title="研修カリキュラム例">
        <div className="grid gap-6 md:grid-cols-2">
          {curriculum.map((group) => (
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
            知っているだけでは、進まない。<br />使える人が増えると、組織が動き出します。
          </h2>
          <p className="mt-8 text-lg font-medium leading-loose">
            セールスボンドは、研修を「学んで終わり」にせず、実際の業務に落とし込むところまで伴走します。生成AIからフィジカルAIまで、自社に必要な活用の形を一緒に見つけます。
          </p>
        </Container>
      </section>

      <Section tone="white" label="Flow" title="ご相談から研修実施までの流れ">
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
            <h2 className="mt-4 text-3xl font-black md:text-4xl">貴社に合う研修内容から設計します。</h2>
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
