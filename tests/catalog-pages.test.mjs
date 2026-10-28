import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { operas } from "../src/data/operas.js";
import { operaInformation } from "../src/data/opera-information.js";
import { renderOperaInformationPage, renderPlannedLibrettoPage } from "../src/opera-info-page.js";
import { renderOperaBreadcrumb, filterOperasByComposer } from "../src/opera-breadcrumb.js";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { renderMusicalPage, renderMusicalsPage } from "../src/musicals-page.js";
import { resetReaderLocation } from "./helpers/libretto-helpers.mjs";

beforeEach(resetReaderLocation);

// Opera information and planned libretto pages.
test("all thirty-five opera information pages contain verified metadata and full introductory sections", () => {
  assert.equal(operas.length, 35);
  assert.equal(new Set(operas.map(opera => opera.slug)).size, 35);
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

test("four newly added opera illustrations match their directory destinations and synopsis covers", () => {
  const slugs = ["la-cenerentola", "hansel-und-gretel", "nabucco", "pagliacci"];
  const main = readFileSync("src/main.js", "utf8");
  assert.ok(main.includes('href="#/operas/${opera.slug}"'), "directory cards must link to the correct opera");
  assert.ok(main.includes('<img src="${opera.image}"'), "directory cards must render each image");
  for (const slug of slugs) {
    const opera = operas.find(item => item.slug === slug);
    assert.ok(opera, "missing opera " + slug);
    assert.equal(opera.image, "./public/images/" + slug + "-art.webp");
    const details = operaInformation[slug];
    assert.ok(details, "missing synopsis and cast for " + slug);
    const page = renderOperaInformationPage(opera, details);
    assert.ok(page.includes('src="' + opera.image + '"'), "incorrect synopsis image for " + slug);
    assert.ok(page.includes('Illustration inspired by ' + opera.title), "missing artwork description for " + slug);
    assert.equal(getLibretto(slug), null, "new opera should not claim a completed libretto");
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

for (const slug of [ "la-fanciulla-del-west", "manon", "otello", "parsifal", "rigoletto", "don-giovanni", "lucia-di-lammermoor", "eugene-onegin", "les-contes-dhoffmann", "norma", "il-trovatore", "das-rheingold", "die-walkure", "siegfried", "gotterdammerung", "lelisir-damore", "die-fledermaus", "la-cenerentola", "hansel-und-gretel", "nabucco", "pagliacci"]) test(`${slug}: description and planned libretto destinations retain usable navigation`, () => {
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
      assert.equal((page.match(/aria-current="page"/g) || []).length, 1);
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

test("search-friendly aliases, thirty-five routes and act counts remain intact", () => {
  const acts = Object.fromEntries(operas.map(opera => [opera.slug, opera.acts]));
  assert.deepEqual(acts, {
    "il-barbiere-di-siviglia": 2, "tristan-und-isolde": 3,
    "cosi-fan-tutte": 2, macbeth: 4, turandot: 3, "le-nozze-di-figaro": 4, "samson-et-dalila": 3, "la-fanciulla-del-west": 3, manon: 5, otello: 4, parsifal: 3, carmen: 4,
    "la-traviata": 3, "the-magic-flute": 2, aida: 4, tosca: 3, "madama-butterfly": 3, rigoletto: 3, "don-giovanni": 2,
    "la-boheme": 4, "lucia-di-lammermoor": 3, "eugene-onegin": 3, "les-contes-dhoffmann": 4, norma: 2,
    "il-trovatore": 4, "das-rheingold": 1, "die-walkure": 3, siegfried: 3, gotterdammerung: 3,
    "lelisir-damore": 2, "die-fledermaus": 3,
    "la-cenerentola": 2, "hansel-und-gretel": 3, "nabucco": 4, "pagliacci": 2
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
  assert.ok(outline.includes('href="#/operas/tosca?act=1&scene=1&item=0'));
  assert.ok(outline.includes('href="#/operas/tosca?act=2&scene=5&item=0'));
  assert.ok(outline.includes('href="#/operas/tosca?act=3&scene=4&item=0'));
  assert.ok(outline.includes("I lived for art, I lived for love"));
  assert.ok(!outline.includes("Maria Callas"), "performer credits stay out of the outline");
  assert.ok(!outline.includes("Performers:"), "performer labels stay out of the outline");
  assert.equal((outline.match(/class="section-nav-link opera-outline__section"/g) || []).length, 44);
  assert.equal((outline.match(/class="libretto-participants"/g) || []).length, 44);
  assert.ok(!outline.includes('Characters:'));
  assert.ok(outline.includes('class="libretto-participants"'));
  assert.ok(libretto.spotifyOutline.flatMap(act => act.scenes.flatMap(scene => scene.tracks)).every(track => !Object.hasOwn(track, "performers")),
    "outline characters are sourced from the libretto scenes, not Spotify performer metadata");
  assert.deepEqual(libretto.albums, [{ name: "Puccini : Tosca", url: "https://open.spotify.com/album/6ulb4DNzatXOL88B4Zr0oo" }]);
  assert.ok(!outline.includes("<strong>Albums:</strong>"), "Recording attribution belongs in curated favorites, not outline footers");
  assert.ok(!outline.includes("<strong>Outline source:</strong>"));
  assert.ok(!outline.includes('href="https://open.spotify.com/album/6ulb4DNzatXOL88B4Zr0oo"'));
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
test("the musicals directory uses its own concert banner and clickable text-only rows", () => {
  const page = renderMusicalsPage();
  assert.ok(page.includes('class="directory-scenic musicals-scenic"'));
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

test("the musicals directory searches and filters strictly by composer", () => {
  assert.ok(renderMusicalsPage("mahler").includes('href="#/musicals/mahler-symphony-2-resurrection"'));
  assert.ok(renderMusicalsPage("no matching work").includes("No musicals match"));
  const composerPage = renderMusicalsPage("", "title", "Gustav Mahler");
  assert.ok(composerPage.includes("Works by <strong>Gustav Mahler</strong>"));
  assert.ok(composerPage.includes('data-composer="Gustav Mahler"'));
  assert.ok(composerPage.includes('href="#/musicals/mahler-symphony-2-resurrection"'));
  assert.ok(composerPage.includes('href="#/musicals">View all musicals</a>'));
  assert.ok(renderMusicalsPage("", "title", "Another Composer").includes("No musicals match"));
  assert.ok(renderMusicalsPage("unrelated", "title", "Gustav Mahler").includes("No musicals match"));
});

test("musical detail combines breadcrumb, hero, and About and Lyrics navigation", () => {
 const page=renderMusicalPage();
 for(const label of ["Home","Musicals","I shall live again!",'class="musical-editorial-hero"',"About this work","Lyrics","Friedrich Klopstock", "Work details", "Gustav Mahler"]) assert.ok(page.includes(label), "missing "+label);
 assert.equal((page.match(/<details/g)||[]).length,0);
 for (const slug of ['mahler-symphony-2-resurrection', 'beethoven-ode-to-joy']) {
   for (const view of ['about', 'lyrics']) {
     const html = renderMusicalPage(slug, view);
     assert.ok(html.includes(`href="#/musicals/${slug}?view=${view}" aria-current="page"`));
     const other = view === 'about' ? 'lyrics' : 'about';
     assert.ok(html.includes(`aria-labelledby="musical-${other}-heading" hidden`));
     assert.ok(!html.includes(`aria-labelledby="musical-${view}-heading" hidden`));
   }
 }
 assert.ok(page.includes('<a href="#/musicals?composer=Gustav%20Mahler">Gustav Mahler</a>'));
 assert.ok(page.includes('<span aria-current="page">Symphony No. 2</span>'));
 assert.ok(page.indexOf('href="#/"') < page.indexOf('href="#/musicals"'));
 assert.ok(page.indexOf('href="#/musicals"') < page.indexOf('href="#/musicals?composer=Gustav%20Mahler"'));
});

test("Mahler lyrics preserve columns, translation toggle, and precise relationship markers", () => {
 const html=renderMusicalPage();
 for(const label of ["Vocal part / relationship","German · Original","English · Translation","↳ Relay","∥ Parallel","= Together","Choir (SATB)","Contralto solo","data-musical-translation-toggle",'lang="de"','lang="en"',"Orchestra"]) assert.ok(html.includes(label),"missing "+label);
 assert.ok(!html.includes("(OV.)"));
 assert.ok(readFileSync("styles.css","utf8").includes(".musical-editorial-hero"));
 assert.ok(readFileSync("src/main.js","utf8").includes("setupMusicalTranslationToggle();"));
});

test("every score-aligned German line has its paired English translation", async () => {
  const { mahlerFinaleEvents, mahlerFinaleTranslations } = await import("../src/data/musical-mahler-symphony-2.js");
  for (const event of mahlerFinaleEvents.filter(x => x.kind === "vocal"))
    for (const lane of event.lanes)
      for (const line of lane.lines)
        assert.ok(typeof mahlerFinaleTranslations[line] === "string" && mahlerFinaleTranslations[line].trim(),
          "untranslated sung line: " + line);
});

test("Mahler's score-aligned German preserves the complete repeated choral line and the two Bereite calls", async () => {
  const { mahlerFinaleEvents, mahlerFinaleTranslations } = await import("../src/data/musical-mahler-symphony-2.js");
  const sterben = mahlerFinaleEvents.find(event => event.id === "sterben");
  assert.deepEqual(sterben.lanes[0].lines, [
    "Sterben werd’ ich, um zu leben!",
    "Sterben werd’ ich, um zu leben!"
  ], "rehearsal 47 sings the full sentence twice; a sustained note is not a substitute for the repeated phrase");
  const bereite = mahlerFinaleEvents.find(event => event.id === "bereite");
  assert.deepEqual(mahlerFinaleEvents.find(event => event.id === "hoer-auf").lanes.at(-1).lines.slice(-1), ["Bereite dich!"]);
  assert.deepEqual(bereite.lanes[0].lines, ["Bereite dich, zu leben!"], "rehearsal 43 includes the short call before the complete command");
  for (const german of [...sterben.lanes[0].lines, ...bereite.lanes[0].lines])
    assert.ok(mahlerFinaleTranslations[german], "English line missing for " + german);
  assert.equal(mahlerFinaleEvents.find(event => event.id === "finale").lanes[0].lines
    .filter(line => line.toLowerCase() === "was du geschlagen,").length, 2);
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
  assert.deepEqual(duet.lanes.map(x => x.relationship), ["solo", "relay", "parallel"]);
  assert.deepEqual(duet.lanes.map(x => x.voice), ["Contralto solo", "Soprano solo", "Contralto solo"]);
  assert.equal(mahlerFinaleEvents.find(event => event.id === "wings-choir").lanes.length, 4);
  assert.ok(mahlerFinaleEvents.every(event => event.kind === "instrumental" ||
    (event.cue && event.lanes.every(lane => lane.voice && lane.lines.length))));
});


test("the musical artwork is a WebP image", () => {
  const raw = readFileSync("public/images/opera-house-hero.webp");
  assert.equal(raw.toString("ascii", 0, 4), "RIFF");
  assert.equal(raw.toString("ascii", 8, 12), "WEBP");
});

test("all operas use Home / Operas / Composer / Work breadcrumb", () => {
  for (const opera of operas) {
    const crumb = renderOperaBreadcrumb(opera);
    assert.ok(crumb.includes('aria-label="Breadcrumb"'), opera.slug);
    assert.ok(crumb.includes('href="#/"'), opera.slug);
    assert.ok(crumb.includes('href="#/operas"'), opera.slug);
    assert.ok(crumb.includes('href="#/operas?composer=' + encodeURIComponent(opera.composer) + '"'), opera.slug);
    assert.ok(crumb.includes('aria-current="page"'), opera.slug);
    assert.ok(crumb.indexOf('href="#/"') < crumb.indexOf('href="#/operas"'));
    assert.ok(crumb.indexOf('href="#/operas"') < crumb.indexOf('href="#/operas?composer='));
  }
});

test("opera composer filtering returns only matching works", () => {
  const rossini = filterOperasByComposer(operas, "Gioachino Rossini");
  assert.ok(rossini.some(opera => opera.slug === "il-barbiere-di-siviglia"));
  assert.ok(rossini.every(opera => opera.composer === "Gioachino Rossini"));
  const puccini = filterOperasByComposer(operas, "Giacomo Puccini");
  assert.ok(puccini.length > 1);
  assert.ok(puccini.some(opera => opera.slug === "tosca"));
  assert.ok(puccini.every(opera => opera.composer === "Giacomo Puccini"));
  assert.equal(filterOperasByComposer(operas, "no composer").length, 0);
  assert.equal(filterOperasByComposer(operas).length, operas.length);
});

test("all opera views route through the breadcrumb; composer searches and sorting retain filter", () => {
  const main = readFileSync("src/main.js", "utf8");
  assert.ok(main.includes("renderOperaBreadcrumb(opera) + operaPage(opera"));
  assert.ok(main.includes('operaDirectoryPage(query, sort, composer)'));
  assert.ok(main.includes('data-composer="${safeComposer}"'));
  assert.ok(main.includes('if (composer) params.set("composer", composer);'));
  assert.ok(main.includes('(target === "/musicals" || target === "/operas")'));
  assert.ok(!readFileSync("src/opera-info-page.js", "utf8").includes('class="opera-info__breadcrumbs"'));
});

test("Opera and Musical detail pages share the same full-width breadcrumb markup", () => {
  const opera = renderOperaBreadcrumb(operas[0]);
  const musical = renderMusicalPage();
  assert.ok(opera.startsWith('<nav class="site-breadcrumb opera-breadcrumb" aria-label="Breadcrumb">'));
  assert.ok(musical.startsWith('<nav class="site-breadcrumb musical-breadcrumb" aria-label="Breadcrumb">'));
  assert.ok(musical.includes('</nav><div class="musical-detail-page musical-editorial"><div class="musical-editorial-wrap">'));
  for (const nav of [opera, musical]) {
    assert.ok(nav.includes('<a href="#/">Home</a>'));
    assert.ok(nav.includes('aria-current="page"'));
  }
  assert.ok(musical.includes('href="#/musicals?composer=Gustav%20Mahler"'));
  assert.ok(opera.includes('href="#/operas?composer=' + encodeURIComponent(operas[0].composer) + '"'));
});

test("A single CSS rule controls breadcrumb height, layout, and logo alignment", () => {
  const css = readFileSync("styles.css", "utf8");
  const begin = css.lastIndexOf("\n.site-breadcrumb {");
  const end = css.lastIndexOf("\n.site-breadcrumb::-webkit-scrollbar");
  const rule = css.slice(begin, end);
  for (const property of [
    "position: sticky", "top: var(--sticky-site-height)", "height: 48px",
    "min-height: 48px", "max-height: 48px", "flex-wrap: nowrap",
    "overflow-x: auto", "padding: 0 18px 0 var(--breadcrumb-logo-left, 30px)",
    "font: 500 .82rem/1.4 var(--sans)"
  ]) assert.ok(rule.includes(property), "missing shared style " + property);
  assert.equal((css.match(/\n.site-breadcrumb \{/g) || []).length, 1);
  assert.ok(!css.includes("width:calc(100% + 32px);margin:0 -16px"));
  const main = readFileSync("src/main.js", "utf8");
  assert.ok(main.includes('app.querySelector(".site-header .brand__name")'));
  assert.ok(main.includes('app.querySelector(".site-breadcrumb")'));
  assert.ok(main.includes('brandName.getBoundingClientRect().left - breadcrumb.getBoundingClientRect().left'));
  assert.ok(main.includes('breadcrumb.style.setProperty("--breadcrumb-logo-left", leftInset + "px")'));
  assert.ok(main.includes('window.addEventListener("resize", measureStickyNavigation)'));
  assert.ok(main.includes('style.setProperty("--sticky-breadcrumb-height"'));
  assert.ok(main.includes('stickyBarObserver.observe(breadcrumb)'));
  assert.ok(css.includes("top: calc(var(--sticky-site-height) + var(--sticky-breadcrumb-height));"));
  assert.ok(css.includes("scroll-margin-top: calc(var(--sticky-site-height) + var(--sticky-breadcrumb-height) + var(--sticky-opera-height)"));
});

test("Aida exposes four bilingual acts with two Act I scenes", () => {
  const opera = operas.find(item => item.slug === "aida");
  const libretto = getLibretto("aida");
  assert.ok(libretto);
  assert.equal(opera.acts, 4);
  assert.deepEqual(libretto.acts.map(act => act.number), [1, 2, 3, 4]);
  assert.deepEqual(libretto.acts[0].scenes.map(scene => scene.number), [1, 2]);
  const sections = libretto.acts[0].scenes.flatMap(scene => scene.sections);
  const turns = sections.flatMap(section => section.turns);
  assert.ok(turns.length > 100);
  for (const turn of turns) {
    assert.ok(turn.original.trim());
    assert.ok(turn.translation.trim());
    assert.equal(turn.original.split("\n").length, turn.translation.split("\n").length);
  }
  const page = renderOperaInformationPage(opera, operaInformation.aida, {hasLibretto:true});
  assert.ok(page.includes('href="#/operas/aida?act=1"'));
  const outline = createLibrettoRenderer(libretto).outline();
  assert.ok(outline.includes("Celeste Aida"));
  assert.ok(outline.includes("Ritorna vincitor"));
});

test("La traviata contains three acts with all source scenes and parallel English draft passages", () => {
  const libretto = getLibretto("la-traviata");
  assert.ok(libretto);
  assert.deepEqual(libretto.acts.map(act => act.number), [1,2,3]);
  assert.deepEqual(libretto.acts[0].scenes.map(scene => scene.number), [1,2,3,4,5]);
  assert.deepEqual(libretto.acts[1].scenes.map(scene => scene.number), Array.from({length:15},(_,i)=>i+1));
  assert.deepEqual(libretto.acts[2].scenes.map(scene => scene.number), [1,2,3,4,5,6]);
  const turns = libretto.acts.flatMap(act=>act.scenes.flatMap(scene=>scene.sections.flatMap(section=>section.turns)));
  assert.ok(turns.length > 350);
  assert.ok(turns.length >= 100);
  assert.ok(turns.every(turn=>turn.original.trim()&&turn.translation.trim()));
  assert.ok(createLibrettoRenderer(libretto).outline().includes("Libiam ne"));
});
