---
title: "Practices I Abandoned with Agents: An Ode to Test-Driven Development"
url: https://www.linkedin.com/posts/adam-tornhill-71759b48_test-driven-development-tdd-has-been-my-share-7503733060291645440-AdMZ
authors: ["Adam Tornhill"]
captured: 2026-11-01
source_type: post
topics: [agentic-workflows, engineering-judgment, spec-driven-development, code-generation]
tags: [tdd, testing, agent-harness, outer-loop-verification, architecture]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

# Summary

Adam Tornhill, author of *Your Code as a Crime Scene* and founder of CodeScene, reflects on abandoning Test-Driven Development (TDD) after 25 years as a default practice upon transitioning to agentic workflows. His core thesis is that classic TDD was an engineering discipline optimized specifically for human cognitive constraints—guiding design through tiny micro-increments and maintaining developer focus. When mapped onto LLM agents, forcing this rigid inner red-green-refactor loop strips agents of their speed and breadth without providing the corresponding design benefits.

The discussion surrounding the post—featuring engineering leaders such as Matthew Skelton, Rob Bowley, and J.B. Rainsberger—elaborates on what replaces traditional TDD. Practitioners are finding that while the micro-loop of unit-level TDD fails with agents (agents struggle to write genuine unit tests first and resist micro-committing), the overarching discipline survives at a higher abstraction boundary. Verification shifts from micro unit tests acting as an emergent design tool to boundary/acceptance tests acting as an evaluation harness.

In an agentic workflow, the role of a "failing" (red) test changes fundamentally: instead of confirming that the human developer has implementation work to do, a red test verifies that the evaluation harness is capable of catching regressions and validating the autonomous agent's proposed solution. Furthermore, practitioners note that treating code as primarily consumed and maintained by agents rather than humans forces a reassessment of modularity, readability, and how engineering judgment will be taught to future developers who bypass TDD.

## Key Quotes

> "Test-Driven Development (TDD) has been my default programming mode for 25 years... However, the time has come to bid farewell. TDD didn’t survive my transition into AI-native development: forcing an agent through increments optimized for human cognition negates many of the benefits." — Adam Tornhill

> "In TDD, red verified that I had implementation work to do. With agents, red gives me confidence that my test suite is capable of validating the changes I delegate to agents." — Adam Tornhill (quoted via Matthew Skelton)

> "What's gone is the inner loop, where the unit tests were the design tool as well as the verification." — Rob Bowley

> "Code is no longer for my consumption. My AI code doesn’t look like what I would have written myself. And I had to accept that." — Adam Tornhill (quoted via Serge Stinckwich)

## Takeaways

- **TDD was a cognitive scaffold for humans**: The fine-grained red-green-refactor cadence exists to manage human working memory and incremental design; imposing it on agents introduces friction without yielding better architecture.
- **Shift from inner-loop unit design to outer-loop boundary verification**: Practitioners are moving from low-level unit TDD toward Acceptance Test-Driven Development (ATDD) or boundary/end-to-end specifications that serve as agent rails rather than design tools.
- **The semantic inversion of 'Red' tests**: In agentic harnesses, a failing test serves as a meta-evaluation of the test harness itself (proving the test is sensitive to missing capability) before handing off code generation to the model.
- **Pedagogical and maintainability risks**: If junior engineers bypass human-centric TDD, the software industry lacks established frameworks to teach the systems thinking, modularity, and edge-case intuition that TDD historically instilled.

## Open Questions

- When agents generate non-idiomatic or sprawling code that still satisfies acceptance boundaries, how does technical debt accumulate over successive agentic modifications?
- Can agent harnesses be designed to enforce property-based or mutation-tested guarantees without degrading the speed and holistic context of generation?