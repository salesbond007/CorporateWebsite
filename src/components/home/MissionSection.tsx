import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function MissionSection() {
  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      <Container>
        <div className="text-center">
          <p className="section-label">Mission</p>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          <h2 className="text-display-2 text-ink text-center leading-tight">
            クライアントを
            <span className="text-brand-500">勝たせる</span>
          </h2>
        </div>

        <Reveal>
          <div className="mt-16 max-w-2xl mx-auto space-y-7 text-base md:text-lg text-ink leading-[2] font-medium text-center">
            <p>
              明確な経営課題を抱えながらも、その遂行が思うように進まない事例は少なくありません。
            </p>

            <p className="text-ink-soft">
              売上拡大、大手企業開拓、人事採用、DX推進——。
            </p>

            <p>
              社内リソースのみで対処を図る場合、対応範囲には自ずと限界があり、
              <span className="marker font-bold">施策実行のスピードも鈍化</span>
              する傾向にあります。
            </p>

            <p>
              当社は、
              <span className="font-black text-ink">
                大手・上場企業の役員・部長職以上を中心とした実績豊富なプロフェッショナル人材
              </span>
              と、それらが長年にわたり構築してきた
              <span className="font-black text-ink">事業ネットワーク</span>
              をご提供いたします。
            </p>

            <p>
              社内に存在しない
              <span className="font-bold text-brand-600">
                知見・人脈・実行力
              </span>
              を、最適な形で外部から導入することで、
              <span className="marker font-bold">組織の課題解決を加速</span>
              させます。
            </p>

            <p>
              セールスボンドは、企業が次なる成長フェーズへと移行するための、
              <span className="font-black text-brand-600">確かな起点</span>
              となることを使命としています。
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
