import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { librettoCatalog } from "../src/data/libretto-registry.js";
import { operas } from "../src/data/operas.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceDir = join(root, "src");
function filesIn(dir, extension) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? filesIn(path, extension) :
      path.endsWith(extension) ? [path] : [];
  });
}
function localAsset(path, base, origin) {
  const clean = path.split(/[?#]/)[0];
  const resolved = resolve(base, clean);
  const rel = relative(root, resolved);
  assert.ok(rel && rel !== ".." && !rel.startsWith(".." + sep) && !rel.startsWith(sep),
    origin + ": local asset escapes repository: " + path);
  assert.ok(existsSync(resolved), origin + ": missing local file " + path + " (" + rel + ")");
}
function rootAsset(value, origin) {
  const cleaned = value.startsWith("./") ? value.slice(2) : value;
  localAsset(cleaned, root, origin);
}

test("all shipped JavaScript modules have resolvable static and lazy imports", () => {
  let checked = 0;
  for (const file of filesIn(sourceDir, ".js")) {
    const source = readFileSync(file, "utf8");
    // Handles import { x } from "./x.js" and import("./x.js?v=revision").
    for (const match of source.matchAll(/\b(?:from\s*|import\s*\(\s*)["'](\.[^"']+)["']/g)) {
      localAsset(match[1], dirname(file), relative(root, file));
      checked++;
    }
  }
  assert.ok(checked >= 45, "Expected to check source imports, including every opera's lazy modules");
});

test("all local HTML, catalogue artwork, and CSS image assets exist", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  let entryCount = 0;
  for (const match of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    rootAsset(match[1], "HTML entry");
    entryCount++;
  }
  assert.ok(entryCount >= 2, "HTML should load its stylesheet and bootstrap");

  const css = readFileSync(join(root, "styles.css"), "utf8");
  let cssCount = 0;
  for (const match of css.matchAll(/url\(\s*(['"]?)(\.\/[^)'"]+)\1\s*\)/g)) {
    rootAsset(match[2], "CSS");
    cssCount++;
  }
  assert.ok(cssCount >= 5, "Expected to check the site's illustrated CSS backgrounds");

  let imageCount = 0;
  for (const file of filesIn(sourceDir, ".js")) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(/["'](\.\/public\/images\/[^"'?\s]+\.(?:webp|png|svg|jpe?g))["']/g)) {
      rootAsset(match[1], relative(root, file));
      imageCount++;
    }
  }
  assert.ok(imageCount >= 30, "Expected catalogue and artwork references to be validated");

  for (const opera of operas) if (opera.image) rootAsset(opera.image, opera.slug);
  for (const libretto of librettoCatalog) {
    if (libretto.mobileArtworkUrl) rootAsset(libretto.mobileArtworkUrl, libretto.slug);
  }
});

test("eleven completed operas agree with the 31-entry catalogue and rendered reader routes", () => {
  const catalog = new Map(operas.map(opera => [opera.slug, opera]));
  assert.equal(catalog.size, 31);
  assert.equal(librettoCatalog.length, 12);
  for (const libretto of librettoCatalog) {
    const metadata = catalog.get(libretto.slug);
    assert.ok(metadata, "Missing catalogue entry " + libretto.slug);
    assert.equal(libretto.acts.length, libretto.partialLibretto ? 1 : metadata.acts, libretto.slug + ": wrong available act count");
    assert.ok(libretto.acts.every((act, i) => act.number === i + 1 && act.scenes.length > 0),
      libretto.slug + ": act sequence or scene missing");
    assert.ok(libretto.originalLanguage && libretto.translationLanguage,
      libretto.slug + ": bilingual column heading missing");
  }
});
