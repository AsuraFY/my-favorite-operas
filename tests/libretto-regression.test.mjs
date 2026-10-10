import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto, librettoCatalog } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const cosi = getLibretto("cosi-fan-tutte");
globalThis.window = { location: { hash: "" } };
const count = (html, pattern) => (html.match(pattern) || []).length;

test("registry identifies prepared and unfinished libretti", () => {
  assert.ok(cosi);
  assert.equal(librettoCatalog.length, 4);
  const barbiere = getLibretto("il-barbiere-di-siviglia");
  assert.ok(barbiere);
  assert.deepEqual(barbiere.acts.map(act => act.scenes.length), [16, 11]);
  assert.deepEqual(barbiere.acts.map(act => act.originalHeading), ["Atto primo", "Atto secondo"]);
  for (const scene of barbiere.acts[0].scenes) for (const section of scene.sections) {
    assert.ok(section.turns.length > 0);
    for (const turn of section.turns) {
      assert.equal(typeof turn.it, "string");
      assert.equal(typeof turn.en, "string");
    }
  }
  assert.ok(getLibretto("macbeth"));
  assert.equal(getLibretto("unknown"), null);
});

test("Tristan outline follows Spotify tracks and formats the bilingual libretto clearly", () => {
  const tristan = getLibretto("tristan-und-isolde");
  assert.ok(tristan);
  assert.equal(tristan.originalLanguage, "Deutsch");
  assert.equal(tristan.translationLanguage, "English");
  assert.deepEqual(tristan.acts.map(act => act.scenes.length), [5, 3, 3]);
  assert.deepEqual(tristan.spotifyOutline.map(act => act.scenes.reduce((n, scene) => n + scene.tracks.length, 0) + 1), [10, 9, 10]);
  const reader = createLibrettoRenderer(tristan);
  let scenes = 0, rows = 0;
  for (const act of tristan.acts) for (const scene of act.scenes) {
    assert.ok(scene.summary);
    assert.ok(scene.sections.length > 0);
    window.location.hash = "#/operas/tristan-und-isolde?act=" + act.number + "&scene=" + scene.number;
    const page = reader.scene(scene.number);
    assert.ok(page.includes("Deutsch"));
    assert.ok(page.includes("English"));
    assert.ok(page.includes('class="libretto-row libretto-row--stage-direction"'));
    assert.ok(page.includes("<br>"), "verse lines should be separated");
    assert.ok(!page.includes(">Stage direction</span>"), "stage directions should be distinguished by styling");
    assert.ok(!page.includes(">Dialog</span>"));
    assert.ok(count(page, /class="libretto-row/g) >= scene.sections.reduce((n, section) => n + section.turns.length, 0));
    for (const section of scene.sections) for (const turn of section.turns) {
      const german = turn.it || turn.original || "";
      const english = turn.en || turn.translation || "";
      assert.ok(german.trim());
      assert.ok(english.trim());
      assert.equal((german.match(/\([^()]*\)/g) || []).length, (english.match(/\([^()]*\)/g) || []).length,
        "inline stage directions should have matching English translations");
    }
    scenes++;
    rows += scene.sections.reduce((n, section) => n + section.turns.length, 0);
  }
  window.location.hash = "#/operas/tristan-und-isolde?view=outline";
  const outline = reader.outline();
  assert.equal(count(outline, /class="opera-outline__scene"/g), 11);
  assert.equal(count(outline, /class="opera-outline__section-title"/g), 29);
  assert.equal(count(outline, /opera-outline__prelude/g), 3);
  assert.ok(outline.includes("Westwärts schweift der Blick"));
  assert.ok(outline.includes("My gaze drifts westward"));
  assert.ok(outline.includes("Hab acht, Tristan!"));
  assert.ok(outline.includes("O sink hernieder, Nacht der Liebe"));
  assert.ok(outline.includes("Mild und leise (Isoldes Liebestod)"));
  window.location.hash = "#/operas/tristan-und-isolde?act=2&scene=2";
  const secondActOpening = reader.scene(2);
  assert.ok(secondActOpening.includes("Isolde! Geliebte!"));
  assert.ok(secondActOpening.includes("Tristan! Geliebter!"));
  assert.ok(outline.includes("#/operas/tristan-und-isolde?act=3&scene=3&item=0"));
  assert.ok(!outline.includes("Isoldes Aufbegehren"));
  assert.ok(!outline.includes(">Dialog</span>"));
  window.location.hash = "#/operas/tristan-und-isolde?act=1&scene=1";
  const firstScene = reader.scene(1);
  assert.ok(firstScene.includes("Voice of a Young Sailor"));
  assert.ok(firstScene.includes("Heard from above, as if from the mast"));
  assert.ok(reader.synopsis().includes("King Marke"));
  assert.equal(scenes, 11);
  assert.ok(rows > 100);
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

test("Barber of Seville Act I scenes render bilingual sections and outline links", () => {
  const barbiere = getLibretto("il-barbiere-di-siviglia");
  const reader = createLibrettoRenderer(barbiere);
  let sectionCount = 0, rowCount = 0;
  for (const scene of barbiere.acts[0].scenes) {
    window.location.hash = "#/operas/il-barbiere-di-siviglia?act=1&scene=" + scene.number;
    const page = reader.scene(scene.number);
    assert.equal(count(page, /class="libretto-scene-section"/g), scene.sections.length);
    assert.equal(count(page, /<div class="libretto-row/g),
      scene.sections.reduce((n, section) => n + section.turns.length, 0));
    assert.ok(page.includes("Italiano"));
    assert.ok(page.includes("English"));
    sectionCount += scene.sections.length;
    rowCount += scene.sections.reduce((n, section) => n + section.turns.length, 0);
  }
  const outline = reader.outline();
  assert.equal(count(outline, /class="opera-outline__scene"/g), 16);
  assert.equal(count(outline, /class="section-nav-link opera-outline__section"/g), sectionCount);
  assert.equal(sectionCount, 29);
  assert.equal(rowCount, 399);
  assert.ok(outline.includes("#/operas/il-barbiere-di-siviglia?act=1&scene=16&item=0"));
});

test("Barber of Seville Act II scenes render bilingual sections and outline links", () => {
  const barbiere = getLibretto("il-barbiere-di-siviglia");
  const reader = createLibrettoRenderer(barbiere);
  const act = barbiere.acts.find(item => item.number === 2);
  assert.equal(act.scenes.length, 11);
  let sectionCount = 0, rowCount = 0;
  for (const scene of act.scenes) {
    window.location.hash = "#/operas/il-barbiere-di-siviglia?act=2&scene=" + scene.number;
    const page = reader.scene(scene.number);
    assert.equal(count(page, /class="libretto-scene-section"/g), scene.sections.length);
    assert.equal(count(page, /<div class="libretto-row/g),
      scene.sections.reduce((n, section) => n + section.turns.length, 0));
    assert.ok(page.includes("Italiano"));
    assert.ok(page.includes("English"));
    sectionCount += scene.sections.length;
    rowCount += scene.sections.reduce((n, section) => n + section.turns.length, 0);
  }
  const outline = reader.outline();
  assert.equal(count(outline, /class="opera-outline__scene"/g), 27);
  assert.equal(count(outline, /class="section-nav-link opera-outline__section"/g), 25 + sectionCount);
  assert.ok(outline.includes("#/operas/il-barbiere-di-siviglia?act=2&scene=11&item=0"));
  assert.equal(sectionCount, 23);
  assert.equal(rowCount, 280);
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

test("unnumbered titled sections retain their original title", () => {
  const libretto = {
    slug: "unnumbered", opera: { title: "Another Opera", composer: "Composer" },
    originalLanguage: "Deutsch", translationLanguage: "English",
    characters: ["Helena"],
    synopsis: { eyebrow: "Example", paragraphs: ["An example."], characters: [] },
    acts: [{ number: 1, originalHeading: "Erster Akt", scenes: [{
      number: 1, summary: "A short scene.", sections: [{
        type: "Recitative", originalTitle: "Die Nachricht",
        turns: [{ speaker: "Helena", original: "Guten Abend", translation: "Good evening" }]
      }]
    }] }]
  };
  window.location.hash = "#/operas/unnumbered?act=1&scene=1";
  const output = createLibrettoRenderer(libretto);
  assert.ok(output.scene(1).includes("Recitative · Die Nachricht"));
  assert.ok(output.outline().includes("Recitative · Die Nachricht"));
  assert.ok(output.scene(1).includes("Guten Abend"));
});


test("Macbeth Act I Scene I pilot preserves the Italian source layout and paired translation", () => {
  const macbeth = getLibretto("macbeth");
  assert.ok(macbeth);
  assert.equal(macbeth.originalLanguage, "Italiano");
  assert.equal(macbeth.translationLanguage, "English");
  assert.equal(macbeth.acts.length, 1);
  assert.equal(macbeth.acts[0].prelude.title, "N. 1 - Preludio");
  const scene = macbeth.acts[0].scenes[0];
  assert.equal(scene.title, "Bosco");
  assert.equal(scene.translatedTitle, "Forest");
  assert.equal(macbeth.preserveLineBreaks, true);
  assert.equal(scene.sections[0].number, 2);
  for (const turn of scene.sections[0].turns) {
    assert.ok(turn.it.trim());
    assert.ok(turn.en.trim());
    assert.equal(turn.it.split("\n").length, turn.en.split("\n").length,
      "each Italian source line should have its own English counterpart");
  }
  window.location.hash = "#/operas/macbeth?act=1&scene=1";
  const reader = createLibrettoRenderer(macbeth);
  const page = reader.scene(1);
  assert.ok(page.includes("Witch 1"));
  assert.ok(page.includes("Witch 2"));
  assert.ok(page.includes("Witch 3"));
  assert.ok(page.includes("All Three Witches"));
  assert.ok(page.includes('class="libretto-row libretto-row--stage-direction"'));
  assert.ok(page.includes(">Stage direction</span>"));
  assert.ok(page.includes("A drum is heard."));
  const outline = reader.outline();
  assert.ok(outline.includes("N. 1 - Preludio"));
  assert.ok(outline.includes("No. 1 - Prelude"));
  assert.ok(outline.includes("N. 2 · Introduzione"));
  assert.ok(outline.includes("Introduction"));
  assert.ok(outline.includes("Bosco"));
  assert.ok(outline.includes("Forest"));
  assert.ok(!outline.includes("Introduzione · Introduzione"));
});
