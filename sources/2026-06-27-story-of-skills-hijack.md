---
title: "The Story of Skills: How We Hijacked 26,000 Agents With One Instagram Ad"
url: https://www.air.security/blog-posts/the-story-of-skills
authors: [Niv Hoffman, Or Nevo]
captured: 2026-06-27
source_type: blog
topics: [safety, tool-use, agent-architecture, prompt-injection]
tags: [skill-marketplace, supply-chain-attack, domain-spoofing, scanner-evasion, external-resource-injection]
signal_level: high
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

AIR Security researchers (Niv Hoffman, Or Nevo) published a detailed post-mortem of a coordinated attack on agent skill marketplaces. They built a malicious skill (`brand-landingpage`) designed to look legitimate and managed to compromise 26,000 agents—including corporate accounts—through a combination of credibility spoofing and security scanner evasion.

The attack flow:

1. **Credibility via star count**: Contributed the skill to a ~36K-star GitHub marketplace ("agents" repo) to inherit trust signals displayed in skill marketplaces.
2. **Scanner evasion via external resources**: Current security scanners analyze only bundled skill files (SKILL.md + resources), not external URLs the skill directs agents to fetch. The skill's documentation reference pointed to `stitch-design.ai` (attacker-controlled domain, typosquatting `stitch.withgoogle.com`).
3. **Payload delivery**: The external documentation instructed the agent to download and execute an npm package installation script. The benign payload only collected email addresses; a real attack could achieve full agent compromise.
4. **Distribution**: Published via Instagram ad targeting non-technical users (marketers, salespeople, designers) who wanted to build landing pages.

**Key findings:**
- All existing security scanners cleared the skill as safe
- GitHub stars and marketplace presence lent undeserved credibility
- No technical gatekeeping between skill creation and installation
- External resource injection is a structural blind spot in current scanning tools

## Verbatim quotes

> "A skill is packaged expertise you hand your agent: the difference between an agent that improvises and one that works from a specialist's playbook."

> "Anyone can publish, anyone can install. No gatekeepers, no review - and no one checking what they're really running."

> "Skills routinely send the agent beyond those bundled files: out to an external URL holding documentation, an API reference, or a setup guide it's told to read and follow. When a skill confidently sends the agent to read documentation at an external link, the agent treats it with the same credibility it gives the skill."

> "Current skill security scanners practically scan only a portion of the skill's content, rendering the scan's result irrelevant by design."

> "Once we configured our domain to redirect to the real one, there's no way for either a standard user or an LLM scanner to tell something's off from a static look at the skill alone."

## Takeaways

- **External resource injection is a critical attack surface**: Scanners and users cannot safely assume that external documentation URLs are benign; malicious skills can use them as indirect payload delivery mechanisms.
- **Trust signals are easily spoofed**: GitHub stars, marketplace inclusion, and domain names that "sound plausible" provide false confidence; no single signal is reliable.
- **Agent context privileges are dangerous**: Skills loaded with user-equivalent authority allow agents to execute arbitrary commands if convinced to do so via documentation.
- **Non-technical adoption creates supply-chain risk**: When marketers, salespeople, and designers publish and install skills without code review, the attack surface explodes.
- **Current skill scanners have a fundamental design flaw**: Static analysis of bundled files misses the skill's actual runtime behavior once it directs an agent to fetch external content.

## Open questions

- How widespread are typosquatting domains in the skill ecosystem, and are there passive DNS or certificate transparency signals that could detect them?
- Can scanners be redesigned to detect and analyze transitive resource fetches, or does this require runtime sandboxing?
- What fraction of skill installations happen without any scanning at all?
- Are there credential-smuggling attack variants that don't require the agent to explicitly execute code?
- How do enterprise agent deployments currently handle untrusted skill sources?
