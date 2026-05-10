import { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgImageTemplate,
} from "@/components/seo/OgImageTemplate";
import { getArticleBySlug } from "@/lib/microcms";

export const runtime = "nodejs";
export const alt = "Article OG image";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function ArticleOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);

  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow={article?.category?.name ?? "Article"}
        title={article?.title ?? "記事"}
        subtitle={article?.description ?? undefined}
      />
    ),
    OG_SIZE,
  );
}
