import test, {beforeEach} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {getLibretto} from '../src/data/libretto-registry.js';
import {createLibrettoRenderer} from '../src/libretto-reader.js';
import {assertActTargets, renderedVersePairs, expectedPairedRows, resetReaderLocation} from './helpers/libretto-helpers.mjs';
const work=getLibretto('samson-et-dalila');
const act=work.acts[2];
const sections=act.scenes.flatMap(s=>s.sections);
const turns=sections.flatMap(s=>s.turns);
beforeEach(resetReaderLocation);

test('Samson III preserves the complete French text, two tableaux and 211 translated sung lines',()=>{
 assert.deepEqual(work.acts.map(a=>a.number),[1,2,3]);
 assert.equal(act.scenes.length,3);
 assert.equal(sections.length,7);
 assert.deepEqual(sections.filter(s=>s.sourceDivision).map(s=>s.sourceDivision.original),['Premier tableau','Deuxième tableau']);
 assert.equal(createHash('sha256').update(turns.map(t=>t.original).join('\n')).digest('hex'),'8c23714e2ceb363b90b390cd40d56e00b7555e8a4cb89e4b4aaa3532441459e9');
 const sung=turns.filter(t=>t.speaker!=='Stage direction');
 assert.equal(sung.length,35);
 assert.equal(sung.reduce((n,t)=>n+t.original.split('\n').length,0),211);
 assert.equal(turns.length-sung.length,21);
 for(const t of turns){
  assert.ok(t.translation.trim());
  if(t.speaker!=='Stage direction'){
   assert.ok(t.speakerTranslation);
   assert.equal(t.original.split('\n').length,t.translation.split('\n').length);
  }
 }
 for(const s of sections){assert.ok(s.translatedTitle);assert.equal(s.number,undefined);assert.equal(s.participants.length,new Set(s.participants).size);}
});

test('Samson III renders whole vocal turns, sung parenthetical variants, the Bacchanale and the ending',()=>{
 window.location.hash='#/operas/samson-et-dalila?act=3';
 const page=createLibrettoRenderer(work).scene(1);
 assert.deepEqual(renderedVersePairs(page),expectedPairedRows(turns));
 const duo=sections.find(s=>s.originalTitle==='Gloire à Dagon vainqueur !');
 assert.deepEqual(duo.participants,['Dalila','High Priest of Dagon','Philistines','Samson']);
 assert.ok(page.includes('Il aidait ma (ta) faiblesse'));
 assert.ok(page.includes('He aided my (your) weakness'));
 const dance=sections.find(s=>s.originalTitle==='Bacchanale');
 assert.equal(dance.instrumental,true);
 assert.equal(dance.turns.length,0);
 assert.ok(page.includes('The temple collapses amid cries.'));
 assert.ok(page.includes('End of Act III'));
 assert.ok(!page.includes('Continue to Act IV'));
});

test('Samson III outline destinations and the full three-act navigation resolve',()=>{
 const reader=createLibrettoRenderer(work);
 const outline=reader.outline();
 assert.ok(!outline.includes('♬')&&!outline.includes('▤'));
 assertActTargets(reader,work,act);
 for(const s of act.scenes)for(const [i,section]of s.sections.entries()){
  assert.ok(outline.includes(`?act=3&scene=${s.number}&item=${i}`));
  assert.ok(outline.includes(section.translatedTitle));
 }
 for(const n of [1,2,3])assert.ok(reader.navigation().includes(`?act=${n}`));
 window.location.hash='#/operas/samson-et-dalila?act=2';
 assert.ok(reader.scene(1).includes('href="#/operas/samson-et-dalila?act=3">Continue to Act III'));
});
