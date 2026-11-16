import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Bond AI セキュリティ顧問 LP「サービス概要」。
 * 暗いワイン色を重ねた写真(横幅いっぱい)の上に、平面のピラミッドを置き(上の段から順に表示)、
 * 各段から線を引いて、右に短い解説を並べる。
 * 下の段(土台)から順に積み上げていく流れ: 現状の把握 → ルールづくり → 社員への浸透 → 取引先への説明
 * 背景写真: Unsplash(商用利用可・クレジット不要)。
 */

const tiers = [
  {
    step: "STEP 4",
    label: "説明",
    title: "取引先への説明",
    text: "チェックシートに回答し、体制を説明します。",
    term: "委託先評価への対応",
  },
  {
    step: "STEP 3",
    label: "浸透",
    title: "社員への浸透",
    text: "研修とテストで、ルールを全社に広げます。",
    term: "セキュリティ教育・修了証",
  },
  {
    step: "STEP 2",
    label: "ルール",
    title: "ルールと体制づくり",
    text: "規程、AI利用ルール、インシデント対応手順を整えます。",
    term: "ポリシー策定・AIガバナンス",
  },
  {
    step: "STEP 1",
    label: "把握",
    title: "現状の把握",
    text: "ヒアリングと社内アンケートで、目指す体制との差を洗い出します。",
    term: "初回アセスメント・ギャップ分析",
  },
];

/* 上(説明)ほど濃い赤、下(土台)ほど明るい赤 */
const fills = ["#5A142C", "#8A2647", "#B8435F", "#E07A8F"];

const ROWS = 4;
const ROW_H = 96; // PCでは右の解説の行の高さとそろえる
const H = ROW_H * ROWS;
const HALF = 170; // 底辺の半分の幅
const CX = 175;

/** 平面のピラミッド。上の段から順に現れ、段から右へ線がのびる */
function Pyramid({ lines }: { lines?: boolean }) {
  const width = lines ? 440 : 350;
  const half = (y: number) => (HALF * y) / H;
  return (
    <svg
      viewBox={`0 0 ${width} ${H}`}
      className={lines ? "h-96 w-auto" : "mx-auto h-auto w-full max-w-[19rem]"}
      role="img"
      aria-label="上から順に、取引先への説明、社員への浸透、ルールと体制づくり、現状の把握と積み上げるピラミッド"
    >
      {tiers.map((t, i) => {
        const y0 = i * ROW_H;
        const y1 = (i + 1) * ROW_H;
        const mid = (y0 + y1) / 2;
        const edge = CX + half(mid);
        return (
          <g
            key={t.title}
            className="-translate-y-4 opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100"
            style={{ transitionDelay: `${i * 220}ms` }}
          >
            <polygon
              points={`${CX - half(y0 + 2)},${y0 + 2} ${CX + half(y0 + 2)},${y0 + 2} ${CX + half(y1 - 2)},${y1 - 2} ${CX - half(y1 - 2)},${y1 - 2}`}
              fill={fills[i]}
              stroke="none"
            />
            <text
              x={CX}
              y={i === 0 ? mid + 22 : mid + 6}
              textAnchor="middle"
              fontSize={i === 0 ? 14 : 16}
              fontWeight="700"
              letterSpacing="3"
              fill="#fff"
            >
              {t.label}
            </text>
            {lines ? (
              <>
                <line
                  x1={edge + 8}
                  y1={mid}
                  x2={width - 6}
                  y2={mid}
                  stroke="#fff"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                  className="origin-left scale-x-0 transition-transform duration-700 group-data-[visible=true]/reveal:scale-x-100 [transform-box:fill-box]"
                  style={{ transitionDelay: `${300 + i * 220}ms` }}
                />
                <circle cx={width - 6} cy={mid} r="5" fill="#fff" />
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
            御社に合った体制を構築
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.9] text-white/75">
            現状の把握を土台に、取引先に説明できる体制まで積み上げます。
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
                  <p className="mt-1 text-[13px] leading-[1.7] text-white/85">
                    {t.text}
                  </p>
                  <p className="text-[11px] leading-[1.6] text-white/45">
                    {t.term}
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
                  style={{
                    borderColor: fills[i] === "#5A142C" ? "#B8435F" : fills[i],
                  }}
                >
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.14em] text-white/55">
                      {t.step}
                    </p>
                    <p className="mt-0.5 text-base font-black">{t.title}</p>
                    <p className="mt-1 text-[13px] leading-[1.7] text-white/85">
                      {t.text}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-[1.6] text-white/45">
                      {t.term}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <figcaption className="mt-10 space-y-1.5 text-center text-[13px] leading-relaxed text-white/75 md:text-sm">
          <p>
            ※
            プランにより対応範囲が異なります。くわしくは「プランと料金」をご覧ください。
          </p>
          <p>
            <span aria-hidden="true">↻ </span>
            毎月の定例で見直して経営へ報告し、年1回もう一度リスクアセスメントを行います。
          </p>
        </figcaption>
      </div>
    </figure>
  );
}
