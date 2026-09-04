---
title: Your cart page is costing you the upsell
date: 2026-06-09
excerpt: Sending a shopper to /cart ends the browsing session. A drawer doesn't. What changes when the cart stops being a destination.
tags: [shopify, cro, apps]
---

Most Shopify themes still ship a cart *page*. A shopper clicks the bag icon,
the browsing context is destroyed, and they land on a page whose only job is to
move them one step closer to leaving.

That page is the worst place in the funnel to attempt an upsell, and it is
where almost every merchant attempts one.

## Why the page loses

**It breaks the session.** The collection they were scrolling, their scroll
position, the filters they set — gone. Returning means starting over, so many
do not return.

**It reframes the visit.** A cart page asks "are you finished?". A drawer asks
"anything else?". Same products, different question.

**Upsells arrive at the wrong moment.** A recommendation on the cart page
competes with the checkout button. A recommendation in a drawer competes with
nothing, because the shopper has not committed to leaving.

## What actually moves the number

Three things, roughly in order of impact:

**1. A visible shipping threshold.** "₹380 away from free shipping" with a
progress bar is the single highest-leverage element in a cart. It gives a
specific, achievable target at the moment the shopper knows their subtotal.
Most merchants have a free shipping threshold and never show it until checkout,
which is exactly when it can no longer change behaviour.

**2. Relevant, not random, recommendations.** One or two items that make sense
with what is in the bag. A cart with a serum in it should offer a cleanser, not
whatever is on sale. Bad recommendations do not just fail — they add noise to a
screen where you were asking for a decision.

**3. A cart that is always reachable.** A sticky button on every page means the
shopper can check their bag without leaving the product they are looking at.
The drawer only helps if opening it is free.

## The implementation detail people miss

Adding to cart must not reload the page. If your drawer opens after a full
navigation, you have rebuilt the cart page with extra steps. It needs to be an
AJAX add against the cart API, updating drawer state in place.

And it needs to survive the awkward cases: an item that goes out of stock while
in the bag, a discount code that changes the subtotal past the shipping
threshold, a quantity update that empties the cart. Each of those is a state the
drawer has to render honestly rather than silently getting wrong.

## What to measure

Not conversion rate on its own. Watch **average order value** and **units per
transaction** — those are what a drawer moves. If AOV rises and conversion holds
flat, it worked. If conversion drops, your recommendations are noise and you
should show fewer of them.
