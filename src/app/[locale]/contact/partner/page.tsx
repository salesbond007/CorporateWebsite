import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EmailCaptureForm } from "@/components/contact/EmailCaptureForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "あなたの経験と人脈で、挑戦する企業の力に｜パートナー募集",
  description:
    "セールスボンドのパートナー募集。経営顧問・社外取締役・領域専門家・紹介営業として、これまで培った経験と人脈を企業の課題解決に活かせます。登録無料・完全成果報酬。",
};

/* ────────────────────────────────────────────────────────────
   1. Hero に並べる 3 パターン
   ──────────────────────────────────────────────────────────── */

type HeroPattern = {
  label: string;
  title: string;
  body: string;
  imageAlt: string;
};

const heroPatterns: HeroPattern[] = [
  {
    label: "Pattern A",
    title: "顧問・社外取締役として",
    body: "経営層・幹部としての経験を、クライアント企業の経営判断・組織運営に直接活かす働き方。",
    imageAlt: "顧問として活躍する人物",
  },
  {
    label: "Pattern B",
    title: "領域の専門家として",
    body: "営業・マーケ・DX・人事・財務など、特定領域の深い専門性で企業の課題解決を伴走する働き方。",
    imageAlt: "専門家として活躍する人物",
  },
  {
    label: "Pattern C",
    title: "紹介営業として",
    body: "お持ちの人脈を活かして、クライアント企業の決裁者開拓に貢献する成果報酬型の働き方。",
    imageAlt: "紹介営業として活躍する人物",
  },
];

/* ────────────────────────────────────────────────────────────
   2. 数字バンド(プレースホルダ)
   ──────────────────────────────────────────────────────────── */

type Stat = { value: string; unit?: string; label: string };

const stats: Stat[] = [
  { value: "13", unit: "領域", label: "支援テーマ" },
  { value: "0", unit: "円", label: "登録・利用料" },
  { value: "0", unit: "件", label: "ノルマ・活動義務" },
  { value: "業務委託", label: "顧問契約 / 紹介報酬" },
];

/* ────────────────────────────────────────────────────────────
   3. 支援領域(13テーマ)
   ──────────────────────────────────────────────────────────── */

const themes: string[] = [
  "経営顧問・社外取締役としての経営支援",
  "新規取引先の開拓支援",
  "営業部門の生産性向上支援",
  "既存取引先との取引拡大支援",
  "新規提携先の開拓支援",
  "人事領域(採用・評価・教育)の強化",
  "資金調達支援",
  "工場の生産改善・技術継承",
  "調達・物流のコスト削減",
  "システム構築・DX推進",
  "デジタルマーケティング強化",
  "海外展開支援",
  "紹介営業(人脈を活かした決裁者紹介)",
];

/* ────────────────────────────────────────────────────────────
   4. 登録者プロフィール(プレースホルダ)
   ──────────────────────────────────────────────────────────── */

type Profile = {
  role: string;
  company: string;
  message: string;
};

const profiles: Profile[] = [
  {
    role: "元 大手SaaS企業 営業役員",
    company: "現 業務委託 / 顧問",
    message: "BtoB営業組織の立ち上げ、CRM導入、商談化率改善まで支援可能。",
  },
  {
    role: "元 メーカー 海外事業部長",
    company: "現 海外進出コンサル",
    message: "東南アジア・北米の市場参入戦略から販路構築まで実行支援。",
  },
  {
    role: "元 上場企業 CHRO",
    company: "現 人事顧問",
    message: "採用設計・人事評価制度・管理職育成のフレームワークを提供。",
  },
  {
    role: "元 メガバンク 法人営業",
    company: "現 資金調達アドバイザー",
    message: "銀行融資・補助金・VC交渉まで、最適な調達手段を伴走支援。",
  },
  {
    role: "元 大手SIer プロジェクトマネージャー",
    company: "現 DX 推進アドバイザー",
    message: "システム構築要件定義、ベンダー選定、社内浸透までを支援。",
  },
  {
    role: "元 メーカー 工場長",
    company: "現 製造業向け生産改善コンサル",
    message: "工場の生産性 KPI 改善、ベテラン技術の継承プログラム設計。",
  },
];

/* ────────────────────────────────────────────────────────────
   5. セールスボンドの強み 3つ
   ──────────────────────────────────────────────────────────── */

type Strength = { number: string; title: string; body: string };

