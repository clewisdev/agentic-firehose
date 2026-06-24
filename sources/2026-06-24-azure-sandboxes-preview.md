---
title: "Azure Sandboxes Preview - Secure Code Execution for Agentic AI"
url: https://www.linkedin.com/posts/jankalis_azure-sandboxes-preview-we-did-it-agentic-share-7475251887014060032-earz/
authors: [Jan Kalis]
captured: 2026-06-24
source_type: post
topics: [agent-architecture, safety, enterprise-deployment]
tags: [azure, sandbox, code-execution, isolation, github-copilot, azure-foundry]
signal_level: medium
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Jan Kalis announces the public preview of Azure Container Apps Sandboxes, a new capability for safely executing untrusted AI-generated code in isolated hardware-backed microVMs. The post articulates a core architectural principle: agentic AI systems require secure execution boundaries separate from the main application.

Key capabilities described:
- Hardware-isolated microVMs spun up on demand
- Persistent state via snapshots
- Scales to hundreds of concurrent instances
- Underlying infrastructure used by GitHub Copilot Sandboxes and Azure Foundry Hosted Agents
- Agents can safely run code, swarm sub-agents, access tools, and collaborate without exposing secrets or host environment

This represents a platform-level shift: "platforms are no longer just hosting agents. They're giving agents elastic, secure compute they can invoke as a tool."

The work was announced at Microsoft Build 2026 in a session with Vini Soto, and involved a large cross-functional team (Jenny Lawrance, Vyom Nagrani, Devanshi Joshi, and others).

## Verbatim Quotes

> "Agentic AI changes the rules: your AI generated code can't run next to your application. It has to be isolated in safe dedicated space."

> "This is the shift: platforms are no longer just hosting agents. They're giving agents elastic, secure compute they can invoke as a tool."

## Takeaways

- **Isolation as architectural requirement**: Not an optional hardening layer but a foundational design constraint for systems executing untrusted agent-generated code
- **Platform-level tooling**: Secure execution is becoming a managed service primitive, not an engineering problem each org solves independently
- **Stateful execution**: Sandbox snapshots enable agents to persist and resume state, suggesting multi-turn execution patterns
- **Ecosystem convergence**: Same infrastructure across GitHub Copilot, Azure Foundry, and Container Apps indicates emerging standards for agentic sandbox design

## Open Questions

- How do agents determine which operations require sandboxed execution vs. in-process execution? Is this automatic or explicit in the prompt/spec?
- What is the latency overhead for spawning and snapshotting a microVM? Does this create practical constraints on agent loop frequency?
- How does state persistence via snapshots interact with multi-agent swarms—can sub-agents share snapshot state or are they isolated?
- What deployment model does this assume (cloud-only vs. on-premises)?