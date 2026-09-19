import type { Metadata } from "next";
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

const heroImageSrc =
  "data:image/jpeg;base64,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";

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

      <section className="relative isolate min-h-[640px] overflow-hidden bg-[#FAF8F7] md:min-h-[720px]">
        <img
          src={heroImageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F7] from-0% via-[#FAF8F7]/90 via-35% to-[#FAF8F7]/5" />
        <Container className="relative z-10 flex min-h-[640px] items-center py-16 md:min-h-[720px] md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-[2.45rem] font-black leading-[1.22] tracking-normal text-[#2B2B2B] md:text-5xl lg:text-[3.55rem]">
              ハードウェア/<br />フィジカルAI<br />エンジニア募集
            </h1>
            <p className="mt-7 max-w-xl text-xl font-black leading-relaxed text-[#7B2233] md:text-2xl">
              「週２～」から、経験を活かせる開発案件へ。
            </p>
            <div className="mt-7 flex max-w-xl flex-wrap gap-3">
              {["週２～", "シニア活躍中", "副業・フリーランス歓迎"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[#7B2233] bg-white/95 px-4 py-2.5 text-sm font-black tracking-normal text-[#7B2233] shadow-sm md:text-base"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <Button href="#entry" size="lg" className="!bg-[#7B2233] hover:!bg-[#A33A52]">
                無料で登録する
              </Button>
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
