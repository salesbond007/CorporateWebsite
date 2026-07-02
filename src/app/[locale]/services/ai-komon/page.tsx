import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";

const SERVICE_SLUG = "ai-komon";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "AI顧問ボンド｜AI活用の相談ならAI顧問ボンド",
  description:
    "AI活用の相談ならAI顧問ボンド。大手企業技術開発部やIT企業代表などハイクラス層のAIプロフェッショナルが顧問として伴走。月額10万円〜、無料相談でロードマップをご提示します。",
};

// ─────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────

type Problem = { num: string; title: string; body: string };

const problems: Problem[] = [
  {
    num: "01",
    title: "情報はあるが、動けない",
    body: "生成AI・LLM・RAG——キーワードは日々増えるが、社内で「何を、いつ、どう始めるか」の判断が下せない。",
  },
  {
    num: "02",
    title: "導入したが、続かない",
    body: "PoCまで進んだが、誰も触らないダッシュボードが残る。使いこなす人の不在が、投資を無意味にしていく。",
  },
  {
    num: "03",
    title: "相談相手が、いない",
    body: "コンサルは高い、ベンダーは営業目線、社内には知見がない。等身大の判断を一緒にできる本物のプロがいない。",
  },
];

type Reason = { num: string; kicker: string; title: string; body: string };

const reasons: Reason[] = [
  {
    num: "01",
    kicker: "High-class Pros",
    title: "ハイクラス層のみが顧問。",
    body:
      "大手企業技術開発部やIT企業代表など、経営と現場の両方を知り抜いた100人＋のプロが在籍。肩書きだけの助言者はいません。",
  },
  {
    num: "02",
    kicker: "Roadmap-first",
    title: "先にロードマップを描く。",
    body:
      "着手前に全体像・優先順位・成果の見え方を提示。単発の助言ではなく、どこから始めどこに辿り着くかを描き切ります。",
  },
  {
    num: "03",
    kicker: "Flexible",
    title: "縛らない、深く伴走する。",
    body:
      "月額制の伴走支援。無理な長期契約は求めません。事業のフェーズや相性に応じて、続ける/変える/離れるを自由に選べます。",
  },
];

type Advisor = {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  initials: string;
};

const advisors: Advisor[] = [
  {
    name: "元大手電機メーカー・技術部長級",
    role: "Senior Advisor",
    bio: "日本を代表する電機メーカーでR&D組織を率いた経歴。製造業・重工業領域のAI活用と、大企業組織内での実装推進を熟知。",
    focus: ["製造業DX", "R&D", "AI推進"],
    initials: "S.A.",
  },
  {
    name: "コンサルティング会社・代表",
    role: "Strategy Advisor",
    bio: "経営コンサルティングファームを率いる現役代表。AIをどう戦略化するかの視点で、経営層と現場の双方に届く提案が得意。",
    focus: ["経営戦略", "AI投資", "組織変革"],
    initials: "C.E.O.",
  },
  {
    name: "SES会社・代表",
    role: "Implementation Advisor",
    bio: "自社エンジニア組織を率いる、AI実装の現場責任者。絵に描いた餅で終わらせない、実装レベルの筋の良さを判断できるプロ。",
    focus: ["AI実装", "エンジニア組織", "PoC〜運用"],
    initials: "S.E.S.",
  },
];

type Step = { num: string; en: string; title: string; body: string };

const steps: Step[] = [
  {
    num: "01",
    en: "Discovery",
    title: "無料相談",
    body: "御社の課題・現状・目指す姿をヒアリング。AI活用のロードマップ案を無料でご提示します。",
  },
  {
    num: "02",
    en: "Assignment",
    title: "顧問アサイン",
    body: "ロードマップに最適なAI顧問を厳選してご紹介。最初の面談まで丁寧にセットアップします。",
  },
  {
    num: "03",
    en: "Engagement",
    title: "伴走スタート",
    body: "定例のディスカッションを起点に、意思決定・実装判断・組織浸透までを月次のリズムで伴走します。",
  },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "無料相談ではどこまで話せますか?",
    a: "AI活用の目的整理、現在の課題の棚卸し、ロードマップの初期案の提示まで、無料相談の範囲で行います。何も決まっていない段階でも、お気軽にお声掛けください。",
  },
  {
    q: "社内にAIの知識がありませんが、大丈夫ですか?",
    a: "むしろその状態からのご相談が最も多いです。前提知識ゼロを想定して、経営視点・業務視点で「何のためのAIか」から一緒に整理します。",
  },
  {
    q: "途中で顧問を変更することはできますか?",
    a: "はい、可能です。事業のフェーズや必要な専門性の変化に応じて、別の顧問への切り替えを柔軟に行えます。無理な縛りはありません。",
  },
  {
    q: "業界・業種に制限はありますか?",
    a: "特にありません。製造・小売・金融・SaaS・医療・公共など、AI活用の余地がある領域であれば幅広くご相談いただけます。",
  },
  {
    q: "どのような企業に向いていますか?",
    a: "中堅規模で、AI活用に本気で踏み込みたい経営層・DX推進責任者の方に最適です。",
  },
];

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────

