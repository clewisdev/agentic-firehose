---
title: "claude-mem — Persistent Context Across Sessions for Every Agent"
url: https://github.com/thedotmack/claude-mem
authors: [Alex Newman (@thedotmack)]
captured: 2026-05-20
source_type: repo
topics: [memory, harnesses, tool-use]
tags: [hooks, mcp, retrieval, compression, vector-search, claude-code, chroma, postgres, redis, bullmq]
signal_level: high
status: summarized
confidence: medium
freshness_until: 2026-Q3
---

# claude-mem

> Caveat on capture: README content was fetched via WebFetch (which paraphrases through a small model), so quoted phrases below are *reported* rather than guaranteed verbatim. Version, dependencies, and repo metadata came from `package.json` and the GitHub API — those are authoritative. The README itself is out of date relative to the code (describes a v6.5-era SQLite-only architecture; current is v13.2.0 with Postgres/Redis/BullMQ).

## Summary

claude-mem is a persistent-memory layer for agentic coding tools — primarily Claude Code, but the repo also targets Codex, Cursor, OpenCode, and Gemini CLI. The pitch: "captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions." Created Aug 2025 by Alex Newman; under heavy active development (v6.5 → v13.2 in roughly nine months; last push 2026-05-17).

The capture mechanism is **harness hooks, not in-context prompting**. Five Claude Code lifecycle hooks instrument the session externally:

- `SessionStart` — bootstraps the memory context.
- `UserPromptSubmit` — logs the user's input.
- `PostToolUse` — records tool calls and outcomes. This is the primary observation source.
- `Stop` — checkpoints.
- `SessionEnd` — finalizes summaries and persists.

A worker service (advertised on port 37777, though in v13 backed by BullMQ on Redis) handles compression and serves an HTTP API + web viewer. Storage is hybrid: a relational store (SQLite in early versions; Postgres in current) for structured observations, plus Chroma for vector embeddings. Retrieval is exposed to the agent as MCP tools.

Retrieval is structured as a **three-layer pattern** designed to minimise tokens spent on irrelevant context:

1. `search` — full-text + semantic query, returns a compact index of IDs only (~50–100 tokens per result).
2. `timeline` — fetches chronological context around interesting IDs.
3. `get_observations` — pulls the full observation body, but only for IDs the agent has already filtered down to (~500–1,000 tokens per result).

The README claims this gives "~10x token savings" vs naively fetching full observations, with no benchmark cited.

The v6 → v13 jump materially changed the architecture. The current `package.json` shows `@anthropic-ai/claude-agent-sdk`, `@modelcontextprotocol/sdk`, `bullmq`, `ioredis`, `pg`, `express`, `react`, `better-auth`, and `zod`. The README's "Node 18+, bundled SQLite, single worker on :37777" framing no longer matches: the actual runtime requires Node 20+, Bun 1.0+, Postgres, and Redis. Subdirectories in the repo (`ragtime/`, `openclaw/`, `cursor-hooks/`, `docker/`, `evals/`) suggest an evolving toolkit rather than a fixed product.

## Key quotes

> "Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions."

Repo description. Note the deliberate cross-agent framing — claude-mem is positioning as a memory substrate, not a Claude-only tool.

> "~10x token savings by filtering before fetching details."

README's claim for the three-layer retrieval pattern. No benchmark, no methodology — treat as marketing.

> Apache-2.0, chosen so "durable agentic memory should be easy to embed in developer tools, local agents, MCP servers, enterprise systems."

License framing suggests the author intends this as infrastructure others build on, not an end-user app.

## Takeaways

- **Hook-based observation is the right shape for memory.** Asking the model to remember (via system prompt instructions or self-summary) is unreliable; instrumenting the harness to log tool calls externally produces a clean, model-independent observation stream. Worth studying even if you don't adopt the tool itself.
- **The 3-layer retrieval pattern generalises.** Compact index → chronological context → full body on demand is a useful shape for any MCP tool returning many results. Pay token cost only for what the agent actually needs to read.
- **Memory ≠ context window management.** This system is about an *external observation log + retrieval*, not in-context auto-compaction. Conflating them is a common confusion; the two solve different problems (recall across sessions vs fitting one session into a window).
- **The architecture explosion is a signal about what "production memory" needs.** Single-user SQLite was insufficient at scale: the v13 stack adds async job queues (BullMQ/Redis), a real RDBMS (Postgres), auth, and a separate vector store. If you build memory for your own agents, expect this trajectory.
- **Stale READMEs are the norm in fast-moving repos.** Default to `package.json`, `src/`, and recent commits for ground truth; treat README as a marketing surface.

## Open questions / things to verify

- **Does the 10x token-savings claim hold under realistic agent traces?** No benchmark in the README. Worth measuring against a baseline of "just dump the last N observations" before adopting the layered pattern.
- **Compression fidelity.** "Compresses it with AI" — what gets dropped? Is there an eval for whether downstream retrieval still answers questions the raw observations would have answered? The `evals/` directory in the repo may have something; not yet read.
- **Is this still useful as a local single-user tool?** The pivot to Postgres + Redis + auth suggests a hosted/multi-tenant trajectory. Local-only viability may be regressing.
- **Where does the boundary sit between claude-mem and Claude Code's own built-in mechanisms?** Claude Code now has its own auto-compaction, slash-command memory files, and (per `~/.claude/`) a file-based memory system. Overlap vs. complement is unclear without using both side-by-side.
- **Hook performance overhead.** PostToolUse fires on every tool call. What's the latency cost in a long session?

## Related

- `topics/memory/index.md`
- `topics/harnesses/index.md`
- `topics/tool-use/index.md`
