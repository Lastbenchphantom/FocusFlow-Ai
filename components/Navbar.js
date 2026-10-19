"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-[#05070f]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-indigo shadow-[0_0_24px_var(--accent-glow)]">
            <Sparkles className="h-4 w-4 text-white" aria-hidden />
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white">
            FocusFlow{" "}
            <span className="bg-gradient-to-r from-accent-bright to-indigo bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ff-btn ff-btn-primary px-4 py-2 text-sm"
          >
            Start free trial
          </a>
        </div>

        <button
          type="button"
          className="ff-btn ff-btn-ghost inline-flex h-10 w-10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            className="border-b border-line bg-[#05070f] px-4 pb-6 pt-2 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-3 text-base text-muted hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                className="ff-btn ff-btn-primary mt-3 px-4 py-3 text-sm"
                onClick={() => setOpen(false)}
              >
                Start free trial
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
