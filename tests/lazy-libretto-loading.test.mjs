import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getLibretto, librettoCatalog } from "../src/data/libretto-registry.js";
import { hasCompleteLibretto, loadLibretto } from "../src/data/libretto-loader.js";

test("all complete opera routes load equivalent text and metadata from their own modules", async () => {
  assert.ok(librettoCatalog.length >= 12, 'compatibility registry preserves original libretti');
  for (const expected of librettoCatalog) {
    assert.ok(hasCompleteLibretto(expected.slug), expected.slug);
    const loaded = await loadLibretto(expected.slug);
    assert.deepEqual(loaded, getLibretto(expected.slug), expected.slug + ": independent ESM version query objects agree structurally");
    assert.ok(loaded.acts.every(act => act.scenes.length), expected.slug);
    assert.equal(await loadLibretto(expected.slug), loaded, "reuse cached opera data");
  }
  assert.equal(hasCompleteLibretto("unknown-opera"), false);
  assert.equal(await loadLibretto("unknown-opera"), null);
});

test("the browser entry point does not statically load every complete opera", () => {
  const read = path => readFileSync(new URL(path, import.meta.url), "utf8");
  const main = read("../src/main.js");
  const loader = read("../src/data/libretto-loader.js");
  assert.ok(main.includes('import { hasCompleteLibretto, loadLibretto }'));
  assert.ok(!main.includes('from "./data/libretto-registry.js'), "main must not import the eager compatibility registry");
  assert.ok(main.includes("await loadLibretto(opera.slug)"));
  assert.ok(main.includes("if (renderId !== activeRenderId) return"), "stale navigation is ignored");
  assert.ok(main.includes('data-retry-libretto'), "failed opera imports can retry");
  assert.ok((loader.match(/: \(\) => import\(/g) || []).length >= librettoCatalog.length, "on-demand loader covers compatibility libretti");
  assert.ok(!/^import\s/m.test(loader), "loader must have no static imports");
  for (const name of ["cosi-fan-tutte", "le-nozze-di-figaro", "samson-et-dalila", "nabucco"]) {
    assert.ok(loader.includes('./libretto-' + name + '-bundle.js'), name);
  }
});
