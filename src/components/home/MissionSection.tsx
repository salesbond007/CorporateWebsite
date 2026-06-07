import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Challenge = { label: string; icon: "sales" | "enterprise" | "hr" | "dx" };
const challenges: Challenge[] = [
  { label: "売上拡大", icon: "sales" },
  { label: "大手企業開拓", icon: "enterprise" },
  { label: "人事採用", icon: "hr" },
  { label: "DX推進", icon: "dx" },
];

function ChallengeIcon({ kind }: { kind: Challenge["icon"] }) {
  const c = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-7 w-7 md:h-8 md:w-8",
  };
  switch (kind) {
    case "sales":
      return (
        <svg {...c}>
          <path d="M3 17l6-6 4 4 7-7" />
          <path d="M14 8h6v6" />
        </svg>
      );
    case "enterprise":
      return (
        <svg {...c}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
        </svg>
      );
    case "hr":
      return (
        <svg {...c}>
          <circle cx="9" cy="8" r="3.2" />
          <circle cx="17" cy="10" r="2.4" />
          <path d="M3 20c0-3.4 2.6-6 6-6s6 2.6 6 6" />
          <path d="M15 20c0-2.4 1.7-4.2 4-4.2" />
        </svg>
      );
    case "dx":
      return (
        <svg {...c}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 9h6v6H9z" />
          <path d="M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2" />
        </svg>
      );
  }
}

type Value = {
  label: string;
  title: string;
  body: string;
  icon: "talent" | "network" | "execution";
};
const values: Value[] = [
  {
    label: "Talent",
    title: "実績豊富なプロ人材",
    body: "大手・上場企業の役員・部長職以上を中心とした、現場経験に裏打ちされた実力者。",
    icon: "talent",
  },
  {
    label: "Network",
    title: "強固な事業ネットワーク",
    body: "プロフェッショナルが長年にわたり構築してきた、決裁者・キーマンへの確かな接点。",
    icon: "network",
  },
  {
    label: "Execution",
    title: "実行までの推進力",
    body: "助言に留まらず、外部から組織に入り込み、施策の実装と成果創出までを伴走。",
    icon: "execution",
  },
];

function ValueIcon({ kind }: { kind: Value["icon"] }) {
  const c = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-9 w-9",
  };
  switch (kind) {
    case "talent":
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.6 3-6.4 7-6.4s7 2.8 7 6.4" />
          <path d="M16 4l1.2 1.5L19 6l-1.6 1.2L17 9l-1.6-1L13.8 9l.6-2-1.4-1.2L14.8 5z" fill="currentColor" />
        </svg>
      );
    case "network":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="2.6" />
          <circle cx="5" cy="6" r="1.8" />
          <circle cx="19" cy="6" r="1.8" />
          <circle cx="5" cy="18" r="1.8" />
          <circle cx="19" cy="18" r="1.8" />
          <path d="M6.3 7l3.6 3.6M17.7 7l-3.6 3.6M6.3 17l3.6-3.6M17.7 17l-3.6-3.6" />
        </svg>
      );
    case "execution":
      return (
        <svg {...c}>
          <path d="M5 19c2-6 5-9 11-13l1 1c-4 6-7 9-13 11z" />
          <path d="M9 15l-2 2-2-.5L7 14z" />
          <path d="M14 8l2 2" />
        </svg>
      );
  }
}

