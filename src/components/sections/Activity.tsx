"use client";

import { Reveal } from "@/components/Reveal";
import { languageStats, profile } from "@/lib/github-data";
import { useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function buildContrib() {
  const cells: number[] = [];
  for (let i = 0; i < 53 * 7; i++) {
    const seed = Math.sin(i * 9.31 + 0.7) * 43758.5453;
    const r = seed - Math.floor(seed);
    cells.push(r < 0.45 ? 0 : r < 0.7 ? 1 : r < 0.85 ? 2 : r < 0.95 ? 3 : 4);
  }
  return cells;
}

export function Activity() {
  const cells = useMemo(buildContrib, []);
  const total = cells.filter((c) => c > 0).length * 3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cell]",
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: { amount: 1.4, from: "start", grid: [53, 7], axis: "x" },
          scrollTrigger: { trigger: "#contrib", start: "top 80%" },
        }
      );
      gsap.fromTo(
        "[data-bar]",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "#langs", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="activity" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <Reveal className="mb-12 flex items-baseline gap-3 border-b border-border pb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-brand">[05]</span>
          <span>Activity — Always shipping</span>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="border border-border lg:col-span-8">
            <div id="contrib" className="p-4 sm:p-6">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[10px]">
                    Contributions / 365 days
                  </div>
                  <div className="mt-2 font-display text-3xl uppercase leading-none sm:text-4xl">
                    {total}+ <span className="text-base text-muted-foreground">commits</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Less
                  {[0, 1, 2, 3, 4].map((l) => (
                    <span
                      key={l}
                      className="h-2.5 w-2.5"
                      style={{
                        background:
                          l === 0
                            ? "oklch(1 0 0 / 0.06)"
                            : `oklch(0.5 0.28 264 / ${0.25 + l * 0.18})`,
                      }}
                    />
                  ))}
                  More
                </div>
              </div>
              <div className="overflow-x-auto">
                <div
                  className="grid gap-1 min-w-[600px]"
                  style={{
                    gridTemplateColumns: "repeat(53, minmax(0, 1fr))",
                    gridAutoFlow: "column",
                    gridTemplateRows: "repeat(7, 1fr)",
                  }}
                >
                  {cells.map((c, i) => (
                    <span
                      key={i}
                      data-cell
                      className="aspect-square"
                      style={{
                        background:
                          c === 0
                            ? "oklch(1 0 0 / 0.05)"
                            : `oklch(0.5 0.28 264 / ${0.25 + c * 0.18})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="border border-border lg:col-span-4">
            <div id="langs">
              <div className="p-4 sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Languages / share
                </div>
                <div className="mt-2 font-display text-2xl uppercase leading-none">
                  Most-used stack
                </div>

                <div className="mt-7 space-y-4">
                  {languageStats.map((l) => (
                    <div key={l.name}>
                      <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                        <span className="text-foreground">{l.name}</span>
                        <span className="text-muted-foreground">{l.value}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5">
                        <div
                          data-bar
                          className="h-full bg-brand"
                          style={{ width: `${l.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 border border-border">
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="border-r border-border p-4 transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Repos
                    </div>
                    <div className="mt-1 font-display text-2xl">{profile.publicRepos}</div>
                  </a>
                  <div className="p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Since
                    </div>
                    <div className="mt-1 font-display text-2xl">2019</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
