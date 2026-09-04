---
title: "What is a Harness?"
url: https://earendil.com/posts/what-is-a-harness/
authors: [Earendil Product]
captured: 2026-09-04
source_type: blog
topics: [harnesses, agent-architecture, tool-use]
tags: [system-prompt, agentic-loop, translation-layer, agent-design]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

This post introduces the concept of an "agent harness" by drawing an extended analogy to climbing harnesses: a piece of equipment that provides structure, safety, tool attachment points, and portability. The author positions the agent harness as the core operating environment for AI agents, distinct from the model itself.

The post identifies four structural components of agent harnesses:

1. **System Prompt**: A set of instructions injected with every prompt, analogous to a new employee's first-day guidelines rather than internalized training-time rules. Unlike Claude's published "soul document," these are externally applied behavioral governors.

2. **Tools**: Code-backed capabilities (web search, code execution, email composition) that the model can invoke. Crucially, the harness makes tools available and describes them but does not dictate *when* or *how* the model uses them—that decision is the model's.

3. **Agentic Loop**: The iterative decision-making cycle where the model interprets a request, calls tools, evaluates results, and decides whether to loop again (search more, refine output, compose final result). The author illustrates this with a school-comparison workflow: search → spreadsheet creation → comparison to prompt → loop or close.

4. **Translation Layer**: Middleware that allows a single harness to work with multiple AI models (Anthropic, OpenAI, open-weight alternatives), enabling end users to compare cost and output without model lock-in.

The framing emphasizes user agency and decentralization: by owning a harness that abstracts the model layer, users retain freedom to swap models, run locally, and accumulate correspondence independent of AI labs.

## Key Quotes

> "Agent harnesses use AI models to create AI agents, and their first application was for coding. Now, agent harnesses sit at the core of all types of AI agents and understanding how an agent harness works will help you understand what an AI agent is."

> "An agent harness is a piece of software that provides an environment for an AI model to operate within. Unlike most AI models, you as an end user can own your own agent harness."

> "The System Prompt in an AI harness is similar to [an embedded soul document] but is less embedded into the model. It's more like a set of instructions a new employee might get on their first day of a job."

> "Critically, the harness usually does not dictate when and how the AI model should use the tool. Instead, it simply makes the tools available, describes them clearly, and allows the AI model itself to decide when and how it should use them."

> "If people can own and run their own harnesses locally on their own computers, it means that they retain their agency. It means that they retain the freedom to make their tools their own, and keep local copies of the sessions that over time will constitute their correspondence with machines."

## Takeaways

- **Harness ≠ Model**: An agent harness is the *environment* and *control layer* around a model, not the model itself. This abstraction enables model swappability and user ownership.
- **Agentic loop is iterative self-evaluation**: The loop isn't just tool-calling; it's the model's ability to assess whether tool outputs satisfy the original request and decide to loop again.
- **Tool autonomy is key design choice**: The harness provides tools but does not script their use; the model decides when to invoke them based on the task, enabling adaptive behavior.
- **Decentralization via translation layers**: The translation layer is a lever for user agency—it shifts power from AI labs to end users who can compare models and maintain local records.
- **System prompts are externalized governance**: Unlike training-time values, system prompts are injected per-session and can be modified or swapped without retraining.

## Open Questions

- How do harnesses handle model hallucination or tool misuse when the model has full discretion over when/how to call tools?
- What failure modes emerge when a model enters an infinite loop (e.g., repeated web searches that don't converge)?
- How do you version and manage system prompts across teams or across time as harness behavior needs to evolve?
- What are the performance trade-offs of translation layers vs. model-native APIs?
- Are there harness implementations that expose user agency (e.g., allowing users to edit system prompts or add custom tools) in production, and what patterns emerge from that?
