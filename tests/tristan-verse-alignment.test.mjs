import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const tristan = getLibretto("tristan-und-isolde");

function findTurn(actNumber, speaker, opening) {
  for (const scene of tristan.acts[actNumber - 1].scenes) {
    for (const section of scene.sections) {
      const turn = section.turns.find(turn => turn.speaker === speaker &&
        turn.it.includes(opening));
      if (turn) return { scene, section, turn };
    }
  }
  assert.fail(`Missing Act ${actNumber} passage: ${opening}`);
}

test("all Tristan acts retain complete, paired German and English passages", () => {
  assert.deepEqual(tristan.acts.map(act => act.scenes.length), [5, 3, 3]);
  assert.deepEqual(tristan.acts.map(act =>
    act.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns)).length),
    [160, 71, 96]);
  for (const act of tristan.acts) {
    for (const scene of act.scenes) {
      for (const section of scene.sections) {
        for (const turn of section.turns) {
          assert.ok(turn.it.trim() && turn.en.trim(),
            `Act ${act.number}, Scene ${scene.number}: missing bilingual content`);
          assert.equal(turn.it.split("\n").length, turn.en.split("\n").length,
            `Act ${act.number}, Scene ${scene.number}: source/English divisions differ`);
          assert.ok(!turn.it.includes(String.raw`\n`) && !turn.en.includes(String.raw`\n`),
            "Do not store literal backslash-n separators");
        }
      }
      for (const entry of scene.outline || []) {
        assert.ok(scene.sections.some(section => section.turns.some((turn, index) =>
          (entry.sourceTurn == null || entry.sourceTurn === index) &&
          (entry.speaker == null || entry.speaker === turn.speaker) &&
          turn.it.replace(/\n/g, " ").includes(entry.match))),
          `Act ${act.number}, Scene ${scene.number}: unmatched outline ${entry.title}`);
      }
    }
  }
});

test("one source-verified verse passage per act retains its bilingual line pairings", () => {
  // Divisions checked against the German source libretto at
  // https://opera-guide.ch/en/operas/tristan+und+isolde/libretto/de/
  for (const [act, speaker, opening, expected] of [
    [1, "Stimme eines jungen Seemanns", "Westwärts", 14],
    [2, "Beide", "O sink hernieder", 8],
    [3, "Der Hirt", "Kurwenal! He!", 4]
  ]) {
    const { scene, turn } = findTurn(act, speaker, opening);
    assert.equal(turn.it.split("\n").length, expected);
    assert.equal(turn.en.split("\n").length, expected);
    assert.ok(turn.it.split("\n").every(line => line.trim()));
    assert.ok(turn.en.split("\n").every(line => line.trim()));
    globalThis.window = { location: { hash: `#/operas/tristan-und-isolde?act=${act}` } };
    const page = createLibrettoRenderer(tristan).scene(scene.number);
    assert.ok(page.includes("libretto-row--verse-split"),
      `Act ${act}: expected source verse divisions in reader`);
    assert.ok(page.includes(`id="libretto-scene-${act}-${scene.number}"`),
      "Existing scene deep links must be preserved");
  }
});
