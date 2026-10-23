import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";

test("Così Act I Fiordiligi's eight-line passage uses real bilingual verse boundaries", () => {
  const opera = getLibretto("cosi-fan-tutte");
  let found;
  for (const scene of opera.acts[0].scenes) {
    for (const [index, section] of scene.sections.entries()) {
      const turn = section.turns.find(turn => (turn.it ?? "").startsWith("Fuori di questo loco"));
      if (turn) found = { scene, section, index, turn };
    }
  }
  assert.ok(found, "Fiordiligi passage is present");
  assert.equal(found.turn.speaker, "Fiordiligi");
  assert.equal(found.turn.it.split("\\n").length, 8);
  assert.equal(found.turn.en.split("\\n").length, 8);
  assert.ok(!found.turn.it.includes(String.raw`\\n`));
  assert.ok(!found.turn.en.includes(String.raw`\\n`));
  globalThis.window = { location: { hash: "#/operas/cosi-fan-tutte?act=1" } };
  const page = createLibrettoRenderer(opera).scene(found.scene.number);
  assert.ok(page.includes("Fuori di questo loco"));
  assert.ok(page.includes("libretto-row--verse-split"));
});
