import test from 'node:test';
import assert from 'node:assert/strict';
import { elisirActOneScenes } from '../src/data/libretto-lelisir-damore-act-1.js';
import { elisirActTwoScenes } from '../src/data/libretto-lelisir-damore-act-2.js';
import { elisir } from '../src/data/libretto-lelisir-damore-bundle.js';
import { hasCompleteLibretto, loadLibretto } from '../src/data/libretto-loader.js';

const acts = [elisirActOneScenes, elisirActTwoScenes];
const sourceCounts = [10, 9];
const entryCounts = [209, 259];
const anchors = [
  ['Bel conforto al mietitore', 'Udite, udite, o rustici', 'Signor sergente'],
  ['Cantiamo, facciam brindisi', 'Una furtiva lagrima', 'Un momento di piacer']
];
function allTurns(scenes) {
  return scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
}

test('L’elisir d’amore has its original two-act, nineteen-scene bilingual structure', () => {
  assert.equal(elisir.acts.length, 2);
  acts.forEach((scenes, idx) => {
    assert.equal(scenes.length, sourceCounts[idx]);
    assert.deepEqual(scenes.map(scene => scene.number), Array.from({ length: sourceCounts[idx] }, (_, i) => i + 1));
    assert.equal(allTurns(scenes).length, entryCounts[idx]);
    assert.ok(scenes.every(scene => scene.sections.length && scene.sections.every(section => section.turns.length)));
  });
});

test('Every Italian passage and stage direction has an independent English working draft with corresponding verse breaks', () => {
  for (const scenes of acts) {
    for (const turn of allTurns(scenes)) {
      assert.ok(turn.speaker);
      assert.ok(turn.speakerTranslation);
      assert.ok(turn.original.trim(), 'Italian source must not be omitted');
      assert.ok(turn.translation.trim(), 'English working draft must not be omitted');
      assert.equal(turn.original.split('\n').length, turn.translation.split('\n').length, turn.original.slice(0, 50));
    }
  }
});

test('L’elisir source incipits and the closing scene are not truncated', () => {
  for (let i = 0; i < acts.length; i++) {
    const italian = allTurns(acts[i]).map(turn => turn.original).join('\n');
    for (const anchor of anchors[i]) assert.ok(italian.includes(anchor), anchor);
  }
  const ending = allTurns(elisirActTwoScenes).at(-1).original;
  assert.match(ending, /possa presto a noi tornar/);
});

test('L’elisir lazy reader exposes both acts and keeps English marked unreviewed', async () => {
  assert.ok(hasCompleteLibretto('lelisir-damore'));
  const libretto = await loadLibretto('lelisir-damore');
  assert.equal(libretto.slug, 'lelisir-damore');
  assert.equal(libretto.acts.length, 2);
  assert.match(libretto.synopsis.eyebrow, /working translations/i);
  assert.match(libretto.source, /editorial review pending/i);
});
