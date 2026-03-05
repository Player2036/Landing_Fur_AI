"use client";

import Image from "next/image";
import { ArrowRight, Clock, Cpu, Users } from "lucide-react";

const features = [
  { icon: Clock, value: "+1 час", label: "Практического урока" },
  { icon: Cpu, value: "5", label: "AI инструментов" },
  { icon: Users, value: "300+", label: "человек уже прошли" },
];

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/40 to-white">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-16 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-16 w-64 sm:w-[400px] h-64 sm:h-[400px] rounded-full bg-primary-200/20 blur-3xl pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-12 xl:px-20 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-12 xl:gap-16 items-center">

          {/* ─── Left column: content ─── */}
          <div className="order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200/60 mb-5 sm:mb-6 lg:mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-700">
                AI Lesson
              </span>
            </div>

            {/* Feature cards */}
            <div className="flex flex-row flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6 lg:mb-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm"
                >
                  <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                    <f.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">{f.value}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">{f.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Headline */}
            <h1 className="text-[1.6rem] leading-[1.2] sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-extrabold sm:leading-[1.15] tracking-tight text-gray-900 mb-4 sm:mb-5 lg:mb-6">
              Как использовать{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                искусственный интеллект
              </span>{" "}
              в&nbsp;жизни и&nbsp;работе
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-lg mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
              Узнайте как использовать ChatGPT и&nbsp;другие AI&#8209;инструменты
              даже если вы никогда ими не&nbsp;пользовались.
            </p>

            {/* CTA */}
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 lg:px-8 lg:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl text-base lg:text-lg shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Принять участие
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className="mt-3 sm:mt-4 lg:mt-5 text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              15 апреля · 19:00 (Германия) · Zoom · 60 минут
            </p>
          </div>

          {/* ─── Right column: robot image ─── */}
          <div className="order-2 flex justify-center md:justify-end mt-4 md:mt-0">
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[480px]">
              <div className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full bg-gradient-to-br from-orange-300/40 to-primary-300/30 blur-3xl" />
              <Image
                src="/ai-robot.png"
                alt="AI робот — искусственный интеллект"
                width={540}
                height={540}
                priority
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
