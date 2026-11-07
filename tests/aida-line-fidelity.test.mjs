import test from 'node:test';
import assert from 'node:assert/strict';
import { aida } from '../src/data/operas/librettos/aida/bundle.js';

const allTurns = (act) => aida.acts[act-1].scenes.flatMap(scene=>scene.sections.flatMap(section=>section.turns));
const getTurn=(act,original)=>allTurns(act).find(turn=>turn.original.includes(original));

test('Aida has four complete acts, and no empty English passages',()=>{
 assert.equal(aida.acts.length,4);
 for(let act=1;act<=4;act++){
  assert.ok(aida.acts[act-1].scenes.length);
  for(const turn of allTurns(act)){
   assert.ok(turn.speaker?.trim());
   assert.ok(turn.original?.trim());
   assert.ok(turn.translation?.trim());
   assert.equal(turn.original.split('\n').length,turn.translation.split('\n').length,
     'Unaligned Act '+act+': '+turn.original.slice(0,95));
  }
 }
});

test('Aida Act III includes the priestly boat arrival and gods in the lovers farewell',()=>{
 const prayer=getTurn(3,"O tu che sei d'Osiride");
 assert.ok(prayer.translation.includes('Amneris, Ramfis, veiled women and guards'));
 const flight=getTurn(3,'Sotto il mio ciel');
 assert.ok(flight.translation.includes('the same gods'));
 assert.match(flight.translation,/Let us flee, let us flee/);
 const oath=getTurn(3,'Che parli mai?');
 assert.match(oath.translation,/The gods hear me/);
});

test('Aida Act IV keeps the full nine-line final plea and scene directions',()=>{
 const plea=getTurn(4,'Morir! sì pura e bella!');
 assert.equal(plea.original.split('\n').length,9);
 assert.equal(plea.translation.split('\n').length,9);
 assert.match(plea.translation,/I kill you by having loved you/);
 assert.match(plea.translation,/you shall not die/);
 const stage=getTurn(4,'L\u2019interno del tempio')||getTurn(4,"L'interno del tempio");
 assert.ok(stage);
 assert.match(stage.translation,/gold and light/);
 const revelation=getTurn(4,"L'infamia");
 assert.match(revelation.translation,/Aida away from me/);
});
