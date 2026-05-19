# Showreel banner images

Drop your project screenshots into this folder using the exact filenames below.
The Case Studies showreel reads them as the slide background. Missing files
gracefully fall back to the colored gradient (the `<img onError>` hides the
broken element automatically).

Recommended size: **2400 × 1400+**, aspect ratio ~16:9 or wider.
Format: `.png` (current convention). Change `bannerUrl` in
`src/lib/github-data.ts` if you prefer `.jpg`.

| Project              | File                              | Status   |
| -------------------- | --------------------------------- | -------- |
| PYKO                 | `pyko.png`                        | ✅ in    |
| Soulmaed             | `soulmaed.png`                    | ✅ in    |
| Express Supplemart   | `supplemart-express.png`          | ✅ in    |
| THRDCULT             | `thrdcult.png`                    | ✅ in    |
| Abley's              | `ableys.png`                      | ⏳ TODO   |
| UVS App              | `uvs-app.png` *(optional)*        | —        |
| Indian GST Invoice   | `indian-gst-invoice.png` *(opt.)* | —        |

The dark vertical overlay + radial vignette on the showreel keeps the foreground
text legible over any banner — you don't need to dim or darken the screenshots
yourself.
