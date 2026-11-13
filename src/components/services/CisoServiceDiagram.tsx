import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Bond AI セキュリティ LP「サービス概要」の全体像。
 * 暗いワイン色を重ねた写真の上に、左: 4ステップが継続的にまわる円の図、
 * 右: 見出しと「セキュリティ顧問／社外CISO」の対応表。
 * 4ステップの順番は両プラン共通で、違うのは「どこまで任せられるか」であることを示す。
 * 背景写真: Unsplash(商用利用可・クレジット不要)。
 */

const steps = [
  {
    en: "RISK ASSESSMENT",
    title: "リスクアセスメント",
    plain: "弱点を見える化し、優先順位をつける",
    advisor: "外部からの自動診断",
    ciso: "シャドーAIの可視化＋脆弱性診断",
  },
  {
    en: "POLICY & AI GOVERNANCE",
    title: "ポリシー策定・AIガバナンス",
    plain: "AIの使い方と社内規程を整える",
    advisor: "規程のひな形を提供",
    ciso: "自社用のポリシーを策定",
  },
  {
    en: "SECURITY AWARENESS",
    title: "セキュリティ教育・啓発",
    plain: "決めたルールを全社員に浸透させる",
    advisor: "説明資料のひな形を提供",
    ciso: "全社員向け説明会を実施",
  },
  {
    en: "SUPPLY CHAIN SECURITY",
    title: "サプライチェーンセキュリティ対応",
    plain: "チェックシート回答と取引先への説明",
    advisor: "回答方法を助言",
    ciso: "チェックシート回答を作成",
  },
];

/* 白の線アイコン(各ステップ) */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons: ReactNode[] = [
  // リスクアセスメント: 棒グラフ + 虫めがね
  <svg key="0" viewBox="0 0 40 40" className="h-full w-full">
    <path {...stroke} d="M6 33h28M10 33V22M16 33V16M22 33v-8" />
    <circle {...stroke} cx="27" cy="13" r="6" />
    <path {...stroke} d="M31.5 17.5L36 22" />
  </svg>,
  // ポリシー策定: 書類 + チェック
  <svg key="1" viewBox="0 0 40 40" className="h-full w-full">
    <path {...stroke} d="M10 5h14l7 7v23H10z" />
    <path {...stroke} d="M24 5v7h7M14 18h12M14 23h12" />
    <path {...stroke} d="M14 29l3 3 6-6" />
  </svg>,
  // 教育・啓発: ボードと人
  <svg key="2" viewBox="0 0 40 40" className="h-full w-full">
    <rect {...stroke} x="12" y="5" width="23" height="15" rx="1.5" />
    <path {...stroke} d="M16 11h10M16 15h14" />
    <circle {...stroke} cx="8" cy="20" r="3.5" />
    <path {...stroke} d="M2 35c0-5 2.7-8 6-8s6 3 6 8M14 27l6-5" />
    <circle {...stroke} cx="27" cy="29" r="2.5" />
    <path {...stroke} d="M22.5 36c0-3 2-5 4.5-5s4.5 2 4.5 5" />
  </svg>,
  // サプライチェーン: つながる会社
  <svg key="3" viewBox="0 0 40 40" className="h-full w-full">
    <rect {...stroke} x="15" y="4" width="10" height="10" rx="1" />
    <rect {...stroke} x="4" y="26" width="10" height="10" rx="1" />
    <rect {...stroke} x="26" y="26" width="10" height="10" rx="1" />
    <path {...stroke} d="M20 14v6M9 26v-6h22v6" />
  </svg>,
];

/* 円の中のステップ名の改行位置(文言は steps.title と同じ) */
const lines = [
  ["リスク", "アセスメント"],
  ["ポリシー策定・", "AIガバナンス"],
  ["セキュリティ", "教育・啓発"],
  ["サプライチェーン", "セキュリティ対応"],
];

/* 円の上の4ノードの位置(上→右→下→左 = 時計回り) */
const pos = [
  { left: "50%", top: "12%" },
  { left: "88%", top: "50%" },
  { left: "50%", top: "88%" },
  { left: "12%", top: "50%" },
];

