import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { operas } from "../src/data/operas.js";
import { operaInformation } from "../src/data/opera-information.js";
import { renderOperaInformationPage, renderPlannedLibrettoPage } from "../src/opera-info-page.js";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

test("all seven opera information pages contain verified metadata and full introductory sections", () => {
  assert.equal(operas.length, 7);
  assert.equal(new Set(operas.map(opera => opera.slug)).size, 7);
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

test("Turandot, Figaro and Samson use optimized WebP artwork files", () => {
  for (const slug of ["turandot", "le-nozze-di-figaro", "samson-et-dalila"]) {
    const opera = operas.find(item => item.slug === slug);
    assert.ok(opera?.image);
    assert.match(opera.image, /-art\.webp$/);
    const raw = readFileSync(opera.image.replace(/^\.\//, ""));
    assert.equal(raw.toString("ascii", 0, 4), "RIFF");
    assert.equal(raw.toString("ascii", 8, 12), "WEBP");
  }
});

test("Samson's description and planned libretto destinations retain usable navigation", () => {
  const opera = operas.find(item => item.slug === "samson-et-dalila");
  const details = operaInformation[opera.slug];
  assert.equal(getLibretto(opera.slug), null, "the libretto text is not prepared yet");
  const synopsis = renderPlannedLibrettoPage(opera, details);
  assert.ok(synopsis.includes('href="#/operas/samson-et-dalila?act=1">Read the libretto'));
  assert.ok(synopsis.includes("Samson and Delilah"));
  for (const view of ["synopsis", "outline", "libretto"]) {
    for (const act of [1, 2, 3]) {
      const page = renderPlannedLibrettoPage(opera, details, view, act);
      for (const suffix of ["view=synopsis", "view=outline", "act=1", "act=2", "act=3"]) {
        assert.ok(page.includes(`href="#/operas/samson-et-dalila?${suffix}"`));
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

test("search-friendly aliases, seven routes and act counts remain intact", () => {
  const acts = Object.fromEntries(operas.map(opera => [opera.slug, opera.acts]));
  assert.deepEqual(acts, {
    "il-barbiere-di-siviglia": 2, "tristan-und-isolde": 3,
    "cosi-fan-tutte": 2, macbeth: 4, turandot: 3, "le-nozze-di-figaro": 4, "samson-et-dalila": 3
  });
  assert.ok(operas.find(item => item.slug === "le-nozze-di-figaro").aliases.includes("Marriage of Figaro"));
  assert.deepEqual(getLibretto("turandot").acts.map(act => act.number), [1, 2, 3]);
  assert.deepEqual(getLibretto("le-nozze-di-figaro").acts.map(act => act.number), [1]);
  assert.ok(getLibretto("cosi-fan-tutte"));
});
