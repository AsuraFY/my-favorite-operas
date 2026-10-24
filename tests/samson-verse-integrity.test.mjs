import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const opera = getLibretto("samson-et-dalila");
const expected = [
  { scenes: 6, sections: 15, passages: 60, directions: 16, shortCues: 8, sungLines: 322 },
  { scenes: 3, sections: 9, passages: 89, directions: 22, shortCues: 15, sungLines: 303 },
  { scenes: 3, sections: 7, passages: 56, directions: 21, shortCues: 12, sungLines: 211 }
];

test("Samson et Dalila retains complete paired text across all three acts", () => {
  assert.deepEqual(opera.acts.map(act => act.number), [1, 2, 3]);
  const escapedNewline = String.fromCharCode(92) + "n";
  let totalPassages = 0;
  let totalSungLines = 0;
  for (const [actIndex, act] of opera.acts.entries()) {
    const scenes = act.scenes;
    const sections = scenes.flatMap(scene => scene.sections);
    const turns = sections.flatMap(section => section.turns);
    const directions = turns.filter(turn => turn.speaker === "Stage direction");
    const sung = turns.filter(turn => turn.speaker !== "Stage direction");

    assert.equal(scenes.length, expected[actIndex].scenes);
    assert.equal(sections.length, expected[actIndex].sections);
    assert.equal(turns.length, expected[actIndex].passages);
    assert.equal(directions.length, expected[actIndex].directions);
    assert.equal(directions.filter(turn => turn.shortCue).length, expected[actIndex].shortCues);
    assert.equal(sung.reduce((n, turn) => n + turn.original.split("\n").length, 0),
      expected[actIndex].sungLines);

    for (const scene of scenes) {
      const routes = new Set();
      for (const [index, section] of scene.sections.entries()) {
        const item = section.routeItem ?? index;
        assert.ok(!routes.has(item), "Duplicate Act " + act.number + " Scene " + scene.number + " item " + item);
        routes.add(item);
        assert.ok(section.originalTitle?.trim() && section.translatedTitle?.trim(),
          "Missing original or English title in Act " + act.number);
        assert.equal(section.participants.length, new Set(section.participants).size,
          "Duplicated participant in Act " + act.number);

        for (const turn of section.turns) {
          const where = "Act " + act.number + " Scene " + scene.number + ": " + turn.speaker;
          assert.ok(turn.original?.trim() && turn.translation?.trim(), where + ": missing bilingual text");
          assert.ok(!turn.original.includes(escapedNewline) && !turn.translation.includes(escapedNewline),
            where + ": escaped newline rendered as text");
          assert.ok(!/[\r\t\uFFFD]/.test(turn.original + turn.translation),
            where + ": malformed whitespace");
          const french = turn.original.split("\n"), english = turn.translation.split("\n");
          assert.equal(french.length, english.length, where + ": unequal bilingual line counts");
          for (let line = 0; line < french.length; line++) {
            assert.equal(Boolean(french[line].trim()), Boolean(english[line].trim()),
              where + ": unmatched stanza position " + (line + 1));
          }
          if (turn.speaker === "Stage direction") {
            assert.equal(turn.bracketStageDirection, Boolean(turn.shortCue),
              where + ": cue versus narrative bracket rule");
          } else {
            assert.ok(turn.speakerTranslation?.trim(), where + ": untranslated speaker");
          }
        }
      }
    }
    totalPassages += turns.length;
    totalSungLines += expected[actIndex].sungLines;
  }
  assert.equal(totalPassages, 205);
  assert.equal(totalSungLines, 836);
});

test("all 31 bilingual Samson outline destinations remain navigable", () => {
  globalThis.window = { location: { hash: "#/operas/samson-et-dalila?view=outline" } };
  const reader = createLibrettoRenderer(opera);
  const full = reader.outline();
  let count = 0;
  for (const act of opera.acts) {
    globalThis.window.location.hash = "#/operas/samson-et-dalila?act=" + act.number;
    const page = reader.scene(1);
    for (const scene of act.scenes) {
      for (const [index, section] of scene.sections.entries()) {
        const item = section.routeItem ?? index;
        const href = "#/operas/samson-et-dalila?act=" + act.number +
          "&scene=" + scene.number + "&item=" + item;
        assert.ok(full.includes('href="' + href + '"'), "Full outline missing " + href);
        assert.ok(page.includes('href="' + href + '"'), "Act outline missing " + href);
        assert.ok(page.includes('id="libretto-section-' + act.number + '-' + scene.number + '-' + item + '"'),
          "Reader anchor missing " + href);
        assert.ok(full.includes(section.translatedTitle), "Missing English full-outline title");
        assert.ok(page.includes(section.translatedTitle), "Missing English act-outline title");
        count++;
      }
    }
  }
  assert.equal(count, 31);
  const ballet = opera.acts[2].scenes.flatMap(scene => scene.sections)
    .find(section => section.originalTitle === "Bacchanale");
  assert.equal(ballet?.instrumental, true);
  assert.equal(ballet.turns.length, 0, "Never invent lyrics for an instrumental section");
});
