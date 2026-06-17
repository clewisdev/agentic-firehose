---
title: "Fragments: June 16"
url: https://martinfowler.com/fragments/2026-06-16.html
authors: [Martin Fowler]
captured: 2026-06-17
source_type: blog
topics: [ai-productivity, engineering-judgment, system-design]
tags: [llm-workflow, context-management, domain-driven-design, technical-debt, team-dynamics]
signal_level: medium
status: raw
confidence: high
freshness_until: unknown
---

## Summary

Martin Fowler's June 16 fragment collection offers three distinct signals on LLM adoption in engineering:

**1. Chelsea Troy on Context & Conversational Registers**
Troy argues that LLM sessions require conscious register-switching: *Exploring* (understand before touching), *Brainstorming* (generate options for separate eval), *Deciding* (need recommendation + rationale), *Implementing* (execute a made decision). **Key insight**: mismatched registers waste context window and produce incoherent artifacts. When pivoting registers, start a fresh conversation. This reframes context-window management from a storage problem to a communication-discipline problem.

**2. Charity Majors on the Crevasse Between Enthusiasts & Skeptics**
Majors documents a real divide: enthusiasts see discontinuous capability leaps and existential threat in *not* adopting; skeptics see degraded reliability, lost institutional knowledge, and unmaintainable systems as the actual threat. Both are correct. She prescribes engineering discipline as the answer: **stop debating maximalist positions; instead treat AI adoption as an engineering problem**—ask "what would make code review sustainable at speed?" rather than "can we ship unreviewed code?" Authority comes from engagement and ownership of consequences, not ideology. This echoes observations that AI amplifies existing practices (good or bad).

**3. Simon Willison on Enterprise Pricing Inflections**
Willison identifies two inflection points: November (evidence LLMs help programming), April 2026 (revenue implications landing for frontier labs and hitting enterprise budgets). He links this to product-market fit in Claude Code / Codex—coding agents as the killer app.

**4. DDD Europe Context**
Fowler notes Eric Evans' keynote on LLM experimentation (video pending) and observes that Domain-Driven Design will likely *become more important* under LLM-accelerated development, not less. Implicit: shared domain language is a hedge against context collapse and knowledge evaporation.

## Verbatim Quotes

> "Programming was how I could express myself... when I wrote my first program, I discovered a medium which let me convert thought into action." — Dave Thomas (via Fowler)

> "Programming with LLMs is more fun than ever." — Kent Beck (cited by Fowler)

> "The main thrust of her talk was managing the context window of LLMs so that it was kept in a healthy state... one thing I hadn't thought about was her thoughts about the different registers of conversations with LLMs." — Fowler on Troy

> "The enthusiasts are not wrong... The skeptics are also not wrong." — Charity Majors

> "Engineering discipline is becoming more important... AI is an amplifier of our current practices." — Fowler summarizing Majors

> "Authority comes from engagement: The engineers who shape how AI gets used will be the ones with credibility: they understand the opportunity, the stakes, and the tradeoffs, and they own enough of the consequences to have standing." — Majors

> "I think April 2026 is a new inflection point where the revenue implications of this have started to land." — Simon Willison

## Takeaways

- **Context window is not just a token limit; it is a conversation-discipline problem.** Switching between exploration, brainstorming, deciding, and implementing requires separate sessions. Mixing registers wastes context and degrades output coherence.

- **The AI-adoption divide is not ideological; it is an engineering trade-off.** Enthusiasts and skeptics both describe real risks. The way forward is systems thinking: ask *how* to sustain high velocity + high reliability, not *whether* to adopt.

- **Institutional knowledge and domain cohesion become critical infrastructure.** As code ships faster, shared domain language (DDD) and clear ownership of consequences prevent systems from becoming unmaintainable black boxes.

- **Credibility in AI governance requires engagement and skin in the game.** Teams that shape AI adoption must understand both the opportunity and the cost; armchair maximalists have no standing.

- **Enterprise AI is now real revenue.** Pricing inflections and product-market fit in coding agents suggest the hype cycle is beginning to resolve into durable business models.

## Open Questions

- How do teams operationalize Troy's register framework in practice? Is a conversation-switching protocol something that scales beyond individual practitioners?
- What metrics would let Majors' "engineering problem" framing be tested? Code review time? On-call load? Knowledge retention?
- If DDD becomes more critical under AI acceleration, what training or architectural changes do orgs need to make now?
- Does the April 2026 inflection in enterprise spending correlate with measurable shifts in code quality, velocity, or team satisfaction?
