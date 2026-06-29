## Handoff — 2026-06-29

> **Clean state. All commits pushed. No raw sources in flight.**

### Accomplished this session

**Infrastructure:**
- Regenerated expired GitHub PAT (`cloudflare-worker`) and updated Worker secret via `wrangler secret put GITHUB_TOKEN`
- Deployed Worker (`agents-kb-capture` v`9510d828`) — ships the `skills` vocab addition pending since commit `045bb87`
- Installed `agent-skill-manager` (`asm` v2.13.0) at `~/.local/bin/asm` via `npm install --prefix ~/.local`
- Symlinked all 14 global skills into `~/.config/opencode/skills/` — `captain-hindsight` and all other global skills now available in OpenCode. Restart OpenCode to pick up.

**Captures & synthesis:**
- Pulled 22 new Worker-captured sources (Jun 20–29) + 9 skipped + 4 debug HTML
- Full capture: `sources/2026-06-15-we-dont-write-code-anymore.md` — Quigley/Sanity essay (recovered from transient 503 skip). High confidence. Cross-linked to 4 topic indexes.
- Fixed broken source path (`2025-06-13-` → `2026-06-15-`) in `synthesis/verification-bottleneck.md` and 3 topic indexes
- Updated `synthesis/loops-as-unit-of-work.md` — new section "The outer loop is not plumbing: post-merge agent continuity"

**Captain-hindsight retro (items #2, #4, #5):**
- `plans/linkedin-unfetchable.md` — added LinkedIn URL types section: `share` URLs permanently gated, `ugcPost`/`activity`+slug publicly fetchable; `d_registration-cold-join` pageKey as detection signal
- `~/.local/bin/sync-opencode-skills.sh` — idempotent script to re-sync `~/.claude/skills/*` + `~/.agents/skills/*` into `~/.config/opencode/skills/`; run after any new skill install
- `AGENTS.md` — added note that `handoff.md` requires `git add -f handoff.md` (gitignored)

**Plans housekeeping:**
- `plans/dashboard-featured-repo.md` → `status: complete`
- `plans/rotate-anthropic-api-key.md` → `status: cancelled`

### Current state

- **22 sources status: raw** — Worker-captured Jun 20–29, none cross-linked yet
- **11 synthesis files** (`loops-as-unit-of-work` updated this session)
- HEAD `4bf4506` — branch up to date with `origin/main`
- Working tree clean except `.obsidian/workspace.json` and `handoff.md`

### Next steps (priority order)

1. **22 raw sources — cross-link pass** — run `synthesise` skill through the Jun 20–29 backlog
2. **pii-check** — Phase 2 public gate; manual pass on `sources/debug/` (4 HTML files), `handoff.md`, `temp/`
3. **`plans/linkedin-unfetchable.md` — implement Option A** — `[content]` tag in Worker to accept email body as content instead of fetching
4. **Dashboard hosting (Phase 3)** — blocked on pii-check; GitHub Actions + Pages wiring
5. **Synthesis follow-ups:** `CONTEXT.md` lexicon, SkillOpt for `synthesise` skill, rules reliability thread
6. **New skill installs** — run `~/.local/bin/sync-opencode-skills.sh` after any new install to keep OpenCode in sync

### Key files

- `sources/2026-06-15-we-dont-write-code-anymore.md` — Quigley/Sanity capture
- `synthesis/loops-as-unit-of-work.md` — updated with post-merge continuity section
- `plans/linkedin-unfetchable.md` — URL types documented; Option A still to implement
- `~/.local/bin/asm` — agent-skill-manager CLI
- `~/.local/bin/sync-opencode-skills.sh` — OpenCode skill sync script
- `~/.config/opencode/skills/` — 14 symlinked skills for OpenCode

### Suggested skills

- `synthesise` — for the 22 raw source cross-link pass
- `pii-check` — Phase 2 public gate
- `captain-hindsight` — now available in OpenCode via `/handoff` picker
- `wrangler` — if Worker changes needed (linkedin-unfetchable Option A implementation)
