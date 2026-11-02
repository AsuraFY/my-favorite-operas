import test from 'node:test';
import assert from 'node:assert/strict';
import {trovatoreActTwoScenes} from '../src/data/operas/librettos/il-trovatore/act-2.js';

test('Il trovatore Part II Scene IV correctly separates Count and Manrico sung lines',()=>{
 const scene=trovatoreActTwoScenes[3];
 const section=scene.sections[0];
 assert.equal(scene.number,4);
 assert.ok(section.participants.includes('Count di Luna'));
 assert.ok(section.participants.includes('Manrico'));
 const count=section.turns.find(t=>t.speaker==='CONTE'&&t.original.startsWith('Dunque gli estinti'));
 const manrico=section.turns.find(t=>t.speaker==='MANRICO'&&t.original.startsWith("Né m'ebbe il ciel"));
 assert.ok(count && manrico);
 assert.ok(count.original.includes('Fuggi da lei, da me.'));
 assert.ok(!count.original.includes("Né m'ebbe il ciel"));
 assert.ok(manrico.original.includes('Quel Dio soccorse a me.'));
 assert.ok(manrico.translation.includes('That God came to my aid.'));
 assert.ok(!manrico.translation.includes('Flee from her'));
 const idx=section.turns.indexOf(count);
 assert.equal(section.turns[idx+1],manrico);
});
