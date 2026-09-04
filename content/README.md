# Writing a note

Reference for the `/notes` section. This file is **not** a post — it lives outside
`content/notes/`, so it is never parsed, listed or published.

Only you can publish. There is no form, no login and no admin panel on the site
— the only way a note goes live is a markdown file committed to this repo, which
means anyone publishing needs push access. Visitors can read; that is all.

## Publishing a note

1. Create `content/notes/your-slug.md` — the filename becomes the URL, so
   `cart-drawer-teardown.md` is served at `/notes/cart-drawer-teardown`.
2. Fill in the frontmatter block at the top.
3. Write.
4. Commit and push. The note is live on the next deploy.

There is no admin panel and no database. Everything lives in git next to the code.

## Frontmatter reference

| Key | Required | Notes |
| --- | --- | --- |
| `title` | yes | Shown in the list, the page heading and the browser tab. |
| `date` | yes | `YYYY-MM-DD`. Notes are sorted newest first. |
| `excerpt` | no | One or two lines. Used in the list, and as the description for Google and link previews. |
| `tags` | no | `[shopify, cro]` — these become the filter buttons on `/notes`. |
| `cover` | no | Path to an image in `public/`, e.g. `/notes/cart-drawer.jpg`. |
| `draft` | no | `true` hides the note in production. |

Reading time is calculated automatically, so you don't set it.

## Formatting

Regular paragraphs, **bold**, *italic*, and [links](/work) all work as normal.
Links get a lime underline that fills in on hover.

> Blockquotes are set in italics with a lime rule down the left.

- Bulleted lists use a lime dash instead of a dot
- Keep them short — the list is the point, not the prose around it

Inline `code` sits in a bordered chip. Fenced blocks get the dark slate treatment:

```ts
export function readingMinutes(markdown: string) {
  return Math.max(1, Math.round(markdown.trim().split(/\s+/).length / 200));
}
```

### Headings link to themselves

Every `##` and `###` gets an ID automatically, so you can send someone a link
straight to a section. Hovering a heading shows a lime underline.

Tables, images and horizontal rules are all styled to match the rest of the site.

---

That's everything. Write the note, push it, done.
