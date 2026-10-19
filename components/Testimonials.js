const quotes = [
  {
    quote:
      "FocusFlow made our Monday planning feel intentional instead of political. We stop debating and start shipping.",
    name: "Maya Chen",
    role: "Head of Product · Northwind Labs (fictional)",
  },
  {
    quote:
      "The simulated ranking is surprisingly useful as a teaching tool for junior PMs learning prioritization.",
    name: "Jordan Blake",
    role: "Engineering Manager · Cobalt Studio (fictional)",
  },
  {
    quote:
      "I reclaim two deep-work blocks a week. The UI alone is worth studying for portfolio inspiration.",
    name: "Samira Okonkwo",
    role: "Independent designer (fictional)",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
            Voices from a fictional launch cohort
          </h2>
          <p className="mt-4 text-muted">
            Demo testimonials — clearly labeled as fictional for this portfolio project.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <blockquote
              key={q.name}
              className="flex flex-col rounded-2xl border border-line bg-elevated/40 p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-white/90">
                “{q.quote}”
              </p>
              <footer className="mt-6 border-t border-line pt-4">
                <cite className="not-italic">
                  <span className="block text-sm font-semibold text-white">{q.name}</span>
                  <span className="mt-1 block text-xs text-muted">{q.role}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
