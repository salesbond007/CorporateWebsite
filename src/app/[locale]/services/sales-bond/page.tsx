import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";

const SERVICE_SLUG = "sales-bond";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "リファボンド｜人脈で大手・上場企業の決裁者につながる完全成果報酬の紹介サービス",
  description:
    "リファボンド(旧:セールスボンド)は、人脈紹介で大手・上場・地方企業の決裁者/役員と直接つながれる完全成果報酬型サービス。初期費用・月額費用ゼロ。アウトバウンドでは届かない層への商談機会を創出します。",
};

type Challenge = { titleTop: string; titleBottom: string };

const challenges: Challenge[] = [
  {
    titleTop: "決裁者アポが",
    titleBottom: "思うように取れない",
  },
  {
    titleTop: "新規開拓の商談数が",
    titleBottom: "伸び悩んでいる",
  },
  {
    titleTop: "展示会や広告で獲得したリードが、",
    titleBottom: "商談につながらない",
  },
];

function ChallengeIcon({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-16 w-16 md:h-20 md:w-20",
  };
  switch (index) {
    // 1. 決裁者アポが取れない: カレンダーに×
    case 0:
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
          <path d="M9.5 14.5l5 5M14.5 14.5l-5 5" />
        </svg>
      );
    // 2. 新規開拓・商談数が伸び悩み: フラットな棒グラフ
    case 1:
      return (
        <svg {...common}>
          <path d="M3 20h18" />
          <rect x="5.5" y="13" width="3" height="7" />
          <rect x="10.5" y="11" width="3" height="9" />
          <rect x="15.5" y="12" width="3" height="8" />
          <path d="M5 8l4-1 5 1 5-2" />
        </svg>
      );
    // 3. リードが商談につながらない: 漏れのあるファネル
    default:
      return (
        <svg {...common}>
          <path d="M3 5h18l-7 8.5V20l-4-2v-4.5z" />
          <path d="M16 17l5 5M21 17l-5 5" />
        </svg>
      );
  }
}

type Reason = { number: string; title: string; body: string; image?: string };

const reasons: Reason[] = [
  {
    number: "01",
    title: "大手/上場企業の決裁者との商談を実現!",
    body: "「大手/上場企業を開拓したい」「地方を攻めたい」「ベンチャーに会いたい」など、多様なご要望に柔軟に対応します。ターゲットを指定できるため費用対効果の高い開拓が実現します。",
    image: "https://i.imgur.com/gQXW8Lx.png",
  },
  {
    number: "02",
    title: "月額費用 0 円の完全成果報酬型!",
    body: "初期費用も月額費用も 0 円。アポ単価のみの完全成果報酬だから、ローリスクではじめられます。",
  },
  {
    number: "03",
    title: "紹介経由だから信頼を起点に商談がはじまる",
    body: "テレアポや飛び込みと違い、紹介経由だから初回から信頼ベースで商談がスタートします。",
  },
];

type FlowStep = { digit: string; title: string; body: string };

const logos: string[] = [
  "https://i.imgur.com/DsBUTxo.png",
  "https://i.imgur.com/Cem1VTy.png",
  "https://i.imgur.com/iymZ2CC.png",
  "https://i.imgur.com/OeRRBLb.png?3",
  "https://i.imgur.com/4va7wOB.png",
];

const flowSteps: FlowStep[] = [
  {
    digit: "1",
    title: "お問い合わせ",
    body: "本ページのフォームより、貴社の課題・ターゲット像をお知らせください。",
  },
  {
    digit: "2",
    title: "ヒアリング・ご提案",
    body: "商材内容・ターゲット業界/役職・除外条件等を確認し、商談単価を含めたお見積もりをご提示。",
  },
  {
    digit: "3",
    title: "紹介開始・商談セッティング",
    body: "サポーターのネットワークから適合する決裁者を抽出。事前面談を経て、貴社との商談をセッティングします。",
  },
  {
    digit: "4",
    title: "商談実施 → 成果報酬",
    body: "商談実施で成果報酬が発生。成約報酬は任意設定で別途設計いただけます。",
  },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "本当に初期費用・月額費用は 0 円ですか?",
    a: "はい、固定費は一切いただきません。商談が実施された分に対する成果報酬のみのシンプルな課金です。",
  },
  {
    q: "商談単価はいくらですか?",
    a: "業界・ターゲット企業の規模・役職レイヤーによって変動します。お問い合わせ時に貴社の要件を伺ったうえで個別にお見積もりいたします。",
  },
  {
    q: "どんな業種・規模の企業を紹介してもらえますか?",
    a: "大手・上場企業から地方の有力企業まで、サポーター個々の人脈に応じた幅広いご紹介が可能です。特定業界・職種に絞った開拓もご相談いただけます。",
  },
  {
    q: "競合する企業の紹介は避けられますか?",
    a: "はい。事前に競合企業・取引中の企業など除外条件を共有いただき、運用に反映します。",
  },
  {
    q: "商談の質はどのように担保していますか?",
    a: "サポーターが事前面談で商材・課題感をすり合わせたうえで紹介するため、いきなりのコールドアプローチではなく文脈を共有した状態で商談が始まります。",
  },
  {
    q: "契約期間の縛りはありますか?",
    a: "ありません。完全成果報酬のため、活用頻度や時期も貴社のペースで調整可能です。",
  },
];

