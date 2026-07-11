---
title: "Lean Software Production"
url: https://mattwynne.net/lean-software-production
authors: [Matt Wynne]
captured: 2026-07-11
source_type: blog
topics: [agentic-workflows, agent-architecture, engineering-judgment, system-design]
tags: [lean-manufacturing, extreme-programming, dark-factory, harness-engineering, kaizen, jidoka, code-generation, testing]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Matt Wynne proposes "Lean Software Production" as a framework for managing AI-accelerated software development, combining three elements: **Lean** (manufacturing principles of continuous improvement and defect prevention), **Software** (Extreme Programming disciplines), and **Production** (agentic orchestration / dark factory patterns).

Wynne argues that as LLMs generate code at scale, the old approach of "burn it and scrape it" (generate code, inspect quality in code review) fails. Instead, teams should adopt kaizen and jidoka — designing systems that prevent defects upstream rather than catching them downstream. Key lean concepts he revives:

- **Pull-based flow** (Theory of Constraints, JIT production, MVP)
- **Building quality in** rather than inspecting it in
- **System thinking**: when agents make mistakes, improve the *context and instructions* they receive, not blame the model

For Extreme Programming, Wynne reframes XP practices not as craft techniques but as "industrial safety equipment" for high-volume LLM-generated code: pervasive automated testing, continuous integration, relentless refactoring, and pairing on architectural decisions. He notes these are now *cheaper* to implement (agents can run test suites, mutation testing, code review loops) and *more necessary* than ever.

Wynne references Justin McCarthy's "dark factory" concept (code written and reviewed by agents, not humans) and Birgitta Böckeler's "harness engineering" — focusing engineering effort on *building the system that produces code* rather than the code itself. He acknowledges Annie Vella's research showing "middle loop" work (engineers supervising AI) often yields mixed results because industry lacks patterns for doing it well.

## Verbatim quotes

> "Let's make toast: I'll burn it, you scrape it" — W. Edwards Demming, on 1960s American manufacturing vs. lean manufacturing.

> "In Lean Software Production, instead of spending time crafting every line of code, we focus our attention on crafting the system we use to produce reliable, well-engineered software at scale."

> "If you notice your agent is making mistakes and generating code that you have to correct, don't blame the model: Instead, look to how you could have improved the context you gave the model so it would make a better decision next time."

> "When a single engineer can generate the volume of output that once required a team, the costs of problem ambiguity, architectural weakness, slow or unreliable tests and defects don't just cause friction, they set things on fire."

> "If you can't review the code, how do you know whether it's good? You have to build yourself systems that can judge that goodness for you, and you have to be able to tell them what good looks like."

> "Once you've experienced 'hands off' software development, where you neither write nor read the code, there's no going back."

## Takeaways

- **Lean manufacturing principles are underexplored in AI-accelerated dev**: kaizen (continuous improvement), jidoka (build quality in), and pull-based flow address the specific risk of high-volume, low-reliability LLM output better than post-hoc code review.
- **System design, not model selection, is the leverage point**: when agents fail, the first fix is improving context, instructions, and architectural constraints, not swapping models.
- **Extreme Programming practices become industrial safety**: automated testing, CI, refactoring, and architectural pairing are no longer craft niceties but prerequisites for scaling agentic code production.
- **Harness engineering shifts the engineer's role**: from writing/reviewing code to designing the feedback loops, tests, and constraints that allow agents to produce reliable software unsupervised.
- **"Middle loop" supervision is a trap**: teams that generate code but have humans review it often see worse outcomes because they inherit inspection overhead without reaping the speed gains of full automation or the reliability of well-designed systems.

## Open questions

- How do you encode "what good looks like" (architectural soundness, security, performance, UX) in a way agents can learn from and apply systematically?
- What are the failure modes of fully dark-factory software development? Are there categories of bugs or architectural failures that can *only* be caught by human review?
- How do ADRs, design heuristics, and other textual constraints compare to fine-tuning or in-context learning for improving agentic output?
- Can teams realistically audit or understand software they neither write nor review, particularly in regulated or high-stakes domains?
