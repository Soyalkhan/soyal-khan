"use client";

import { Reveal } from "@/components/Reveal";
import { timeline } from "@/lib/github-data";

export function Timeline() {
  return (
    <section id="journey" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <Reveal className="mb-12 flex items-baseline gap-3 border-b border-border pb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-brand">[06]</span>
          <span>Journey — Timeline</span>
        </Reveal>

        <ul className="divide-y divide-border border-y border-border">
          {timeline.map((t, i) => (
            <Reveal
              as="li"
              key={t.year}
              delay={i * 0.05}
              className="grid grid-cols-12 gap-4 px-2 py-8 md:py-10"
            >
              <div className="col-span-3 font-mono text-xs uppercase tracking-[0.22em] text-brand md:col-span-2">
                {t.year}
              </div>
              <h3 className="col-span-9 font-display text-xl uppercase leading-tight tracking-tight md:col-span-4 md:text-4xl md:leading-none break-words">
                {t.title}
              </h3>
              <p className="col-span-12 max-w-xl text-sm leading-relaxed text-muted-foreground md:col-span-6 md:text-base">
                {t.desc}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
