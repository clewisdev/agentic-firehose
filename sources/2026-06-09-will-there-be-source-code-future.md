---
title: "Will There Be Source Code in the Future?"
url: https://www.linkedin.com/posts/martin-fowler-com_will-there-be-source-code-in-the-future-share-7459959150186295296-FXjw/
authors: [Martin Fowler, Unmesh Joshi]
captured: 2026-06-09
source_type: post
topics: [code-generation, llm-integration, conceptual-models, cognitive-debt]
tags: [ai-code-gen, source-code, semantics, specifications]
signal_level: medium
status: raw
confidence: high
freshness_until: 2026-Q3
---

## Summary

Martin Fowler shared a LinkedIn post linking to Unmesh Joshi's essay on the future of source code in an LLM-enabled world. The core thesis: code serves two distinct but intertwined purposes—machine instructions *and* a conceptual model of the problem domain. As AI-assisted code generation becomes routine, the machine-instruction role diminishes in importance while the conceptual-modeling role becomes central.

The thread surfaced a sophisticated debate among practitioners about what source code will mean when LLMs can generate implementations efficiently:

**Core tension**: If LLMs handle implementation details, what remains as the primary artifact? The consensus from commenters—including Peter R., Juan José Fuchs, Felix Radzanowski, and Dhushyanth Reddy—is that the "source" will increasingly be:
- The specification/prompt history (intent, constraints, requirements)
- The vocabulary and conceptual model (domain language, decision rationale)
- The boundary conditions and policy (what the machine *cannot* do)

**Cognitive debt as keystone concept**: Juan José Fuchs invoked Naur's "Programming as Theory Building" (1985), framing the real engineering cost as holding the "why" in human minds, not writing instructions. With code generation scaling faster than architectural comprehension, cognitive debt becomes the limiting factor.

**Key shift in thinking**: Multiple commenters noted the evolution from "authors of instructions" to "orchestrators of intent." If code is primarily a conceptual model, then the act of writing it—the syntax—is the thinking process itself. Removing that work may remove the mechanism that builds understanding.

## Verbatim quotes

> "Code is still instructions for a machine. But it is also a model of understanding. In the LLM era, that second role becomes even more important." — Unmesh Joshi (quoted by Martin Fowler)

> "As AI improves, we shift from being authors of instructions to orchestrators of intent. The 'source' will likely reside in the prompt history and the constraints we set." — Peter R.

> "The mechanical instructions got cheap, the theory of why a system is the way it is didn't. What we need now is a way to compact the intentions and decisions, not just the instructions." — Juan José Fuchs

> "If code's primary value is no longer 'machine instructions' but 'conceptual models,' our medium must shift from imperative syntax to declarative constraints... The developer of the near future won't 'think' by writing classes; they will think by engineering Policy-as-Code." — Felix Radzanowski

> "Code is not only for machines. It is also one of the main ways we make a system's logic and intent visible to other humans." — Dhushyanth Reddy

## Takeaways

1. **Conceptual modeling becomes the scarce resource**: As LLMs handle code synthesis, the bottleneck shifts from writing instructions to articulating and communicating the domain model, constraints, and intent.

2. **Cognitive debt is the new technical debt**: The speed of code generation can outpace architectural comprehension. The cost of maintaining a shared mental model of "why" the system is structured a certain way exceeds the cost of writing the code itself.

3. **Source code's human-facing role intensifies**: Code as a communication medium to other humans (and to future selves) becomes more valuable than code as compiled instructions. Clarity of intent matters more than syntactic correctness.

4. **Specifications and policy-as-code may replace imperative code**: Declarative constraints, formal specs (TLA+), and domain-driven design vocabularies could become the primary artifacts, with implementations derived deterministically or probabilistically from them.

5. **The act of writing code *is* the thinking**: Removing the synthesis work risks removing the mechanism by which engineers build understanding. This aligns with research on external cognition and deliberate practice.

## Open questions

- How do teams maintain a shared conceptual model when the code itself is generated and ephemeral?
- Can formal specification languages (TLA+, Alloy) scale to replace prose + imperative code for most teams?
- What happens to code review, debugging, and post-mortem learning when the intermediate artifact (readable source) disappears?
- Does Naur's theory-building model still apply if the "theory holder" role is distributed across prompts, specs, and LLM context?
- How do we measure or track cognitive debt across teams and codebases?
