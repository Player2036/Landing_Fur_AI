"use client";

import { Flame } from "lucide-react";

export default function Scarcity() {
  const totalSpots = 30;
  const remainingSpots = 30;
  const filledPercent = ((totalSpots - remainingSpots) / totalSpots) * 100;

  return (
    <section className="py-16 px-6">
      <div className="max-w-md mx-auto">
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Осталось {remainingSpots} мест
            </span>
          </div>

          <div className="w-full h-3 bg-white/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(filledPercent, 4)}%` }}
            />
          </div>

          <p className="text-center text-sm text-gray-500 mt-3">
            Места ограничены — зарегистрируйтесь заранее
          </p>
        </div>
      </div>
    </section>
  );
}
