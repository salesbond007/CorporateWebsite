import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "私たちについて",
  description: "TODO: Aboutページのメタディスクリプション",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="私たちについて"
        description="TODO: Aboutページのリード文。会社の存在意義をひと言で。"
      />

      {/* Mission */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">Mission</span>
              <h2 className="mt-5 text-display-2">
                TODO: ミッションを<br />一言で。
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-2">
              <p className="text-lg text-ink-soft leading-[1.9]">
                TODO: ミッションの本文。3〜6行程度で、会社の存在意義・社会に提供する価値を語る。
              </p>
              <p className="mt-6 text-lg text-ink-soft leading-[1.9]">
                TODO: 補足のパラグラフ。
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="max-w-2xl">
            <span className="eyebrow">Values</span>
            <h2 className="mt-5 text-display-2">大切にしている価値観</h2>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <li
                key={i}
                className="rounded-xl2 bg-white p-8 shadow-soft"
              >
                <div className="aspect-square w-20">
                  <Illustration
                    variant={i === 1 ? "abstract" : i === 2 ? "grid" : "blob"}
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold">
                  TODO: バリュー 0{i}
                </h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  TODO: バリューの説明文。3〜5行で行動指針や考え方を。
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <span className="eyebrow">Our Story</span>
                <h2 className="mt-5 text-display-2">私たちの歩み</h2>
                <p className="mt-6 text-ink-soft leading-relaxed">
                  TODO: ストーリーのリード文。創業からの軌跡や転換点について。
                </p>
              </div>
            </div>
            <ol className="lg:col-span-7 space-y-12 relative">
              <span className="absolute left-3 top-2 bottom-2 w-px bg-ink-line" aria-hidden="true" />
              {[
                { year: "20XX", label: "TODO: マイルストーン" },
                { year: "20XX", label: "TODO: マイルストーン" },
                { year: "20XX", label: "TODO: マイルストーン" },
                { year: "20XX", label: "TODO: マイルストーン" },
              ].map((m, i) => (
                <li key={i} className="relative pl-12">
                  <span className="absolute left-0 top-1 grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="font-display text-sm text-brand-600 font-bold">
                    {m.year}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{m.label}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    TODO: その時期の取り組みや出来事を2〜4行で。
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="rounded-xl2 border border-ink-line p-10 md:p-14 text-center">
            <h2 className="text-h1">一緒に、課題を前に進めませんか。</h2>
            <p className="mt-4 text-ink-soft">
              TODO: お問い合わせを促すリード文。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact/business" size="lg">
                企業様のお問い合わせ
              </Button>
              <Button href="/services" size="lg" variant="secondary">
                サービスを見る
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
