import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { operas } from "../src/data/operas.js";
import { operaInformation } from "../src/data/opera-information.js";
import { renderOperaInformationPage, renderPlannedLibrettoPage } from "../src/opera-info-page.js";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { renderMusicalPage, renderMusicalsPage } from "../src/musicals-page.js";
import { resetReaderLocation } from "./helpers/libretto-helpers.mjs";

beforeEach(resetReaderLocation);

// Opera information and planned libretto pages.
test("all thirty-one opera information pages contain verified metadata and full introductory sections", () => {
  assert.equal(operas.length, 31);
  assert.equal(new Set(operas.map(opera => opera.slug)).size, 31);
  for (const opera of operas) {
    const information = operaInformation[opera.slug];
    assert.ok(information, "missing details for " + opera.slug);
    assert.equal(information.synopsis.length, 2);
    assert.ok(information.characters.length >= 5);
    const hasLibretto = Boolean(getLibretto(opera.slug));
    const navigation = hasLibretto ? createLibrettoRenderer(getLibretto(opera.slug)).navigation() : "";
    const html = renderOperaInformationPage(opera, information, { hasLibretto, navigation });
    for (const text of [opera.title, opera.composer, opera.librettist, opera.premiered,
      opera.premieredAt, String(opera.acts), "Synopsis", "Principal characters"]) {
      assert.ok(html.includes(text), "missing " + text + " on " + opera.slug);
    }
    assert.ok(html.includes('href="#/operas"'));
    assert.equal(html.includes('Read the libretto'), hasLibretto);
    assert.equal(html.includes('Libretto Outline'), hasLibretto);
    assert.ok(!html.includes("Coming in a later chapter"));
  }
});

