import { GraduationCap, Briefcase, Laptop, Users } from "lucide-react";

const cards = [
  { icon: GraduationCap, label: "Для начинающих" },
  { icon: Briefcase, label: "Для предпринимателей" },
  { icon: Laptop, label: "Для фрилансеров" },
  { icon: Users, label: "Для обычных людей" },
];

export default function Audience() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          Для кого этот урок
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-white border border-gray-100 text-center hover:shadow-xl hover:shadow-primary-100/40 hover:border-primary-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-400/10 flex items-center justify-center text-primary-600 group-hover:from-primary-600 group-hover:to-accent-600 group-hover:text-white transition-all duration-300">
                <card.icon className="w-7 h-7" />
              </div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {card.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-gray-500 text-sm bg-primary-50/60 rounded-xl py-3 px-6 inline-block mx-auto w-full">
          ✨ Не требуется никаких технических знаний.
        </p>
      </div>
    </section>
  );
}
