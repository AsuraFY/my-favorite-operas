import test from 'node:test';
import assert from 'node:assert/strict';
import {lesContesDHoffmann as opera} from '../src/data/libretto-les-contes-dhoffmann-bundle.js';
import {getLibretto} from '../src/data/libretto-registry.js';
import {hasCompleteLibretto} from '../src/data/libretto-loader.js';
test('Hoffmann has complete French-English prologue, three acts and epilogue',()=>{
 assert.equal(opera.acts.length,4);
 assert.deepEqual(opera.acts.map(a=>a.scenes.length),[4,12,6,15]);
 let count=0;
 for(const act of opera.acts)for(const scene of act.scenes)for(const section of scene.sections){count+=section.sourceLineCount;for(const turn of section.turns){assert.ok(turn.original);assert.ok(turn.translation);assert.equal(turn.original.split('\n').length,turn.translation.split('\n').length);}}
 assert.equal(count,1779);assert.ok(hasCompleteLibretto('les-contes-dhoffmann'));assert.equal(getLibretto('les-contes-dhoffmann').slug,opera.slug);
});
