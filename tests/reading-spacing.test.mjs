import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LINE_SPACING_CHOICES, normalizeLineSpacing, applyReadingSpacing } from "../src/reading-spacing.js";

const root = new URL("../", import.meta.url);

test("reader line-spacing options have the approved multipliers and safe default", () => {
  assert.deepEqual({ ...LINE_SPACING_CHOICES }, { compact: 1.4, comfortable: 1.55, spacious: 1.75 });
  for (const invalid of [null, undefined, "", "unexpected"]) {
    assert.equal(normalizeLineSpacing(invalid), "comfortable");
  }
});

test("changing spacing updates one shared CSS variable for bilingual rows", () => {
  const writes = [];
  const documentRoot = { dataset: {}, style: {
    setProperty: (name, value) => writes.push([name, value])
  } };
  for (const [choice, multiplier] of Object.entries(LINE_SPACING_CHOICES)) {
    assert.equal(applyReadingSpacing(documentRoot, choice), choice);
    assert.equal(documentRoot.dataset.lineSpacing, choice);
    assert.deepEqual(writes.at(-1), ["--libretto-line-height", String(multiplier)]);
  }
  assert.equal(applyReadingSpacing(documentRoot, "invalid"), "comfortable");
  assert.deepEqual(writes.at(-1), ["--libretto-line-height", "1.55"]);
});

test("settings are persistent and CSS targets both libretto cells, not other pages", () => {
  const main = readFileSync(new URL("src/main.js", root), "utf8");
  const css = readFileSync(new URL("styles.css", root), "utf8");
  for (const choice of Object.keys(LINE_SPACING_CHOICES)) {
    assert.ok(main.includes('value="' + choice + '"'), choice);
  }
  assert.ok(main.includes("favorite-operas-line-spacing"));
  assert.ok(main.includes("saveChoice(LINE_SPACING_PREFERENCE_KEY, activeLineSpacing)"));
  assert.ok(main.includes("applyReadingSpacing(document.documentElement, activeLineSpacing)"));
  assert.ok(main.includes("data-line-spacing-picker"));
  assert.match(css, /\.opera-reading-page \.libretto-row \.libretto-cell p\s*\{\s*line-height:\s*var\(--libretto-line-height, 1\.55\)/);
});
