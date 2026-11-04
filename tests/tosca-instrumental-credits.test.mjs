import test from 'node:test';
import assert from 'node:assert/strict';
import { createLibrettoRenderer } from '../src/libretto-reader.js';
import {tosca} from '../src/data/operas/librettos/tosca/bundle.js';
import {dieZauberflote} from '../src/data/operas/librettos/the-magic-flute/bundle.js';

test('Tosca Act III matins interval does not claim vocal participants', () => {
 const first=tosca.acts[2].scenes[0];
 const bells=first.outline.find(x=>x.title.includes('campane'));
 assert.ok(bells);
 assert.equal(bells.type,'Interludio');
 assert.deepEqual(bells.characters,[]);
 const shepherd=first.outline.find(x=>x.title==="Io de' sospiri");
 assert.ok(shepherd.characters.includes('A Shepherd'));
 assert.ok(first.sections.flatMap(s => s.turns).some(t => t.speaker === 'A Shepherd (offstage)' && t.original.includes("Io de' sospiri")));
 const stage=first.sections.flatMap(s=>s.turns).find(t=>t.original.includes('le campane delle chiese suonano mattutino'));
 assert.equal(stage.speaker,'Stage direction');
});

test('Zauberflote preserves source Auftritte and displays standard No. 10 form without changing source',()=>{
 const scenes=dieZauberflote.acts.flatMap(a=>a.scenes);
 assert.equal(scenes.length,49);
 const numbered=scenes.flatMap(s=>s.sections).find(s=>s.number===10);
 assert.equal(numbered.type,'Arie mir Chor');
 assert.equal(numbered.displayType,'Arie mit Chor');
 assert.equal(numbered.originalTitle,'O Isis und Osiris');
});

test('Tosca bell interlude renders without an inherited shepherd credit', () => {
 globalThis.window = { location: { hash: '#/operas/tosca?view=outline' } };
 const outline = createLibrettoRenderer(tosca).outline();
 const around = outline.match(/<a class="section-nav-link opera-outline__section"[^>]*>[\\s\\S]*?Le campane suonano mattutino[\\s\\S]*?<\\/a>/);
 assert.ok(around, 'Bells item must appear as a real outline link');
 assert.ok(!around[0].includes('libretto-participants'), 'Instrumental bells must not show an inherited singer');
 assert.ok(!around[0].includes('A Shepherd'), 'The shepherd sings in the preceding item only');
});
