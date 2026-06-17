---
title: "Information-flow control: Moving toward secure, autonomous agents"
url: https://commandline.microsoft.com/information-flow-control-moving-toward-secure-autonomous-agents/
authors: [Santiago Zanella-Béguelin, Shruti Tople, Mark Russinovich, Aashish Kolluri, Boris Köpf, Manuel Costa]
captured: 2026-06-17
source_type: blog
topics: [safety, agent-architecture, tool-use]
tags: [information-flow-control, prompt-injection, data-exfiltration, github-copilot, mcp, deterministic-security]
signal_level: high
status: raw
confidence: high
freshness_until: 2027-Q2
---

## Summary

Microsoft researchers present information-flow control (IFC) as a deterministic security framework for autonomous agents. The core insight: probabilistic mitigations (alignment, content safety classifiers) cannot prevent attacks because "anything an agent can do in response to a user prompt can also be accomplished by a model's mistake or by an attacker with prompt injection."

IFC works in three steps:

1. **Label data**: Every input carries integrity labels (trusted/untrusted) and confidentiality labels (public, confidential, access-control lists).
2. **Propagate labels**: As data flows through agent logic, labels travel with derived results using the least upper bound rule (untrusted input → untrusted output; multi-source data restricted to common readers).
3. **Check before acting**: A policy engine inspects labels before each tool call—allowing, blocking, or escalating to human review.

This converts a probabilistic system into one with auditable guarantees. The policy engine is independent of model judgment and operates on labels attackers cannot manipulate.

## Key Concrete Examples

**Coding assistant / prompt injection scenario**: A malicious user opens an issue in a public repo requesting data from a private repo. When an agent with access to the private repo handles it, IFC labels the issue "untrusted" and private content "private." Policy blocks posting untrusted+private data to public channels, preventing exfiltration autonomously. Public-only or private-only tasks complete without escalation.

**Business assistant / unintended leakage**: An agent handling emails must summarize unanswered messages. One email from Priya contains confidential sales data; another from Marco (not authorized for that data) asks a question. IFC labels the response with intersection of access lists: {Alex, Priya} ∩ {Alex, Marco} = {Alex}, preventing autonomous send to Marco. If Marco had been copied on Priya's email, the response would be {Alex, Marco} and could send autonomously.

## Integration Approach

The framework integrates with GitHub Copilot CLI, Microsoft Agent Framework, and Model Context Protocol (MCP). MCP servers expose metadata fields for label declarations and policy specifications. Tools propagate labels from arguments to results; orchestrators propagate from results to subsequent calls. Both local tools (shell, filesystem) and remote MCP tools apply the same logic.

Policies are declarative: "untrusted data never influences consequential action" closes prompt injection; "data egress matches confidentiality label" closes exfiltration. Human review is invoked only when an action genuinely risks information disclosure to an unauthorized party, not as a default safeguard.

## Takeaways

- **Determinism over probability**: IFC provides auditable security guarantees independent of model behavior, making it suitable for high-stakes agent autonomy.
- **Label propagation as first-class concern**: Treating data provenance and access control as metadata that travels with computation is essential for preventing both intentional attacks and model errors.
- **Reduced human-in-the-loop friction**: By making policy decisions deterministic and narrow (only escalate genuine disclosure risks), IFC preserves agent autonomy while maintaining oversight.
- **MCP-native design**: Integration through MCP metadata avoids requiring model changes; security logic lives in orchestration layer.
- **Intersection-based multi-source confidentiality**: Conservative labeling (least upper bound) ensures derived data respects the most restrictive source constraints.

## Open Questions

- How are label schemas negotiated between heterogeneous MCP servers and orchestrators in practice? (The post mentions metadata fields but doesn't detail discovery/agreement.)
- What is the computational overhead of label propagation and policy checking at scale (e.g., agents making hundreds of tool calls with complex access matrices)?
- How does IFC handle implicit information flows (e.g., timing side-channels, statistical inference from query patterns)?
- Are there standard policy libraries, or does each organization define policies from scratch?
- Does MCP mandate support for IFC labeling, or is it optional/backwards-compatible?
