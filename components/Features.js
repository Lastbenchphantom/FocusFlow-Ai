"use client";

import {
  BrainCircuit,
  CalendarClock,
  Filter,
  Layers3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const features = [
  {
    icon: BrainCircuit,
    title: "Impact ranking",
    body: "Simulated scoring ranks tasks by goal alignment, urgency, and effort — so the top of your list is never arbitrary.",
  },
  {
    icon: Filter,
    title: "Noise suppression",
    body: "Low-leverage chores sink automatically. Keep inbox zero energy for decisions that compound.",
  },
  {
    icon: CalendarClock,
    title: "Focus blocks",
    body: "Protect deep work with calendar-aware sessions that respect energy patterns and meeting load.",
  },
  {
    icon: Layers3,
    title: "Cross-tool context",
    body: "Illustrative connectors stitch issues, docs, and messages into one prioritized surface.",
  },
  {
    icon: Zap,
    title: "Instant replans",
    body: "When priorities shift, the simulated engine reshuffles your day in seconds — not hours.",
  },
  {
    icon: ShieldCheck,
    title: "Team guardrails",
    body: "Shared focus policies keep individuals aligned without micromanaging every checkbox.",
  },
];

export default function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for calm, high-leverage days
          </h2>
          <p className="mt-4 text-muted">
            Six capabilities that turn chaotic backlogs into a clear, executable
            plan — demonstrated with fictional product behavior.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.45 }}
              className="group rounded-2xl border border-line bg-panel/80 p-6 transition hover:border-accent/30 hover:bg-elevated/80"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition group-hover:bg-accent/25">
                <f.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
