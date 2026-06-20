---
title: "stars_at_capture frontmatter convention for repo sources"
status: planning
drafted: 2026-06-16
owner: chris
---

# Plan: stars_at_capture frontmatter convention

## Problem

The dashboard's trending repos panel derives star counts from text mentions in source bodies. This is fragile — if a repo is mentioned in one source and its star count is mentioned in a different source, the join may fail. It also only stores the most recent known count, not the count at time of capture.

## Proposed convention

When capturing a GitHub repo source, write `stars_at_capture: N` to the source frontmatter alongside the existing free-text content. This field:

- Is written **once**, at capture time, and never overwritten (immutable snapshot)
- Represents the star count as reported in the source being captured
- Is used by the dashboard build as the authoritative count for that repo

For the time-travel repos feature (see `plans/dashboard-repos-time-travel.md`), this field is the foundation — it's what makes each month's snapshot honest rather than projecting today's count backwards.

## Implementation

### Worker change

When the captured source has `source_type: repo` and the URL is a GitHub repo, the `CAPTURE_SYSTEM` prompt should instruct Haiku to extract the star count from the fetched page and write it to frontmatter as `stars_at_capture`.

GitHub repo pages include the star count in the page HTML (`aria-label="N users starred this repository"`). This is parseable by the model without special tooling.

### build.py change

Update `_resolve_stars` in `docs/build.py` to prefer `stars_at_capture` frontmatter over the corpus text scan. The scan remains as a fallback for older sources that predate this convention.

### Backfill

Existing repo sources can have `stars_at_capture` added manually when the count is known. The current `stars: N` field on `last30days-skill` is a precedent for this pattern — rename to `stars_at_capture` for consistency.

## Open questions

- Should `stars` (current count, updated over time) coexist with `stars_at_capture` (immutable)? Useful for showing growth, but adds maintenance burden.
- Does Haiku reliably extract star counts from GitHub page HTML, or does the rendered page require JS?
