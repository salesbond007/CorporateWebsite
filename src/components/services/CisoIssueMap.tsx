"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * セキュプロ LP「サービス概要」: 課題カード5枚 → 円形の図(8つの対応領域) + 解決の一文。
 * 課題カードと円の領域を順番に光らせ、「この課題 → この領域のプロが対応」とつながって見えるようにする。
 * イラスト: Loose Drawing(商用利用可)をワイン色にしたもの。
 */

type Area = { label: ReactNode; text: string; icon: ReactNode };

const sw = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 円の周りの8つの領域(上から時計回り) */
const areas: Area[] = [
  {
    label: "現状診断",
    text: "現状診断",
    icon: (
      <g {...sw}>
        <path d="M4 19V11M8.5 19V7M13 19v-5" />
        <circle cx="16.5" cy="9.5" r="3.5" />
        <path d="M19 12l2.5 2.5" />
      </g>
    ),
  },
  {
    label: "SCS対応",
    text: "SCS対応",
    icon: (
      <g {...sw}>
        <circle cx="12" cy="9" r="5.2" />
        <path d="M9.6 9l1.7 1.7 3.2-3.3" />
        <path d="M8.6 13.2L7.3 21l4.7-2.4 4.7 2.4-1.3-7.8" />
      </g>
    ),
  },
  {
    label: (
      <>
        チェック
        <br />
        シート対応
      </>
    ),
    text: "チェックシート対応",
    icon: (
      <g {...sw}>
        <rect x="5" y="4.5" width="14" height="16.5" />
        <path d="M9 3h6v3H9z" />
        <path d="M8 11l1.4 1.4L12 10M8 16l1.4 1.4L12 15M14 11.5h2.5M14 16.5h2.5" />
      </g>
    ),
  },
  {
    label: "社外CISO",
    text: "社外CISO",
    icon: (
      <g {...sw}>
        <circle cx="12" cy="7.5" r="3.4" />
        <path d="M5 21c.8-4 3.5-6.2 7-6.2s6.2 2.2 7 6.2" />
        <path d="M12 14.8l-1.3 2.8L12 20l1.3-2.4z" />
      </g>
    ),
  },
  {
    label: (
      <>
        規程・
        <br />
        体制づくり
      </>
    ),
    text: "規程・体制づくり",
    icon: (
      <g {...sw}>
        <rect x="9" y="3" width="6" height="4.5" />
        <rect x="3" y="16" width="6" height="4.5" />
        <rect x="15" y="16" width="6" height="4.5" />
        <path d="M12 7.5V12M6 16v-4h12v4" />
      </g>
    ),
  },
  {
    label: (
      <>
        生成AI
        <br />
        ルール
      </>
    ),
    text: "生成AIルール",
    icon: (
      <g {...sw}>
        <rect x="6" y="6" width="12" height="12" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
        <path d="M9.2 14.5l1.6-5h.4l1.6 5M9.7 13h2.6M14.8 9.5v5" />
      </g>
    ),
  },
  {
    label: (
      <>
        脆弱性診断・
        <br />
        Web対策
      </>
    ),
    text: "脆弱性診断・Web対策",
    icon: (
      <g {...sw}>
        <rect x="3" y="4" width="18" height="12.5" />
        <path d="M8.5 20.5h7M12 16.5v4" />
        <path d="M12 6.8l3.2 1.2v2.4c0 2.1-1.4 3.4-3.2 4.1-1.8-.7-3.2-2-3.2-4.1V8z" />
      </g>
    ),
  },
  {
    label: "社員研修",
    text: "社員研修",
    icon: (
      <g {...sw}>
        <rect x="3" y="3.5" width="18" height="10" />
        <path d="M7 10l3-3 2.5 2.5L17 6" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M12 16.5v4" />
      </g>
    ),
  },
];

/** 課題カード(強調する語は太字・ワイン色)。area は対応する円の領域の番号 */
const issues: { img: string; text: ReactNode; area: number }[] = [
  {
    img: "/illustrations/ld-1531-wine.webp",
    text: (
      <>
        対策の<b>優先順位</b>が定まらず、着手できていない
      </>
    ),
    area: 0,
  },
  {
    img: "/illustrations/ld-1528-wine.webp",
    text: (
      <>
        専任人材の<b>採用コスト</b>が見合わない
      </>
    ),
    area: 3,
  },
  {
    img: "/illustrations/ld-1523-wine.webp",
    text: (
      <>
        取引先から<b>チェックシート</b>への回答を求められている
      </>
    ),
    area: 2,
  },
  {
    img: "/illustrations/ld-1538-wine.webp",
    text: (
      <>
        <b>SCS評価制度</b>への対応が必要になっている
      </>
    ),
    area: 1,
  },
  {
    img: "/illustrations/ld-1817-wine.webp",
    text: (
      <>
        <b>生成AIの利用ルール</b>が整っていない
      </>
    ),
    area: 5,
  },
];

