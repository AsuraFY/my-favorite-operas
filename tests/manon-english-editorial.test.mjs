import test from 'node:test';
import assert from 'node:assert/strict';
import {manon} from '../src/data/operas/librettos/manon/bundle.js';

const turns=(act)=>manon.acts[act-1].scenes.flatMap(s=>s.sections.flatMap(sec=>sec.turns));
const matching=(act,fragment)=>turns(act).find(t=>t.original.includes(fragment));

test('Manon character name Poussette is not machine-translated as a common noun',()=>{
 for(const act of [1,3,4]){
   for(const turn of turns(act)) {
     assert.doesNotMatch(turn.translation,/\b(?:STROLLER|Stroller|PUSSETTE|LESSAUT)\b/);
   }
 }
 assert.equal(matching(3,'Bonjour, Poussette!')?.translation,'Hello, Poussette!');
});

test('Manon Act III market vendor false friends have contextual English equivalents',()=>{
 const vendor=matching(3,'Voyez mules à fleurettes!\nRouge, mouches et manchettes!');
 assert.ok(vendor);
 assert.match(vendor.translation,/flowered slippers/);
 assert.match(vendor.translation,/beauty patches/);
 assert.match(vendor.translation,/snuff graters/);
 assert.doesNotMatch(vendor.translation,/flowery mules|Red, flies and cuffs/);
 assert.equal(vendor.original.split('\n').length,vendor.translation.split('\n').length,'preserve parallel verse breaks');
});

test('Manon Act IV comic poetry is verses rather than worms or meaningless machine phrasing',()=>{
 const verse=matching(4,"J'enfourche aussi Pégase");
 assert.ok(verse);
 assert.match(verse.translation,/clever verse/);
 assert.match(verse.translation,/veil my meaning/);
 assert.doesNotMatch(verse.translation,/clever worms|I'm gasping/);
 assert.equal(verse.original.split('\n').length,verse.translation.split('\n').length);
});

test('Manon Act I opening corrects the point of view of the impatient guest',()=>{
 const opening=matching(1,"Holà! Hé! Monsieur l'Hôtelier?");
 assert.ok(opening);
 assert.match(opening.translation,/How long must we shout/);
 assert.doesNotMatch(opening.translation,/How long should you shout/);
});
