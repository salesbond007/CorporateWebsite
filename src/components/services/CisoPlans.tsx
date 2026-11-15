/**
 * Bond AI セキュリティ LP「料金プラン」(シンプル版)。
 * 各プランは「役割・主な内容・合う企業」の要点だけ。
 * 書かないこと: 稼働時間、オプション、他社(パートナー)に任せる内容。金額は必ず「〇〜」。
 */

type Plan = {
  name: string;
  sub: string;
  amount: string;
  note?: string;
  role: string;
  items: string[];
  fit: string[];
};

const plans: Plan[] = [
  {
    name: "ライトプラン",
    sub: "アドバイザー",
    amount: "8万円",
    note: "初期費用0円",
    role: "セキュリティとAIの相談役として、意思決定を支援します。判断と作業はお客さま側で行います。",
    items: [
      "定例会議（月2回）とメールでの相談",
      "AI利用ルールなどのひな形の提供",
      "1年間のロードマップの作成",
      "「社外顧問」として名前を掲載",
    ],
    fit: [
      "AIを使い始めたが、何から手をつければよいか分からない",
      "迷ったときに相談できる専門家がほしい",
      "まずは小さく始めたい",
    ],
  },
  {
    name: "スタンダードプラン",
    sub: "社外CISOとして就任",
    amount: "30万円",
    role: "社外の責任者として、セキュリティの体制をつくり、毎月見直して改善します。判断し、説明し、責任を持ちます。",
    items: [
      "現状の調査と、対策の優先順位づけ",
      "自社用のAI利用ルール・事故時の対応手順の作成",
      "全社員向けのAIルール説明会",
      "チェックシートの回答と「社外CISO」としての名前の掲載",
      "事故のときの初動の判断の助言",
    ],
    fit: [
      "AIを全社に導入した",
      "セキュリティの責任者がいない",
      "取引先からチェックシートや認証を求められている",
    ],
  },
  {
    name: "エンタープライズプラン",
    sub: "社外CISOとして就任",
    amount: "50万円",
    note: "個別見積り",
    role: "グループ会社・拠点・部門まで含めた全社のセキュリティを統括し、経営会議に参加して経営の視点で判断します。",
    items: [
      "スタンダードプランのすべての内容",
      "経営会議への出席と、経営向けの四半期報告",
      "子会社・拠点ごとのAI利用ルールの運用",
      "ISO/IEC 42001の維持支援",
    ],
    fit: [
      "上場を目指している",
      "グループ会社や拠点が複数ある",
      "AIを事業の中心に置いている",
    ],
  },
];

const conditions = [
  "金額はすべて税別",
  "最低契約期間：6カ月",
  "訪問の交通費：別途",
  "主担当1名が固定でつき、サービス監修が品質を確認します",
];

function CheckMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-[5px] h-3.5 w-3.5 shrink-0 text-[#7A1F3D]"
      fill="none"
    >
      <path
        d="M2.5 8.5l3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CisoPlans({ ctaHref }: { ctaHref: string }) {
  return (
    <div className="text-[#1F1A1C]">
      <ul className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        {plans.map((p) => (
          <li
            key={p.name}
            className="flex flex-col border border-[#E9E1DD] bg-white"
          >
            {/* プラン名と金額 */}
            <div className="border-b border-[#E9E1DD] px-6 pb-5 pt-6 lg:px-7">
              <p className="text-xs font-bold tracking-[0.06em] text-[#7A1F3D]">
                {p.sub}
              </p>
              <h3 className="mt-1 text-xl font-black">{p.name}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-sm font-bold text-[#5C5458]">月</span>
                <span className="text-[2.5rem] font-black leading-none tracking-tight text-[#7A1F3D]">
                  {p.amount}
                </span>
                <span className="text-base font-bold text-[#7A1F3D]">〜</span>
                {p.note ? (
                  <span className="ml-2 text-xs font-bold text-[#5C5458]">
                    {p.note}
                  </span>
                ) : null}
              </p>
              <p className="mt-4 text-sm leading-[1.85] text-[#5C5458]">
                {p.role}
              </p>
            </div>

            <div className="flex flex-1 flex-col px-6 pb-6 pt-5 lg:px-7">
              <p className="text-xs font-black tracking-[0.08em] text-[#5C5458]">
                主な内容
              </p>
              <ul className="mt-2 space-y-1.5">
                {p.items.map((t) => (
                  <li
                    key={t}
                    className="flex gap-2 text-sm font-bold leading-relaxed"
                  >
                    <CheckMark />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-5 bg-[#F5E9ED] px-4 py-3.5">
                <p className="text-xs font-black text-[#5A142C]">
                  こんな企業に
                </p>
                <ul className="mt-1.5 space-y-1 text-[13px] leading-relaxed text-[#1F1A1C]">
                  {p.fit.map((t) => (
                    <li key={t} className="flex gap-1.5">
                      <span aria-hidden="true" className="text-[#7A1F3D]">
                        ・
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href={ctaHref}
                  className="flex h-12 items-center justify-center gap-2 border-2 border-[#7A1F3D] text-sm font-bold text-[#7A1F3D] transition-colors hover:bg-[#7A1F3D] hover:text-white"
                >
                  相談する
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 全プラン共通の条件 */}
      <div className="mt-6 border border-[#E9E1DD] bg-[#FBF8F6] px-5 py-4 md:px-6">
        <p className="text-xs font-black text-[#5C5458]">全プラン共通</p>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[13px] leading-relaxed text-[#5C5458]">
          {conditions.map((c) => (
            <li key={c} className="flex gap-1.5">
              <span aria-hidden="true">・</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
