---
title: "Designing MCP Gateway: Uber's MCP Management Platform"
url: https://www.uber.com/us/en/blog/designing-mcp-gateway/
authors:
  - Alok Srivastava
  - Deepanshu Mehndiratta
  - Gaurav Gill
captured: 2026-11-06
source_type: blog
topics: [tool-use, enterprise-deployment, agent-architecture, system-design]
tags: [mcp, model-context-protocol, api-gateway, grpc, thrift, cadence, proxy, schema-translation]
signal_level: high
status: raw
confidence: high
freshness_until: 2028-Q1
---

# Designing MCP Gateway: Uber's MCP Management Platform

Uber Engineering details the architecture and operational design of **MCP Gateway**, an enterprise-scale management platform and orchestration proxy for the Model Context Protocol (MCP). As agentic workflows expanded across internal systems, decentralized MCP server development led to infrastructure duplication, fragmented tooling, security vulnerabilities, and brittle integrations. To address this, Uber centralized MCP traffic through a unified gateway managing over 800 MCP servers and 5,000+ tools across diverse internal protocols (HTTP, gRPC, and TChannel).

## Architecture Overview

The platform decouples runtime traffic from service lifecycle management through two core components:

1. **MCP Registry (Control Plane)**: Acts as the central catalog and single source of truth for MCP servers, tools, ownership, authorization, and enablement across the company.
2. **Proxy Gateway (Data Plane)**: A high-throughput translation layer that receives MCP JSON-RPC requests from client agents, translates them into the target backend protocol (HTTP, gRPC, or TChannel), invokes internal microservices, and translates responses back into MCP format without requiring backend services to implement native MCP logic.

## Automated Discovery and Schema Synthesis (AutoCrawler)

Manually converting thousands of legacy microservices into MCP servers is impractical. Uber built **AutoCrawler**, an automated discovery engine built on Cadence distributed workflows:

- **IDL Parsing & Translation**: AutoCrawler subscribes to Uber's IDL (Interface Definition Language) registry. It continuously ingests Protobuf and Thrift definitions, parsing method signatures, parameter types, and inline documentation comments.
- **LLM-Enriched Descriptions**: Raw RPC schemas often lack context suited for LLM tool selection. AutoCrawler invokes LLMs to transform IDL comments and parameter schemas into agent-optimized tool descriptions, converting IDL schemas into JSON Schema / MCP JSON-RPC 2.0 specifications.
- **Safe Provisioning**: Newly discovered tools are provisioned in the MCP Registry in a disabled-by-default posture, requiring explicit review and entitlement assignment before agent exposure.
- **Native MCP Discovery (MCPFx)**: For services built directly as native MCP servers using Uber's internal `MCPFx` framework, instances emit heartbeats. AutoCrawler detects these signals and calls `listTools` dynamically to ingest native tool definitions into the central registry.

## Key Quotes

> "Without a unified architecture, scaling MCP would increase operational complexity, security risk, and developer friction, ultimately limiting its impact. To unlock MCP’s full potential at Uber’s scale, we needed a centralized, scalable solution to standardize how AI agents interact with existing back-end systems while preserving flexibility for teams."

> "MCP Gateway unlocked a scalable, fast, and consistent path to building AI agents within Uber and is currently hosting over 800 MCP servers and over 5000 tools."

> "For traditional back-end services defined through Protobuf or Thrift IDLs, AutoCrawler derives MCP servers and tools directly from the IDL Registry... Uses an LLM to generate enriched, agent-friendly MCP tool descriptions based on the extracted schemas and comments."

## Takeaways

- **Decouple Tool Authorship from Existing Microservices**: Retrofitting native MCP support across thousands of microservices is an operational bottleneck. A centralized protocol translation gateway (MCP JSON-RPC to gRPC/Thrift/HTTP) allows existing APIs to be exposed as tools without codebase modifications.
- **Automate IDL-to-MCP Ingestion**: Combining IDL parsers with scheduled Cadence workflows and LLM-assisted docstring enrichment turns existing enterprise schemas into viable MCP tool candidates at scale.
- **Enforce Disabled-by-Default Governance**: Auto-registering thousands of internal RPC endpoints into an agent's context creates severe token bloat and security risk. Tools must be gated, disabled by default, and selectively surfaced to agents based on intent and authorization.
- **Support Hybrid Deployment Models**: Heterogeneous enterprise environments require supporting both virtual proxy tools (derived from RPC definitions) and native, high-context MCP servers built using specialized frameworks (`MCPFx`).

## Open Questions

- How does the Proxy Gateway handle latency overhead when translating multi-hop tool invocations across complex distributed call graphs?
- What context-pruning or dynamic tool-selection mechanisms are used by clients when querying a registry of 5,000+ available tools without overflowing agent context windows?
- How does the Gateway handle auth delegation, user credential passthrough, and fine-grained authorization (e.g., read vs. write actions on behalf of specific human users)?