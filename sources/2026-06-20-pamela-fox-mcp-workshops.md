---
title: "4 Hours of Internal Workshops on MCP Servers at Microsoft"
url: https://www.linkedin.com/posts/pamela-s-fox_i-ran-4-hours-straight-of-internal-workshops-share-7473514945364545536-UTJy/
authors: [Pamela Fox]
captured: 2026-06-20
source_type: post
topics: [tool-use, agent-architecture]
tags: [mcp, github-copilot, form-elicitations, fastmcp, python]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Pamela Fox (Microsoft) conducted a 4-hour internal workshop series on Model Context Protocol (MCP) servers, covering both usage and implementation. The workshop progressed through three concrete phases: (1) connecting GitHub Copilot clients (VS Code, CLI, App) to public and authenticated MCP servers; (2) building a basic MCP server using Python and FastMCP; (3) MCP apps and form elicitations.

Fox published slides and exercises openly for reuse. A notable follow-up comment clarified the design trade-off between form elicitations and GUI-rendered forms: form elicitations support broader client compatibility (TUIs like Copilot CLI) whereas GUI-based forms require iframe support and are limited to graphical environments. This distinction is substantive for practitioners choosing between modes.

The materials appear to represent real internal training content with hands-on exercises, positioned as practical guidance rather than conceptual overview.

## Key Quotes

"Form elicitations can also be rendered by TUIs, like Copilot CLI, vs. apps which can only be rendered in GUIs that support iframes. For cross-client support, prefer form elicitations."

"We connected GitHub Copilot (VS Code/CLI/App) to both public and auth'd MCP servers, then built a basic server with Python+FastMCP, and finished up with MCP apps and elicitations."

## Takeaways

- MCP server implementation is now within reach for teams using Python + FastMCP as a scaffolding pattern
- Form elicitations offer broader client compatibility than iframe-based GUI forms; choice depends on deployment target
- GitHub Copilot integration with authenticated MCP servers is now demonstrated and trainable (not just public servers)
- Published workshop materials suggest MCP is moving from experimental to deployable practitioner skill

## Open Questions

- What authentication patterns did the workshop cover for MCP servers? (OAuth, API keys, custom?)
- Are C#/.NET scaffolding tools equivalent to FastMCP emerging? (Comment from Ross McLoughlin suggests demand)
- How do form elicitations render in Copilot CLI specifically? (Fox alludes to example but link not expanded in post)
