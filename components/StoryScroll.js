"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const beats = [
  {
    title: "Capture everything",
    body: "Dump tasks from chat, email, and tools into one calm inbox — without deciding yet.",
  },
  {
    title: "Score what matters",
    body: "The simulated engine weighs goals, deadlines, and effort so urgency isn’t the only signal.",
  },
  {
    title: "Protect deep work",
    body: "FocusFlow blocks time for high-impact work and gently defers the rest.",
  },
  {
    title: "Ship with clarity",
    body: "End the day knowing what moved the needle — and what can wait until tomorrow.",
  },
];

export default function StoryScroll() {
  const root = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !root.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".ff-story-panel");
      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0.35, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      });

      gsap.to(".ff-story-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="story"
      ref={root}
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="story-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="story-heading"
            className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl"
          >
            From overwhelm to intentional momentum
          </h2>
          <p className="mt-4 text-muted">
            A product story in four beats — scroll to follow the journey.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 lg:grid-cols-[auto_1fr]">
          <div className="relative mx-auto hidden w-1 lg:block" aria-hidden>
            <div className="absolute inset-0 rounded-full bg-white/10" />
            <div className="ff-story-progress absolute inset-x-0 top-0 h-full origin-top scale-y-0 rounded-full bg-gradient-to-b from-accent to-indigo" />
          </div>

          <ol className="space-y-6">
            {beats.map((beat, i) => (
              <li
                key={beat.title}
                className="ff-story-panel rounded-2xl border border-line bg-panel/70 p-6 sm:p-8"
              >
                <p className="text-xs tracking-[0.2em] text-accent-bright uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                  {beat.title}
                </h3>
                <p className="mt-3 max-w-2xl text-muted">{beat.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
