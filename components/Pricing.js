"use client";

import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For individuals exploring focused workflows.",
    features: ["1 workspace", "Simulated prioritizer", "Focus timer", "Email support"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$18",
    period: "/seat mo",
    description: "For makers and small teams shipping weekly.",
    features: [
      "Unlimited boards",
      "Team guardrails",
      "Calendar focus blocks",
      "Priority analytics",
      "Priority support",
    ],
    cta: "Start Pro trial",
    highlighted: true,
  },
  {
    name: "Studio",
    price: "$49",
    period: "/seat mo",
    description: "For product orgs with shared outcome rituals.",
    features: [
      "SSO illustration",
      "Custom scoring weights",
      "Admin policies",
      "Audit export",
      "Dedicated CSM",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
            Simple pricing for illustrative plans
          </h2>
          <p className="mt-4 text-muted">
            Demo tiers only — no real billing is connected on this portfolio site.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
                tier.highlighted
                  ? "border-accent/50 bg-gradient-to-b from-accent/15 to-panel shadow-[0_0_60px_rgba(59,130,246,0.15)]"
                  : "border-line bg-panel/80"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-white">
                  {tier.price}
                </span>
                <span className="text-sm text-muted">{tier.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/85">
                    <Check className="h-4 w-4 text-accent-bright" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`ff-btn mt-8 w-full px-4 py-3 text-sm ${
                  tier.highlighted ? "ff-btn-primary" : "ff-btn-ghost"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
