import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { resetReaderLocation } from "./helpers/libretto-helpers.mjs";
import {
  MIN_LINE_SPACING, MAX_LINE_SPACING, LINE_SPACING_STEP,
  DEFAULT_LINE_SPACING, normalizeLineSpacing, stepLineSpacing, applyReadingSpacing
} from "../src/reading-spacing.js";

const root = new URL("../", import.meta.url);

test("numeric line-height respects range, steps and stored legacy presets", () => {
  assert.equal(MIN_LINE_SPACING, 1.2);
  assert.equal(MAX_LINE_SPACING, 2.6);
  assert.equal(LINE_SPACING_STEP, 0.05);
  assert.equal(DEFAULT_LINE_SPACING, 1.55);
  for (const [choice, expected] of Object.entries({compact: 1.4, comfortable: 1.55, spacious: 1.75})) {
    assert.equal(normalizeLineSpacing(choice), expected);
  }
  for (const invalid of [null, undefined, "", "unexpected", NaN]) {
    assert.equal(normalizeLineSpacing(invalid), DEFAULT_LINE_SPACING);
  }
  assert.equal(normalizeLineSpacing(0.7), MIN_LINE_SPACING);
  assert.equal(normalizeLineSpacing(3.1), MAX_LINE_SPACING);
  assert.equal(stepLineSpacing(1.55, 1), 1.6);
  assert.equal(stepLineSpacing(1.55, -1), 1.5);
  assert.equal(stepLineSpacing(MIN_LINE_SPACING, -1), MIN_LINE_SPACING);
  assert.equal(stepLineSpacing(MAX_LINE_SPACING, 1), MAX_LINE_SPACING);
});

test("one numerical setting updates the shared line height for both languages", () => {
  const writes = [];
  const root = { dataset: {}, style: {
    setProperty: (name, value) => writes.push([name, value])
  } };
  for (const height of [1.2, 1.4, 1.55, 2.1, 2.6]) {
    assert.equal(applyReadingSpacing(root, height), height);
    assert.equal(root.dataset.lineSpacing, height.toFixed(2));
    assert.deepEqual(writes.at(-1), ["--libretto-line-height", height.toFixed(2)]);
  }
});

test("numeric controls persist the selection and unify split verses without affecting other pages", () => {
  const main = readFileSync(new URL("src/main.js", root), "utf8");
  const css = readFileSync(new URL("styles.css", root), "utf8");
  const reader = readFileSync(new URL("src/libretto-reader.js", root), "utf8");
  assert.ok(main.includes('data-line-spacing-step="-1"'));
  assert.ok(main.includes('data-line-spacing-step="1"'));
  assert.ok(main.includes('data-line-spacing-value'));
  assert.ok(main.includes("saveChoice(LINE_SPACING_PREFERENCE_KEY, activeLineSpacing.toFixed(2))"));
  assert.ok(main.includes("stepLineSpacing(activeLineSpacing"));
  assert.ok(!main.includes("data-line-spacing-picker"));
  assert.match(css, /\.opera-reading-page \.libretto-row \.libretto-cell p\s*\{\s*line-height:\s*var\(--libretto-line-height, 1\.55\)/);
  assert.ok(css.includes(".libretto-row--verse-split:not(.libretto-row--verse-start)"));
  assert.ok(css.includes(".libretto-row--verse-split:not(.libretto-row--verse-end)"));
  assert.ok(reader.includes("verseLineCount: original.length"));
});

test("Così split lyric lines retain bilingual pairing while Barbiere keeps compact grouped turns", () => {
  resetReaderLocation();
  const cosi = getLibretto("cosi-fan-tutte");
  const barbiere = getLibretto("il-barbiere-di-siviglia");
  const cosiReader = createLibrettoRenderer(cosi);
  const barbiereReader = createLibrettoRenderer(barbiere);
  window.location.hash = "#/operas/cosi-fan-tutte?act=2";
  const cosiPage = cosiReader.scene(1);
  assert.ok(cosiPage.includes('libretto-row--verse-split libretto-row--verse-start'));
  assert.ok(cosiPage.includes('libretto-row--verse-split libretto-row--verse-end'));
  assert.ok(cosiPage.includes('libretto-row--verse-split"><div class="libretto-cell'));
  window.location.hash = "#/operas/il-barbiere-di-siviglia?act=1";
  const barbierePage = barbiereReader.scene(1);
  assert.ok(!barbierePage.includes('libretto-row--verse-split'));
  assert.ok(barbierePage.includes('<div class="libretto-row"><div class="libretto-cell'));
});
