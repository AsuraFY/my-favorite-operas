import test from 'node:test';
import assert from 'node:assert/strict';
import {fledermausGermanAct1Source} from '../src/data/drafts/die-fledermaus-german-act-1.js';
import {fledermausGermanAct2Source} from '../src/data/drafts/die-fledermaus-german-act-2.js';
import {fledermausGermanAct3Source} from '../src/data/drafts/die-fledermaus-german-act-3.js';
import {fledermausOpeningEnglishDraft} from '../src/data/drafts/die-fledermaus-english-opening.js';
import {hasCompleteLibretto} from '../src/data/libretto-loader.js';
const acts=[fledermausGermanAct1Source,fledermausGermanAct2Source,fledermausGermanAct3Source];
test('Die Fledermaus German source retains every one of the 2,294 line records',()=>{
 assert.deepEqual(acts.map(a=>a.scenes.length),[7,7,7]);
 assert.deepEqual(acts.map(a=>a.scenes.reduce((n,s)=>n+s.sourceLines.length,0)),[772,903,619]);
 for(const [i,act] of acts.entries()){
  assert.equal(act.actNumber,i+1);
  for(const scene of act.scenes)for(const line of scene.sourceLines){
   assert.ok(line.original.trim()); assert.ok(line.speaker);assert.ok(['sung','dir'].includes(line.kind));
  }
 }
 const german=acts.flatMap(a=>a.scenes.flatMap(s=>s.sourceLines.map(l=>l.original))).join('\n');
 assert.match(german,/Täubchen, das entflattert ist/);
 assert.match(german,/Mein Herr Marquis/);
 assert.match(german,/Champagner hat.s verschuldet/);
});
test('Opening English working translation has exact German source anchors',()=>{
 const source=acts[0].scenes[1].sourceLines;
 assert.ok(fledermausOpeningEnglishDraft.length>=30);
 for(const row of fledermausOpeningEnglishDraft){
  assert.equal(row.original,source[row.sourceIndex].original);
  assert.equal(row.speaker,source[row.sourceIndex].speaker);
  assert.ok(row.translation.trim());
 }
});
test('Die Fledermaus is staged, not falsely advertised as a complete bilingual reader',()=>{
 assert.equal(hasCompleteLibretto('die-fledermaus'),false);
 assert.match(acts[0].workingStatus,/translation pending/);
});
