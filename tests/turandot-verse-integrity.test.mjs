import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const turandot = getLibretto("turandot");

test("all three Turandot acts retain all translated lines and valid source verse breaks", () => {
  const expected = [
    { passages: 265, directions: 55, sungLines: 436, sections: 7 },
    { passages: 218, directions: 68, sungLines: 346, sections: 6 },
    { passages: 243, directions: 77, sungLines: 332, sections: 7 }
  ];
  assert.deepEqual(turandot.acts.map(act => act.scenes.length), [1, 1, 1]);
  let nextNumber = 1;
  for (const [index, act] of turandot.acts.entries()) {
    const sections = act.scenes.flatMap(scene => scene.sections);
    const turns = sections.flatMap(section => section.turns);
    const stage = turns.filter(turn => turn.speaker === "Stage direction");
    const sung = turns.filter(turn => turn.speaker !== "Stage direction");
    assert.equal(sections.length, expected[index].sections);
    assert.equal(turns.length, expected[index].passages);
    assert.equal(stage.length, expected[index].directions);
    assert.equal(sung.reduce((sum, turn) => sum + turn.it.split("\n").length, 0),
      expected[index].sungLines);

    for (const section of sections) {
      assert.equal(section.number, nextNumber++, "preserve source section numbering");
      assert.ok(section.originalTitle?.trim(), "each section needs an Italian title");
      assert.ok(section.translatedTitle?.trim(), "each section needs an English title");

      for (const turn of section.turns) {
        const context = "Act " + act.number + ", N. " + section.number + ", " + turn.speaker;
        assert.ok(turn.it?.trim() && turn.en?.trim(), context + ": missing text");
        assert.ok(!turn.it.includes("\\n") && !turn.en.includes("\\n"),
          context + ": literal escape sequence instead of source newline");
        const original = turn.it.split("\n"), english = turn.en.split("\n");
        assert.equal(original.length, english.length, context + ": unmatched bilingual line count");
        for (let line = 0; line < original.length; line++) {
          assert.ok(original[line].trim() && english[line].trim(),
            context + ": empty or unmatched verse at line " + (line + 1));
          assert.equal(original[line], original[line].trim(), context + ": Italian whitespace");
          assert.equal(english[line], english[line].trim(), context + ": English whitespace");
        }
      }
    }
  }
  assert.equal(nextNumber, 21, "exactly 20 numbered source sections");
});

test("N. 14 retains the requested Nessun dorma aria title and its original form", () => {
  const number14 = turandot.acts[2].scenes[0].sections[0];
  assert.equal(number14.number, 14);
  assert.equal(number14.type, "Introduzione e Romanza");
  assert.equal(number14.displayType, "Aria");
  assert.equal(number14.originalTitle, "Nessun dorma!");
  assert.equal(number14.translatedTitle, "Let no one sleep!");
  globalThis.window = { location: { hash: "#/operas/turandot?act=3" } };
  const reader = createLibrettoRenderer(turandot);
  const page = reader.scene(1);
  assert.ok(page.includes('id="libretto-section-3-1-0"'));
  assert.ok(page.includes("Nessun dorma!"));
  assert.ok(page.includes("Let no one sleep!"));
  const outline = reader.outline();
  assert.ok(outline.includes('href="#/operas/turandot?act=3&scene=1&item=0"'));
});
