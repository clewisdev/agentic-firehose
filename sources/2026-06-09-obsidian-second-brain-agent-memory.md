---
title: "Obsidian-Second-Brain: Agentic Memory via Vault Mutation"
url: https://www.linkedin.com/posts/hoang-van-hao_andrej-karpathy-gave-us-the-llm-wiki-drop-share-7467181898679857152-auBO/
authors: [Hao Hoang, Eugeniu Ghelbur]
captured: 2026-06-09
source_type: post
topics: [memory, tool-use]
tags: [obsidian, claude, agent-architecture, bi-temporal-tracking]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q4
---

## Summary

Hao Hoang presents obsidian-second-brain, a tool that turns Obsidian vaults into writable agent memory by inverting the traditional append-only note-taking model. Rather than adding new pages for each new source (Karpathy's original LLM Wiki pattern), this system *rewrites existing pages* when new information arrives, using Claude, Codex, or Gemini as the reconciliation agent.

Core affordances:
- **Mutation over append**: Ingesting one URL/PDF/audio updates 5–15 existing pages via agent reconciliation, not a 16th summary
- **Contradiction detection**: `/obsidian-reconcile` identifies logical conflicts across notes and resolves them automatically
- **Bi-temporal tracking**: Records both *when a fact was true* and *when the vault learned it*, creating an audit trail for belief changes
- **Scheduled agents**: Four background processes (nightly reconcile, weekly review, contradiction sweep, health check) maintain vault hygiene
- **Challenge mode**: `/obsidian-challenge` retrieves past contradictions in your own history to argue against your next decision

## Key framing

> "The core move isn't taking notes. It's mutation."

> "Most second-brain tools make you the janitor. You file, you tag, you re-read, you connect the dots. This inverts it — you think, Claude maintains the memory, then uses that memory to make you think better."

The post contrasts two layers: append-only capture (fast, dumb, doesn't require deciding which notes a half-formed thought should mutate) and downstream reconciliation (where agents earn their keep by maintaining consistency).

## Critical tension in comments

Multiple practitioners raise the audit-trail problem: when agents overwrite, how does the messy first draft of an idea survive? One iOS developer building a capture app notes that append-only makes sense at ingestion time (you can't decide in 2 seconds which five pages to rewrite), but the bi-temporal tracking is what makes the overwrites trustworthy—otherwise you're "one bad reconcile away from losing a note you needed."

One user (Satya Chamana) reports positive experience: "Self-rewriting memory is the real unlock. I run it daily to keep my vault growing and to get the most out of fine-tuned inference from my own perspective."

## Takeaways

- **Agent as memory custodian, not search backend**: The framing shifts from RAG (retrieve what you wrote) to *active reconciliation* (agent ensures your notes don't contradict themselves).
- **Append vs. mutate is a false binary**: Capture layer stays append-only (low friction); reconciliation layer rewrites (high consistency). Different operators, different constraints.
- **Bi-temporal tracking is not optional**: Without audit trails, vault mutations become irreversible and unauditable. The comments suggest this is the load-bearing assumption of the entire model.
- **Graveyard problem is widely felt**: 1.6k stars in one week on a GitHub project suggests many practitioners experience the Karpathy append-only pattern as unmaintainable at scale.
- **Contradiction as a feature, not a bug**: The idea of agents actively searching your history to argue against your next decision inverts the traditional "consistency = good" frame into "productive disagreement via memory".

## Open questions

- How does bi-temporal tracking perform when a fact genuinely *changed in the world* (not just your understanding)? Can the system distinguish "I was wrong" from "the domain shifted"?
- What is the failure mode when agents recursively reconcile? Does the system stabilize or does it drift?
- How do users maintain veto power over agent mutations? Is there a formal approval gate, or does the audit trail serve as async accountability?
- Does this pattern scale beyond personal vaults to team memory (multi-writer, multi-agent reconciliation)?
