---
title: "AI sprinkled on top of a broken software lifecycle is a band-aid on cancer"
url: https://www.linkedin.com/posts/petarivanovv9_ai-sprinkled-on-top-of-a-broken-software-share-7462879286937649152-Ixjl/
authors: [Petar Ivanov]
captured: 2026-05-31
source_type: post
topics: [ai-productivity, code-review, engineering-judgment, system-design]
tags: [hanselman, agentic-review, context-engineering, qodo]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Petar Ivanov posts on a podcast episode featuring Scott Hanselman discussing the actual role of AI in software engineering, rejecting both extremes ("engineers will be replaced" vs. "AI code is garbage"). The thread argues that the real value shift is from code *typing* to *engineering judgment* — code review, system design, standards maintenance, trade-off understanding, and knowing when AI is wrong.

Key claims:
- Hanselman's framing: "AI sprinkled on top of a broken software lifecycle is a band-aid on cancer."
- Engineering judgment (not typing speed) is what matters more in the AI era.
- "AI agents replace engineers" narrative "falls apart once you actually look at the data."
- Context engineering is a critical lesson from the podcast.
- AI tooling can finally give managers visibility into *how* software is built, not just metrics theater.

The thread emphasizes the "messy middle" — practical production engineering questions, not hype or engagement bait.

## Verbatim quotes

> "Typing code is becoming less valuable. Engineering judgement is becoming more valuable. Code review. System design. Maintaining standards. Understanding trade-offs. Knowing when AI is wrong. That matters more now, not less."

> "AI tooling might finally give engineering managers real visibility into how software actually gets built. Not just lines-of-code theatre."

> "A lot of the 'AI agents replace engineers' narrative falls apart once you actually look at the data."

## High-signal comment (Joe Feser)

In the comments, Joe Feser describes actual workflow:
> "We do not treat AI review as the authority; we treat it as evidence in a human-approved loop. Qodo is useful because it catches concrete PR issues, stale assumptions, duplicated logic, and missing edge cases after the spec and implementation already exist. But the important part is the boundary: Qodo can raise findings, Codex/Kiro can implement or review, Opus/Sonnet can sanity-check architecture when needed, and the human still owns the merge decision and risk acceptance."

This is concrete — specific tool names, explicit ownership boundaries, and risk acceptance model.

## Takeaways

- **Judgment > automation**: The value shift is to human judgment in code review, design, and risk — not away from engineering entirely.
- **Data matters**: Dismisses hype by reference to actual data (though not linked in post).
- **Context engineering**: Flagged as an underappreciated lever in AI-assisted workflows.
- **Process first**: Comments echo the principle that AI amplifies existing process quality; broken processes stay broken faster.
- **Bounded AI use**: Practical teams treat AI as evidence in human-approved loops, not as the decision authority.

## Open questions

- What data are the podcast hosts referencing to debunk "AI agents replace engineers"? (Not provided in post.)
- What specifically is "context engineering" in this context — prompt design, RAG, code knowledge indexing?
- How do teams actually measure whether AI tooling improves manager visibility without adding more metrics theater?
- Are there specific failure modes where AI coding at the top of broken processes created measurable damage?
