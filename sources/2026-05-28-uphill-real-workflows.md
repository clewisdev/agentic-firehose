---
title: "UpHill Workshop: How We Actually Use AI to Ship Code (Towards AI workflows)"
url: file://temp/files/uphill.zip#real-workflows
authors: [Louis-François Bouchard, Paul Iusztin, Omar Solano, Towards AI]
captured: 2026-05-28
source_type: talk
topics: [harnesses, cost-management]
tags: [workflows, model-routing, context-management, smart-zone, dumb-zone, prompts, uphill, coding-agent]
signal_level: high
status: summarized
confidence: high
freshness_until: 2026-Q4
---

# How We Actually Use AI to Ship Code

Towards AI engineering team's internal workflow talk, UpHill workshop, May 2026. Practitioner-level: real team, real deadlines, specific prompts.

The framing rule:
> **"You do the thinking. AI does the typing."**

Every pattern in the talk comes back to this. The human makes decisions; the AI executes them.

## The three-layer stack

### Layer 1: Interfaces

- **Cursor** (default for most of the team)
- VS Code + Claude Code / Codex in terminal
- Codex / Claude Code desktop apps
- Colab and Jupyter for data work

### Layer 2: Model routing by task type

As of May 2026:

| Task | Model tier | Examples |
|------|-----------|---------|
| Architecture, multi-file reasoning, planning, subtle bugs | Smart | Claude Opus 4.7 (Max effort), GPT-5.5 (Extra High) |
| Well-defined steps, boilerplate, mechanical refactors | Fast | Claude Sonnet 4.6, Grok 4.1 Fast |
| New/changing tech, sanity-checking library versions | Web-aware | Most providers' built-in web search |

Rule of thumb: **Use smart models until the task is precise; use fast models once you can describe the exact diff.** 10–20 seconds vs 1–2 minutes per step adds up fast.

### Layer 3: Context (push / pull / skills)

> **"Rules push, content pulls."**

| Type | How loaded | What goes here |
|------|-----------|---------------|
| Push | Auto-loaded every session | CLAUDE.md / AGENTS.md: rules, stack conventions, what not to touch. Keep lean. |
| Pull | Attached on demand with @attach | README, design notes, source files, logs. Specifics for this task. |
| Skills | SKILL.md / slash commands | Description pushes (always loaded), body pulls (loaded on invoke). Reusable patterns. |

The "free until you @attach" observation is important: pulled files don't cost tokens until they're explicitly attached.

## Smart zone vs dumb zone

> "Smart zone: fresh session, light context. Models reason cleanly, plan well, follow instructions."
> "Dumb zone: long session, bloated context. Models forget decisions, contradict themselves, miss details."

**Watch the token counter.** Claude Code and Codex show it in the status line. Past ~30% full is the warning sign. After that, start a new session with a short handoff summary rather than continuing to push more in.

## The four workflows (with prompts to steal)

### Workflow 1: Plan, Then Code

*When: you don't know the right approach yet.*

1. Ask the model to ask you questions one at a time before planning. Forces decisions you didn't know you were making.
2. Once aligned, use plan mode (`/plan` in Claude Code or Codex), review the plan, then execute.

**Prompt:**
```
I want to build [feature or project description].

Before we plan or write code,
ask me questions one at a time.
For each, give your recommended answer.

Stop when we have enough to write a spec.
```

> "Forces decisions you'd otherwise discover mid-implementation."

### Workflow 2: Context First

*When: you know what to change, but the model doesn't know the codebase.*

Attach README + the N files that matter. Describe the exact change. Don't let the model navigate the codebase — navigation burns tokens and produces hallucinated file paths.

**Prompt:**
```
Read @README and @main.py to learn about the project.
Read carefully @business_logic_1.py and @business_logic_2.py.
Your task is to edit @business_logic_2.py so that:
- change 1
- change 2
Follow the conventions in the README. Do not modify other files unless necessary.
Explain any extra changes you make.
```

Rule: attach 2–3 relevant files maximum. CLAUDE.md already holds the rules; you skip re-explaining every session.

### Workflow 3: Swap Models (Smart Decides, Fast Does)

*When: you're waiting 1–2 minutes on a big model for every tiny edit.*

Use the smart model for reasoning and planning. Once the task is broken into a precise, mechanical step, switch to the fast model.

**Fast model prompt:**
```
You are a coding assistant. The design and fix are already decided.
Here is the current code for function_x (and related types):
<paste code>
Here is the exact change I want:
<describe logic + conditions + expected output>
Implement this change inside function_x only.
Do not introduce new concepts or redesign anything.
Do exactly what is described and nothing more.
```

> "No exploration, no redesign, no planning. The thinking is already done."

### Workflow 4: Shipping Past Your Fluency

*When: the AI wrote code in a stack you can't read fluently. Don't vibe-ship it.*

Three independent signals to detect problems:

1. **Explain-back** — ask the agent to walk through the file, name patterns, flag what to double-check.
2. **Adversarial reviewer** — second session, paste code + spec, prompt as a harsh senior reviewer. (Productized as `/review`, `/security-review` in Claude Code.)
3. **Behaviour probes** — try the app as a user. Empty input, malformed URL, network off, double-click submit. You don't need to read the stack to notice the spinner never stopped.

