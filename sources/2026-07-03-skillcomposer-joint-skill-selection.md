---
title: "SkillComposer: Joint Skill Selection and Ordering for Coding Agents"
url: https://www.linkedin.com/posts/brennhill_good-paper-and-not-surprising-if-you-know-share-7478474449449713664-ux3C/
authors: [Elvis S., Brenn Hill]
captured: 2026-07-03
source_type: post
topics: [tool-use, agent-architecture, code-generation]
tags: [skill-selection, skill-composition, constrained-decoding, code-agents, skill-retrieval]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

LinkedIn post by Brenn Hill sharing a paper on SkillComposer, a method for jointly optimising skill selection, quantity, and ordering in coding agents. The core insight is that skill composition should be treated as a single joint decision rather than independent retrieval steps.

**Key mechanism**: A constrained autoregressive decoder over skill identifiers produces the full skill plan in a single forward pass. This allows dependencies between successive skills to emerge naturally—a critical point often missed by independent retrieval approaches.

**Empirical results** (on SkillsBench):
- GPT-5.2-Codex: +23.1 percentage points pass rate lift over baseline (no-skill)
- Gemini-3-Pro-Preview: +18.2 percentage points lift
- Beats top-3 retrieval strategies
- Matches oracle (gold-skill) upper bound at lower prompt-token cost

**Problem framing**: Skill libraries for coding agents are growing, and *choosing which skills to expose* has become a bottleneck. Prior approaches either expose the entire collection (prohibitive context) or use embeddings + rerankers to retrieve independently. Neither captures the fact that skill use is often sequential and interdependent.

**Why it works**: By treating the full sequence as a single constrained decoding problem, the model can learn which skills enable or precede others—and in what order. The single-pass generation also reduces token overhead compared to multi-step retrieval + composition pipelines.

## Verbatim quote

> "Skill libraries keep growing, and picking the right skills has become a bottleneck for coding agents. The defaults are to expose the agent to the whole skill collection, or retrieve skills with embeddings and rerankers. Both treat the choice as independent picks. SkillComposer treats composition as one joint decision over which skills, how many, and in what order."

## Takeaways

- **Skill composition is inherently sequential**: treating it as independent retrieval leaves performance on the table; joint optimization is more sample/token efficient.
- **Constrained decoding scales**: a single autoregressive pass over skill identifiers is faster and cheaper than multi-turn retrieval+ranking loops.
- **Significant empirical wins**: 18–23pp lift over no-skill baseline, and cost-competitiveness with oracle selection suggests the method is learning real dependencies, not just memorizing the skill set.
- **Practical bottleneck addressed**: as agent skill libraries grow (multi-hundred or multi-thousand tools), intelligent composition becomes essential; this is not a research-only problem.

## Open questions

- How does performance degrade as the skill library size grows beyond typical SkillsBench scales? Is there a point where even joint decoding becomes intractable?
- Does the method work for skills with complex preconditions or mutual exclusivity constraints, or is it optimised for linear ordering?
- How sensitive is the approach to the training data distribution of skill sequences? Can it generalise to novel orderings unseen in training?
