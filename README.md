# AI Lesson Landing Page

Лендинг для регистрации на бесплатный урок «Искусственный интеллект для обычных людей».

**Стек:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Resend, Google Sheets API, Upstash QStash.

---

## Быстрый старт

```bash
# 1. Установите зависимости
npm install

# 2. Скопируйте файл с переменными окружения
cp .env.example .env

# 3. Заполните .env (см. инструкции ниже)

# 4. Запустите проект
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

> Без заполненных переменных окружения сайт будет работать (форма откроется), но данные не сохранятся и email не отправится. В консоли будут предупреждения.

---

## Настройка переменных окружения

### 1. Google Sheets (сохранение регистраций)

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/).
2. Создайте проект (или выберите существующий).
3. Включите **Google Sheets API** в разделе APIs & Services → Library.
4. Перейдите в **APIs & Services → Credentials → Create Credentials → Service Account**.
5. Создайте сервисный аккаунт, скачайте JSON-ключ.
6. Создайте Google Таблицу. В первую строку добавьте заголовки:
   | Timestamp | Name | Email | Telegram | UserAgent | IP |
   |-----------|------|-------|----------|-----------|-----|
7. Нажмите «Поделиться» и добавьте email сервисного аккаунта (из JSON-ключа, поле `client_email`) с правами **Редактор**.
8. Скопируйте ID таблицы из URL: `https://docs.google.com/spreadsheets/d/ЭТОТ_ID/edit`

Заполните в `.env`:

```
GOOGLE_SHEET_ID=ваш_id_таблицы
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...весь JSON одной строкой...}
```

> Вставьте весь JSON-ключ **в одну строку**.

### 2. Resend (отправка email)

1. Зарегистрируйтесь на [resend.com](https://resend.com).
2. Создайте API Key в разделе API Keys.
3. (Опционально) Добавьте и верифицируйте свой домен для отправки с кастомного адреса.

```
RESEND_API_KEY=re_xxxxxxxxx
EMAIL_FROM=AI Lesson <noreply@yourdomain.com>
```

> Без верифицированного домена можно использовать `onboarding@resend.dev` для тестов.

### 3. Zoom

```
ZOOM_LINK=https://zoom.us/j/your-meeting-id
```

### 4. QStash — напоминания (опционально)

Для автоматической отправки напоминания за 1 час до урока:

1. Зарегистрируйтесь на [upstash.com](https://upstash.com).
2. Создайте QStash instance (бесплатный тариф достаточен).
3. Скопируйте токен и signing key.

```
QSTASH_TOKEN=your_token
QSTASH_CURRENT_SIGNING_KEY=your_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

> Без QStash напоминания просто не отправятся — остальной функционал работает.

---

## Деплой на Vercel

1. Залейте код в Git-репозиторий (GitHub / GitLab).
2. Перейдите на [vercel.com](https://vercel.com) и импортируйте проект.
3. Добавьте все переменные окружения из `.env` в настройках проекта (Settings → Environment Variables).
4. Нажмите Deploy.

```bash
# Или через CLI:
npx vercel --prod
```

---

## Альтернатива QStash: Make.com

Если вы не хотите использовать QStash, можно настроить напоминания через Make.com:

1. Создайте сценарий в [Make.com](https://make.com).
2. Триггер: **Google Sheets → Watch New Rows** (выберите вашу таблицу).
3. Модуль задержки: **Tools → Sleep** до нужного времени (за 1 час до урока).
4. Действие: **Email → Send an Email** с текстом напоминания и Zoom-ссылкой.

---

## Структура проекта

```
├── app/
│   ├── layout.tsx          — корневой layout
│   ├── page.tsx            — главная страница
│   ├── globals.css         — стили Tailwind
│   └── api/
│       ├── register/
│       │   └── route.ts    — API регистрации
│       └── reminders/
│           └── send/
│               └── route.ts — отправка напоминания
├── components/
│   ├── Hero.tsx
│   ├── Learn.tsx
│   ├── Audience.tsx
│   ├── Info.tsx
│   ├── Scarcity.tsx
│   ├── RegistrationForm.tsx
│   └── Footer.tsx
├── lib/
│   ├── googleSheets.ts     — интеграция Google Sheets
│   ├── email.ts            — отправка email через Resend
│   └── qstash.ts           — планирование напоминаний
└── .env.example            — шаблон переменных окружения
```

---

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в dev-режиме |
| `npm run build` | Сборка для продакшена |
| `npm run start` | Запуск продакшн-сборки |
| `npm run lint` | Проверка кода |
