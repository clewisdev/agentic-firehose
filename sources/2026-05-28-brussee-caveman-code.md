---
title: "Caveman-Code: Terminal Coding Agent with 1.93x Token Reduction"
url: https://github.com/juliusbrussee/caveman-code
authors: [Julius Brussee]
captured: 2026-05-28
source_type: repo
topics: [harnesses, cost-management]
tags: [token-efficiency, caveman, coding-agent, pi-framework, benchmark, output-caps]
signal_level: high
status: summarized
confidence: high
freshness_until: 2026-Q4
---

# Caveman-Code

Terminal coding agent by Julius Brussee that achieves 1.93× fewer tokens than Codex CLI on identical tasks, same model, same reasoning level. MIT licensed, 20+ LLM providers, built on pi-code framework (earendil-works/pi by Mario Zechner).

*Surfaced via [Denton-David LinkedIn post](https://www.linkedin.com/posts/denton-david_great-work-julius-brussee-its-simple-enough-share-7463269531474571264-8_F6/), flagged as "(Very relevant)" by owner.*

## Summary

Brussee's core thesis: the token cost of a coding session is dominated by **output verbosity and redundant reads**, not by reasoning depth. By compressing agent outputs without reducing technical accuracy, the same reasoning budget does more work.

Four specific techniques:

1. **Terse model replies** — the agent is instructed to communicate in compressed form (the "caveman" mode: no filler, no pleasantries, exact technical terms preserved). Based on Brussee's earlier `caveman` Claude Code skill (65% token reduction via caveman-style output).

2. **Per-tool output caps with ANSI stripping and JSON/XML extraction** — raw tool output is preprocessed before the model sees it. ANSI codes stripped, structured data extracted from noisy shell output. Each tool has a max-token budget; output exceeding it is truncated or summarized.

3. **File-read deduplication across sessions** — if the same file has been read in the current session, subsequent reads return a cached version rather than re-ingesting. Eliminates the common pattern of an agent re-reading large files repeatedly during long sessions.

4. **Optional Rust binary for bash output rewriting** — high-performance preprocessing of bash command output before it reaches the model. The Rust layer handles ANSI stripping and JSON extraction without token cost.

### Benchmark (25-task suite)

| Agent | Tokens | Pass rate |
|-------|--------|-----------|
| Caveman-code | 524k | 14/25 |
| Codex CLI | 1,010k | 15/25 |

Near-identical pass rate at roughly half the token cost. Results are reproducible: published CSV data and per-task logs.

Note: one pass fewer on 25 tasks — the token savings come at a ~4% accuracy cost. That trade-off is context-dependent; for cost-sensitive bulk tasks where near-parity is acceptable, this is a meaningful saving.

## Separate: the `caveman` Claude Code skill

Brussee also publishes a standalone `caveman` skill (distinct from caveman-code) which is purely an output style instruction: "talk like caveman." This is the version that appears in Regnology's shared skill library and Matt Pocock's skills collection. The skill reduces output tokens by 65% through compressed prose, with guardrails preserved for security warnings, irreversible operations, and confusing multi-step sequences.

## Key quotes

(from Denton-David's post summarizing the benchmark)
> "1.93× fewer tokens than Codex CLI on the same tasks, same model, same reasoning level"
> "Caveman: 524k tokens, 14/25 pass — Codex: 1,010k tokens, 15/25 pass"

## Takeaways

- **Output verbosity is the dominant cost driver, not reasoning.** The 1.93x saving comes entirely from compressing outputs, not changing how the model thinks. This is an important framing: optimizing reasoning is hard; optimizing output formatting is tractable.
- **Per-tool output caps deserve to be a first-class harness concern.** The naive approach is to give the model everything a tool returns; the right approach is to budget each tool's output and preprocess it. This is exactly the kind of thing AGENTS.md / harness configuration should control.
- **File-read deduplication should be default behaviour**, not an optimization. Most frameworks don't deduplicate; this is low-hanging fruit for any custom harness.
- **The caveman skill is an independent win.** Even without the full caveman-code agent, adding the caveman output instruction to any Claude Code session captures a significant fraction of the savings with zero infrastructure cost.
- **The 4% accuracy cost is real.** Don't apply caveman mode to tasks where correctness matters more than cost (architecture reviews, security analysis, novel problem-solving).

## Open questions

- Does per-tool output capping cause the agent to miss information that matters? The benchmark shows a small accuracy drop — is this systematic (the agent misses specific tool outputs) or noise?
- How does file-read deduplication interact with files that change mid-session? If a tool modifies a file, does the cache invalidate?
- Relationship to pi-code's architecture: is caveman-code a fork of pi or a layer on top of the pi framework's APIs?

## Related

- `sources/2026-05-28-pi-agent-framework.md` — underlying pi-code framework
- `sources/2026-05-28-regnology-teams-snippet.md` — caveman skill in Regnology shared library context
- `topics/cost-management/index.md`
- `topics/harnesses/index.md`
