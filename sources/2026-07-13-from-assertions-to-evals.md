---
title: "From Assertions to Evals: Testing in the Age of AI"
url: https://systemsnotes.substack.com/p/from-assertions-to-evals-a-primer
authors: [Bojana]
captured: 2026-07-13
source_type: post
topics: [evals, system-design, engineering-judgment]
tags: [testing, deterministic-vs-nondeterministic, assertions, constraints, safety]
signal_level: high
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Bojana articulates a framework for understanding testing in AI-assisted systems by rejecting the false premise that "tests" are one thing. She distinguishes four testing modes on two axes: whether the behaviour being tested is deterministic or non-deterministic, and whether the testing method is deterministic or non-deterministic.

The core thesis: AI makes the *cost structure* of software change (cheaper code generation, refactoring, iteration), but this does not make confidence automatic. Faster change creates more places where assumptions drift—business rules soften, payloads change shape, generated implementations solve local problems while missing system context.

The work shifts from "producing code" to "being clear about what the code must preserve."

## Four Testing Modes

1. **Assertions (deterministic behaviour + deterministic testing):** Exact correctness where it matters—pricing rules, permission checks, schema migrations, contract tests. These become *more* valuable with AI because generated code does not automatically know which rules matter or which edge cases caused past incidents. The trap: over-specifying unstable details (e.g., exact CSS selectors) rather than true requirements.

2. **Exploration (deterministic behaviour + non-deterministic testing):** Chaos engineering, randomized testing, fault injection, load variation. Essential because fixed examples cannot prove safety across the input space. AI-assisted development creates risk of accumulated "plausible code" never exposed to weirdness. Failures are noisier but expose hidden assumptions.

3. **Constraints (non-deterministic behaviour + deterministic testing):** Hard edges around probabilistic systems. A generated answer must be grounded and safe *enough*—not perfect, but not garbage either. Requires guardrails: validation rules, safety checks, rejection thresholds. Allows variation within bounds.

4. **Evals (non-deterministic behaviour + non-deterministic testing):** Measuring quality across many runs. Asking "does this generated answer typically satisfy users?" rather than "is this one run correct?" Requires sampling, aggregation, and statistical confidence.

## Key Quotations

> "All of these increase confidence, but they do it in different ways. They are related, but they are not interchangeable."

> "If anything, faster change creates more places where assumptions can drift: a business rule gets softened, a boundary gets crossed, a payload changes shape, or a generated implementation solves the local problem while missing the system around it."

> "Assertions are still the right tool for exact correctness. They are the wrong tool for behaviours where exactness was never the real requirement."

> "Exploration buys a different kind of confidence: not 'this exact example works,' but 'we have shaken the system hard enough to expose hidden assumptions.'"

> "An eval might tell us that a generated answer is grounded, useful, and safe enough to show to a user."

## Takeaways

- **The right question is not "do we have tests?" but "what kind of failure are we trying to catch, and where in the system can we catch it most reliably?"** This matters more with AI because generated code amplifies assumption drift.

- **Assertions preserve institutional knowledge.** They codify which edge cases caused past incidents, which fields other teams depend on, which permission checks prevent data leaks. AI-assisted generation makes this explicit preservation more critical.

- **Deterministic vs. non-deterministic method choice matters as much as what you test.** A system can be functionally correct and operationally unacceptable; exploration (load testing, chaos) finds risks fixed examples miss.

- **Constraints and evals are not "softer" testing—they are the right tool for probabilistic systems.** Hard guardrails (rejection thresholds, safety checks) allow variation within safe bounds; evals measure aggregate quality across runs.

- **Over-specification is a common failure mode.** Strict assertions on unstable details (exact wording, CSS selectors) create maintenance traps; strictness on true requirements (data integrity, permission checks) prevents silent failures.

## Open Questions

- How do teams calibrate the statistical confidence thresholds for evals in production? (What sample size, what latency tolerance?)
- How do constraints (safety guardrails) interact with performance budgets in real systems?
- How should assertion scope change in a codebase where 40%+ of implementation is generated vs. hand-written?
- How do you preserve "this edge case matters" knowledge when both code and tests are generated?
