---
title: "AI coding is a Golem, not a 'Factory'"
url: https://blackswanfarming.com/ai-coding-is-a-golem-not-a-factory/
authors: ["Black Swan Farming"]
captured: 2026-07-12
source_type: blog
topics: [prompting, code-generation, engineering-judgment]
tags: [mental-models, specification, oversight, risk-management]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

This piece contests the prevalent "software factory" framing for AI code generation, arguing it imports the wrong mental model—one where repeatability is virtue and deviation is failure. The author proposes "Golem" as a more accurate analogy: an entity that executes instructions literally without judgment, creating the central risk of AI-assisted development.

### Core thesis

Factories optimize for identical, repeatable output at scale. Software doesn't work that way—every non-trivial program solves a unique problem with unique constraints. The factory metaphor misdirects teams toward consistency and scale when the actual bottleneck is **specification**: the distance between what you asked the AI to do and what you actually needed.

### The Golem analogy

A golem—a creature from Jewish folklore animated by a divine name—executes commands with perfect literal fidelity but no judgment. Classic failure: told to fetch water, it keeps fetching until the house floods. The danger isn't in the golem's execution (which is flawless) but in the gap between instruction and intent.

**Key parallels to AI code generation:**
- Output is contextual and unique, not mass-produced
- The risk surface is specification, not consistency
- Failure happens when the prompt is technically correct but semantically misses the mark
- Human oversight is structural, not optional—someone must watch for drift and have authority to stop

### Why this beats "Factory" and "Genie"

- **Factory**: Ignores that software is inherently variant; misdirects toward throughput optimization
- **Genie**: Frames the danger as bad wishes (greed/user error), not specification gaps
- **Golem**: Captures the real risk—literal execution meeting insufficient specification—and implies the solution: discipline in writing specs and constant oversight

### Operational implications

Teams optimizing for "golem" outcomes focus on:
1. Quality of the initial specification ("the shem")
2. Speed of noticing when output drifts from intent
3. Structural oversight mechanisms (not optional QA)

Not on generation speed or consistency metrics.

## Verbatim quotes

> "Every piece of software worth writing solves a problem nobody has solved in exactly that shape before. Different constraints, different context, different tradeoffs. Variance isn't a defect in software. It's the whole job."

> "That gap — between what you specified and what you actually wanted — is the entire risk surface of AI-generated code."

> "Told to guard, it can't distinguish 'protect the community' from 'destroy anyone who might be a threat.' The golem never gets the instruction wrong. It gets the specification wrong — or rather, you did, and it had no way to know that."

> "Teams that get good at AI-assisted development won't be the ones with the fastest golem. They'll be the ones who've gotten disciplined about writing the name correctly, and who've built in someone whose job is to watch for the flood."

## Takeaways

- The "factory" metaphor for AI code gen is structurally misleading and hides the actual risk surface (specification, not scale)
- AI code tools are essentially literal executors—powerful at scale, blind to context and intent gaps
- The bottleneck in AI-assisted development is specification quality and human oversight speed, not generation speed
- Teams need explicit roles and processes for spec-writing discipline and drift detection, not just faster tooling
- The golem framing reorients risk management from consistency/throughput to precision/attention

## Open questions

- How do high-performing teams operationalize "specification discipline" across larger codebases?
- What concrete metrics or signals best indicate when AI output has drifted from intent?
- Does this model scale differently in different domains (infra vs. business logic vs. research code)?
- How do you structure oversight and authority when teams are distributed or context is diffuse?
