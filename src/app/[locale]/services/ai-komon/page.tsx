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
// Data — Givery-style structure
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

// Why sections — three reasons, each with 3 sub-cards (Givery style)
type WhyCard = { title: string; body: string };

type Why = {
  kicker: string;
  headline: string;
  lead: string;
  cards: WhyCard[];
};

const whys: Why[] = [
  {
    kicker: "Reason 01",
    headline: "なぜ「ハイクラスな知見」が集まるのか？",
    lead: "顧問候補は、大手企業技術開発部や日系トップコンサル代表、IT企業代表など、経営と現場の両方を知り抜いた実力者のみ。「肩書きだけ」を排除する独自審査で、100人＋の少数精鋭を維持しています。",
    cards: [
      {
        title: "大手企業出身の実力者",
        body: "電機・製造・金融・通信など、日本を代表する企業でR&Dや事業部門を率いた経歴を持つ層が中心。",
      },
      {
        title: "現役の代表・役員クラス",
        body: "コンサル代表、IT企業代表、CTO/CDO級など、現在も経営意思決定に日常的に関わる層が在籍。",
      },
      {
        title: "実装を語れる技術者",
        body: "PoCで止めない実装力を持ち、生成AI・LLM・機械学習の現場を知り抜いたエンジニア出身の顧問も。",
      },
    ],
  },
  {
    kicker: "Reason 02",
    headline: "なぜ「使えるロードマップ」が描けるのか？",
    lead: "顧問はまず「作戦」を描きます。業務理解 → 優先順位 → 成果の可視化までを最初に設計するから、単発の助言ではなく「どこから始め、どこに辿り着くか」の全体像が最初に手に入ります。",
    cards: [
      {
        title: "業務ヒアリングを起点に設計",
        body: "課題の輪郭・現状の取り組み・想定する成果をヒアリングし、AI活用の全体像を描き直します。",
      },
      {
        title: "優先順位を明確に提示",
        body: "「何を、いつ、どの順に」着手すべきかを図示。経営会議で意思決定に使える粒度に整理します。",
      },
      {
        title: "定着まで見据えた設計",
        body: "PoC止まりを避けるため、成果指標・組織側の担い手・運用の型化まで初期段階で織り込みます。",
      },
    ],
  },
  {
    kicker: "Reason 03",
    headline: "なぜ「柔軟な伴走」ができるのか？",
    lead: "月額制の柔軟な契約形態。無理な長期縛りを求めず、必要な時に必要な深さで関わる関係を前提としています。事業のフェーズや社内の温度感に合わせて、顧問の関わり方を都度チューニングできます。",
    cards: [
      {
        title: "無理な長期契約は求めない",
        body: "月額制で、状況に応じて続ける・変える・一度離れるを自由に。強制ではなく納得で続く関係だけを。",
      },
      {
        title: "顧問の切り替えが可能",
        body: "事業フェーズや必要な専門性が変わったら、別領域の顧問へスムーズに切り替え可能です。",
      },
      {
        title: "月額10万円〜の設計",
        body: "スモールスタートを想定した価格帯を用意。まずは無料相談で御社に合う関わり方をご提案します。",
      },
    ],
  },
];

