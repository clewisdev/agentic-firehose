---
title: "The Spec as Primary Artifact: When Code Became a Build Output"
written: 2026-06-15
updated: 2026-06-15
topics: [spec-driven-development, code-generation, context-engineering, engineering-judgment]
tags: [spec-first, source-of-truth, ferrari-effect, cognitive-debt, naur, policy-as-code, abstraction-ladder, build-time-governance]
sources:
  - sources/2026-06-09-will-there-be-source-code-future.md
  - sources/2026-06-04-spec-is-code-now.md
  - sources/2026-06-13-context-as-code.md
  - sources/2026-06-09-ai-sustainable-hurst.md
status: draft
---

# The Spec as Primary Artifact: When Code Became a Build Output

## The thesis in one line

As code generation became cheap, the primary software artifact has been inverting — from
imperative implementation (what the machine executes) toward declarative specification (what
the system is *supposed to do* and *why*). Code is becoming a build output; the spec, the
constraint set, and the domain vocabulary are becoming the source of truth. This is not a
new aspiration: every previous attempt at spec-first failed. What is different now is that
*the agents make the hidden cost of vague specifications immediate and unignorable*.

## Part 1 — Code always had two jobs; one of them is getting automated

Unmesh Joshi (via Fowler, `sources/2026-06-09-will-there-be-source-code-future.md`) names
the split clearly: source code has always served two purposes simultaneously.

1. **Machine instructions** — the compiled artifact that runs on hardware.
2. **Conceptual model** — the human-readable theory of how the problem domain works and
   why the system is structured the way it is.

