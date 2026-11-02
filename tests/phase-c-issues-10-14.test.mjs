import test from 'node:test';
import assert from 'node:assert/strict';
import {dieZauberflote} from '../src/data/operas/librettos/the-magic-flute/bundle.js';
import {tosca} from '../src/data/operas/librettos/tosca/bundle.js';
import {turandot} from '../src/data/operas/librettos/turandot/bundle.js';
import {carmen} from '../src/data/operas/librettos/carmen/bundle.js';
import {eugeneOnegin} from '../src/data/operas/librettos/eugene-onegin/bundle.js';
import {manon} from '../src/data/operas/librettos/manon/bundle.js';

test('Phase C 10-14: preserve Zauberflote scenic divisions and numbered musical incipits',()=>{
 const scenes=dieZauberflote.acts.flatMap(a=>a.scenes),sections=scenes.flatMap(s=>s.sections);
 assert.deepEqual(dieZauberflote.acts.map(a=>a.scenes.length),[19,30]);
 assert.equal(sections.filter(s=>s.type==='Auftritt').length,48);
 assert.deepEqual(sections.filter(s=>s.number!=null).map(s=>s.number),Array.from({length:21},(_,i)=>i+1));
 const ten=sections.find(s=>s.number===10);
 assert.equal(ten.type,'Arie mir Chor');
 assert.equal(ten.displayType,'Arie mit Chor');
 assert.equal(ten.originalTitle,'O Isis und Osiris');
});
test('Phase C 10-14: Tosca matins instrumental landmark has no singers',()=>{
 const first=tosca.acts[2].scenes[0];
 const bells=first.outline.find(x=>x.title.includes('campane'));
 assert.equal(bells.type,'Interludio');
 assert.deepEqual(bells.characters,[]);
 assert.equal(first.sections.flatMap(s=>s.turns).find(t=>t.original.includes('le campane delle chiese suonano mattutino')).speaker,'Stage direction');
});
test('Phase C 10-14: all Turandot and Carmen titled sections retain actual incipits and English headings',()=>{
 const t=turandot.acts.flatMap(a=>a.scenes.flatMap(s=>s.sections));
 assert.equal(t.length,20);
 assert.deepEqual(t.map(x=>x.number),Array.from({length:20},(_,i)=>i+1));
 assert.ok(t.every(x=>x.originalTitle?.trim()&&x.translatedTitle?.trim()));
 const c=carmen.acts.flatMap(a=>a.scenes.flatMap(s=>s.sections));
 assert.equal(c.length,51);
 assert.ok(c.filter(x=>x.originalTitle?.trim()).every(x=>x.translatedTitle?.trim()));
 assert.equal(c.find(x=>x.type==='Scène'&&x.originalTitle==='Carmen, sur tes pas')?.translatedTitle,'Carmen, we follow in your wake');
});
test('Phase C 10-14: Onegin remains English-first with 7 tableaux and no manufactured Russian',()=>{
 assert.deepEqual(eugeneOnegin.acts.map(a=>a.scenes.length),[3,2,2]);
 const scenes=eugeneOnegin.acts.flatMap(a=>a.scenes),turns=scenes.flatMap(s=>s.sections.flatMap(sec=>sec.turns));
 assert.ok(turns.every(t=>t.original===''));
 assert.equal(eugeneOnegin.acts.reduce((sum,a)=>sum+a.scenes.reduce((n,s)=>n+s.sections.reduce((k,sec)=>k+sec.sourceLineCount,0),0),0),1434);
});
test('Phase C 10-14: Manon visibly discloses separate Act V edition without rewriting source',()=>{
 assert.deepEqual(manon.acts.map(a=>a.number),[1,2,3,4,5]);
 assert.match(manon.synopsis.paragraphs.join(' '),/Acts I–IV/);
 assert.match(manon.synopsis.paragraphs.join(' '),/Act V follows a separate historical/);
 assert.match(manon.synopsis.paragraphs.join(' '),/not a single uniform edition/);
 const act5=manon.acts[4].scenes.flatMap(sc=>sc.sections.flatMap(sec=>sec.turns));
 assert.ok(act5.some(t=>t.original.includes('Oublions le passé')));
});
