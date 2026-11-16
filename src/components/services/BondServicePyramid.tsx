import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 情報セキュリティ対策事業のサービスを1枚で示す図。
 * 2つのサービス(AI情報セキュリティ顧問 × AI情報セキュリティ研修)が重なって
 * 「情報セキュリティ対策を完備」となり、外側の守りの輪が情報漏洩やサイバー攻撃をはね返す。
 * 動き: 円が順に現れる / 守りの輪がゆっくり回る / 外からの脅威が輪に当たって止まる / 中心が脈打つ。
 */

export type PyramidItem = {
  layer: string;
  label: string;
  name: string;
  text: string;
  href: string;
};

const W = "#7A1F3D";
const WD = "#5A142C";
const fills = ["#7A1F3D", "#C26F87"];

const threats = [
  { t: "情報漏洩", x: 62, y: 70, a: -135 },
  { t: "サイバー攻撃", x: 398, y: 70, a: -45 },
  { t: "ランサムウェア", x: 62, y: 352, a: 135 },
  { t: "なりすまし", x: 398, y: 352, a: 45 },
];

const CX = 230;
const CY = 211;
const RING = 168;

function delay(ms: number): CSSProperties {
  return { transitionDelay: `${ms}ms` };
}

const appear =
  "opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-data-[visible=true]/reveal:opacity-100";

function Diagram({ items }: { items: PyramidItem[] }) {
  const [a, b] = items;
  return (
    <svg
      viewBox="0 0 460 440"
      className="mx-auto h-auto w-full max-w-[30rem]"
      role="img"
      aria-label={`${a.name}と${b.name}を組み合わせて情報セキュリティ対策を完備し、情報漏洩やサイバー攻撃から守る図`}
    >
      {/* 守りの輪 */}
      <g className={appear} style={delay(700)}>
        <circle cx={CX} cy={CY} r={RING} fill="#FBF3F5" />
        <circle
          cx={CX}
          cy={CY}
          r={RING}
          fill="none"
          stroke={W}
          strokeWidth="3"
        />
      </g>
      <g className="pf-orbit-2">
        <circle
          cx={CX}
          cy={CY}
          r={RING + 12}
          fill="none"
          stroke={W}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="2 7"
        />
        <circle cx={CX} cy={CY - RING - 12} r="4.5" fill={W} />
        <circle cx={CX} cy={CY + RING + 12} r="3" fill="#C26F87" />
      </g>

      {/* 外からの脅威(輪に当たって止まる) */}
      {threats.map((t, i) => {
        const rad = (t.a * Math.PI) / 180;
        const hx = CX + (RING + 4) * Math.cos(rad);
        const hy = CY + (RING + 4) * Math.sin(rad);
        return (
          <g key={t.t} className={appear} style={delay(1500 + i * 150)}>
            <line
              x1={t.x}
              y1={t.y}
              x2={hx}
              y2={hy}
              stroke="#D64545"
              strokeWidth="1.6"
              strokeDasharray="3 4"
              className="pf-attack"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <g transform={`translate(${hx} ${hy})`}>
              <circle r="9" fill="#fff" stroke="#D64545" strokeWidth="1.6" />
              <path
                d="M-3.5 -3.5l7 7M3.5 -3.5l-7 7"
                stroke="#D64545"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <g transform={`translate(${t.x} ${t.y})`}>
              <rect
                x={-44}
                y={-13}
                width="88"
                height="26"
                rx="13"
                fill="#3A3442"
              />
              <text
                y="4.5"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill="#fff"
              >
                {t.t}
              </text>
            </g>
          </g>
        );
      })}

      {/* 2つのサービス(重なる円) */}
      {[a, b].map((it, i) => {
        const x = i === 0 ? CX - 58 : CX + 58;
        return (
          <a key={it.name} href={it.href} aria-label={it.name}>
            <g
              className={`${appear} origin-center scale-75 [transform-box:fill-box] group-data-[visible=true]/reveal:scale-100`}
              style={delay(i * 250)}
            >
              <circle
                cx={x}
                cy={CY}
                r="102"
                fill={fills[i]}
                fillOpacity={i === 0 ? 0.92 : 0.82}
                stroke="#fff"
                strokeWidth="3"
                className="transition-[filter] duration-300 hover:brightness-110"
              />
              <text
                x={i === 0 ? x - 34 : x + 34}
                y={CY - 34}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                letterSpacing="2"
                fill="#fff"
                opacity="0.85"
              >
                {it.layer}
              </text>
              {it.name.match(/^(AI情報セキュリティ)(.*)$/) ? (
                <>
                  <text
                    x={i === 0 ? x - 34 : x + 34}
                    y={CY - 12}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="900"
                    fill="#fff"
                  >
                    AI情報
                  </text>
                  <text
                    x={i === 0 ? x - 34 : x + 34}
                    y={CY + 5}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="900"
                    fill="#fff"
                  >
                    情報セキュリティ
                  </text>
                  <text
                    x={i === 0 ? x - 34 : x + 34}
                    y={CY + 24}
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="900"
                    fill="#fff"
                  >
                    {it.name.replace("AI情報セキュリティ", "")}
                  </text>
                </>
              ) : (
                <text
                  x={x}
                  y={CY}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="900"
                  fill="#fff"
                >
                  {it.name}
                </text>
              )}
            </g>
          </a>
        );
      })}

      {/* 重なり: 情報セキュリティ対策を完備 */}
      <g
        className={`${appear} origin-center scale-50 [transform-box:fill-box] group-data-[visible=true]/reveal:scale-100`}
        style={delay(550)}
      >
        <circle cx={CX} cy={CY} r="34" fill="#fff" className="pf-core" />
        <path
          d={`M${CX} ${CY - 22}l16 6v11c0 11-7 18-16 22-9-4-16-11-16-22v-11z`}
          fill={WD}
        />
        <path
          d={`M${CX - 7} ${CY + 2}l5 5 10-10`}
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* 下の帯: 包括した成果 */}
      <g className={appear} style={delay(1100)}>
        <rect
          x={CX - 118}
          y={CY + 108}
          width="236"
          height="30"
          rx="15"
          fill="#fff"
          stroke={W}
          strokeWidth="1.5"
        />
        <text
          x={CX}
          y={CY + 128}
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill={W}
        >
          情報セキュリティ対策を完備
        </text>
      </g>
      <text
        x={CX}
        y="432"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="800"
        fill={WD}
        className={appear}
        style={delay(1800)}
      >
        情報漏洩やサイバー攻撃から守る
      </text>
    </svg>
  );
}

