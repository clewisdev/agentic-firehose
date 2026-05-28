---
title: "Claude Code Hook Surface: What It Is and How to Use It"
written: 2026-05-28
updated: 2026-05-28
topics: [harnesses]
tags: [hooks, lifecycle, observability, governance, iteration, sessionstart, posttooluse, stop, sessionend]
sources:
  - sources/2026-05-20-claude-mem.md
  - sources/2026-05-20-rosenthal-company-os.md
  - sources/2026-05-28-claude-ralph-loop-plugin.md
  - sources/2026-05-20-poha.md
status: draft
---

# Claude Code Hook Surface: What It Is and How to Use It

## What hooks are

Claude Code exposes a set of lifecycle events that you can attach shell commands or scripts to. When the event fires, Claude Code runs your hook before proceeding. Hooks are defined in `.claude/settings.json` or the equivalent settings layer.

The hook doesn't get to see Claude's internal reasoning. It sees: the event type, the tool call (if PostToolUse), and the session state as exposed by the event. Your hook is a shell command or script; it can read the filesystem, write to external systems, inspect context, and return signals that affect Claude's behaviour.

## The five hooks and what they fire on

From claude-mem's instrumentation (sources/2026-05-20-claude-mem.md) — the only source that explicitly enumerates all five:

| Hook | When it fires |
|------|--------------|
| `SessionStart` | At the beginning of a Claude Code session, before the first prompt is processed |
| `UserPromptSubmit` | Each time the user submits a prompt (before Claude processes it) |
| `PostToolUse` | After each tool call completes (WebFetch, bash, file read/write, etc.) |
| `Stop` | When Claude decides to end a session or finishes responding |
| `SessionEnd` | At the end of the session, after Stop |

Note: Rosenthal's `.claude/hooks/` folder likely maps to these same events via configuration, though the specific event bindings aren't documented in the captured source.

## Three patterns in use across the KB's sources

### Pattern 1: Observation / instrumentation (PostToolUse)

**Source:** claude-mem

Claude-mem attaches to `PostToolUse` to capture every tool call into an external store (Postgres + Chroma + Redis). Every time Claude fetches a URL, reads a file, or runs bash, the hook fires and logs: what tool was called, what the input was, what the output was, and the timestamp.

**Why this is powerful:** Tool calls are the agent's actions in the world. Logging them gives you a complete audit trail of what happened in a session, even if Claude's reasoning is opaque. It's the equivalent of access logging in web infrastructure.

**Application:** The same pattern applies to any harness that needs observability — the cloud capture agent could use PostToolUse to log each WebFetch call and its result to a separate store, independently of whether the capture succeeds.

### Pattern 2: Iteration control (Stop hook)

**Source:** claude-ralph-loop-plugin

The ralph-loop plugin attaches to `Stop` — the event that fires when Claude decides it's done. Rather than letting the session end, the hook intercepts the stop event, re-feeds the original prompt, and starts a new iteration. All file modifications and git history from the completed session are preserved; only the context window resets.

The hook reads the final output to check for a "completion promise" string. If found, the hook allows the session to end. If not, it re-triggers.

**Why this is powerful:** The Stop hook turns Claude Code from a one-shot tool into an iterative loop without any changes to Claude itself. The loop logic is entirely in the harness, not in the prompt. The model doesn't know it's being looped; it just keeps getting re-prompted until it declares done.

**Application:** Any task that benefits from multiple passes (code review, document refinement, test-driven iteration) can be automated this way. The harness controls the loop; the model controls the work.

### Pattern 3: Governance / approval gates

**Source:** Rosenthal (sources/2026-05-20-rosenthal-company-os.md)

Rosenthal's `.claude/hooks/` folder implements tiered role-based approvals: specific operations require approval from a higher-tier identity before proceeding. This is governance-as-code — the approval requirement is in configuration, not in a prompt.

The specific hook event(s) used for approvals aren't detailed in the captured source, but the pattern is: on high-risk operations (merging code, deploying, billing actions), the hook fires, checks the user's role, and either allows the operation or surfaces a human approval step.

**Why this is powerful:** This is the computational-control answer to the problem VibeSec (sources/2026-05-28-vibesec-reckoning.md) identifies: "telling an LLM desired behavior is not the same as enforcing it." A prompt says "don't merge without approval." A governance hook *prevents* the merge until approval is confirmed, regardless of what the model was told.

**Application:** For the cloud capture agent, a governance hook could prevent writes to `sources/` if the Worker hasn't verified the email sender is the authorized owner. This is a structural protection, not a prompt instruction.

### Pattern 4: Initialization and finalization (SessionStart / SessionEnd)

**Sources:** claude-mem (both), POHA (implicitly)

Claude-mem uses SessionStart to prime context — loading relevant prior memory into the beginning of the session based on what's in the current prompt or task. It uses SessionEnd to flush the session summary to the external store.

POHA's "acknowledgment loop" (self-mailto pattern) is a form of session finalization — writing a record of what happened to an external channel.

Captain-hindsight from the an internal enterprise team snippet (sources/2026-05-28-internal-teams-snippet.md) is semantically a SessionEnd pattern: post-session retrospective that generates recommendations for improving future sessions.

**Why this is powerful:** The session boundary is where you do expensive setup once (SessionStart) and expensive cleanup once (SessionEnd), rather than paying for it on every tool call.

## The gap: UserPromptSubmit

No captured source describes a compelling use of `UserPromptSubmit`. The obvious uses would be:
- Pre-processing or sanitizing the user's input before the model sees it
- Injecting additional context based on what the user just asked (e.g., looking up relevant files and adding them to the prompt)
- Rate limiting or validating the prompt before the session spends tokens on it

This is an under-explored area in the KB's current sources.

## How to think about which hook to use

| What you're trying to do | Hook to use |
|--------------------------|-------------|
| Log every action the agent takes | PostToolUse |
| Build a memory/observation store | PostToolUse |
| Loop the agent across iterations | Stop |
| Prime context from external memory | SessionStart |
| Write session summary to external store | SessionEnd |
| Prevent a specific operation without approval | PostToolUse (if tool-specific) or Stop (if blocking session end) |
| Pre-process or validate user input | UserPromptSubmit |
| Retrospective / token optimization | SessionEnd |

## What this enables architecturally

The hook surface is what makes Claude Code a platform rather than just a CLI. Without hooks, you can prompt the model and read its output. With hooks, you can:

- Build external memory stores that persist across sessions (claude-mem)
- Implement continuous iteration without human intervention (ralph-loop)
- Enforce governance policies that survive any prompt override (Rosenthal)
- Measure and log agent behaviour for debugging and improvement

The five hooks are a **harness extension API**. Everything the KB has captured about harness engineering — observability, iteration, governance, cost controls — has an implementation path through these hooks.

## Open questions

- **UserPromptSubmit** remains underexplored. What are the compelling use cases? Does injecting context here (before the model sees the prompt) outperform including context in the initial system prompt?
- **Hook composition.** What happens when multiple hooks attach to the same event? Is there ordering? Can hooks veto each other?
- **The governance hook specifics.** Rosenthal uses hooks for tiered approvals but the exact event binding and mechanism isn't documented in the captured source. A direct look at the `.claude/hooks/` implementation would clarify this.
- **Cost of hooks.** Each PostToolUse hook fires on every tool call. For a session with many tool calls, a hook that does external I/O (writing to Postgres) adds latency on every call. What's the practical overhead?
