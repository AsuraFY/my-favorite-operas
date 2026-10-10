import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const libretto = getLibretto("turandot");
globalThis.window = { location: { hash: "#/operas/turandot?act=1&scene=1&item=6" } };

test("Turandot Act I retains all seven PDF numbers and 436 aligned sung lines", () => {
  assert.equal(libretto.continuousAct, true);
  assert.equal(libretto.sceneDivisions, false);
  const sections = libretto.acts[0].scenes[0].sections;
  assert.deepEqual(sections.map(s => [s.number, s.type]), [
    [1, "Introduzione"], [2, "Coro"], [3, "Marcia funebre"], [4, "Scena"],
    [5, "Aria"], [6, "Arioso"], [7, "Concertato"]
  ]);
  let lines = 0;
  for (const section of sections) for (const turn of section.turns) {
    assert.ok(turn.it.trim() && turn.en.trim());
    if (turn.speaker === "Stage direction") continue;
    assert.equal(turn.it.split("\n").length, turn.en.split("\n").length, turn.it);
    assert.ok(turn.speakerTranslation);
    assert.equal(turn.literalText, true);
    lines += turn.it.split("\n").length;
  }
  assert.equal(lines, 436);
  assert.match(sections[0].turns.find(t => t.speaker === "Il Mandarino").it, /^Popolo di Pekino!/);
  assert.match(sections[6].turns.at(-1).it, /Calaf è rimasto estatico/);
  assert.ok(sections[6].turns.some(t => /batte tre colpi al gong/.test(t.it)));
});

test("Turandot deep links retain the whole act and navigation uses source numbers", () => {
  window.location.hash = "#/operas/turandot?act=1&scene=1&item=6";
  const reader = createLibrettoRenderer(libretto);
  const html = reader.scene(1, "", 6);
  assert.match(html, /data-continuous-act="true"/);
  assert.match(html, /data-initial-item="6"/);
  assert.equal((html.match(/class="libretto-scene-section/g) || []).length, 7);
  assert.match(html, /Popolo di Pekino/);
  assert.match(html, /Non piangere, Liù/);
  assert.match(html, /When the gong groans, death gloats/);
  assert.match(html, /Crowd/);
  assert.match(html, /\[Prince Calaf strikes the gong three times\.\]/);
  assert.ok(!html.includes("SCENE I"));
  assert.ok(!html.includes("Scene I"));
  assert.ok(!html.includes("Prev. scene"));
  const outline = reader.outline();
  assert.ok(!outline.includes("Scene 1"));
  assert.match(outline, /N\. 3 · Marcia funebre/);
  assert.match(outline, /scene=1&amp;item=6|scene=1&item=6/);
  assert.match(reader.scene(1, "Do not weep"), /data-initial-item="5"/);
});

test("Turandot Act II retains six source numbers, both tableaux and aligned riddles", () => {
  const sections = libretto.acts[1].scenes[0].sections;
  assert.deepEqual(sections.map(s => s.number), [8, 9, 10, 11, 12, 13]);
  assert.deepEqual(sections.filter(s => s.sourceDivision).map(s => s.sourceDivision.original), ["Quadro I", "Quadro II"]);
  let lines = 0;
  for (const section of sections) for (const turn of section.turns) {
    assert.ok(turn.it && turn.en);
    if (turn.speaker === "Stage direction") continue;
    assert.equal(turn.it.split("\n").length, turn.en.split("\n").length);
    lines += turn.it.split("\n").length;
  }
  assert.equal(lines, 346);
  assert.ok(sections[4].turns.some(t => t.en.includes("Hope! Hope! Hope!")));
  assert.ok(sections[4].turns.some(t => t.en.includes("Blood! Blood! Blood!")));
  assert.match(sections[5].turns.at(-1).it, /Gloria a te!/);
  window.location.hash = "#/operas/turandot?act=2&scene=1&item=4";
  const html = createLibrettoRenderer(libretto).scene(1, "", 4);
  assert.equal((html.match(/class="libretto-scene-section/g) || []).length, 6);
  assert.match(html, /data-initial-item="4"/);
  assert.match(html, /Quadro II/);
  assert.match(html, /N\. 12 · Scena degli Enigmi/);
  assert.match(html, /Ho una casa nell/);
});
