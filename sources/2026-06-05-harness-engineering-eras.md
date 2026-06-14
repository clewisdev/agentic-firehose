---
title: "You're still prompt engineering like it's 2024: The three eras of AI"
url: https://www.linkedin.com/posts/charlie-hills_youre-still-prompt-engineering-like-its-share-7468240151362740224-l8FH/
authors: [Charlie Hills]
captured: 2026-06-05
source_type: post
topics: [context-engineering, harnesses, system-design, memory, personalization]
tags: [claude, workflow, architecture]
signal_level: medium
status: summarized
confidence: medium
freshness_until: unknown
---

## Summary

Charlie Hills frames the evolution of AI engineering in three eras, moving away from prompt optimization toward system architecture. The framing traces a shift from isolated prompting to context management to comprehensive "harness engineering."

**Era 1: Prompt Engineering (2022–2024)** — Output quality determined by prompt wording; instructions, role, and format bundled into a single message; no memory, tools, or system state.

**Era 2: Context Engineering (2025)** — Attributed to Andrej Karpathy. Recognition that models see finite context windows; engineering work shifts to *curation*—pulling relevant docs, tools, memory, and conversation history. "Better context beats a cleverer prompt."

**Era 3: Harness Engineering (2026)** — Attributed to Mitchell Hashimoto. Context engineering plus five structural components:
- Personalisation
- Delegation
- Memory
- Context
- Action

Hills argues that LLM benchmarks have plateaued; competitive advantage now comes from the harness around the model. A chatbot is the harness stripped away; production AI systems are the harness bolted on.

## Relevant quotes

> "The benchmarks are virtually identical across LLMs. What separates outputs now is the harness you build."

> "You change a few words, get a better answer, and it feels like progress. But the real change is when you stop asking, 'How do I write this prompt better?' and start asking, 'What system does this AI need around it to actually do the work?'"

> "Most people optimising their prompts are tuning a radio that's already been replaced by streaming. The harness is the product now." (Elijah Tzanev, comment)

> "Businesses that treat AI as a one-off tool will likely be outperformed by those that build workflows where memory, context, and actions compound over time." (Santhosh Kumar, comment)

## Takeaways

- **Framing alignment**: The three-era model (prompt → context → harness) reflects real practitioner experience shift away from prompt tuning. Useful vocabulary for distinguishing engineering tiers.
- **Context as constraint**: Treating finite context windows as the primary design constraint is concrete and actionable. Shifts focus from "better prompts" to "better retrieval, memory, and information architecture."
- **Harness components**: The five-part decomposition (personalisation, delegation, memory, context, action) mirrors production agentic system patterns (e.g., multi-turn state, tool routing, personalization layers).
- **Architectural reframing**: The argument that plateau in benchmarks makes harness design the differentiator is a reasonable hypothesis but not empirically validated here.
- **Comment depth**: The thread includes practitioners corroborating the shift—HR ops examples (process ownership before prompt), email analogy (sequence logic over subject-line rewrites) add credibility.

## Open questions

- What specific metrics or examples define "harness engineering" working vs. not? The breakdown of the five components exists but lacks concrete before/after or failure modes.
- How does this framework apply to single-turn vs. multi-turn contexts? The era framing assumes stateful, memory-aware systems.
- Is the attribution to Karpathy (context engineering) and Hashimoto (harness engineering) documented elsewhere, or is this Hills' framing?
- How do the five harness components interact or trade off? Personalisation vs. delegation vs. memory could conflict; no discussion of prioritization.
