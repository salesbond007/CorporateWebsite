/**
 * サイト共通のやわらかい線画イラスト(オリジナル)。
 * 黒の太めの線 + 1色のアクセントの塗り。丸い背景の上に置いて使う。
 * accent でアクセントの色を変えられる(情報セキュリティ=ピンク / 経営顧問=水色)。
 */

const K = "#1F1A1C";

type P = { accent?: string; className?: string };

const line = {
  fill: "none",
  stroke: K,
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({
  children,
  className = "h-full w-full",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

/** 胸から上の人(線画)。x,y は首もと */
function Bust({
  x,
  y,
  accent,
  s = 1,
  fill = "#fff",
}: {
  x: number;
  y: number;
  accent?: string;
  s?: number;
  fill?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-22 30c0-17 10-27 22-27s22 10 22 27z"
        {...line}
        fill={accent ?? fill}
      />
      <circle cx="0" cy="-12" r="12" {...line} fill="#fff" />
      <path d="M-5 3l5 8 5-8" {...line} />
    </g>
  );
}

/** セキュプロ: 情報セキュリティのプロ人材(3人と盾) */
export function IllSecuPro({ accent = "#E8B9C5", className }: P) {
  return (
    <Svg
      className={className}
      label="情報セキュリティのプロ人材が3人そろっている絵"
    >
      <Bust x={58} y={110} />
      <Bust x={142} y={110} />
      <Bust x={100} y={100} s={1.15} accent={accent} />
      {/* 盾 */}
      <g transform="translate(100 44)">
        <path
          d="M0 -20l17 6v11c0 12-7 20-17 24-10-4-17-12-17-24v-11z"
          {...line}
          fill={accent}
        />
        <path d="M-6 0l4.5 4.5L7 -4" {...line} />
      </g>
      <path d="M40 160h120" {...line} />
      <circle cx="30" cy="62" r="4" fill={K} />
      <circle
        cx="170"
        cy="70"
        r="4"
        fill={accent}
        stroke={K}
        strokeWidth="2.5"
      />
    </Svg>
  );
}

/** ホームページの情報セキュリティ対策(画面と鍵) */
export function IllWebSecurity({ accent = "#E8B9C5", className }: P) {
  return (
    <Svg className={className} label="ホームページを鍵で守っている絵">
      <rect
        x="36"
        y="48"
        width="128"
        height="88"
        rx="6"
        {...line}
        fill="#fff"
      />
      <path d="M36 66h128" {...line} />
      <circle cx="48" cy="57" r="2.5" fill={K} />
      <circle cx="58" cy="57" r="2.5" fill={K} />
      <rect
        x="50"
        y="78"
        width="46"
        height="10"
        rx="5"
        {...line}
        fill={accent}
      />
      <path d="M50 102h40M50 116h30" {...line} />
      {/* 鍵 */}
      <g transform="translate(128 112)">
        <rect
          x="-20"
          y="-6"
          width="40"
          height="34"
          rx="5"
          {...line}
          fill={accent}
        />
        <path d="M-11 -6v-8a11 11 0 0 1 22 0v8" {...line} />
        <circle cx="0" cy="8" r="3.5" fill={K} />
        <path d="M0 11v7" {...line} />
      </g>
      <path d="M86 136l-6 18h40l-6-18M70 154h60" {...line} />
    </Svg>
  );
}

/** 顧問・COO紹介(握手とのびる矢印) */
export function IllAdvisory({ accent = "#B9CDEE", className }: P) {
  return (
    <Svg className={className} label="経営のプロと握手し、事業がのびていく絵">
      <path d="M40 130l34-30 24 18 46-50" {...line} />
      <path d="M128 66l18 2-2 18" {...line} />
      <Bust x={62} y={150} s={0.8} accent={accent} />
      <Bust x={138} y={150} s={0.8} />
      <circle cx="74" cy="100" r="6" {...line} fill={accent} />
      <circle cx="98" cy="118" r="6" {...line} fill="#fff" />
      <path d="M30 40h26M43 27v26" {...line} />
    </Svg>
  );
}

/** アポコミ(電話・メール・手紙で新規アポイント) */
export function IllApokomi({ accent = "#B9CDEE", className }: P) {
  return (
    <Svg className={className} label="電話やメールで新しいアポイントをつくる絵">
      {/* 的 */}
      <circle cx="100" cy="100" r="34" {...line} fill="#fff" />
      <circle cx="100" cy="100" r="20" {...line} fill={accent} />
      <circle cx="100" cy="100" r="6" fill={K} />
      <path d="M100 100l34-34M128 60l8 0 0 8" {...line} />
      {/* 電話 */}
      <g transform="translate(46 58)">
        <rect
          x="-12"
          y="-14"
          width="24"
          height="28"
          rx="6"
          {...line}
          fill="#fff"
        />
        <path d="M-5 -4c2 6 6 9 10 10" {...line} />
      </g>
      {/* メール */}
      <g transform="translate(48 148)">
        <rect
          x="-18"
          y="-12"
          width="36"
          height="24"
          rx="3"
          {...line}
          fill={accent}
        />
        <path d="M-18 -10l18 12 18-12" {...line} />
      </g>
      {/* 吹き出し */}
      <g transform="translate(154 146)">
        <path d="M-20 -14h40v24h-26l-8 8v-8h-6z" {...line} fill="#fff" />
        <path d="M-10 -3h20M-10 4h12" {...line} />
      </g>
      <path
        d="M46 72v22M58 136l14-12M134 132l-12-10"
        {...line}
        strokeDasharray="1 7"
      />
    </Svg>
  );
}

/** 会社概要の見出し: 街とオフィス、話す人たち */
export function IllCompany({ accent = "#E8B9C5", className }: P) {
  return (
    <Svg className={className} label="街のオフィスで人が話している絵">
      <path d="M18 168h164" {...line} />
      {/* ビル */}
      <rect x="34" y="62" width="44" height="106" {...line} fill="#fff" />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect
            x="44"
            y={74 + r * 20}
            width="9"
            height="10"
            fill={r === 1 ? accent : "#fff"}
            stroke={K}
            strokeWidth="2.5"
          />
          <rect
            x="59"
            y={74 + r * 20}
            width="9"
            height="10"
            fill="#fff"
            stroke={K}
            strokeWidth="2.5"
          />
        </g>
      ))}
      <rect x="122" y="92" width="44" height="76" {...line} fill={accent} />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect
            x="132"
            y={104 + r * 20}
            width="9"
            height="10"
            fill="#fff"
            stroke={K}
            strokeWidth="2.5"
          />
          <rect
            x="147"
            y={104 + r * 20}
            width="9"
            height="10"
            fill="#fff"
            stroke={K}
            strokeWidth="2.5"
          />
        </g>
      ))}
      {/* 人 */}
      <Bust x={100} y={138} s={0.85} accent={accent} />
      {/* 吹き出し */}
      <g transform="translate(100 56)">
        <path d="M-22 -16h44v28h-16l-6 9-6-9h-16z" {...line} fill="#fff" />
        <circle cx="-9" cy="-2" r="2.6" fill={K} />
        <circle cx="0" cy="-2" r="2.6" fill={K} />
        <circle cx="9" cy="-2" r="2.6" fill={K} />
      </g>
      <circle cx="170" cy="46" r="10" {...line} fill="#fff" />
      <path d="M24 44c6-8 18-8 22 0" {...line} />
    </Svg>
  );
}

