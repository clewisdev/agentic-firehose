---
title: "Practices I Abandoned with Agents: An Ode to Test-Driven Development"
url: https://www.linkedin.com/posts/adam-tornhill-71759b48_test-driven-development-tdd-has-been-my-share-7503733060291645440-AdMZ/
authors: [Adam Tornhill]
captured: 2025-09-24
source_type: post
topics: [agentic-workflows, evals, engineering-judgment]
tags: [tdd, testing, agent-development, code-generation, workflow-adaptation]
signal_level: high
status: raw
confidence: high
freshness_until: 2025-Q4
---

## Summary

Adam Tornhill, a 25-year TDD practitioner and founder of CodeScene, reports abandoning Test-Driven Development as his primary workflow when transitioning to AI-native development. His core argument: **forcing agents through incremental test cycles optimized for human cognition negates TDD's benefits**. Rather than attempt to retrofit human best practices onto agents, Tornhill adapted his workflow—drawing a parallel to his earlier shift to Clojure, which required rethinking habits to unlock the language's potential.

The post sparked substantive technical discussion in comments from experienced practitioners (Paul Hammond, Matthew Skelton, Rob Bowley, Alexandre Poitevin) who reported similar experiences: agents struggle to write tests first in the traditional sense, yet testing discipline persists at higher levels (integration/e2e). The consensus thread: **the *intent* of TDD (hypothesis-driven, test-first verification) survives, but the *implementation* must shift to agent-appropriate boundaries**.

Key tensions that emerged:
- Red-green-refactor cycles assume human cognition; agents need different incremental goals
- Unit tests as design tools (TDD's hidden benefit) don't transfer to agent workflows
- Code modularity concerns: without TDD forcing small, testable units, will agent-generated code fragment system boundaries?
- Coverage gates and mutation testing still valuable as guardrails, but run *after* agent commits rather than before

## Verbatim quotes

> "TDD didn't survive my transition into AI-native development: forcing an agent through increments optimized for human cognition negates many of the benefits."

> "In TDD, red verified that I had implementation work to do. With agents, red gives me confidence that my test suite is capable of validating the changes I delegate to agents." (from Matthew Skelton's reply, capturing Tornhill's reframing)

> "Code is no longer for my consumption. My AI code doesn't look like what I would have written myself. And I had to accept that." (raises trust and code-quality verification concerns)

## Takeaways

- **Cognitive fit matters**: best practices must be re-evaluated when execution context (human → agent) changes fundamentally
- **Tests remain; boundaries shift**: e2e/integration tests replace unit tests as the validation gate; coverage and mutation testing still enforce discipline
- **Modularity risk**: without TDD's design constraint, agent-generated code may become harder to refactor and maintain across service boundaries
- **Intent vs. form**: hypothesis-driven testing survives; the red-green-refactor *ceremony* does not
- **Workflow design**: successful agent development requires explicit harness design (gates, coverage targets, proof documentation), not ceremony

## Open questions

1. How do teams measure code quality and readability when agents generate code not optimized for human consumption?
2. Without TDD's modularity constraint, how do you prevent monolithic agent-generated features that violate service boundaries?
3. Does higher-level BDD/ATDD (behavior-driven tests) filled in *before* agent dispatch provide the same design-steering benefit as unit TDD?
4. What does "proof documentation in workflow" (Alexandre Poitevin's comment) look like in practice?
