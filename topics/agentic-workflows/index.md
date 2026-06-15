# Agentic workflows

End-to-end patterns for agent-driven workflows — operating loops, multi-thread coordination, scoped tool access, and the design principles that make agents useful at knowledge-work scale vs. one-off prompting.

## Sources

- [Codex-maxxing](../../sources/2026-05-31-codex-maxxing.md) — operating loop pattern (durable threads + voice + steering + disk memory + scoped tools + artifact review); scoped tool access by context type ($browser, @chrome, @computer) to prevent mode confusion.
- [What it feels like to work with Mythos (Mollick)](../../sources/2026-06-11-what-it-feels-like-to-work-with-mythos.md) — Mythos-class (Claude 5 Fable) sustains 9.5–12h autonomous runs, spawns Sonnet-class sub-agents for parallel research, and runs adversarial verification workflows unprompted. The "black box" cost: hundreds of judgment calls made with no rationale shown; human role collapses to goal-setting + post-hoc expert review.
- [Claude Fable 5 & Mythos 5 (Anthropic)](../../sources/2026-06-10-claude-fable-5-mythos-5.md) — vendor-side evidence for the same shift: Mythos 5 ran >1 week of largely autonomous genomics research (assembled single-cell data for 138 species, trained a model that beat a Science-published baseline at 100× smaller) and ~10× protein-design acceleration. Failure recovery + tool composition with only high-level human input.
