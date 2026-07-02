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
          Hero — diagonal split: left copy / right person
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#00164a] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #003386 0%, transparent 55%), radial-gradient(circle at 90% 80%, #0055d4 0%, transparent 50%), linear-gradient(180deg, #00164a 0%, #000c2e 100%)",
          }}
        />

        {/* Diagonal slash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block"
        >
          <svg
            viewBox="0 0 1440 700"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="ai-slash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0766f4" stopOpacity="0" />
                <stop offset="35%" stopColor="#0766f4" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#7dd3fc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ai-slash-soft" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0766f4" stopOpacity="0" />
                <stop offset="50%" stopColor="#0766f4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0766f4" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* soft glow behind */}
            <line
              x1="880"
              y1="-60"
              x2="620"
              y2="760"
              stroke="url(#ai-slash-soft)"
              strokeWidth="60"
              strokeLinecap="round"
            />
            {/* main sharp line */}
            <line
              x1="880"
              y1="-40"
              x2="620"
              y2="740"
              stroke="url(#ai-slash)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <Container className="relative py-20 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-6 lg:gap-10">
            {/* ─── Left: content ─── */}
            <div className="md:col-span-7">
              <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#7dd3fc]">
                AI顧問ボンド ／ by Sales Bond
              </p>
              <h1 className="mt-6 font-display font-black leading-[1.12] tracking-tight text-white text-[clamp(2rem,4.6vw,3.75rem)]">
                AI活用の相談なら、
                <br />
                AI顧問ボンド。
              </h1>
              <p className="mt-6 max-w-xl text-sm md:text-base leading-[1.9] text-white/80 font-medium">
                大手企業技術開発部やIT企業代表など、
                <span className="font-black text-white">ハイクラス層</span>
                のAIプロフェッショナルが顧問として伴走。ロードマップ提示から実装まで、月額制で確かな結果を届けます。
              </p>

              {/* Proof pills */}
              <ul className="mt-8 flex flex-wrap gap-3">
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

            {/* ─── Right: person icon ─── */}
            <div className="relative md:col-span-5">
              <div className="relative mx-auto w-full max-w-[360px] md:ml-auto md:mr-0">
                <svg
                  viewBox="0 0 360 440"
                  className="block h-auto w-full"
                  role="img"
                  aria-label="AI顧問ボンドのハイクラスプロフェッショナル"
                >
                  <defs>
                    <radialGradient id="ai-halo" cx="50%" cy="35%" r="55%">
                      <stop offset="0%" stopColor="#0766f4" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#00164a" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="ai-suit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0055d4" />
                      <stop offset="100%" stopColor="#001a4a" />
                    </linearGradient>
                    <linearGradient id="ai-skin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fde3c4" />
                      <stop offset="100%" stopColor="#e5b98d" />
                    </linearGradient>
                    <linearGradient id="ai-hair" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#001a4a" />
                      <stop offset="100%" stopColor="#000c2e" />
                    </linearGradient>
                  </defs>

                  {/* halo */}
                  <circle cx="180" cy="170" r="170" fill="url(#ai-halo)" />

                  {/* orbit dots */}
                  <g fill="#7dd3fc">
                    <circle cx="72" cy="150" r="2" opacity="0.6" />
                    <circle cx="300" cy="120" r="2.5" opacity="0.7" />
                    <circle cx="325" cy="230" r="2" opacity="0.5" />
                    <circle cx="55" cy="280" r="2.4" opacity="0.5" />
                    <circle cx="110" cy="70" r="1.8" opacity="0.6" />
                  </g>

                  {/* neck */}
                  <path
                    d="M155 218 L155 262 C 155 268 165 272 180 272 C 195 272 205 268 205 262 L 205 218 z"
                    fill="url(#ai-skin)"
                  />
                  <path
                    d="M155 258 C 155 265 165 268 180 268 C 195 268 205 265 205 258"
                    stroke="#c99a70"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.5"
                  />

                  {/* head base */}
                  <ellipse cx="180" cy="150" rx="62" ry="72" fill="url(#ai-skin)" />

                  {/* hair — swept side part */}
                  <path
                    d="M120 158 C 118 105 145 76 180 76 C 218 76 244 100 244 158 C 244 140 232 118 214 118 C 200 118 190 124 186 138 C 172 130 160 132 152 142 C 146 148 142 158 138 168 C 128 170 122 165 120 158 z"
                    fill="url(#ai-hair)"
                  />
                  {/* subtle hair highlight */}
                  <path
                    d="M132 128 C 145 105 172 92 194 96"
                    stroke="#3b82f6"
                    strokeWidth="1.4"
                    fill="none"
                    opacity="0.4"
                  />

                  {/* eyebrows */}
                  <path d="M148 148 Q 158 143 168 148" stroke="#001a4a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                  <path d="M192 148 Q 202 143 212 148" stroke="#001a4a" strokeWidth="2.4" fill="none" strokeLinecap="round" />

                  {/* eyes */}
                  <ellipse cx="158" cy="160" rx="3.4" ry="4.2" fill="#001a4a" />
                  <ellipse cx="202" cy="160" rx="3.4" ry="4.2" fill="#001a4a" />
                  {/* eye highlights */}
                  <circle cx="159.2" cy="158.4" r="1" fill="#ffffff" />
                  <circle cx="203.2" cy="158.4" r="1" fill="#ffffff" />

                  {/* nose (light shadow) */}
                  <path d="M180 168 Q 176 182 174 190 Q 178 194 184 190" stroke="#c99a70" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />

                  {/* mouth */}
                  <path d="M168 202 Q 180 210 192 202" stroke="#7a2820" strokeWidth="2" fill="none" strokeLinecap="round" />

                  {/* ears */}
                  <ellipse cx="118" cy="165" rx="6" ry="12" fill="url(#ai-skin)" />
                  <ellipse cx="242" cy="165" rx="6" ry="12" fill="url(#ai-skin)" />

                  {/* body — suit */}
                  <path
                    d="M50 440 C 50 340 105 275 180 275 C 255 275 310 340 310 440 z"
                    fill="url(#ai-suit)"
                  />
                  {/* Left lapel */}
                  <path d="M136 290 L 180 342 L 138 402 L 128 380 z" fill="#00164a" />
                  {/* Right lapel */}
                  <path d="M224 290 L 180 342 L 222 402 L 232 380 z" fill="#00164a" />
                  {/* White collar */}
                  <path d="M156 285 L 180 320 L 204 285 L 204 340 L 156 340 z" fill="#ffffff" />
                  {/* Neckline dark shadow under collar */}
                  <path d="M156 285 L 180 320 L 204 285" stroke="#001a4a" strokeWidth="1.4" fill="none" />
                  {/* Tie */}
                  <path d="M172 320 L 188 320 L 194 380 L 180 405 L 166 380 z" fill="#0766f4" />
                  <path d="M175 320 L 185 320 L 187 335 L 173 335 z" fill="#003386" />

                  {/* Amber lapel pin */}
                  <circle cx="145" cy="336" r="4" fill="#fbbf24" />

                  {/* Sparkle stars around head */}
                  <g fill="#fbbf24" opacity="0.9">
                    <path d="M290 76 L 293 84 L 301 87 L 293 90 L 290 98 L 287 90 L 279 87 L 287 84 z" />
                    <path d="M64 108 L 66.5 114 L 72 116 L 66.5 118 L 64 124 L 61.5 118 L 56 116 L 61.5 114 z" />
                    <path d="M330 200 L 331.5 204 L 335.5 205.5 L 331.5 207 L 330 211 L 328.5 207 L 324.5 205.5 L 328.5 204 z" />
                  </g>
                </svg>
              </div>
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
