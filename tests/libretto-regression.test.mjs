import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto, librettoCatalog } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

const cosi = getLibretto("cosi-fan-tutte");
globalThis.window = { location: { hash: "" } };
const count = (html, pattern) => (html.match(pattern) || []).length;

// A source turn may render several rows: lyrics before/after an inline
// direction stay separate from the direction itself.
function assertSceneRows(page, scene) {
  let lyrics = 0, directions = 0;
  for (const section of scene.sections) for (const turn of section.turns) {
    if (turn.speaker === "Stage direction") {
      directions++;
      continue;
    }
    const parts = value => turn.literalText
      ? [{ direction: false, text: value }]
      : String(value || "").split(/(\([^()]*\))/).filter(text => text.trim())
        .map(text => ({ direction: text.startsWith("("), text }));
    const original = parts(turn.original ?? turn.it);
    const translated = parts(turn.translation ?? turn.en);
    assert.deepEqual(original.map(part => part.direction), translated.map(part => part.direction),
      `Matching lyric/direction order for ${turn.speaker}`);
    for (const part of original) part.direction ? directions++ : lyrics++;
  }
  assert.equal(count(page, /<div class="libretto-row"/g), lyrics, "all lyric segments render");
  assert.equal(count(page, /<div class="libretto-row libretto-row--stage-direction"/g),
    directions, "all standalone and inline directions render separately");
}


test("La Bohème translated section titles appear in both outlines and the side-by-side reader", () => {
  const libretto = getLibretto("la-boheme");
  const reader = createLibrettoRenderer(libretto);
  window.location.hash = "#/operas/la-boheme?view=outline";
  const outline = reader.outline();
  for (const act of libretto.acts) for (const scene of act.scenes) {
    for (const entry of scene.outline || []) {
      assert.ok(entry.translation, `English title translation exists for ${entry.title}`);
      assert.ok(outline.includes('<span class="opera-outline__section-title">' +
        entry.type + ' · ' + entry.title + '</span><span class="opera-outline__section-translation">' +
        entry.translation + '</span><div class="libretto-participants">'),
        `outline renders title, translation, and characters for ${entry.title}`);
    }
  }
  for (const act of libretto.acts) {
    window.location.hash = "#/operas/la-boheme?act=" + act.number;
    const page = reader.scene(1);
    for (const scene of act.scenes) for (const entry of scene.outline || []) {
      assert.ok(page.includes(entry.translation + '</span><div class="libretto-participants">'),
        `act outline includes English before participants for ${entry.title}`);
      assert.ok(page.includes(entry.translation + '</span><span class="libretto-participants">'),
        `reader heading includes English before participants for ${entry.title}`);
    }
  }
  window.location.hash = "#/operas/la-boheme?act=1";
  const actPage = reader.scene(1);
  assert.match(actPage, /<h3 class="libretto-track-heading"[^>]*>Aria · Che gelida manina!<span class="opera-outline__section-translation">What a cold little hand!<\/span><span class="libretto-participants">/);
});

test("registry identifies prepared and unfinished libretti", () => {
  assert.ok(cosi);
  assert.equal(librettoCatalog.length, 10);
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
  const laBoheme = getLibretto("la-boheme");
  assert.ok(laBoheme);
  assert.deepEqual(laBoheme.acts.map(act => act.originalHeading), ["Quadro primo", "Quadro secondo", "Quadro terzo", "Quadro quarto"]);
  const bohemeTurns = laBoheme.acts[0].scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  assert.ok(bohemeTurns.length > 200);
  assert.equal(bohemeTurns.at(-1).original, "(cala il sipario)");
  assert.ok(bohemeTurns.every(turn => typeof turn.original === "string" && typeof turn.translation === "string"));
  const bohemeActTwoTurns = laBoheme.acts[1].scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  assert.ok(bohemeActTwoTurns.length > 200);
  assert.match(bohemeActTwoTurns.at(-1).translation, /stunned/i);
  assert.ok(bohemeActTwoTurns.every(turn => typeof turn.original === "string" && typeof turn.translation === "string"));
  const bohemeActThreeTurns = laBoheme.acts[2].scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  assert.ok(bohemeActThreeTurns.length > 100);
  assert.equal(bohemeActThreeTurns.at(-1).original, "(sipario calato)");
  assert.ok(bohemeActThreeTurns.every(turn => typeof turn.original === "string" && typeof turn.translation === "string"));
  const bohemeActFourTurns = laBoheme.acts[3].scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  assert.ok(bohemeActFourTurns.length > 150);
  assert.match(bohemeActFourTurns.at(-1).translation, /Mimì/);
  assert.ok(bohemeActFourTurns.every(turn => typeof turn.original === "string" && typeof turn.translation === "string"));
  assert.equal(getLibretto("unknown"), null);
});

