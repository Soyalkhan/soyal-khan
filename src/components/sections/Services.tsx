"use client";

import { Reveal } from "@/components/Reveal";
import { services, partners, stats } from "@/lib/github-data";
import { ArrowUpRight, Check } from "lucide-react";

const STAT_ROW = [
  { k: "Shopify stores shipped", v: stats.storesShipped },
  { k: "Custom themes built", v: stats.themesBuilt },
  { k: "Ongoing projects", v: stats.ongoing },
  { k: "Team size", v: stats.team },
  { k: "Hourly rate", v: stats.hourlyRate },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <Reveal className="mb-12 flex items-baseline gap-3 border-b border-border pb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-brand">[03]</span>
          <span>Services — What I do</span>
        </Reveal>

        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="display-massive break-words text-[clamp(2rem,8vw,7rem)]">
              Need something <br />
              built? <span className="font-serif italic font-normal text-brand">I&apos;ve probably</span>
              <br />
              already solved it.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-5">
            <p className="text-foreground">
              Shopify funnel, custom theme, headless storefront, or a full-stack web + iOS +
              Android product — same engineer, same standard, transparent flat pricing across
              every brand.
            </p>
            <p>
              Rates aren&apos;t tied to brand size. Same fee, same quality — whether you&apos;re a
              D2C launch or a 100+ store group.
            </p>
            <p>
              With <span className="text-foreground">5+ developers</span> on the team and
              <span className="text-foreground"> 5+ years</span> of client handling experience,
              we resolve roughly <span className="text-foreground">{stats.issuesSolved}</span> of
              typical brand engineering issues end-to-end.
            </p>
          </div>
        </Reveal>

        {/* Stat row */}
        <Reveal className="mt-12 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 md:mt-14 md:grid-cols-5">
          {STAT_ROW.map((s) => (
            <div key={s.k} className="bg-background p-4 sm:p-5 md:p-6">
              <div className="font-display text-2xl leading-none sm:text-3xl md:text-4xl">{s.v}</div>
              <div className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
                {s.k}
              </div>
            </div>
          ))}
        </Reveal>

        {/* Service cards */}
        <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.05}
              className="flex flex-col gap-5 bg-background p-6 md:p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.price && (
                  <span className="border border-brand px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                    {s.price}
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl uppercase leading-tight break-words sm:text-2xl md:text-3xl">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.pitch}</p>
              <ul className="mt-auto space-y-2">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground"
                  >
                    <Check className="h-3 w-3 text-brand" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* CTA strip */}
        <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 border border-border bg-background p-6 md:flex-row md:items-center md:p-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Have a brand on Shopify or planning one?
            </div>
            <p className="mt-2 max-w-xl font-display text-lg uppercase leading-tight break-words sm:text-xl md:text-2xl">
              I&apos;ll set it up, convert it, extend it, or build whatever it&apos;s missing.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-background transition-all hover:bg-brand hover:border-brand hover:text-foreground"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        {/* Partners */}
        <Reveal className="mt-16 border-t border-border pt-10">
          <div className="mb-6 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>Partners — Integrations done before</span>
            <span className="text-brand">[{String(partners.length).padStart(2, "0")}]</span>
          </div>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            We&apos;ve partnered with and integrated leading checkout, payments, logistics, and
            messaging platforms — saving you weeks of integration work.
          </p>
          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {partners.map((p) => (
              <div
                key={p.name}
                className="flex flex-col gap-1 bg-background p-4 transition-colors hover:bg-white/[0.03] sm:p-5"
              >
                <span className="font-display text-xl uppercase leading-tight tracking-tight break-words sm:text-2xl">
                  {p.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
