import { Client } from "@upstash/qstash";

let qstash: Client | null = null;

function getClient() {
  if (!qstash) {
    const token = process.env.QSTASH_TOKEN;
    if (!token) {
      console.warn("QSTASH_TOKEN not set — skipping reminder scheduling");
      return null;
    }
    qstash = new Client({ token });
  }
  return qstash;
}

/**
 * Schedule a reminder email 1 hour before the lesson.
 * Lesson: April 15, 2025, 19:00 Europe/Berlin → reminder at 18:00 Berlin.
 */
export async function scheduleReminder(data: {
  email: string;
  name: string;
}) {
  const client = getClient();
  if (!client) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL;
  if (!appUrl) {
    console.warn("No APP_URL configured — cannot schedule reminder");
    return;
  }

  const baseUrl = appUrl.startsWith("http") ? appUrl : `https://${appUrl}`;

  // Lesson: 15 April 2026, 19:00 Berlin time → reminder at 18:00
  const lessonDate = new Date("2026-04-15T18:00:00+02:00");
  const now = new Date();
  const delaySeconds = Math.max(
    0,
    Math.floor((lessonDate.getTime() - now.getTime()) / 1000)
  );

  if (delaySeconds <= 0) {
    console.warn("Lesson reminder time already passed");
    return;
  }

  await client.publishJSON({
    url: `${baseUrl}/api/reminders/send`,
    body: { email: data.email, name: data.name },
    delay: delaySeconds,
  });
}
