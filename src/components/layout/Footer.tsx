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

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  const home = localePath("/", locale);

  // 見出し付きのリンク列
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "セールスボンドについて",
      links: [
        { label: dict.nav.about, href: `${home}#mission` },
        { label: "会社概要", href: localePath("/company", locale) },
      ],
    },
    {
      title: "サービス",
      links: [
        { label: "サービス一覧", href: localePath("/services", locale) },
        ...serviceCategories
          .flatMap((c) => c.services)
          .map((s) => ({
            label: s.title,
            href: s.href ? localePath(s.href, locale) : localePath("/services", locale),
          })),
      ],
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

  // 見出し行・各リンク行の高さを全列で揃え、横のラインを通す
  const headRow = "flex h-8 items-center whitespace-nowrap";
  const linkRow = "flex h-12 items-center";

  return (
    <footer className="mt-32 bg-black text-white">
      <Container className="pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* 会社情報 */}
          <div className="lg:col-span-3">
            <Link href={home} className="inline-flex items-center gap-3" aria-label={dict.site.name}>
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-md bg-white">
                <Image src="/logo-square.png" alt="" width={44} height={44} className="h-full w-full object-contain" />
              </span>
              <span className="whitespace-nowrap text-lg font-bold tracking-[0.06em]">{site.legalName}</span>
            </Link>
            <address className="mt-10 not-italic text-base leading-[1.75] tracking-[0.04em]">
              〒{site.address.postalCode}
              <br />
              東京都新宿区西新宿3-3-13
              <br />
              西新宿水間ビル2F
            </address>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base">
              {site.media.map((m) => (
                <li key={m.url}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-200 transition-colors hover:text-white"
                  >
                    {m.name}
                    <span className="sr-only">(新しいタブで開く)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* リンク列 */}
          <nav
            aria-label="フッター"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-9 lg:flex lg:justify-between lg:gap-10 lg:pl-10"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <p className={`${headRow} text-[15px] font-bold tracking-[0.04em] sm:text-base sm:tracking-[0.06em]`}>{col.title}</p>
                <ul className="mt-3">
                  {col.links.map((l) => (
                    <li key={l.label} className={linkRow}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-3 text-base tracking-[0.04em] transition-colors hover:text-brand-200"
                      >
                        <Chevron />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 単独リンク: 1つ目は見出し行、以降はリンク行に揃える */}
            <ul>
              {singles.map((l, i) => (
                <li key={l.label} className={i === 0 ? headRow : linkRow + (i === 1 ? " mt-3" : "")}>
                  <Link
                    href={l.href}
                    className="text-base font-bold tracking-[0.06em] transition-colors hover:text-brand-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-white/20 pt-7 text-sm tracking-[0.04em] text-white/55 sm:flex-row sm:items-center sm:justify-between">
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
