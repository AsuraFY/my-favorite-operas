import test, {beforeEach} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {getLibretto} from '../src/data/libretto-registry.js';
import {createLibrettoRenderer} from '../src/libretto-reader.js';
import {assertActTargets, renderedVersePairs, resetReaderLocation} from './helpers/libretto-helpers.mjs';
const work=getLibretto('samson-et-dalila');
const act=work.acts[1];
const sections=act.scenes.flatMap(s=>s.sections);
const turns=sections.flatMap(s=>s.turns);
beforeEach(resetReaderLocation);

test('Samson II preserves all three source scenes, 303 sung lines and translated directions',()=>{
 assert.equal(act.scenes.length,3);
 assert.equal(sections.length,9);
 assert.equal(createHash('sha256').update(turns.map(t=>t.original).join('\n')).digest('hex'),'43fcc37e1b72d76ea3fd5b09568389c8c788c7ee7b69bbda9e33e0bd71c3304b');
 const sung=turns.filter(t=>t.speaker!=='Stage direction');
 assert.equal(sung.length,67);
 assert.equal(sung.reduce((n,t)=>n+t.original.split('\n').length,0),303);
 assert.equal(turns.length-sung.length,22);
 for(const t of turns){
  assert.ok(t.translation.trim());
  if(t.speaker!=='Stage direction'){
   assert.ok(t.speakerTranslation);
   assert.equal(t.original.split('\n').length,t.translation.split('\n').length);
  }
 }
 for(const s of sections){assert.ok(s.translatedTitle);assert.equal(s.number,undefined);assert.equal(s.participants.length,new Set(s.participants).size);}
});

test('Samson II renders whole vocal turns, including the replies within Mon cœur and the final betrayal',()=>{
 window.location.hash='#/operas/samson-et-dalila?act=2';
 const page=createLibrettoRenderer(work).scene(1);
 assert.deepEqual(renderedVersePairs(page),turns.map(t=>{
  const f=v=>(t.speaker === "Stage direction"?`[${v}]`:v).split('\n').join('<br>');
  return [f(t.original),f(t.translation),t.speaker==='Stage direction'];
 }));
 const aria=sections.find(s=>s.originalTitle==='Mon cœur s’ouvre à ta voix');
 assert.deepEqual(aria.turns.filter(t=>t.speaker!=='Stage direction').map(t=>t.speaker),['DALILA','SAMSON','DALILA','SAMSON']);
 assert.ok(page.includes('Trahison !') && page.includes('Betrayal!'));
 assert.ok(page.includes('End of Act II'));
 assert.ok(page.includes('Continue to Act III'));
 assert.ok(page.includes('section-nav-link__icon--recitative'));
});

test('Samson II has nine bilingual outline destinations and links from Act I',()=>{
 const reader=createLibrettoRenderer(work);
 const outline=reader.outline();
 assert.ok(!outline.includes('♬')&&!outline.includes('▤'));
 assertActTargets(reader,work,act);
 for(const s of act.scenes)for(const [i,section]of s.sections.entries()){
  assert.ok(outline.includes(`?act=2&scene=${s.number}&item=${i}`));
  assert.ok(outline.includes(section.translatedTitle));
 }
 window.location.hash='#/operas/samson-et-dalila?act=1';
 assert.ok(reader.scene(1).includes('href="#/operas/samson-et-dalila?act=2">Continue to Act II'));
});
