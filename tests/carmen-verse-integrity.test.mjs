import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const carmen = getLibretto("carmen");
const expected = [
  { passages: 331, directions: 100, sungLines: 523, sections: 20 },
  { passages: 387, directions: 82, sungLines: 567, sections: 14 },
  { passages: 244, directions: 54, sungLines: 411, sections: 12 },
  { passages: 101, directions: 25, sungLines: 231, sections: 5 }
];

test("Carmen retains translated verses, stage directions and complete source passages", () => {
  assert.deepEqual(carmen.acts.map(act => act.scenes.length), [1, 1, 1, 1]);
  for (const [index, act] of carmen.acts.entries()) {
    const sections = act.scenes.flatMap(scene => scene.sections);
    const turns = sections.flatMap(section => section.turns);
    const directions = turns.filter(turn => turn.speaker === "Stage direction");
    const spoken = turns.filter(turn => turn.speaker !== "Stage direction");
    assert.equal(sections.length, expected[index].sections);
    assert.equal(turns.length, expected[index].passages);
    assert.equal(directions.length, expected[index].directions);
    assert.equal(spoken.reduce((n, turn) => n + turn.original.split("\n").length, 0),
      expected[index].sungLines);

    for (const turn of turns) {
      const where = "Act " + act.number + ", " + turn.speaker;
      assert.ok(turn.original?.trim(), where + ": missing French text");
      assert.ok(turn.translation?.trim(), where + ": missing English text");
      const escapedNewline = String.fromCharCode(92) + "n";
      assert.ok(!turn.original.includes(escapedNewline) &&
        !turn.translation.includes(escapedNewline), where + ": literal escaped newline");
      assert.ok(!/[\t\r\uFFFD]/.test(turn.original + turn.translation),
        where + ": malformed whitespace or replacement character");
      const french = turn.original.split("\n");
      const english = turn.translation.split("\n");
      assert.equal(french.length, english.length, where + ": bilingual line mismatch");
      for (let line = 0; line < french.length; line++) {
        assert.equal(french[line].trim() === "", english[line].trim() === "",
          where + ": mismatched stanza boundary at line " + (line + 1));
      }
      if (turn.speaker === "Stage direction" && turn.shortCue) {
        assert.notEqual(turn.bracketStageDirection, false,
          where + ": compact stage direction should be bracketed");
      }
    }
  }
});

test("Carmen's 51 section destinations, including Act I's preserved IDs, still resolve", () => {
  globalThis.window = { location: { hash: "#/operas/carmen?view=outline" } };
  const html = createLibrettoRenderer(carmen).outline();
  let total = 0;
  for (const act of carmen.acts) {
    for (const scene of act.scenes) {
      const used = new Set();
      for (const [idx, section] of scene.sections.entries()) {
        const item = section.routeItem ?? idx;
        assert.ok(!used.has(item), "Act " + act.number + ": duplicate item " + item);
        used.add(item);
        const href = "#/operas/carmen?act=" + act.number +
          "&scene=" + scene.number + "&item=" + item;
        assert.ok(html.includes('href="' + href + '"'), "Missing link: " + href);
        assert.ok(section.instrumental || section.originalTitle?.trim(),
          "Act " + act.number + ": French section title missing");
        assert.ok(section.instrumental || section.translatedTitle?.trim(),
          "Act " + act.number + ": English section title missing");
        total++;
      }
    }
  }
  assert.equal(total, 51);
  assert.deepEqual(carmen.acts[0].scenes[0].sections.slice(0,4).map(s => s.routeItem),
    [0, 1, 18, 2]);
});

test("Carmen's Navarre dialogue contains no escaped tab after née", () => {
  const turn = carmen.acts[0].scenes[0].sections.flatMap(section => section.turns)
    .find(t => t.speaker === "CARMEN" && t.original.startsWith("Oui, c'est là que je suis née"));
  assert.ok(turn);
  assert.ok(turn.original.includes("née… J'ai été emmenée"));
  assert.ok(!turn.original.includes("\t"));
  assert.ok(turn.translation.includes("I was brought to Seville"));
});
