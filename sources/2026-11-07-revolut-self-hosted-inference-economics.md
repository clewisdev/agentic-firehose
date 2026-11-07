---
title: "Beyond the Revolut Headline: The Reality of Self-Hosted LLM Inference Economics"
url: https://www.linkedin.com/posts/luca-forni_ok-by-now-the-revolut-story-has-officially-share-7523663973486018560-IZ-k/
authors: [Luca Forni]
captured: 2026-11-07
source_type: post
topics: [cost-management, enterprise-deployment, system-design]
tags: [vllm, self-hosting, gpu-utilization, latency, ttft, b200]
signal_level: medium
status: raw
confidence: high
freshness_until: 2027-Q4
---

## Summary

Luca Forni breaks down the viral industry narrative surrounding Revolut replacing Claude Code with a self-hosted open-source model to reduce their AI coding spend by 90%. While popular coverage focused on model replacement as the source of savings, Forni highlights the engineering details revealed in Revolut's presentation: out-of-the-box self-hosted inference yielded an unusable 14-second time-to-first-token (TTFT). Achieving parity required months of low-level systems tuning to reach a 1.7-second TTFT and a 76% throughput increase on 56 NVIDIA B200 GPUs without altering hardware.

Forni argues that headline ROI numbers omit critical operational overhead, including engineering salaries, cluster maintenance, monitoring, and idle compute depreciation. Revolut represents an outlier workload: 2,000 developers generating continuous GPU demand. In contrast, standard enterprise Kubernetes clusters exhibit average GPU utilization rates of only 5% to 7% (corroborating findings from telemetry reports like Cast AI). At low utilization, private GPU pools become significantly more expensive per token than rented commercial APIs.

To illustrate the impact of parameter-level optimization, Forni shares benchmark results from an enterprise software deployment serving recorded production traffic against midrange GPUs under a strict SLA (p50 latency under 3 seconds). Baseline inference engine configurations supported 4,500 concurrent users against a requirement of 6,000. Through automated multi-parameter tuning of the inference engine (such as vLLM batching caps and KV-cache settings), concurrency was pushed to 7,100 users on the identical hardware footprint (+57% throughput, allowing the workload to run on 26 GPUs instead of an estimated 40) while maintaining baseline response quality.

Finally, Forni emphasizes that inference optimization is not a static milestone. Engine updates (e.g., minor vLLM releases), model weight swaps, and changes in application prompt lengths shift runtime characteristics, necessitating regression gates and ongoing configuration tuning as part of CI/CD.

## Key Quotes

> "...what nobody reshared is in the same talk, and it’s meaningful: out of the box, their self hosted inference was (in their own words) 'terrible' → about 14 seconds to the first token (!!!). AFTER MONTHS OF TUNING, they landed at 1.7 seconds with 76% more requests per second, on the same 56 B200s, not one extra GPU..."

> "So the 90% didn’t come from picking a cheaper model, it came from the boring engineering work that never makes the headline (and by the way, the 90% doesn’t even count people, cloud and monitoring)."

> "What we’re measuring in our customers’ Kubernetes clusters is an average GPU utilization of 5 to 7% (confirmed by several reports, Cast AI’s for example), so bringing the model home doesn’t save a cent if the GPUs then sit there idle (very, very, VERY expensively)..."

> "They decided this won’t be a one-shot project, so every new model, every new vLLM release, every new app version from a business unit goes through the same loop before it reaches users, because the config that was perfect in October is already wrong a few weeks later..."

## Takeaways

- **Default inference configurations perform poorly**: Out-of-the-box serving engines frequently exhibit unviable latency (14s TTFT in Revolut's baseline) until parameters like KV-cache memory allocation, tensor parallelism, and batching limits are tuned.
- **Utilization governs self-hosting economics**: Self-hosting only yields cost advantages under sustained, high-utilization workloads (e.g., thousands of continuous developer sessions). For organizations running at typical 5–7% utilization, idle GPU depreciation quickly eclipses token API costs.
- **Inference parameter tuning yields hardware reductions**: In the shared benchmark, systematic tuning of engine parameters expanded concurrency by 57% within a fixed latency budget (<3s p50), effectively saving 14 GPUs (reducing requirement from 40 to 26).
- **Configuration drift is a recurring tax**: Engine performance profiles drift across upstream framework releases (vLLM, TensorRT-LLM) and prompt structure updates; tuning must be managed as an ongoing pipeline test rather than a one-time deployment step.

## Open Questions

- What specific inference engine parameters accounted for the largest percentage of latency and throughput improvements in the 4,500 to 7,100 user benchmark (e.g., speculative decoding, KV-cache quantization, or dynamic request batching)?
- How did Revolut evaluate coding agent output quality between Claude Code and the self-hosted open model across real-world repository-level tasks?
