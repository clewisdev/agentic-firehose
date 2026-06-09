import { describe, it, expect } from 'vitest';
import { extractOutboundUrls, extractLinkedInAuthorSlug } from './fetch.js';

// Minimal LinkedIn HTML fixture — mirrors the real trk parameter patterns.
function linkedInHtml({
  authorSlug,
  postBodyLinks = [],
  authorCommentLinks = [],
  otherComments = [],
}: {
  authorSlug: string;
  postBodyLinks?: string[];
  authorCommentLinks?: string[];
  otherComments?: Array<{ slug: string; links: string[] }>;
}): string {
  const postBodyAnchors = postBodyLinks.map(u => `<a href="${u}">link</a>`).join(' ');
  const authorCommentAnchors = authorCommentLinks.map(u => `<a href="${u}">link</a>`).join(' ');
  const otherCommentHtml = otherComments
    .map(
      ({ slug, links }) =>
        `<a href="https://www.linkedin.com/in/${slug}?trk=public_post_comment_actor-image">${slug}</a>` +
        `<a href="https://www.linkedin.com/in/${slug}?trk=public_post_comment_actor-name">${slug}</a>` +
        links.map(u => `<a href="${u}">link</a>`).join(' '),
    )
    .join('\n');

  return `
    <a href="https://de.linkedin.com/in/${authorSlug}?trk=public_post_feed-actor-image">${authorSlug}</a>
    <a href="https://de.linkedin.com/in/${authorSlug}?trk=public_post_feed-actor-name">${authorSlug}</a>
    <p>Post body text. ${postBodyAnchors}</p>
    <a href="https://de.linkedin.com/in/${authorSlug}?trk=public_post_comment_actor-image">${authorSlug}</a>
    <a href="https://de.linkedin.com/in/${authorSlug}?trk=public_post_comment_actor-name">${authorSlug}</a>
    <p>Author comment. ${authorCommentAnchors}</p>
    ${otherCommentHtml}
    <a href="https://de.linkedin.com/in/${authorSlug}?trk=public_post_follow-view-profile">Follow</a>
  `;
}

describe('extractLinkedInAuthorSlug', () => {
  it('extracts slug from a /posts/ URL', () => {
    expect(extractLinkedInAuthorSlug(
      'https://www.linkedin.com/posts/alindnbrg_agentharness-codingagents-aiinfra-share-7470106122071289856-RW9t/',
    )).toBe('alindnbrg');
  });

  it('extracts a hyphenated slug', () => {
    expect(extractLinkedInAuthorSlug(
      'https://www.linkedin.com/posts/colin-eberhardt-1464b4a_augmented-coding-weekly-issue-47-share-7468928085422432256-WCyB',
    )).toBe('colin-eberhardt-1464b4a');
  });

  it('returns undefined for /feed/update/ URLs', () => {
    expect(extractLinkedInAuthorSlug(
      'https://www.linkedin.com/feed/update/urn:li:activity:7468928088454828032/',
    )).toBeUndefined();
  });

  it('returns undefined for non-LinkedIn URLs', () => {
    expect(extractLinkedInAuthorSlug('https://github.com/foo/bar')).toBeUndefined();
  });
});

describe('extractOutboundUrls — LinkedIn author attribution', () => {
  it('returns link from post body when author has a link there', () => {
    const html = linkedInHtml({
      authorSlug: 'alindnbrg',
      postBodyLinks: ['https://github.com/author/repo'],
    });
    expect(extractOutboundUrls(html, 'alindnbrg')).toEqual(['https://github.com/author/repo']);
  });

  it('returns link from author comment even when post body has no link', () => {
    const html = linkedInHtml({
      authorSlug: 'alindnbrg',
      authorCommentLinks: ['https://github.com/author/repo'],
    });
    expect(extractOutboundUrls(html, 'alindnbrg')).toEqual(['https://github.com/author/repo']);
  });

  it('ignores links from other users comments', () => {
    const html = linkedInHtml({
      authorSlug: 'alindnbrg',
      otherComments: [{ slug: 'alxsuv', links: ['https://github.com/other/repo'] }],
    });
    expect(extractOutboundUrls(html, 'alindnbrg')).toEqual([]);
  });

  it('regression: post with only other-comment links returns empty (alindnbrg case)', () => {
    // Mirrors the real page that triggered the bug
    const html = linkedInHtml({
      authorSlug: 'alindnbrg',
      otherComments: [
        { slug: 'alxsuv', links: ['https://github.com/hensu-project/hensu?trk=public_post_comment-text'] },
        { slug: 'boden-fuller', links: ['https://itrevolution.com/articles/the-three-developer-loops'] },
      ],
    });
    expect(extractOutboundUrls(html, 'alindnbrg')).toEqual([]);
  });

  it('prefers author comment link over other-comment link', () => {
    const html = linkedInHtml({
      authorSlug: 'alindnbrg',
      authorCommentLinks: ['https://github.com/author/repo'],
      otherComments: [{ slug: 'alxsuv', links: ['https://github.com/other/repo'] }],
    });
    expect(extractOutboundUrls(html, 'alindnbrg')).toEqual(['https://github.com/author/repo']);
  });

  it('resolves linkedin.com/redir/redirect wrappers in post body (regression: annievella case)', () => {
    // Real LinkedIn HTML wraps post body links in /redir/redirect?url=... — these
    // were previously excluded because the wrapper host is linkedin.com.
    const encoded = encodeURIComponent('https://www.thoughtworks.com/insights/blog/supervisory-engineering');
    const html = linkedInHtml({
      authorSlug: 'annievella',
      postBodyLinks: [`https://www.linkedin.com/redir/redirect?url=${encoded}&amp;trk=public_post-text`],
    });
    expect(extractOutboundUrls(html, 'annievella')).toEqual([
      'https://www.thoughtworks.com/insights/blog/supervisory-engineering',
    ]);
  });

  it('returns both post body and author comment links when both exist', () => {
    const html = linkedInHtml({
      authorSlug: 'alindnbrg',
      postBodyLinks: ['https://lnkd.in/eThieA56'],
      authorCommentLinks: ['https://github.com/author/repo'],
    });
    const urls = extractOutboundUrls(html, 'alindnbrg');
    expect(urls).toContain('https://lnkd.in/eThieA56');
    expect(urls).toContain('https://github.com/author/repo');
    expect(urls).toHaveLength(2);
  });
});