function Cycle() {
  const arrows = [-45, 45, 135, 225].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: 50 + 38 * Math.cos(rad),
      y: 50 + 38 * Math.sin(rad),
      rot: deg + 90,
    };
  });
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px] text-white"
      role="img"
      aria-label="リスクアセスメント、ポリシー策定・AIガバナンス、セキュリティ教育・啓発、サプライチェーンセキュリティ対応の4ステップを、継続的にまわします"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.35"
          strokeDasharray="1.2 1.4"
        />
        {arrows.map((a) => (
          <path
            key={a.rot}
            d="M-1.4 -1.8L1 0L-1.4 1.8"
            fill="none"
            stroke="#fff"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={`translate(${a.x} ${a.y}) rotate(${a.rot})`}
          />
        ))}
      </svg>

      {/* 中央 */}
      <div className="absolute left-1/2 top-1/2 flex w-[42%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <svg viewBox="0 0 48 56" className="h-auto w-[34%]" aria-hidden="true">
          <path
            d="M24 3L44 10v15c0 13-8.5 23-20 28C12.5 48 4 38 4 25V10z"
            fill="#fff"
          />
          <path
            d="M15 28l6.5 6.5L33 22"
            fill="none"
            stroke="#5A142C"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-[6%] text-[clamp(1.1rem,4.4vw,2rem)] font-black leading-none tracking-[0.02em]">
          Bond AI
          <span className="mt-[0.3em] block text-[0.62em] tracking-[0.06em]">
            セキュリティ
          </span>
        </p>
        <p className="mt-[5%] whitespace-nowrap text-[clamp(0.6rem,2vw,0.85rem)] font-bold tracking-[0.04em] text-white/85">
          CISO／セキュリティ顧問
        </p>
      </div>

      {/* 4ステップ */}
      {steps.map((s, i) => (
        <div
          key={s.en}
          className="absolute flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/70 bg-[#2A0B17] px-[3%] text-center"
          style={pos[i]}
        >
          <span className="block h-auto w-[30%]">{icons[i]}</span>
          <span className="mt-[5%] block text-[clamp(0.5rem,1.7vw,0.68rem)] font-bold tracking-[0.12em] text-white/70">
            STEP {i + 1}
          </span>
          <span className="mt-[2%] block text-[clamp(0.62rem,2.4vw,0.9rem)] font-bold leading-[1.35]">
            {lines[i].map((l) => (
              <span key={l} className="block whitespace-nowrap">
                {l}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CisoServiceDiagram() {
  return (
    <figure
      className="relative isolate overflow-hidden rounded-[12px] text-white"
      aria-labelledby="ciso-diagram-title"
    >
      <Image
        src="/photos/ciso/governance.webp"
        alt=""
        fill
        sizes="(max-width:1280px) 100vw, 1200px"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#24070F]/[0.88]"
      />

      <div className="grid items-center gap-10 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-12 lg:py-16">
        <Cycle />

        <div className="min-w-0">
          <p className="text-xs font-bold tracking-[0.2em] text-white/75">
            SECURITY GOVERNANCE
          </p>
          <h3
            id="ciso-diagram-title"
            className="mt-3 text-[clamp(1.5rem,3vw,2.3rem)] font-black leading-[1.45] [word-break:auto-phrase]"
          >
            セキュリティの専門家が、御社の担当につきます
          </h3>
          <span
            aria-hidden="true"
            className="mt-5 block h-[3px] w-16 bg-white"
          />

          {/* プラン別の対応表 */}
          <table className="mt-7 w-full border-collapse lg:[word-break:auto-phrase] text-left text-[12px] leading-snug md:text-[13px]">
            <caption className="sr-only">
              ステップごとの、セキュリティ顧問と社外CISOの対応内容
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[38%] pb-2 pr-2 align-bottom text-[11px] font-bold tracking-[0.1em] text-white/60"
                >
                  STEP
                </th>
                <th
                  scope="col"
                  className="w-[31%] bg-white/10 px-2.5 py-2 align-bottom"
                >
                  <span className="block font-bold">セキュリティ顧問</span>
                  <span className="block text-[11px] font-medium text-white/70">
                    助言で支える
                  </span>
                </th>
                <th
                  scope="col"
                  className="w-[31%] bg-[#7A1F3D] px-2.5 py-2 align-bottom"
                >
                  <span className="block font-bold">社外CISO</span>
                  <span className="block text-[11px] font-bold text-white/85">
                    代わりに進める
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {steps.map((s, i) => (
                <tr key={s.en} className="border-t border-white/15">
                  <th scope="row" className="py-3 pr-2 align-top font-normal">
                    <span className="block text-[10px] font-bold tracking-[0.1em] text-white/60">
                      STEP {i + 1}
                      <span className="hidden md:inline">｜{s.en}</span>
                    </span>
                    <span className="mt-0.5 block font-bold">{s.title}</span>
                    <span className="mt-0.5 block text-[11px] text-white/65">
                      {s.plain}
                    </span>
                  </th>
                  <td className="bg-white/[0.06] px-2.5 py-3 align-top text-white/85">
                    {s.advisor}
                  </td>
                  <td className="bg-[#7A1F3D]/60 px-2.5 py-3 align-top font-bold">
                    {s.ciso}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 border-l-4 border-white px-4 py-1">
            <p className="text-[11px] font-bold tracking-[0.2em] text-white/70">
              INCIDENT RESPONSE
            </p>
            <p className="mt-1 text-[15px] font-bold leading-snug md:text-base">
              もしもの時も相談できます（社外CISOは初動を助言）
            </p>
          </div>

          <figcaption className="mt-5 text-[13px] leading-relaxed text-white/80">
            <span aria-hidden="true">↻ </span>
            継続的改善：毎月の定例で見直し、年1回もう一度リスクアセスメントを行います
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
