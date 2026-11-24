"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

/**
 * セキュプロ 情報セキュリティ顧問 LP「選ばれる理由」の動く図(画像の代わり)。
 * 画面に入ると順番に現れ、その後は点線が流れる・チェックが入る・数字が数え上がるなどの小さな動きを続ける。
 * 動きを減らす設定の端末では、最初から完成した状態で表示する。
 */

const W = "#7A1F3D";

/** 画面に入ったら true */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/** 順番に現れる */
function Pop({
  show,
  delay,
  children,
  className = "",
  style,
}: {
  show: boolean;
  delay: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(.34,1.4,.64,1)] ${
        show
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-3 scale-90 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

function Frame({
  children,
  inner,
}: {
  children: ReactNode;
  inner?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={inner}
      className="relative overflow-hidden bg-[linear-gradient(160deg,#FBF3F5,#F3E3E8)] p-4 sm:p-7"
    >
      {children}
    </div>
  );
}

/* ---------------- 小さなアイコン ---------------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Arrow({ show, delay }: { show: boolean; delay: number }) {
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <svg viewBox="0 0 40 16" className="h-4 w-8 sm:w-10">
        <path
          d="M2 8h30"
          stroke={W}
          strokeWidth="3"
          strokeDasharray="4 4"
          className="rv-dash"
        />
        <path
          d="M28 2l8 6-8 6"
          fill="none"
          stroke={W}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ---------------- 共通 ---------------- */

function Chip({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "wine" | "gray";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-black leading-tight sm:text-[11px] ${
        tone === "wine"
          ? "bg-[#7A1F3D] text-white"
          : tone === "gray"
            ? "bg-[#ECE7E9] text-ink/55"
            : "bg-white text-ink ring-1 ring-[#EEDFE3]"
      } ${className}`}
    >
      {children}
    </span>
  );
}

function PersonIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" fill="currentColor" />
      <path
        d="M4.5 20.5c.9-4 3.8-6.3 7.5-6.3s6.6 2.3 7.5 6.3z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ========================================================= 01 着手すべき対策の特定から */

export function ReasonPriority() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const mess = [
    { t: "AIの利用ルール", x: "4%", y: "6%" },
    { t: "取引先のチェックシート", x: "34%", y: "22%" },
    { t: "パスワード管理", x: "2%", y: "40%" },
    { t: "ホームページの弱点", x: "30%", y: "58%" },
    { t: "事故時の手順", x: "6%", y: "76%" },
  ];
  const ranked = [
    { t: "取引先のチェックシート", lv: "高", w: "92%" },
    { t: "AIの利用ルール", lv: "高", w: "80%" },
    { t: "事故時の手順", lv: "中", w: "58%" },
  ];
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="何から取り組むべきか決まっていない状態から、現状とリスクを整理して優先順位をつけ、課題に適したプロ人材を提案する図"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
          {/* 左: 決まっていない */}
          <div>
            <p className="mb-2 text-center text-[10px] font-black text-ink/50 sm:text-[11px]">
              何から始める？
            </p>
            <div className="relative h-40 bg-white/60 ring-1 ring-[#EEDFE3] sm:h-44">
              {mess.map((m, i) => (
                <span
                  key={m.t}
                  className="sv-float absolute"
                  style={{ left: m.x, top: m.y, animationDelay: `${i * 0.6}s` }}
                >
                  <Chip tone="gray">{m.t}</Chip>
                </span>
              ))}
            </div>
          </div>

          {/* 中: 整理 */}
          <Pop
            show={inView}
            delay={300}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="grid h-10 w-10 place-items-center bg-[#7A1F3D] text-white sm:h-11 sm:w-11">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M15 15l5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-center text-[9px] font-black leading-tight text-[#7A1F3D] sm:text-[10px]">
              現状と
              <br />
              リスクを整理
            </span>
            <Arrow show={inView} delay={500} />
          </Pop>

          {/* 右: 優先順位 */}
          <div>
            <p className="mb-2 text-center text-[10px] font-black text-[#7A1F3D] sm:text-[11px]">
              優先順位
            </p>
            <ol className="space-y-2">
              {ranked.map((r, i) => (
                <Pop
                  key={r.t}
                  show={inView}
                  delay={800 + i * 260}
                  className="bg-white px-2.5 py-2 ring-1 ring-[#EEDFE3]"
                >
                  <p className="flex items-center gap-1.5 text-[10px] font-black leading-tight text-ink sm:text-[11px]">
                    <span className="grid h-4 w-4 shrink-0 place-items-center bg-[#7A1F3D] text-[9px] text-white">
                      {i + 1}
                    </span>
                    {r.t}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="h-1.5 flex-1 overflow-hidden bg-[#EEDFE3]">
                      <div
                        className="h-full bg-[#7A1F3D] transition-[width] duration-1000 ease-out"
                        style={{
                          width: inView ? r.w : "0%",
                          transitionDelay: `${1000 + i * 260}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[9px] font-bold text-ink/55">
                      優先度 {r.lv}
                    </span>
                  </div>
                </Pop>
              ))}
            </ol>
          </div>
        </div>

        {/* 提案 */}
        <Pop show={inView} delay={1900} className="mt-5 flex justify-center">
          <p className="flex items-center gap-2 bg-[#7A1F3D] px-4 py-2 text-xs font-black text-white sm:text-sm">
            <PersonIcon />
            課題に適したプロ人材をご提案
          </p>
        </Pop>
      </div>
    </Frame>
  );
}

/* ========================================================= 02 必要な対策に絞り、最小限のコストに */

