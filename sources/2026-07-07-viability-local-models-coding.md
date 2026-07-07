---
title: "Viability of local models for coding"
url: https://martinfowler.com/articles/exploring-gen-ai/local-models-for-coding-factors.html
authors: [Birgitta Böckeler]
captured: 2026-07-07
source_type: blog
topics: [tool-use, agent-architecture, ai-productivity, cost-management]
tags: [local-llms, agentic-coding, tool-calling, gguf, quantization, onnx, reasoning-models, apple-silicon]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

# Viability of local models for coding

Birgitta Böckeler, Distinguished Engineer at Thoughtworks, reports on 4 weeks of hands-on experimentation with locally-run LLMs for agentic coding tasks. This is high-signal practitioner work: concrete hardware specs, quantization choices, named models, measured failure modes, and nuanced trade-offs.

## Hardware tested

- Apple M3 Max, 48GB RAM
- Apple M5 Pro, 64GB RAM
Models tested: 15–25GB range (with one 48GB Qwen3 Coder Next 80B MoE that crashed mid-conversation).

## Key findings

**Runnability:** RAM is the binding constraint. Model weights must fit into VRAM or performance collapses. On Apple Silicon, all RAM is GPU-accessible; on other architectures, separate VRAM limits apply. Comfortable working range on 48GB: 15–25GB models. 30GB models stretch resources, especially with 64K context windows.

**Response speed:** Significantly improved from a year ago. Both M3 Max and M5 Pro achieved "quite impressive" speeds for small models. Speed degrades with conversation length. Acceptable for some tasks, but quality of output is still the limiting factor, not latency.

**Tool calling (critical for agentic use):** Models often emit malformed structured calls (wrong parameter names, schema mismatches) but could frequently self-recover. Models not specifically trained for tool-calling had worse failure rates. This is the bottleneck for agentic workflows, not auto-complete.

**Quality:** Highly task-dependent; "very hit and miss." Smaller models significantly less viable for agentic use than auto-complete. Larger models (e.g. 80B MoE) produced better code but at resource cost.

**Reasoning models:** All tested models had reasoning (chain-of-thought) enabled by default. Böckeler observed smaller models entering "endless circles" of self-correction. **Key insight:** Disabling reasoning yielded same or *better* performance *and* faster response times—a concrete counterexample to the assumption that reasoning always helps.

## Architectural factors examined

- **Quantization format:** GGUF (llama.cpp standard, LM Studio, Ollama) vs. ONNX vs. MLX
- **Context window size:** Affects RAM pressure and KV cache demand
- **Tool schemas:** Complexity of schema design influences tool-calling success
- **Parameter count:** 30B–80B range; more parameters → better quality but higher memory demand
- **Memory bandwidth:** Both M3 Max and M5 Pro near-identical at ~300 GB/s; adequate for tested models
- **Processing cores & architecture:** Matters, but newer generations can bridge gaps with fewer cores

## Verbatim quotes

> "In spite of all other settings being the same, one model clearly delivered better outcomes on the stronger machine—not just speed, but better code!"

(Illustrates how many confounding variables make local LLM evals difficult.)

> "Reasoning is not always necessary, and can sometimes even be counterproductive."

(Directly challenges reasoning-as-universally-beneficial doctrine.)

> "Without it [tool calling], you can still go the old-fashioned way of copying and pasting from a chat window of course."

(Pragmatic framing: tool-calling is not binary for usability, but it is critical for true agentic workflows.)

## Takeaways

1. **Tool-calling remains the agentic bottleneck**, not inference speed. Models trained for tool-calling fail less; self-recovery is possible but unreliable.
2. **Reasoning is not a free lunch**—smaller models waste tokens in circular reasoning; disable by default and enable per-task.
3. **RAM is the hard constraint**, not CPU speed. 15–25GB models are practical on 48–64GB machines; 30GB+ requires significant headroom and application discipline.
4. **Quality gap persists**: local models are "very hit or miss" compared to large cloud models; viable for some tasks, clearly inadequate for others (not yet specified in this memo).
5. **Context window and schema design matter more than model size alone**—tool-calling success depends on schema fidelity and model training, not just parameter count.

## Open questions

- What tasks showed success vs. failure in the 4-week trial? (promised in follow-up memo)
- Did quantization format (GGUF vs. ONNX vs. MLX) materially affect tool-calling accuracy, or only speed?
- How does self-recovery from tool-calling failures affect end-to-end latency in an agentic loop?
- Can fine-tuning or prompt engineering improve tool-calling reliability on smaller models?
- At what model size does reasoning become net-positive vs. token-wasteful?
