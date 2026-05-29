---
name: knowledge-base-wiki
description: Build and maintain a personal LLM-powered knowledge base rooted at ~/knowledge-base. Use when ingesting sources, querying wiki knowledge, archiving answers, or linting content in the home-folder knowledge base. Triggers include "add to knowledge base", "what do I know about", "archive to knowledge base", "lint knowledge base", and mentions of the knowledge-base wiki.
---

# Knowledge Base Wiki

Build and maintain a personal knowledge base using LLMs.

Use these exact locations:
- `~/knowledge-base/raw` for immutable source material
- `~/knowledge-base/wiki` for compiled knowledge articles

Do not fall back to project-local `raw/` or `wiki/` unless the user explicitly asks.

Core ideas from Karpathy:
- "The LLM writes and maintains the wiki; the human reads and asks questions."
- "The wiki is a persistent, compounding artifact."

## Architecture

Three layers live under `~/knowledge-base`:

**raw/** — Immutable source material. You read, never modify. Organized by topic subdirectories such as `~/knowledge-base/raw/machine-learning/`.

**wiki/** — Compiled knowledge articles. You have full ownership. Organized by topic subdirectories, one level only: `~/knowledge-base/wiki/<topic>/<article>.md`. Contains two special files:
- `~/knowledge-base/wiki/index.md` — Global index. One row per article, grouped by topic, with link + summary + Updated date.
- `~/knowledge-base/wiki/log.md` — Append-only operation log.

**SKILL.md** — Schema layer. Defines structure and workflow rules.

Templates live in `references/` relative to this skill. Read them when you need the exact format for raw files, articles, archive pages, or the index.

### Initialization

Triggers only on the first Ingest. Check whether `~/knowledge-base/raw` and `~/knowledge-base/wiki` exist. Create only what is missing; never overwrite existing files:

- `~/knowledge-base/raw` directory (with `.gitkeep`)
- `~/knowledge-base/wiki` directory (with `.gitkeep`)
- `~/knowledge-base/wiki/index.md` — heading `# Knowledge Base Index`, empty body
- `~/knowledge-base/wiki/log.md` — heading `# Wiki Log`, empty body

If Query or Lint cannot find the wiki structure, tell the user: "Run an ingest first to initialize the knowledge base." Do not auto-create.

---

## Ingest

Fetch a source into `~/knowledge-base/raw`, then compile it into `~/knowledge-base/wiki`. Always both steps.

### Fetch (raw/)

1. Get the source content using whatever web or file tools your environment provides. If nothing can reach the source, ask the user to paste it directly.
2. Pick a topic directory. Check existing `~/knowledge-base/raw` subdirectories first; reuse one if the topic is close enough. Create a new subdirectory only for genuinely distinct topics.
3. Save as `~/knowledge-base/raw/<topic>/YYYY-MM-DD-descriptive-slug.md`.
   - Slug from source title, kebab-case, max 60 characters.
   - Published date unknown: omit the date prefix from the file name. The metadata Published field still appears; set it to `Unknown`.
   - If a file with the same name already exists, append a numeric suffix such as `descriptive-slug-2.md`.
   - Include metadata header: source URL, collected date, published date.
   - Preserve original text. Clean formatting noise. Do not rewrite opinions.

See `references/raw-template.md` for the exact format.

### Compile (wiki/)

Determine where the new content belongs:

- **Same core thesis as an existing article** -> Merge into that article. Add the new source to Sources/Raw. Update affected sections.
- **New concept** -> Create a new article in the most relevant topic directory. Name the file after the concept, not the raw file.
- **Spans multiple topics** -> Place in the most relevant directory. Add See Also cross-references to related articles elsewhere.

These are not mutually exclusive. A single source may warrant merging into one article while also creating a separate article for a distinct concept it introduces.

Check for factual conflicts. If the new source contradicts existing content, annotate the disagreement with source attribution. When merging, note the conflict within the merged article. When the conflicting content lives in separate articles, note it in both and cross-link them.

See `references/article-template.md` for article format. Key points:
- Sources field: author, organization, or publication name + date, semicolon-separated.
- Raw field: markdown links to raw files, semicolon-separated.
- Relative paths from `~/knowledge-base/wiki/<topic>/` to raw files use `../../raw/<topic>/<file>.md`.

### Cascade Updates

After the primary article, check for ripple effects:

1. Scan articles in the same topic directory for content affected by the new source.
2. Scan `~/knowledge-base/wiki/index.md` entries in other topics for articles covering related concepts.
3. Update every article whose content is materially affected. Each updated file gets its Updated date refreshed.

Archive pages are never cascade-updated.

### Post-Ingest

Update `~/knowledge-base/wiki/index.md`: add or update entries for every touched article. When adding a new topic section, include a one-line description. The Updated date reflects when the article's knowledge content last changed, not the file system timestamp. See `references/index-template.md` for format.

Append to `~/knowledge-base/wiki/log.md`:

```markdown
## [YYYY-MM-DD] ingest | <primary article title>
- Updated: <cascade-updated article title>
- Updated: <another cascade-updated article title>
```

Omit `- Updated:` lines when no cascade updates occur.

---

## Query

Search the wiki and answer questions. Examples:
- "What do I know about X?"
- "Summarize everything related to Y"
- "Compare A and B based on my knowledge base"

### Steps

1. Read `~/knowledge-base/wiki/index.md` to locate relevant articles.
2. Read those articles and synthesize an answer.
3. Prefer wiki content over your own training knowledge.
4. Cite sources with markdown links that point to the actual article file under `~/knowledge-base/wiki/`.
5. Output the answer in the conversation. Do not write files unless asked.

Inside wiki files, keep using links relative to the current file.

### Archiving

When the user explicitly asks to archive or save the answer to the knowledge base:

1. Write the answer as a new wiki page. See `references/archive-template.md`.
   - Sources: markdown links to the wiki articles cited in the answer.
   - No Raw field.
   - File name reflects the query topic, such as `transformer-architectures-overview.md`.
   - Place it in the most relevant topic directory under `~/knowledge-base/wiki/`.
2. Always create a new page. Never merge archive content into existing articles.
3. Update `~/knowledge-base/wiki/index.md`. Prefix the Summary with `[Archived]`.
4. Append to `~/knowledge-base/wiki/log.md`:

   ```markdown
   ## [YYYY-MM-DD] query | Archived: <page title>
   ```

When converting conversation citations into the archive page, rewrite them to file-relative paths.

---

## Lint

Quality checks on the knowledge base. Two categories with different authority levels.

### Deterministic Checks (auto-fix)

Fix these automatically:

**Index consistency** — compare `~/knowledge-base/wiki/index.md` against actual wiki files, excluding `index.md` and `log.md`:
- File exists but missing from index -> add an entry with `(no summary)` placeholder. For Updated, use the article's metadata Updated date if present; otherwise fall back to the file's last modified date.
- Index entry points to a nonexistent file -> mark it as `[MISSING]` in the index. Do not delete the entry.

**Internal links** — for every markdown link in wiki article files, excluding Raw field links and excluding `index.md`/`log.md`:
- Target does not exist -> search `~/knowledge-base/wiki` for a file with the same name elsewhere.
  - Exactly one match -> fix the path.
  - Zero or multiple matches -> report to the user.

**Raw references** — every link in a Raw field must point to an existing raw file:
- Target does not exist -> search `~/knowledge-base/raw` for a file with the same name elsewhere.
  - Exactly one match -> fix the path.
  - Zero or multiple matches -> report to the user.

**See Also** — within each topic directory:
- Add obviously missing cross-references between related articles.
- Remove links to deleted files.

### Heuristic Checks (report only)

Report findings without auto-fixing:

- Factual contradictions across articles
- Outdated claims superseded by newer sources
- Missing conflict annotations where sources disagree
- Orphan pages with no inbound links from other wiki articles
- Missing cross-topic references
- Concepts frequently mentioned but lacking a dedicated page
- Archive pages whose cited source articles have been substantially updated since archival

### Post-Lint

Append to `~/knowledge-base/wiki/log.md`:

```markdown
## [YYYY-MM-DD] lint | <N> issues found, <M> auto-fixed
```

---

## Conventions

- Standard markdown with relative links throughout the wiki files.
- `~/knowledge-base/wiki` supports one level of topic subdirectories only. No deeper nesting.
- Today's date for log entries, Collected dates, and Archived dates. Updated dates reflect when the article's knowledge content last changed. Published dates come from the source and use `Unknown` when unavailable.
- In conversation output, cite article files from `~/knowledge-base/wiki/...`. Inside wiki files, all markdown links stay relative to the current file.
- Ingest updates both `~/knowledge-base/wiki/index.md` and `~/knowledge-base/wiki/log.md`. Archive updates both. Lint updates `~/knowledge-base/wiki/log.md` and `~/knowledge-base/wiki/index.md` only when index auto-fixes are needed. Plain queries do not write files.
