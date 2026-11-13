/**
 * 塗りつぶしのフラットなアイコンイラスト(輪郭線なし・はっきりした色面)。
 * Bond AI(CISO・セキュリティ顧問)LP のお悩みで使う。
 */
const WINE = "#7A1E35";
const ROSE = "#B4475F";
const PINK = "#F3D9E0";
const GOLD = "#F5B82E";
const INK = "#3A3442";
const GRAY = "#E6E1E3";
const SKIN = "#F6C9A8";

type Props = { className?: string };

/** 社員が会社の知らないところでAIを使っている */
export function IconShadowAi({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <ellipse cx="100" cy="146" rx="78" ry="8" fill={GRAY} />
      {/* ノートPC */}
      <rect x="38" y="52" width="104" height="70" rx="6" fill={INK} />
      <rect x="45" y="59" width="90" height="56" rx="3" fill="#fff" />
      <path d="M26 122h128l-8 14H34z" fill={WINE} />
      {/* 画面のチャット */}
      <rect x="52" y="66" width="44" height="12" rx="6" fill={PINK} />
      <rect x="84" y="84" width="44" height="12" rx="6" fill={ROSE} />
      <rect x="52" y="100" width="34" height="9" rx="4.5" fill={PINK} />
      {/* AIのバッジ */}
      <circle cx="150" cy="54" r="22" fill={WINE} />
      <text
        x="150"
        y="61"
        textAnchor="middle"
        fontSize="19"
        fontWeight="900"
        fill="#fff"
      >
        AI
      </text>
      {/* 大きな「？」 */}
      <path
        d="M168 14c-9 0-16 6-16 14h9c0-3 3-6 7-6s7 2.5 7 6c0 6-10 6-10 16h9c0-7 10-8 10-17 0-8-7-13-16-13z"
        fill={GOLD}
      />
      <path
        d="M22 40c-5 0-9 3-9 8h5c0-2 2-3 4-3s4 1 4 3c0 3-6 4-6 9h5c0-4 6-4 6-10 0-4-4-7-9-7z"
        fill={GOLD}
      />
      <circle cx="21" cy="62" r="2.6" fill={GOLD} />
    </svg>
  );
}

/** 「AIは危ないから禁止」で、活用が止まっている */
export function IconBanned({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <ellipse cx="100" cy="146" rx="78" ry="8" fill={GRAY} />
      {/* AIのチップ */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={70 + i * 16}
              y="26"
              width="6"
              height="12"
              rx="2"
              fill={INK}
            />
            <rect
              x={70 + i * 16}
              y="118"
              width="6"
              height="12"
              rx="2"
              fill={INK}
            />
            <rect
              x="40"
              y={56 + i * 16}
              width="12"
              height="6"
              rx="2"
              fill={INK}
            />
            <rect
              x="148"
              y={56 + i * 16}
              width="12"
              height="6"
              rx="2"
              fill={INK}
            />
          </g>
        ))}
        <rect x="50" y="36" width="100" height="84" rx="12" fill={ROSE} />
        <rect x="64" y="50" width="72" height="56" rx="8" fill={WINE} />
        <text
          x="100"
          y="88"
          textAnchor="middle"
          fontSize="28"
          fontWeight="900"
          fill="#fff"
        >
          AI
        </text>
      </g>
      {/* 禁止マーク */}
      <circle
        cx="100"
        cy="78"
        r="56"
        fill="none"
        stroke={GOLD}
        strokeWidth="12"
        opacity="0.95"
      />
      <path
        d="M61 39l78 78"
        stroke={GOLD}
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* 一時停止 */}
      <circle cx="166" cy="30" r="17" fill={INK} />
      <rect x="159" y="22" width="5" height="16" rx="1.5" fill="#fff" />
      <rect x="168" y="22" width="5" height="16" rx="1.5" fill="#fff" />
    </svg>
  );
}

