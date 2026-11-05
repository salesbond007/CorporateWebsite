import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** 表示されたタイミングでマーカーが左から引かれる強調テキスト */
function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-[linear-gradient(transparent_60%,rgba(228,160,176,0.55)_60%)] bg-[length:0%_100%] bg-no-repeat font-black text-brand-600 transition-[background-size] delay-300 duration-[1400ms] ease-expo group-data-[visible=true]/reveal:bg-[length:100%_100%]">
      {children}
    </span>
  );
}

const WATERMARK = "ONE BOND, EVERY ANSWER. ";

export function MissionSection() {
  return (
    <section id="mission" className="relative scroll-mt-20 overflow-hidden bg-white py-20 md:py-32">
      {/* 背景をゆっくり横に流れる大きな透かし文字 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center overflow-hidden"
      >
        <div className="flex w-max animate-marquee-slow">
          {[0, 1].map((k) => (
            <p
              key={k}
              className="whitespace-nowrap pr-16 font-display text-[clamp(6rem,18vw,16rem)] font-black leading-none tracking-tight text-ink/[0.045]"
            >
              {WATERMARK}
              {WATERMARK}
            </p>
          ))}
        </div>
      </div>

      {/* 左右に漂うぼかしの色面 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 animate-blob rounded-full bg-brand-100/70 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 animate-blob rounded-full bg-amber-100/70 blur-[100px] [animation-delay:-9s]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal variant="none">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-brand-500 md:text-xs">
              Our Mission
            </p>
            <p className="mt-5 text-3xl font-black leading-snug text-ink md:text-4xl lg:text-5xl">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="block translate-y-[110%] transition-transform duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0">
                  企業の攻めと守りを、
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="block translate-y-[110%] transition-transform delay-150 duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0">
                  <span className="text-brand-500">プロの力</span>で。
                </span>
              </span>
            </p>
            <span
              aria-hidden="true"
              className="mx-auto mt-8 block h-1 w-16 origin-center scale-x-0 rounded-full bg-brand-500 transition-transform delay-500 duration-1000 ease-expo group-data-[visible=true]/reveal:scale-x-100"
            />
          </Reveal>

          <div className="mx-auto mt-10 space-y-7 text-base font-medium leading-[2.1] tracking-[0.04em] text-ink-soft md:text-lg">
            <Reveal variant="blur" delay={100}>
              <p>
                <span className="font-black text-ink">製造、建設、物流、医療、小売、宿泊</span>
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
            <Reveal variant="blur" delay={150}>
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
            <Reveal variant="blur" delay={150}>
              <p>
                ひとつひとつの出会いが、企業の新しい一歩になり、
                <br />
                <Emphasis>これまでになかった選択肢を生み出します</Emphasis>。
              </p>
            </Reveal>
            <Reveal variant="blur" delay={150}>
              <p>
                私たちは、企業がこれまで培ってきた強みを大切にしながら、
                <br />
                日本企業の可能性を広げ、
                <span className="relative inline-block font-black text-brand-600">
                  次の成長の選択肢をつくり続けます。
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] origin-left scale-x-0 bg-amber-300 transition-transform delay-500 duration-1000 ease-expo group-data-[visible=true]/reveal:scale-x-100"
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
