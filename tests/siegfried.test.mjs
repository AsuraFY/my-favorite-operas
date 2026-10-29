import test from 'node:test';
import assert from 'node:assert/strict';
import {siegfried} from '../src/data/libretto-siegfried-bundle.js';
import {getLibretto} from '../src/data/libretto-registry.js';
import {hasCompleteLibretto} from '../src/data/libretto-loader.js';

test('Siegfried complete bilingual libretto', () => {
  assert.equal(siegfried.acts.length, 3);
  assert.deepEqual(siegfried.acts.map(act => act.scenes.length), [3,3,3]);
  let total = 0;
  for (const act of siegfried.acts) {
    for (const scene of act.scenes) {
      for (const section of scene.sections) {
        total += section.sourceLineCount;
        for (const turn of section.turns) {
          assert.ok(turn.original);
          assert.ok(turn.translation);
          assert.equal(turn.original.split('\n').length, turn.translation.split('\n').length);
        }
      }
    }
  }
  assert.equal(total, 2368);
  assert.ok(hasCompleteLibretto('siegfried'));
  assert.equal(getLibretto('siegfried').slug, 'siegfried');
});