/** 取引先からチェックシートや「★3」を求められた */
export function IconChecksheet({ className }: Props) {
  const star = (cx: number, cy: number, r: number, fill: string) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const rr = i % 2 === 0 ? r : r * 0.45;
      return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
    }).join(" ");
    return <polygon points={pts} fill={fill} />;
  };
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <ellipse cx="100" cy="146" rx="78" ry="8" fill={GRAY} />
      {/* クリップボード */}
      <rect x="56" y="34" width="88" height="106" rx="8" fill={WINE} />
      <rect x="64" y="44" width="72" height="88" rx="4" fill="#fff" />
      <rect x="82" y="28" width="36" height="14" rx="4" fill={INK} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="72"
            y={56 + i * 18}
            width="11"
            height="11"
            rx="2.5"
            fill={i < 2 ? ROSE : PINK}
          />
          {i < 2 ? (
            <path
              d={`M74.5 ${61.5 + i * 18}l2.5 2.5 4.5-5`}
              stroke="#fff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : null}
          <rect
            x="89"
            y={58.5 + i * 18}
            width={i % 2 ? 30 : 38}
            height="6"
            rx="3"
            fill={GRAY}
          />
        </g>
      ))}
      {/* ★3 */}
      <rect x="128" y="10" width="64" height="28" rx="14" fill={INK} />
      {star(144, 24, 8, GOLD)}
      {star(160, 24, 8, GOLD)}
      {star(176, 24, 8, GOLD)}
      {/* ペン */}
      <g transform="rotate(35 160 110)">
        <rect x="154" y="72" width="12" height="56" rx="3" fill={GOLD} />
        <path d="M154 128h12l-6 12z" fill={INK} />
      </g>
      {/* 「？」 */}
      <path
        d="M26 54c-6 0-11 4-11 10h6c0-2 2-4 5-4s5 2 5 4c0 4-7 4-7 11h6c0-5 7-5 7-12 0-5-5-9-11-9z"
        fill={GOLD}
      />
      <circle cx="24" cy="81" r="3" fill={GOLD} />
    </svg>
  );
}

/** 情シスが一人、または兼務で回している */
export function IconSoloIt({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <ellipse cx="100" cy="146" rx="78" ry="8" fill={GRAY} />
      {/* 机 */}
      <rect x="30" y="112" width="140" height="10" rx="3" fill={INK} />
      <rect x="40" y="122" width="8" height="22" fill={INK} />
      <rect x="152" y="122" width="8" height="22" fill={INK} />
      {/* 人(シンプルな人型) */}
      <path d="M72 112c0-22 12-34 28-34s28 12 28 34z" fill={WINE} />
      <path d="M94 80l6 12 6-12z" fill="#fff" />
      <circle cx="100" cy="60" r="16" fill={SKIN} />
      <path
        d="M84 58c0-12 7-18 16-18s16 6 16 16c-6-4-14-6-20-4-5 1-9 3-12 6z"
        fill={INK}
      />
      {/* モニター */}
      <rect x="120" y="84" width="40" height="28" rx="3" fill={ROSE} />
      <rect x="124" y="88" width="32" height="20" rx="2" fill={PINK} />
      {/* 次々と来る依頼(吹き出し) */}
      <g>
        <rect x="18" y="24" width="46" height="24" rx="8" fill={ROSE} />
        <path d="M44 48l-6 8 0-8z" fill={ROSE} />
        <text
          x="41"
          y="41"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#fff"
        >
          至急
        </text>
      </g>
      <g>
        <rect x="140" y="20" width="46" height="24" rx="8" fill={WINE} />
        <path d="M150 44l-2 8 8-8z" fill={WINE} />
        <text
          x="163"
          y="37"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#fff"
        >
          相談
        </text>
      </g>
      {/* 「！」 */}
      <rect x="96" y="6" width="8" height="18" rx="4" fill={GOLD} />
      <circle cx="100" cy="30" r="4" fill={GOLD} />
      <rect
        x="70"
        y="14"
        width="6"
        height="12"
        rx="3"
        fill={GOLD}
        transform="rotate(-25 73 20)"
      />
      <rect
        x="124"
        y="14"
        width="6"
        height="12"
        rx="3"
        fill={GOLD}
        transform="rotate(25 127 20)"
      />
    </svg>
  );
}
