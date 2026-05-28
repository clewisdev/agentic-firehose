---
title: "Regnology Teams Conversation: captain-hindsight, caveman, model routing"
url: internal-teams-snippet
authors: [Various Regnology colleagues]
captured: 2026-05-28
source_type: thread
topics: [harnesses, cost-management]
tags: [captain-hindsight, caveman, model-routing, token-efficiency, skills, multi-model]
status: summarized
confidence: medium
freshness_until: 2026-Q4
---

# Regnology Teams Snippet: Skills and Model Routing Practices

Internal Microsoft Teams conversation from a practitioner community (Regnology). Contains first-hand accounts of skill and model usage patterns in production. **Internal Bitbucket links are inaccessible** (`bitbucket.regnology.net`) — content below is based on visible conversation text and a screenshot.

## Visible content and signal

### captain-hindsight skill

Described by a colleague:

> "captain-hindsight reduces tokens by introducing better scripts & skills to do stuff deterministically and have less round-trips with the LLM"

The skill is a post-session optimization tool: after a Claude session completes, captain-hindsight analyzes the session and recommends changes to scripts and skills that would have achieved the same outcome with fewer LLM round-trips. It improves token efficiency by making future interactions more deterministic.

This is the inverse of the caveman approach: instead of compressing outputs (runtime), captain-hindsight optimizes the *process* (eliminating unnecessary steps before the next session runs).

Referenced path: `bitbucket.regnology.net/projects/ORANGE/repos/skill-issue/browse/skills/captain-hindsight` — inaccessible.

### measure-twice-cut-once rule

Referenced as a companion to captain-hindsight and the `/grill-me` skill: a rule (`.mdc` format) used before implementation begins. The pattern:

1. Use `/grill-me` to run Socratic design review (Opus 4.7 recommended for this)
2. Apply `measure-twice-cut-once.mdc` rule to validate plan before coding starts

Path: `bitbucket.regnology.net/.../rules/measure-twice-cut-once.mdc` — inaccessible.

### Model routing practices (first-person account)

One colleague's current best practice for model selection:

| Task type | Model |
|-----------|-------|
| Planning / design (with /grill-me) | Opus 4.7 |
| Simple implementation | Composer 2.5 |
| Complex / larger scopes | GPT-5.5 |
| Creative UI work | Opus 4.7 |
| Documentation | GPT-5.5 |

> "Composer 2.5 seems best bang for the buck by far right now tho."

This is a concrete multi-model orchestration strategy based on task type, as of 2026-05-27. **Freshness caveat**: model landscape changes fast; treat this as a snapshot, not a durable recommendation.

### caveman skill in the screenshot

A "Team spotlight" screenshot shared in the conversation recommends two Matt Pocock / Julius Brussee skills to the team:

- **caveman** (`third-party/mattpocock-skills/skills/productivity/caveman/`) — "Token diet, zero dumb-down. Ultra-compressed replies: drop filler, articles, and pleasantries; keep exact technical terms and code. Stays on until you say stop. Has guardrails for security warnings, irreversible ops, and confusing multi-step bits so you do not trade brevity for safety."
- **grill-me** (`third-party/mattpocock-skills/skills/productivity/grill-me/`) — "Socratic design review. The agent interviews you one question at a time, walks the full decision tree, and resolves dependencies between choices—with a recommended answer each time. If the answer lives in the repo, it reads the code instead of guessing."

Both described as "short, sharp SKILL.md files: easy to adopt, hard to outgrow."

## Takeaways

- **captain-hindsight is a novel pattern**: post-session retrospective that makes future sessions cheaper by improving tooling rather than compressing outputs. This is complementary to caveman (runtime compression) and file-read deduplication (session caching).
- **Model routing by task type is a real production practice**, not a theoretical concern. The Regnology pattern (Opus for planning/UI, cheaper models for implementation/docs) is a concrete template to consider.
- **"Easy to adopt, hard to outgrow"** is the right framing for skills. A skill should be a force multiplier that doesn't become obsolete as the user's sophistication grows.
- **The caveman skill guardrails design** is worth noting: brevity is not applied to security warnings, irreversible operations, or confusing multi-step sequences. This is how you apply cost optimization without compromising safety-critical communication.

## Open questions

- Is captain-hindsight publicly available anywhere outside the Regnology Bitbucket? The concept is generalizable; the implementation might be.
- How does the Regnology model routing hold up with model updates? GPT-5.5 as preferred for "complex bigger scopes" is a claim about relative model capability that ages quickly.

## Related

- `sources/2026-05-28-brussee-caveman-code.md` — full caveman-code benchmark
- `sources/2026-05-20-pocock-skills.md` — Matt Pocock's skills framework
- `topics/cost-management/index.md`
- `topics/harnesses/index.md`
