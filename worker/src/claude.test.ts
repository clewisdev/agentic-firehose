import { describe, it, expect, vi } from 'vitest';
import { normaliseSourceType } from './claude.js';

// Guard behaviour for the source_type frontmatter field. This is the template
// for the planned topics-vocabulary guard (plans/kb-dashboard.md Phase 1c):
// map known aliases to canonical, leave unknown values in place with a warning,
// never throw (source_type is organisational, not routing-critical).

const fm = (sourceType: string) =>
  ['---', 'title: "x"', `source_type: ${sourceType}`, 'status: raw', '---'].join('\n');

describe('normaliseSourceType', () => {
  it('maps the thread → post rename', () => {
    expect(normaliseSourceType(fm('thread'))).toContain('source_type: post');
  });

  it('maps the analysis → blog alias', () => {
    expect(normaliseSourceType(fm('analysis'))).toContain('source_type: blog');
  });

  it('leaves an already-canonical value untouched', () => {
    expect(normaliseSourceType(fm('repo'))).toContain('source_type: repo');
  });

  it('leaves an unknown value in place and warns (does not throw)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const out = normaliseSourceType(fm('newfangled'));
    expect(out).toContain('source_type: newfangled');
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it('only rewrites the source_type line, not other frontmatter', () => {
    const out = normaliseSourceType(fm('thread'));
    expect(out).toContain('title: "x"');
    expect(out).toContain('status: raw');
  });
});
