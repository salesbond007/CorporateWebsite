import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function ServicesSection({ locale, dict }: Props) {
  return (
    <section className="relative py-28 md:py-36 bg-cream">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Services</p>
            <p className="mt-3 text-lg md:text-xl font-extrabold text-ink">
              提供するサービス
            </p>
          </div>
          <Link
            href={localePath("/services", locale)}
            className="link-arrow shrink-0"
          >
            {dict.nav.services}
          </Link>
        </div>

        {/* サービスデータは一旦削除。枠(箱)のみ残す */}
        <div
          className="mt-14 min-h-[200px] rounded-none border-2 border-dashed border-ink-line md:min-h-[280px]"
          aria-hidden="true"
        />
      </Container>
    </section>
  );
}