export default function AiKomonPage({
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
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス紹介", url: localePath("/services", locale) },
            {
              name: service.title,
              url: localePath(`/services/${SERVICE_SLUG}`, locale),
            },
          ]),
          serviceJsonLd({
            name: "AI顧問ボンド（by セールスボンド）",
            description:
              "AI活用の相談ならAI顧問ボンド。大手企業技術開発部やIT企業代表などハイクラス層のAIプロフェッショナルが顧問として伴走。月額10万円〜の伴走支援。",
            url: localePath(`/services/${SERVICE_SLUG}`, locale),
            keywords: [
              "AI顧問",
              "AI顧問ボンド",
              "AIアドバイザー",
              "AI活用",
              "AI導入支援",
              "AI戦略",
              "生成AI活用",
              "DX推進",
              "顧問サービス",
            ],
          }),
        ]}
      />

      {/* ═══════════════════════════════════════════════════
          Hero — deep navy, centered, clean
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#00164a] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, #003386 0%, transparent 55%), linear-gradient(180deg, #00164a 0%, #000c2e 100%)",
          }}
        />

        <Container className="relative py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#7dd3fc]">
              AI顧問ボンド ／ by Sales Bond
            </p>
            <h1 className="mt-6 font-display font-black leading-[1.15] tracking-tight text-white text-[clamp(2.25rem,5vw,4rem)]">
              AI活用の相談なら、
              <br />
              AI顧問ボンド。
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-[1.9] text-white/80 font-medium">
              大手企業技術開発部やIT企業代表など、
              <span className="font-black text-white">ハイクラス層</span>
              のAIプロフェッショナルが顧問として伴走。ロードマップ提示から実装まで、月額制で確かな結果を届けます。
            </p>

            {/* Proof pills */}
            <ul className="mx-auto mt-10 flex flex-wrap justify-center gap-3">
              <li className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7dd3fc]">
                  Pros
                </span>
                <span className="font-display text-lg font-black text-white">
                  100
                  <span className="text-[#7dd3fc]">＋</span>
                </span>
                <span className="text-xs font-bold text-white/70">在籍</span>
              </li>
              <li className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#7dd3fc]">
                  Monthly
                </span>
                <span className="font-display text-lg font-black text-white">
                  ¥10<span className="text-[#7dd3fc]">万</span>
                </span>
                <span className="text-xs font-bold text-white/70">〜／月</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={contactHref}
                size="lg"
                className="w-full px-10 !bg-[#0766f4] hover:!bg-[#0055d4] shadow-[0_18px_40px_-12px_rgba(7,102,244,0.55)] hover:-translate-y-0.5 sm:w-auto sm:min-w-[220px]"
              >
                無料相談を予約する
              </Button>
              <Button
                href={contactHref}
                size="lg"
                variant="ghost"
                className="w-full px-10 border border-white/40 !text-white hover:!bg-white/10 sm:w-auto sm:min-w-[220px]"
              >
                資料をダウンロード
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Problems — clean cards on light bg
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#f2f4f8] py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
              Problems
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              「AIをやろう」で、
              <br className="md:hidden" />
              止まっていませんか。
            </h2>
          </div>

          <ol className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
            {problems.map((p, i) => (
              <li key={p.num}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm">
                    <p className="font-display text-sm font-extrabold tracking-[0.16em] text-[#0766f4]">
                      {p.num}
                    </p>
                    <h3 className="mt-4 text-lg md:text-xl font-black leading-snug text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-[15px] leading-[1.9] text-ink-soft font-medium">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Reasons — clean 3-column grid
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
              Why AI顧問ボンド
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              選ばれる、3つの理由。
            </h2>
          </div>

          <ul className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <li key={r.num}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-[#e3edff] bg-white p-8">
                    <div className="inline-flex items-baseline gap-2">
                      <span className="font-display text-3xl font-black text-[#0766f4] leading-none">
                        {r.num}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#0766f4]/70">
                        {r.kicker}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg md:text-xl font-black leading-snug text-ink">
                      {r.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-4 block h-0.5 w-10 bg-[#0766f4]"
                    />
                    <p className="mt-4 text-sm leading-[1.9] text-ink-soft font-medium">
                      {r.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Advisors — light bg, simple avatar cards
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#f2f4f8] py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
              Advisors ／ 代表例のご紹介
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              ハイクラス層が、顧問として在籍。
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              以下は在籍する顧問の代表例です。ご相談内容に応じて、最適な顧問をご紹介します。
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
            {advisors.map((a, i) => (
              <li key={a.name}>
                <Reveal delay={i * 80} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm">
                    {/* Simple avatar circle */}
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-[#e3edff] font-display text-sm font-black tracking-[0.12em] text-[#0766f4]">
                      {a.initials}
                    </div>
                    <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#0766f4]">
                      {a.role}
                    </p>
                    <h3 className="mt-2 text-base md:text-lg font-black leading-snug text-ink">
                      {a.name}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.9] text-ink-soft font-medium">
                      {a.bio}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {a.focus.map((f) => (
                        <li
                          key={f}
                          className="rounded-full bg-[#f2f4f8] px-2.5 py-0.5 text-[11px] font-bold text-[#003386]"
                        >
                          #{f}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Flow — clean 3-step
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
              Flow ／ ご利用の流れ
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              まずは、話してみることから。
            </h2>
          </div>

          <ol className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.num}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-[#e3edff] bg-white p-8">
                    <div className="inline-flex items-baseline gap-2">
                      <span className="font-display text-3xl font-black text-[#0766f4] leading-none">
                        {s.num}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#0766f4]/70">
                        {s.en}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg md:text-xl font-black text-ink leading-snug">
                      {s.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-4 block h-0.5 w-10 bg-[#0766f4]"
                    />
                    <p className="mt-4 text-sm leading-[1.9] text-ink-soft font-medium">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={contactHref}
              size="lg"
              className="!bg-[#0766f4] hover:!bg-[#0055d4] shadow-[0_18px_40px_-12px_rgba(7,102,244,0.5)]"
            >
              無料相談を予約する
            </Button>
            <Button href={contactHref} size="lg" variant="secondary">
              資料をダウンロード
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#f2f4f8] py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
              FAQ
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              よくあるご質問
            </h2>
          </div>

          <ul className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <li key={f.q} className="rounded-2xl bg-white shadow-sm">
                <details className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                    <span className="flex gap-3">
                      <span className="font-display text-base font-black text-[#0766f4]">
                        Q.
                      </span>
                      <span className="text-base md:text-lg font-bold text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-[#0766f4] group-open:text-[#0766f4]">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-ink-line/60 p-6 pt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                    <span className="mr-2 font-display text-base font-black text-ink-muted">
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

      {/* ═══════════════════════════════════════════════════
          Final CTA
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#00164a] py-20 md:py-28 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#7dd3fc]">
              Book a Free Consultation
            </p>
            <h2 className="mt-6 font-display font-black leading-tight text-white text-[clamp(1.875rem,4.5vw,3rem)]">
              AI活用の相談なら、
              <br />
              AI顧問ボンド。
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm md:text-base leading-relaxed text-white/80 font-medium">
              月額10万円〜、無理な縛りなし。まずは無料相談から、御社のロードマップをご提示します。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={contactHref}
                size="lg"
                className="w-full px-10 !bg-[#0766f4] hover:!bg-[#0055d4] shadow-[0_18px_40px_-12px_rgba(7,102,244,0.55)] hover:-translate-y-0.5 sm:w-auto sm:min-w-[220px]"
              >
                無料相談を予約する
              </Button>
              <Button
                href={contactHref}
                size="lg"
                variant="ghost"
                className="w-full px-10 border border-white/40 !text-white hover:!bg-white/10 sm:w-auto sm:min-w-[220px]"
              >
                資料をダウンロード
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
