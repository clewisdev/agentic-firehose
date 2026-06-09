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

## esbuild does not type-check — TypeScript errors deploy silently

Wrangler uses esbuild to bundle, which strips types without running `tsc`. This means code with TypeScript errors (including undeclared variables, type mismatches, scoping bugs) will deploy successfully even with `"strict": true` in `tsconfig.json`.

**Rule**: before deploying, run `tsc --noEmit` from the `worker/` directory to catch errors that esbuild would silently ignore.

This has already caused a production outage: a variable declared inside a `try` block was referenced after the `catch`, esbuild deployed it without complaint, and V8 threw `ReferenceError` on every capture for two days (issue #1).

## Worker commits go directly to `main` — debug files are not on your feature branch

The Worker writes all captures, skipped files, and `sources/debug/` HTML directly to `main` via the GitHub API. These commits do **not** land on any feature branch you are working on.

When investigating a debug file from a feature branch, use `git show origin/main:path/to/file` rather than the `Read` tool (which reads the working tree). Run `git fetch origin main` first if the file may not exist in your local remote-tracking refs yet.

## Why

The `message.raw` stream-is-single-use gotcha was written into `worker/src/email.ts` in the first draft and only caught after loading the skill reactively. The routing.md Gotchas section lists it explicitly. Loading the skill first costs one tool call; missing it costs a buggy first draft and an extra fix cycle.
