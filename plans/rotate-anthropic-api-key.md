---
title: "Rotate Anthropic API key"
status: planning
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

## Notes

- No Worker redeploy needed — secrets take effect immediately
- The GitHub token (`GITHUB_TOKEN`) does not need rotation for the same reason (it was never in source either), but rotate it too if you want to be thorough
- If the key is also used anywhere else (local Claude Code sessions, other projects), update those separately — this plan only covers the Worker secret
