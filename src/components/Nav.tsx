"use client";

import { useEffect, useState } from "react";
import { projects, caseStudies } from "@/lib/github-data";

const links = [
  { href: "#case-studies", label: "Case Studies", count: caseStudies.length },
  { href: "#projects", label: "Portfolio", count: projects.length },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] satisfies ReadonlyArray<{ href: string; label: string; count?: number }>;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const updateTime = () => {
      const d = new Date();
      const t = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(d);
      setTime(`${t} IST`);
    };
    updateTime();
    const id = setInterval(updateTime, 1000 * 30);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center bg-brand font-display text-xs leading-none text-foreground">
            S
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-foreground sm:inline">
            Soyal Khan<span className="text-muted-foreground">/Dev</span>
          </span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>{l.label}</span>
                  {l.count !== undefined && (
                    <span className="text-brand">[{String(l.count).padStart(2, "0")}]</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="hidden sm:inline">{time}</span>
          <a
            href="https://github.com/Soyalkhan"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-foreground transition-colors hover:text-brand"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 blink" />
            Available
          </a>
        </div>
      </div>
    </header>
  );
}
