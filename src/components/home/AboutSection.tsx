import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";

export function AboutSection() {
  return (
    <section className="bg-ink text-white py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-xl2 bg-white/5 p-8 backdrop-blur-sm border border-white/10">
              <Illustration variant="grid" className="text-brand-500" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="eyebrow !text-brand-300 before:!bg-brand-300">
              About Us
            </span>
            <h2 className="mt-5 text-display-2">
              TODO: 私たちが大切にしている価値観や思想を一言で。
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
              TODO: 会社のミッション、こだわり、強みなどを3〜5行で。
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {["TODO", "TODO", "TODO"].map((label, i) => (
                <div
                  key={i}
                  className="rounded-xl2 border border-white/10 bg-white/5 p-5"
                >
                  <p className="font-display text-sm font-bold text-brand-300">
                    0{i + 1}
                  </p>
                  <p className="mt-3 text-sm font-semibold">{label}: 強み</p>
                  <p className="mt-2 text-xs text-white/60 leading-relaxed">
                    TODO: 補足説明を1〜2行で。
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/about" variant="primary">
                私たちについて
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
