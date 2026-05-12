import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
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

type Challenge = { title: string; body: string };

const challenges: Challenge[] = [
  {
    title: "テレアポ・メール営業で決裁者まで届かない",
    body: "情報システム部・受付段階で止まり、本当に話したい役員クラスにアプローチできていない。",
  },
  {
    title: "大手・上場企業との初回接点が作れない",
    body: "問い合わせフォームや代表番号からの一斉アプローチでは、案件化に至らないまま時間とコストだけが消耗していく。",
  },
  {
    title: "地方の有力企業と接点を持つ手段がない",
    body: "東京拠点のみのリソースでは地方ネットワークが薄く、地方ローカル企業の開拓が後回しになっている。",
  },
  {
    title: "営業リストが枯渇・既存ルートが頭打ち",
    body: "ホワイトペーパー・展示会・既存代理店…これまでの開拓チャネルが頭打ちで、新規パイプラインの厚みに課題がある。",
  },
];

type Reason = { number: string; title: string; body: string };

const reasons: Reason[] = [
  {
    number: "01",
    title: "アウトバウンドでは届かない層へ",
    body: "テレアポ・メール・広告では接点を作れない大手・上場企業の決裁者/役員クラスへ、人脈を介した「紹介」という最短ルートで直接アプローチします。",
  },
  {
    number: "02",
    title: "大手・上場・地方を網羅する人脈ネットワーク",
    body: "首都圏の大手・上場企業はもちろん、各業界の経営層・現役経営者を含むサポーターネットワークから、地方の有力企業や特定業界の決裁者まで幅広く紹介を受けられます。",
  },
  {
    number: "03",
    title: "完全成果報酬・初期費用ゼロ",
    body: "初期費用・月額費用は一切かかりません。商談実施に応じた成果報酬のみのシンプルな課金設計。リスクを取らずに開拓チャネルを増やせます。",
  },
];

