import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getLibretto, librettoCatalog } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { count, resetReaderLocation } from "./helpers/libretto-helpers.mjs";

beforeEach(resetReaderLocation);

const cosi = getLibretto("cosi-fan-tutte");
const carmen = getLibretto("carmen");
const turandot = getLibretto("turandot");
const figaro = getLibretto("le-nozze-di-figaro");
const act = figaro.acts[0];
const turns = act.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));

// Il barbiere di Siviglia
test("Barbiere source corrections restore the aria and preserve established deep links", () => {
  const libretto = getLibretto("il-barbiere-di-siviglia");
  const first = libretto.acts[0].scenes[0];
  assert.ok(first.sections.find(s => s.routeItem === 2).turns[0].it.startsWith('Gente indiscreta'));
  assert.ok(first.sections.find(s => s.routeItem === 1).turns.some(t => t.it.startsWith('Mille grazie')));
  assert.equal(libretto.acts[0].scenes[15].sections[0].type, 'Finale I');
  assert.equal(libretto.acts[1].scenes[3].sections[1].type, 'Quintetto');
  const finale = libretto.acts[1].scenes[10];
  const aria = finale.sections.find(s => s.originalTitle === 'Cessa di più resistere');
  assert.equal(aria.type, 'Aria');
  assert.deepEqual(aria.participants, ['The Count', 'Chorus']);
  assert.match(aria.turns[0].it, /^Cessa di più resistere,/);
  assert.match(aria.turns[2].it, /gioisci in libertà\.$/);
  for (const turn of [aria.turns[0], aria.turns[2]]) assert.equal(turn.it.split('\n').length, turn.en.split('\n').length);
  assert.ok(!finale.sections.find(s => s.routeItem === 1).turns.some(t => t.it.includes('Cari amici')));
  assert.equal(finale.sections.find(s => s.routeItem === 2).type, 'Recitativo');
  assert.equal(finale.sections.find(s => s.routeItem === 3).type, 'Finaletto II');
  assert.ok(finale.sections[0].participants.includes('Magistrate'));
  window.location.hash = `#/operas/${libretto.slug}?act=2`;
  const reader = createLibrettoRenderer(libretto);
  const page = reader.scene(11, 'Cessa di più resistere');
  const offset = libretto.acts[1].scenes.slice(0, 10).reduce((n, s) => n + s.sections.length, 0);
  assert.ok(page.includes(`data-initial-item="${offset + 2}"`), 'search targets inserted aria');
});

// Carmen
test("Carmen preserves every French turn and aligns each sung or spoken line", () => {
  const expectedTurns = [331, 387, 244, 101];
  const expectedSections = [20, 14, 12, 5];
  for (const [index, act] of carmen.acts.entries()) {
    const scene = act.scenes[0];
    assert.equal(scene.sections.length, expectedSections[index]);
    assert.equal(scene.sections.reduce((count, section) => count + section.turns.length, 0), expectedTurns[index]);
    for (const section of scene.sections) {
      assert.ok(section.type);
      assert.ok(carmen.translatedForms[section.type], `missing English heading for ${section.type}`);
      for (const turn of section.turns) {
        assert.ok(turn.original?.trim(), `empty French text in Act ${index + 1}`);
        assert.ok(turn.translation?.trim(), `empty English text in Act ${index + 1}`);
        if (turn.speaker === carmen.stageDirectionSpeaker) continue;
        assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length, turn.original);
        assert.equal(turn.literalText, true);
        assert.ok(turn.speakerTranslation || carmen.speakerTranslations[turn.speaker], `untranslated speaker ${turn.speaker}`);
      }
    }
  }
});

test("Carmen registers all four continuous acts with source musical numbers", () => {
  assert.ok(carmen);
  assert.equal(carmen.continuousAct, true);
  assert.equal(carmen.sceneDivisions, false);
  assert.deepEqual(carmen.acts.map(act => act.originalHeading), [
    "PREMIER ACTE", "DEUXIÈME ACTE", "TROISIÈME ACTE", "QUATRIÈME ACTE"
  ]);
  assert.deepEqual(carmen.acts.map(act => act.scenes[0].sections.map(section => section.number)), [
    ["1", "2", "2a", "3", null, null, "4", "5", "6", null, null, "7", null, "8", null, "9", null, "10", "11", null],
    [null, "12", null, "13", null, "14", null, "15", null, "16", null, "17", "18", null],
    [null, "19", null, "20", null, "21", null, "22", null, "23", "24", null],
    [null, "25", null, "26", "27"]
  ]);
});

