import test from 'node:test';
import assert from 'node:assert/strict';
import { donGiovanniActOneScenes } from '../src/data/operas/librettos/don-giovanni/act-1.js';
import { parsifalActOneScenes } from '../src/data/operas/librettos/parsifal/act-1.js';
import { aidaActThreeScenes } from '../src/data/operas/librettos/aida/act-3.js';
import { traviataActOneScenes } from '../src/data/operas/librettos/la-traviata/act-1.js';

function turns(scenes) { return scenes.flatMap(scene => scene.sections.flatMap(section => section.turns)); }
function findSource(scenes, fragment) {
  const hits = turns(scenes).filter(turn => (turn.original ?? '').includes(fragment));
  assert.equal(hits.length, 1, `Expected one source turn for ${fragment}`);
  return hits[0];
}

test('Don Giovanni: Elvira is seduced into love, not Giovanni falling in love with Elvira', () => {
  const turn = findSource(donGiovanniActOneScenes, "M'innamori");
  assert.match(turn.translation, /You make me fall in love/);
  assert.doesNotMatch(turn.translation, /You fall in love with me/);
  assert.equal(turn.original.split('\n').length, turn.translation.split('\n').length);
});

test('Parsifal: Amfortas orders his attendants to prepare his bath', () => {
  const turn = findSource(parsifalActOneScenes, 'befahl er eifrig uns das Bad');
  assert.match(turn.translation, /ordered us\s*\n?to prepare the bath for him/);
  assert.doesNotMatch(turn.translation, /ordered us to take a bath/);
  assert.equal(turn.original.split('\n').length, turn.translation.split('\n').length);
});

test('Aida: Ramfis retains Isis knowing the secrets of mortal hearts', () => {
  const turn = findSource(aidaActThreeScenes, 'Iside legge');
  assert.match(turn.translation, /Isis reads/);
  assert.match(turn.translation, /every human secret/);
  assert.equal(turn.original.split('\n').length, turn.translation.split('\n').length);
});

test('La traviata: Act I stage setting and arrivals are no longer condensed away', () => {
  const turn = findSource(traviataActOneScenes, 'ATTO PRIMO\nPreludio');
  for (const detail of ['fireplace', 'mirror', 'richly laden table', 'Baron', 'Flora', 'Marquis']) {
    assert.ok(turn.translation.includes(detail), `Missing ${detail}`);
  }
  assert.equal(turn.original.split('\n').length, turn.translation.split('\n').length);
});
