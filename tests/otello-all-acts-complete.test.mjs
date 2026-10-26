import test from "node:test";
import assert from "node:assert/strict";
import { otelloActOneScenes } from "../src/data/libretto-otello-act-1.js";
import { otelloActTwoScenes } from "../src/data/libretto-otello-act-2.js";
import { otelloActThreeScenes } from "../src/data/libretto-otello-act-3.js";
import { otelloActFourScenes } from "../src/data/libretto-otello-act-4.js";
import { otello } from "../src/data/libretto-otello-bundle.js";
import { hasCompleteLibretto, loadLibretto } from "../src/data/libretto-loader.js";
const acts = [otelloActOneScenes, otelloActTwoScenes, otelloActThreeScenes, otelloActFourScenes];
const sceneCounts = [3, 5, 9, 4];
for (const [a, scenes] of acts.entries()) {
 test("Otello Act "+(a+1)+": complete scene sequence, bilingual turns, working outline landmarks", () => {
  assert.equal(scenes.length, sceneCounts[a]);
  const sceneNames = scenes.map(s=>s.originalHeading);
  assert.equal(new Set(sceneNames).size, scenes.length);
  for(const scene of scenes) {
   assert.equal(scene.sections.length, 1);
   assert.ok(scene.sections[0].turns.length >= 2);
   for (const turn of scene.sections[0].turns) {
    assert.ok(turn.original.trim(), "empty Italian");
    assert.ok(turn.translation.trim(), "empty English");
    assert.equal(turn.original.split("\\n").length,turn.translation.split("\\n").length,"unaligned verse");
   }
   const seen=new Set();
   for(const entry of scene.outline) {
    assert.ok(entry.title&&entry.translation&&entry.match);
    const i=scene.sections[0].turns.findIndex((turn,n)=> (entry.sourceTurn==null||n===entry.sourceTurn) && (!entry.speaker||turn.speaker===entry.speaker) && turn.original.includes(entry.match));
    assert.ok(i>=0,"broken outline target "+entry.title);
    assert.ok(!seen.has(i),"duplicate outline target");
    seen.add(i);
    assert.ok(entry.characters.length,"missing characters in outline");
   }
  }
 });
}
test("Otello includes all four acts in existing on-demand reader", async () => {
 assert.equal(otello.acts.length,4);
 assert.deepEqual(otello.acts.map(a=>a.number),[1,2,3,4]);
 assert.equal(otello.continuousAct,true);
 assert.equal(otello.sourceSceneOutline,true);
 assert.equal(hasCompleteLibretto("otello"),true);
 assert.equal((await loadLibretto("otello")).slug,"otello");
});
