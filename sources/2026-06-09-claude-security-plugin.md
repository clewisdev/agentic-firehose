---
title: "Anthropic Releases Free Security Plugin for Claude Code Terminal to Detect Vulnerabilities"
url: https://cybersecuritynews.com/free-security-plugin-for-claude-code
authors: [Guru Baran]
captured: 2026-06-09
source_type: blog
topics: [tool-use, safety, code-generation]
tags: [claude, vulnerability-detection, static-analysis, code-review, agent-review]
signal_level: high
status: summarized
confidence: high
freshness_until: 2026-Q3
---

## Summary

Anthropopic released a free security-guidance plugin for Claude Code that autonomously detects vulnerabilities in real time across three distinct review checkpoints:

1. **Per-edit layer**: Fast deterministic pattern matching (zero model cost) that flags dangerous constructs like `eval()`, `os.system()`, `pickle.loads()`, `dangerouslySetInnerHTML`, DOM injection vectors, and similar patterns without invoking the model.

2. **End-of-turn layer**: A separate Claude Opus 4.7 instance reviews the full git diff after each conversational turn, catching logic-level vulnerabilities (authorization bypass, IDOR, SSRF, weak crypto) that string matching cannot detect.

3. **Commit/push layer**: A deeper agentic review reads surrounding callers, sanitizers, and related files when Claude commits or pushes via Bash, minimizing false positives.

Internal testing showed the plugin reduced security-related pull request comments by 30–40%. The plugin is available on all Claude Code plans, installed via `/plugin install security-guidance@claude-plugins-official`, and customizable via two repo-level files: `.claude/claude-security-guidance.md` (threat model rules in plain language) and `.claude/security-patterns.yaml` (custom regex patterns).

Organizations can enforce the plugin organization-wide through `.claude/settings.json` and managed settings. The plugin requires Claude Code CLI 2.1.144+ and Python 3.8+. A reference repository (`anthropics/claude-code-security-review`) demonstrates agents autonomously hunting and patching SQL injection, XSS, RCE, IDOR, and hardcoded credential issues.

Critically, the plugin does **not** block writes or commits—it surfaces findings as instructions for Claude to resolve within the same session. Positioned as one layer in defense-in-depth, not a complete security solution.

## Verbatim quotes

> "On every file edit, the plugin runs a fast, deterministic pattern match with no model call that flags dangerous constructs like eval() , new Function() , os.system() , child_process.exec() , pickle deserialization, and DOM injection vectors such as dangerouslySetInnerHTML and .innerHTML= . Because this layer requires no AI inference, it adds zero usage cost."

> "At the end of each conversational turn, a background Claude model, separate from the one writing the code, reviews the full git diff of all changes made during that session. This reviewer starts from a fresh context with no investment in the original approach, catching logic-level vulnerabilities that string matching cannot detect, including authorization bypass, insecure direct object references, server-side request forgery, and weak cryptography."

> "When Claude commits or pushes via its Bash tool, a deeper agentic review reads surrounding callers, sanitizers, and related files to minimize false positives."

> "The plugin is explicitly positioned as one layer of defense in depth, not a complete security solution, and does not block writes or commits — findings are surfaced as instructions for Claude to resolve within the same session."

## Takeaways

- **Multi-layer strategy works in practice**: Anthropic's three-tier approach (pattern matching → model review → agentic context) shows how to balance cost (first layer free), depth (second catches logic bugs), and precision (third uses wider context). This is a useful mental model for agent-assisted security.

- **Agent-as-reviewer pattern**: Using a fresh Claude instance to review code from a separate conversational context is an effective way to avoid confirmation bias in AI-assisted development. Measurable result: 30–40% reduction in security comments.

- **Customization path**: Allowing teams to layer custom threat models (`.claude/claude-security-guidance.md`) and regex patterns (`.claude/security-patterns.yaml`) on top of defaults signals a pragmatic approach—not all orgs have the same threat surface.

- **No blocker, only signals**: The plugin surfaces issues as instructions rather than hard blocks. This keeps the agent in control of remediation, which is important for workflows where security findings may require context the model doesn't yet have.

- **Open reference implementation**: `anthropics/claude-code-security-review` repo demonstrates agents hunting and patching specific vulnerability classes (SQL injection, XSS, RCE, IDOR, hardcoded creds), which practitioners can study and adapt.

## Open questions

- How does the plugin handle false positives in the pattern-matching layer? (e.g., `eval()` in a test harness or sandboxed context)
- What is the latency overhead of the end-of-turn and commit-review layers in real-world workflows?
- How are custom threat model rules in `.claude/claude-security-guidance.md` weighted relative to the base model's training?
- Does the separate reviewer instance have access to the same codebase context (e.g., imports, dependencies) as the writing instance?
- What metrics define success for this plugin beyond PR comment reduction?
