---
title: "agentic-firehose as a context drift case study"
status: planning
created: 2026-06-01
---

# agentic-firehose as a context drift case study

## The opportunity

agentic-firehose is itself an agentic system with a dated git log, versioned instruction file (AGENTS.md), and observable output (the captures, indexes, and synthesis files). Most writing on context drift is theoretical or anecdotal. This KB is primary evidence — not a retelling of someone else's experience.

The `topics/meta/index.md` already contains initial observations (instruction accumulation, compaction-driven intra-session drift, norm-accumulation across sessions). The goal of this plan is to formalise those observations into a shareable write-up.

## Hypothesis

Instruction context in agentic systems drifts over time even when no single change is intended to alter behaviour. The mechanism is accumulation: each added rule is individually reasonable, but the aggregate changes what the agent prioritises, what it treats as implicit, and what it ignores. This is distinct from model hallucination and distinct from deliberate instruction changes.

## Evidence available in this repo

- **AGENTS.md history** — git log shows when rules were added, amended, or consolidated. Can trace specific additions back to sessions that triggered them.
- **Capture quality over time** — compare early captures against recent ones: format adherence, signal-level judgements, brevity vs verbosity.
- **Captain Hindsight artifacts** — the `/captain-hindsight` skill was introduced specifically to surface this class of friction. Its outputs are a direct record of observed drift.
- **CAPTURE_SYSTEM divergence incident** — the Worker's `CAPTURE_SYSTEM` prompt and `AGENTS.md` drifted apart after the Haiku migration. A concrete, dateable example of drift going undetected.
- **Compaction events** — long sessions where context was compressed mid-session; observable in session handoff docs.

## Write-up structure (draft)

1. What context drift is and why it matters (brief — the KB audience knows the problem space)
2. This KB as a self-study: the setup and why it's valid as primary evidence
3. Observed mechanisms:
   - Norm accumulation in AGENTS.md
   - Cross-component drift (AGENTS.md vs CAPTURE_SYSTEM)
   - Intra-session compaction
4. Observable symptoms and detection methods (what we actually saw)
5. Mitigations tried: Captain Hindsight retro, explicit sync rules, periodic consolidation
6. Open questions (from `topics/meta/index.md`)

## Format

Likely a synthesis file (`synthesis/context-drift-case-study.md`) rather than a separate publication. Can be extracted later if it's worth sharing externally.

## Prerequisites

- Read through git log of AGENTS.md changes to reconstruct the accumulation timeline
- Pull the Captain Hindsight output artifacts together
- Reference the CAPTURE_SYSTEM divergence commit explicitly

## Status

Not started. No blocking dependencies.
