import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "紹介営業パートナー登録",
  description:
    "セールスボンドの紹介営業パートナー(サポーター)制度。お持ちの人脈を活かして、企業の決裁者開拓にご協力いただける方を募集しています。登録費用無料・完全成果報酬。",
};

type Benefit = {
  number: string;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    number: "01",
    title: "登録費用は完全無料",
    description:
      "登録に費用は一切かかりません。ノルマも無く、ご自身のペースで活動いただけます。",
  },
  {
    number: "02",
    title: "個人情報は厳重に保護",
    description:
      "お名前は紹介を承諾したクライアント企業のみに開示。連絡先は当社で管理し、紹介先には非公開です。",
  },
  {
    number: "03",
    title: "紹介+成約のダブル報酬",
    description:
      "商談実施で発生する紹介協力金に加え、紹介先との成約時には成約協力金を追加でお支払いします。",
  },
];

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "STEP 1",
    title: "パートナー登録",
    description:
      "本ページの登録フォームから無料で登録。当社で内容を確認後、ご連絡いたします。",
  },
  {
    number: "STEP 2",
    title: "紹介依頼を受け取る",
    description:
      "当社クライアント企業からの開拓ニーズに合わせ、適合する依頼をお送りします。",
  },
  {
    number: "STEP 3",
    title: "紹介先とのマッチング",
    description:
      "お持ちの人脈の中から紹介可能な企業をご提案。当社が商談セッティングまでサポートします。",
  },
  {
    number: "STEP 4",
    title: "報酬の受け取り",
    description:
      "商談実施で紹介協力金、成約時には成約協力金が発生。月次でお支払いします。",
  },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "登録に費用はかかりますか?",
    a: "いいえ、登録および活動に費用は一切かかりません。完全無料でご利用いただけます。",
  },
  {
    q: "どんな人が向いていますか?",
    a: "経営者・役員クラスとのネットワークをお持ちの方、副業・複業として収入源を増やしたい方、人と人をつなぐ仕事に関心のある方を歓迎します。",
  },
  {
    q: "個人情報は紹介先企業に公開されますか?",
    a: "ご登録いただいたお名前は、紹介を承諾されたクライアント企業のみに開示します。連絡先(メール・電話)は当社で管理し、紹介先には非公開です。",
  },
  {
    q: "ノルマや活動義務はありますか?",
    a: "ありません。ご自身のペースで、ご紹介可能なタイミングでご協力いただけます。",
  },
  {
    q: "紹介できる人数や企業に上限はありますか?",
    a: "上限はありません。ご紹介可能な人脈・企業の数だけ、報酬獲得のチャンスが広がります。",
  },
  {
    q: "報酬はいくらくらいですか?",
    a: "紹介協力金は紹介先企業の従業員数・役職により変動します。成約時には別途、成約協力金をお支払いします。詳細はご登録後にご案内します。",
  },
];

