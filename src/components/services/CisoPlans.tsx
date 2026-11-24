/**
 * セキュプロ 情報セキュリティ顧問 LP「プラン」。
 * 違いと「こんな企業に」だけが分かる、簡単な3枚のカード。
 * 書かないこと: 稼働時間、オプション、他社(パートナー)に任せる内容。
 */

type Plan = {
  name: string;
  role: string;
  price: { amount: string } | { text: string };
  lead: string;
  points: string[];
  fit: string[];
  tag?: string;
};

const plans: Plan[] = [
  {
    name: "ライトプラン",
    role: "アドバイザー",
    price: { amount: "10万円" },
    lead: "相談役として助言します。判断と作業は、御社の担当者が行います。",
    points: [
      "定例会と相談窓口で助言",
      "取引先に専門家の名前を出せる",
      "規程・AI利用ルールのひな形",
    ],
    fit: ["社内に動ける担当者がいる", "まずは小さく始めたい"],
  },
  {
    name: "スタンダードプラン",
    role: "社外CISO",
    price: { amount: "30万円" },
    lead: "社外の責任者として就任し、判断・説明・作業まで引き受けます。",
    points: [
      "責任者として体制図に記載",
      "規程・AI利用ルールを作成",
      "チェックシートの回答案を作成",
      "事故のときの初動を判断",
    ],
    fit: ["大手企業から責任者と体制を聞かれている", "社内に担当者がいない"],
  },
  {
    name: "エンタープライズプラン",
    role: "社外CISO",
    tag: "経営参画",
    price: { text: "要相談" },
    lead: "経営会議に参加し、グループ会社・拠点まで含めて統括します。",
    points: [
      "スタンダードプランの内容すべて",
      "経営会議への出席と経営向けの報告",
      "子会社・拠点までルールを展開",
    ],
    fit: ["上場を目指している", "グループ会社や拠点が複数ある"],
  },
];

function Check() {
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
      <ul className="mx-auto grid max-w-xl gap-4 lg:max-w-none lg:grid-cols-3 lg:gap-5">
        {plans.map((p, i) => (
          <li
            key={p.name}
            className="flex min-w-0 flex-col border border-[#E9E1DD] bg-white"
          >
            {/* 段階が上がるほど濃くなる帯 */}
            <span
              aria-hidden="true"
              className="h-1.5"
              style={{ backgroundColor: ["#E07A8F", "#A3445F", "#5A142C"][i] }}
            />
            <div className="border-b border-[#E9E1DD] px-6 pb-5 pt-5 lg:px-7">
              <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#7A1F3D]">
                （{p.role}）
                {p.tag ? (
                  <span className="bg-[#7A1F3D] px-2 py-0.5 text-[11px] text-white">
                    {p.tag}
                  </span>
                ) : null}
              </p>
              <h3 className="mt-1 text-xl font-black">{p.name}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                {"amount" in p.price ? (
                  <>
                    <span className="text-sm font-bold text-[#5C5458]">月</span>
                    <span className="whitespace-nowrap text-[2.4rem] font-black leading-none tracking-tight text-[#7A1F3D] lg:text-[2.1rem] xl:text-[2.4rem]">
                      {p.price.amount}
                    </span>
                    <span className="text-base font-bold text-[#7A1F3D]">
                      〜
                    </span>
                    <span className="ml-1 text-xs font-bold text-[#5C5458]">
                      （税別）
                    </span>
                  </>
                ) : (
                  <span className="text-[2rem] font-black leading-[1.2] text-[#7A1F3D]">
                    {p.price.text}
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#5C5458]">
                {p.lead}
              </p>
            </div>
            <div className="flex flex-1 flex-col px-6 pb-6 pt-5 lg:px-7">
              <ul className="space-y-1.5">
                {p.points.map((t) => (
                  <li
                    key={t}
                    className="flex gap-2 text-sm font-bold leading-relaxed"
                  >
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 bg-[#F5E9ED] px-4 py-3.5">
                <p className="text-xs font-black text-[#5A142C]">
                  こんな企業に
                </p>
                <ul className="mt-1.5 space-y-1 text-[13px] leading-relaxed">
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
      <p className="mt-5 text-xs leading-relaxed text-[#5C5458]">
        ※
        金額はすべて税別です。会社の規模やご相談の内容に応じてお見積もりします。
      </p>
    </div>
  );
}
