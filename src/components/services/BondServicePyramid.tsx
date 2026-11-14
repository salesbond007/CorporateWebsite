import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * AIセキュリティ対策事業のサービス全体を、少し立体的なピラミッドで示す図。
 * 上(経営)から下(全社員)へ: 社外AI/CISO → AIセキュリティ顧問 → CISO育成研修 → 社内AIセキュリティ研修
 * - 画面に入ると、下の段から順に積み上がる
 * - 各段・各サービス名を押すと、それぞれのLPへ移動
 * PC: 左にピラミッド、線でつないで右にサービス名と説明。スマホ: ピラミッドの下に一覧。
 */

export type PyramidItem = {
  layer: string;
  label: string;
  name: string;
  text: string;
  href: string;
};

/* 左の面(明るい)と右の面(暗い)の色。上の段ほど濃い */
const leftFill = ["#8A2647", "#A13A5A", "#BD5F7B", "#E7C4CE"];
const rightFill = ["#5A142C", "#6E1C37", "#8C3550", "#C99AA9"];
const labelFill = ["#fff", "#fff", "#fff", "#5A142C"];

/* 頂点と底面の3点(少し上から見た形) */
const APEX = { x: 170, y: 0 };
const BASE_L = { x: 0, y: 384 };
const BASE_F = { x: 205, y: 432 };
const BASE_R = { x: 340, y: 384 };
const ROWS = 4;

type P = { x: number; y: number };
const at = (b: P, t: number): P => ({
  x: APEX.x + (b.x - APEX.x) * t,
  y: APEX.y + (b.y - APEX.y) * t,
});
const pts = (...ps: P[]) => ps.map((p) => `${p.x},${p.y}`).join(" ");

