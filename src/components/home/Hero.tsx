import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
      <div
        className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-brand-100/60 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="eyebrow">B to B Solutions</span>
            <h1 className="mt-6 text-display-1 text-ink">
              TODO: メインコピー<br />
              <span className="text-brand-500">ここに最大の訴求</span>を。
            </h1>
            <p className="mt-7 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">
              TODO: サブコピー。提供価値を2〜3行で。誰の・どんな課題を・どう解決するか。
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/services" size="lg">
                サービスを見る
              </Button>
              <Button href="/contact/business" size="lg" variant="secondary">
                お問い合わせ
              </Button>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { k: "TODO", v: "実績数" },
                { k: "TODO", v: "支援企業" },
                { k: "TODO", v: "継続率" },
              ].map((m) => (
                <div key={m.v}>
                  <dt className="text-xs text-ink-muted">{m.v}</dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-ink">
                    {m.k}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rounded-[2rem] bg-white shadow-card" aria-hidden="true" />
              <div className="relative rounded-[2rem] bg-white p-6 shadow-soft">
                <Illustration variant="abstract" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-brand-500 p-4 text-white shadow-card hidden md:block">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                  Featured
                </p>
                <p className="mt-1 font-display text-base font-bold">
                  TODO: ハイライト
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
