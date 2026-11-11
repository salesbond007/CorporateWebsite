/**
 * アポコミLP用のオリジナルのフラットイラスト(青基調)。
 * 背景の波線などの装飾。
 */
const ORANGE = "#0046C8";

/** 背景に流れる細い波線(装飾) */
export function WaveLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${120 + i * 9} C 360 ${20 + i * 14}, 720 ${300 - i * 8}, 1440 ${90 + i * 12}`}
          fill="none"
          stroke={ORANGE}
          strokeOpacity={0.12}
          strokeWidth={1.2}
        />
      ))}
    </svg>
  );
}
