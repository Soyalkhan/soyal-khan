import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getNote, getNotes } from "@/lib/notes";
import { formatDate } from "@/lib/note-utils";
import { profile } from "@/lib/github-data";

/* Every note is prerendered at build time. */
export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

// In Next 16 `params` is a Promise and must be awaited.
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return { title: "Not found — Soyal Khan" };

  return {
    title: `${note.title} — Soyal Khan`,
    description: note.excerpt,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      title: note.title,
      description: note.excerpt,
      type: "article",
      publishedTime: note.date,
      url: `/notes/${note.slug}`,
      images: note.cover ? [note.cover] : undefined,
    },
    twitter: {
      card: note.cover ? "summary_large_image" : "summary",
      title: note.title,
      description: note.excerpt,
      images: note.cover ? [note.cover] : undefined,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();

  const others = getNotes().filter((n) => n.slug !== note.slug).slice(0, 2);

  return (
    <main className="relative">
      <SmoothScroll />
      <Nav />

      <article className="pt-32 pb-20 md:pt-40">
        <div className="shell max-w-[52rem]">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All notes
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <time dateTime={note.date}>{formatDate(note.date)}</time>
              <span aria-hidden>·</span>
              <span>{note.readingMinutes} min read</span>
              {note.draft && (
                <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-deep">
                  Draft
                </span>
              )}
            </div>

            <h1 className="display-xl mt-4 text-[clamp(2rem,5vw,3.5rem)]">{note.title}</h1>

            {note.excerpt && (
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {note.excerpt}
              </p>
            )}

            {note.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {note.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-body"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </header>

          {note.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={note.cover}
              alt=""
              aria-hidden
              className="mt-10 w-full rounded-2xl border border-border object-cover"
            />
          )}

          <div
            className="note-body mt-12"
            dangerouslySetInnerHTML={{ __html: note.html }}
          />

          <footer className="mt-16 border-t border-border pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                Written by {profile.name}
              </span>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(note.title)}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-slate"
              >
                Reply by email
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </footer>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="shell max-w-[52rem]">
            <span className="eyebrow text-muted-foreground">Keep reading</span>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((n) => (
                <Link
                  key={n.slug}
                  href={`/notes/${n.slug}`}
                  className="group rounded-2xl border border-border bg-card p-5 card-lift"
                >
                  <span className="text-xs text-muted-foreground">
                    {formatDate(n.date)}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg leading-snug text-foreground">
                    {n.title}
                  </h3>
                  {n.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {n.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
