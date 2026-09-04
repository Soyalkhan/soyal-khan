"use client";

import { ArrowUpRight, Check, Star } from "lucide-react";
import { SiShopify, SiGoogleplay } from "react-icons/si";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/lib/github-data";

/* Published apps get their own section — a live store listing is the hardest
   proof on the page, and it was buried in the general project grid. */
export const APP_CATEGORIES = new Set(["shopify-app", "mobile-app"]);

const SHOPIFY_APPS = projects.filter((p) => p.category === "shopify-app");
const MOBILE_APPS = projects.filter((p) => p.category === "mobile-app");

function AppCard({ project }: { project: Project }) {
  const store = project.appStore ? "Shopify App Store" : "Google Play";
  const StoreIcon = project.appStore ? SiShopify : SiGoogleplay;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card card-lift"
    >
      {project.bannerUrl && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.bannerUrl}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-4">
          {project.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logoUrl}
              alt={`${project.name} icon`}
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-2xl border border-border object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl leading-tight text-foreground">
              {project.shortName ?? project.name}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <StoreIcon className="h-3 w-3 text-slate" />
                {store}
              </span>
              {project.rating ? (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-brand-deep" />
                  {project.rating}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-brand-deep" />
                  Live
                </span>
              )}
              <span>· {project.year}</span>
            </div>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors group-hover:border-transparent group-hover:bg-brand">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {project.tagline ?? project.description}
        </p>

        {project.highlights && (
          <ul className="mt-5 grid gap-1.5 pt-1 sm:grid-cols-2">
            {project.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex items-center gap-1.5 text-xs text-body">
                <Check className="h-3 w-3 shrink-0 text-brand-deep" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}

export function Apps() {
  return (
    <section id="apps" className="scroll-mt-24 border-t border-border py-20 md:py-24">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-muted-foreground">01 — Published apps</span>
            <h2 className="display-xl mt-3 text-[clamp(2.25rem,5.5vw,3.75rem)]">
              On the <span className="hl italic">app stores</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SHOPIFY_APPS.length} apps live on the Shopify App Store and{" "}
            {MOBILE_APPS.length} on Google Play — installable today, reviewed by Shopify.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {SHOPIFY_APPS.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i, 4) * 0.05} className="h-full">
              <AppCard project={p} />
            </Reveal>
          ))}
        </div>

        {MOBILE_APPS.length > 0 && (
          <>
            <Reveal className="mt-12 flex items-center gap-4">
              <span className="eyebrow text-muted-foreground">Also on Google Play</span>
              <span className="h-px flex-1 bg-border" />
            </Reveal>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {MOBILE_APPS.map((p) => (
                <Reveal key={p.name} className="h-full">
                  <AppCard project={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
