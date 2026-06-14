---
title: "Pi: AI Agent Toolkit (earendil-works)"
url: https://github.com/earendil-works/pi
authors: [Mario Zechner, earendil-works]
captured: 2026-05-28
source_type: repo
topics: [harnesses]
tags: [coding-agent, agent-framework, typescript, multi-provider, pi-code, terminal-agent]
signal_level: high
status: summarized
confidence: high
freshness_until: 2026-Q4
---

# Pi Agent Framework

Open-source TypeScript agent toolkit by Mario Zechner (badlogicgames / earendil-works). 56.5k GitHub stars, 223 releases, 4,302 commits. The underlying framework on which Brussee's `caveman-code` is built.

## Summary

Pi is a monorepo with three packages:

- **pi-coding-agent** — Interactive CLI for coding tasks. User-facing terminal interface for running coding sessions.
- **pi-agent-core** — The runtime engine: tool execution, state management, context tracking. The portable layer other projects (like caveman-code) build on.
- **pi-ai** — Unified API layer supporting multiple LLM providers (OpenAI, Anthropic, Google, and 17+ others). Abstracts provider-specific APIs behind a common interface.

Additional libraries: terminal UI components, chat automation.

Design philosophy: emphasis on real-world coding sessions over toy benchmarks. The project encourages sharing actual OSS work sessions to improve agent behaviour, and the agent can explain its own codebase to new users.

Supply-chain hardening: strict dependency pinning throughout. This is notable — most open-source agent frameworks don't treat supply-chain integrity as a first-class concern.

## Relationship to caveman-code

Caveman-code (`juliusbrussee/caveman-code`) is built on pi-agent-core. It extends pi with the specific token-optimization techniques (terse replies, per-tool output caps, file-read deduplication, Rust preprocessing layer). Pi is the runtime; caveman-code is an opinionated configuration of that runtime optimized for token efficiency.

## Takeaways

- **A stable, well-maintained agent runtime with 56k stars is a genuine alternative to building your own.** If you need a coding agent harness that runs locally, pi is the most credible open-source option (ahead of the wave of early-2025 framework experiments that didn't survive).
- **The pi-ai unified provider layer** is a pattern worth noting: rather than binding directly to Anthropic's SDK, abstractions at the API level let you swap models without rewriting the agent. This is the right architecture for any production harness.
- **Real-world session sharing** as a quality signal is interesting — instead of synthetic benchmarks, pi uses actual OSS contributions as evaluation data. More honest than leaderboard optimization.
- **Supply-chain hardening** (strict dependency pinning) should be table stakes for any agent framework that runs arbitrary code. The fact that pi treats this as a first-class concern while most frameworks don't is a differentiator.

## Open questions

- How opinionated is pi-agent-core? Is it extensible enough to add custom tools and hooks, or does it assume a specific interaction pattern?
- The 56k stars is high but the README emphasis on real-world sessions suggests a community-driven evaluation loop. How does the framework handle tasks outside coding (document processing, research)?

## Related

- `sources/2026-05-28-brussee-caveman-code.md` — token-optimized agent built on pi
- `topics/harnesses/index.md`
