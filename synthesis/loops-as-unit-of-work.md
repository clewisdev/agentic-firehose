---
title: "Loops as the Unit of Work: Beyond Prompting to Loop Engineering"
written: 2026-06-16
updated: 2026-06-16
topics: [agentic-workflows, agent-architecture, agent-orchestration, harnesses]
tags: [loops, loop-engineering, ralph-loop, inner-loop, middle-loop, outer-loop, comprehension-debt, verification, sub-agents, worktrees, skills, external-memory]
sources:
  - sources/2026-06-12-claude-code-loops-abstraction.md
  - sources/2025-06-09-loop-engineering-osmani.md
  - sources/2026-06-09-loop-engineering-coding-agents.md
  - sources/2026-05-28-chrismdp-ralph-loops.md
  - sources/2026-05-28-claude-ralph-loop-plugin.md
  - sources/2026-06-09-supervisory-engineering-middle-loop.md
status: draft
---

# Loops as the Unit of Work: Beyond Prompting to Loop Engineering

## The central shift

The people who built Claude Code don't prompt it anymore. Two independent quotes,
from the same practitioner community, make this explicit:

> "I don't prompt Claude anymore. I write loops — and the loops do the work. My job
> is to write loops." — Boris Dayma, Claude Code creator (via
> `sources/2026-06-12-claude-code-loops-abstraction.md`)

> "I don't prompt Claude anymore. I have loops running that prompt Claude."
> — Boris Cherny (via `sources/2025-06-09-loop-engineering-osmani.md`)

This is not a style preference. It is a structural claim about the level of
abstraction where productive work now happens. The practitioner's unit of work
shifted from *crafting the right prompt* to *designing the loop that generates
and evaluates prompts*. Most developers are still operating at the lower level.

## What "a loop" actually is

Across the five sources that describe loops concretely, a common anatomy emerges.
Osmani and Lindenberg (`sources/2026-06-09-loop-engineering-coding-agents.md`) articulate
it most crisply as five components:

1. **Automations** — scheduled triggers that create cadence and eliminate manual re-entry.
   The loop fires; you didn't have to start it.
2. **Worktrees** — isolated branches or namespaces so parallel agents can edit without
   colliding on the same files.
3. **Skills** — project conventions written down once, reusable across iterations.
   Intent persists across runs without being re-explained.
4. **Plugins / connectors** — MCP integrations that bridge to real external systems
   (open PRs, update tickets, query databases). The loop reaches into the world, not
   just into a text window.
5. **Sub-agents** — explicit split of *maker* (implementer) from *checker* (verifier).
   The agent does not grade its own work.

Add **external memory** — a persistent markdown file, board, or log — and you get
stateful resume: the loop can pause, be interrupted, pick up from where it left off,
and maintain coherence across sessions.

## The Ralph loop: the simplest form that works

McDonagh's account of the Ralph loop (`sources/2026-05-28-chrismdp-ralph-loops.md`,
`sources/2026-05-28-claude-ralph-loop-plugin.md`) establishes the minimum viable version:
after an AI finishes a task, point it at the same task again. The agent reads its prior
work, identifies improvements, and either refines further or emits the completion string.

What makes this powerful is the **completion promise** — a distinctive string the model
outputs when done, which the harness detects to exit. Everything between start and
completion promise is autonomous. The human designs the contract; the loop executes it.

The official Ralph loop plugin (168,000+ installs) implements this via a **stop hook** —
intercepting Claude Code's `Stop` lifecycle event rather than wrapping the CLI. This is
the right pattern: extend the harness through its existing extension surface, not around it.
File modifications and git history persist across iterations; only the context window resets.

The Ralph loop is the answer to "how do I design ordering without a dependency graph?"
Rather than constructing orchestration logic that specifies what to do when, delegate
ordering decisions to the model's in-context reasoning over completed state. The agent
reads the done pile and decides what to do next more reliably than any pre-planned
dependency graph could encode.

## The three-loop model: where in the stack does the work happen?

Thoughtworks' supervisory engineering framing (`sources/2026-06-09-supervisory-engineering-middle-loop.md`)
provides the most structurally precise account of how loops nest within software
development as a whole:

