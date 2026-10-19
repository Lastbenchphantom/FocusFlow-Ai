"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import DashboardMock from "./DashboardMock";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <div className="ff-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="ff-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-5 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em] text-accent-bright uppercase">
            FocusFlow AI
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Prioritize work that{" "}
            <span className="bg-gradient-to-r from-accent-bright via-white to-indigo bg-clip-text text-transparent">
              actually moves
            </span>{" "}
            the needle
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            An illustrative AI productivity platform that ranks tasks by impact,
            protects deep work, and keeps teams aligned — fictional product demo
            for portfolio purposes.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#contact" className="ff-btn ff-btn-primary px-6 py-3 text-sm">
              Request early access
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#demo" className="ff-btn ff-btn-ghost px-6 py-3 text-sm">
              <Play className="h-4 w-4" aria-hidden />
              Try interactive demo
            </a>
          </div>
          <p className="mt-4 text-xs text-muted/80">
            Simulated AI · No real model calls · Demo data marked fictional
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 sm:mt-16"
        >
          <div
            className="pointer-events-none absolute -inset-x-10 -bottom-10 top-1/3 rounded-full bg-accent/20 blur-3xl"
            aria-hidden
          />
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
