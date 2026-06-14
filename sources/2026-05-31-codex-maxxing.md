---
title: "Codex-maxxing"
url: https://jxnl.co/writing/2026/05/10/codex-maxxing/
authors: [Jason Liu]
captured: 2026-05-31
source_type: blog
topics: [agent-architecture, context-engineering, memory, agentic-workflows, tool-use]
tags: [codex, voice-input, durable-threads, steering, obsidian, memory-management, computer-use]
signal_level: high
status: summarized
confidence: high
freshness_until: 2026-Q3
---

## Summary

Jason Liu documents his evolved mental model for using Codex (and similar agentic tools) as an operating system for sustained knowledge work, not just code completion. The piece is grounded in months of actual practice and reflects a shift from "one prompt, one answer" to durable operating loops.

Core insight: agents become useful at knowledge-work scale when they have:
1. **Durable threads** (compacted, pinned, multithread) instead of fresh chats
2. **Voice input** to capture messy thinking without friction
3. **Steering** (mid-flight course correction) instead of turn-taking
4. **Shared memory on disk** (Obsidian vault, GitHub diffs) outside any single thread
5. **Computer/browser actions** scoped by context type ($browser, @chrome, @computer)
6. **Artifact inspection surfaces** (side panels, diffs) to review agent decisions

Liu treats his vault (people/, projects/, agent/, notes/) as the source of truth and threads as workers reading from the same notebook. Memory is explicitly file-backed so knowledge survives thread death or compaction. Diffs on vault updates become a review surface—he checks what the agent thought was important enough to remember.

## Verbatim Quotes

> "The unit of work stops being 'one prompt, one answer.' It becomes a small operating loop."

> "A lot of plans get better when the model has access to the messy version of what I think, not just the polished one."

> "Repositories hold code. The vault holds rolling context around my work: people, decisions, open loops, daily notes, project state, and the bits of understanding that would otherwise get lost between threads."

> "Files force the agent to compress experience into a form that can survive the thread."

> "At that point, pinned threads start to feel less like chats and more like different workers reading from the same notebook."

> "I do not want evergreen threads to quietly accumulate vibes in conversation history. I want them to write down what changed: this person prefers this, this project is waiting on that, this decision was made, this loop is closed."

## Takeaways

- **Compaction + pinning** is the inverse of stateless chat interfaces; long-running threads require cost/cache tradeoffs but enable continuity that justifies the expense for critical workstreams.
- **Voice input captures unedited context** that typed prompts filter out; pairing it with **steering** (mid-action course correction) flips the interaction model from sequential to compositional.
- **Disk-backed shared memory** (files in a vault, diffs in git) is non-negotiable for work that spans threads; explicit memory files survive thread death better than conversation history or ephemeral memory features.
- **Scoped tool access** ($browser, @chrome, @computer) prevents mode confusion and lets agents act on context-specific surfaces without a single monolithic "computer use" action.
- **Diff review as a feedback loop** (inspect what the agent wrote to memory, accept/reject) is as important as the memory itself—it keeps threads accountable and readable.

## Open Questions

- How does compaction cost scale with thread length? At what token/time threshold does it become uneconomical to maintain a single pinned thread vs. spawning related siblings?
- How does the vault pattern handle concurrent edits from multiple pinned threads? Is conflict resolution manual or does Liu maintain a convention (e.g., append-only logs per workstream)?
- Does Chronicle (Codex's research preview for local memory) obsolete the Obsidian-vault pattern, or do they serve different layers (recall vs. audit trail)?
- What's the failure mode when an agent's memory diverges from reality across a long thread? How often does Liu need to reset or manually correct vault state?
- Can the steering pattern (voice + mid-action injection) be systematized, or does it depend on real-time attention from the user?
