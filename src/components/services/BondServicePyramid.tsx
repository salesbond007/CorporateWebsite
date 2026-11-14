import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Bond AI セキュリティのサービス全体をピラミッドで示す図。
 * 上(経営)から下(全社員)へ: 社外AI/CISO → AIセキュリティ顧問 → CISO育成研修 → 社内AIセキュリティ研修
 * PC: 左にピラミッド、そこから線を引いて右にサービス名と説明。
 * スマホ: 小さめのピラミッドの下に、色をそろえた一覧。
 */

export type PyramidItem = {
  layer: string;
  label: string;
  name: string;
  text: string;
  href: string;
};

const fills = ["#5A142C", "#7A1F3D", "#A3445F", "#E2BDC8"];
const textOn = ["#fff", "#fff", "#fff", "#5A142C"];

const ROW = 96; // 1段の高さ(SVG座標 = px)
const HALF = 150; // ピラミッド底辺の半分の幅
const CX = 160;

function halfAt(y: number) {
  return (HALF * y) / (ROW * 4);
}

function Pyramid({ items, lines }: { items: PyramidItem[]; lines?: boolean }) {
  const width = lines ? 420 : 320;
  return (
    <svg
      viewBox={`0 0 ${width} ${ROW * 4}`}
      className={
        lines ? "h-[24rem] w-auto" : "mx-auto h-auto w-full max-w-[18rem]"
      }
      role="img"
      aria-label={`サービスの全体像：上から${items.map((i) => i.name).join("、")}`}
    >
      {items.map((it, i) => {
        const y0 = i * ROW;
        const y1 = (i + 1) * ROW;
        const w0 = halfAt(y0);
        const w1 = halfAt(y1);
        const mid = (y0 + y1) / 2;
        const edge = CX + halfAt(mid);
        return (
          <g
            key={it.name}
            className="opacity-0 transition-opacity duration-700 group-data-[visible=true]/reveal:opacity-100"
            style={{ transitionDelay: `${(3 - i) * 140}ms` }}
          >
            <polygon
              points={`${CX - w0},${y0} ${CX + w0},${y0} ${CX + w1},${y1} ${CX - w1},${y1}`}
              fill={fills[i]}
              stroke="#fff"
              strokeWidth="3"
            />
            <text
              x={CX}
              y={i === 0 ? mid + 18 : mid + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              letterSpacing="2"
              fill={textOn[i]}
            >
              {it.layer}
            </text>
            {lines ? (
              <>
                <line
                  x1={edge - 6}
                  y1={mid}
                  x2={width - 6}
                  y2={mid}
                  stroke="#C9B5BC"
                  strokeWidth="1.2"
                />
                <circle cx={width - 6} cy={mid} r="4.5" fill="#5A142C" />
              </>
            ) : null}
          </g>
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
  if (it.href.startsWith("#")) {
    return (
      <a href={it.href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={it.href} className={className}>
      {children}
    </Link>
  );
}

export function BondServicePyramid({ items }: { items: PyramidItem[] }) {
  return (
    <Reveal variant="none">
      {/* PC */}
      <div className="hidden items-start lg:flex">
        <div className="shrink-0">
          <Pyramid items={items} lines />
        </div>
        <ul className="min-w-0 flex-1 divide-y divide-[#E9E1DD] border-y border-[#E9E1DD]">
          {items.map((it, i) => (
            <li
              key={it.name}
              className="h-24 opacity-0 transition-all duration-700 group-data-[visible=true]/reveal:translate-x-0 group-data-[visible=true]/reveal:opacity-100 translate-x-4"
              style={{ transitionDelay: `${400 + i * 120}ms` }}
            >
              <ItemLink
                it={it}
                className="group flex h-full items-center gap-6 pl-6 pr-2"
              >
                <div className="w-[17rem] shrink-0 xl:w-[19rem]">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-ink/50">
                    {it.label}
                  </p>
                  <p className="mt-1 text-[1.3rem] font-black leading-snug text-ink transition-colors group-hover:text-brand-500 xl:text-[1.45rem]">
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
            <li key={it.name}>
              <ItemLink
                it={it}
                className="group flex items-center gap-4 border border-[#E9E1DD] bg-white py-4 pl-0 pr-4"
              >
                <span
                  aria-hidden="true"
                  className="w-1.5 self-stretch"
                  style={{ backgroundColor: fills[i] }}
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
