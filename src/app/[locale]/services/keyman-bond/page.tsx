import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";

const SERVICE_SLUG = "keyman-bond";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title:
    "キーマンボンド｜プロ人材マッチングサービス｜経営課題をその道のプロと解決",
  description:
    "キーマンボンドは、経営層・CxO・エキスパートクラスのプロ人材を、課題に応じてアドバイザー/顧問として提案するプロ人材マッチングサービス。新規事業・マーケ・DX・人事・財務・海外展開まで、実働型で経営課題の解決に伴走します。",
};

type Solution = { title: string; body: string };

const solutions: Solution[] = [
  { title: "新規事業開発", body: "立ち上げから事業化まで、実績を持つ専門家が実働型で支援します。" },
  { title: "マーケティング", body: "戦略策定からブランディング・PR・実行まで、専門家が伴走します。" },
  { title: "人事(採用・育成)", body: "人事制度設計・採用戦略・組織開発など豊富な経験を持つプロが対応。" },
  { title: "DX・システム", body: "要件定義・システム構築・PM・運用まで、課題解決を支援します。" },
  { title: "経営全般・事業承継", body: "経営支援の専門家がパートナーとなり、承継・組織づくりを支援。" },
  { title: "営業", body: "営業戦略の立案から人材育成、販路開拓まで成果に伴走します。" },
  { title: "財務・ファイナンス", body: "資金調達・管理会計・経営管理など、財務領域のプロが支援します。" },
  { title: "海外展開", body: "海外販路開拓・拠点立ち上げなど、グローバルの経営課題に対応。" },
  { title: "法務・ガバナンス", body: "機関設計・ガバナンス整備など、実績ある専門家が支援します。" },
];

type Pro = { field: string; catch: string };

const pros: Pro[] = [
  { field: "新規事業", catch: "事業構想から立ち上げ・収益化まで、0→1を伴走するプロ" },
  { field: "マーケティング", catch: "戦略設計から実行まで、成果に直結する施策を主導するプロ" },
  { field: "人事・組織", catch: "採用・制度設計・組織開発で、強い組織づくりを支えるプロ" },
  { field: "DX・IT", catch: "要件定義から運用まで、現場に入り変革を推進するプロ" },
  { field: "財務・経営管理", catch: "資金調達・管理会計で、経営の意思決定を支えるプロ" },
  { field: "営業・事業開発", catch: "戦略から販路開拓まで、売上の最大化を実現するプロ" },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "どんな領域・課題に対応できますか?",
    a: "新規事業・マーケティング・人事・DX・財務・営業・海外展開・法務など、幅広い経営領域に対応しています。まずは無料相談で貴社の課題をお聞かせください。",
  },
  {
    q: "どのような契約形態になりますか?",
    a: "アドバイザー(顧問)・業務委託・社外役員など、課題と関与度に応じて柔軟に設計します。スポットでのご相談から継続的な伴走まで対応可能です。",
  },
  {
    q: "費用感はどのくらいですか?",
    a: "起用するプロ人材の領域・関与度・期間によって変動します。ご予算に合わせた設計が可能ですので、まずは無料相談・資料請求でご確認ください。",
  },
  {
    q: "稼働開始までどのくらいかかりますか?",
    a: "ヒアリングのうえ要件に合うプロ人材をご提案し、面談を経て稼働開始となります。課題の内容により異なりますので、個別にご案内します。",
  },
  {
    q: "コンサルティングとは何が違いますか?",
    a: "助言にとどまらず、現場に入り込んで実行まで担う「実働型」の支援が特長です。ノウハウが組織に残る形で課題解決を進めます。",
  },
  {
    q: "プロ人材として登録したいのですが?",
    a: "経験・専門性を活かしてご活躍いただけるプロ人材を募集しています。お問い合わせよりご連絡ください。",
  },
];

