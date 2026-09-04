---
title: Custom theme builds went from three weeks to three days
date: 2026-07-21
excerpt: The work didn't get smaller. The typing did. Here's where the time actually went, and what still takes as long as it ever did.
tags: [shopify, theme, ai]
---

A custom Shopify theme used to be a 15–20 day engagement for me. Now a
comparable build lands in 2–3 days of development. That is a real change and
worth being precise about, because the naive reading — "everything is four times
faster" — is wrong.

## Where the three weeks used to go

Rough split on a typical build:

| Phase | Old |
| --- | --- |
| Discovery, content and asset gathering | 3–4 days |
| Section and schema implementation | 7–9 days |
| Responsive and cross-browser passes | 2–3 days |
| Integrations, apps, tracking | 2 days |
| QA and merchant revisions | 2–3 days |

The middle block was always the bulk. Sections are structurally repetitive:
a schema, some settings, a loop, breakpoints. Doing that thirty times is
mechanical work that still demanded a developer's whole attention.

## What compressed

Section implementation is the phase that collapsed. Describe the section,
generate the schema and markup, review it, wire it to real data. The responsive
pass compressed too, because modern generated markup starts closer to correct
than hand-written markup did under time pressure.

Call it 7–9 days down to about 1.

## What did not compress

**Discovery.** Still 3–4 days, and now proportionally the largest phase. Which
collections matter, how the catalog is actually structured, what the brand does
on mobile. No tooling shortens a conversation with a merchant who has not decided
what they want.

**Integrations.** Checkout, WhatsApp, logistics, analytics. Each one is a
third-party surface with its own quirks and its own way of breaking.

**QA and revisions.** Arguably slightly worse, because you are reviewing more
code than you wrote and the mistakes are less familiar than your own.

## What this means in practice

The 2–3 days is development time on a project where discovery is done, assets
exist and the scope is settled. Calendar time on a real client project is still
one to two weeks, and most of that is waiting on the merchant.

Two practical consequences:

- **Front-load discovery properly.** It is now the critical path. A day spent
  pinning down the catalog structure saves more than a day of implementation ever
  did.
- **Charge for outcomes, not days.** If you bill hourly you have just given
  yourself a pay cut for getting better at your job.

The thing worth protecting is the review discipline. Generating thirty sections
in a day is easy. Being sure all thirty handle an empty collection, a missing
image and a 40-character product title is the job.
