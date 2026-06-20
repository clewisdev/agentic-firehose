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

    # Build url_by_file early so synthesis and topic rendering both use it
    url_by_file = {r["file"]: r.get("url") for r in records if r.get("url")}

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
        rec["html"] = md_to_html(body_md, url_by_file)
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
    # Strategy: scan every source body in the corpus for (github repo name, star count) pairs.
    # Many repos have their star count mentioned in a LinkedIn/blog post rather than their own
    # repo source file, so we must search the whole corpus, not just the repo's own capture.

    star_re = re.compile(
        r"([\d,]+\.?\d*[kK]?\+?)\s*(?:GitHub\s+)?stars?", re.IGNORECASE
    )
    github_name_re = re.compile(
        r"github\.com/([a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+)", re.IGNORECASE
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

    # Pass 1: build corpus-wide map of repo name (lowercase) -> max stars seen
    corpus_stars = {}  # lower(owner/repo) -> int
    for rec in records:
        src_path = os.path.join(SRC, rec["file"])
        try:
            body = open(src_path, encoding="utf-8").read()
        except OSError:
            continue
        # Find all github repo names and all star counts in this file
        repo_names = [m.group(1) for m in github_name_re.finditer(body)]
        star_counts = [parse_stars(s) for s in star_re.findall(body)]
        star_counts = [s for s in star_counts if s > 0]
        if not repo_names or not star_counts:
            continue
        # If there's only one repo name in the file, associate all star counts with it
        # If there are multiple, only associate counts that appear within 600 chars of the name
        if len(set(r.lower() for r in repo_names)) == 1:
            best = max(star_counts)
            key = repo_names[0].lower()
            if best > corpus_stars.get(key, 0):
                corpus_stars[key] = best
        else:
            for m_repo in github_name_re.finditer(body):
                name_key = m_repo.group(1).lower()
                window_start = max(0, m_repo.start() - 600)
                window_end = min(len(body), m_repo.end() + 600)
                window = body[window_start:window_end]
                nearby = [parse_stars(s) for s in star_re.findall(window) if parse_stars(s) > 0]
                if nearby:
                    best = max(nearby)
                    if best > corpus_stars.get(name_key, 0):
                        corpus_stars[name_key] = best

    # Pass 2: build repo_meta from sources whose URL is a GitHub repo,
    # then supplement missing star counts by searching corpus for the repo's short name
    # (handles cases where star count appears in a different source file than the repo URL)
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
            # Prefer explicit stars: frontmatter field > corpus scan > short-name fallback
            stars = int(rec.get("stars", 0)) if rec.get("stars") else 0
            if stars == 0:
                stars = corpus_stars.get(name.lower(), 0)
            # Fallback: search corpus for the repo's short name near a star count.
            # Only for distinctive names (>6 chars, not generic words that appear everywhere).
            if stars == 0:
                short_name = name.split("/")[-1].lower()
                generic = {"skills", "agents", "claude", "models", "review", "coding",
                           "memory", "tools", "agent", "code", "repo", "app", "api"}
                if len(short_name) > 6 and short_name not in generic:
                    for rec2 in records:
                        src_path2 = os.path.join(SRC, rec2["file"])
                        try:
                            body2 = open(src_path2, encoding="utf-8").read()
                        except OSError:
                            continue
                        if short_name not in body2.lower():
                            continue
                        for idx in [m2.start() for m2 in re.finditer(re.escape(short_name), body2, re.IGNORECASE)]:
                            window = body2[max(0, idx-200):idx+200]
                            nearby = [parse_stars(s) for s in star_re.findall(window) if parse_stars(s) > 0]
                            if not nearby:
                                continue
                            # Skip if another repo's URL appears in the window (count belongs to them)
                            other_repos = [m3.group(1).lower() for m3 in github_name_re.finditer(window)
                                           if m3.group(1).lower() != name.lower()]
                            if other_repos:
                                continue
                            # Skip if neither the owner nor the repo name appears alongside the match
                            owner = name.split("/")[0].lower()
                            if owner not in window.lower() and short_name not in window.lower().replace(short_name, "", 1):
                                pass  # short_name is guaranteed present; owner check is the signal
                            # Require the source file's own URL to be this repo, or the owner to appear
                            src_url = (rec2.get("url") or "").lower()
                            if name.lower() not in src_url and owner not in window.lower():
                                continue
                            best = max(nearby)
                            if best > stars:
                                stars = best
            repo_meta[name] = {
                "name": name,
                "url": gh_url,
                "stars": stars,
                "source_title": rec.get("title", rec["file"]),
                "source_file": rec["file"],
                "topics": rec.get("topics", []),
                "signal_level": rec.get("signal_level", ""),
                "captured": rec.get("captured", ""),
            }

    # Sort by stars desc, then alphabetically for ties (deterministic ordering)
    repos = sorted(repo_meta.values(), key=lambda r: (-r["stars"], r["name"].lower()))

    topic_docs = render_topics(url_by_file)

    topics = counter("topics", listy=True)
    authors = counter("authors", listy=True)
    status = counter("status")
    signal = counter("signal_level")
    stype = counter("source_type")

    # ---- featured repo (docs/featured.json, auto-expires after 10 days) ----
    featured = None
    featured_path = os.path.join(OUT, "featured.json")
    if os.path.exists(featured_path):
        try:
            feat = json.load(open(featured_path, encoding="utf-8"))
            set_on = datetime.date.fromisoformat(feat.get("set_on", ""))
            age = (datetime.date.today() - set_on).days
            if age <= 10:
                # Resolve against repos for URL + stars
                repo_rec = next((r for r in repos if r["name"] == feat.get("repo")), None)
                featured = {
                    "repo": feat.get("repo"),
                    "note": feat.get("note", ""),
                    "set_on": feat.get("set_on"),
                    "age_days": age,
                    "url": repo_rec["url"] if repo_rec else f"https://github.com/{feat.get('repo')}",
                    "stars": repo_rec["stars"] if repo_rec else 0,
                }
        except (ValueError, KeyError, TypeError):
            pass  # malformed or expired — hide the panel

    data = {
        "generated": datetime.datetime.now().isoformat(timespec="seconds"),
        "total": len(records),
        "sources": records,
        "syntheses": syntheses,
        "repos": repos,
        "featured": featured,
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
