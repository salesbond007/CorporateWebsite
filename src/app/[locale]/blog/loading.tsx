import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleCardSkeleton } from "@/components/blog/ArticleCard";

export default function BlogLoading() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="メディア"
        description="読み込み中..."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
