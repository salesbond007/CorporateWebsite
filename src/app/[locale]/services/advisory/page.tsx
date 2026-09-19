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
  title: "顧問事業 | AI化・DX化・海外展開のプロフェッショナル紹介",
  description:
    "AI化、DX化、海外展開など、あらゆる経営課題におけるプロフェッショナルをご紹介する顧問サービスです。経営に伴走する専門家との接点をつくります。",
};

const fields = [
  {
    title: "AI化・DX化",
    items: ["生成AI活用戦略", "業務プロセスのDX化", "データ基盤・システム刷新", "社内AI/DX体制構築"],
  },
  {
    title: "海外展開・その他経営課題",
    items: ["海外進出・現地法人設立", "グローバル人事・組織づくり", "新規事業開発", "資金調達・財務戦略"],
  },
];

const targets = [
  ["専門知見を借りたい", "社内にない専門領域の知見を、必要なタイミングでスポット的に借りたい企業に。"],
  ["意思決定を伴走してほしい", "経営判断や投資判断を、経験豊富な専門家と一緒に整理したい企業に。"],
  ["まず相談したい", "何から手をつければよいか分からない段階から、専門家に相談したい企業に。"],
];

const strengths = [
  ["幅広い専門領域", "AI化・DX化から海外展開まで、経営課題に応じて適した顧問をご紹介します。"],
  ["柔軟な関わり方", "月1〜2回の顧問契約から、プロジェクト単位の伴走支援まで柔軟に対応します。"],
  ["経営視点でのマッチング", "技術や制度の知識だけでなく、経営視点で伴走できる専門家を厳選してご紹介します。"],
];

const flow = ["ご相談", "課題整理", "顧問のご提案", "面談・契約"];

const faqs = [
  ["どのような分野の顧問を紹介してもらえますか？", "AI化・DX化、海外展開、新規事業、組織・人事、財務など、経営課題に応じて幅広い分野の専門家をご紹介します。"],
  ["契約期間の縛りはありますか？", "まずは短期間・スポットでのご相談も可能です。継続的な伴走をご希望の場合は月次契約などもご提案します。"],
  ["相談だけでも可能ですか？", "可能です。まずは現状の課題感をお聞かせください。顧問紹介が必要かどうかも含めてご相談いただけます。"],
  ["費用はどのくらいかかりますか？", "顧問の専門性や関わり方によって異なります。ご相談内容を伺ったうえで、個別にお見積りします。"],
];

export default function AdvisoryServicePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <main className="bg-[#FAF8F7] text-[#2B2B2B]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "サービス案内", url: localePath("/services", locale) },
          { name: "顧問事業", url: localePath("/services/advisory", locale) },
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
              {["AI化", "DX化", "海外展開"].map((tag) => (
                <span key={tag} className="rounded-md border border-[#7B2233] bg-white px-4 py-2 text-sm font-bold text-[#7B2233]">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-8 text-base font-bold text-[#7B2233] md:text-lg">
              あらゆる経営課題に、専門家の伴走を。
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.25] tracking-normal md:text-5xl lg:text-6xl">
              AI化・DX化・海外展開の<br />プロフェッショナルをご紹介。
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed md:text-xl">
              AI化、DX化、海外展開など、あらゆる経営課題に応じた顧問を、貴社の状況に合わせてご紹介します。
            </p>
            <div className="mt-9">
              <Button href={localePath("/contact", locale)} size="lg" className="!bg-[#7B2233] hover:!bg-[#A33A52]">
                まずは課題を相談する
              </Button>
            </div>
          </div>
          <HeroObject />
        </Container>
      </section>

      <Section tone="white" label="Field" title="対応可能な分野">
        <div className="grid gap-6 md:grid-cols-2">
          {fields.map((group) => (
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
            経験を知る人が、経営に加わる。<br />それだけで前に進む意思決定があります。
          </h2>
          <p className="mt-8 text-lg font-medium leading-loose">
            セールスボンドは、単に専門家を紹介するのではなく、貴社の経営課題を整理したうえで、必要な経験を持つプロフェッショナルとの接点をつくります。社内にない知見を、必要な形で取り入れる選択肢を提供します。
          </p>
        </Container>
      </section>

      <Section tone="white" label="Flow" title="ご相談から契約までの流れ">
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
            <h2 className="mt-4 text-3xl font-black md:text-4xl">課題感から一緒に整理します。</h2>
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
