import { describe, it, expect } from 'vitest';
import { normalizeLineWraps } from './email.js';

describe('normalizeLineWraps', () => {
  it('rejoins a LinkedIn share code (-WCyB) split onto the next line', () => {
    const input =
      'https://www.linkedin.com/posts/colin-eberhardt-1464b4a_augmented-coding-weekly-issue-47-share-7468928085422432256\n-WCyB/?utm_source=share&utm_medium=member_android';
    const result = normalizeLineWraps(input).match(/https?:\/\/[^\s]+/)?.[0];
    expect(result).toBe(
      'https://www.linkedin.com/posts/colin-eberhardt-1464b4a_augmented-coding-weekly-issue-47-share-7468928085422432256-WCyB/?utm_source=share&utm_medium=member_android',
    );
  });

  it('rejoins a URL split before a query string (?)', () => {
    const input = 'https://example.com/path\n?query=value&foo=bar';
    expect(normalizeLineWraps(input)).toBe('https://example.com/path?query=value&foo=bar');
  });

  it('rejoins a URL split before a path segment (/)', () => {
    const input = 'https://example.com/very/long/path\n/to/resource';
    expect(normalizeLineWraps(input)).toBe('https://example.com/very/long/path/to/resource');
  });

  it('does not join a URL with unrelated text on the next line', () => {
    const input = 'https://example.com\nAnd also check this out';
    expect(normalizeLineWraps(input)).toBe('https://example.com\nAnd also check this out');
  });

  it('leaves two separate URLs on separate lines untouched', () => {
    const input = 'https://example.com/one\nhttps://example.com/two';
    expect(normalizeLineWraps(input)).toBe('https://example.com/one\nhttps://example.com/two');
  });

  it('handles CRLF line endings', () => {
    const input =
      'https://www.linkedin.com/posts/author_slug-7468928085422432256\r\n-WCyB/?utm_source=share';
    expect(normalizeLineWraps(input)).toBe(
      'https://www.linkedin.com/posts/author_slug-7468928085422432256-WCyB/?utm_source=share',
    );
  });
});
