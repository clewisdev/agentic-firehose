---
title: "agent-harness-starter: A tiny, readable agent harness in Python with working PDF Q&A"
url: https://github.com/ElimentaryLabs/agent-harness-starter
authors: [ElimentaryLabs]
captured: 2026-06-26
source_type: repo
topics: [harnesses, tool-use, agent-architecture]
tags: [python, anthropic, pdf-qa, loop-design, context-management, verification]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

A minimal, well-structured Python agent harness that implements the deterministic loop pattern around an LLM. The repo provides working reference code for the article "The Harness — For Engineers, By an Engineer," with each module mapping directly to a section of the design. It includes a complete PDF Q&A agent that navigates documents just-in-time without dumping full content into context.

**Core insight**: "The model is the climber. The harness is everything that keeps a long climb from ending in a fall." The harness manages turns, tools, verification, context, permissions, observability, and recovery — turning a raw LLM into a system you can trust.

## Architecture highlights

The harness implements a 13-step execution loop across discrete modules:

- **loop.py**: Core execution spine with turn management
- **llm.py**: Prompt assembly with cached system prompts and single non-deterministic call
- **context.py**: Context management and compaction
- **registry.py**: Tool/capability surface definition
- **hooks.py**: Extensibility seams with default observability; designed fail-open (try/except wrapped)
- **verification.py**: Guaranteed correctness — deliberately *not* a hook, because verification must be built-in, not optional
- **checkpoint.py**: Persistence and recovery

**Key design principle**: Hooks are fail-open (telemetry/extension bugs cannot crash a run); verification is fail-safe (part of the loop spine itself).

## PDF Q&A agent pattern

The included agent never dumps the full PDF into context. Instead, it navigates just-in-time using three tools:

- `list_pages`: Cheap overview (page count + text previews)
- `search_pdf`: Find which pages mention a topic
- `read_page`: Pull one page's full content, natively parsed by Claude (handles tables, figures, scanned PDFs)

Each extracted page is cached. Re-reads fetch from source of truth, not from a "lost result" after context compaction. This is the "lightweight identifier + re-fetch" pattern: keep references in context, not megabytes of data.

Termination is implicit: when the model answers without calling a tool, the turn ends. No special "done" signal.

## Getting started

Minimal quickstart:
```bash
git clone <fork-url>
cd agent-harness-starter
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # add your Anthropic API key
python -m examples.run path/to/document.pdf "What is the refund policy?"
```

The harness narrates each round, showing which tools the model requested and results. The PDF agent runs a test harness with a fake LLM (no network required) via pytest.

## Building your own agent

The harness is generic. An agent is just a system prompt + tool set + chosen hooks. Copy `agents/pdf_qa/` and swap tools and prompt. Example:

```python
from harness import AgentLoop, ToolRegistry, ToolDef, ExecutionContext, HookManager, observability_hooks

def get_weather(args, ctx):
    return {"content": f"72°F and sunny in {args['city']}"}

registry = ToolRegistry()
registry.register(ToolDef(
    name="get_weather",
    description="Get current weather for a city.",
    input_schema={"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]},
    handler=get_weather,
))

hooks = HookManager()
for point, fns in observability_hooks().items():
    for fn in fns:
        hooks.register(point, fn)

from harness import LLMClient
loop = AgentLoop(LLMClient(), registry, hooks=hooks)
result = loop.run("You are a helpful weather assistant.", ExecutionContext(session_id="demo", user_query="Weather in Paris?"))
print(result.content)
```

## Takeaways

- **Harness as deterministic frame**: The loop is where engineering lives; the model handles semantics, the harness handles trust and correctness.
- **Verification is not a hook**: Observability and extensions should be fail-open; correctness must be guaranteed by loop design, not pluggable.
- **Just-in-time navigation**: Don't dump data into context; use lightweight identifiers and re-fetch from source of truth during long runs.
- **Explicit tool termination**: Stop when the model answers without calling a tool; no ambiguous "done" signals.
- **Modular reference**: Each code module maps to a design principle, making the harness both executable and readable documentation.

## Open questions

- How does context compaction interact with tool caching when pages are squeezed out of history?
- What are failure modes when verification detects a loop or tool assumption error?
- How does the hook system scale with multiple observability/audit backends?
- Can the harness strategy apply to multi-step planning agents or only turn-by-turn request/response?
