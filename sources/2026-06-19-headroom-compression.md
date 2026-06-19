---
title: "Headroom: Context Compression Layer for AI Agents"
url: https://github.com/chopratejas/headroom
authors: [Tejas Chopra]
captured: 2026-06-19
source_type: repo
topics: [cost-management, agent-architecture, context-engineering]
tags: [token-compression, proxy, mcp, reversible-compression, json, code-ast, rag]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

Headroom is a production-ready context compression toolkit designed to reduce token usage in agentic workflows by 60–95% without degrading output quality. It operates as a modular library (Python/TypeScript), HTTP proxy, MCP server, or agent wrapper, making it deployable across multiple LLM platforms (Claude, Codex, Cursor, Aider, Copilot) and frameworks (LangChain, Agno).

The core architecture uses ContentRouter to detect input type (JSON, code, prose, logs, RAG chunks) and route to specialized compressors:

- **SmartCrusher**: JSON/structured data compression via semantic pruning
- **CodeCompressor**: AST-based compression preserving semantics
- **Kompress-base**: Text compression using a HuggingFace-trained model
- **CacheAligner**: Stabilizes prefixes to align with LLM provider KV caches (Claude, Bedrock)
- **CCR (Reversible Compression)**: Stores originals locally; LLM retrieves on-demand via `headroom_retrieve` tool

Deployment modes:

1. **Library**: `compress(messages)` inline in Python or TypeScript apps
2. **Proxy**: Zero-code drop-in (`headroom proxy --port 8787`) for any language/framework
3. **Agent wrapper**: `headroom wrap claude|codex|cursor|aider|copilot`
4. **MCP server**: `headroom_compress`, `headroom_retrieve`, `headroom_stats` for any MCP client

## Key Features

**Output token reduction**: Trims ceremony, restated code, and deep "thinking" traces from model responses—not just input compression.

**Cross-agent memory**: Shared compression store across Claude, Codex, Gemini with auto-dedup. `headroom learn` mines failed sessions and writes corrections back to `CLAUDE.md`/`AGENTS.md`.

**Concrete example** (from repo): 10,144 → 1,260 tokens with same diagnostic result (FATAL error found).

**Local-first**: All data remains on-prem; no external calls to compression service.

## Quotes

> "Same answers, fraction of the tokens."

> "CacheAligner → ContentRouter → CCR... SmartCrusher (JSON) · CodeCompressor (AST) · Kompress-base (text, HF)"

> "reversible (CCR) — originals are cached for retrieval on demand"

## Takeaways

- **Multi-compressor pattern**: Different content types (JSON, code, prose) require different compression strategies; routing layer is essential.
- **Reversibility as requirement**: Storing originals locally for on-demand retrieval via tool call prevents semantic loss and enables debugging.
- **Output-side savings**: Most token-reduction projects focus on input; Headroom also trims model output (reasoning traces, boilerplate), amplifying savings.
- **Proxy-first deployment**: HTTP proxy mode enables adoption with zero code changes—critical for integration into existing agentic workflows.
- **Provider cache alignment**: Prefix stabilization (CacheAligner) leverages KV cache hits in Claude/Bedrock, compounding savings beyond compression ratio.

## Open Questions

- How does CCR retrieval latency scale with corpus size? (Single cache hit vs. 1000s of stored originals)
- What compression ratios does each algorithm achieve on real-world tool outputs (e.g., `pip install` logs, SQL query results, git diffs)?
- How does `headroom learn` handle false positives when mining corrections from failed sessions?
- Does reversible compression work with streaming responses, or is latency introduced by batching for compression?

---

**Repository**: Apache-2.0 license, 1,642 commits, active maintenance. Comprehensive docs at `mkdocs.yml`. Proof-of-concept benchmarks in `/benchmarks` directory.