export function ReasonPhase() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const phases = [
    { p: "フェーズ1", t: "体制づくり", pro: "社外CISO", h: "70%" },
    { p: "フェーズ2", t: "認証の取得準備", pro: "認証・SCSの専門家", h: "92%" },
    { p: "フェーズ3", t: "診断と運用", pro: "診断エンジニア", h: "45%" },
  ];
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="フェーズごとに必要なプロ人材が、必要な稼働量だけ対応し、フェーズが進めばプロを入れ替える図。合わない場合の交代は無料"
      >
        <p className="text-[10px] font-black tracking-[0.12em] text-ink/50 sm:text-[11px]">
          稼働量（イメージ）
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
          {phases.map((ph, i) => (
            <div key={ph.p} className="flex flex-col items-center">
              {/* 稼働のバー */}
              <div className="relative flex h-28 w-full items-end justify-center border-b-2 border-ink/20 sm:h-32">
                <div
                  className="w-3/5 origin-bottom bg-[#7A1F3D] transition-transform duration-700 ease-out"
                  style={{
                    height: ph.h,
                    transform: inView ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: `${300 + i * 350}ms`,
                    opacity: 0.55 + i * 0.15,
                  }}
                />
                {/* 担当するプロ(順番に光る) */}
                <span
                  aria-hidden="true"
                  className="hv-cycle absolute inset-x-1 -bottom-[2px] top-0 ring-2 ring-[#7A1F3D]"
                  style={{ animationDelay: `${i * 1.6}s` }}
                />
              </div>
              <p className="mt-2 text-[9px] font-bold text-[#7A1F3D] sm:text-[10px]">
                {ph.p}
              </p>
              <p className="text-center text-[10px] font-black leading-tight text-ink sm:text-[11px]">
                {ph.t}
              </p>
              <Pop show={inView} delay={600 + i * 350} className="mt-2 w-full">
                <span className="flex w-full flex-col items-center gap-1 bg-white px-1 py-2 text-center text-[9px] font-black leading-tight text-ink ring-1 ring-[#EEDFE3] sm:text-[10px]">
                  <PersonIcon className="h-4 w-4 text-[#7A1F3D]" />
                  {ph.pro}
                </span>
              </Pop>
            </div>
          ))}
        </div>
        <Pop
          show={inView}
          delay={1700}
          className="mt-4 flex flex-wrap justify-center gap-2"
        >
          <Chip tone="wine">必要な稼働量だけ</Chip>
          <Chip>フェーズに合わせてプロを入れ替え</Chip>
          <Chip>合わない場合の交代は無料</Chip>
        </Pop>
      </div>
    </Frame>
  );
}

/* ========================================================= 03 情報セキュリティ特化。窓口と契約はひとつ */

export function ReasonOneWindow() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const pros = ["社外CISO", "認証・SCSの専門家", "診断エンジニア"];
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="複数の情報セキュリティのプロ人材が関わっても、窓口と契約はセキュプロひとつで、監修者が品質を確認する図"
        className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_0.8fr]"
      >
        {/* プロ人材 */}
        <div className="grid grid-cols-3 gap-1.5 sm:block sm:space-y-2">
          {pros.map((p, i) => (
            <Pop key={p} show={inView} delay={i * 180}>
              <span className="flex items-center gap-1.5 bg-white px-2 py-2 text-[9px] font-black leading-tight text-ink ring-1 ring-[#EEDFE3] sm:text-[11px]">
                <PersonIcon className="h-4 w-4 shrink-0 text-[#7A1F3D]" />
                {p}
              </span>
            </Pop>
          ))}
        </div>
        <div className="flex justify-center rotate-90 sm:rotate-0">
          <Arrow show={inView} delay={600} />
        </div>

        {/* セキュプロ */}
        <Pop
          show={inView}
          delay={800}
          className="relative mx-auto w-full max-w-[14rem] sm:max-w-none"
        >
          <div className="bg-[#7A1F3D] px-2 py-4 text-center text-white">
            <p className="whitespace-nowrap text-base font-black tracking-[0.06em]">
              セキュプロ
            </p>
            <p className="mt-1.5 border-t border-white/30 pt-1.5 text-[9px] font-bold leading-snug sm:text-[11px]">
              窓口・契約は
              <br />
              ひとつ
            </p>
          </div>
          {/* 監修者の確認 */}
          <span className="absolute -right-2 -top-3 flex items-center gap-1 bg-white px-1.5 py-1 text-[8px] font-black text-[#7A1F3D] ring-1 ring-[#7A1F3D] sm:text-[9px]">
            <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#1E8A57] text-[8px] text-white">
              ✓
            </span>
            監修者が品質確認
          </span>
        </Pop>
        <div className="flex justify-center rotate-90 sm:rotate-0">
          <Arrow show={inView} delay={1100} />
        </div>

        {/* 御社 */}
        <Pop
          show={inView}
          delay={1300}
          className="flex flex-col items-center text-center"
        >
          <span className="grid h-12 w-12 place-items-center bg-white ring-1 ring-[#EEDFE3] sm:h-14 sm:w-14">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 text-ink/70"
              aria-hidden="true"
            >
              <path
                d="M4 21V5h10v16M14 9h6v12M7 8h2M7 12h2M7 16h2M17 13h1M17 17h1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          <p className="mt-1.5 text-[10px] font-black text-ink sm:text-[11px]">
            御社
          </p>
          <p className="text-[8px] font-bold leading-tight text-ink/55 sm:text-[9px]">
            管理の負担を
            <br />
            増やさない
          </p>
        </Pop>
      </div>
    </Frame>
  );
}
