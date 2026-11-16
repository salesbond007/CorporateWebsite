import type { ReactNode } from "react";

/**
 * Bond AI 情報セキュリティ LP のファーストビューの図。
 * 白地に細い線のカード、点線でつながる流れ、中央の盾と台座という「すっきりした図解」の雰囲気で、
 * 社内のリスク(左) → 専門家が担当(中央) → 整理された対策(右) → 経営への定期レポート(下) を表す。
 * 動き: 外側の輪がゆっくり回る、点線が流れる、つなぎ目が波打つ、下の盾が浮く。
 * 書いてよいのはサービスに含まれる内容だけ(24時間監視などは書かない)。
 */

const WINE = "#7A1F3D";
const WINE_D = "#5A142C";
const LINE = "#CFC6CA";
const SOFT = "#EFE9EB";
const RED = "#D64545";
const INK = "#1F1A1C";

function Pill({
  x,
  y,
  w,
  icon,
  children,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  icon: ReactNode;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={34}
        rx={17}
        fill="#fff"
        stroke={accent ? WINE : LINE}
        strokeWidth={accent ? 1.6 : 1.2}
      />
      <g transform={`translate(${x + 14} ${y + 8})`}>{icon}</g>
      <text
        x={x + 38}
        y={y + 22}
        fontSize="14"
        fontWeight="700"
        fill={INK}
        letterSpacing="0.5"
      >
        {children}
      </text>
    </g>
  );
}

/* 18x18 の小さな線アイコン */
const iconSearch = (
  <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round">
    <circle cx="7.5" cy="7.5" r="5.5" />
    <path d="M12 12l5 5" />
  </g>
);
const iconPerson = (
  <g fill="none" stroke={WINE} strokeWidth="2" strokeLinecap="round">
    <circle cx="9" cy="5.5" r="3.6" />
    <path d="M2 17.5c.9-3.8 3.6-6 7-6s6.1 2.2 7 6" />
  </g>
);
const iconWarn = (
  <g>
    <path
      d="M9 1.5l8 14.5H1z"
      fill="none"
      stroke={RED}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M9 7v4" stroke={RED} strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="13.4" r="1.1" fill={RED} />
  </g>
);
const iconMail = (
  <g fill="none" stroke={WINE} strokeWidth="2" strokeLinejoin="round">
    <rect x="1" y="3" width="16" height="12" rx="1.5" />
    <path d="M1.5 4l7.5 6 7.5-6" />
  </g>
);

/** 左: 社内で起きていること(カード) */
function RiskCard({
  y,
  label,
  badge,
  delay,
}: {
  y: number;
  label: string;
  badge: string;
  delay: number;
}) {
  const x = 6;
  return (
    <g>
      <rect x={x + 4} y={y + 4} width={152} height={68} rx={6} fill={SOFT} />
      <rect
        x={x}
        y={y}
        width={152}
        height={68}
        rx={6}
        fill="#fff"
        stroke={LINE}
        strokeWidth="1.2"
      />
      {/* 人のアイコン */}
      <circle cx={x + 25} cy={y + 30} r={14} fill="#EDE8EA" />
      <circle cx={x + 25} cy={y + 26} r={5} fill="#B9AFB3" />
      <path
        d={`M${x + 16} ${y + 41}c1.5-5 4.5-7 9-7s7.5 2 9 7`}
        fill="#B9AFB3"
      />
      <rect
        x={x + 48}
        y={y + 13}
        width={64}
        height={5}
        rx={2.5}
        fill="#E3DDDF"
      />
      <text x={x + 48} y={y + 36} fontSize="12" fontWeight="700" fill={INK}>
        {label}
      </text>
      <rect x={x + 48} y={y + 44} width={46} height={16} rx={3} fill={RED} />
      <text
        x={x + 71}
        y={y + 56}
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        textAnchor="middle"
      >
        {badge}
      </text>
      {/* 注意マーク(ゆっくり点滅) */}
      <g
        className="hv-blink"
        style={{ animationDelay: `${delay}s` }}
        transform={`translate(${x + 120} ${y + 40})`}
      >
        <path d="M11 1l10 18H1z" fill={RED} />
        <path
          d="M11 7.5v5.5"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="11" cy="16" r="1.3" fill="#fff" />
      </g>
    </g>
  );
}

