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
 * Bond AI 情報セキュリティ顧問 LP「選ばれる理由」の動く図(画像の代わり)。
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
      className="relative overflow-hidden rounded-xl bg-[linear-gradient(160deg,#FBF3F5,#F3E3E8)] p-5 sm:p-7"
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

function Building({ big }: { big?: boolean }) {
  return big ? (
    <svg viewBox="0 0 80 72" className="h-full w-full" aria-hidden="true">
      <rect
        x="4"
        y="22"
        width="18"
        height="46"
        fill="#F1DDE3"
        stroke={W}
        strokeWidth="2.5"
      />
      <rect
        x="58"
        y="22"
        width="18"
        height="46"
        fill="#F1DDE3"
        stroke={W}
        strokeWidth="2.5"
      />
      <rect
        x="20"
        y="8"
        width="40"
        height="60"
        fill="#fff"
        stroke={W}
        strokeWidth="2.5"
      />
      <rect x="26" y="3" width="28" height="6" fill={W} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            x={26 + c * 10}
            y={15 + r * 10}
            width="6"
            height="5"
            fill="#D7A3B3"
          />
        )),
      )}
      <rect x="35" y="55" width="10" height="13" fill={W} />
    </svg>
  ) : (
    <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden="true">
      <rect
        x="12"
        y="10"
        width="36"
        height="46"
        fill="#fff"
        stroke={W}
        strokeWidth="2.5"
      />
      {[0, 1].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            x={17 + c * 10}
            y={16 + r * 9}
            width="6"
            height="5"
            fill="#D7A3B3"
          />
        )),
      )}
      <rect x="20" y="36" width="20" height="5" fill={W} />
      <rect x="24" y="41" width="12" height="15" fill="#E9C9D3" />
      <circle cx="7" cy="44" r="5" fill={W} />
      <rect x="6" y="46" width="2" height="10" fill={W} />
    </svg>
  );
}

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

/* ========================================================= 01 取引先に出せるものがそろう */

export function ReasonDocs() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const docs = [
    {
      t: "チェック\nシート",
      icon: (
        <g {...stroke}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 12l3 3 6-6" />
        </g>
      ),
    },
    {
      t: "体制の\nご案内",
      icon: (
        <g {...stroke}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4M9 12h6M9 16h6" />
        </g>
      ),
    },
    {
      t: "体制図",
      icon: (
        <g {...stroke}>
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="19" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <path d="M12 7.5v5M5 16.5V13h14v3.5" />
        </g>
      ),
    },
  ];
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="自社のチェックシート・体制のご案内・体制図を整え、大手企業・上場企業との取引機会につなげる図"
      >
        <div className="flex items-end justify-between gap-1 sm:gap-2">
          {/* 自社 */}
          <Pop
            show={inView}
            delay={0}
            className="flex w-[14%] flex-col items-center sm:w-[18%]"
          >
            <div className="aspect-square w-full">
              <Building />
            </div>
            <p className="mt-2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-black text-ink sm:text-xs">
              自社
            </p>
          </Pop>

          <Arrow show={inView} delay={300} />

          {/* 整える資料 */}
          <div className="relative flex w-[52%] flex-col items-center sm:w-[46%]">
            <Pop
              show={inView}
              delay={1300}
              className="absolute -top-7 left-1/2 z-10 -translate-x-1/2"
            >
              <svg viewBox="0 0 24 28" className="h-8 w-7" aria-hidden="true">
                <path
                  d="M12 1l10 4v8c0 7-4.5 11.5-10 14C6.5 24.5 2 20 2 13V5z"
                  fill={W}
                />
                <path
                  d="M7.5 13.5l3 3 6-6"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Pop>
            <div className="grid w-full grid-cols-3 gap-1 rounded-xl bg-white/70 p-1.5 sm:gap-2 sm:p-2.5">
              {docs.map((d, i) => (
                <Pop
                  key={d.t}
                  show={inView}
                  delay={500 + i * 220}
                  className="relative flex flex-col items-center rounded-lg bg-white px-0.5 pb-2 pt-3 text-center ring-1 ring-[#EEDFE3]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-[#7A1F3D] sm:h-7 sm:w-7"
                    aria-hidden="true"
                  >
                    {d.icon}
                  </svg>
                  <p className="mt-1.5 whitespace-pre text-[8.5px] font-black leading-tight text-ink sm:text-[11px]">
                    {d.t}
                  </p>
                  <span
                    aria-hidden="true"
                    className={`absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#1E8A57] text-[9px] text-white transition-transform duration-500 ${inView ? "scale-100" : "scale-0"}`}
                    style={{ transitionDelay: `${900 + i * 220}ms` }}
                  >
                    ✓
                  </span>
                </Pop>
              ))}
            </div>
            <p className="mt-2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-center text-[8.5px] font-black text-ink sm:text-[11px]">
              資料・体制を整備
            </p>
          </div>

          <Arrow show={inView} delay={1500} />

          {/* 大手企業 */}
          <Pop
            show={inView}
            delay={1700}
            className="flex w-[20%] flex-col items-center sm:w-[22%]"
          >
            <div className="relative aspect-square w-full">
              <Building big />
              <span
                aria-hidden="true"
                className={`absolute inset-0 rounded-full ${inView ? "rv-glow" : ""}`}
              />
            </div>
            <p className="mt-2 rounded-full bg-[#7A1F3D] px-1.5 py-1 text-center text-[8px] font-black leading-tight text-white sm:whitespace-nowrap sm:px-2 sm:text-[11px]">
              大手企業・上場企業
            </p>
          </Pop>
        </div>

        {/* 取引機会につなげる */}
        <Pop show={inView} delay={2100} className="mt-5 flex justify-center">
          <p className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#7A1F3D] shadow-[0_6px_16px_-10px_rgba(122,31,61,0.6)] sm:text-sm">
            <svg
              viewBox="0 0 24 24"
              className="rv-shake h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M2 12l4-4 4 2 3-2 3 1 4-1 2 3-6 6c-1 1-2 1-3 0l-1-1-1 1c-1 1-2 1-3 0z"
                fill="none"
                stroke={W}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            取引機会につなげる
          </p>
        </Pop>
      </div>
    </Frame>
  );
}

