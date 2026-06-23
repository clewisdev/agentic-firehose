---
title: "Loop Engineering: Replacing Manual Agent Prompting with Recursive Systems"
url: https://www.linkedin.com/posts/radar-share-7474903631528370176-y6z4/
authors: [Addy Osmani, O'Reilly]
captured: 2026-06-23
source_type: post
topics: [agentic-workflows, cost-management, agent-architecture]
tags: [loop-engineering, coding-agents, token-costs, recursion]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Addy Osmani (via O'Reilly's Radar) frames "loop engineering" as a paradigm shift in how developers interact with coding agents. Rather than manually prompting an agent for each task, loop engineering involves designing a system that recursively pursues a defined goal until completion — treating the loop as a recursive goal-seeking mechanism.

Osmani positions this as a potential future of agent-assisted development, but explicitly caveats the claim: "it's still early; I'm skeptical, and you absolutely have to be careful about token costs (usage patterns can vary wildly if you are token rich or poor)." The core premise is that the human role shifts from prompt-engineering to system design — creating the conditions for the agent to iterate autonomously.

The framing acknowledges both the architectural novelty and the practical constraints. Token cost variability is flagged as a material risk, particularly for teams without unlimited API spend. The mechanism itself is simple: define a purpose, let the AI iterate until a termination condition is met.

Comments reveal mixed reception. One practitioner (Oliver Huggins, skills-content builder) validates the observation that "once the agent writes the code for you, the value shifts to the parts that were always the actual job anyway: deciding what to build, checking it works, and reviewing it properly." Others note loop iteration is not new (capping max iterations to control token burn is a known mitigation). Tim Johnston expresses skepticism about the naming of yet another "engineering discipline" every six months.

## Key quotes

> "Loop engineering is replacing yourself as the person who prompts the agent. You design the system that does it instead."

> "I believe this may be the future of how we work with coding agents. However, it's still early; I'm skeptical, and you absolutely have to be careful about token costs (usage patterns can vary wildly if you are token rich or poor)."

> "Once the agent writes the code for you, the value shifts to the parts that were always the actual job anyway, deciding what to build, checking it works, and reviewing it properly." (Oliver Huggins)

## Takeaways

- **Framing over novelty**: The term "loop engineering" labels a design pattern (agentic recursion with exit criteria) that practitioners are already using; the contribution is vocabulary and conscious system design.
- **Token cost as a first-class constraint**: Osmani explicitly treats variable token burn as a major risk factor in loop-based workflows; this is a sign that cost modeling and iteration budgeting are material to agent system design.
- **Human value preservation**: Multiple commenters converge on the idea that automation shifts human work upstream (to specification and validation) rather than eliminating it.
- **Skepticism warranted**: The framing as a new "engineering discipline" is acknowledged as overheated by critics; the actual technical contribution is incremental.
- **Control mechanisms exist**: Commenters note that max-iteration caps and token budgeting are already practiced mitigations, suggesting the pattern is not new but perhaps not yet systematized.

## Open questions

- What metrics distinguish a well-designed loop (converges quickly, low token cost) from a poorly-designed one (thrashes, burns tokens)?
- How do different model architectures (reasoning models, tool-use models) affect loop efficiency and termination behavior?
- What is the relationship between loop engineering and agent orchestration frameworks (e.g., ReAct, multi-agent delegation)?
- Is loop engineering primarily a code-generation pattern, or does it generalize to other agent tasks?
