import test from 'node:test';
import assert from 'node:assert/strict';
import {eugeneOnegin} from '../src/data/libretto-eugene-onegin-bundle.js';
import {hasCompleteLibretto} from '../src/data/libretto-loader.js';
test('Eugene Onegin English-first reader retains all 1434 English records without fake Russian',()=>{
 assert.equal(eugeneOnegin.acts.length,3);
 let count=0;
 for(const act of eugeneOnegin.acts)for(const scene of act.scenes)for(const section of scene.sections){count+=section.sourceLineCount;for(const turn of section.turns){assert.ok(turn.translation);assert.equal(turn.original,'');}}
 assert.equal(count,1434);assert.ok(hasCompleteLibretto('eugene-onegin'));
});
