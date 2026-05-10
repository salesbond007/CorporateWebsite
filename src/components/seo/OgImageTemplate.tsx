import { site } from "@/lib/site";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

/**
 * Layout used by `opengraph-image.tsx` files via Next's `ImageResponse`.
 * Built with inline styles only — Tailwind/CSS classes are not supported here.
 */
export function OgImageTemplate({ eyebrow, title, subtitle }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #FFF5EC 0%, #FFE7D1 60%, #FFCEA3 100%)",
        padding: 80,
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: 9999,
          background: "rgba(245,130,32,0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -160,
          left: -100,
          width: 420,
          height: 420,
          borderRadius: 9999,
          background: "rgba(245,130,32,0.12)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: "#F58220",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          C
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1A1A1A",
            letterSpacing: "-0.01em",
          }}
        >
          {site.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {eyebrow ? (
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#D86C12",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#1A1A1A",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "#3A3A3A",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#6B6B6B",
        }}
      >
        <div>{site.url.replace(/^https?:\/\//, "")}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#F58220",
            fontWeight: 700,
          }}
        >
          BtoB Solutions
        </div>
      </div>
    </div>
  );
}

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;