type Plan = {
  badge?: string;
  name: string;
  price: string;
  priceSuffix?: string;
  body: string;
  features: string[];
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    name: "相談ライトプラン",
    price: "10万円",
    priceSuffix: "〜／月",
    body: "AIに関する疑問や、日常的な意思決定サポートを、月額でチャット中心にご相談いただけるプラン。",
    features: [
      "チャットでのAI相談 (無制限)",
      "月1回のオンライン顧問ミーティング",
      "スモールスタート向け",
    ],
  },
  {
    badge: "Recommended",
    name: "AI戦略パートナープラン",
    price: "個別見積",
    body: "定例ミーティング × 実装ディスカッション × 意思決定支援まで含む、伴走型のフルサポートプラン。",
    features: [
      "月次の定例ディスカッション",
      "ロードマップ提示 & 改訂",
      "実装レビュー & 組織浸透支援",
    ],
    recommended: true,
  },
  {
    name: "個別案件相談",
    price: "個別見積",
    body: "特定のプロジェクトや、期間限定のご支援が必要な場合に。要件に応じて最適な顧問をアサインします。",
    features: [
      "スポット / プロジェクト対応",
      "領域別の顧問アサイン",
      "期間・関与度は柔軟に設計",
    ],
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
// Portrait illustration (used in hero)
// ─────────────────────────────────────────────────────────
function HeroPortrait() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="absolute bottom-0 left-1/2 h-[95%] w-auto -translate-x-1/2"
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="AI顧問ボンドのハイクラスプロフェッショナル"
    >
      <defs>
        <linearGradient id="ai-suit-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="ai-skin-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde3c4" />
          <stop offset="100%" stopColor="#e0b088" />
        </linearGradient>
        <linearGradient id="ai-hair-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0e0a" />
          <stop offset="100%" stopColor="#0a0605" />
        </linearGradient>
      </defs>
      {/* neck */}
      <path
        d="M175 260 L175 310 C 175 316 185 320 200 320 C 215 320 225 316 225 310 L 225 260 z"
        fill="url(#ai-skin-b)"
      />
      <path
        d="M175 305 C 175 313 185 316 200 316 C 215 316 225 313 225 305"
        stroke="#c99a70"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      {/* head */}
      <ellipse cx="200" cy="180" rx="68" ry="82" fill="url(#ai-skin-b)" />
      {/* hair */}
      <path
        d="M132 194 C 124 130 156 96 200 96 C 240 96 268 122 268 190 C 268 168 254 148 234 148 C 220 148 208 154 200 168 C 186 158 172 158 162 168 C 156 174 150 184 146 194 C 138 196 132 190 132 194 z"
        fill="url(#ai-hair-b)"
      />
      {/* eyebrows */}
      <path d="M162 180 Q 176 174 190 180" stroke="#0a0605" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M210 180 Q 224 174 238 180" stroke="#0a0605" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* eyes */}
      <ellipse cx="176" cy="196" rx="4" ry="5" fill="#0a0605" />
      <ellipse cx="224" cy="196" rx="4" ry="5" fill="#0a0605" />
      <circle cx="177.5" cy="194" r="1.2" fill="#ffffff" />
      <circle cx="225.5" cy="194" r="1.2" fill="#ffffff" />
      {/* nose */}
      <path d="M200 208 Q 195 226 192 234 Q 198 240 208 234" stroke="#c99a70" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* mouth (smile) */}
      <path d="M185 250 Q 200 262 215 250" stroke="#7a2820" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* ears */}
      <ellipse cx="130" cy="200" rx="7" ry="14" fill="url(#ai-skin-b)" />
      <ellipse cx="270" cy="200" rx="7" ry="14" fill="url(#ai-skin-b)" />
      {/* suit */}
      <path
        d="M50 500 C 50 400 105 315 200 315 C 295 315 350 400 350 500 z"
        fill="url(#ai-suit-b)"
      />
      <path d="M148 330 L 200 388 L 154 452 L 138 424 z" fill="#050505" />
      <path d="M252 330 L 200 388 L 246 452 L 262 424 z" fill="#050505" />
      {/* white inner */}
      <path d="M175 320 L 200 372 L 225 320 L 225 388 L 175 388 z" fill="#f5f5f5" />
      <path d="M175 320 L 200 372 L 225 320" stroke="#c0c0c0" strokeWidth="1.2" fill="none" />
      {/* lapel pin */}
      <circle cx="158" cy="372" r="4.5" fill="#fbbf24" />
      <circle cx="158" cy="372" r="2" fill="#d97706" opacity="0.6" />
    </svg>
  );
}

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
          Hero — Givery-style split (photo left, content right)
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white">
        <div className="grid md:grid-cols-2">
          {/* Left: photo panel */}
          <div className="relative min-h-[380px] overflow-hidden bg-[#4c0519] md:min-h-[640px] lg:min-h-[720px]">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, #a41e3a 0%, transparent 55%), radial-gradient(circle at 20% 90%, #7f1d1d 0%, transparent 60%), linear-gradient(160deg, #4c0519 0%, #3b0509 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-2/3"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, transparent 55%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />
            <HeroPortrait />
          </div>

          {/* Right: content */}
          <div className="relative flex items-center bg-white px-6 py-16 md:px-10 md:py-20 lg:px-16">
            <div className="w-full">
              <p className="text-sm md:text-base font-bold text-ink-soft leading-relaxed">
                生成AI活用のお悩み解決サービス
              </p>
              <h1 className="mt-4 font-display font-black leading-[1.05] tracking-tight text-ink text-[clamp(2.5rem,5.5vw,4.5rem)]">
                AI顧問
                <span className="text-[#BE123C]">ボンド</span>
              </h1>
              <ul className="mt-8 flex flex-wrap gap-3">
                {["ハイクラス層", "ロードマップ提示", "月額10万円〜"].map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex rounded-md bg-[#BE123C] px-4 py-1.5 text-sm font-black text-white shadow-[0_6px_18px_-8px_rgba(190,18,60,0.6)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-lg text-sm md:text-base leading-[1.95] text-ink font-medium">
                大手企業技術開発部やIT企業代表など、100人＋のハイクラスAIプロフェッショナルが顧問として伴走。ロードマップ提示から実装まで、月額制で確かな結果を届けます。
              </p>
              <div className="mt-10">
                <Button
                  href={contactHref}
                  size="lg"
                  className="w-full !h-[64px] !bg-[#BE123C] hover:!bg-[#a41e3a] shadow-[0_18px_40px_-12px_rgba(190,18,60,0.55)] hover:-translate-y-0.5 text-lg font-black md:!h-[72px] md:text-xl md:max-w-md"
                >
                  お問い合わせ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Problems — 生成AI活用のお悩み
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#faf5f5] py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#BE123C]">
              Problems
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              生成AIの活用を推進する上で、
              <br className="md:hidden" />
              こんなお悩みありませんか？
            </h2>
          </div>

          <ol className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
            {problems.map((p, i) => (
              <li key={p.num}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm">
                    <p className="font-display text-sm font-extrabold tracking-[0.16em] text-[#BE123C]">
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
          Why blocks (Reason 01/02/03) — Givery pattern
      ══════════════════════════════════════════════════ */}
      {whys.map((w, wi) => (
        <section
          key={w.headline}
          className={`py-20 md:py-28 ${wi % 2 === 0 ? "bg-white" : "bg-[#faf5f5]"}`}
        >
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#BE123C]">
                {w.kicker}
              </p>
              <h2 className="mt-4 font-display font-black leading-[1.25] text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
                {w.headline}
              </h2>
              <p className="mt-6 text-sm md:text-base leading-[1.95] text-ink-soft font-medium">
                {w.lead}
              </p>
            </div>

            <ul className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
              {w.cards.map((c, i) => (
                <li key={c.title}>
                  <Reveal delay={i * 80} className="h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-[#fce7ea] bg-white p-7 shadow-sm">
                      <h3 className="text-base md:text-lg font-black leading-snug text-ink">
                        {c.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-4 block h-0.5 w-10 bg-[#BE123C]"
                      />
                      <p className="mt-4 text-sm leading-[1.9] text-ink-soft font-medium">
                        {c.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}

      {/* ═══════════════════════════════════════════════════
          Pricing
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#faf5f5] py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#BE123C]">
              Price
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              料金プラン
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              スモールスタートから戦略パートナーまで、3つのプランをご用意しています。
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
            {plans.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 80} className="h-full">
                  <div
                    className={`flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm ${
                      p.recommended
                        ? "border-2 border-[#BE123C] shadow-[0_20px_50px_-25px_rgba(190,18,60,0.5)]"
                        : "border border-[#fce7ea]"
                    }`}
                  >
                    {p.badge ? (
                      <span className="inline-flex w-fit rounded-full bg-[#BE123C] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
                        {p.badge}
                      </span>
                    ) : null}
                    <h3
                      className={`text-lg md:text-xl font-black text-ink leading-snug ${p.badge ? "mt-4" : ""}`}
                    >
                      {p.name}
                    </h3>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="font-display text-3xl md:text-4xl font-black text-[#BE123C]">
                        {p.price}
                      </span>
                      {p.priceSuffix ? (
                        <span className="text-sm font-bold text-ink-soft">
                          {p.priceSuffix}
                        </span>
                      ) : null}
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-5 block h-px w-full bg-[#fce7ea]"
                    />
                    <p className="mt-5 text-sm leading-[1.9] text-ink-soft font-medium">
                      {p.body}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-ink font-medium">
                          <span aria-hidden="true" className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#BE123C]">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5.4 L4 7.4 L8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 pt-2">
                      <Button
                        href={contactHref}
                        size="md"
                        className={`w-full ${p.recommended ? "!bg-[#BE123C] hover:!bg-[#a41e3a]" : "!bg-white !text-[#BE123C] border border-[#BE123C] hover:!bg-[#faf5f5]"}`}
                      >
                        このプランで相談する
                      </Button>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-ink-muted">
            ※ 記載の金額は税抜表記です。詳細は無料相談時にご案内します。
          </p>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#BE123C]">
              FAQ
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              よくあるご質問
            </h2>
          </div>

          <ul className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <li key={f.q} className="rounded-2xl bg-[#faf5f5]">
                <details className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                    <span className="flex gap-3">
                      <span className="font-display text-base font-black text-[#BE123C]">
                        Q.
                      </span>
                      <span className="text-base md:text-lg font-bold text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-[#BE123C] group-open:text-[#BE123C]">
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
      <section className="bg-[#4c0519] py-20 md:py-28 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#fda4af]">
              Contact
            </p>
            <h2 className="mt-6 font-display font-black leading-tight text-white text-[clamp(1.875rem,4.5vw,3rem)]">
              お問い合わせ
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm md:text-base leading-relaxed text-white/80 font-medium">
              まずは無料相談から。御社の現状をお聞かせいただければ、AI活用のロードマップをご提示します。
            </p>
            <div className="mt-10">
              <Button
                href={contactHref}
                size="lg"
                className="w-full !h-[64px] !bg-[#BE123C] hover:!bg-[#a41e3a] shadow-[0_18px_40px_-12px_rgba(190,18,60,0.55)] hover:-translate-y-0.5 text-lg font-black md:!h-[72px] md:text-xl sm:w-auto sm:min-w-[280px]"
              >
                無料相談を予約する
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
