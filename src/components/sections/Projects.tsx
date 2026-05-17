"use client";

import { Reveal } from "@/components/Reveal";
import { projects, CATEGORY_LABELS, type ProjectCategory } from "@/lib/github-data";
import { ArrowUpRight } from "lucide-react";
import { SiShopify, SiNextdotjs, SiRemix, SiGoogleplay } from "react-icons/si";
import type { ComponentType, SVGProps } from "react";

const MARQUEE_ITEMS = [
  "Selected Work",
  "Shopify Apps · Hydrogen · Custom Dev",
  "2024 – 2026",
  "Real production builds",
  "React · Node · MongoDB",
  "Soyal Khan",
];

const CATEGORY_ORDER: ProjectCategory[] = [
  "shopify-app",
  "mobile-app",
  "headless",
  "theme",
  "custom-dev",
];

const CATEGORY_ICON: Record<ProjectCategory, ComponentType<SVGProps<SVGSVGElement>>> = {
  "shopify-app": SiShopify,
  "mobile-app": SiGoogleplay,
  headless: SiRemix,
  theme: SiShopify,
  "custom-dev": SiNextdotjs,
};

const grouped = CATEGORY_ORDER.map((cat) => ({
  cat,
  label: CATEGORY_LABELS[cat],
  Icon: CATEGORY_ICON[cat],
  items: projects.filter((p) => p.category === cat),
}));

export function Projects() {
  let serial = 0;

  return (
    <>
      <section
        id="featured"
        className="relative border-y border-border bg-background py-6 overflow-hidden"
      >
        <div className="flex whitespace-nowrap font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none">
          <div className="marquee-track flex shrink-0 gap-12 pr-12">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0 items-center gap-12">
                {MARQUEE_ITEMS.map((t, i) => (
                  <span key={`${k}-${i}`} className="flex shrink-0 items-center gap-12">
                    <span className={i % 2 ? "text-foreground" : "text-muted-foreground"}>
                      {t}
                    </span>
                    <span className="text-brand">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
            <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="text-brand">[02]</span>
              <span>Portfolio</span>
              <span className="text-brand">[{String(projects.length).padStart(2, "0")}]</span>
            </div>
            <h2 className="display-massive max-w-[14ch] break-words text-[clamp(2.25rem,8vw,7rem)]">
              Every project. <br />
              <span className="text-brand">Every detail.</span>
            </h2>
          </Reveal>

          {grouped.map(({ cat, label, Icon, items }) => (
            <div key={cat} className="mb-14 last:mb-0">
              <Reveal className="mb-4 flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-brand" />
                  <h3 className="font-display text-lg uppercase leading-tight tracking-tight sm:text-xl md:text-2xl md:leading-none">
                    {label}
                  </h3>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  [{String(items.length).padStart(2, "0")}]
                </span>
              </Reveal>

              <ul className="divide-y divide-border border-b border-border">
                {items.map((p) => {
                  serial += 1;
                  return (
                    <li key={p.name}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative grid grid-cols-12 items-center gap-4 px-2 py-6 transition-colors hover:bg-white/[0.02] md:py-7"
                      >
                        <span className="col-span-2 font-mono text-xs text-muted-foreground md:col-span-1">
                          {String(serial).padStart(3, "0")}
                        </span>

                        <div className="col-span-10 flex items-center gap-3 md:col-span-4">
                          {p.logoUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.logoUrl}
                              alt={`${p.name} logo`}
                              width={44}
                              height={44}
                              className="h-10 w-10 shrink-0 rounded-[6px] border border-border bg-white/5 object-cover md:h-11 md:w-11"
                              loading="lazy"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              {p.appStore && (
                                <SiShopify
                                  className="h-3.5 w-3.5 shrink-0 text-brand"
                                  aria-label="Shopify App Store"
                                />
                              )}
                              {p.playStore && (
                                <SiGoogleplay
                                  className="h-3.5 w-3.5 shrink-0 text-brand"
                                  aria-label="Google Play"
                                />
                              )}
                              <h4 className="font-display text-lg uppercase leading-tight tracking-tight transition-colors group-hover:text-brand sm:text-xl md:text-3xl md:leading-none break-words">
                                {p.name}
                              </h4>
                            </div>
                            {p.client && (
                              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                                {p.client} · {p.year}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="col-span-12 text-sm leading-relaxed text-muted-foreground md:col-span-4">
                          <span className="text-foreground">Solves:</span> {p.solves}
                        </p>

                        <div className="col-span-12 flex flex-wrap items-center gap-1.5 md:col-span-2">
                          {p.stack.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="col-span-12 flex justify-end md:col-span-1">
                          <span className="flex h-10 w-10 items-center justify-center border border-border transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <Reveal className="mt-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>More projects on request</span>
            <a
              href="#contact"
              className="text-foreground hover:text-brand"
            >
              Discuss your project →
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
