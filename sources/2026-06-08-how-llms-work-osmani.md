---
title: "How LLMs work (minus the heavy math)"
url: https://www.linkedin.com/feed/update/urn:li:activity:7469489973583605760/
authors: [Addy Osmani]
captured: 2026-06-08
source_type: post
topics: [agent-architecture, model-internals, memory]
tags: [tokenization, embeddings, attention-mechanism, ffn, moe, kv-cache, rotary-position-embeddings]
signal_level: medium
status: summarized
confidence: high
freshness_until: evergreen
---

## Summary

Addy Osmani breaks down transformer architecture for practitioners in five concrete steps, emphasizing how understanding core mechanics changes prompt design and agent engineering decisions. The post explicitly targets the gap between API-calling developers and those who understand *why* parameters work.

### Core breakdown:

**1. Tokenization & embeddings**: Text → integer tokens → fixed-dimension vectors where semantic meaning clusters geometrically.

**2. Position & order**: Rotary Position Embeddings (RoPE) inject word order. Residual streams preserve early information across deep layers (additive, not overwriting).

**3. Attention block**: Query-Key-Value mechanism where tokens communicate via dot-product scoring and softmax-weighted averaging of value vectors.

**4. FFN & MoE**: Feed-forward networks store factual knowledge per-token independently. Mixture of Experts routes tokens to subset of parallel FFNs (e.g., 2 of 8) for cost efficiency.

**5. Next-token prediction**: Unembedding matrix → logits → softmax. Temperature, top-k, and top-p sampling define apparent "personality."

Key implementation detail: KV cache preserves history to avoid recomputation in autoregressive loops.

## Verbatim quotes

> "Every token plays three roles simultaneously: Query (Q): 'What am I looking for?' Key (K): 'What I offer to tokens looking at me.' Value (V): 'The information to pass along when a match happens.'"

> "While attention handles communication, the Feed-Forward Network (FFN) processes each token independently — expanding its vector, applying a non-linearity, then compressing it back. This is where most stored factual knowledge lives."

> "These three knobs [temperature, top-k, top-p] largely define a model's apparent 'personality.'"

## Signal quality notes

**High practitioner signal**: Osmani is a credible voice (Chrome/web performance background, now at Google). The framing directly addresses the gap between "understanding APIs" and "understanding architecture for better prompt/agent design." 

Comment thread adds weight: Israel Timi surfaces why this matters—knowing *why* temperature works changes prompt strategy. Ryan Widgeon extends to agents (KV cache + tools + long-running state as "external nervous system"). Noah Hirshon identifies remaining gap: mechanistic interpretability for practitioners, not just researchers.

No code or benchmarks here, but framing is sound and references (3blue1brown, bbycroft interactive viz) are standard pedagogical consensus.

## Takeaways

- **Attention ≠ knowledge**: Attention is communication/working-memory layer. FFN/MoE is where stored facts live. Agent designers should expect different failure modes.
- **Position embeddings matter**: RoPE and residual streams are architectural choices that affect context retention and long-sequence behavior.
- **Sampling knobs have semantics**: Temperature/top-k/top-p aren't magic—they're post-softmax distribution shaping. Tuning them changes exploration vs. determinism predictably.
- **KV cache is central to inference loop**: Critical for cost/latency in agentic loops where same prompt is queried repeatedly.
- **MoE routing is a scaling trade-off**: Not all tokens use all experts. Affects which knowledge is accessible per token.

## Open questions

- How does KV cache interact with retrieval-augmented generation in agents? Does injected context behave the same as pre-trained knowledge in FFN layers?
- Why does mechanistic interpretability work (Anthropic's work on individual neuron function) still not translate to actionable insights for prompt engineers?
- What happens to attention patterns when you extend context length beyond training—does RoPE extrapolation degrade predictably?

