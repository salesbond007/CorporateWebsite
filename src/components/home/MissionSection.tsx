import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function MissionSection() {
  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      <Container>
        <div className="text-center">
          <p className="section-label">Mission</p>
          <p className="mt-3 text-base md:text-lg font-extrabold text-ink">
            企業を、勝たせる。
          </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-display-2 text-ink text-center leading-tight">
            企業を、
            <span className="text-brand-500">勝たせる</span>。
          </h2>
        </div>

        <Reveal>
          <div className="mt-16 max-w-2xl mx-auto space-y-7 text-base md:text-lg text-ink leading-[2] font-medium text-center">
            <p>
              明確な経営課題を抱えながらも、その遂行が思うように進まない事例は少なくありません。
            </p>

            <p className="text-2xl md:text-3xl font-black text-brand-500 py-2">
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
              <span className="marker font-black">確かな起点</span>
              となることを使命としています。
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
