---
title: "Introducing dynamic workflows in Claude Code"
url: https://claude.com/blog/introducing-dynamic-workflows-in-claude-code
authors: [Anthropic]
captured: 2025-06-09
source_type: blog
topics: [agent-orchestration, tool-use, code-generation, multi-agent]
tags: [claude, parallel-agents, workflow, codebase-analysis]
signal_level: high
status: raw
confidence: high
freshness_until: 2025-Q4
---

## Summary

Anthropic announced dynamic workflows in Claude Code, a capability allowing Claude to orchestrate tens to hundreds of parallel subagents in a single session for complex, end-to-end engineering tasks. The system dynamically plans work, breaks it into subtasks, fans execution across parallel agents, validates results before integration, and converges on coordinated answers through iterative checking and adversarial verification.

**Availability**: Research preview in Claude Code CLI, Desktop, VS Code extension (Max/Team/Enterprise plans); also on Claude API, Amazon Bedrock, Vertex AI, Microsoft Foundry.

**Key use cases from early access:**
- Codebase-wide bug hunts with parallel search and independent verification on every finding
- Large migrations and modernization (framework swaps, API deprecations, language ports spanning thousands of files)
- Critical work requiring dual checking: independent problem attempts + adversarial agents testing for breakage
- Dead code discovery and cleanup opportunities via parallel analysis
- Security audits, hardening passes (auth checks, input validation)

**Concrete example**: Jarred Sumner used dynamic workflows to port Bun from Zig to Rust:
- 750,000 lines of generated Rust
- 99.8% of existing test suite passing
- Eleven days from first commit to merge
- First workflow mapped correct Rust lifetimes for every struct field
- Second workflow spawned hundreds of parallel agents, each porting a .zig file with two reviewers per file
- Fix loop drove build and test suite until clean; overnight workflow addressed unnecessary data copies

**Technical mechanics**:
- Claude plans dynamically from prompt, breaks into subtasks, fans work to subagents
- Results checked before folding in; agents approach problem from independent angles
- Other agents attempt to refute findings; iteration continues until convergence
- Progress saved incrementally; interrupted jobs resume rather than restart
- Coordination happens outside conversation so plan stays on track at scale
- Capable of multi-hour/multi-day runs

**Activation**: Two entry points:
1. Direct: "Create a workflow" prompt to Claude
2. Setting: `ultracode` mode (effort level xhigh) lets Claude decide when to invoke workflows

**Important caveat**: Dynamic workflows consume substantially more tokens than typical Claude Code sessions. First workflow trigger shows what will run and requires confirmation. Organization admins can disable via managed settings.

## Verbatim quotes

> "Dynamic workflows have been especially valuable for discovery and review tasks across large codebases. We've seen strong results using it to identify dead code and surface cleanup opportunities that traditional static analysis missed, helping our engineers move faster on maintenance and refactoring work." — Alessio Vallero, Senior Engineering Manager

> "Dynamic workflows fill the gap between firing off a single subagent and building out a full agent team. Plan to implementation just flows, so we can trust longer runs without losing visibility." — Ken Takao, Lead Systems Engineer

> "Work you'd normally plan in quarters now finishes in days. Claude dynamically writes orchestration scripts that run tens to hundreds of parallel subagents in a single session, checking its work before anything reaches you."

> "Dynamic workflows are built for parallel and long-running work that can extend into hours and days, doing the most complex engineering work that previously would have taken weeks."

## Takeaways

- **Orchestration abstraction**: Workflows handle agent coordination, planning, and convergence outside the conversation loop—a shift from single-agent to multi-agent-as-runtime model
- **Validation built-in**: Adversarial agents and independent verification on findings reduce hallucination risk on long-running, complex tasks
- **Cost/benefit tradeoff**: Documented that token consumption is "substantially more" than single-pass sessions; practitioners need to scope work carefully
- **Large-scale migration proof**: Bun port (750K Rust LOC in 11 days) demonstrates feasibility of LLM-orchestrated refactoring on real production codebases
- **Discrete use case pattern**: Works well for analysis/audit/migration tasks where output is verifiable; less clear applicability to open-ended design or decision-making tasks

## Open questions

- How does token cost scale with codebase size and number of parallel agents? (No published metrics beyond "substantially more")
- What convergence criteria trigger end-of-workflow vs. continued iteration? Configurable?
- How are long-running sessions (hours/days) handled w.r.t. rate limits, session timeouts, billing snapshots?
- What percentage of early-access tasks actually benefit from parallelization vs. simpler sequential approaches?
- Can workflows be composed or chained, or is each workflow independent?
