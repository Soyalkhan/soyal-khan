"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, Check, Download, Star } from "lucide-react";
import { SiShopify, SiGoogleplay, SiReact, SiNextdotjs, SiRemix, SiNodedotjs, SiMongodb, SiTypescript } from "react-icons/si";
import { gsap } from "gsap";
import { profile, stats } from "@/lib/github-data";

const ROLES = [
  "Full-Stack Engineer",
  "Shopify App Developer",
  "Headless Commerce Specialist",
];

const PROOF = [
  { v: stats.storesShipped, k: "Storefronts shipped" },
  { v: stats.publishedApps, k: "Apps published" },
  { v: stats.themesBuilt, k: "Custom themes" },
  { v: stats.yearsExperience, k: "Years shipping" },
];

const STACK = [SiShopify, SiReact, SiNextdotjs, SiRemix, SiNodedotjs, SiMongodb, SiTypescript];

/** Downloads the CV while counting the button from 00% to 100%.
 *  The PDF is small enough to arrive almost instantly, so a raw
 *  content-length readout would flash straight to 100 — the count is driven by
 *  a ~1.1s ramp that holds at 95 until the bytes actually land. */
function useCvDownload(src: string, filename: string) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const raf = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const start = useCallback(() => {
    if (phase !== "idle") return;

    const save = (href: string, revoke?: () => void) => {
      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      revoke?.();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      save(src);
      return;
    }

    setPhase("loading");
    setPct(0);

    const blob = fetch(src)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
      .catch(() => null);

    const DURATION = 1100;
    const startedAt = performance.now();
    let settled = false;

    const finish = (url: string | null) => {
      if (settled) return;
      settled = true;
      cancelAnimationFrame(raf.current);
      setPct(100);
      setPhase("done");
      timers.current.push(
        window.setTimeout(() => {
          if (url) save(url, () => URL.revokeObjectURL(url));
          else save(src);
        }, 260),
      );
      timers.current.push(
        window.setTimeout(() => {
          setPhase("idle");
          setPct(0);
        }, 1600),
      );
    };

    const tick = (now: number) => {
      // ease-out to 95, then wait for the network
      const t = Math.min(1, (now - startedAt) / DURATION);
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 95));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    Promise.all([
      blob,
      new Promise((r) => timers.current.push(window.setTimeout(r, DURATION))),
    ]).then(([b]) => finish(b ? URL.createObjectURL(b) : null));
  }, [filename, phase, src]);

  return { pct, phase, start };
}

export function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const cv = useCvDownload("/Soyal_CV.pdf", "Soyal_Khan_CV.pdf");

  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idx = 0;
    const id = window.setInterval(() => {
      idx = (idx + 1) % ROLES.length;
      const tl = gsap.timeline({ defaults: { force3D: true } });
      tl.to(el, { yPercent: -110, opacity: 0, duration: 0.32, ease: "power3.in" });
      tl.set(el, { yPercent: 110, textContent: ROLES[idx] });
      tl.to(el, { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
      {/* Soft lime wash, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #c0eb6a 0%, transparent 68%)" }}
      />

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-deep blink" />
              <span className="text-xs font-medium text-muted-foreground">
                Available · {profile.location}
              </span>
            </div>

            <h1 className="display-xl mt-6 text-[clamp(2.75rem,7.5vw,5.25rem)]">
              I build commerce
              <br />
              that <span className="hl italic">actually ships</span>.
            </h1>

            <div className="mt-5 h-6 overflow-hidden">
              <span
                ref={roleRef}
                className="block text-base text-body will-change-transform md:text-lg"
              >
                {ROLES[0]}
              </span>
            </div>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Shopify apps, headless Hydrogen storefronts and full-stack products —
              designed, built and launched end to end.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#apps"
                className="group inline-flex items-center gap-2 rounded-full bg-slate px-6 py-3.5 text-sm font-medium text-background transition-colors hover:bg-slate-deep"
              >
                See the work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <button
                type="button"
                onClick={cv.start}
                disabled={cv.phase !== "idle"}
                aria-live="polite"
                className="group relative inline-flex min-w-[13rem] items-center justify-center gap-2 overflow-hidden rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-slate disabled:cursor-default"
              >
                {/* lime fill tracks the count */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 bg-brand transition-[width] duration-150 ease-linear"
                  style={{ width: cv.phase === "idle" ? "0%" : `${cv.pct}%` }}
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {cv.phase === "done" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {cv.phase === "idle" && "Download CV"}
                  {cv.phase === "loading" && (
                    <>
                      Downloading
                      <span className="tabular-nums">
                        {String(cv.pct).padStart(2, "0")}%
                      </span>
                    </>
                  )}
                  {cv.phase === "done" && "Saved — 100%"}
                </span>
              </button>
            </div>

            {/* Quiet stack row — replaces the old floating icon constellation */}
            <div className="mt-8 flex items-center gap-4 opacity-55">
              {STACK.map((Icon, i) => (
                <Icon key={i} className="h-[18px] w-[18px] text-slate" />
              ))}
            </div>
          </div>

          {/* ── Portrait + live proof badges ─────────────────────── */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[400px]">
              <div className="relative overflow-hidden rounded-[28px] bg-brand card-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/my/mine.png"
                  alt="Soyal Khan"
                  width={520}
                  height={560}
                  className="h-[340px] w-full select-none object-cover object-top sm:h-[420px]"
                  draggable={false}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = profile.avatar;
                  }}
                />
              </div>

              <div className="absolute -left-3 top-8 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 card-soft sm:-left-6">
                <SiShopify className="h-4 w-4 text-slate" />
                <span className="text-xs font-medium text-foreground">App Store</span>
                <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-current text-brand-deep" />
                  {stats.appRating}
                </span>
              </div>

              <div className="absolute -right-3 bottom-10 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 card-soft sm:-right-6">
                <SiGoogleplay className="h-4 w-4 text-slate" />
                <span className="text-xs font-medium text-foreground">Live on Play Store</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Proof band ──────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-16 md:grid-cols-4">
          {PROOF.map((s) => (
            <div key={s.k} className="bg-card px-5 py-6">
              <div className="font-display text-3xl text-foreground md:text-4xl">{s.v}</div>
              <div className="mt-1.5 text-xs text-muted-foreground">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
