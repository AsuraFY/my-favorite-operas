import test from 'node:test';
import assert from 'node:assert/strict';
import {nabuccoActOneScenes} from '../src/data/libretto-nabucco-act-1.js';
import {nabuccoActTwoScenes} from '../src/data/libretto-nabucco-act-2.js';
import {nabuccoActThreeScenes} from '../src/data/libretto-nabucco-act-3.js';
import {nabuccoActFourScenes} from '../src/data/libretto-nabucco-act-4.js';
import {nabucco} from '../src/data/libretto-nabucco-bundle.js';
import {hasCompleteLibretto,loadLibretto} from '../src/data/libretto-loader.js';
const acts=[nabuccoActOneScenes,nabuccoActTwoScenes,nabuccoActThreeScenes,nabuccoActFourScenes];
const allTurns=scenes=>scenes.flatMap(scene=>scene.sections.flatMap(section=>section.turns));

test('Nabucco preserves all four source parts and twenty-five named scenes',()=>{
 assert.equal(nabucco.acts.length,4);
 assert.deepEqual(acts.map(a=>a.length),[7,8,5,5]);
 acts.forEach((scenes,i)=>assert.deepEqual(scenes.map(s=>s.number),Array.from({length:[7,8,5,5][i]},(_,j)=>j+1)));
});
test('Nabucco Italian sung lines and stage directions have paired English working text',()=>{
 for(const scenes of acts)for(const turn of allTurns(scenes)){
  assert.ok(turn.speaker&&turn.speakerTranslation);
  assert.ok(turn.original.trim()&&turn.translation.trim());
  assert.equal(turn.original.split('\n').length,turn.translation.split('\n').length,turn.original.slice(0,60));
 }
});
test('Nabucco opening, Va pensiero and final scene are present',()=>{
 const italian=acts.map(a=>allTurns(a).map(x=>x.original).join('\n'));
 assert.match(italian[0],/Gli arredi festivi/);
 assert.match(italian[2],/Va', pensiero, sull'ali dorate/);
 assert.match(italian[3],/Servendo a jehovha/);
});
test('Nabucco loads lazily with unreviewed AI English translation label',async()=>{
 assert.ok(hasCompleteLibretto('nabucco'));
 const data=await loadLibretto('nabucco');
 assert.equal(data.acts.length,4);
 assert.match(data.synopsis.eyebrow,/AI-generated English working translations awaiting editorial review/);
});
