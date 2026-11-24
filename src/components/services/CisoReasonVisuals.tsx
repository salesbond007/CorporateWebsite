"use client";

import { SecuproMark } from "./SecuproMark";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import Image from "next/image";

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

/* ---------------- 写真の丸 ---------------- */

function Face({
  src,
  className = "h-12 w-12",
  ring = true,
}: {
  src: string;
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full bg-[#EEE7E9] ${ring ? "border-[3px] border-white shadow-[0_0_0_1.5px_#7A1F3D]" : ""} ${className}`}
    >
      <Image
        src={src}
        alt=""
        width={128}
        height={128}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

function CheckBadge({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-full bg-[#7A1F3D] text-white ${className}`}
    >
      <svg viewBox="0 0 16 16" className="h-[60%] w-[60%]" fill="none">
        <path
          d="M3 8.5l3 3 7-7"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ========================================================= 01 扱うのは、情報セキュリティのプロだけ */

const domains: { label: string; icon: ReactNode }[] = [
  {
    label: "責任者",
    icon: (
      <g {...stroke}>
        <circle cx="12" cy="7.5" r="3.4" />
        <path d="M5 21c.8-4 3.5-6.2 7-6.2s6.2 2.2 7 6.2" />
        <path d="M12 14.8l-1.3 2.8L12 20l1.3-2.4z" />
      </g>
    ),
  },
  {
    label: "認証",
    icon: (
      <g {...stroke}>
        <circle cx="12" cy="9" r="5.2" />
        <path d="M9.6 9l1.7 1.7 3.2-3.3" />
        <path d="M8.6 13.2L7.3 21l4.7-2.4 4.7 2.4-1.3-7.8" />
      </g>
    ),
  },
  {
    label: "診断",
    icon: (
      <g {...stroke}>
        <rect x="3" y="4" width="18" height="12.5" />
        <path d="M8.5 20.5h7M12 16.5v4" />
        <circle cx="11" cy="10" r="2.8" />
        <path d="M13 12l2.3 2.3" />
      </g>
    ),
  },
  {
    label: "研修",
    icon: (
      <g {...stroke}>
        <rect x="3" y="3.5" width="18" height="10" />
        <path d="M7 10l3-3 2.5 2.5L17 6" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </g>
    ),
  },
];

export function ReasonProsOnly() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="責任者・認証・診断・研修をはじめ、幅広い領域の情報セキュリティのプロをそろえ、窓口と契約はセキュプロひとつで御社とつながる図"
      >
        <Pop show={inView} delay={0}>
          <p className="text-center text-[12px] font-black text-[#7A1F3D] sm:text-[13px]">
            情報セキュリティに特化したプロ人材（例）
          </p>
        </Pop>
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {domains.map((d, i) => (
            <li key={d.label}>
              <Pop
                show={inView}
                delay={150 + i * 140}
                className="relative flex flex-col items-center bg-white px-1 pb-2.5 pt-3 ring-1 ring-[#EEDFE3]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 text-[#7A1F3D] sm:h-9 sm:w-9"
                  aria-hidden="true"
                >
                  {d.icon}
                </svg>
                <span className="mt-1.5 text-[11px] font-black text-ink sm:text-[13px]">
                  {d.label}
                </span>
                {/* 情報セキュリティのプロ(順にチェックが付く) */}
                <span
                  className={`absolute -right-1.5 -top-1.5 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${inView ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                  style={{ transitionDelay: `${1300 + i * 220}ms` }}
                >
                  <CheckBadge />
                </span>
              </Pop>
            </li>
          ))}
        </ul>

        <Pop show={inView} delay={800}>
          <p className="mt-3 text-center text-[11px] font-bold text-ink/65 sm:text-[12px]">
            このほかの領域も、幅広く対応します
          </p>
        </Pop>

        <div className="mt-3 flex justify-center">
          <span className="rotate-90">
            <Arrow show={inView} delay={2100} />
          </span>
        </div>

        <Pop
          show={inView}
          delay={2300}
          className="mt-3 flex items-stretch justify-center"
        >
          <span className="flex items-center gap-2 bg-[#7A1F3D] px-4 py-2.5 text-[12px] font-black text-white sm:text-sm">
            <SecuproMark className="h-6 w-6" />
            窓口・契約はセキュプロひとつ
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 text-[12px] font-black text-ink ring-1 ring-[#EEDFE3] sm:text-sm">
            御社
          </span>
        </Pop>
      </div>
    </Frame>
  );
}

/* ========================================================= 02 必要な対策に絞り、最小限のコストに */

const phases = [
  { name: "フェーズ1", pro: "顧問", w: 55 },
  { name: "フェーズ2", pro: "認証の専門家", w: 80 },
  { name: "フェーズ3", pro: "研修の講師", w: 35 },
];

export function ReasonCost() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="専任者を雇うと費用がずっと同じだけかかるのに対し、セキュプロはフェーズごとに必要なプロが必要な稼働量だけ対応する図"
      >
        <div className="grid grid-cols-[3.6rem_repeat(3,minmax(0,1fr))] gap-x-2 gap-y-2 sm:grid-cols-[6rem_repeat(3,minmax(0,1fr))] sm:gap-x-3">
          <span />
          {phases.map((p, i) => (
            <Pop key={p.name} show={inView} delay={i * 120}>
              <p className="text-center text-[10px] font-black tracking-wider text-ink/50 sm:text-[11px]">
                {p.name}
              </p>
            </Pop>
          ))}

          {/* 専任者を雇う場合 */}
          <Pop show={inView} delay={300} className="flex items-center">
            <p className="text-[11px] font-black leading-tight text-ink/55 sm:text-[12px]">
              専任者を
              <br />
              雇う場合
            </p>
          </Pop>
          <div className="col-span-3 flex h-12 items-center bg-white px-2 ring-1 ring-[#EEDFE3] sm:h-14">
            <span
              className={`flex h-7 items-center justify-center bg-[#BDB3B7] text-[10px] font-black text-white transition-[width] duration-1000 ease-out sm:h-8 sm:text-[11px] ${inView ? "w-full" : "w-0"}`}
              style={{ transitionDelay: "500ms" }}
            >
              <span className="whitespace-nowrap">同じ費用がずっとかかる</span>
            </span>
          </div>

          {/* セキュプロ */}
          <Pop show={inView} delay={900} className="flex items-center">
            <p className="text-[11px] font-black leading-tight text-[#7A1F3D] sm:text-[12px]">
              セキュプロ
            </p>
          </Pop>
          {phases.map((p, i) => (
            <div
              key={p.name}
              className="flex min-h-16 flex-col justify-center bg-white px-1.5 py-2 ring-1 ring-[#EEDFE3] sm:min-h-[4.5rem] sm:px-2"
            >
              <span
                className={`block h-7 bg-[#7A1F3D] transition-[width] duration-700 ease-out sm:h-8 ${inView ? "" : "!w-0"}`}
                style={{
                  width: `${p.w}%`,
                  transitionDelay: `${1100 + i * 300}ms`,
                }}
              />
              <span
                className={`mt-1 flex items-start gap-1 text-[9.5px] font-black leading-tight text-ink transition-opacity duration-500 sm:text-[11px] ${inView ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: `${1400 + i * 300}ms` }}
              >
                <PersonIcon className="hidden h-3 w-3 shrink-0 text-[#7A1F3D] sm:block" />
                <span>{p.pro}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {[
            "必要な稼働量だけ",
            "フェーズに合わせてプロを入れ替え",
            "合わない場合の交代は無料",
          ].map((t, i) => (
            <Pop key={t} show={inView} delay={2200 + i * 150}>
              <Chip tone={i === 0 ? "wine" : "light"}>{t}</Chip>
            </Pop>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ========================================================= 03 「何から始めるか」から相談できる */

export function ReasonStart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const steps = [
    { n: "1", t: "セキュリティ顧問が参画" },
    { n: "2", t: "現状とリスクを整理し、優先順位を決める" },
    { n: "3", t: "必要な領域のプロが加わる" },
  ];
  return (
    <Frame inner={ref}>
      <div
        role="img"
        aria-label="まずセキュリティ顧問が参画し、現状とリスクを整理して優先順位を決め、そのうえで必要な領域のプロ人材が加わる流れ"
        className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]"
      >
        {/* 1 顧問が参画 */}
        <Pop
          show={inView}
          delay={0}
          className="flex flex-col items-center bg-white px-3 py-4 text-center ring-1 ring-[#EEDFE3]"
        >
          <StepNo n={steps[0].n} />
          <Face src="/photos/ciso/advisor.webp" className="mt-2 h-16 w-16" />
          <p className="mt-2 text-[12px] font-black leading-snug text-ink [word-break:auto-phrase]">
            {steps[0].t}
          </p>
        </Pop>
        <div className="flex justify-center rotate-90 sm:rotate-0">
          <Arrow show={inView} delay={600} />
        </div>

        {/* 2 優先順位 */}
        <Pop
          show={inView}
          delay={800}
          className="flex flex-col items-center bg-white px-3 py-4 text-center ring-1 ring-[#EEDFE3]"
        >
          <StepNo n={steps[1].n} />
          <ol className="mt-2 w-full space-y-1.5">
            {[90, 65, 40].map((w, i) => (
              <li key={w} className="flex items-center gap-1.5">
                <span className="grid h-4 w-4 shrink-0 place-items-center bg-[#7A1F3D] text-[9px] font-black text-white">
                  {i + 1}
                </span>
                <span className="h-2 flex-1 bg-[#F2E6EA]">
                  <span
                    className={`block h-full bg-[#7A1F3D] transition-[width] duration-700 ease-out ${inView ? "" : "!w-0"}`}
                    style={{
                      width: `${w}%`,
                      transitionDelay: `${1100 + i * 200}ms`,
                    }}
                  />
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-2.5 text-[12px] font-black leading-snug text-ink [word-break:auto-phrase]">
            現状とリスクを整理し、
            <br className="hidden sm:block" />
            優先順位を決める
          </p>
        </Pop>
        <div className="flex justify-center rotate-90 sm:rotate-0">
          <Arrow show={inView} delay={1800} />
        </div>

        {/* 3 プロが加わる */}
        <Pop
          show={inView}
          delay={2000}
          className="flex flex-col items-center bg-white px-3 py-4 text-center ring-1 ring-[#EEDFE3]"
        >
          <StepNo n={steps[2].n} />
          <div className="mt-2 flex items-center">
            <Face src="/photos/ciso/advisor.webp" className="h-12 w-12" />
            {["/photos/ciso/pro-1.webp", "/photos/ciso/pro-2.webp"].map(
              (src, i) => (
                <span
                  key={src}
                  className={`-ml-3 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${inView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: `${2400 + i * 250}ms` }}
                >
                  <Face src={src} className="h-12 w-12" />
                </span>
              ),
            )}
          </div>
          <p className="mt-2 text-[12px] font-black leading-snug text-ink [word-break:auto-phrase]">
            {steps[2].t}
          </p>
        </Pop>
      </div>
      <p className="mt-2 text-right text-[10px] text-ink/45">
        ※画像はイメージです
      </p>
    </Frame>
  );
}

function StepNo({ n }: { n: string }) {
  return (
    <span className="bg-[#7A1F3D] px-2 py-0.5 text-[10px] font-black tracking-[0.14em] text-white">
      STEP {n}
    </span>
  );
}
