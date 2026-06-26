---
title: "Software Engineering in the Age of AI"
url: https://paulcharan.substack.com/p/software-engineering-in-the-age-of
authors: [Paul Sampat]
captured: 2026-06-26
source_type: blog
topics: [prompting, memory, tool-use, agentic-workflows]
tags: [rag, fine-tuning, lora, agents, huggingface, consistency]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Paul Sampat explores the relationship between Retrieval-Augmented Generation (RAG) and fine-tuning as complementary rather than competing approaches in AI-driven software engineering. Drawing from first-principles thinking, he frames the core trade-off: RAG affects *what* the model sees (soft constraint via context injection), while fine-tuning affects *how* the model thinks (hard constraint via weight modification).

The post introduces Hugging Face as an ecosystem (model hub, dataset hub, open-source libraries, and hosting platform) that makes both approaches practical, and LoRA (Low-Rank Adaptation) as the enabling technique that made enterprise fine-tuning feasible by adding small adapter weights rather than retraining all parameters.

Sampat's key insight is that consistency requirements drive the choice: if you need the model to behave consistently, prompting via agents or RAG alone becomes expensive (token cost, evaluation overhead per version). Fine-tuning shifts the probability distribution once, reducing runtime cost and operational surface area. He proposes a simple mental model:

- **Base model** → General intelligence
- **LoRA** → Institutional behavior  
- **RAG** → Institutional knowledge
- **Agents** → Institutional processes

The underlying argument is that AI engineering remains subject to classical trade-off analysis: no one-size-fits-all solution exists. The best engineers apply domain-specific objectives and constraints to select the right combination.

## Key Quotes

> "RAG affects what the model sees, Fine tuning affects how the model thinks. Models are probabilistic models, so think of probabilities you are adjusting."

> "RAG is 'soft' - RAG says: 'Here's some context, please use it.' The model can still ignore some context, weight one document more heavily than another, use generic knowledge, hallucinate around the edges. Fine-Tuning is 'harder'. Fine-tuning changes the model's internal weights. It's like changing instincts."

> "The best software engineer will learn the concepts from first principles and apply their trade off management to hone their solutions to the product / problem they are solving."

## Takeaways

- RAG and fine-tuning are not mutually exclusive; they address different concerns and often work together
- LoRA made parameter-efficient fine-tuning economically viable for enterprise use cases
- Consistency requirements—not just up-to-dateness or auditability—can make fine-tuning preferable to runtime prompting strategies
- Agents provide a layer to enforce consistent prompting behavior, but still incur per-call token costs
- First-principles thinking and trade-off analysis remain foundational to software design in the AI era

## Open Questions

- How does the token cost / performance trade-off play out empirically across different domains (e.g., domain-specific terminology vs. generic reasoning)?
- What governance / observability patterns emerge when combining LoRA adapters with RAG pipelines?
- How does this framing extend to multi-agent systems with heterogeneous fine-tuning requirements?
