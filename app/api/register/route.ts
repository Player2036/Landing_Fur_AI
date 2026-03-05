import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendToSheet } from "@/lib/googleSheets";
import { sendConfirmationEmail } from "@/lib/email";
import { scheduleReminder } from "@/lib/qstash";

// In-memory rate limit (best-effort, resets on deploy)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

const schema = z.object({
  name: z
    .string()
    .min(1, "Введите имя")
    .max(100, "Имя слишком длинное")
    .transform((s) => s.trim()),
  email: z
    .string()
    .email("Введите корректный email")
    .max(200)
    .transform((s) => s.trim().toLowerCase()),
  telegram: z
    .string()
    .max(100)
    .optional()
    .default("")
    .transform((s) => s.trim()),
});

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуйте через 15 минут." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const result = schema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Неверные данные";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, telegram } = result.data;
    const userAgent = req.headers.get("user-agent") || "";

    // Save to Google Sheets (non-blocking to avoid slow responses — but we await to catch errors)
    try {
      await appendToSheet({ name, email, telegram, userAgent, ip });
    } catch (sheetError) {
      console.error("Google Sheets error:", sheetError);
      // Don't fail registration if sheets fail
    }

    // Send confirmation email
    try {
      await sendConfirmationEmail(email, name);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    // Schedule reminder (non-critical)
    try {
      await scheduleReminder({ email, name });
    } catch (reminderError) {
      console.error("Reminder scheduling error:", reminderError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
