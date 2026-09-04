import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NotesList } from "@/components/notes/NotesList";
import { getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes — Soyal Khan",
  description:
    "Notes on Shopify apps, headless commerce, conversion and shipping full-stack products.",
  alternates: { canonical: "/notes" },
};

export default function NotesIndex() {
  const notes = getNotes();

  return (
    <main className="relative">
      <SmoothScroll />
      <Nav />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="shell">
          <span className="eyebrow text-muted-foreground">Notes</span>
          <h1 className="display-xl mt-3 max-w-[16ch] text-[clamp(2.5rem,6.5vw,4.5rem)]">
            Things I learn <span className="hl italic">shipping</span>.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Shopify apps, headless storefronts, conversion and the awkward parts of
            building commerce products. Written while doing the work, not after.
          </p>
        </div>
      </section>

      <section className="border-t border-border pb-24 pt-12">
        <div className="shell">
          {notes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <h2 className="font-display text-xl text-foreground">First notes coming soon</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                I&apos;m writing up teardowns and build notes from recent projects.
                Check back shortly.
              </p>
            </div>
          ) : (
            <NotesList notes={notes} />
          )}

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <span className="text-sm text-muted-foreground">
              Something you want me to write about?
            </span>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-slate px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-slate-deep"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
