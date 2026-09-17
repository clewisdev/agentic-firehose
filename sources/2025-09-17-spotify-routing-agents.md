---
title: "Spotify cut their Claude Code token bill by 90% through agent routing"
url: https://www.linkedin.com/posts/basiakubicka_spotify-cut-their-claude-code-token-bill-share-7506134359800971264-iJ4S/
authors: [Basia Kubicka]
captured: 2025-09-17
source_type: post
topics: [cost-management, agent-architecture, tool-use]
tags: [routing, model-dispatch, token-optimization, claude, gemini]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2025-Q4
---

## Summary

Basia Kubicka reports on Spotify Engineering's approach to reducing Claude token costs by 90% through architectural routing rather than model selection. The core insight: most coding agent work is I/O-bound busywork (file reads, boilerplate generation) rather than reasoning, and routing this work to cheaper models while preserving frontier models for judgment-heavy tasks dramatically reduces spend.

**Key technical findings:**

1. **Problem diagnosis**: Agents spend most tokens on repetitive I/O—reading multiple files to answer single questions, generating near-identical boilerplate test files, config stubs—tasks that require no reasoning.

2. **Two-tier routing architecture**: Cheap worker model (Gemini 2.5 Flash) handles file reads and boilerplate writes via two focused "modes." Expensive model (Claude) reserved for problems requiring judgment. Claude never sees raw files it would pay to read.

3. **Enforcement > suggestion**: Initial approach used config-based routing rules—Claude read them and ignored them. Working solution: plugin-based hook that blocks expensive reads *before* they execute. Making violations impossible outperforms suggesting best practices.

4. **Hard boundary**: Routing cannot handle editing, debugging, or architecture decisions. A cheap model missed a subtle thread-safety bug; frontier model caught it in seconds. The strategy works precisely because it accepts this limitation.

## Verbatim quotes

> "Most of your token bill is grunt work, not intelligence. File reads, boilerplate tests, config stubs, doc updates. The busywork, not the hard calls (zero reasoning is needed)."

> "The fix is routing, not a smarter model. Send the grunt work to a cheap worker model. Keep the expensive one for problems that need it."

> "Suggesting the rule doesn't work. Enforcing it does... Claude read them, then ignored them. The version that works is a plugin that blocks the expensive read with a hook, before it can happen."

## Takeaways

- **Cost optimization is an architectural problem**: Token bills are dominated by low-reasoning work; model choice is secondary to task routing.
- **Enforcement mechanisms matter**: Config-based rules fail when the model can read and override them; pre-execution hooks enforce hard boundaries.
- **Cheap models are fit-for-purpose**: Gemini 2.5 Flash sufficient for I/O and boilerplate; frontier models needed only for judgment, debugging, architecture.
- **Boundaries are real**: Thread-safety bug case shows cheap models genuinely miss subtle issues; don't route beyond capability envelope.
- **Referenced work**: Spotify Eng blog and open-source plugins linked (not fetched; content derived from post).

## Open questions

- How do teams identify the boundary between "routine I/O" and "judgment work" reliably as codebases evolve? (Comment by Abdullah M. flags this: what was boilerplate last month may contain real bugs now.)
- Does the two-mode architecture scale to larger agentic workflows, or does it break down with more complex task interdependencies?
- How sensitive is the cost/quality tradeoff to the choice of cheap model? (Sayed Bin Habib in comments claims 90% savings with DeepSeek V4.1 Flash.)
