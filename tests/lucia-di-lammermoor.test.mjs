import test from 'node:test';
import assert from 'node:assert/strict';
import { luciaActOneScenes } from '../src/data/libretto-lucia-di-lammermoor-act-1.js';
import { luciaActTwoScenes } from '../src/data/libretto-lucia-di-lammermoor-act-2.js';
import { luciaActThreeScenes } from '../src/data/libretto-lucia-di-lammermoor-act-3.js';
import { luciaDiLammermoor } from '../src/data/libretto-lucia-di-lammermoor-bundle.js';
import { hasCompleteLibretto, loadLibretto } from '../src/data/libretto-loader.js';

const acts = [luciaActOneScenes, luciaActTwoScenes, luciaActThreeScenes];
const sceneCounts = [5, 6, 9];
const allTurns = scenes => scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));

test('Lucia di Lammermoor includes all three original reading divisions and twenty scenes', () => {
  assert.equal(luciaDiLammermoor.acts.length, 3);
  acts.forEach((scenes, i) => {
    assert.equal(scenes.length, sceneCounts[i]);
    assert.deepEqual(scenes.map(scene => scene.number), Array.from({length:sceneCounts[i]},(_,j)=>j+1));
    assert.ok(scenes.every(scene => scene.originalHeading && scene.translatedHeading && scene.sections.length));
  });
  assert.match(luciaDiLammermoor.acts[0].originalHeading, /LA PARTENZA/);
  assert.match(luciaDiLammermoor.acts[1].originalHeading, /CONTRATTO NUZIALE/);
  assert.match(luciaDiLammermoor.acts[2].originalHeading, /CONTRATTO NUZIALE/);
});

test('Every original Italian turn and direction retains a paired line-broken English working translation', () => {
  for(const scenes of acts) for(const turn of allTurns(scenes)){
    assert.ok(turn.speaker && turn.speakerTranslation);
    assert.ok(turn.original.trim() && turn.translation.trim());
    assert.equal(turn.original.split('\n').length,turn.translation.split('\n').length,turn.original.slice(0,70));
  }
});

test('Lucia dramatic opening and ending survive complete extraction', () => {
  assert.match(allTurns(luciaActOneScenes).map(x=>x.original).join('\n'), /Regnava nel silenzio/);
  assert.match(allTurns(luciaActTwoScenes).map(x=>x.original).join('\n'), /Hai tradito il cielo/);
  assert.match(allTurns(luciaActThreeScenes).map(x=>x.original).join('\n'), /Tu che a dio spiegasti l’ali/);
  assert.match(allTurns(luciaActThreeScenes).at(-1).original, /Edgardo spira/);
});

test('Lucia is on-demand loadable and is explicitly labeled an unreviewed AI working translation', async () => {
  assert.ok(hasCompleteLibretto('lucia-di-lammermoor'));
  const result = await loadLibretto('lucia-di-lammermoor');
  assert.equal(result.slug,'lucia-di-lammermoor');
  assert.equal(result.acts.length,3);
  assert.match(result.synopsis.eyebrow,/AI working translations/i);
  assert.match(result.source,/editorial review/i);
});
