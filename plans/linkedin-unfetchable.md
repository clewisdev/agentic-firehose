---
title: "LinkedIn unfetchable sources: mitigations"
status: planning
drafted: 2026-06-16
owner: chris
---

# Plan: LinkedIn unfetchable sources

## Problem

LinkedIn is the primary source of high-signal practitioner posts in this field, but the Worker receives HTTP 503 from LinkedIn on most fetch attempts. The content is inaccessible to headless fetching. This means a significant proportion of submitted URLs land in `sources/skipped/` as unfetchable rather than being captured.

## Current behaviour

Worker fetches the URL; LinkedIn returns 503 or a login wall. Worker logs the failure, writes a skipped entry, and moves on. The URL is lost.

## LinkedIn URL types (investigated 2026-06-29)

Not all LinkedIn URLs are equally gated. URL type determines fetchability without authentication:

| URL pattern | Example | Fetchable? |
|---|---|---|
| `/posts/<slug>_...-ugcPost-<id>-...` | Native original post | **Yes** — LinkedIn serves these publicly |
| `/posts/<slug>_...-activity-<id>-...` | Native activity post with profile slug | **Yes** — publicly served |
| `/posts/<slug>_...-share-<id>-...` | Reshare of another post | **No** — always returns login wall |
| `/feed/update/urn:li:activity:<id>` | Activity URL without profile slug | **No** — always returns login wall |

The `share` type is set at post-creation time (it's a reshare, not original content) and cannot be worked around by rewriting the URL. The Worker correctly identifies these as unfetchable — the skipped classification is accurate, not a bug.

**Practical implication for triage**: when a LinkedIn URL fails, check the slug. If it contains `-share-`, it is permanently gated. If it contains `-ugcPost-` or `-activity-` with a profile slug, it was likely a transient 503 and worth retrying.

**For the Worker**: the debug HTML for `share`-type URLs contains `pageKey: d_registration-cold-join` — this is a reliable signal. The Worker could detect this pattern and set `reason: "linkedin-share-url-gated"` rather than the generic unfetchable reason, making skipped entries more informative.

## Options

### Option A — Manual paste flow (no new infrastructure)

Add a `[content]` override tag. When the owner includes `[content]` in the email subject, the Worker treats the email body as the article content rather than fetching the URL. Owner copies the LinkedIn post text manually and pastes it in the email body alongside the URL.

- **Effort**: small Worker change (detect tag, skip fetch, use body as content)
- **Friction**: owner must paste manually — acceptable for high-signal posts, not for bulk
- **Risk**: none

### Option B — Debug HTML processing

The Worker already saves raw HTML to `sources/debug/` for some failed fetches. A post-processing step could attempt to extract the post content from the saved HTML (LinkedIn's HTML structure is consistent enough for a targeted parser).

- **Effort**: moderate (HTML parser for LinkedIn's specific DOM, plus a trigger mechanism)
- **Fragility**: LinkedIn DOM changes break the parser silently

### Option C — Browser-rendered fetch via Cloudflare Browser Rendering

Cloudflare Workers has a Browser Rendering binding that can execute JavaScript and return rendered HTML. LinkedIn requires JS execution to populate the feed. This would bypass the 503.

- **Effort**: add Browser Rendering binding to wrangler.toml, update fetch logic
- **Cost**: Browser Rendering is billed per session (~$0.002/session); acceptable at personal volume
- **Risk**: LinkedIn may still block headless browsers via fingerprinting; needs testing

### Option D — Accept the limitation, improve the manual paste UX

LinkedIn's blocking is intentional and aggressive. Invest in making Option A frictionless rather than fighting the platform. A browser extension or bookmarklet that pre-formats an email with the post content would reduce manual friction to one click.

## Recommended path

Option A first (immediate, low effort). Option C if Browser Rendering proves reliable after a spike.

## Open questions

- Does Cloudflare Browser Rendering bypass LinkedIn's 503, or does LinkedIn also block it?
- What is the actual volume of LinkedIn-sourced URLs that fail? (Check skipped/ ratio.)
