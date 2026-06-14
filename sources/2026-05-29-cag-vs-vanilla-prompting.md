---
title: "Context Over Cleverness: CAG and Files-as-Config versus Vanilla Prompting"
url: file://temp/context-augmented-generation-vs-vanilla-prompting.md
authors: [unknown]
captured: 2026-05-29
source_type: blog
topics: [prompting, harnesses, cost-management, evals]
tags: [cag, files-as-config, context-engineering, context-rot, vanilla-prompting, agents-md, metr, lost-in-the-middle, rules-as-nudges, hybrid-context]
signal_level: medium
status: summarized
confidence: high
freshness_until: 2027-Q1
---

# Context Over Cleverness: CAG and Files-as-Config versus Vanilla Prompting

Long-form synthesis piece. Tools: Cursor, OpenAI Codex, Claude Code. Current as of May 2026. No named author. Cites academic papers, vendor docs, and practitioner reports with explicit acknowledgment of commercial incentives.

## Summary

Files-as-config, CAG, and vanilla prompting are not rivals — they sit on a single **context engineering** spectrum. The central finding: durably encoded project context measurably reduces repeated prompting and rule violations, but more context is not free. Every frontier model tested in 2025 degrades as its input grows. The practical skill is **curation, not accumulation**.

### The "new contributor" diagnosis

