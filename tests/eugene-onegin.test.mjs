import test from 'node:test';
import assert from 'node:assert/strict';
import {eugeneOnegin} from '../src/data/operas/librettos/eugene-onegin/bundle.js';
import {hasCompleteLibretto} from '../src/data/operas/libretto-loader.js';
test('Eugene Onegin English-first reader retains all 1434 English records without fake Russian',()=>{
 assert.equal(eugeneOnegin.acts.length,3);
 let count=0;
 for(const act of eugeneOnegin.acts)for(const scene of act.scenes)for(const section of scene.sections){count+=section.sourceLineCount;for(const turn of section.turns){assert.ok(turn.translation);assert.equal(turn.original,'');}}
 assert.equal(count,1434);assert.ok(hasCompleteLibretto('eugene-onegin'));
});

test('Eugene Onegin retains all seven source-supported tableaux with stable English record indices',()=>{
 assert.deepEqual(eugeneOnegin.acts.map(a=>a.scenes.length),[3,2,2]);
 const counts=[704,438,292];
 for(const [i,act] of eugeneOnegin.acts.entries()){
   const turns=act.scenes.flatMap(s=>s.sections.flatMap(x=>x.turns));
   const all=turns.flatMap(t=>Array.from({length:t.sourceLineCount},(_,j)=>t.sourceStartIndex+j));
   assert.deepEqual(all,Array.from({length:counts[i]},(_,j)=>j),'all source records in original sequence');
   for(const scene of act.scenes){
     assert.match(scene.translatedHeading,/^Scene [1-7] — /);
     assert.ok(scene.sections.length>0);
   }
 }
 const scenes=eugeneOnegin.acts.flatMap(a=>a.scenes);
 assert.deepEqual(scenes.map(s=>Number(s.translatedHeading.match(/^Scene (\d+)/)[1])),[1,2,3,4,5,6,7]);
 assert.ok(scenes[1].sections[0].turns[0].translation.includes('Tatyana\'s room'));
 assert.ok(scenes[4].sections[0].turns[0].translation.includes('A rustic water-mill'));
 assert.ok(scenes[6].sections[0].turns[0].translation.includes('The drawing room of Prince Gremin'));
});
