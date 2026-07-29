---
title: "How to avoid knowledge decay in software engineering"
url: https://leaddev.com/ai/how-to-avoid-knowledge-decay-in-software-engineering
authors: [Bill Doerrfeld]
captured: 2026-07-29
source_type: blog
topics: [memory, agentic-workflows, enterprise-deployment, engineering-judgment]
tags: [knowledge-retention, legacy-modernization, documentation, ai-agents, context-preservation]
signal_level: medium
status: raw
confidence: high
freshness_until: 2027-Q3
---

## Summary

This LeadDev article by Bill Doerrfeld interviews Neel Sundaresan (GM of Automation & AI at IBM Software, former Copilot engineer) on knowledge decay in software engineering—the structural loss of context when personnel leave or fast CI/CD cycles eliminate documentation pressure.

Sundaresan frames knowledge decay as a **structural problem**: 60–65% of engineering work is modernization and maintenance rather than new code, yet institutional knowledge often lives in individual heads. When experts depart, teams face significant rework and duplication. He cites concrete examples:

- IBM's 30-year-old Java and COBOL workloads lack original architects and architectural reasoning
- eBay's high engineer mobility forced consultants to redo work rather than understand prior implementations
- 75% of production APIs in a 2024 study don't match their specification files (APIContext)
- Azure CLIs have 1,500+ commands; new versions add parameters without updating docs

**The AI solution Sundaresan proposes**: Rather than documenting code itself, capture **reasoning and constraints**—the prompts, rules, tools, architectural choices, and templates that guided development. IBM's Bob agent can preserve these as "artifacts" (README, architectural diagrams, tool-calling strategy) in repositories and feed them back to future agents, avoiding re-learning.

Key tension: context windows are growing, but studies show AI coding is *increasing* duplication and reducing reuse—suggesting deliberate knowledge-retention strategies are needed alongside agent pipelines.

## Verbatim quotes

> "Almost nobody ever plans for having to leave, but everybody does." — Neel Sundaresan

> "Your artifact is not code anymore. Your artifact is the prompts I write, the rules I make, the modes I create, the tools I use." — Sundaresan on knowledge retention via agent context

> "You can get 99% right, but then the 1% that you get wrong can appear as a huge time sink." — On the cost of missing architectural context

> "Only 15% to 20% of code is newly written, while 60% to 65% involves modernization, migration, and maintenance." — Sundaresan's work distribution estimate

## Takeaways

- **Structural problem**: Knowledge decay isn't a culture issue—it's baked into fast CI/CD cycles and personnel mobility. Documentation becomes second-class artifact under delivery pressure.
- **Reasoning > code**: The real loss is *why* architectural choices were made, not the code itself. Legacy modernization requires that context, especially when moving between languages or paradigms.
- **Agent-as-artifact**: AI agents can preserve decision context (prompts, rules, templates, tool choices) as first-class artifacts in repositories, distributed to future developers and agents.
- **Unresolved tension**: Early data shows AI coding increases duplication and reduces legacy refactoring—suggesting teams need *explicit* knowledge-retention discipline, not just agent capability.
- **API-spec mismatch**: Fast release cycles outpace documentation updates (75% of production APIs out of sync); agents could help keep specs current.

## Open questions

- How do teams avoid agent-generated artifacts becoming as stale as traditional docs? Is agent-driven artifact refresh part of the solution?
- What's the empirical breakdown of rework caused by missing architectural reasoning vs. missing code-level documentation?
- How should teams balance rich context artifacts (high verbosity, model cost) with context-window constraints as they scale?
- Does agent artifact preservation actually reduce duplication, or does it just relocate the problem to prompt engineering?
