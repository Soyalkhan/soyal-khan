"use client";

import { Reveal } from "@/components/Reveal";
import { skills, profile, stats } from "@/lib/github-data";

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <Reveal className="mb-12 flex items-baseline gap-3 border-b border-border pb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-brand">[04]</span>
          <span>About — Profile</span>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display-massive break-words text-[clamp(2.25rem,8vw,8rem)]">
              Building the <br />
              <span className="text-brand">web</span>, one detail <br />
              at a time.
            </h2>
            <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p className="text-foreground">
                I&apos;m {profile.name} — a full-stack engineer based in {profile.location}.
                I work across React, Node and the modern web stack, shipping end-to-end products
                that feel fast and considered.
              </p>
              <p>
                Currently building at{" "}
                <span className="text-foreground">{profile.company}</span>. Over the last few
                years I&apos;ve shipped{" "}
                <span className="text-foreground">100+ Shopify storefronts</span> and{" "}
                <span className="text-foreground">50+ custom theme builds</span> for brands
                across India, the US and the EU — from D2C launches to fully headless
                Hydrogen / Remix stacks.
              </p>
              <p>
                Beyond commerce, I build booking platforms, invoicing tools, agency sites and
                the small obsessive details that make products feel sharp.
              </p>
              <p>
                I care about engineering rigor, clean systems, motion that means something,
                and products you actually want to use.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal className="border border-border">
              <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Stack / Index</span>
                <span className="text-brand">[{String(skills.length).padStart(2, "0")}]</span>
              </div>
              <div className="divide-y divide-border">
                {skills.map((s) => (
                  <div key={s.group} className="px-4 py-4 sm:px-5 sm:py-5">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg uppercase leading-none sm:text-xl">
                        {s.group}
                      </h3>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {String(s.items.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.map((i) => (
                        <span
                          key={i}
                          className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-brand hover:text-foreground"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-6 grid grid-cols-3 border border-border">
              {[
                { k: "Years", v: stats.yearsExperience },
                { k: "Ongoing", v: stats.ongoing },
                { k: "Team", v: stats.team },
              ].map((s, i) => (
                <div key={s.k} className={`p-5 ${i < 2 ? "border-r border-border" : ""}`}>
                  <div className="font-display text-3xl leading-none">{s.v}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.k}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
