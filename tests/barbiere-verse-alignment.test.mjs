import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";

const barbiere = getLibretto("il-barbiere-di-siviglia");

test("both Barbiere acts retain bilingual verses, matching passage counts, and stage directions", () => {
  assert.deepEqual(barbiere.acts.map(act => act.scenes.length), [16, 11]);
  assert.deepEqual(barbiere.acts.map(act =>
    act.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns)).length), [399, 284]);

  for (const act of barbiere.acts) {
    for (const scene of act.scenes) {
      for (const section of scene.sections) {
        for (const turn of section.turns) {
          const original = turn.it.split("\n");
          const english = turn.en.split("\n");
          assert.equal(original.length, english.length,
            `Act ${act.number}, Scene ${scene.number}, ${turn.speaker}: bilingual verse count`);
          assert.ok(turn.it.trim() && turn.en.trim(), "both translations must be populated");
          assert.ok(!turn.it.includes(String.raw`\n`) && !turn.en.includes(String.raw`\n`),
            "source line breaks must not be literal backslash-n text");
          for (let i = 0; i < original.length; i++) {
            if (original[i].trim() === "") {
              assert.equal(english[i].trim(), "",
                `Act ${act.number}, Scene ${scene.number}: preserve stanza boundaries`);
            }
          }
        }
      }
    }
  }
});

test("La calunnia's seven second-stanza verses align without changing Italian", () => {
  const aria = barbiere.acts[0].scenes[7].sections.find(section =>
    section.originalTitle === "La calunnia è un venticello");
  assert.ok(aria, "Basilio's Act I aria is present");
  assert.equal(aria.turns.length, 1);
  const { it, en } = aria.turns[0];
  assert.equal(it.split("\n").length, 34);
  assert.equal(en.split("\n").length, 34);
  assert.deepEqual(it.split("\n").slice(9, 13), [
    "nelle orecchie della gente", "s'introduce destramente,",
    "e le teste ed i cervelli", "fa stordire e fa gonfiar."
  ]);
  assert.deepEqual(en.split("\n").slice(9, 13), [
    "into people's ears", "it slips deftly,",
    "and makes their heads and minds", "dizzy and swollen."
  ]);
});
