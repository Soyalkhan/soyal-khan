"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { SiShopify, SiGoogleplay } from "react-icons/si";
import { Reveal } from "@/components/Reveal";
import { APP_CATEGORIES } from "@/components/sections/Apps";
import {
  projects,
  moreThemes,
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
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

function MoreCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-slate p-6">
      <div>
        <span className="font-display text-4xl text-brand">{moreThemes.count}</span>
        <h3 className="mt-2 font-display text-xl text-on-slate">
          {moreThemes.headline}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-on-slate-muted">
          {moreThemes.blurb}
        </p>
      </div>

      {moreThemes.links.length > 0 ? (
        <ul className="mt-5 space-y-1.5">
          {moreThemes.links.map((l) => (
            <li key={l.url}>
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-brand"
              >
                {l.name}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <a
          href="#contact"
          className="group mt-6 inline-flex items-center gap-2 self-start rounded-full bg-brand px-5 py-3 text-sm font-medium text-slate-deep transition-colors hover:bg-brand-deep"
        >
          See more work
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}

/** Scroll-snap rail. No carousel library — a real scroll container keeps
 *  swipe, keyboard and screen-reader behaviour working for free. */
function Carousel({ items, more }: { items: Project[]; more: boolean }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items, more, sync]);

  const page = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        onScroll={sync}
        tabIndex={0}
        role="region"
        aria-label="Projects"
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {items.map((p, i) => (
          <div
            key={p.name}
            className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
          >
            <ProjectCard project={p} index={i} />
          </div>
        ))}

        {more && (
          <div className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
            <MoreCard />
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          Swipe or drag to browse · {items.length}{" "}
          {items.length === 1 ? "project" : "projects"}
          {more && ` + ${moreThemes.count} more themes`}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={edges.start}
            aria-label="Previous projects"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-slate disabled:opacity-35 disabled:hover:border-border"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={edges.end}
            aria-label="More projects"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-slate disabled:opacity-35 disabled:hover:border-border"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const shown = useMemo(
    () => (filter === "all" ? BUILDS : BUILDS.filter((p) => p.category === filter)),
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

        <Reveal className="no-scrollbar mt-8 flex snap-x gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`inline-flex shrink-0 snap-start items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
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

        <div className="mt-8">
          <Carousel items={shown} more={filter === "all" || filter === "theme"} />
        </div>
      </div>
    </section>
  );
}