test("Madama Butterfly Act I uses the Opera Guide text with paired English and a continuous act page", () => {
  const libretto = getLibretto("madama-butterfly");
  const scene = libretto.acts[0].scenes[0];
  assert.equal(libretto.continuousAct, true);
  assert.equal(libretto.sceneDivisions, false);
  assert.equal(scene.sections.length, 15);
  assert.deepEqual(scene.sections.map(section => section.originalTitle), [
    "E soffitto... e pareti...", "Questa è la cameriera", "Dovunque al mondo",
    "Quanto cielo!... Ancora un passo or via", "Gran ventura", "L'Imperial Commissario",
    "Vieni, amor mio!", "Ieri son salita tutta sola", "Tutti zitti!", "Madama Butterfly!",
    "Cio-Cio-san!", "Bimba, bimba, non piangere", "Viene la sera",
    "Bimba dagli occhi pieni di malìa", "Vogliatemi bene"
  ]);
  for (const section of scene.sections) {
    assert.ok(section.turns.length > 0);
    assert.equal(section.number, undefined, "no unverified score numbers are shown");
    for (const turn of section.turns) {
      assert.equal(typeof turn.original, "string");
      assert.equal(typeof turn.translation, "string");
      if (turn.speaker !== "Stage direction") {
        assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length,
          `one English line for each Italian line in ${section.originalTitle}: ${turn.speaker}`);
      }
    }
  }
  const renderer = createLibrettoRenderer(libretto);
  const page = renderer.scene(1);
  assert.ok(page.includes("ATTO PRIMO"));
  assert.ok(page.includes("Madama Butterfly!"));
  assert.ok(page.includes("A foolish fear"));
  assert.ok(page.includes("End of Act I"));
  window.location.hash = "#/operas/madama-butterfly?view=outline";
  const outline = renderer.outline();
  assert.ok(outline.includes("Libretto Outline"));
  assert.ok(!outline.includes('Characters:'));
  assert.ok(outline.includes('class="libretto-participants"'));
  assert.ok(outline.includes("Vogliatemi bene"));
  assert.ok(outline.includes("Preludio"));
  assert.ok(outline.includes("Prelude"));
});

test("Madama Butterfly Act II follows the Opera Guide and keeps the Italian and English paired", () => {
  const libretto = getLibretto("madama-butterfly");
  assert.deepEqual(libretto.acts.map(act => act.number), [1, 2, 3]);
  const act = libretto.acts[1];
  const scene = act.scenes[0];
  assert.equal(act.originalHeading, "Atto secondo");
  assert.equal(libretto.opera.acts, 3);
  assert.equal(libretto.continuousAct, true);
  assert.equal(libretto.sceneDivisions, false);
  assert.equal(scene.sections.length, 9);
  assert.deepEqual(scene.sections.map(section => section.originalTitle), [
    "E Izagi ed Izanami", "Un bel dì, vedremo", "Madama Pinkerton",
    "Yamadori, ancor le pene dell’amor", "La lettera di Pinkerton",
    "Che tua madre dovrà", "Vespa! Rospa maledetto!", "Il cannone del porto",
    "Tutti i fior, tutti, tutti"
  ]);
  const turns = scene.sections.flatMap(section => section.turns);
  assert.ok(turns.length > 50);
  assert.ok(turns.some(turn => turn.original.includes("Un bel dì, vedremo")));
  assert.ok(turns.some(turn => turn.original.includes("Tutti i fior, tutti, tutti")));
  assert.ok(turns.some(turn => turn.original.includes("tre forellini")));
  for (const section of scene.sections) {
    assert.ok(section.turns.length > 0);
    assert.equal(section.number, undefined, "no unverified score numbers are shown");
    for (const turn of section.turns) {
      assert.equal(typeof turn.original, "string");
      assert.equal(typeof turn.translation, "string");
      if (turn.speaker !== "Stage direction") {
        assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length,
          `one English line for each Italian line in ${section.originalTitle}: ${turn.speaker}`);
      }
    }
  }
  const renderer = createLibrettoRenderer(libretto);
  window.location.hash = "#/operas/madama-butterfly?act=2";
  const page = renderer.scene(1);
  assert.ok(page.includes("ATTO SECONDO"));
  assert.ok(page.includes("Un bel dì, vedremo"));
  assert.ok(page.includes("One fine day"));
  assert.ok(page.includes("End of Act II"));
  window.location.hash = "#/operas/madama-butterfly?view=outline";
  const outline = renderer.outline();
  assert.ok(outline.includes("Madama Pinkerton"));
  assert.ok(outline.includes("Yamadori, ancor le pene"));
  assert.ok(outline.includes("La lettera di Pinkerton"));
  assert.ok(outline.includes("Tutti i fior, tutti, tutti"));
  assert.ok(outline.includes("Preludio"));
});

