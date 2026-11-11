/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** 削除したページは関連ページへ恒久リダイレクト(検索結果に古いページが残らないように) */
  async redirects() {
    const toServices = [
      "physical-ai-training",
      "bondtech",
      "hardware-development",
    ];
    return [
      ...toServices.map((slug) => ({
        source: `/:locale(ja|en)/services/${slug}`,
        destination: "/:locale/services",
        permanent: true,
      })),
      {
        source: "/:locale(ja|en)/about",
        destination: "/:locale/company",
        permanent: true,
      },
      {
        source: "/:locale(ja|en)/ai-tsushin",
        destination: "/:locale/news",
        permanent: true,
      },
      {
        source: "/:locale(ja|en)/contact/:kind(business|partner|professional)",
        destination: "/:locale/contact",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
};

module.exports = nextConfig;
