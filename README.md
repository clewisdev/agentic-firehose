# agents-kb

Personal knowledge base for **agentic engineering** — the design, building, and operation of LLM-based agents. Covers Claude Code, Claude API agents, harnesses, tool use, memory, evals, cost management, and related practice.

This is a working reference and thinking partner, not a public docs site. Optimised for future recall and decision-making.

---

## Layout

```
topics/       Distilled knowledge by theme (durable layer)
sources/      Raw captures — one file per URL/document
synthesis/    Cross-source essays: what to conclude after 3+ sources
plans/        Design and planning docs for evolving the KB itself
skills/       Preserved Claude Code skills (SKILL.md + companions)
templates/    Frontmatter templates for new source/synthesis entries
worker/       Cloudflare Worker — email-triggered automated capture
```

### Topic folders

`topics:` frontmatter is a closed vocabulary of **24 canonical topics** (one per folder), consolidated from ~179 drifted values in Phase 1c. See `AGENTS.md` → "Controlled topic vocabulary" for the rule. `topics/meta/` sits outside the content vocabulary (KB operations).

| Folder | Covers |
|---|---|
| `topics/harnesses/` | Agent harness patterns, scaffolding, tool loops, agent infrastructure |
| `topics/tool-use/` | Tool design, MCP, CLI/web integration, capability extension |
| `topics/agentic-workflows/` | Workflow patterns, ralph-loops, automation, autonomous agents |
| `topics/agent-architecture/` | Agent design, patterns, abstraction layers, agent interfaces |
| `topics/code-generation/` | AI code generation, code quality, codebase understanding |
| `topics/memory/` | Memory architectures, knowledge representation, second-brain systems |
| `topics/cost-management/` | API costs, prompt caching, token budgets, model-selection economics |
| `topics/evals/` | Evaluation design, measurement, metrics for agent workflows |
| `topics/ai-productivity/` | Developer experience, DX/culture, individual adoption impact |
| `topics/prompting/` | Prompt engineering, AGENTS.md / CLAUDE.md patterns |
| `topics/enterprise-deployment/` | Governance, risk, production/enterprise rollout, adoption |
| `topics/context-engineering/` | Context management, gathering, long-context work |
| `topics/system-design/` | Architecture, distributed systems, platform engineering, observability |
| `topics/safety/` | AI safety, alignment, guardrails, security, sandboxing |
| `topics/agent-orchestration/` | Orchestration, multi-agent, task delegation, parallel execution |
| `topics/code-review/` | Review patterns, verification, quality gates, human ownership |
| `topics/team-dynamics/` | Team/org effects, leadership, onboarding, human-AI collaboration |
| `topics/spec-driven-development/` | Planning, SDLC change, spec-first workflows |
| `topics/engineering-judgment/` | Decision-making, trade-offs, conceptual models |
| `topics/model-internals/` | Transformer mechanics, attention, training/fine-tuning fundamentals |
| `topics/product-strategy/` | Product discovery, value delivery, careers, market |
| `topics/technical-debt/` | Tech debt, legacy modernization, bottleneck analysis |
| `topics/retrieval/` | RAG, embeddings, document indexing |
| `topics/personalization/` | Personal systems, personalization |
| `topics/meta/` | KB operations, self-observation, context drift, author reputation |

### Synthesis files

| File | Summary |
|---|---|
| `synthesis/files-as-config-for-agents.md` | AGENTS.md / CLAUDE.md as CAG — when to use, failure modes, design rules |
| `synthesis/harness-engineering-101.md` | Harness design fundamentals |
| `synthesis/hook-surface-patterns.md` | Claude Code hook patterns |

---

## Automated capture (Cloudflare Worker)

Emails sent to the dedicated capture address on the custom domain are automatically processed:

1. Cloudflare Email Routing receives the email and triggers the Worker
2. Worker extracts the URL, fetches page content, loads `AGENTS.md` from this repo
3. Calls Anthropic API — triages the source and writes a capture file per the KB conventions
4. Commits the result directly to `sources/` (or `sources/skipped/` for rejected items)

### Send format

- **Body or subject**: paste a bare URL anywhere — the Worker extracts it
- **Override tags** in subject (optional):
  - `[test]` — smoke test; no URL needed, no API call, commits a healthcheck entry to `sources/skipped/` with a `healthcheck: <timestamp>` commit message. Use after any deployment to confirm the full pipeline is working.
  - `[skip]` — log to `sources/skipped/` without fetching
  - `[brief]` — force brief register even if source looks high-signal
  - `[full]` — force full capture even if source looks low-signal

Every rejected or skipped item lands in `sources/skipped/` with a one-line reason — there is always an audit trail.

---

## Claude Code skills

### Global skills (live at `~/.claude/skills/`, not in this repo)

These are project-agnostic utilities. They must be present on the machine — a bare `git clone` will not include them.

| Skill | Command | Purpose |
|---|---|---|
| Captain Hindsight | `/captain-hindsight` | Post-session retro — turns observed friction into concrete tracked artifacts (rules, skills, docs). Run after heavy capture sessions. |
| Caveman | `/caveman` | Ultra-compressed output mode (~65–75% fewer tokens). Useful when approaching context limits. `/caveman stop` to return to normal. |
| Handoff | `/handoff` | Compacts the current session into a handoff doc for a fresh agent session. Run when approaching context limits or switching tasks. |

To restore after a fresh OS install, copy the `SKILL.md` for each into `~/.claude/skills/<name>/SKILL.md`.

### Project skills (in this repo under `skills/`)

| Skill | Purpose |
|---|---|
| `knowledge-base-wiki` | KB capture and synthesis workflow |
| `synthesise` | Interactive cross-linking pass for `status:raw` sources |

---

## Runbook

### Day-to-day use

```bash
git pull                    # sync latest captures from the Worker
claude                      # open Claude Code — KB is the working context
```

Run `/captain-hindsight` after any session that involved structural changes to the KB or AGENTS.md. Run `/handoff` before ending a long session so the next one picks up cleanly.

### Redeploying the Worker

Only needed if the Worker code in `worker/` changes. `AGENTS.md` behaviour changes don't require a redeploy — the Worker reads it live from GitHub on every invocation.

```bash
cd worker
npx wrangler deploy
```

Check secrets are still set after any infrastructure changes:

```bash
npx wrangler secret list
# Should show: ANTHROPIC_API_KEY, GITHUB_TOKEN
```

If either is missing:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put GITHUB_TOKEN   # fine-grained PAT: Contents read+write on this repo
```

### Viewing Worker logs

```bash
cd worker
npx wrangler tail
```

Each capture logs: sender, subject, URL, signal level, and committed file path. Failed fetches and skipped items are also logged.

### Adding or updating a custom skill

For a **project-specific skill** (only needed in this repo):
1. Drop the skill files into `skills/<skill-name>/` (preserving the original structure)
2. Write a `sources/` capture for it (what it does, signal level, how it applies here)

For a **global skill** (useful across multiple projects):
1. Drop the skill files into `~/.claude/skills/<skill-name>/`
2. Document it in this README under "Global skills" so it shows up in a rebuild checklist

### Rotating secrets

```bash
cd worker
npx wrangler secret put ANTHROPIC_API_KEY   # prompts for new value
npx wrangler secret put GITHUB_TOKEN
```

No redeploy needed — secrets take effect immediately.
