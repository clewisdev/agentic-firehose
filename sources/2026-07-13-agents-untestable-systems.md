---
title: "Your agents are happily automating an untestable system"
url: https://www.linkedin.com/posts/abhijeetvaikar_your-agents-are-happily-automating-an-untestable-share-7481658457066995712-M9d8/
authors: [Abhijeet Vaikar]
captured: 2026-07-13
source_type: post
topics: [agentic-workflows, evals, engineering-judgment]
tags: [testability, test-automation, agent-testing, system-design]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Abhijeet Vaikar highlights a critical gap in agent-driven test automation: agents optimizing for coverage and automation velocity while ignoring **testability** — the architectural prerequisite for meaningful testing.

The core argument: even with AI agents handling test execution, the underlying system must be designed to *allow* testing. Questions like "How do you read or mutate state?" and "How do you build interfaces that expose what you need to test?" remain foundational and are often overlooked when delegating test authoring to agents.

Vaikar notes over one year of hands-on experience using agents for testing activities. The post references a longer-form blog article on testability as a foundational tenet of test automation success.

A comment from Satish Nath Siddha validates the concern with a concrete example: testability issues arose when attempting to test daylight saving time impacts—a problem that persists regardless of agentic capabilities.

## Key framing

- **Testability as prerequisite**: AI agents cannot circumvent poor system design; they amplify the cost of untestable architectures by automating against surfaces that obscure intent.
- **State visibility**: Systems must expose readable/mutable state in predictable, accessible ways. Agents alone cannot infer hidden state or work around opaque boundaries.
- **Agents ignore architectural concerns**: The post explicitly warns that agents "are likely going to ignore these concerns," suggesting agents optimize for immediate task completion rather than long-term testing maintainability.

## Takeaways

- Testability is not a testing problem; it's a **system architecture problem** that predates agent automation.
- Delegating test automation to agents without addressing testability creates technical debt at scale.
- Agent-driven testing surfaces (rather than solves) architectural brittleness.
- Concrete examples (DST switching, state mutation) illustrate that testability failures cut across domain boundaries.
- This represents a maturation warning: agents as test executors do not replace the need for testable system design.

## Open questions

- How do teams currently detect testability debt *before* deploying agents for test automation?
- What architectural patterns have proven most conducive to agent-driven testing?
- Does agent-driven testing expose testability issues faster than manual testing, or does it mask them?
- What guidance exists for designing APIs/interfaces specifically for agent-testable systems?
