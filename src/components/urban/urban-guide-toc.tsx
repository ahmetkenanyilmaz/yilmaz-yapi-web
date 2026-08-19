"use client";

import { useEffect, useState } from "react";
import { urbanGuideToc } from "@/lib/kentsel-donusum";

export function UrbanGuideToc() {
  const [active, setActive] = useState<string>(urbanGuideToc[0].id);

  useEffect(() => {
    const nodes = urbanGuideToc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="İçindekiler" className="lg:sticky lg:top-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8934a]">
        İçindekiler
      </p>
      <ul className="mt-4 space-y-1 border-l border-cream-dark">
        {urbanGuideToc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors ${
                active === item.id
                  ? "-ml-px border-[#b8934a] font-medium text-[#2b2a27]"
                  : "border-transparent text-muted hover:text-charcoal"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
