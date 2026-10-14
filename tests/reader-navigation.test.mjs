import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { count, assertActTargets, resetReaderLocation } from "./helpers/libretto-helpers.mjs";

import { readFileSync } from "node:fs";
import vm from "node:vm";

beforeEach(resetReaderLocation);

const turandot = getLibretto("turandot");
const figaro = getLibretto("le-nozze-di-figaro");
const act = figaro.acts[0];

const main = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");
function functionSource(name) {
  const start = main.indexOf(`function ${name}(`);
  const end = main.indexOf("\n}", start) + 2;
  return main.slice(start, end);
}

test("continuous-act navigation jumps across scenes without replacing the page", () => {
  const items = [
    { dataset: { sourceScene: "1", librettoItem: "0" } },
    { dataset: { sourceScene: "1", librettoItem: "1" } },
    { dataset: { sourceScene: "2", librettoItem: "0" } },
    { dataset: { sourceScene: "2", librettoItem: "1" } }
  ];
  const root = {
    dataset: { librettoSlug: "cosi-fan-tutte", act: "1", scene: "1", continuousAct: "true" },
    querySelectorAll: () => items
  };
  let destination = null, prevented = false;
  const context = vm.createContext({
    URLSearchParams, currentSceneReader: () => root, closeActOutline: () => {},
    jumpToReaderSection: (index, smooth) => { destination = [index, smooth]; }
  });
  vm.runInContext(functionSource("handleSceneSectionLink"), context);
  const event = href => ({
    target: { closest: () => ({ getAttribute: () => href }) },
    preventDefault: () => { prevented = true; }
  });
  context.handleSceneSectionLink(event("#/operas/cosi-fan-tutte?act=1&scene=2&item=1"));
  assert.equal(prevented, true);
  assert.deepEqual(destination, [3, true]);
  prevented = false; destination = null;
  context.handleSceneSectionLink(event("#/operas/cosi-fan-tutte?act=2&scene=1&item=0"));
  assert.equal(prevented, false, "changing acts uses normal route rendering");
  assert.equal(destination, null);
});

test("Tristan scene links stay selected beyond the scene's opening section", () => {
  const link = (scene, item, song = false) => {
    const classes = new Set(song ? ["is-song"] : []);
    const attributes = new Map();
    return {
      classes, attributes,
      getAttribute: () => `#/operas/tristan-und-isolde?act=2&scene=${scene}&item=${item}`,
      setAttribute: (name, value) => attributes.set(name, value),
      removeAttribute: name => attributes.delete(name),
      classList: { contains: name => classes.has(name), toggle: (name, value) => value ? classes.add(name) : classes.delete(name) }
    };
  };
  const links = [link(1, 0, true), link(2, 0, true), link(2, 0), link(2, 1)];
  const items = [1, 2].map(scene => ({
    dataset: { sourceScene: String(scene), librettoItem: "1" },
    classList: { toggle() {} }
  }));
  const root = {
    dataset: { act: "2", scene: "1", continuousAct: "true" },
    querySelectorAll: () => items,
    querySelector: selector => selector === "[data-act-outline]" ? { querySelectorAll: () => links } : null
  };
  const context = vm.createContext({ URLSearchParams, currentSceneReader: () => root, window: { matchMedia: () => ({ matches: false }) } });
  vm.runInContext(functionSource("highlightReaderSection"), context);
  context.highlightReaderSection(1);
  assert.equal(root.dataset.scene, "2");
  assert.deepEqual(links.map(entry => entry.classes.has("is-current")), [false, true, false, true]);
  assert.equal(links[1].attributes.get("aria-current"), "page");
});

