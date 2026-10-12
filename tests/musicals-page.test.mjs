import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderMusicalPage, renderMusicalsPage } from "../src/musicals-page.js";

test("the musicals directory card opens the Mahler detail page", () => {
  const page = renderMusicalsPage();
  assert.ok(page.includes('href="#/musicals/mahler-symphony-2-resurrection"'));
  assert.ok(page.includes("Gustav Mahler"));
  assert.ok(page.includes("Choral symphony"));
});

test("the musical detail page has About and Lyrics tabs and factual work details", () => {
  const page = renderMusicalPage("about");
  for (const text of ["About", "Lyrics", "aria-current=\"page\"", "Choral symphony", "Friedrich Klopstock and Gustav Mahler", "About this work"]) {
    assert.ok(page.includes(text), `missing ${text}`);
  }
  assert.ok(page.includes("?view=lyrics"));
});

test("the lyrics view contains aligned German and English text", () => {
  const page = renderMusicalPage("lyrics");
  assert.ok(page.includes('aria-current="page"'));
  assert.ok(page.includes('lang="de"'));
  assert.ok(page.includes('lang="en"'));
  assert.ok(page.includes("Aufersteh’n, ja aufersteh’n wirst du"));
  assert.ok(page.includes("All that you have struggled for"));
});

test("the musical artwork is a WebP image", () => {
  const raw = readFileSync("public/images/opera-house-hero.webp");
  assert.equal(raw.toString("ascii", 0, 4), "RIFF");
  assert.equal(raw.toString("ascii", 8, 12), "WEBP");
});
