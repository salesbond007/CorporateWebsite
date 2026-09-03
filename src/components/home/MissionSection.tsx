import { Container } from "@/components/ui/Container";

type Node = {
  label: string;
  en: string;
  /** グリッド上の位置 (3x3) */
  position: "top" | "left" | "right" | "bottom";
};

const nodes: Node[] = [
  { label: "フィジカルAI", en: "Physical AI", position: "top" },
  { label: "プロ人材", en: "Talent", position: "left" },
  { label: "新しい顧客", en: "New Customers", position: "right" },
  { label: "世界", en: "Global", position: "bottom" },
];

const positionClass: Record<Node["position"], string> = {
  top: "col-start-2 row-start-1",
  left: "col-start-1 row-start-2",
  right: "col-start-3 row-start-2",
  bottom: "col-start-2 row-start-3",
};

function NetworkNode({ node }: { node: Node }) {
  return (
    <div
      className={`${positionClass[node.position]} flex flex-col items-center justify-center gap-1 rounded-2xl border border-brand-200/70 bg-white/80 p-3 text-center shadow-soft backdrop-blur-sm md:p-4`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-600 md:text-xs">
        {node.en}
      </p>
      <p className="text-sm font-black leading-tight text-ink md:text-base">
        {node.label}
      </p>
    </div>
  );
}

function Emphasis({ children }: { children: React.ReactNode }) {
  return <span className="font-black text-brand-600">{children}</span>;
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
            <p className="text-xl md:text-2xl lg:text-3xl font-black leading-snug text-ink">
              日本経済を支えてきた産業に
              <br />
              <span className="text-brand-500">新しい選択肢</span>を
            </p>

            <div className="mt-8 max-w-xl space-y-5 text-sm md:text-base text-ink-soft leading-[1.95] font-medium">
              <p>
                日本経済を支えてきた、
                <br />
                製造、建設、物流、医療、小売、宿泊をはじめとする企業。
                <br />
                私たちは、その可能性を<Emphasis>新しい力とつないでいきます</Emphasis>。
              </p>
              <p>
                現場と、<Emphasis>フィジカルAI</Emphasis>を。
                <br />
                企業と、<Emphasis>プロ人材</Emphasis>を。
                <br />
                サービスと、<Emphasis>新しい顧客</Emphasis>を。
                <br />
                日本企業と、<Emphasis>世界</Emphasis>を。
              </p>
              <p>
                一つひとつの出会いが、企業の新しい一歩になり、
                <Emphasis>これまでになかった選択肢を生み出します</Emphasis>。
              </p>
              <p>
                私たちは、企業がこれまで培ってきた強みを大切にしながら、
                <br />
                日本企業の可能性を広げ、
                <span className="relative inline-block font-black text-brand-600">
                  次の成長の選択肢をつくり続けます。
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-300"
                  />
                </span>
              </p>
            </div>
          </div>

          {/* Right: hub & spoke network diagram */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto grid aspect-square w-full max-w-md grid-cols-3 grid-rows-3 gap-3 md:gap-4">
              {/* 接続ライン */}
              <svg
                viewBox="0 0 100 100"
                className="pointer-events-none absolute inset-0 h-full w-full text-brand-300"
                aria-hidden="true"
              >
                <line x1="50" y1="16.5" x2="50" y2="50" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2.5 2.5" />
                <line x1="16.5" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2.5 2.5" />
                <line x1="83.5" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2.5 2.5" />
                <line x1="50" y1="83.5" x2="50" y2="50" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2.5 2.5" />
              </svg>

              {nodes.map((node) => (
                <NetworkNode key={node.label} node={node} />
              ))}

              {/* Center — Sales Bond hub */}
              <div className="relative col-start-2 row-start-2 flex flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-ink to-brand-900 p-3 text-white shadow-[0_24px_60px_-18px_rgba(29,5,11,0.65)] md:p-4">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-8 rounded-full bg-brand-300"
                />
                <p className="mt-2 font-display text-base font-black leading-none md:text-lg">
                  Sales
                </p>
                <p className="font-display text-base font-black leading-tight md:text-lg">
                  Bond
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