/** 会社情報(書類とペン) */
export function IllProfile({ accent = "#E8B9C5", className }: P) {
  return (
    <Svg className={className} label="会社の書類の絵">
      <rect
        x="52"
        y="34"
        width="88"
        height="124"
        rx="4"
        {...line}
        fill="#fff"
      />
      <rect
        x="66"
        y="52"
        width="40"
        height="12"
        rx="6"
        {...line}
        fill={accent}
      />
      <path d="M66 82h60M66 98h60M66 114h44M66 130h52" {...line} />
      <g transform="translate(146 130) rotate(35)">
        <rect
          x="-6"
          y="-40"
          width="12"
          height="52"
          rx="3"
          {...line}
          fill={accent}
        />
        <path d="M-6 12l6 12 6-12" {...line} fill="#fff" />
      </g>
    </Svg>
  );
}

/** アクセス(地図とピン) */
export function IllAccess({ accent = "#E8B9C5", className }: P) {
  return (
    <Svg className={className} label="地図とピンの絵">
      <path
        d="M36 62l40-14 48 14 40-14v92l-40 14-48-14-40 14z"
        {...line}
        fill="#fff"
      />
      <path d="M76 48v92M124 62v92" {...line} />
      <g transform="translate(100 92)">
        <path
          d="M0 26c-14-16-22-26-22-38a22 22 0 0 1 44 0c0 12-8 22-22 38z"
          {...line}
          fill={accent}
        />
        <circle cx="0" cy="-12" r="7" {...line} fill="#fff" />
      </g>
    </Svg>
  );
}