function Chevron() {
  return (
    <span
      aria-hidden="true"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-brand-500 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
        <path
          d="M8 5l5 5-5 5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function BondServicePyramid({
  items,
  hideListOnMobile = false,
  diagramOnly = false,
}: {
  items: PyramidItem[];
  /** スマホでは図の下の一覧を出さない(すぐ下に同じサービスの一覧があるページ用) */
  hideListOnMobile?: boolean;
  /** 図だけを表示する(説明と一覧は呼び出し側で出す) */
  diagramOnly?: boolean;
}) {
  return (
    <Reveal variant="none">
      {diagramOnly ? (
        <Diagram items={items} />
      ) : (
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <Diagram items={items} />

          <div className={hideListOnMobile ? "hidden lg:block" : ""}>
            <p className="text-xl font-black leading-[1.6] text-ink md:text-2xl">
              <span className="text-brand-500">2つのサービス</span>で、
              <br />
              情報セキュリティ対策を<span className="text-brand-500">完備</span>
            </p>
            <p className="mt-2 text-[15px] font-bold text-ink/70">
              情報漏洩やサイバー攻撃から、御社を守ります。
            </p>
            <ol className="mt-6">
              {items.map((it, i) => (
                <li
                  key={it.name}
                  className="translate-x-4 border-b border-[#E9E1DD] opacity-0 transition-all duration-700 first:border-t group-data-[visible=true]/reveal:translate-x-0 group-data-[visible=true]/reveal:opacity-100"
                  style={{ transitionDelay: `${700 + i * 160}ms` }}
                >
                  <Link
                    href={it.href}
                    className="group flex items-center gap-4 py-5 pr-1 transition-colors hover:bg-white/60 sm:gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black text-white"
                      style={{ backgroundColor: fills[i] }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold tracking-[0.12em] text-ink/50">
                        {it.layer}｜{it.label}
                      </span>
                      <span className="mt-1 block text-lg font-black leading-snug text-ink transition-colors group-hover:text-brand-500 md:text-xl">
                        {it.name}
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-[1.85] text-ink/70">
                        {it.text}
                      </span>
                    </span>
                    <Chevron />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Reveal>
  );
}

/** サービス一覧・トップページで使う2サービス(押すと各LPへ) */
export function bondPyramidItems(path: (p: string) => string): PyramidItem[] {
  return [
    {
      layer: "体制",
      label: "経営と体制を整える",
      name: "AI情報セキュリティ顧問",
      text: "AI時代に特化した、中小企業向けの情報セキュリティ顧問。大企業・上場企業との取引に欠かせない情報セキュリティの体制を、専門家が一緒に整えます。",
      href: path("/services/ciso"),
    },
    {
      layer: "全社員",
      label: "全社員で守る",
      name: "AI情報セキュリティ研修",
      text: "全社員が、AIを使うときの基本ルールや、詐欺メール・なりすましへの備えを身につけ、社内で守りを回せるようにします。",
      href: path("/services/security-training"),
    },
  ];
}
