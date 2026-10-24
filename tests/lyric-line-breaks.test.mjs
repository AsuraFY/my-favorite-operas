import test from "node:test";
import assert from "node:assert/strict";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

function render(turns) {
  globalThis.window = { location: { hash: "#/operas/lyric-line-check?act=1" } };
  const libretto = {
    slug: "lyric-line-check",
    opera: { title: "Lyric line check", composer: "Test composer" },
    originalLanguage: "Italiano", translationLanguage: "English",
    characters: ["Solo"],
    acts: [{ number: 1, originalHeading: "Atto primo",
      scenes: [{ number: 1, summary: "Test passage.",
        sections: [{ label: "Passage", type: "Passage", turns }] }] }]
  };
  return createLibrettoRenderer(libretto).scene(1);
}

const lyricRows = html => (html.match(/<div class="libretto-row(?: libretto-row--verse-[^"]+)?"/g) || []).length;
const directionRows = html => (html.match(/<div class="libretto-row libretto-row--stage-direction"/g) || []).length;

test("punctuation alone never creates artificial lyric breaks", () => {
  const page = render([{ speaker: "Solo",
    original: "Dolce, vivo! Perché? — Sempre.",
    translation: "Sweet, alive! Why? — Always." }]);
  assert.equal(lyricRows(page), 1);
  assert.match(page, /Dolce, vivo! Perché\? — Sempre\.<\/p>/);
  assert.match(page, /Sweet, alive! Why\? — Always\.<\/p>/);
  assert.doesNotMatch(page, /Dolce,<br>|vivo!<br>|Perché\?<br>/);
});

test("matched source verse divisions remain bilingual rows", () => {
  const page = render([{ speaker: "Solo",
    original: "Sento il mare,\nche mi chiama!",
    translation: "I hear the sea,\ncalling to me!" }]);
  assert.equal(lyricRows(page), 2);
  assert.match(page, /Sento il mare,<\/p>/);
  assert.match(page, /che mi chiama!<\/p>/);
  assert.match(page, /I hear the sea,<\/p>/);
  assert.match(page, /calling to me!<\/p>/);
  assert.match(page, /libretto-row--verse-start/);
  assert.match(page, /libretto-row--verse-end/);
});

test("unmatched line counts remain one intact paired passage", () => {
  const page = render([{ speaker: "Solo",
    original: "Uno;\nDue!", translation: "One; two!" }]);
  assert.equal(lyricRows(page), 1);
  assert.match(page, /Uno;<br>Due!<\/p>/);
  assert.match(page, /One; two!<\/p>/);
  assert.match(page, /id="libretto-section-1-1-0"/);
});

test("stage directions retain brackets and the short cue rule", () => {
  const page = render([
    { speaker: "Stage direction", original: "entra", translation: "enters", shortCue: true },
    { speaker: "Stage direction", original: "Il sipario si apre.", translation: "The curtain rises." }
  ]);
  assert.equal(directionRows(page), 2);
  assert.match(page, /\[entra\]/);
  assert.match(page, /\[enters\]/);
  assert.match(page, /\[Il sipario si apre\.\]/);
  assert.equal((page.match(/libretto-speaker--stage-direction/g) || []).length, 2);
});
