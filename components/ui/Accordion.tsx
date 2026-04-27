"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type Item = { question: string; answer: string };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-cream-300 rounded-2xl border border-cream-300 bg-white">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-7 md:py-5 text-left"
            >
              <span className="font-display text-lg md:text-xl text-ink-900">{item.question}</span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-900/15 text-emerald-900 transition-transform",
                  isOpen && "rotate-45 bg-emerald-900 text-white border-emerald-900",
                )}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 md:px-7 md:pb-6 text-ink-700 leading-relaxed">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
