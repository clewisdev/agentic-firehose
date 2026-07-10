---
title: "Experiences with local models for coding"
url: https://martinfowler.com/articles/exploring-gen-ai/local-models-for-coding-experiences.html
authors: [Birgitta Böckeler]
captured: 2026-07-10
source_type: blog
topics: [harnesses, tool-use, agentic-workflows, code-generation]
tags: [local-models, qwen, gemma, eval-methodology, javascript, typescript]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Birgitta Böckeler, Distinguished Engineer at Thoughtworks, reports hands-on experiences running small language models locally on developer machines (M3 Max 48GB, M5 Pro 64GB) for agentic coding tasks. This is a practitioner-authored follow-up memo to earlier coverage of the viability factors; here she documents concrete task selection, model performance, and workflow integration.

### Viability funnel framework

Böckeler structures her evaluation as a progressive funnel:
1. RAM capacity (baseline 48GB)
2. Response latency (smoke test)
3. Tool-calling capability (file read/write in harness)
4. Functional correctness (single task)
5. Conversation length / context handling
6. Complex task handling
7. Code quality vs. review burden trade-off

This methodologically honest framework distinguishes *can it work* from *is it worth integrating*.

### Evaluation phases and findings

**Phase 1 (manual):** Tested Qwen3.6 35B, Gemma 4 31B/26B, Qwen Coder Next 80B MoE with OpenCode and Pi harnesses. Results were inconsistent and highly task-dependent:
- Qwen Coder Next 80B: functionally correct on Task 1 (bar chart sort/cumulate) in 2.5 min on M5 Pro, but runtime crashed on follow-up message (capacity but not practical)
- Qwen3.6 35B & Gemma 4 31B: handled sorting but required 15 min back-and-forth on cumulative percentages
- Gemma 4 26B: full Task 1 success, but generated "text wall of doom" on continuation (presence penalty mentioned but untested)

**Phase 2 (automated):** Contradicted manual results:
- Gemma 4 26B failed 3/3 (x-axis label failures)
- Qwen3.6 35B MoE succeeded 2/2
- Key gap: automated one-shot did not use browser sensor to self-correct (manual eval involved iterative conversation)

**Phase 3 (day-to-day):** Qwen3.6 35B MoE selected for production integration on daily tasks (JavaScript/TypeScript primary, some Python/shell scripts).

### Task design insights

Task selection is the largest factor in viability assessment. Two test tasks detailed:

**Task 1:** Modify bar chart—change title, sort bars, add cumulative percentage x-axis labels (10-bar intervals). Requires trivial code search, 1–2 file changes. Models struggled most with cumulative label calculation.

**Task 2:** Create horizontal bar chart of top 10 countries from access_log data, with "Other" rollup for remainder and missing values. Single-file edit, aggregation logic required.

### Critical quotes

> "It's about complexity of the task (How good is the model at reasoning?), about the number of files we estimate the agent will have to read and write (How good is the model at tool calling? How big is the context window?)"

> "Frustratingly, the automated setup did not confirm the manual experience."

> "Expanding sensors and sensor use could lead to self-correction that would make this more viable in real usage."

### Takeaways

- **Evaluation is task-brittle**: Same model produces wildly different results on different coding tasks; choosing representative tasks is harder than running eval
- **Manual vs. automated gap**: Interactive conversation (manual) outperforms one-shot evaluation; sensor integration (e.g., browser feedback) changes model behavior materially
- **Memory != viability**: 80B models can run on 64GB but may crash under conversation extension; practical viability requires sustained operation
- **Context window and tool-calling are joint constraints**: Cumulative calculations and multi-file changes expose both reasoning limits and tool-use reliability
- **Code quality deferred**: Phase 1 ignores code quality entirely ("if the models cannot even give me functionality right, the quality doesn't matter"), shifting focus to output correctness first

### Open questions

- How much does presence penalty mitigate the text-wall-of-doom failure mode in Gemma 4 26B?
- What is the effect of multi-turn conversation on Qwen3.6 35B MoE stability over longer sessions?
- Does adding browser / test-execution sensors significantly improve one-shot performance (closing the manual/automated gap)?
- How do results scale to Python, Go, Java (tested only JS/TS at scale)?
- What is the actual code review burden vs. review time saved for daily integration workflow?
