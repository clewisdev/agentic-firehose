---
title: "Harness Engineering: A 101"
written: 2026-05-28
updated: 2026-05-28
topics: [harnesses]
tags: [harness-engineering, 101, context-design, orchestration, governance, observability, cost-controls]
sources:
  - sources/2026-05-20-berkin-harness-engineering.md
  - sources/2026-05-20-claude-mem.md
  - sources/2026-05-20-rosenthal-company-os.md
  - sources/2026-05-20-poha.md
  - sources/2026-05-20-pocock-skills.md
  - sources/2026-05-28-vibesec-reckoning.md
  - sources/2026-05-28-brussee-caveman-code.md
  - sources/2026-05-28-claude-ralph-loop-plugin.md
  - sources/2026-05-28-owasp-llm-top10.md
  - sources/2026-05-30-fowler-genai-patterns.md
  - sources/2026-05-30-fowler-maintainability-sensors.md
status: stable
updated: 2026-05-30
---

# Harness Engineering: A 101

## The core distinction

There are three layers in any modern AI agent system. It helps to keep them separate in your head:

1. **The model** — the underlying LLM (Claude, GPT-5, Gemini). A general-purpose text-in / text-out machine.
2. **Agentics** — what the model is *given the ability to do*: web search, file writes, code execution, API calls. This is the tool surface.
3. **The harness** — the infrastructure *around* the model that shapes, constrains, and scaffolds its behaviour, regardless of what any specific prompt says.

David Berkin's formulation (from `sources/2026-05-20-berkin-harness-engineering.md`) is the cleanest summary:

> *Agentics describes what an agent may do. Harness engineering describes what it's allowed to do.*

That gap between "may" and "allowed" is where harness engineering lives. The model may be capable of anything in its training distribution. The harness determines what it actually can and can't do in your specific deployment.

## The contractor analogy

Think of a highly competent contractor brought in to renovate your building.

- **The model** is the contractor's skill and knowledge — they know how to do the work.
- **Agentics** gives them tools: a hammer, a power drill, access to the building.
- **The harness** is everything else: the building regulations they must follow, the safety inspector who reviews certain changes before they proceed, the site access card that limits which floors they can enter, the daily log of what they did, the project manager who says "these three things before anything else," the fixed cost ceiling before you must re-authorise.

The point: you can have the world's best contractor and still fail if the regulations, approvals, and logging aren't in place. And critically — these protections don't work by telling the contractor "please be safe." They work structurally, regardless of intent. The building inspector doesn't trust the contractor's promise; they check the work.

This is the VibeSec insight in one sentence: **telling an LLM desired behaviour is not the same as enforcing it.** Prompts are instructions to the contractor. The harness is the structural enforcement.

## What harness engineering actually contains

Berkin's taxonomy covers eight concerns. Here's each one concretely, with examples from this KB's captured sources:

### 1. Context design

What the model sees at the start of each session. This includes `CLAUDE.md` / `AGENTS.md`, project files, skill definitions, and any other material loaded into the initial context window.

**Why it matters:** Without deliberate context design, each session starts cold — the model has no knowledge of the environment, the project's conventions, or the owner's preferences. With good context design, a short prompt like "fix it" works because the model already knows what "it" is and how to approach it. André-Micolon's `dev:info` entry script (sources/2026-05-20-andre-micolon-dev-info.md) is a minimal example: one block in AGENTS.md that tells the agent how to inspect the running environment, removing the need to repeat it in every prompt.

### 2. Tool access

Which capabilities the model is granted. WebFetch, file write, bash execution, database access, API calls. The harness decides the available tool surface; the model decides when to use it.

