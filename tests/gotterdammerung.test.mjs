import test from 'node:test';
import assert from 'node:assert/strict';
import {gotterdammerung} from '../src/data/operas/librettos/gotterdammerung/bundle.js';
import {getLibretto} from '../src/data/operas/libretto-registry.js';
import {hasCompleteLibretto} from '../src/data/operas/libretto-loader.js';
test('Götterdämmerung preserves prologue, three acts and 1921 paired records',()=>{
 assert.deepEqual(gotterdammerung.acts.map(a=>a.number),[1,2,3]);
 assert.deepEqual(gotterdammerung.acts.map(a=>a.scenes.length),[5,5,3]);
 let count=0;
 for(const act of gotterdammerung.acts)for(const scene of act.scenes)for(const section of scene.sections){count+=section.sourceLineCount;for(const turn of section.turns){assert.ok(turn.original);assert.ok(turn.translation);assert.equal(turn.original.split('\n').length,turn.translation.split('\n').length);}}
 assert.equal(count,1921);assert.ok(hasCompleteLibretto('gotterdammerung'));assert.equal(getLibretto('gotterdammerung').slug,'gotterdammerung');
});
