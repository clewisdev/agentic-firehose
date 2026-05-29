---
title: "How to use the cost management stack"
written: 2026-05-28
updated: 2026-05-28
topics: [cost-management]
tags: [skills, hooks, caveman, handoff, captain-hindsight, prompt-caching, model-selection]
status: stable
---

# How to use the cost management stack

Reference guide for the cost controls installed in this project. Four layers, each operating at a different scope.

---

## Layer 1 — Prompt caching (cross-session, automatic when Worker is built)

**What it does:** Every API call to Claude loads AGENTS.md as the system prompt. Without caching, that costs full input price each time. With caching, repeated reads cost 90% less.

**Status:** Not yet active. Requires the Cloudflare Worker.

**When the Worker is built:** Add `cache_control: {"type": "ephemeral", "ttl": "1h"}` on the AGENTS.md block in the system prompt JSON. No ongoing action needed after that — the API handles it automatically.

**How to verify it's working:** The API response includes `cache_read_input_tokens` in usage stats. If that number is > 0, the cache is hitting.

---

## Layer 2 — Session structure: the 30% threshold

**What it does:** Every message in a session re-reads the entire conversation history. A 100k-token session costs 3-5x more per response than a fresh 20k-token session. Keeping sessions lean is free cost reduction.

**The rule:** When a session feels cluttered, or you've been in it for 2+ hours with many tool calls, trigger a handoff and start fresh.

**How to do it:**

1. Type `/handoff` in the chat — I'll produce a structured summary covering what was done, current state, next steps, and which skills to activate in the new session.
2. Copy the output.
3. Start a new Claude Code session (`Ctrl+C` then `claude` in the terminal, or close and reopen the app).
4. Paste the handoff summary as your first message.

**The signal to watch for:** Responses getting noticeably slower, or you're finding yourself re-explaining context you already gave earlier in the session.

---

## Layer 3 — Captain Hindsight (post-session process improvement)

**What it does:** After a heavy session, looks back at what wasted tokens — redundant file reads, failed tool calls, scope changes, missing rules. Proposes concrete fixes (new AGENTS.md rules, skills, scripts) up to a cap of 5 items.

**When to run it:** After any session with ≥5 tool calls, corrections from you, or surprises. Not for quick lookups.

**How to do it:** Type `/captain-hindsight` at the end of the session. Review the proposals. Say "go" or "implement #N" for the ones worth doing. Skip if nothing interesting happened.

**What it produces:** Edits to AGENTS.md, new or updated skill files, or scripts — whichever fits the friction point.

---

## Layer 4 — Caveman mode (per-response compression)

**What it does:** Compresses my output by ~65-75% by removing filler words, articles, pleasantries, and hedging while preserving all technical substance.

**How to activate:** Type `/caveman` or say "caveman mode" / "less tokens".

**How to deactivate:** Say "stop caveman" or "normal mode".

**Intensity levels:**
- `lite` — strips filler, keeps full sentences (good for explanations you'll share)
- `full` — drops articles, allows fragments (default — good for most KB work)
- `ultra` — maximum compression, arrow causality (X → Y), minimal prose

**Auto-exceptions:** Caveman temporarily suspends for security warnings, irreversible action confirmations (deletes, force-pushes), and anything where compression would create ambiguity. Resumes afterward automatically.

---

## Session-start reminder hook

A reminder banner prints at the top of every Claude Code session:

```
── Cost reminders ──────────────────────────────────────
  /caveman          compress output (~65-75% fewer tokens)
  /handoff          wrap up + continue in a fresh session
  /captain-hindsight  retro after heavy sessions
  30% context fill  → time to /handoff
────────────────────────────────────────────────────────
```

**Where it lives:** `~/.claude/hooks/session-start.sh` (runs globally, not just for this project).
**Config:** `~/.claude/settings.json` → `hooks.SessionStart`.
**To disable:** Remove the hook entry from `settings.json` or delete the script.

---

## Model selection

**Interactive Claude Code sessions:** Sonnet 4.6 is the default and correct choice for KB work (capture, triage, synthesis). No action needed.

**When to switch:**
- Opus 4.7 — for very heavy synthesis (cross-source essays, architectural decisions). Switch via the model picker in Claude Code. ~5x cost of Sonnet 4.6. Use selectively.
- `/fast` — Fast mode (Opus 4.6 with faster streaming). Only available when base model is set to Opus 4.6. More expensive, faster output. Not meaningfully better than Sonnet 4.6 for this KB's tasks.
- Haiku 4.5 — cheapest and fastest. Not available as an interactive Claude Code model. Relevant only when the Worker is built (for high-volume triage-only classification).

**For the Worker (when built):** Route by task type:
- Triage-only classification → Haiku 4.5
- Full capture + synthesis → Sonnet 4.6
- Heavy multi-source synthesis → Opus 4.7 (rarely)

---

## Quick reference

| Situation                                  | Action                              |
| ------------------------------------------ | ----------------------------------- |
| Responses feel verbose                     | `/caveman`                          |
| Session getting long / cluttered           | `/handoff` → new session            |
| Session had surprises or many corrections  | `/captain-hindsight` before closing |
| Doing heavy synthesis across 5+ sources    | Switch to Opus 4.7 in model picker  |
| Want maximum compression for quick lookups | `/caveman ultra`                    |
| Want to turn caveman off                   | "stop caveman"                      |
