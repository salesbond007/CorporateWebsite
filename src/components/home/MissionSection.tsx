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

            <p className="mt-10 text-xl md:text-2xl lg:text-3xl font-black leading-snug text-ink">
              挑む企業に最短で、
              <span className="text-brand-500">確実な解</span>
              を。
            </p>

            <div className="mt-8 max-w-xl space-y-5 text-sm md:text-base text-ink-soft leading-[1.95] font-medium">
              <p>
                明確な経営課題を抱えながらも、その遂行が
                <span className="font-black text-ink">思うように進まない</span>
                事例は少なくありません。
              </p>
              <p>
                <span className="font-black text-ink">売上拡大</span>、
                <span className="font-black text-ink">大手企業開拓</span>、
                <span className="font-black text-ink">人事採用</span>、
                <span className="font-black text-ink">DX推進</span>——。
              </p>
              <p>
                社内リソースのみで対処を図る場合、
                <span className="relative inline-block font-black text-ink">
                  対応範囲には自ずと限界
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-300"
                  />
                </span>
                があり、
                <span className="font-black text-ink">施策実行のスピードも鈍化</span>
                する傾向にあります。
              </p>
              <p>
                当社は、大手・上場企業の役員・部長職以上を中心とした
                <span className="font-black text-ink">実績豊富なプロフェッショナル人材</span>
                と、それらが長年にわたり構築してきた
                <span className="relative inline-block font-black text-ink">
                  事業ネットワーク
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-300"
                  />
                </span>
                をご提供いたします。
              </p>
              <p>
                社内に存在しない
                <span className="font-black text-brand-600">知見・人脈・実行力</span>
                を、最適な形で外部から導入することで、
                <span className="relative inline-block font-black text-ink">
                  組織の課題解決を加速
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-300"
                  />
                </span>
                させます。
              </p>
              <p>
                セールスボンドは、企業が
                <span className="font-black text-ink">次なる成長フェーズ</span>
                へと移行するための、
                <span className="relative inline-block font-black text-brand-600">
                  確かな起点
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-300"
                  />
                </span>
                となることを使命としています。
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