test("Madama Butterfly Act III follows the Opera Guide, preserves its three-act close, and aligns English", () => {
  const libretto = getLibretto("madama-butterfly");
  const act = libretto.acts[2];
  const scene = act.scenes[0];
  assert.deepEqual(libretto.acts.map(item => item.number), [1, 2, 3]);
  assert.equal(act.originalHeading, "Atto terzo");
  assert.equal(libretto.opera.acts, 3);
  assert.equal(scene.sections.length, 10);
  assert.deepEqual(scene.sections.map(section => section.originalTitle), [
    "Verrà, verrà, vedrai", "Dormi, amor mio", "Non la destar",
    "Anime sante degli avi", "Addio, fiorito asil", "Nella grande ora... sola",
    "È qui, è qui... dov’è nascosto?", "Come una mosca prigioniera",
    "Con onor muore", "Tu? tu?"
  ]);
  const turns = scene.sections.flatMap(section => section.turns);
  assert.ok(turns.length > 60);
  assert.ok(turns.some(turn => turn.original.includes("Addio, fiorito asil")));
  assert.ok(turns.some(turn => turn.original.includes("Con onor muore")));
  assert.ok(turns.some(turn => turn.original.includes("Tu? tu?")));
  for (const section of scene.sections) {
    assert.ok(section.turns.length > 0);
    assert.equal(section.number, undefined, "no unverified score numbers are shown");
    for (const turn of section.turns) {
      assert.equal(typeof turn.original, "string");
      assert.equal(typeof turn.translation, "string");
      if (turn.speaker !== "Stage direction") {
        assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length,
          `one English line for each Italian line in ${section.originalTitle}: ${turn.speaker}`);
      }
    }
  }
  const renderer = createLibrettoRenderer(libretto);
  window.location.hash = "#/operas/madama-butterfly?act=3";
  const page = renderer.scene(1);
  assert.ok(page.includes("ATTO TERZO"));
  assert.ok(page.includes("Addio, fiorito asil"));
  assert.ok(page.includes("Farewell, flowery refuge"));
  assert.ok(page.includes("With honor dies"));
  assert.ok(page.includes("End of Act III"));
  window.location.hash = "#/operas/madama-butterfly?view=outline";
  const outline = renderer.outline();
  assert.ok(outline.includes("Addio, fiorito asil"));
  assert.ok(outline.includes("Come una mosca prigioniera"));
  assert.ok(outline.includes("Tu? tu?"));
});

test("La Bohème Act I renders as one continuous bilingual tableau", () => {
  const renderer = createLibrettoRenderer(getLibretto("la-boheme"));
  const page = renderer.scene(1);
  assert.ok(page.includes("QUADRO PRIMO"));
  assert.ok(page.includes("Che gelida manina"));
  assert.ok(page.includes("Aria · Che gelida manina!"));
  assert.ok(page.includes("What a cold little hand"));
  assert.ok(page.includes("Stage direction"));
  assert.ok(page.includes("End of Act I"));
});

test("La Bohème Act II renders as one continuous bilingual tableau", () => {
  const renderer = createLibrettoRenderer(getLibretto("la-boheme"));
  window.location.hash = "#/operas/la-boheme?act=2";
  const page = renderer.scene(1);
  assert.ok(page.includes("QUADRO SECONDO"));
  assert.ok(page.includes("Al quartiere latino"));
  assert.ok(page.includes("Quando me’n vo soletta per la via"));
  assert.ok(page.includes("When I walk alone along the street"));
  assert.ok(page.includes("Stage direction"));
  assert.ok(page.includes("End of Act II"));
});

test("La Bohème Act III renders as one continuous bilingual tableau", () => {
  const renderer = createLibrettoRenderer(getLibretto("la-boheme"));
  window.location.hash = "#/operas/la-boheme?act=3";
  const page = renderer.scene(1);
  assert.ok(page.includes("QUADRO TERZO"));
  assert.ok(page.includes("La barriera d’Enfer"));
  assert.ok(page.includes("Donde lieta uscì"));
  assert.ok(page.includes("From where I happily left"));
  assert.ok(page.includes("Stage direction"));
  assert.ok(page.includes("We’ll part when the flowers are in bloom!"));
});

test("La Bohème Act IV renders as one continuous bilingual tableau", () => {
  const renderer = createLibrettoRenderer(getLibretto("la-boheme"));
  window.location.hash = "#/operas/la-boheme?act=4";
  const page = renderer.scene(1);
  assert.ok(page.includes("QUADRO QUARTO"));
  assert.ok(page.includes("In soffitta"));
  assert.ok(page.includes("Vecchia zimarra, senti"));
  assert.ok(page.includes("Old overcoat, listen"));
  assert.ok(page.includes("Stage direction"));
  assert.ok(page.includes("Mimì!!!"));
});

