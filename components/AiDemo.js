"use client";

import { useMemo, useState, useTransition } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, Loader2, Sparkles } from "lucide-react";

const seedTasks = [
  { id: "1", title: "Reply to all Slack threads", base: 28 },
  { id: "2", title: "Finalize launch checklist", base: 91 },
  { id: "3", title: "Refactor unused CSS utilities", base: 35 },
  { id: "4", title: "Prep customer interview notes", base: 74 },
  { id: "5", title: "Update investor FAQ deck", base: 68 },
  { id: "6", title: "Tidy desktop downloads folder", base: 12 },
];

function scoreTask(task, goal) {
  const goalBoost =
    goal === "growth"
      ? /launch|customer|investor|interview/i.test(task.title)
        ? 18
        : -8
      : goal === "quality"
        ? /refactor|checklist|faq/i.test(task.title)
          ? 14
          : -4
        : /interview|customer|launch/i.test(task.title)
          ? 10
          : 0;
  const jitter = ((task.id.charCodeAt(0) + goal.length) % 7) - 3;
  return Math.max(5, Math.min(99, task.base + goalBoost + jitter));
}

export default function AiDemo() {
  const [goal, setGoal] = useState("growth");
  const [ranked, setRanked] = useState(null);
  const [pending, startTransition] = useTransition();
  const reduce = useReducedMotion();

  const preview = useMemo(() => {
    if (!ranked) return seedTasks.map((t) => ({ ...t, score: t.base }));
    return ranked;
  }, [ranked]);

  function runPrioritize() {
    startTransition(async () => {
      // Simulated latency — not a real AI call
      await new Promise((r) => setTimeout(r, reduce ? 200 : 900));
      const next = seedTasks
        .map((t) => ({ ...t, score: scoreTask(t, goal) }))
        .sort((a, b) => b.score - a.score);
      setRanked(next);
    });
  }

  return (
    <section id="demo" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-accent-bright uppercase">
              Interactive demo
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              Watch simulated prioritization reshape your backlog
            </h2>
            <p className="mt-4 text-muted">
              Choose a goal and run the demo. Scores are produced by a local
              heuristic — <strong className="font-semibold text-white">not a live AI model</strong>.
              Data is fictional.
            </p>

            <fieldset className="mt-8">
              <legend className="mb-3 text-sm text-muted">Primary goal</legend>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Primary goal">
                {[
                  { id: "growth", label: "Growth" },
                  { id: "quality", label: "Quality" },
                  { id: "learning", label: "Learning" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={goal === opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      goal === opt.id
                        ? "border-accent bg-accent/20 text-white"
                        : "border-line bg-transparent text-muted hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={runPrioritize}
              disabled={pending}
              className="ff-btn ff-btn-primary mt-8 px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Prioritizing…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Run simulated AI
                </>
              )}
            </button>
          </div>

          <div className="ff-panel rounded-2xl p-4 sm:p-5" aria-live="polite">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Ranked backlog</p>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] text-amber-200">
                Fictional · Simulated
              </span>
            </div>
            <ul className="space-y-2">
              <AnimatePresence mode="popLayout">
                {preview.map((task, index) => (
                  <motion.li
                    key={task.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3 rounded-xl border border-line bg-elevated/60 px-3 py-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-xs tabular-nums text-muted">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-white">{task.title}</p>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-indigo transition-all duration-500"
                          style={{ width: `${task.score}%` }}
                        />
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-sm tabular-nums text-accent-bright">
                      {task.score}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
