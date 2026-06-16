#!/usr/bin/env python3
"""Parse sources/*.md frontmatter into dashboard data.

Emits two files into this folder:
  data.json  — canonical data (for inspection / future CI build)
  data.js    — `window.DATA = {...}` so index.html works over file:// too

Run from repo root:  python3 docs/build.py
"""
import glob, json, os, re, collections, datetime, html

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(REPO, "sources")
TOPICS = os.path.join(REPO, "topics")
SYNTH = os.path.join(REPO, "synthesis")
OUT = os.path.dirname(os.path.abspath(__file__))


def parse_frontmatter(text):
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    if not text.startswith("---"):
        return None
    end = text.find("\n---", 3)
    if end == -1:
        return None
    return text[3:end]


def split_list(raw):
    raw = raw.strip()
    if raw.startswith("[") and raw.endswith("]"):
        raw = raw[1:-1]
    out = []
    for item in raw.split(","):
        item = item.strip().strip('"').strip("'").strip()
        if item:
            out.append(item)
    return out


def parse_scalar(raw):
    return raw.strip().strip('"').strip("'").strip()


LIST_FIELDS = {"authors", "topics", "tags"}


# ---- minimal markdown -> HTML (build-time; no parser shipped to client) ----
def _resolve_link(text, href, url_by_file):
    if href.startswith("http"):
        return f'<a href="{html.escape(href)}" target="_blank" rel="noopener">{text}</a>'
    base = href.split("/")[-1]
    if "sources/" in href and base.endswith(".md"):
        url = url_by_file.get(base)
        if url:  # link straight to the real article — web-friendly, not raw .md
            return f'<a href="{html.escape(url)}" target="_blank" rel="noopener" class="ext">{text} ↗</a>'
    # synthesis / sibling topic notes: internal KB doc, no external url
    return f'<span class="kbref" title="internal KB note: {html.escape(href)}">{text}</span>'


def md_inline(text, url_by_file):
    text = html.escape(text, quote=False)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)",
                  lambda m: _resolve_link(m.group(1), m.group(2), url_by_file), text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", text)
    return text


def md_to_html(body, url_by_file):
    out, para, in_list = [], [], False

    def flush_para():
        if para:
            out.append("<p>" + " ".join(para) + "</p>")
            para.clear()

    def close_list():
        nonlocal in_list
        if in_list:
            out.append("</ul>")
            in_list = False

    for raw in body.split("\n"):
        line = raw.rstrip()
        if not line.strip():
            flush_para(); close_list(); continue
        m = re.match(r"(#{1,4})\s+(.*)", line)
        if m:
            flush_para(); close_list()
            lvl = min(len(m.group(1)) + 1, 5)  # demote: # -> h2 (panel owns h1)
            out.append(f"<h{lvl}>{md_inline(m.group(2), url_by_file)}</h{lvl}>")
            continue
        if re.match(r"[-*]\s+", line):
            flush_para()
            if not in_list:
                out.append("<ul>"); in_list = True
            out.append("<li>" + md_inline(line[2:].strip(), url_by_file) + "</li>")
            continue
        if in_list:
            close_list()
        para.append(md_inline(line.strip(), url_by_file))
    flush_para(); close_list()
    return "\n".join(out)


def render_topics(url_by_file):
    """Pre-render each topic index.md to HTML. Returns {topic: {html, title}}."""
    rendered = {}
    for path in sorted(glob.glob(os.path.join(TOPICS, "*", "index.md"))):
        topic = os.path.basename(os.path.dirname(path))
        if topic == "meta":
            continue
        text = open(path, encoding="utf-8").read().replace("\r\n", "\n").replace("\r", "\n")
        title = topic
        m = re.search(r"^#\s+(.*)", text, re.M)
        if m:
            title = m.group(1).strip()
            text = text[m.end():]  # drop the H1; panel renders the title itself
        rendered[topic] = {
            "title": title,
            "blurb": _blurb(text, 110),       # short — compact contexts
            "intro": _blurb(text, 300),       # fuller lead — hover popover
            "html": md_to_html(text.strip(), url_by_file),
        }
    return rendered


