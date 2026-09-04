"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { SiShopify, SiGoogleplay } from "react-icons/si";
import { Reveal } from "@/components/Reveal";
import { APP_CATEGORIES } from "@/components/sections/Apps";
import {
  projects,
  caseStudies,
  CATEGORY_LABELS,
  type Project,
  type ProjectCategory,
} from "@/lib/github-data";

/* Published apps live in their own section — this one is client work. */
const BUILDS = projects.filter((p) => !APP_CATEGORIES.has(p.category));

/* Short filter labels — the long CATEGORY_LABELS stay on the cards. */
const FILTERS: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "headless", label: "Headless" },
  { key: "theme", label: "Themes" },
  { key: "custom-dev", label: "Full-Stack" },
];

const FEATURED = caseStudies.slice(0, 2);
const FEATURED_NAMES = new Set(FEATURED.map((p) => p.name));

/* Projects without a banner get a quiet slate nameplate, not an empty colour
   block — the palette stays calm and the card still reads as a real build. */
const TILES = [
  "linear-gradient(150deg, #485550 0%, #2f3a35 100%)",
  "linear-gradient(150deg, #3a4541 0%, #262f2b 100%)",
  "linear-gradient(150deg, #52605a 0%, #333d39 100%)",
];

/** Live domain — the strongest proof a build actually shipped. */
function host(url: string) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    if (h === "apps.shopify.com" || h === "play.google.com") return null;
    if (h.endsWith(".myshopify.dev") || h.endsWith(".vercel.app")) return null;
    return h;
  } catch {
    return null;
  }
}

function StoreBadge({ project }: { project: Project }) {
  if (!project.appStore && !project.playStore) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
      {project.appStore ? (
        <SiShopify className="h-3 w-3 text-slate" />
      ) : (
        <SiGoogleplay className="h-3 w-3 text-slate" />
      )}
      {project.appStore ? "App Store" : "Play Store"}
      {project.rating && (
        <>
          <Star className="h-2.5 w-2.5 fill-current text-brand-deep" />
          {project.rating}
        </>
      )}
    </span>
  );
}

function Thumb({ project, index, tall }: { project: Project; index: number; tall?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden ${tall ? "aspect-[16/9]" : "aspect-[16/10]"}`}
      style={{ background: TILES[index % TILES.length] }}
    >
      {project.bannerUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.bannerUrl}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <span className="mb-3 h-px w-10 bg-brand" />
          <span className="font-display text-xl leading-snug text-on-slate">
            {project.stack.slice(0, 3).join(" · ")}
          </span>
          <span className="mt-1.5 text-[11px] text-on-slate-muted">{project.client}</span>
        </div>
      )}

      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        <StoreBadge project={project} />
      </div>

      {project.logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.logoUrl}
          alt=""
          aria-hidden
          width={44}
          height={44}
          loading="lazy"
          className="absolute bottom-3 right-3 h-10 w-10 rounded-xl border border-white/40 bg-card object-cover shadow-sm"
        />
      )}
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card card-soft card-lift"
    >
      <Thumb project={project} index={index} tall />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl text-foreground md:text-3xl">
            {project.shortName ?? project.name}
          </h3>
          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors group-hover:border-transparent group-hover:bg-brand">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.tagline ?? project.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2.5 py-1 font-medium text-body">
            {CATEGORY_LABELS[project.category]}
          </span>
          <span>·</span>
          <span>{project.year}</span>
          {host(project.url) && (
            <>
              <span>·</span>
              <span className="text-body">{host(project.url)}</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}

function GridCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card card-lift"
    >
      <Thumb project={project} index={index} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-foreground">
            {project.shortName ?? project.name}
          </h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.tagline ?? project.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-body">
            {CATEGORY_LABELS[project.category]}
          </span>
          <span className="truncate">{host(project.url) ?? project.year}</span>
        </div>
      </div>
    </a>
  );
}

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const grid = useMemo(
    () =>
      BUILDS.filter(
        (p) => (filter === "all" ? !FEATURED_NAMES.has(p.name) : p.category === filter),
      ),
    [filter],
  );

  const counts = useMemo(() => {
    const m = new Map<string, number>([["all", BUILDS.length]]);
    for (const p of BUILDS) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, []);

  return (
    <section id="work" className="scroll-mt-24 border-t border-border py-20 md:py-24">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-muted-foreground">02 — Client work</span>
            <h2 className="display-xl mt-3 text-[clamp(2.25rem,5.5vw,3.75rem)]">
              Shipped, live, <span className="hl italic">in production</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {BUILDS.length} storefronts and platforms — every one of them public. Click
            straight through to the live site.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-transparent bg-slate text-background"
                    : "border-border bg-card text-muted-foreground hover:border-slate hover:text-foreground"
                }`}
              >
                {f.label}
                <span className={active ? "text-brand" : "text-muted-foreground/70"}>
                  {counts.get(f.key) ?? 0}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* Featured pair — only on the unfiltered view */}
        {filter === "all" && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {FEATURED.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06} className="h-full">
                <FeaturedCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i, 5) * 0.04} className="h-full">
              <GridCard project={p} index={i + 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
