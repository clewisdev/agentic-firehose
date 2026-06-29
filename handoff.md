## Handoff — 2026-06-29

> **Clean state. Commits pushed. No raw sources in flight.**

### Accomplished this session

**Infrastructure:**
- Regenerated expired GitHub PAT (`cloudflare-worker`) and updated Worker secret via `wrangler secret put GITHUB_TOKEN`
- Deployed Worker (`agents-kb-capture` v`9510d828`) — ships the `skills` vocab addition that had been pending since commit `045bb87`
- Installed `agent-skill-manager` (`asm` v2.13.0) at `~/.local/bin/asm` via `npm install --prefix ~/.local`
- Symlinked all 14 global skills (`~/.claude/skills/*` + `~/.agents/skills/*`) into `~/.config/opencode/skills/` so `captain-hindsight` and all other global skills are now available in OpenCode. Restart OpenCode to pick up the new directory.

**Captures & synthesis (2 commits pushed):**
- Pulled 22 new Worker-captured sources (Jun 20–29) + 9 skipped + 4 debug HTML files
- Full capture: `sources/2026-06-15-we-dont-write-code-anymore.md` — Quigley/Sanity essay (recovered from a transient 503 skip; fetched directly from sanity.io). High confidence.
- Fixed broken source path (`2025-06-13-` → `2026-06-15-`) in `synthesis/verification-bottleneck.md`, `topics/team-dynamics/index.md`, `topics/code-review/index.md`, `topics/ai-productivity/index.md`
- Updated `synthesis/loops-as-unit-of-work.md` — new section "The outer loop is not plumbing: post-merge agent continuity" revising the three-loop model's claim that the outer loop was "unchanged in structure"; adds open question on continuity mechanism

**Plans housekeeping:**
- `plans/dashboard-featured-repo.md` → `status: complete` (was already implemented)
- `plans/rotate-anthropic-api-key.md` → `status: cancelled` (key was never in source; repo going public is not a rotation trigger)

**LinkedIn URL investigation:**
- Confirmed `share` type URLs (e.g. Damien's context-dilution post) are gated by LinkedIn regardless of URL format — `share` = reshare type, requires login; `ugcPost` / `activity` with profile slug = native post, publicly fetchable
- Two previously-503'd skips (Aurimas, Vincent Quigley) were transient — both now fetchable

### Current state

- **22 sources status: raw** — Worker-captured Jun 20–29, none cross-linked yet
- **1 new source summarized**: `2026-06-15-we-dont-write-code-anymore.md`
- **11 synthesis files** (loops-as-unit-of-work updated this session)
- Branch up to date with `origin/main` — HEAD `be9bc84`
- Working tree clean except `.obsidian/workspace.json` and `handoff.md`

### Next steps (priority order)

1. **22 raw sources — cross-link pass** — run `synthesise` skill through the Jun 20–29 backlog. These are all `status: raw` with no topic index entries.
2. **pii-check** — Phase 2 public gate before further promotion. Run `pii-check` skill; manual pass on `sources/debug/` (4 HTML files with raw LinkedIn page content), `handoff.md`, `temp/`.
3. **`plans/linkedin-unfetchable.md`** — implement Option A (email body `[content]` paste detection in Worker). We now understand the mechanism clearly: `share`-type URLs are permanently gated; `ugcPost`/`activity` URLs with profile slugs are publicly fetchable.
4. **Dashboard hosting (Phase 3)** — blocked on pii-check. GitHub Actions + Pages wiring for `temp/dashboard/`.
5. **Synthesis follow-ups:**
   - `CONTEXT.md` lexicon (`plans/context-md-lexicon.md`) — two pointers at this now (handoff + skills-ecosystem synthesis)
   - SkillOpt for `synthesise` skill (`plans/synthesise-skill-skillopt.md`) — needs labelled run history
   - Rules reliability thread (prompting open thread) — needs a second source
6. **ASM integration** — `asm` is installed at `~/.local/bin/asm`. For new skills going forward, use `asm link` to also symlink into `~/.config/opencode/skills/`. The current 14 skills are already linked.

### Key files

- `sources/2026-06-15-we-dont-write-code-anymore.md` — Quigley/Sanity capture, cross-linked to 4 topic indexes
- `synthesis/loops-as-unit-of-work.md` — updated with post-merge continuity section
- `worker/wrangler.toml` — Worker config; secrets managed via `wrangler secret put`
- `plans/` — 10 active planning items; see TODO review above
- `~/.local/bin/asm` — agent-skill-manager CLI
- `~/.config/opencode/skills/` — OpenCode skill directory (symlinks to ~/.claude/skills/ and ~/.agents/skills/)

### Suggested skills

- `synthesise` — for the 22 raw source cross-link pass
- `pii-check` — Phase 2 public gate
- `captain-hindsight` — now available in OpenCode; worth running after the synthesise pass if there's friction
- `wrangler` — if Worker changes needed (linkedin-unfetchable plan implementation touches the Worker)
