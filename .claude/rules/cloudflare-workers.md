# Cloudflare Workers — skill loading rule

Before writing any Cloudflare Worker code in this repo:

1. Load the `workers-best-practices` skill.
2. If the Worker handles incoming email (has an `email()` handler), also load `cloudflare-email-service` and read `references/routing.md` — specifically the **Gotchas** section — before writing the handler.

## Keeping CAPTURE_SYSTEM in sync with AGENTS.md

If the signal-level definitions, triage criteria, or hype tells in `AGENTS.md` change, also update the `CAPTURE_SYSTEM` constant in `worker/src/claude.ts`. These two must stay consistent — AGENTS.md drives interactive sessions; CAPTURE_SYSTEM drives the automated Worker. They diverged once already when the Worker was migrated to Haiku; catching it requires a conscious check.

## Cloudflare Email Routing retries — Worker handlers must be idempotent

Cloudflare Email Routing can deliver the same email twice. This is not hypothetical — it has happened in this repo (two captures of the same URL committed 11 seconds apart, with slightly different Haiku output each time).

**Rule**: any write operation in the Worker must check whether the target already exists before writing. If it does, log and return — do not overwrite.

The current `commitFile` in `worker/src/github.ts` implements this: it GETs the file first and returns early if a SHA is found. Do not change this behaviour. If you add new write paths (new file types, new commit flows), apply the same check.

## Why

The `message.raw` stream-is-single-use gotcha was written into `worker/src/email.ts` in the first draft and only caught after loading the skill reactively. The routing.md Gotchas section lists it explicitly. Loading the skill first costs one tool call; missing it costs a buggy first draft and an extra fix cycle.
