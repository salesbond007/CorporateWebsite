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

const worries: string[] = [
  "どの業務から始めるか優先順位がわからない",
  "ツールが多すぎて選べない",
  "導入しても社内に浸透しない",
  "アウトプットの質が安定しない",
  "コストも工数も期待ほど減らない",
  "情報漏洩が怖くて活用できない",
  "使い始めても仕組み化できず終わる",
];

type SupportKind =
  | "start"
  | "agent"
  | "guideline"
  | "data"
  | "toolFit"
  | "accuracy"
  | "training"
  | "process"
  | "model";

type Support = { kind: SupportKind; title: string; body: string };

const supports: Support[] = [
  {
    kind: "start",
    title: "AI活用、何から始める？",
    body: "自社に合ったAIの選び方から、最初の一歩を一緒に設計",
  },
  {
    kind: "agent",
    title: "AIエージェント構築",
    body: "定型業務を自動化するAIエージェントの企画・開発を支援",
  },
  {
    kind: "guideline",
    title: "社内ルール・ガイドライン策定",
    body: "情報漏洩などのリスクを防ぎながら、安心して使える利用ルールを整備",
  },
  {
    kind: "data",
    title: "自社データ連携基盤の構築",
    body: "社内システムやデータと連携した、実務で使える生成AI環境を構築",
  },
  {
    kind: "toolFit",
    title: "ツール選定・使い分け診断",
    body: "ChatGPT・Copilotなど乱立するツールから、自社に合うものを見極め",
  },
  {
    kind: "accuracy",
    title: "検索精度・回答精度の改善",
    body: "誤答や的外れな回答を減らす、AIの検索・回答ロジックの改善",
  },
  {
    kind: "training",
    title: "社員向けAIリテラシー研修",
    body: "現場が“自分ごと”として AIを使いこなせるようになる教育プログラム",
  },
  {
    kind: "process",
    title: "業務プロセスへの組み込み",
    body: "導入して終わりにせず、日常業務に定着するまでのオペレーション設計",
  },
  {
    kind: "model",
    title: "モデル選定・精度検証",
    body: "用途に応じて、複数のAIモデルを比較・検証し最適な選択を支援",
  },
];

function SupportIcon({ kind }: { kind: SupportKind }) {
  const c = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-11 w-11 md:h-12 md:w-12",
  };
  switch (kind) {
    case "start":
      // rocket / start
      return (
        <svg {...c}>
          <path d="M28 8c8 4 12 12 12 20l-6 6H14l-6-6c0-8 4-16 12-20l4-2 4 2z" />
          <circle cx="24" cy="20" r="4" />
          <path d="M14 34l-4 8 8-4M34 34l4 8-8-4" />
          <path d="M20 42c0 2 2 4 4 4s4-2 4-4" />
        </svg>
      );
    case "agent":
      // robot head
      return (
        <svg {...c}>
          <rect x="10" y="16" width="28" height="22" rx="4" />
          <path d="M24 10v6" />
          <circle cx="24" cy="8" r="2" />
          <circle cx="18" cy="26" r="2.4" />
          <circle cx="30" cy="26" r="2.4" />
          <path d="M18 33h12" />
          <path d="M6 22v10M42 22v10" />
        </svg>
      );
    case "guideline":
      // shield with checkmark
      return (
        <svg {...c}>
          <path d="M24 6l14 5v11c0 9-6 16-14 20-8-4-14-11-14-20V11l14-5z" />
          <path d="M18 24l4 4 8-8" />
        </svg>
      );
    case "data":
      // database cylinders connected
      return (
        <svg {...c}>
          <ellipse cx="14" cy="12" rx="8" ry="3" />
          <path d="M6 12v10c0 1.7 3.6 3 8 3s8-1.3 8-3V12" />
          <ellipse cx="34" cy="26" rx="8" ry="3" />
          <path d="M26 26v10c0 1.7 3.6 3 8 3s8-1.3 8-3V26" />
          <path d="M22 20l8 6" strokeDasharray="2 2" />
        </svg>
      );
    case "toolFit":
      // gear + wrench diagnostic
      return (
        <svg {...c}>
          <circle cx="18" cy="18" r="7" />
          <path d="M18 8v3M18 25v3M8 18h3M25 18h3M11.5 11.5l2 2M22.5 22.5l2 2M11.5 24.5l2-2M22.5 13.5l2-2" />
          <path d="M28 36l8-8 4 4-8 8-4-4z" />
          <path d="M28 36l-2 4 4-2" />
        </svg>
      );
    case "accuracy":
      // magnifier + target
      return (
        <svg {...c}>
          <circle cx="20" cy="20" r="12" />
          <path d="M29 29l10 10" />
          <circle cx="20" cy="20" r="6" />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    case "training":
      // graduation cap + open book
      return (
        <svg {...c}>
          <path d="M6 20l18-8 18 8-18 8-18-8z" />
          <path d="M14 22v8c0 2 4 4 10 4s10-2 10-4v-8" />
          <path d="M40 20v10" />
          <path d="M40 32a2 2 0 000 4" />
        </svg>
      );
    case "process":
      // process flow (nodes + arrows)
      return (
        <svg {...c}>
          <rect x="6" y="10" width="12" height="10" rx="1.5" />
          <rect x="30" y="10" width="12" height="10" rx="1.5" />
          <rect x="18" y="28" width="12" height="10" rx="1.5" />
          <path d="M18 15h12" />
          <path d="M28 22l-4 6M20 22l4 6" />
        </svg>
      );
    case "model":
      // balance scale
      return (
        <svg {...c}>
          <path d="M24 6v34" />
          <path d="M14 40h20" />
          <path d="M24 10l-14 4M24 10l14 4" />
          <path d="M4 22c0 2 3 4 6 4s6-2 6-4l-6-8-6 8z" />
          <path d="M32 22c0 2 3 4 6 4s6-2 6-4l-6-8-6 8z" />
        </svg>
      );
  }
}

