---
title: The multi-dashboard problem in Indian shipping
date: 2026-06-23
excerpt: Merchants run Shiprocket, Delhivery, Bluedart and a local rider network in four browser tabs. Here's what we built instead.
tags: [logistics, hyperlocal, india]
---

Ask an Indian D2C merchant how they ship and you get a list, not an answer.
Shiprocket for most orders. Delhivery direct once volume justified the contract.
Bluedart for anything premium. A local rider network for same-city delivery
because none of the above does 40 minutes.

Four dashboards. Four sets of credentials. Four different definitions of
"delivered".

## What this actually costs

It is not just inconvenience.

- **Rate decisions are guesses.** Comparing freight across providers means
  opening three tabs and doing mental arithmetic per order. Nobody does this at
  volume, so orders go to whichever provider is habitual rather than cheapest.
- **Serviceability is discovered too late.** The merchant finds out a pincode is
  not serviceable after the customer has paid.
- **Hyperlocal and standard are treated as separate businesses.** A same-city
  order that could go out in an hour sits in the standard queue for two days
  because it entered through the same funnel as everything else.
- **Support has no single source of truth.** "Where is my order" requires knowing
  which provider it went to first.

## What we built

The premise of the hyperlocal platform was one dashboard where every provider is
a plugin rather than a destination.

**Serviceability first.** Before an order is routed, the platform checks the
delivery pincode and the merchant's configured zones. It answers a question the
merchant previously had to answer manually: *can this go hyperlocal, or does it
need standard shipping?* Radius from the fulfilment point decides it.

**Freight comparison in one place.** For standard orders, rates come back from
each connected provider for that lane and weight slab, side by side. The
decision becomes a click instead of a research task.

**One shipping action.** Book, generate the label and get the tracking reference
from the same screen regardless of which provider wins. The provider becomes an
implementation detail.

**Zones as configuration.** Merchants define their own hyperlocal zones per
fulfilment location. A brand with dark stores in three cities gets three radii,
not one national rule.

## The part that was harder than expected

Not the integrations — those are just APIs with inconsistent documentation.

The hard part was **status normalisation**. Every provider has its own vocabulary
for the same physical event, and they disagree on when a package counts as
out for delivery, what an exception means, and how an RTO is signalled. Building
a single status model that stays honest across all of them, without flattening
away information the merchant needs, took longer than every integration combined.

That is the actual product. Anyone can call four APIs. Making four APIs tell one
coherent story is the work.
