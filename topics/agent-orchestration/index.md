# Agent orchestration

Patterns for coordinating multiple agents or agent loops — task routing, delegation boundaries, multi-agent topology, and the failure modes that emerge when agents operate with too much or too little context.

## Sources

- [I Don't Want an AI God](../../sources/2026-05-30-ai-god-agent-orchestration.md) — 24/7 personal GTD agent (Ralph loops); full-context access seduces you into delegating judgment; task-scoped agents (intent + scope only) preserve human agency.
- [Introducing dynamic workflows in Claude Code](../../sources/2025-06-09-dynamic-workflows-claude-code.md) — tens-to-hundreds of parallel subagents in one session: Claude plans dynamically, fans subtasks out, then uses independent + adversarial agents to refute findings before folding results in. Coordination lives outside the conversation so the plan holds at scale; interrupted jobs resume rather than restart.
- [Fabro: Workflow Graphs for AI Agent Orchestration](../../sources/2026-06-12-fabro-workflow-orchestration.md) — workflow-as-code: a DAG in Graphviz DOT coordinates agent invocations, shell commands, conditionals, parallelism and human approval gates (hexagons). 'Define your process as a graph, let agents execute it, and intervene only where it matters.'
- [Loop Engineering: The Coding-Agent Pattern in Codex and Claude Code](../../sources/2026-06-09-loop-engineering-coding-agents.md) — Loop engineering as orchestration pattern: external state enables triage/implement/verify/resume; halting code review increases comprehension debt — automation doesn't delete human responsibility
- [5 takeaways from Kun (ex-Meta L8) on agentic engineering systems](../../sources/2026-06-09-kun-meta-agentic-workflow.md) — Subagent delegation heuristic: exploratory/context-heavy work goes to subagents so the main agent stays focused; Treehouse manages reusable worktrees to prevent conflicts in parallel execution
- [Omnigent: Open-sourcing a meta-harness for AI agents](../../sources/2025-06-14-omnigent-meta-harness.md) — Zaharia (Databricks): Omnigent meta-harness — uniform API above heterogeneous agent harnesses (Claude Code, Codex, Pi); swap harnesses/models mid-session; contextual policies tied to runtime state (spend threshold, untrusted package triggers); live collaborative UI
- [Hensu: Infrastructure-as-Code for AI Agent Workflows](../../sources/2025-06-09-hensu-infrastructure-as-code.md) — Hensu: IaC for agent workflows — Kotlin DSL compiles to portable JSON artifacts; graph nodes, rubric scoring, conditional branching, parallel execution; deploy to CLI or server without environment drift

## Open threads

- **Delegation boundary design**: what criteria decide whether a decision stays with the human vs. goes to the agent? Reversibility is necessary but insufficient — strategy/positioning decisions can be reversible yet still shouldn't be delegated.
