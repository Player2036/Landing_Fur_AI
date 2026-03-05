import { Calendar, Clock, Video, Timer, UsersRound } from "lucide-react";

const details = [
  { icon: Calendar, label: "Дата", value: "15 апреля" },
  { icon: Clock, label: "Время", value: "19:00 (Германия)" },
  { icon: Video, label: "Формат", value: "Zoom" },
  { icon: Timer, label: "Длительность", value: "60 минут" },
  { icon: UsersRound, label: "Мест", value: "30" },
];

export default function Info() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          Детали урока
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {details.map((d, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                <d.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                {d.label}
              </span>
              <span className="font-bold text-gray-800 text-center text-sm">
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
