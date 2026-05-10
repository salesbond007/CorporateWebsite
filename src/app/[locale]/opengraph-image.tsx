import { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgImageTemplate,
} from "@/components/seo/OgImageTemplate";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = site.name;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="Corporate Site"
        title={site.name}
        subtitle={site.description}
      />
    ),
    OG_SIZE,
  );
}
