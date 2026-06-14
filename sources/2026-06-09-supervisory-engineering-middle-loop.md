---
title: "Supervisory engineering: Orchestrating software's 'middle loop'"
url: https://www.thoughtworks.com/insights/blog/agile-engineering-practices/supervisory-engineering-orchestrating-software-middle-loop
authors: [Richard Gall]
captured: 2026-06-09
source_type: blog
topics: [agent-architecture, code-generation, code-review, system-design, ai-productivity]
tags: [ai-agents, llm, middle-loop, supervisory-engineering, code-review, multi-agent-systems]
signal_level: medium
status: raw
confidence: high
freshness_until: 2027-Q2
---

## Summary

Thoughtworks introduces a conceptual framework for how software development is being restructured by generative AI and autonomous coding agents. The core thesis: the traditional inner loop (local development) and outer loop (CI/CD, deployment) model is obsolete. AI agents have collapsed the inner loop almost entirely—they can generate syntactically correct code at scale in seconds. This creates a new bottleneck: **verification and orchestration**, which Gall names the **middle loop**.

The middle loop is where human judgment meets machine execution. It's triggered the moment an agent proposes a solution and requires engineers to shift from *writing* code to *supervising* systems. Key responsibilities include:

1. **Aligning intent and setting constraints**: establishing architectural parameters, API specs, and style guides before agents build
2. **Multi-agent synthesis**: stitching together output from parallel agents (frontend, backend, database) without architectural drift
3. **Differential and behavioral review**: moving from "how was this written" to "what does this actually do"—catching hallucinations, edge cases, deprecated APIs
4. **Gatekeeping and guardrails**: treating the middle loop as a mandatory filter before CI/CD, with automated policy-as-code and integration testing

Gall frames supervisory engineering around three pillars: **directing** (breaking systems into agent-sized chunks, codifying standards), **evaluating** (deep system context to spot plausible nonsense), and **correcting** (maintaining coherence across parallel workstreams).

## Key Quotes

> "The bottleneck is no longer around how fast we can type or implement code, it's about how fast we can verify."

> "You used to slow down while writing code; now, you have to force yourself to slow down while reading, questioning and auditing it."

> "In a traditional code review, you look at a pull request (PR) written by a peer to catch logic flaws. In the middle loop, you're reviewing a massive wall of code generated in seconds."

> "The surface area of engineering responsibility hasn't shrunk; it has expanded."

## Takeaways

- **Structural shift, not incremental change**: The two-loop model (inner/outer) was stable for decades; AI agents have made it incoherent and forced a third layer into existence.
- **Review practice transforms radically**: code review becomes behavioral auditing at scale; reviewers must spot hallucinations and edge cases in high-velocity, auto-generated output.
- **Architecture becomes executable constraint**: supervisory engineers must codify design intent, standards, and constraints *explicitly* so agents don't hallucinate patterns or violate architecture.
- **Multi-agent orchestration is a new skill**: managing parallel LLM/agent workstreams, resolving conflicts, and maintaining system coherence is not a DevOps task—it's an engineering problem.
- **Skill valorization shifts**: rote syntax knowledge becomes liability; valued skills are system architecture intuition, mechanical sympathy, rapid audit capability, and deep domain context.

## Open Questions

- How do teams operationalize "behavioral review" at scale without it becoming a bottleneck itself? What tooling/frameworks exist?
- What concrete policy-as-code patterns work for gatekeeping agent-generated code?
- How do you measure whether the middle loop is working? (Success metrics for supervisory engineering?)
- Does this framework apply equally to greenfield vs. legacy/brownfield systems, or does architectural complexity change the supervision model?
- How do agents currently perform on "directing" feedback—can they reliably refactor output based on architectural critique, or is rejection/rewrite the norm?
