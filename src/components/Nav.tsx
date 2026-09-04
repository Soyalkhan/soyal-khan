"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/lib/github-data";

/* In-page anchors only work on "/" — prefix them so they resolve from /notes too. */
const LINKS = [
  { href: "/#apps", label: "Apps" },
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/notes", label: "Notes" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          <Link href="/" className="flex items-center gap-2.5 pl-1">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand font-display text-sm font-semibold text-slate-deep">
              S
            </span>
            <span className="hidden text-sm font-medium text-foreground sm:inline">
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
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="mt-2 rounded-2xl border border-border bg-card p-2 card-soft md:hidden">
            {[...LINKS, { href: "/#contact", label: "Contact" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-body transition-colors hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="block rounded-xl px-4 py-3 text-sm text-muted-foreground"
            >
              {profile.email}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
