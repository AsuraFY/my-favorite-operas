import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { operas } from "../src/data/operas.js";
import { operaInformation } from "../src/data/opera-information.js";
import { renderOperaInformationPage, renderPlannedLibrettoPage } from "../src/opera-info-page.js";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

test("all ten opera information pages contain verified metadata and full introductory sections", () => {
  assert.equal(operas.length, 10);
  assert.equal(new Set(operas.map(opera => opera.slug)).size, 10);
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

test("Operas with standalone artwork use optimized WebP files", () => {
  for (const slug of ["turandot", "le-nozze-di-figaro", "samson-et-dalila", "la-fanciulla-del-west", "manon", "otello"]) {
    const opera = operas.find(item => item.slug === slug);
    assert.ok(opera?.image);
    assert.match(opera.image, /-art\.webp$/);
    const raw = readFileSync(opera.image.replace(/^\.\//, ""));
    assert.equal(raw.toString("ascii", 0, 4), "RIFF");
    assert.equal(raw.toString("ascii", 8, 12), "WEBP");
  }
});

for (const slug of ["samson-et-dalila", "la-fanciulla-del-west", "manon", "otello"]) test(`${slug}: description and planned libretto destinations retain usable navigation`, () => {
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

test("search-friendly aliases, ten routes and act counts remain intact", () => {
  const acts = Object.fromEntries(operas.map(opera => [opera.slug, opera.acts]));
  assert.deepEqual(acts, {
    "il-barbiere-di-siviglia": 2, "tristan-und-isolde": 3,
    "cosi-fan-tutte": 2, macbeth: 4, turandot: 3, "le-nozze-di-figaro": 4, "samson-et-dalila": 3, "la-fanciulla-del-west": 3, manon: 5, otello: 4
  });
  assert.ok(operas.find(item => item.slug === "le-nozze-di-figaro").aliases.includes("Marriage of Figaro"));
  assert.deepEqual(getLibretto("turandot").acts.map(act => act.number), [1, 2, 3]);
  assert.deepEqual(getLibretto("le-nozze-di-figaro").acts.map(act => act.number), [1]);
  assert.ok(getLibretto("cosi-fan-tutte"));
});
