import test from 'node:test';
import assert from 'node:assert/strict';
import {carmenActTwoScenes} from '../src/data/operas/librettos/carmen/act-2.js';
import {carmenActThreeScenes} from '../src/data/operas/librettos/carmen/act-3.js';
import {carmenActFourScenes} from '../src/data/operas/librettos/carmen/act-4.js';

test('Carmen Acts II–IV preserve sections, turns and source-checked repairs',()=>{
 const groups=[carmenActTwoScenes,carmenActThreeScenes,carmenActFourScenes];
 assert.deepEqual(groups.map(a=>a.length),[1,1,1]);
 assert.deepEqual(groups.map(a=>a[0].sections.length),[14,12,5]);
 assert.deepEqual(groups.map(a=>a[0].sections.flatMap(s=>s.turns).length),[387,244,101]);
 const [two,three,four]=groups.map(a=>a[0].sections.flatMap(s=>s.turns));
 assert.ok(two.some(t=>t.original.includes("Tu ne m'as pas compris")));
 assert.ok(two.some(t=>t.speaker==="FRASQUITA, MERCÉDÈS, LE DANCAÏRE et LE REMENDADO"));
 assert.ok(two.some(t=>t.translation.includes('I tried in vain')));
 assert.ok(two.some(t=>t.translation.includes('Toreador, be on guard')));
 assert.ok(three.some(t=>t.original.includes('Au fond du coeur, je meurs')));
 assert.ok(four.some(t=>t.original.includes('hardis chulos')));
 for(const turn of [...two,...three,...four]) {
  assert.ok(turn.translation.trim());
  assert.ok(!/FRASQUJTA|hardis chubs|Au fond du cour|Tu ne m'a pas compris/.test(turn.speaker+' '+turn.original));
 }
});
