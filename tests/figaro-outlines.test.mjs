import test, {beforeEach} from 'node:test';
import assert from 'node:assert/strict';
import {getLibretto} from '../src/data/libretto-registry.js';
import {createLibrettoRenderer} from '../src/libretto-reader.js';
import {assertActTargets,resetReaderLocation} from './helpers/libretto-helpers.mjs';
const work=getLibretto('le-nozze-di-figaro');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>s.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
beforeEach(resetReaderLocation);

test('All 81 Figaro outline entries use source incipits, translated second lines and unique participants',()=>{
 const reader=createLibrettoRenderer(work);const outline=reader.outline();let count=0;
 assert.ok(!outline.includes('♬')&&!outline.includes('▤'));
 for(const act of work.acts){
  window.location.hash=`#/operas/${work.slug}?act=${act.number}`;
  const page=reader.scene(1);
  assert.ok(page.includes('▤'));
  assert.ok(page.includes('♬'));
  for(const scene of act.scenes)for(const section of scene.sections){
   count++;
   assert.equal(section.threeLineOutline,true);
   assert.ok(section.translatedTitle);
   const title=section.originalTitle||section.type;
   for(const html of [outline,page]){
    assert.ok(html.includes(esc(title)),title);
    assert.ok(html.includes(`<span class="opera-outline__section-translation">${esc(section.translatedTitle)}</span>`),section.translatedTitle);
   }
   assert.equal(new Set(section.participants.map(p=>p.toLowerCase())).size,section.participants.length);
   assert.ok(!section.participants.some(p=>/^(Il Conte|La Contessa|Coro)$/.test(p)));
   if(!section.instrumental){
    const lyrics=norm(section.turns.filter(t=>t.speaker!=='Stage direction').map(t=>t.it).join(' '));
    for(const phrase of section.originalTitle.split(' / '))assert.ok(lyrics.includes(norm(phrase)),`Incipit must be in its section: ${phrase}`);
   }
  }
 }
 assert.equal(count,81);
 assert.ok(!outline.includes('Ouverture · Ouverture'));
});

test('Figaro finale continuations retain their official number and every existing section destination',()=>{
 const reader=createLibrettoRenderer(work);
 const outline=reader.outline();
 for(const act of work.acts){
  assertActTargets(reader,work,act);
  const expected={2:16,3:23,4:29}[act.number];
  for(const scene of act.scenes)for(const [i,section]of scene.sections.entries()){
   const href=`#/operas/${work.slug}?act=${act.number}&scene=${scene.number}&item=${section.routeItem??i}`;
   const link=outline.match(new RegExp(`<a[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"[^>]*>([\\s\\S]*?)<\\/a>`))?.[1];
   assert.ok(link,href);
   assert.ok(link.indexOf('opera-outline__section-title')<link.indexOf('opera-outline__section-translation'));
   if(section.participants.length)assert.ok(link.indexOf('opera-outline__section-translation')<link.indexOf('libretto-participants'));
   if(section.type==='Finale'){
    assert.equal(section.outlineNumber,expected);
    assert.ok(link.includes(`N. ${expected} · Finale`));
   }
  }
 }
});
