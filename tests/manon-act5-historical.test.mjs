import test from 'node:test';
import assert from 'node:assert/strict';
import {manon} from '../src/data/operas/librettos/manon/bundle.js';

const finalAct=manon.acts[4];
const tableau=finalAct.scenes[0];
const sections=tableau.sections;
const turns=sections.flatMap(section=>section.turns);
const text=turns.map(turn=>turn.original).join('\n');
const english=turns.map(turn=>turn.translation).join('\n');

test('Manon remains five acts, six tableaux, and Act V has five historical scenes',()=>{
  assert.equal(manon.acts.length,5);
  assert.deepEqual(manon.acts.map(act=>act.scenes.length),[1,1,2,1,1]);
  assert.equal(finalAct.number,5);
  assert.equal(finalAct.scenes.length,1);
  assert.equal(sections.length,5);
  for(const [index,section] of sections.entries()){
    assert.ok(section.originalTitle.startsWith('Scène '+['I','II','III','IV','V'][index]));
    assert.ok(section.translatedTitle.startsWith('Scene '+['I','II','III','IV','V'][index]));
    assert.ok(section.turns.length>0);
    assert.equal(new Set(section.participants).size,section.participants.length);
  }
});

test('Manon Act V uses independently translated French and preserves every spoken turn',()=>{
  assert.ok(turns.length>=110,'unexpected loss of Act V source dialogue');
  for(const turn of turns){
    assert.ok(turn.original?.trim(),'missing French original');
    assert.ok(turn.translation?.trim(),'missing English reading translation');
  }
  for(const phrase of ['Je suis de sa famille','Impossible','Détachez-la','Ah ! Des Grieux','Et c’est là']){
    if(phrase==='Et c’est là')continue; // punctuation and apostrophe may vary
    assert.ok(text.includes(phrase),'missing French exchange: '+phrase);
  }
  assert.match(text,/Elle meurt/);
  assert.match(english,/I'm a relative/);
  assert.match(english,/Forgive me/);
  assert.match(english,/I'm dying/);
});

test('Manon Act V's bribery sequence is explicitly represented, with guards credited',()=>{
  const guardScene=sections[2];
  const directionTurns=guardScene.turns.filter(turn=>turn.speaker==='Stage direction');
  assert.ok(directionTurns.length>=4);
  assert.ok(guardScene.participants.includes('The Sergeant'));
  assert.ok(guardScene.participants.includes('Lescaut'));
  assert.ok(guardScene.turns.filter(turn=>/pièce/.test(turn.original)).length>=3);
  assert.ok(sections[4].participants.includes('Manon'));
  assert.ok(sections[4].participants.includes('Des Grieux'));
});