test("La Bohème outline shows characters from libretto speakers and keeps exact deep links", () => {
  const libretto = getLibretto("la-boheme");
  const renderer = createLibrettoRenderer(libretto);
  const outline = renderer.outline();
  assert.equal(count(outline, /class="opera-outline__act"/g), 4);
  assert.equal(libretto.spotifyAlbumUrl, "https://open.spotify.com/album/5b1dUxE8wWIGTyBX5h8CEp");
  assert.deepEqual(libretto.acts.map(act => act.scenes[0].outline.length), [8, 5, 5, 8]);
  assert.ok(!outline.includes("Performers:"));
  assert.ok(outline.includes("Libretto Outline"));
  const outlineEntries = libretto.acts.flatMap(act => act.scenes.flatMap(scene => scene.outline || []));
  assert.equal(count(outline, /class="section-nav-link opera-outline__section"/g), outlineEntries.length);
  assert.equal(count(outline, /class="libretto-participants"/g), outlineEntries.length);
  for (const act of libretto.acts) {
    window.location.hash = "#/operas/la-boheme?act=" + act.number;
    const page = renderer.scene(1);
    assert.ok(page.includes("Act outline"));
    for (const scene of act.scenes) for (const entry of scene.outline) {
      assert.ok(page.includes(entry.type + " · " + entry.title));
      assert.ok(!page.includes('Characters:'));
      assert.ok(page.includes('class="libretto-participants"'));
      assert.ok(!Object.hasOwn(entry, "number"), "only source-original track numbers belong in the outline");
    }
    for (const scene of act.scenes) for (const entry of scene.outline) {
      assert.ok(outline.includes(entry.type + " · " + entry.title));

      const target = scene.sections.flatMap((section, sectionIndex) => section.turns.map((turn, turnIndex) => ({
        sectionIndex, turnIndex, original: turn.original ?? turn.it ?? "", speaker: turn.speaker
      }))).find(turn => (entry.sourceTurn == null || turn.turnIndex === entry.sourceTurn) &&
        (entry.speaker == null || scene.sections[turn.sectionIndex].turns[turn.turnIndex].speaker === entry.speaker) &&
        turn.original.includes(entry.match));
      assert.ok(target, "every outline item must match a libretto turn");
      assert.ok(!outline.includes('Characters:'), entry.title + " omits the redundant character label");
      const expectedHref = "#/operas/la-boheme?act=" + act.number + "&scene=" + scene.number +
        "&item=" + target.sectionIndex + "&turn=" + target.turnIndex;
      assert.ok(page.includes('href="' + expectedHref + '"'), entry.title + " must link to its exact turn");
      assert.ok(outline.includes('href="' + expectedHref + '"'), entry.title + " must link to its exact turn from the libretto outline");
    }
  }
  window.location.hash = "#/operas/la-boheme?act=4";
  const page = renderer.scene(1);
  assert.ok(page.includes('id="libretto-turn-4-1-'));
});
test("La Bohème landmarks identify unique source turns in reading order", () => {
  for (const act of getLibretto("la-boheme").acts) for (const scene of act.scenes) {
    const turns = scene.sections.flatMap(section => section.turns);
    let previous = -1;
    for (const entry of scene.outline) {
      const matches = turns.flatMap((turn, index) =>
        (entry.sourceTurn == null || index === entry.sourceTurn) && (entry.speaker == null || turn.speaker === entry.speaker) && turn.original.includes(entry.match) ? [index] : []);
      assert.equal(matches.length, 1, `Act ${act.number}: ${entry.title} should have one source target`);
      assert.ok(matches[0] > previous, `Act ${act.number}: ${entry.title} should follow the previous landmark`);
      previous = matches[0];
    }
  }
});

test("Tristan outline follows Spotify tracks and formats the bilingual libretto clearly", () => {
  const tristan = getLibretto("tristan-und-isolde");
  assert.ok(tristan);
  assert.equal(tristan.originalLanguage, "Deutsch");
  assert.equal(tristan.translationLanguage, "English");
  assert.deepEqual(tristan.acts.map(act => act.scenes.length), [5, 3, 3]);
  assert.deepEqual(tristan.spotifyOutline.map(act => act.scenes.reduce((n, scene) => n + scene.tracks.length, 0) + 1), [10, 9, 10]);
  const reader = createLibrettoRenderer(tristan);
  for (const act of tristan.acts) {
    window.location.hash = "#/operas/tristan-und-isolde?act=" + act.number;
    const page = reader.scene(1);
    const sections = act.scenes.flatMap(scene => scene.sections);
    assert.equal(count(page, /class="libretto-scene-section"/g), sections.length);
    assertSceneRows(page, { sections });
  }
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
    assert.ok(page.includes(">Stage direction</span>"), "stage directions should have a visible label");
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
  const act = barbiere.acts[0];
  let sectionCount = 0, rowCount = 0;
  for (const scene of act.scenes) {
    window.location.hash = "#/operas/il-barbiere-di-siviglia?act=1&scene=" + scene.number;
    const page = reader.scene(scene.number);
    assert.equal(count(page, /class="libretto-scene-section"/g), act.scenes.reduce((n, sourceScene) => n + sourceScene.sections.length, 0));
    assertSceneRows(page, { sections: act.scenes.flatMap(sourceScene => sourceScene.sections) });
    assert.ok(page.includes("Italiano"));
    assert.ok(page.includes("English"));
    sectionCount += scene.sections.length;
    rowCount += scene.sections.reduce((n, section) => n + section.turns.length, 0);
  }
  const outline = reader.outline();
  assert.equal(count(outline, /class="opera-outline__scene"/g), 27);
  assert.equal(count(outline, /class="section-nav-link opera-outline__section"/g), sectionCount + 23);
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
    assert.equal(count(page, /class="libretto-scene-section"/g), act.scenes.reduce((n, sourceScene) => n + sourceScene.sections.length, 0));
    assertSceneRows(page, { sections: act.scenes.flatMap(sourceScene => sourceScene.sections) });
    assert.ok(page.includes("Italiano"));
    assert.ok(page.includes("English"));
    sectionCount += scene.sections.length;
    rowCount += scene.sections.reduce((n, section) => n + section.turns.length, 0);
  }
  const outline = reader.outline();
  assert.equal(count(outline, /class="opera-outline__scene"/g), 27);
  assert.equal(count(outline, /class="section-nav-link opera-outline__section"/g), 29 + sectionCount);
  assert.ok(outline.includes("#/operas/il-barbiere-di-siviglia?act=2&scene=11&item=0"));
  assert.equal(sectionCount, 23);
  assert.equal(rowCount, 280);
});