describe('extractOutboundUrls — no author (non-LinkedIn pages)', () => {
  it('extracts lnkd.in shortlinks in document order', () => {
    const html = `
      <a href="https://lnkd.in/eThieA56">MAI-Code article</a>
      <a href="https://lnkd.in/eQpii9qn">Frontend Lost Decade</a>
    `;
    expect(extractOutboundUrls(html)).toEqual([
      'https://lnkd.in/eThieA56',
      'https://lnkd.in/eQpii9qn',
    ]);
  });

  it('extracts direct external links', () => {
    expect(extractOutboundUrls(`<a href="https://github.com/foo/bar">repo</a>`)).toEqual([
      'https://github.com/foo/bar',
    ]);
  });

  it('excludes linkedin.com, licdn.com, and social hosts', () => {
    const html = `
      <a href="https://www.linkedin.com/in/someuser">profile</a>
      <a href="https://static.licdn.com/aero-v1/sc/h/icon">icon</a>
      <a href="https://twitter.com/foo">tweet</a>
      <a href="https://x.com/foo">x post</a>
      <a href="https://facebook.com/post">fb</a>
      <a href="https://instagram.com/p/abc">ig</a>
      <a href="https://github.com/foo/bar">repo</a>
    `;
    expect(extractOutboundUrls(html)).toEqual(['https://github.com/foo/bar']);
  });

  it('deduplicates repeated URLs', () => {
    const html = `
      <a href="https://example.com/article">first</a>
      <a href="https://example.com/article">second</a>
    `;
    expect(extractOutboundUrls(html)).toEqual(['https://example.com/article']);
  });

  it('returns empty array when no outbound URLs', () => {
    expect(extractOutboundUrls(`<a href="https://www.linkedin.com/in/user">profile</a>`)).toEqual([]);
  });

  it('excludes licdn.com CDN assets (regression: static.licdn.com bug)', () => {
    const html = `
      <a href="https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca">icon</a>
      <a href="https://media.licdn.com/dms/image/foo.jpg">photo</a>
      <a href="https://example.com/article">article</a>
    `;
    expect(extractOutboundUrls(html)).toEqual(['https://example.com/article']);
  });

  it('resolves linkedin.com/redir/redirect wrapper to real destination', () => {
    // LinkedIn wraps post body outbound links in a redirect URL; the destination
    // must be extracted and used rather than the linkedin.com wrapper being excluded.
    const encoded = encodeURIComponent('https://www.thoughtworks.com/insights/blog/supervisory-engineering');
    const html = `<a href="https://www.linkedin.com/redir/redirect?url=${encoded}&amp;trk=public_post-text">article</a>`;
    expect(extractOutboundUrls(html)).toEqual([
      'https://www.thoughtworks.com/insights/blog/supervisory-engineering',
    ]);
  });

  it('resolves redirect wrapper and still excludes linkedin.com destinations', () => {
    const encoded = encodeURIComponent('https://www.linkedin.com/in/someuser');
    const html = `<a href="https://www.linkedin.com/redir/redirect?url=${encoded}&amp;trk=public_post-text">profile</a>`;
    expect(extractOutboundUrls(html)).toEqual([]);
  });
});
