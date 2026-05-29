# Cloudflare Workers — skill loading rule

Before writing any Cloudflare Worker code in this repo:

1. Load the `workers-best-practices` skill.
2. If the Worker handles incoming email (has an `email()` handler), also load `cloudflare-email-service` and read `references/routing.md` — specifically the **Gotchas** section — before writing the handler.

## Why

The `message.raw` stream-is-single-use gotcha was written into `worker/src/email.ts` in the first draft and only caught after loading the skill reactively. The routing.md Gotchas section lists it explicitly. Loading the skill first costs one tool call; missing it costs a buggy first draft and an extra fix cycle.
