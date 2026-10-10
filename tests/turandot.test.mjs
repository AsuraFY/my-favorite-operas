import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const libretto = getLibretto("turandot");
globalThis.window = { location: { hash: "#/operas/turandot?act=1&scene=1&item=6" } };

test("Turandot Act I follows La Fenice with 391 aligned lyric lines and editorial distinctions", () => {
  assert.equal(libretto.continuousAct, true);
  assert.equal(libretto.sceneDivisions, false);
  const sections = libretto.acts[0].scenes[0].sections;
  assert.equal(sections.length, 10);
  assert.ok(sections.every(s => s.type === "Passage" && s.number == null));
  let lines = 0, unsung = 0, directions = 0;
  for (const section of sections) for (const turn of section.turns) {
    assert.ok(turn.it.trim() && turn.en.trim());
    if (turn.speaker === "Stage direction") { directions++; continue; }
    assert.equal(turn.it.split("\n").length, turn.en.split("\n").length, turn.it);
    assert.ok(turn.speakerTranslation);
    assert.equal(turn.literalText, true);
    lines += turn.it.split("\n").length;
    if (turn.editorialOmitted) unsung += turn.it.split("\n").length;
    assert.equal((turn.it.match(/[\[\]]/g) || []).length, (turn.en.match(/[\[\]]/g) || []).length);
  }
  assert.equal(lines, 391);
  assert.equal(unsung, 43);
  assert.equal(directions, 74);
  assert.match(libretto.source, /teatrolafenice/);
  assert.match(sections[0].turns.find(t => t.speaker === "Un Mandarino").it, /^Popolo di Pekino!/);
  assert.match(sections[9].turns.at(-1).it, /Il principe è rimasto estatico/);
  assert.ok(sections[9].turns.some(t => /come forsennato, tre colpi/.test(t.it)));
  const turns = sections.flatMap(s => s.turns);
  assert.ok(turns.some(t => t.speaker === "Il Principino di Persia" && t.it === "Turandot!"));
  assert.ok(turns.some(t => t.speaker === "I Ministri" && t.it.includes("Ah! Per l’ultima volta!")));
  assert.ok(turns.some(t => t.speaker === "Il Principe Ignoto" && t.it.includes("Forza divina")));
});

test("Turandot deep links retain the whole act and use passages without invented source numbers", () => {
  const reader = createLibrettoRenderer(libretto);
  const html = reader.scene(1, "", 9);
  assert.match(html, /data-continuous-act="true"/);
  assert.match(html, /data-initial-item="9"/);
  assert.equal((html.match(/class="libretto-scene-section/g) || []).length, 10);
  assert.match(html, /Popolo di Pekino/);
  assert.match(html, /Non piangere, Liù/);
  assert.match(html, /When the gong groans, death gloats/);
  assert.match(html, /Crowd/);
  assert.match(html, /Strikes three blows like a madman/);
  assert.match(html, /libretto-row--editorial-omission/);
  assert.match(html, /<em>Subito!<\/em>/);
  assert.match(html, /\[Non voglio staccarmi da te!/);
  assert.match(html, /italic lyrics are text not set to music/);
  assert.ok(!html.includes("SCENE I"));
  assert.ok(!html.includes("Scene I"));
  assert.ok(!html.includes("Prev. scene"));
  const outline = reader.outline();
  assert.ok(!outline.includes("Scene 1"));
  assert.ok(!outline.includes("N. 3"));
  assert.match(outline, /O giovinetto!/);
  assert.match(outline, /scene=1&amp;item=9|scene=1&item=9/);
  assert.match(reader.scene(1, "Do not weep"), /data-initial-item="8"/);
});
