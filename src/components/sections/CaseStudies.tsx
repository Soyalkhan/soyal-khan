"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies, CATEGORY_LABELS } from "@/lib/github-data";
import { ArrowUpRight, Star } from "lucide-react";
import { SiShopify, SiGoogleplay } from "react-icons/si";

const FEATURED = caseStudies;

const gradients = [
  "linear-gradient(135deg, oklch(0.45 0.25 25), oklch(0.2 0.18 30) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.5 0.28 264), oklch(0.18 0.18 264) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.55 0.2 145), oklch(0.18 0.12 160) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.6 0.22 60), oklch(0.2 0.14 50) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.55 0.22 320), oklch(0.18 0.16 320) 60%, oklch(0.04 0 0))",
  "linear-gradient(135deg, oklch(0.5 0.18 200), oklch(0.16 0.12 220) 60%, oklch(0.04 0 0))",
];

export function CaseStudies() {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const DURATION = 5500;

  useEffect(() => {
    startRef.current = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - startRef.current) / DURATION);
      setProgress(p);
      if (p >= 1) {
        setIdx((i) => (i + 1) % FEATURED.length);
        startRef.current = performance.now();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const goto = (i: number) => {
    setIdx(i);
    startRef.current = performance.now();
    setProgress(0);
  };

  const project = FEATURED[idx];
  const headline = (project.shortName ?? project.name).toUpperCase();

  return (
    <section
      id="case-studies"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden border-y border-border"
    >
      {FEATURED.map((p, i) => (
        <div
          key={p.name}
          aria-hidden
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            background: gradients[i % gradients.length],
            opacity: i === idx ? 1 : 0,
          }}
        />
      ))}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0_0_0/0.55)_70%,oklch(0_0_0/0.85)_100%)]"
      />

      <div className="absolute inset-x-0 top-6 z-10 hidden border-b border-white/10 md:block">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
          <span>Case Studies / Showreel</span>
          <span>
            {String(idx + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
          </span>
          <span>Index — Featured</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-28 pt-24 sm:px-5 md:px-8 md:pb-40 md:pt-32">
        {/* App logo + store badge — keyed by name so it animates on slide change */}
        <div
          key={`logo-${project.name}`}
          className="mb-5 flex items-center gap-3 animate-[heroIn_700ms_cubic-bezier(0.2,0.8,0.2,1)_both] sm:gap-4 md:mb-6"
        >
          {project.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logoUrl}
              alt={`${project.name} logo`}
              width={72}
              height={72}
              className="h-12 w-12 shrink-0 rounded-[6px] border border-white/15 bg-white/5 object-cover backdrop-blur-sm sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]"
              loading="eager"
            />
          )}
          <div className="flex min-w-0 flex-col gap-1 sm:gap-1.5">
            {project.appStore && (
              <span className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white sm:text-[10px]">
                <SiShopify className="h-3 w-3 shrink-0 text-brand sm:h-3.5 sm:w-3.5" />
                Shopify App Store
                {project.rating && (
                  <>
                    <span className="mx-1 hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
                    <Star className="h-3 w-3 shrink-0 fill-current text-brand" />
                    {project.rating}
                  </>
                )}
              </span>
            )}
            {project.playStore && (
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white sm:text-[10px]">
                <SiGoogleplay className="h-3 w-3 shrink-0 text-brand sm:h-3.5 sm:w-3.5" />
                Google Play
              </span>
            )}
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/70 sm:text-[10px]">
              <span>{CATEGORY_LABELS[project.category]}</span>
              <span className="hidden text-white/30 sm:inline">/</span>
              <span>
                {project.client} · {project.year}
              </span>
              <span className="hidden text-white/30 md:inline">/</span>
              <span className="hidden md:inline">{project.stack.slice(0, 3).join(" · ")}</span>
            </span>
          </div>
        </div>

        <div key={`name-${project.name}`} className="overflow-hidden">
          <h2 className="display-massive animate-[heroIn_900ms_cubic-bezier(0.2,0.8,0.2,1)_both] break-words text-[clamp(2.25rem,11vw,14rem)] text-white">
            {headline}
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-md text-sm leading-relaxed text-white/80 md:text-base">
            {project.tagline ?? project.description}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 border border-white/30 bg-white/5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white hover:text-black"
          >
            Visit Live
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            {FEATURED.map((p, i) => (
              <button
                key={p.name}
                onClick={() => goto(i)}
                className="group relative flex-1"
                aria-label={p.name}
              >
                <div className="h-[2px] w-full bg-white/15">
                  <div
                    className="h-full bg-brand"
                    style={{
                      width: i < idx ? "100%" : i === idx ? `${progress * 100}%` : "0%",
                      transition: i === idx ? "width 100ms linear" : "none",
                    }}
                  />
                </div>
                <div className="mt-2 hidden items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] md:flex">
                  <span
                    className={
                      i === idx
                        ? "text-white"
                        : "text-white/40 group-hover:text-white/70"
                    }
                  >
                    {String(i + 1).padStart(2, "0")} — {p.shortName ?? p.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes heroIn { 0% { transform: translateY(110%); opacity: 0;} 100% { transform: translateY(0); opacity: 1;} }`}</style>
    </section>
  );
}
