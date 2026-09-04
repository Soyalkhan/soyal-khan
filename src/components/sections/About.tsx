"use client";

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

            <div className="mt-8 flex flex-wrap gap-1.5">
              {STACK.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-on-slate-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-7">
              <span className="eyebrow text-on-slate-muted">Education</span>
              <ul className="mt-4 space-y-5">
                {education.map((e) => (
                  <li key={e.short}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-display text-base text-on-slate">{e.short}</h3>
                      <span className="text-xs tabular-nums text-on-slate-muted">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-on-slate-muted">
                      {e.qualification}
                      {e.grade && (
                        <span className="text-brand"> · Grade {e.grade}</span>
                      )}
                    </p>
                    {e.focus && (
                      <p className="mt-1.5 text-xs leading-relaxed text-on-slate-muted/80">
                        {e.focus.join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-white/10 pt-7">
              <span className="eyebrow text-on-slate-muted">Certifications</span>
              <ul className="mt-4 space-y-4">
                {certifications.map((c) => {
                  const body = (
                    <>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <h3 className="font-display text-base text-on-slate">{c.name}</h3>
                        <span className="text-xs tabular-nums text-on-slate-muted">
                          {c.issued}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-brand">{c.issuer}</p>
                      <p className="mt-1 font-mono text-[11px] text-on-slate-muted/80">
                        ID {c.credentialId}
                      </p>
                    </>
                  );
                  return (
                    <li key={c.credentialId}>
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block transition-opacity hover:opacity-80"
                        >
                          {body}
                        </a>
                      ) : (
                        body
                      )}
                    </li>
                  );
                })}
              </ul>
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
      </div>
    </section>
  );
}
