const cases = [
  {
    title: "Founders",
    body: "Balance fundraising, product, and hiring without losing the thread on what compounds.",
  },
  {
    title: "Product teams",
    body: "Align sprint work to outcomes, not just ticket volume — with shared priority language.",
  },
  {
    title: "Solo makers",
    body: "Cut context switching. Protect maker hours. Ship the one thing that matters today.",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
            Who FocusFlow is for
          </h2>
          <p className="mt-4 text-muted">
            Illustrative personas — your workflow, clarified.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-line bg-gradient-to-b from-elevated/80 to-panel/60 p-6"
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
