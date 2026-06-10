---
title: "Claude Fable 5 and Claude Mythos 5"
url: https://www.anthropic.com/news/claude-fable-5-mythos-5
authors: [Anthropic]
captured: 2026-06-10
source_type: blog
topics: [model-capabilities, tool-use, long-context, agentic-behavior, autonomous-agents]
tags: [claude, vision, software-engineering, scientific-research, protein-design, genomics, memory, safeguards]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q3
---

## Summary

Anthropopic announced Claude Fable 5 (general availability) and Claude Mythos 5 (restricted access for cyberdefenders via Project Glasswing) on June 9, 2026. Both are Mythos-class models with state-of-the-art capabilities across benchmarks. Fable 5 includes safeguards (triggering <5% of sessions) to restrict queries on sensitive topics; Mythos 5 removes these safeguards for authorized users.

Key capability claims: Fable 5 compressed months of Ruby codebase migration work (Stripe case) into days. Vision capabilities match or exceed prior models on complex tasks (code reconstruction from screenshots, Pokémon gameplay with vision-only input). Long-context performance (millions of tokens) with autonomous memory use shows 3× improvement in Slay the Spire over Opus 4.8. Mythos 5 demonstrates autonomous scientific work: protein design acceleration (~10×), novel molecular biology hypotheses preferred by scientists in 80% of blinded comparisons, and genomics research (single-cell ML model 100× smaller than published Science baseline, autonomous execution over one week).

Pricing: $10 per million input tokens / $50M output tokens (less than half Claude Mythos Preview rates).

## Verbatim quotes

> "Fable 5's capabilities exceed those of any model we've ever made generally available. It is state-of-the-art on nearly all tested benchmarks of AI capability, showing exceptional performance in software engineering, knowledge work, vision, scientific research, and many other areas. The longer and more complex the task, the larger Fable 5's lead over our other models."

> "During early testing, Stripe reported that Fable 5 compressed months of engineering into days. In a 50-million-line Ruby codebase, the model performed a codebase-wide migration in a day that would otherwise have taken a whole team over two months by hand."

> "In blinded head-to-head comparisons against Opus-class models, our scientists preferred Mythos's molecular biology hypotheses ~80% of the time, and have advanced several to experimental evaluation. In the meantime, one Mythos hypothesis—a novel mechanism for an E. coli protein—was corroborated in a study from a lab independently working on the same problem."

> "Mythos 5 conducted novel genomics research in over a week of largely autonomous work. It assembled single-cell data for millions of cells spanning 138 animal species and designed and trained a custom machine learning model to identify cells performing the same role in even distantly related organisms. With only high-level human input, Mythos 5's trained model outperformed a recent model published in the journal Science—despite being 100 times smaller."

> "When we had the model play the deck-building game Slay the Spire, giving it access to persistent file-based memory improved its performance three times more than for Opus 4.8; Fable also reached the game's final act three times more often."

## Takeaways

- **Agentic autonomy at scale**: Mythos 5 executes multi-week research workflows with minimal human direction (genomics, protein design), including failure recovery and tool composition—marks a shift toward genuine autonomous research agents, not just chat enhancement.

- **Long-context memory integration**: Persistent file-based memory yields 3× performance delta (Slay the Spire), suggesting models can now plan and refine across very long horizons. Practical integration point for agents to maintain working state.

- **Vision as first-class capability**: Code reconstruction from screenshots, Pokémon gameplay with raw game state (no scaffolding), scientific figure extraction—vision is now primary input modality for complex tasks, not secondary annotation.

- **Empirical scientific hypothesis generation**: 80% scientist preference in blinded evals + corroborated E. coli hypothesis suggests models now generate hypotheses worth experimental validation, crossing from analytical tool to research collaborator.

- **Safeguard deployment trade-off**: <5% false-positive rate on restricted queries is pragmatic but incomplete transparency—real filtering rules and appeal process not detailed. Mythos model explicitly separates capabilities from governance, enabling parallel deployment strategies.

## Open questions

- How are the safeguards tuned (classifier scores, topic blacklists, prompt injection recovery)? What categories fall into the <5% false-positive threshold?
- What explicit tool APIs or sandbox constraints does Mythos 5 use in Project Glasswing deployment? (Code execution? Network access? File I/O?)
- For the genomics work: how much human direction was "high-level input"? Did the model propose experiments, or execute pre-designed ones?
- How does the 3× Slay the Spire improvement from memory generalize to other domains—is it task-specific or broadly applicable?
- Are the novel molecular biology hypotheses validated beyond the one E. coli corroboration? Publication timeline for the genomics study?