type ProRole = { title: string; body: string };

const proRoles: ProRole[] = [
  {
    title: "IT企業代表",
    body: "自社プロダクトを率いるIT企業の代表クラス。生成AI・LLMを事業へ組み込む実装力を、経営視点で語れる層。",
  },
  {
    title: "大手企業技術開発部",
    body: "電機・製造・金融・通信など、日本を代表する企業でR&Dや事業部門を率いた経歴を持つシニア層。",
  },
  {
    title: "大手日系コンサル",
    body: "戦略・DXコンサルティングの現役代表・パートナークラス。経営層への提案・意思決定支援を得意とする層。",
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
                その生成AIの悩み、まるごと引き受けます。
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
          Worries — 横スライドで表示するAIのお悩み
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-[#faf5f5] py-20 md:py-28">
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
        </Container>

        {/* Marquee row */}
        <div className="relative mt-14" aria-label="AIに関するお悩みの例">
          {/* fade edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32"
            style={{ background: "linear-gradient(to right, #faf5f5, transparent)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32"
            style={{ background: "linear-gradient(to left, #faf5f5, transparent)" }}
          />

          <div className="overflow-hidden">
            <ul className="flex w-max animate-marquee gap-5 md:gap-6">
              {[...worries, ...worries].map((w, i) => (
                <li
                  key={`${i}-${w}`}
                  aria-hidden={i >= worries.length ? "true" : undefined}
                  className="flex w-[280px] shrink-0 items-center gap-4 rounded-2xl bg-white p-6 shadow-sm md:w-[320px] md:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fce7ea] text-[#BE123C]"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                      <path
                        d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
                    </svg>
                  </span>
                  <p className="text-sm md:text-[15px] font-black leading-snug text-ink">
                    {w}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Pro Roles — AIに詳しいプロのみ紹介
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#BE123C]">
              Pros
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              AIに詳しいプロのみ紹介
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              経営と現場の両方を知り抜いた層のみが在籍。以下は代表例です。
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
            {proRoles.map((r, i) => (
              <li key={r.title}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-[#fce7ea] bg-white p-8 shadow-sm">
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 place-items-center rounded-full bg-[#fce7ea] text-[#BE123C]"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
                        <path
                          d="M4 20c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <h3 className="mt-5 text-lg md:text-xl font-black leading-snug text-ink">
                      {r.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-4 block h-0.5 w-10 bg-[#BE123C]"
                    />
                    <p className="mt-4 text-sm md:text-[15px] leading-[1.9] text-ink-soft font-medium">
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
          Support Examples — 支援例 (3x3 grid)
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#faf5f5] py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#BE123C]">
              Support Examples
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              支援例
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              最初の一歩の設計から、実装・定着まで。AI活用のあらゆる悩みを、まるごと引き受けます。
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {supports.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <div className="flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm">
                    <span className="text-ink">
                      <SupportIcon kind={s.kind} />
                    </span>
                    <h3 className="mt-5 text-base md:text-lg font-black leading-snug text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.9] text-ink-soft font-medium">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

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
