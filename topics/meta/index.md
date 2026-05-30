---
title: "Meta — KB operations and self-observation"
written: 2026-05-30
updated: 2026-05-30
topics: [meta]
tags: [context-drift, instruction-accumulation, kb-operations, self-observation, user-derived]
---

# Meta

Observations about the KB itself — how it operates, what patterns emerge from running it, and what this project reveals about agentic systems in practice. Distinct from domain topics: this folder is for the KB as a living experiment, and for operational notes (author reputation, triage history) that support the capture process.

## Key ideas

### This KB as a live experiment

Most knowledge about agentic systems is theoretical or derived from other people's case studies. This KB has a structural advantage: it is itself an agentic system, accumulating real operational history in a dated git log. Observations about how it behaves over time — how instructions drift, how the capture format evolves, how the agent's behaviour shifts — are primary evidence, not secondary.

User-derived observations from running this KB have different epistemic status from external sources: they are grounded in direct experience with a specific, observable system. They are also inherently perishable — they describe what was true at a particular moment in this KB's history — so dating them precisely matters.

## Open threads

### Context drift

**The claim**: agentic systems accumulate behavioural drift over time as their instruction context grows, even when no single change is intended to alter behaviour.

**What drift looks like in practice** (initial observations from this KB, 2026-05-30):

- **Instruction accumulation** — `CLAUDE.md`, `AGENTS.md`, and skills files grow session by session. Older instructions are not automatically retired. When newer instructions conflict with older ones, the agent resolves the conflict quietly — typically by following whichever is most recently stated or most prominent, not necessarily the most correct.
- **Schema ossification** — the capture frontmatter format and topic index structure accumulate authority by familiarity. After enough use, the format feels canonical, which suppresses questioning whether it still fits the actual content needs.
- **Prompt caching as anchor** — in this KB the `AGENTS.md` file is prompt-cached in the Cloudflare Worker. The cached version of the norms is stickier than the live file: if `AGENTS.md` is updated, Worker invocations may continue using the cached version until the cache expires (~5 minutes). Cached context can lag live intent.
- **Cross-session compaction** — within a long session, earlier context gets compressed. The compressed representation may lose nuance that shaped earlier decisions. This is distinct from inter-session drift but compounds it.

**What makes this KB a useful test case**:
- Every capture has a date; the git log is an audit trail
- Instruction files (`AGENTS.md`, skills) are versioned
- The agent's output (capture files) is inspectable against the instructions that were in effect at the time
- Signal: if captures begin deviating from the template without explicit instruction change, that is observable drift

**What to watch for**:
- Capture format gradually diverging from `templates/source.md` without an explicit template update
- Topic index entries that no longer match the stated index structure
- Instructions in `AGENTS.md` that are no longer followed, without having been removed
- Synthesis that cites instructions rather than sources (the agent recalling norms as if they were evidence)

**Open questions**:
- At what instruction volume does drift become significant? Is there a rough line-count threshold?
- Does periodic AGENTS.md consolidation (removing redundant or outdated rules) measurably reduce drift, or does it just feel tidier?
- Is there a meaningful difference between drift in a single long session (compaction-driven) and drift across sessions (norm-accumulation-driven)?
- The Crosley rules-reliability finding (in `topics/prompting/index.md`) is related: if common `AGENTS.md` patterns produce no observable behaviour change, is what we call "drift" actually just noise around a baseline that was never as locked-in as assumed?

**Next step**: observe one full quarter of KB operation, then do a diff-based audit — compare actual capture files against the instructions that were current when each was written.
