import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const tosca = getLibretto("tosca");
const expected = [
  { scenes: 9, turns: 397, sungLines: 453, stage: 167, shortCues: 110, outline: 16 },
  { scenes: 5, turns: 289, sungLines: 427, stage: 66, shortCues: 23, outline: 17 },
  { scenes: 4, turns: 92, sungLines: 166, stage: 32, shortCues: 7, outline: 11 }
];

test("Tosca keeps its three acts and complete paired lyric and direction text", () => {
  assert.deepEqual(tosca.acts.map(act => act.number), [1, 2, 3]);
  const escapedNewline = String.fromCharCode(92) + "n";
  for (const [index, act] of tosca.acts.entries()) {
    const scenes = act.scenes, turns = scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
    const stage = turns.filter(turn => turn.speaker === "Stage direction");
    const sung = turns.filter(turn => turn.speaker !== "Stage direction");
    assert.equal(scenes.length, expected[index].scenes);
    assert.equal(turns.length, expected[index].turns);
    assert.equal(stage.length, expected[index].stage);
    assert.equal(stage.filter(turn => turn.shortCue).length, expected[index].shortCues);
    assert.equal(sung.reduce((n, turn) => n + turn.original.split("\n").length, 0),
      expected[index].sungLines);

    for (const scene of scenes) for (const section of scene.sections) for (const turn of section.turns) {
      const where = "Act " + act.number + " Scene " + scene.number + " " + turn.speaker;
      assert.ok(turn.original?.trim(), where + ": missing Italian");
      assert.ok(turn.translation?.trim(), where + ": missing English");
      assert.ok(!turn.original.includes(escapedNewline) &&
        !turn.translation.includes(escapedNewline), where + ": literal escaped newline");
      assert.ok(!/[\t\r\uFFFD]/.test(turn.original + turn.translation),
        where + ": malformed whitespace");
      const lines = turn.original.split("\n"), english = turn.translation.split("\n");
      assert.equal(lines.length, english.length, where + ": unmatched verse count");
      for (let i = 0; i < lines.length; i++)
        assert.equal(Boolean(lines[i].trim()), Boolean(english[i].trim()), where + ": unmatched stanza boundary");
    }
  }
});

test("every Tosca outline passage retains one exact bilingual and navigable source target", () => {
  globalThis.window = { location: { hash: "#/operas/tosca?view=outline" } };
  const reader = createLibrettoRenderer(tosca);
  const fullOutline = reader.outline();
  let total = 0;
  for (const [index, act] of tosca.acts.entries()) {
    window.location.hash = "#/operas/tosca?act=" + act.number;
    const page = reader.scene(1);
    let actEntries = 0;
    for (const scene of act.scenes) {
      for (const entry of scene.outline || []) {
        assert.ok(entry.title?.trim() && entry.translation?.trim(),
          "Missing bilingual outline heading in Act " + act.number);
        const matches = scene.sections.flatMap((section, secIndex) =>
          section.turns.flatMap((turn, turnIndex) =>
            (entry.sourceTurn == null || entry.sourceTurn === turnIndex) &&
            (entry.speaker == null || entry.speaker === turn.speaker) &&
            turn.original.includes(entry.match) ? [{ secIndex, turnIndex }] : []));
        assert.equal(matches.length, 1,
          "Ambiguous or missing outline source: Act " + act.number + " " + entry.title);
        const target = matches[0];
        const href = "#/operas/tosca?act=" + act.number + "&scene=" +
          scene.number + "&item=" + target.secIndex + "&turn=" + target.turnIndex;
        assert.ok(fullOutline.includes('href="' + href + '"'),
          "Missing complete-outline link: " + href);
        assert.ok(page.includes('href="' + href + '"'),
          "Missing act-outline link: " + href);
        assert.ok(page.includes(entry.translation + "</span>"),
          "Missing English second line in reader: " + entry.title);
        actEntries++; total++;
      }
    }
    assert.equal(actEntries, expected[index].outline);
  }
  assert.equal(total, 44);
});

test("Act I's repeated Mia gelosa! incipit remains anchored to its first occurrence", () => {
  const scene = tosca.acts[0].scenes[4];
  const entry = scene.outline.find(entry => entry.title === "Mia gelosa!");
  assert.ok(entry);
  assert.equal(entry.speaker, "Cavaradossi");
  assert.equal(entry.sourceTurn, 86);
  assert.equal(scene.sections[0].turns[86].original, "Mia gelosa!");
  assert.equal(scene.sections[0].turns[88].original, "Mia gelosa!");
  globalThis.window = { location: { hash: "#/operas/tosca?act=1&scene=5" } };
  const page = createLibrettoRenderer(tosca).scene(5);
  assert.ok(page.includes('href="#/operas/tosca?act=1&scene=5&item=0&turn=86"'));
  assert.ok(page.includes('id="libretto-turn-1-5-0-86"'));
});
