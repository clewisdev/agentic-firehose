---
title: "Refactoring ROI Measured in Future Token Costs"
url: https://www.linkedin.com/posts/dipanshurose_refactoring-used-to-be-an-argument-you-won-share-7512052558681681920-r6cc/
authors: [Dipanshu Rose]
captured: 2026-11-01
source_type: post
topics: [technical-debt, cost-management, context-engineering, engineering-judgment]
tags: [refactoring, rust, token-economics, modularity, code-quality]
signal_level: medium
status: raw
confidence: high
freshness_until: 2027-Q4
---

## Summary

Dipanshu Rose highlights an empirical investigation originally conducted by Giles Edwards-Alexander (published on Martin Fowler's site) exploring whether traditional code refactoring yields measurable financial and context efficiency benefits when using AI coding agents.

Historically, justifying technical debt remediation and refactoring to management has relied on subjective arguments around code aesthetics, developer cognitive load, and long-term agility. In this experiment, a massive 17,155-line Rust file was refactored and decomposed into modular components. The team then benchmarked a representative task executed by an AI coding agent before and after the refactoring, running the task in a clean agent session each time to avoid state carryover.

The empirical results showed a dramatic drop in context consumption: input tokens required to make the identical representative change fell from 159,564 to 27,360 tokens—an 83% reduction in ongoing token overhead for future modifications within that component.

However, Rose notes critical caveats in the methodology and execution:
1. **Human steering required:** The AI agent lacked the high-level judgment to determine which refactorings were worthwhile or structurally sound; substantial human direction was necessary to guide the decomposition.
2. **Unaccounted upfront cost:** The study did not record the token expenditure and engineering hours invested in executing the refactoring itself, making the overall net ROI calculation incomplete.

In the post's commentary, Martin Fowler clarified that the underlying experiment was conducted and authored by Giles Edwards-Alexander. Other commentators noted that this provides quantitative ammunition against the fallacy that "code maintainability no longer matters because LLMs do the reading," demonstrating that modular, well-structured architectures directly lower context window consumption, latency, and operational inference costs.

## Verbatim Quotes

> "Refactoring used to be an argument you won on taste and experience. Martin Fowler took a 17,155 line Rust file, decomposed it, then measured something simple: what does the same representative change cost in tokens before and after."

> "At the end, to do the same task on the same code (old vs refactored), input tokens fell from 159,564 to 27,360! That's 83% off on the cost for every future change in that part of the codebase."

> "Though the model couldn't decide which changes were worth doing without a human guiding it. And they never measured the token cost of the refactoring itself, which is the number you'd need to call it a net win. Still, its the first time I've seen the maintenance argument turned into a figure you can put in front of someone who doesn't care about code structure and organization."

> "Actually it was Giles Edwards-Alexander who did that work and wrote that article. I'm just the publisher." — Martin Fowler

## Takeaways

- **Refactoring directly cuts context overhead:** Decomposing monolithic files (e.g., a 17k-line Rust file) into cohesive modules dropped prompt/input tokens by 83% for downstream agent modifications.
- **New metric for technical debt:** Quantifying token usage before and after refactoring provides a concrete financial ROI metric that can justify technical debt remediation to non-technical stakeholders.
- **Agents cannot autonomously prioritize refactoring:** LLM agents currently struggle to identify high-leverage architectural refactorings without human guidance.
- **Net ROI remains unmeasured:** Evaluating whether a refactoring pays off requires factoring in the token and human labor costs of performing the decomposition against the expected frequency of future edits.

## Open Questions

- What is the break-even threshold (number of subsequent agent tasks) before upfront refactoring costs are amortized?
- Does modularization produce comparable percentage token reductions across languages with less strict type systems than Rust?
- How much does token reduction correlate with agent task success rates (evaluating whether fewer tokens also led to fewer hallucinations and failed tool calls)?
