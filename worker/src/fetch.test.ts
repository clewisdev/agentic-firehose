import { describe, it, expect } from 'vitest';
import { extractOutboundUrls } from './fetch.js';

describe('extractOutboundUrls', () => {
  it('extracts lnkd.in shortlinks from a LinkedIn post', () => {
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
    const html = `<a href="https://github.com/foo/bar">repo</a>`;
    expect(extractOutboundUrls(html)).toEqual(['https://github.com/foo/bar']);
  });

  it('excludes linkedin.com hrefs (navigation, profiles)', () => {
    const html = `
      <a href="https://www.linkedin.com/in/someuser">profile</a>
      <a href="https://linkedin.com/feed">feed</a>
      <a href="https://github.com/foo/bar">repo</a>
    `;
    expect(extractOutboundUrls(html)).toEqual(['https://github.com/foo/bar']);
  });

  it('excludes twitter, x.com, facebook, instagram', () => {
    const html = `
      <a href="https://twitter.com/foo">tweet</a>
      <a href="https://x.com/foo">x post</a>
      <a href="https://facebook.com/post">fb</a>
      <a href="https://instagram.com/p/abc">ig</a>
      <a href="https://example.com/article">article</a>
    `;
    expect(extractOutboundUrls(html)).toEqual(['https://example.com/article']);
  });

  it('deduplicates repeated URLs', () => {
    const html = `
      <a href="https://example.com/article">first</a>
      <a href="https://example.com/article">second mention</a>
    `;
    expect(extractOutboundUrls(html)).toEqual(['https://example.com/article']);
  });

  it('returns empty array when no outbound URLs', () => {
    const html = `<a href="https://www.linkedin.com/in/user">profile</a>`;
    expect(extractOutboundUrls(html)).toEqual([]);
  });

  it('excludes licdn.com CDN assets (LinkedIn favicon, images, static files)', () => {
    const html = `
      <a href="https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca">icon</a>
      <a href="https://media.licdn.com/dms/image/foo.jpg">photo</a>
      <a href="https://example.com/article">article</a>
    `;
    expect(extractOutboundUrls(html)).toEqual(['https://example.com/article']);
  });

  it('returns empty array for a LinkedIn post with no external article link', () => {
    // Mirrors the real page structure that triggered the bug: CDN + nav only, no article
    const html = `
      <a href="https://www.linkedin.com/posts/alindnbrg_foo-bar-activity-123">post</a>
      <a href="https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca">icon</a>
      <a href="https://www.linkedin.com/legal/cookie-policy">cookies</a>
    `;
    expect(extractOutboundUrls(html)).toEqual([]);
  });
});
