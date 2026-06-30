---
title: "Loop Engineering: Just Software Engineering with AI Agents"
url: https://www.linkedin.com/posts/walid-abou-ali-45680a43_loop-engineering-here-we-go-again-boris-share-7475429580133011456-KS1F/
authors: [Walid Abou Ali]
captured: 2026-06-30
source_type: post
topics: [agent-architecture, agentic-workflows, cost-management, engineering-judgment]
tags: [orchestration, sub-agents, token-efficiency, hallucination, prompt-management]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Walid Abou Ali pushes back against the hype around "Loop Engineering" (positioned by Anthropic's Boris Cherny as the next leap after agents). His core claim: it's not a new paradigm—it's just software engineering applied competently with AI agents, and the term obscures both the real tradeoffs and the actual practice.

He describes a concrete use case built *before* encountering the term: an orchestrator agent managing two sub-agents (search + rating) to find 10 high-quality research results, store them in SQLite, and deliver a WhatsApp summary. The loop ran on full auto for ~1 hour.

**The reckoning**: the system burned through tokens heavily, failed to guarantee perfect results (returned 6 matches instead of 10), and exposed a hallucination failure mode. When asked why it stopped early, the orchestrator first restarted the sub-agents, then admitted "I hallucinated and thought we hit 10," and further confessed it had skipped the SQL COUNT instruction in its prompt—instead guessing the count.

Ali's framing is deliberately undercutting: agents "do stupid things in the middle. They hit a small error, restart the whole thing, and reprocess results already saved in the DB." The practical lesson: use loops when you genuinely need them, not as a default. He also notes that most of the time he saves tokens by "jumping in for a few minutes."

Secondary observation: he writes long prompts to a `task.txt` file and points agents at it—a pragmatic workaround to terminal UX friction. He sarcastically wonders if this will become a branded methodology the next time an "AI celebrity" publishes it.

## Key Quotes

> "There is nothing new in it. Let me tell you what I built last week, before I ever heard the term."

> "Loop Engineering on full auto mode is the fastest way to burn through your tokens."

> "Agents do stupid things in the middle. They hit a small error, restart the whole thing, and reprocess results already saved in the DB."

> "I asked why. It said: 'My bad, I skipped your guides in the prompt.'"

> "This is just software engineering. Using the tools you have to get the job done. And no, it is not the future of anything. Use it only when you actually need it."

## Takeaways

- **Cost & token efficiency matter**: Full-auto agentic loops are easy to justify in hype but expensive in practice; hybrid manual intervention saves tokens in most real workflows.
- **Failure modes are concrete**: Agents restart on partial errors, lose track of DB state, hallucinate counts, and skip instructions in prompts when not carefully prompted—not hypothetical risks.
- **Terminology inflation obscures practice**: "Loop Engineering" packages standard orchestration patterns under a new label; practitioners were already doing this without the branding.
- **Prompt management is a UX problem**: Writing long, detailed agent prompts in-terminal is friction; file-based task definitions are a pragmatic workaround, not a novel technique.
- **Orchestration still requires human judgment**: The research task was "the only time I have ever hit my session limits," suggesting loops are a niche tool, not a universal pattern.

## Open Questions

- How would structured output formats (e.g., JSON schemas) or retry limits have changed the hallucination behavior in the rating agent?
- At what task complexity / duration do token savings from manual intervention exceed the overhead of human context-switching?
- What instrumentation or observability would have caught the "skipped prompt instruction" failure before hallucination occurred?
- How does this scale to multi-agent orchestration where sub-agents don't have direct DB access for state verification?
