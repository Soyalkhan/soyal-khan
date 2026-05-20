"use client";

import { Reveal } from "@/components/Reveal";
import { caseStudies, CATEGORY_LABELS, type Project } from "@/lib/github-data";
import { ArrowUpRight, Star } from "lucide-react";
import { SiShopify, SiGoogleplay } from "react-icons/si";

const FEATURED = caseStudies;

const fallbackGradients = [
  "linear-gradient(135deg, oklch(0.45 0.25 25), oklch(0.18 0.18 30) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.5 0.28 264), oklch(0.18 0.18 264) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.55 0.2 145), oklch(0.18 0.12 160) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.6 0.22 60), oklch(0.18 0.14 50) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.55 0.22 320), oklch(0.18 0.16 320) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.5 0.18 200), oklch(0.16 0.12 220) 60%, oklch(0.04 0 0))",
];

// Asymmetric bento layout on lg+: 1 hero (8/12) + 1 tall (4/12) + 4 medium (6/12 each)
const CARD_SPANS = [
  "lg:col-span-8",
  "lg:col-span-4",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-6",
];

const CARD_HEIGHTS = [
  "min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]", // hero
  "min-h-[360px] sm:min-h-[420px] lg:min-h-[560px]", // tall side
  "min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]",
  "min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]",
  "min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]",
  "min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]",
];

function CaseCard({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const headline = (project.shortName ?? project.name).toUpperCase();
  const isHero = index === 0;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`group relative isolate flex flex-col overflow-hidden border border-border bg-card transition-colors duration-300 hover:border-brand ${className}`}
    >
      {/* Background: banner or gradient fallback */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: fallbackGradients[index % fallbackGradients.length] }}
      />
      {project.bannerUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.bannerUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      {/* Universal flat tint so text always reads against any banner */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30"
      />
      {/* Vertical gradient — heavier at top + bottom where text sits */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0_0_0/0.55)_0%,oklch(0_0_0/0.25)_40%,oklch(0_0_0/0.65)_70%,oklch(0_0_0/0.95)_100%)]"
      />

      {/* Top strip: app icon + store badge ▸ on left, serial + arrow ▸ on right */}
      <div className="relative z-10 flex items-start justify-between gap-3 p-5 md:p-6">
        <div className="flex items-center gap-2.5">
          {project.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logoUrl}
              alt={`${project.name} logo`}
              width={48}
              height={48}
              className="h-10 w-10 shrink-0 rounded-[6px] border border-white/20 bg-white/10 object-cover backdrop-blur-sm md:h-12 md:w-12"
              loading="lazy"
            />
          )}
          <div className="flex flex-col gap-1">
            {project.appStore && (
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white sm:text-[10px]">
                <SiShopify className="h-3 w-3 shrink-0 text-brand" />
                Shopify App Store
                {project.rating && (
                  <>
                    <span className="mx-0.5 hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
                    <Star className="h-3 w-3 shrink-0 fill-current text-brand" />
                    {project.rating}
                  </>
                )}
              </span>
            )}
            {project.playStore && (
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white sm:text-[10px]">
                <SiGoogleplay className="h-3 w-3 shrink-0 text-brand" />
                Google Play
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 sm:text-[11px]">
            {String(index + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
          </span>
          <span className="flex h-9 w-9 items-center justify-center border border-white/25 bg-white/5 text-white backdrop-blur-sm transition-all group-hover:border-brand group-hover:bg-brand">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* Spacer to push content to bottom */}
      <div className="relative z-10 flex-1" />

      {/* Bottom: project name + meta + tagline */}
      <div className="relative z-10 p-5 md:p-6 lg:p-7">
        <h3
          className={`display-massive break-words text-white ${
            isHero
              ? "text-[clamp(2.5rem,7vw,6rem)]"
              : "text-[clamp(2rem,4.5vw,4rem)]"
          }`}
        >
          {headline}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/70 sm:text-[10px]">
          <span>{CATEGORY_LABELS[project.category]}</span>
          <span className="text-white/30">·</span>
          <span>
            {project.client} · {project.year}
          </span>
        </div>
        {(project.tagline || project.description) && (
          <p className={`mt-3 max-w-xl text-sm leading-relaxed text-white/80 ${isHero ? "md:text-base" : ""}`}>
            {project.tagline ?? project.description}
          </p>
        )}
      </div>
    </a>
  );
}

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative border-y border-border py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        {/* Header */}
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8 md:mb-14">
          <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-brand">[01]</span>
            <span>Selected Work</span>
            <span className="text-brand">[{String(FEATURED.length).padStart(2, "0")}]</span>
          </div>
          <h2 className="display-massive break-words text-[clamp(2.25rem,8vw,7rem)]">
            Selected <br />
            <span className="font-serif italic font-normal text-brand">work</span>.
          </h2>
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {FEATURED.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.06}
              className={`${CARD_SPANS[i] ?? "lg:col-span-6"} ${CARD_HEIGHTS[i] ?? "min-h-[400px]"} flex`}
            >
              <CaseCard project={p} index={i} className="flex-1" />
            </Reveal>
          ))}
        </div>

        {/* Footer CTA */}
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:mt-14">
          <span>More live work in Portfolio below</span>
          <a href="#projects" className="text-foreground hover:text-brand">
            See all projects →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
