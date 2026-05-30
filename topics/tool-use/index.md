# Tool use

How agents call tools, how tool calls and results flow through the loop, and patterns for designing tool surfaces (token efficiency, error shapes, batching, retrieval-shaped APIs).

## Sources

- [Böckeler — Maintainability sensors for coding agents](../../sources/2026-05-30-fowler-maintainability-sensors.md) — static analysis tools (ESLint, dependency-cruiser, Stryker) used as in-loop agent feedback mechanisms. Custom CLI to query Stryker JSON rather than raw file avoids context overflow — "AI helping AI." Key design: tools that produce agent-readable self-correction guidance, not just machine output.

- [claude-mem](../../sources/2026-05-20-claude-mem.md) — observes `PostToolUse` to build an external log of every tool call. Exposes retrieval as MCP tools shaped in 3 layers (compact index → context → full body) for token efficiency.
- [Google agent skills](../../sources/2026-05-28-google-skills-repo.md) — vendor-published compact skills for GCP APIs. Demonstrates agent-first documentation format as the alternative to feeding full API docs into context. Skill Registry API suggests runtime-discoverable tools.
