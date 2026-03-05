"use client";

import { Sparkles, ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-accent-600)_0%,_transparent_50%)] opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-primary-600)_0%,_transparent_50%)] opacity-20" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-primary-200 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Бесплатный онлайн-урок</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Как использовать{" "}
          <span className="bg-gradient-to-r from-primary-300 to-accent-400 bg-clip-text text-transparent">
            искусственный интеллект
          </span>{" "}
          в жизни и работе
        </h1>

        <p className="text-lg sm:text-xl text-primary-200/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Узнайте как использовать ChatGPT и другие AI&#8209;инструменты даже
          если вы никогда ими не пользовались.
        </p>

        <button
          onClick={scrollToForm}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-2xl text-lg shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          Зарегистрироваться
          <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <p className="mt-6 text-primary-300/60 text-sm">
          15 апреля · 19:00 (Германия) · Zoom · 60 минут
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
