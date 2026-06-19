---
title: "AI adoption is being measured wrong"
url: https://www.linkedin.com/posts/troymagennis_here-is-my-open-letter-to-the-leaders-and-ugcPost-7473515403508412418-7Jy1/
authors: [Troy Magennis]
captured: 2026-06-19
source_type: post
topics: [evals, engineering-judgment, product-strategy]
tags: [ai-metrics, developer-productivity, measurement, dora]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Troy Magennis posts an open letter criticizing how AI engineering performance is currently being measured by tools, vendors, and organizational leaders. The core argument: AI adoption metrics are fundamentally misaligned with actual value delivery.

Key insight from the comments thread: the measurement industry is doubling down on failed theories now being "exposed more spectacularly" by AI's introduction. Magennis highlights that productivity has changed shape — more code, more risk, more uncertainty — but traditional DORA-era frameworks don't capture outcomes.

The post frames measurement as a choice problem: "AI offers choice and choice is only as valuable as the reasoning behind the choice." This suggests the real metric should track whether teams are *learning what works, what breaks, and what creates risk* — not raw throughput.

Responses indicate practitioners agree the measurement discipline is broken. Krishna Kumar notes the industry won't self-correct because existing players have sunk billions into promoting approaches that "simply don't work." Cortex's response points toward alternative frameworks (DRIVE) that measure organizational delivery quality rather than individual dev productivity.

## Key quotes

> "Real adoption is when the organization learns what works, what breaks, and what creates risk. We should track whether work reaches customers, whether incidents go up or down, how fast value appears, and if teams apply lessons to the next project." — Andrei Cioroianu

> "The flow or DORA rationale was always broken but not fatal. That's also changing." — Matt Gunter

> "Too many people have invested in failed theories of measurement that are now flaming out even more spectacularly with AI." — Krishna Kumar

## Takeaways

- **Measurement mismatch**: Traditional dev metrics (DORA, lines of code, velocity) don't account for AI-era risks (hallucination, code review bottlenecks, incident spike) or discovery work
- **Industry dysfunction**: Entrenched vendors have incentives to preserve broken metrics rather than measure what matters (customer delivery, risk, organizational learning)
- **Missing feedback loops**: Current tools don't connect AI activity to business outcomes or safety; teams can't learn from failures systematically
- **Outcome-first framing needed**: Success should be measured as organizational ability to deliver quality + teams applying lessons across projects, not code volume
- **Choice as a metric proxy**: The real leverage is whether teams are making *reasoned* decisions about AI use, not whether they use it more

## Open questions

- What would a measurement framework look like that captures learning velocity (how fast teams discover what works) rather than coding velocity?
- How do you instrument organizational learning (lessons applied to next project) at scale?
- Are there early attempts at connecting AI activity to incident metrics or customer impact?
- Why haven't DORA critiques gained more traction before AI forced the issue?
