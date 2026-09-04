"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { services, partners } from "@/lib/github-data";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border py-20 md:py-24">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-muted-foreground">03 — Services</span>
            <h2 className="display-xl mt-3 text-[clamp(2.25rem,5.5vw,3.75rem)]">
              What I <span className="hl italic">build</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            One engineer, one standard, flat pricing — from a first D2C launch to a
            100-store group.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 5) * 0.04} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-slate">
                <span className="font-display text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl text-foreground">{s.title}</h3>
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {s.pitch}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5 pt-1">
                  {s.bullets.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-body"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Integrations — proof, compressed to one row of names */}
        <Reveal className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="eyebrow shrink-0 text-muted-foreground">Integrated before</span>
            <div className="flex flex-wrap gap-2">
              {partners.map((p) => (
                <span
                  key={p.name}
                  title={p.category}
                  className="rounded-full border border-border px-3 py-1.5 font-display text-sm text-foreground"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA strip */}
        <Reveal className="mt-5 flex flex-col items-start justify-between gap-5 rounded-2xl bg-slate p-7 md:flex-row md:items-center md:p-9">
          <p className="max-w-lg font-display text-2xl text-background md:text-3xl">
            Got a store to launch, fix or <span className="italic text-brand">outgrow</span>?
          </p>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-slate-deep transition-colors hover:bg-brand-deep"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
