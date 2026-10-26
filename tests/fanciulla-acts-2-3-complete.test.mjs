import test from "node:test";
import assert from "node:assert/strict";
import { fanciullaActTwoScenes } from "../src/data/libretto-la-fanciulla-del-west-act-2.js";
import { fanciullaActThreeScenes } from "../src/data/libretto-la-fanciulla-del-west-act-3.js";
import { laFanciullaDelWest } from "../src/data/libretto-la-fanciulla-del-west-bundle.js";
import { loadLibretto } from "../src/data/libretto-loader.js";

for (const [act, scenes, expected, sectionCount] of [[2,fanciullaActTwoScenes,559,12],[3,fanciullaActThreeScenes,343,11]]) {
 test(`Act ${act} has complete PDF source entries, bilingual drafts and listening sections`,()=>{
  const sections=scenes.flatMap(s=>s.sections);
  assert.equal(sections.length,sectionCount);
  const turns=sections.flatMap(s=>s.turns);
  const ids=[...new Set(turns.map(t=>t.sourceTurn).filter(n=>Number.isInteger(n)))].sort((a,b)=>a-b);
  assert.deepEqual(ids,Array.from({length:expected},(_,i)=>i));
  assert.ok(turns.every(t=>t.original.trim()&&t.translation.trim()));
  assert.ok(turns.every(t=>t.original.split("\\n").length===t.translation.split("\\n").length));
  assert.ok(turns.some(t=>t.speaker==="Stage direction"));
  assert.ok(sections.every(s=>s.originalTitle&&s.translatedTitle&&s.participants.length));
 });
}
test("Fanciulla has all three acts in existing on-demand libretto reader",async()=>{
 const bundle=await loadLibretto("la-fanciulla-del-west");
 assert.equal(bundle.acts.length,3);
 assert.deepEqual(bundle.acts.map(a=>a.number),[1,2,3]);
 assert.equal(bundle.continuousAct,true);
 assert.equal(bundle.sceneDivisions,false);
 assert.equal(laFanciullaDelWest.slug,bundle.slug);
});