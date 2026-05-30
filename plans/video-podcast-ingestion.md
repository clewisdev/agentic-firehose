---
title: "Video and podcast ingestion"
status: planning
drafted: 2026-05-30
updated: 2026-05-30
owner: chris
---

# Plan: video and podcast ingestion

## Goal

YouTube videos and podcasts are high-value sources currently excluded from the KB because the Worker only handles URLs that return readable HTML. Add a path for transcript-based ingestion.

## Problem

The current Worker fetches a URL and strips HTML. YouTube and podcast URLs return no useful content via that path. Yet many high-signal practitioners publish primarily via these formats — not blog posts.

## Proposed direction

### Phase 1 — manual transcript ingestion (no new infrastructure)

Get the workflow validated before automating it.

- **YouTube**: most public videos have auto-generated captions accessible without auth. Owner emails a YouTube URL; Worker detects the domain and fetches the transcript via the YouTube Data API (captions endpoint) or a lightweight scrape of the `timedtext` endpoint. Falls back to a manual paste if transcript unavailable.
- **Podcasts**: no universal transcript endpoint. Starting point: owner pastes the transcript text directly in the email body, or links to a show notes page that includes a transcript. Worker processes whatever text is present.
- A `source_type: video` or `source_type: podcast` value already exists (video) or should be added (podcast) to the frontmatter schema.

### Phase 2 — automatic transcript fetch

- YouTube: implement the captions API path in the Worker. Key question: does it require OAuth or is the `timedtext` endpoint public? Needs a spike.
- Podcasts: Cloudflare Workers AI has a Whisper endpoint (~$0.0001/minute of audio). For podcasts without transcripts, fetch the audio URL and run Whisper. This adds cost and latency but opens the long tail of shows that don't publish transcripts.

### Phase 3 — subscription and new episode auto-ingestion

- RSS feed polling via a Cloudflare Cron Trigger. Owner subscribes a feed; new episodes trigger the ingestion pipeline automatically.
- Needs: feed parser, episode deduplication (track processed episode GUIDs), possibly a KV store for state.
- This is a materially larger scope than Phases 1–2. Do not design it until Phase 2 is validated.

## Open questions

- Is the YouTube `timedtext` endpoint reliably accessible without auth? Needs a test.
- Auto-captions quality varies significantly. Does the capture flow need a quality flag (`transcript_quality: auto | manual | whisper`)?
- Whisper transcription adds wall-clock time to the Worker invocation. Does the 30-second default timeout need raising for audio sources?
- Podcast Index API (`podcastindex.org`) offers episode metadata and some transcript links — worth checking before building a custom scraper.

## Relationship to other plans

Independent of `plans/two-tier-processing.md` but compatible with it — transcript ingestion should also use the cheap automated path once two-tier is in place. Transcripts tend to be long (10K–50K tokens); the content budget reduction in two-tier is especially important here.
