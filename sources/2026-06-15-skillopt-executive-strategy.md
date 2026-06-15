---
title: "SkillOpt: Executive Strategy for Self-Evolving Agent Skills"
url: https://arxiv.org/abs/2605.23904
authors: [Yifan Yang, Ziyang Gong, Weiquan Huang, Qihao Yang, Ziwei Zhou, Zisu Huang, Yan Li, Xuemei Gao, Qi Dai, Bei Liu, Kai Qiu, Yuqing Yang, Dongdong Chen, Xue Yang, Chong Luo]
captured: 2026-06-15
source_type: paper
topics: [agent-architecture, prompting, evals]
tags: [skill-optimization, text-space-optimization, agent-training, rollout-feedback, validation-driven]
signal_level: high
status: raw
confidence: high
freshness_until: 2027-Q2
---

## Summary

SkillOpt presents a systematic, controllable text-space optimizer for agent skills—treating skill prompts as external trainable state rather than hand-crafted or one-shot generated artifacts. The core contribution is framing skill optimization with the same rigor as weight-space deep learning optimization.

**Key mechanism**: A separate optimizer model processes scored rollouts and generates bounded add/delete/replace edits on a skill document. Edits are accepted only when they strictly improve held-out validation performance. The system uses a textual learning-rate budget, rejected-edit buffer, and epoch-wise slow/meta updates to ensure stable training while adding zero inference-time overhead at deployment.

**Empirical scope**: Evaluated across six benchmarks, seven target models (including GPT-5.5, Codex, Claude Code), and three execution harnesses (direct chat, Codex agentic loop, Claude Code). Reports:
- +23.5 points improvement (no-skill baseline) on GPT-5.5 direct chat
- +24.8 points inside Codex agentic loop
- +19.1 points inside Claude Code
- Wins or ties on all 52 (model, benchmark, harness) cells
- Outperforms baselines: human, one-shot LLM, Trace2Skill, TextGrad, GEPA, EvoSkill

**Transfer findings**: Optimized skill artifacts retain value across model scales, execution environments (Codex ↔ Claude Code), and to nearby math benchmarks without re-optimization.

## Verbatim quotes

> "Agent skills today are hand-crafted, generated one-shot, or evolved through loosely controlled self-revision, none of which behaves like a deep-learning optimizer for the skill, and none of which reliably improves over its starting point under feedback."

> "SkillOpt is, to our knowledge, the first systematic controllable text-space optimizer for agent skills: a separate optimizer model turns scored rollouts into bounded add/delete/replace edits on a single skill document, and an edit is accepted only when it strictly improves a held-out validation score."

> "A textual learning-rate budget, rejected-edit buffer, and epoch-wise slow/meta update make skill training stable while adding zero inference-time model calls at deployment."

## Takeaways

- **Principled skill training**: Treats agent prompts as learnable parameters with validation-driven acceptance—closes the gap between ad-hoc prompt engineering and reproducible optimization.
- **Bounded edit semantics**: Lexical operations (add/delete/replace) on skill text ensure interpretability and prevent drift; rejection buffer prevents overfitting to noisy rollout signals.
- **Cross-environment transfer**: Skills optimized in one harness or model scale transfer to others, suggesting the learned edits capture generalizable problem structure rather than overfitting to execution details.
- **Zero deployment cost**: Optimization happens offline; no additional model calls or latency at inference, making adoption practical.
- **Comprehensive empirical validation**: 52 cells across diverse models and harnesses provides strong evidence of robustness; baselines span human, LLM, and gradient-based methods.

## Open questions

- How sensitive is the method to the choice of validation set size and scoring function? Does performance degrade gracefully with noisier feedback?
- How do the learned edits differ in character (e.g., are certain edit types—delete vs. replace—more valuable for specific task classes)?
- What is the compute cost (optimizer model evaluations per epoch) relative to baseline methods, and how does it scale with skill length?
- Can the method be extended to multi-skill or hierarchical skill architectures, or is it inherently single-document?
- Do optimized skills exhibit interpretable changes (e.g., do they learn consistent reasoning patterns, or are edits task-specific and opaque)?
