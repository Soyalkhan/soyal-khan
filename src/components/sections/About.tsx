"use client";

import { BadgeCheck, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  certifications,
  education,
  experience,
  profile,
  skills,
  type Experience,
} from "@/lib/github-data";

/* The eight labelled skill groups (40+ chips) were the noisiest block on the
   old page. Three per group keeps the signal and drops the wall. */
const STACK = skills.flatMap((g) => g.items.slice(0, 3));

/* 24 chips wrap to seven rows on a phone. Two scrolling rows say the same thing
   in a fraction of the height. */
function StackMarquee({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div className="space-y-1.5" aria-hidden>
      {rows.map((row, i) => (
        <div key={i} className="marquee-mask">
          <div
            className={`marquee-row ${i % 2 ? "marquee-row--reverse" : ""}`}
            style={{ ["--marquee-duration" as string]: i % 2 ? "34s" : "28s" }}
          >
            {[...row, ...row].map((t, j) => (
              <span
                key={`${t}-${j}`}
                className="shrink-0 whitespace-nowrap rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-on-slate-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Role({ job, last }: { job: Experience; last: boolean }) {
  return (
    <li className="relative pb-9 pl-8 last:pb-0">
      {/* rail — stops at the last dot instead of trailing off the end */}
      {!last && (
        <span
          aria-hidden
          className="absolute left-[5px] top-3 h-full w-px bg-white/15"
        />
      )}
      {/* dot */}
      <span
        aria-hidden
        className={`absolute left-0 top-[5px] grid h-[11px] w-[11px] place-items-center rounded-full border ${
          job.current ? "border-brand" : "border-white/30"
        }`}
      >
        <span
          className={`h-[3px] w-[3px] rounded-full ${
            job.current ? "bg-brand" : "bg-white/40"
          }`}
        />
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-xs tabular-nums text-on-slate-muted">{job.period}</span>
        {job.current && (
          <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-deep">
            Now
          </span>
        )}
      </div>

      <h3 className="mt-1.5 font-display text-xl leading-tight text-on-slate">
        {job.role}
      </h3>
      <p className="mt-0.5 text-sm text-brand">{job.company}</p>

      <ul className="mt-3 space-y-1.5">
        {job.points.map((pt) => (
          <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-on-slate-muted">
            <span aria-hidden className="mt-[9px] h-px w-2.5 shrink-0 bg-brand" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {job.stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-on-slate-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </li>
  );
}

function CredCard({
  Icon,
  period,
  title,
  titleAttr,
  subtitle,
  accentSubtitle,
  pill,
  detail,
}: {
  Icon: typeof GraduationCap;
  period: string;
  title: string;
  titleAttr?: string;
  subtitle: string;
  accentSubtitle?: boolean;
  pill?: string;
  detail?: string;
}) {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/25 text-brand">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <span className="whitespace-nowrap text-xs tabular-nums text-on-slate-muted">
          {period}
        </span>
        {pill && (
          <span className="ml-auto shrink-0 whitespace-nowrap rounded-full bg-brand/20 px-2.5 py-0.5 text-[11px] font-medium text-brand">
            {pill}
          </span>
        )}
      </div>

      <h3
        className="mt-4 font-display text-lg leading-snug text-on-slate"
        title={titleAttr}
      >
        {title}
      </h3>
      <p
        className={`mt-1 text-sm ${accentSubtitle ? "text-brand" : "text-on-slate-muted"}`}
      >
        {subtitle}
      </p>

      {detail && (
        <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-on-slate-muted/75">
          {detail}
        </p>
      )}
    </li>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-slate py-20 md:py-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow text-on-slate-muted">04 — About</span>
            <h2 className="display-xl mt-3 text-[clamp(2.25rem,5.5vw,3.75rem)] text-on-slate">
              Engineer first,
              <br />
              <span className="italic text-brand">commerce</span> obsessed.
            </h2>

            <div className="mt-6 max-w-md space-y-4 text-base leading-relaxed text-on-slate-muted">
              <p>
                I&apos;m {profile.name}, a full-stack engineer in {profile.location},
                currently building at {profile.company}.
              </p>
              <p>
                React, Node and the Shopify platform end to end — published apps,
                headless storefronts, and the custom backends that sit behind them.
              </p>
            </div>

            <div className="mt-8 md:hidden">
              <StackMarquee items={STACK} />
              {/* the marquee is decorative; keep the list readable to screen readers */}
              <span className="sr-only">Stack: {STACK.join(", ")}</span>
            </div>

            <div className="mt-8 hidden flex-wrap gap-1.5 md:flex">
              {STACK.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-on-slate-muted"
                >
                  {t}
                </span>
              ))}
            </div>

          </Reveal>

          <Reveal className="lg:col-span-7">
            <span className="eyebrow text-on-slate-muted">Experience</span>
            <ol className="mt-6">
              {experience.map((job, i) => (
                <Role
                  key={`${job.company}-${job.period}`}
                  job={job}
                  last={i === experience.length - 1}
                />
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mt-16 grid gap-12 border-t border-white/10 pt-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow text-on-slate-muted">Education</span>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {education.map((e) => (
                <CredCard
                  key={e.short}
                  Icon={GraduationCap}
                  period={e.period}
                  title={e.short}
                  titleAttr={e.institution}
                  subtitle={e.qualification}
                  pill={e.grade && `Grade ${e.grade}`}
                  detail={e.focus?.join(" · ")}
                />
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow text-on-slate-muted">Certifications</span>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {certifications.map((c) => (
                <CredCard
                  key={c.credentialId}
                  Icon={BadgeCheck}
                  period={c.issued}
                  title={c.name}
                  subtitle={c.issuer}
                  accentSubtitle
                  detail={`Credential ID ${c.credentialId}`}
                />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
