---
title: "Using Local Coding Agents: Open-Weight Models in Local Coding Harnesses"
url: https://magazine.sebastianraschka.com/p/using-local-coding-agents
authors: [Sebastian Raschka]
captured: 2026-07-01
source_type: blog
topics: [harnesses, tool-use, cost-management, engineering-judgment]
tags: [qwen, local-inference, ollama, vllm, coding-agents, open-weight-models]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Sebastian Raschka publishes a detailed, hands-on tutorial for setting up a production-ready local coding agent stack using open-weight LLMs and local inference servers, comparing it to proprietary alternatives like Claude Code and Codex.

Raschka motivates local setups via three concrete axes: **predictable costs** (hardware + electricity only; immunity to API price changes and subscription plan limits), **reproducibility** (fixed model version vs. upstream upgrades breaking workflows), and **offline capability** (privacy for sensitive work like receipt processing; air-gapped environments). He explicitly notes Anthropic's recent throttling of flagship model performance for LLM research as a reason to maintain local alternatives as a backup.

**Architecture choice**: Raschka primarily uses **Qwen3.6 35B-A3B** with the **Qwen-Code harness** because:
1. Both are open-source (unlike Claude Code)
2. Qwen models are optimized for Qwen-Code (citing Nvidia's Polar: Agentic RL benchmark showing Qwen3.5-4B's best performance in Qwen-Code)
3. Can run Codex (GPT backend) and Qwen-Code side-by-side without switching

Hardware requirements: Qwen3.6 35B-A3B is ~22 GB to download, needs 30–40 GB RAM; runs "pretty swiftly" on Mac Mini M4 and DGX Spark. Raschka cross-references Cohere's June 2026 North Mini Code benchmark, showing Qwen3.6 dominates in its size class.

**Inference server options surveyed**: Ollama, LM Studio, vLLM, SGLang, MLX. Raschka mentions his preference for understanding the full stack (via his Build A Large Language Model From Scratch projects) but acknowledges these off-the-shelf options.

**Other harnesses mentioned**: Claude Code, Codex, Cline (increasingly popular), OpenCode, Pi, Noumena Code. Raschka notes that while many open-weight models support multiple harnesses, model developers typically optimize first for their own harness.

## Key Quotes

> "The local setup is transparent, inspectable, and free to run apart from hardware and electricity costs. It also stays fully under your control, and you can modify the coding harness in any way you like."

> "If you have the hardware, they [local solutions] are practically free to run. And then there's, of course, the privacy angle. For example, for organizing and processing my receipts, I'd be more comfortable with a local model ingesting them rather than sending the data over to OpenAI or Anthropic."

> "Proprietary services may become more restrictive over time, and it's maybe a good idea to be comfortable with open-weight alternatives as a backup."

## Takeaways

- **Harness-model alignment matters**: Models optimized for specific harnesses (e.g., Qwen for Qwen-Code) show measurable performance advantages; benchmark evidence cited from Nvidia's Polar paper.
- **Cost + control tradeoff is now economically viable**: With 22–40 GB models running smoothly on consumer hardware (Mac Mini M4), local stacks eliminate subscription friction and API rate/price volatility.
- **Privacy and reproducibility are underrated motivators**: Sensitive workflows (receipt OCR, code review on proprietary codebases) and version-locked models justify local infrastructure even for users who primarily use proprietary APIs.
- **Open-source harness availability is crucial**: Qwen-Code's open-source status and broad model support (not locked to Qwen) enables composability; contrasts with closed Claude Code.
- **The ecosystem is actively maturing**: Cohere's North Mini Code and Nvidia's Polar training papers (both June 2026) show sustained investment in production-quality alternatives; Pi harness emerging as a parallel candidate.

## Open Questions

- How does real-world iteration speed (user perception) compare between local and cloud-hosted harnesses? Raschka cites "swiftly" but no latency or token/sec benchmarks are provided.
- Does the open-source Qwen-Code harness support all features of Claude Code (e.g., multi-turn context, diff-based edits, artifact rendering)? Feature parity not detailed.
- How do monitoring, observability, and failure recovery differ in a local stack vs. Claude Code / Codex? No DevOps perspective included.
- What is the maintenance burden for keeping local models up-to-date as new versions of Qwen, North Mini Code, etc. arrive? E.g., how much breakage on workflows?
