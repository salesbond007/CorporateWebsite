import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import {
  Squiggle,
  Sparkle,
  CircleScribble,
  DotsDecoration,
} from "@/components/ui/Doodle";
import { EmailCaptureForm } from "@/components/contact/EmailCaptureForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "あなたの経験と人脈で、挑戦する企業の力に｜パートナー募集",
  description:
    "セールスボンドのパートナー募集。経営顧問・新規開拓・営業生産性・取引拡大・新規提携・人事・資金調達・工場改善・調達物流・DX・デジマ・海外展開・紹介営業の13領域で、これまで培った経験と人脈を活かせます。登録無料・完全成果報酬。",
};

/* ────────────────────────────────────────────────────────────
   13 領域カテゴリ(画像参照 + 紹介営業)
   ──────────────────────────────────────────────────────────── */

type Category = {
  label: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { label: "経営顧問・社外取締役としての経営支援全般", icon: <IconAdvisor /> },
  { label: "新規取引先の開拓支援", icon: <IconHandshake /> },
  { label: "営業部門の生産性向上支援", icon: <IconChartUp /> },
  { label: "既存取引先との取引拡大支援", icon: <IconNetwork /> },
  { label: "新規提携先の開拓支援", icon: <IconConnect /> },
  { label: "人事領域(採用・評価・教育)の強化支援", icon: <IconPeople /> },
  { label: "資金調達支援", icon: <IconCoins /> },
  { label: "工場の生産改善、技術継承支援", icon: <IconFactory /> },
  { label: "調達、物流部門のコスト削減支援", icon: <IconLogistics /> },
  { label: "システム構築・DX推進支援", icon: <IconSystem /> },
  { label: "デジタルマーケティングの強化支援", icon: <IconMarketing /> },
  { label: "海外展開支援", icon: <IconGlobe /> },
  { label: "紹介営業(人脈を活かした決裁者紹介)", icon: <IconReferral /> },
];

/* ────────────────────────────────────────────────────────────
   対象者(募集像)
   ──────────────────────────────────────────────────────────── */

type Persona = {
  number: string;
  title: string;
  body: string;
};

const personas: Persona[] = [
  {
    number: "01",
    title: "大手・上場企業出身の経営層 / 幹部経験者",
    body: "役員・部長クラス以上で培った経営判断・組織運営の知見をクライアント企業へ。",
  },
  {
    number: "02",
    title: "特定領域のプロフェッショナル / 専門家",
    body: "営業・マーケ・DX・人事・財務・法務・海外展開など、深い専門性をお持ちの方。",
  },
  {
    number: "03",
    title: "経営者・幹部との強い人脈をお持ちの方",
    body: "紹介を通じて企業の出会いを生み出せる方。本業を続けながらのご参画も歓迎です。",
  },
];

/* ────────────────────────────────────────────────────────────
   フロー
   ──────────────────────────────────────────────────────────── */

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "登録申請",
    description:
      "本ページのフォームから無料で登録。ご経歴・関心領域・ご紹介可能な人脈を伺います。",
  },
  {
    number: "02",
    title: "個別ヒアリング",
    description:
      "当社担当者よりご連絡。お力をお借りできる領域と関与形態を一緒に整理します。",
  },
  {
    number: "03",
    title: "案件のご紹介",
    description:
      "顧問契約・スポット支援・紹介営業など、お持ちの強みに合わせた案件をご提案。",
  },
  {
    number: "04",
    title: "ご参画 & 報酬",
    description:
      "ご合意のうえで案件に参画。成果に応じた報酬をお支払いします。",
  },
];

