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
    title: "紹介営業として",
    body: "お持ちの人脈を活かして、クライアント企業の決裁者開拓に貢献する成果報酬型の働き方。",
    imageAlt: "紹介営業として活躍する人物",
  },
  {
    label: "Pattern B",
    title: "領域の専門家として",
    body: "営業・マーケ・DX・人事・財務など、特定領域の深い専門性で企業の課題解決を伴走する働き方。",
    imageAlt: "専門家として活躍する人物",
  },
  {
    label: "Pattern C",
    title: "顧問・社外取締役として",
    body: "経営層・幹部としての経験を、クライアント企業の経営判断・組織運営に直接活かす働き方。",
    imageAlt: "顧問として活躍する人物",
  },
];

/* ────────────────────────────────────────────────────────────
   2. 登録〜参画の流れ
   ──────────────────────────────────────────────────────────── */

type Step = { number: string; title: string; body: string };

const steps: Step[] = [
  {
    number: "01",
    title: "メール仮登録",
    body: "本ページのフォームからメールアドレスをご登録。本登録フォームをすぐにお送りします。",
  },
  {
    number: "02",
    title: "本登録",
    body: "届いたメールから本登録フォームへ。ご経歴・関心領域・ご紹介可能な人脈などをご記入ください。",
  },
  {
    number: "03",
    title: "面接 / 審査",
    body: "当社担当者よりご連絡し、オンライン面談を実施。お力をお借りできる領域・関与スタイルをすり合わせます。",
  },
  {
    number: "04",
    title: "案件のご紹介",
    body: "お持ちの強みに合った案件をご提案。ご合意のうえで参画 → 成果に応じた報酬をお支払いします。",
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
        <div className="relative h-[520px] md:h-[clamp(520px,80vh,760px)] w-full">
          <Image
            src="https://i.imgur.com/QMdMoAG.jpeg"
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
              <h1 className="max-w-3xl text-white">
                <span className="inline-block bg-brand-500 px-4 py-1.5 font-display text-[clamp(2rem,5.5vw,4rem)] font-black leading-[1.15]">
                  培った経験と人脈を
                </span>
                <br />
                <span className="mt-3 inline-block bg-brand-500 px-4 py-1.5 font-display text-[clamp(2rem,5.5vw,4rem)] font-black leading-[1.15]">
                  挑戦する企業の力に
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm md:text-base font-bold italic text-white/90 leading-relaxed">
                人脈紹介、領域の専門家、顧問として
              </p>

              <div className="mt-8 max-w-md">
                <EmailCaptureForm
                  locale={locale}
                  tone="dark"
                  heading=""
                  subhead=""
                  buttonLabel="登録"
                  compact
                />
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ───── Our Belief / セールスボンドの想い ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Our Belief
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.15] tracking-tight text-ink">
              人生100年時代を、
              <br className="md:hidden" />
              <span className="text-brand-500">生き残れ。</span>
            </h2>
            <p className="mt-6 text-base md:text-lg font-bold tracking-[0.1em] text-ink-soft">
              30代、40代、50代 ―
            </p>

            <div className="mt-14 space-y-7 text-base md:text-lg leading-[2] text-ink font-medium">
              <p>
                キャリアの「次」を、考え始めていませんか。
                <br />
                会社の中だけで完結する時代は、もう終わりました。
              </p>
              <p>
                あなたが培ってきた人脈、経験、ビジネススキル。
                <br />
                それは、今この瞬間も、
                <span className="font-black text-ink">
                  必要としている企業があります
                </span>
                。
              </p>
              <p className="text-lg md:text-xl font-black text-ink leading-[1.7]">
                セールスボンドは、
                <span className="text-brand-500">その出会いをつくる場所</span>
                です。
              </p>
              <p className="text-base md:text-lg italic text-ink-soft">
                眠らせている力を、もう一度、社会のために使いませんか。
              </p>
            </div>
          </div>
        </Container>
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

      {/* ───── Flow ───── */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Flow"
            title="ご登録から参画までの流れ"
            sub="4ステップ。難しい手続きはありません。"
          />

          <ol className="mt-14 grid gap-6 lg:grid-cols-4 lg:gap-3">
            {steps.map((s, i) => (
              <li
                key={s.number}
                className="relative flex h-full flex-col border-2 border-ink bg-white p-6 md:p-7"
              >
                {/* Step number badge */}
                <div className="inline-flex h-12 w-12 items-center justify-center bg-brand-500 font-display text-base font-black text-white">
                  {s.number}
                </div>

                <h3 className="mt-5 text-base md:text-lg font-black text-ink leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft font-medium">
                  {s.body}
                </p>

                {/* Connector arrow → between steps (lg+) */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden lg:grid place-items-center absolute -right-[14px] top-1/2 -translate-y-1/2 z-10 h-9 w-9 bg-white"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M3 9h12M10 4l5 5-5 5"
                        stroke="#F58220"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}

                {/* Connector arrow ↓ between steps (mobile only, below card) */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="flex lg:hidden justify-center mt-4"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10 3v14M5 12l5 5 5-5"
                        stroke="#F58220"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
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
