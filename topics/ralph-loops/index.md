# Ralph Loops

Iterative agentic execution pattern: after an AI completes a task, point it at the same task again. Coined by Jeffrey Huntley (~June 2025), named after Ralph Wiggum from The Simpsons.

The pattern's insight: agents handle sequential decision-making better than upfront dependency graph construction. Instead of orchestrating a complex parallel plan, run a simple loop and let the agent pick the next highest-priority work by reading what's already done.

Implementations: shell script (`while true; claude; done`) or Claude Code's built-in `/loop` command. Official plugin: `claude.com/plugins/ralph-loop` (168k installs, Anthropic-verified).

## Sources

- [chrismdp — Ralph Loops: AIE Europe](../../sources/2026-05-28-chrismdp-ralph-loops.md) — pattern definition, mechanism, implementation options. Named after Jeffrey Huntley.
- [claude.com/plugins/ralph-loop](../../sources/2026-05-28-claude-ralph-loop-plugin.md) — official Anthropic plugin using stop hook; preserves file modifications and git history across iterations.

## Open threads

- **Ralph loops vs multi-agent orchestration.** Ralph loops are single-agent iterative; separate orchestrator+executor is multi-agent. When does the overhead of multi-agent coordination pay off over just running a tighter loop? No source directly addresses this boundary.
- **Task types where the loop fails.** The pattern is presented as broadly applicable but the failure mode (tasks with strict hard dependencies, e.g., schema-before-migration) isn't characterized. A source on where the loop breaks down would sharpen the picture.
