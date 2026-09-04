---
title: Storefront API or Admin API?
date: 2026-01-20
excerpt: One is safe in a browser. The other absolutely is not. That single fact answers most of the question.
tags: [shopify, apps, headless]
---

New Shopify developers reach for the wrong API constantly, usually because both
appear to expose products. The distinction is not what they return — it is who
they are for.

## The one-line version

**Storefront API** is for shoppers. **Admin API** is for merchants.

Storefront tokens are designed to be public. They ship in browser JavaScript.
They are scoped to shopper-safe operations: browse products, build a cart, start
a checkout.

Admin tokens are credentials. They can read every customer, change every price,
and cancel every order. They belong on a server and nowhere else.

## Choosing

| You are building | Use |
| --- | --- |
| A headless storefront | Storefront API |
| A mobile shopping app | Storefront API |
| An embedded admin app | Admin API |
| A back-office sync or ERP integration | Admin API |
| A bulk product import | Admin API (bulk operations) |
| A "shop the look" widget on a marketing site | Storefront API |

## What each one cannot do

**Storefront cannot** read customer lists, see order history beyond the
authenticated customer's own, change inventory, or read cost prices. This is the
point — the restriction is the security model.

**Admin cannot** create a cart or a checkout session for a shopper. It manages the
store; it does not act as a customer.

If you feel you need both, you probably do — a headless storefront with an admin
sync job is two integrations, not one confused one.

## The mistake I see most

Putting an Admin token in a front-end build to fetch something Storefront does not
expose — usually inventory detail or a metafield somebody forgot to make visible
to the Storefront API.

Anyone can read that token out of the bundle. It grants full store access. Every
time this comes up the correct fix is the same: expose the field properly to the
Storefront API, or put a thin server endpoint in front of the Admin call.

## Two things worth knowing

**Metafields need explicit exposure.** A metafield is not visible to the
Storefront API just because it exists. It has to be marked as storefront-visible.
This is the single most common "why is this field missing" in headless work.

**They have different rate limit models.** Admin uses a points-based leaky bucket
with cost per query. Storefront is throttled differently and is built to handle
shopper traffic. Do not assume tuning that works for one applies to the other.

## Customer Account API

Worth naming, since it fills a real gap: authenticated shopper access to their own
orders, addresses and payment methods. If you are building a headless account
area, this is what you want — not the Admin API filtered by customer ID, which is
how people get it wrong.
