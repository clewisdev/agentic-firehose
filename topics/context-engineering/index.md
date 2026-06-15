# Context engineering

The discipline of curating what goes into the model's context window — pulling relevant docs, tools, memory, and conversation history. "Better context beats a cleverer prompt." (Karpathy, 2025)

## Sources

- [Harness Engineering Eras](../../sources/2026-06-05-harness-engineering-eras.md) — Era 2 of the AI engineering evolution; treating finite context windows as the primary design constraint; shifts focus from prompt wording to retrieval, memory, and information architecture.
- [grill-with-docs: Align Before You Build (Pocock)](../../sources/2026-06-10-grill-with-docs.md) — `CONTEXT.md` as a persistent, incrementally-built glossary so domain constraints don't get re-explained every session: "re-grilling the same fuzzy concepts every session wastes tokens and reasoning cycles." Documentation-as-context that compounds rather than rotting.
- [Claude Fable 5 & Mythos 5 (Anthropic)](../../sources/2026-06-10-claude-fable-5-mythos-5.md) — persistent file-based memory gave a 3× performance delta (Slay the Spire) vs Opus 4.8, and million-token context sustains long-horizon planning. Evidence that external memory + long context, not bigger prompts, unlock multi-week autonomous work.
- [Context & Harness Engineering - The Transition to Agentic Software Delivery](../../sources/2026-06-14-context-harness-engineering.md) — Context Engineering as 'the briefing you give a highly capable new employee' — curate architecture, standards, conventions into agent context. 'Tooling access is not a moat. Proprietary context and evaluation infrastructure is.'
- [Context as Code: Build-time Governance in the Era of Infinite Syntax](../../sources/2026-06-13-context-as-code.md) — constraints belong in context, not prompts: encode API contracts, allowed patterns and threat models into the agent's working context so invalid code can't be generated in the first place. 'Context-as-code' is infrastructure, versioned like code.
- [The Return of the Memory Budget](../../sources/2026-06-12-return-memory-budget.md) — context engineering reframed as cost control: token optimization, prompt efficiency and repo-scanning overhead become disciplines with direct ROI once the build phase itself is compute-expensive ('Context Window Snowball' mechanics).

## Synthesis

- [Harness Engineering: A 101](../../synthesis/harness-engineering-101.md) — context design is the first of Berkin's eight harness concerns; what the model sees at session start determines baseline behavior.
