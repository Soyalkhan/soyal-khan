---
title: How to start a Shopify app in 2026 (and where AI actually helps)
date: 2026-08-18
excerpt: The setup is three commands. The interesting part is what you hand to an AI assistant and what you keep for yourself.
tags: [shopify, apps, ai]
---

Scaffolding a Shopify app has not been the hard part for years. The hard part is
everything after `npm run dev` — auth, billing, webhooks, review. Here is how I
start one now, and where an AI assistant earns its keep.

## The scaffold

```bash
npm install -g @shopify/cli
shopify app init
shopify app dev
```

That gives you an embedded app with OAuth handled, a tunnel to your dev store,
and App Bridge wired up. Pick the official template unless you have a specific
reason not to — it tracks Shopify's own changes to session tokens and embedding,
and you inherit those fixes for free.

Before writing a feature, get three things right:

- **`shopify.app.toml`** — scopes, app URL, webhook subscriptions. Declaring
  webhooks here instead of registering them at runtime means they survive a
  reinstall without extra code.
- **Session storage** — the template ships with something workable, but decide
  early whether it's Prisma, Mongo or Redis. Migrating sessions later is
  miserable.
- **The mandatory compliance webhooks** — `customers/data_request`,
  `customers/redact`, `shop/redact`. Shopify will not approve you without them,
  and bolting them on at review time always takes longer than doing it now.

## Where AI actually helps

I use Claude on every app now, but not evenly. It is genuinely good at:

- **GraphQL against the Admin API.** The schema is enormous and the docs are
  spread thin. Describing what you want and getting a working query with the
  right connection fields saves real time.
- **Polaris scaffolding.** Component names, prop shapes, the layout primitives.
  This is memorisation work, and offloading it is pure profit.
- **Webhook payload handling.** Give it a sample payload, get a typed handler.
- **Reading unfamiliar code.** Dropping into a client's existing app and asking
  what a module does is faster than tracing it by hand.

It is unreliable at:

- **Anything versioned.** API versions change quarterly. Confident-sounding code
  against a deprecated field is the most common failure. Check the current
  version in the docs, not in the answer.
- **Billing.** The subscription APIs have edge cases around trials, upgrades and
  currency that are easy to get subtly wrong and expensive to discover in
  production.
- **Rate limits and bulk operations.** Knowing *when* to reach for a bulk query
  instead of paginating is a judgement call about your data volume.

The pattern that works: let it write the first draft of anything mechanical,
and keep the architecture, the billing logic and the data model for yourself.

## The part nobody scaffolds for you

App Store review is a real project. Budget for a demo store with realistic data,
a screencast, listing copy, and at least one round of rejection. I have never
had an app approved first time, and the feedback is usually about the listing,
not the code.
