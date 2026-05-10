import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  businessContactSchema,
  professionalContactSchema,
  type ContactFormType,
} from "@/lib/contact";

export const runtime = "nodejs";

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

const fromAddress = process.env.CONTACT_MAIL_FROM ?? "noreply@example.com";
const toBusiness = process.env.CONTACT_MAIL_TO_BUSINESS ?? fromAddress;
const toProfessional = process.env.CONTACT_MAIL_TO_PROFESSIONAL ?? fromAddress;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(type: ContactFormType, data: Record<string, unknown>) {
  const rows = Object.entries(data)
    .filter(([key]) => key !== "website" && key !== "agreement")
    .map(
      ([key, value]) => `
        <tr>
          <th align="left" style="padding:8px 12px;background:#FAF7F2;border-bottom:1px solid #E6E6E6;">${escapeHtml(
            key,
          )}</th>
          <td style="padding:8px 12px;border-bottom:1px solid #E6E6E6;white-space:pre-wrap;">${escapeHtml(
            String(value ?? ""),
          )}</td>
        </tr>
      `,
    )
    .join("");

  const heading =
    type === "business" ? "企業様お問い合わせ" : "プロ人材お問い合わせ";

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

  if (type !== "business" && type !== "professional") {
    return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
  }

  const schema = type === "business" ? businessContactSchema : professionalContactSchema;
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

  const to = type === "business" ? toBusiness : toProfessional;
  const subject =
    type === "business"
      ? "【企業様お問い合わせ】新規受信"
      : "【プロ人材お問い合わせ】新規受信";

  if (!resend) {
    console.warn("[contact] RESEND_API_KEY is not set. Logging form data instead.");
    console.info({ type, data: parsed.data });
    return NextResponse.json({ ok: true, dryRun: true });
  }

  try {
    await resend.emails.send({
      from: fromAddress,
      to,
      replyTo:
        typeof (parsed.data as { email?: string }).email === "string"
          ? (parsed.data as { email: string }).email
          : undefined,
      subject,
      html: renderHtml(type, parsed.data as Record<string, unknown>),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 },
    );
  }
}
