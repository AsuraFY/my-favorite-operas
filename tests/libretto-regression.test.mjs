import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto, librettoCatalog } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const cosi = getLibretto("cosi-fan-tutte");
globalThis.window = { location: { hash: "" } };
const count = (html, pattern) => (html.match(pattern) || []).length;

test("registry identifies finished and unfinished libretti", () => {
  assert.ok(cosi);
  assert.equal(librettoCatalog.length, 1);
  assert.equal(getLibretto("macbeth"), null);
  assert.equal(getLibretto("unknown"), null);
});

test("Così retains all scenes and translated dialogue entries", () => {
  assert.deepEqual(cosi.acts.map(act => act.scenes.length), [16, 18]);
  const sections = cosi.acts.flatMap(act => act.scenes.flatMap(scene => scene.sections));
  assert.equal(sections.length, 69);
  assert.equal(sections.reduce((n, s) => n + s.turns.length, 0), 871);
  for (const section of sections) for (const turn of section.turns) {
    assert.equal(typeof turn.it, "string");
    assert.equal(typeof turn.en, "string");
  }
});

test("all Così scenes render their complete sections, dialogue and outline controls", () => {
  const reader = createLibrettoRenderer(cosi);
  let scenes = 0, sections = 0, rows = 0;
  for (const act of cosi.acts) for (const scene of act.scenes) {
    window.location.hash = "#/operas/cosi-fan-tutte?act=" + act.number + "&scene=" + scene.number;
    const page = reader.scene(scene.number);
    const passages = scene.sections.reduce((n, part) => n + part.turns.length, 0);
    assert.equal(count(page, /class="libretto-scene-section"/g), scene.sections.length);
    assert.equal(count(page, /<div class="libretto-row/g), passages);
    assert.ok(page.includes('data-desktop-outline-collapse'));
    assert.ok(page.includes('data-desktop-outline-expand'));
    assert.ok(page.includes('data-outline-open'));
    assert.ok(page.includes('class="scene-bottom-nav"'));
    scenes++; sections += scene.sections.length; rows += passages;
  }
  assert.deepEqual([scenes, sections, rows], [34, 69, 871]);
});

test("Così synopsis, bilingual headings, full outline and deep links", () => {
  const reader = createLibrettoRenderer(cosi);
  assert.ok(reader.synopsis().includes("Don Alfonso"));
  const outline = reader.outline();
  assert.equal(count(outline, /<details class="opera-outline__act" open/g), 2);
  assert.equal(count(outline, /class="opera-outline__scene"/g), 34);
  assert.equal(count(outline, /class="section-nav-link opera-outline__section"/g), 69);
  assert.ok(outline.includes("#/operas/cosi-fan-tutte?act=2&scene=18&item=0"));
  window.location.hash = "#/operas/cosi-fan-tutte?act=1&scene=1&item=0";
  const page = reader.scene(1);
  for (const term of ["ATTO PRIMO", "SCENA PRIMA", "Italiano", "English", "La mia Dorabella"]) {
    assert.ok(page.includes(term));
  }
});

test("a separate three-act German libretto uses the identical reader", () => {
  const mock = {
    slug: "example-opera",
    opera: { title: "Eine Beispieloper", composer: "A. Composer" },
    originalLanguage: "Deutsch", translationLanguage: "English",
    sceneOriginalPrefix: "Szene", characters: ["Helena"],
    synopsis: { eyebrow: "Fictional opera", paragraphs: ["A fictional synopsis."],
      characters: [["Helena", "Soprano", "An example."]] },
    acts: [1, 2, 3].map(number => ({
      number,
      originalHeading: ["Erster Akt", "Zweiter Akt", "Dritter Akt"][number - 1],
      scenes: [{ number: 1, summary: "A short scene.", sections: [{
        number, type: "Arie", originalTitle: "Eine Zeile",
        participants: ["Helena"],
        turns: [{ speaker: "Helena", original: "Guten Tag", translation: "Good morning" }]
      }] }]
    }))
  };
  window.location.hash = "#/operas/example-opera?act=3&scene=1";
  const reader = createLibrettoRenderer(mock);
  const page = reader.scene(1);
  for (const term of ["DRITTER AKT", "ACT III", "Deutsch", "Guten Tag", "Good morning"]) {
    assert.ok(page.includes(term));
  }
  assert.ok(page.includes("#/operas/example-opera?act=3&scene=1&item=0"));
  assert.ok(!page.includes("Così fan tutte"));
  assert.equal(count(reader.outline(), /class="opera-outline__scene"/g), 3);
  assert.ok(reader.synopsis().includes("A fictional synopsis."));
});
