---
title: "What it feels like to work with Mythos"
url: https://www.oneusefulthing.org/p/what-it-feels-like-to-work-with-mythos
authors: [Ethan Mollick]
captured: 2026-06-11
source_type: blog
topics: [agentic-workflows, tool-use, code-generation, ai-productivity]
tags: [claude-5-fable, mythos-class, agentic-workflow, multi-agent-orchestration, long-horizon-tasks]
signal_level: high
status: summarized
confidence: high
freshness_until: 2026-Q3
---

## Summary

Ethan Mollick reports early hands-on experience with Claude 5 Fable, the first Mythos-class AI model released publicly. The piece is structured around concrete projects to demonstrate capability and shift in human-AI working relationships.

**Key capability claims:**
- Performs "a considerable margin" better than prior public models across diverse tasks
- Sustained execution on multi-page specifications for up to 12 hours
- Generated sophisticated academic papers, 10-page constraint-poetry (all words starting with 's'), interactive games with math-rendered graphics
- Built fully researched isochrone map with real travel data (2,200+ flight records, rail schedules, road speeds from academic papers)

**Agentic patterns observed:**
- Model launches subordinate agents (believed Sonnet-class) to conduct parallelized research while continuing to code
- Creates adversarial research workflows to verify results
- Makes hundreds of unobserved judgment calls without human oversight or rationale
- Uses "tremendous number of tokens" in short periods

**Most ambitious project:** 9.5-hour execution of "Concord" — software for calibrating human/AI judgments on categorized datasets. AI generated 19-page design doc, then executed implementation autonomously. Mollick reports needing to catch errors only as subject matter expert post-delivery.

## Verbatim quotes

> "Delightful because I just asked for something and it happened. And also unnerving because I just asked for something and it happened."

> "The details of the AI's decision making are not shown to me, and the process would be too long to even be worth following. The map required the AI to make judgement calls about hundreds of little choices, and it just made them, without me understanding the choices or having a chance to weigh in."

> "In many ways, it is miraculous (I can always ask for edits at the end) on the other, it turns AI into the ultimate black box."

> "[Fable] launched multiple other AIs (I believe mostly the cheaper Claude Sonnet) to help it conduct research on travel times, ultimately retrieving over 2,200 specific flights, the rail schedules for trains from the TGV to the Shinkansen, and road speeds per country from multiple academic papers."

> "The scope of the delivery on this project, and many others, exceeded anything I have seen before."

## Takeaways

- **Agent autonomy at scale**: Mythos-class models can spawn, orchestrate, and verify sub-agents without human intervention; human role reduces to goal-setting and post-hoc correction
- **Opacity cost**: Multi-step agentic workflows produce impressive outputs but hide decision rationale and intermediate choices — creates "black box" even for domain experts who can only verify final results
- **Sustained reasoning duration**: 9.5–12+ hour execution windows on single complex tasks suggest qualitative shift in context window or iterative refinement capability
- **Token economics shift**: Agentic workflows burn tokens at previously unseen rates; cost/benefit may reshape what tasks become feasible for practitioners
- **Human judgment remains necessary**: Even with autonomous execution, expert post-hoc review caught errors; automation doesn't eliminate need for domain validation

## Open questions

- How are token costs for 9–12 hour agentic runs priced in production? Does continuous execution remain economically viable at scale?
- What percentage of Fable's decisions were genuinely novel vs. following learned patterns from training data? (Mollick doesn't report internal transparency tools or interpretation attempts)
- Are the sub-agent spawning patterns (e.g., adversarial verification workflows) emergent from the model or explicitly prompted/constrained?
- How does this autonomy level affect liability, reproducibility, and auditability for regulated domains (research, medicine, finance)?
- Does the "black box" problem worsen or improve with domain-specific fine-tuning, or is it inherent to agentic orchestration?
