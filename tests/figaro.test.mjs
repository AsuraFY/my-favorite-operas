import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

globalThis.window = { location: { hash: "" } };
const figaro = getLibretto("le-nozze-di-figaro");
const act = figaro.acts[0];
const turns = act.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
const decode = text => text.replace(/&(amp|lt|gt|quot|#39);/g,
  (_, entity) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'" })[entity]);

test("Figaro Act I retains eight scenes, ten source numbers and complete paired verses", () => {
  assert.deepEqual(act.scenes.map(scene => scene.number), [1, 2, 3, 4, 5, 6, 7, 8]);
  const sections = act.scenes.flatMap(scene => scene.sections);
  assert.equal(sections.length, 21);
  assert.deepEqual(sections.filter(section => section.number).map(section => section.number),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(sections.filter(section => section.number).map(section => section.type),
    ["Duettino", "Duettino", "Cavatina", "Aria", "Duettino", "Aria", "Terzetto", "Coro", "Coro", "Aria"]);
  let lines = 0, directions = 0;
  for (const turn of turns) {
    assert.ok(turn.it.trim() && turn.en.trim());
    if (turn.speaker === "Stage direction") directions++;
    else {
      assert.equal(turn.literalText, true, "sung asides are not stage directions");
      assert.equal(turn.it.split("\n").length, turn.en.split("\n").length);
      lines += turn.it.split("\n").length;
    }
  }
  assert.equal(lines, 516);
  assert.equal(directions, 67);
  assert.ok(turns.find(turn => turn.speaker === "Il Conte").speakerTranslation === "The Count");
  assert.ok(turns.find(turn => turn.speaker === "Coro").speakerTranslation === "Chorus");
  assert.ok(turns.find(turn => turn.speaker === "Tutti").speakerTranslation === "All");
  assert.ok(turns.some(turn => turn.it.includes("(Avrei pur gusto\n")));
  assert.equal(turns.at(-1).it, "Partono tutti alla militare.");
});

test("Figaro renders each source line beside its own English line in source order", () => {
  window.location.hash = "#/operas/le-nozze-di-figaro?act=1";
  const page = createLibrettoRenderer(figaro).scene(1);
  const pairs = [...page.matchAll(/<div class="libretto-row([^"]*)"><div class="libretto-cell libretto-cell--german">.*?<p>(.*?)<\/p><\/div><div class="libretto-cell libretto-cell--english">.*?<p>(.*?)<\/p><\/div><\/div>/gs)]
    .map(match => [decode(match[2]), decode(match[3]), match[1].includes("stage-direction")]);
  const expected = turns.flatMap(turn => turn.speaker === "Stage direction"
    ? [[`[${turn.it}]`, `[${turn.en}]`, true]]
    : turn.it.split("\n").map((line, index) => [line, turn.en.split("\n")[index], false]));
  assert.deepEqual(pairs, expected, "no source line omitted, duplicated or shifted to a different translation row");
  assert.equal(pairs.length, 583);
  assert.equal((page.match(/class="libretto-scene-section"/g) || []).length, 21);
  assert.ok(page.includes("End of Act I"));
  const outline = createLibrettoRenderer(figaro).outline();
  assert.ok(outline.includes("Ouverture"));
  assert.ok(outline.includes("Non più andrai"));
  assert.ok(!outline.includes("Passage"));
});

test("Figaro deep links and searches retain the full Act I", () => {
  const reader = createLibrettoRenderer(figaro);
  let offset = 0;
  for (const scene of act.scenes) {
    for (let item = 0; item < scene.sections.length; item++) {
      window.location.hash = `#/operas/le-nozze-di-figaro?act=1&scene=${scene.number}&item=${item}`;
      const page = reader.scene(scene.number, "", item);
      assert.ok(page.includes(`data-initial-item="${offset + item}"`));
      for (const sourceScene of act.scenes) assert.ok(page.includes(`id="libretto-scene-1-${sourceScene.number}"`));
    }
    offset += scene.sections.length;
  }
  const result = reader.scene(1, "Non più andrai");
  assert.ok(result.includes('data-initial-item="20"'));
  assert.ok(result.includes("Cinque... dieci"));
  assert.ok(result.includes("military glory"));
});