export default function KeymanBondPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const service = services.find((s) => s.slug === SERVICE_SLUG);
  if (!service) notFound();

  const contactHref = localePath("/contact", locale);
  const blogHref = localePath("/blog", locale);

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
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-brand-50">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-[-10%] h-[460px] w-[460px] rounded-full bg-brand-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-brand-100/60 blur-3xl"
        />

        <Container className="relative py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs md:text-sm font-extrabold tracking-wide text-brand-600 shadow-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              キーマンボンド｜プロ人材マッチングサービス
            </p>

            <h1 className="mt-6 font-display font-black leading-[1.18] tracking-tight text-ink text-[clamp(2rem,4.5vw,3.5rem)]">
              経営課題を、
              <br />
              その道の
              <span className="relative inline-block">
                プロ
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-1.5 bg-amber-400 md:h-2"
                />
              </span>
              と解決する。
            </h1>
            <p className="mt-6 text-base md:text-xl font-bold text-ink-soft leading-snug">
              経営層・CxO・エキスパートクラスの実力者が、実働型で伴走
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                href={contactHref}
                size="lg"
                className="!h-[68px] w-full px-12 text-xl font-black !bg-[#FF8A1E] hover:!bg-brand-500 shadow-[0_22px_50px_-12px_rgba(255,138,30,0.85)] hover:-translate-y-1 md:!h-[80px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[240px]"
              >
                資料請求
              </Button>
              <Button
                href={contactHref}
                size="lg"
                variant="secondary"
                className="!h-[68px] w-full px-12 text-xl font-black hover:-translate-y-1 md:!h-[80px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[240px]"
              >
                無料相談
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── About (企業の皆さまへ) ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              For Corporates
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              キーマンボンドとは?
            </h2>
            <p className="mt-8 text-base md:text-lg leading-[1.95] text-ink font-medium">
              キーマンボンドは、経営課題の解決に取り組む企業向けに、事業会社やアカデミアで経験を積んだ
              <span className="font-black text-brand-500">
                上級役職者・専門家
              </span>
              を「アドバイザー」「顧問」「社外役員」として提案する経営支援サービスです。
            </p>
            <p className="mt-5 text-base md:text-lg leading-[1.95] text-ink-soft font-medium">
              助言だけでなく現場に入り込む
              <span className="font-bold text-ink">「実働型」の支援</span>
              で、新規事業・マーケ・DX・人事・財務・海外展開まで、事業成長のあらゆるフェーズで生じる課題に伴走します。
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { t: "実働型で伴走", b: "助言だけで終わらせず、現場に入り実行まで担います。" },
              { t: "多領域の実力者", b: "経営層・CxO・各分野のエキスパートが多数。" },
              { t: "フェーズに最適配置", b: "事業フェーズと課題に応じて最適な人材を提案。" },
            ].map((c, i) => (
              <li key={c.t}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-ink-line bg-cream/50 p-7 text-center">
                    <h3 className="text-lg font-black text-ink">{c.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft font-medium">
                      {c.b}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Solution (経営課題の解決) ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Solution
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              解決できる経営課題
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              幅広い領域のプロ人材の知見・人脈を組み合わせ、貴社の事業成長を支援します。
            </p>
          </div>

          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {solutions.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <div className="h-full rounded-2xl border border-ink-line bg-white p-6 md:p-7">
                    <p className="flex items-center gap-2.5 text-base md:text-lg font-black text-ink">
                      <span
                        aria-hidden="true"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500 text-xs font-black text-white"
                      >
                        ✓
                      </span>
                      {s.title}
                    </p>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Advisers (登録プロ人材) ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Professionals
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              在籍するプロ人材
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              高度な経営ノウハウ・知見・人脈を持つ各業界のプロフェッショナルが在籍しています。
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pros.map((p, i) => (
              <li key={p.field}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-ink-line bg-white p-6">
                    {/* Photo placeholder */}
                    <div
                      aria-hidden="true"
                      className="aspect-[4/3] w-full rounded-xl bg-cream"
                    />
                    <p className="mt-5 inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                      {p.field}
                    </p>
                    <p className="mt-3 text-base font-bold leading-relaxed text-ink">
                      {p.catch}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center text-xs text-ink-muted">
            ※ プロフィールは一例です。貴社の課題に応じて最適な人材をご提案します。
          </p>
        </Container>
      </section>

      {/* ───── For Talent (個人の皆さまへ) ───── */}
      <section className="bg-cream py-20 md:py-24">
        <Container>
          <div className="rounded-2xl border-2 border-ink bg-white p-8 md:p-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                  For Talent
                </p>
                <h2 className="mt-3 text-xl md:text-2xl font-black text-ink leading-snug">
                  プロ人材として活躍したい方へ
                </h2>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                  これまで培った経験・専門性を、企業の経営課題解決に活かしませんか。活躍の場をご用意しています。
                </p>
              </div>
              <Button href={contactHref} size="lg" variant="secondary" className="shrink-0">
                登録のお問い合わせ
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Column (ビジネスコラム) ───── */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                Column
              </p>
              <h2 className="mt-3 text-xl md:text-2xl font-black text-ink leading-snug">
                経営課題に役立つ情報をお届け
              </h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                プロ人材の活用や経営課題の解決に役立つコラムを発信しています。
              </p>
            </div>
            <Button href={blogHref} size="lg" className="shrink-0">
              メディアを見る
            </Button>
          </div>
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
              <li key={f.q} className="rounded-2xl border border-ink-line bg-white">
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
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-brand-500 group-open:text-brand-500">
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
          <div className="relative overflow-hidden rounded-2xl bg-brand-500 px-8 py-14 md:px-16 md:py-16 text-white">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-300/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-700/40 blur-3xl"
            />

            <div className="relative text-center">
              <p className="text-2xl md:text-3xl font-black text-white">
                資料請求・無料相談はこちら
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href={contactHref}
                  size="lg"
                  className="!h-[72px] w-full px-12 text-xl font-black !bg-white !text-brand-600 hover:!bg-cream hover:-translate-y-1 shadow-[0_22px_50px_-12px_rgba(0,0,0,0.4)] md:!h-[84px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[260px]"
                >
                  資料請求
                </Button>
                <Button
                  href={contactHref}
                  size="lg"
                  variant="ghost"
                  className="!h-[72px] w-full px-12 text-xl font-black border-2 border-white !text-white hover:!bg-white/15 hover:-translate-y-1 md:!h-[84px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[260px]"
                >
                  無料相談
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
