---
title: "How to Do Spec-Driven Development"
url: https://newsletter.eng-leadership.com/p/how-to-do-spec-driven-development
authors: [Gregor Ojstersek]
captured: 2026-08-04
source_type: blog
topics: [spec-driven-development, agentic-workflows, prompting, engineering-judgment]
tags: [ai-native-teams, reference-implementation, junior-engineers, cost-optimization, larridin]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Gregor Ojstersek documents the spec-driven development workflow used by Larridin, an AI-native team building AI adoption measurement tools. The piece contrasts spec-driven development with open-ended LLM prompting: **write a detailed specification first, then use AI to implement against it**—this approach allows teams to use lower-tier, cheaper models while maintaining output quality, and removes the need for infinite token-spend iteration.

The workflow Larridin follows has five concrete phases:

1. **Spike first**: Before writing a spec, build a throwaway reference implementation to resolve technical unknowns and unknowns—not an MVP, but "ugly code that answers 'does this work?'" Examples: proving an API edge case, measuring hot-path latency, validating core logic (e.g., their "AI Fluency" scoring algorithm).

2. **Promote spike to reference implementation**: Keep the spike in a known location (`spec/spikes/reference/referenceName`) with comments flagging what works, what's hardcoded, what's incomplete. This becomes a concrete example the LLM can follow, stopping hallucination.

3. **Write the spec**: Use AI to draft it, but force restatement of requirements, explicit assumptions, and ambiguity flags. Desired structure:
   - Problem statement (one paragraph)
   - Non-goals (explicit out-of-scope to head off overengineering)
   - Assumptions (pagination strategy, lazy loading, etc.—silent assumptions are dangerous)
   - Reference implementation link (with callouts of shortcuts vs. proof-of-concept)
   - Architecture (data model, module boundaries, error handling)
   - Test plan (unit, integration, e2e)

4. **Build with lower-tier models**: Once the spec is locked, use cheaper models to implement. The reference implementation + detailed spec reduces the need for higher-tier reasoning.

5. **Own it end-to-end**: Each engineer owns feature from spec to implementation to validation.

**Key insight from Ameya Kanitkar (CTO, Larridin)**: "A working example is worth a lot more than a full page in the spec." This is why the spike, moved to reference, is the most underrated part of the process. A spike without comments is "similarly dangerous as not doing it at all" because the model reproduces both right and wrong parts.

## Verbatim quotes

> "The spec needs to be almost perfect before they start with the implementation."

> "You have a fast-driving car right in front of you, why not use it?" (on using AI as a tool)

> "With a great spec, you can usually use a lower-tier model and get a very similar output, the reason for that is that the instructions in a great spec are very clear."

> "The goal is to stop when you have an answer, not when the code is pretty. If you're worried about naming variables, functions, and file structure, stop, that's a sign you're putting too much thought into implementation details."

> "A spike without comments can be similarly dangerous as not doing it at all, because the model can just reproduce the wrong parts alongside the right ones."

> "If there are any non-handled assumptions and ambiguity left, you can either create a new spike or update the existing one."

## Takeaways

- **Spike-first de-risks specs**: Resolve technical unknowns in throwaway code before writing requirements; prevents spec contamination by uncertainty.
- **Reference implementations > prose**: A working, commented example in the repo is more valuable for LLM instruction-following than pages of text; eliminates hallucination by giving concrete proof.
- **Cost is a forcing function**: Token economics make spec-driven development practical: good specs allow cheaper models to do the work; poor specs force expensive models or infinite iteration.
- **Explicit assumptions prevent silent decisions**: Call out pagination, caching, lazy loading, error modes in the spec; unstated assumptions lead models to "silently pick" them.
- **End-to-end ownership**: Each engineer owns spike → spec → implementation → validation; prevents handoff friction and ensures accountability.

## Open questions

- How does the team decide when a spike has "enough" answers? (Risk: over-spiking or under-spiking.)
- What does review/approval of a spec look like before it enters the implementation phase?
- How often do spikes reveal that the original problem statement needs rethinking?
- How do they handle specs for interdependent features or systems that require coordination across teams?
- What's the failure rate on implementations built from these specs, and how often does the reference implementation need revision?
