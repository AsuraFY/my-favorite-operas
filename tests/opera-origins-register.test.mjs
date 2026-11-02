import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {join} from 'node:path';

test('all 35 active opera bundles point to the canonical Markdown origins register', () => {
  const base = new URL('../src/data/operas/librettos/', import.meta.url);
  const slugs = readdirSync(base, {withFileTypes: true})
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter(slug => {
      try { return readFileSync(new URL(slug + '/bundle.js', base), 'utf8').length > 0; }
      catch { return false; }
    });
  assert.equal(slugs.length, 35);
  const origins = readFileSync(new URL('../docs/info/operas-origins.md', import.meta.url), 'utf8');
  for (const slug of slugs) {
    const bundle = readFileSync(new URL(slug + '/bundle.js', base), 'utf8');
    assert.ok(bundle.includes('Original libretto and English translation provenance: docs/info/operas-origins.md'), slug);
    assert.ok(origins.includes('<a id="' + slug + '"></a>'), slug + ' missing in register');
  }
  assert.equal((origins.match(/^\- \*\*Original libretto source:/gm) || []).length, 35);
  assert.equal((origins.match(/^\- \*\*English translation source:/gm) || []).length, 35);
  assert.equal((origins.match(/^\- \*\*Brief summary:/gm) || []).length, 35);
});
