import test from 'node:test';
import assert from 'node:assert/strict';
import {eugeneOnegin} from '../src/data/operas/librettos/eugene-onegin/bundle.js';
import {hasCompleteLibretto} from '../src/data/operas/libretto-loader.js';

const scenes=eugeneOnegin.acts.flatMap(a=>a.scenes);
const passages=scenes.flatMap(s=>s.sections);
const allTurns=passages.flatMap(s=>s.turns);
const allText=allTurns.map(t=>t.translation).join('\n');

test('Eugene Onegin independently translated English reader keeps three acts and seven tableaux',()=>{
  assert.equal(eugeneOnegin.acts.length,3);
  assert.deepEqual(eugeneOnegin.acts.map(a=>a.scenes.length),[3,2,2]);
  assert.deepEqual(scenes.map(s=>s.sections.length),[7,3,2,4,2,3,1]);
  assert.deepEqual(scenes.map(s=>Number(s.translatedHeading.match(/^Scene (\d+) — /)?.[1])),[1,2,3,4,5,6,7]);
  assert.ok(hasCompleteLibretto('eugene-onegin'));
  assert.ok(eugeneOnegin.synopsis.eyebrow.includes('Independent English reading translation'));
});

test('each act has contiguous line offsets for the NEW English translation, not the old 1434 Opera Guide records',()=>{
  const minima=[550,350,180];
  for(const [i,act] of eugeneOnegin.acts.entries()){
    let next=0;
    for(const scene of act.scenes){
      for(const section of scene.sections){
        assert.ok(section.turns.length>0);
        assert.equal(section.sourceStartIndex,next);
        assert.ok(section.translatedTitle);
        let count=0;
        for(const turn of section.turns){
          assert.ok(turn.translation?.trim(), 'no empty translation turns');
          assert.equal(turn.original,'', 'do not fabricate bilingual alignment');
          assert.equal(turn.sourceStartIndex,next);
          assert.equal(turn.sourceLineCount,turn.translation.split('\n').length);
          next+=turn.sourceLineCount;
          count+=turn.sourceLineCount;
        }
        assert.equal(section.sourceLineCount,count);
      }
    }
    assert.ok(next>minima[i], `Act ${i+1} translation line coverage unusually short: ${next}`);
  }
});

test('historical Russian musical divisions and distinctive scenes are present',()=>{
  const labels=passages.map(p=>p.translatedTitle);
  for(let number=1;number<=12;number++)assert.ok(labels.some(s=>s.startsWith(`No. ${number} —`)), `Missing Act I Russian number ${number}`);
  for(let number=13;number<=22;number++)assert.ok(labels.some(s=>s.startsWith(`No. ${number} —`)), `Missing Russian number ${number}`);
  assert.ok(labels.includes("No. 12 — Scene and Onegin's aria"),'Act I No. 12 with Onegin\'s reply must be present');
  assert.match(allText,/I am writing to you/);
  assert.match(allText,/I am in love/);
  assert.match(allText,/What a scandal/);
  assert.match(allText,/my spring/);
  assert.match(allText,/I shall remain faithful/);
  assert.ok(allTurns.some(t=>t.speaker==='Stage direction'), 'missing stage directions');
  assert.ok(allTurns.some(t=>t.speaker.includes('Tatyana')), 'missing singer cues');
});

test('explicitly document that this is a project translation and not the historical English transcription',()=>{
  assert.match(eugeneOnegin.synopsis.eyebrow,/Russian libretto/);
  assert.ok(!allText.includes('qa portable stove'));
  assert.ok(!allText.includes('principels'));
});

test('all 22 Eugene Onegin sections have Cyrillic titles followed by romanized Russian and separate English',()=>{
  assert.equal(passages.length,22);
  for(const section of passages){
    assert.match(section.originalTitle, /[А-Яа-яЁё]/u, 'Cyrillic source-form title required');
    assert.match(section.originalTitle, /\([^()]+\)$/u, 'romanization in final parentheses required');
    assert.ok(section.translatedTitle, 'English heading retained');
  }
  assert.equal(passages[0].originalTitle,'№ 1 — Дуэт и квартет (Duet i kvartet)');
  assert.equal(passages.at(-1).originalTitle,"№ 22 — Заключительная сцена (Zaklyuchitel'naya stsena)");
  assert.ok(passages.some(p=>p.originalTitle==='№ 12 — Сцена и ария Онегина (Stsena i ariya Onegina)'), 'No. 12 restored from the score');
});
