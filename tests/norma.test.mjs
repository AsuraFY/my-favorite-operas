import test from 'node:test';
import assert from 'node:assert/strict';
import { normaActOneScenes } from '../src/data/libretto-norma-act-1.js';
import { normaActTwoScenes } from '../src/data/libretto-norma-act-2.js';
import { norma } from '../src/data/libretto-norma-bundle.js';
import { hasCompleteLibretto, loadLibretto } from '../src/data/libretto-loader.js';
const acts=[normaActOneScenes,normaActTwoScenes];
const turns=act=>act.flatMap(scene=>scene.sections.flatMap(section=>section.turns));

test('Norma has both acts and the twenty source scenes',()=>{
 assert.deepEqual(acts.map(a=>a.length),[9,11]);
 assert.equal(norma.acts.length,2);
 for(const [i,act] of acts.entries()){
  assert.deepEqual(act.map(s=>s.number),Array.from({length:[9,11][i]},(_,j)=>j+1));
  assert.ok(act.every(s=>s.sections.every(x=>x.turns.length)));
 }
});
test('Norma Italian and independent English working text preserve original verse and direction breaks',()=>{
 for(const act of acts)for(const t of turns(act)){
  assert.ok(t.original.trim()&&t.translation.trim());
  assert.ok(t.speaker&&t.speakerTranslation);
  assert.equal(t.original.split('\n').length,t.translation.split('\n').length);
 }
});
test('Norma key vocal passages and tragic ending remain intact',()=>{
 const a=turns(acts[0]).map(x=>x.original).join('\n');
 const b=turns(acts[1]).map(x=>x.original).join('\n');
 assert.match(a,/Casta diva/);
 assert.match(a,/Ei! Pollion/);
 assert.match(b,/Son madre/);
 assert.match(b,/sei permesso a un genitor/);
});
test('Norma loads on demand with explicit AI translation review status',async()=>{
 assert.ok(hasCompleteLibretto('norma'));
 const v=await loadLibretto('norma');
 assert.equal(v.slug,'norma');
 assert.equal(v.acts.length,2);
 assert.match(v.source,/awaiting editorial review/);
});
