---
title: "GLM-5.2 - How to Run Locally | Unsloth Documentation"
url: https://unsloth.ai/docs/models/glm-5.2
authors: [Unsloth]
captured: 2026-06-27
source_type: docs
topics: [cost-management, agent-architecture]
tags: [glm-5.2, quantization, gguf, dynamic-quant, llama.cpp, unsloth-studio, reasoning-modes, moe]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Unsloth documentation for running Z.ai's GLM-5.2 (744B parameters, 40B active MoE) locally via quantized GGUFs. GLM-5.2 achieves SOTA performance on long-horizon coding, reasoning, and agentic tasks, matching Claude Opus / GPT-5.5 / Gemini 3.1 Pro on benchmarks. Unsloth provides Dynamic GGUF quantizations with detailed hardware requirements and quantization analysis.

**Key concrete specs:**
- **1-bit quant**: 223 GB RAM required, ~76.2% top-1 accuracy, 86% smaller than baseline
- **2-bit quant (UD-IQ2_M)**: 239 GB disk, ~82% accuracy, 84% smaller; fits on 256GB unified Mac or 1x24GB GPU + 256GB RAM with MoE offloading
- **4-bit / 5-bit**: mostly lossless (KLD > 99.9%)
- **8-bit**: 810 GB RAM required
- **1M context window**; three thinking modes (non-thinking, high reasoning, max reasoning)

**Deployment methods:**
- Unsloth Studio (open-source web UI, auto RAM offload, multi-GPU detection, tool calling, code execution, Python/Bash sandbox)
- llama.cpp with reasoning flags (`--reasoning on/off`)
- Chat template customization (enable/disable thinking, set reasoning effort)

**Quantization methodology:** Uses KL Divergence (KLD) to minimize distance between baseline logits and quantized model outputs. Mean KLD benchmarked on training corpus subsets. Top-1 accuracy measured via greedy decoding argmax alignment with baseline.

## Verbatim quotes

"GLM-5.2 is the strongest open model to date, performing on par with Claude 4.8 Opus, GPT-5.5, and Gemini 3.1 Pro across Artificial Analysis and many other benchmarks."

"Dynamic 1-bit reaches ~76.2% top-1 accuracy while being 86% smaller. Dynamic 2-bit reaches ~82% accuracy while being 84% smaller. This means the model is not 82% worse since it's 84% smaller - it rather is only ~18% less accurate than the full 1.5TB model."

"76% top-1% does NOT mean 'The capital of France is' becomes choosing 76% Paris and 24% Sydney... The 76% number includes filler words and stop words across the entire corpus."

"For best performance, make sure your total available memory, including VRAM and system RAM, exceeds the quantized model file size by a comfortable margin."

## Takeaways

- **MoE + quantization stack**: Dynamic quantization heavily weights important layers (MoE gates, routing) to higher precision; marginal layers stay 1–2 bit. Enables massive size reduction without proportional capability loss.
- **Practical accessibility threshold**: 2-bit variant (239 GB) is the "sweet spot" for consumer hardware (Mac unified memory, single high-end GPU + RAM); 1-bit usable only with aggressive RAM provisioning.
- **Thinking modes as a knob**: GLM-5.2's three reasoning effort levels (off, high, max) allow inference cost/latency vs. quality trade-off; no architectural change required.
- **Unsloth Studio commoditizes deployment**: eliminates llama.cpp CLI friction; auto offloading and multi-GPU detection remove manual memory tuning.
- **KLD as proxy for lossless threshold**: 99.9% KLD (4-bit+) indicates safe quantization; below ~99% (1–2 bit) introduces stochastic variation in token distribution but preserves semantic output quality.

## Open questions

- How does max-reasoning latency / token cost scale vs. high-reasoning on typical agentic tasks (tool calls, code generation, planning)?
- Are the reasoning modes accessible via Unsloth Studio UI, or only via chat templates / CLI flags?
- What is the empirical cost (memory overhead, latency) of MoE offloading on machines where total VRAM < quantized model size?
- How does GLM-5.2's agentic performance compare to open alternatives (Qwen, Llama) in code execution & tool use benchmarks?
