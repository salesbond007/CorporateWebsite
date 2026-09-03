import { Container } from "@/components/ui/Container";

function Emphasis({ children }: { children: React.ReactNode }) {
  return <span className="font-black text-brand-600">{children}</span>;
}

const pairs = [
  { from: "現場", to: "フィジカルAI" },
  { from: "企業", to: "プロ人材" },
  { from: "サービス", to: "新しい顧客" },
  { from: "日本企業", to: "世界" },
];

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
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto block h-1 w-14 rounded-full bg-brand-500"
          />

          <p className="mt-8 text-2xl md:text-3xl lg:text-4xl font-black leading-snug text-ink">
            日本経済を支えてきた産業に
            <br />
            <span className="text-brand-500">新しい選択肢</span>を
          </p>

          <p className="mx-auto mt-8 max-w-xl text-sm md:text-base text-ink-soft leading-[1.95] font-medium">
            日本経済を支えてきた、
            製造、建設、物流、医療、小売、宿泊をはじめとする企業。
            私たちは、その可能性を
            <Emphasis>新しい力とつないでいきます</Emphasis>。
          </p>

          <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {pairs.map((p) => (
              <li
                key={p.to}
                className="flex items-center gap-2 rounded-full border border-ink-line bg-white px-5 py-2.5 shadow-soft"
              >
                <span className="text-xs font-bold text-ink-muted md:text-sm">
                  {p.from}
                </span>
                <span aria-hidden="true" className="text-brand-300">
                  ×
                </span>
                <span className="text-xs font-black text-brand-600 md:text-sm">
                  {p.to}
                </span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-10 max-w-xl text-sm md:text-base text-ink-soft leading-[1.95] font-medium">
            一つひとつの出会いが、企業の新しい一歩になり、
            <Emphasis>これまでになかった選択肢を生み出します</Emphasis>。
          </p>

          <div className="mx-auto mt-12 max-w-xl border-t border-ink-line pt-8">
            <p className="text-base md:text-lg font-black leading-relaxed text-ink">
              私たちは、企業がこれまで培ってきた強みを大切にしながら、
              日本企業の可能性を広げ、
              <span className="relative inline-block text-brand-600">
                次の成長の選択肢をつくり続けます。
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-300"
                />
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
