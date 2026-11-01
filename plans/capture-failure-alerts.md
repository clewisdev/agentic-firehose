---
title: "Capture Worker: alert on failure"
status: planning
drafted: 2026-11-01
owner: chris
---

# Plan: alert on capture failure

## Problem

Every error in the capture Worker (`worker/src/index.ts`) is thrown and only visible in Workers logs. Nothing is committed and nobody is told. On 2026-09-24 the fine-grained GitHub PAT (`cloudflare-worker`) expired; every capture failed with `GitHub PUT ... → 401: Bad credentials` for ~5 weeks before anyone noticed (found 2026-11-01 via `wrangler tail`). The Gemini output for those emails was produced and then discarded.

## Goal

The owner learns about a failed capture within one email round-trip, including failures that make GitHub unwritable (so a commit-based alert alone is insufficient).

## Candidate approaches

- **Reply email** via Email Routing / `message.reply()` or Cloudflare Email Sending: on any thrown error, reply to the sender with the stage (fetch / LLM / GitHub) and error text. Works even when GitHub auth is broken.
- **Commit an error note** to `sources/skipped/` with `triage_classification: error`. Visible in the dashboard, but useless for GitHub-auth failures.
- **Both**: commit when possible, always reply.
- **Preserve the LLM output** on GitHub failure (e.g. attach to the reply email, or stash in KV/R2) so a token outage doesn't throw away paid-for captures.

## Open questions

- `message.reply()` constraints (must reply to original sender, DMARC on the inbound message) vs. a separate Email Sending binding — which is simpler and reliable?
- Should success also send a short confirmation, or only failures?
- Proactive token-expiry check: a scheduled (cron) Worker that calls the GitHub API daily and alerts N days before PAT expiry (`github-authentication-token-expiration` response header)?
- Wrap the whole `email()` handler in one try/catch with stage tagging, or per-stage handling?
