/**
 * セキュプロ LP ファーストビューの背景イラスト(オリジナル)。
 * 斜め上から見た立体(アイソメトリック)のノートPC・サーバー・雲・画面と、小さな人物を、
 * 淡いワインレッド系でまとめる。うしろに点と線のネットワーク模様を敷く。
 * 文字やカードの読みやすさを優先し、主な絵は右側と下側に置く。
 */

const C = 0.866;
const S = 0.5;

/** 立体の点 → 画面の点 */
function iso(ox: number, oy: number, x: number, y: number, z: number) {
  return [ox + (x - y) * C, oy + (x + y) * S - z] as const;
}

function poly(pts: (readonly [number, number])[]) {
  return pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");
}

type Tone = { top: string; left: string; right: string };

const LIGHT: Tone = { top: "#FBF6F8", left: "#EBDCE2", right: "#DCC5CE" };
const MID: Tone = { top: "#F1E3E8", left: "#D9BEC8", right: "#C6A3B1" };
const WINE: Tone = { top: "#9C3A57", left: "#7A1F3D", right: "#5A142C" };

/** 直方体 */
function Box({
  ox,
  oy,
  x = 0,
  y = 0,
  z = 0,
  w,
  d,
  h,
  tone = LIGHT,
}: {
  ox: number;
  oy: number;
  x?: number;
  y?: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
}) {
  const p = (a: number, b: number, c: number) => iso(ox, oy, a, b, c);
  return (
    <g>
      <polygon
        points={poly([
          p(x, y + d, z),
          p(x + w, y + d, z),
          p(x + w, y + d, z + h),
          p(x, y + d, z + h),
        ])}
        fill={tone.left}
      />
      <polygon
        points={poly([
          p(x + w, y, z),
          p(x + w, y + d, z),
          p(x + w, y + d, z + h),
          p(x + w, y, z + h),
        ])}
        fill={tone.right}
      />
      <polygon
        points={poly([
          p(x, y, z + h),
          p(x + w, y, z + h),
          p(x + w, y + d, z + h),
          p(x, y + d, z + h),
        ])}
        fill={tone.top}
      />
    </g>
  );
}

/** 左手前を向いた面(X-Z面)に描くための変換 */
const faceXZ = (tx: number, ty: number) =>
  `matrix(${C} ${S} 0 1 ${tx.toFixed(1)} ${ty.toFixed(1)})`;
/** 上面(X-Y面)に描くための変換 */
const faceXY = (tx: number, ty: number) =>
  `matrix(${C} ${S} ${-C} ${S} ${tx.toFixed(1)} ${ty.toFixed(1)})`;

/** 小さな人物(フラット) */
function Person({
  x,
  y,
  body,
  hair = "#3A2A30",
  s = 1,
  pose = "stand",
}: {
  x: number;
  y: number;
  body: string;
  hair?: string;
  s?: number;
  pose?: "stand" | "walk" | "point";
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="13" ry="4" fill="#000" fillOpacity="0.08" />
      {pose === "walk" ? (
        <>
          <path
            d="M-2 -34L-9 -2"
            stroke="#2B2230"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M2 -34L8 -2"
            stroke="#2B2230"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <rect x="-5" y="-34" width="4.5" height="33" rx="2" fill="#2B2230" />
          <rect x="0.5" y="-34" width="4.5" height="33" rx="2" fill="#2B2230" />
        </>
      )}
      <path d="M-9 -34L-8 -60Q0 -64 8 -60L9 -34z" fill={body} />
      <path d="M-3 -61L0 -50L3 -61z" fill="#fff" />
      {pose === "point" ? (
        <path
          d="M7 -57L22 -66"
          stroke={body}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M8 -57L11 -40"
          stroke={body}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      )}
      <path
        d="M-8 -57L-11 -40"
        stroke={body}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <rect x="-2" y="-66" width="4" height="5" fill="#F1C7A5" />
      <circle cx="0" cy="-71" r="6.5" fill="#F1C7A5" />
      <path
        d="M-7 -71Q-7 -80 0 -79Q7 -80 7 -71Q4 -75 0 -75Q-4 -75 -7 -71z"
        fill={hair}
      />
    </g>
  );
}

/** 点と線のネットワーク模様(決まった並びで再現できるよう、乱数は固定) */
function Network() {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const pts = Array.from(
    { length: 46 },
    () => [rnd() * 1440, rnd() * 760] as const,
  );
  const lines: [number, number][] = [];
  pts.forEach((a, i) => {
    pts.forEach((b, j) => {
      if (j <= i) return;
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      if (dx * dx + dy * dy < 150 * 150) lines.push([i, j]);
    });
  });
  return (
    <g>
      {lines.map(([i, j]) => (
        <line
          key={`${i}-${j}`}
          x1={pts[i][0]}
          y1={pts[i][1]}
          x2={pts[j][0]}
          y2={pts[j][1]}
          stroke="#C9A6B3"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
      ))}
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 5 === 0 ? 3.2 : 2}
          fill="#C9A6B3"
          fillOpacity="0.45"
        />
      ))}
    </g>
  );
}

