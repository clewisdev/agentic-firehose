---
title: "Agentic Code Review"
url: https://addyo.substack.com/p/agentic-code-review
authors: [Addy Osmani]
captured: 2026-06-18
source_type: post
topics: [code-review, agent-architecture, evals, engineering-judgment]
tags: [code-quality, review-automation, incident-rates, productivity-measurement]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q3
---

## Summary

Addy Osmani argues that agentic code generation has fundamentally shifted the leverage point in software engineering from *writing* code to *reviewing* it. With agents producing code at machine speed, human review capacity has become the constraint—and the highest-leverage skill.

The piece is grounded in 2026 measurement data across multiple independent sources:

**Faros AI** (22,000 developers, 4,000 teams, March 2026): High AI adoption correlates with 4x more code shipped, but also:
- Code churn up 861%
- Incidents-to-PR ratio up 242.7%
- Per-developer defect rate: 9% → 54%
- Median review duration up 441.5%
- PRs merged with zero review up 31.3%

**CodeRabbit** (470 OSS PRs, Dec 2025): AI-coauthored changes carried 1.7x more issues—logic/correctness problems up ~75%, security issues 1.5–2x more common, readability problems tripled.

**GitClear** (2025 data): 4x raw code output = ~12% real productivity gain (after controlling for selection bias). "You are generating roughly four times the code for something like a tenth more delivered value, and a human still has to review all four times of it."

Osmani emphasizes that **good process did not protect mature teams**—volume arrived faster than process was designed to absorb. The critical insight: these are *predictable, measurable weaknesses* that can be targeted by disciplined review (human or automated).

### Contextual variability

Osmani explicitly rejects one-size-fits-all advice. Review needs depend on three variables:
1. **Blast radius**: side project vs. production with PII and SLA
2. **Code lifespan**: throwaway prototype vs. decade-old codebase
3. **Team size**: solo dev vs. distributed ownership

The same diff requires genuinely different review strategies depending on these constraints. Solo greenfield projects should "lean hard on tests and automation, review the parts that genuinely matter."

### Practical inversion

Osmani uses agentic tools (Claude Code, Codex) to triage incoming PRs on his own OSS projects—flipping the tool from *generator* to *filter*. This allows him to keep pace with volume, not by reading faster, but by letting agents pre-sort the queue.

## Verbatim quotes

> "The hard part of engineering moved from writing code to deciding whether to trust it, which makes review the most leveraged skill in software right now."

> "A developer vibe-coding a side project a dozen people will ever run, and a team keeping a ten-year-old enterprise system alive for another quarter, share almost no constraints worth naming."

> "The gap between 4x the code and a tenth more value is the review problem stated in one line."

> "We poured machine-speed output into a system built for human-speed work. The bottleneck did not disappear; it moved to verification, and review is where that bill comes due."

> "These are known, locatable weaknesses, which is good news: it means a review process, human or automated, can be aimed straight at them."

## Takeaways

- **Measurement now confirms anecdote**: AI adoption produces real throughput gains *and* real quality/review cost increases. The gap is the new bottleneck.
- **Review weakness is *predictable***: Logic errors, security issues, readability—these are systematically weaker in agent code and can be targeted by tooling or human practice.
- **Process scaling is hard**: Even disciplined teams get overwhelmed by volume. The constraint is absolute human reading speed, not organizational rigor.
- **Context determines strategy**: Solo dev with no users ≠ enterprise maintenance. Advice must be conditional on blast radius, code lifespan, and team size.
- **Inversion of tool use**: Using agents to *filter* PRs is as valuable as using them to *generate* code—re-establishes manageable review pace.

## Open questions

- What does disciplined agent-aware review process look like at enterprise scale? (e.g., automated checks for predicted weakness categories + human review on what passes)
- Can team size / codebase age be automatically detected from repo signals, allowing review policy to adapt?
- How do incident rates track *after* teams internalize these patterns—i.e., has anyone closed the loop?
- Does the 12% real productivity gain shrink further once review overhead is accounted for in developer time?
