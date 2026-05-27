# agents-kb

Personal knowledge base for **agentic engineering** — the design, building, and operation of LLM-based agents (Claude Code, Claude API agents, harnesses, tool use, memory, evals, etc.).

The owner uses this as a reference and thinking partner. Not a public docs site, not a tutorial. Optimize for the owner's future recall and decision-making.

## Layout

```
topics/         Distilled knowledge by theme. The durable layer.
sources/        Raw captures of URLs (summary + key quotes + link to original).
synthesis/      Cross-source essays — what to conclude after reading 3+ sources on a topic.
plans/          Forward-looking design / planning documents for evolving this KB itself.
templates/      Frontmatter templates for new source / synthesis entries.
```

Initial topic folders: `tool-use/`, `memory/`, `evals/`, `harnesses/`, `prompting/`. Create new ones freely as the field shifts — don't force-fit a new entry into an existing folder. Wait until you have 2–3 entries before promoting a tag into its own folder.

## Triage / discernment (before capture)

A lot of incoming URLs in this field are LinkedIn clickbait, content-marketing, hype, or aggregator posts dressed up as guidance. Capturing them all uncritically pollutes the KB. **Triage first.** Be willing to spend less effort — or refuse — on low-signal material.

### Signal levels

Classify each source on first scan:

- **High signal**: working practitioners reporting specific experience with concrete details — code, configs, versions, named tools, before/after, failure modes. Often have a track record outside LinkedIn (open-source repos, technical books, working products).
- **Medium signal**: framing / vocabulary pieces or well-argued opinion from credible authors. Useful for terminology and mental models even when light on operational detail.
- **Low signal**: aggregator / listicle / resource-list posts, content-marketing for a learning product or newsletter, engagement-farming posts, generic "Stop doing X / Start doing Y" advice with no rationale. High engagement on these is a signal about the *topic*, not the *content*.
- **Negative signal**: actively misleading — fabricated statistics, prescriptive rules with no evidence, sources that paraphrase others without attribution, anything obviously LLM-written and not edited.

### Common clickbait / hype tells (LinkedIn especially)

- Mathematical bold/italic Unicode characters in the headline (e.g. "𝐀𝐈 𝐀𝐠𝐞𝐧𝐭𝐬"). A tactic to dodge keyword filters; signals "viral attempt."
- Round-number performance claims with no methodology (10x, 95%, "saves 20 hours/week").
- Numbered listicles where each item is a single line ("36 tips you need").
- "I tested X for Y days and here's what I learned" with no actual data.
- "Most people don't know this..." / "Comment X for the link" / "Save this for later" — engagement farming.
- Heavy credentialing in the intro ("trained 500+ engineers / spoke at 30 conferences"). Real practitioners cite work, not audience size.
- All-bullet posts with no prose connective tissue.
- Strong claims with em-dash-heavy LLM-cadence prose.
- The "It's not X, it's Y" construction (catalogued in `sources/2026-05-20-its-not-x-its-y.md`).

### What to do at each level

- **High / medium signal**: full capture per the capture flow below.
- **Low signal**: brief capture (~150–300 words), explicit low-signal flag in the file body and in the topic index entry, `low-signal` tag in frontmatter. Do not propagate the source's claims into topic indexes uncritically. Do not add to open threads or create new tags on the strength of a low-signal source alone. The Aslam Kahn capture (`sources/2026-05-20-aslam-kahn-crash-course.md`) is the working example of this register.
- **Negative signal**: surface to the owner before capturing — describe what you saw and recommend skipping. Don't waste the owner's time or the KB's space.

### When unsure

If a source straddles signal levels or you can't tell on first scan, say so in one sentence and ask the owner whether to do a full capture, a brief capture, or skip. Don't default to full capture out of politeness.

## Capture flow (when the owner shares a URL)

1. **Fetch the source** with WebFetch. If paywalled or the fetch fails, say so plainly — never fabricate content from the URL alone.
2. **Write a capture** to `sources/YYYY-MM-DD-short-slug.md` using `templates/source.md`. Include:
   - Frontmatter (schema below).
   - Summary in the owner's terms (~300–600 words for posts, longer for papers).
   - Verbatim quotes worth preserving, with surrounding context.
   - **Takeaways**: 3–5 bullets on what this means for how the owner should build agents.
   - **Open questions**: where the source overreaches or where to look further.
3. **Cross-link**: if related to existing material, link by relative path. If a topic folder applies, add a one-line entry to its `index.md` (create if missing).
4. **Don't silently fold a source into `topics/`.** Topic notes are *distillation*, which requires synthesis across multiple sources.

## Synthesis flow (when the owner asks "what do you think about X" or "deep dive Y")

1. Read everything in `sources/`, `topics/`, and `synthesis/` that's relevant. Read the files — don't recall from memory.
2. Note where sources agree, where they disagree, and where they're silent.
3. Give a frank, opinionated answer. The owner wants real takes, not hedged surveys. Distinguish observation ("Anthropic recommends X in `sources/...`") from opinion ("I think X is the right call here because Y").
4. If the conclusion is worth keeping, write or update a file under `synthesis/` or the relevant `topics/<topic>/`.
5. **Always date claims.** This field moves fast — a confident assertion from a 2024 post may be obsolete by 2026.

### Proactive synthesis reminders

After each capture, scan the **Open threads** sections of the touched topic indexes. If any thread now has ≥3 supporting sources or shows a clearly resolvable disagreement across ≥2 sources, mention it briefly at the end of the response — name the thread and the candidate question, and ask whether the owner wants to write the synthesis now or continue capturing. Don't write the synthesis unprompted; just keep the option visible.

## Advice mode

The owner is a practitioner, not a beginner. Skip first-principles unless asked.

- **Be direct.** "Don't do X because Y" beats "you might consider whether X is right for your use case."
- **Cite specifics** — file path + line, not vague references.
- **Flag staleness.** If a source is older than ~6 months in this field, say so when leaning on it.
- **Disagree with sources when warranted.** This is a working KB, not a citation engine.

## Frontmatter schemas

**Source captures** (`sources/*.md`):

```yaml
---
title: "..."                              # source's own title
url: https://...
authors: [Name, ...]
captured: 2026-05-20                      # date the owner shared it
source_type: blog | paper | docs | video | thread | repo | talk
topics: [tool-use, memory]                # which topic folders this maps to
tags: [react, reflection, mcp]            # finer-grained
status: raw | summarized
confidence: high | medium | low
freshness_until: 2026-Q4 | unknown | evergreen
---
```

**Topic / synthesis notes** (`topics/<topic>/*.md`, `synthesis/*.md`):

```yaml
---
title: "..."
written: 2026-05-20
updated: 2026-05-20
topics: [...]
tags: [...]
sources: [sources/2026-05-20-foo.md, sources/2026-04-10-bar.md]
status: draft | stable | needs-revision
---
```

## What not to do

- Don't summarize a source you couldn't actually fetch.
- Don't create a topic folder for a single source.
- Don't update a topic note from one new source without flagging it as a single-source claim.
- Don't write hype. The agentic field has a lot of it; the owner reads this for signal.
- Don't capture a low-signal source as if it were high-signal. Triage first; pad nothing.
- Don't duplicate KB content into Claude's personal memory system — the files *are* the memory. Personal memory should hold owner preferences and meta-collaboration notes, not domain knowledge.
