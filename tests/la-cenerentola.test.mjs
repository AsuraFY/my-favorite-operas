import test from 'node:test';
import assert from 'node:assert/strict';
import {cenerentolaActOneScenes} from '../src/data/libretto-la-cenerentola-act-1.js';
import {cenerentolaActTwoScenes} from '../src/data/libretto-la-cenerentola-act-2.js';
import {laCenerentola} from '../src/data/libretto-la-cenerentola-bundle.js';
import {hasCompleteLibretto,loadLibretto} from '../src/data/libretto-loader.js';
const acts=[cenerentolaActOneScenes,cenerentolaActTwoScenes];
const allTurns=scenes=>scenes.flatMap(s=>s.sections.flatMap(x=>x.turns));
test('La Cenerentola includes fifteen scenes in Act I and ten in Act II',()=>{
 assert.equal(laCenerentola.acts.length,2);
 assert.deepEqual(acts.map(x=>x.length),[15,10]);
 for(const [i,act] of acts.entries())assert.deepEqual(act.map(x=>x.number),Array.from({length:[15,10][i]},(_,j)=>j+1));
});
test('All La Cenerentola Italian source passages and stage directions retain independent English line pairing',()=>{
 for(const act of acts)for(const t of allTurns(act)){
  assert.ok(t.speaker&&t.speakerTranslation);
  assert.ok(t.original.trim()&&t.translation.trim());
  assert.equal(t.original.split('\n').length,t.translation.split('\n').length,t.original.slice(0,80));
 }
});
test('La Cenerentola opening, palace reversals, and forgiveness finale remain intact',()=>{
 const a=allTurns(acts[0]).map(t=>t.original).join('\n');
 const b=allTurns(acts[1]).map(t=>t.original).join('\n');
 assert.match(a,/Una volta c'era un re/);
 assert.match(b,/Ma una serva/);
 assert.match(b,/Questo è un nodo avviluppato/);
 assert.match(b,/Nacqui all'affanno, al pianto/);
 assert.match(allTurns(acts[1]).at(-1).original,/incomincia a giubilar/);
});
test('La Cenerentola is lazy-loadable and explicitly marked as an unreviewed AI working translation',async()=>{
 assert.equal(hasCompleteLibretto('la-cenerentola'),true);
 const data=await loadLibretto('la-cenerentola');
 assert.equal(data.slug,'la-cenerentola');
 assert.equal(data.acts.length,2);
 assert.match(data.synopsis.eyebrow,/AI-generated English working translation awaiting editorial review/);
});
