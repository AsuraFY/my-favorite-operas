import test from 'node:test';
import assert from 'node:assert/strict';
import { traviata } from '../src/data/operas/librettos/la-traviata/bundle.js';

const turns = (act) => traviata.acts[act - 1].scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
const find = (act, fragment) => {
  const matches=turns(act).filter(t=>t.original.includes(fragment));
  assert.equal(matches.length,1,'expected one source passage: '+fragment);
  return matches[0];
};
test('La traviata preserves its original three acts and English text', () => {
  assert.equal(traviata.acts.length,3);
  for(let a=1;a<=3;a++)for(const turn of turns(a)) {
    assert.ok(turn.original?.trim());
    assert.ok(turn.translation?.trim());
    assert.ok(turn.speaker?.trim());
  }
});
test('The Act II matadors ballad has speaking singers and full translated verse',()=>{
 const scene=traviata.acts[1].scenes[10];
 const sections=scene.sections;
 const all=sections.flatMap(s=>s.turns);
 const ballad=all.find(t=>t.original.startsWith('È Piquillo'))||all.find(t=>t.original.includes('È Piquillo'));
 assert.ok(ballad);
 assert.equal(ballad.speaker,'GASTONE E MATTADORI');
 assert.ok(ballad.translation.includes('five bulls'));
 assert.ok(all.some(t=>t.speaker==='GLI ALTRI'&&/matador/.test(t.translation)));
 assert.ok(all.some(t=>t.original.includes('Di Madride')&&t.translation.split('\n').length===t.original.split('\n').length));
 assert.ok(!all.some(t=>t.translation==='Friends at Flora\'s gambling party.'));
});
test('Act II dramatic arias retain previously omitted source content',()=>{
 const alfredo=find(2,"Lunge da lei per me non v'ha diletto!");
 assert.equal(alfredo.translation.split('\n').length,21);
 assert.match(alfredo.translation,/youthful ardour/);
 const violetta=find(2,'Ah, no giammai!');
 assert.equal(violetta.translation.split('\n').length,13);
 assert.match(violetta.translation,/rather die/);
 const germont=find(2,'Di Provenza il mar');
 assert.match(germont.translation,/A father and a sister|old father suffered/);
 const letter=find(2,'Di Violetta! Perché son io commosso!');
 assert.match(letter.translation,/My father/);
});
test('Act III final scene preserves singers and stage transitions',()=>{
 const passage=find(3,'Oh mio sospiro, oh palpito');
 assert.equal(passage.translation.split('\n').length,13);
 assert.match(passage.translation,/FINAL SCENE/);
 assert.match(passage.translation,/Annina, Signor Germont and the Doctor/);
});
