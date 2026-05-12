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
   1. 案件の内容 3 パターン
   ──────────────────────────────────────────────────────────── */

type Engagement = {
  number: string;
  title: string;
  body: string;
  image?: string;
};

const engagements: Engagement[] = [
  {
    number: "01",
    title: "人脈紹介(アポイント設定)",
    body: "お持ちの人脈を活かして、クライアント企業の決裁者開拓に貢献する成果報酬型の働き方。",
    image: "https://i.imgur.com/7IBhu7P.jpeg",
  },
  {
    number: "02",
    title: "経営課題の解決",
    body: "営業・マーケ・DX・人事・財務など、特定領域の深い専門性で企業の課題解決を伴走する働き方。",
    image: "https://i.imgur.com/MxWhvDK.jpeg",
  },
  {
    number: "03",
    title: "顧問/社外取締役",
    body: "経営層・幹部としての経験を、クライアント企業の経営判断・組織運営に直接活かす働き方。",
    image: "https://i.imgur.com/3KusyJR.jpeg",
  },
];

/* ────────────────────────────────────────────────────────────
   1.5 活躍する方々(6 タイプ)
   ──────────────────────────────────────────────────────────── */

type Member = {
  number: string;
  title: string;
};

const members: Member[] = [
  { number: "01", title: "大手企業の役員・要職経験者(元を含む)" },
  { number: "02", title: "圧倒的な人脈をお持ちの方" },
  { number: "03", title: "多くの取引実績を持つフリーランス" },
  { number: "04", title: "現役の経営者・代表取締役" },
  { number: "05", title: "現役のビジネスパーソン" },
  { number: "06", title: "第一線で挑み続けるシニア層(50代以降)" },
];

/* ────────────────────────────────────────────────────────────
   2. 登録〜参画の流れ
   ──────────────────────────────────────────────────────────── */

type Step = {
  digit: string;
  title: string;
  titleNote?: string;
  body: string;
};

const steps: Step[] = [
  {
    digit: "1",
    title: "メール仮登録",
    body: "本ページのフォームからメールアドレスをご登録。本登録のご案内をすぐにお送りします。",
  },
  {
    digit: "2",
    title: "本登録",
    body: "届いたメールから本登録フォームへ。ご経歴・関心領域・ご紹介可能な人脈などをご記入ください。",
  },
  {
    digit: "3",
    title: "面接 / 審査",
    body: "当社担当者よりご連絡し、オンライン面談を実施。お力をお借りできる領域をすり合わせます。",
  },
  {
    digit: "4",
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
      <section className="relative overflow-hidden bg-ink">
        {/* Background image */}
        <Image
          src="https://i.imgur.com/GL0UfBm.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Layer 1 — flat dark veil (works for any image brightness) */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/65" />

        {/* Layer 2 — vertical gradient deepens the area behind the body copy */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/50"
        />

        <Container className="relative py-32 md:py-40 lg:py-48 text-center text-white">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.55)" }}
          >
            Our Belief
          </p>

          <h2
            className="mt-6 font-display text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.15] tracking-tight text-white"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.65)" }}
          >
            人生100年時代を、
            <span className="text-brand-500">生き残れ。</span>
          </h2>

          <p
            className="mt-6 text-base md:text-lg font-bold tracking-[0.1em] text-white/95"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55)" }}
          >
            30代、40代、50代、60代 ―
          </p>

          <div
            className="mx-auto mt-12 max-w-2xl space-y-6 text-base md:text-lg leading-[2] font-medium text-white"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            <p>会社の中だけで完結する時代は、もう終わりました。</p>
            <p>
              あなたが培ってきた人脈、経験、ビジネススキル。
              <br />
              それは、今この瞬間も、
              <span className="font-black text-white">
                必要としている企業があります
              </span>
              。
            </p>
            <p className="text-lg md:text-xl font-black text-white leading-[1.7]">
              セールスボンドは、
              <span className="text-brand-500">
                30代からシニアまで幅広く活躍できる場所
              </span>
              を提供します。
            </p>
          </div>
        </Container>
      </section>

      {/* ───── 1. Engagement — 案件の内容 ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Engagement
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              案件の内容
            </h2>
          </div>

          <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
            {engagements.map((e) => (
              <li key={e.number}>
                <Link
                  href="#email-capture-top"
                  className="group block h-full text-center"
                >
                  {/* Image (or cream placeholder until provided) */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream border border-ink/15">
                    {e.image ? (
                      <Image
                        src={e.image}
                        alt={e.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  {/* Number with subtle underline */}
                  <div className="mt-6">
                    <span className="font-display text-2xl md:text-3xl font-black leading-none text-brand-500 tabular-nums">
                      {e.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mx-auto mt-3 block h-px w-10 bg-ink-line"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-xl md:text-2xl font-black text-ink leading-snug tracking-tight transition-colors group-hover:text-brand-600">
                    {e.title}
                  </h3>

                  {/* Body */}
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                    {e.body}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── 1.5 Members — 様々な経歴 ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Members
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              様々な経歴の方が登録しています
            </h2>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <ul className="border-t border-ink-line md:grid md:grid-cols-2">
              {members.map((m, i) => (
                <li
                  key={m.number}
                  className={[
                    "flex items-center gap-5 border-b border-ink-line bg-white px-5 py-6 md:px-7 md:py-7",
                    // Add a vertical divider between the two columns on md+
                    i % 2 === 0 ? "md:border-r md:border-ink-line" : "",
                  ].join(" ")}
                >
                  <span className="font-display text-3xl md:text-4xl font-black leading-none text-brand-500 shrink-0 tabular-nums">
                    {m.number}
                  </span>
                  <span className="text-base md:text-lg lg:text-xl font-black text-ink leading-snug">
                    {m.title}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-center text-sm text-ink-muted">
              年齢、肩書き、働き方を問わず。培った力を持つ方が活躍しています。
            </p>
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
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Flow
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              ご登録から案件紹介までの流れ
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              4ステップ。難しい手続きはありません。
            </p>
          </div>

          <ol className="mt-14 grid gap-6 lg:grid-cols-4 lg:gap-3">
            {steps.map((s, i) => (
              <li
                key={s.digit}
                className="relative flex h-full flex-col border-2 border-ink bg-white p-6 md:p-7"
              >
                {/* STEP label */}
                <p className="font-display leading-none text-brand-500">
                  <span className="text-sm font-extrabold tracking-[0.18em] uppercase">
                    STEP
                  </span>
                  <span className="ml-2 text-3xl md:text-4xl font-black align-baseline">
                    {s.digit}
                  </span>
                </p>

                {/* Title (+ optional inline note) */}
                <h3 className="mt-5 text-lg md:text-xl font-black text-ink leading-snug">
                  {s.title}
                  {s.titleNote ? (
                    <span className="ml-2 text-sm md:text-base font-bold text-ink-soft">
                      {s.titleNote}
                    </span>
                  ) : null}
                </h3>

                {/* Body */}
                <p className="mt-3 text-sm leading-relaxed text-ink-soft font-medium">
                  {s.body}
                </p>

                {/* Connector arrow → between steps (lg+) */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden lg:grid place-items-center absolute -right-[14px] top-1/2 -translate-y-1/2 z-10 h-9 w-9 bg-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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

                {/* Connector arrow ↓ between steps (mobile) */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="flex lg:hidden justify-center mt-4"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
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
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden bg-ink px-8 py-16 md:px-16 md:py-20 text-white">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h2 className="text-display-3 font-black leading-tight">
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

