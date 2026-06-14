---
title: "Caveman — ultra-compressed communication skill"
url: "https://github.com/JuliusBrussee/caveman"
authors: [JuliusBrussee]
captured: 2026-05-28
source_type: repo
topics: [cost-management]
tags: [skills, token-compression, caveman, output-caps]
signal_level: high
status: summarized
confidence: high
freshness_until: evergreen
---

# Caveman skill

Standalone repo at `JuliusBrussee/caveman`. Also mirrored in `mattpocock/skills` (productivity category). Preservation copies:
- `skills/caveman/SKILL.md` (preserved)
- `.claude/commands/caveman.md` (active Claude Code installation)

Benchmarked at 65-75% output token reduction across diverse technical tasks. The claims come from actual measurements in the repo (`evals/`, `benchmarks/`), not invented numbers — the README explicitly states "Benchmark/eval numbers must be real measurements, never invented."

## What it does

Single-command mode switch that compresses all subsequent responses. Triggered by "caveman mode" / "less tokens" / `/caveman`. Persists across turns until "stop caveman" / "normal mode".

**Five intensity levels:**
- `lite` — strips filler/hedging, keeps full sentences
- `full` — drops articles, allows fragments, short synonyms (default)
- `ultra` — maximum compression, arrow causality (X -> Y), minimal wording
- `wenyan` — classical Chinese compression variants

**Compression rules:** Drop articles, filler, pleasantries, hedging. Keep technical terms exact. Keep code blocks unchanged. Pattern: `[thing] [action] [reason]. [next step].`

**Auto-clarity exceptions:** Temporarily exits caveman mode for security warnings, irreversible action confirmations, and ambiguous multi-step sequences. Resumes afterward.

## Ecosystem

The standalone repo is more than a SKILL.md — it's a full project:
- Multi-platform distribution (Claude Code plugin, Codex, Gemini, Cursor, Windsurf, 40+ others)
- Three Claude Code hooks: `caveman-activate.js` (SessionStart injection), `caveman-mode-tracker.js` (UserPromptSubmit slash-command handling), `caveman-statusline.sh` (colored badge + lifetime savings counter)
- Companion tools: caveman-code, cavemem, cavekit, cavegemma

The SKILL.md installed here (`skills/caveman/`) is the minimal skill layer. The full hook-based auto-activation and statusline are available from the repo if the owner wants deeper integration.

## Takeaways

1. **Works by changing compression, not quality.** The key insight: output verbosity is orthogonal to reasoning quality. You can have full reasoning with minimal prose.
2. **Caveman is a per-session runtime control.** It does not change what the model thinks — only what it writes. Complementary to prompt caching (cross-session cost) and smart/dumb zone discipline (session structure).
3. **Auto-clarity exceptions are important.** The skill explicitly re-enters full clarity mode for security/destructive-action confirmations. This is the right call — never compress a warning.
4. **The statusline hook is genuinely useful** for feedback: seeing cumulative savings per session makes the cost reduction tangible. Worth adding if the owner installs the full repo.
5. **Not just for cost — also for focus.** Dense responses force you to read more carefully and extract signal. Side benefit of caveman mode beyond token savings.

## Open questions

- The 65-75% benchmark is measured on what task distribution? May be optimistic for synthesis-heavy work where the reasoning itself is dense.
- The full repo's hook-based auto-activation (SessionStart) would auto-enable caveman every session. Worth considering once we're clearer on which sessions should be full-prose vs. compressed.
