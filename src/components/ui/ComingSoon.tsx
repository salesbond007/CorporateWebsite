import { Container } from "./Container";

type Props = {
  /** 補足メッセージ。指定がなければ標準文言を表示 */
  message?: string;
  /** 中央寄せ表示するボタン等のリンク */
  children?: React.ReactNode;
};

export function ComingSoon({ message, children }: Props) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl rounded-xl3 border-2 border-dashed border-ink-line bg-cream/50 p-10 md:p-14 text-center">
          <p className="inline-block rounded-full bg-brand-500 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-white">
            Coming Soon
          </p>
          <h2 className="mt-6 text-display-3 text-ink font-black">
            準備中です
          </h2>
          <p className="mt-6 text-base md:text-lg text-ink leading-relaxed font-medium">
            {message ??
              "公開に向け、現在準備を進めています。今しばらくお待ちください。"}
          </p>
          {children ? (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