test("Every catalog image path points to an optimized WebP asset", () => {
  const illustratedOperas = operas.filter(opera => opera.image);
  assert.ok(illustratedOperas.length > 0);
  for (const opera of illustratedOperas) {
    assert.match(opera.image, /-art\.webp$/);
    const raw = readFileSync(opera.image.replace(/^\.\//, ""));
    assert.equal(raw.toString("ascii", 0, 4), "RIFF");
    assert.equal(raw.toString("ascii", 8, 12), "WEBP");
  }
});

for (const slug of ["samson-et-dalila", "la-fanciulla-del-west", "manon", "otello", "parsifal", "la-traviata", "the-magic-flute", "aida", "rigoletto", "don-giovanni", "lucia-di-lammermoor", "eugene-onegin", "les-contes-dhoffmann", "norma", "il-trovatore", "das-rheingold", "die-walkure", "siegfried", "gotterdammerung", "lelisir-damore", "die-fledermaus"]) test(`${slug}: description and planned libretto destinations retain usable navigation`, () => {
  const opera = operas.find(item => item.slug === slug);
  const details = operaInformation[opera.slug];
  assert.equal(getLibretto(opera.slug), null, "the libretto text is not prepared yet");
  const synopsis = renderPlannedLibrettoPage(opera, details);
  assert.ok(synopsis.includes(`href="#/operas/${slug}?act=1">Read the libretto`));
  assert.ok(synopsis.includes(opera.displayTitle));
  for (const view of ["synopsis", "outline", "libretto"]) {
    for (const act of Array.from({ length: opera.acts }, (_, i) => i + 1)) {
      const page = renderPlannedLibrettoPage(opera, details, view, act);
      for (const suffix of ["view=synopsis", "view=outline", ...Array.from({ length: opera.acts }, (_, i) => `act=${i + 1}`)]) {
        assert.ok(page.includes(`href="#/operas/${slug}?${suffix}"`));
      }
      assert.equal((page.match(/aria-current="page"/g) || []).length, view === "synopsis" ? 2 : 1);
      if (view !== "synopsis") {
        assert.ok(page.includes("will be added later"));
        assert.ok(!page.includes("libretto-row"));
        assert.ok(!page.includes("opera-outline__section-title"));
      }
    }
  }
});

test("La Bohème Act I is available from its opera information page", () => {
  const opera = operas.find(item => item.slug === "la-boheme");
  const libretto = getLibretto("la-boheme");
  assert.ok(libretto);
  const navigation = createLibrettoRenderer(libretto).navigation();
  const html = renderOperaInformationPage(opera, operaInformation[opera.slug], { hasLibretto: true, navigation });
  assert.ok(html.includes('href="#/operas/la-boheme?act=1">Read the libretto'));
  assert.ok(html.includes("Libretto Outline"));
});

test("search-friendly aliases, thirty-one routes and act counts remain intact", () => {
  const acts = Object.fromEntries(operas.map(opera => [opera.slug, opera.acts]));
  assert.deepEqual(acts, {
    "il-barbiere-di-siviglia": 2, "tristan-und-isolde": 3,
    "cosi-fan-tutte": 2, macbeth: 4, turandot: 3, "le-nozze-di-figaro": 4, "samson-et-dalila": 3, "la-fanciulla-del-west": 3, manon: 5, otello: 4, parsifal: 3, carmen: 4,
    "la-traviata": 3, "the-magic-flute": 2, aida: 4, tosca: 3, "madama-butterfly": 3, rigoletto: 3, "don-giovanni": 2,
    "la-boheme": 4, "lucia-di-lammermoor": 3, "eugene-onegin": 3, "les-contes-dhoffmann": 4, norma: 2,
    "il-trovatore": 4, "das-rheingold": 1, "die-walkure": 3, siegfried: 3, gotterdammerung: 3,
    "lelisir-damore": 2, "die-fledermaus": 3
  });
  assert.ok(operas.find(item => item.slug === "le-nozze-di-figaro").aliases.includes("Marriage of Figaro"));
  assert.deepEqual(getLibretto("turandot").acts.map(act => act.number), [1, 2, 3]);
  assert.deepEqual(getLibretto("le-nozze-di-figaro").acts.map(act => act.number), [1, 2, 3, 4]);
  assert.ok(getLibretto("cosi-fan-tutte"));
});


test("Tosca Acts I–III are available from its opera information page and direct act routes", () => {
  const opera = operas.find(item => item.slug === "tosca");
  const libretto = getLibretto("tosca");
  assert.ok(libretto);
  assert.equal(opera.acts, 3);
  assert.deepEqual(libretto.acts.map(act => act.number), [1, 2, 3]);
  const reader = createLibrettoRenderer(libretto);
  const navigation = reader.navigation();
  const html = renderOperaInformationPage(opera, operaInformation[opera.slug], { hasLibretto: true, navigation });
  assert.ok(html.includes('href="#/operas/tosca?act=1">Read the libretto'));
  assert.ok(html.includes("Libretto Outline"));
  window.location.hash = "#/operas/tosca?act=1";
  const page = reader.scene(1);
  assert.ok(page.includes("ATTO PRIMO"));
  assert.ok(page.includes("SCENA NONA"));
  assert.ok(page.includes("End of Act I"));
  assert.ok(!page.includes('Characters:'));
  assert.ok(page.includes('class="libretto-participants"'));
  window.location.hash = "#/operas/tosca?view=outline";
  const outline = reader.outline();
  assert.ok(outline.includes("Scena prima"));
  assert.ok(outline.includes("Scena nona"));
  assert.deepEqual(libretto.spotifyOutline.map(act => act.scenes.reduce((n, scene) => n + scene.tracks.length, 0)), [16, 17, 11]);
  assert.equal(libretto.spotifyOutline.flatMap(act => act.scenes.flatMap(scene => scene.tracks)).length, 44);
  assert.ok(outline.includes('href="#/operas/tosca?act=1&scene=1&item=0"'));
  assert.ok(outline.includes('href="#/operas/tosca?act=2&scene=5&item=0"'));
  assert.ok(outline.includes('href="#/operas/tosca?act=3&scene=4&item=0"'));
  assert.ok(outline.includes("I lived for art, I lived for love"));
  assert.ok(!outline.includes("Maria Callas"), "performer credits stay out of the outline");
  assert.ok(!outline.includes("Performers:"), "performer labels stay out of the outline");
  assert.equal((outline.match(/class="section-nav-link opera-outline__section"/g) || []).length, 44);
  assert.equal((outline.match(/class="libretto-participants"/g) || []).length, 44);
  assert.ok(!outline.includes('Characters:'));
  assert.ok(outline.includes('class="libretto-participants"'));
  assert.ok(libretto.spotifyOutline.flatMap(act => act.scenes.flatMap(scene => scene.tracks)).every(track => !Object.hasOwn(track, "performers")),
    "outline characters are sourced from the libretto scenes, not Spotify performer metadata");
  const spotifySourceIndex = outline.indexOf('href="https://open.spotify.com/album/6ulb4DNzatXOL88B4Zr0oo"');
  assert.ok(spotifySourceIndex > outline.lastIndexOf("</details>"), "Spotify source appears after the complete outline");
  window.location.hash = "#/operas/tosca?act=2";
  const secondActPage = reader.scene(1);
  assert.ok(secondActPage.includes("ATTO SECONDO"));
  assert.ok(secondActPage.includes("SCENA QUINTA"));
  assert.ok(secondActPage.includes("End of Act II"));
  window.location.hash = "#/operas/tosca?act=3";
  const thirdActPage = reader.scene(1);
  assert.ok(thirdActPage.includes("ATTO TERZO"));
  assert.ok(thirdActPage.includes("E lucevan le stelle"));
  assert.ok(thirdActPage.includes("And the stars were shining"));
  assert.ok(thirdActPage.includes("SCENA ULTIMA"));
  assert.ok(thirdActPage.includes("LAST SCENE"));
  assert.ok(thirdActPage.includes("O Scarpia, before God!"));
  assert.ok(thirdActPage.includes("End of Act III"));
  window.location.hash = "#/operas/tosca?view=outline";
  const actThreeOutline = reader.outline();
  assert.ok(actThreeOutline.includes("Scena ultima"));
});



// Musical directory and detail pages.
test("the musicals directory uses the Opera banner and clickable text-only rows", () => {
  const page = renderMusicalsPage();
  assert.ok(page.includes('class="directory-scenic"'));
  assert.ok(page.includes("<h1>Musicals</h1>"));
  assert.ok(page.includes('href="#/musicals/mahler-symphony-2-resurrection"'));
  assert.ok(page.includes("Gustav Mahler"));
  assert.ok(page.includes("1895"));
  assert.ok(page.includes("A vast finale moves from grief and uncertainty toward renewal"));
  assert.ok(page.includes('data-search-route="/musicals"'));
  assert.ok(page.includes('id="musicals-directory-sort"'));
  assert.ok(!page.includes("directory-card__image"));
  assert.ok(!page.includes("→"));
  const styles = readFileSync("styles.css", "utf8");
  assert.ok(styles.includes(".musical-row:hover"));
  assert.ok(styles.includes(".musical-row:focus-visible"));
});

test("the musicals directory searches its details and reports no matches", () => {
  assert.ok(renderMusicalsPage("mahler").includes('href="#/musicals/mahler-symphony-2-resurrection"'));
  assert.ok(renderMusicalsPage("no matching work").includes("No musicals match"));
});

test("the musical detail page has About and Lyrics tabs and factual work details", () => {
  const page = renderMusicalPage("about");
  for (const text of ["About", "Lyrics", "aria-current=\"page\"", "Choral symphony", "Friedrich Klopstock and Gustav Mahler", "About this work"]) {
    assert.ok(page.includes(text), `missing ${text}`);
  }
  assert.ok(page.includes("?view=lyrics"));
});

test("Mahler lyrics use three vocal/lyrics/translation columns and compact overlap cues", () => {
  const html = renderMusicalPage("lyrics");
  for (const label of ["Vocal part", "German · Original", "English · Translation", "(OV.)",
    "GUSTAV MAHLER · SYMPHONY NO. 2", "Choir (SATB)", "Contralto solo",
    "data-musical-translation-toggle", "data-musical-translation", "lang=\"de\"", "lang=\"en\"",
    "Orchestra", "Oh pain, you who pervade all things!"])
    assert.ok(html.includes(label), "missing " + label);
  assert.ok(html.indexOf("Vocal part") < html.indexOf("German · Original"));
  assert.ok(html.indexOf("German · Original") < html.indexOf("English · Translation"));
  assert.ok(!html.includes("Overlapping / staggered voices — follow each lane independently"));
  assert.ok(!html.includes("Rehearsal reference"));
  assert.ok(!html.includes("data-timestamp"));
  const css = readFileSync("styles.css", "utf8");
  assert.ok(css.includes(".musical-score-reader.is-translation-hidden"));
  assert.ok(css.includes(".musical-score-english[hidden]"));
  const main = readFileSync("src/main.js", "utf8");
  assert.ok(main.includes("setupMusicalTranslationToggle();"));
  assert.ok(main.includes("cell.hidden = hidden;"));
});

test("every score-aligned German line has its paired English translation", async () => {
  const { mahlerFinaleEvents, mahlerFinaleTranslations } = await import("../src/data/musical-mahler-symphony-2.js");
  for (const event of mahlerFinaleEvents.filter(x => x.kind === "vocal"))
    for (const lane of event.lanes)
      for (const line of lane.lines)
        assert.ok(typeof mahlerFinaleTranslations[line] === "string" && mahlerFinaleTranslations[line].trim(),
          "untranslated sung line: " + line);
});

test("Mahler data preserves end repetitions and independent vocal lines", async () => {
  const { mahlerFinaleEvents } = await import("../src/data/musical-mahler-symphony-2.js");
  const ids = mahlerFinaleEvents.map(event => event.id);
  assert.equal(new Set(ids).size, ids.length);
  const final = mahlerFinaleEvents.find(event => event.id === "finale");
  const words = final.lanes[0].lines.map(x => x.toLowerCase());
  assert.equal(words.filter(x => x === "was du geschlagen,").length, 2);
  assert.equal(words.filter(x => x.startsWith("zu gott")).length, 3);
  const duet = mahlerFinaleEvents.find(event => event.id === "schmerz-tod");
  assert.equal(duet.relation, "overlap");
  assert.deepEqual(duet.lanes.map(x => x.voice), ["Contralto solo", "Soprano solo"]);
  assert.equal(mahlerFinaleEvents.find(event => event.id === "wings-choir").lanes.length, 4);
  assert.ok(mahlerFinaleEvents.every(event => event.kind === "instrumental" ||
    (event.cue && event.lanes.every(lane => lane.voice && lane.lines.length))));
});


test("the musical artwork is a WebP image", () => {
  const raw = readFileSync("public/images/opera-house-hero.webp");
  assert.equal(raw.toString("ascii", 0, 4), "RIFF");
  assert.equal(raw.toString("ascii", 8, 12), "WEBP");
});
