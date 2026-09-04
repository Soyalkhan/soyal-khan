"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/github-data";

const LINKS = [
  { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { Icon: GithubIcon, label: "GitHub", value: profile.username, href: profile.url },
  { Icon: LinkedinIcon, label: "LinkedIn", value: profile.linkedin, href: profile.linkedinUrl },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border">
      <div className="shell py-20 md:py-24">
        <Reveal className="text-center">
          <span className="eyebrow text-muted-foreground">05 — Contact</span>
          <h2 className="display-xl mx-auto mt-4 max-w-[16ch] text-balance text-[clamp(2.5rem,6.5vw,4.5rem)]">
            Have a project? <span className="hl italic">Let&apos;s talk</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Open to freelance work, retainers and full-time roles. Email is the
            fastest way through — I reply within a day.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-slate px-7 py-4 text-sm font-medium text-background transition-colors hover:bg-slate-deep"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {LINKS.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 bg-card px-5 py-5 transition-colors hover:bg-muted"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-slate" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">{label}</span>
                  <span className="block truncate text-sm font-medium text-foreground">
                    {value}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          ))}
        </Reveal>
      </div>

      <footer className="border-t border-border">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <span className="font-display text-base text-foreground">Soyal Khan</span>
          <span>
            © {new Date().getFullYear()} · {profile.location}
          </span>
        </div>
      </footer>
    </section>
  );
}
