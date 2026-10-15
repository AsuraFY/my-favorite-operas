import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { count, assertSceneRows, renderedVersePairs, assertActTargets, resetReaderLocation } from "./helpers/libretto-helpers.mjs";

beforeEach(resetReaderLocation);

const cosi = getLibretto("cosi-fan-tutte");
const carmen = getLibretto("carmen");
const figaro = getLibretto("le-nozze-di-figaro");
const act = figaro.acts[0];
const turns = act.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));

// Il barbiere di Siviglia
test("Barber of Seville Act I scenes render bilingual sections and outline links", () => {
  const barbiere = getLibretto("il-barbiere-di-siviglia");
  const reader = createLibrettoRenderer(barbiere);
  const act = barbiere.acts[0];
  const sections = act.scenes.flatMap(scene => scene.sections);
  const sectionCount = sections.length;
  const rowCount = sections.reduce((n, section) => n + section.turns.length, 0);
  window.location.hash = "#/operas/il-barbiere-di-siviglia?act=1";
  const page = reader.scene(1);
  assert.equal(count(page, /class="libretto-scene-section"/g), sectionCount);
  assertSceneRows(page, { sections });
  assert.ok(page.includes("Italiano"));
  assert.ok(page.includes("English"));
  const outline = reader.outline();
  assert.equal(count(outline, /class="opera-outline__scene"/g), 27);
  assert.equal(count(outline, /class="section-nav-link opera-outline__section"/g), sectionCount + 25);
  assert.equal(sectionCount, 30);
  assert.equal(rowCount, 399);
  assert.ok(outline.includes("#/operas/il-barbiere-di-siviglia?act=1&scene=16&item=0"));
});

test("Barber of Seville Act II scenes render bilingual sections and outline links", () => {
  const barbiere = getLibretto("il-barbiere-di-siviglia");
  const reader = createLibrettoRenderer(barbiere);
  const act = barbiere.acts.find(item => item.number === 2);
  assert.equal(act.scenes.length, 11);
  const sections = act.scenes.flatMap(scene => scene.sections);
  const sectionCount = sections.length;
  const rowCount = sections.reduce((n, section) => n + section.turns.length, 0);
  window.location.hash = "#/operas/il-barbiere-di-siviglia?act=2";
  const page = reader.scene(1);
  assert.equal(count(page, /class="libretto-scene-section"/g), sectionCount);
  assertSceneRows(page, { sections });
  assert.ok(page.includes("Italiano"));
  assert.ok(page.includes("English"));
  const outline = reader.outline();
  assert.equal(count(outline, /class="opera-outline__scene"/g), 27);
  assert.equal(count(outline, /class="section-nav-link opera-outline__section"/g), 30 + sectionCount);
  assert.ok(outline.includes("#/operas/il-barbiere-di-siviglia?act=2&scene=11&item=0"));
  assert.equal(sectionCount, 25);
  assert.equal(rowCount, 284);
});

test("Barbiere outlines distinguish music from recitative in both acts", () => {
  const libretto = getLibretto("il-barbiere-di-siviglia");
  for (const act of libretto.acts) {
    window.location.hash = `#/operas/il-barbiere-di-siviglia?act=${act.number}`;
    const page = createLibrettoRenderer(libretto).scene(1);
    for (const scene of act.scenes) for (const [index, section] of scene.sections.entries()) {
      const href = `#/operas/il-barbiere-di-siviglia?act=${act.number}&scene=${scene.number}&item=${section.routeItem ?? index}`;
      const start = page.indexOf('href="' + href + '"');
      assert.ok(start >= 0);
      const entry = page.slice(start, page.indexOf('</a>', start));
      assert.ok(entry.includes(section.label.startsWith('Recitativo') ? '▤' : '♬'), section.label);
    }
  }
});

