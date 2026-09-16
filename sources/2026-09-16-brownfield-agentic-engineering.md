---
title: "Brownfield Agentic Engineering"
url: https://www.linkedin.com/posts/addyosmani_ai-programming-softwareengineering-share-7505851842921271297-OJan/
authors: [Addy Osmani]
captured: 2026-09-16
source_type: post
topics: [agentic-workflows, agent-architecture, harnesses, engineering-judgment]
tags: [brownfield, legacy-systems, safety-zones, risk-management, codebase-archaeology, knowledge-preservation]
signal_level: high
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Addy Osmani articulates a practitioner's operational framework for deploying agentic systems in brownfield codebases—legacy systems where institutional knowledge and hidden constraints live outside the repository. The core insight: agents have not reduced the evidence required for safe changes; they've only reduced the cost of attempting multiple implementations.

Osmani proposes a **zone-based risk model** for agent deployment:

- **Green Zone** (safe, modern, well-tested, isolated): tight agent loops with minimal oversight
- **Yellow Zone** (mixed quality): agents must write characterization tests to pin down existing behavior before modification
- **Red Zone** (auth, billing, sensitive): human pairing required; no unsupervised rewrites

Beyond code-level safety, Osmani identifies four operational patterns:

1. **Write down what the code can't say**: Agents infer structure well but remain blind to domain rules, historical trade-offs, and unwritten constraints. Feed explicit constraint documents, not markdown code maps.

2. **Make research survive the session**: Require agents to generate durable research artifacts (entry points, caller maps, invariants) so subsequent sessions avoid redundant codebase archaeology and token waste.

3. **Complete the migration unit**: Migration is not done when files are converted and a compatibility shim remains. It's only done when the old dependency is demonstrably deleted and traffic has moved.

4. **Parallelize last**: Don't scale to multi-agent factories until a single loop has a reliable judge. Parallelism multiplies your bottleneck—which is almost always human review capacity.

Final pattern: turn repeated code review corrections into linter rules, hooks, and explicit skills. Agents expose ambiguity with mathematical precision; every recurring comment is a missing harness piece.

## Key Quotes

> "In brownfield engineering, your repository is rarely a complete description of how the system actually behaves. Institutional knowledge, legacy dependencies and hidden constraints live outside the codebase."

> "Agents excel at inferring code structure, but remain blind to domain rules, historical context, and trade-offs. Feed them the unspoken constraints, not obvious code-map markdown files."

> "Every repeated code review correction is simply a missing piece of your harness—turn those recurring comments into linter rules, hooks and explicit skills."

> "Parallelism only multiplies your bottleneck—which is almost always human review capacity."

## Takeaways

- **Risk zoning (green/yellow/red) is a testable deployment model** for agentic systems in legacy code. Green zones enable tight loops; red zones require human pairing. Yellow requires characterization tests before agent modifications.

- **Codebase archaeology is a repeatable cost.** Require agents to produce durable research artifacts (entry maps, invariants, caller graphs) so subsequent agent sessions don't re-scan the same code. Token savings compound.

- **Definition of done matters more with agents.** Migration is not complete when code is rewritten; it's complete when old paths are deleted and traffic verifiably moves. Compatibility shims and old dependencies are easy to leave behind when implementation is fast.

- **Human review capacity is the bottleneck.** Parallelizing agents before a single loop has reliable feedback multiplies review load and failure modes. Scale sequentially, not horizontally.

- **Harnesses beat prompts.** Recurring review corrections reveal missing constraints. Encode them as linter rules, hooks, and explicit agent skills rather than trying to phrase them better in system prompts.

## Open Questions

- How should teams decide what constraints belong in code (linter rules) vs. durable research artifacts (ledgers, decision documents)? Where does the boundary lie?

- In yellow zones, who judges whether a characterization test is sufficient to permit agent modification? How is that judgment formalized?

- How do you prevent agents from "optimizing away" documented constraints in pursuit of cleaner code? Is this a prompt problem or a harness problem?

- For teams with very large brownfield systems, is the zone model applied at the file, module, or service level? How granular does it need to be?

- What does a "persistent knowledge ledger" (mentioned in the Nool comment) look like in practice, and how do agents query it? Is this distinct from code comments or docstrings?
