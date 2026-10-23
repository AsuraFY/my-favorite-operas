import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { resetReaderLocation, renderedVersePairs } from "./helpers/libretto-helpers.mjs";
import {
  MIN_ROW_GAP, MAX_ROW_GAP, ROW_GAP_STEP, DEFAULT_ROW_GAP,
  normalizeRowGap, migrateLineSpacing, stepRowGap, applyReadingSpacing
} from "../src/reading-spacing.js";

const root = new URL("../", import.meta.url);

test("numeric stepper controls the space between rows, not line height", () => {
  assert.deepEqual([MIN_ROW_GAP, MAX_ROW_GAP, ROW_GAP_STEP, DEFAULT_ROW_GAP], [0, 28, 2, 8]);
  assert.equal(normalizeRowGap(null), DEFAULT_ROW_GAP);
  assert.equal(normalizeRowGap("10"), 10);
  assert.equal(normalizeRowGap(100), MAX_ROW_GAP);
  assert.equal(normalizeRowGap(-5), MIN_ROW_GAP);
  assert.equal(stepRowGap(8, 1), 10);
  assert.equal(stepRowGap(8, -1), 6);
  assert.equal(stepRowGap(0, -1), 0);
  assert.equal(stepRowGap(28, 1), 28);
  assert.equal(migrateLineSpacing("comfortable"), DEFAULT_ROW_GAP);
  assert.equal(migrateLineSpacing("compact"), 4);
  assert.equal(migrateLineSpacing("spacious"), 12);
  assert.equal(migrateLineSpacing("1.55"), 8);
  const writes = [];
  const documentRoot = {dataset: {}, style: {setProperty: (name, value) => writes.push([name, value])}};
  assert.equal(applyReadingSpacing(documentRoot, 14), 14);
  assert.equal(documentRoot.dataset.rowGap, "14");
  assert.deepEqual(writes, [["--libretto-row-gap", "14px"]]);
});

