import test from "node:test";
import assert from "node:assert/strict";
import { fanciullaActOneScenes } from "../src/data/libretto-la-fanciulla-del-west-act-1.js";
import { laFanciullaDelWest } from "../src/data/libretto-la-fanciulla-del-west-bundle.js";
import { hasCompleteLibretto, loadLibretto } from "../src/data/libretto-loader.js";
import { fanciullaActOneListeningOutline } from "../src/data/outline-la-fanciulla-del-west-act-1.js";

test("Fanciulla Act I has all 633 Italian source entries with paired English drafts", () => {
  const sections = fanciullaActOneScenes.flatMap(scene => scene.sections);
  assert.equal(sections.length, 22);
  const turns = sections.flatMap(section => section.turns);
  const ids = new Set(turns.map(turn => turn.sourceTurn));
  assert.deepEqual([...ids].sort((a,b)=>a-b), Array.from({length:633},(_,i)=>i));
  assert.ok(turns.every(turn => turn.original.trim() && turn.translation.trim()));
  assert.ok(turns.every(turn => turn.original.split("\\n").length === turn.translation.split("\\n").length));
  assert.ok(turns.at(0).original.includes("L’interno della"));
  assert.equal(turns.at(-1).original, "Ah!");
  assert.equal(turns.at(-1).translation, "Ah!");
  assert.deepEqual(sections.map(s=>s.originalTitle), fanciullaActOneListeningOutline.map(t=>t.originalTitle));
});
test("Act I is available through the existing on-demand reader", async () => {
  assert.equal(laFanciullaDelWest.slug,"la-fanciulla-del-west");
  assert.equal(laFanciullaDelWest.continuousAct,true);
  assert.equal(laFanciullaDelWest.acts.length,3);
  assert.equal(hasCompleteLibretto(laFanciullaDelWest.slug),true);
  assert.equal((await loadLibretto("la-fanciulla-del-west")).slug,laFanciullaDelWest.slug);
});
