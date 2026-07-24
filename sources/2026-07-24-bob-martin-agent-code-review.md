---
title: "Bob Martin on Agent Code Review and Constraints Over Syntax"
url: https://www.linkedin.com/posts/robertkellydfw_bob-martin-who-literally-wrote-the-book-share-7486250137023827968-CodV/
authors: [Robert Kelly]
captured: 2026-07-24
source_type: post
topics: [agentic-workflows, code-review, engineering-judgment, safety]
tags: [bob-martin, constraints, testing, code-quality, agent-orchestration]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Robert Kelly posts a framing of Bob Martin's perspective on code review in agentic workflows: Martin allegedly does not scrutinize agent-generated code directly, but instead defines constraints (guardrails, tests, harnesses) to ensure quality outcomes. The thesis is that if "good" is well-defined through constraints, rapid iteration becomes possible without overhead of line-by-line review.

Kelly positions this as pragmatic: agentic workflows reduce the need for human labor *on syntax and patterns*, while outcome-driven constraints replace manual inspection. He acknowledges this is not "all or nothing" but claims the goal is attainable with existing workflows.

The post generated substantive pushback in comments, touching on:

- **Knowledge representation** (Tim Ottinger): code design and patterns encode knowledge; poor design fails under real conditions, not just tests. Syntax and design aren't labor for their own sake—they prevent cascading failures.
- **Learning and accountability** (Jennifer Riggins, others): how do practitioners internalize what "good" looks like without studying code? Who is accountable when agents fail?
- **Test/production gap** (Vikram LowCaste): agents can pass tests while failing in production; human code review is a partial mitigation, agent code is not.
- **Hidden assumptions in agent prompts** (Alessandro Molina): agent-generated code becomes part of subsequent agent prompts. Poor code structure confuses downstream agents. Not reading code = losing visibility into what the agent is actually seeing.
- **High-stakes domains** (Alex Ewerlöf): reliability-critical systems (aerospace, medical, military) require human accountability; cost-benefit trade-offs vary.

## Key Quotes

> "We don't need to labor over patterns and syntax because the outcomes are what matters. And if you know what 'good' looks like, you should be able to drive those outcomes by building the guardrails agents need to get there."

> "Not for [syntax and patterns'] own sake... Write a program with invalid syntax and see how far you get. Let the design degrade and you will shut down the project in months to years." (Ottinger)

> "Any testsuite that verifies the software in such detail that it can guarantee full predictability of all behaviors would be the code of the software itself just written in a more complex and verbose form." (Molina)

## Takeaways

- **Constraint-driven vs. inspection-driven governance**: tension between defining outcome specs upfront and iteratively reviewing generated work. Both have limits.
- **Test coverage is not code visibility**: high test pass rates do not eliminate the need for humans to understand design; agents downstream also need readable code as context.
- **Accountability gap**: constraints + tests work for optimization; they do not establish human responsibility for failures, which remains unresolved in purely agent-orchestrated flows.
- **Domain and risk context matter**: low-stakes POC vs. mission-critical systems require fundamentally different code-review postures.
- **Knowledge encoding in code**: the assumption that syntax/design are "labor" underestimates their role in knowledge transfer to humans and downstream agents.

## Open Questions

- How do you define "good" (constraints, test cases, linters) without first reading and understanding exemplary code?
- What is the cost of poor agent code on agent-to-agent prompt clarity and downstream behavior prediction?
- Can constraints + tests actually substitute for code review in regulated or high-stakes domains, or is human review a legal/ethical requirement?
- How do you detect when agent output is passing tests but violating unspecified architectural or maintainability intent?
