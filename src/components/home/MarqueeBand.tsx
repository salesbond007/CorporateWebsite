const WORDS = ["Offense", "Defense", "Professional", "Sales Bond"];

/** セクションの間に流れる、大きな文字の帯 */
export function MarqueeBand() {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={
              "whitespace-nowrap px-6 font-display text-5xl font-black uppercase tracking-tight md:px-10 md:text-7xl " +
              (i % 2 === 0
                ? "text-white"
                : "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.75)]")
            }
          >
            {w}
          </span>
          <span className="text-2xl text-brand-300 md:text-4xl" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-700 to-brand-900 py-6 md:py-8"
    >
      <div className="flex w-max animate-marquee-band">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