/* ========================================================= 02 社員のAI利用の管理 */

function CountUp({
  to,
  run,
  decimals = 1,
}: {
  to: number;
  run: boolean;
  decimals?: number;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{v.toFixed(decimals)}</>;
}

export function ReasonAiManagement() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const rows = ["文章作成AI", "議事録AI", "画像生成AI"];
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="AI利用ルールとAIシステム台帳で、社内で使うAIを一つずつ確認して管理する図。AIの明確な責任者を決めている大手企業は26.8%"
        className="grid grid-cols-[1fr_1.15fr] items-center gap-3 sm:gap-5"
      >
        {/* 左: ルールと台帳 → AIを確認 */}
        <div className="relative">
          <Pop show={inView} delay={0} className="relative z-10 mx-auto w-fit">
            <div className="rv-float grid h-14 w-14 place-items-center rounded-2xl bg-[#7A1F3D] text-lg font-black text-white shadow-[0_10px_20px_-10px_rgba(122,31,61,0.8)] sm:h-16 sm:w-16 sm:text-xl">
              AI
            </div>
          </Pop>
          <svg
            viewBox="0 0 100 30"
            className="mx-auto -mt-1 h-6 w-3/4"
            aria-hidden="true"
          >
            <path
              d="M50 0V14M20 30V14h60v16"
              fill="none"
              stroke={W}
              strokeWidth="2"
              strokeDasharray="3 3"
              className="rv-dash"
            />
          </svg>
          <div className="grid grid-cols-2 gap-2">
            {[
              { t: "AI利用\nルール", d: 300 },
              { t: "AIシステム\n台帳", d: 450 },
            ].map((b) => (
              <Pop
                key={b.t}
                show={inView}
                delay={b.d}
                className="rounded-lg border-2 border-[#7A1F3D] bg-white px-1 py-3 text-center"
              >
                <p className="whitespace-pre-line text-[10px] font-black leading-tight text-[#7A1F3D] sm:text-xs">
                  {b.t}
                </p>
              </Pop>
            ))}
          </div>
          {/* 台帳のチェック */}
          <Pop
            show={inView}
            delay={600}
            className="mt-3 rounded-lg bg-white p-2.5 ring-1 ring-[#EEDFE3]"
          >
            <ul className="space-y-1.5">
              {rows.map((r, i) => (
                <li
                  key={r}
                  className="flex items-center gap-2 text-[10px] font-bold text-ink sm:text-[11px]"
                >
                  <span
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded border-2 border-[#7A1F3D] text-[9px] font-black text-white transition-colors duration-300 ${
                      inView ? "bg-[#7A1F3D]" : "bg-white"
                    }`}
                    style={{ transitionDelay: `${1000 + i * 350}ms` }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Pop>
        </div>

        {/* 右: 数字 */}
        <Pop
          show={inView}
          delay={900}
          className="relative rounded-2xl border-2 border-[#7A1F3D] bg-white px-3 py-4 text-center sm:px-4 sm:py-5"
        >
          <p className="text-[10px] font-black leading-snug text-ink sm:text-xs">
            AIの明確な責任者を
            <br />
            決めている大手企業は
          </p>
          <p className="mt-1 font-black leading-none text-[#7A1F3D]">
            <span className="text-[2.4rem] tracking-tight sm:text-[3rem]">
              <CountUp to={26.8} run={inView} />
            </span>
            <span className="text-lg sm:text-xl">%</span>
          </p>
          {/* 割合バー */}
          <div className="mx-auto mt-3 h-2 w-full overflow-hidden rounded-full bg-[#EEDFE3]">
            <div
              className="h-full rounded-full bg-[#7A1F3D] transition-[width] duration-[1400ms] ease-out"
              style={{
                width: inView ? "26.8%" : "0%",
                transitionDelay: "900ms",
              }}
            />
          </div>
          <p className="mt-2 text-[9px] text-ink/55">
            残りの約7割は、責任者が決まっていない
          </p>
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-b-2 border-r-2 border-[#7A1F3D] bg-white"
          />
        </Pop>
      </div>
    </Frame>
  );
}

/* ========================================================= 03 必要な対策に絞る */

export function ReasonFocus() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const all = [
    { t: "大企業向けの規程一式", keep: false },
    { t: "AI利用ルール", keep: true },
    { t: "多段階の承認手続き", keep: false },
    { t: "チェックシートの回答", keep: true },
    { t: "全部門の個別マニュアル", keep: false },
    { t: "事故時の初動手順", keep: true },
  ];
  const kept = all.filter((a) => a.keep);
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="大企業と同じ対策をすべて入れるのではなく、初回アセスメントで優先順位を決め、取引先に求められる必要な対策に絞る図"
        className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4"
      >
        {/* 左: 大企業と同じ対策を全部 */}
        <div>
          <p className="mb-2 text-center text-[10px] font-black text-ink/55 sm:text-[11px]">
            大企業と同じ対策を全部
          </p>
          <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-1">
            {all.map((a, i) => (
              <li
                key={a.t}
                className={`rounded-md px-2 py-1.5 text-[10px] font-bold leading-tight ring-1 transition-all duration-500 sm:text-[11px] ${
                  inView && !a.keep
                    ? "bg-[#F4F1F2] text-ink/35 line-through ring-[#ECE6E8]"
                    : "bg-white text-ink ring-[#EEDFE3]"
                }`}
                style={{ transitionDelay: `${1200 + i * 120}ms` }}
              >
                {a.t}
              </li>
            ))}
          </ul>
          <div className="mt-2 rounded-md bg-white px-2 py-1.5 text-center ring-1 ring-[#EEDFE3]">
            <p className="text-[9px] font-bold text-ink/55">費用・手間</p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEDFE3]">
              <div className="h-full w-full rounded-full bg-[#B9A9AF]" />
            </div>
          </div>
        </div>

        {/* 中: 初回アセスメントで絞る */}
        <Pop
          show={inView}
          delay={400}
          className="flex items-center justify-center gap-3 sm:flex-col sm:gap-0"
        >
          <svg
            viewBox="0 0 48 64"
            className="h-12 w-9 sm:h-20 sm:w-14"
            aria-hidden="true"
          >
            <path d="M4 6h40L28 30v20l-8 6V30z" fill={W} />
            <path
              d="M10 10h28"
              stroke="#fff"
              strokeOpacity="0.5"
              strokeWidth="2"
            />
          </svg>
          <p className="whitespace-nowrap rounded-full sm:mt-1 bg-[#7A1F3D] px-2 py-1 text-[9px] font-black text-white sm:text-[10px]">
            初回アセスメント
          </p>
          <svg
            viewBox="0 0 40 16"
            className="h-4 w-8 rotate-90 sm:mt-2 sm:rotate-0"
            aria-hidden="true"
          >
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
        </Pop>

        {/* 右: 必要な対策だけ */}
        <div>
          <p className="mb-2 text-center text-[10px] font-black text-[#7A1F3D] sm:text-[11px]">
            必要な対策に絞る
          </p>
          <ol className="grid gap-2">
            {kept.map((a, i) => (
              <Pop
                key={a.t}
                show={inView}
                delay={2000 + i * 250}
                className="flex items-center gap-1.5 rounded-md bg-white px-2 py-2 ring-2 ring-[#7A1F3D]"
              >
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#7A1F3D] text-[9px] font-black text-white">
                  {i + 1}
                </span>
                <span className="text-[10px] font-black leading-tight text-ink sm:text-[11px]">
                  {a.t}
                </span>
              </Pop>
            ))}
          </ol>
          <div className="mt-2 rounded-md bg-white px-2 py-1.5 text-center ring-1 ring-[#EEDFE3]">
            <p className="text-[9px] font-bold text-[#7A1F3D]">費用・手間</p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEDFE3]">
              <div
                className="h-full rounded-full bg-[#7A1F3D] transition-[width] duration-[1200ms] ease-out"
                style={{
                  width: inView ? "38%" : "100%",
                  transitionDelay: "2600ms",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
