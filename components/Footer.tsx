export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} AI Lesson. Все права защищены.</p>
      </div>
    </footer>
  );
}
