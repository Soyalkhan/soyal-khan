---
title: How Shopify webhooks actually work
date: 2026-04-14
excerpt: Verify the HMAC, respond in under five seconds, and assume every webhook will arrive twice. Most webhook bugs are one of those three.
tags: [shopify, apps, webhooks]
---

Webhooks are how your app finds out something happened in a store without
polling. They are also where a surprising number of apps quietly break, almost
always for the same three reasons.

## The flow

1. You subscribe to a topic — `orders/create`, `products/update`, `app/uninstalled`.
2. The event happens in the store.
3. Shopify POSTs JSON to your endpoint with headers describing the event.
4. Your endpoint returns a 2xx. Anything else is a failure.

The headers that matter:

```
X-Shopify-Topic              orders/create
X-Shopify-Shop-Domain        example.myshopify.com
X-Shopify-Hmac-Sha256        <signature>
X-Shopify-Webhook-Id         <unique per delivery attempt>
```

## Rule 1: verify the HMAC, on the raw body

Your endpoint is a public URL. Without verification, anyone who finds it can post
fake orders into your system.

```ts
import crypto from "node:crypto";

function verify(rawBody: Buffer, hmacHeader: string) {
  const digest = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET!)
    .update(rawBody)
    .digest("base64");

  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
}
```

Two things people get wrong here. **It must be the raw body** — if your framework
parsed the JSON before you got to it, re-serialising will not reproduce the same
bytes and verification fails. And **use a timing-safe comparison**, not `===`.

In Express that means mounting `express.raw()` on the webhook route
specifically, before any global JSON parser.

## Rule 2: respond fast, work later

Shopify expects a response within a few seconds. Slow endpoints get retried, and
persistent failures can get your subscription removed.

So do not do the work in the handler:

```ts
app.post("/webhooks/orders-create", express.raw({ type: "application/json" }), (req, res) => {
  if (!verify(req.body, req.get("X-Shopify-Hmac-Sha256")!)) {
    return res.sendStatus(401);
  }
  res.sendStatus(200);              // acknowledge immediately
  queue.add("order-created", JSON.parse(req.body.toString()));  // then process
});
```

Acknowledge, enqueue, return. Generating a PDF or calling three external APIs
inside the handler is the most common cause of dropped webhooks.

## Rule 3: assume duplicates

Delivery is at-least-once. Retries mean the same event can arrive more than once,
and your handler must be idempotent.

Key off something stable from the payload — the order ID, not the webhook ID,
since a retry carries a different `X-Shopify-Webhook-Id`. Store what you have
processed and skip repeats.

## Subscribe in the TOML, not at runtime

Declaring subscriptions in `shopify.app.toml` means they are recreated correctly
on install and reinstall. Registering them in code after OAuth works until
somebody uninstalls and reinstalls, and then it does not.

## Don't forget the mandatory ones

`customers/data_request`, `customers/redact` and `shop/redact` are required for
App Store approval. They must be implemented and they must respond correctly —
this is a common review rejection and an avoidable one.
