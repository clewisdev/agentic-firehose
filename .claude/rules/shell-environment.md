# Shell environment gotchas (WSL / Windows-mounted repo)

This repo lives on `/mnt/c/...` — a Windows filesystem mounted into WSL. Two
environment facts have already cost rework; check them before related work.

## `jq` is not installed

Parsing JSON or JSONL with `jq` fails with `command not found`. If the call is
wrapped in `2>/dev/null` the error is silent and you get empty output that looks
like "no matches" rather than "tool missing".

**Rule**: parse JSON/JSONL with `python3` (always available), not `jq`. When a
shell pipeline returns unexpectedly empty output, re-run without `2>/dev/null`
once to confirm the tool actually ran.

## Files may have CRLF line endings

`.md` files edited locally (Obsidian, Windows editors) get CRLF endings; the
Worker writes LF via the GitHub API. This mixed state has two distinct traps:

1. **Whitespace diagnosis** — `grep -E '...[[:space:]]$'` and `grep [[:space:]]`
   match `\r`. A file that looks like it has a "trailing space" on a field is
   usually just CRLF. Confirm with `file <path>` (reports "CRLF line
   terminators") or `grep -lU $'\r'` before concluding "trailing whitespace".

2. **Regex field rewrites** — in JS/TS regex, `.` does NOT match `\r`, so a
   line-oriented frontmatter regex silently skips CRLF lines (the match fails
   on the trailing `\r`). When normalising files programmatically, strip CRLF to
   LF first (`s.replace(/\r\n/g, '\n').replace(/\r/g, '\n')`) before applying
   field regexes.

`.gitattributes` now enforces `*.md text eol=lf`, so this self-corrects on
commit going forward — but auditing/rewriting the existing tree (e.g. mass
frontmatter passes) still hits both traps until the files are renormalised.
