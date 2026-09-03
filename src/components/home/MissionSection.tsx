import { Container } from "@/components/ui/Container";

type Connection = {
  from: string;
  fromEn: string;
  to: string;
  toEn: string;
};

const connections: Connection[] = [
  { from: "現場", fromEn: "Field", to: "フィジカルAI", toEn: "Physical AI" },
  { from: "企業", fromEn: "Company", to: "プロ人材", toEn: "Talent" },
  { from: "サービス", fromEn: "Service", to: "新しい顧客", toEn: "New Customers" },
  { from: "日本企業", fromEn: "Japan", to: "世界", toEn: "Global" },
];

function ConnectionRow({
  connection,
  index,
}: {
  connection: Connection;
  index: number;
}) {
  return (
    <li className="relative flex items-center gap-4 py-5 md:gap-6 md:py-6">
      <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-900 font-display text-xs font-black text-white md:h-11 md:w-11 md:text-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-1 items-center justify-between gap-3 rounded-2xl border border-ink-line bg-white px-5 py-4 shadow-soft md:px-7 md:py-5">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-muted md:text-xs">
            {connection.fromEn}
          </p>
          <p className="text-sm font-black text-ink md:text-base">
            {connection.from}
          </p>
        </div>
        <span aria-hidden="true" className="text-brand-300">
          →
        </span>
        <div className="text-right">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-600 md:text-xs">
            {connection.toEn}
          </p>
          <p className="text-sm font-black text-ink md:text-base">
            {connection.to}
          </p>
        </div>
      </div>
    </li>
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

          {/* Right: connections timeline */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <p className="eyebrow">Connections</p>
              <ul className="relative mt-5">
                {/* 縦の接続ライン */}
                <span
                  aria-hidden="true"
                  className="absolute left-[17px] top-2 bottom-2 w-px bg-ink-line md:left-[21px]"
                />
                {connections.map((connection, i) => (
                  <ConnectionRow key={connection.to} connection={connection} index={i} />
                ))}
              </ul>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-black text-white">
                <span aria-hidden="true" className="h-1.5 w-6 rounded-full bg-brand-400" />
                Sales Bond
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
