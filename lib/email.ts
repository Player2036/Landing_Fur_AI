import { Resend } from "resend";

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.warn("RESEND_API_KEY not set — skipping email");
      return null;
    }
    resend = new Resend(key);
  }
  return resend;
}

export async function sendConfirmationEmail(to: string, name: string) {
  const client = getResend();
  if (!client) return;

  const from = process.env.EMAIL_FROM || "AI Lesson <noreply@example.com>";
  const zoomLink = process.env.ZOOM_LINK || "https://zoom.us";

  await client.emails.send({
    from,
    to,
    subject: "Вы зарегистрированы на бесплатный урок по AI!",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #1a1a2e;">
        <h1 style="font-size: 22px; margin-bottom: 16px;">Привет, ${escapeHtml(name)}! 👋</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Вы успешно зарегистрированы на бесплатный урок
          <strong>«Искусственный интеллект для обычных людей»</strong>.
        </p>

        <div style="background: #f0f5ff; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>📅 Дата:</strong> 15 апреля</p>
          <p style="margin: 0 0 8px;"><strong>🕐 Время:</strong> 19:00 (Германия)</p>
          <p style="margin: 0 0 8px;"><strong>📹 Формат:</strong> Zoom</p>
          <p style="margin: 0 0 8px;"><strong>⏱ Длительность:</strong> 60 минут</p>
        </div>

        <a href="${escapeHtml(zoomLink)}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 16px;">
          Ссылка на Zoom
        </a>

        <p style="font-size: 14px; color: #6b7280; margin-top: 24px; line-height: 1.6;">
          💡 Добавьте урок в календарь, чтобы не забыть!<br/>
          Мы также пришлём напоминание перед началом.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="font-size: 12px; color: #9ca3af;">
          Это автоматическое письмо. Если у вас есть вопросы, напишите нам в ответ на это письмо.
        </p>
      </div>
    `,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