export function CisoHeroBg() {
  /* ノートPC(右下) */
  const LX = 1130;
  const LY = 505;
  const lw = 330;
  const ld = 220;
  const screenOrigin = iso(LX, LY, 0, 0, 14);

  /* サーバー(中央下) */
  const SX = 700;
  const SY = 662;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMaxYMax slice"
      className="absolute inset-0 -z-10 h-full w-full"
    >
      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F6ECEF" />
        </linearGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#hero-bg)" />
      <Network />

      {/* 雲(右上) */}
      <g opacity="0.95">
        <g transform="translate(1310 245)">
          {[
            [-70, 22, 46],
            [-20, 0, 62],
            [45, 12, 50],
            [90, 34, 34],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}`} cx={cx} cy={cy + 10} r={r} fill="#DCC5CE" />
          ))}
          <rect x="-116" y="44" width="240" height="22" fill="#DCC5CE" />
          {[
            [-70, 22, 46],
            [-20, 0, 62],
            [45, 12, 50],
            [90, 34, 34],
          ].map(([cx, cy, r]) => (
            <circle key={`t${cx}`} cx={cx} cy={cy} r={r} fill="#F3E8EC" />
          ))}
          <rect x="-116" y="34" width="240" height="22" fill="#F3E8EC" />
        </g>
        {/* 雲からのびる線 */}
        <path
          d="M1262 325V380M1322 325V370M1382 320V390"
          stroke="#C9A6B3"
          strokeWidth="2"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
      </g>

      {/* ノートPC */}
      <g>
        <Box ox={LX} oy={LY} w={lw} d={ld} h={14} tone={LIGHT} />
        {/* キーボード */}
        <g transform={faceXY(...iso(LX, LY, 30, 40, 14))}>
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 11 }).map((__, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 24}
                y={r * 22}
                width="19"
                height="17"
                rx="3"
                fill="#E4D2D9"
              />
            )),
          )}
          <rect x="90" y="104" width="90" height="46" rx="6" fill="#E4D2D9" />
        </g>
        {/* 画面 */}
        <Box
          ox={LX}
          oy={LY}
          x={0}
          y={-12}
          z={14}
          w={lw}
          d={12}
          h={230}
          tone={MID}
        />
        <g transform={faceXZ(screenOrigin[0], screenOrigin[1] - 230)}>
          <rect
            x="12"
            y="12"
            width={lw - 24}
            height="206"
            rx="4"
            fill="#4A1226"
          />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <rect
              key={i}
              x={150 + (i % 3) * 14}
              y={30 + i * 19}
              width={[90, 60, 110, 70, 40, 100, 80, 50, 96][i]}
              height="6"
              rx="3"
              fill={
                i % 4 === 0 ? "#E3A63B" : i % 3 === 0 ? "#C86A85" : "#E9CBD5"
              }
              fillOpacity="0.85"
            />
          ))}
          <circle
            cx="70"
            cy="70"
            r="34"
            fill="none"
            stroke="#C86A85"
            strokeWidth="10"
          />
          <path
            d="M70 36A34 34 0 0 1 103 78"
            fill="none"
            stroke="#F3D9E0"
            strokeWidth="10"
          />
          {/* 盾 */}
          <path
            d="M70 128l22 8v15c0 15-9 25-22 30-13-5-22-15-22-30v-15z"
            fill="#F3D9E0"
          />
          <path
            d="M60 154l7 7 13-13"
            fill="none"
            stroke="#7A1F3D"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* サーバー(積み重ね) */}
      <g>
        {[0, 1].map((i) => (
          <g key={i}>
            <Box
              ox={SX}
              oy={SY}
              z={i * 52}
              w={110}
              d={110}
              h={46}
              tone={i % 2 ? LIGHT : MID}
            />
            <g transform={faceXZ(...iso(SX, SY, 0, 110, i * 52 + 46))}>
              <rect
                x="56"
                y="16"
                width="42"
                height="7"
                rx="3.5"
                fill="#9C3A57"
                fillOpacity="0.8"
              />
              {[0, 1, 2].map((k) => (
                <circle
                  key={k}
                  cx={14 + k * 10}
                  cy="20"
                  r="2.6"
                  fill={k === 0 ? "#E3A63B" : "#B4475F"}
                />
              ))}
            </g>
          </g>
        ))}
      </g>

      {/* 小さな人 */}
      <Person
        x={585}
        y={752}
        body="#B4475F"
        hair="#5A2A36"
        pose="walk"
        s={1.05}
      />
      <Person x={1390} y={745} body="#3F3450" pose="stand" s={1} />

      {/* 小さな立方体のかざり */}
      <Box ox={1230} oy={430} w={30} d={30} h={30} tone={WINE} />
    </svg>
  );
}
