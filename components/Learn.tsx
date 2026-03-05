import {
  BrainCircuit,
  MessageSquareText,
  Wrench,
  PenLine,
  Clock,
} from "lucide-react";

const items = [
  {
    icon: BrainCircuit,
    text: "Что такое искусственный интеллект простыми словами",
  },
  {
    icon: MessageSquareText,
    text: "Как пользоваться ChatGPT",
  },
  {
    icon: Wrench,
    text: "5 полезных AI инструментов",
  },
  {
    icon: PenLine,
    text: "Как писать правильные запросы (prompts)",
  },
  {
    icon: Clock,
    text: "Как экономить 1–2 часа времени каждый день",
  },
];

export default function Learn() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Что вы узнаете
        </h2>
        <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
          За 60 минут вы получите практические знания, которые сможете применить
          сразу
        </p>

        <div className="grid gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="group flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:shadow-gray-100/80 hover:border-primary-100 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium text-gray-800">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