**Why it matters:** Excessive Agency (OWASP LLM Top 10 #6) is what happens when the harness over-provisions tools — an agent that can delete files, push to production, and send emails probably shouldn't have all three simultaneously unless each is deliberate. The tool list is a permission boundary, not a shopping list.

### 3. Permissions and guardrails

What the model is *allowed* to do even when it *could* do more. Rosenthal's `.claude/hooks/` (sources/2026-05-20-rosenthal-company-os.md) implements this as tiered role-based approvals: a junior agent can suggest code changes but cannot merge; a senior can merge without approval. The tier is defined in config, not in a prompt.

**Why it matters:** A prompt can tell the model not to do X. A permission rule can *prevent* X from happening. The difference matters when the model is operating autonomously and there's no human in the loop to catch a mistake.

Fowler/Subramaniam (2025) add a concrete implementation taxonomy for guardrails: (1) **LLM-based** — a separate model call to detect harmful or off-topic input/output; (2) **embedding-based** — classify input semantically against known safe/unsafe categories; (3) **rule-based** — regex/pattern matching for known failure modes. All three can be layered, and each is independently evaluable — meaning you can run targeted evals against the guardrail component alone without needing an end-to-end test.

### 4. Orchestration

How multiple agents, models, or sessions are coordinated. This ranges from simple (the ralph-loop: one agent re-running the same task iteratively) to complex (orchestrator agent delegating subtasks to specialist subagents, as in Superpowers' subagent-driven-development pattern).

**Why it matters:** Orchestration determines who does what, in what order, and what happens when something fails. Ad hoc orchestration (just tell the model to "do it all") breaks at scale because the model has to reason about sequencing under token pressure, which it does poorly.

### 5. Observability

Logging what the agent did. Claude-mem (sources/2026-05-20-claude-mem.md) uses the PostToolUse hook to capture every tool call into an external store. Without observability, an autonomous session is a black box: you see the output but not the reasoning or intermediate steps.

**Why it matters:** Debugging, auditing, and improvement all require knowing what happened. Observability is especially critical when agents operate asynchronously or touch shared state (files, databases, APIs). The cloud capture agent (plans/cloud-capture-agent.md) uses Cloudflare Worker logs as its observability layer.

### 6. Human approval points

Explicit gates where a human must review before the agent proceeds. The opposite end of the spectrum from full autonomy. The Rosenthal tiered-approval hook is one example. Claude Code's default permission prompts (asking before running bash commands) are another.

**Why it matters:** Full autonomy is appropriate for well-understood, low-risk, easily reversible tasks. For novel situations, high-stakes operations, or irreversible actions, a human gate is cheaper than a recovery operation. Harness design should identify *which specific operations* require approval — not "all of them" (too slow) or "none" (too risky).

### 7. Cost controls

Token budgets, per-tool output caps, rate-limit handling, model routing by task type. Brussee's caveman-code (sources/2026-05-28-brussee-caveman-code.md) implements per-tool output caps and ANSI stripping to cut 1.93x token cost. The an internal enterprise team model routing practice (Opus for planning, cheaper models for implementation) is cost-aware harness design.

**Why it matters:** Unbounded Consumption (OWASP #10) — an agent that runs indefinitely or processes enormous tool outputs without budgeting — produces cost surprises. For the cloud capture agent, each invocation is billed; the harness must set a ceiling.

### 8. Evaluation

Measuring whether the agent is actually producing good outputs. SWE-bench for coding agents. Triage rules in AGENTS.md for this KB's capture quality. Without eval, changes to the harness are flying blind — you don't know if adding a new skill helped or degraded the agent's overall performance.

Fowler/Subramaniam (2025) articulate the production eval methodology: evals are non-deterministic equivalents of tests — scored across scenarios, not binary pass/fail. The recommended combination is **LLM-as-judge** (a different, more capable model scores outputs, reducing shared-bias risk) plus **human evaluation** for qualitative failures automated scoring misses. Self-evaluation is explicitly discouraged: models reinforce their own errors. Eval per component (guardrail, reranker, query-rewriting step) localises regressions; run in the build pipeline and on the live production system to catch drift.

Böckeler (2025) extends this with a **sensors framework** specifically for coding agents: sensors are automated feedback mechanisms that run during sessions, in CI, or on a schedule. Two types:

- **Computational (deterministic)**: type checker, ESLint, dependency-cruiser, mutation testing (Stryker) — fast, no token cost, binary outcomes. These run in the agent loop directly.
- **Inferential (LLM-based)**: modularity reviews, coupling analysis, security checklists — slower, token cost, but able to apply semantic judgment that rules cannot.

Critical design principle: **a sensor only helps if its output feeds back into the agent's self-correction loop.** A lint rule that produces output the agent never reads is CI theater. The corollary: encode self-correction guidance *in the sensor output itself* — custom ESLint formatters that explain what to do, not just what went wrong, measurably changed agent behavior. Böckeler frames this as "prompt injection via lint output."

For mutation testing specifically: 100% code coverage does not mean effective tests. Stryker surfaces mutation survivors — code mutations that don't cause test failures, revealing where assertions are missing. Use a custom CLI to query Stryker's JSON output rather than feeding raw files into context.

## The difference from "writing better prompts"

The confusion point is this: prompts and harness configuration both affect agent behaviour. Why is one a discipline and the other just writing?

Prompts are **inferential controls**: they request behaviour. The model may or may not honour them, may interpret them inconsistently across sessions, and provides no structural guarantee.

Harness configuration is **computational controls**: it enforces behaviour. A permission rule, a cost ceiling, a hook that fires on every tool call — these don't rely on the model's interpretation. They operate structurally.

A skilled practitioner uses both, but keeps them separate: prompts for nuance, reasoning guidance, and domain knowledge; harness config for guarantees, enforcement, and cost management.

## What "harness engineering" looks like in practice

For this KB, the harness is:

| Component | What it is |
|-----------|------------|
| `AGENTS.md` | Context design: behaviour rules, triage logic, capture flow |
| Claude Code's tool permissions | Tool access: WebFetch, file write, bash |
| The cloud capture agent (Worker) | Orchestration: triggered by email, single invocation per URL |
| Worker Secrets | Permissions: API keys scoped to the Worker, unreadable after set |
| Cloudflare Worker logs | Observability: what ran, what failed |
| Per-invocation cost ceiling | Cost controls: one capture per email, not unbounded |
| `sources/skipped/` audit trail | Evaluation: visible record of triage decisions |

The cloud capture agent plan (plans/cloud-capture-agent.md) is, in structure, a harness design document — even if it's never called that.

## The key failure modes harness engineering prevents

From OWASP LLM Top 10, mapped to harness concerns:

| Failure | OWASP entry | Harness layer that prevents it |
|---------|-------------|-------------------------------|
| Fetched content manipulates agent behaviour | Prompt Injection (#1) | Tool output sanitization; treat fetched content as untrusted input |
| Agent acquires more capabilities than needed | Excessive Agency (#6) | Tool access scoping; permission rules |
| Agent runs forever / costs too much | Unbounded Consumption (#10) | Cost controls; iteration ceilings |
| Agent acts on wrong/unsanitized output | Improper Output Handling (#5) | Output validation gates before downstream action |
| Internal instructions exposed | System Prompt Leakage (#7) | Permissions; don't put secrets in the system prompt |

## Frank summary

Harness engineering is not a new concept — it is **DevOps and systems design, applied to the LLM-as-component layer.** The same instincts that led good engineers to build load balancers, circuit breakers, access control lists, audit logs, and cost alerts for web services are the instincts that make good harnesses.

The current AI discourse over-weights prompting ("how do I make the model do X") and under-weights harness engineering ("how do I make my system behave reliably when the model is a component in it"). Most agent failures in production are harness failures: wrong tool access, no cost ceiling, no observability, no approval gates for irreversible operations.

A model that's been prompted carefully but deployed without a harness is a skilled contractor working unsupervised in a building with no regulations. It might go fine. Or it might not. The harness makes the outcome structural, not lucky.
