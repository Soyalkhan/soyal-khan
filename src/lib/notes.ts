import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

import type { Note, NoteWithBody } from "@/lib/note-utils";

export type { Note, NoteWithBody } from "@/lib/note-utils";

const DIR = path.join(process.cwd(), "content", "notes");



/** ~200 wpm, rounded up — close enough and cheaper than counting properly. */
function readingMinutes(markdown: string) {
  return Math.max(1, Math.round(markdown.trim().split(/\s+/).length / 200));
}

function parse(file: string): { note: Note; body: string } {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");

  let data: Record<string, unknown>;
  let content: string;
  try {
    ({ data, content } = matter(raw) as { data: Record<string, unknown>; content: string });
  } catch (err) {
    // Almost always an unquoted value containing ": " — YAML reads it as a map.
    throw new Error(
      `content/notes/${file}: could not parse frontmatter. ` +
        `If a title or excerpt contains a colon, wrap it in double quotes. ` +
        `(${(err as Error).message})`,
    );
  }

  if (!data.title) throw new Error(`content/notes/${file}: missing "title" in frontmatter`);
  if (!data.date) throw new Error(`content/notes/${file}: missing "date" in frontmatter`);

  return {
    note: {
      slug,
      title: String(data.title),
      // gray-matter turns unquoted YAML dates into Date objects
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
      excerpt: String(data.excerpt ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      cover: data.cover ? String(data.cover) : undefined,
      draft: Boolean(data.draft),
      readingMinutes: readingMinutes(content),
    },
    body: content,
  };
}

function files() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => /\.mdx?$/.test(f));
}

/** Newest first. Drafts are hidden in production but visible in `next dev`. */
export function getNotes(): Note[] {
  const showDrafts = process.env.NODE_ENV === "development";
  return files()
    .map((f) => parse(f).note)
    .filter((n) => showDrafts || !n.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTags(): string[] {
  return [...new Set(getNotes().flatMap((n) => n.tags))].sort();
}

export async function getNote(slug: string): Promise<NoteWithBody | null> {
  const file = files().find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;

  const { note, body } = parse(file);
  if (note.draft && process.env.NODE_ENV !== "development") return null;

  const html = String(
    await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: "wrap" })
      .use(rehypeStringify)
      .process(body),
  );

  return { ...note, html };
}
