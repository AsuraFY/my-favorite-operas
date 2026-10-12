import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const libretto = getLibretto("carmen");

test("Carmen registers all four continuous acts with source musical numbers", () => {
  assert.ok(libretto);
  assert.equal(libretto.continuousAct, true);
  assert.equal(libretto.sceneDivisions, false);
  assert.deepEqual(libretto.acts.map(act => act.originalHeading), [
    "PREMIER ACTE", "DEUXIÈME ACTE", "TROISIÈME ACTE", "QUATRIÈME ACTE"
  ]);
  assert.deepEqual(libretto.acts.map(act => act.scenes[0].sections.map(section => section.number)), [
    ["1", "2", "3", null, null, "4", "5", "6", null, "7", null, "8", null, "9", null, "10", "11", null],
    [null, "12", null, "13", null, "14", null, "15", null, "16", null, "17", "18"],
    [null, "19", null, "20", null, "21", null, "22", null, "23", "24"],
    [null, "25", null, "26", "27"]
  ]);
});

test("Carmen preserves every French turn and aligns each sung or spoken line", () => {
  const expectedTurns = [324, 378, 242, 98];
  const expectedSections = [18, 13, 11, 5];
  for (const [index, act] of libretto.acts.entries()) {
    const scene = act.scenes[0];
    assert.equal(scene.sections.length, expectedSections[index]);
    assert.equal(scene.sections.reduce((count, section) => count + section.turns.length, 0), expectedTurns[index]);
    for (const section of scene.sections) {
      assert.ok(section.type);
      assert.ok(libretto.translatedForms[section.type], `missing English heading for ${section.type}`);
      for (const turn of section.turns) {
        assert.ok(turn.original?.trim(), `empty French text in Act ${index + 1}`);
        assert.ok(turn.translation?.trim(), `empty English text in Act ${index + 1}`);
        if (turn.speaker === libretto.stageDirectionSpeaker) continue;
        assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length, turn.original);
        assert.equal(turn.literalText, true);
        assert.ok(turn.speakerTranslation || libretto.speakerTranslations[turn.speaker], `untranslated speaker ${turn.speaker}`);
      }
    }
  }
});

test("Carmen reader shows a side-by-side continuous act with translated source labels", () => {
  globalThis.window = { location: { hash: "#/operas/carmen?act=1&scene=1&item=6" } };
  const reader = createLibrettoRenderer(libretto);
  const html = reader.scene(1, "", 6);
  assert.match(html, /data-continuous-act="true"/);
  assert.match(html, /data-initial-item="6"/);
  assert.match(html, /class="libretto-row libretto-row--stage-direction"/);
  assert.match(html, /Stage direction/);
  assert.match(html, /No\. 5 · Habanera/);
  assert.match(html, /Love is a rebellious bird/);
  assert.match(html, /L&#39;amour est un oiseau rebelle/);
  assert.ok(!html.includes("Scene I"));
  const outline = reader.outline();
  assert.match(outline, /No\. 27 · Duo et choeur final/);
  assert.match(outline, /Cigarette makers’ chorus/);
  assert.doesNotMatch(outline, /\bCHOEUR\b|\bLES CIGARIÈRES\b/);
  assert.ok(!outline.includes("Scene 1"));
});