/** 課題を順番に光らせる(カーソルを乗せるとその課題で止まる) */
function useCycle(n: number, ms: number) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState<number | null>(null);
  useEffect(() => {
    if (hold !== null) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(t);
  }, [n, ms, hold]);
  return { active: hold ?? i, setHold };
}

function Chevrons({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 24 22"
      className={`mx-auto h-5 w-6 transition-colors duration-500 ${on ? "text-white" : "text-white/35"}`}
      aria-hidden="true"
    >
      <path
        d="M5 3l7 6 7-6M5 12l7 6 7-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Logo({ small }: { small?: boolean }) {
  return (
    <div className="flex flex-col items-center text-white">
      <svg
        viewBox="0 0 40 44"
        className={small ? "h-9 w-9" : "h-[22%] w-[22%] min-h-10 min-w-10"}
        aria-hidden="true"
      >
        <path
          d="M20 2l16 6v12c0 11-7 18.5-16 22C11 38.5 4 31 4 20V8z"
          fill="#fff"
        />
        <path
          d="M13 21.5l5 5 9.5-10"
          fill="none"
          stroke="#7A1F3D"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p
        className={`mt-2 font-black tracking-[0.12em] ${small ? "text-lg" : "text-[clamp(1.1rem,2.2vw,1.6rem)]"}`}
      >
        セキュプロ
      </p>
    </div>
  );
}

/** 円形の図(PC・タブレット) */
function Wheel({ activeArea }: { activeArea: number }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="37"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.45"
          strokeWidth="0.35"
          strokeDasharray="1 1.6"
        />
        <g className="sv-spin" style={{ transformOrigin: "50px 50px" }}>
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.25"
            strokeWidth="0.3"
            strokeDasharray="0.6 1.4"
          />
          <circle cx="50" cy="25" r="0.9" fill="#fff" />
        </g>
      </svg>

      {/* 中央 */}
      <div className="absolute left-1/2 top-1/2 grid aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-brand-500/40">
        <Logo />
      </div>

      {/* 周りの8つ */}
      {areas.map((a, k) => {
        const rad = ((-90 + k * 45) * Math.PI) / 180;
        const on = k === activeArea;
        return (
          <div
            key={a.text}
            className="absolute aspect-square w-[23%] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + 37 * Math.cos(rad)}%`,
              top: `${50 + 37 * Math.sin(rad)}%`,
            }}
          >
            <div
              className={`flex h-full w-full flex-col items-center justify-center rounded-full border text-center transition-all duration-500 ${
                on
                  ? "scale-110 border-white bg-white text-brand-500 shadow-[0_0_0_6px_rgba(255,255,255,0.18)]"
                  : "border-white/45 bg-[#2A0A15]/70 text-white"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-[34%] w-[34%]">
                {a.icon}
              </svg>
              <p className="mt-1 text-[clamp(9px,1.05vw,12px)] font-bold leading-[1.3]">
                {a.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 4列×2段のアイコン(スマホ) */
function AreaGrid({ activeArea }: { activeArea: number }) {
  return (
    <div>
      <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-white/40 bg-brand-500/40">
        <Logo small />
      </div>
      <ul className="mt-5 grid grid-cols-4 gap-2">
        {areas.map((a, k) => {
          const on = k === activeArea;
          return (
            <li
              key={a.text}
              className={`flex aspect-square flex-col items-center justify-center border px-1 text-center transition-colors duration-500 ${
                on
                  ? "border-white bg-white text-brand-500"
                  : "border-white/35 bg-[#2A0A15]/60 text-white"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                {a.icon}
              </svg>
              <p className="mt-1 text-[10px] font-bold leading-[1.25]">
                {a.label}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CisoIssueMap() {
  const { active, setHold } = useCycle(issues.length, 2400);
  const activeArea = issues[active].area;

  return (
    <div className="relative">
      {/* 上段: 課題カード */}
      <Container>
        <Reveal variant="up" className="text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-brand-500">
            ISSUES
          </p>
          <h3 className="mt-2 text-[clamp(1.35rem,2.6vw,2rem)] font-black leading-[1.5]">
            こんな<span className="text-brand-500">課題</span>
            はありませんか
          </h3>
        </Reveal>
      </Container>

      <div className="relative z-10 mt-8 -mb-24 md:mt-10">
        <div className="mx-auto max-w-[78rem] px-4 sm:px-6">
          <ol className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 pt-5 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
            {issues.map((it, i) => {
              const on = i === active;
              return (
                <li
                  key={i}
                  className="w-[11.5rem] shrink-0 snap-center lg:w-auto"
                  onMouseEnter={() => setHold(i)}
                  onMouseLeave={() => setHold(null)}
                >
                  <div
                    className={`relative flex h-full flex-col items-center border bg-white px-3 pb-4 pt-8 text-center transition-all duration-500 ${
                      on
                        ? "-translate-y-1 border-brand-500 shadow-[0_18px_36px_-20px_rgba(122,31,61,0.75)]"
                        : "border-[#E6DFE1] shadow-[0_10px_24px_-20px_rgba(31,26,28,0.6)]"
                    }`}
                  >
                    <span
                      className={`absolute -top-5 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full text-white transition-colors duration-500 ${
                        on ? "bg-brand-500" : "bg-[#3A2A30]"
                      }`}
                    >
                      <span className="text-center leading-none">
                        <span className="block text-[9px] font-bold">課題</span>
                        <span className="block text-lg font-black">{i + 1}</span>
                      </span>
                    </span>
                    <Image
                      src={it.img}
                      alt=""
                      width={200}
                      height={200}
                      className="h-24 w-auto object-contain md:h-28"
                    />
                    <p className="mt-3 text-[13.5px] font-bold leading-[1.65] text-ink [word-break:auto-phrase] md:text-[14.5px] [&_b]:font-black [&_b]:text-brand-500">
                      {it.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* 下段: 円形の図 + 解決の一文 */}
      <figure className="relative isolate overflow-hidden text-white">
        <Image
          src="/photos/ciso/governance.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[#24070F]/[0.9]"
        />

        <div className="mx-auto max-w-[78rem] px-4 pb-16 pt-28 sm:px-6 md:pb-20 lg:pb-24">
          {/* 課題 → 領域(矢印と領域名) */}
          <ol
            className="hidden grid-cols-5 gap-4 lg:grid"
            aria-label="課題ごとに対応する領域"
          >
            {issues.map((it, i) => (
              <li key={i} className="text-center">
                <Chevrons on={i === active} />
                <span
                  className={`mt-1.5 inline-block border px-2.5 py-1 text-[12px] font-bold transition-colors duration-500 ${
                    i === active
                      ? "border-white bg-white text-brand-500"
                      : "border-white/35 text-white/70"
                  }`}
                >
                  {areas[it.area].text}
                </span>
              </li>
            ))}
          </ol>
          <p className="text-center text-[13px] font-bold text-white/80 lg:hidden">
            <Chevrons on />
            <span className="mt-1 block">
              課題{active + 1}は「{areas[activeArea].text}」のプロが対応
            </span>
          </p>

          <div className="mt-10 grid items-center gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <div className="hidden sm:block">
                <Wheel activeArea={activeArea} />
              </div>
              <div className="sm:hidden">
                <AreaGrid activeArea={activeArea} />
              </div>
            </div>

            <figcaption>
              <p className="text-lg font-black md:text-xl">セキュプロは、</p>
              <p className="mt-2 text-[clamp(1.5rem,3vw,2.3rem)] font-black leading-[1.5] [word-break:auto-phrase]">
                情報セキュリティのプロ人材を、雇わずに活用できる
              </p>
              <p className="mt-2 text-lg font-black md:text-xl">
                から、課題を解決できます
              </p>
              <span
                aria-hidden="true"
                className="mt-6 block h-[2px] w-14 bg-white"
              />
              <p className="mt-6 text-[14.5px] leading-[2] text-white/85 md:text-[15px]">
                情報セキュリティ対策は、取引先の要請や生成AIの普及で、中小企業にも欠かせないものになりました。一方で、専任者を雇うのは簡単ではありません。
                <br />
                セキュプロは、課題やフェーズに合わせて必要な領域のプロ人材が対応し、雇わずに対策を前に進められるようにするサービスです。
              </p>
            </figcaption>
          </div>
        </div>
      </figure>
    </div>
  );
}

function Container({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}
