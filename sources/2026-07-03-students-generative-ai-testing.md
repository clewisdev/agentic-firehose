---
title: "How students use generative AI for software testing: An observational study"
url: https://link.springer.com/article/10.1007/s10664-026-10898-0
authors: [Baris Ardic, Quentin Le Dilavrec, Andy Zaidman]
captured: 2026-07-03
source_type: paper
topics: [evals, agent-architecture, engineering-judgment]
tags: [chatgpt, unit-testing, gpt-3.5, prompting-strategies, novice-developers, human-ai-collaboration]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

An empirical study of 12 undergraduate students with foundational testing knowledge using ChatGPT (GPT-3.5) for unit test engineering. The researchers observed actual workflows, prompting patterns, and perceived benefits/challenges rather than measuring test quality in isolation.

**Key findings:**

1. **Four interaction strategies identified**: distinguished by whether test *idea* or *implementation* originated from AI or student. Prompting styles varied between one-shot and iterative generation.

2. **Perceived benefits**: time-saving, reduced cognitive load, support for test ideation. Students appreciated AI help with idea generation and initial scaffolding.

3. **Perceived challenges**: diminished trust in AI-generated tests, quality concerns, reduced sense of ownership. Novices struggled to critically assess AI outputs.

4. **Surprising null result**: strategy and prompting style did *not* significantly affect test effectiveness (mutation score) or code quality (test smells). This suggests interaction patterns may be decoupled from measurable outcomes—a critical finding for understanding where perceived value diverges from actual value.

5. **Learning dynamics unclear**: study notes that AI assistance's effect on learning (a key concern for novices forming testing habits) remains underexplored. Students may gain speed without building judgment.

## Verbatim quotes

"The effectiveness and reliability of AI-assisted workflows depend not only on the technical capabilities of the tools, but also on how developers use, adapt to, and critically assess their outputs."

"Students with foundational knowledge in software testing represent an important segment of emerging AI users: they are both motivated to seek assistance and still in the process of forming testing habits."

"While students can provide insight into how AI affects their workflow, confidence, and learning experience, researchers can analyze whether AI genuinely enhances the quality of their [tests]."

## Takeaways

- **Observational methodology matters**: measuring prompts, workflows, and self-report alongside test metrics reveals misalignment between perceived and actual benefits—a signal that confidence/trust may be poorly calibrated.
- **Novice interaction patterns differ from outcomes**: no significant correlation between interaction strategy and test quality suggests students' chosen workflows may not be optimized for correctness, only convenience.
- **Learning risk flagged but not measured**: the paper identifies that AI-assisted testing may short-circuit habit formation in novices (a critical concern for agentic workflows in education) but doesn't measure it—leaves this as future work.
- **Prompting styles don't determine quality**: both one-shot and iterative approaches produced similar test metrics, implying that *how* students prompt is orthogonal to test validity.
- **Trust deficit is real**: diminished trust and reduced ownership despite quality parity suggests perception lags reality—or that students are right to distrust on unmeasured dimensions (maintainability, test design philosophy, coverage intent).

## Open questions

1. **Does AI assistance in testing actually impair judgment formation?** The study notes novices are "still in the process of forming testing habits" but doesn't measure whether AI shortcuts this process or defers it. Longitudinal follow-up required.
2. **What unmeasured quality dimensions matter?** Mutation score and test smells are narrow. Do AI-generated tests have other failure modes (brittleness, unclear intent, poor abstraction)?
3. **Why do prompting strategies not correlate with outcomes?** If students' chosen workflows don't affect test quality, what *does*? Is it the model's inherent quality, or are students' differences in skill masked by tool ceiling?
4. **How would results differ with GPT-4 or newer models?** Study used GPT-3.5 (June 2026); model capability has likely shifted.
5. **Does self-reported benefit map to actual productivity?** "Time-saving" is cited as benefit, but was it actually measured, or inferred?
