---
title: "Dashboard: time-travel repos panel"
status: planning
drafted: 2026-06-16
owner: chris
---

# Plan: time-travel repos panel

Month-by-month navigation through the repos panel — step back through the KB's capture history to see which repos were newly added each month and what their star counts were at the time.

Depends on `plans/stars-at-capture-convention.md` (the `stars_at_capture` frontmatter field that makes historical star counts honest).

## The problem with naive approaches

You cannot reconstruct "what did January look like" from today's data if you only store the current star count. A repo captured in January with 2k stars that now has 50k will look like it was always popular. The `stars_at_capture` field solves this — it's written once at capture time and never updated.

## Data model

`build.py` groups repo sources by `captured` month and emits a `repos_by_month` structure in `data.json`:

```json
{
  "repos_by_month": {
    "2026-05": [
      {"name": "safishamsi/graphify", "stars_at_capture": 55200, ...},
      {"name": "mattpocock/skills", "stars_at_capture": 96728, ...}
    ],
    "2026-06": [
      {"name": "mvanhorn/last30days-skill", "stars_at_capture": 39000, ...},
      {"name": "openclaw/openclaw", "stars_at_capture": 379000, ...}
    ]
  }
}
```

## Dashboard UX

The trending repos panel gains a month selector: `◂ May 2026 | Jun 2026 ▸`. Each month shows repos first captured that month, sorted by `stars_at_capture`. "All time" (current behaviour) remains the default.

## Edge cases

- Repos captured before `stars_at_capture` exists: fall back to corpus-scan count, shown with a `~` prefix to indicate approximate
- Repo captured in multiple months: show in first-capture month only
- Months with no repo captures: skip in the selector

## Implementation sequence

1. Land `stars-at-capture-convention.md` first — backfill existing sources
2. Update `build.py` to emit `repos_by_month`
3. Add month selector UI to the trending repos panel