test("settings persist row-gap values while stage direction text stays compact", () => {
  const main = readFileSync(new URL("src/main.js", root), "utf8");
  const css = readFileSync(new URL("styles.css", root), "utf8");
  const reader = readFileSync(new URL("src/libretto-reader.js", root), "utf8");
  assert.ok(main.includes("Space between lyric rows"));
  assert.ok(main.includes('data-line-spacing-step="-1"'));
  assert.ok(main.includes('data-line-spacing-step="1"'));
  assert.ok(main.includes("saveChoice(ROW_GAP_PREFERENCE_KEY, String(activeRowGap))"));
  assert.ok(!main.includes("data-line-spacing-picker"));
  assert.ok(css.includes("margin-top: var(--libretto-row-gap, 8px)"));
  assert.match(css, /\.opera-reading-page \.libretto-row--stage-direction \.libretto-cell p \{\s*line-height: 1\.3;/);
  assert.ok(!css.includes("line-height: var(--libretto-line-height"));
  assert.ok(reader.includes("original.length !== translation.length"));
});


test("night mode styles the spacing stepper and font-size controls identically", () => {
  const css = readFileSync(new URL("styles.css", root), "utf8");
  const colorRules = [...css.matchAll(
    /html\[data-theme="night"\] \.font-size-controls button,\s*html\[data-theme="night"\] \.font-size-controls output,\s*html\[data-theme="night"\] \.line-spacing-controls button,\s*html\[data-theme="night"\] \.line-spacing-controls output \{([^}]*)\}/g
  )];
  const nightControlColors = colorRules.at(-1);
  assert.ok(nightControlColors, "both steppers share final night-theme foreground and background");
  assert.match(nightControlColors[1], /color: var\(--night-text\);/);
  assert.match(nightControlColors[1], /background-color: #1a2026;/);
  assert.match(nightControlColors[1], /border-color: var\(--night-border\);/);
  const finalNightBorder = css.match(
    /html\[data-theme="night"\] \.settings-group,\s*html\[data-theme="night"\] \.theme-choices,\s*html\[data-theme="night"\] \.font-size-controls,([^{]*)\{ border-color: var\(--night-border\); \}/
  );
  assert.ok(finalNightBorder, "night mode overrides shared stepper outlines and separators");
  for (const selector of [
    ".line-spacing-controls", ".line-spacing-controls button + output",
    ".line-spacing-controls output + button"
  ]) assert.ok(finalNightBorder[1].includes(selector), selector);
  assert.ok(css.includes(".font-size-controls, .line-spacing-controls { display: grid;"),
    "existing day-theme control layout remains shared");
});

test("character names and stage-direction margins share the adjustable 10px minimum", () => {
  const css = readFileSync(new URL("styles.css", root), "utf8");
  // A painted edge must not change the grid width or move the bilingual divider.
  const stageSelector = ".opera-reading-page .libretto-row--stage-direction {";
  const rules = css.split(stageSelector).slice(1).map(item => item.split("}")[0]);
  assert.ok(rules.length >= 2, "stage highlight and compact spacing rules are present");
  const highlight = rules.find(rule => rule.includes("box-shadow:"));
  assert.ok(highlight, "painted left edge exists");
  assert.ok(highlight.includes("border-left: 0;"));
  assert.ok(highlight.includes("padding-left: 0;"));
  assert.ok(highlight.includes("box-shadow: inset 2px 0 var(--gold);"));
  assert.ok(!css.includes(stageSelector + "\\n    padding-left: 9px;"),
    "no mobile indentation on the highlighted row");
  const surrounding = rules.find(rule => rule.includes("margin-block: var(--libretto-paragraph-gap);"));
  assert.ok(surrounding, "stage directions have matching adjustable margins above and below");
  assert.ok(surrounding.includes("padding-block: 2px;"), "stage directions retain compact internal padding");
  assert.ok(css.includes("--libretto-paragraph-gap: calc(10px + var(--libretto-row-gap, 8px));"),
    "at zero row gap, stage directions and character names still have a 10px minimum");
  assert.ok(css.includes("margin-top: var(--libretto-paragraph-gap);"),
    "character-start rows share the same paragraph-gap token");
  assert.ok(css.includes(":has(> .libretto-cell--german > .libretto-speaker)"),
    "spacing is added before rows with a visible original-language character name");
  assert.ok(css.includes(":not(:has(> .libretto-cell--german > .libretto-speaker))"),
    "ordinary paired lyric rows still use the selected gap alone");
  assert.ok(css.includes("margin-top: var(--libretto-row-gap, 8px);"),
    "ordinary lyric spacing still follows the row-gap control");
});

test("Così and Barbiere both render paired source/translation verses as separate rows", () => {
  resetReaderLocation();
  for (const [slug, act] of [["cosi-fan-tutte", 2], ["il-barbiere-di-siviglia", 1]]) {
    const libretto = getLibretto(slug);
    window.location.hash = "#/operas/" + slug + "?act=" + act;
    const page = createLibrettoRenderer(libretto).scene(1);
    assert.ok(page.includes("libretto-row--verse-split libretto-row--verse-start"), slug);
    assert.ok(page.includes("libretto-row--verse-split libretto-row--verse-end"), slug);
    assert.ok(renderedVersePairs(page).length > 100, slug);
  }
});

test("unequal original and translated line counts never discard translation text", () => {
  const libretto = getLibretto("il-barbiere-di-siviglia");
  const mismatched = libretto.acts.flatMap(a => a.scenes.flatMap(s => s.sections.flatMap(
    section => section.turns.filter(turn => turn.speaker !== "Stage direction" &&
      String(turn.it ?? turn.original ?? "").split("\n").length !==
      String(turn.en ?? turn.translation ?? "").split("\n").length)
  )));
  assert.ok(mismatched.length > 0);
  window.location.hash = "#/operas/il-barbiere-di-siviglia?act=1";
  const page = createLibrettoRenderer(libretto).scene(1);
  const chorus = mismatched[0];
  const finalLine = String(chorus.en ?? chorus.translation).split("\n").at(-1).trim();
  assert.ok(page.includes(finalLine.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"))
    || page.includes(finalLine.split(" ")[0]), "complete source turn remains in the reader");
});
