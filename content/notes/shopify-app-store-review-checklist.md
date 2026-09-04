---
title: Getting through Shopify App Store review
date: 2025-12-16
excerpt: I have never been approved first time. Here is what the rejections were actually about.
tags: [shopify, apps]
---

Four apps published, and not one approved on the first submission. That is
normal, and worth planning for rather than being surprised by.

What is more useful than the rules: the rejections were almost never about
whether the app worked.

## What actually gets rejected

**The listing.** Screenshots that do not show the app doing anything. Copy that
describes features rather than outcomes. A demo video that opens with a logo
animation instead of the product. This is the most common category by a distance
and the easiest to fix.

**The demo store.** Reviewers install into a store and try to use the app. If it
is empty, or the app needs configuration they have no instructions for, they
cannot evaluate it. Give them a store with realistic products and a note
explaining exactly what to click.

**Onboarding.** Installing and landing on a blank screen with no next step fails.
There must be an obvious first action.

**The mandatory webhooks.** `customers/data_request`, `customers/redact`,
`shop/redact`. They must exist and respond correctly. Easy to skip while
building, guaranteed rejection.

**Performance impact on the storefront.** If your app injects script into the
theme, it will be measured. A meaningful Lighthouse regression is a rejection.

## Build these in from the start

**Uninstall must be clean.** Handle `app/uninstalled`, remove your script tags,
delete the session. A merchant should be able to leave without residue.

**Do not ask for scopes you do not use.** Requesting `write_customers` for an app
that never touches customers invites a question you would rather not answer.

**Handle the empty state.** Fresh install, no data, no configuration. This is
what the reviewer sees first and where a surprising number of apps throw an error.

**Test on a fresh store, not yours.** Your development store has months of
accumulated setup. Install into a brand new store and use it as a stranger would.

## The listing, specifically

Since this is where most time gets lost:

- **Screenshots should show the app in use** with real-looking data. Not empty
  dashboards. Not marketing collage.
- **Lead with the problem**, not the feature list. "Shopify doesn't produce
  GST-compliant invoices" lands better than "Invoice generation with HSN support".
- **Keep the video short** and start with the thing working.

## Timeline

Budget several weeks from submission to live, including at least one round of
rejection. The rejections come with specific feedback, and addressing it properly
rather than arguing gets you through faster.

Two things that shorten it: submit with the demo store already prepared, and read
the current requirements the week you submit rather than relying on what was true
last time. They change.