def _blurb(text, limit=110):
    """First real paragraph of an index, stripped to plain text for topic cards."""
    for block in text.strip().split("\n\n"):
        block = block.strip()
        if not block or block.startswith(("#", "-", "*", ">")):
            continue
        block = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", block)   # links -> text
        block = re.sub(r"[*`_]", "", block)                       # emphasis/code marks
        block = re.sub(r"\s+", " ", block).strip()
        if len(block) > limit:
            block = block[:limit].rsplit(" ", 1)[0].rstrip(".,;:") + "…"
        return block
    return ""


def parse_source(path):
    fm = parse_frontmatter(open(path, encoding="utf-8").read())
    if fm is None:
        return None
    rec = {"file": os.path.basename(path)}
    for line in fm.split("\n"):
        if not line or line.startswith(" ") or ":" not in line:
            continue
        k, v = line.split(":", 1)
        k = k.strip()
        rec[k] = split_list(v) if k in LIST_FIELDS else parse_scalar(v)
    return rec


def main():
    records = []
    for path in sorted(glob.glob(os.path.join(SRC, "*.md"))):
        rec = parse_source(path)
        if rec:
            records.append(rec)

    # ---- parse synthesis files ----
    SYNTH_LIST_FIELDS = {"topics", "tags", "sources"}
    syntheses = []
    for path in sorted(glob.glob(os.path.join(SYNTH, "*.md"))):
        raw = open(path, encoding="utf-8").read().replace("\r\n", "\n").replace("\r", "\n")
        fm = parse_frontmatter(raw)
        if fm is None:
            continue
        rec = {"file": os.path.basename(path)}
        # Parse YAML frontmatter including block sequences (  - item)
        current_list_key = None
        for line in fm.split("\n"):
            m_item = re.match(r"^\s+-\s+(.*)", line)
            if m_item and current_list_key:
                rec.setdefault(current_list_key, []).append(m_item.group(1).strip().strip('"').strip("'"))
                continue
            if line.startswith(" ") or not line:
                current_list_key = None
                continue
            if ":" not in line:
                current_list_key = None
                continue
            k, v = line.split(":", 1)
            k = k.strip()
            v = v.strip()
            if v == "":
                current_list_key = k
                rec[k] = []
            elif k in SYNTH_LIST_FIELDS:
                current_list_key = None
                rec[k] = split_list(v)
            else:
                current_list_key = None
                rec[k] = parse_scalar(v)
        # Extract body (everything after the closing ---) and render to HTML
        # raw starts with ---, find second --- to get end of frontmatter
        body_start = raw.find("\n---", 3)
        if body_start != -1:
            body_md = raw[body_start + 4:].strip()
        else:
            body_md = ""
        rec["html"] = md_to_html(body_md, {})
        syntheses.append(rec)
    syntheses.sort(key=lambda r: r.get("updated", r.get("written", "")), reverse=True)

    def counter(field, listy=False):
        c = collections.Counter()
        for r in records:
            v = r.get(field)
            if v is None:
                continue
            if listy:
                for item in v:
                    c[item] += 1
            else:
                c[v] += 1
        return c

    records.sort(key=lambda r: r.get("captured", ""), reverse=True)

    # ---- extract GitHub repos with star counts ----
    # Star counts are extracted from the KB. Many are mentioned in LinkedIn posts (not in the
    # repo source itself), so we maintain a curated override map keyed by owner/repo (case-insensitive).
    # These are sourced directly from the KB captures and should be updated when sources are refreshed.
    STAR_OVERRIDES = {
        "forrestchang/andrej-karpathy-skills": 160_000,   # karpathy-skills-claude-md
        "anthropics/skills":                   142_000,   # third-party-skills-repos / google-skills-repo
        "mattpocock/skills":                    96_728,   # pocock-skills
        "addyosmani/agent-skills":              52_000,   # agent-skills-structured-workflows
        "earendil-works/pi":                    56_500,   # pi-agent-framework
        "safishamsi/graphify":                  55_200,   # safishamsi-graphify
        "thedotmack/claude-mem":                 5_000,   # claude-mem (no explicit count in KB, conservative)
        "luongnv89/asm":                           450,   # agent-skill-manager
        "jigripokri/poha":                          80,   # poha
    }

    star_re = re.compile(
        r"([\d,]+\.?\d*[kK]?\+?)\s*(?:GitHub\s+)?stars?", re.IGNORECASE
    )

    def parse_stars(raw):
        raw = raw.replace(",", "").replace("+", "").strip()
        if not raw:
            return 0
        try:
            if raw.lower().endswith("k"):
                return int(float(raw[:-1]) * 1000)
            return int(float(raw))
        except (ValueError, OverflowError):
            return 0

    repo_meta = {}
    for rec in records:
        url = rec.get("url", "")
        if "github.com" not in url:
            continue
        gh_url = re.sub(r"/blob/.*$", "", url).rstrip("/")
        m = re.match(r"https?://github\.com/([a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+)", gh_url)
        if not m:
            continue
        name = m.group(1)
        if name not in repo_meta:
            # Try override (case-insensitive)
            override_stars = next(
                (v for k, v in STAR_OVERRIDES.items() if k.lower() == name.lower()), 0
            )
            # Also scan the source body for star counts
            src_path = os.path.join(SRC, rec["file"])
            try:
                body = open(src_path, encoding="utf-8").read()
            except OSError:
                body = ""
            body_stars = [parse_stars(s) for s in star_re.findall(body)]
            body_max = max((s for s in body_stars if s > 0), default=0)
            repo_meta[name] = {
                "name": name,
                "url": gh_url,
                "stars": max(override_stars, body_max),
                "source_title": rec.get("title", rec["file"]),
                "source_file": rec["file"],
                "topics": rec.get("topics", []),
                "signal_level": rec.get("signal_level", ""),
                "captured": rec.get("captured", ""),
            }

    repos = sorted(repo_meta.values(), key=lambda r: -r["stars"])

    url_by_file = {r["file"]: r.get("url") for r in records if r.get("url")}
    topic_docs = render_topics(url_by_file)

    topics = counter("topics", listy=True)
    authors = counter("authors", listy=True)
    status = counter("status")
    signal = counter("signal_level")
    stype = counter("source_type")

    data = {
        "generated": datetime.datetime.now().isoformat(timespec="seconds"),
        "total": len(records),
        "sources": records,
        "syntheses": syntheses,
        "repos": repos,
        "topics": sorted(topics.items(), key=lambda x: (-x[1], x[0])),
        "topic_docs": topic_docs,
        "authors": sorted(authors.items(), key=lambda x: (-x[1], x[0])),
        "status": dict(status),
        "signal": dict(signal),
        "source_type": sorted(stype.items(), key=lambda x: -x[1]),
    }

    with open(os.path.join(OUT, "data.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    with open(os.path.join(OUT, "data.js"), "w", encoding="utf-8") as f:
        f.write("window.DATA = ")
        json.dump(data, f, ensure_ascii=False)
        f.write(";\n")

    print(f"{len(records)} sources -> data.json / data.js")
    print(f"  syntheses: {len(syntheses)}")
    print(f"  repos    : {len(repos)} github repos (top: {repos[0]['name']} {repos[0]['stars']:,}★)" if repos else "  repos    : 0")
    print(f"  status   : {dict(status)}")
    print(f"  signal   : {dict(signal)}")
    print(f"  topics   : {len(topics)} distinct ({len(topic_docs)} index docs rendered)")
    print(f"  authors  : {len(authors)} distinct")


if __name__ == "__main__":
    main()
