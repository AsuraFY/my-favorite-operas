import test from 'node:test';
import assert from 'node:assert/strict';
import {trovatoreActOneScenes} from '../src/data/operas/librettos/il-trovatore/act-1.js';
import {trovatoreActTwoScenes} from '../src/data/operas/librettos/il-trovatore/act-2.js';
import {trovatoreActThreeScenes} from '../src/data/operas/librettos/il-trovatore/act-3.js';
import {trovatoreActFourScenes} from '../src/data/operas/librettos/il-trovatore/act-4.js';

test('Il trovatore manually reviewed verses retain original-line count and speaker continuity',()=>{
 const parts=[trovatoreActOneScenes,trovatoreActTwoScenes,trovatoreActThreeScenes,trovatoreActFourScenes];
 assert.deepEqual(parts.map(p=>p.length),[5,5,6,4]);
 assert.deepEqual(parts.map(p=>p.flatMap(s=>s.sections.flatMap(x=>x.turns)).length),[95,145,108,157]);
 for(const [index,part] of parts.entries()){
  for(const [scene,sc] of part.entries()) for(const sec of sc.sections) for(const [i,t] of sec.turns.entries()){
   assert.ok(t.original.trim() && t.translation.trim(), `Part ${index+1} scene ${scene+1} turn ${i}`);
   assert.ok(t.speaker && t.speakerTranslation);
   if(t.speaker!=='Stage direction') assert.equal(t.translation.split('\n').length,t.original.split('\n').length,`Part ${index+1} scene ${scene+1} ${t.speaker} turn ${i}`);
  }
 }
 const azucena=parts[1][0].sections[0].turns.find(t=>t.original.startsWith('A me, se vivi ancora'));
 assert.ok(azucena.translation.includes('mother'));
 const count=parts[1][3].sections[0].turns.find(t=>t.speaker==='CONTE'&&t.original.startsWith('Dunque gli estinti'));
 assert.ok(count.translation.includes('threads of your days'));
});
