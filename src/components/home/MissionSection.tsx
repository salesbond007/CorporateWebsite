import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

function Emphasis({ children }: { children: React.ReactNode }) {
  return <span className="font-black text-brand-600">{children}</span>;
}

export function MissionSection() {
  return (
    <section id="mission" className="relative scroll-mt-20 overflow-hidden bg-white py-16 md:py-24">
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
        <div className="mx-auto max-w-2xl text-center">
          <Reveal variant="fade">
            <p className="text-2xl md:text-3xl lg:text-4xl font-black leading-snug text-ink">
              日本経済を支えてきた産業に
              <br />
              <span className="text-brand-500">新しい選択肢</span>を
            </p>
          </Reveal>

          <div className="mx-auto mt-10 space-y-6 text-base md:text-lg text-ink-soft leading-[2] tracking-[0.04em] font-medium">
            <Reveal variant="fade" delay={100}>
              <p>
                <span className="font-black text-ink">
                  製造、建設、物流、医療、小売、宿泊
                </span>
                など
                <br />
                古くから
                <span className="underline decoration-brand-500 decoration-2 underline-offset-4">
                  日本経済を支えてきた
                </span>
                企業。
                <br />
                私たちは、その可能性を<Emphasis>新しい力とつないでいきます</Emphasis>。
              </p>
            </Reveal>
            <Reveal variant="fade" delay={200}>
              <p>
                現場と、<Emphasis>フィジカルAI</Emphasis>を。
                <br />
                企業と、<Emphasis>プロ人材</Emphasis>を。
                <br />
                サービスと、<Emphasis>新しい顧客</Emphasis>を。
                <br />
                日本企業と、<Emphasis>世界</Emphasis>を。
              </p>
            </Reveal>
            <Reveal variant="fade" delay={300}>
              <p>
                ひとつひとつの出会いが、企業の新しい一歩になり、
                <br />
                <Emphasis>これまでになかった選択肢を生み出します</Emphasis>。
              </p>
            </Reveal>
            <Reveal variant="fade" delay={400}>
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
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
