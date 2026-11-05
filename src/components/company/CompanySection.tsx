import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Office = {
  name: string;
  postalCode: string;
  lines: string[];
};

const offices: Office[] = [
  {
    name: "本社",
    postalCode: "160-0023",
    lines: ["東京都新宿区西新宿3-3-13", "西新宿水間ビル2F"],
  },
];

const rows: { label: string; value: React.ReactNode }[] = [
  { label: "会社名", value: "セールスボンド株式会社（Sales Bond Co., Ltd.）" },
  { label: "代表取締役", value: "飯住 孝裕" },
  {
    label: "共同創業者",
    value: (
      <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span>柴田 泰成</span>
        <a
          href="https://sora-seed.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-1 border-b border-ink pb-0.5 text-ink transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          ソラシードスタートアップスタジオ/ソラシード3
          <span aria-hidden="true">↗</span>
          <span className="sr-only">(新しいタブで開く)</span>
        </a>
      </span>
    ),
  },
  { label: "設立", value: "2024年7月" },
  { label: "資本金", value: "41,002,000円" },
  { label: "登録番号", value: "T8012801023311" },
  {
    label: "住所",
    value: (
      <ul className="space-y-2">
        {offices.map((o) => (
          <li key={o.name}>
            <p className="font-semibold text-ink">{o.name}</p>
            <p className="text-ink leading-relaxed">
              〒{o.postalCode}
              <br />
              {o.lines.join(" ")}
            </p>
          </li>
        ))}
      </ul>
    ),
  },
  { label: "メールアドレス", value: "info@salesbond.jp" },
  {
    label: "事業内容",
    value: (
      <ul className="space-y-0.5">
        <li>AIセキュリティ対策事業</li>
        <li>新規開拓支援事業(営業BPO)</li>
      </ul>
    ),
  },
  {
    label: "取引銀行",
    value: (
      <ul className="space-y-0.5">
        <li>三井住友銀行</li>
        <li>東京スター銀行</li>
      </ul>
    ),
  },
];

export function CompanySection() {
  return (
    <section id="company" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTitle en="Company" ja="会社概要" size="sm" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal variant="none">
              <dl className="overflow-hidden border border-ink-line bg-white shadow-[0_20px_50px_-30px_rgba(29,5,11,0.25)]">
                {rows.map((row, i) => (
                  <div
                    key={row.label}
                    style={{ transitionDelay: `${i * 60}ms` }}
                    className={
                      "group/row grid translate-y-3 grid-cols-1 opacity-0 transition-all duration-700 ease-expo hover:bg-brand-50/40 group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100 sm:grid-cols-[10rem_1fr]" +
                      (i !== rows.length - 1 ? " border-b border-ink-line" : "")
                    }
                  >
                    <dt className="relative bg-cream px-5 pb-1 pt-3 text-sm font-bold text-brand-600 transition-colors duration-300 group-hover/row:bg-brand-50 sm:flex sm:items-center sm:py-3.5">
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-brand-500 transition-transform duration-300 ease-expo group-hover/row:scale-y-100"
                      />
                      {row.label}
                    </dt>
                    <dd className="px-5 pb-3 pt-1 text-sm leading-relaxed text-ink sm:py-3.5">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
