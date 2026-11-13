/**
 * Bond AI LP「サービス概要」の全体像の図(画像を使わず HTML/CSS で構成)。
 * 「セキュリティ顧問」と「社外CISO」はやることの順番(4ステップ)が同じで、
 * 違うのは「どこまで任せられるか」であることを示す。
 *
 * PC(md以上): 上の帯 → 4ステップ(横並び・右向き矢印) → 列をそろえたプラン比較2段 → 下の帯
 * スマホ: ステップを縦に並べ(下向き矢印)、各カードの中に「顧問／社外CISO」の2行を入れる
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

const C = {
  wine: "#7A1F3D",
  wineDark: "#5A142C",
  winePale: "#F5E9ED",
  text: "#1F1A1C",
  sub: "#5C5458",
  line: "#E9E1DD",
  bg: "#FBF8F6",
  grayRow: "#F1EFEC",
};

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 24" className="h-5 w-4" fill="none">
      <path
        d="M4 4l8 8-8 8"
        stroke={C.wine}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 16" className="h-4 w-6" fill="none">
      <path
        d="M4 4l8 8 8-8"
        stroke={C.wine}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepCard({ s, i }: { s: (typeof steps)[number]; i: number }) {
  return (
    <div
      className="h-full rounded-[12px] border bg-white p-4 lg:p-5"
      style={{ borderColor: C.line }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.14em] lg:text-[11px]"
        style={{ color: C.wine }}
      >
        STEP {i + 1}｜{s.en}
      </p>
      <h4
        className="mt-2 text-[15px] font-bold leading-snug lg:text-base"
        style={{ color: C.text }}
      >
        {s.title}
      </h4>
      <p
        className="mt-1.5 text-[13px] leading-relaxed"
        style={{ color: C.sub }}
      >
        {s.plain}
      </p>
    </div>
  );
}

export function CisoServiceDiagram() {
  return (
    <figure
      className="rounded-[12px] border p-4 md:p-6 lg:p-8"
      style={{ backgroundColor: C.bg, borderColor: C.line, color: C.text }}
      aria-labelledby="ciso-diagram-title"
    >
      {/* 1. 上の帯 */}
      <div
        className="rounded-[12px] px-5 py-5 text-center text-white md:py-6"
        style={{ backgroundColor: C.wine }}
      >
        <p className="text-[11px] font-bold tracking-[0.2em] md:text-xs">
          SECURITY GOVERNANCE
        </p>
        <h3
          id="ciso-diagram-title"
          className="mt-1.5 text-lg font-bold leading-snug md:text-2xl"
        >
          セキュリティの専門家が、御社の担当につきます
        </h3>
      </div>

      {/* 2〜3. PC: ステップ + プラン比較(列をそろえる) */}
      <div className="mt-5 hidden gap-y-3 md:grid md:grid-cols-[7.5rem_1fr_1.25rem_1fr_1.25rem_1fr_1.25rem_1fr] lg:grid-cols-[10rem_1fr_1.75rem_1fr_1.75rem_1fr_1.75rem_1fr]">
        {/* ステップの行 */}
        <div aria-hidden="true" />
        {steps.map((s, i) => (
          <div key={s.en} className="contents">
            <StepCard s={s} i={i} />
            {i < steps.length - 1 ? (
              <div className="flex items-center justify-center">
                <ArrowRight />
              </div>
            ) : null}
          </div>
        ))}

        {/* 顧問の段 */}
        <div
          className="flex flex-col justify-center rounded-l-[12px] px-3 py-3 lg:px-4"
          style={{ backgroundColor: C.grayRow }}
        >
          <p className="text-sm font-bold" style={{ color: "#3B3537" }}>
            セキュリティ顧問
          </p>
          <p className="text-xs" style={{ color: C.sub }}>
            助言で支える
          </p>
        </div>
        {steps.map((s, i) => (
          <div key={`a-${s.en}`} className="contents">
            <div
              className={`flex items-center px-3 py-3 text-[13px] leading-snug lg:px-4 lg:text-sm ${i === steps.length - 1 ? "rounded-r-[12px]" : ""}`}
              style={{ backgroundColor: C.grayRow, color: "#3B3537" }}
            >
              {s.advisor}
            </div>
            {i < steps.length - 1 ? (
              <div aria-hidden="true" style={{ backgroundColor: C.grayRow }} />
            ) : null}
          </div>
        ))}

        {/* 社外CISOの段 */}
        <div
          className="flex flex-col justify-center rounded-l-[12px] px-3 py-3 lg:px-4"
          style={{ backgroundColor: C.winePale }}
        >
          <p className="text-sm font-bold" style={{ color: C.wineDark }}>
            社外CISO
          </p>
          <p className="text-xs font-bold" style={{ color: C.wineDark }}>
            代わりに進める
          </p>
        </div>
        {steps.map((s, i) => (
          <div key={`c-${s.en}`} className="contents">
            <div
              className={`flex items-center px-3 py-3 text-[13px] font-bold leading-snug lg:px-4 lg:text-sm ${i === steps.length - 1 ? "rounded-r-[12px]" : ""}`}
              style={{ backgroundColor: C.winePale, color: C.wineDark }}
            >
              {s.ciso}
            </div>
            {i < steps.length - 1 ? (
              <div aria-hidden="true" style={{ backgroundColor: C.winePale }} />
            ) : null}
          </div>
        ))}
      </div>

      {/* 2〜3. スマホ: ステップを縦に、各カードに2プランの中身 */}
      <ol className="mt-4 md:hidden">
        {steps.map((s, i) => (
          <li key={`m-${s.en}`}>
            <div
              className="rounded-[12px] border bg-white p-4"
              style={{ borderColor: C.line }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ color: C.wine }}
              >
                STEP {i + 1}｜{s.en}
              </p>
              <h4 className="mt-1.5 text-base font-bold leading-snug">
                {s.title}
              </h4>
              <p
                className="mt-1 text-[13px] leading-relaxed"
                style={{ color: C.sub }}
              >
                {s.plain}
              </p>
              <dl className="mt-3 space-y-1.5 text-[13px] leading-snug">
                <div
                  className="flex gap-2 rounded-md px-3 py-2"
                  style={{ backgroundColor: C.grayRow, color: "#3B3537" }}
                >
                  <dt className="shrink-0 font-bold">顧問：</dt>
                  <dd>{s.advisor}</dd>
                </div>
                <div
                  className="flex gap-2 rounded-md px-3 py-2 font-bold"
                  style={{ backgroundColor: C.winePale, color: C.wineDark }}
                >
                  <dt className="shrink-0">社外CISO：</dt>
                  <dd>{s.ciso}</dd>
                </div>
              </dl>
            </div>
            {i < steps.length - 1 ? (
              <div className="flex justify-center py-1.5">
                <ArrowDown />
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      {/* 4. 下の帯 */}
      <div
        className="mt-5 rounded-[12px] px-5 py-4 text-center md:py-5"
        style={{ backgroundColor: C.grayRow }}
      >
        <p
          className="text-[11px] font-bold tracking-[0.2em]"
          style={{ color: C.sub }}
        >
          INCIDENT RESPONSE
        </p>
        <h3
          className="mt-1 text-base font-bold leading-snug md:text-lg"
          style={{ color: C.text }}
        >
          もしもの時も相談できます（社外CISOは初動を助言）
        </h3>
      </div>

      {/* 5. 継続的改善 */}
      <figcaption
        className="mt-4 text-center text-[13px] leading-relaxed md:text-sm"
        style={{ color: C.sub }}
      >
        <span aria-hidden="true">↻ </span>
        継続的改善：毎月の定例で見直し、年1回もう一度リスクアセスメントを行います
      </figcaption>
    </figure>
  );
}
