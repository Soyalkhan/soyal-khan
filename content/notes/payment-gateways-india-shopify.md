---
title: Choosing a payment gateway for an Indian Shopify store
date: 2025-09-30
excerpt: Razorpay, PayU, Juspay and Shopify Payments solve different problems. Success rate matters more than transaction fee.
tags: [payments, india, shopify]
---

Merchants pick a gateway on transaction fee. It is usually the least important
variable.

A 0.2% difference in fee is worth far less than a 2% difference in payment
success rate, and success rates vary meaningfully between providers, methods and
banks.

## The landscape

**Razorpay** is the common default. Broad method coverage, good documentation, a
developer experience that does not fight you. For most merchants starting out
this is the sensible choice.

**PayU** is long-established with strong bank relationships. Pairs naturally with
Breeze if you also want their checkout layer.

**Juspay** is a different category — an orchestration layer that routes across
multiple gateways rather than being one itself. It earns its place at volume,
where routing intelligently between providers recovers meaningful revenue. Below
that scale it is complexity you do not need.

**Shopify Payments**, where available to you, has the advantage of being native:
no third-party app, checkout that never leaves Shopify, reconciliation in one
place.

## What actually matters

**Success rate**, especially on UPI and net banking. This is where money is won
and lost. Ask any provider for their rates on your specific methods, and treat
vague answers as an answer.

**UPI handling.** UPI is the dominant method for a large share of Indian
shoppers. Intent flows, app switching, timeout behaviour on mobile — these
determine whether a customer completes or gives up. Test on a real phone, not a
desktop browser.

**Settlement cycle.** T+2 versus T+7 is a working capital difference that matters
more to a growing brand than the fee.

**Refunds and disputes.** How fast, how much manual work. Support-heavy
categories feel this daily.

**COD reconciliation**, if you take COD. How the gateway or your logistics
provider remits collected cash, and how easily that ties back to orders.

## What to do before committing

Run a real transaction on every method you intend to offer — card, UPI, net
banking, wallet — on a real mobile device. Then run a refund.

That hour tells you more than any comparison table. The gaps between providers
show up in exactly these flows, and they are invisible until you try.

## A note on stacking

You do not have to choose one thing forever. A common shape is a primary gateway
for prepaid, plus a checkout layer handling COD intelligence, plus a logistics
provider handling cash remittance.

Each addition is another integration, another contract and another reconciliation
surface. Add them when a specific problem justifies it, not preemptively.

Verify current pricing and availability directly with each provider — this moves
often enough that any published comparison, including this one, is stale by the
time you read it.
