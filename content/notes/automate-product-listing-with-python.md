---
title: Bulk-listing products with a Python script
date: 2026-03-31
excerpt: The CSV importer breaks on the things that matter — metafields, variant images, inventory across locations. A script doesn't.
tags: [shopify, python, automation]
---

Shopify's CSV importer is fine for a simple catalog. It starts failing as soon as
you need metafields, per-variant images, inventory split across locations, or any
transformation of the supplier's data on the way in.

At that point a script is less work than fighting the spreadsheet.

## The approach

Use the Admin GraphQL API. The REST product endpoints have been winding down and
GraphQL is where the current capability lives. You need:

- A custom app in the store with `write_products` and `write_inventory`
- The Admin API access token
- The current API version, checked in the docs rather than assumed

```python
import os, time, requests

SHOP = os.environ["SHOP"]            # example.myshopify.com
TOKEN = os.environ["ADMIN_TOKEN"]
VERSION = "2026-01"                  # check the current stable version

URL = f"https://{SHOP}/admin/api/{VERSION}/graphql.json"
HEADERS = {"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"}


def call(query: str, variables: dict) -> dict:
    for attempt in range(5):
        r = requests.post(URL, headers=HEADERS, json={"query": query, "variables": variables})

        if r.status_code == 429:                     # throttled
            time.sleep(2 ** attempt)
            continue

        r.raise_for_status()
        body = r.json()

        if body.get("errors"):
            raise RuntimeError(body["errors"])
        return body["data"]

    raise RuntimeError("throttled after 5 attempts")
```

## Rate limits are the whole game

The Admin API uses a leaky bucket with a points cost per query. Fire requests in
a tight loop and you will be throttled within seconds.

Two things make this manageable:

**Read the cost back.** Every GraphQL response includes an `extensions.cost`
block with your remaining points and restore rate. Use it to pace yourself
instead of guessing at `sleep()` values.

**Back off exponentially on 429.** As above. Do not retry immediately.

For genuinely large catalogs — thousands of products — use the **bulk operations
API** instead. You submit one operation, poll for completion, and download a
JSONL result. It is designed for this and will not throttle you.

## Structure that survives real data

Three rules that have saved me repeatedly:

**Make it idempotent.** Key on SKU or a supplier ID stored in a metafield, and
decide per-product whether to create or update. Re-running a half-finished import
should be safe, because you will re-run it.

**Validate before you write.** Run the whole file through a validation pass
first — missing SKUs, malformed prices, images that 404. Finding out at product
900 of 1200 is much worse than finding out at zero.

**Log every result to a file.** Product handle, status, error. When something is
wrong three days later, this is how you find out which products it hit.

## The part that is actually hard

Not the API. The supplier's data.

Inconsistent size labels, prices as strings with currency symbols, colours spelled
three ways, images at URLs that expire. The Shopify half of this script is maybe
a fifth of the code. The rest is normalisation, and it is different for every
supplier.

Write the normalisation as its own module with its own tests. You will be
adjusting it long after the upload code is finished.