**Explain-back prompt:**
```
Walk me through this file top to bottom.
For each chunk, tell me:
- what it does
- what non-obvious decisions you made
- what you'd want a senior [stack] engineer to double-check
Name hooks, patterns, and APIs by name.
Surface anything that might surprise me.
Flag anything you're not sure about.
[optional, tutor mode]
Also teach me as you explain:
- name idioms/patterns and APIs explicitly
- compare to equivalents in Python (or my native lang)
```

> "You're not testing the AI's syntax. You're auditing its judgment."

Caveat on Workflow 4: these techniques give you system-level understanding (what the app does, where it might break), not stack-level fluency (how the framework works in general). Not enough for auth, payments, PII, concurrency-heavy code, or long-lived codebases. For those, fluency or domain expertise is still required.

## Debugging

1. Paste error + stack trace + the function. Not your theory — the evidence.
2. Ask for diagnosis **and** rewrite in the same prompt.
3. If it doesn't work after 2 tries: new thread with a narrower question and better evidence plus your intuition.

Enable web search for newer libraries: "use the web-search tool for…"

## Tests (baked into prompts)

Ask for code AND tests in the same prompt. Tests act as verification + documentation. Ask the model to run them too (coding agents can execute). 

Encode it in CLAUDE.md: "always write tests for new functions" so you never forget. Otherwise models don't write testable code by default.

## Agents as PR operators

Pattern: agent reads the issue → proposes a plan → writes the code → drafts the PR summary. Tools: Claude Code / Agent SDK in GitHub Actions; Codex cloud tasks; GitHub Copilot cloud agent.

**Guardrail:** agent restates the plan before making changes; human reviews diffs and runs tests.

## Where AI still fails

- **Silent failures** — code looks correct, runs without errors, but doesn't do what was intended. Bugs surface 30–90 days later.
- **Edge cases and recursion** — AI handles the happy path; often misses boundary conditions and stopping conditions.
- **Long sessions / dumb zone** — forgotten decisions, contradictions, missed details as context fills.
- **The productivity paradox** — more AI-generated code can mean longer reviews and more churn; people feel faster while the team gets slower.
- **The fluency gap** — code in a stack you can't read is tempting to ship unreviewed. Workflow 4 is the antidote.

## Guardrails in practice

- **Keep tasks atomic** — one function, one file, one concern. `/clear` between tasks; fresh sessions beat compacted ones.
- **Review everything** — AI-generated PRs need more scrutiny, not less.
- **Test by default** — encode in CLAUDE.md.
- **Stay sharp** — write the hard parts yourself; use AI for volume, not judgment.
- **Automate what you repeat** — if you've run the same cycle three times, turn it into a skill.

## The loop

> Context → Plan → Code → Verify → Debug → Reflect → encode what worked → repeat.
> "Tools will change, the method survives."

## Takeaways

- **"Rules push, content pulls"** is the clearest formulation of the CLAUDE.md / pull-context pattern I've seen. It explains why CLAUDE.md should be lean (pushed on every session — keep it cheap) and specific files should be @attached on demand (free until used).
- **Smart zone / dumb zone with the 30% token threshold** is actionable immediately. Claude Code's status line shows token count; past 30% is the operational signal to start a new session.
- **The four workflows address the four most common breakdown points:** no clear approach (Workflow 1), model doesn't know codebase (Workflow 2), model speed bottleneck (Workflow 3), stack you can't review (Workflow 4). Together they cover most real situations.
- **The fast model prompt discipline** ("the thinking is already done, no redesign") is a significant token efficiency win. The barrier isn't knowing this — it's building the habit of switching models mid-session rather than continuing with the smart model for mechanical steps.
- **"You're not testing the AI's syntax. You're auditing its judgment."** The explain-back technique is an eval of the model's decision-making, not just its output. This reframes code review from "does it work" to "do I understand why it made these choices."
- **The productivity paradox is real and under-discussed.** Velocity metrics go up while review burden goes up simultaneously. Net team throughput can decrease. Worth measuring.

## Open questions

- The 30% token threshold: is this empirical from their team's experience, or theoretical? Does it differ by task type (architecture work degrades faster than boilerplate)?
- "Automate what you repeat" → skills. But how do you know a pattern is ready to be encoded as a skill vs still evolving? The captain-hindsight pattern (post-session retrospective) is a mechanism for answering this, but it's not in this talk.
- The PR operator pattern: the guardrail (agent restates plan before changes) requires human review of the plan. What's the latency cost of this gate for a high-volume repo? At what volume does the guard become the bottleneck?

## Related

- `sources/2026-05-28-uphill-agentic-ladder.md` — companion session 1 content: decision framework for prompting → CAG → RAG → workflow → agent
- `sources/2026-05-28-internal-teams-snippet.md` — similar model-routing-by-task-type practice, from an internal enterprise team
- `sources/2026-05-28-brussee-caveman-code.md` — fast model token efficiency (caveman approach)
- `synthesis/harness-engineering-101.md` — "rules push, content pulls" is context design
- `topics/harnesses/index.md`
- `topics/cost-management/index.md`
