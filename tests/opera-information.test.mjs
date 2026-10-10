import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { operas } from "../src/data/operas.js";
import { operaInformation } from "../src/data/opera-information.js";
import { renderOperaInformationPage } from "../src/opera-info-page.js";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

test("all six opera information pages contain verified metadata and full introductory sections", () => {
  assert.equal(operas.length, 6);
  assert.equal(new Set(operas.map(opera => opera.slug)).size, 6);
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

test("Turandot and Figaro use optimized WebP artwork files", () => {
  for (const slug of ["turandot", "le-nozze-di-figaro"]) {
    const opera = operas.find(item => item.slug === slug);
    assert.ok(opera?.image);
    assert.match(opera.image, /-art\.webp$/);
    const raw = readFileSync(opera.image.replace(/^\.\//, ""));
    assert.equal(raw.toString("ascii", 0, 4), "RIFF");
    assert.equal(raw.toString("ascii", 8, 12), "WEBP");
  }
});

test("search-friendly aliases, six routes and act counts remain intact", () => {
  const acts = Object.fromEntries(operas.map(opera => [opera.slug, opera.acts]));
  assert.deepEqual(acts, {
    "il-barbiere-di-siviglia": 2, "tristan-und-isolde": 3,
    "cosi-fan-tutte": 2, macbeth: 4, turandot: 3, "le-nozze-di-figaro": 4
  });
  assert.ok(operas.find(item => item.slug === "le-nozze-di-figaro").aliases.includes("Marriage of Figaro"));
  assert.deepEqual(getLibretto("turandot").acts.map(act => act.number), [1, 2, 3]);
  assert.equal(getLibretto("le-nozze-di-figaro"), null);
  assert.ok(getLibretto("cosi-fan-tutte"));
});
