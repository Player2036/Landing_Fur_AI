import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  // In production, verify QStash signature here
  const qstashToken = process.env.QSTASH_CURRENT_SIGNING_KEY;
  if (qstashToken) {
    // Signature verification can be added with @upstash/qstash receiver
  }

  try {
    const { email, name } = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const from = process.env.EMAIL_FROM || "AI Lesson <noreply@example.com>";
    const zoomLink = process.env.ZOOM_LINK || "https://zoom.us";

    await resend.emails.send({
      from,
      to: email,
      subject: "Напоминание: урок по AI начнётся через 1 час!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #1a1a2e;">
          <h1 style="font-size: 22px; margin-bottom: 16px;">Привет, ${name}! ⏰</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Напоминаем, что бесплатный урок <strong>«Искусственный интеллект для обычных людей»</strong>
            начнётся <strong>через 1 час</strong>!
          </p>
          <a href="${zoomLink}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 16px; margin-top: 16px;">
            Войти в Zoom
          </a>
          <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">
            До встречи! 👋
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reminder send error:", error);
    return NextResponse.json({ error: "Failed to send reminder" }, { status: 500 });
  }
}
