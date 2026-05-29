---
title: "Cloud-hosted email-triggered capture agent"
status: in-progress  # planning | in-progress | shipped | abandoned
drafted: 2026-05-27
updated: 2026-05-29
owner: chris
---

# Plan: cloud-hosted email-triggered capture agent

## Goal

Owner sends URLs to a dedicated email address; an agent running in the cloud picks them up, runs the capture flow defined in `AGENTS.md` (including triage / discernment) against the live KB, and auto-commits the result to a private GitHub repo. Removes the manual paste-cycle that currently bottlenecks ingestion.

Out of scope for this plan: non-email channels (Twitter / LinkedIn DMs / RSS), automated synthesis, multi-user contribution, cross-KB capture.

## Resolved direction

### Chosen architecture (Path A) — split ingestion from querying

- **Repo hosting**: private GitHub repo. Public is off the table.
- **Inbox**: dedicated address on the owner's existing Cloudflare-registered custom domain (specific address TBD).
- **Ingestion runtime**: Cloudflare Email Routing → Cloudflare Worker. Worker extracts the URL from incoming email, calls Anthropic Messages API with `AGENTS.md` triage + capture rules in the prompt, commits the result to the GitHub repo via the REST API.
- **Querying surface**: Claude Code on the owner's laptop with the repo cloned. `git pull` → `claude` → conversational queries against the KB.
- **Commit mode**: auto-commit (no PR review gate).
- **Triage**: agent triages autonomously per `AGENTS.md`. Negative-signal sources are skipped, but **every skip lands in `sources/skipped/` with a one-line reason** so there's a visible audit trail. Required, not optional, given auto-commit.
- **API runtime**: regular Anthropic Messages API. Managed Agents (beta) not used at v1.
- **API key storage**: Cloudflare Worker Secrets (encrypted at rest, scoped to the Worker, never readable after set).

### Why this over the alternatives

- The "agent lives in one cloud place I visit" mental model is appealing, but the thing that needs to be unified is the **repo**, not the **runtime**. Path A makes the repo the single source of truth and lets the runtime be ephemeral / cheap.
- The laptop is a genuinely better terminal experience than SSH'd-into-a-VM for interactive querying (real editor, real shell, no remote-latency friction).
- No server to patch, no monthly bill.

## Architectures considered and discounted (at this stage)

### Path B — always-on cloud VM running Claude Code

Small VM (Hetzner CX22 ~€4/mo, Fly free-tier machine, Oracle Cloud always-free). Claude Code installed, repo checked out locally, Anthropic key in env. Worker POSTs incoming URLs to an auth-gated VM endpoint; VM runs `claude -p` headless for the capture flow. Owner SSHes into the VM for interactive queries.

**Why discounted (2026-05-27)**:

