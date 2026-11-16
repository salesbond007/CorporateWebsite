import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Bond AI セキュリティ顧問 LP「サービス概要」。
 * 暗いワイン色を重ねた写真(横幅いっぱい)の上に、少し立体的なピラミッドを置き、
 * 各段から線を引いて、右に短い解説を並べる。
 * 下の段(土台)から順に積み上げていく流れ: 現状の把握 → ルールづくり → 社員への浸透 → 取引先への説明
 * 背景写真: Unsplash(商用利用可・クレジット不要)。
 */

const tiers = [
  {
    step: "STEP 4",
    label: "説明",
    title: "取引先への説明",
    text: "チェックシートに答え、取引先に出せる「セキュリティ体制のご案内」をそろえます。",
  },
  {
    step: "STEP 3",
    label: "浸透",
    title: "社員への浸透",
    text: "決めたルールを、研修（動画とテスト・修了証つき）で全社員に広げます。",
  },
  {
    step: "STEP 2",
    label: "ルール",
    title: "ルールと体制づくり",
    text: "情報セキュリティの規程、AI利用ルール、事故のときの手順と連絡先を決めます。",
  },
  {
    step: "STEP 1",
    label: "把握",
    title: "現状の把握",
    text: "ヒアリングと社内アンケート、ツールによる脆弱性診断で、今の状態と弱点を確かめます。",
  },
];

/* 左の面(明るい)と右の面(暗い)。上の段ほど明るい */
const leftFill = ["#E7C4CE", "#C7768E", "#A3445F", "#7A1F3D"];
const rightFill = ["#C99AA9", "#A05570", "#7E2E48", "#5A142C"];
const labelFill = ["#5A142C", "#fff", "#fff", "#fff"];

const APEX = { x: 170, y: 0 };
const BASE_L = { x: 0, y: 384 };
const BASE_F = { x: 205, y: 432 };
const BASE_R = { x: 340, y: 384 };
const ROWS = 4;
const ROW_H = 96; // PCでは右の解説の行の高さとそろえる

type P = { x: number; y: number };
const at = (b: P, t: number): P => ({
  x: APEX.x + (b.x - APEX.x) * t,
  y: APEX.y + (b.y - APEX.y) * t,
});
const pts = (...ps: P[]) => ps.map((p) => `${p.x},${p.y}`).join(" ");

function Pyramid({ lines }: { lines?: boolean }) {
  const width = lines ? 440 : 344;
  return (
    <svg
      viewBox={`-2 -2 ${width + 4} 440`}
      className={
        lines ? "h-[27.5rem] w-auto" : "mx-auto h-auto w-full max-w-[18rem]"
      }
      role="img"
      aria-label="土台から順に、現状の把握、ルールと体制づくり、社員への浸透、取引先への説明と積み上げるピラミッド"
    >
      <ellipse cx="180" cy="428" rx="180" ry="10" fill="#000" opacity="0.25" />
      {tiers.map((t, i) => {
        const t0 = i / ROWS;
        const t1 = (i + 1) / ROWS;
        const l0 = at(BASE_L, t0);
        const l1 = at(BASE_L, t1);
        const f0 = at(BASE_F, t0);
        const f1 = at(BASE_F, t1);
        const r0 = at(BASE_R, t0);
        const r1 = at(BASE_R, t1);
        const rm = at(BASE_R, (t0 + t1) / 2);
        const cx =
          i === 0 ? (l1.x + f1.x) / 2 : (l0.x + l1.x + f0.x + f1.x) / 4;
        const cy =
          i === 0
            ? (l1.y + f1.y) / 2 - 12
            : (l0.y + l1.y + f0.y + f1.y) / 4 + 5;
        return (
          <g
            key={t.title}
            className="-translate-y-7 opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100"
            style={{ transitionDelay: `${(ROWS - 1 - i) * 180}ms` }}
          >
            <polygon
              points={pts(l0, f0, f1, l1)}
              fill={leftFill[i]}
              stroke="#2A0B17"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points={pts(f0, r0, r1, f1)}
              fill={rightFill[i]}
              stroke="#2A0B17"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <line
              x1={f0.x}
              y1={f0.y}
              x2={f1.x}
              y2={f1.y}
              stroke="#fff"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              fontSize={i === 0 ? 12 : 15}
              fontWeight="700"
              letterSpacing="2"
              fill={labelFill[i]}
            >
              {t.label}
            </text>
            {lines ? (
              <>
                <line
                  x1={rm.x + 6}
                  y1={rm.y}
                  x2={width - 6}
                  y2={rm.y}
                  stroke="#fff"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="pyr-dash"
                />
                <circle cx={width - 6} cy={rm.y} r="4.5" fill="#fff" />
              </>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export function CisoServiceDiagram() {
  return (
    <figure
      className="relative isolate overflow-hidden text-white"
      aria-labelledby="ciso-diagram-title"
    >
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

      <div className="container py-14 md:py-20 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-white/70">
            SECURITY GOVERNANCE
          </p>
          <h3
            id="ciso-diagram-title"
            className="mt-3 text-[clamp(1.5rem,3vw,2.3rem)] font-black leading-[1.45] [word-break:auto-phrase]"
          >
            セキュリティ顧問が、御社の担当につきます
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.9] text-white/75">
            土台から順に、取引先に説明できる体制を積み上げます。
          </p>
        </div>

        <Reveal variant="none" className="mt-12 md:mt-14">
          {/* PC: ピラミッドから線を引いて、右に解説 */}
          <div className="hidden items-start justify-center lg:flex">
            <div className="shrink-0">
              <Pyramid lines />
            </div>
            <ol className="w-[30rem] shrink-0 xl:w-[34rem]">
              {tiers.map((t, i) => (
                <li
                  key={t.title}
                  className="flex h-24 translate-x-4 flex-col justify-center border-b border-white/15 pl-6 opacity-0 transition-all duration-700 first:border-t group-data-[visible=true]/reveal:translate-x-0 group-data-[visible=true]/reveal:opacity-100"
                  style={{
                    transitionDelay: `${800 + i * 120}ms`,
                    height: ROW_H,
                  }}
                >
                  <p className="flex items-baseline gap-3">
                    <span className="text-[11px] font-bold tracking-[0.14em] text-white/55">
                      {t.step}
                    </span>
                    <span className="text-lg font-black">{t.title}</span>
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.8] text-white/75">
                    {t.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* スマホ・タブレット */}
          <div className="lg:hidden">
            <Pyramid />
            <ol className="mt-8 space-y-3">
              {tiers.map((t, i) => (
                <li
                  key={t.title}
                  className="flex gap-4 border-l-4 bg-white/[0.06] py-4 pl-4 pr-4"
                  style={{ borderColor: leftFill[i] }}
                >
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.14em] text-white/55">
                      {t.step}
                    </p>
                    <p className="mt-0.5 text-base font-black">{t.title}</p>
                    <p className="mt-1 text-[13px] leading-[1.8] text-white/75">
                      {t.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <figcaption className="mt-10 text-center text-[13px] leading-relaxed text-white/75 md:text-sm">
          <span aria-hidden="true">↻ </span>
          毎月の定例で見直して経営へ報告し、年1回もう一度リスクアセスメントを行います
        </figcaption>
      </div>
    </figure>
  );
}
