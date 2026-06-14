---
title: "UpHill Workshop: The Start-Simple Ladder (Prompting → Agent → Multi-agent)"
url: file://temp/files/uphill.zip#session1
authors: [Louis-François Bouchard, Paul Iusztin, Omar Solano, Towards AI]
captured: 2026-05-28
source_type: talk
topics: [harnesses, memory]
tags: [agentic-ladder, workflow-vs-agent, cag, rag, memory-patterns, cost, orchestration, uphill]
signal_level: high
status: summarized
confidence: high
freshness_until: 2027-Q1
---

# UpHill Workshop: The Start-Simple Ladder

From Part 3 of Session 1 ("How to make LLMs work for you"), UpHill AI Engineering workshop, May 2026, by Towards AI (Paul Iusztin et al.). The AI Theory 101 portion of the same session is low signal for this KB and omitted.

## The decision framework: pick the right pattern first

The single most useful slide in the workshop: before picking a framework, identify the *shape* of the task. Wrong choice costs 2-15x more tokens, worse latency, harder debugging.

The progression ladder — **stop at the first level that passes your eval set**:

```
Prompting → CAG → RAG → Workflows → Agents → Multi-agent
no infra     long   retrieval  deterministic  dynamic  last resort
             context
```

Each step right adds cost, latency, and failure modes. Each step also adds autonomy. The rule: **earn the next step with evidence, not vibes.**

### Prompting (and try to stop here)

System prompt + 2–3 few-shot examples. If it passes your eval set, ship it. No infra, no orchestration. The baseline that everything else is measured against.

### CAG (Context-Augmented Generation) — for known context

Use when context is static or mostly static, and fits in the window (~200K tokens rule of thumb).

> "Don't build retrieval infra if you already know the context."

Best practice: **prompt caching for large static prefixes** (AGENTS.md, CLAUDE.md, large reference docs). This is what files-as-config is doing — it's CAG, not RAG.

### RAG — for unknown-at-query-time context

Strong signals: knowledge changes frequently, you need citations/traceability, the model hallucinates without grounding.

> "Engineer retrieval first. Generation tuning is wasted if retrieval is broken."
> "Fix what the model reads before you fix how the model writes."

### Workflows — fixed steps, high reliability

Use when steps are known, stable, and mostly the same each time. You define the steps, the order, and the validation gates.

> "If you can write the exact sequence of steps in advance, you're building a workflow — not an agent."

Cheaper, easier to test, easier to debug. Strong preference signal when determinism matters.

### Agents — dynamic branching, judgment calls

Use when the next step depends on what you discover mid-execution. Signals: branching under uncertainty, incomplete data at plan time, side-effect actions (writes, purchases).

Non-negotiables for any agent: **termination conditions, max iterations, tool + output validation, typed arguments**.

> "Thin agent, heavy tools: model handles planning; tools handle logic, retries, validation."

Expose tools via MCP where possible — standardised integration, clean boundaries.

### Multi-agent — last resort

Only when a single agent with tools genuinely can't handle the problem. Each added agent adds coordination overhead and failure modes.

### Composition: router + workflow + agent

Real architectures mix levels:

```
Router (deterministic) → Workflow for known intents
                       → Agent for open-ended branches
```

Example from the slides: a support system uses RAG for FAQs, a workflow for standard responses, and an agent only for refunds/escalations/multi-step actions.

## Memory patterns

Three-layer model:

| Layer | What it is | Persistence |
|-------|-----------|-------------|
| Working | Current task, last few turns, tool outputs | In prompts. Wiped between tasks. |
| Episodic | Past sessions | Vector DB. Retrieved when relevant. |
| Profile | Durable user facts — preferences, roles, settings | Structured, editable in files. Low-churn. |

Critical dos and don'ts:
- **Only store facts that are actually sourced.** Attach a confidence score.
- **Don't blindly convert user input to long-term memory.** Users can be wrong, joking, or changing their mind. This is also how prompt injection works — it tries to sneak untrusted input into memory.
- **Memory access should be explicit.** The system should clearly call `read_memory` / `write_memory` rather than doing it silently. Everything trackable, reviewable, deletable.
- **Memory poisoning is real.** Validate on write; record provenance for every entry.
- **TTL time-bound facts.** Stale memory confidently cited = new hallucination class.

What to store: preferences, constraints, tasks, facts, decisions — anything restated each session.

What to skip: transient chatter, low-confidence guesses, tool outputs (especially logs), stale data, verbatim logs.

> "Let users inspect and edit memory. Without governance it becomes a bug database."

## Context window management

- "1M tokens ≠ 1M useful tokens. You still choose what goes in and in what order."
- "Lost in the middle" is real — rules and evidence belong at the edges, never buried.
- **Budget tokens per task.** Scope per step; reset state between phases, keeping only relevant context in.
- Compact aggressively: summarize old turns, replace tool outputs with placeholders.
- Session drifting? **Reset with a short dedicated handoff summary.** Beats more compression.
- Delegate to tools and sub-agents: own window, return structured results, not raw conversation.

## Key quotes

> "The decisions you're skipping matter more than the model itself."

> "Each step right adds cost, latency, and failure modes. Stop at the first level that passes your eval set."

> "If you can write the exact sequence of steps in advance, you're building a workflow — not an agent."

> "Thin agent, heavy tools: model handles planning; tools handle logic, retries, validation."

> "Fix what the model reads before you fix how the model writes."

## Takeaways

- **The start-simple ladder is the most useful decision framework I've seen for this.** It's not a theoretical taxonomy — it's a stepwise cost/benefit tree with specific criteria at each level. Apply it before every new agent project.
- **CAG is under-appreciated.** Most people jump to RAG when the context is already known and fits in the window. AGENTS.md / CLAUDE.md loaded each session is CAG; it deserves prompt caching, not replacement with retrieval infrastructure.
- **"Thin agent, heavy tools"** is the right architecture disposition. Agents fail when they're asked to do logic, retry handling, and validation alongside reasoning. Push those into tools.
- **The three-layer memory model** (working / episodic / profile) maps cleanly onto this KB's architecture: profile = AGENTS.md + topics/ (durable facts), episodic = sources/ (past captures, retrieved when relevant), working = session context. A good mental model for auditing what lives where.
- **Memory governance is underbuilt in most systems.** Explicit read/write calls, provenance tracking, TTLs, and user inspection are not optional; they're what prevents memory from becoming a liability.
- **The eval set is the decision gate.** Every step in the ladder says "does this pass your eval set?" — which presupposes you have one. Building an eval set before choosing an architecture is the disciplined version of this workflow.

## Open questions

- CAG with prompt caching: what's the actual cost model? The 5-minute TTL in the claude-mem system suggests that long-running batches may not benefit from caching. How does the ladder account for dynamic vs static context refresh rates?
- "Thin agent, heavy tools" — who implements the tools? In the MCP model, tools are external services. In a custom harness, they're functions. The architectural choice between these has significant operational implications not addressed here.
- The router layer: how do you build a reliable deterministic router when user intent is ambiguous? No guidance on this.

## Related

- `synthesis/files-as-config-for-agents.md` — the CAG interpretation of AGENTS.md / CLAUDE.md
- `sources/2026-05-28-uphill-real-workflows.md` — companion talk: four practitioner workflows
- `topics/harnesses/index.md`
- `topics/memory/index.md`
- `topics/evals/index.md`
