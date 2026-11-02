import test from 'node:test';
import assert from 'node:assert/strict';
import {manon} from '../src/data/operas/librettos/manon/bundle.js';
import {dieWalkure} from '../src/data/operas/librettos/die-walkure/bundle.js';
import {laFanciullaDelWest} from '../src/data/operas/librettos/la-fanciulla-del-west/bundle.js';
import {fanciullaActOneListeningOutline} from '../src/data/operas/librettos/la-fanciulla-del-west/outline-act-1.js';

const turns = act => act.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
test('Manon Prélude is immediately before Act II setting and not repeated at Act I end',()=>{
 const first=turns(manon.acts[0]),second=turns(manon.acts[1]);
 assert.equal(first[0].original.split('\n')[0], 'Prélude');
 assert.notEqual(first.at(-1).original, 'Prélude');
 assert.equal(second[0].original, 'Prélude');
 assert.equal(second[0].translation, 'Prelude');
 assert.equal(second[0].shortCue, false);
 assert.match(second[1].original,/^L'appartement de la rue Vivienne/);
 assert.deepEqual(manon.acts.map(a=>turns(a).length),[274,226,240,180,80]);
 assert.equal(manon.acts[2].scenes.length,2);
});
test('Manon and Die Walküre stage directions are intentionally classified without changing text',()=>{
 for(const opera of [manon,dieWalkure]) {
  for(const act of opera.acts){
   const dirs=turns(act).filter(t=>t.speaker==='Stage direction');
   assert.ok(dirs.length);
   assert.ok(dirs.some(t=>t.shortCue===true));
   assert.ok(dirs.some(t=>t.shortCue===false));
   assert.ok(dirs.every(t=>typeof t.shortCue==='boolean'&&t.original.trim()&&t.translation.trim()));
  }
 }
 assert.equal(turns(dieWalkure.acts[1])[0].shortCue,false);
 assert.equal(turns(dieWalkure.acts[2])[0].shortCue,false);
});
test('Fanciulla Act I has explicit source-grounded English headings in both outlines',()=>{
 const expected=new Map([['Introduzione','Introduction'],['Hello, Nick!','Hello, Nick!'],['Hello, Minnie!','Hello, Minnie!']]);
 const sections=laFanciullaDelWest.acts[0].scenes.flatMap(s=>s.sections);
 for(const [orig,en] of expected){
  assert.equal(sections.find(x=>x.originalTitle===orig)?.translatedTitle,en);
  assert.equal(fanciullaActOneListeningOutline.find(x=>x.originalTitle===orig)?.translatedTitle,en);
 }
 assert.equal(sections.length,22);
});
