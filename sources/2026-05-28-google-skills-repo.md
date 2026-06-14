---
title: "google/skills: Official Google Agent Skills Repository"
url: https://github.com/google/skills
authors: [Google]
captured: 2026-05-28
source_type: repo
topics: [harnesses, tool-use]
tags: [google, agent-skills, gemini, cloud-services, skill-registry, gcp]
signal_level: high
status: summarized
confidence: medium
freshness_until: 2026-Q4
---

# Google Agent Skills Repository

Official Google repository of agent skills for Google Cloud products and services. Announced by Addy Osmani on LinkedIn, 2026-05-27. Install via `npx skills add google/skills`. Under active development.

## Summary

The repository addresses context bloat in AI agents that need to work with Google Cloud: rather than feeding massive API documentation into context, skills provide compact, agent-first Markdown files that the agent loads only when needed.

**Skill categories:**

- **Agent Platform APIs** — Gemini API, Managed Agents API, Skill Registry API
- **Cloud Services** — AlloyDB, BigQuery, Cloud Run, Cloud SQL, Firebase, GKE
- **Recipes** — Authentication patterns, onboarding, network observability
- **Well-Architected Framework** — Six pillars: security, reliability, cost optimization, operational excellence, performance, sustainability

**Install:** `npx skills add google/skills`

The repository is explicitly open to community contributions — submitted via PR.

## Context

Addy Osmani framed this as the solution to a specific problem: "dumping massive doc sites into an agent's context window leads to context bloat, model confusion, and high token costs." The skills pattern loads only the relevant reference slice.

This is noteworthy as a vendor-side adoption of the skills pattern — previously skills were practitioner-created (Pocock, Regnology, etc.). Google publishing an official skills repo validates the pattern and creates a precedent for other vendors to follow.

## Takeaways

- **Vendor-published skills repos are the new API docs.** If this pattern scales, the expectation will be that any platform publishes a skills library alongside its API documentation. The agent-first documentation format is distinct from human-first docs.
- **The Skill Registry API** (listed as one of the skills) suggests Google is building a formal discovery mechanism — you won't just `npx install` skills manually; they'll be registerable and discoverable by agents at runtime.
- **Gemini-first but not Gemini-only.** The skill format (`npx skills add`) is the same cross-platform mechanism used by Matt Pocock's and other community skills. Google chose interoperability over lock-in.
- **Coverage is currently Google Cloud–centric**, which limits immediate utility for non-GCP workflows. But the pattern is directly applicable: any team with a complex internal API surface should be building skills for it.

## Open questions

- How mature is the Skill Registry API as a discovery mechanism? If agents can self-register and discover skills at runtime, that's a meaningfully different architecture than manually installed skill sets.
- Documentation quality is noted as moderate and under development. Is there a stable version tag, or is this a moving target?

## Related

- `sources/2026-05-20-pocock-skills.md` — the practitioner skills pattern this vendor move validates
- `topics/harnesses/index.md`
- `topics/tool-use/index.md`
