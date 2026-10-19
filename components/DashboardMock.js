"use client";

import { CheckCircle2, Clock3, Flame, Target } from "lucide-react";

const tasks = [
  {
    title: "Ship pricing page A/B test",
    impact: 94,
    effort: "M",
    tag: "Revenue",
    status: "Focus now",
  },
  {
    title: "Refine onboarding checklist",
    impact: 81,
    effort: "S",
    tag: "Activation",
    status: "Next",
  },
  {
    title: "Archive stale backlog items",
    impact: 42,
    effort: "S",
    tag: "Hygiene",
    status: "Later",
  },
  {
    title: "Write Q2 narrative for investors",
    impact: 76,
    effort: "L",
    tag: "Strategy",
    status: "Scheduled",
  },
];

export default function DashboardMock() {
  return (
    <div
      className="ff-panel ff-noise relative overflow-hidden rounded-2xl p-3 sm:rounded-3xl sm:p-5"
      role="img"
      aria-label="Illustrative FocusFlow AI product dashboard showing prioritized tasks and focus metrics"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line px-2 pb-4">
        <div>
          <p className="text-xs tracking-wide text-muted uppercase">Today · Demo workspace</p>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
            Priority cockpit
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1.5 text-xs text-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          Simulated focus session · 47m
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-2.5">
          {tasks.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3 rounded-xl border border-line bg-elevated/60 px-3 py-3 sm:px-4"
            >
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright sm:flex">
                <Target className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold text-white">{t.title}</p>
                  <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-muted">
                    {t.tag}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-indigo"
                      style={{ width: `${t.impact}%` }}
                    />
                  </div>
                  <span className="text-xs tabular-nums text-muted">{t.impact}</span>
                </div>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs text-accent-bright">{t.status}</p>
                <p className="text-[10px] text-muted">Effort {t.effort}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <Stat
            icon={<Flame className="h-4 w-4" />}
            label="Impact score"
            value="88"
            hint="Fictional composite"
          />
          <Stat
            icon={<Clock3 className="h-4 w-4" />}
            label="Deep work reserved"
            value="3.5h"
            hint="Protected blocks"
          />
          <Stat
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Noise filtered"
            value="12"
            hint="Low-leverage items"
          />
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, hint }) {
  return (
    <div className="rounded-xl border border-line bg-elevated/50 p-4">
      <div className="mb-3 flex items-center gap-2 text-accent-bright">
        {icon}
        <span className="text-xs text-muted">{label}</span>
      </div>
      <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}
