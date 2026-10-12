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

test("Figaro Act II preserves all source scenes, numbers, stage directions and aligned verses", async () => {
  const { createHash } = await import("node:crypto");
  const second = figaro.acts[1];
  assert.deepEqual(second.scenes.map(scene => scene.number), Array.from({ length: 11 }, (_, i) => i + 1));
  const sections = second.scenes.flatMap(scene => scene.sections);
  const entries = sections.flatMap(section => section.turns);
  assert.equal(sections.length, 19);
  assert.deepEqual(sections.filter(section => section.number).map(section => [section.number, section.type]),
    [[11, "Cavatina"], [12, "Arietta"], [13, "Aria"], [14, "Terzetto"], [15, "Duettino"], [16, "Finale"]]);
  assert.equal(entries.filter(turn => turn.speaker === "Stage direction").length, 110);
  const lyrics = entries.filter(turn => turn.speaker !== "Stage direction");
  assert.equal(lyrics.reduce((count, turn) => count + turn.it.split("\n").length, 0), 721);
  for (const turn of entries) {
    assert.ok(turn.it.trim() && turn.en.trim());
    if (turn.speaker !== "Stage direction") {
      assert.equal(turn.literalText, true);
      assert.equal(turn.it.split("\n").length, turn.en.split("\n").length);
      assert.ok(turn.speakerTranslation);
    }
  }
  // Fingerprint of every Italian verse/direction line extracted from Opera Guide, in source order.
  assert.equal(createHash("sha256").update(entries.flatMap(turn => turn.it.split("\n")).join("\n")).digest("hex"),
    "fcdac7fa3ca5ded6ef418d7236c8655730dc1b1c81c70cf922e54c69c7e62a2f");
  assert.equal(lyrics.find(turn => turn.it.startsWith("Mentite.")).speaker, "La Contessa");
  assert.ok(lyrics.some(turn => turn.it.includes("(Se mi salvo da questa tempesta")));
});

test("Figaro Act II renders every source line and keeps every deep link on the full act", () => {
  const second = figaro.acts[1];
  const entries = second.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  const reader = createLibrettoRenderer(figaro);
  window.location.hash = "#/operas/le-nozze-di-figaro?act=2";
  const page = reader.scene(1);
  const pairs = [...page.matchAll(/<div class="libretto-row([^\"]*)"><div class="libretto-cell libretto-cell--german">.*?<p>(.*?)<\/p><\/div><div class="libretto-cell libretto-cell--english">.*?<p>(.*?)<\/p><\/div><\/div>/gs)]
    .map(match => [decode(match[2]), decode(match[3]), match[1].includes("stage-direction")]);
  const expected = entries.flatMap(turn => turn.speaker === "Stage direction"
    ? [[`[${turn.it}]`, `[${turn.en}]`, true]]
    : turn.it.split("\n").map((line, index) => [line, turn.en.split("\n")[index], false]));
  assert.deepEqual(pairs, expected);
  assert.equal(pairs.length, 831);
  assert.ok(page.includes("End of Act II"));
  let offset = 0;
  for (const scene of second.scenes) {
    for (let item = 0; item < scene.sections.length; item++) {
      window.location.hash = `#/operas/le-nozze-di-figaro?act=2&scene=${scene.number}&item=${item}`;
      const linked = reader.scene(scene.number, "", item);
      assert.ok(linked.includes(`data-initial-item="${offset + item}"`));
      for (const sourceScene of second.scenes) assert.ok(linked.includes(`id="libretto-scene-2-${sourceScene.number}"`));
    }
    offset += scene.sections.length;
  }
  const outline = reader.outline();
  for (const title of ["Porgi, amor", "Voi che sapete", "Venite, inginocchiatevi", "Esci omai"]) assert.ok(outline.includes(title));
});

test("Figaro Acts III–IV preserve source scenes, numbers and aligned text", async () => {
  const { createHash } = await import("node:crypto");
  assert.deepEqual(figaro.acts.map(item => item.number), [1, 2, 3, 4]);
  const expected = [
    { scenes: 14, sections: 30, numbers: [17, 18, 19, 20, 21, 22, 23], lines: 460, directions: 74,
      hash: "f08460db64b423367d2aa32c68990a9294daace8957aed10fd97488254cf375e" },
    { scenes: 15, sections: 26, numbers: [24, 25, 26, 27, 28, 29], lines: 488, directions: 58,
      hash: "636341b7f9adc6a96e3f822da0208bef64fe6b4326df180bf1bf2b4a08d0dc9a" }
  ];
  for (const [index, counts] of expected.entries()) {
    const current = figaro.acts[index + 2];
    const sections = current.scenes.flatMap(scene => scene.sections);
    const entries = sections.flatMap(section => section.turns);
    assert.equal(current.scenes.length, counts.scenes);
    assert.equal(sections.length, counts.sections);
    assert.deepEqual(sections.filter(section => section.number).map(section => section.number), counts.numbers);
    let lyrics = 0, directions = 0;
    for (const scene of current.scenes) {
      for (const section of scene.sections) {
        for (const turn of section.turns) {
          assert.ok(turn.it.trim() && turn.en.trim());
          assert.equal(turn.it.split("\n").length, turn.en.split("\n").length);
          if (turn.speaker === "Stage direction") directions++;
          else {
            assert.equal(turn.literalText, true);
            lyrics += turn.it.split("\n").length;
          }
        }
      }
    }
    assert.equal(lyrics, counts.lines);
    assert.equal(directions, counts.directions);
    assert.equal(createHash("sha256").update(entries.flatMap(turn => turn.it.split("\n")).join("\n")).digest("hex"), counts.hash);
    window.location.hash = `#/operas/le-nozze-di-figaro?act=${current.number}`;
    const page = createLibrettoRenderer(figaro).scene(1);
    assert.ok(page.includes(`End of Act ${current.number === 3 ? "III" : "IV"}`));
    assert.ok(page.includes("libretto-row--stage-direction"));
  }
});
