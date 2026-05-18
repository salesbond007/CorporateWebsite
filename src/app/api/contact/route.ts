import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  generalContactSchema,
  partnerLeadSchema,
  professionalContactSchema,
  type ContactFormType,
} from "@/lib/contact";

export const runtime = "nodejs";

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

const transporter =
  gmailUser && gmailPass
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: gmailUser, pass: gmailPass },
      })
    : null;

const fromAddress =
  process.env.CONTACT_MAIL_FROM ?? `Sales Bond <${gmailUser ?? "info@salesbond.jp"}>`;
const toBusiness = process.env.CONTACT_MAIL_TO_BUSINESS ?? "info@salesbond.jp";
const toProfessional = process.env.CONTACT_MAIL_TO_PROFESSIONAL ?? "info@salesbond.jp";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const fieldLabels: Record<string, string> = {
  company: "会社名",
  lastName: "姓",
  firstName: "名",
  name: "お名前",
  furigana: "フリガナ",
  email: "メールアドレス",
  phone: "電話番号",
  department: "部署",
  position: "役職",
  employeeCount: "従業員数",
  inquiryType: "お問い合わせ種別",
  serviceTypes: "対象サービス",
  message: "お問い合わせ内容",
  expertise: "専門分野",
  experienceYears: "経験年数",
  workStyle: "希望稼働形態",
  portfolio: "ポートフォリオURL",
  budget: "予算",
};

const enumLabels: Record<string, Record<string, string>> = {
  position: {
    executive: "経営者・役員",
    "general-manager": "部長",
    manager: "課長",
    "section-chief": "係長・主任",
    staff: "一般社員",
    contract: "契約・嘱託・派遣等",
    other: "その他",
  },
  employeeCount: {
    "1": "1人、個人事業主",
    "2-5": "2〜5人",
    "6-30": "従業員数6〜30人",
    "31-200": "従業員数31〜200人",
    "201-600": "従業員数201〜600人",
    "601-2000": "従業員数601〜2,000人",
    "2001-plus": "従業員数2,001人以上",
  },
  inquiryType: {
    service: "サービスについて",
    partnership: "協業について",
    proposal: "ご提案 / 営業",
    other: "その他",
    estimate: "お見積り依頼",
  },
  serviceTypes: {
    "sales-bond": "リファボンド(大手決裁者紹介サービス)",
    "keyman-bond": "キーマンボンド（プロ人材マッチングサービス）",
    "lead-bond": "セルボンド(インサイドセールス支援サービス)",
  },
};

function humanize(key: string, value: unknown): string {
  if (Array.isArray(value)) {
    const map = enumLabels[key];
    return value.map((v) => (map?.[String(v)] ?? String(v))).join(" / ");
  }
  const str = String(value ?? "");
  const map = enumLabels[key];
  return map?.[str] ?? str;
}

function renderHtml(type: ContactFormType, data: Record<string, unknown>) {
  const rows = Object.entries(data)
    .filter(([key]) => key !== "website" && key !== "agreement" && key !== "type")
    .map(([key, value]) => {
      const label = fieldLabels[key] ?? key;
      const display = humanize(key, value);
      return `
        <tr>
          <th align="left" style="padding:10px 14px;background:#FAF7F2;border-bottom:1px solid #E6E6E6;width:160px;">${escapeHtml(label)}</th>
          <td style="padding:10px 14px;border-bottom:1px solid #E6E6E6;white-space:pre-wrap;">${escapeHtml(display)}</td>
        </tr>
      `;
    })
    .join("");

  const heading =
    type === "professional"
      ? "プロ人材お問い合わせ"
      : type === "partner_lead"
        ? "個人パートナー登録(メール仮登録)"
        : "お問い合わせ(企業)";

  return `<!doctype html>
  <html><body style="font-family:-apple-system,'Segoe UI',sans-serif;color:#1A1A1A;">
    <h2 style="border-left:4px solid #F58220;padding-left:10px;">${heading}</h2>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px;">
      ${rows}
    </table>
  </body></html>`;
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const body = (payload ?? {}) as { type?: ContactFormType } & Record<string, unknown>;
  const type = body.type;

  if (
    type !== "professional" &&
    type !== "general" &&
    type !== "partner_lead"
  ) {
    return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
  }

  const schema =
    type === "professional"
      ? professionalContactSchema
      : type === "partner_lead"
        ? partnerLeadSchema
        : generalContactSchema;
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot check
  if ((parsed.data as { website?: string }).website) {
    return NextResponse.json({ ok: true });
  }

  const to = type === "professional" ? toProfessional : toBusiness;
  // 件名はすべてのフォームで統一(管理画面で並べやすい)。
  // フォーム種別は本文(renderHtml)の見出しで判別。
  const subject = "ホームページからの問い合わせ";

  if (!transporter) {
    console.warn("[contact] GMAIL_USER / GMAIL_APP_PASSWORD is not set. Logging form data instead.");
    console.info({ type, data: parsed.data });
    return NextResponse.json({ ok: true, dryRun: true });
  }

  const replyTo =
    typeof (parsed.data as { email?: string }).email === "string"
      ? (parsed.data as { email: string }).email
      : undefined;

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      replyTo,
      subject,
      html: renderHtml(type, parsed.data as Record<string, unknown>),
    });
    console.info("[contact] sent", { messageId: info.messageId, to, type });

    if (type === "general") {
      const senderEmail = (parsed.data as { email?: string }).email;
      const company = String((parsed.data as { company?: string }).company ?? "").trim();
      const lastName = String((parsed.data as { lastName?: string }).lastName ?? "").trim();
      if (senderEmail) {
        const autoReplyText = `${company}
${lastName} 様

お世話になっております。
セールスボンド株式会社でございます。

この度は弊社ホームページよりお問い合わせをいただき、誠にありがとうございます。

内容を確認のうえ、担当者より改めてご連絡を差し上げますので、今しばらくお待ちくださいますようお願いいたします。

何卒よろしくお願い申し上げます。

──────────────────────────
セールスボンド株式会社
https://www.salesbond.jp
※このメールは自動送信です。ご返信いただいてもお答えできません。
──────────────────────────`;
        try {
          await transporter.sendMail({
            from: fromAddress,
            to: senderEmail,
            subject: "お問い合わせありがとうございます(セールスボンド株式会社)",
            text: autoReplyText,
          });
          console.info("[contact] auto-reply sent", { to: senderEmail });
        } catch (replyErr) {
          const r = replyErr as { code?: string; message?: string };
          console.error("[contact] auto-reply failed", {
            code: r.code,
            message: r.message,
            to: senderEmail,
          });
          // 自動返信の失敗は本体の成功を覆さない
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = err as { code?: string; response?: string; message?: string };
    console.error("[contact] send threw", {
      code: e.code,
      response: e.response,
      message: e.message,
      from: fromAddress,
      to,
      type,
    });
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 },
    );
  }
}
