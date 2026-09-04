---
title: What GenAI actually changed about Shopify development
date: 2026-08-04
excerpt: It compressed the boring 70% and left the hard 30% exactly where it was. That changes what you charge for.
tags: [shopify, ai]
---

Two years of building Shopify work with AI in the loop, and the honest summary
is this: it collapsed the part of the job that was typing, and barely touched
the part that was thinking.

## What genuinely got faster

**Liquid and section schemas.** Theme sections are repetitive — a schema block,
some settings, a loop, responsive classes. This is the single biggest time sink
in custom theme work and it is now largely a generation problem.

**API glue.** Admin GraphQL queries, webhook handlers, Storefront API fragments.
Structured, well-documented, low-judgement work.

**Migrations and refactors.** "Convert these twelve sections to the new settings
schema" used to be an afternoon. It is now a review task.

**Reading other people's code.** Inheriting a theme somebody else built is a
normal part of agency work, and comprehension speed went up sharply.

## What did not move at all

**Knowing what to build.** A merchant says "the cart isn't converting". Working
out that the real problem is the shipping threshold being invisible until the
last step is not a generation task.

**Data modelling.** Whether a product family should be variants, linked products
or metaobjects determines everything downstream. Get it wrong and no amount of
fast code saves you.

**Performance.** Something that generates working code will happily generate
working code that ships 400KB of JavaScript to a product page.

**Anything involving money.** Tax logic, checkout behaviour, subscription
billing. The failure mode is silent and the blast radius is the merchant's
revenue.

## The commercial consequence

If most of your value was implementation speed, that value is depreciating. The
work that holds its price is the work where being wrong is expensive: data
architecture, integrations that touch payments and logistics, and knowing which
of five plausible approaches survives contact with the merchant's actual catalog.

I now quote differently. Theme build timelines came down and I passed that on,
because pretending otherwise is not sustainable when the merchant can see what
tooling exists. What went up is the share of a project spent on discovery and on
the integration surface — the parts that were always the risk, and now are
visibly most of it.

## A working rule

Let it write anything you could check in under a minute. Write anything yourself
where a subtle mistake would take a week to surface. That line moves over time,
but it moves slower than the hype suggests.
