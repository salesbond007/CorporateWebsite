/**
 * セキュプロ LP のファーストビューの図。
 * 専任者がいない御社 ⇄ セキュプロ(窓口・契約はひとつ) ⇄ 3種類のプロ人材
 * (社外CISO / 認証・SCSの専門家 / 診断エンジニア)。
 * 動き: 点線が流れる / 中央が脈打つ / 課題に合わせて担当するプロが順番に光る。
 */

const W = "#7A1F3D";
const WD = "#5A142C";
const LINE = "#CFC6CA";
const INK = "#1F1A1C";

const pros = [
  { t: "社外CISO", s: "責任者として体制づくり", y: 92 },
  { t: "認証・SCSの専門家", s: "ISMS・SCSなどの取得準備", y: 212 },
  { t: "診断エンジニア", s: "脆弱性診断と実務の対応", y: 332 },
];

const HUB = { x: 262, y: 230 };

function Person({ x, y, c = W }: { x: number; y: number; c?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="17" fill="#F5E9ED" />
      <circle cy="-4" r="5.5" fill={c} />
      <path d="M-9 10c1.2-5.5 4.6-8.5 9-8.5s7.8 3 9 8.5z" fill={c} />
    </g>
  );
}

export function CisoHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <svg
        viewBox="0 0 560 470"
        className="h-auto w-full"
        role="img"
        aria-label="専任者がいない御社とセキュプロの窓口がひとつでつながり、社外CISO・認証やSCSの専門家・診断エンジニアの中から、課題に合わせて必要なプロ人材が対応する図"
      >
        {/* 背景の輪 */}
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r="150"
          fill="none"
          stroke="#EADDE1"
          strokeWidth="1"
        />
        <g className="hv-spin">
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="186"
            fill="none"
            stroke={W}
            strokeOpacity="0.25"
            strokeWidth="1.2"
            strokeDasharray="2 7"
          />
          <circle cx={HUB.x} cy={HUB.y - 186} r="4" fill={W} />
        </g>

        {/* 御社 → セキュプロ */}
        <path
          d={`M150 ${HUB.y}H${HUB.x - 62}`}
          stroke={W}
          strokeWidth="2"
          strokeDasharray="4 5"
          fill="none"
          className="hv-dash"
        />
        {/* セキュプロ → 各プロ */}
        {pros.map((p) => (
          <path
            key={p.t}
            d={`M${HUB.x + 62} ${HUB.y} C ${HUB.x + 100} ${HUB.y}, ${HUB.x + 90} ${p.y + 30}, 352 ${p.y + 30}`}
            stroke={W}
            strokeWidth="2"
            strokeDasharray="4 5"
            fill="none"
            className="hv-dash"
          />
        ))}

        {/* 御社 */}
        <g>
          <rect
            x="6"
            y={HUB.y - 70}
            width="144"
            height="140"
            rx="0"
            fill="#fff"
            stroke={LINE}
            strokeWidth="1.2"
          />
          <rect
            x="6"
            y={HUB.y - 70}
            width="144"
            height="5"
            fill={INK}
            fillOpacity="0.75"
          />
          <g transform={`translate(78 ${HUB.y - 20})`}>
            <rect
              x="-22"
              y="-26"
              width="44"
              height="52"
              fill="#F4F1F2"
              stroke={INK}
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            {[0, 1, 2].map((r) =>
              [0, 1].map((c) => (
                <rect
                  key={`${r}${c}`}
                  x={-14 + c * 18}
                  y={-18 + r * 13}
                  width="10"
                  height="7"
                  fill={INK}
                  fillOpacity="0.35"
                />
              )),
            )}
          </g>
          <text
            x="78"
            y={HUB.y + 30}
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill={INK}
          >
            御社
          </text>
          <text
            x="78"
            y={HUB.y + 50}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={INK}
            fillOpacity="0.55"
          >
            専任者がいない
          </text>
        </g>

        {/* セキュプロ(窓口) */}
        <g>
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="62"
            fill={W}
            className="hv-pulse"
            opacity="0.18"
          />
          <circle cx={HUB.x} cy={HUB.y} r="62" fill={W} />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="54"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.35"
          />
          <path
            d={`M${HUB.x} ${HUB.y - 36}l17 6.5v12c0 12-7.5 19.5-17 23.5-9.5-4-17-11.5-17-23.5v-12z`}
            fill="#fff"
          />
          <path
            d={`M${HUB.x - 7} ${HUB.y - 14}l5 5 10-10`}
            fill="none"
            stroke={WD}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={HUB.x}
            y={HUB.y + 26}
            textAnchor="middle"
            fontSize="16"
            fontWeight="900"
            fill="#fff"
            letterSpacing="1"
          >
            セキュプロ
          </text>
        </g>
        <g>
          <rect
            x={HUB.x - 72}
            y={HUB.y + 76}
            width="144"
            height="30"
            fill="#fff"
            stroke={W}
            strokeWidth="1.5"
          />
          <text
            x={HUB.x}
            y={HUB.y + 96}
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="900"
            fill={W}
          >
            窓口・契約はひとつ
          </text>
        </g>

        {/* 3種類のプロ人材(順番に光る) */}
        {pros.map((p, i) => (
          <g key={p.t}>
            <rect
              x="352"
              y={p.y}
              width="202"
              height="60"
              fill="#fff"
              stroke={LINE}
              strokeWidth="1.2"
            />
            <rect
              x="352"
              y={p.y}
              width="202"
              height="60"
              fill="none"
              stroke={W}
              strokeWidth="2.5"
              className="hv-cycle"
              style={{ animationDelay: `${i * 1.6}s` }}
            />
            <rect x="352" y={p.y} width="5" height="60" fill={W} />
            <Person x={384} y={p.y + 30} />
            <text
              x="410"
              y={p.y + 27}
              fontSize="13"
              fontWeight="900"
              fill={INK}
            >
              {p.t}
            </text>
            <text
              x="410"
              y={p.y + 45}
              fontSize="10.5"
              fontWeight="700"
              fill={INK}
              fillOpacity="0.55"
            >
              {p.s}
            </text>
          </g>
        ))}

        {/* 下の一文 */}
        <g>
          <rect x="120" y="420" width="320" height="34" fill={W} />
          <text
            x="280"
            y="442"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#fff"
          >
            課題に合わせて、必要なプロが対応します
          </text>
        </g>
      </svg>
    </div>
  );
}
