---
title: "Open Knowledge Format (OKF): vendor-neutral standard for LLM context"
url: https://www.linkedin.com/posts/charlywargnier_andrej-karpathy-predicted-the-power-of-share-7471513240691429376-PeAt/
authors: [Charly Wargnier]
captured: 2025-06-13
source_type: post
topics: [memory, agentic-workflows, context-engineering]
tags: [okf, google, karpathy, knowledge-base, agent-reliability, maintenance]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2025-Q4
---

## Summary

Charly Wargnier announces Google's formalization of Open Knowledge Format (OKF), framed as a concrete instantiation of Andrej Karpathy's "LLM Wiki" concept. OKF is a minimally opinionated, vendor-neutral standard for structuring knowledge so agents can autonomously maintain it.

Core claim: traditional wikis fail because humans abandon maintenance; LLMs "don't get bored" and can batch-update cross-references across 15 files in a single pass. OKF removes tooling lock-in: human-readable documents live in version control, cross-links map relationships without a graph database, and format portability survives tool/org transitions.

Key design philosophy: no compression schemes, no central registry, cat-readable files, git-cloneable deployment.

**Commenter pushback is substantial.** Sanskar Awasthi notes the framing elides the hard problem: agents propagate errors consistently and at scale when they update based on incorrect beliefs. Roland Kiglics reports empirical observation that "LLMs do forget to update cross references." Hashim Warren questions why a standard was necessary at all. These are high-signal objections to the core value prop.

## Verbatim quotes

> "As Andrej Karpathy pointed out recently, LLMs don't get bored. They don't forget to update a cross-reference, and they can touch 15 files in a single pass."

> "This is how we stop rebuilding context pipelines from scratch every time a new model drops."

> "An agent can touch fifteen files in one pass, but it updates them to match whatever it currently believes, and if that belief is wrong the format just propagates the error faster and more consistently across the whole knowledge base." — Sanskar Awasthi

> "Humans abandoned wiki upkeep partly out of tedium, but partly because judging what is still true is hard, and that judgment does not disappear because the writer is tireless." — Sanskar Awasthi

## Takeaways

- **Format-first approach to agent autonomy**: OKF decouples knowledge structure from tooling, allowing agents to operate across repos/orgs without pipeline rewrites.
- **Maintenance automation as motivator**: the framing rests on LLM-driven maintenance being faster than human upkeep—but commenters report empirical failure modes.
- **Verification gap unaddressed**: the standard solves *how* to structure context for agents, not *how to verify correctness* when agents update it. This is where medium confidence applies—real-world viability depends on integrating validation.
- **Adoption uncertainty**: Rahul Baji notes MCP got traction because it was necessary (escaping chat-only bottleneck); unclear if OKF has similar forcing function.
- **Early-stage credential building**: Wargnier cites Karpathy and Google legitimacy; substantive criticism is already in-thread comments, not independent validation.

## Open questions

1. What does verification/validation look like in OKF workflows? Manual review gates? LLM-assisted diff summary? Test harnesses?
2. Have practitioners already tried version-control-native knowledge bases (this pattern predates the standard)? What broke?
3. How does OKF handle hallucination drift—does version history + diff enforcement catch cascading updates before they corrupt the KB?
4. Why didn't existing formats (Markdown in git, Obsidian vaults, Notion APIs) already solve this? What's the concrete blocker OKF removes?
