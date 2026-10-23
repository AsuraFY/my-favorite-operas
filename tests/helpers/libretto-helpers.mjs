import assert from "node:assert/strict";

export const count = (html, pattern) => (html.match(pattern) || []).length;

// A source turn may render several rows: lyrics before/after an inline
// direction stay separate from the direction itself.
export function assertSceneRows(page, scene, alignLines = true) {
  let lyrics = 0, directions = 0;
  const rows = turn => {
    if (!alignLines || turn.speaker === "Stage direction") return [turn];
    const originals = String(turn.original ?? turn.it ?? "").split(/\r?\n/);
    const translations = String(turn.translation ?? turn.en ?? "").split(/\r?\n/);
    if (originals.length === 1 || originals.length !== translations.length) return [turn];
    return originals.map((line, index) => ({
      ...turn, original: line, translation: translations[index]
    }));
  };
  for (const section of scene.sections) for (const turn of section.turns.flatMap(rows)) {
    if (turn.speaker === "Stage direction") {
      directions++;
      continue;
    }
    const directionPattern = turn.inlineDirections
      ? new RegExp("(\\((?:" + turn.inlineDirections.map(cue => cue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\))")
      : /(\([^()]*\))/;
    const parts = value => turn.literalText || turn.inlineDirections?.length === 0
      ? [{ direction: false, text: value }]
      : String(value || "").split(directionPattern).filter(text => text.trim())
        .map(text => ({ direction: /^\([^()]*\)$/.test(text), text }));
    const original = parts(turn.original ?? turn.it);
    const translated = parts(turn.translation ?? turn.en);
    if (!original.some(part => part.text.trim()) && !translated.some(part => part.text.trim())) continue;
    assert.deepEqual(original.map(part => part.direction), translated.map(part => part.direction),
      `Matching lyric/direction order for ${turn.speaker}`);
    for (const part of original) part.direction ? directions++ : lyrics++;
  }
  assert.equal(count(page, /<div class="libretto-row(?: libretto-row--verse-[^"]+)?"/g),
    lyrics, "all lyric segments render");
  assert.equal(count(page, /<div class="libretto-row libretto-row--stage-direction"/g),
    directions, "all standalone and inline directions render separately");
}

const decode = text => text.replace(/&(amp|lt|gt|quot|#39);/g,
  (_, entity) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'" })[entity]);

// Each test starts with a fresh route; rendering checks must not depend on test order.
export function resetReaderLocation() {
  globalThis.window = { location: { hash: "" } };
}

// Compare rendered original/English rows while decoding their HTML entities.
export function renderedVersePairs(page) {
  return [...page.matchAll(/<div class="libretto-row([^"]*)"><div class="libretto-cell libretto-cell--german">.*?<p>(.*?)<\/p><\/div><div class="libretto-cell libretto-cell--english">.*?<p>(.*?)<\/p><\/div><\/div>/gs)]
    .map(match => [decode(match[2]), decode(match[3]), match[1].includes("stage-direction")]);
}

// Check every public section address, including stable IDs after insertions.
export function assertActTargets(reader, libretto, act) {
  const sections = act.scenes.flatMap(scene => scene.sections);
  let offset = 0;
  for (const scene of act.scenes) {
    for (const [index, section] of scene.sections.entries()) {
      const item = section.routeItem ?? index;
      window.location.hash = `#/operas/${libretto.slug}?act=${act.number}&scene=${scene.number}&item=${item}`;
      const page = reader.scene(scene.number, "", item);
      assert.ok(page.includes('data-continuous-act="true"'));
      assert.ok(page.includes(`data-initial-item="${offset + index}"`));
      assert.equal(count(page, /class="libretto-scene-section"/g), sections.length);
      for (const sourceScene of act.scenes) {
        assert.ok(page.includes(`id="libretto-scene-${act.number}-${sourceScene.number}"`));
        for (const [position, sourceSection] of sourceScene.sections.entries()) {
          assert.ok(page.includes(`id="libretto-section-${act.number}-${sourceScene.number}-${sourceSection.routeItem ?? position}"`));
        }
      }
      assert.ok(page.includes(`End of Act ${["", "I", "II", "III", "IV"][act.number]}`));
      assert.ok(!page.includes('aria-label="Scene navigation at end of scene"'));
      for (const other of libretto.acts.filter(other => other !== act)) {
        assert.ok(!page.includes(`id="libretto-scene-${other.number}-1"`));
      }
    }
    offset += scene.sections.length;
  }
}

export function expectedPairedRows(turns) {
  return turns.flatMap(turn => {
    const direction = turn.speaker === "Stage direction";
    const original = String(turn.original ?? turn.it ?? "");
    const english = String(turn.translation ?? turn.en ?? "");
    if (direction) return [[`[${original}]`.split("\n").join("<br>"), `[${english}]`.split("\n").join("<br>"), true]];
    const originalLines = original.split("\n"), englishLines = english.split("\n");
    if (originalLines.length > 1 && originalLines.length === englishLines.length) {
      return originalLines.map((line, i) => [line, englishLines[i], false]);
    }
    return [[original.split("\n").join("<br>"), english.split("\n").join("<br>"), false]];
  });
}
