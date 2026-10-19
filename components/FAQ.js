"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const items = [
  {
    q: "Is FocusFlow AI a real AI product?",
    a: "No. This is an illustrative portfolio website. Prioritization demos use local heuristics — there is no live model integration.",
  },
  {
    q: "Is the contact form connected to a real database?",
    a: "Yes. Submissions are validated server-side and stored in a Supabase PostgreSQL table with Row Level Security.",
  },
  {
    q: "Will I be charged if I click pricing CTAs?",
    a: "No. Pricing tiers are fictional. CTAs scroll to the contact form for early-access interest only.",
  },
  {
    q: "Do you store my message securely?",
    a: "Leads are written via a server-side service role. Anonymous clients cannot read, update, or delete other people’s leads.",
  },
  {
    q: "Does the site support reduced motion?",
    a: "Yes. Animations respect prefers-reduced-motion and fall back to static layouts.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-panel/60">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white hover:bg-white/[0.03] sm:px-6 sm:text-base"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {item.q}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted transition ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
