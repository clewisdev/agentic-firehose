---
title: "Dashboard: featured repo widget"
status: in-progress
drafted: 2026-06-16
owner: chris
---

# Plan: featured repo widget

A manually-curated "worth a look" banner on the dashboard. Pure editorial signal — the owner picks something arbitrary that's worth attention right now, regardless of star count. Auto-expires after 10 days and hides entirely.

## Decisions

- **Selection**: manual only. Owner edits `docs/featured.json` and pushes.
- **Label**: "worth a look" — no cadence implied.
- **Position**: banner, below the header rule and readout, above the main grid.
- **Expiry**: auto-hides after 10 days from `set_on`. No stale picks visible.
- **Value**: editorial note explains *why* it's interesting — the trending panel can't do that.

## Data model

`docs/featured.json` (committed manually):

```json
{
  "repo": "mvanhorn/last30days-skill",
  "note": "Real-time community signal across 7 platforms — the multi-source synthesis pattern maps directly onto how this KB works.",
  "set_on": "2026-06-16"
}
```

`build.py` reads this and includes it in `data.json` as `featured`. If absent, expired (>10 days), or repo not found, `featured` is `null`.

## Implementation steps

1. Update `build.py` to read `docs/featured.json` and resolve against repos data
2. Add banner CSS and `renderFeatured()` to `index.html`
3. Create initial `docs/featured.json`
4. Commit and push
