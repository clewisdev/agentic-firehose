---
title: "Rotate Anthropic API key"
status: cancelled
drafted: 2026-06-16
owner: chris
---

# Plan: rotate Anthropic API key

## Why

The repo went public on 2026-06-16. Although the API key is stored as a Wrangler secret (never in source), rotating it after a repo visibility change is good practice — belt-and-braces.

## Steps

1. Go to [console.anthropic.com](https://console.anthropic.com) → API Keys
2. Create a new key
3. Update the Worker secret:
   ```bash
   cd worker
   npx wrangler secret put ANTHROPIC_API_KEY
   # paste the new key when prompted
   ```
4. Verify the Worker still captures: send a `[test]` email to the capture address and confirm a healthcheck entry lands in `sources/skipped/`
5. Delete the old key in the Anthropic console

## Why cancelled

The key was stored as a Wrangler secret and never in source. The repo going public does not change the key's exposure surface. No rotation trigger exists. Cancelled 2026-06-29.
