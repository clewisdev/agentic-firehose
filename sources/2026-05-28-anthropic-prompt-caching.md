---
title: "Anthropic Prompt Caching — Technical Reference"
url: https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching
authors: [Anthropic]
captured: 2026-05-28
source_type: docs
topics: [cost-management, harnesses]
tags: [prompt-caching, token-efficiency, api, cache-control, ttl, worker]
signal_level: high
status: summarized
confidence: high
freshness_until: 2027-Q1
---

# Anthropic Prompt Caching

Opt-in feature that caches static portions of a prompt prefix between API calls. Cache reads cost 0.1× base input price — 90% discount. The primary use case for this KB: caching AGENTS.md as a system prompt prefix across Worker invocations.

## How to enable

Two methods:

**Method 1 — Automatic (top-level flag, simplest)**
```json
{
  "model": "claude-sonnet-4-6",
  "cache_control": { "type": "ephemeral" },
  "system": "...",
  "messages": [...]
}
```

**Method 2 — Explicit breakpoints (fine-grained, recommended for the Worker)**
```json
{
  "model": "claude-sonnet-4-6",
  "system": [
    {
      "type": "text",
      "text": "<AGENTS.md content>",
      "cache_control": { "type": "ephemeral", "ttl": "1h" }
    }
  ],
  "messages": [
    { "role": "user", "content": "Capture this URL: https://..." }
  ]
}
```

Place `cache_control` on the **last static block** — after all content that's identical across calls, before any dynamic content. This is the critical placement rule.

## What can be cached

- System prompt content blocks
- User and assistant message content blocks
- Tool definitions
- Images and documents (user turns only)

Cannot be cached: thinking blocks, empty text blocks, sub-content blocks (citations).

## Pricing

For Sonnet 4.6 (the Worker's likely model):

| Operation | Cost per MTok |
|-----------|--------------|
| Base input (no cache) | $3.00 |
| Cache write — 5m TTL | $3.75 (1.25× base) |
| Cache write — 1h TTL | $6.00 (2× base) |
| Cache read (hit) | $0.30 (0.1× base) |
| Output | $15.00 |

**Break-even for 5m write:** Cache hit saves $2.70/MTok vs uncached; write overhead costs $0.75/MTok extra. First hit pays back the write premium immediately (net +$1.95/MTok saved on hit).

**Break-even for 1h write:** Write premium is $3.00/MTok extra over base. Break-even at ~2 cache hits within the TTL window ($2.70 × 2 = $5.40 saved vs $3.00 overhead).

## TTL options

- **5 minutes** (default) — refreshed at no extra cost when cache is reused within the window. Cache expires after 5 minutes of non-use.
- **1 hour** — `{ "type": "ephemeral", "ttl": "1h" }` — at 2× write cost. Longer window means more hits per write. Worth it when multiple calls arrive within an hour.

## Minimum cacheable length

| Model | Minimum tokens to be cacheable |
|-------|-------------------------------|
| Sonnet 4.6, Haiku 4.5 | **1,024 tokens** |
| Opus 4.7, 4.6, 4.5 | 4,096 tokens |

AGENTS.md is currently ~3,000 tokens — **above the Sonnet minimum, below the Opus minimum**. If the Worker uses Opus, AGENTS.md satisfies the 4,096 minimum only if it grows slightly. At current size, use Sonnet to ensure cacheability.

## Measuring cache performance

Check `usage` in the API response:

```json
{
  "usage": {
    "cache_creation_input_tokens": 3000,
    "cache_read_input_tokens": 0,
    "input_tokens": 450,
    "output_tokens": 820
  }
}
```

- `cache_creation_input_tokens > 0, cache_read_input_tokens = 0` → cache was written (first call or cache expired)
- `cache_read_input_tokens > 0` → cache hit, you paid 0.1× for those tokens
- Both zero → prompt was below minimum length (not cached)
- `input_tokens` = tokens after the last cache breakpoint (the dynamic part, URL + instructions)

Log these fields in every Worker invocation. They're the primary cost visibility signal.

## Critical placement rule

The cache prefix must be **byte-for-byte identical** across calls. Any change to content before the breakpoint invalidates the cache.

```json
// WRONG — dynamic content before breakpoint
{
  "system": [
    { "type": "text", "text": "Static rules...", },
    { "type": "text", "text": "Today: 2026-05-28", "cache_control": {"type": "ephemeral"} }
  ]
}
// Date changes every day → cache never hits

// RIGHT — breakpoint after all static content
{
  "system": [
    { "type": "text", "text": "Static rules...", "cache_control": {"type": "ephemeral"} }
  ],
  "messages": [
    { "role": "user", "content": "Today: 2026-05-28\n\nCapture: https://..." }
  ]
}
```

For the Worker: AGENTS.md goes in the `system` block with `cache_control`. The URL, date, and any per-invocation context go in the `messages[0].content` block (uncached).

## Other constraints

- Max 4 explicit `cache_control` breakpoints per request. Automatic method uses one slot.
- Concurrent requests: cache entry only available after first response begins. For parallel calls, wait for the first response before sending subsequent ones.
- Cache is isolated per workspace (Anthropic API) or per organisation (Bedrock/Vertex).
- Pre-warming: send a request with `max_tokens: 0` to populate the cache before users arrive — useful if the Worker has a known "batch processing session" start.

## Application to this KB's Worker

**Recommended configuration:**

```json
{
  "model": "claude-sonnet-4-6",
  "system": [
    {
      "type": "text",
      "text": "<content of AGENTS.md fetched from GitHub>",
      "cache_control": { "type": "ephemeral", "ttl": "1h" }
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": "Received: 2026-05-28T14:23:00Z\nURL: https://example.com/post\n\nTriage and capture per AGENTS.md."
    }
  ]
}
```

**TTL choice:**
- Use `"1h"` if you typically send batches of URLs in a session — break-even at 2 hits, then savings compound.
- Use default `"5m"` if captures are always single, spaced hours apart — avoids the 2× write overhead.
- Log `cache_read_input_tokens` per invocation to measure actual hit rate and tune the TTL choice.

**AGENTS.md size discipline:** Keep AGENTS.md lean — every token added costs on every uncached call. The current ~3,000 tokens costs $0.009/call uncached, $0.0009/call cached. That gap grows proportionally with AGENTS.md size.

## Takeaways

- **The Worker should always set `cache_control` on the AGENTS.md system block.** One-line change, immediate cost reduction on any batch session. No downside.
- **5m TTL is the right default for the Worker.** Personal volume is low; 1h write overhead isn't justified until batch usage is confirmed. Switch to 1h when processing batches of URLs.
- **Log `cache_creation_input_tokens` and `cache_read_input_tokens` from day one.** Without these, you can't tell whether caching is working or whether AGENTS.md dropped below the minimum after a trim.
- **AGENTS.md growth has a direct cost.** The files-as-config pattern keeps things maintainable, but every section added to AGENTS.md increases the per-call cost on cache misses. "Keep lean" is both a quality and a cost discipline.

## Related

- `plans/cloud-capture-agent.md` — context loading architecture decision (CAG + caching)
- `topics/cost-management/index.md`
