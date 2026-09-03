import { Container } from "@/components/ui/Container";

type Cell = {
  label: string;
  en: string;
  bg: string;
  text: string;
};

const cells: Cell[] = [
  { label: "売上拡大", en: "Revenue", bg: "bg-brand-500", text: "text-white" },
  { label: "決裁者紹介", en: "Enterprise", bg: "bg-emerald-500", text: "text-white" },
  { label: "プロ人材/顧問紹介", en: "Talent", bg: "bg-rose-700", text: "text-white" },
  { label: "営業代行", en: "Sales", bg: "bg-sky-500", text: "text-white" },
];

function CrossCell({
  cell,
  className,
}: {
  cell: Cell;
  className: string;
}) {
  return (
    <div
      className={`${className} ${cell.bg} ${cell.text} flex flex-col items-center justify-center rounded-md p-3 shadow-card md:p-4`}
    >
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] opacity-90 md:text-xs">
        {cell.en}
      </p>
      <p className="mt-1 text-center text-sm font-black leading-tight md:mt-1.5 md:text-base">
        {cell.label}
      </p>
    </div>
  );
}

export function MissionSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-28 md:py-36">
      {/* Faded huge watermark text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
      >
        <p className="whitespace-nowrap font-display text-[clamp(6rem,18vw,16rem)] font-black leading-none tracking-tight text-ink/[0.045]">
          ONE BOND, EVERY ANSWER.
        </p>
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + copy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="block h-10 w-10 bg-ink md:h-12 md:w-12" />
              <h2 className="font-display font-black leading-none tracking-tight text-ink text-[clamp(3rem,8vw,6rem)] uppercase">
                Mission
              </h2>
            </div>

            <div className="mt-10 max-w-xl space-y-5 text-sm md:text-base text-ink-soft leading-[1.95] font-medium">
              <p>
                AIと現場。
                <br />
                現場と人材。
                <br />
                サービスと顧客。
                <br />
                日本企業と世界。
              </p>
              <p>
                一つひとつの出会いが、企業の新しい一歩になる。
                <br />
                一つひとつのつながりが、これまで選べなかった未来を選べるようにする。
              </p>
              <p>
                私たちは、つながりによって日本企業の可能性を広げ、
                <br />
                <span className="relative inline-block font-black text-brand-600">
                  次の選択肢をつくり続けます。
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-300"
                  />
                </span>
              </p>
            </div>
          </div>

          {/* Right: cross composition */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto grid aspect-square w-full max-w-md grid-cols-3 grid-rows-3 gap-2 md:gap-3">
              <CrossCell cell={cells[0]} className="col-start-2 row-start-1" />
              <CrossCell cell={cells[1]} className="col-start-1 row-start-2" />

              {/* Center — Sales Bond mark */}
              <div className="col-start-2 row-start-2 flex flex-col items-center justify-center rounded-md bg-ink p-3 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] md:p-4">
                <span
                  aria-hidden="true"
                  className="block h-1.5 w-8 rounded-full bg-brand-500"
                />
                <p className="mt-2 font-display text-base font-black leading-none md:text-lg">
                  Sales
                </p>
                <p className="font-display text-base font-black leading-tight md:text-lg">
                  Bond
                </p>
              </div>

              <CrossCell cell={cells[2]} className="col-start-3 row-start-2" />
              <CrossCell cell={cells[3]} className="col-start-2 row-start-3" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
