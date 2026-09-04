# Project banner images

Screenshots of the live site / store listing for each project. Referenced from
`bannerUrl` in `src/lib/github-data.ts`. A project with no file here falls back
to a slate nameplate tile showing its stack (see `Thumb` in `Work.tsx`), so a
missing banner degrades gracefully.

**Format:** `.jpg`, 1440 × 900, quality 82, progressive. Previously these were
2400–2900px PNGs totalling 13.2 MB; the JPEG set is 656 KB for the same on-screen
result. Keep new additions to the same recipe.

Captured with Playwright at 1440 × 900 @2x, popups dismissed, animations frozen,
then downscaled — see the capture recipe in
`/Users/soyalkhan/Desktop/All Projects/xenon-commerce/screenshot/capture.mjs`.

| Project                      | File                        |
| ---------------------------- | --------------------------- |
| PYKO                         | `pyko.jpg`                  |
| Soulmaed                     | `soulmaed.jpg`              |
| Express Supplemart           | `supplemart-express.jpg`    |
| THRDCULT                     | `thrdcult.jpg`              |
| Abley's                      | `ableys.jpg`                |
| UVS App                      | `uvs-app.jpg`               |
| Indian GST Invoice           | `indian-gst-invoice.jpg`    |
| Xenon Smart AI Cart & Upsell | `xenon-smart-cart.jpg`      |
| Snowflakes                   | `snowflakes.jpg`            |
| The Wouff                    | `thewouff.jpg`              |
| Elephant Racquet Club        | `elephantracquetclub.jpg`   |
| Supplemart                   | `supplemart.jpg`            |
| Toramoto                     | `toramoto.jpg`              |
| SuriFresh Extract            | `surifreshextract.jpg`      |
| GoHyperLocal                 | `gohyperlocal.jpg`          |
| Xenon Commerce               | `xenon-commerce.jpg`        |

**BookMyCab has no banner:** `bookmycab.co` currently serves the Plesk hosting
default page, not the product. Restore the deployment, recapture, then add
`bannerUrl: "/banners/bookmycab.jpg"`.
