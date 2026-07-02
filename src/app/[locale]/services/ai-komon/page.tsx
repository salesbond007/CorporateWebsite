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
  "何から始めればいいかわからない",
  "社内にAIを理解している人がいない",
  "ツールを入れても誰も使わない",
  "効果が出ているのか測れない",
  "セキュリティリスクが怖い",
  "現場が「自分の仕事が奪われる」と抵抗する",
  "一部の人だけが使って組織に広がらない",
  "導入したが業務フローに組み込めていない",
  "バックオフィス業務をAIで効率化したい",
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

type ConsultKind =
  | "chat"
  | "visit"
  | "adoption"
  | "department"
  | "regular"
  | "toolPick";

type Consult = { kind: ConsultKind; title: string; body: string };

const consults: Consult[] = [
  {
    kind: "chat",
    title: "チャット相談",
    body: "気軽にいつでもAIのプロに質問・相談",
  },
  {
    kind: "visit",
    title: "現場訪問・提案",
    body: "実態を見た上で、最適なAI化プランを設計",
  },
  {
    kind: "adoption",
    title: "社内定着支援",
    body: "使って終わりにしない、根付くまで伴走",
  },
  {
    kind: "department",
    title: "部署特化のAI化",
    body: "営業・マーケなど、現場単位でのAI導入にも対応",
  },
  {
    kind: "regular",
    title: "定例MTGでの壁打ち",
    body: "定期的に伴走し、課題を整理・次の一手を一緒に考える",
  },
  {
    kind: "toolPick",
    title: "AIツール選定サポート",
    body: "多様なツールから、自社に最適な選択肢を見極めて提案",
  },
];

