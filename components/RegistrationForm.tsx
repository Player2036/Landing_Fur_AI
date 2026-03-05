"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), telegram: telegram.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormState("error");
        setErrorMsg(data.error || "Произошла ошибка. Попробуйте ещё раз.");
        return;
      }

      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMsg("Ошибка сети. Проверьте подключение и попробуйте ещё раз.");
    }
  };

  if (formState === "success") {
    return (
      <section id="register" className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Вы зарегистрированы!
            </h3>
            <p className="text-gray-600">
              Проверьте вашу почту — мы отправили подтверждение с ссылкой на Zoom.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              15 апреля · 19:00 (Германия) · Zoom
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
          Регистрация
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Заполните форму и получите ссылку на урок на вашу почту
        </p>

        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100/50"
        >
          {/* Honeypot — hidden from real users */}
          <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Имя <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="telegram"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Telegram{" "}
                <span className="text-gray-400 font-normal">(необязательно)</span>
              </label>
              <input
                id="telegram"
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
              />
            </div>
          </div>

          {formState === "error" && (
            <div className="mt-5 flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formState === "loading"}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-2xl text-lg shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
          >
            {formState === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Зарегистрироваться бесплатно
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-gray-400 text-center">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            Мы не передаём ваши данные третьим лицам.
          </p>
        </form>
      </div>
    </section>
  );
}
