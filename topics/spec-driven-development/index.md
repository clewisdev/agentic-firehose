# Spec-driven development

The shift from code-as-truth to spec-as-truth, driven by agent limitations with tribal knowledge and vague specifications — spec becomes source material, code becomes build artifact.

## Sources

- [The Spec Is the Code Now](../../sources/2026-06-04-spec-is-code-now.md) — "Ferrari Effect": agent capability bottlenecked by system clarity, not LLM power; tangled architectures are dirt roads, clean machine-readable specs are the racetrack; decision velocity becomes the bottleneck once spec is precise and build is cheap.
- [Is this sustainable? (Hurst)](../../sources/2026-06-09-ai-sustainable-hurst.md) — the idea→demoable-thing gap has collapsed (weeks not months), pushing senior effort upstream into proposal/spec writing; when building is cheap, deciding *what* to build and aligning on it becomes the gating work.
- [Will There Be Source Code in the Future?](../../sources/2026-06-09-will-there-be-source-code-future.md) — from 'authors of instructions' to 'orchestrators of intent': the durable source becomes prompt history, constraints and domain vocabulary. 'The developer won't think by writing classes; they will think by engineering Policy-as-Code.' Formal specs (TLA+/Alloy) floated as primary artifacts.
- [Supervisory engineering: Orchestrating software's 'middle loop'](../../sources/2026-06-09-supervisory-engineering.md) — Thin promo post — points to middle-loop Thoughtworks article; supervision/orchestration as the new-shape work that emerges when building becomes cheap

## Open threads

- **Spec drift**: the same drift problem that plagued waterfall (stale specs after 6 months) applies here — what enforces spec→code consistency at runtime?
