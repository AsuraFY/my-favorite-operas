import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const butterfly = getLibretto("madama-butterfly");
const expected = [
  { sections: 15, passages: 325, stageDirections: 41, sungLines: 563 },
  { sections: 9, passages: 197, stageDirections: 25, sungLines: 402 },
  { sections: 10, passages: 115, stageDirections: 23, sungLines: 216 }
];

test("all three Butterfly acts preserve original and English line pairings", () => {
  assert.deepEqual(butterfly.acts.map(act => act.number), [1, 2, 3]);
  const escapedNewline = String.fromCharCode(92) + "n";
  for (const [index, act] of butterfly.acts.entries()) {
    assert.equal(act.scenes.length, 1);
    const sections = act.scenes[0].sections;
    const turns = sections.flatMap(section => section.turns);
    const directions = turns.filter(turn => turn.speaker === "Stage direction");
    const lyrics = turns.filter(turn => turn.speaker !== "Stage direction");
    assert.equal(sections.length, expected[index].sections);
    assert.equal(turns.length, expected[index].passages);
    assert.equal(directions.length, expected[index].stageDirections);
    assert.equal(lyrics.reduce((n, turn) => n + turn.original.split("\n").length, 0),
      expected[index].sungLines);

    for (const section of sections) {
      for (const turn of section.turns) {
        const location = "Act " + act.number + ", " + turn.speaker;
        assert.ok(turn.original?.trim(), location + ": missing Italian");
        assert.ok(turn.translation?.trim(), location + ": missing English");
        assert.ok(!turn.original.includes(escapedNewline) &&
          !turn.translation.includes(escapedNewline),
          location + ": literal backslash-n instead of actual line breaks");
        assert.ok(!/[\r\t\uFFFD]/.test(turn.original + turn.translation),
          location + ": bad whitespace or replacement character");
        const original = turn.original.split("\n");
        const english = turn.translation.split("\n");
        assert.equal(original.length, english.length,
          location + ": original/translation line counts differ");
        for (let line = 0; line < original.length; line++) {
          assert.equal(original[line].trim() === "", english[line].trim() === "",
            location + ": unmatched stanza break at line " + (line + 1));
        }
        if (turn.speaker === "Stage direction") {
          if (turn.shortCue) {
            assert.equal(turn.bracketStageDirection, true,
              location + ": compact cue should be bracketed");
          } else {
            assert.notEqual(turn.bracketStageDirection, true,
              location + ": long narrative direction should not be bracketed");
          }
        }
      }
    }
  }
});

test("all 34 Butterfly sections keep bilingual headings and stable full/act outline links", () => {
  globalThis.window = { location: { hash: "#/operas/madama-butterfly?view=outline" } };
  const reader = createLibrettoRenderer(butterfly);
  const complete = reader.outline();
  let count = 0;
  for (const act of butterfly.acts) {
    window.location.hash = "#/operas/madama-butterfly?act=" + act.number;
    const page = reader.scene(1);
    const seen = new Set();
    for (const [index, section] of act.scenes[0].sections.entries()) {
      const item = section.routeItem ?? index;
      assert.ok(!seen.has(item), "Duplicate Act " + act.number + " item " + item);
      seen.add(item);
      assert.ok(section.originalTitle?.trim(), "Missing Italian outline title");
      assert.ok(section.translatedTitle?.trim(), "Missing English outline title");
      const href = "#/operas/madama-butterfly?act=" + act.number + "&scene=1&item=" + item;
      assert.ok(complete.includes('href="' + href + '"'), "Full outline missing " + href);
      assert.ok(page.includes('href="' + href + '"'), "Act outline missing " + href);
      assert.ok(page.includes('id="libretto-section-' + act.number + '-1-' + item + '"'),
        "Reader target missing: " + href);
      count++;
    }
  }
  assert.equal(count, 34);
});