For the last fifty years, these two roles were coupled. Writing the instructions *was* the
act of building the conceptual model. The medium was code; the thinking happened through
it. Naur's 1985 "Programming as Theory Building" made this explicit: the real product of
programming is the *theory* (the shared mental model of the system's purpose and structure)
that the team holds — the code is its residue.

LLM-driven code generation cheapens role #1 dramatically. The mechanical instructions are
increasingly derivable from a good enough description of intent. Role #2 — the conceptual
model, the theory, the *why* — does not get cheaper. If anything, it becomes the scarce
resource, because:

> "The mechanical instructions got cheap, the theory of why a system is the way it is
> didn't. What we need now is a way to compact the intentions and decisions, not just
> the instructions." — Juan José Fuchs (via Fowler thread)

The implication is structural. If implementation is derivable from specification, then
specification is what teams need to maintain, version, and defend. Code becomes an
intermediate artifact — generated, not authored.

## Part 2 — Agents exposed the hidden cost of tribal knowledge

Peter Frey (`sources/2026-06-04-spec-is-code-now.md`) frames this as the **Ferrari Effect**:
an agent's capability is bottlenecked not by raw model power but by system clarity. Tangled
architectures, scattered documentation, and undocumented architectural decisions are the
"dirt roads." A clean, machine-readable spec is the "racetrack."

The crucial insight: human engineers could always infer implicit constraints. An experienced
developer reading a codebase picks up the patterns, the no-fly zones, the decisions that
"everyone knows." Agents cannot. They will happily ship code that:

> "compiles, passes its own tests, and violates three architectural decisions that nobody
> ever wrote down." — Peter Frey

This is not an agent limitation to be fixed. It is a forcing function. Tribal knowledge
was always a liability — agents make the cost immediate and legible. Every previous
methodology tried to solve this and failed:

- **Waterfall**: specs went stale after six months.
- **Agile**: tribal knowledge fragmented across Confluence, Jira, and Slack.
- **TDD**: specified testable behaviour only; left architecture implicit.
- **BDD**: "living documentation" drifted into fiction.
- **API-first**: only covered service boundaries.

None of them made the spec the *executable* source of truth. What changes now: agents
generate from the spec continuously. A stale spec produces incorrect code immediately,
not six months later. The feedback loop that kept specs aspirational is closed.

## Part 3 — Governance must be upstream, not downstream

Artur Huk (`sources/2026-06-13-context-as-code.md`) extends this to the governance
problem. The failure mode he names — "Frankenstein factories" — is what happens when
generation outpaces specification: agents produce syntactically valid code that accumulates
**comprehension debt** (Osmani's term) because the *why* was never encoded anywhere the
agent could read it.

The instinctive response — better prompts, output filters, post-generation review — fails
to scale. Human review doesn't keep pace with generation rate
([see verification-bottleneck.md](verification-bottleneck.md)). The structural answer is to
move governance *upstream to build-time*, before generation:

> Constraints belong in context, not in prompts.

This means encoding architectural boundaries, API contracts, allowed patterns, and threat
models as structured context the agent operates within — not as instructions the agent
interprets on the fly. The claim: structurally invalid code is never generated if the
constraints are well-formed and upstream. "Context-as-code" — versioned, tested,
diff-tracked governance rules — is the enabling infrastructure.

Hurst (`sources/2026-06-09-ai-sustainable-hurst.md`) adds a ground-level corroboration:
when building is cheap, the new bottleneck is alignment — deciding what to build and
getting organisational agreement on it. Spec work *is* that alignment work, now materialised
as an artifact rather than occurring informally.

> "The cost of building has collapsed, but the cost of aligning organisationally has not.
> If anything, it's gone up." — Jamie Hurst

## Part 4 — The abstraction ladder's next rung

Frey's framing of the abstraction ladder is the most historically grounded frame here:
binary → assembly → C → higher-level languages → frameworks. Each step moved the
"source of truth" one level of abstraction higher. Developers stopped writing assembly
by hand not because assembly was bad but because C was a more productive level at which
to express intent — and the compiler handled the translation.

The current shift follows the same logic:
- **Old source of truth**: imperative code (implementations authored by humans)
- **New source of truth**: declarative specification (constraints, contracts, intent)
- **New derived artifact**: implementation (generated by agents)

This is not vibe-coding at scale. Frey is explicit: "The vibe-coding shortcut works at
prototype scale and falls apart somewhere around feature five." The spec-first shift he
describes is a disciplined infrastructure investment — spec as version-controlled,
machine-readable, cross-functional source material. It requires more rigour than
code-first, not less.

The convergence point: specs stop being product-documents or engineering-documents.
They become the shared artifact across product, design, engineering, legal, and security.
The "translation problem" (PRD → ticket → restated version → shipped thing) compresses
when the spec is the direct input to generation. Decision velocity — how fast the team
can agree on and codify intent — becomes the actual gating constraint.

## What this synthesis is claiming and what it is not

**Claiming:**
- The direction of the shift is real and reinforced across independent sources. Agents
  force the hidden cost of implicit specifications into view; this is structural, not
  temporary.
- Governance must move upstream. Post-generation review as the primary quality gate does
  not scale (see verification-bottleneck).
- The act of writing code was load-bearing for conceptual-model building. Removing it
  requires a replacement — formal specs, decision logs, policy-as-code, structured AGENTS.md
  — or the theory is lost.

**Not claiming:**
- That natural-language code will disappear. The abstraction-ladder framing is directional,
  not a cliff edge. Assembly still exists; people still write it when needed.
- That spec-first has solved the spec-drift problem. Frey acknowledges this; Hurst's
  alignment cost observation implies spec maintenance is itself a non-trivial burden. The
  spec-drift open question from the `spec-driven-development` topic index remains open.
- That formal specification languages (TLA+, Alloy) will go mainstream. Multiple sources
  mention them as a possibility; none report using them at production scale.

## Open tensions

- **Writing code *is* the thinking** — Fowler/Joshi's sharpest observation. If removing
  imperative authorship removes the mechanism by which engineers build conceptual models,
  spec-first risks producing teams who can't diagnose the systems they nominally own. The
  cognitive-debt accumulation Huk describes is partly this: velocity and coverage mask
  structural risk because the team's theory of the system never formed.
- **Spec drift is the new technical debt**. Frey acknowledges specs drift too. Context-as-code
  versioning is proposed as the answer but nobody has run it at scale long enough to know
  whether governance overhead exceeds the overhead it replaces.
- **Who writes the spec?** The cross-functional convergence Frey envisions (product +
  engineering + legal on one artifact) has failed before, for social reasons that better
  tooling doesn't fix. Decision velocity as the bottleneck is true *if* the org can
  actually converge fast. Hurst's account suggests this is the hardest part.
