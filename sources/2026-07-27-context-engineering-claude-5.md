---
title: "The new rules of context engineering for Claude 5 generation models"
url: https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
authors: [Anthropic]
captured: 2026-07-27
source_type: blog
topics: [context-engineering, agent-architecture, prompting]
tags: [claude-5, system-prompt, claude-code, skills, memory, tools]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Anthropic reports a major shift in context engineering for Claude 5 generation models, driven by the models' improved judgment and capability. The key finding: they removed over 80% of Claude Code's system prompt for Claude Opus 5 and Fable 5 with no measurable loss on coding evaluations.

The post documents a transition from rigid, constraint-heavy prompting to judgment-based guidance:

**Shift 1: Rules → Judgment**
Older models required explicit guardrails (e.g., "never write multi-paragraph docstrings") to avoid failure modes. Newer models handle contextual decisions better. Example: replacing "default to no comments" with "write code that reads like surrounding code—match its comment density, naming, and idiom."

**Shift 2: Examples → Interface Design**
Former best practice was giving tools/scripts usage examples. Claude 5 models generalize better from well-designed interfaces. Example: defining a Todo tool's status field as an enumeration (pending, in_progress, completed) provides enough signal without explicit examples.

**Shift 3: Upfront Information → Progressive Disclosure**
System prompts historically frontloaded all context (e.g., detailed code review instructions). Claude 5 now selectively loads context as needed via skills and deferred-loading tools, reducing cognitive load and prompt bloat.

The post also addresses the problem of **conflicting context layers**: system prompts, CLAUDE.md files, skills, and user requests can contradict each other (e.g., "leave documentation as appropriate" vs. "DO NOT add comments"). Newer models interpret user intent to resolve these, but the lesson is to reduce constraint density rather than stack conflicting rules.

Anthropic introduced `/doctor` command in Claude Code to help practitioners audit and rightsize their skills, CLAUDE.md files, and system prompts.

## Verbatim quotes

> "We removed over 80% of Claude Code's system prompt for models like Claude Opus 5 and Claude Fable 5 with no measurable loss on our coding evaluations."

> "Generally, Claude can interpret the user's intent to get to the right answer, but Claude must think more carefully about these overlapping and conflicting messages before deciding what to do."

> "Without these guardrails for older models, the comments Claude wrote would be incorrect in many cases and we had to accept this tradeoff. But newer models have better judgement and can handle these decisions well without explicit rules."

> "With our newest models, we've found that giving examples actually constrains them to a certain exploration space. Instead of using examples, think more about the design of your tools, scripts and files."

> "Claude Code has gotten very competent at using progressive disclosure—loading the right context at the right times."

## Takeaways

- **Reduce constraint density in system prompts for Claude 5+**: explicit rules that worked for older models now slow down and over-specify newer ones. Favor open-ended guidance that trusts judgment.
- **Interface design over examples**: well-designed tool/API signatures (parameter names, types, enumerations) signal intent more efficiently than usage examples, which can constrain exploration.
- **Progressive disclosure over monolithic context**: move detailed guidance into skills and deferred-loading tools that Claude activates as needed, rather than frontloading all context.
- **Audit conflicting context layers**: system prompts, CLAUDE.md, skills, and memory can contradict. Consolidate and simplify rather than stack rules.
- **Practical tool**: use `/doctor` command to rightsize context in Claude Code; applicable to custom agent context engineering as well.

## Open questions

- What is the specific threshold or rubric for deciding *which* constraints to remove? Are there categories of rules that are safe to delete (e.g., style) vs. risky (e.g., security)?  
- How does progressive disclosure interact with token budget? Are there cases where deferring context loading increases total tokens due to repeated context-setting?  
- Does the 80% reduction apply equally to all Claude 5 variants (Opus, Sonnet, Haiku), or are the gains model-size dependent?  
- How are conflicting intents resolved when system prompt, skills, and user request all suggest different behaviors? Is there a precedence hierarchy?
