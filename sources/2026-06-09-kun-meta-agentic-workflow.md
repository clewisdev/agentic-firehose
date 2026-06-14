---
title: "5 takeaways from Kun (ex-Meta L8) on agentic engineering systems"
url: https://www.linkedin.com/posts/petergyang_my-5-biggest-takeaways-from-kun-ex-meta-share-7469753812900069378-aWVd/
authors: [Peter Yang, Kun (ex-Meta L8 engineer)]
captured: 2026-06-09
source_type: post
topics: [workflow, planning, validation, parallel-execution, code-review]
tags: [lavish, treehouse, no-mistakes, agent-coordination, planning]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Peter Yang interviews Kun, an ex-Meta L8 engineer, on his approach to building agentic engineering systems. The core thesis: effective agentic work is **planning-first**, not code-first. Kun frames his role as manager of an "always-on engineering team" where agents handle execution.

Key practices:

1. **Planning as leverage**: One-line prompts keep agents working for minutes; detailed specs keep them working for hours. Upfront investment in goals, specs, and validation criteria directly extends agent autonomy.

2. **Visual > textual planning**: Built Lavish (open-source), an HTML-based plan viewer that allows inline feedback instead of reading markdown walls. Makes agent direction clearer before coding begins.

3. **Parallel + isolated execution**: Uses Treehouse to manage reusable worktrees, preventing agent conflicts. Exploratory or context-heavy work delegated to subagents; main agent stays focused on core tasks.

4. **Agent-to-agent code review**: Deployed No Mistakes to run fresh agent review on AI-written PRs, including rebase, test, docs, and risk assignment. Reported 68% mistake-catch rate across 267 agent changes in 15 repos that would have been missed in manual review.

## Verbatim quotes

> "Kun sees himself as the manager of an always-on engineering team. His job is to create plans, validate work, and improve the overall system. The coding phase is handled almost entirely by agents."

> "The quality of your plans determines how long agents can work on their own. Memes about loops aside, an one-line prompt might keep an agent working for a few minutes but a detailed plan can keep it going for hours."

> "If the work is exploratory or likely to fill the context window, he delegates it to a subagent. This way, the main agent stays focused while the subagents dig, test ideas, and report back."

## Takeaways

- **Planning is the primary engineering lever** in agentic systems; execution speed follows plan quality, not vice versa.
- **Visual feedback loops tighten agent direction** better than prose—consider artifact-based planning tools (Lavish cited) over markdown specs.
- **Isolation patterns reduce coordination overhead**—worktrees + subagent delegation prevent stepping-on-toes in parallel execution.
- **Agent-as-reviewer achieves measurable correctness gains**—No Mistakes reported 68% catch rate on missed errors, suggesting fresh-eye review (even by agent) outperforms tired human manual review.
- **The "manager" frame is key**: agentic engineering is not about replacing engineers but shifting work from execution to planning, validation, and system design.

## Open questions

- How does Lavish visual feedback translate into prompt improvements at runtime? (Do humans iterate on the plan mid-execution, or is it pre-flight only?)
- What triggers subagent delegation? Is there a heuristic or does Kun manually decide when context depth will explode?
- In the 267 change / 68% No Mistakes result: what was the baseline error rate without agent review? Was this compared to human review, or just catch ratio on actual bugs found post-deploy?
- How does Treehouse handle merge conflicts or cherry-pick ordering when subagents complete out of sync?

