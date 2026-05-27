# Harnesses

The **operational wrapper around model intelligence** (Berkin, 2026): context design, orchestration, routing, prompts, tool access, identity, permissions, guardrails, evaluation, observability, human approval points, resilience patterns, cost controls. Concretely: Claude Code, Cowork, Codex Desktop, Cursor, Aider, custom CLIs, MCP servers, plus the policy and observability layers around them.

Working distinction (Berkin): *agentics describes what an agent may do; harness engineering describes what it's allowed to do.*

## Topic notes

- [Claude Cowork](cowork.md) — Anthropic's desktop agentic surface (GA 2026-04-09). Same engine as Claude Code. Default deployment target for non-developer agent recipes.

## Sources

- [Berkin — Harness engineering vs the model](../../sources/2026-05-20-berkin-harness-engineering.md) — definitional/framing piece. Sources of the agentics-vs-harness distinction and the "cheapest model ≠ cheapest system" framing. Vocabulary contribution, not implementation guidance.
- [claude-mem](../../sources/2026-05-20-claude-mem.md) — uses 5 Claude Code lifecycle hooks (SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd) to instrument session state externally. Reference for the hook surface available to harness extensions.
- [POHA](../../sources/2026-05-20-poha.md) — scheduled-task harness pattern on Claude Desktop / Cowork: 7 cron-style tasks + 5 on-demand skills + a self-mailto "acknowledgment loop" for bidirectional state without a webhook server.
- [Pocock — Skills For Real Engineers](../../sources/2026-05-20-pocock-skills.md) — composable slash-command skills as a counter-position to end-to-end frameworks (BMAD/Spec-Kit/GSD). Reference for what a well-designed harness extension via skills looks like.
- [André-Micolon — the `dev:info` pattern](../../sources/2026-05-20-andre-micolon-dev-info.md) — small tactical pattern for harness self-knowledge: a documented `dev:info` entry script in `AGENTS.md`. Removes prompt boilerplate; enables short autonomy-style prompts ("Fix it").
- [Rosenthal — Company OS repo structure](../../sources/2026-05-20-rosenthal-company-os.md) — 20-person services team's Claude Code repo template. Clean split: `.claude/` (skills, agents, commands, hooks, rules) for behaviour; root (`CLAUDE.md`, `INDEX.md`, `wiki/`, `clients/`, `raw-context/`, `archive/`) for knowledge. Hooks used for tiered role-based approvals.
- [Aslam Kahn — Claude Code crash course](../../sources/2026-05-20-aslam-kahn-crash-course.md) — *low signal.* Content-marketing post for a learning resource; substance is thin. Captured mainly to note "Awesome Claude Skills" repo and the unfamiliar `/effort high` mode mentioned in comments.

## Synthesis

- [Files-as-config for agents: when, why, and how](../../synthesis/files-as-config-for-agents.md) (2026-05-20, draft) — synthesised across 5 source captures + 2 contextual ones. Covers harness-relevant points: where governance-as-files (Rosenthal) sits vs harness-level governance (Berkin), and where filesystem-based config hands off to DB-backed memory (claude-mem).

## Open threads

- **Hooks for governance / tiered approvals.** Berkin (abstract) + claude-mem (5 lifecycle hooks instrumented for memory) + Rosenthal (`.claude/hooks/` for role-based approvals) all reference Claude Code's hook surface for different purposes. One more concrete source would justify a focused note on what the hook surface actually is and what patterns it supports.
