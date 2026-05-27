# Tool use

How agents call tools, how tool calls and results flow through the loop, and patterns for designing tool surfaces (token efficiency, error shapes, batching, retrieval-shaped APIs).

## Sources

- [claude-mem](../../sources/2026-05-20-claude-mem.md) — observes `PostToolUse` to build an external log of every tool call. Exposes retrieval as MCP tools shaped in 3 layers (compact index → context → full body) for token efficiency.
