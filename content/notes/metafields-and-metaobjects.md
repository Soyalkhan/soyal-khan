---
title: Metafields and metaobjects, and when to use which
date: 2025-10-28
excerpt: Metafields extend something that exists. Metaobjects create something that doesn't. Most modelling mistakes are picking the wrong one.
tags: [shopify, theme, headless]
---

Shopify's data model covers products, variants, collections, customers and
orders. Real brands need more, and there are two tools for that. They are not
interchangeable.

## The distinction

**A metafield extends an existing record.** Fabric composition on a product. A
care guide on a variant. A loyalty tier on a customer. The data belongs to that
record and dies with it.

**A metaobject is a record of its own.** A designer, a size guide, a store
location, an ingredient. It exists independently and can be referenced from many
places.

## The test

Ask: **does more than one thing need to point at this?**

If a size guide applies to forty products, it is a metaobject. Store it once,
reference it forty times, edit it in one place. As a metafield you have forty
copies and forty places to update.

If fabric composition is genuinely unique per product, it is a metafield. Making
it a metaobject adds indirection for nothing.

## Where people go wrong

**Repeating the same value across products.** Twenty products with a `designer`
metafield all reading "Studio Nine". Now the designer's bio lives nowhere, and
renaming means twenty edits. This should have been a metaobject referenced by
each product.

**Metaobjects for genuinely unique data.** A one-off product description as a
metaobject is a join for no reason.

**Forgetting storefront visibility.** A metafield or metaobject is not available
to the Storefront API by default. It has to be explicitly exposed. This is the
most common "the data exists but my headless build cannot see it" problem, and it
is a checkbox.

## Practical notes

**Use definitions, not ad-hoc metafields.** Definitions give validation, a
sensible admin UI and type safety. Ad-hoc metafields are untyped strings the
merchant will eventually fill with something unexpected.

**Namespace properly.** `custom.fabric` beats `fabric`. When a third app writes
its own metafields, you will be glad yours are namespaced.

**Reference fields over text.** A product metafield of type *metaobject
reference* is a real relationship. The same thing as a text field containing a
handle is a string you have to resolve yourself and that breaks silently when the
handle changes.

## Where this pays off

Metaobjects are what make a Shopify store hold structured content without a
separate CMS. Store locations, lookbooks, ingredient glossaries, designer
profiles — all of it native, all of it editable by the merchant, all of it
queryable from the Storefront API.

For most brands, this removes the reason to add a headless CMS at all. That is a
whole vendor, a whole integration and a whole monthly cost avoided by modelling
properly in the platform you already have.
