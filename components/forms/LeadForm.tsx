"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "compact" | "full" | "apply";

const labelClass = "block text-sm font-medium text-ink-700 mb-1.5";
const inputClass =
  "w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-ink-800 placeholder:text-ink-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 outline-none transition";

export function LeadForm({
  variant = "full",
  heading,
  subheading,
}: {
  variant?: Variant;
  heading?: string;
  subheading?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 text-center">
        <p className="font-display text-2xl text-emerald-900">Thank you!</p>
        <p className="mt-3 text-ink-700">
          Your information has been received. Emel will reach out within one business day to discuss your goals.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white shadow-soft border border-cream-200 p-6 md:p-8 space-y-4"
    >
      {(heading || subheading) && (
        <div className="mb-2">
          {heading && <p className="font-display text-xl md:text-2xl text-emerald-900">{heading}</p>}
          {subheading && <p className="text-sm text-ink-600 mt-1">{subheading}</p>}
        </div>
      )}

      <div className={cn("grid gap-4", variant !== "compact" && "md:grid-cols-2")}>
        <div>
          <label htmlFor="lf-name" className={labelClass}>Full name</label>
          <input id="lf-name" name="name" required className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="lf-email" className={labelClass}>Email</label>
          <input id="lf-email" name="email" type="email" required className={inputClass} placeholder="jane@example.com" />
        </div>
        <div>
          <label htmlFor="lf-phone" className={labelClass}>Phone</label>
          <input id="lf-phone" name="phone" type="tel" required className={inputClass} placeholder="(778) 555-0100" />
        </div>
        <div>
          <label htmlFor="lf-city" className={labelClass}>City</label>
          <input id="lf-city" name="city" className={inputClass} placeholder="Vancouver" />
        </div>
      </div>

      {variant !== "compact" && (
        <div>
          <label htmlFor="lf-goal" className={labelClass}>What can I help with?</label>
          <select id="lf-goal" name="goal" className={inputClass}>
            <option value="">Select a goal</option>
            <option>Buying my first home</option>
            <option>Buying my next home</option>
            <option>Mortgage pre-approval</option>
            <option>Mortgage renewal</option>
            <option>Refinance / equity take-out</option>
            <option>Investment property</option>
            <option>Self-employed mortgage</option>
            <option>New to Canada / non-resident</option>
            <option>Reverse mortgage / 55+</option>
            <option>Other / not sure yet</option>
          </select>
        </div>
      )}

      {variant === "apply" && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="lf-purchase" className={labelClass}>Estimated purchase price (CAD)</label>
              <input id="lf-purchase" name="purchasePrice" className={inputClass} placeholder="$950,000" />
            </div>
            <div>
              <label htmlFor="lf-down" className={labelClass}>Down payment (CAD)</label>
              <input id="lf-down" name="downPayment" className={inputClass} placeholder="$95,000" />
            </div>
            <div>
              <label htmlFor="lf-income" className={labelClass}>Household annual income (CAD)</label>
              <input id="lf-income" name="income" className={inputClass} placeholder="$140,000" />
            </div>
            <div>
              <label htmlFor="lf-timeline" className={labelClass}>Timeline</label>
              <select id="lf-timeline" name="timeline" className={inputClass}>
                <option value="">Select</option>
                <option>0–3 months</option>
                <option>3–6 months</option>
                <option>6–12 months</option>
                <option>Just exploring</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div>
        <label htmlFor="lf-message" className={labelClass}>Message (optional)</label>
        <textarea
          id="lf-message"
          name="message"
          rows={variant === "compact" ? 3 : 4}
          className={inputClass}
          placeholder="Share anything that helps me prepare for our call."
        />
      </div>

      <div className="flex items-start gap-3">
        <input id="lf-consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-cream-400 accent-emerald-800" />
        <label htmlFor="lf-consent" className="text-xs text-ink-600 leading-relaxed">
          I consent to be contacted by email, phone, or text about my mortgage inquiry. My information will not be shared
          without my permission.
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-emerald-900 px-6 py-3.5 text-sm font-semibold text-cream-50 hover:bg-emerald-800 transition"
      >
        {variant === "apply" ? "Submit Application" : "Request a Free Consultation"}
      </button>

      <p className="text-[11px] text-ink-400 text-center">
        Free, no-obligation consultation. Your data stays with Emel and is never sold.
      </p>
    </form>
  );
}
