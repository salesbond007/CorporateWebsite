import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 情報セキュリティ対策事業のサービス(事業ポートフォリオ)を、同心円で示す図。
 * 中心: 経営(情報セキュリティ顧問) → 外へ: 育成(CISO育成研修) → 全社員(社内研修)。
 * 「経営の責任者から全社員まで、守りの範囲を広げていく」ことを表す。
 * 動き: 内側から順に円が広がる / 外周の軌道がゆっくり回る / 中心から波紋が広がる。
 * 各円・各サービス名を押すと、それぞれのLPへ移動。
 */

export type PyramidItem = {
  layer: string;
  label: string;
  name: string;
  text: string;
  href: string;
};

/* 内側(経営)ほど濃い */
const ringFill = ["#7A1F3D", "#C26F87", "#F1D9E0"];
const ringText = ["#fff", "#fff", "#7A1F3D"];
const dot = ["#7A1F3D", "#C26F87", "#E3B3C1"];

const C = 200;
const R = [78, 132, 182]; // 内側から

function show(i: number): CSSProperties {
  return { transitionDelay: `${i * 260}ms` };
}

function Rings({ items }: { items: PyramidItem[] }) {
  const n = items.length;
  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto h-auto w-full max-w-[26rem]"
      role="img"
      aria-label={`情報セキュリティ対策事業のサービス：中心から${items
        .map((i) => `${i.layer}（${i.name}）`)
        .join("、")}`}
    >
      {/* 外周の軌道(回る) */}
      <g className="pf-orbit">
        <circle
          cx={C}
          cy={C}
          r={196}
          fill="none"
          stroke="#7A1F3D"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        <circle cx={C} cy={C - 196} r="4" fill="#7A1F3D" />
        <circle cx={C + 196} cy={C} r="2.5" fill="#C26F87" />
      </g>

      {/* 外側から描いて、内側を上に重ねる */}
      {[...items].reverse().map((it, ri) => {
        const i = n - 1 - ri;
        const r = R[Math.min(i, R.length - 1)];
        return (
          <a key={it.name} href={it.href} aria-label={it.name}>
            <g
              className="pf-ring origin-center scale-[0.6] [transform-box:fill-box] opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-data-[visible=true]/reveal:scale-100 group-data-[visible=true]/reveal:opacity-100"
              style={show(i)}
            >
              <circle
                cx={C}
                cy={C}
                r={r}
                fill={ringFill[i]}
                stroke="#fff"
                strokeWidth="3"
                className="transition-[filter] duration-300 hover:brightness-110"
              />
              {i === 0 ? (
                <>
                  <text
                    x={C}
                    y={C - 14}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    letterSpacing="3"
                    fill="#fff"
                    opacity="0.8"
                  >
                    {it.layer}
                  </text>
                  <text
                    x={C}
                    y={C + 8}
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="900"
                    fill="#fff"
                  >
                    情報セキュリティ
                  </text>
                  <text
                    x={C}
                    y={C + 28}
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="900"
                    fill="#fff"
                  >
                    顧問
                  </text>
                </>
              ) : (
                <>
                  <text
                    x={C}
                    y={C - r + (r - R[i - 1]) / 2 - 2}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    letterSpacing="3"
                    fill={ringText[i]}
                    opacity="0.85"
                  >
                    {it.layer}
                  </text>
                  <text
                    x={C}
                    y={C - r + (r - R[i - 1]) / 2 + 15}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="800"
                    fill={ringText[i]}
                  >
                    {it.name}
                  </text>
                </>
              )}
            </g>
          </a>
        );
      })}

      {/* 中心から広がる波紋 */}
      <circle
        cx={C}
        cy={C}
        r={R[0]}
        fill="none"
        stroke="#7A1F3D"
        strokeWidth="2"
        className="pf-wave"
      />
      <circle
        cx={C}
        cy={C}
        r={R[0]}
        fill="none"
        stroke="#7A1F3D"
        strokeWidth="2"
        className="pf-wave"
        style={{ animationDelay: "1.4s" }}
      />
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
}: {
  items: PyramidItem[];
  /** スマホでは図の下の一覧を出さない(すぐ下に同じサービスの一覧があるページ用) */
  hideListOnMobile?: boolean;
}) {
  return (
    <Reveal variant="none">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="relative">
          <Rings items={items} />
          {/* 範囲の目盛り */}
          <div className="mx-auto mt-3 flex max-w-[26rem] items-center justify-between px-2 text-[10px] font-bold tracking-[0.14em] text-ink/45">
            <span>経営</span>
            <span
              aria-hidden="true"
              className="mx-3 h-px flex-1 bg-[linear-gradient(90deg,#7A1F3D,#F1D9E0)]"
            />
            <span>全社員</span>
          </div>
        </div>

        <ol className={hideListOnMobile ? "hidden lg:block" : ""}>
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
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black"
                  style={{ backgroundColor: ringFill[i], color: ringText[i] }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-ink/50">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: dot[i] }}
                      aria-hidden="true"
                    />
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
    </Reveal>
  );
}

/** サービス一覧・トップページで使う3サービス(押すと各LPへ) */
export function bondPyramidItems(path: (p: string) => string): PyramidItem[] {
  return [
    {
      layer: "経営",
      label: "責任者を担う",
      name: "情報セキュリティ顧問",
      text: "AI時代に特化した、中小企業向けの情報セキュリティ顧問。大企業・上場企業との取引に欠かせない体制を、専門家がアドバイザーや社外CISOとして一緒に整えます。",
      href: path("/services/ciso"),
    },
    {
      layer: "育成",
      label: "責任者を育てる",
      name: "CISO育成研修",
      text: "社内のCISO候補が、情報セキュリティの責任者としての役割と進め方を学びます。",
      href: path("/services/security-training"),
    },
    {
      layer: "全社員",
      label: "全社員で守る",
      name: "社内AI情報セキュリティ研修",
      text: "全社員が、AIを使うときの基本ルールや、詐欺メール・なりすましへの備えを身につけます。",
      href: path("/services/security-training"),
    },
  ];
}
