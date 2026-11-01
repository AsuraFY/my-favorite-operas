import test from 'node:test';
import assert from 'node:assert/strict';
import {hanselActOneScenes} from '../src/data/libretto-hansel-und-gretel-act-1.js';
import {hanselActTwoScenes} from '../src/data/libretto-hansel-und-gretel-act-2.js';
import {hanselActThreeScenes} from '../src/data/libretto-hansel-und-gretel-act-3.js';
import {hanselUndGretel} from '../src/data/libretto-hansel-und-gretel-bundle.js';
import {hasCompleteLibretto,loadLibretto} from '../src/data/libretto-loader.js';
const groups=[hanselActOneScenes,hanselActTwoScenes,hanselActThreeScenes];
test('Hänsel und Gretel has all three pictures, and all eleven 1905 source scenes',()=>{
 assert.deepEqual(groups.map(a=>a.length),[3,3,5]);
 assert.deepEqual(hanselUndGretel.acts.map(a=>a.number),[1,2,3]);
 for(const scenes of groups)for(const [i,scene] of scenes.entries()){
  assert.equal(scene.number,i+1);
  assert.ok(scene.originalHeading&&scene.translatedHeading);
  assert.ok(scene.sections[0].originalTitle && scene.sections[0].translatedTitle);
  assert.ok(scene.sections[0].turns.length);
  for(const turn of scene.sections[0].turns){assert.ok(turn.original.trim()&&turn.translation.trim());assert.ok(turn.speaker&&turn.speakerTranslation);}
 }
});
test('German originals and historical English preserve famous lines and ending',()=>{
 const original=groups.flat().flatMap(scene=>scene.sections[0].turns.map(t=>t.original)).join('\n');
 const english=groups.flat().flatMap(scene=>scene.sections[0].turns.map(t=>t.translation)).join('\n');
 assert.match(original,/Suse, liebe Suse/);assert.match(original,/Brüderchen, komm/);
 assert.match(original,/Knusper, knusper Knäuschen/);assert.match(original,/Wenn die Not aufs höchste steigt/);
 assert.match(english,/Susy, little Susy/);assert.match(english,/Witch/);
});
test('Historical nonliteral English is explicitly labelled and lazily loaded',async()=>{
 assert.equal(hasCompleteLibretto('hansel-und-gretel'),true);
 assert.equal((await loadLibretto('hansel-und-gretel')).acts.length,3);
 assert.match(hanselUndGretel.source,/not a literal/);
});
