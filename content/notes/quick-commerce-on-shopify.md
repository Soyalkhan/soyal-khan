---
title: Running quick commerce on top of Shopify
date: 2026-03-17
excerpt: Shopify has no concept of "can I deliver here in 60 minutes?" Here's what we had to build around it.
tags: [shopify, hyperlocal, india]
---

A merchant with a working Shopify store wanted Blinkit-style delivery in their
home city — order now, receive within the hour — while keeping Shopify as the
system of record for catalog, orders and payments.

Shopify does not do this, and the gap is bigger than it first looks.

## What Shopify does not have

**Radius serviceability.** Shipping zones work on countries, states and pincodes.
Quick commerce needs "within 6km of this dark store", which is a distance
calculation against a live coordinate, not a list lookup.

**Time-window promises.** Shopify can express shipping rates. It cannot express
"order in the next 20 minutes for delivery by 7pm", which is the entire promise.

**Inventory tied to delivery radius.** Native locations affect fulfilment, not
what a shopper is allowed to see. A product in a warehouse 400km away should not
appear as available for 60-minute delivery, and nothing native enforces that.

## The shape of what we built

A separate storefront and admin, with Shopify still owning the catalog.

**Serviceability gate up front.** Before browsing, the shopper's location is
resolved to coordinates and checked against configured zones. This has to happen
first, because everything downstream depends on the answer. Get it wrong and you
promise a delivery you cannot make.

**Catalog filtered by zone.** Products are shown based on stock at the fulfilment
point serving that location, not global availability.

**Its own admin.** Order flow for quick commerce is different — accept, pick,
hand to rider, deliver, all within an hour. Shopify's admin is built around a
fulfilment cycle measured in days. Forcing one into the other helps nobody.

**Hyperlocal courier integration** for rider assignment and live tracking.

## What was harder than expected

**Serviceability at the boundary.** A customer 6.1km away in a zone configured for
6km. Straight-line distance says no; the road takes four minutes. Whether you
measure as the crow flies or by route changes both your cost model and how many
orders you turn away. There is no correct answer, only a choice you have to make
deliberately.

**Inventory truth.** Between "shopper adds to cart" and "picker reaches the
shelf" is maybe fifteen minutes, and in that window the item can be sold in-store.
Standard e-commerce absorbs this with backorders. Quick commerce cannot — the
customer is waiting.

**Cutoffs.** Every zone has a last-order time, which varies by day and by
staffing. Modelling that as configuration rather than hardcoded rules was the
difference between a demo and something a merchant could actually operate.

## Would I do it this way again

Yes, with one change: model serviceability as its own service from day one. We
grew it out of the storefront, and it wanted to be a standalone thing that both
the storefront and the admin ask questions of. Everything else — routing,
inventory, cutoffs — ends up depending on it.
