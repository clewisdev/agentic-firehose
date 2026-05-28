# Harnesses

The **operational wrapper around model intelligence** (Berkin, 2026): context design, orchestration, routing, prompts, tool access, identity, permissions, guardrails, evaluation, observability, human approval points, resilience patterns, cost controls. Concretely: Claude Code, Cowork, Codex Desktop, Cursor, Aider, custom CLIs, MCP servers, plus the policy and observability layers around them.

Working distinction (Berkin): *agentics describes what an agent may do; harness engineering describes what it's allowed to do.*

## Synthesis

- [Harness Engineering: A 101](../../synthesis/harness-engineering-101.md) (2026-05-28, stable) — what harness engineering is, the eight concerns it covers, how it differs from prompting, and the failure modes it prevents. Start here for orientation.
- [Claude Code Hook Surface](../../synthesis/hook-surface-patterns.md) (2026-05-28, draft) — the five lifecycle hooks, three use patterns (observation, iteration, governance), and what each enables architecturally.
- [Files-as-config for agents](../../synthesis/files-as-config-for-agents.md) (2026-05-20, updated 2026-05-28) — where the filesystem approach wins, where it breaks down, and the three-tier upgrade path (files → committed graph → DB stack).

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
- [Pi agent framework](../../sources/2026-05-28-pi-agent-framework.md) — earendil-works/pi by Mario Zechner. TypeScript monorepo (56.5k stars). Components: pi-coding-agent CLI, pi-agent-core runtime, pi-ai multi-provider API. Supply-chain hardening as first-class concern.
- [Brussee — Caveman-Code](../../sources/2026-05-28-brussee-caveman-code.md) — 1.93x token reduction via terse replies, per-tool output caps, ANSI stripping, file-read deduplication. Built on pi-code. Benchmark on 25 tasks. Also see `caveman` skill (65% token reduction, no infra required).
- [Superpowers](../../sources/2026-05-28-obra-superpowers.md) — structured agentic development methodology: staged checkpoints (requirements → design validation → plan → subagent execution → TDD). "Subagent-driven-development." Claude plugin marketplace.
- [Google agent skills](../../sources/2026-05-28-google-skills-repo.md) — official Google skills library for GCP services. Agent-first compact docs; `npx skills add google/skills`. Validates skills pattern as vendor-standard, not just practitioner practice.
- [an internal enterprise team Teams snippet](../../sources/2026-05-28-internal-teams-snippet.md) — captain-hindsight (post-session token optimizer), caveman skill guardrails design, model routing by task type (Opus for planning, Composer 2.5 for implementation).
- [Karpathy skills CLAUDE.md](../../sources/2026-05-28-karpathy-skills-claude-md.md) — *medium signal.* Four principles encoded as installable CLAUDE.md (160k stars). Good template; treat as packaging, not research.
- [VibeSec Reckoning](../../sources/2026-05-28-vibesec-reckoning.md) — *medium signal* (Thoughtworks marketing). Inferential controls (prompts) vs computational controls (automated gates) for security. Connects to Berkin's harness-as-permission-enforcer framing.
- [OWASP LLM Top 10](../../sources/2026-05-28-owasp-llm-top10.md) — reference checklist for agentic security: prompt injection, excessive agency, unbounded consumption, improper output handling are the most harness-relevant risks.
- [UpHill — Agentic ladder](../../sources/2026-05-28-uphill-agentic-ladder.md) — start-simple ladder: Prompting → CAG → RAG → Workflow → Agent → Multi-agent, with decision criteria at each level. "Stop at the first level that passes your eval set." Thin agent, heavy tools. Router + workflow + agent composition.
- [UpHill — Real workflows](../../sources/2026-05-28-uphill-real-workflows.md) — four practitioner workflows with steal-ready prompts. Rules push, content pulls. Smart/dumb zone (30% token threshold). Model-routing-by-task-type. Where AI fails in production.

## Synthesis

- [Files-as-config for agents: when, why, and how](../../synthesis/files-as-config-for-agents.md) (2026-05-20, draft) — synthesised across 5 source captures + 2 contextual ones. Covers harness-relevant points: where governance-as-files (Rosenthal) sits vs harness-level governance (Berkin), and where filesystem-based config hands off to DB-backed memory (claude-mem).

## Open threads

- **Hooks for governance / tiered approvals.** Berkin (abstract) + claude-mem (5 lifecycle hooks instrumented for memory) + Rosenthal (`.claude/hooks/` for role-based approvals) + claude-ralph-loop-plugin (stop hook for iteration) all reference Claude Code's hook surface for different purposes. Four sources now — strong candidate for a focused note on the full hook surface and patterns it supports.
- **Token efficiency: runtime vs process.** Caveman-code (runtime output compression) and captain-hindsight (post-session process improvement) address cost from different angles. A synthesis on when to apply which — or how to combine them — would consolidate the cost-management picture.
- **Skills ecosystem maturation.** Pocock + Rosenthal (internal) + an internal enterprise team (internal sharing) + Google (vendor) + karpathy-skills (community viral) all show different modes of skills adoption. A note on the emerging skills distribution layer (npm/npx registry, Anthropic plugin marketplace, org-internal repos) would be timely.
