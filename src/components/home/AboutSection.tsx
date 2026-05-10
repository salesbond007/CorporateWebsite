import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { Reveal } from "@/components/ui/Reveal";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const strengths: { title: string; description: string }[] = [
  {
    title: "顧問紹介事業",
    description:
      "経営層の人脈を活用し、決裁者への最短アプローチを実現します。",
  },
  {
    title: "営業BPO事業",
    description:
      "戦略立案から現場運用まで、再現性のある営業ノウハウを提供します。",
  },
  {
    title: "プロ人材紹介",
    description:
      "経営課題に応じた即戦力のプロを、必要な期間だけアサインします。",
  },
];

export function AboutSection({ locale, dict }: Props) {
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
              営業の力で、事業の成長を支える。
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
              セールスボンド株式会社は、顧問紹介事業と営業BPO事業を軸に、企業の営業活動を多角的にサポートしています。経営層の人脈、即戦力のプロ人材、再現性のある営業ノウハウ——成長フェーズに合わせて最適な支援を提供します。
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {strengths.map((s, i) => (
                <Reveal key={s.title} delay={i * 100}>
                  <div className="rounded-xl2 border border-white/10 bg-white/5 p-5 h-full">
                    <p className="font-display text-sm font-bold text-brand-300">
                      0{i + 1}
                    </p>
                    <p className="mt-3 text-sm font-semibold">{s.title}</p>
                    <p className="mt-2 text-xs text-white/60 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10">
              <Button href={localePath("/about", locale)} variant="primary">
                {dict.nav.about}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
