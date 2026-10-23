import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const macbeth = getLibretto("macbeth");

test("all four Macbeth acts keep every original and translated lyric/direction passage intact", () => {
  assert.deepEqual(macbeth.acts.map(act => act.scenes.length), [19, 7, 4, 11]);
  const expectedPassageCounts = [154, 91, 91, 91];
  for (const [actIndex, act] of macbeth.acts.entries()) {
    const turns = act.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
    assert.equal(turns.length, expectedPassageCounts[actIndex]);
    for (const scene of act.scenes) for (const section of scene.sections) for (const turn of section.turns) {
      const context = `Act ${act.number}, Scene ${scene.number}, ${turn.speaker}`;
      assert.ok(turn.it?.trim(), `${context}: missing original`);
      assert.ok(turn.en?.trim(), `${context}: missing English translation`);
      assert.equal(turn.it.split("\n").length, turn.en.split("\n").length,
        `${context}: original/English line counts must match`);
      assert.ok(!turn.it.includes(String.raw`\n`) && !turn.en.includes(String.raw`\n`),
        `${context}: literal backslash-n must not replace actual verse breaks`);
      const original = turn.it.split("\n");
      const translated = turn.en.split("\n");
      for (let i = 0; i < original.length; i++) {
        assert.equal(original[i].trim() === "", translated[i].trim() === "",
          `${context}: stanza division at line ${i + 1} differs`);
      }
    }
  }
});

test("Act IV retains the distinct 1847 alternative in Scene IX without shifting routes", () => {
  const act = macbeth.acts[3];
  const scene = act.scenes.find(scene => scene.number === 9);
  assert.ok(scene);
  assert.equal(scene.sections.length, 2);
  const [standard, alternative] = scene.sections;
  assert.equal(standard.routeItem, 0);
  assert.equal(alternative.routeItem, 1);
  assert.equal(alternative.originalTitle, "Scena alternativa — 1847");
  assert.equal(alternative.translatedTitle, "Alternative scene — 1847");
  const deathVerse = alternative.turns.find(turn => turn.speaker === "Macbeth");
  assert.equal(deathVerse.it.split("\n").length, 8);
  assert.equal(deathVerse.en.split("\n").length, 8);
  globalThis.window = { location: { hash: "#/operas/macbeth?act=4&scene=9&item=1" } };
  const reader = createLibrettoRenderer(macbeth);
  const page = reader.scene(9, "", 1);
  const standardAnchor = page.indexOf('id="libretto-section-4-9-0"');
  const altAnchor = page.indexOf('id="libretto-section-4-9-1"');
  const nextAnchor = page.indexOf('id="libretto-section-4-10-0"');
  assert.ok(standardAnchor >= 0 && standardAnchor < altAnchor && altAnchor < nextAnchor);
  assert.ok(page.includes('href="#/operas/macbeth?act=4&scene=9&item=1"'),
    "the alternative must remain directly navigable");
});
