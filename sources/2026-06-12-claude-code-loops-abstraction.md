---
title: "Claude Code's creator on moving beyond prompting to loops and agentic workflows"
url: https://www.linkedin.com/posts/divyanshis-saasleadgen_claude-codes-creator-said-something-that-ugcPost-7471156617858703361
authors: [Boris Dayma, Divyanshi Sharma]
captured: 2026-06-12
source_type: post
topics: [agent-architecture, tool-use, agentic-workflows]
tags: [claude-code, loops, workflows, anthropic, agent-patterns]
signal_level: medium
status: summarized
confidence: high
freshness_until: 2026-Q3
---

## Summary

LinkedIn post from Divyanshi Sharma highlighting a transcript excerpt from Boris Dayma (Claude Code creator at Anthropic). The core signal: **movement from direct prompting to agentic loop abstractions as the primary unit of work**.

Key claim: "I don't prompt Claude anymore. I write loops — and the loops do the work. My job is to write loops." This reflects a shift in developer practice from optimizing for prompt quality to designing self-directed agent flows.

Dayma provides context on Claude Code's origin: built by Anthropic's Labs team (late 2024) to explore the model's frontier capabilities in coding. He frames coding as an ideal test domain for AI safety research — deterministic (code compiles or doesn't), bounded solution space, clear pass/fail, abundant training data.

Relevant background from transcript:
- Initially Claude Code wrote 10–20% of code; iteration led to higher autonomy
- Anthropic's research direction has always centered AI safety; coding tools are a vehicle to "study the model in the wild"
- Contrasts code (constrained, verifiable) with natural language (infinite correct solutions)
- References building dev tools as a side pursuit, focused on solving business problems users actually need

## Verbatim quotes

"I don't prompt Claude anymore. I write loops — and the loops do the work. My job is to write loops."

"Most developers are still crafting the perfect prompt. The person who built the tool moved past prompting entirely."

"[Coding is] the way the model interacts with the world. And so if you want to study kind of various sorts of model misalignment, you wanna make it useful enough that people use it so that you can study it."

"There's such an unbelievably clean universe because you've got all this training data. It either works or doesn't work... there's a very constrained... number of ways that you can write the correct code to solve a certain problem."

## Takeaways

- **Abstraction shift**: prompting → loop-based agent orchestration. Loops become the primitive; developer role shifts to loop design and governance.
- **Practical signal that agentic patterns scale**: creator's own workflow validates the loop/agent model as more productive than prompt refinement.
- **Coding as safety petri dish**: Anthropic's deliberate choice to develop Claude Code as both product and research vehicle; deterministic feedback enables safety iteration.
- **Tool-building philosophy**: dev tools work best as side focus on solving real business problems, not as primary product obsession.
- **Frontier vs. product misalignment**: early state (2024) had "product overhang" — models could do more than tools exposed; coding was obvious gap to fill.

## Open questions

- What does the "loop" primitive concretely map to in Claude Code's API? (Agentic loop? Tool-use loop? Retry logic?)
- How do developers decide loop termination and handoff back to human judgment?
- What failure modes emerge when loops are the primary abstraction? How is misalignment surfaced?
- Does Anthropic publish telemetry on loop success rates / user retention since Claude Code launch?
