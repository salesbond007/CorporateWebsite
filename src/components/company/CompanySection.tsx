import { Container } from "@/components/ui/Container";

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
    <section id="company" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <BilingualHeading ja="会社概要" en={["Company", "Profile"]} />
          </div>

          <div className="lg:col-span-8">
            <dl className="overflow-hidden border border-ink-line bg-white">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={
                    "grid grid-cols-1 sm:grid-cols-[10rem_1fr]" +
                    (i !== rows.length - 1 ? " border-b border-ink-line" : "")
                  }
                >
                  <dt className="bg-cream px-5 pt-3 pb-1 text-sm font-bold text-brand-600 sm:flex sm:items-center sm:py-3.5">
                    {row.label}
                  </dt>
                  <dd className="px-5 pb-3 pt-1 text-sm text-ink leading-relaxed sm:py-3.5">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BilingualHeading({
  ja,
  en,
}: {
  ja: string;
  en: string[];
}) {
  return (
    <div>
      <p className="text-lg font-bold text-brand-500">{ja}</p>
      <h2 className="mt-2 font-display font-bold leading-[1.05] text-brand-500 text-[clamp(2.25rem,5vw,3.5rem)]">
        {en.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
}