test("a reading landmark stays selected until the next named landmark", () => {
  const positions = new Map([[10, -100], [20, 500]]);
  const links = [10, 20].map(turn => {
    const classes = new Set();
    return {
      classes,
      getAttribute: () => `#/operas/la-boheme?act=1&scene=1&item=0&turn=${turn}`,
      setAttribute() {}, removeAttribute() {},
      classList: { contains: name => classes.has(name), toggle: (name, active) => active ? classes.add(name) : classes.delete(name) }
    };
  });
  const item = { dataset: { sourceScene: "1", librettoItem: "0" }, classList: { toggle() {} } };
  const root = {
    dataset: { act: "1", scene: "1", continuousAct: "true" },
    querySelectorAll: () => [item],
    querySelector: selector => {
      if (selector === "[data-act-outline]") return { querySelectorAll: () => links };
      const match = selector.match(/^#libretto-turn-1-1-0-(\d+)$/);
      return match ? { getBoundingClientRect: () => ({ top: positions.get(Number(match[1])) }) } : null;
    }
  };
  const context = vm.createContext({ URLSearchParams, currentSceneReader: () => root, window: { matchMedia: () => ({ matches: false }) } });
  vm.runInContext(functionSource("highlightReaderSection"), context);
  context.highlightReaderSection(0);
  assert.deepEqual(links.map(link => link.classes.has("is-current")), [true, false]);
  positions.set(20, 90);
  context.highlightReaderSection(0);
  assert.deepEqual(links.map(link => link.classes.has("is-current")), [false, true]);
  // A final passage cannot always scroll up to the sticky reading boundary.
  positions.set(20, 400);
  context.document = { documentElement: { scrollHeight: 2000 } };
  context.window.scrollY = 1064;
  context.window.innerHeight = 936;
  context.highlightReaderSection(0);
  assert.deepEqual(links.map(link => link.classes.has("is-current")), [false, true], "the final landmark is selected at the end of the page");
});

test("Skip to content focuses the current page without changing the route", () => {
  let prevented = false, focused = false, scrolled = false;
  const main = {
    setAttribute: (name, value) => assert.deepEqual([name, value], ["tabindex", "-1"]),
    focus: () => { focused = true; }, scrollIntoView: () => { scrolled = true; }
  };
  const context = vm.createContext({ document: { querySelector: () => main } });
  vm.runInContext(functionSource("handleSkipLink"), context);
  context.handleSkipLink({ preventDefault: () => { prevented = true; } });
  assert.ok(prevented && focused && scrolled);
});


// Complete-act routes across the shared reader.
for (const slug of ["cosi-fan-tutte", "tristan-und-isolde", "il-barbiere-di-siviglia"]) {
  test(`${slug}: every deep link retains its full act and targets the right section`, () => {
    const libretto = getLibretto(slug);
    const reader = createLibrettoRenderer(libretto);
    assert.equal(libretto.continuousAct, true);
    for (const act of libretto.acts) assertActTargets(reader, libretto, act);
  });
}


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

test("Turandot deep links retain the whole act and navigation uses source numbers", () => {
  window.location.hash = "#/operas/turandot?act=1&scene=1&item=6";
  const reader = createLibrettoRenderer(turandot);
  const html = reader.scene(1, "", 6);
  assert.match(html, /data-continuous-act="true"/);
  assert.match(html, /data-initial-item="6"/);
  assert.equal((html.match(/class="libretto-scene-section/g) || []).length, 7);
  assert.match(html, /Popolo di Pekino/);
  assert.match(html, /Non piangere, Liù/);
  assert.match(html, /When the gong groans, death gloats/);
  assert.match(html, /Crowd/);
  assert.match(html, /\[Prince Calaf strikes the gong three times\.\]/);
  assert.ok(!html.includes("SCENE I"));
  assert.ok(!html.includes("Scene I"));
  assert.ok(!html.includes("Prev. scene"));
  const outline = reader.outline();
  assert.ok(!outline.includes("Scene 1"));
  assert.match(outline, /N\. 3 · Marcia funebre/);
  assert.match(outline, /scene=1&amp;item=6|scene=1&item=6/);
  assert.match(reader.scene(1, "Do not weep"), /data-initial-item="5"/);
});

test("Figaro deep links and searches retain the full Act I", () => {
  const reader = createLibrettoRenderer(figaro);
  assertActTargets(reader, figaro, act);
  const result = reader.scene(1, "Non più andrai");
  assert.ok(result.includes('data-initial-item="20"'));
  assert.ok(result.includes("Cinque... dieci"));
  assert.ok(result.includes("military glory"));
});
