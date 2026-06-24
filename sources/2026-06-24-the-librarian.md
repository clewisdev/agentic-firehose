---
title: "The Librarian — Intelligently Curated Context for AI Agents"
url: https://codeministry.net/the-librarian/
authors: [Jim Jafar]
captured: 2026-06-24
source_type: product
topics: [memory, agent-architecture, agentic-workflows, context-engineering]
tags: [context-curation, knowledge-base, multi-agent, markdown-vault, curator-agent]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

The Librarian is an open-source "Agentic OS" that functions as a context curator for AI agents. It solves a concrete problem: agents start each session blind and users must re-teach context, yet naive "remember everything" approaches create noise that degrades recall.

The system uses a curator agent to intelligently manage a markdown-based knowledge vault. Rather than passively storing all interactions, the curator actively decides whether to create new notes, fold information into existing documents, update stale content, or archive out-of-date material. Users can tune the curator's behaviour through plain-language standing instructions and review/approve low-confidence destructive actions.

Key architectural choices:
- **Single vault, multiple agents**: context built in one tool (Claude, Codex, etc.) is available to any other through a standardized command interface
- **Self-hosted, git-backed**: runs as a private server; all state is plain markdown in a repository — human-readable, versionable, with no vendor lock-in
- **Transparent curation**: every curator decision is logged with rationale; users can see diffs, restore to any point, and discuss individual memory decisions to refine future runs
- **Privacy mode**: can toggle off capture while retaining recall, with per-session granularity

The product includes a dashboard for browsing memories, reviewing curator proposals, managing handoffs between agents, and viewing vault analytics. It's free and open-source (Apache 2.0).

## Verbatim quotes

> "90% of Claude's mistakes come from missing context, not a weak model." — Andrej Karpathy

> "Capturing everything is easy and almost useless."

> "Context is the shape of how you work: your voice, the way you like to build, what you mean by finished, and the reasoning behind the projects you have already shipped. It is also never static."

> "When something new arrives, the curator reads what you already have and decides what to do: create a fresh note linked to neighbours, fold it into an existing document, or replace one that has gone out of date."

> "Everything it knows is plain markdown in a git repository, readable, editable and yours… There is no vendor lock-in and nothing is trapped in a database."

## Takeaways

- **Problem framing is strong**: correctly identifies that noise in memory hurts recall more than sparsity, and that context is not just facts but patterns of work/taste/standards
- **Curator-as-agent is a useful pattern**: using an AI model to manage another AI model's context, with human-in-the-loop proposal/review, avoids both fully-manual curation (unscalable) and fully-automatic (unpredictable)
- **Multi-agent context sharing is underexplored**: enabling context built in one tool to serve any other (via standardized commands and handoff protocol) directly addresses fragmentation in agentic workflows
- **Transparency and ownership matter**: logging curator decisions, allowing rollback, and storing state as readable markdown shifts the UX from "black box remembers things" to "you and the curator co-manage knowledge"
- **Git as the backing store is pragmatic**: eliminates export friction, enables version history, and allows hand-editing if the curator gets it wrong

## Open questions

- How does the curator handle conflicting or contradictory context? (e.g., "I used to like X but now I prefer Y")
- What are the actual failure modes in the deduplication/retirement logic when memories are semantically similar but not identical?
- How does performance scale with vault size? (mentions "disposable in-memory index" but no benchmarks given)
- Does the curator's "standing instructions" mechanism support iterative refinement through examples, or only prose guidance?
- How are handoffs claimed/conflicted if multiple agents try to claim the same in-progress work?
