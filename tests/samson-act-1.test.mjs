import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { getLibretto } from '../src/data/libretto-registry.js';
import { createLibrettoRenderer } from '../src/libretto-reader.js';
import { assertActTargets, renderedVersePairs, expectedPairedRows, resetReaderLocation } from './helpers/libretto-helpers.mjs';
const libretto = getLibretto('samson-et-dalila');
const act = libretto.acts[0];
const sections = act.scenes.flatMap(scene => scene.sections);
const turns = sections.flatMap(section => section.turns);
beforeEach(resetReaderLocation);

test('Samson Act I preserves the checked French source, six scenes and 322 translated sung lines', () => {
  assert.deepEqual(libretto.acts.map(act => act.number), [1, 2, 3]);
  assert.equal(act.scenes.length, 6);
  assert.equal(sections.length, 15);
  assert.equal(createHash('sha256').update(turns.map(t => t.original).join('\n')).digest('hex'),
    '8524a3da6e141e3ac2acd1f626ca80774e785f4f0f788aff9cc030530d5536ba');
  const sung = turns.filter(t => t.speaker !== 'Stage direction');
  assert.equal(sung.length, 44);
  assert.equal(sung.reduce((n,t) => n+t.original.split('\n').length,0), 322);
  for (const t of sung) {
    assert.equal(t.original.split('\n').length,t.translation.split('\n').length);
    assert.ok(t.speakerTranslation);
    assert.ok(t.translation.split('\n').every(line => line.trim()));
  }
  for (const section of sections) {
    assert.equal(section.number, undefined, 'no invented official numbers');
    assert.ok(section.translatedTitle);
    assert.equal(new Set(section.participants).size,section.participants.length);
  }
});

test('Samson renders each complete vocal turn once with paired line breaks and separate stage directions', () => {
  window.location.hash='#/operas/samson-et-dalila?act=1';
  const page=createLibrettoRenderer(libretto).scene(1);
  const expected = expectedPairedRows(turns);
  assert.deepEqual(renderedVersePairs(page),expected);
  assert.match(page,/LE VIEILLARD HÉBREU/);
  assert.match(page,/Old Hebrew/);
  assert.match(page,/Scène première · Scene I/);
  assert.ok(page.includes('Continue to Act II'));
});

test('Every Samson outline link reaches its section on the continuous Act I page', () => {
  const reader=createLibrettoRenderer(libretto);
  const outline=reader.outline();
  assert.ok(!outline.includes('♬') && !outline.includes('▤'));
  assertActTargets(reader,libretto,act);
  for (const scene of act.scenes) for (const [i,section] of scene.sections.entries()) {
    assert.ok(outline.includes(`?act=1&scene=${scene.number}&item=${i}`));
    assert.ok(outline.includes(section.translatedTitle));
  }
});

test('All three Samson act routes render their prepared libretto', () => {
  const main=readFileSync('src/main.js','utf8');
  const fn=main.slice(main.indexOf('function operaPage('),main.indexOf('\nlet readerJumping'));
  const context={getLibretto:()=>libretto,createLibrettoRenderer:()=>({scene:()=> 'PREPARED ACT',navigation:()=>''}),
    renderPlannedLibrettoPage:(_o,_d,_v,n)=>`PENDING ${n}`,operaInformation:{},URLSearchParams,
    window:{location:{hash:''}}};
  vm.createContext(context);vm.runInContext(fn,context);
  for (const n of [1,2,3]) {
    context.window.location.hash=`#/operas/samson-et-dalila?act=${n}`;
    assert.equal(context.operaPage(libretto.opera),'PREPARED ACT');
  }
});
