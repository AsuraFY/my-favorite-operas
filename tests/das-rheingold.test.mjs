import test from 'node:test';
import assert from 'node:assert/strict';
import { rheingoldScenes } from '../src/data/libretto-das-rheingold-scenes.js';
import { dasRheingold } from '../src/data/libretto-das-rheingold-bundle.js';
import { hasCompleteLibretto,loadLibretto } from '../src/data/libretto-loader.js';
import { getLibretto } from '../src/data/libretto-registry.js';
import { createLibrettoRenderer } from '../src/libretto-reader.js';
import { resetReaderLocation } from './helpers/libretto-helpers.mjs';
test('Das Rheingold is one act with exactly four source scenes',()=>{
 assert.deepEqual(dasRheingold.acts.map(a=>a.number),[1]);
 assert.deepEqual(rheingoldScenes.map(s=>s.originalHeading),['ERSTE SZENE','ZWEITE SZENE','DRITTE SZENE','VIERTE SZENE']);
 assert.deepEqual(rheingoldScenes.map(s=>s.sections.reduce((n,x)=>n+x.sourceLineCount,0)),[286,489,322,484]);
});
test('All 1,581 original German records have complete paired English and proper line breaks',()=>{
 let count=0;
 for(const scene of rheingoldScenes){
  let cursor=0;
  for(const section of scene.sections){
   assert.ok(section.originalTitle&&section.translatedTitle);
   assert.equal(section.sourceStartIndex,cursor);
   for(const turn of section.turns){
    assert.equal(turn.sourceStartIndex,cursor);
    assert.ok(turn.speaker&&turn.speakerTranslation&&turn.original.trim()&&turn.translation.trim());
    assert.equal(turn.original.split('\n').length,turn.translation.split('\n').length);
    cursor+=turn.sourceLineCount;
    count+=turn.sourceLineCount;
   }
  }
  assert.ok(cursor>200);
 }
 assert.equal(count,1581);
});
test('Das Rheingold German landmarks and finale survive intact',()=>{
 const german=rheingoldScenes.flatMap(s=>s.sections.flatMap(p=>p.turns.map(t=>t.original))).join('\n');
 assert.match(german,/Weia! Waga! Woge, du Welle/);
 assert.match(german,/Rheingold! Rheingold! Reines Gold!/);
 assert.match(german,/falsch und feig ist, was dort oben sich freut/);
});
test('The complete reader is lazy-loaded with navigable German-English scenes and editorial caveat',async()=>{
 assert.equal(hasCompleteLibretto('das-rheingold'),true);
 const loaded=await loadLibretto('das-rheingold');
 assert.equal(loaded.acts.length,1);
 assert.equal(getLibretto('das-rheingold').slug,'das-rheingold');
 assert.match(loaded.synopsis.eyebrow,/editorial review pending/);
 resetReaderLocation();
 const reader=createLibrettoRenderer(loaded);
 const outline=reader.outline();
 for(const scene of rheingoldScenes)for(const section of scene.sections){
  const url='#/operas/das-rheingold?act=1&scene='+scene.number+'&item='+scene.sections.indexOf(section);
  assert.ok(outline.includes(url),url);
 }
});
