/** Client-safe half of the notes module — no `fs`, so client components can
 *  import the type and the date formatter without pulling in server-only code. */

export type Note = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  readingMinutes: number;
};

export type NoteWithBody = Note & { html: string };

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
