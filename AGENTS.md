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
skills/         Preserved operational skills (SKILL.md + companion files). One subdirectory per skill.
```

Initial topic folders: `tool-use/`, `memory/`, `evals/`, `harnesses/`, `prompting/`. Create new ones freely as the field shifts — don't force-fit a new entry into an existing folder. Wait until you have 2–3 entries before promoting a tag into its own folder.

## Named topic stubs

Two topics are explicitly in scope even before sources exist:

- **cost-management** — LLM API costs, rate limiting, token optimization, prompt caching, model selection economics. Route any material touching billing, quotas, token budgets, or efficiency patterns here. Create `topics/cost-management/` on the first source.
- **ralph-loops** — a named agentic pattern from the UpHill workshop (2026-05-27). Create the folder on first source; don't force-fit into `harnesses/` until the pattern is understood.

For these two: create the folder and `index.md` on the **first** source, not after 2–3.

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

### Author reputation tracking

If the same author produces multiple low-signal or negative-signal captures, record this in `topics/meta/author-reputation.md` (create `topics/meta/` on first entry). Format: one line per author — name/handle, track record summary, feed-block recommendation if warranted. When encountering a new URL from a flagged author, note the flag in triage and apply heightened skepticism. Still fetch and triage — don't pre-emptively skip without checking — but be more willing to land in `sources/skipped/`. Update the record if a flagged author later produces high-signal material.

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
3. **Cross-link**: if related to existing material, link by relative path. For **each folder named in the source's `topics:` frontmatter**, add a one-line entry to that folder's `index.md` (create if missing). Check every topic listed — don't rely on judgment about which one is "most relevant."
3b. **If the cross-link points to an existing `synthesis/` file**: open it and check whether the new source changes the synthesis — new term, new framing, new failure mode, new evidence. If yes: update the synthesis body, add the source to its `sources:` frontmatter, and **refresh the `updated:` date to today**. If mid-bulk-capture and context budget is tight, add a brief `## Pending updates` note directly in the synthesis file (source name + what needs incorporating) before moving on. Never leave a synthesis cross-linked from a new source but silently stale.
4. **Don't silently fold a source into `topics/`.** Topic notes are *distillation*, which requires synthesis across multiple sources.

## Preserving ephemeral material

Content arrives via `temp/` which is gitignored and may be deleted at any time. Two distinct preservation paths depending on what the material is:

### Articles, PDFs, and one-off documents

Preserve via the normal `sources/` capture flow. The critical rule: **if the source cannot be re-fetched** (PDF dropped by the owner, internal document, zip archive), the source capture file must be self-contained — embed the substantive content directly in the capture, not just a summary. The capture should read correctly even if the original file is gone. Do not rely on the temp path as a reference.

For web articles at public URLs, a summary + link is sufficient; the original is always re-fetchable.

### Reusable skills (SKILL.md files and companion templates)

Skills are operational artefacts, not knowledge. Preserve them in `skills/<skill-name>/`, mirroring the structure of the source directory exactly (SKILL.md + any `references/` or companion files). This keeps them installable via `npx skills add` or direct copy without modification.

In addition to the preservation copy in `skills/`, install skills intended for use in this project's Claude Code sessions under `.claude/commands/<skill-name>.md`. A skill in `.claude/commands/` becomes available immediately as a slash command.

Write a `sources/` capture for each skill (what it does, signal level, how it applies to this KB) — separately from the preservation copy. The `sources/` entry is for knowledge; the `skills/` entry is for reuse.

**Do not mix these paths.** A `sources/` capture of a skill does not make it usable; a `skills/` copy does not make it discoverable as KB knowledge. Both are needed for different purposes.

## Input types

### Teams / Slack conversation snippets

When the owner pastes a conversation (Teams, Slack, Discord, etc.):

- Triage each distinct message or recommendation independently — don't aggregate mixed-signal content.
- **Internal/corporate URLs** (private Bitbucket, internal wikis, private repos) will be inaccessible. Note the inaccessibility explicitly; capture any signal visible in the snippet text itself.
- **Images**: if a screenshot is provided as a separate file, read it and incorporate visible content.
- **YouTube and public URLs**: fetch and triage normally.
- After processing, give a one-line summary: captured X, skipped Y, inaccessible Z (with follow-up note if anything is worth revisiting).

### File-based material (PDFs, zips, slide decks)

When the owner provides a file rather than a URL:

- **Zip files**: extract and process each file inside. Read text files directly; attempt PDF extraction where tooling allows.
- **PDFs**: attempt text extraction. If tooling is unavailable, say so plainly and describe what can be inferred from filenames and readable companion files. Never fabricate content from a PDF you couldn't read.
- **Links files inside archives**: process exactly like a `links.txt` submission — triage each URL per the normal flow.
- Slug captures with the event name and date when known (e.g., `sources/2026-05-27-uphill-session1.md`).
- Conference/workshop material often has multiple components (session PDF, links list, slides). Treat each as a potential source and cross-link between captures from the same event.
- **Project temp dir is `temp/` at the repo root** (`<project-root>/temp/`). Do not search `/tmp` or `/temp` — those are system paths unrelated to this KB.

## Synthesis flow (when the owner asks "what do you think about X" or "deep dive Y")

1. Read everything in `sources/`, `topics/`, and `synthesis/` that's relevant. Read the files — don't recall from memory.
2. Note where sources agree, where they disagree, and where they're silent.
3. Give a frank, opinionated answer. The owner wants real takes, not hedged surveys. Distinguish observation ("Anthropic recommends X in `sources/...`") from opinion ("I think X is the right call here because Y").
4. If the conclusion is worth keeping, write or update a file under `synthesis/` or the relevant `topics/<topic>/`.
5. **Always date claims.** This field moves fast — a confident assertion from a 2024 post may be obsolete by 2026.

### Proactive synthesis reminders

After each capture, scan the **Open threads** sections of the touched topic indexes. If any thread now has ≥3 supporting sources or shows a clearly resolvable disagreement across ≥2 sources, mention it briefly at the end of the response — name the thread and the candidate question, and ask whether the owner wants to write the synthesis now or continue capturing. Don't write the synthesis unprompted; just keep the option visible.

## Cost and rate-limit awareness

The owner is on a paid Claude plan with per-session usage limits. Hitting limits mid-session breaks flow and wastes context.

- **Bulk triage first**: for batches of URLs or files, do a quick triage pass before any full writes — classify signal for each item, then commit text budget only to captures that warrant it.
- **Brief register is correct, not a fallback**: 150–300 words for low-signal items is the right answer, not a compromise.
- **Don't retry failed fetches**: if WebFetch fails once, log the URL as inaccessible and move on. One retry is fine; two is waste.
- **Flag before writing long synthesis**: if a synthesis write-up will exceed ~1000 words or requires reading many files, flag it to the owner before starting rather than running out of context mid-write.
- **Inaccessible internal URLs**: don't attempt to fetch internal corporate links (private Bitbucket, intranets). Skip immediately and note "inaccessible — internal URL."
- **Batch completion order**: finish captures in progress before starting new ones. Don't leave a source half-written.

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