The METR RCT (Becker et al., arXiv:2507.09089) — the only gold-standard productivity study to date — found AI tools made 16 experienced open-source developers ~**19% slower** on mature codebases. (They forecast 24% faster; believed they'd been 20% faster after the fact.) The study is narrow and used early-2025 tooling, but its signal matters: buried in the post-mortem was a participant describing the AI as *"a new contributor who doesn't yet understand the codebase."* That is the precise problem files-as-config addresses. METR's Feb 2026 follow-up (new tooling) concluded the data was too noisy to give a reliable signal — which is itself a comment on how hard this is to measure.

### Term precision

**CAG** collides in the literature with *Cache*-Augmented Generation (same move: preload rather than retrieve, often with KV-cache precomputation). The canonical academic reference is *"Don't Do RAG: When Cache-Augmented Generation Is All You Need"* (hhhuang et al., ACM Web Conference 2025). The agentic-engineering sense matches: load known context into the window rather than retrieving piecemeal.

**Files-as-config** = CAG with a durable, project-scoped payload. The relationship is nested: files-as-config ⊂ CAG ⊂ context engineering.

### Tool convergence

All three major tools converge on the same pattern with different names:

| Tool | File(s) | Distinctive feature |
|------|---------|-------------------|
| Claude Code | `CLAUDE.md` (+ skills, dir-level) | Skills load JIT by description match; Anthropic advocates hybrid not pure-CAG |
| OpenAI Codex | `AGENTS.md` (cascading hierarchy) | Closest-to-code file wins; `AGENTS.override.md` for temporary hardening |
| Cursor | `.cursor/rules/*.mdc` (+ reads `CLAUDE.md` and `AGENTS.md`) | YAML frontmatter scopes rules by glob pattern; most ecumenical |

**`AGENTS.md` is now a Linux Foundation standard** (Agentic AI Foundation, platinum members: Anthropic, Google, Microsoft, OpenAI). 60,000+ repos. Read natively by Codex, Cursor, Copilot, Gemini CLI, Aider, Windsurf, Zed. Anthropic still officially documents `CLAUDE.md` — a feature request for native `AGENTS.md` support is open. Pragmatic workaround: symlink `CLAUDE.md` → `AGENTS.md`, or use `AGENTS.md` as the universal base with a thin tool-specific layer.

### Evidence for CAG / files-as-config

- Reduces repeated prompting. A rule in `AGENTS.md` applies every run, for every team member, amortised across all future interactions.
- Shareable, versioned, auditable — reviewed in PRs, diffs over time, uniform application.
- Where corpus is stable and bounded, CAG beats RAG on simplicity and latency.

### Evidence against (the costs)

**Context rot** (Hong et al. / Chroma, 2025): tested 18 frontier models (GPT-4.1, Claude Opus 4, Gemini 2.5 Pro, Qwen3, others) — *every one* degrades as input length grows, even on trivial retrieval tasks well within nominal window capacity. Note: Chroma is a vector DB vendor, but findings align with independent academic work.

**Lost in the middle** (Liu et al., Stanford / TACL 2024): >30% accuracy drop when relevant material sits in the middle of context. Models attend strongly to start and end. Coding agents are the worst case — many file reads, one relevant function buried in distractor-rich context.

**Context length alone hurts** (Du, Tian et al., EMNLP 2025): performance degrades from length *even when retrieval is perfect*.

**Practical ceiling**: Anthropic's own guidance states performance declines once the window fills past roughly **~50%**. A bloated `AGENTS.md` can actively make the agent worse.

**Rules don't reliably change behaviour.** Crosley (2026) ran identical tasks with and without specific instructions across 10+ runs: a number of common `AGENTS.md` patterns produced *no observable change*. The acid test: **ask the agent to recite your build commands — what it can't recite, it won't follow.** Over-long files get truncated; critical rules get lost. Practical guidance: keep sections short, front-load critical rules, keep the whole file **under ~150 lines**. Rules are probabilistic nudges; for irreversible operations, the correct safeguard is a hard policy or sandbox — not a sentence in a markdown file.

### Dominant pattern: layered hybrid

Neither pure CAG nor pure vanilla, but:
- **Lean files-as-config base** (durable, project-wide truths)
- **JIT retrieval** for large or volatile material
- **Sharp inline prompting** for the specific task

Anthropic explicitly advocates JIT context in its context-engineering guidance: hold lightweight identifiers (paths, queries), pull data into context only when needed. Also described: structured `NOTES.md` (agent writes and re-reads) as cheap durable memory; and an empirical curiosity — the model is less likely to rewrite a status file if it is JSON rather than markdown.

### Decision framework

| Situation | Strongest approach |
|-----------|-------------------|
| Durable project-wide conventions | Files-as-config (`AGENTS.md` / `CLAUDE.md`) |
| Stable, bounded reference corpus | CAG / preload |
| Large, volatile, or sprawling corpus | JIT retrieval (paths + targeted reads) |
| Novel, one-off, exploratory task | Vanilla prompting |
| Irreversible / high-stakes action | Hard policy + sandbox, *not* a rules file |

Three rules of thumb:
1. **Curate, don't accumulate.** Front-load what matters; cut what the agent can't recite.
2. **Match volatility to mechanism.** Stable/small → preload. Large/changing → JIT. Durable/project-wide → files-as-config. Novel/specific → prompt inline.
3. **Treat rules as nudges, gates as guarantees.**

### Forward trajectory

- **Consolidation**: `AGENTS.md` as LF-governed base, thin tool-specific layers for proprietary features.
- **Agentic memory**: the frontier is moving from static config toward agent-maintained notes — machine-authored, self-curating, blurring the human-authored/machine-authored boundary.
- **Better evals**: the field needs controlled studies isolating configuration quality as a variable. Until they exist, adopt practices that are mechanically sound and cheap to reverse; instrument your own workflow.

## Takeaways

- **Context rot is real and universal** — every frontier model degrades with input length, even below the nominal window limit. This is the strongest empirical argument against maximalist files-as-config. Keep `AGENTS.md` lean, keep the critical rules at the top.
- **The recite acid test is operationally useful.** Before shipping any instruction file, ask the agent to recite the key rules. If it can't, the file is too long or the rules are buried.
- **AGENTS.md is now the ecosystem standard.** The practical approach for any new project: `AGENTS.md` as the universal base, thin `CLAUDE.md` layered on top for Claude Code–specific features. Plan for this when building the Cloudflare Worker.
- **Anthropic's own stance is hybrid, not pure-CAG.** JIT context loading is the official recommendation alongside files-as-config — not as a fallback, but as a co-primary approach.
- **The METR result deserves weight.** It is the only RCT and it cut against the consensus narrative. The "new contributor" framing is useful but the 19% slowdown is a reminder that the tool is not automatically an improvement on mature codebases where the human holds deep context the model doesn't have.
- **For irreversible actions: hard policies, not rules files.** This has implications for any harness that handles destructive operations.

## Open questions

- The ~150-line / 50%-fill guidance is from practitioner observation and vendor docs, not RCT. Where exactly does performance degrade for this KB's specific AGENTS.md size and Claude Code's current context handling?
- The agentic memory trajectory (agent-written notes superseding human-authored config) — what's the current state of the art? Is this the `NOTES.md` pattern Anthropic describes, or something more structured?
- The METR Feb 2026 "too noisy" update: does this mean the question is genuinely hard to measure, or that the tools have improved faster than the evaluation methodology?

## Related

- `synthesis/files-as-config-for-agents.md` — needs updating: context rot evidence, rules-as-nudges, recite acid test, 50% fill threshold, JIT hybrid nuance
- `sources/2026-05-28-uphill-agentic-ladder.md` — defines the CAG rung and ladder
- `sources/2026-05-28-anthropic-prompt-caching.md` — the caching implementation for static prefixes
- `topics/cost-management/index.md` — context rot is a cost management concern
- `topics/evals/index.md` — METR RCT is the most significant productivity eval in the KB