export default function ReferBondPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const service = services.find((s) => s.slug === SERVICE_SLUG);
  if (!service) notFound();

  const contactHref = localePath("/contact", locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "サービス紹介", url: localePath("/services", locale) },
          {
            name: service.title,
            url: localePath(`/services/${SERVICE_SLUG}`, locale),
          },
        ])}
      />

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-emerald-500 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-20 h-[520px] w-[520px] rounded-full bg-emerald-300/45 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-[440px] w-[440px] rounded-full bg-emerald-700/40 blur-3xl"
        />

        <Container className="relative py-20 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left: copy + CTA */}
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2.5 border-2 border-white/50 bg-white/10 px-5 py-2 text-sm md:text-base font-extrabold tracking-[0.18em] uppercase text-white backdrop-blur-sm">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-yellow-300" />
                リファボンド
              </p>

              <h1 className="mt-6 font-display font-black leading-[1.05] tracking-tight text-white text-[clamp(2.5rem,7vw,5rem)]">
                <span className="relative inline-block">
                  人脈
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-2 bg-yellow-300/90"
                  />
                </span>
                を活用して
                <br />
                決裁者を紹介
              </h1>

              <ul className="mt-8 space-y-3">
                {(
                  [
                    { pre: "", underline: "大手/上場企業", post: "の決裁者紹介にも対応" },
                    { pre: "完全成果報酬でローリスク!", underline: "", post: "" },
                    {
                      pre: "ベンチャー企業、地方企業、海外企業など",
                      underline: "幅広いニーズ",
                      post: "に対応",
                    },
                  ] as const
                ).map((item) => (
                  <li
                    key={`${item.pre}-${item.underline}`}
                    className="flex items-center gap-3 text-base md:text-xl font-bold text-white"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <circle cx="11" cy="11" r="10" fill="white" />
                      <path
                        d="M6.6 11.4l3 3 5.8-6.4"
                        stroke="#10B981"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>
                      {item.pre}
                      {item.underline ? (
                        <span className="relative inline-block">
                          {item.underline}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-0.5 h-1.5 bg-yellow-300/90"
                          />
                        </span>
                      ) : null}
                      {item.post}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA frame */}
              <div className="mt-10 max-w-xl">
                <div className="flex items-center justify-center gap-3">
                  <span aria-hidden="true" className="h-px w-10 bg-white/40" />
                  <p className="text-xs md:text-sm font-bold text-white/90">
                    簡単 1 分で入力完了
                  </p>
                  <span aria-hidden="true" className="h-px w-10 bg-white/40" />
                </div>
                <Link
                  href={contactHref}
                  className="group mt-4 flex items-center justify-center gap-4 md:gap-6 bg-ink px-6 py-5 md:px-10 md:py-6 text-white transition hover:bg-black shadow-[0_24px_50px_-12px_rgba(0,0,0,0.45)]"
                >
                  <span className="text-base md:text-xl font-bold tracking-wide">
                    資料請求・お問合せ
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-1 text-xl md:text-2xl transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: hero visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden border-2 border-white/30 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
                <Image
                  src="https://i.imgur.com/QMdMoAG.jpeg"
                  alt="挑戦する企業の現場で活躍するビジネスパーソン"
                  fill
                  priority
                  sizes="(min-width: 1024px) 500px, 95vw"
                  className="object-cover object-center motion-safe:animate-hero-pan-fast"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-emerald-700/40 via-transparent to-transparent"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Companies (static, balanced row) ───── */}
      <section className="border-b border-ink-line bg-white py-10 md:py-12">
        <Container>
          <p className="text-center text-xs font-extrabold uppercase tracking-[0.22em] text-ink-muted">
            Companies
          </p>

          <ul
            className="mt-6 flex flex-wrap items-center justify-center gap-6 md:gap-10"
            aria-label="ご利用企業ロゴ一覧"
          >
            {logos.map((src, i) => (
              <li
                key={i}
                className="flex h-16 w-40 shrink-0 items-center justify-center border border-ink/15 bg-white px-5 py-3 md:h-20 md:w-48"
              >
                <Image
                  src={src}
                  alt=""
                  width={180}
                  height={60}
                  className="max-h-full w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Challenges ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <h2 className="text-display-3 text-ink font-black leading-tight">
              <span className="block text-xl md:text-3xl font-bold text-ink leading-snug">
                <span className="underline decoration-emerald-700 decoration-[4px] underline-offset-[6px]">
                  新規開拓
                </span>
                において
              </span>
              <span className="mt-3 block">
                こんな営業課題はありませんか?
              </span>
            </h2>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3 md:gap-6">
            {challenges.map((c, i) => (
              <li key={c.titleTop}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-ink-line bg-white p-6 md:p-7">
                    {/* Themed business icon */}
                    <div
                      aria-hidden="true"
                      className="grid aspect-[5/4] w-full place-items-center rounded-xl bg-emerald-50 text-emerald-500"
                    >
                      <ChallengeIcon index={i} />
                    </div>
                    <p className="mt-6 text-center text-lg md:text-xl font-black text-ink leading-snug">
                      {c.titleTop}
                      <br />
                      {c.titleBottom}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Solution bridge: Refer Bond が解決します ───── */}
      <section className="relative bg-emerald-500 py-20 md:py-24 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Down arrow bridging from the Challenges section above */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_10px_24px_-6px_rgba(0,0,0,0.25)] md:h-20 md:w-20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 md:h-10 md:w-10 text-emerald-500"
            >
              <path
                d="M12 4v14M5 13l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-3 border-2 border-white/50 bg-white/10 px-5 py-2.5 md:px-7 md:py-3 text-base md:text-xl font-extrabold tracking-wide text-white backdrop-blur-sm">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-yellow-300" />
              リファボンドが解決します
            </p>
            <h2 className="mt-6 font-display font-black leading-[1.25] tracking-tight text-white text-[clamp(1.75rem,4.5vw,3rem)]">
              リファボンドは
              <br className="md:hidden" />
              ダイレクトに
              <br />
              <span className="relative inline-block">
                決裁者
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-2 bg-yellow-300/90"
                />
              </span>
              を紹介!
            </h2>
          </div>

          {/* CTA box */}
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="border-2 border-white/40 bg-white/10 backdrop-blur-sm p-6 md:p-8 text-center">
              <p className="text-sm md:text-base font-bold text-white/90">
                サービス内容・料金体系・事例をまとめた資料を無料配布中
              </p>
              <Link
                href={contactHref}
                className="group mt-5 flex items-center justify-center gap-3 bg-ink px-6 py-4 md:px-10 md:py-5 text-white transition hover:bg-black shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]"
              >
                <span className="text-base md:text-xl font-bold tracking-wide">
                  資料請求はこちら
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl md:text-2xl transition group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <p className="mt-3 text-xs text-white/75 font-medium">
                簡単 1 分で入力完了
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── What is Refer Bond ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-display-3 text-ink font-black leading-tight">
              リファボンドとは?
            </h2>
            <p className="mt-8 text-base md:text-lg leading-[1.95] text-ink font-medium">
              リファボンドは、各業界の
              <span className="font-black">経営層・幹部経験者・現役経営者</span>
              の
              <span className="font-black text-emerald-500">人脈を活用して決裁者を紹介</span>
              するサービスです。テレアポ・広告・展示会などでは到達できない
              <span className="font-bold">決裁者との商談を実現</span>
              します。
            </p>
          </div>

          {/* Service explanation image */}
          <div className="mx-auto mt-12 max-w-4xl">
            <Image
              src="https://i.imgur.com/J89f30K.png"
              alt="リファボンドのサービス説明"
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
              className="h-auto w-full rounded-2xl"
              style={{ height: "auto" }}
            />
          </div>

          {/* 3-step concept cards */}
          <ol className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                num: "01",
                title: "経営者ネットワーク",
                body: "各業界の経営層・幹部経験者・現役経営者がサポーターとして登録。地方・特定業界の有力人脈までを含む独自のネットワーク。",
              },
              {
                num: "02",
                title: "人脈による紹介",
                body: "テレアポ・広告では届かない大手・上場企業の決裁者へ、サポーター自身の人脈を介した「紹介」で直接接点を創出。",
              },
              {
                num: "03",
                title: "文脈ある商談",
                body: "事前面談を経た紹介のため、文脈を共有した状態で商談がスタート。コールドアプローチでは届かない深度から関係構築できます。",
              },
            ].map((s, i) => (
              <li key={s.num}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="relative h-full border-2 border-ink bg-white p-7 md:p-8">
                    <p className="font-display text-4xl md:text-5xl font-black leading-none text-emerald-500">
                      {s.num}
                    </p>
                    <h3 className="mt-5 text-lg md:text-xl font-black text-ink leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <Link href={contactHref} className="link-arrow">
              サービス資料・お見積もりはこちら
            </Link>
          </div>
        </Container>
      </section>

      {/* ───── Reasons / 選ばれる理由 ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <h2 className="text-display-3 text-ink font-black leading-tight">
              リファボンドの特徴
            </h2>
          </div>

          <ul className="mt-16 space-y-6 md:space-y-8">
            {reasons.map((r, i) => {
              const reverse = i % 2 === 1;
              return (
                <li key={r.number}>
                  <Reveal delay={i * 80}>
                    <div className="rounded-2xl border border-ink-line bg-white p-6 md:p-8">
                      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
                        <div className={reverse ? "md:order-2" : ""}>
                          <p className="font-display text-3xl md:text-4xl font-black leading-none text-emerald-500">
                            {r.number}
                          </p>
                          <h3 className="mt-4 text-xl md:text-2xl font-black text-ink leading-snug">
                            {r.title}
                          </h3>
                          <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                            {r.body}
                          </p>
                        </div>
                        {/* Visual: image if provided, otherwise placeholder */}
                        {r.image ? (
                          <div className={`mx-auto w-full max-w-sm ${reverse ? "md:order-1" : ""}`}>
                            <Image
                              src={r.image}
                              alt={r.title}
                              width={1200}
                              height={1200}
                              sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 90vw"
                              className="h-auto w-full rounded-xl"
                              style={{ height: "auto" }}
                            />
                          </div>
                        ) : (
                          <div
                            aria-hidden="true"
                            className={`mx-auto aspect-square w-full max-w-sm rounded-xl bg-cream ${reverse ? "md:order-1" : ""}`}
                          />
                        )}
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ───── Flow ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-500">
              Flow
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              ご利用の流れ
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              お問い合わせから商談開始まで、最短で着手できます。
            </p>
          </div>

          <ol className="mt-14 grid gap-6 lg:grid-cols-4 lg:gap-3">
            {flowSteps.map((s, i) => (
              <li
                key={s.digit}
                className="relative flex h-full flex-col border-2 border-ink bg-white p-6 md:p-7"
              >
                <p className="font-display leading-none text-emerald-500">
                  <span className="text-sm font-extrabold tracking-[0.18em] uppercase">
                    STEP
                  </span>
                  <span className="ml-2 text-3xl md:text-4xl font-black align-baseline">
                    {s.digit}
                  </span>
                </p>
                <h3 className="mt-5 text-lg md:text-xl font-black text-ink leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft font-medium">
                  {s.body}
                </p>

                {i < flowSteps.length - 1 ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="hidden lg:grid place-items-center absolute -right-[14px] top-1/2 -translate-y-1/2 z-10 h-9 w-9 bg-white"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M3 9h12M10 4l5 5-5 5"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex lg:hidden justify-center mt-4"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 3v14M5 12l5 5 5-5"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-500">
              FAQ
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              よくあるご質問
            </h2>
          </div>

          <ul className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <li key={f.q} className="border border-ink-line bg-white">
                <details className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                    <span className="flex gap-3">
                      <span className="font-display text-lg font-black text-emerald-500">
                        Q.
                      </span>
                      <span className="text-base md:text-lg font-bold text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-emerald-500 group-open:text-emerald-500">
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
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="relative overflow-hidden bg-ink px-8 py-16 md:px-16 md:py-20 text-white">
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 bg-emerald-500/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 bg-emerald-500/20 blur-3xl"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.15] tracking-tight">
                  人脈で、
                  <span className="text-emerald-500">決裁者に届く。</span>
                </h2>
                <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-white/85 font-medium">
                  初期費用ゼロ・月額費用ゼロ・完全成果報酬。アウトバウンドでは届かない層への商談機会づくりを、まずはお気軽にご相談ください。
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3 lg:items-end">
                <Button
                  href={contactHref}
                  size="lg"
                  className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_18px_40px_-12px_rgba(16,185,129,0.7)] !h-14 md:w-72"
                >
                  無料相談 / 資料請求
                </Button>
                <Button
                  href={localePath("/services", locale)}
                  size="lg"
                  variant="ghost"
                  className="!text-white border-2 border-white/40 hover:!bg-white/10 md:w-72"
                >
                  サービス一覧に戻る
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
