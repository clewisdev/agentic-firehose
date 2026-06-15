# Agent architecture

How production AI agents are structured — composable harness layers vs. monolithic frameworks, capability matrices (execution/context/memory/orchestration/reliability/safety), and the principle that the harness is the competitive differentiator, not the model.

## Sources

- [Pydantic AI Harness — Production](../../sources/2026-05-31-pydantic-ai-harness-production.md) — "The model is no longer the product... The harness is." Composable harness layers (CodeMode, MCP, Skills, Memory, Sub-agents, Verification, Guardrails) over smaller agents; capability matrix across 6 production dimensions.
- [MSFT Build AI SDLC](../../sources/2026-06-05-msft-build-ai-sdlc.md) — enterprise challenge: agent manufacturing capacity (hundreds-to-thousands) vs. CI/CD discipline; clean architecture and MRM as missing foundations; "companies that win won't build thousands of agents — they'll build systems where agents compose and evolve themselves."
- [SkillOpt: Self-Evolving Agent Skills](../../sources/2026-06-15-skillopt-executive-strategy.md) — treats a skill document as external trainable state, separate from model weights; a separate optimizer model applies bounded edits accepted only on held-out improvement. Architecture point: skills as a learnable layer that transfers across model scales and harnesses (Codex ↔ Claude Code).
- [Harness engineering: Codex in an agent-first world (OpenAI)](../../sources/2026-06-13-harness-engineering-codex.md) — ~1M LOC product shipped with zero hand-written code in 5 months. "Humans steer, agents execute." Repository knowledge as the system of record; monolithic `AGENTS.md` failed (context-crowding, instant rot) → distributed, queryable, mechanically-verified constraints. Repo shape determined by agent capability, not human anchor code.
- [We don't write code anymore (Quigley/Sanity)](../../sources/2025-06-13-we-dont-write-code-anymore.md) — work restructured as long-running agent-led pipelines with human steering, not batch code-writing: interrogate the agent for trade-offs, articulate intent, review the shape. Fourth abstraction generation (assembly → HLL → frameworks/cloud → AI-first).
- [Agent Skills Overview - Standardized Format for AI Agent Capabilities](../../sources/2026-06-14-agent-skills-overview.md) — progressive disclosure as a context-budget pattern: load only name/description at startup, full instructions only on task match — the architectural answer to 'agents have capability but lack context for reliable execution.'

## Synthesis

- [Harness Engineering: A 101](../../synthesis/harness-engineering-101.md) — foundational synthesis of harness layers, orchestration, observability, safety, and cost controls.