export function CisoHeroVisual() {
  const cx = 284;
  const cy = 210;
  const R = 104;
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <svg
        viewBox="0 0 560 500"
        className="h-auto w-full"
        role="img"
        aria-label="社内のAI利用などのリスクを、社外CISOが把握して整理し、対策と経営への定期レポートにつなげるイメージ"
      >
        {/* ===== 上: 3つのラベル ===== */}
        <Pill x={2} y={14} w={182} icon={iconSearch}>
          社内の<tspan fill={WINE}>AI利用</tspan>を把握
        </Pill>
        <Pill x={199} y={14} w={170} icon={iconPerson} accent>
          <tspan fill={WINE}>社外CISO</tspan>が担当
        </Pill>
        <Pill x={384} y={14} w={172} icon={iconWarn}>
          リスクを<tspan fill={WINE}>整理</tspan>
        </Pill>

        {/* ===== 点線のつなぎ(流れる) ===== */}
        <g
          fill="none"
          stroke={WINE}
          strokeWidth="1.6"
          strokeDasharray="3 4"
          className="hv-dash"
        >
          {/* 左のカード → 中央 */}
          <path
            d={`M158 113H172V${cy}M158 ${cy}H${cx - R}M158 307H172V${cy}`}
          />
          {/* 上のラベル → 中央 */}
          <path d={`M${cx} 48V${cy - R}`} />
          {/* 中央 → 右のレポート */}
          <path d={`M${cx + R} ${cy}H404`} />
          {/* 中央 → 下の台座 */}
          <path d={`M${cx} ${cy + R}V366`} />
        </g>
        <path
          d="M398 204l7 6-7 6"
          fill="none"
          stroke={WINE}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ===== 左: 社内で起きていること ===== */}
        <RiskCard y={79} label="生成AIへの入力" badge="要確認" delay={0} />
        <RiskCard y={176} label="取引先の確認書類" badge="未回答" delay={0.6} />
        <RiskCard y={273} label="不審なメール" badge="要注意" delay={1.2} />

        {/* ===== 中央: 盾と輪 ===== */}
        <circle
          cx={cx}
          cy={cy}
          r={R + 14}
          fill="none"
          stroke="#E6DADE"
          strokeWidth="1"
        />
        <g className="hv-spin">
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke={WINE}
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeDasharray="2 5"
          />
        </g>
        <circle
          cx={cx}
          cy={cy}
          r={86}
          fill="#fff"
          stroke="#DCCFD4"
          strokeWidth="1.2"
        />
        <circle
          cx={cx}
          cy={cy}
          r={74}
          fill="#FBF5F7"
          stroke={WINE}
          strokeOpacity="0.8"
          strokeWidth="2.4"
        />
        {/* つなぎ目の点(波打つ) */}
        {[
          [cx - R, cy],
          [cx + R, cy],
          [cx, cy - R],
          [cx, cy + R],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={5}
              fill={WINE}
              className="hv-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <circle cx={x} cy={y} r={4.5} fill={WINE} />
          </g>
        ))}
        {/* 盾 */}
        <path
          d={`M${cx} 158l44 16v34c0 30-19 50-44 60-25-10-44-30-44-60v-34z`}
          fill={WINE}
        />
        <path d={`M${cx} 168l34 12v28c0 24-15 40-34 48z`} fill={WINE_D} />
        {/* 盾の中のネットワークと鍵 */}
        <g stroke="#fff" strokeOpacity="0.55" strokeWidth="1.3">
          <path
            d={`M${cx - 24} 196L${cx - 8} 188M${cx + 24} 196L${cx + 8} 188M${cx - 24} 196V224M${cx + 24} 196V224`}
          />
        </g>
        {[
          [cx - 24, 196],
          [cx + 24, 196],
          [cx - 8, 188],
          [cx + 8, 188],
          [cx - 24, 224],
          [cx + 24, 224],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.6} fill="#fff" />
        ))}
        <rect x={cx - 15} y={208} width={30} height={23} rx={4} fill="#fff" />
        <path
          d={`M${cx - 9} 208v-6a9 9 0 0 1 18 0v6`}
          fill="none"
          stroke="#fff"
          strokeWidth="4"
        />
        <circle cx={cx} cy={217} r={3.2} fill={WINE} />
        <rect
          x={cx - 1.6}
          y={218}
          width={3.2}
          height={7}
          rx={1.4}
          fill={WINE}
        />

        {/* ===== 右: 整理された対策(レポート) ===== */}
        <g className="hv-float">
          <rect x={412} y={74} width={144} height={274} rx={6} fill={SOFT} />
          <rect
            x={406}
            y={68}
            width={144}
            height={274}
            rx={6}
            fill="#fff"
            stroke={LINE}
            strokeWidth="1.2"
          />
          <text
            x={420}
            y={96}
            fontSize="11.5"
            fontWeight="800"
            fill={WINE}
            letterSpacing="1.2"
          >
            SECURITY REPORT
          </text>
          <rect x={420} y={104} width={60} height={3} fill={WINE} />
          {[
            "AI利用のルール",
            "取引先への回答",
            "事故時の初動",
            "改善の優先順位",
          ].map((t, i) => (
            <g key={t}>
              <circle cx={428} cy={130 + i * 28} r={7.5} fill={WINE} />
              <path
                d={`M424.5 ${130 + i * 28}l2.5 2.5 4.5-5`}
                fill="none"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x={442}
                y={134 + i * 28}
                fontSize="12"
                fontWeight="700"
                fill={INK}
              >
                {t}
              </text>
            </g>
          ))}
          {/* 小さなグラフ */}
          <line x1={420} y1={322} x2={492} y2={322} stroke={LINE} />
          {[14, 22, 18, 30, 26, 38].map((h, i) => (
            <rect
              key={i}
              x={423 + i * 11}
              y={322 - h}
              width={6}
              height={h}
              fill={i === 5 ? WINE : "#D9C3CA"}
            />
          ))}
          <circle cx={522} cy={300} r={16} fill="#EBDDE2" />
          <path d="M522 300V284A16 16 0 0 1 537.2 305z" fill={WINE} />
        </g>

        {/* ===== 下: 台座と盾 ===== */}
        <g className="hv-ring">
          <ellipse
            cx={cx}
            cy={430}
            rx={150}
            ry={30}
            fill="none"
            stroke="#E6DADE"
            strokeWidth="1"
          />
          <ellipse
            cx={cx}
            cy={430}
            rx={108}
            ry={22}
            fill="none"
            stroke="#E6DADE"
            strokeWidth="1"
          />
        </g>
        <path
          d={`M${cx} 408l52 20-52 20-52-20z`}
          fill="#F8F4F5"
          stroke={LINE}
          strokeWidth="1.2"
        />
        <path
          d={`M${cx - 52} 428l52 20v12l-52-20z`}
          fill="#ECE5E7"
          stroke={LINE}
          strokeWidth="1.2"
        />
        <path
          d={`M${cx + 52} 428l-52 20v12l52-20z`}
          fill="#DED4D7"
          stroke={LINE}
          strokeWidth="1.2"
        />
        <g className="hv-float" style={{ animationDelay: "0.8s" }}>
          <path
            d={`M${cx} 368l26 10v20c0 18-11 30-26 36-15-6-26-18-26-36v-20z`}
            fill="#fff"
            stroke={WINE}
            strokeWidth="2.4"
          />
          <path
            d={`M${cx - 10} 400l7 7 13-14`}
            fill="none"
            stroke={WINE}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 下のラベル */}
        <g>
          <rect
            x={cx - 112}
            y={464}
            width={224}
            height={32}
            rx={16}
            fill="#fff"
            stroke={LINE}
            strokeWidth="1.2"
          />
          <g transform={`translate(${cx - 98} 471)`}>{iconMail}</g>
          <text x={cx - 74} y={485} fontSize="13" fontWeight="700" fill={INK}>
            毎月、<tspan fill={WINE}>経営へ定期レポート</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}
