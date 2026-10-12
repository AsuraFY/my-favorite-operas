import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderMusicalPage, renderMusicalsPage } from "../src/musicals-page.js";

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
