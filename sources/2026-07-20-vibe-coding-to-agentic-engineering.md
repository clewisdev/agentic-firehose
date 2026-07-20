---
title: "From Vibe Coding to Agentic Engineering"
url: https://www.mark-thebault.pro/articles/from-vibe-coding-to-agentic-engineering/
authors: [Mark Thebault]
captured: 2026-07-20
source_type: blog
topics: [agentic-workflows, agent-architecture, context-engineering, prompting, system-design]
tags: [agent-design, context-management, mcp, spec-driven-development, sub-agents, knowledge-integration]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

Mark Thebault articulates a practical framework for moving away from "vibe coding" (one-shot prompting) toward structured agentic engineering. The core insight: treat AI agents as very fast new employees with broad capability but minimal local judgment, requiring deliberate context, boundaries, and verification.

Thebault frames the problem clearly: models execute what you tell them, not what you *meant*. They lack understanding of product history, architectural tradeoffs, company norms, and implicit domain knowledge. The solution is not better prompts—it's better workflow design.

**Key structural principles:**

1. **Context engineering**: Curate the smallest *sufficient* context, not the largest. Irrelevant information contaminates the work. Tools, docs, and instruction files should act as maps, not textbooks. Example: an AGENTS.md file should specify actual directory structures and local patterns ("business logic in src/domain"), not generic advice like "write clean code."

2. **Sub-agents over God-agents**: A monolithic agent with every tool, doc, and responsibility fails unpredictably. Instead, route work through a thin main agent and dispatch to specialists (code agent, docs agent, CI agent, security agent) that carry only their relevant context and tools.

3. **Spec-driven development**: Most AI coding failures are task-definition failures, not syntax failures. Write a plan.md and todo.md; let the agent update progress. This is slower than one-shot prompting but vastly easier to review and steer.

4. **Compact instructions**: Use terse, precise language once context is set. Preserve exact technical information (commands, API names, filenames). Tools and command output should be filtered—a 2,000-line test failure needs reduction to error and stack frame.

5. **Agentic knowledge**: The hard gap is not public knowledge but company knowledge—which service owns what, which docs are stale, which integrations are fragile, which compliance rules change implementation. If unavailable, the model will hallucinate plausible answers.

## Verbatim quotes

> "The core problem has not changed: models do what you tell them to do. They do not always know what you wanted to do."

> "The useful mindset is not 'the agent is a complete engineer.' It is closer to: this is a very fast new employee with access to a huge amount of knowledge, but almost no local judgment yet."

> "The goal is not the biggest possible context. The goal is the smallest context that is complete enough for the job."

> "A good instruction file is a map, not a software engineering textbook."

> "The 'God Agent' is tempting: one agent, every tool, every instruction, every document, every responsibility. It works until it does not. Then it is hard to understand the failure."

> "Many AI coding failures are not syntax failures. They are task definition failures."

## Takeaways

- **Context is a scarce resource.** Every piece of information occupies model working memory and suggests actions. Filter ruthlessly; add only what the agent cannot reliably infer.
- **Vibe coding and production agentic engineering are different modes.** Vibe coding (exploration, low-cost error) tolerates speed over structure. Production work requires deliberate workflow, verification, and scope control.
- **Instruction files are operational maps, not teaching materials.** Specify local reality: directory structure, validation commands, architectural boundaries, preferred patterns. Omit generic software engineering advice.
- **Sub-agent decomposition reduces failure opacity.** A main agent routes work; specialists (code, docs, CI, security) carry focused context. Failures become attributable to task routing or a specific agent's judgment, not a black box of interacting concerns.
- **Spec-driven development scales agent work.** Short plan and todo artifacts force clarity on scope, constraints, and expected behavior before implementation. Agents update the todo as they work, creating a reviewable trace.
- **Company knowledge cannot be hallucinated away.** Invest in making domain knowledge explicit and accessible—service ownership, fragile integrations, stale docs, compliance rules, customer behavior. Without it, agents invent plausible fiction.

## Open questions

- How does this approach scale to agents that must work across many services or codebases with conflicting conventions?
- What triggers for when to escalate from a specialist sub-agent back to human judgment?
- How do you version and evolve instruction files as a codebase or team grows?
- What tooling makes it easy to maintain and route to sub-agents, vs. monolithic agent platforms?
- How much of the "company knowledge" gap can be bridged via retrieval + RAG, vs. requiring explicit documents?
