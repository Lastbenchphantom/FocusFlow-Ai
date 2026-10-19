import { Check } from "lucide-react";

const benefits = [
  "Fewer meetings about priorities — more time executing them",
  "A single source of truth for what deserves attention today",
  "Reduced decision fatigue with transparent, explainable rankings",
  "Healthier deep-work habits without rigid productivity dogma",
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="ff-panel overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
              Outcomes you can feel by Friday
            </h2>
            <p className="mt-4 text-muted">
              FocusFlow AI is a portfolio demonstration of a premium SaaS narrative —
              benefits below are illustrative, not measured claims.
            </p>
          </div>
          <ul className="mt-8 space-y-3 lg:mt-0">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-white/90">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
