import test from 'node:test';
import assert from 'node:assert/strict';
import {dieWalkure} from '../src/data/operas/librettos/die-walkure/bundle.js';

// Hashes cover every original German source record in source order, with a
// record separator. Derived from Sottovoce Q324319 (Opera Guide transcription).
function sourceHash(lines) {
  let hash = 0x811c9dc5;
  for (const char of lines.join('\u001f')) {
    hash = Math.imul(hash ^ char.charCodeAt(0), 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

test('Die Walküre preserves all 1,806 German source records and both act preambles', () => {
  assert.deepEqual(dieWalkure.acts.map(act => act.scenes.length), [3, 5, 3]);
  const expectedCounts = [481, 732, 593];
  const expectedHashes = ['c8e4f0fd', '65b33c01', '7fc68cc4'];
  let total = 0;
  for (let index = 0; index < dieWalkure.acts.length; index++) {
    const act = dieWalkure.acts[index];
    const turns = act.scenes.flatMap(scene => scene.sections.flatMap(section => section.turns));
    const lines = turns.flatMap(turn => turn.original.split('\n'));
    assert.equal(lines.length, expectedCounts[index], `Act ${index + 1} source count`);
    assert.equal(sourceHash(lines), expectedHashes[index], `Act ${index + 1} source integrity`);
    for (const turn of turns) {
      assert.ok(turn.original.trim() && turn.translation.trim());
      assert.equal(turn.original.split('\n').length, turn.translation.split('\n').length);
    }
    total += lines.length;
  }
  assert.equal(total, 1806);
  const actTwo = dieWalkure.acts[1].scenes[0].sections[0].turns[0];
  const actThree = dieWalkure.acts[2].scenes[0].sections[0].turns[0];
  assert.equal(actTwo.speaker, 'Stage direction');
  assert.equal(actThree.speaker, 'Stage direction');
  assert.equal(actTwo.shortCue, false);
  assert.equal(actThree.shortCue, false);
  assert.match(actTwo.original, /^Wildes Felsengebirge/);
  assert.match(actTwo.translation, /^Wild, rocky mountains/);
  assert.match(actThree.original, /^Auf dem Gipfel eines Felsenberges/);
  assert.match(actThree.translation, /^At the summit of a rocky mountain/);
});
