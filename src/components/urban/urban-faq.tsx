"use client";

import { useState } from "react";
import { urbanFaqs } from "@/lib/kentsel-donusum";

export function UrbanFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-cream-dark border-y border-cream-dark">
      {urbanFaqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
            >
              <span className="font-serif text-lg text-charcoal sm:text-xl">
                {item.q}
              </span>
              <span
                className="mt-1 shrink-0 text-sm tracking-widest text-[#b8934a]"
                aria-hidden
              >
                {isOpen ? "—" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="pb-6 text-sm leading-relaxed text-muted sm:text-[15px]">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