/* ────────────────────────────────────────────────────────────
   FAQ
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
    q: "得意領域が画像に挙げた13領域以外なのですが、応募できますか?",
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

      <PageHero
        eyebrow="Partner Program"
        title="あなたの経験と人脈を、挑戦する企業の力に。"
        description="経営顧問・新規開拓・DX推進・人事支援・海外展開・紹介営業——多彩な領域で「企業の本気の挑戦」に伴走してくださる方を募集しています。"
      />

      {/* ───── Manifesto ───── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 dot-bg-soft opacity-60" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              <span>The offer</span>
              <Squiggle className="h-3 w-12" />
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.15] tracking-tight text-ink">
              今まで培った
              <br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="relative z-10">人脈と経験</span>
                <CircleScribble className="absolute -inset-x-2 -inset-y-2 h-[120%] w-[110%]" />
              </span>
              、活かしませんか?
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-base md:text-lg leading-[2] text-ink-soft font-medium">
              新規事業を伸ばしたい、組織を変えたい、海外に出たい——。
              <br className="hidden md:block" />
              <span className="marker font-bold">本気で挑戦する企業の現場</span>
              には、あなたの知見と人脈が"次の一手"になる瞬間がある。
              <br className="hidden md:block" />
              セールスボンドは、その一手をクライアントに届ける役割を担っています。
            </p>
          </div>

          {/* Email capture #1 — after manifesto */}
          <div className="mx-auto mt-16 max-w-2xl border-2 border-ink bg-white p-8 md:p-10">
            <EmailCaptureForm locale={locale} />
          </div>
        </Container>
      </section>

      {/* ───── 案件カテゴリ ───── */}
      <section className="relative bg-cream py-28 md:py-36">
        <Sparkle className="absolute left-8 top-12 h-6 w-6 opacity-60" />
        <DotsDecoration className="absolute right-12 bottom-12 h-16 w-16 opacity-50" />
        <Container className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="section-label">Categories</p>
              <h2 className="mt-4 text-display-3 text-ink font-black">
                ご活躍いただける
                <br />
                <span className="text-brand-500">13</span>
                領域
              </h2>
            </div>
            <p className="md:col-span-7 text-base md:text-lg leading-[1.95] text-ink-soft font-medium">
              経営全般から特定領域の専門支援、人脈を活かした紹介営業まで。
              ご経験・お持ちの関係性に応じて、関与する領域をお選びいただけます。
              下記は代表例で、これ以外の領域でも歓迎しています。
            </p>
          </div>

          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((c, i) => (
              <li key={c.label}>
                <Reveal delay={(i % 4) * 60}>
                  <div className="flex h-full items-start gap-4 border-2 border-ink-line bg-white p-6 transition hover:border-brand-500 hover:-translate-y-0.5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center bg-brand-50 text-brand-600">
                      {c.icon}
                    </div>
                    <p className="text-sm md:text-base font-bold leading-snug text-ink">
                      {c.label}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-ink-muted">
            ※ これ以外の領域でも、企業の経営課題解決にご貢献いただける方は歓迎します。
          </p>
        </Container>
      </section>

      {/* ───── 対象者 ───── */}
      <section className="py-28 md:py-36">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="section-label">Who</p>
              <h2 className="mt-4 text-display-3 text-ink font-black">
                こんな方を
                <br />
                募集しています
              </h2>
              <p className="mt-6 text-base text-ink-soft leading-relaxed font-medium">
                経歴や肩書よりも、
                <span className="font-black text-ink">
                  「企業の挑戦を本気で支えたい」
                </span>
                という姿勢を大切にしています。
              </p>
            </div>

            <ul className="lg:col-span-8 space-y-4">
              {personas.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={i * 80}>
                    <div className="group flex items-start gap-6 border border-ink-line bg-cream/40 p-8 md:p-10 transition hover:border-brand-500 hover:bg-cream">
                      <div className="shrink-0">
                        <span className="font-display text-3xl md:text-4xl font-black text-brand-500">
                          {p.number}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-ink leading-tight">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ───── 関与形態 / 報酬 ───── */}
      <section className="bg-cream py-28 md:py-36">
        <Container>
          <div className="text-center">
            <p className="section-label">Engagement</p>
            <h2 className="mt-4 text-display-3 text-ink font-black">
              関与形態と報酬の考え方
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-ink-soft leading-relaxed font-medium">
              お力の貸し方は1つではありません。あなたに合った形でご参画いただけます。
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full border-2 border-ink-line bg-white p-8 md:p-10">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink-muted">
                  Pattern A
                </p>
                <h3 className="mt-4 text-2xl md:text-3xl font-black text-ink leading-tight">
                  顧問・専門家として参画
                </h3>
                <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                  クライアント企業と業務委託契約を締結し、定期もしくはスポットで支援。経営課題の助言・実行支援を担っていただきます。
                </p>
                <ul className="mt-6 space-y-2 text-sm text-ink font-medium">
                  <li className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-brand-500" aria-hidden="true" />
                    <span>月◯回の定例会、プロジェクト単位、スポット相談 等</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-brand-500" aria-hidden="true" />
                    <span>報酬は契約に応じた固定額。案件ごとに個別ご案内</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="h-full border-2 border-brand-500 bg-brand-500 p-8 md:p-10 text-white">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/80">
                  Pattern B
                </p>
                <h3 className="mt-4 text-2xl md:text-3xl font-black leading-tight">
                  紹介営業として参画
                </h3>
                <p className="mt-5 text-sm md:text-base leading-relaxed text-white/90 font-medium">
                  お持ちの人脈を活かして、クライアント企業へ決裁者をご紹介。完全成果報酬で、ノルマはありません。
                </p>
                <ul className="mt-6 space-y-2 text-sm font-medium">
                  <li className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true" />
                    <span>紹介協力金(商談実施で発生)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true" />
                    <span>成約協力金(成約時に追加で発生)</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <p className="mt-10 text-center text-xs text-ink-muted">
            ※ 具体的な金額・条件は案件ごと、ご登録後の個別ご案内となります。
          </p>

          {/* Email capture #2 — after engagement patterns */}
          <div className="mx-auto mt-16 max-w-2xl border-2 border-ink bg-white p-8 md:p-10">
            <EmailCaptureForm
              locale={locale}
              heading="気になったらまずは無料登録"
              subhead="メールアドレスを入力するだけ。本登録フォームをすぐにお送りします。"
            />
          </div>
        </Container>
      </section>

      {/* ───── Flow ───── */}
      <section className="py-28 md:py-36">
        <Container>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">Flow</p>
              <h2 className="mt-4 text-display-3 text-ink font-black">
                ご登録から参画まで
              </h2>
            </div>
            <p className="md:max-w-sm text-sm text-ink-soft leading-relaxed font-medium">
              4ステップ。難しい手続きはありません。
            </p>
          </div>

          <div className="relative mt-16">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 hidden h-[2px] bg-ink-line lg:block"
            />
            <ol className="grid gap-10 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.number} className="relative">
                  <Reveal delay={i * 80}>
                    <div className="flex flex-col items-start">
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center bg-brand-500 font-display text-lg font-black text-white shadow-card">
                        {s.number}
                      </div>
                      <h3 className="mt-6 text-lg md:text-xl font-black text-ink leading-tight">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                        {s.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-cream py-28 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                <span>FAQ</span>
                <Squiggle className="h-3 w-10" />
              </p>
              <h2 className="mt-4 text-display-3 text-ink font-black">
                よくある
                <br />
                ご質問
              </h2>
              <p className="mt-6 text-sm text-ink-muted leading-relaxed">
                その他のご質問は{" "}
                <Link
                  href={localePath("/contact", locale)}
                  className="font-bold underline underline-offset-4 text-ink hover:text-brand-600"
                >
                  お問い合わせ/無料相談
                </Link>
                からどうぞ。
              </p>
            </div>

            <div className="lg:col-span-8">
              <ul className="space-y-3">
                {faqs.map((f) => (
                  <li key={f.q} className="border border-ink-line bg-white">
                    <details className="group">
                      <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                        <span className="flex gap-4">
                          <span
                            aria-hidden="true"
                            className="font-display text-lg font-black text-brand-500"
                          >
                            Q.
                          </span>
                          <span className="text-base md:text-lg font-bold text-ink leading-snug">
                            {f.q}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="mt-1 grid h-7 w-7 shrink-0 place-items-center border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-brand-500 group-open:text-brand-500"
                        >
                          +
                        </span>
                      </summary>
                      <div className="border-t border-ink-line p-6 pt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                        <span
                          aria-hidden="true"
                          className="mr-2 font-display text-lg font-black text-ink-muted"
                        >
                          A.
                        </span>
                        {f.a}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-28 md:py-36">
        <Container>
          <div className="relative overflow-hidden bg-ink px-8 py-20 md:px-16 md:py-24 text-white">
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 bg-brand-500/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 bg-brand-500/20 blur-3xl"
            />
            <DotsDecoration className="absolute right-8 top-8 h-16 w-16 text-brand-500 opacity-70" />

            <div className="relative grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                  Apply now / 無料登録
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-tight">
                  挑戦する企業の力に、
                  <br />
                  <span className="text-brand-500">なりませんか？</span>
                </h2>
                <p className="mt-8 max-w-lg text-base md:text-lg leading-relaxed text-white/80 font-medium">
                  ご登録後、当社の担当者よりご連絡いたします。費用や継続義務はありません。お気軽にお申し込みください。
                </p>
              </div>

              <div className="lg:col-span-5">
                <EmailCaptureForm
                  locale={locale}
                  tone="dark"
                  heading="メールで本登録のご案内を受け取る"
                  subhead="入力1分。本登録フォームをすぐにメールでお送りします。"
                />
                <p className="mt-6 text-xs text-white/70">
                  メールではなく、まず問い合わせをご希望の方は{" "}
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
   Inline icons (24x24, line art, currentColor)
   ──────────────────────────────────────────────────────────── */

function svgProps() {
  return {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": "true" as const,
  };
}

function IconAdvisor() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="9" width="8" height="11" />
      <path d="M5 12h4M5 15h4M5 18h4" />
      <circle cx="17" cy="6" r="2.5" />
      <path d="M13 14c0-2.2 1.8-4 4-4s4 1.8 4 4v6h-8v-3" />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg {...svgProps()}>
      <path d="M3 12l4-4 3 2 4-2 4 3 3-3" />
      <path d="M7 14l4 4 4-3 4 2" />
      <path d="M11 12l2 2" />
    </svg>
  );
}

function IconChartUp() {
  return (
    <svg {...svgProps()}>
      <path d="M3 20h18" />
      <rect x="5" y="13" width="3" height="7" />
      <rect x="10.5" y="9" width="3" height="11" />
      <rect x="16" y="5" width="3" height="15" />
      <path d="M3 8l5-3 4 2 6-4" />
      <path d="M14 3h4v4" />
    </svg>
  );
}

function IconNetwork() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M9.5 10L6 7M14.5 10l3.5-3M9.5 14L6 17M14.5 14l3.5 3" />
    </svg>
  );
}

function IconConnect() {
  return (
    <svg {...svgProps()}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6h7M6 8.5v7M18 8.5v7M8.5 18h7" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg {...svgProps()}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15 17c0-2 1.7-3.5 4-3.5s2 1.5 2 3.5" />
    </svg>
  );
}

function IconCoins() {
  return (
    <svg {...svgProps()}>
      <ellipse cx="8" cy="7" rx="5" ry="2" />
      <path d="M3 7v4c0 1.1 2.2 2 5 2s5-.9 5-2V7" />
      <path d="M3 11v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4" />
      <path d="M15 9c1.7.4 3 1.2 3 2v8c0 1.1-2.2 2-5 2" />
      <path d="M19 4l2 2M19 4v3M19 4h3" />
    </svg>
  );
}

function IconFactory() {
  return (
    <svg {...svgProps()}>
      <path d="M3 20V10l5 3V10l6 3V10l4 3v7H3z" />
      <path d="M3 20h18" />
      <path d="M6 17h2M11 17h2M16 17h2" />
      <path d="M17 8V4h2v4" />
    </svg>
  );
}

function IconLogistics() {
  return (
    <svg {...svgProps()}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
      <path d="M3 12h11" />
    </svg>
  );
}

function IconSystem() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="4" width="18" height="12" />
      <path d="M3 8h18" />
      <circle cx="6" cy="6" r="0.5" fill="currentColor" />
      <circle cx="8" cy="6" r="0.5" fill="currentColor" />
      <path d="M8 20h8M12 16v4" />
      <path d="M8 11l2 2-2 2M14 11l2 2-2 2" />
    </svg>
  );
}

function IconMarketing() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="5" width="18" height="11" />
      <path d="M2 20h20" />
      <path d="M7 12l3-3 3 2 4-4" />
      <path d="M14 7h3v3" />
      <circle cx="7" cy="12" r="0.6" fill="currentColor" />
      <circle cx="10" cy="9" r="0.6" fill="currentColor" />
      <circle cx="13" cy="11" r="0.6" fill="currentColor" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z" />
    </svg>
  );
}

function IconReferral() {
  return (
    <svg {...svgProps()}>
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 10.5L15.5 7M8.5 13.5l7 3.5" />
      <path d="M20 6h2M20 18h2" />
    </svg>
  );
}
