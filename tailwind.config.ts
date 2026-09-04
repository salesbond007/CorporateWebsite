import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#FBEAEE",
          100: "#F3CDD6",
          200: "#E4A0B0",
          300: "#D07189",
          400: "#A83B57",
          500: "#7A1E35",
          600: "#61162A",
          700: "#4A1020",
          800: "#330A16",
          900: "#1D050B",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#3A3A3A",
          muted: "#6B6B6B",
          line: "#E6E6E6",
        },
        cream: "#FAF7F2",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        display: ["var(--font-noto-sans-jp)", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-2": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-3": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "h1": ["clamp(1.875rem, 3.5vw, 2.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "h2": ["clamp(1.625rem, 2.75vw, 2.25rem)", { lineHeight: "1.25", letterSpacing: "-0.005em" }],
        "huge": ["clamp(3.5rem, 9vw, 7rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },
      maxWidth: {
        prose: "70ch",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(20, 20, 20, 0.06)",
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(20,20,20,0.06)",
      },
      borderRadius: {
        xl2: "1.5rem",
        xl3: "2rem",
        xl4: "2.5rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        heroPan: {
          "0%": { transform: "translateX(-3%) scale(1.12)" },
          "100%": { transform: "translateX(3%) scale(1.12)" },
        },
        heroCrossfade: {
          "0%": { opacity: "1" },
          "17%": { opacity: "1" },
          "25%": { opacity: "0" },
          "92%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        marquee: "marquee 45s linear infinite",
        wiggle: "wiggle 1.6s ease-in-out infinite",
        "float-y": "floatY 3s ease-in-out infinite",
        "hero-pan": "heroPan 16s ease-in-out infinite alternate",
        "hero-pan-fast": "heroPan 7s ease-in-out infinite alternate",
        "hero-crossfade": "heroCrossfade 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
