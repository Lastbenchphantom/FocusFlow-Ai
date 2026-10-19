import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-indigo">
              <Sparkles className="h-3.5 w-3.5 text-white" aria-hidden />
            </span>
            <span className="font-[family-name:var(--font-display)] text-base font-bold text-white">
              FocusFlow AI
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Illustrative AI productivity product built as a professional portfolio
            demonstration. Not affiliated with any commercial AI vendor.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="mb-2 font-semibold text-white">Product</p>
            <ul className="space-y-1.5 text-muted">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-white">
                  Demo
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold text-white">Project</p>
            <ul className="space-y-1.5 text-muted">
              <li>
                <a href="#faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-4 text-xs text-muted sm:px-6 lg:px-8">
        © 2026 FocusFlow AI · Portfolio demo · Fictional product
      </div>
    </footer>
  );
}