type FlowStep = { digit: string; title: string; body: string };

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

      <PageHero
        eyebrow="Service 01 / 大手決裁者紹介サービス"
        title="人脈で、決裁者に届く。"
        description="アウトバウンドでは届かない層へ、最短で接点を。リファボンドは、人脈紹介で大手・上場・地方企業の決裁者に直接つながれる完全成果報酬型サービスです。"
      />

      {/* ───── Hero CTA strip ───── */}
      <section className="border-b border-ink-line bg-white py-10 md:py-12">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm md:text-base text-ink-soft font-medium">
              <span className="font-black text-ink">初期費用 0 円・月額費用 0 円</span>
              。商談実施に応じた成果報酬のみで開始できます。
            </p>
            <Button
              href={contactHref}
              size="lg"
              className="shadow-[0_14px_30px_-12px_rgba(245,130,32,0.7)]"
            >
              無料で相談する
            </Button>
          </div>
        </Container>
      </section>

      {/* ───── Challenges ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Challenges
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              こんな経営課題はありませんか?
            </h2>
          </div>

          <ul className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
            {challenges.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={(i % 2) * 80}>
                  <div className="h-full border border-ink-line bg-white p-7 md:p-8">
                    <p className="flex items-start gap-3 text-base md:text-lg font-black text-ink leading-snug">
                      <span
                        aria-hidden="true"
                        className="mt-1 grid h-6 w-6 shrink-0 place-items-center bg-brand-500 text-xs font-black text-white"
                      >
                        !
                      </span>
                      {c.title}
                    </p>
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── What is Refer Bond ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            {/* Visual placeholder (left) */}
            <div className="md:col-span-5">
              <div className="aspect-[4/5] border border-ink/15 bg-cream" />
            </div>

            {/* Description (right) */}
            <div className="md:col-span-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                About Refer Bond
              </p>
              <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
                人脈という資産を、
                <br />
                <span className="text-brand-500">商談機会</span>
                に変える。
              </h2>
              <p className="mt-6 text-base md:text-lg leading-[1.95] text-ink font-medium">
                リファボンドは、各業界の
                <span className="font-black">経営層・幹部経験者・現役経営者</span>
                がサポーターとして登録する紹介プラットフォームです。
              </p>
              <p className="mt-5 text-base md:text-lg leading-[1.95] text-ink-soft font-medium">
                テレアポ・広告では到達できない大手・上場・地方の決裁者へ、
                <span className="font-bold text-ink">
                  人脈を介した「紹介」という最短ルート
                </span>
                で接点を生み出します。事前面談を経た紹介のため、
                <span className="font-bold text-ink">
                  文脈を共有した状態で商談が開始
                </span>
                し、いきなりのコールドアプローチでは届かない深度から関係構築できます。
              </p>
              <div className="mt-8">
                <Link href={contactHref} className="link-arrow">
                  サービス資料・お見積もりはこちら
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Reasons / 選ばれる理由 ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Why Refer Bond
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              選ばれる3つの理由
            </h2>
          </div>

          <ul className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
            {reasons.map((r, i) => (
              <li key={r.number}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full border-2 border-ink bg-white p-8 md:p-10">
                    <p className="font-display text-4xl md:text-5xl font-black leading-none text-brand-500">
                      {r.number}
                    </p>
                    <h3 className="mt-6 text-lg md:text-xl font-black text-ink leading-snug">
                      {r.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                      {r.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Coverage / 対応領域 ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                Coverage
              </p>
              <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
                対応領域
              </h2>
            </div>
            <p className="md:col-span-7 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              貴社のターゲット業界・規模に合わせて柔軟に対応します。下記は代表例で、特定業界・職種に絞った開拓もご相談いただけます。
            </p>
          </div>

          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              "大手企業・上場企業の新規開拓",
              "地方の有力企業・ローカル開拓",
              "特定業界・職種の決裁者開拓",
              "経営層・役員クラスへの直接アプローチ",
              "新規事業のマーケットインタビュー",
              "事業提携・アライアンス開拓",
            ].map((label, i) => (
              <li
                key={label}
                className="flex items-start gap-3 border border-ink-line bg-white p-5"
              >
                <span className="font-display text-xl font-black text-brand-500 leading-none shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base font-bold leading-snug text-ink">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Pricing ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Pricing
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              料金体系
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              初期費用・月額費用ゼロ。商談実施に応じた成果報酬のみのシンプルな課金です。
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl border border-ink-line bg-white">
            <ul>
              <li className="grid grid-cols-1 items-center gap-4 border-b border-ink-line p-6 md:grid-cols-12 md:gap-8 md:p-8">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink-muted md:col-span-4">
                  初期費用
                </p>
                <p className="font-display text-3xl md:text-4xl font-black text-ink md:col-span-4">
                  0
                  <span className="ml-1 text-base md:text-lg text-brand-500 font-black">
                    円
                  </span>
                </p>
                <p className="text-sm text-ink-soft md:col-span-4">
                  導入費は一切いただきません。
                </p>
              </li>
              <li className="grid grid-cols-1 items-center gap-4 border-b border-ink-line p-6 md:grid-cols-12 md:gap-8 md:p-8">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink-muted md:col-span-4">
                  月額費用
                </p>
                <p className="font-display text-3xl md:text-4xl font-black text-ink md:col-span-4">
                  0
                  <span className="ml-1 text-base md:text-lg text-brand-500 font-black">
                    円
                  </span>
                </p>
                <p className="text-sm text-ink-soft md:col-span-4">
                  使わなければ費用は発生しません。
                </p>
              </li>
              <li className="grid grid-cols-1 items-center gap-4 p-6 md:grid-cols-12 md:gap-8 md:p-8 bg-brand-50/40">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-600 md:col-span-4">
                  商談単価
                </p>
                <p className="text-2xl md:text-3xl font-black text-brand-600 md:col-span-4">
                  完全成果報酬
                </p>
                <p className="text-sm text-ink-soft md:col-span-4">
                  業界・規模・役職に応じた個別お見積もり。
                </p>
              </li>
            </ul>
          </div>

          <p className="mt-6 text-center text-xs text-ink-muted">
            ※ 成約報酬は任意で別途設計いただけます。詳細はお問い合わせ時にご案内します。
          </p>
        </Container>
      </section>

      {/* ───── Flow ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
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
                <p className="font-display leading-none text-brand-500">
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
                          stroke="#F58220"
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
                          stroke="#F58220"
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
      <section className="py-24 md:py-32">
        <Container>
          <div className="relative overflow-hidden bg-ink px-8 py-16 md:px-16 md:py-20 text-white">
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 bg-brand-500/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 bg-brand-500/20 blur-3xl"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.15] tracking-tight">
                  人脈で、
                  <span className="text-brand-500">決裁者に届く。</span>
                </h2>
                <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-white/85 font-medium">
                  初期費用ゼロ・月額費用ゼロ・完全成果報酬。アウトバウンドでは届かない層への商談機会づくりを、まずはお気軽にご相談ください。
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3 lg:items-end">
                <Button
                  href={contactHref}
                  size="lg"
                  className="bg-brand-500 text-white hover:bg-brand-600 shadow-[0_18px_40px_-12px_rgba(245,130,32,0.7)] !h-14 md:w-72"
                >
                  無料で相談する
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