function Pyramid({ items, lines }: { items: PyramidItem[]; lines?: boolean }) {
  const width = lines ? 470 : 344;
  return (
    <svg
      viewBox={`-2 -2 ${width + 4} 440`}
      className={
        lines ? "h-[27.5rem] w-auto" : "mx-auto h-auto w-full max-w-[19rem]"
      }
      role="img"
      aria-label={`サービスの全体像：上から${items.map((i) => i.name).join("、")}`}
    >
      {/* 床の影 */}
      <ellipse
        cx="180"
        cy="428"
        rx="180"
        ry="10"
        fill="#5A142C"
        opacity="0.08"
      />
      {items.map((it, i) => {
        const t0 = i / ROWS;
        const t1 = (i + 1) / ROWS;
        const l0 = at(BASE_L, t0);
        const l1 = at(BASE_L, t1);
        const f0 = at(BASE_F, t0);
        const f1 = at(BASE_F, t1);
        const r0 = at(BASE_R, t0);
        const r1 = at(BASE_R, t1);
        const rm = at(BASE_R, (t0 + t1) / 2);
        // 左の面の帯の中心に段の名前
        const cx =
          i === 0
            ? (l1.x + f1.x) / 2
            : (l0.x + l1.x + f0.x + f1.x) / 4;
        const cy =
          i === 0
            ? (l1.y + f1.y) / 2 - 12
            : (l0.y + l1.y + f0.y + f1.y) / 4 + 5;
        return (
          <a key={it.name} href={it.href} aria-label={it.name}>
            <g
              className="-translate-y-7 opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100"
              style={{ transitionDelay: `${(ROWS - 1 - i) * 180}ms` }}
            >
              <g className="transition-transform duration-300 hover:-translate-y-1.5">
                <polygon
                  points={pts(l0, f0, f1, l1)}
                  fill={leftFill[i]}
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points={pts(f0, r0, r1, f1)}
                  fill={rightFill[i]}
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* 稜線のハイライト */}
                <line
                  x1={f0.x}
                  y1={f0.y}
                  x2={f1.x}
                  y2={f1.y}
                  stroke="#fff"
                  strokeOpacity="0.35"
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
                  {it.layer}
                </text>
              </g>
              {lines ? (
                <>
                  <line
                    x1={rm.x + 6}
                    y1={rm.y}
                    x2={width - 6}
                    y2={rm.y}
                    stroke="#C9B5BC"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    className="pyr-dash"
                  />
                  <circle cx={width - 6} cy={rm.y} r="4.5" fill="#5A142C" />
                </>
              ) : null}
            </g>
          </a>
        );
      })}
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

function ItemLink({
  it,
  children,
  className,
}: {
  it: PyramidItem;
  children: ReactNode;
  className: string;
}) {
  return (
    <Link href={it.href} className={className}>
      {children}
    </Link>
  );
}

export function BondServicePyramid({ items }: { items: PyramidItem[] }) {
  return (
    <Reveal variant="none">
      {/* PC: 行の高さ(96px)をピラミッドの段にそろえる */}
      <div className="hidden items-start lg:flex">
        <div className="shrink-0">
          <Pyramid items={items} lines />
        </div>
        <ul className="min-w-0 flex-1 divide-y divide-[#E9E1DD] border-y border-[#E9E1DD]">
          {items.map((it, i) => (
            <li
              key={it.name}
              className="h-24 translate-x-4 opacity-0 transition-all duration-700 group-data-[visible=true]/reveal:translate-x-0 group-data-[visible=true]/reveal:opacity-100"
              style={{ transitionDelay: `${800 + i * 120}ms` }}
            >
              <ItemLink
                it={it}
                className="group flex h-full items-center gap-6 pl-6 pr-2 transition-colors hover:bg-white"
              >
                <div className="w-[15rem] shrink-0 xl:w-[18rem]">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-ink/50">
                    {it.label}
                  </p>
                  <p className="mt-1 text-[1.15rem] font-black leading-snug text-ink transition-colors group-hover:text-brand-500 xl:text-[1.35rem]">
                    {it.name}
                  </p>
                </div>
                <p className="flex-1 text-[13px] leading-[1.85] text-ink/70">
                  {it.text}
                </p>
                <Chevron />
              </ItemLink>
            </li>
          ))}
        </ul>
      </div>

      {/* スマホ・タブレット */}
      <div className="lg:hidden">
        <Pyramid items={items} />
        <ul className="mt-6 space-y-2.5">
          {items.map((it, i) => (
            <li
              key={it.name}
              className="translate-y-3 opacity-0 transition-all duration-700 group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100"
              style={{ transitionDelay: `${800 + i * 100}ms` }}
            >
              <ItemLink
                it={it}
                className="group flex items-center gap-4 border border-[#E9E1DD] bg-white py-4 pl-0 pr-4"
              >
                <span
                  aria-hidden="true"
                  className="w-1.5 self-stretch"
                  style={{ backgroundColor: rightFill[i] }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold tracking-[0.12em] text-ink/50">
                    {it.layer}｜{it.label}
                  </span>
                  <span className="mt-0.5 block text-base font-black leading-snug text-ink">
                    {it.name}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-relaxed text-ink/70">
                    {it.text}
                  </span>
                </span>
                <Chevron />
              </ItemLink>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/** サービス一覧・トップページで使う4サービス(押すと各LPへ) */
export function bondPyramidItems(path: (p: string) => string): PyramidItem[] {
  return [
    {
      layer: "経営",
      label: "責任者を任せる",
      name: "社外AI/CISO（最高情報セキュリティ責任者）",
      text: "専門家が社外のCISOとして責任者につき、AI利用のルールづくりから取引先への説明まで、セキュリティ対策を代わりに進めます。",
      href: path("/services/ciso"),
    },
    {
      layer: "助言",
      label: "相談相手を持つ",
      name: "AIセキュリティ顧問",
      text: "定例ミーティングと相談窓口で、社内の担当者を助言で支えます。",
      href: path("/services/ciso"),
    },
    {
      layer: "育成",
      label: "責任者を育てる",
      name: "CISO育成研修",
      text: "社内のCISO候補が、セキュリティの責任者としての役割と進め方を学びます。",
      href: path("/services/security-training"),
    },
    {
      layer: "全社員",
      label: "全社員で守る",
      name: "社内AIセキュリティ研修",
      text: "全社員が、AIを使うときの基本ルールや、詐欺メール・なりすましへの備えを身につけます。",
      href: path("/services/security-training"),
    },
  ];
}
