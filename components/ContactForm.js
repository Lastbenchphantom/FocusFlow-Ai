"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

const initial = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  function validate() {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "Enter your name (at least 2 characters).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (form.company.length > 120) next.company = "Company is too long.";
    if (form.message.length > 2000) next.message = "Message is too long.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setServerError("");
    if (status === "loading" || status === "success") return;
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setServerError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
      setServerError("Network error. Check your connection and try again.");
    }
  }

  function field(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    if (status === "error") setStatus("idle");
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              Request early access
            </h2>
            <p className="mt-4 text-muted">
              Leave your details and we&apos;ll store them securely in PostgreSQL.
              This is a real lead capture for the portfolio demo — not a fake success toast.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="ff-panel rounded-2xl p-6 sm:p-8"
            noValidate
          >
            {/* Honeypot */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => field("website", e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                required
                value={form.name}
                error={errors.name}
                onChange={(v) => field("name", v)}
                autoComplete="name"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                required
                value={form.email}
                error={errors.email}
                onChange={(v) => field("email", v)}
                autoComplete="email"
              />
            </div>

            <div className="mt-4">
              <Field
                id="company"
                label="Company (optional)"
                value={form.company}
                error={errors.company}
                onChange={(v) => field("company", v)}
                autoComplete="organization"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
                Message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={2000}
                value={form.message}
                onChange={(e) => field("message", e.target.value)}
                className="w-full rounded-xl border border-line bg-elevated/60 px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-danger" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3" aria-live="polite">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="ff-btn ff-btn-primary w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                    Message saved
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Send message
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="flex items-start gap-2 text-sm text-success" role="status">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  Thanks — your message was stored in the database.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-start gap-2 text-sm text-danger" role="alert">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {serverError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  autoComplete,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-muted">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-elevated/60 px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
