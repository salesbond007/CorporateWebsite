import { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgImageTemplate,
} from "@/components/seo/OgImageTemplate";
import { services } from "@/lib/site";

export const runtime = "edge";
export const alt = "Service OG image";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function ServiceOgImage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const service = services.find((s) => s.slug === params.slug);

  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow={`Service ${service?.number ?? ""}`}
        title={service?.title ?? "Services"}
        subtitle={service?.summary ?? undefined}
      />
    ),
    OG_SIZE,
  );
}
