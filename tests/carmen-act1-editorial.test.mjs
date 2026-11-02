import test from 'node:test';
import assert from 'node:assert/strict';
import {carmenActOneScenes} from '../src/data/operas/librettos/carmen/act-1.js';

test('Carmen Act I retains bilingual structure and corrected French/English meaning', () => {
 assert.equal(carmenActOneScenes.length,1);
 const sections=carmenActOneScenes[0].sections;
 assert.equal(sections.length,20);
 const turns=sections.flatMap(s=>s.turns);
 assert.equal(turns.length,331);
 assert.ok(turns.some(t=>t.original.includes('Je ne suis dans le régiment que depuis deux jours')));
 assert.ok(turns.some(t=>t.original.includes('pour résister')));
 assert.ok(turns.some(t=>t.original.includes('Don José et un très léger')));
 const flies=turns.find(t=>t.original.includes("T'émouchant à tour de bras"));
 assert.ok(flies);
 assert.ok(flies.translation.includes('Shooing flies away'));
 assert.ok(!flies.translation.includes('Waving fans'));
 assert.ok(turns.every(t=>t.speaker && t.translation.trim()));
});
