---
title: "Napkin Math as a Product Strategy Tool: Building 10x Cheaper/Faster Products"
url: https://www.linkedin.com/posts/gergelyorosz_how-can-you-build-a-product-that-is-10x-cheaper-share-7485427048568610816-bsUo/
authors: [Gergely Orosz, Simon Hørup Eskildsen]
captured: 2026-07-25
source_type: post
topics: [product-strategy, engineering-judgment]
tags: [napkin-math, cost-optimization, estimation, turbopuffer]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Gergely Orosz shares an interview with Simon Hørup Eskildsen (cofounder/CEO of TurboBuffer) about using "napkin math" — quick, rough-order-of-magnitude calculations — as a core product strategy tool to identify and build offerings that are 10x cheaper or 10x faster than existing solutions.

The core insight is that napkin math serves as a **reality filter**: quantitative sanity-checking done on a whiteboard or paper before committing to engineering effort. Rather than relying on vendor claims or abstract goals, practitioners sketch out latency curves, throughput calculations, or cost breakdowns to determine whether a claimed improvement is physically possible or merely marketing.

The comments reveal napkin math's practical value in engineering leadership and decision-making:

- **Reality testing in vendor conversations**: As Petar Minev notes, a latency table clarifies in 30 seconds whether a pitch is "physics or marketing."
- **Build-vs-buy decisions**: Rough calculations prevent bad tooling decisions before they become roadmap commitments.
- **Pressure-testing deadlines**: Kirill Samorodov observes that napkin math exposes whether a "10x faster" claim or "2-week sprint" estimate reflects real constraints or wishful thinking.
- **A leadership signal**: Engineers who reach for napkin math instinctively are flagged for judgment and systems thinking, not just technical knowledge.

The practice appears rooted in established computer science foundations (referenced in comments: Jeff Dean's latency numbers and Peter Norvig's "Numbers Every Programmer Should Know"), but its application to product strategy and cost modeling is presented as a deliberate discipline for founders.

## Takeaways

- Napkin math is a **decision gate**: rough estimates surface whether an ambitious goal (10x cheaper, 10x faster) is feasible *before* engineering commitment.
- It's a **leadership indicator**: reaching for back-of-envelope calculation signals judgment and systems thinking, not just domain knowledge.
- It works across contexts: vendor evaluation, delivery commitment pressure-testing, and product cost/latency strategy.
- The practice is teachable but requires cultivating instinct — practitioners who use it routinely tend to avoid order-of-magnitude estimate mistakes in sprints.
- Grounding product claims in physics (throughput, latency, cost floors) is a gating heuristic against marketing bullshit.

## Open Questions

- What makes napkin math teachable vs. innate? Petar Minev's question suggests this is open in practice.
- How does napkin math integrate with more formal estimation (story points, planning poker)? Is it a pre-gate, parallel discipline, or replacement?
- Beyond latency/throughput tables, what other napkin-math templates exist for evaluating AI product claims (e.g., inference cost, token efficiency)?
- How does this apply to agentic systems where feedback loops and action branching complicate simple latency models?