const strengths: Strength[] = [
  {
    number: "01",
    title: "13 領域、多様なご参画スタイル",
    body: "経営全般から特定領域の専門支援、紹介営業まで。お持ちの強みに合わせて関与形態を選べます。",
  },
  {
    number: "02",
    title: "完全成果報酬・登録費用無料",
    body: "登録・月会費は一切かかりません。お力をお貸しいただいた成果に応じて報酬をお支払いします。",
  },
  {
    number: "03",
    title: "個人情報を厳重に保護",
    body: "ご登録情報は当社で管理。お名前は紹介承諾後にのみクライアント企業へ開示し、連絡先は非公開です。",
  },
];

/* ────────────────────────────────────────────────────────────
   6. 活動事例(プレースホルダ)
   ──────────────────────────────────────────────────────────── */

type CaseStudy = {
  industry: string;
  challenge: string;
  approach: string;
  result: string;
};

const cases: CaseStudy[] = [
  {
    industry: "BtoB SaaS / 従業員数 約100名",
    challenge:
      "急成長に組織が追いつかず、エンタープライズ向け営業のスケールに課題。",
    approach:
      "元・上場SaaS の営業役員経験者を顧問としてアサイン。営業組織のフレームと商談プロセスを再設計。",
    result:
      "半年で大型案件の受注率が改善し、社内に営業ナレッジが定着。",
  },
  {
    industry: "製造業 / 売上 約50億円",
    challenge:
      "新市場として東南アジアへ進出したいが、現地のパートナー開拓ノウハウがない。",
    approach:
      "元・大手メーカー海外事業部長を紹介営業パートナーとしてアサイン。現地有力企業をご紹介。",
    result:
      "初年度で2社との取引を開始し、現地代理店契約の締結まで到達。",
  },
];

/* ────────────────────────────────────────────────────────────
   7. 登録〜参画の流れ
   ──────────────────────────────────────────────────────────── */

type Step = { number: string; title: string; body: string };

const steps: Step[] = [
  {
    number: "STEP 01",
    title: "メールアドレスで仮登録",
    body: "本ページのフォームよりメールアドレスをご登録ください。本登録フォームをすぐにお送りします。",
  },
  {
    number: "STEP 02",
    title: "本登録 / 個別ヒアリング",
    body: "メールから本登録フォームへ。ご経歴・関心領域を踏まえ、当社担当者よりご連絡します。",
  },
  {
    number: "STEP 03",
    title: "案件のご紹介・ご参画",
    body: "お持ちの強みに合わせた案件をご提案。ご合意のうえで参画 → 成果に応じた報酬をお支払い。",
  },
];

/* ────────────────────────────────────────────────────────────
   8. FAQ
   ──────────────────────────────────────────────────────────── */

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "登録に費用はかかりますか?",
    a: "いいえ、登録・活動に費用は一切かかりません。完全無料でご利用いただけます。",
  },
  {
    q: "副業や複業として参加できますか?",
    a: "可能です。ご自身の本業や生活ペースに合わせて活動量を調整いただけます。所属企業の副業規定はご確認のうえお申し込みください。",
  },
  {
    q: "報酬はどのように発生しますか?",
    a: "案件の種類により異なります。顧問・専門家としての業務委託は契約に応じた報酬、紹介営業は商談実施・成約に応じた成果報酬をお支払いします。詳細はご登録後の個別ご案内となります。",
  },
  {
    q: "個人情報は紹介先企業に公開されますか?",
    a: "お名前は紹介を承諾いただいたクライアント企業のみに開示します。連絡先(電話・メール)は当社で管理し、紹介先には非公開です。",
  },
  {
    q: "ノルマや活動義務はありますか?",
    a: "ありません。お力を貸していただける範囲・タイミングで、無理のない関与をお願いしています。",
  },
  {
    q: "得意領域が記載 13 領域以外なのですが、応募できますか?",
    a: "歓迎します。記載は代表例で、これ以外の領域でも企業の経営課題解決にご貢献いただける方はぜひご応募ください。",
  },
];

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

