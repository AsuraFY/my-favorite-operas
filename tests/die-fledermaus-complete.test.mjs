import test from 'node:test';
import assert from 'node:assert/strict';
import {fledermausActOneScenes as one} from '../src/data/libretto-die-fledermaus-act-1.js';
import {fledermausActTwoScenes as two} from '../src/data/libretto-die-fledermaus-act-2.js';
import {fledermausActThreeScenes as three} from '../src/data/libretto-die-fledermaus-act-3.js';
import {dieFledermaus} from '../src/data/libretto-die-fledermaus-bundle.js';
import {hasCompleteLibretto,loadLibretto} from '../src/data/libretto-loader.js';
const acts=[one,two,three];
test('Die Fledermaus three acts preserve every source record with one English line',()=>{
 assert.deepEqual(acts.map(x=>x.length),[7,7,7]);
 const counts=acts.map(scenes=>scenes.flatMap(s=>s.sections).reduce((sum,section)=>{
  assert.ok(section.originalTitle&&section.translatedTitle);
  let total=0;for(const turn of section.turns){
   assert.ok(turn.original.trim()&&turn.translation.trim()&&turn.speaker);
   assert.equal(turn.original.split('\n').length,turn.translation.split('\n').length);
   total+=turn.sourceLineCount;
  }assert.equal(total,section.sourceLineCount);return sum+total;
 },0));
 assert.deepEqual(counts,[772,903,619]);
});
test('Die Fledermaus loads through the reader with explicitly unreviewed English',async()=>{
 assert.equal(hasCompleteLibretto('die-fledermaus'),true);
 assert.equal((await loadLibretto('die-fledermaus')).acts.length,3);
 assert.match(dieFledermaus.synopsis.eyebrow,/editorial review pending/);
});