test("Barbiere reviewed outlines use source headings, translated titles and unique participants", () => {
  const libretto = getLibretto("il-barbiere-di-siviglia");
  const reader = createLibrettoRenderer(libretto);
  const full = reader.outline();
  const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  for (const act of libretto.acts) {
    window.location.hash = `#/operas/${libretto.slug}?act=${act.number}`;
    const page = reader.scene(1);
    const sidebar = page.slice(page.indexOf('<aside'), page.indexOf('</aside>'));
    for (const scene of act.scenes) {
      assert.equal(scene.title, undefined, 'no invented scene title');
      assert.equal(new Set(scene.sections.map(s => s.routeItem)).size, scene.sections.length);
      for (const section of scene.sections) {
        const href = `#/operas/${libretto.slug}?act=${act.number}&scene=${scene.number}&item=${section.routeItem}`;
        for (const html of [full, sidebar]) {
          const start = html.indexOf(`href="${href}"`);
          assert.ok(start >= 0, href);
          const link = html.slice(start, html.indexOf('</a>', start));
          assert.equal(section.number, undefined, 'no invented score numbering');
          assert.ok(link.includes(escape(section.type)));
          if (section.originalTitle) {
            assert.ok(section.translatedTitle);
            assert.ok(link.includes(escape(section.originalTitle)));
            assert.ok(link.includes('class="opera-outline__section-translation">' + escape(section.translatedTitle)));
            assert.ok(link.indexOf('opera-outline__section-translation') < link.indexOf('libretto-participants'));
          } else assert.ok(!link.includes('opera-outline__section-translation'));
          assert.equal(new Set(section.participants).size, section.participants.length);
          assert.ok(!section.participants.some(name => ['All', 'All three', 'Ensemble'].includes(name)));
          if (section.instrumental) assert.ok(!link.includes('libretto-participants'));
          else assert.ok(link.includes(escape(section.participants.map(name => name + (libretto.disguises?.[`${act.number}:${scene.number}`]?.[name] ? ' (' + libretto.disguises[`${act.number}:${scene.number}`][name] + ')' : '')).join(', '))));
        }
        assert.ok(page.includes(`id="libretto-section-${act.number}-${scene.number}-${section.routeItem}"`));
      }
    }
  }
  assert.ok(full.indexOf('>Sinfonia</span>') < full.indexOf('id="outline-scene-1-1"'));
  assert.ok(full.indexOf('>Temporale</span>') < full.indexOf('id="outline-scene-2-9"'));
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

// Carmen
test("Carmen reader shows a side-by-side continuous act with translated source labels", () => {
  globalThis.window = { location: { hash: "#/operas/carmen?act=1&scene=1&item=6" } };
  const reader = createLibrettoRenderer(carmen);
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
  assert.match(outline, /class="libretto-participants"/);
  assert.doesNotMatch(outline, /Characters:/);
  assert.ok(outline.includes("Cigarette makers’ chorus"));
  assert.doesNotMatch(outline, /\bCHOEUR\b|\bLES CIGARIÈRES\b/);
  assert.ok(!outline.includes("Scene 1"));
});

// Così fan tutte
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
        const href = `#/operas/cosi-fan-tutte?act=${act.number}&scene=${scene.number}&item=${section.routeItem ?? index}`;
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

// Le nozze di Figaro
test("Figaro Act II renders every source line and keeps every deep link on the full act", () => {
  const second = figaro.acts[1];
  const entries = second.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
  const reader = createLibrettoRenderer(figaro);
  window.location.hash = "#/operas/le-nozze-di-figaro?act=2";
  const page = reader.scene(1);
  const pairs = renderedVersePairs(page);
  const expected = entries.flatMap(turn => turn.speaker === "Stage direction"
    ? [[`[${turn.it}]`, `[${turn.en}]`, true]]
    : turn.it.split("\n").map((line, index) => [line, turn.en.split("\n")[index], false]));
  assert.deepEqual(pairs, expected);
  assert.equal(pairs.length, 831);
  assert.ok(page.includes("End of Act II"));
  assertActTargets(reader, figaro, second);
  const outline = reader.outline();
  for (const title of ["Porgi, amor", "Voi che sapete", "Venite, inginocchiatevi", "Esci omai"]) assert.ok(outline.includes(title));
});

test("Figaro renders each source line beside its own English line in source order", () => {
  window.location.hash = "#/operas/le-nozze-di-figaro?act=1";
  const page = createLibrettoRenderer(figaro).scene(1);
  const pairs = renderedVersePairs(page);
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

// La Bohème
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

// Macbeth
test("Macbeth sung asides remain lyrics and final scene links render", () => {
  const libretto = getLibretto("macbeth");
  const reader = createLibrettoRenderer(libretto);
  for (const scene of libretto.acts[0].scenes) {
    window.location.hash = "#/operas/macbeth?act=1&scene=" + scene.number;
    const page = reader.scene(scene.number);
    assert.equal(count(page, /<div class="libretto-row/g), libretto.acts[0].scenes.reduce((n, entry) => n + entry.sections.reduce((m, section) => m + section.turns.length, 0), 0));
    assert.equal(count(page, /class="libretto-scene-section"/g), 20);
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

// Tristan und Isolde
test("Tristan outlines link source passages with bilingual headings and unique participants", () => {
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
  assert.ok(outline.includes("Young Sailor"));
  assert.ok(outline.includes("King Marke"));
  assert.ok(!outline.includes("Love Duet, Part"));
  assert.ok(!outline.includes("is-unavailable"));
  assert.equal(tristan.outlineRecording, undefined);
  for (const act of tristan.acts) {
    window.location.hash = "#/operas/tristan-und-isolde?act=" + act.number;
    const page = reader.scene(1);
    assert.ok(page.includes("&item=1"), "prelude must be linked from the act outline");
    assert.ok(page.includes('id="libretto-section-' + act.number + '-1-1"'));
    for (const scene of act.scenes) {
      assert.ok(outline.includes(scene.originalHeading));
      for (const entry of scene.outline) {
        const section = scene.sections.find(section => section.routeItem === 0);
        assert.ok(section.turns[entry.sourceTurn].it.includes(entry.match));
        assert.equal(new Set(entry.characters).size, entry.characters.length);
        assert.ok(!entry.characters.includes("Beide"));
        const target = act.number + '-' + scene.number + '-0-' + entry.sourceTurn;
        assert.ok(page.includes('id="libretto-turn-' + target + '"'), target);
        const href = '&scene=' + scene.number + '&item=0&turn=' + entry.sourceTurn;
        assert.ok(outline.includes(href));
        assert.ok(page.includes(href));
      }
    }
  }
  assert.equal(scenes, 11);
  assert.ok(rows > 100);
});

// Shared reader and registry
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

test("Macbeth source divisions and unique English credits agree in both outlines", () => {
  const libretto = getLibretto("macbeth");
  const reader = createLibrettoRenderer(libretto);
  const outline = reader.outline();
  assert.ok(!outline.includes("Le profezie"));
  assert.ok(!outline.includes("La vendetta"));
  assert.ok(outline.includes("Scena ultima"));
  let destinations = 0;
  for (const act of libretto.acts) {
    window.location.hash = "#/operas/macbeth?act=" + act.number;
    const page = reader.scene(1);
    for (const scene of act.scenes) for (const [index, section] of scene.sections.entries()) {
      const item = section.routeItem ?? index;
      const href = '#/operas/macbeth?act=' + act.number + '&scene=' + scene.number + '&item=' + item;
      for (const html of [outline, page]) {
        assert.ok(html.includes('href="' + href + '"'), href);
        const entry = html.slice(html.indexOf('href="' + href + '"')).split('</a>')[0];
        assert.ok(!entry.includes('opera-outline__section-translation'), "source supplies forms, not separate titles");
      }
      assert.equal(page.split('id="libretto-section-' + act.number + '-' + scene.number + '-' + item + '"').length - 1, 1);
      const names = section.participants || [];
      assert.equal(new Set(names.map(name => name.toLowerCase())).size, names.length);
      assert.ok(!names.includes("Tutte e tre le streghe"));
      assert.ok(!names.includes("Macbeth e Lady Macbeth"));
      destinations++;
    }
  }
  assert.equal(destinations, 43);
  assert.deepEqual(libretto.acts[2].scenes[2].sections[0].participants, ["Witch 1", "Witch 2", "Witch 3"]);
});
