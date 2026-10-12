import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const main = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");
function functionSource(name) {
  const start = main.indexOf(`function ${name}(`);
  const end = main.indexOf("\nfunction ", start + 1);
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
