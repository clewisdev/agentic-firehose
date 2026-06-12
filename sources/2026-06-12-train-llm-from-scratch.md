---
title: "Train your own LLM from scratch"
url: https://www.linkedin.com/posts/ved-vekhande_train-your-own-llm-from-scratch-this-github-share-7471050898115514369-VduW/
authors: [Ved Vekhande]
captured: 2026-06-12
source_type: thread
topics: [transformer-architecture, training-fundamentals, implementation]
tags: [pytorch, attention, tokenization, sft, ppo, dpo]
signal_level: low
status: raw
confidence: medium
freshness_until: unknown
---

## Signal assessment

**Low signal.** This is an engagement-farming LinkedIn post promoting a GitHub repository. The post lists features without technical depth, relies on motivational framing ("builders who mean it"), and lacks any concrete implementation details, failure modes, or results. The comments are generic cheerleading ("great resource," "rite of passage") with no working practitioner account of actual experience using the repo.

## Summary

Ved Vekhande posted about a GitHub repository for building an LLM from scratch in PyTorch. The post claims to cover:
- Transformer model construction based on the 2017 paper
- Attention mechanisms and multi-head attention
- Training pipeline with tokenization, batching, loss tracking
- Post-training alignment: SFT, reward modeling, PPO, DPO, GRPO

The framing emphasizes "no HuggingFace wrappers, no LangChain magic" and "every line explained." The repo link is obscured behind LinkedIn's URL shortener.

Comments reinforce learning-by-building narrative but offer no evidence of actually running the code, encountering bugs, or achieving specific performance metrics. One comment mentions "bad data will break a custom transformer faster than a bad learning rate"—the only tangible observation—but provides no context.

## Takeaways

- **No concrete details**: Claims about what the repo covers are bulleted abstractions, not worked examples or code snippets
- **Motivational rather than evidential**: Framing targets ego ("real engineering," "builders who mean it") rather than demonstrating results
- **Unverifiable promise**: "Billion parameter model" is mentioned but no training time, hardware requirements, or validation loss are cited
- **Missing baseline**: No comparison to existing tutorials (Karpathy's nanoGPT, Hugging Face course, etc.) or explanation of what makes this repo distinct beyond the "no wrappers" stance
- **Comments are noise**: LinkedIn replies are encouragement, not field reports

## Open questions

- Does the repo actually run to a trained, usable model? On what hardware and timeline?
- How does the implementation differ materially from Karpathy's nanoGPT or other pedagogical transformers?
- What are actual wall-clock times for the full training pipeline?
- Are there known issues or failure modes documented?