function ConsultIcon({ kind }: { kind: ConsultKind }) {
  const c = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-10 w-10 md:h-11 md:w-11",
  };
  switch (kind) {
    case "chat":
      return (
        <svg {...c}>
          <path d="M8 12h32v22H18l-6 6v-6H8z" />
          <circle cx="18" cy="23" r="1.6" fill="currentColor" />
          <circle cx="24" cy="23" r="1.6" fill="currentColor" />
          <circle cx="30" cy="23" r="1.6" fill="currentColor" />
        </svg>
      );
    case "visit":
      // building with arrow
      return (
        <svg {...c}>
          <rect x="10" y="10" width="18" height="30" />
          <path d="M14 16h4M22 16h4M14 22h4M22 22h4M14 28h4M22 28h4M14 34h4M22 34h4" />
          <path d="M32 22h10M38 18l4 4-4 4" />
          <rect x="32" y="30" width="10" height="10" />
        </svg>
      );
    case "adoption":
      // seedling / growth
      return (
        <svg {...c}>
          <path d="M24 40V24" />
          <path d="M24 24C16 24 12 18 12 12c6 0 12 4 12 12z" />
          <path d="M24 26C32 26 36 20 36 14c-6 0-12 4-12 12z" />
          <path d="M12 40h24" />
        </svg>
      );
    case "department":
      // team / group
      return (
        <svg {...c}>
          <circle cx="24" cy="14" r="4" />
          <path d="M16 26c0-4 3.6-7 8-7s8 3 8 7" />
          <circle cx="10" cy="20" r="3" />
          <path d="M4 32c0-3 2.6-5 6-5" />
          <circle cx="38" cy="20" r="3" />
          <path d="M44 32c0-3-2.6-5-6-5" />
        </svg>
      );
    case "regular":
      // calendar
      return (
        <svg {...c}>
          <rect x="8" y="10" width="32" height="30" rx="2" />
          <path d="M8 18h32" />
          <path d="M16 6v8M32 6v8" />
          <circle cx="16" cy="26" r="1.5" fill="currentColor" />
          <circle cx="24" cy="26" r="1.5" fill="currentColor" />
          <circle cx="32" cy="26" r="1.5" fill="currentColor" />
          <circle cx="16" cy="33" r="1.5" fill="currentColor" />
          <circle cx="24" cy="33" r="1.5" fill="currentColor" />
        </svg>
      );
    case "toolPick":
      // checklist
      return (
        <svg {...c}>
          <rect x="10" y="6" width="28" height="36" rx="2" />
          <path d="M15 14l2 2 4-4M15 24l2 2 4-4M15 34l2 2 4-4" />
          <path d="M25 15h10M25 25h10M25 35h6" />
        </svg>
      );
  }
}

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
          Hero — editorial split, big catch, trust row
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white">
        {/* deep red base band (mobile) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[52%] bg-[#4c0519] md:hidden"
        />

        <div className="relative grid md:grid-cols-12">
          {/* Left: photo panel (5/12) */}
          <div className="relative col-span-1 min-h-[360px] overflow-hidden bg-[#4c0519] md:col-span-5 md:min-h-[720px] lg:min-h-[760px]">
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

            {/* Editorial folio marks (magazine style) */}
            <div className="absolute left-6 top-6 flex items-center gap-3 md:left-8 md:top-8">
              <span aria-hidden="true" className="block h-px w-8 bg-amber-300" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-amber-300">
                AI顧問ボンド ／ N&deg; 01
              </p>
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-3 md:bottom-8 md:left-8">
              <span aria-hidden="true" className="block h-px w-8 bg-white/40" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-white/70">
                by Sales Bond
              </p>
            </div>

            <HeroPortrait />
          </div>

          {/* Right: content (7/12) */}
          <div className="relative col-span-1 flex items-center bg-white px-6 py-16 md:col-span-7 md:px-12 md:py-24 lg:px-20">
            <div className="w-full">
              {/* Brand mark */}
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="block h-px w-10 bg-[#BE123C]" />
                <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.36em] text-[#BE123C]">
                  AI顧問ボンド ／ by Sales Bond
                </p>
              </div>

              {/* Catchphrase — big */}
              <h1 className="mt-8 font-display font-black leading-[1.02] tracking-tight text-ink text-[clamp(2.5rem,5.5vw,4.75rem)]">
                企業の
                <span className="relative inline-block">
                  <span>初めて</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-[6px] bg-amber-300"
                  />
                </span>
                の
                <br />
                AI活用なら
                <span className="text-[#BE123C]">！</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm md:text-base leading-[1.95] text-ink-soft font-medium">
                現役のAIプロフェッショナルが、
                <span className="font-black text-ink">月額10万円〜</span>
                で顧問として伴走。生成AI活用のあらゆる悩みを、
                <span className="font-black text-ink">まるっと相談・解決</span>
                します。
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={contactHref}
                  size="lg"
                  className="!h-[64px] w-full !bg-[#BE123C] hover:!bg-[#a41e3a] shadow-[0_22px_50px_-14px_rgba(190,18,60,0.55)] hover:-translate-y-0.5 text-base font-black md:!h-[72px] md:text-lg sm:w-auto sm:min-w-[260px]"
                >
                  無料相談する
                </Button>
                <Button
                  href={contactHref}
                  size="lg"
                  variant="secondary"
                  className="!h-[64px] w-full text-base font-black md:!h-[72px] md:text-lg sm:w-auto sm:min-w-[200px]"
                >
                  資料請求
                </Button>
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                ※ ご相談は無料。最短翌営業日で相談枠をご案内します。
              </p>

              {/* Trust row */}
              <ul className="mt-10 grid grid-cols-3 gap-3 border-t border-ink-line pt-8 md:mt-12 md:gap-6">
                {[
                  { label: "現役プロ在籍", value: "100", suffix: "＋" },
                  { label: "対応領域", value: "全", suffix: "領域" },
                  { label: "月額", value: "¥10", suffix: "万〜" },
                ].map((t) => (
                  <li key={t.label}>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-ink-muted">
                      {t.label}
                    </p>
                    <p className="mt-2 flex items-baseline gap-0.5 font-display font-black text-ink">
                      <span className="text-2xl md:text-3xl">{t.value}</span>
                      <span className="text-sm md:text-base text-[#BE123C]">
                        {t.suffix}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
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
            <ul
              className="flex w-max animate-marquee gap-5 md:gap-6"
              style={{ animationDuration: "60s" }}
            >
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
          Connector arrow (悩み → 解決)
      ══════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="flex justify-center bg-[#faf5f5] pb-6 pt-2 md:pb-10"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#BE123C] shadow-[0_18px_40px_-12px_rgba(190,18,60,0.55)] md:h-20 md:w-20">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            className="md:h-9 md:w-9"
          >
            <path
              d="M12 4 L12 20 M5 13 L12 20 L19 13"
              stroke="white"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          AI顧問ボンドが解決します！
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#faf5f5] pb-20 pt-6 md:pb-28 md:pt-10">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-display text-3xl font-black italic text-[#BE123C] md:text-4xl" style={{ fontFamily: '"Times New Roman", serif' }}>
              Answer.
            </p>
            <h2 className="mt-4 font-display font-black leading-[1.15] tracking-tight text-ink text-[clamp(2rem,5vw,3.5rem)]">
              その悩み、
              <br className="md:hidden" />
              <span className="relative inline-block">
                <span>AI顧問ボンド</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-[6px] bg-amber-300"
                />
              </span>
              が
              <br />
              解決します
              <span className="text-[#BE123C]">！</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-sm md:text-base leading-[1.95] text-ink-soft font-medium">
              最初の一歩の設計から、実装・定着まで。AI活用のあらゆる悩みを、まるごと引き受けます。
              <br className="hidden md:inline" />
              以下は、実際に解決できることの一例です。
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
          About — AI顧問ボンドとは
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#BE123C]">
              About
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              AI顧問ボンドとは
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base leading-[1.95] text-ink-soft font-medium">
              生成AIの「わからない」をすぐ解消。技術的な疑問も活用の悩みも、経験豊富なプロが正確・迅速にサポートします。
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <p className="text-base md:text-lg leading-[2] text-ink font-medium">
              AI顧問ボンドは、
              <span className="font-black text-[#BE123C]">AI活用に本気で踏み込みたい企業</span>
              のための顧問マッチングサービスです。大手企業技術開発部、大手日系コンサル、IT企業代表など、経営と現場の両方を知り抜いた
              <span className="font-black text-ink">現役のAIプロフェッショナル</span>
              が顧問として月次で伴走。単なる助言に留まらず、
              <span className="font-black text-ink">ロードマップの提示から実装、組織への定着</span>
              までを一緒に描き切ります。
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3 md:gap-6">
            {[
              {
                kicker: "Point 01",
                title: "現役のAIプロが伴走",
                body: "AI活用の現場を知り抜いた実力者のみが顧問として在籍。等身大の意思決定を、隣で支えます。",
              },
              {
                kicker: "Point 02",
                title: "ロードマップから始める",
                body: "着手前に全体像と優先順位を提示。単発の助言ではなく「どこから始めどこへ辿り着くか」まで描きます。",
              },
              {
                kicker: "Point 03",
                title: "月額制で柔軟に",
                body: "月額10万円〜のスモールスタート。無理な長期縛りはなく、フェーズに応じて関わり方を調整できます。",
              },
            ].map((p, i) => (
              <li key={p.kicker}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-[#fce7ea] bg-white p-7 shadow-sm">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#BE123C]">
                      {p.kicker}
                    </p>
                    <h3 className="mt-3 text-base md:text-lg font-black leading-snug text-ink">
                      {p.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-4 block h-0.5 w-10 bg-[#BE123C]"
                    />
                    <p className="mt-4 text-sm leading-[1.9] text-ink-soft font-medium">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
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
          Consult Examples — 顧問ボンドの相談一例
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#BE123C]">
              Consult Examples
            </p>
            <h2 className="mt-4 font-display font-black leading-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              顧問ボンドの相談一例
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              チャットから現場訪問、部署単位のAI化まで。関わり方は、状況に合わせて自由に選べます。
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {consults.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <div className="flex h-full items-start gap-5 rounded-2xl border border-[#fce7ea] bg-white p-7 shadow-sm">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#faf5f5] text-[#BE123C]">
                      <ConsultIcon kind={c.kind} />
                    </span>
                    <div>
                      <h3 className="text-base md:text-lg font-black leading-snug text-ink">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.9] text-ink-soft font-medium">
                        {c.body}
                      </p>
                    </div>
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
            <p className="font-display text-2xl font-black italic text-[#BE123C] md:text-3xl" style={{ fontFamily: '"Times New Roman", serif' }}>
              Price.
            </p>
            <h2 className="mt-3 font-display font-black leading-tight text-ink text-[clamp(1.875rem,4.5vw,2.875rem)]">
              事業フェーズに合わせて選べる、
              <br className="md:hidden" />
              3つのプラン
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              スモールスタートから戦略パートナーまで。まずは無料相談で、御社に最適な関わり方をご提案します。
            </p>
          </div>

          <ul className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3 md:items-stretch">
            {plans.map((p, i) => (
              <li
                key={p.name}
                className={p.recommended ? "md:-my-4" : ""}
              >
                <Reveal delay={i * 80} className="h-full">
                  <div
                    className={`flex h-full flex-col rounded-2xl p-8 md:p-9 ${
                      p.recommended
                        ? "relative bg-[#4c0519] text-white shadow-[0_35px_80px_-30px_rgba(190,18,60,0.6)]"
                        : "border border-[#fce7ea] bg-white shadow-sm"
                    }`}
                  >
                    {p.recommended ? (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background:
                            "radial-gradient(circle at 20% 20%, rgba(190,18,60,0.4) 0%, transparent 55%), linear-gradient(160deg, #4c0519 0%, #3b0509 100%)",
                        }}
                      />
                    ) : null}

                    <div className="relative">
                      {p.badge ? (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-300 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#4c0519]">
                          <span aria-hidden="true">★</span>
                          {p.badge}
                        </span>
                      ) : (
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#BE123C]">
                          {`Plan 0${i + 1}`}
                        </p>
                      )}
                      <h3
                        className={`text-xl md:text-2xl font-black leading-snug ${
                          p.recommended ? "text-white mt-4" : "text-ink mt-3"
                        }`}
                      >
                        {p.name}
                      </h3>

                      <div className="mt-6 flex items-baseline gap-1">
                        <span
                          className={`font-display text-4xl md:text-5xl font-black ${
                            p.recommended ? "text-amber-300" : "text-[#BE123C]"
                          }`}
                        >
                          {p.price}
                        </span>
                        {p.priceSuffix ? (
                          <span
                            className={`text-sm font-bold ${
                              p.recommended ? "text-white/70" : "text-ink-soft"
                            }`}
                          >
                            {p.priceSuffix}
                          </span>
                        ) : null}
                      </div>

                      <span
                        aria-hidden="true"
                        className={`mt-6 block h-px w-full ${
                          p.recommended ? "bg-white/20" : "bg-[#fce7ea]"
                        }`}
                      />

                      <p
                        className={`mt-6 text-sm leading-[1.9] font-medium ${
                          p.recommended ? "text-white/80" : "text-ink-soft"
                        }`}
                      >
                        {p.body}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {p.features.map((f) => (
                          <li
                            key={f}
                            className={`flex gap-2 text-sm font-medium ${
                              p.recommended ? "text-white/90" : "text-ink"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                                p.recommended ? "bg-amber-300" : "bg-[#BE123C]"
                              }`}
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path
                                  d="M2 5.4 L4 7.4 L8 3"
                                  stroke={p.recommended ? "#4c0519" : "#fff"}
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative mt-auto pt-10">
                      <Button
                        href={contactHref}
                        size="md"
                        className={`w-full ${
                          p.recommended
                            ? "!bg-amber-300 !text-[#4c0519] hover:!bg-amber-200"
                            : "!bg-white !text-[#BE123C] border border-[#BE123C] hover:!bg-[#faf5f5]"
                        }`}
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
