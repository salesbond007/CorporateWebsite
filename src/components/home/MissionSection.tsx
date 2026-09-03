import Image from "next/image";
import { Container } from "@/components/ui/Container";

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

          {/* Right: mission graphic */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-ink-line bg-white shadow-soft">
              <Image
                src="/mission/mission.png"
                alt="AI・人材・営業の力を組み合わせ、売上向上とコスト削減の両面から貢献します。"
                width={1024}
                height={1536}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
