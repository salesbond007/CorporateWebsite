/**
 * Bond AI セキュリティ顧問 LP「料金プラン」(アドバイザー / 社外CISO)。金額はアドバイザーの「月10万円〜」だけ表示。
 * 各プランは「役割・主な内容・合う企業」の要点だけ。
 * 書かないこと: 稼働時間、オプション、他社(パートナー)に任せる内容。金額は必ず「〇〜」。
 */

type Plan = {
  name: string;
  sub: string;
  /** null は「個別見積り」 */
  amount: string | null;
  note?: string;
  role: string;
  items: string[];
  fit: string[];
  caution?: string;
};

const plans: Plan[] = [
  {
    name: "アドバイザー",
    sub: "セキュリティ顧問",
    amount: "10万円",
    role: "相談役として助言し、取引先に専門家の名前を出せます。判断と作業は、お客さまの担当者が行います。",
    items: [
      "現状の確認（ヒアリング・社内アンケート）とロードマップ",
      "体制図や回答書に、専門家の名前を掲載",
      "定例会（月2回）とメールでの相談",
      "チェックシート回答の助言と確認",
      "規程・AI利用ルールのひな形",
      "社員研修（年1回・修了証つき）",
    ],
    fit: ["社内に動ける担当者がいる", "取引先に出せる専門家の名前がほしい"],
    caution: "事故（インシデント）のときの対応は含みません。",
  },
  {
    name: "社外CISO（vCISO）",
    sub: "セキュリティ責任者として就任",
    amount: null,
    role: "社外のセキュリティ責任者として就任し、判断し、取引先に説明し、作業まで引き受けます。",
    items: [
      "社外CISOとして就任し、体制図に記載",
      "初回アセスメントとツールによる脆弱性診断",
      "規程・AI利用ルール・AIシステム台帳の作成",
      "取引先に出せる「セキュリティ体制のご案内」",
      "チェックシートの回答案の作成と、取引先との打ち合わせへの同席",
      "事故のときの初動対応の判断",
      "1年かけて社内の担当者を育成",
    ],
    fit: [
      "大手企業から、責任者と体制を聞かれている",
      "社内にセキュリティの担当者がいない",
    ],
  },
];

const conditions = [
  "金額はすべて税別",
  "担当の専門家は原則固定し、サービス監修が品質を確認します",
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
      <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
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
              {p.amount ? (
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
              ) : (
                <p className="mt-3 flex h-10 items-end text-[1.5rem] font-black leading-none text-[#7A1F3D]">
                  お問い合わせください
                </p>
              )}
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

              {p.caution ? (
                <p className="mt-3 text-xs leading-relaxed text-[#5C5458]">
                  ※{p.caution}
                </p>
              ) : null}
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
      <div className="mx-auto mt-6 max-w-5xl border border-[#E9E1DD] bg-[#FBF8F6] px-5 py-4 md:px-6">
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
