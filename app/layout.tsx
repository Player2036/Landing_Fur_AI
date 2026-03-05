import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Бесплатный урок — AI для обычных людей",
  description:
    "Узнайте как использовать ChatGPT и другие AI-инструменты даже если вы никогда ими не пользовались. Бесплатный онлайн-урок.",
  openGraph: {
    title: "Бесплатный урок — Искусственный интеллект для обычных людей",
    description:
      "Узнайте как использовать ChatGPT и другие AI-инструменты в жизни и работе.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body suppressHydrationWarning className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
