---
title: "Public contribution model"
status: planning
drafted: 2026-06-16
owner: chris
---

# Plan: public contribution model

## Context

The repo went public on 2026-06-16. It was built as a personal KB, not a community project, and the README reflects that ("fork and run your own"). But a public repo will receive issues, PRs, and questions. This plan defines how to handle that without turning the KB into a community maintenance burden.

## What we want to support

- **Issues**: bug reports on the dashboard (legitimate, welcome), feature suggestions (considered but not committed to), questions about the Worker setup (helpful to answer once then point to README)
- **PRs on `docs/`**: fixes to the dashboard HTML/JS/build.py — low-risk, worth accepting
- **PRs on `sources/`, `topics/`, `synthesis/`**: KB content — this is personal knowledge, not a wiki. The bar for external content PRs is high.
- **Forks**: the primary contribution model. The README explicitly encourages forking. Most value comes from people running their own firehose, not editing this one.

## Proposed policy

### Issues
- Welcome: dashboard bugs, Worker setup questions, README corrections
- Close with explanation: requests to add specific sources to the KB (it's personal, not encyclopaedic)
- Issue templates: one for dashboard bugs, one for general questions

### PRs
- `docs/` and `worker/`: review and merge if correct
- `README.md`, `.claude/`, `AGENTS.md`: case-by-case
- `sources/`, `topics/`, `synthesis/`: close with explanation linking to the fork-your-own guide

### Labels
Minimal set: `bug`, `dashboard`, `worker`, `question`, `wontfix`

## Implementation

1. Add `CONTRIBUTING.md` explaining the above
2. Add issue templates (`.github/ISSUE_TEMPLATE/`)
3. Add PR template with a checkbox: "This PR touches KB content (sources/topics/synthesis) — I understand this may be closed as out of scope"

## Open questions

- Is a `CONTRIBUTING.md` worth the effort at current traffic (2 unique visitors)? Probably not yet — add when the first unsolicited PR arrives.
- Should the README's tone shift from "fork and run your own" to something more inviting of dashboard contributions specifically?
