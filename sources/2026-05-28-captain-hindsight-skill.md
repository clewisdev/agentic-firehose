---
title: "Captain Hindsight: Opt-in Implementation Retro Skill"
url: internal://skill-issue/skills/captain-hindsight
authors: [an internal enterprise team / skill-issue contributors]
captured: 2026-05-28
source_type: repo
topics: [skills, cost-management, harnesses]
tags: [captain-hindsight, retro, token-efficiency, skills, friction, process-improvement]
signal_level: high
status: summarized
confidence: high
freshness_until: evergreen
---

# Captain Hindsight

*Source: shared via captainhindsight.zip. Internal an internal enterprise team Bitbucket. Companion to the wider [`skill-issue`](https://bitbucket.internal/projects/ORANGE/repos/skill-issue) catalog.*

An opt-in post-implementation retrospective skill. Goal: **turn observed friction into concrete tracked artefacts (rules, skills, scripts, docs, tests) that lower token cost or raise quality on the next run.** Only fires when the user explicitly invokes it.

## SKILL.md — key design decisions

```yaml
name: captain-hindsight
description: Opt-in implementation retro that turns observed friction into concrete tracked
  artifacts such as rules, skills, scripts, docs, or tests. Use only when the user invokes
  it ("captain hindsight" or "/captain-hindsight"). Not for trivial tasks.
disable-model-invocation: true
```

**`disable-model-invocation: true`** — the skill does not autonomously invoke the model. It fires only when the user types `captain hindsight` or `/captain-hindsight`. This is the right design for a retro: you don't want it running after every trivial task; you invoke it when the session felt expensive or error-prone.

## When it runs (and when it skips)

Skips and tells the user "nothing worth a retro" if **all** of these are true:
- Fewer than ~5 tool calls were needed
- No failed tool calls, no user corrections, no scope changes mid-task
- No surprise during implementation ("I expected X, got Y")

If none of those conditions are met, it proceeds. The skip condition is important: it prevents retro theater on simple tasks.

## The five friction categories

The skill looks back at the session and identifies at most **5** friction points, classified as exactly one of:

| Category | What it catches |
|----------|----------------|
| **Token burn** | Re-reading the same file; blind exploration; redoing a search |
| **Quality miss** | A bug that existing tests/rules/skills would have caught if updated |
| **Tool gap** | A missing script, MCP tool, or skill that would have shortened the task |
| **Rule/skill miss** | An existing rule/skill not loaded when it should have been, or whose guidance was wrong/stale |
| **Process miss** | A workflow step skipped or done in the wrong order (branching, tests, docs, changelog) |

## Output format

Each friction point → one line in the format:

```
friction (one line) -> classification -> concrete proposal (file path) -> expected payoff
```

Example:
```
1. Re-read topic index 3 times to check existing sources ->
   Token burn ->
   Add memory rule: .cursor/rules/check-index-first.mdc ->
   Saves ~2 file reads per capture session
```

No narrative, no preamble, no praise. Then a closing block:

```
Recommended to implement now: #1, #3. Defer: #2. Discard the rest.
```

With one line per pick explaining why it's highest leverage. Terse.

**Hard cap: 5 entries.** If more than 5 friction points exist, pick the 5 highest-leverage and drop the rest.

## What it does NOT do

- Does not implement proposals unless the user explicitly says "go" / "implement N"
- Does not pad the list to hit 5 entries — if everything is Discard, it says so in one line
- Does not propose duplicates of existing rules/skills/scripts (checks first)
- Keeps proposals small and directly tied to observed friction — not ceremony for ceremony's sake

## The compound effect

The key insight: each retro's proposals lower the cost of future sessions, which means future sessions are less likely to need a retro, which means the retro payback compounds over time. The skill is self-limiting in a good way.

Concretely for this KB: a captain-hindsight run after a complex multi-source capture session might produce:
1. A rule to check `sources/` for duplicate URLs before fetching
2. A process note in AGENTS.md about which topic indexes need updating for a new harnesses capture
3. A script to count AGENTS.md token length and warn when it exceeds a threshold

Each of those reduces token burn on the next run.

## Relationship to caveman and cost management

| Technique | Mechanism | When it applies |
|-----------|----------|----------------|
| **Caveman** | Compresses model output tokens at runtime | During the session |
| **Per-tool output caps** (caveman-code) | Preprocesses tool responses before the model sees them | During the session |
| **Captain Hindsight** | Reduces round-trips by making future sessions more deterministic | After the session |
| **Prompt caching** | Caches static prefix across calls | Across sessions |

These are complementary, not competing. Caveman reduces output cost per response; captain-hindsight reduces the number of responses needed; prompt caching reduces the input cost of the static context.

## Application to this KB

Captain-hindsight is directly applicable here. Run it after any session where:
- A bulk capture batch involved re-reading the same topic index multiple times
- A triage decision required fetching a URL that turned out to be clearly in scope for an existing rule (a rule miss)
- A synthesis write-up required rereading sources that could have been pre-loaded

The skill's output format (concrete file path + expected payoff) maps perfectly onto either a new AGENTS.md section, a new rule, or a new skill. It converts session friction into durable KB improvements.

**To invoke:** At the end of a session, type `captain hindsight` or `/captain-hindsight`.

## Note on the wider skill-issue catalog

The an internal enterprise team `skill-issue` repo contains 15 skills and 1 rule beyond captain-hindsight. Two are potentially relevant to this KB and flagged for follow-up:

- **`knowledge-base-wiki`** — "Build and maintain a personal LLM-powered knowledge base rooted at `~/knowledge-base`." Directly related to this project's architecture. See if it contains patterns applicable here.
- **`measure-twice-cut-once`** (rule) — plan deliberately, use grill-me style questions, hand off implementation with model/skill guidance. Already captured conceptually; the `.mdc` rule file itself may have implementation detail worth capturing.

## Related

- `sources/2026-05-28-internal-teams-snippet.md` — the Teams conversation where captain-hindsight was described
- `sources/2026-05-28-brussee-caveman-code.md` — complementary runtime compression technique
- `sources/2026-05-28-anthropic-prompt-caching.md` — complementary cross-session cost technique
- `topics/cost-management/index.md`
