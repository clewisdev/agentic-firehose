---
title: "AI Slop Is Changing How Engineers Review Code"
url: https://spectrum.ieee.org/ai-code-review-software-engineers
authors: [Aaron Mok]
captured: 2026-09-13
source_type: article
topics: [code-review, tool-use, agentic-workflows, engineering-judgment]
tags: [code-generation, llm-output, pull-request-review, code-quality, entry-level-engineers, spec-driven]
signal_level: medium
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

IEEE Spectrum reports on how companies are restructuring code review processes to handle the volume and quality issues of AI-generated code. While AI tools can now generate thousands of lines of code in minutes, the output frequently contains "sloppy mistakes" including faulty assumptions, security vulnerabilities, and subtle logic errors that pass surface inspection.

The core tension: a Sonar survey of 1,100+ developers found that 42% of contributed code came from AI, yet 96% of developers did not fully trust its correctness. This has created a bottleneck shift—from code generation to code review.

### Key practitioner insights:

**Synthesia (AI video platform, 118 engineers):** After adopting Claude Code in November 2025, pull request volume surged 120% YoY, with 95% containing AI-generated code. Chief CTO Peter Hill reports recurring duplication problems where AI generates multiple versions of the same function due to limited context. Engineers must manually identify and remove redundant code, then retrain the agent. Hill: "I don't know if we ever get to the point where you can truly trust the agentic generation of code."

**Amazon Stores (70-person platform team supporting 1,000+ developers):** Senior Principal Engineer McLaren Stanley uses pre-generation specification writing to prevent mistakes. Example: a missing instruction once caused the agent to generate 25,000 lines in the wrong Swift version, producing 600 unfixable errors. Correcting the spec and restarting fixed it in 15 minutes.

### Emerging strategies for review:

1. **Pre-generation specification:** Detailed plans written before AI coding reduces rework and prevents architectural drift.
2. **Specialized AI agents in review workflows:** Some teams deploy agents to catch routine flaws before human review.
3. **Triage by risk:** Risky changes routed to human reviewers; routine changes may skip human gates.
4. **Agent accountability:** Developers must defend and explain code their agents produced.
5. **Retraining loops:** Teams iteratively improve agent behavior based on review findings.

### Market signals:

CodeRabbit (AI code-review startup) raised $143M at $1.5B valuation (August 2026), claiming 2M+ reviews/week for 17,000 customers including Nvidia, Indeed, and BMW Group. This indicates investor confidence in code review as a sustainable bottleneck.

## Verbatim quotes

"AI-written code is shifting the bottleneck from generating software to reviewing it."

"Sixty-one percent of them said AI often produced code that looked correct but was 'unreliable.'"

"I don't know if we ever get to the point where you can truly trust the agentic generation of code." — Peter Hill, CTO, Synthesia

"With AI writing the code, Stanley said, engineers spend more time deciding what it should do before generation begins."

"Fixing those problems could erase the productivity gains AI promises."

## Takeaways

- **Code review is now the critical path**, not generation; volume and quality mismatch threatens AI's ROI promise.
- **Specification-driven workflows** (pre-generation planning) are emerging as a practical mitigation, but require process change and discipline.
- **AI cannot currently self-verify correctness**; human judgment remains essential for security, logic, and architectural decisions.
- **Early-career engineer development risk:** If juniors spend less time writing code themselves, how do they develop the judgment to review it?
- **Market validation:** Substantial VC backing of code-review automation suggests this is a durable problem, not transient.

## Open questions

- How do specification-writing costs compare to the time saved by AI code generation? Is the net still positive?
- What does effective "retraining" of agents look like? Is it one-shot prompt refinement or systematic ML feedback loops?
- Are there measurable failure modes (security, performance, correctness) that distinguish human-reviewed vs. agent-reviewed AI code?
- How do teams scale code-review capacity without hiring reviewers proportional to 120% PR growth?
- Can entry-level engineers develop sound judgment without hands-on coding experience? What's the pedagogical model?