export default function PartnerContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const registerHref = localePath("/contact/partner/register", locale);

  return (
    <>
      <PageHero
        eyebrow="Partner Program"
        title="紹介営業パートナー登録"
        description="あなたの人脈で、企業の事業成長を加速する。お持ちのネットワークを活かして、クライアント企業の決裁者開拓にご協力いただける方を募集しています。"
      />

      {/* Overview */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="section-label">About</p>
              <h2 className="mt-3 text-display-3 text-ink font-black">
                紹介営業パートナーとは
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-base md:text-lg leading-[1.95] text-ink font-medium">
              <p>
                セールスボンドの紹介営業パートナー制度は、お持ちの人脈を活かしてクライアント企業の事業開拓にご協力いただく仕組みです。
              </p>
              <p>
                <span className="marker font-bold">登録は無料・完全成果報酬</span>
                。商談の実施・成約に応じて協力金をお支払いします。ノルマや義務はなく、ご自身のペースで活動いただけます。
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="section-label">Benefits</p>
            <h2 className="mt-3 text-display-3 text-ink font-black">
              パートナー登録の3つのメリット
            </h2>
          </div>

          <ul className="mt-16 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <li key={b.number}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="h-full rounded-xl3 border-2 border-ink-line bg-white p-8 md:p-10">
                    <span className="text-3xl font-black text-brand-500 leading-none">
                      {b.number}
                    </span>
                    <div
                      className="mt-6 h-1 w-12 rounded-full bg-brand-500"
                      aria-hidden="true"
                    />
                    <h3 className="mt-6 text-xl md:text-2xl font-black text-ink leading-tight">
                      {b.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-ink font-medium">
                      {b.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Rewards */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="section-label">Rewards</p>
              <h2 className="mt-3 text-display-3 text-ink font-black">
                報酬の仕組み
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-soft font-medium">
                紹介の段階に応じて2種類の協力金をお支払いします。
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-xl3 border-2 border-ink-line bg-white p-8 md:p-10">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-500">
                  紹介協力金
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl font-black text-ink leading-tight">
                  商談実施で発生
                </h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-ink font-medium">
                  ご紹介いただいた企業との商談が成立した時点で発生する基本報酬です。紹介先企業の規模・役職により金額が変動します。
                </p>
              </div>

              <div className="rounded-xl3 border-2 border-brand-500 bg-brand-50/50 p-8 md:p-10">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-600">
                  成約協力金
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl font-black text-ink leading-tight">
                  成約時に追加で発生
                </h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-ink font-medium">
                  紹介先企業と当社クライアントが成約に至った場合、成果に応じた追加報酬をお支払いします。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="section-label">Flow</p>
            <h2 className="mt-3 text-display-3 text-ink font-black">
              ご登録から報酬受け取りまで
            </h2>
          </div>

          <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.number}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-xl3 border-2 border-ink-line bg-cream/50 p-8">
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">
                      {s.number}
                    </p>
                    <h3 className="mt-4 text-lg font-black text-ink leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink font-medium">
                      {s.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="section-label">FAQ</p>
              <h2 className="mt-3 text-display-3 text-ink font-black">
                よくあるご質問
              </h2>
            </div>

            <div className="lg:col-span-8">
              <ul className="space-y-4">
                {faqs.map((f) => (
                  <li
                    key={f.q}
                    className="rounded-xl2 border border-ink-line bg-white"
                  >
                    <details className="group">
                      <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                        <span className="flex gap-4">
                          <span
                            aria-hidden="true"
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-black text-white"
                          >
                            Q
                          </span>
                          <span className="text-base md:text-lg font-bold text-ink leading-snug">
                            {f.q}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-brand-500 group-open:text-brand-500"
                        >
                          +
                        </span>
                      </summary>
                      <div className="border-t border-ink-line p-6 pt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
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

      {/* CTA */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="relative overflow-hidden rounded-xl4 bg-brand-500 px-8 py-16 md:px-16 md:py-20 text-center">
            <div
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10"
              aria-hidden="true"
            />

            <p className="relative text-xs md:text-sm font-extrabold uppercase tracking-[0.18em] text-white">
              Free registration
            </p>
            <h2 className="relative mt-4 text-display-2 text-white leading-tight">
              パートナー登録は完全無料
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl text-white/90 leading-relaxed font-medium">
              ご登録後、当社担当者よりご連絡いたします。お気軽にお申し込みください。
            </p>

            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Button
                href={registerHref}
                size="lg"
                className="bg-white !text-brand-600 hover:!bg-brand-50"
              >
                無料登録はこちら
              </Button>
              <Button
                href={localePath("/contact", locale)}
                size="lg"
                variant="ghost"
                className="!text-white border-2 border-white/60 hover:!bg-white/15"
              >
                まずは問い合わせる
              </Button>
            </div>

            <p className="relative mt-6 text-xs text-white/80">
              ※ 18歳未満および高校生はご登録いただけません。
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-ink-muted">
            すでに登録済みの方は{" "}
            <Link
              href={localePath("/contact", locale)}
              className="font-bold underline underline-offset-4 text-ink hover:text-brand-600"
            >
              お問い合わせ
            </Link>
            よりご連絡ください。
          </p>
        </Container>
      </section>
    </>
  );
}
