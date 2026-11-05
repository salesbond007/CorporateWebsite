import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { localePath } from "@/i18n/path";
import { serviceCategories, site } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

type FooterLink = { label: string; href: string };

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "東京都新宿区西新宿3-3-13 西新宿水間ビル",
)}`;

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  const home = localePath("/", locale);

  // 見出し付きのリンク列
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "セールスボンドについて",
      links: [
        { label: dict.nav.about, href: `${home}#mission` },
        { label: "会社概要", href: `${home}#company` },
      ],
    },
    {
      title: "サービス",
      links: serviceCategories
        .flatMap((c) => c.services)
        .map((s) => ({ label: s.title, href: `${home}#services` })),
    },
    {
      title: "採用・パートナー",
      links: [
        { label: dict.nav.recruit, href: localePath("/recruit", locale) },
        { label: dict.nav.partner, href: localePath("/partner", locale) },
      ],
    },
  ];

  // 見出しだけで並べる単独リンク
  const singles: FooterLink[] = [
    { label: dict.nav.top, href: home },
    { label: dict.nav.news, href: localePath("/news", locale) },
    { label: dict.nav.contact, href: localePath("/contact", locale) },
  ];

  const legalLinks: FooterLink[] =
    locale === "ja"
      ? [
          { href: localePath("/privacy", locale), label: "プライバシーポリシー" },
          { href: localePath("/terms", locale), label: "利用規約" },
        ]
      : [
          { href: localePath("/privacy", locale), label: "Privacy Policy" },
          { href: localePath("/terms", locale), label: "Terms of Service" },
        ];

  return (
    <footer className="mt-32 bg-[#111] text-white">
      <Container className="pt-16 pb-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* 会社情報 */}
          <div className="lg:col-span-3">
            <Link href={home} className="inline-flex items-center gap-3" aria-label={dict.site.name}>
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-lg bg-white">
                <Image src="/logo-square.png" alt="" width={48} height={48} className="h-full w-full object-contain" />
              </span>
              <span className="whitespace-nowrap text-base font-bold tracking-[0.08em] sm:text-lg lg:text-base xl:text-lg">{site.legalName}</span>
            </Link>
            <address className="mt-8 not-italic text-[15px] leading-relaxed text-white/85">
              〒{site.address.postalCode}
              <br />
              東京都新宿区西新宿3-3-13
              <br />
              西新宿水間ビル2F
            </address>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1 text-[15px] text-brand-200 transition-colors hover:text-white"
            >
              Google Maps
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* リンク列 */}
          <nav
            aria-label="フッター"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-9 lg:gap-x-10"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <p className="whitespace-nowrap text-sm font-bold tracking-[0.04em] sm:text-[15px] sm:tracking-[0.08em]">{col.title}</p>
                <ul className="mt-5 space-y-4">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-3 text-[15px] tracking-[0.06em] text-white/85 transition-colors hover:text-white"
                      >
                        <Chevron />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <ul className="space-y-5">
              {singles.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[15px] font-bold tracking-[0.08em] transition-colors hover:text-brand-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-white/15 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {dict.site.name}. {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function Chevron() {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M1.5 1.5L6 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
