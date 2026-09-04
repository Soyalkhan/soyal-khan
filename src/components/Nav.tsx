"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  LayoutGrid,
  Mail,
  Menu,
  PenLine,
  User,
  Wrench,
  X,
} from "lucide-react";
import { profile } from "@/lib/github-data";

/* In-page anchors only work on "/" — prefix them so they resolve from /notes too.
   Icons are used by the mobile sheet only; the desktop bar stays text. */
const LINKS = [
  { href: "/#apps", label: "Apps", Icon: LayoutGrid },
  { href: "/#work", label: "Work", Icon: Briefcase },
  { href: "/#services", label: "Services", Icon: Wrench },
  { href: "/#about", label: "About", Icon: User },
  { href: "/notes", label: "Notes", Icon: PenLine },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Kept mounted through the close animation so it can animate out, not vanish.
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setMounted(true);
    setOpen(true);
  };

  // Unmount only once the close animation has run.
  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => setMounted(false), 170);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
      <div className="shell">
        <div
          className={`flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300 md:px-4 ${
            scrolled
              ? "border border-border bg-card/85 backdrop-blur-xl card-soft"
              : "border border-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5 pl-1">
            {/* Same mark as the favicon — lime tile, dark monogram. */}
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand font-display text-[13px] font-semibold leading-none tracking-tight text-slate-deep transition-colors group-hover:bg-brand-deep">
              SK
            </span>
            <span className="hidden font-display text-[15px] leading-none text-foreground decoration-brand decoration-2 underline-offset-4 group-hover:underline sm:inline">
              Soyal Khan
            </span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 pr-1 text-xs text-muted-foreground lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-deep blink" />
              Available
            </span>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-slate px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-slate-deep"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground md:hidden"
            >
              <span className="relative grid h-4 w-4 place-items-center">
                <Menu
                  className={`absolute h-4 w-4 transition-all duration-200 ${
                    open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <X
                  className={`absolute h-4 w-4 transition-all duration-200 ${
                    open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {mounted && (
          <nav
            className={`mt-2 origin-top overflow-hidden rounded-2xl border border-border bg-card card-soft md:hidden ${
              open ? "menu-panel-in" : "menu-panel-out"
            }`}
          >
            <ul className="divide-y divide-border">
              {[...LINKS, { href: "/#contact", label: "Contact", Icon: Mail }].map(
                ({ href, label, Icon }, i) => (
                  <li
                    key={href}
                    className="menu-row"
                    style={{ animationDelay: `${60 + i * 35}ms` }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 transition-colors active:bg-muted"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/30 text-slate-deep">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground">
                        {label}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="menu-row flex items-center gap-3 border-t border-border bg-muted/60 px-4 py-3"
              style={{ animationDelay: `${60 + LINKS.length * 35 + 35}ms` }}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate text-brand">
                <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-body">
                {profile.email}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
