import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

globalThis.window = { location: { hash: "" } };
const count = (html, pattern) => (html.match(pattern) || []).length;

for (const slug of ["cosi-fan-tutte", "tristan-und-isolde"]) {
  test(`${slug}: every deep link retains its full act and targets the right section`, () => {
    const libretto = getLibretto(slug);
    const reader = createLibrettoRenderer(libretto);
    assert.equal(libretto.continuousAct, true);
    for (const act of libretto.acts) {
      const sections = act.scenes.flatMap(scene => scene.sections);
      let offset = 0;
      for (const scene of act.scenes) {
        for (let item = 0; item < scene.sections.length; item++) {
          window.location.hash = `#/operas/${slug}?act=${act.number}&scene=${scene.number}&item=${item}`;
          const page = reader.scene(scene.number, "", item);
          assert.ok(page.includes('data-continuous-act="true"'));
          assert.ok(page.includes(`data-initial-item="${offset + item}"`));
          assert.equal(count(page, /class="libretto-scene-section"/g), sections.length);
          for (const sourceScene of act.scenes) {
            assert.ok(page.includes(`id="libretto-scene-${act.number}-${sourceScene.number}"`));
            for (let index = 0; index < sourceScene.sections.length; index++) {
              assert.ok(page.includes(`id="libretto-section-${act.number}-${sourceScene.number}-${index}"`));
            }
          }
          assert.ok(page.includes(`End of Act ${["", "I", "II", "III"][act.number]}`));
          assert.ok(!page.includes('aria-label="Scene navigation at end of scene"'));
          for (const other of libretto.acts.filter(other => other !== act)) {
            assert.ok(!page.includes(`id="libretto-scene-${other.number}-1"`));
          }
        }
        offset += scene.sections.length;
      }
    }
  });
}