- **Inner loop** (formerly: local development — write, compile, test, debug) — now
  largely collapsed by AI agents. Generation is instant and cheap.
- **Middle loop** (new: verification, orchestration, and intent alignment) — where
  human judgment meets machine execution. This is the bottleneck that replaced the
  inner loop.
- **Outer loop** (CI/CD, deployment, monitoring) — unchanged in structure but affected
  by the inner loop's acceleration.

> "The bottleneck is no longer around how fast we can type or implement code, it's
> about how fast we can verify." — Gall (Thoughtworks)

This framing is important for loop design: a loop that automates inner-loop work
(generation, refactoring, testing) without addressing middle-loop verification is
moving the bottleneck, not eliminating it. The Ralph loop self-corrects before human
review — reducing the volume of trivial errors that consume human attention in the
middle loop. But it does not eliminate middle-loop work; it makes it more tractable.

## What loop engineering is not

**The loop does not delete you.** Osmani's most pointed framing:

> "A loop running unattended is also a loop making mistakes unattended."

> "The comfortable posture is the dangerous one."

Three failure modes accumulate silently when loops are the primary abstraction:

- **Verification debt** — the loop runs and produces output you haven't read.
  You are liable for it anyway.
- **Comprehension debt** — the speed of generation creates a growing gap between
  what exists in the codebase and what you understand. Passive acceptance without
  reading the diff widens knowledge rot.
- **Cognitive surrender** — the temptation to stop having opinions about the design
  when the loop "just works." This is how you lose architectural coherence without
  noticing until production.

The cure is not running fewer loops. It is **designing the loop with intent to stay
an engineer**: the sub-agent split (maker/checker), the external state that forces
explicit encoding of design intent, the completion promise that makes the exit
contract deliberate.

## Token cost is a first-order loop design constraint

One commenter (Ali Demi, via Osmani's thread) surfaces a constraint the post itself
underweights: loops are "very token hungry" and practical loop design requires solving
for token efficiency simultaneously. The economics: each Ralph loop iteration is a
fresh context window plus the full prompt. Ten iterations = ten times the input token
cost. Without prompt caching, without per-tool output caps, without file-read
deduplication, the loop economics can be prohibitive.

This connects to the cost synthesis (`synthesis/cost-management.md`): loop design and
cost management are not separate concerns. A loop architecture that ignores token
budgets will either be economically unviable or will be run less often than the work
requires.

## Design principles, ranked

From most to least leverage:

1. **Make the exit contract explicit.** A loop without a completion promise is
   runaway execution. Design the string; make it distinctive; test it.
2. **Split maker from checker.** The sub-agent verification pattern is the most
   structural defense against both verification debt and comprehension debt.
3. **Use external state, not context memory.** The loop's state lives in files and
   git, not in the context window. Iterations are cheap because the agent reads the
   world, not its own prior reasoning.
4. **Delegate ordering to the model.** Don't write dependency graphs. Give the agent
   the completed-work pile and let it decide what's next.
5. **Budget tokens per tool.** Per-tool output caps and file-read deduplication are
   the cost levers specific to loop design (from Brussee's caveman-code data:
   1.93× savings, near-identical accuracy).
6. **Resist cognitive surrender.** At scheduled intervals, read the diff. Have the
   opinion. The loop serves you; you don't serve the loop.

## Open questions

- **Where do loops break cleanly?** The Ralph loop is weak when tasks have strict
  hard ordering (write schema before migrating data). When does single-agent
  iteration fail and multi-agent orchestration become necessary?
- **How does comprehension debt surface before it compounds?** Are there signals in
  test failure rates, review time, or bug density that indicate the gap is widening?
  Nobody has published leading indicators.
- **Loop cost at scale.** No published benchmark exists for total token cost of
  a complete loop run (discovery + generation + verification cycles) for a representative
  software task. Without this, "loops are expensive" is a concern without a number.
- **The maker/checker divergence problem.** If both sub-agents are from the same
  model family, do they share the same blind spots? The security plugin's answer
  (fresh context, no shared investment) is necessary but may not be sufficient.
