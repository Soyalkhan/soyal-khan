---
title: What actually moves Shopify theme performance
date: 2025-11-25
excerpt: Not minification. Images, third-party scripts, and how much of the page waits on JavaScript.
tags: [shopify, theme, performance]
---

Most theme performance work is spent on things that do not matter. Here is where
the time actually goes on a slow Shopify store, roughly in order of impact.

## 1. Images

Almost always the largest thing on the page, and almost always the LCP element on
a product or collection page.

- **Serve the right size.** Shopify's image URLs accept width parameters. A 2000px
  image rendered at 400px wastes most of its bytes.
- **Use `srcset`.** Different devices need different files. One size for everyone
  means mobile pays for desktop.
- **Set width and height.** Missing dimensions cause layout shift, which is a
  separate metric you also fail.
- **Do not lazy-load the hero.** Lazy-loading your LCP image delays the exact
  thing being measured. Lazy-load below the fold only.

Getting images right is usually the majority of the available win.

## 2. Third-party scripts

The second biggest cause, and the one merchants resist most.

Every app that injects a script tag costs you. Reviews, chat, popups, analytics,
heatmaps, two competing pixels. Individually each looks small. Together they are
frequently more JavaScript than the theme itself.

The audit is boring and effective: list every script on the storefront, ask what
it is for, and uninstall the ones nobody can justify. Merchants routinely have
apps installed from a trial two years ago still loading on every page.

For what survives: defer everything not needed for first render, and load chat
widgets on interaction rather than on load.

## 3. Render-blocking work in the head

Fonts and CSS in the head block rendering.

- **Preload the fonts you actually use above the fold**, and only those.
- **`font-display: swap`** so text renders before the font arrives.
- Cut the font families and weights. Four weights of two families is a lot of
  bytes for something nobody will consciously notice.

## 4. How much of the page needs JavaScript

Liquid renders on the server. Every part of the page you move to client-side
JavaScript is a part that arrives later.

Product grids and content that render in Liquid will beat the same thing built as
a client-rendered component, every time. Reserve JavaScript for interaction — cart
updates, variant switching, filters.

## What barely matters

**Minifying Liquid.** Negligible.

**Combining CSS files.** HTTP/2 made this largely irrelevant.

**Chasing a Lighthouse score.** Lighthouse is a lab test on a simulated device.
Look at field data — what real visitors on real phones experienced. A store can
score 60 in Lighthouse and have healthy field metrics, or the reverse.

## The order to work in

Images, then third-party scripts, then fonts, then JavaScript volume. Measure with
field data before and after. If you are not measuring, you are guessing, and
performance work is unusually easy to feel good about while achieving nothing.