export function MissionSection() {
  return (
    <section className="relative overflow-hidden bg-white py-28 md:py-36">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-32 h-[420px] w-[420px] rounded-full bg-brand-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-24 h-[420px] w-[420px] rounded-full bg-amber-100/50 blur-3xl"
      />

      <Container className="relative">
        <div className="text-center">
          <p className="section-label">Mission</p>
          <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
            挑む企業に最短で、
            <span className="text-brand-500">確実な解</span>
            を。
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-ink-soft leading-relaxed font-medium">
            社内に存在しない知見・人脈・実行力を、最適な形で外部から導入する。
            <br className="hidden md:block" />
            セールスボンドは、企業が次なる成長フェーズへと移行する起点となります。
          </p>
        </div>

        {/* Step 1: 課題チップ */}
        <Reveal>
          <div className="mt-16 md:mt-20">
            <div className="mx-auto flex max-w-4xl items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-black text-white">
                01
              </span>
              <p className="text-sm md:text-base font-black text-ink">
                企業が抱える、明確な経営課題
              </p>
              <span aria-hidden="true" className="ml-3 hidden flex-1 border-t border-dashed border-ink-line md:block" />
            </div>

            <ul className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {challenges.map((ch) => (
                <li
                  key={ch.label}
                  className="group flex items-center gap-3 rounded-2xl border border-ink-line bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card md:flex-col md:items-center md:gap-3 md:p-6 md:text-center"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500 md:h-14 md:w-14">
                    <ChallengeIcon kind={ch.icon} />
                  </span>
                  <span className="text-sm md:text-base font-black text-ink">
                    {ch.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Pain point band */}
        <Reveal>
          <div className="relative mx-auto mt-10 max-w-3xl md:mt-14">
            <div className="absolute left-1/2 -top-7 -translate-x-1/2" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v14M6 13l6 6 6-6"
                  stroke="#1f2937"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="rounded-2xl border-2 border-dashed border-ink-line bg-cream px-6 py-5 text-center md:px-10 md:py-6">
              <p className="text-sm md:text-base font-bold leading-relaxed text-ink-soft">
                社内リソースのみでは
                <span className="mx-1 font-black text-ink">対応範囲に限界</span>
                があり、
                <span className="mx-1 font-black text-ink">施策実行のスピードも鈍化</span>
                しがちです。
              </p>
            </div>
          </div>
        </Reveal>

        {/* Step 2: 提供価値 */}
        <Reveal>
          <div className="mt-14 md:mt-20">
            <div className="mx-auto flex max-w-5xl items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 font-display text-sm font-black text-white">
                02
              </span>
              <p className="text-sm md:text-base font-black text-ink">
                セールスボンドが提供する3つの価値
              </p>
              <span aria-hidden="true" className="ml-3 hidden flex-1 border-t border-dashed border-brand-300 md:block" />
            </div>

            <ul className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-3 md:gap-6">
              {values.map((v, i) => (
                <li
                  key={v.title}
                  className="relative overflow-hidden rounded-2xl border-2 border-brand-200 bg-white p-6 shadow-card md:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-brand-500"
                  />
                  <p className="font-display text-xs font-extrabold tracking-[0.18em] uppercase text-brand-600">
                    {String(i + 1).padStart(2, "0")} ／ {v.label}
                  </p>
                  <div className="mt-4 inline-flex items-center justify-center rounded-2xl bg-brand-50 p-3 text-brand-600">
                    <ValueIcon kind={v.icon} />
                  </div>
                  <h3 className="mt-4 text-lg md:text-xl font-black leading-snug text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft font-medium">
                    {v.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Step 3: 成果 */}
        <Reveal>
          <div className="relative mx-auto mt-10 max-w-4xl md:mt-14">
            <div className="absolute left-1/2 -top-7 -translate-x-1/2" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v14M6 13l6 6 6-6"
                  stroke="#F58220"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="overflow-hidden rounded-3xl bg-ink px-6 py-10 text-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] md:px-12 md:py-12">
              <div className="flex items-center justify-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 font-display text-sm font-black text-white">
                  03
                </span>
                <p className="text-sm md:text-base font-black uppercase tracking-[0.18em] text-white/80">
                  Outcome
                </p>
              </div>
              <p className="mt-6 text-center text-xl md:text-3xl font-black leading-snug">
                知見・人脈・実行力を導入し、
                <br className="hidden md:block" />
                <span className="relative inline-block">
                  組織の課題解決を加速
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-1.5 bg-amber-400"
                  />
                </span>
                させる。
              </p>
              <p className="mt-6 text-center text-sm md:text-base leading-relaxed text-white/80 font-medium">
                次なる成長フェーズへと移行するための、
                <span className="font-black text-brand-300">確かな起点</span>
                となることを使命としています。
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
