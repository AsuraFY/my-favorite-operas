import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const figaro = getLibretto("le-nozze-di-figaro");
const expectedActs = [
  { scenes: 8, sections: 22, passages: 268, directions: 65, sungLines: 516 },
  { scenes: 11, sections: 19, passages: 463, directions: 102, sungLines: 721 },
  { scenes: 14, sections: 21, passages: 278, directions: 66, sungLines: 448 },
  { scenes: 15, sections: 19, passages: 231, directions: 55, sungLines: 452 }
];

test("Figaro keeps every original and translated line across all four acts", () => {
  assert.deepEqual(figaro.acts.map(act => act.number), [1, 2, 3, 4]);
  for (const [index, act] of figaro.acts.entries()) {
    const expected = expectedActs[index];
    const sections = act.scenes.flatMap(scene => scene.sections);
    const turns = sections.flatMap(section => section.turns);
    const directions = turns.filter(turn => turn.speaker === "Stage direction");
    const lyrics = turns.filter(turn => turn.speaker !== "Stage direction");
    assert.equal(act.scenes.length, expected.scenes);
    assert.equal(sections.length, expected.sections);
    assert.equal(turns.length, expected.passages);
    assert.equal(directions.length, expected.directions);
    assert.equal(lyrics.reduce((n, turn) => n + turn.it.split("\n").length, 0),
      expected.sungLines);

    for (const scene of act.scenes) {
      const routes = new Set();
      for (const [sectionIndex, section] of scene.sections.entries()) {
        const item = section.routeItem ?? sectionIndex;
        assert.ok(!routes.has(item),
          "Act " + act.number + ", Scene " + scene.number + ": duplicate section ID " + item);
        routes.add(item);
        for (const turn of section.turns) {
          const context = "Act " + act.number + ", Scene " + scene.number + ", " + turn.speaker;
          assert.ok(turn.it?.trim(), context + ": Italian text missing");
          assert.ok(turn.en?.trim(), context + ": English translation missing");
          assert.ok(!turn.it.includes("\\n") && !turn.en.includes("\\n"),
            context + ": literal escaped newline has replaced a verse division");
          const original = turn.it.split("\n"), english = turn.en.split("\n");
          assert.equal(original.length, english.length, context + ": bilingual line-count mismatch");
          for (let line = 0; line < original.length; line++) {
            assert.equal(original[line].trim() === "", english[line].trim() === "",
              context + ": stanza break mismatch at line " + (line + 1));
          }
        }
      }
    }
  }
});

test("all 81 Figaro sections retain bilingual outline labels and stable destinations", () => {
  globalThis.window = { location: { hash: "#/operas/le-nozze-di-figaro?view=outline" } };
  const reader = createLibrettoRenderer(figaro);
  const outline = reader.outline();
  let checked = 0;
  for (const act of figaro.acts) {
    for (const scene of act.scenes) {
      for (const [index, section] of scene.sections.entries()) {
        const item = section.routeItem ?? index;
        const href = "#/operas/le-nozze-di-figaro?act=" + act.number +
          "&scene=" + scene.number + "&item=" + item;
        assert.ok(outline.includes('href="' + href + '"'), "Missing outline link " + href);
        assert.ok((section.originalTitle || (section.instrumental && section.type))?.trim(),
          "Act " + act.number + ", Scene " + scene.number + ": missing Italian outline title");
        assert.ok(section.translatedTitle?.trim(),
          "Act " + act.number + ", Scene " + scene.number + ": missing English outline title");
        checked++;
      }
    }
  }
  assert.equal(checked, 81);
});