export default function PartnerContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "お問い合わせ/無料相談", url: localePath("/contact", locale) },
          { name: "個人の方はこちら", url: localePath("/contact/partner", locale) },
        ])}
      />

      {/* ───── 0. Hero image with overlay ───── */}
      <section className="relative overflow-hidden bg-ink">
        <div className="relative h-[clamp(520px,80vh,760px)] w-full">
          <Image
            src="https://i.imgur.com/f0YW89g.jpeg"
            alt="挑戦する企業の現場で活躍するビジネスパーソン"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* readability gradient — darker on left where the text sits */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/20 to-transparent"
          />

          <Container className="relative h-full">
            <div className="flex h-full flex-col justify-end pb-12 md:justify-center md:pb-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/85">
                Partner Program
              </p>

              <h1 className="mt-5 max-w-3xl text-white">
                <span className="inline-block bg-brand-500 px-4 py-1.5 font-display text-[clamp(2rem,5.5vw,4rem)] font-black leading-[1.15]">
                  培った経験と人脈を
                </span>
                <br />
                <span className="mt-3 inline-block bg-brand-500 px-4 py-1.5 font-display text-[clamp(2rem,5.5vw,4rem)] font-black leading-[1.15]">
                  挑戦する企業の力に
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm md:text-base font-bold italic text-white/90 leading-relaxed">
                顧問・社外取締役・領域の専門家・紹介営業として
              </p>

              <div className="mt-8">
                <Link
                  href="#email-capture-top"
                  className="inline-flex h-14 items-center gap-3 bg-brand-500 px-7 text-sm md:text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(245,130,32,0.7)] transition hover:bg-brand-600"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M3 17c0-3 3-5 7-5s7 2 7 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  無料で登録
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ───── 1. Hero patterns (3 ways to engage) ───── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {heroPatterns.map((p) => (
              <article
                key={p.title}
                className="flex h-full flex-col border-2 border-ink-line bg-white"
              >
                <ImagePlaceholder
                  ratio="aspect-[4/3]"
                  label={p.imageAlt}
                />
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-500">
                    {p.label}
                  </p>
                  <h2 className="mt-3 text-xl md:text-2xl font-black text-ink leading-snug">
                    {p.title}
                  </h2>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                    {p.body}
                  </p>
                  <div className="mt-6 pt-6 border-t border-ink-line">
                    <Link
                      href="#email-capture-top"
                      className="link-arrow text-sm"
                    >
                      まずは無料登録
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── 2. Stats band ───── */}
      <section className="border-y border-ink-line bg-ink py-12 md:py-14 text-white">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-black leading-none text-white">
                  {s.value}
                  {s.unit ? (
                    <span className="ml-1 text-lg md:text-xl text-brand-500">
                      {s.unit}
                    </span>
                  ) : null}
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── 3. 13 themes ───── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Service Themes"
            title="ご活躍いただける13の支援テーマ"
            sub="経営全般から特定領域の専門支援、紹介営業まで。下記は代表例で、これ以外の領域でも歓迎します。"
          />

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {themes.map((t, i) => (
              <li
                key={t}
                className="flex items-start gap-3 border border-ink-line bg-white p-5"
              >
                <span className="font-display text-xl font-black text-brand-500 leading-none shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base font-bold leading-snug text-ink">
                  {t}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Email capture #1 ───── */}
      <section
        id="email-capture-top"
        className="scroll-mt-24 bg-cream py-16 md:py-20"
      >
        <Container>
          <div className="mx-auto max-w-2xl border-2 border-ink bg-white p-8 md:p-10">
            <EmailCaptureForm locale={locale} />
          </div>
        </Container>
      </section>

      {/* ───── 4. Member profiles ───── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Members"
            title="ご登録いただいているパートナー例"
            sub="多様なバックグラウンドの経営層・専門家・営業職経験者にご登録いただいています(個人特定を避けた紹介例)。"
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((p) => (
              <li
                key={p.role}
                className="flex flex-col border border-ink-line bg-white"
              >
                <ImagePlaceholder
                  ratio="aspect-[3/2]"
                  label={`${p.role} の写真`}
                />
                <div className="flex-1 p-6">
                  <p className="text-xs font-bold text-brand-600">
                    {p.company}
                  </p>
                  <h3 className="mt-2 text-base md:text-lg font-black text-ink leading-snug">
                    {p.role}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft font-medium">
                    {p.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── 5. Strengths ───── */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Strengths"
            title="セールスボンドのパートナー制度の特徴"
            sub="安心して取り組んでいただける仕組みを徹底しています。"
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {strengths.map((s) => (
              <li key={s.number} className="border border-ink-line bg-white">
                <ImagePlaceholder
                  ratio="aspect-[4/3]"
                  label={`強み ${s.number} の補足画像`}
                />
                <div className="p-6 md:p-7">
                  <p className="font-display text-3xl font-black text-brand-500 leading-none">
                    {s.number}
                  </p>
                  <h3 className="mt-5 text-lg md:text-xl font-black text-ink leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── 6. Case studies ───── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Case Studies"
            title="パートナーとともに生まれた成果"
            sub="ご参画いただいた方々の力で、クライアント企業の事業前進を支援した事例です。"
          />

          <ul className="mt-12 space-y-10">
            {cases.map((c, i) => (
              <li
                key={c.industry}
                className="grid gap-8 border border-ink-line bg-white md:grid-cols-12"
              >
                <div className="md:col-span-5">
                  <ImagePlaceholder
                    ratio="aspect-[4/3] md:aspect-auto md:h-full"
                    label={`事例 ${String(i + 1).padStart(2, "0")} のイメージ画像`}
                  />
                </div>
                <div className="md:col-span-7 p-7 md:p-10">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-500">
                    Case 0{i + 1}
                  </p>
                  <h3 className="mt-3 text-lg md:text-xl font-black text-ink leading-snug">
                    {c.industry}
                  </h3>

                  <dl className="mt-6 space-y-5 text-sm md:text-base">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">
                        Challenge
                      </dt>
                      <dd className="mt-1.5 leading-relaxed text-ink font-medium">
                        {c.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">
                        Approach
                      </dt>
                      <dd className="mt-1.5 leading-relaxed text-ink font-medium">
                        {c.approach}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                        Result
                      </dt>
                      <dd className="mt-1.5 leading-relaxed text-ink font-bold">
                        {c.result}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Email capture #2 ───── */}
      <section className="bg-cream py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl border-2 border-ink bg-white p-8 md:p-10">
            <EmailCaptureForm
              locale={locale}
              heading="気になったらまずは無料登録"
              subhead="メールアドレスを入力すると、本登録フォームをすぐにお送りします。"
            />
          </div>
        </Container>
      </section>

      {/* ───── 7. Flow ───── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Flow"
            title="ご登録から参画までの流れ"
            sub="3ステップ。難しい手続きはありません。"
          />

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.number} className="border border-ink-line bg-white p-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                  {s.number}
                </p>
                <h3 className="mt-4 text-lg md:text-xl font-black text-ink leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───── 8. FAQ ───── */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="FAQ"
            title="よくあるご質問"
            sub={null}
          />

          <ul className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <li key={f.q} className="border border-ink-line bg-white">
                <details className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                    <span className="flex gap-3">
                      <span className="font-display text-lg font-black text-brand-500">
                        Q.
                      </span>
                      <span className="text-base md:text-lg font-bold text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-brand-500 group-open:text-brand-500">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-ink-line p-6 pt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                    <span className="mr-2 font-display text-lg font-black text-ink-muted">
                      A.
                    </span>
                    {f.a}
                  </div>
                </details>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-ink-muted">
            その他のご質問は{" "}
            <Link
              href={localePath("/contact", locale)}
              className="font-bold underline underline-offset-4 text-ink hover:text-brand-600"
            >
              お問い合わせ/無料相談
            </Link>
            よりご連絡ください。
          </p>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden bg-ink px-8 py-16 md:px-16 md:py-20 text-white">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                  Apply now / 無料登録
                </p>
                <h2 className="mt-5 text-display-3 font-black leading-tight">
                  挑戦する企業の力に、
                  <br />
                  なりませんか?
                </h2>
                <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed text-white/80 font-medium">
                  メールアドレスを入力するだけ。本登録のご案内をすぐにお送りします。費用や継続義務はありません。
                </p>
              </div>

              <div className="lg:col-span-6">
                <EmailCaptureForm
                  locale={locale}
                  tone="dark"
                  heading=""
                  subhead=""
                />
                <p className="mt-6 text-xs text-white/70">
                  メールではなく問い合わせをご希望の方は{" "}
                  <Link
                    href={localePath("/contact", locale)}
                    className="font-bold underline underline-offset-4 text-white hover:text-brand-300"
                  >
                    お問い合わせ/無料相談
                  </Link>
                  からどうぞ。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   Local helpers
   ──────────────────────────────────────────────────────────── */

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string | null;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
        {title}
      </h2>
      {sub ? (
        <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
          {sub}
        </p>
      ) : null}
    </div>
  );
}

function ImagePlaceholder({
  ratio,
  label,
}: {
  ratio: string;
  label: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden border-b border-ink-line bg-cream ${ratio}`}
    >
      <div className="absolute inset-0 grid place-items-center text-center px-4">
        <div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="mx-auto mb-3 text-ink-muted/60"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="6"
              width="24"
              height="20"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M4 22l8-6 6 4 10-7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[10px] md:text-xs font-bold tracking-wide text-ink-muted">
            画像枠
          </p>
          <p className="mt-1 text-[10px] md:text-xs text-ink-muted/80">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
