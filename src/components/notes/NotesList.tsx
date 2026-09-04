"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type Note } from "@/lib/note-utils";

export function NotesList({ notes }: { notes: Note[] }) {
  const [tag, setTag] = useState<string>("all");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const n of notes) for (const t of n.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [notes]);

  const shown = tag === "all" ? notes : notes.filter((n) => n.tags.includes(tag));

  return (
    <>
      {tags.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {[["all", notes.length] as const, ...tags].map(([key, count]) => {
            const active = tag === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTag(key)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-transparent bg-slate text-background"
                    : "border-border bg-card text-muted-foreground hover:border-slate hover:text-foreground"
                }`}
              >
                {key === "all" ? "All" : key}
                <span className={active ? "text-brand" : "text-muted-foreground/70"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <ul className="divide-y divide-border border-y border-border">
        {shown.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/notes/${n.slug}`}
              className="group flex flex-col gap-4 py-7 transition-colors sm:flex-row sm:items-baseline sm:gap-8"
            >
              <div className="flex shrink-0 items-center gap-3 sm:w-40 sm:flex-col sm:items-start sm:gap-1">
                <time
                  dateTime={n.date}
                  className="text-sm tabular-nums text-muted-foreground"
                >
                  {formatDate(n.date)}
                </time>
                <span className="text-xs text-muted-foreground/70">
                  {n.readingMinutes} min
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl leading-snug text-foreground transition-colors group-hover:text-body md:text-2xl">
                    {n.title}
                    {n.draft && (
                      <span className="ml-2 align-middle rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-deep">
                        Draft
                      </span>
                    )}
                  </h2>
                  <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>

                {n.excerpt && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {n.excerpt}
                  </p>
                )}

                {n.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {n.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-body"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No notes tagged “{tag}”.
        </p>
      )}
    </>
  );
}
