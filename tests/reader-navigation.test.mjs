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
    assert.ok(page.includes('data-initial-item="' + number + '"'));
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
  assert.match(html, /<p>Prince Calaf strikes the gong three times\.<\/p>/);
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
  assert.ok(result.includes('data-initial-item="21"'));
  assert.ok(result.includes("Cinque... dieci"));
  assert.ok(result.includes("military glory"));
});

test("all Tristan outline destinations resolve and repeat passage clicks jump again", () => {
  const libretto = getLibretto("tristan-und-isolde");
  const renderer = createLibrettoRenderer(libretto);
  const outline = renderer.outline();
  const links = [...outline.matchAll(/href="([^\"]+&item=\d+(?:&turn=\d+)?)"/g)].map(match => match[1]);
  assert.equal(links.length, 29);
  let passageCount = 0;
  for (const href of links) {
    const params = new URLSearchParams(href.split("?")[1]);
    window.location.hash = href;
    const html = renderer.scene(Number(params.get("scene")), "", Number(params.get("item")));
    const suffix = [params.get("act"), params.get("scene"), params.get("item")].join("-");
    const id = params.has("turn") ? "libretto-turn-" + suffix + "-" + params.get("turn") : "libretto-section-" + suffix;
    assert.equal(html.split('id="' + id + '"').length - 1, 1, href);
    if (!params.has("turn")) continue;
    passageCount++;
    let jumps = 0, prevented = 0;
    const target = {};
    const root = {
      dataset: { librettoSlug: libretto.slug, act: params.get("act"), continuousAct: "true" },
      querySelector: selector => selector === "#" + id ? target : null
    };
    const context = vm.createContext({ URLSearchParams, currentSceneReader: () => root,
      closeActOutline: () => {}, window: { location: { hash: href } },
      jumpToReaderPassage: (reader, destination) => { assert.equal(reader, root); assert.equal(destination, target); jumps++; }
    });
    vm.runInContext(functionSource("handleSceneSectionLink"), context);
    const event = { target: { closest: () => ({ getAttribute: () => href }) }, preventDefault: () => prevented++ };
    context.handleSceneSectionLink(event);
    context.handleSceneSectionLink(event);
    assert.equal(jumps, 2, href);
    assert.equal(prevented, 2);
  }
  assert.equal(passageCount, 26);
});

test("passage jumps clear sticky headers and release tracking when a target is missing", () => {
  let position;
  const context = vm.createContext({ readerJumping: false,
    app: { querySelector: selector => ({ getBoundingClientRect: () => ({ height: selector === ".site-breadcrumb" ? 48 : 60 }) }) },
    window: { scrollY: 100, requestAnimationFrame: callback => callback(), scrollTo: options => { position = options.top; } },
    scheduleReaderSectionUpdate: () => {}
  });
  vm.runInContext(functionSource("jumpToReaderPassage"), context);
  const reader = { querySelector: selector => ({ getBoundingClientRect: () => ({ height: selector === ".opera-subnav" ? 50 : 40 }) }) };
  context.jumpToReaderPassage(reader, { getBoundingClientRect: () => ({ top: 1000 }) });
  assert.equal(position, 884);
  assert.equal(context.readerJumping, false);
  context.readerJumping = true;
  context.jumpToReaderPassage(reader, null);
  assert.equal(context.readerJumping, false);
});

test("section tracking keeps the clicked section active below the full sticky stack", () => {
  for (const toolbarHeight of [0, 46]) {
    let selected;
    const headerHeight = 76, breadcrumbHeight = 48, barHeight = 76;
    const landingTop = headerHeight + breadcrumbHeight + barHeight + toolbarHeight + 16;
    const items = [-500, landingTop, landingTop + 800].map(top => ({ getBoundingClientRect: () => ({ top }) }));
    const root = {
      querySelectorAll: () => items,
      querySelector: selector => ({ getBoundingClientRect: () => ({ height: selector === '.opera-subnav' ? barHeight : toolbarHeight }) })
    };
    const context = vm.createContext({ readerJumping: false,
      currentSceneReader: () => root,
      app: { querySelector: selector => ({ getBoundingClientRect: () => ({ height: selector === '.site-header' ? headerHeight : breadcrumbHeight }) }) },
      window: { scrollY: 1000, innerHeight: 800 },
      document: { documentElement: { scrollHeight: 10000 } },
      highlightReaderSection: (index, sync) => { selected = [index, sync]; }
    });
    vm.runInContext(functionSource('updateReaderSectionPosition'), context);
    context.updateReaderSectionPosition();
    assert.deepEqual(selected, [1, true], `clicked section stays active with toolbar height ${toolbarHeight}`);
  }
});

test("every Figaro section, alias and scene-start link resolves within the current act", () => {
  for (const act of figaro.acts) {
    const items = act.scenes.flatMap(scene => scene.sections.map((section, i) => ({
      dataset: { sourceScene: String(scene.number), librettoItem: String(section.routeItem ?? i) }, section
    })));
    const anchors = new Map();
    for (const el of items) for (const alias of el.section.routeAliases || []) {
      anchors.set(`#libretto-section-${act.number}-${el.dataset.sourceScene}-${alias}`, { closest: () => el });
    }
    const root = { dataset: { librettoSlug: figaro.slug, act: String(act.number), scene: '1', continuousAct: 'true' },
      querySelectorAll: () => items, querySelector: selector => anchors.get(selector) };
    let destination, prevented;
    const context = vm.createContext({ URLSearchParams, currentSceneReader: () => root,
      closeActOutline: () => {}, jumpToReaderSection: index => { destination = index; } });
    vm.runInContext(functionSource('handleSceneSectionLink'), context);
    function click(scene, item, expected) {
      destination = undefined; prevented = false;
      const href = `#/operas/${figaro.slug}?act=${act.number}&scene=${scene}&item=${item}`;
      context.handleSceneSectionLink({ target: { closest: () => ({ getAttribute: () => href }) }, preventDefault: () => { prevented = true; } });
      assert.equal(destination, expected, href);
      assert.equal(prevented, expected !== undefined, href);
    }
    for (const [index, el] of items.entries()) {
      click(el.dataset.sourceScene, el.dataset.librettoItem, index);
      for (const alias of el.section.routeAliases || []) click(el.dataset.sourceScene, alias, index);
    }
    for (const scene of act.scenes) {
      const canonical = items.findIndex(el => Number(el.dataset.sourceScene) === scene.number && Number(el.dataset.librettoItem) === 0);
      const alias = anchors.get(`#libretto-section-${act.number}-${scene.number}-0`);
      click(scene.number, 0, canonical >= 0 ? canonical : alias ? items.indexOf(alias.closest()) : items.findIndex(el => Number(el.dataset.sourceScene) === scene.number));
    }
    click(999, 999, undefined);
  }
});
