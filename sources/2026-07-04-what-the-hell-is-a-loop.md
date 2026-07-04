---
title: "What the hell is a loop, anyway?"
url: https://www.linkedin.com/posts/seldo_my-biggest-learning-from-ai-engineer-worlds-ugcPost-7478903718839472128-yllD/
authors: [Laurie Voss]
captured: 2026-07-04
source_type: post
topics: [agent-architecture, agent-orchestration, agentic-workflows]
tags: [feedback-loops, software-factories, oversight, agents, harness-engineering]
signal_level: medium
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Laurie Voss provides a taxonomy of five distinct "loops" in agentic systems that are often conflated under one name at industry conferences. The post maps the execution loop (inside agents), task loop (restart agent until spec satisfied), product loop (entire codebase as software factory), system loop (improving the system itself), and critically, the oversight loop—the one "where you should live."

The core insight is semantic chaos: practitioners at AI Engineer World's Fair used "loop" to mean radically different things, yet the conversations treated them as equivalent. Voss synthesizes these into a coherent model and emphasizes that oversight—the human decision point in the stack—is where authority and responsibility should sit.

The post is framed as a reaction to conference conversations, including swyx's keynote, a software-factory track, and a formal debate on loop hype vs. practice. Comments reveal tension: Aaron Stanley warns that "a factory that only knows how to run in a loop isn't autonomous, it's unsupervised," and notes the andon-cord problem—humans become bottlenecked reviewers. Taya Irizarry pushes back, arguing for keeping development velocity aligned with human conceptualization. Hashim Warren cites OpenAI's harness-engineering framing: the engineering team's job is no longer to write code but to "design environments, specify intent, and build feedback loops."

## Key Quotes

> "The biggest problem with loops is that everyone saying 'loop' means something different. I counted at least four distinct things all given the same name."

> "In this post I map out all five, what you need to know about them, and what this means for your everyday work of building."

> "A factory that only knows how to run in a loop isn't autonomous, it's unsupervised." — Aaron Stanley (comment)

> "I am a believer in keeping the speed of development at the pace of human conceptualization, otherwise how can we be sure our goal setting and evaluations of 'done' are relevant and meaningful?" — Taya Irizarry (comment)

## Takeaways

- **Taxonomy matters**: Five distinct loop types are live in the ecosystem; conflating them causes miscommunication about responsibility, automation, and oversight.
- **Oversight is the critical loop**: The human decision point is not a bottleneck to optimize away—it's the control surface where confidence and accountability live.
- **Harness engineering reframes the role**: Engineering teams shift from writing code to designing feedback loops and specifying intent; agents execute, humans adjudicate.
- **Feedback control systems are ancient**: Comments note this is a rediscovery of control theory; the pattern recurs every decade in software engineering.
- **Human pacing is non-negotiable**: Keeping development velocity aligned with human conceptualization is framed as a constraint that drives creativity and meaning.

## Open Questions

- How do these five loops map onto real deployed agentic systems? Are all five present in a mature software factory, or are some optional?
- Where does memory fit? (A commenter noted the omission.)
- How do teams actually implement the oversight loop in practice without it becoming a human bottleneck?
- What does "designing environments, specify intent, and build feedback loops" look like in code?
