---
title: Why GST invoicing on Shopify needs an app
date: 2026-03-03
excerpt: Shopify's order confirmation is not a tax invoice. For an Indian merchant, that distinction has consequences.
tags: [shopify, india, apps]
---

Shopify sends a nicely formatted order confirmation. In India it is not a valid
tax invoice, and merchants routinely discover this at filing time.

## What a compliant invoice needs

A GST invoice has mandatory fields Shopify's confirmation does not carry:

- Supplier GSTIN, and the customer's if it is a B2B sale
- A sequential invoice number, unbroken across the financial year
- **HSN or SAC code** per line item
- Tax split shown correctly — **CGST + SGST** for intra-state, **IGST** for
  inter-state
- Place of supply
- Taxable value and tax amount stated separately per rate

Miss these and it is not an invoice, whatever it looks like.

## The bit that catches people out

**The tax split depends on where the customer is.**

Same product, same price, two different invoices. A Delhi merchant selling to a
Delhi customer splits the tax into CGST and SGST. The same merchant selling to
Maharashtra charges IGST as a single line. The total is identical; the document
is not, and the wrong one is a compliance problem.

This is not something you can hardcode per store. It has to be computed per order
by comparing the place of supply against the supplier's registered state.

**HSN codes are per product, not per store.** A brand selling apparel and
accessories has different codes and potentially different rates across the
catalog. They have to live on the product — as metafields — and flow through to
every line item.

## Why the native tools don't cover it

Shopify's tax settings handle *collecting* the right amount. That is a different
problem from *documenting* it. You can charge correct GST and still have no
compliant invoice to show for it, and the second is what your accountant needs.

Manual generation does not scale either. At 200 orders a month it is a full day of
someone's time, and the numbering has to stay sequential, which manual processes
break constantly.

## What the app has to do

- Read the order and the customer's state
- Determine intra- vs inter-state and compute the split
- Pull the HSN code from each product's metafields
- Assign the next sequential invoice number without gaps
- Generate a PDF with the merchant's branding
- Make it retrievable in bulk at filing time

The bulk export matters more than it sounds. Nobody wants the invoice for order
#1043. They want every invoice for the quarter, in one download, at the point
their accountant asks.

## Where the complexity really lives

Not the PDF. It is the numbering.

Sequential, gap-free, resetting at the financial year, surviving cancellations,
and correct when two orders land in the same second. Get that wrong and the
problem is invisible until an audit. That single constraint drove more of the
design than anything on the invoice itself.
