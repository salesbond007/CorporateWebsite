import { NextResponse } from "next/server";

export const runtime = "nodejs";

const API_TOKEN = process.env.GBIZINFO_API_TOKEN;
const API_BASE = "https://info.gbiz.go.jp/hojin/v1/hojin";

type GbizHojin = {
  corporate_number?: string;
  name?: string;
  kana?: string;
  location?: string;
  postal_code?: string;
  status?: string;
};

type GbizResponse = {
  "hojin-infos"?: GbizHojin[];
  errors?: { message?: string }[];
};

type Result = {
  corporateNumber: string;
  name: string;
  address: string;
  postalCode: string;
};

const cache = new Map<string, { at: number; results: Result[] }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function pickResults(json: GbizResponse): Result[] {
  const list = json["hojin-infos"] ?? [];
  return list
    .filter((h) => h.name && h.corporate_number)
    .slice(0, 10)
    .map((h) => ({
      corporateNumber: h.corporate_number ?? "",
      name: h.name ?? "",
      address: h.location ?? "",
      postalCode: h.postal_code ?? "",
    }));
}

export async function GET(req: Request) {
  if (!API_TOKEN) {
    return NextResponse.json(
      { error: "GBIZINFO_API_TOKEN is not configured." },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }
  if (q.length > 80) {
    return NextResponse.json({ error: "Query too long." }, { status: 400 });
  }

  // 5 分キャッシュで API 連打を防ぐ
  const cached = cache.get(q);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return NextResponse.json({ results: cached.results });
  }

  const url = `${API_BASE}?name=${encodeURIComponent(q)}&limit=10`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-hojinInfo-api-token": API_TOKEN,
        Accept: "application/json",
      },
      // gBizINFO はそこそこ早いが念のため上限
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      console.error("[companies/search] gBizINFO error", {
        status: res.status,
        query: q,
      });
      // 404 = 該当なし。空配列で返す
      if (res.status === 404) {
        cache.set(q, { at: Date.now(), results: [] });
        return NextResponse.json({ results: [] });
      }
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    const json = (await res.json()) as GbizResponse;
    const results = pickResults(json);
    cache.set(q, { at: Date.now(), results });
    return NextResponse.json({ results });
  } catch (err) {
    console.error("[companies/search] fetch failed", err);
    return NextResponse.json({ results: [] }, { status: 200 });
  }
}