test("all Così scenes render their complete sections, dialogue and outline controls", () => {
  const reader = createLibrettoRenderer(cosi);
  let scenes = 0, sections = 0, rows = 0;
  for (const act of cosi.acts) {
    window.location.hash = "#/operas/cosi-fan-tutte?act=" + act.number;
    const page = reader.scene(1);
    const actSections = act.scenes.flatMap(scene => scene.sections);
    const passages = actSections.reduce((n, part) => n + part.turns.length, 0);
    assert.equal(count(page, /class="libretto-scene-section"/g), actSections.length);
    assertSceneRows(page, { sections: actSections });
    assert.ok(page.includes('data-desktop-outline-collapse'));
    assert.ok(page.includes('data-desktop-outline-expand'));
    assert.ok(page.includes('data-outline-open'));
    assert.ok(page.includes('class="scene-bottom-nav"'));
    scenes += act.scenes.length; sections += actSections.length; rows += passages;
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
      characters: [["Helena", "Soprano <voice>", "An example."]] },
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
  assert.ok(reader.synopsis().includes("Soprano &lt;voice&gt;"));
  assert.ok(!reader.synopsis().includes("Soprano <voice>"));
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


test("Macbeth Act I preserves all 19 source scenes and paired translation", () => {
  const macbeth = getLibretto("macbeth");
  assert.ok(macbeth);
  assert.equal(macbeth.originalLanguage, "Italiano");
  assert.equal(macbeth.translationLanguage, "English");
  assert.equal(macbeth.acts.length, 4);
  assert.equal(macbeth.acts[0].prelude.title, "N. 1 - Preludio");
  assert.equal(macbeth.acts[0].scenes.length, 19);
  const scene = macbeth.acts[0].scenes[0];
  assert.equal(scene.title, "Bosco");
  assert.equal(scene.translatedTitle, "A wood");
  assert.equal(macbeth.preserveLineBreaks, true);
  assert.equal(scene.sections[0].number, 2);
  for (const sourceScene of macbeth.acts[0].scenes) for (const section of sourceScene.sections) for (const turn of section.turns) {
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
  assert.ok(page.includes("All three witches"));
  for (const n of [1, 2, 3]) assert.ok(page.includes("Strega " + n));
  assert.ok(page.includes('class="libretto-row libretto-row--stage-direction"'));
  assert.ok(page.includes("[A drum is heard.]"));
  assert.ok(page.includes("A drum is heard."));
  const outline = reader.outline();
  assert.ok(outline.includes("N. 1 - Preludio"));
  assert.ok(outline.includes("No. 1 - Prelude"));
  assert.ok(outline.includes("N. 2 · Introduzione"));
  assert.ok(outline.includes("Introduzione"));
  assert.ok(outline.includes("Bosco"));
  assert.ok(outline.includes("A wood"));
  assert.ok(!outline.includes("Introduzione · Introduzione"));
});


test("Macbeth sung asides remain lyrics and final scene links render", () => {
  const libretto = getLibretto("macbeth");
  const reader = createLibrettoRenderer(libretto);
  for (const scene of libretto.acts[0].scenes) {
    window.location.hash = "#/operas/macbeth?act=1&scene=" + scene.number;
    const page = reader.scene(scene.number);
    assert.equal(count(page, /<div class="libretto-row/g), libretto.acts[0].scenes.reduce((n, entry) => n + entry.sections.reduce((m, section) => m + section.turns.length, 0), 0));
    assert.equal(count(page, /class="libretto-scene-section"/g), 19);
    assert.ok(page.includes('id="libretto-scene-1-1"'));
    assert.ok(page.includes('id="libretto-scene-1-19"'));
    for (const section of scene.sections) for (const turn of section.turns) {
      if (turn.speaker === "Stage direction") continue;
      assert.equal(turn.literalText, true);
    }
  }
  window.location.hash = "#/operas/macbeth?act=1&scene=3";
  const page = reader.scene(3);
  assert.match(page, /libretto-speaker--banco[^]*?<p>\(Ah, l&#39;inferno il ver parlò!\)<\/p>/);
  window.location.hash = "#/operas/macbeth?act=1&scene=19";
  assert.ok(reader.scene(19).includes("SCENA XIX"));
  assert.ok(reader.outline().includes("#/operas/macbeth?act=1&scene=19&item=0"));
});


test("Macbeth deep links keep the complete act and target the requested section", () => {
  const reader = createLibrettoRenderer(getLibretto("macbeth"));
  for (const number of [1, 2, 13, 19]) {
    window.location.hash = "#/operas/macbeth?act=1&scene=" + number + "&item=0";
    const page = reader.scene(number);
    assert.ok(page.includes('data-continuous-act="true"'));
    assert.ok(page.includes('data-initial-item="' + (number - 1) + '"'));
    for (let scene = 1; scene <= 19; scene++) assert.ok(page.includes('id="libretto-section-1-' + scene + '-0"'));
  }
});


test("Macbeth Act II retains all seven scenes on one aligned act page", () => {
  const libretto = getLibretto("macbeth");
  const act = libretto.acts.find(entry => entry.number === 2);
  assert.equal(act.scenes.length, 7);
  for (const scene of act.scenes) for (const section of scene.sections) for (const turn of section.turns) {
    assert.ok(turn.it.trim()); assert.ok(turn.en.trim());
    assert.equal(turn.it.split("\n").length, turn.en.split("\n").length);
  }
  const reader = createLibrettoRenderer(libretto);
  for (const number of [1, 3, 7]) {
    window.location.hash = "#/operas/macbeth?act=2&scene=" + number + "&item=0";
    const page = reader.scene(number);
    assert.equal(count(page, /class="libretto-scene-section"/g), 7);
    assert.ok(page.includes('data-initial-item="' + (number - 1) + '"'));
    for (let scene = 1; scene <= 7; scene++) assert.ok(page.includes('id="libretto-section-2-' + scene + '-0"'));
    assert.ok(page.includes("Assassins 1"));
    assert.ok(page.includes("[The ghost reappears.<br>Terrified.]"));
    assert.ok(page.includes("Chorus"));
  }
  const outline = reader.outline();
  assert.ok(outline.includes("N. 8 1/2"));
  assert.ok(outline.includes("#/operas/macbeth?act=2&scene=7&item=0"));
  window.location.hash = "#/operas/macbeth?act=1";
  assert.ok(reader.scene(1).includes("Continue to Act II"));
});


test("Macbeth Act III retains source scenes, witch labels, and a continuous page", () => {
  const libretto = getLibretto("macbeth");
  const act = libretto.acts.find(entry => entry.number === 3);
  assert.equal(act.scenes.length, 4);
  for (const scene of act.scenes) for (const section of scene.sections) for (const turn of section.turns) {
    assert.ok(turn.it.trim()); assert.ok(turn.en.trim());
    assert.equal(turn.it.split("\n").length, turn.en.split("\n").length);
  }
  window.location.hash = "#/operas/macbeth?act=3&scene=4&item=0";
  const reader = createLibrettoRenderer(libretto);
  const page = reader.scene(4);
  assert.equal(count(page, /class="libretto-scene-section"/g), 4);
  for (let n = 1; n <= 4; n++) assert.ok(page.includes('id="libretto-section-3-' + n + '-0"'));
  for (let n = 1; n <= 3; n++) assert.ok(page.includes("Strega " + n));
  assert.ok(page.includes("All three witches"));
  assert.ok(page.includes("Apparition 3"));
  assert.ok(page.includes('data-initial-item="3"'));
});


test("Macbeth Act IV includes all scenes, both opening numbers, and the final chorus", () => {
  const libretto = getLibretto("macbeth");
  const act = libretto.acts.find(entry => entry.number === 4);
  assert.equal(act.scenes.length, 11);
  assert.deepEqual(act.scenes[0].sections.map(section => section.number), [12, 13]);
  for (const scene of act.scenes) for (const section of scene.sections) for (const turn of section.turns) {
    assert.ok(turn.it.trim()); assert.ok(turn.en.trim());
    assert.equal(turn.it.split("\n").length, turn.en.split("\n").length);
  }
  const reader = createLibrettoRenderer(libretto);
  for (const number of [1, 4, 11]) {
    window.location.hash = "#/operas/macbeth?act=4&scene=" + number + "&item=0";
    const page = reader.scene(number);
    assert.equal(count(page, /class="libretto-scene-section"/g), 12);
    const expectedIndex = act.scenes.slice(0, number - 1).reduce((n, scene) => n + scene.sections.length, 0);
    assert.ok(page.includes('data-initial-item="' + expectedIndex + '"'));
    for (let n = 1; n <= 11; n++) assert.ok(page.includes('id="libretto-section-4-' + n + '-0"'));
    assert.ok(page.includes("Per noi di tal vittoria."));
    assert.ok(page.includes("eternal for us."));
    assert.ok(page.includes("Chorus of Women"));
    assert.ok(page.includes("End of Act IV"));
    assert.ok(!page.includes("Continue to Act V"));
  }
  window.location.hash = "#/operas/macbeth?act=3";
  assert.ok(reader.scene(1).includes("Continue to Act IV"));
});


test("Tosca Act I follows Opera Guide's nine scenes with aligned English on one continuous page", () => {
  const libretto = getLibretto("tosca");
  assert.ok(libretto);
  assert.equal(libretto.opera.acts, 3);
  assert.equal(libretto.continuousAct, true);
  assert.deepEqual(libretto.acts.map(act => act.number), [1, 2, 3]);
  const act = libretto.acts.find(entry => entry.number === 1);
  assert.equal(act.originalHeading, "Atto primo");
  assert.equal(act.scenes.length, 9);
  assert.deepEqual(act.scenes.map(scene => scene.sections[0].originalTitle), [
    "Scena prima", "Scena seconda", "Scena terza", "Scena quarta", "Scena quinta",
    "Scena sesta", "Scena settima", "Scena ottava", "Scena nona"
  ]);
  let turns = 0;
  for (const scene of act.scenes) for (const section of scene.sections) {
    assert.equal(section.number, undefined, "no unsupported score number");
    assert.ok(section.turns.length > 0);
    for (const turn of section.turns) {
      turns++;
      assert.ok(turn.original.trim());
      assert.ok(turn.translation.trim());
      if (turn.speaker === "Stage direction") continue;
      assert.equal(turn.original.split("\\n").length, turn.translation.split("\\n").length,
        `one English line for each Italian line in ${section.originalTitle}: ${turn.speaker}`);
    }
  }
  assert.ok(turns > 150, "Act I should include the complete dialogue and stage directions");
  assert.equal(libretto.stageDirectionSpeaker, "Stage direction");
  assert.equal(libretto.bracketStageDirections, true);
  const reader = createLibrettoRenderer(libretto);
  window.location.hash = "#/operas/tosca?act=1&scene=9&item=0";
  const page = reader.scene(1);
  assert.ok(page.includes("ATTO PRIMO"));
  assert.ok(page.includes("Recondita armonia"));
  assert.ok(page.includes("A hidden harmony"));
  assert.ok(page.includes("Te Deum laudamus"));
  assert.ok(page.includes("We praise you, O God"));
  assert.ok(page.includes("End of Act I"));
  assert.ok(page.includes('id="libretto-section-1-9-0"'));
  assert.ok(!page.includes('Characters:'));
  assert.ok(page.includes('class="libretto-participants"'));
  const actOutline = page.slice(page.indexOf('<aside class="scene-sidebar"'), page.indexOf('</aside>'));
  assert.ok(!actOutline.includes('Characters:'));
  assert.match(page, /class="selected-section-heading">[\s\S]{0,500}class="libretto-participants"/);
  window.location.hash = "#/operas/tosca?view=outline";
  const outline = reader.outline();
  for (const heading of ["Scena prima", "Scena quinta", "Scena nona"]) {
    assert.ok(outline.includes(heading), `Act I outline includes ${heading}`);
  }
  assert.ok(!outline.includes('Characters:'));
  assert.ok(outline.includes('class="libretto-participants"'));
});

test("Tosca Act II follows Opera Guide's five scenes with aligned English on one continuous page", () => {
  const libretto = getLibretto("tosca");
  const act = libretto.acts.find(entry => entry.number === 2);
  assert.ok(act);
  assert.equal(act.originalHeading, "Atto secondo");
  assert.equal(act.scenes.length, 5);
  assert.deepEqual(act.scenes.map(scene => scene.sections[0].originalTitle), [
    "Scena prima", "Scena seconda", "Scena terza", "Scena quarta", "Scena quinta"
  ]);
  let turns = 0;
  for (const scene of act.scenes) for (const section of scene.sections) {
    assert.equal(section.number, undefined, "no unsupported score number");
    assert.ok(section.turns.length > 0);
    for (const turn of section.turns) {
      turns++;
      assert.ok(turn.original.trim());
      assert.ok(turn.translation.trim());
      if (turn.speaker === "Stage direction") continue;
      assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length,
        `one English line for each Italian line in ${section.originalTitle}: ${turn.speaker}`);
    }
  }
  assert.ok(turns > 250, "Act II should include the full dialogue, singing, and stage directions");
  const reader = createLibrettoRenderer(libretto);
  window.location.hash = "#/operas/tosca?act=2&scene=5&item=0";
  const page = reader.scene(1);
  assert.ok(page.includes("ATTO SECONDO"));
  assert.ok(page.includes("Vissi d"));
  assert.ok(page.includes("I lived for art, I lived for love"));
  assert.ok(page.includes("End of Act II"));
  assert.ok(page.includes('id="libretto-section-2-5-0"'));
  assert.ok(page.includes('data-continuous-act="true"'));
  window.location.hash = "#/operas/tosca?view=outline";
  const outline = reader.outline();
  for (const heading of ["Scena prima", "Scena quinta"]) {
    assert.ok(outline.includes(heading), `Act II outline includes ${heading}`);
  }
});

test("Tosca Act III follows Opera Guide's four scene divisions and aligns English", () => {
  const libretto = getLibretto("tosca");
  const act = libretto.acts.find(entry => entry.number === 3);
  assert.ok(act);
  assert.equal(act.originalHeading, "Atto terzo");
  assert.equal(act.scenes.length, 4);
  assert.deepEqual(act.scenes.map(scene => scene.sections[0].originalTitle), [
    "Scena prima", "Scena seconda", "Scena terza", "Scena ultima"
  ]);
  let turns = 0;
  for (const scene of act.scenes) for (const section of scene.sections) {
    assert.equal(section.number, undefined, "no unsupported score number");
    assert.ok(section.turns.length > 0);
    for (const turn of section.turns) {
      turns++;
      assert.ok(turn.original.trim());
      assert.ok(turn.translation.trim());
      if (turn.speaker !== "Stage direction") {
        assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length,
          `one English line for each Italian line in ${section.originalTitle}: ${turn.speaker}`);
      }
    }
  }
  assert.ok(turns > 60, "Act III should include the full libretto and stage directions");
  const reader = createLibrettoRenderer(libretto);
  window.location.hash = "#/operas/tosca?act=3&scene=4&item=0";
  const page = reader.scene(1);
  assert.ok(page.includes("ATTO TERZO"));
  assert.ok(page.includes("E lucevan le stelle"));
  assert.ok(page.includes("And the stars were shining"));
  assert.ok(page.includes("SCENA ULTIMA"));
  assert.ok(page.includes("LAST SCENE"));
  assert.ok(page.includes("O Scarpia, before God!"));
  assert.ok(page.includes("End of Act III"));
  assert.ok(page.includes('id="libretto-section-3-4-0"'));
  window.location.hash = "#/operas/tosca?view=outline";
  const outline = reader.outline();
  for (const heading of ["Scena prima", "Scena seconda", "Scena terza", "Scena ultima"]) {
    assert.ok(outline.includes(heading), `Act III outline includes ${heading}`);
  }
  assert.ok(outline.includes("Last Scene"));
});



 test("La Bohème joint speaker cues list each participant once", () => {
  const reader = createLibrettoRenderer(getLibretto("la-boheme"));
  const expected = 'Benoît, Marcello, Schaunard, Colline, Rodolfo';
  const outline = reader.outline();
  const entry = outline.match(/Scena · Si può\?… Chi è là\?[\s\S]*?<\/a>/)[0];
  assert.ok(entry.includes('<span>' + expected + '</span>'));
  window.location.hash = "#/operas/la-boheme?act=1";
  const page = reader.scene(1);
  assert.equal(count(page, new RegExp('<span>' + expected + '</span>', 'g')), 2);
  assert.ok(!page.includes('Rodolfo, Rodolfo'));
 });

test("La Bohème collective participants are deduplicated across joint cues", () => {
  const reader = createLibrettoRenderer(getLibretto("la-boheme"));
  window.location.hash = "#/operas/la-boheme?act=2";
  for (const page of [reader.outline(), reader.scene(1)]) {
    const lists = [...page.matchAll(/<span>([^<>]*Seamstresses[^<>]*)<\/span>/g)].map(match => match[1]);
    assert.ok(lists.length > 0);
    for (const list of lists) {
      const names = list.toLowerCase().split(', ');
      assert.equal(names.filter(name => name === 'seamstresses').length, 1);
      assert.equal(names.filter(name => name === 'students').length, 1);
      assert.equal(new Set(names).size, names.length);
      assert.ok(!list.includes('Seamstresses and'));
    }
  }
});

test("Così outlines retain all links and show title translations before participants", () => {
  const reader = createLibrettoRenderer(cosi);
  const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const outline = reader.outline();
  for (const act of cosi.acts) {
    window.location.hash = `#/operas/cosi-fan-tutte?act=${act.number}`;
    const page = reader.scene(1);
    for (const scene of act.scenes) {
      assert.ok(scene.translatedTitle);
      for (const [index, section] of scene.sections.entries()) {
        const href = `#/operas/cosi-fan-tutte?act=${act.number}&scene=${scene.number}&item=${index}`;
        for (const html of [outline, page]) {
          const start = html.indexOf('href="' + href + '"');
          assert.ok(start >= 0);
          const entry = html.slice(start, html.indexOf('</a>', start));
          assert.ok(entry.includes('libretto-participants'));
          if (section.number != null) {
            assert.ok(section.originalTitle && section.translatedTitle);
            assert.ok(entry.includes(escape(section.originalTitle)));
            assert.ok(entry.includes(escape(section.translatedTitle)));
            assert.ok(entry.indexOf('opera-outline__section-translation') < entry.indexOf('libretto-participants'));
            assert.ok(!/Finale \((continued|opening|banquet|conclusion)/.test(entry));
          } else assert.ok(!entry.includes('opera-outline__section-translation'));
        }
      }
    }
  }
});

test("Barbiere uses English outline credits and Italian/English sung speaker labels", () => {
  const libretto = getLibretto("il-barbiere-di-siviglia");
  const reader = createLibrettoRenderer(libretto);
  const outline = reader.outline();
  assert.ok(outline.includes("The Count"));
  assert.ok(outline.includes("Officer"));
  assert.ok(!outline.includes("The Count &amp; Figaro"));
  for (const act of libretto.acts) {
    window.location.hash = `#/operas/il-barbiere-di-siviglia?act=${act.number}&scene=1`;
    const page = reader.scene(1);
    const rows = [...page.matchAll(/<div class="libretto-row"><div class="libretto-cell libretto-cell--german">([\s\S]*?)<\/div><div class="libretto-cell libretto-cell--english">([\s\S]*?)<\/div><\/div>/g)];
    assert.ok(rows.length);
    for (const [, original, english] of rows) {
      const originalLabel = original.match(/<span class="libretto-speaker[^>]*>(.*?)<\/span>/)?.[1];
      const englishLabel = english.match(/<span class="libretto-speaker[^>]*>(.*?)<\/span>/)?.[1];
      if (englishLabel) assert.equal(originalLabel, libretto.originalSpeakerNames[englishLabel] || englishLabel);
    }
    for (const [, credits] of page.matchAll(/class="libretto-participants">([\s\S]*?)<\/span><\/(?:span|div)>/g)) {
      assert.ok(!/Il Conte|Ufficiale|Coro/.test(credits));
    }
  }
});

test("Barbiere Act I outlines distinguish unnumbered music from recitative", () => {
  const libretto = getLibretto("il-barbiere-di-siviglia");
  window.location.hash = "#/operas/il-barbiere-di-siviglia?act=1";
  const page = createLibrettoRenderer(libretto).scene(1);
  for (const scene of libretto.acts[0].scenes) for (const [index, section] of scene.sections.entries()) {
    const href = `#/operas/il-barbiere-di-siviglia?act=1&scene=${scene.number}&item=${index}`;
    const start = page.indexOf('href="' + href + '"');
    assert.ok(start >= 0);
    const entry = page.slice(start, page.indexOf('</a>', start));
    assert.ok(entry.includes(section.label === 'Recitativo' ? '▤' : '♪'), section.label);
  }
});
