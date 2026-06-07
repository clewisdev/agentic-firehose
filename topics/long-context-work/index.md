# Long-context work

Patterns for sustained, multi-session knowledge work — durable threads (compacted/pinned), memory that survives thread death, and the economics of keeping threads alive vs. spawning siblings.

## Sources

- [Codex-maxxing](../../sources/2026-05-31-codex-maxxing.md) — pinned threads as durable workers reading from a shared vault; compaction tradeoffs; thread compaction cost scales with length; evergreen threads should write state, not accumulate "vibes" in conversation history.
