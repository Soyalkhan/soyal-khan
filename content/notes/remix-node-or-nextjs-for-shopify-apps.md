---
title: Remix, the Node template, or Next.js for a Shopify app?
date: 2026-07-07
excerpt: Three real options, one default. The deciding factor is usually session tokens, not framework preference.
tags: [shopify, apps, remix, nextjs]
---

This comes up on every new app, usually framed as a framework preference. It
mostly is not one. The question is how much embedded-app plumbing you want to own.

## The short answer

**Use Shopify's official template unless you have a specific reason not to.**

Everything difficult about an embedded app — OAuth, session token exchange,
App Bridge, the iframe context, keeping up with quarterly API changes — is
solved in the template and maintained by the people who change the platform.
When embedding behaviour shifts, you get the fix by updating a dependency.

The template is Remix-based and has been tracking React Router. Check which
version `shopify app init` gives you today rather than trusting any blog post,
including this one.

## When the Node template makes sense

The plain Node/Express template suits you if:

- Your app is mostly backend — a webhook processor, a sync job, an integration
  that barely has a UI.
- You have an existing Node service and want the Shopify piece to live inside it.
- Your team knows Express and will not touch a loader-based framework.

You take on more of the session and auth wiring yourself. For a thin admin UI
over a heavy backend, that trade is often fine.

## When Next.js makes sense

I have shipped Shopify apps on Next.js, and I would not pick it again for the
embedded admin. Not because it is bad — because you spend the first week
rebuilding what the official template gives you, and then you maintain that
forever.

Next.js earns its place in two situations:

- **The marketing site and the app share a codebase.** Your public listing page,
  docs and pricing live on Next; the embedded app is a route group inside it.
- **A customer-facing surface outside the admin.** Portals, dashboards, anything
  a shopper rather than a merchant uses. Here you are not fighting the embedded
  context at all.

## The actual decision

Ask one question: **does a merchant use this inside the Shopify admin?**

- Yes → official template. The embedded plumbing is the whole problem and it is
  already solved.
- No → whatever you are fastest in. Next.js is an excellent choice for a
  standalone dashboard talking to the Admin API.

## What matters more than the framework

Session storage, webhook reliability, and how you handle rate limits. I have seen
apps fail review over webhook handling and never over framework choice. Pick the
default, and spend the saved attention on the parts that actually get you
rejected.
