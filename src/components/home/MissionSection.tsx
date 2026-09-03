import { Container } from "@/components/ui/Container";

function Emphasis({ children }: { children: React.ReactNode }) {
  return <span className="font-black text-brand-600">{children}</span>;
}

type Connection = {
  from: string;
  to: string;
  toEn: string;
  icon: React.ReactNode;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-5 w-5 md:h-6 md:w-6",
};

const connections: Connection[] = [
  {
    from: "現場と",
    to: "フィジカルAI",
    toEn: "Physical AI",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
      </svg>
    ),
  },
  {
    from: "企業と",
    to: "プロ人材",
    toEn: "Talent",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
      </svg>
    ),
  },
  {
    from: "サービスと",
    to: "新しい顧客",
    toEn: "New Customers",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l1.8 4.4L18 9l-4.2 1.6L12 15l-1.8-4.4L6 9l4.2-1.6L12 3z" />
        <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
      </svg>
    ),
  },
  {
    from: "日本企業と",
    to: "世界",
    toEn: "Global",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
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
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
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

          {/* Right: mission visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-ink-line bg-white p-7 shadow-soft md:p-9">
              {/* 上部の淡いグラデーション装飾 */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-100/70 blur-3xl"
              />

              <p className="eyebrow relative">Connections</p>

              <ul className="relative mt-6 space-y-1">
                {connections.map((c, i) => (
                  <li key={c.to}>
                    <div className="flex items-center gap-4 py-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 md:h-12 md:w-12">
                        {c.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ink-muted md:text-sm">
                          {c.from}
                        </p>
                        <p className="truncate text-base font-black text-ink md:text-lg">
                          {c.to}
                        </p>
                      </div>
                    </div>
                    {i < connections.length - 1 ? (
                      <div
                        aria-hidden="true"
                        className="ml-[22px] h-5 w-px bg-gradient-to-b from-brand-200 to-transparent md:ml-[24px]"
                      />
                    ) : null}
                  </li>
                ))}
              </ul>

              <div className="relative mt-7 flex items-center gap-3 rounded-2xl bg-ink px-5 py-4">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-6 shrink-0 rounded-full bg-brand-400"
                />
                <p className="text-sm font-black text-white">
                  すべての起点は、Sales Bond
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
