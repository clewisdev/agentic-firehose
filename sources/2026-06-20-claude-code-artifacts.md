---
title: "Claude Code now supports artifacts"
url: https://claude.com/blog/artifacts-in-claude-code
authors: [Anthropic]
captured: 2026-06-20
source_type: blog
topics: [agentic-workflows, agent-architecture, tool-use]
tags: [claude-code, artifacts, collaboration, incident-investigation, visualization]
signal_level: medium
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Anthropic announced that Claude Code now supports **artifacts**—live, shareable web pages that capture and visualize work progress during agentic sessions. Artifacts update in real-time as Claude Code works and can be shared with team members via a single link.

Key capabilities:
- **Full session context integration**: Artifacts synthesize code, connected data sources (monitoring tools, logs), and reasoning from the active session
- **Live refresh**: Pages update in place when Claude republishes; teammates see changes immediately
- **Version history & gallery**: Browse, restore, and manage artifacts from a centralized view
- **Organization-scoped privacy**: Private by default; shareable to authenticated org members only; admin controls for access, retention, and compliance API visibility

The feature is available in beta to Claude Team and Enterprise orgs via Claude Code CLI and desktop app; artifacts are viewable in any browser.

## Concrete use cases from announcement

**Incident investigation** (internal testing standout):
> "An engineer kicks off an incident investigation before standup. Claude Code works through the logs and publishes an artifact: a timeline, the suspect commits, and an error-rate chart. She shares the link with her team from the page header. By the time standup begins, Claude has republished it twice as the investigation progressed, incorporating the latest information."

**Role-based examples provided**:
- Legal/compliance: License audit of dependencies, flagging copyleft licenses
- Privacy: Data-flow mapping of personal data collection and storage
- Security: Auth findings linked to exact code lines
- FinOps: Cloud resource cost mapping from Terraform
- Software engineers: PR walkthroughs with diff, reasoning, test notes
- SRE/on-call: Incident pages that grow into postmortems with timeline and monitoring data
- Architects: Service dependency graphs from actual import analysis, not whiteboards

## Takeaways

- **Artifact-as-collaboration-primitive**: Shifts from "walk us through what the agent found" to "we're all looking at the same living artifact." Reduces status-update overhead in synchronous contexts (standups, handoffs).
- **Built-in multi-source synthesis**: Key strength is that Claude Code pulls from codebase, connectors (monitoring, alerting, IaC), and session reasoning into one page—no manual wiring or external dashboard.
- **Incentivizes session longevity**: Pages republish at the same URL and track versions, making sessions valuable as *persistent, updateable records* rather than one-off chat logs.
- **Org-first, privacy-conscious**: Private by default, no public sharing, audit trails via compliance API—designed for enterprise teams, not social sharing.
- **Still early**: Beta-only, narrow to Claude ecosystem (Code CLI/desktop), no mention of local artifact storage or extensibility to other agent frameworks.

## Open questions

- How does Claude Code decide *which* artifact to publish (e.g., if an engineer asks for both a timeline and a dashboard in one session)? Does it require explicit prompting or infer intent?
- What is the actual latency of artifact republish? "Moment they're published" is vague—live-refresh HTTP polling, WebSocket, or batch?
- Can artifacts be templated or parameterized? The examples suggest static snapshots of a session state, not interactive filtering/UI composition.
- How do admins manage retention policies and garbage collection at scale for high-volume agentic sessions?
