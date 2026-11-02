import test from 'node:test';
import assert from 'node:assert/strict';
import {dieWalkure} from '../src/data/operas/librettos/die-walkure/bundle.js';
import {manon} from '../src/data/operas/librettos/manon/bundle.js';

const temporary = /\b(?:the five together|the others together|the other four|everyone else|all eight valkyries|six other valkyries|the other six valkyries)\b/i;
const joined = /\s(?:und|et|and)\s/i;

for (const opera of [dieWalkure, manon]) {
  test(`${opera.slug}: English participant lists have unique roles, not joint or temporary singing cues`, () => {
    let sections = 0;
    for (const act of opera.acts) for (const scene of act.scenes) for (const section of scene.sections) {
      sections++;
      const names = section.participants || [];
      assert.equal(new Set(names.map(name => name.toLocaleLowerCase())).size, names.length);
      for (const name of names) {
        assert.doesNotMatch(name, temporary);
        assert.doesNotMatch(name, joined);
        assert.doesNotMatch(name, /\b(?:Stimme|Walküren|Les cinq|Les autres|Tutti)\b/i);
      }
      for (const turn of section.turns) {
        assert.ok(turn.original?.trim());
        assert.ok(turn.translation?.trim());
      }
    }
    assert.ok(sections > 0);
  });
}
test('Manon singing directions are retained in original and English before passages', () => {
  const turns = manon.acts.flatMap(a => a.scenes.flatMap(s => s.sections.flatMap(x => x.turns)));
  for(const original of ['LES CINQ ENSEMBLE','LES AUTRES ENSEMBLE','TOUS LES AUTRES']) {
    const turn = turns.find(t => t.speaker === original);
    assert.ok(turn, original);
    assert.ok(turn.speakerTranslation && turn.speakerTranslation !== original);
  }
});
test('Die Walküre retains original German joint cues and English speaker labels', () => {
  const turns = dieWalkure.acts.flatMap(a => a.scenes.flatMap(s => s.sections.flatMap(x => x.turns)));
  const joint = turns.find(t => t.speaker === 'SCHWERTLEITE UND WALTRAUTE');
  assert.ok(joint);
  assert.equal(joint.speakerTranslation, 'SCHWERTLEITE AND WALTRAUTE');
  const valkyries = dieWalkure.acts[2].scenes.flatMap(s => s.sections.flatMap(x => x.participants || []));
  assert.ok(valkyries.includes('Gerhilde'));
  assert.ok(valkyries.includes('Waltraute'));
});