// Così fan tutte
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

// Le nozze di Figaro
test("Figaro Act I retains eight scenes, ten source numbers and complete paired verses", () => {
  assert.deepEqual(act.scenes.map(scene => scene.number), [1, 2, 3, 4, 5, 6, 7, 8]);
  const sections = act.scenes.flatMap(scene => scene.sections);
  assert.equal(sections.length, 22);
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
  assert.equal(directions, 65);
  assert.ok(turns.find(turn => turn.speaker === "Il Conte").speakerTranslation === "The Count");
  assert.ok(turns.find(turn => turn.speaker === "Coro").speakerTranslation === "Chorus");
  assert.ok(turns.find(turn => turn.speaker === "Tutti").speakerTranslation === "All");
  assert.ok(turns.some(turn => turn.it.includes("(Avrei pur gusto\n")));
  assert.equal(turns.at(-1).it, "Partono tutti alla militare.");
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
  assert.equal(entries.filter(turn => turn.speaker === "Stage direction").length, 102);
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

test("Figaro Acts III–IV preserve source scenes, numbers and aligned text", async () => {
  const { createHash } = await import("node:crypto");
  assert.deepEqual(figaro.acts.map(item => item.number), [1, 2, 3, 4]);
  const expected = [
    { scenes: 14, sections: 21, numbers: [17, 18, 19, 20, 21, 22, 23], lines: 448, directions: 66,
      hash: "801de5d4ac162d6f43a7c82a43e591a72c51f8090c289e6834aadf0c96cba982" },
    { scenes: 15, sections: 19, numbers: [24, 25, 26, 27, 28, 29], lines: 452, directions: 55,
      hash: "38a2f6a232cf689136e107f412013708eff8f8819d52e43dd34adaf0e32fca73" }
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

// Macbeth
test("Macbeth Act I preserves all 19 source scenes and paired translation", () => {
  const macbeth = getLibretto("macbeth");
  assert.ok(macbeth);
  assert.equal(macbeth.originalLanguage, "Italiano");
  assert.equal(macbeth.translationLanguage, "English");
  assert.equal(macbeth.acts.length, 4);
  assert.equal(macbeth.acts[0].scenes[0].sections[0].type, "Preludio");
  assert.equal(macbeth.acts[0].scenes.length, 19);
  const scene = macbeth.acts[0].scenes[0];
  assert.equal(scene.title, "Bosco");
  assert.equal(scene.translatedTitle, "A wood");
  assert.equal(macbeth.preserveLineBreaks, true);
  assert.equal(scene.sections[1].number, 2);
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
  assert.ok(page.includes(">Witches</span>"));
  assert.ok(!page.includes("All three witches"));
  for (const n of [1, 2, 3]) assert.ok(page.includes("Strega " + n));
  assert.ok(page.includes('class="libretto-row libretto-row--stage-direction"'));
  assert.ok(page.includes("[A drum is heard.]"));
  assert.ok(page.includes("A drum is heard."));
  const outline = reader.outline();
  assert.ok(outline.includes("N. 1 · Preludio"));
  assert.ok(outline.includes("act=1&scene=1&item=1"));
  assert.ok(outline.includes("N. 2 · Introduzione"));
  assert.ok(outline.includes("Introduzione"));
  assert.ok(outline.includes("Bosco"));
  assert.ok(outline.includes("A wood"));
  assert.ok(!outline.includes("Introduzione · Introduzione"));
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
    assert.ok(page.includes("Assassins, group 1"));
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
  assert.ok(page.includes(">Witches</span>"));
  assert.ok(!page.includes("All three witches"));
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
    assert.equal(count(page, /class="libretto-scene-section"/g), 13);
    const expectedIndex = act.scenes.slice(0, number - 1).reduce((n, scene) => n + scene.sections.length, 0);
    assert.ok(page.includes('data-initial-item="' + expectedIndex + '"'));
    for (let n = 1; n <= 11; n++) assert.ok(page.includes('id="libretto-section-4-' + n + '-0"'));
    assert.ok(page.includes("Per noi di tal vittoria."));
    assert.ok(page.includes("eternal for us."));
    assert.ok(page.includes("Women’s Chorus"));
    assert.ok(page.includes("End of Act IV"));
    assert.ok(!page.includes("Continue to Act V"));
  }
  window.location.hash = "#/operas/macbeth?act=3";
  assert.ok(reader.scene(1).includes("Continue to Act IV"));
});

// Madama Butterfly
test("Madama Butterfly Act I uses the Opera Guide text with paired English and a continuous act page", () => {
  const libretto = getLibretto("madama-butterfly");
  const scene = libretto.acts[0].scenes[0];
  assert.equal(libretto.continuousAct, true);
  assert.equal(libretto.sceneDivisions, false);
  assert.equal(scene.sections.length, 15);
  assert.deepEqual(scene.sections.map(section => section.originalTitle), [
    "E soffitto... e pareti...", "Questa è la cameriera", "Dovunque al mondo",
    "Quanto cielo!... Ancora un passo or via", "Gran ventura", "L'Imperial Commissario",
    "Vieni, amor mio!", "Ieri son salita tutta sola", "Tutti zitti!", "Hip! hip! Beviamo ai novissimi legami",
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

// Tosca
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
      assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length,
        `one English line for each Italian line in ${section.originalTitle}: ${turn.speaker}`);
    }
  }
  assert.ok(turns > 150, "Act I should include the complete dialogue and stage directions");
  assert.equal(libretto.stageDirectionSpeaker, "Stage direction");
  assert.equal(libretto.bracketStageDirections, false);
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

// Turandot
test("Turandot Act I retains all seven PDF numbers and 436 aligned sung lines", () => {
  assert.equal(turandot.continuousAct, true);
  assert.equal(turandot.sceneDivisions, false);
  const sections = turandot.acts[0].scenes[0].sections;
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

test("Turandot Act II retains six source numbers, both tableaux and aligned riddles", () => {
  const sections = turandot.acts[1].scenes[0].sections;
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
  const html = createLibrettoRenderer(turandot).scene(1, "", 4);
  assert.equal((html.match(/class="libretto-scene-section/g) || []).length, 6);
  assert.match(html, /data-initial-item="4"/);
  assert.match(html, /Quadro II/);
  assert.match(html, /N\. 12 · Scena degli Enigmi/);
  assert.match(html, /Ho una casa nell/);
});

test("Turandot Act III retains all seven numbers and the complete Alfano ending", () => {
  const sections = turandot.acts[2].scenes[0].sections;
  assert.deepEqual(sections.map(s => s.number), [14, 15, 16, 17, 18, 19, 20]);
  assert.deepEqual(sections.filter(s => s.sourceDivision).map(s => s.sourceDivision.original), ["Quadro I", "Quadro II"]);
  let lines = 0;
  for (const section of sections) for (const turn of section.turns) {
    assert.ok(turn.it && turn.en);
    if (turn.speaker === "Stage direction") continue;
    assert.equal(turn.it.split("\n").length, turn.en.split("\n").length);
    lines += turn.it.split("\n").length;
  }
  assert.equal(lines, 332);
  assert.match(sections[5].sourceNote, /Franco Alfano/);
  assert.match(sections[6].turns.at(-1).it, /Gloria a te!\.\.\. Gloria!/);
  assert.ok(sections[5].turns.some(t => t.it.includes("Io sono Calaf, figlio di Timur!")));
  window.location.hash = "#/operas/turandot?act=3&scene=1&item=6";
  const reader = createLibrettoRenderer(turandot);
  const html = reader.scene(1, "", 6);
  assert.equal((html.match(/class="libretto-scene-section/g) || []).length, 7);
  assert.match(html, /data-initial-item="6"/);
  assert.match(html, /N\. 14 · Aria · Nessun dorma!/);
  assert.match(html, /N\. 20 · Finale/);
  assert.match(html, /His name is\.\.\. Love!/);
  assert.match(html, /Franco Alfano/);
  assert.match(reader.scene(1, "Nessun dorma"), /data-initial-item="0"/);
  const outline = reader.outline();
  assert.equal((outline.match(/class="opera-outline__section-title"/g) || []).length, 20);
  assert.match(outline, /Quadro II/);
  assert.ok(!outline.includes("Passage"));
  let checked = 0;
  for (const act of turandot.acts) {
    window.location.hash = "#/operas/turandot?act=" + act.number;
    const page = reader.scene(1);
    for (const [item, section] of act.scenes[0].sections.entries()) {
      const href = '#/operas/turandot?act=' + act.number + '&scene=1&item=' + item;
      const title = 'N. ' + section.number + ' · ' + (section.displayType || section.type) + ' · ' + section.originalTitle;
      for (const html of [outline, page]) {
        assert.ok(html.includes('href="' + href + '"'), href);
        const entry = html.slice(html.indexOf('href="' + href + '"')).split('</a>')[0];
        assert.ok(entry.includes(title + '</span>'), "number, musical type and reviewed title");
        assert.ok(entry.includes('opera-outline__section-translation'), "English heading occupies line two");
        assert.ok(entry.includes(section.translatedTitle));
        assert.ok(entry.includes('libretto-participants'));
        if (section.sourceDivision) assert.ok(html.includes(section.sourceDivision.original));
      }
      assert.equal(page.split('id="libretto-section-' + act.number + '-1-' + item + '"').length - 1, 1);
      window.location.hash = href;
      assert.ok(reader.scene(1, "", item).includes('data-initial-item="' + item + '"'));
      assert.equal(new Set(section.participants).size, section.participants.length);
      assert.ok(!section.participants.some(name => /,|La Folla|I Ragazzi|Le Guardie/.test(name)));
      checked++;
    }
  }
  assert.equal(checked, 20);
  assert.deepEqual(turandot.acts[1].scenes[0].sections[0].participants, ["Ping", "Pong", "Pang", "Crowd"]);
  assert.ok(turandot.acts[0].scenes[0].sections[0].participants.includes("Executioner’s Servants"));
});

// Shared reader and registry
test("registry identifies prepared and unfinished libretti", () => {
  assert.ok(cosi);
  assert.equal(librettoCatalog.length, 11);
  const barbiere = getLibretto("il-barbiere-di-siviglia");
  assert.ok(barbiere);
  assert.deepEqual(barbiere.acts.map(act => act.scenes.length), [16, 11]);
  assert.deepEqual(barbiere.acts.map(act => act.originalHeading), ["Atto primo", "Atto secondo"]);
  for (const scene of barbiere.acts[0].scenes) for (const section of scene.sections) {
    assert.ok(section.instrumental || section.turns.length > 0);
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
  assert.equal(bohemeTurns.at(-1).original, "cala il sipario");
  assert.ok(bohemeTurns.every(turn => typeof turn.original === "string" && typeof turn.translation === "string"));
  const bohemeActTwoTurns = laBoheme.acts[1].scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  assert.ok(bohemeActTwoTurns.length > 200);
  assert.match(bohemeActTwoTurns.at(-1).translation, /stunned/i);
  assert.ok(bohemeActTwoTurns.every(turn => typeof turn.original === "string" && typeof turn.translation === "string"));
  const bohemeActThreeTurns = laBoheme.acts[2].scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  assert.ok(bohemeActThreeTurns.length > 100);
  assert.equal(bohemeActThreeTurns.at(-1).original, "sipario calato");
  assert.ok(bohemeActThreeTurns.every(turn => typeof turn.original === "string" && typeof turn.translation === "string"));
  const bohemeActFourTurns = laBoheme.acts[3].scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  assert.ok(bohemeActFourTurns.length > 150);
  assert.match(bohemeActFourTurns.at(-1).translation, /Mimì/);
  assert.ok(bohemeActFourTurns.every(turn => typeof turn.original === "string" && typeof turn.translation === "string"));
  assert.equal(getLibretto("unknown"), null);
});