- Matches the "agent lives somewhere I visit" mental model literally, but Path A satisfies the underlying requirement (interactive access to the KB) by making the repo the unified thing instead of the runtime.
- Adds a server to patch, ~€5/mo cost, and SSH friction vs local terminal.
- The interactive surface (SSH'd Claude Code on a VM) is meaningfully worse than local Claude Code for daily use.

**When to revisit**: if Path A in practice produces too much "is this stale? did I pull?" friction, or if we add autonomous behaviours that genuinely need an always-on agent (scheduled re-triage, periodic synthesis-readiness scans, multi-step orchestration), Path B becomes attractive again. Kept on record so we don't re-derive it.

### Path C — Claude Cowork on a dedicated machine, polling IMAP via MCP

POHA-style scheduled-agent pattern. **Why discounted**: same as Path B (requires always-on machine) plus weaker debugging UX than Workers / Actions for headless pipelines.

### Path D — Low-code SaaS (Zapier / n8n / Make)

**Why discounted**: vendor lock-in, ongoing cost, opaque error handling. Fine for a 10-minute prototype, wrong as the long-term path.

### Original Path A — GitHub Actions polling IMAP

**Why superseded**: the owner already has Cloudflare set up with email routing on a custom domain. Cloudflare Email Routing → Worker is push-based and lower-latency than IMAP polling, and removes the "did the cron run yet?" failure mode. Strictly better given the existing infrastructure.

## Open decisions still to resolve

### Notification

Decided: **no notification path in v1**. The presence of new commits on the GitHub repo is sufficient signal. If the Worker fails silently and we want to know, add an email-on-failure later.

### Send format (#7)

Deferred. Working assumption: bare URL in subject or body; agent extracts whichever it finds. Optional override tags in subject (`[skip]` / `[brief]` / `[full]`) considered later if useful. Revisit before implementation.

### `sources/skipped/` schema

Each skipped URL gets one file at `sources/skipped/YYYY-MM-DD-short-slug.md`. Frontmatter: `url`, `received_at`, `triage_classification` (negative-signal / off-topic / unfetchable / other), `reason` (one line). Body optional. Finalise when we move to execution.

### Failure handling

If the Worker hits an Anthropic rate limit, a fetch error, or a GitHub commit failure: log to Worker logs and return a non-200 so Cloudflare's email retry kicks in. Confirm before execution.

### Managed Agents — future evolution

Not used at v1. Worth a re-evaluation if:

- Ingestion grows multi-step (fetch URL → also fetch referenced repos → also fetch comments thread).
- We want "dreaming" / periodic re-review of past captures for pattern-finding.
- We want MCP-tooled retrieval beyond simple file reads.

Not a v1 concern. Logged so the option stays visible.

## Cost note

Per capture, ~1 WebFetch call + 1–3 Claude API completions for the writeup + 1 git commit. At today's API rates with prompt caching on `AGENTS.md`, well under $1/capture for typical posts. Cloudflare Email Routing and Worker free-tier comfortably covers personal volume. Cost ceiling is owner URL volume, not architecture.

## Risks

- **Inbox compromise.** Any email arriving at the trigger address gets processed. Use a dedicated address; don't expose it; treat any third party with the address as having author rights to the KB.
- **Malicious / poisoned URLs.** WebFetch renders content; the returned text is *untrusted input*. Never let fetched content drive shell commands or git operations beyond writing the capture file.
- **Auto-commit means no human gate.** Reinforces why the `sources/skipped/` audit trail is required, and why the triage prompt needs to be conservative (when in doubt, skip and log).
- **Silent failure.** Without notification, a broken Worker leaves URLs unprocessed silently. Mitigated by Worker logs and (later) email-on-failure if pain.
- **Schema / convention drift.** As `AGENTS.md` evolves, the Worker must keep up. Tie behaviour to *reading* `AGENTS.md` from the repo at runtime, not hard-coded heuristics. (The Worker fetches `AGENTS.md` via the GitHub API on each invocation, or checks out the repo.)

## Next decision point

Send format and `sources/skipped/` schema before any execution. Both are 10-minute decisions and don't need to be made now.

## Context loading architecture — decision log

**Decided 2026-05-28.** AGENTS.md is loaded as a static system-prompt prefix on every Worker invocation. This is CAG (Context-Augmented Generation), not RAG. The distinction matters for the evolution path.

### Why CAG is correct for v1

AGENTS.md is static (edited deliberately, not per-run), fits comfortably in the context window, and is needed in full for every capture. The UpHill start-simple ladder test: "Do you know the context? Does it fit in ~200K tokens?" Both yes. CAG is the right answer. No retrieval infrastructure, deterministic, trivially debuggable.

One concrete action to include from day one: set `cache_control: {"type": "ephemeral"}` on the system prompt block in the Anthropic API call. If multiple captures land within a 5-minute window, AGENTS.md tokens cache. Zero implementation cost, small benefit at current volume, meaningful benefit if batch processing ever runs.

### When to step up — three trigger points

**Trigger 1: AGENTS.md pushes sessions past ~30% context fill before content is loaded.**
Check the token counter during a normal capture session. If the static prefix + WebFetch content + in-progress capture file is already at 30% before writing, AGENTS.md is crowding the working space. Response: split into a lean always-load core (triage rules, capture flow, schemas) and on-demand sections (Teams snippet handling, file-based material guidance) loaded only when the input type warrants it. This is selective pull, not full RAG.

**Trigger 2: Duplicate captures start appearing in sources/.**
The Worker has no cross-KB awareness — it can't check whether a URL was already captured. If duplicates land, the fix is a lightweight lookup: maintain `sources/index.txt` (one URL per line), fetch it from GitHub at Worker startup, check before processing. One small retrieval step, not a vector pipeline.

**Trigger 3: Capture volume grows to batches within the same 5-minute window.**
At personal volume (a few URLs/day, spaced hours apart), prompt cache hits are rare. At batch volume (conference link dumps, RSS feeds), multiple captures within 5 minutes will hit the cache. At that point, verify the `cache_control` flag is set and measure cache hit rates in Worker logs.

### What does NOT trigger a step-up

- AGENTS.md growing longer from normal maintenance. Growth is a "keep lean" discipline problem, not an architecture problem. Prune before considering RAG.
- "It would be nice to have richer context." Earn the next step with a measured constraint, not a hypothetical benefit.

## Revision log

- **2026-05-27** — drafted (initial planning).
- **2026-05-27** — Path A chosen (Worker + laptop Claude Code). Path B (always-on VM) explicitly discounted at this stage with rationale preserved. Path C / D / original-A also documented as discounted. Resolved: private GitHub, Cloudflare custom-domain inbox, auto-commit, autonomous triage with `sources/skipped/` audit trail, Worker Secrets for API key, no notification at v1. Open items reduced to send format, skipped-file schema, failure handling, future Managed Agents evolution.
- **2026-05-28** — Context loading architecture decided: AGENTS.md as CAG static prefix (not RAG). Three trigger points for stepping up logged. Concrete v1 action: `cache_control` flag on system prompt block.
- **2026-05-29** — Worker implemented. `worker/` at repo root: `src/index.ts` (email handler), `src/email.ts` (postal-mime parsing, URL + override extraction), `src/fetch.ts` (URL content fetch + HTML strip, 30K char budget), `src/github.ts` (fetch AGENTS.md + commit files via REST API), `src/claude.ts` (Anthropic Messages API, prompt caching on AGENTS.md). Open decisions resolved: bare URL in subject/body, `[skip|brief|full]` override tags, `sources/skipped/` schema as in plan. Remaining manual steps before shipping: npm install in worker/, set ANTHROPIC_API_KEY + GITHUB_TOKEN secrets, configure CF Email Routing → Worker in CF dashboard, wrangler deploy.
