import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function MissionSection() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow">Our Mission</span>
          <h2 className="mt-6 text-display-2 text-ink">
            企業を、<span className="text-brand-500">勝たせる</span>。
          </h2>
        </div>

        <Reveal>
          <div className="mt-14 max-w-2xl mx-auto space-y-6 text-base md:text-lg text-ink-soft leading-[1.95]">
            <p>
              明確な経営課題を抱えながらも、その遂行が思うように進まない事例は少なくありません。
            </p>

            <p className="text-center text-xl md:text-2xl font-bold text-ink">
              売上拡大、組織強化、DX推進——。
            </p>

            <p>
              社内リソースのみで対処を図る場合、対応範囲には自ずと限界があり、施策実行のスピードも鈍化する傾向にあります。
            </p>

            <p>
              当社は、大手・上場企業の役員・部長職以上を中心とした実績豊富なプロフェッショナル人材と、それらが長年にわたり構築してきた事業ネットワークをご提供いたします。
            </p>

            <p>
              社内に存在しない知見・人脈・実行力を、最適な形で外部から導入することで、組織の課題解決を加速させます。
            </p>

            <p>
              セールスボンドは、企業が次なる成長フェーズへと移行するための、
              <strong className="text-ink font-bold">確かな起点</strong>
              となることを使命としています。
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
