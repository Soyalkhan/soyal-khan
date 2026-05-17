"use client";

import { Reveal } from "@/components/Reveal";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/github-data";
import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  const contactLinks = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: GithubIcon, label: `github.com/${profile.username}`, href: profile.url },
    { icon: LinkedinIcon, label: `linkedin.com/in/${profile.linkedin}`, href: profile.linkedinUrl },
  ];

  return (
    <section id="contact" className="relative border-t border-border">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-32">
        <Reveal className="mb-12 flex items-baseline gap-3 border-b border-border pb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-brand">[07]</span>
          <span>Contact — Index</span>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display-massive break-words text-[clamp(2.5rem,12vw,12rem)]">
              Have a <br />
              <span className="text-brand">project</span>? <br />
              Let&apos;s talk.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Open to freelance, full-time and interesting collaborations.
              The fastest reach is email or GitHub.
            </p>

            <div className="mt-10 flex flex-col gap-px border border-border">
              {contactLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between bg-background px-5 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
                    <Icon className="h-3.5 w-3.5 text-brand" />
                    {label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
              }}
              className="border border-border"
            >
              <div className="border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Send a message
              </div>
              <div className="space-y-5 p-5">
                {[
                  { label: "Name", type: "text", placeholder: "Your name" },
                  { label: "Email", type: "email", placeholder: "you@company.com" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {f.label}
                    </label>
                    <input
                      required
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition-colors focus:border-brand"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project…"
                    className="w-full resize-none border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition-colors focus:border-brand"
                  />
                </div>
                <button
                  type="submit"
                  className="group mt-2 flex w-full items-center justify-between border border-foreground bg-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-background transition-all hover:bg-brand hover:border-brand hover:text-foreground"
                >
                  {sent ? "Message sent ✓" : "Submit message"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-border overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 pt-16 md:px-8">
          <div className="display-massive break-words text-[clamp(4rem,22vw,22rem)] leading-[0.78] text-foreground">
            SOYAL
            <br />
            <span className="text-brand">KHAN.</span>
          </div>
        </div>
        <footer className="mx-auto mt-10 flex max-w-[1600px] flex-col items-start justify-between gap-3 border-t border-border px-5 py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-center md:px-8">
          <div>
            © {new Date().getFullYear()} {profile.name} — All rights reserved
          </div>
          <div className="flex gap-6">
            <span>{profile.location}</span>
            <span>v2.0 / Major Edition</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
